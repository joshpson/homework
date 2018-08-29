//Storage Objects

var household = [];

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

function wrappingForm() {
  return document.querySelector("form");
}

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
      resetValues();
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

//

function resetValues() {
  person = {
    id: null,
    age: null,
    relationship: null,
    smoker: null
  };
  wrappingForm().reset();
}

//Person Data & Functions

var personIdCounter = 0;

var person = {
  id: null,
  age: null,
  relationship: null,
  smoker: false
};

function savePersonValues() {
  personIdCounter += 1;
  person["id"] = personIdCounter;
  person["age"] = ageValue();
  person["relationship"] = relationshipValue();
  person["smoker"] = smokerValue();
}

function addPersonToHousehold() {
  household.push(person);
  householdList().appendChild(personListItem(person));
}

function personListItem(personObj) {
  var listItem = document.createElement("li");
  listItem.className = "person";
  listItem.innerText = personDescription(personObj);
  listItem.appendChild(personDeleteButton());
  return listItem;
}

function personDeleteButton() {
  var button = document.createElement("button");
  button.addEventListener("click", function() {
    removePerson();
  });
  button.innerText = "x";
  return button;
}

function personDescription(personObj) {
  var relationship =
    personObj["relationship"].charAt(0).toUpperCase() +
    personObj["relationship"].substr(1);
  var smoker = personObj["smoker"] ? "Smoker" : "Non-Smoker";
  var age = personObj["age"] + " Years Old";
  var description = relationship + ": " + age + ", " + smoker;
  return description;
}

function removePerson() {
  console.log("goodbye");
}

//Error Messaging

//Initialization

function initialize() {
  console.log("index.js initialized");
  createPersonSubListener();
  createHouseholdSubListener();
}

document.addEventListener("DOMContentLoaded", initialize);
