const config = require('./libs/config.js');
const TelegramBot = require('node-telegram-bot-api');
const Telegraf = require('telegraf');

const route = `/phpzbot${config.token}`;

const bot = new Telegraf(config.token, {
  username: config.username
});

bot.catch(err => {
  console.error(err);
})

bot.use((ctx, next) => {
  console.log(ctx.message);
  return next(ctx);
});

bot.on('text', ({reply, me, message, from, chat}) => {
  let text = message.text;
  let chat_type = chat.type;
  let msg_type = message.entities ? message.entities[0].type : 'text';
  console.log(msg_type, chat_type, text);
  reply(`from @${me} ${chat.type}:${chat.username || chat.title}`);
});

bot.startWebhook(route, null, config.port);
