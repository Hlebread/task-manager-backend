import * as AppConfig from './';

describe('AppConfig', () => {
  it('should have exports', () => {
    expect(typeof AppConfig).toBe('object');
  });

  it('should not have undefined exports', () => {
    Object.keys(AppConfig).forEach((exportKey) => expect(Boolean(AppConfig[exportKey])).toBe(true));
  });
});
