if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  PORT: process.env.APP_PORT,
  ES_PORT: process.env.ELASTICSEARCH_PORT,
  ES_HOST: process.env.ELASTICSEARCH_HOST,
  ES_INDEX: process.env.ELASTICSEARCH_INDEX,
  ES_TYPE: process.env.ELASTICSEARCH_TYPE
};
