module.exports = {
  EMISSINGfeishuWebhookUrl: () => ({
    message: 'Missing feishu Webhook Url',
    details: `A feishu webhook URL is required to post updates to a channel. Ensure you have the environment variable FEISHU_WEBHOOK_URL set appropriately and try again`,
  }),
};
