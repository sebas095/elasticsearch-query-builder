const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();

const {
  config: { PORT },
  esConfig: { esClient }
} = require("./config");
const router = require("./routes");

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors())
  .use(logger("dev"))
  .use(bodyParser.json())
  .use("/", router);

esClient.ping(err => {
  if (err) {
    console.log("ES Cluster is down", err);
  } else {
    console.log("ES Cluster is up!");
  }
});

app.listen(PORT, () => {
  console.log(`Express server listening on port, ${PORT}`);
});
