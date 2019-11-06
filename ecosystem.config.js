module.exports = {
  apps: [
    {
      name: 'next-project',
      script: 'dest-server/server/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
