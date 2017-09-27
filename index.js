const config = require('./libs/config.js');
const TelegramBot = require('node-telegram-bot-api');
const Telegraf = require('telegraf');

const route = `/phpzbot${config.token}`;

const bot = new Telegraf(config.token);

bot.catch(err => {
  console.error(err);
})

bot.use((ctx, next) => {
  console.log(ctx.message);
  return next(ctx);
});

bot.on('text', ({reply, me, message, from, chat}) => {
  let text = message.text;
  console.log(text);
  reply(`from@${me} ${chat.type}:${chat.username || chat.title}`);
});

bot.startWebhook(route, null, config.port);
