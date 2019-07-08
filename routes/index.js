const Router = require('koa-router')

const router = new Router()

const { eventHandle } = require('../lib/bot')
const { sendMessage } = require('../lib/slackAPI')

router.get('/', async (ctx, next) => {
  ctx.body = {
    success: true,
  }
})

router.post('/action-endpoint', async (ctx, next) => {
  ctx.status = 200

  console.log(ctx.request.body)

  return next()
})

router.post('/endpoint', async (ctx, next) => {
  const { type } = ctx.request.body

  ctx.status = 200

  switch (type) {
    case 'url_verification':
      const { challenge } = ctx.request.body
      ctx.body = {
        challenge,
      }
      break
    case 'interactive_message':
      console.log(ctx.request.body.actions)
      break
    case 'event_callback':
      const { event } = ctx.request.body
      const { res, channel, attachments } = eventHandle(event.type, event)
      if (res !== null || res !== undefined) {
        const result = await sendMessage(channel, res, attachments)

        ctx.body = {
          success: true,
          ts: Date.now(),
        }
      }
      break
    default:
      console.log(`unknown request type: ${type}`, ctx.request.body)
      ctx.body = ctx.req
      break
  }

  return next()
})

module.exports = router
