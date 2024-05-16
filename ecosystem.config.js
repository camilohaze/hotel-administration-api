module.exports = {
  apps: [
    {
      name: 'api',
      namespace: 'hotel-administration',
      script: '/dist/main.js',
      watch: false,
      env: {
        NODE_ENV: 'development',
        NODE_PORT: 3000,
      },
      env_test: {
        NODE_ENV: 'test',
        NODE_PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        NODE_PORT: 3000,
      },
    },
  ],
};
