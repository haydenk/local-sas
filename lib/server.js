const logger = require("./logger")("server");
const express = require("express");
const bodyParser = require("body-parser");
const uuidv4 = require("uuid/v4");

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/*
public class AuthenticationRequest
    {
        public string RedirectUrl { get; set; }
        public string PointSolutionName { get; set; }
    }
*/

function SpoofSasServer(host, port, username) {
  logger.verbose(`new server on ${host}:${port} for user ${username}`);

  if (typeof username === "undefined") throw new Error("username is required");

  let server;
  let redirectUrl;
  const token = uuidv4();

  this.start = function() {
    return new Promise((resolve, reject) => {
      server = app.listen(port, host, () => {
        logger.info(`started listening ${host}:${port}`);
        resolve();
      });
    });
  };

  this.stop = function() {
    logger.debug("stopping");
    server.stop();
  };

  app.get("/Authentication", (req, res) => {
    const anyToken="001037205199018049140226149181221158100128187074241130168007242031210146173184007246064178022017190109085122103108208166087105204221160068031176";
    const url = `${redirectUrl}?redirectUrl=${redirectUrl}&authToken=${anyToken}`;
    logger.debug(req.originalUrl);
    logger.debug(redirectUrl);
    res.redirect(url);
  });

  app.get("/api/AuthenticationToken", (req, res) => {
    logger.debug(req.originalUrl);
    const json = {
      AuthenticationMethod: "Dev",
      Token: token,
      Username: username
    };
    res.status(200).json(json);
  });

  app.get("/Authentication/Logout", (req, res) => {
    logger.debug(req.originalUrl);
    res.send(`<p>Call to Logout for ${username}</p>`);
  });

  app.post("/api/AuthenticationRequest", (req, res) => {
    const authenticationRequest = req.body;

    if (
      !authenticationRequest.RedirectUrl ||
      typeof authenticationRequest.RedirectUrl === "undefined"
    ) {
      const error = "Expected RedirectUrl as part of request body";
      logger.error(error);
      logger.verbose(req.body);
      res.status(400).send(err);
      return;
    }
    redirectUrl = authenticationRequest.RedirectUrl;
    res.status(200).send({
      token: token
    });
  });

  app.use((req, res) => {
    logger.debug(`404 ${req.method}`, req.url);
    res.status(404).json("whatever");
  });
}

module.exports = SpoofSasServer;
