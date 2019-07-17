const Router = require('koa-router')
const Axios = require('axios').default

const router = new Router()

const { eventHandle } = require('../lib/bot')
const { sendMessage, openDialog, uploadFile } = require('../lib/slackAPI')

router.get('/', async (ctx, next) => {
  ctx.body = {
    success: true,
  }
})

router.post('/action-endpoint', async (ctx, next) => {
  ctx.status = 200

  const { payload } = ctx.request.body
  const payloadObj = JSON.parse(payload)

  console.log(payloadObj)

  const { trigger_id, type } = payloadObj

  switch (type) {
    case 'interactive_message':
      openDialog(trigger_id, {
        callback_id: 'ryde-46e2b0',
        title: 'Request a Ride',
        submit_label: 'Request',
        state: 'Limo',
        elements: [
          {
            type: 'text',
            label: 'Pickup Location',
            name: 'loc_origin'
          },
          {
            type: 'text',
            label: 'Dropoff Location',
            name: 'loc_destination'
          }
        ]
      })
      break
    case 'dialog_submission':
    default:
      const { response_url } = payloadObj
      Axios.post(response_url, {
        replace_original: 'true',
        text: `Thanks for your request, we'll process it and get back to you.`,
      })

      // must be responsed empty body.
      ctx.body = {}
      break
  }

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
      ctx.body = {
        success: true,
        ts: Date.now(),
      }
      const { event } = ctx.request.body
      eventHandle(event.type, event).then(async ({ text, file, channel, optionalObject }) => {
        if (text !== null && text !== undefined) {
          sendMessage(channel, text, optionalObject).catch(err => {
            console.error(err)
          })
        }
        if (file !== null && file !== undefined) {
          const { content, comment, filetype, filename } = file;
          uploadFile(channel, content, comment, filetype, filename).catch(err => {
            console.error(err)
          })
        }
      })
      break
    default:
      console.log(`unknown request type: ${type}`, ctx.request.body)
      ctx.body = ctx.req
      break
  }

  return next()
})

module.exports = router
