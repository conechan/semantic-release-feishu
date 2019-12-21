/**
 * Object sent to wxwork hook when sending a message
 * @param {String} text the content of the message
 */
module.exports = (text) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    msgtype: 'markdown',
    markdown: {
      content: text,
    },
  }),
});
