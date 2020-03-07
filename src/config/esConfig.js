const { Client } = require("@elastic/elasticsearch");
const config = require("./config");
const client = new Client({
  node: `http://${config.ES_HOST}:${config.ES_PORT}`
});

module.exports = { esClient: client };
