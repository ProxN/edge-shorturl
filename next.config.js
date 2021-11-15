// /* eslint-disable */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = (phase) => {
  const IS_DEV = phase === PHASE_DEVELOPMENT_SERVER;
  const IS_PROD =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  const API_URL = process.env.API_URL;
  const env = {
    API_URL,
    IS_DEV,
    IS_PROD,
    SUPABASE_URL: 'https://lpncyakijylejavahisz.supabase.co',
    SUPABASE_ANON_KEY:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjk5MTQwOCwiZXhwIjoxOTUyNTY3NDA4fQ.7esbqTMUd1YxrU5nMU2yJaSWSsCzKiJ6JN40rghCjuA',
  };

  return {
    env,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      config.resolve.alias = {
        ...config.resolve.alias,
        '@xstyled/util': '@xstyled/util/dist/index.js',
        '@xstyled/core': '@xstyled/core/dist/index.js',
        '@xstyled/system': '@xstyled/system/dist/index.js',
        '@xstyled/styled-components':
          '@xstyled/styled-components/dist/index.js',
      };

      return config;
    },
  };
};
