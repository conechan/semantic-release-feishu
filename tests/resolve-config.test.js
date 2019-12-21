const resolveConfig = require('../src/resolve-config');

describe('resolve-config', () => {
  test('gets wxwork webhook url from the env passed in', () => {
    const { wxworkWebhookUrl } = resolveConfig(
      {},
      {
        env: {
          WXWORK_WEBHOOK_URL: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=',
        },
      },
    );
    expect(wxworkWebhookUrl).toMatch('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=');
  });

  test('retuns null if no environment variable provided', () => {
    const { wxworkWebhookUrl } = resolveConfig(
      {},
      {
        env: {},
      },
    );
    expect(wxworkWebhookUrl).toBe(null);
  });
});
