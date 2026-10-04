const logger = {
  log(level, message, metadata) {
    const logData = {
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata,
    };

    console.log(logData);
  },

  error(message, metadata) {
    this.log("error", message, metadata);
  },

  info(message, metadata) {
    this.log("info", message, metadata);
  },

  debug(message, metadata) {
    this.log("debug", message, metadata);
  },
};

module.exports = logger;
