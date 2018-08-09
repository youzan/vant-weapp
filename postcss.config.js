module.exports = {
  plugins: {
    'postcss-easy-import': {
      extensions: ['.wxss', '.css', '.pcss']
    },
    'precss': {},
    'postcss-calc': {},
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    }
  }
};
