require('dotenv').config();

var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_BOT_APP_ID,
  appPassword: process.env.MICROSOFT_BOT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/v1/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
  function(session) {
    builder.Prompts.text(session, 'Hi! What is your name?');
  },
  function(session, results) {
    session.send('Hello %s!', results.response);
  }
]);
