import * as SwaggerConfig from './';

describe('SwaggerConfig', () => {
  it('should have exports', () => {
    expect(typeof SwaggerConfig).toBe('object');
  });

  it('should not have undefined exports', () => {
    Object.keys(SwaggerConfig).forEach((exportKey) =>
      expect(Boolean(SwaggerConfig[exportKey])).toBe(true),
    );
  });
});
