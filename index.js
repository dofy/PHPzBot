const config = require('./libs/config.js');
const TelegramBot = require('node-telegram-bot-api');
const Telegraf = require('telegraf');
//const express = require('express');
//const bodyParser = require('body-parser');

const route = `/phpzbot${config.token}`;

const bot = new Telegraf(config.token);

bot.telegram.setWebhook(`${config.url}${route}`);

/*
const app = express();

app.use(bodyParser.json());

app.post(route, (req, res) => {
  console.log(req.body);
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.all('/*', (req, res) => {
  console.log('404');
  res.sendStatus(404);
});

app.listen(config.port, () => {
  console.log(`PHPzBot is listening on ${config.port}`);
});
*/

bot.startWebhook(route, null, config.port);

bot.on('text', ({ reply }) => reply('666...'));
