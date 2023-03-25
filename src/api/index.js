import axios from "axios";
import qs from "qs";

const baseUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&";
const GET = "GET";


const ACTION_HANDLERS = {
  [GET]: (url, data, headers) => {
    let queryUrl = url;
    // if (data !== undefined) {
    //   const query = qs.stringify(data);
 
    //   queryUrl = `${queryUrl}?${query}`;
    //   console.log("queryURL",queryUrl)
    // }

    console.log("query",baseUrl+queryUrl)
    return axios.get(baseUrl+queryUrl , {
      headers
    });
  },

};

function setHeaders({ contentType }) {
  // set contentType

   
    axios.defaults.headers.get.Accept = "application/json";
  
}

function handleError(error) {
  return Promise.reject(error);
}
const fetchUrl = ({ type, url, data = {}, config = {} }) => {
  setHeaders(config);
  const handler = ACTION_HANDLERS[type.toUpperCase()];

  return handler(url, data, config.headers)
    .then((response) => Promise.resolve(response.data))
    .catch(handleError);
};

export default fetchUrl;