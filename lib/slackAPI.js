const Axios = require('axios').default

const sendMessage = (channel, text, attachments) => {
  return Axios.post(process.env.SLACK_POST_MESSAGE_API, {
    text,
    attachments,
    channel,
  }, {
    headers: {
      Authorization: `Bearer ${process.env.BOT_USER_OAUTH_ACCESS_TOKEN}`,
    }
  })
}

module.exports = {
  sendMessage,
}
