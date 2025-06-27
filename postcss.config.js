// postcss.config.js
module.exports = {
  plugins: {
    'postcss-replace': {
      rules: [
        {
          search: 'raw.githubusercontent.com',
          replace: 'hub.gitmirror.com'
        }
      ]
    }
  }
};