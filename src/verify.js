const AggregateError = require('aggregate-error');
const debug = require('debug')('semantic-release-wxwork:verify');
const resolveConfig = require('./resolve-config');
const getError = require('./get-error');

/**
 * A method to verify that the user has given us a wxwork webhook url to post to
 */
module.exports = async (pluginConfig, context) => {
  const { logger } = context;
  const errors = [];
  const { wxworkWebhookUrl } = resolveConfig(pluginConfig, context);
  // Validates we have a webhook
  debug(
    'Validating WXWORK_WEBHOOK_URL exists in the environment and includes https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=',
  );
  if (
    wxworkWebhookUrl !== null &&
    wxworkWebhookUrl.includes('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=')
  ) {
    logger.log('Verify Wxwork Webhook Url Provided');
  } else {
    // Pushes an error if we are not provided a proper webhook
    debug('WXWORK_WEBHOOK_URL failed validation, see error message for more details');
    errors.push(getError('EMISSINGWXWORKWEBHOOKURL', {}));
  }

  /**
   * Validate if we have fullReleaseNotes passed in, otherwise default to false
   */
  // this not worked
  // debug('Validating if fullReleaseNotes is set.');
  // if (pluginConfig.fullReleaseNotes === undefined) {
  //   debug('fullReleaseNotes not set, setting it to true');
  //   // eslint-disable-next-line no-param-reassign
  //   pluginConfig.fullReleaseNotes = true;
  // }

  /**
   * Validate if we have fullReleaseNotes passed in, otherwise default to false
   */
  // this not worked
  // debug('Validating if failureMessage is set.');
  // if (pluginConfig.failureMessage === undefined) {
  //   debug('failureMessage not set, setting it to false');
  //   // eslint-disable-next-line no-param-reassign
  //   pluginConfig.failureMessage = false;
  // }

  // Throw any errors we accumulated during the validation
  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
};
