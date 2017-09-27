const config = require('./libs/config.js');
const TelegramBot = require('node-telegram-bot-api');
const Telegraf = require('telegraf');

const route = `/phpzbot${config.token}`;

const bot = new Telegraf(config.token);

bot.use((ctx, next) => {
  console.log(ctx.message);
  next(ctx);
});

bot.startWebhook(route, null, config.port);

bot.on('text', ctx => {
  ctx.reply(`>>> ${ctx.message.chat.type}:${ctx.message.chat.username}`);
});
