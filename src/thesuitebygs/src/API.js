const axios = require("axios");

const API = () => {
  const base_link = "http://localhost:8080";

  const request = async (endpoint, data, method, headers = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        endpoint = `${base_link}${endpoint}`;
        let response;

        if (method === "POST") {
          response = await axios.post(endpoint, data, {
            headers,
            withCredentials: true,
          });
        }
        if (method === "GET") {
          response = await axios.get(endpoint, {
            headers,
            withCredentials: true,
          });
        }
        if (method === "DELETE") {
          response = await axios.delete(endpoint, {
            headers,
            withCredentials: true,
          });
        }

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  };

  const post = (endpoint, data, headers) => {
    return request(endpoint, data, "POST", headers);
  };

  const get = (endpoint, headers) => {
    return request(endpoint, null, "GET", headers);
  };

  const deleteItem = (endpoint, headers) => {
    return request(endpoint, null, "DELETE", headers);
  };

  // API Calls Available
  const fetchUpcomingPublicOfferings = (data) => {
    return get("/asset-management-system/upcoming-public-offerings");
  };

  const fetchHistoricalPrices = (data) => {
    return get("/asset-management-system/historical-prices");
  };

  const calculateRisk = (data) => {
    return post("/asset-management-system/calculate-risk", data);
  };

  const visualiseData = (data) => {
    return post("/analytics/visualise-data", data);
  };

  const fetchLiveMarketStatistics = (data) => {
    return get("/analytics/live-market-statistics", data);
  };

  const registerCreditCardServices = (data) => {
    return post("/payment/register-credit-card-services", data);
  };

  const fetchCreditCardTransactions = (data) => {
    return get("/payment/view-credit-card-transactions");
  };

  const fetchCreditCardDetails = (data) => {
    return post("/payment/view-card-details", data);
  };

  return {
    fetchUpcomingPublicOfferings,
    fetchHistoricalPrices,
    calculateRisk,
    visualiseData,
    fetchLiveMarketStatistics,
    registerCreditCardServices,
    fetchCreditCardTransactions,
    fetchCreditCardDetails,
  };
};

export default API;
