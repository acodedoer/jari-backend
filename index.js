require('dotenv').config();
const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password, DateTime, Relationship, Slug } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');
const initialiseData = require('./initial-data');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');


const uri = process.env.MONGO_URI;

const PROJECT_NAME = "Jari";

const keystone = new Keystone({
  name: PROJECT_NAME,
  secureCookies: false,
  adapter: new MongooseAdapter({mongoUri:uri}),
  onConnect: initialiseData,
  sessionStore: new MongoStore({ url: uri}),
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};
const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};
const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

keystone.createList('Proverb', {
  labelField: 'modified',
  fields: {
    proverb: {type: Text, isUnique: true, index: true},
    transalation: {type: Text, isMultiline:true},
    description: {type: Text, isMultiline:true},
    LiteralTags: {type: Relationship, ref: 'LiteralTag', many: true },
    MetaphoricalTags: {type: Relationship, ref: 'MetaphoricalTag', many: true },
    created: {type: DateTime, format:"DD/MM/YYYY h:mm", default: Date.now},
    modified: {type: DateTime, format:"DD/MM/YYYY h:mm", default: Date.now},
  },
  access: {
    read:access.userIsAdmin,
    update: access.userIsAdmin,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
  }
});

keystone.createList('MetaphoricalTag', {
  labelField: 'tag',
  fields:{
    tag: {
      type: Text,
      isUnique: true,
      isRequired: true
    },
    parents:{
      type: Relationship,
      ref: 'MetaphoricalTagParent.children'
    }
  },
  access: {
    read:true,
    update: access.userIsAdmin,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
  }
});

keystone.createList('MetaphoricalTagParent', {
  labelField: 'tag',
  fields:{
    tag: {
      type: Text,
      isUnique: true,
      isRequired: true
    },
    children:{
      type: Relationship,
      ref: 'MetaphoricalTag.parents',
      many:true
    }
  },
  access: {
    read:true,
    update: access.userIsAdmin,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
  }
});

keystone.createList('LiteralTag', {
  labelField: 'tag',
  fields:{
    tag: {
      type: Text,
      isUnique: true,
      isRequired: true
    },
    parents:{
      type: Relationship,
      ref: 'LiteralTagParent.children'
    }
  },
  access: {
    read:true,
    update: access.userIsAdmin,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
  }
});

keystone.createList('LiteralTagParent', {
  labelField: 'tag',
  fields:{
    tag: {
      type: Text,
      isUnique: true,
      isRequired: true
    },
    children:{
      type: Relationship,
      ref: 'LiteralTag.parents',
      many:true
    }
  },
  access: {
    read:true,
    update: access.userIsAdmin,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
  }
});


keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: { type: Checkbox },
    password: {
      type: Password,
    },
  },
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({
      path: '/',
      src: 'public',
      fallback: 'index.html',
    }),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
