//Storage Objects

var household = [];

var person = {
  age: null,
  relationship: null,
  smoker: false
};

//Person Form Values

function ageValue() {
  return document.querySelector('input[name="age"]').value;
}

function relationshipValue() {
  return document.querySelector('select[name="rel"]').value;
}

function smokerValue() {
  return document.querySelector('input[name="smoker"]').checked;
}

//Initial DOM Elements

function addPersonButton() {
  return document.querySelector(".add");
}

function submitHouseholdButton() {
  return document.querySelector('button[type="submit"]');
}

function householdList() {
  return document.querySelector(".household");
}

//Event Listeners

function createPersonSubListener() {
  addPersonButton().addEventListener("click", function(e) {
    e.preventDefault();
    if (ageValue() && relationshipValue()) {
      savePersonValues();
      addPersonToHousehold();
      clearPersonValues();
      console.log("person object", person);
      console.log("household array", household);
    } else {
      console.log("you must enter an age and relationship");
    }
  });
}

function createHouseholdSubListener() {
  submitHouseholdButton().addEventListener("click", function(e) {
    e.preventDefault();
    console.log("household added");
  });
}

//Person Functions

function savePersonValues() {
  person["age"] = ageValue();
  person["relationship"] = relationshipValue();
  person["smoker"] = smokerValue();
}

function addPersonToHousehold() {
  household.push(person);
  householdList().appendChild(personListItem(person));
}

function personListItem(personObj) {
  var relationship =
    personObj["relationship"].charAt(0).toUpperCase() +
    personObj["relationship"].substr(1);
  var smoker = personObj["smoker"] ? "Smoker" : "Non-Smoker";
  var age = personObj["age"];
  var listItem = document.createElement("li");
  listItem.className = "person";
  listItem.innerText = relationship + ": Age: " + age + ", " + smoker;
  console.log(listItem);
  return listItem;
}

function clearPersonValues() {
  person = {
    age: null,
    relationship: null,
    smoker: null
  };
}

//Error Messaging

//Initialization

function initialize() {
  console.log("index.js initialized");
  createPersonSubListener();
  createHouseholdSubListener();
}

document.addEventListener("DOMContentLoaded", initialize);
