var winston = Npm.require('winston');
logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)()
  ]
});
logger.level = process.env.NODE_ENV === "development" ? "debug" : "info";