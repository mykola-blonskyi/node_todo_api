const env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){
  const conf = require('./config.json');
  const envConf = conf[env];

  Object.keys(envConf).forEach((key) => process.env[key] = envConf[key]);
}