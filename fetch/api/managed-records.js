import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...

let primaryCheck = color =>
  color === "red" || color === "blue" || color === "yellow";

let getRequest = url => {
  return fetch(url).then(resp => {
    return resp.json();
  });
};

let urlBuilder = (page = 1, colors = []) => {
  let colorParams = colors.length ? "&color[]=" + colors.join("&color[]=") : "";
  let offset = (page - 1) * 10;
  return `${window.path}?limit=10&offset=${offset}${colorParams}`;
};

const retrieve = ({ page = 1, colors = [] }) => {
  return fetch(urlBuilder(page, colors))
    .then(resp => {
      console.log(resp.status);
      return resp.json();
    })
    .then(json => {
      console.log(json);
      let respObj = {
        ids: [],
        open: [],
        closedPrimaryCount: 0,
        previousPage: page === 1 ? null : page - 1,
        nextPage: null
      };
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
      });
      return respObj;
    })
    .catch(error => console.error(error));
};

export default retrieve;
