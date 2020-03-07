const {
  esConfig: { esClient },
  config: { ES_INDEX }
} = require("../config");
const data = require("../data/data.json");

async function writeCarDataToEs(client, index, data) {
  for (let i = 0; i < data.length; i++) {
    try {
      const response = await client.create({
        refresh: true,
        index: index,
        id: i,
        body: data[i]
      });

      console.log("Successfully imported data", data[i]);
    } catch (err) {
      console.error("Failed to import data", error);
      return;
    }
  }
}

async function createCarMapping(client, index) {
  const carSchema = {
    Acceleration: {
      type: "long"
    },
    Cylinders: {
      type: "long"
    },
    Displacement: {
      type: "long"
    },
    Horsepower: {
      type: "long"
    },
    Miles_per_Gallon: {
      type: "long"
    },
    Name: {
      type: "text",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256
        }
      }
    },
    Origin: {
      type: "text",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256
        }
      }
    },
    Weight_in_lbs: {
      type: "long"
    },
    Year: {
      type: "date"
    }
  };

  return client.indices.putMapping({
    index,
    body: { properties: carSchema }
  });
}

module.exports = {
  resetIndex: async () => {
    const { body: existsIndex } = await esClient.indices.exists({
      index: ES_INDEX
    });
    if (existsIndex) {
      await esClient.indices.delete({ index: ES_INDEX });
    }

    await esClient.indices.create({ index: ES_INDEX });
    await createCarMapping(esClient, ES_INDEX);
    await writeCarDataToEs(esClient, ES_INDEX, data);
  }
};
