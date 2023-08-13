module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
        PORT: 5000
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 3000
      },
      instances: 3,
      max_memory_restart: "200M",
      out_file: "./logs/out.log",
      error_file: "./logs/err.log",
      combine_logs: true,
      time: true
    },
  ],
};
