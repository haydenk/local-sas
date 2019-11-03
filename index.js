const logger = require("./lib/logger")("/");
const Server = require("./lib/server");
const config = require("./config");

logger.verbose(config);

const sas = new Server(config.host, config.port, "shyamala");

sas
  .start()
  .then(() => {
    logger.info("started");
  })
  .catch(err => {
    logger.error(err);
    process.exit(-1);
  });
