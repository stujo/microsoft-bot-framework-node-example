# Creating a Node.js powered Bot with the Microsoft Bot Framework


## Setup Your Developer ENV

* I like to use ``yarn`` instead of ``npm`` for package management:
  * https://yarnpkg.com/lang/en/docs/install/#mac-tab
  * ``yarn`` is not required, just use ``npm install --save`` instead of ``yarn add``

```
$ mkdir [YOUR_BOT_NAME]
$ git init
$ npm init
$ yarn add dotenv
$ yarn add --dev nodemon
$ touch .env
$ echo ".env" >> .gitignore
$ echo "node_modules" >> .gitignore
```

## Register Your Bot
* Create a Microsoft Account (if necessary)
* https://dev.botframework.com/bots/new
* Create Microsoft App Name, ID and password (copy to clipboard)
* Customize and Add the following to your ``.env`` file
```
MICROSOFT_BOT_APP_PASSWORD=[PASSWORD]
MICROSOFT_BOT_APP_ID=[YOUR_BOT_ID]
MICROSOFT_BOT_APP_NAME=[YOUR_BOT_NAME]
```

## Create The Bot Code

```
$ yarn add botbuilder
$ yarn add restify
```

```javascript
require('dotenv').config()

var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_BOT_APP_ID,
    appPassword: process.env.MICROSOFT_BOT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/v1/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    session.send("Hello World from " + process.env.MICROSOFT_BOT_APP_NAME);
});
```

## Update ``package.json``

* Add ``dev`` and ``start`` scripts

```json
{
  "name": "[YOUR_BOT_NAME]",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "botbuilder": "^3.6.0",
    "dotenv": "^4.0.0",
    "restify": "^4.3.0"
  },
  "devDependencies": {
    "nodemon": "^1.11.0"
  }
}
```

## Start the Local Bot

```bash
$ npm run dev
```

```
> stujo-bot@1.0.0 start /work/bots/microsoft/stujo-bot
> node index.js

restify listening to http://[::]:3978
```

## Test the Local Bot with an Emulator

* Leave the local server running
* Open a separate Terminal Session
* Download the Emulator (built on electron)

* Option 1 : Full Experience

```
$ git clone git@github.com:Microsoft/BotFramework-Emulator.git
$ cd BotFramework-Emulator/
$ yarn install
$ npm run build
$ npm start
```

* Option 2 : Follow These Instructions
  * https://github.com/Microsoft/BotFramework-Emulator#download


* Connect to our local bot

* Type http://localhost:3978/v1/api/messages for the endpoint URL
* Add the App Id and password in the Connection Box
* Click Connect

## Emulator Errors

### ``ERROR: ChatConnector: receive - no security token sent.``

* Add or check that the App Id and Password are specified

## Check In

```
$ git add .
$ git commit -m'Initial Bot Template'
```


## Resources

* https://docs.botframework.com/
* https://docs.botframework.com/en-us/node/builder/overview/#navtitle
