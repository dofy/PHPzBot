const config = require('./libs/config');
const douban = require('./libs/douban');
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

bot.on('text', async ({reply, me, message, from, chat}) => {
  let text = message.text;
  let chat_type = chat.type;
  let msg_type = message.entities ? message.entities[0].type : 'text';
  let inGroup = false;
  console.log(msg_type, chat_type, text);
  let result = '';
  switch (chat_type) {
    case 'supergroup':
    case 'group':
      inGroup = true;
      result += `@${from.username}\n`;
      break;
    case 'private':
    default:
      inGroup = false;
      break;
  }
  switch (msg_type) {
    case 'bot_command':
      let cmd = text.match(/\/([^@\s]+)/)[1];
      let params = text.split(/\s+/);
      switch (cmd) {
        case 'start':
          result += '`start` command...';
          break;
        case 'kill':
          result += '`kill` command...';
          break;
        case 'isbn':
          let name = params[1];
          let book = await douban.isbn(name);
          result += book.title;
          break;
        default:
          result += 'unknown command...';
          break;
      }
      break;
    case 'text':
      result += `\`echo\` _${text}_`;
    default:
      break;
  }
  reply(result, {
    parse_mode: 'Markdown'
  });
});

bot.startWebhook(route, null, config.port);
