/**
 * Used to extract certain important variables from the context and config that
 * semantic-release passes us
 */
module.exports = (pluginConfig, { env }) => ({
  feishuWebhookUrl: env.FEISHU_WEBHOOK_URL || null,
});
