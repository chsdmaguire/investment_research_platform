module.exports = {
  apps: [
    {
      name: 'flibyrd-nuxt',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start --hostname "0.0.0.0 --port 3000"'
    }
  ]
}
