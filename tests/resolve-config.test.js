const resolveConfig = require('../src/resolve-config');

describe('resolve-config', () => {
  test('gets feishu webhook url from the env passed in', () => {
    const { feishuWebhookUrl } = resolveConfig(
      {},
      {
        env: {
          FEISHU_WEBHOOK_URL: 'https://open.feishu.cn/open-apis/bot/v2/hook/',
        },
      },
    );
    expect(feishuWebhookUrl).toMatch('https://open.feishu.cn/open-apis/bot/v2/hook/');
  });

  test('retuns null if no environment variable provided', () => {
    const { feishuWebhookUrl } = resolveConfig(
      {},
      {
        env: {},
      },
    );
    expect(feishuWebhookUrl).toBe(null);
  });
});
