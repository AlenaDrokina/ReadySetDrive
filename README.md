# Ready Set Drive

## About
This app is way to share and plan roadtrips with others. You can record your past roadtrips and save them to look back on later. You can also see what roadtrips others have taken to help plan your next journey.

## Setup

## Dependencies
Run npm install in project directory to install server-related dependencies.
cd client and run npm instal to install client dependencies.

## Database Prep
Run MySQL in your terminal and create a new database called roadtrip.
Add a .env file to the project folder of this repository containing the MySQL authentification


  DB_HOST=localhost
  DB_USER=root
  DB_NAME=roadtrip
  DB_PASS=YOURPASSWORD

This app uses Open Cage API. Go to https://opencagedata.com/ and create an account to get an API key. Create a new .env file in the client folder and store there.
  OCD_API_KEY=YOUROPENCAGEAPIKEY

## Development
Run npm run migrate in your terminal.
Run npm start in project directory to start the Express server.
In another terminal, cd client and run npm start.

## Database Design
![DB](/images/schema.png)
## User Flow Diagram
![UserFlow](/images/userflow.png)


## Demo


https://user-images.githubusercontent.com/110820603/206408585-03f7396e-8421-430d-8127-1d9ea2a65eb3.mp4


 _This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
