const fetch = require('node-fetch');
const emoji = require('node-emoji');
const debug = require('debug')('semantic-release-feishu:success');
// eslint-disable-next-line import/no-dynamic-require
const { pkg } = require('read-pkg-up').sync();
const getPlatformEmoji = require('./get-platform-emoji');
const payload = require('./definitions/payload');

/**
 * A lifecycle method for publishing to feishu when a successful release occurs
 */
module.exports = async (pluginConfig, context) => {
  const { env, nextRelease, releases, logger, commits } = context;
  let githubReleaseNotesUrl = '';
  debug(`The options provided are ${JSON.stringify(pluginConfig, null, 2)}`);

  // Options passed by the user
  const { skipCommit, fullReleaseNotes = true } = pluginConfig;
  // Types of changes to post for
  const semverFilter = pluginConfig.semverFilter || ['major', 'minor', 'patch'];
  // Check to see if the filter matches any types
  const semverFilterIncludesType = semverFilter.includes(nextRelease.type);
  // Skip posting if the skip commit is provided
  const hasSkipCommit =
    skipCommit &&
    commits.some((commit) => {
      return commit.subject.match(new RegExp(skipCommit));
    });
  debug(`hasSkipCommit=${hasSkipCommit}`);
  if (hasSkipCommit) {
    logger.log('Skipping posting feishu message due to matching "skipCommit" commit message');
    return;
  }
  debug(`semverFilterIncludesType=${semverFilterIncludesType}`);
  if (!semverFilterIncludesType) {
    logger.log(
      `Skipping posting feishu message due to semverFilter not containing a matching "${
        nextRelease.type
      }" item.`,
    );
    return;
  }
  // Format the output with the consumable platforms
  const consumablePlatforms = pluginConfig.platforms
    ? `The release is available on the following platforms:\n ${pluginConfig.platforms
        .map((platform) => {
          debug(`Getting emoji for platform ${platform}`);
          return `${getPlatformEmoji(platform)} ${platform}`;
        })
        .join('\n')}`
    : '';

  releases.forEach((release) => {
    // We want to grab the info from the github or gitlab plugin
    if (/(github|gitlab)/.test(release.pluginName)) {
      // Sanitize the output of the release notes so it looks nice in feishu
      githubReleaseNotesUrl = fullReleaseNotes
        ? release.notes
        : `${emoji.get('spiral_note_pad')} Release Notes: ${release.url}`;
    }
  });

  const feishuMessage = `*${pkg.name}:* \`${nextRelease.version}\` is now available! ${emoji.get(
    'tada',
  )}\n
${githubReleaseNotesUrl}
${consumablePlatforms}`;

  debug(`The message to post to feishu is ${feishuMessage}`);
  debug(`The feishu webhook is ${env.FEISHU_WEBHOOK_URL}`);
  logger.log('Posting release message to feishu');
  await fetch(env.FEISHU_WEBHOOK_URL, payload(feishuMessage));
};
