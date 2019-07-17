/**
 * @name functionParams
 * @param {String} user message sender. 
 * @param {Array} props command extra props.
 */

const esService = require('./esService')

async function hi(user) {
  return `Hello <@${user}>! Dolphin So Handsome.`
}

const WIFI_NAME = process.env.COMMAND_SETTING_WIFI_NAME
const WIFI_PWD = process.env.COMMAND_SETTING_WIFI_PASSWORD
async function wifi() {
  return `Network Name: \`${WIFI_NAME}\`\nPassword: \`${WIFI_PWD}\``
}

const VPN_SWN = process.env.COMMAND_SETTING_VPN_SWN
const VPN_IP = process.env.COMMAND_SETTING_VPN_IP
const VPN_PORT = process.env.COMMAND_SETTING_VPN_PORT
const VPN_ACCOUNT_PW = process.env.COMMAND_SETTING_VPN_ACCOUNT_PW
async function vpn() {
  return `Software Name: \`${VPN_SWN}\`\nIP: \`${VPN_IP}\`\nPort: \`${VPN_PORT}\`\nACCOUNT/PW: \`${VPN_ACCOUNT_PW}\``
}

const TAXID = process.env.COMMAND_SETTING_TAXID
async function taxid() {
  return `TAX ID Number: \`${TAXID}\``
}

async function dolphin(user) {
  const attachments = [
    {
      fallback: "Dolphin So Handsome",
      title: "Dolphin So Handsome",
      callback_id: `${user}-${Date.now()}`,
      color: "#3AA3E3",
      attachment_type: "default",
      actions: [
        {
          name: "yes",
          text: "Yes, he is!",
          type: "button",
          value: true
        }, {
          name: "eyes",
          text: "Extremely Yes",
          style: "danger",
          type: "button",
          value: false
        }
      ]
    }
  ]

  return {
    text: '',
    attachments,
  }
}

async function ev(user, props) {
  const [env, field, query] = props
  let client = null
  switch (env) {
    case 'prod':
      client = esService('prod')
      break
    case 'dev':
    default:
      client = esService('dev')
      break
  }

  switch(field) {
    case 'sidSeq':
      const result = await client.getSeqSid(query)

      return {
        file: {
          content: JSON.stringify(result, null, 4),
          filetype: 'javascript',
          filename: `sidSeq.${query}.json`,
        }
      }
    default:
      return `\`not yet support field: [${field}].\``
  }
}

module.exports = {
  hi,
  wifi,
  vpn,
  taxid,
  dolphin,
  ev,
}