const { utility } = require("../helpers");
const {
  esConfig: { esClient }
} = require("../config");

esClient.ping(err => {
  if (err) {
    console.log("ES Cluster is down", err);
  } else {
    console.log("ES Cluster is up!");
  }
});

utility
  .resetIndex()
  .then(() => console.log("Data loaded!"))
  .catch(console.log);
