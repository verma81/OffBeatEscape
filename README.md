## OffbeatEscape

## setup 
step1: create a `.env` file andfile and put the following into it:

```
NODE_ENV=development
DB_STRING=<database string>
```

step2: generate a public/private keypair.

```
node generateKeypair.js

```
step 3: install all dependencies in the root folder and the client folder

```
npm install

```
```
cd client
npm install

```
step 4: run both the client application and the backend server.

Start the server (http://localhost:3000):

```
nodemon app.js

```
Start the client application (http://localhost:4200):

```
cd client 
ng serve
```