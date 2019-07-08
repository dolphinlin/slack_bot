const commands = require('./command')

class EventResponse {
  constructor({ res, channel, attachments }) {
    this.res = res
    this.channel = channel
    this.attachments = attachments
    this.ts = Date.now()
  }
}

function eventHandle(type, body) {
  switch (type) {
    case 'message':
      const { client_msg_id, text } = body
      if (client_msg_id) console.log(body)
      if (client_msg_id && text[0] === '!' && text[1] !== '!') {
        const [rawCmd] = text.slice(1).split(' ')
        const cmd = rawCmd.toLowerCase()

        const { user, channel } = body 
        if (cmd === 'help' || cmd === '') {
          return new EventResponse({
            res: Object.keys(commands).map(key => `- ${key}`).join('\n'),
            channel,
          })
        } else if (!commands[cmd]) {
          return new EventResponse({
            res: `<@${user}>, 這個指令看不懂 [${cmd}]`,
            channel,
          })
        } else {
          const fn = commands[cmd]
          const result = fn(user)
          let res = result
          let attachments = null
          if (typeof result === 'object') {
            attachments = result.attachments
            res = result.res
          }

          console.log({ res, attachments })

          return new EventResponse({
            res,
            attachments,
            channel,
          })
        }
      }
      return new EventResponse({ res: null })
    default:
      return new EventResponse({ res: null })
  }
}

module.exports = {
  eventHandle,
}
