module.exports = {
  EMISSINGWXWORKWEBHOOKURL: () => ({
    message: 'Missing Wxwork Webhook Url',
    details: `A wxwork webhook URL is required to post updates to a channel. Ensure you have the environment variable WXWORK_WEBHOOK_URL set appropriately and try again`,
  }),
};
