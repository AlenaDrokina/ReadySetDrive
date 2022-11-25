## Road To Travel

# About
This app is way to share and plan roadtrips with others. You can record your past roadtrips and save them to look back on later. You can also see what roadtrips others have taken to help plan your next journey.

# Setup

# Dependencies
Run npm install in project directory. This will install server-related dependencies such as express.
cd client and run npm install. This will install client dependencies (React).

# Database Prep
Access MySQL in your terminal and create a new database called roadtrip.
Add a .env file to the project folder of this repository containing the MySQL authentification
This app uses Open Cage API. Go to https://opencagedata.com/ and create accoun to get an API key and copy it to your .env file.

  DB_HOST=localhost
  DB_USER=root
  DB_NAME=roadtrip
  DB_PASS=YOURPASSWORD
  SECRET_KEY=A_STRING
  OCD_API_KEY=YOUROPENCAGEAPIKEY

Run npm run migrate in your terminal

# Development
Run npm start in project directory to start the Express server on port 500
In another terminal, cd client and run npm start to start the client in development mode with hot reloading in port 3000.

# Database Design

# User Flow Diagram

#  Full stack architecture drawing


 _This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
