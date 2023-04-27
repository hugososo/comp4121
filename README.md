# comp4121
MyPhoneCase

## Installation and Run

### Client
You need to have NodeJs installed first

```
cd client
npm i
npm install react-router-dom
npm run dev
```

### Database
You need to have MySQL installed first

Once you have MySQL installed, you need to create a database named COMP4121

Then import the database schema from the file **COMP4121_localhost-(timestamp)-dump.sql** in the **data** folder

### Server
You need to have NodeJs installed first

You should have OpenAI API KEY first
```
cd server
touch .env
```

Add the following entries to the newly created .env and Put your OpenAI API Key inside the OPENAI_API_KEY field:
```
NODE_ENV=development
PORT=8080

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=COMP4121

# OpenAI
OPENAI_API_KEY=PUT YOUR OPENAI API KEY HERE
```

Then run the following commands to start the server
```
cd server
npm i
npm run start
```

changelog

fixed quicklink covering customize and "go to customize" button having no links

----------------

Added

WebHome.jsx  
BrowseLatest.jsx+css  
QuickLinks.jsx+css  
CustomizeNow.jsx+css  
Navbar.jsx+css  
2 images  

changed previous App.jsx to App_From_Original.jsx

codes in previous files unchanged

----------------

ChangeLog 26/4/2023

Fixed styling of the navbar and quicklinks

Added Link to the catalog page in home and header

Added concurrently to run both client and server at the same time

First install concurrently in the **server** folder with the following command
```
npm install concurrently
```

Then Use the following command in the **server** folder to run both client and server at the same time
```
npm run both
```

You may also run them separately with the exsisiting commands
```
npm start       #server
npm run dev     #client
```
----------------
