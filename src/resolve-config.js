/**
 * Used to extract certain important variables from the context and config that
 * semantic-release passes us
 */
module.exports = (pluginConfig, { env }) => ({
  wxworkWebhookUrl: env.WXWORK_WEBHOOK_URL || null,
});
