import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...

let primaryCheck = color =>
  color === "red" || color === "blue" || color === "yellow";

let urlBuilder = (page, colors) => {
  let offset = page * 10 - 10;
  let url = `${window.path}?limit=10&offset=${offset}`;
  if (colors) {
    url += "&color[]=" + colors.join("&color[]=");
  }
  return url;
};

const retrieve = (options = {}) => {
  let page = options["page"] ? options["page"] : 1;
  let colors = options["colors"] ? options["colors"] : null;
  let response = fetch(urlBuilder(page, colors))
    .then(resp => {
      return resp.json();
    })
    .then(json => {
      let respObj = {
        ids: [],
        open: [],
        closedPrimaryCount: 0,
        previousPage: page <= 1 ? null : page - 1,
        nextPage: null
      };
      if (json.length) {
        json.forEach(item => {
          respObj["ids"].push(item.id);
          if (item.disposition === "open") {
            item["isPrimary"] = primaryCheck(item["color"]);
            respObj["open"].push(item);
          } else {
            if (primaryCheck(item["color"])) {
              respObj["closedPrimaryCount"] += 1;
            }
          }
          respObj["nextPage"] = page >= 50 ? null : page + 1;
        });
      }
      return respObj;
    })
    .catch(err => {
      console.log(err);
    });
  return response;
};

export default retrieve;
