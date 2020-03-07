const {
  esConfig: { esClient },
  config: { ES_INDEX }
} = require("../config");

const esb = require("elastic-builder");

module.exports = {
  search: async () => {
    const requestBody = esb
      .requestBodySearch()
      .query(esb.matchAllQuery())
      .size(10)
      .from(1);
    return esClient.search({ index: ES_INDEX, body: requestBody.toJSON() });
  },

  filterCarsByYearMade: async param => {
    const requestBody = esb
      .requestBodySearch()
      .query(
        esb
          .boolQuery()
          .must(esb.matchAllQuery())
          .filter(
            esb
              .rangeQuery("Year")
              .gte(param)
              .lte(param)
          )
      )
      .from(1)
      .size(5);
    return esClient.search({ index: ES_INDEX, body: requestBody.toJSON() });
  },

  filterCarsByName: async param => {
    const requestBody = esb
      .requestBodySearch()
      .query(esb.termQuery("Name", param))
      .sort(esb.sort("Year", "asc"))
      .from(1)
      .size(10);
    return esClient.search({ index: ES_INDEX, body: requestBody.toJSON() });
  },

  fetchCarByName: async param => {
    const requestBody = esb
      .requestBodySearch()
      .query(esb.boolQuery().must(esb.matchPhraseQuery("Name", param)));
    return esClient.search({ index: ES_INDEX, body: requestBody.toJSON() });
  },

  fetchMatchMultipleQuery: async (origin, name, weight) => {
    const requestBody = esb.requestBodySearch().query(
      esb
        .boolQuery()
        .must([esb.matchQuery("Origin", origin), esb.matchQuery("Name", name)])
        .filter(esb.rangeQuery("Weight_in_lbs").gte(weight))
    );
    return esClient.search({ index: ES_INDEX, body: requestBody.toJSON() });
  },

  aggregateQuery: async (origin, cylinder, name, horsePower) => {
    const requestBody = esb
      .requestBodySearch()
      .query(
        esb
          .boolQuery()
          .must(esb.matchQuery("Origin", origin))
          .filter(esb.rangeQuery("Cylinders").gte(cylinder))
          .should(esb.termQuery("Name", name))
          .mustNot(esb.rangeQuery("Horsepower").gte(horsePower))
      )
      .agg(esb.avgAggregation("avg_miles", "Miles_per_Gallon"));

    return esClient.search({ index: ES_INDEX, body: requestBody.toJSON() });
  }
};
