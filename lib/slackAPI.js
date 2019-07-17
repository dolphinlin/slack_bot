const Axios = require('axios').default
const qs = require('qs')

const { slack } = require('./path')

const sendMessage = (channel, text, optionalObj) => {
  return Axios.post(slack.SEND_MESSAGE, Object.assign({}, optionalObj, {
    text,
    channel,
  }), {
    headers: {
      Authorization: `Bearer ${process.env.BOT_USER_OAUTH_ACCESS_TOKEN}`,
    }
  })
}

const openDialog = (triggerId, dialog) => {
  return Axios.post(slack.OPEN_DIALOG, {
    dialog,
    trigger_id: triggerId,
  }, {
    headers: {
      Authorization: `Bearer ${process.env.BOT_USER_OAUTH_ACCESS_TOKEN}`,
    },
  })
}

const uploadFile = (channel, content, comment, filetype, filename) => {
  return Axios.post(slack.UPLOAD_FIELD, qs.stringify({
    channels: channel,
    comment,
    filename,
    filetype,
    content,
  }), {
    headers: {
      Authorization: `Bearer ${process.env.BOT_USER_OAUTH_ACCESS_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

module.exports = {
  sendMessage,
  openDialog,
  uploadFile,
}
