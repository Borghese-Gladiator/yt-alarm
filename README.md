# YT Alarm
Manage alarms on the cloud - server saves MP3 files and mobile app syncs with server
# Table of Contents
1. [Basic Usage](#basic-usage)
2. [Setup Project](#setup-project)
3. [Technologies](#technologies)
4. [Project Creation Steps](#project-creation-steps)

## Basic Usage
1. download mobile (Android/iOS) app here - <heroku link>
2. add youtube video MP3 as you want to the library
3. open app and pick alarms you want from list

## Setup Project
- /server/ - holds server UI and API endpoints
    - Express (Node.js) server
    - EJS frontend for SSR pages
    - OpenAPI documentation (swagger.json) at /apidocs
    - Mongoose ORM to connect to MongoDB
    - Docker Compose to start server & database together
- /mobile/ - holds mobile app

#### Setup Server
Docker Setup
1. Install Docker Desktop (windows)
2. ```docker build -t yt-alarm-node-server:1.0 . && docker run -it -dp 8080:8080 --name yt-alarm-node-server-image yt-alarm-node-server:1.0```
3. Open API Docs at localhost:3000/apidocs

Node.js Setup
1. Install Node.js
2. ```cd server && npm install && npm run dev```
3. Open API Docs at localhost:3000/apidocs

#### Setup React Native app
1. ```cd client && npm install```

## Technologies
- Docker Compose & Docker - quickly setup development environments using Node.js container
- Swagger - Document OpenAPI specs using interactive API documentation (see swagger.json) 
- Node.js - JavaScript runtime environment used in yt-alarm to host an HTTP server. Used through Express server wrapper.
- EJS - templating engine for Node.js to create HTML templates and insert data into HTML template at client side
- MongoDB - NoSQL Database
- React Native - cross-platform JavaScript library to create mobile native components
- Amazon AWS S3 reduced redundancy storage - stores MP3 files - https://stackoverflow.com/questions/11958465/what-is-best-way-to-store-mp3-files-in-server-storing-it-in-database-blob

## Third-Party Packages
#### Server
- express - server framework to build REST APIs
- pino - json logger library (used to configure DEV logs vs PRD logs)
- pino-text-level-transport - middleware transport for pino that transforms the "level" field into a string

## Project Creation Steps
1. ```mkdir client && mkdir server```
2. setup Node.js backend
    1. ```cd server && mkdir public/stylesheets && mkdir views/pages && mkdir views/partials```
    2. ```touch .env .dockerignore app.js Dockerfile```
    3. ```npm init -y```
    4. write basic Express app in app.js
    5. ```npm install express cors http-errors ejs bulma mongoose dotenv ytdl-core pino pino-text-level-transport uuid```
    6. ```npm install -D nodemon swagger-ui-express```
    7. add nodemon dev command - ```"dev": "nodemon app.js"``` (uses chokidar polling)
    8. write basic Node.js Dockerfile
    9. write basic EJS setup of pages and partials
    10. Pick a Docker Setup
        1. Docker Compose
            1. ```docker-compose up --build```
            2. ```docker-compose down```
        1. Docker commands
            1. ```docker build -t yt-alarm-node-server:1.0 .```
            2. ```docker run -d -p 3000:3000 --name yt-alarm-node-server-image yt-alarm-node-server:1.0```
    11. Write OpenAPI specification in swagger.json using [https://editor.swagger.io/]
3. setup React Native app

## References
Project Setup - https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
Setting up Swagger - https://levelup.gitconnected.com/how-to-add-swagger-ui-to-existing-node-js-and-express-js-project-2c8bad9364ce
Understanding OpenAPI - https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md
Setting up logging - https://blog.logrocket.com/logging-with-pino-and-asynclocalstorage-in-node-js/