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

### Server
You need to have NodeJs installed first

You should have OpenAI API KEY first
```
cd server
touch .env
```
Put you API inside
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
