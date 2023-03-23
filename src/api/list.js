const apiList = {
    getData: {
      url: (data) => {
   return `starttime=${data.startDate}&endtime=${data.endDate}`
      },
      method: "get"
    }
  };
  export default apiList;