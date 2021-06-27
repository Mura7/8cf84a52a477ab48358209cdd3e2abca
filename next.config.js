const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    domains: ['teknasyon-mailling.s3.eu-central-1.amazonaws.com'],
  }
};
