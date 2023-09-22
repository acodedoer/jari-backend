# jari - A Sayings Database

This is the frontend repository of jari, a sayings and proverbs database. [Jari's server can be found in this repo](https://github.com/acodedoer/jari-server), while the [mobile app can be found in this repo](https://github.com/acodedoer/jari-mobile-app). This frontend is meant to serve as an administrative interface for managing the collection of sayings and proverbs that are presented to users through the mobile app.

## Features
* User Authentication: User accounts are managed to ensure that only authenticated users can add, update and delete proverbs.
* Add Proverbs: Registered users can contribute to the database by submitting new provers.
* Edit/Delete Proverbs: Registered users can edit or delete proverbs. Changes are tracked to ensure transparency and accountability.
* Tags: Tag proverbs with up to five topics or descriptions to easily describe, manage and group.
* Filter: filter proverbs by tags to easily find sayings relevant to a particular topic or area.

## Features to Add
* Search - to search all proverbs by text
* Admin Control - to manage registered users.
* Visibility - add a visibility property for proverbs which determines whether or not they are retrieved and displayed by the mobile app.

## Tech Stack
* Typescript: for enhanced code quality, type safety, and  developer productivity.
* React: Built using react functional components.
* Zustland: State management using Zustland to provide a clean and efficient developer experience.
* Axios: HTTP requests to the backend API.
* Tailwind CSS: Styling the application.

## Getting Started
1. Clone this repo to your local machine.\
`git clone https://github.com/acodedoer/jari-backend.git`

2. Navigate to the project directory.\
`cd jari-backend`

3. Install the dependencies.\
`npm install`

4. Start the project.\
`npm run start`

5. Make sure you also clone and start the [jari-server](https://github.com/acodedoer/jari-server)


