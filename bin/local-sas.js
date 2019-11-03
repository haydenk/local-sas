#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));
const config = require("../config");

const port = argv.p || config.port;
const host = argv.h || config.host;

if (argv.v) {
  process.env.DEBUG_LEVEL = argv.v;
  process.env.DEBUG = config.appName + "*";
}

const logger = require("../lib/logger")("local-sas");
const Server = require("../lib/server");

function showHelp() {
  console.log(`local-sas [-p 23009] [-h 127.0.0.1] [-v verbose] username
  -p  (Optional) Port number - defaults to 23009
  
  -h  (Optional) Host address - defaults to 0.0.0.0
  
  -v  (Optional) Verbosity - choose from log, error, warn, debug, info, verbose
  
  -x (Optional) Show the Web.config XML entry
  username (Required) 
  
      `);
}

function showXml(url) {
  console.log(`
<authenticationManager enabled="true" 
    ignoreInvalidSSL="true" 
    pointSolutionName="Anything You like e.g. MSS Portal v3" 
    redirectNonSecure="false" 
    authenticationServiceURL="${url}" 
    localCachePeriod="5"
    inactivityTimeout="30">
    <authenticationMethods>
      <add name="Dev" />
      <add name="RSA" />
      <add name="GlobalPass" />
    </authenticationMethods>
</authenticationManager>`);
}

if (isNaN(port)) {
  showHelp();
  process.exit(-1);
}

if (!argv._.length) {
  showHelp();
  process.exit(-1);
}

username = argv._[0];
const server = new Server(host, port, username);

const url = `http://${host}:${port}`;

if(argv.h){
    showHelp();
    return;
}

if(argv.x){
    showXml(url);
    return;
}

server.start().then(() => {
  console.log(`Listening on ${url} as ${username}`);
});
