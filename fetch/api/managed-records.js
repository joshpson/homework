import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...

function urlBuilder(page, colors) {
  let uri = new URI(window.path);
  uri.addSearch("limit", 10);
  let offset = page * 10 - 10;
  uri.addSearch("offset", offset);
  if (colors) {
    uri.addSearch({ "color[]": colors });
  }
  return uri.toString();
}

function blankResponse() {
  return {
    ids: [],
    open: [],
    closedPrimaryCount: 0,
    previousPage: null,
    nextPage: null
  };
}

function primaryCheck(color) {
  return color === "red" || color === "blue" || color === "yellow";
}

function recordHandler(record, respObj) {
  respObj["ids"].push(record.id);
  if (record.disposition === "open") {
    record["isPrimary"] = primaryCheck(record["color"]);
    respObj["open"].push(record);
  } else if (primaryCheck(record["color"])) {
    respObj["closedPrimaryCount"] += 1;
  }
}

function transformJSON(json, page) {
  let respObj = blankResponse();
  respObj["previousPage"] = page <= 1 ? null : page - 1;
  if (json.length) {
    respObj["nextPage"] = page >= 50 ? null : page + 1;
    json.forEach(record => {
      recordHandler(record, respObj);
    });
  }
  return respObj;
}

const retrieve = (options = {}) => {
  let page = options["page"] ? options["page"] : 1;
  let colors = options["colors"] ? options["colors"] : null;
  let response = fetch(urlBuilder(page, colors))
    .then(resp => resp.json())
    .then(json => transformJSON(json, page))
    .catch(err => console.log(err));
  return response;
};

export default retrieve;
