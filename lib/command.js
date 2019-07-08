function hi(user) {
  return `Hello <@${user}>! Dolphin So Handsome.`
}

const WIFI_NAME = process.env.COMMAND_SETTING_WIFI_NAME
const WIFI_PWD = process.env.COMMAND_SETTING_WIFI_PASSWORD
function wifi() {
  return `Network Name: \`${WIFI_NAME}\`\nPassword: \`${WIFI_PWD}\``
}

const VPN_SWN = process.env.COMMAND_SETTING_VPN_SWN
const VPN_IP = process.env.COMMAND_SETTING_VPN_IP
const VPN_PORT = process.env.COMMAND_SETTING_VPN_PORT
const VPN_ACCOUNT_PW = process.env.COMMAND_SETTING_VPN_ACCOUNT_PW
function vpn() {
  return `Software Name: \`${VPN_SWN}\`\nIP: \`${VPN_IP}\`\nPort: \`${VPN_PORT}\`\nACCOUNT/PW: \`${VPN_ACCOUNT_PW}\``
}

const TAXID = process.env.COMMAND_SETTING_TAXID
function taxid() {
  return `TAX ID Number: \`${TAXID}\``
}

function dolphin() {
  const attachments = [
    {
      fallback: "Dolphin So Handsome",
      title: "Dolphin So Handsome",
      callback_id: "comic_1234_xyz",
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
    res: '',
    attachments,
  }
}

module.exports = {
  hi,
  wifi,
  vpn,
  taxid,
  dolphin,
}