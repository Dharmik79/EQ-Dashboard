const apiList = {
  getData: {
    url: (data) => {
      return `query?format=geojson&starttime=${data.startDate}&endtime=${data.endDate}`;
    },
    method: "get",
  },
  getCount:{
    url: (data) => {
      return `count?starttime=${data.startDate}&endtime=${data.endDate}`;
    },
    method: "get",
  }
};
export default apiList;
