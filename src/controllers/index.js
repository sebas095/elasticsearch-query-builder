const Services = require("../services");

module.exports = {
  search: async (req, res) => {
    try {
      const result = await Services.search();
      const data = result.body.hits.hits.map(car => {
        return {
          id: car._id,
          data: car._source
        };
      });
      res.json({
        status_code: 200,
        success: true,
        data: data,
        message: "Cars data successfully fetched!"
      });
    } catch (err) {
      res.json({
        status_code: 500,
        success: false,
        data: [],
        message: err.message
      });
    }
  },

  filterCarsByYearMade: async (req, res) => {
    let { year } = req.query;

    try {
      const result = await Services.filterCarsByYearMade(year);
      const data = result.body.hits.hits.map(car => {
        return {
          id: car._id,
          data: car._source
        };
      });
      res.json({
        status_code: 200,
        success: true,
        data: data,
        message: "Filter Cars by year made data fetched successfully"
      });
    } catch (err) {
      res.json({
        status_code: 500,
        success: false,
        data: [],
        message: err.message
      });
    }
  },

  filterCarsByName: async (req, res) => {
    let param = req.query.Name;
    try {
      const result = await Services.filterCarsByName(param);
      const data = result.body.hits.hits.map(car => {
        return {
          id: car._id,
          data: car._source
        };
      });
      res.json({
        status_code: 200,
        success: true,
        data: data,
        message: "Filter cars by name data fetched successfully!"
      });
    } catch (err) {
      res.json({
        status_code: 500,
        success: false,
        data: [],
        message: err.message
      });
    }
  },

  filterCarByName: async (req, res) => {
    const param = req.query.Name;
    try {
      const result = await Services.fetchCarByName(param);
      const data = result.body.hits.hits.map(car => {
        return {
          id: car._id,
          data: car._source
        };
      });
      res.json({
        status_code: 200,
        success: true,
        data: data,
        message: "Filter a car by name query data fetched successfully!"
      });
    } catch (err) {
      res.json({
        status_code: 500,
        success: false,
        data: [],
        message: err.message
      });
    }
  },

  fetchMatchMultipleQuery: async (req, res) => {
    const param2 = req.query.Origin;
    const param1 = req.query.Name;
    const param3 = req.query.Weight_in_lbs;
    try {
      const result = await Services.fetchMatchMultipleQuery(
        param2,
        param1,
        param3
      );
      const data = result.body.hits.hits.map(car => {
        return {
          id: car._id,
          data: car._source
        };
      });
      res.json({
        status_code: 200,
        success: true,
        data: data,
        messsage: "fetch match query for multiple requests successful!"
      });
    } catch (err) {
      res.json({
        status_code: 500,
        success: false,
        data: [],
        message: err.message
      });
    }
  },

  aggregateQuery: async (req, res) => {
    const param1 = req.query.Origin;
    const param2 = req.query.Cylinder;
    const param3 = req.query.Name;
    const param4 = req.query.Horsepower;
    try {
      const result = await Services.aggregateQuery(
        param1,
        param2,
        param3,
        param4
      );
      const data = result.body.hits.hits.map(car => {
        return {
          id: car._id,
          data: car._source
        };
      });
      res.json({
        status_code: 200,
        success: true,
        data: { avg_miles: result.body.aggregations.avg_miles, data },
        message: "Data successfully fetched!"
      });
    } catch (err) {
      res.json({
        status_code: 500,
        success: false,
        data: [],
        message: err.message
      });
    }
  }
};
