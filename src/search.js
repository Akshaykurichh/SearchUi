let requestURL = require("./data.json");
// import { map, find, includes } from "lodash";
let lodash = require("lodash");
// let request = new XMLHttpRequest();
// request.open("GET", requestURL);

var mydata = requestURL.summaries;

export function searchQuery(query, times) {
  let result = mydata.filter(m => {
    return m.summary.toUpperCase().search(query.toUpperCase()) >= 0;
  });

  //let result = lodash.includes(mydata, query);
  //console.log("result is:", lodash.slice(result, 0, times));
  return lodash.slice(result, 0, times);
}
searchQuery("tting go", 1);
//console.log("mydata is :", mydata);
