# Getting Started with Employee Management System

This project was built using MERN stack. 

## Database

It uses Mongo DB for database which is hosted on the Atlas.

## Backend

The backend is written with Node JS stapped with Express JS to deliver API's which will be hosetd at http://localhost:5000/ .

## Frontend

The frontend uses React JS along with Material UI for premade responsive component which is wrapped with Redux and uses Redux Saga as the redux middleware along with Redux logger for developement mode.The frontend would be hosted at http://localhost:3000/ .

## To Get Started

In order to get started run these commands once you clone the repo and enter the root directory of the project.

### `npm run dev-install`

after the package installation for frontend and backend is complete, run

### `npm run dev`

Once everything builds up the browser would automatically open up incase if it does not verify that everything is working as needed and visit http://localhost:3000 in your browser.


### Known Issues

- FCM Tokens for push notifications are generated only on Chrome.
- Frontend's service to listen to push notifcations are not triggered.
