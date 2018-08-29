//Storage Objects

var person = {
  age: null,
  relationship: null,
  smoker: null
};

var household = [];

//Current Values

function ageValue() {
  return document.querySelector('input[name="age"]').value;
}

function relationshipValue() {
  return document.querySelector('select[name="rel"]').value;
}

function smokerValue() {
  return document.querySelector('input[name="smoker"]').checked;
}

//Buttons

function addPersonButton() {
  return document.querySelector(".add");
}

function submitHouseholdButton() {
  return document.querySelector('button[type="submit"]');
}

//Event Listeners

function createPersonSubListener() {
  addPersonButton().addEventListener("click", function(e) {
    e.preventDefault();
    savePersonValues();
    addPersonToHousehold();
    clearPersonValues();
    console.log("person object", person);
    console.log("household array", household);
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
}

function clearPersonValues() {
  person = {
    age: null,
    relationship: null,
    smoker: null
  };
}

//Initialization

function initialize() {
  console.log("index.js initialized");
  createPersonSubListener();
  createHouseholdSubListener();
}

document.addEventListener("DOMContentLoaded", initialize);
