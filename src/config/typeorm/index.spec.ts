import * as TypeOrmConfig from './';

describe('TypeOrmConfig', () => {
  it('should have exports', () => {
    expect(typeof TypeOrmConfig).toBe('object');
  });

  it('should not have undefined exports', () => {
    Object.keys(TypeOrmConfig).forEach((exportKey) =>
      expect(Boolean(TypeOrmConfig[exportKey])).toBe(true),
    );
  });
});
