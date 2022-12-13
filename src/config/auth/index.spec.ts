import * as AuthConfig from './';

describe('AuthConfig', () => {
  it('should have exports', () => {
    expect(typeof AuthConfig).toBe('object');
  });

  it('should not have undefined exports', () => {
    Object.keys(AuthConfig).forEach((exportKey) =>
      expect(Boolean(AuthConfig[exportKey])).toBe(true),
    );
  });
});
