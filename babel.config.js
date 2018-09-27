module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import']
};
