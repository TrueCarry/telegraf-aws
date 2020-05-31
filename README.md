### Telegraf-aws

Small lib to ease use of AWS Lambda with Telegraf in webhook mode

### Example

Small example of serverless Telegraf bot:

```js
import Telegraf from 'telegraf'
import telegrafAws from 'telegraf-aws'

// Create telegraf instance for handle updates
const bot = new Telegraf(process.env.BOT_TOKEN, {
  webhookReply: true
})

// Create webhook handler
const updateHandler = telegrafAws(bot, {
  timeout: 1000 // Optional parameter, after timeout, empty response will be sent to AWS and function execution will be stopped
})

// Optional - set webhook url on start
bot.telegram.setWebhook(process.env.BOT_WEBHOOK_URL)

// Register bot commands
bot.command('help', ctx => ctx.reply('Try send a sticker!'))
bot.hears('hi', ctx => {
  ctx.reply('Hey there!')
})
bot.hears(/buy/i, ctx => ctx.reply('Buy-buy!'))
bot.on('sticker', ctx => ctx.reply('👍'))

// Now use hello as your lambda function and done!
export const hello = updateHandler
```
