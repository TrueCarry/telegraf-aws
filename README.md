### Telegraf-aws

Small lib to ease use of AWS Lambda with Telegraf in webhook mode

### Example

Small example of serverless Telegraf bot:

```js
import Telegraf from 'telegraf'
import telegrafAws from 'telegraf-aws'

const bot = new Telegraf(process.env.BOT_TOKEN, {
  webhookReply: true
})
const updateHandler = telegrafAws(bot, {
  timeout: 1000 // Optional parameter, after timeout, empty response will be sent to AWS and function execution will be stopped
})

bot.telegram.setWebhook(process.env.BOT_WEBHOOK_URL)

bot.command('help', (ctx) => ctx.reply('Try send a sticker!'))
bot.hears('hi', (ctx) => {
  ctx.reply('Hey there!')
})
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy!'))
bot.on('sticker', (ctx) => ctx.reply('👍'))

export const hello = async (event, context, callback) => {
  updateHandler(event, callback)
}
```