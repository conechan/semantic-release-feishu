/**
 * Object sent to feishu hook when sending a message
 * @param {String} text the content of the message
 */
module.exports = (text) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    msg_type: 'interactive',
    card: {
      elements: [
        {
          tag: 'div',
          text: {
            tag: 'lark_md',
            content: text,
          },
        },
      ],
    },
  }),
});
