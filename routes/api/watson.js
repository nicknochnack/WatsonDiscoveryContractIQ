const express = require("express");
const router = express.Router();

const DiscoveryV2 = require("ibm-watson/discovery/v2");
const { IamAuthenticator } = require("ibm-watson/auth");
const config = require("config");
const discoveryURI = config.get("discoveryURI");
const discoveryAPIKey = config.get("discoveryAPIKey");

const discovery = new DiscoveryV2({
  version: "2020-08-30",
  authenticator: new IamAuthenticator({
    apikey: discoveryAPIKey,
  }),
  serviceUrl: discoveryURI,
});

router.get("/base", (req, res) => {
  res.send("Got to the API.");
});

router.post("/query", (req, res) => {
  const params = {
    projectId: "e9569df1-c407-44a8-9873-a5ee91bfcd9b",
    naturalLanguageQuery: req.body.query,
  };

  discovery
    .query(params)
    .then((response) => {
      console.log(response);
      res.json(response.result);
    })
    .catch((err) => {
      res.status(500).send(`An error occured: ${err}`);
    });
});

module.exports = router;
