const commands = require('./command')
const commandHelp = require('./commandHelp')

class EventResponse {
  constructor({ text, channel, file, optionalObject }) {
    this.text = text
    this.channel = channel
    this.file = file
    this.optionalObject = optionalObject
    this.ts = Date.now()
  }
}

async function eventHandle(type, body) {
  switch (type) {
    case 'message':
      const { client_msg_id, text } = body
      if (client_msg_id) console.log(body)
      if (client_msg_id && text[0] === '!' && text[1] !== '!') {
        const [rawCmd, ...rawProps] = text.slice(1).split(' ')
        const cmd = rawCmd.toLowerCase()

        const { user, channel } = body 
        if (cmd === 'help' || cmd === '') {
          return new EventResponse({
            text: Object.keys(commands).map(key => `- ${key}${commandHelp[key] ? ` \`${commandHelp[key]}\`` : '' }`).join('\n'),
            channel,
          })
        } else if (!commands[cmd]) {
          return new EventResponse({
            text: `<@${user}>, 這個指令看不懂 [${cmd}]`,
            channel,
          })
        } else {
          const fn = commands[cmd]
          const text = await fn(user, rawProps)

          if (typeof text === 'object' && text) {
            const { text: objText, file, ...optionalObject } = text
            return new EventResponse({
              channel,
              text: objText,
              file,
              optionalObject,
            })
          }

          return new EventResponse({
            text,
            channel,
          })
        }
      }
      return new EventResponse({ text: null })
    default:
      return new EventResponse({ text: null })
  }
}

module.exports = {
  eventHandle,
}
