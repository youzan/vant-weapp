module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: 'commonjs'
      }
    ]
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import'
  ]
};
