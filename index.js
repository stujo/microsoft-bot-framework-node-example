require('dotenv').config();

var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
  console.log('%s listening to %s', server.name, server.url); // eslint-disable-line
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
var intents = new builder.IntentDialog();
bot.dialog('/', intents);

intents.matches(/^change name/i, [
  function(session) {
    session.beginDialog('/profile');
  },
  function(session, _results) {
    session.send('Ok... Changed your name to %s', session.userData.name);
  }
]);

intents.onDefault([
  function(session, args, next) {
    if (!session.userData.name) {
      session.beginDialog('/profile');
    } else {
      next();
    }
  },
  function(session, _results) {
    session.send('Hello %s!', session.userData.name);
  }
]);

bot.dialog('/profile', [
  function(session) {
    builder.Prompts.text(session, 'Hi! What is your name?');
  },
  function(session, results) {
    session.userData.name = results.response;
    session.endDialog();
  }
]);
