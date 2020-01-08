const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password, DateTime, Relationship } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const initialiseData = require('./initial-data');

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = "Jari";

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(),
  onConnect: initialiseData,
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
  labelField: 'tag',
  fields: {
    langauge: { type: Text },
    proverb: {type: Text, index: true},
    created: {type: DateTime},
    modified: {type: DateTime},
    LiteralTags: {type: Relationship, ref: 'LiteralTag', many: true },
    MetaphoricalTags: {type: Relationship, ref: 'MetaphoricalTag', many: true }
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
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
