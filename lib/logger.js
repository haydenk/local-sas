"use strict";

const config = require("../config");

function DebugLogger(name) {
  const namespace = config.appName + ":" + name;
  const debug = require("debug-levels")(namespace);

  const nullLogger = function() {};
  debug.verbose(`created logger ${namespace}`);
  return {
    sql: nullLogger,
    debug: debug.debug,
    log: debug.debug,
    error: debug.error,
    info: debug.info,
    warn: debug.warn,
    verbose: debug.verbose,
    fullPath: function() {
      return namespace;
    }
  };
}

module.exports = DebugLogger;
