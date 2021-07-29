const fetch = require('node-fetch');
const emoji = require('node-emoji');
// eslint-disable-next-line import/no-dynamic-require
const { pkg } = require('read-pkg-up').sync();
const payload = require('./definitions/payload');

/**
 * A lifecycle method for publishing to Feishu when a release fails
 */
module.exports = async (pluginConfig, context) => {
  const { env, logger } = context;
  const { failureMessage = false } = pluginConfig;

  if (!failureMessage) {
    return;
  }

  logger.log('Posting failure message to Feishu');
  await fetch(
    env.FEISHU_WEBHOOK_URL,
    payload(
      `${emoji.get(
        'x',
      )} A failure occurred when attempting a release. Please check the CI job for ${pkg.name}.`,
    ),
  );
};
