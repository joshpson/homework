//Global Storage Objects

var household = [];

var personIdCounter = 0;

var currentPerson = {
  id: null,
  age: null,
  relationship: null,
  smoker: false
};

//DOM Elements

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

function debugPre() {
  return document.querySelector(".debug");
}

function builderDiv() {
  return document.querySelector(".builder");
}

function errorDiv() {
  return document.querySelector(".error");
}

//Form Values

function ageValue() {
  return parseInt(document.querySelector('input[name="age"]').value);
}

function relationshipValue() {
  return document.querySelector('select[name="rel"]').value;
}

function smokerValue() {
  return document.querySelector('input[name="smoker"]').checked;
}

//Event Listeners

function personSubmissionListener(e) {
  e.preventDefault();
  if (ageValue() && relationshipValue()) {
    savePersonValues();
    addPersonToHousehold();
    resetPersonValues();
    displayHousehold();
    clearErrors();
  } else {
    displayPersonError();
  }
}

function householdSubmissionListener(e) {
  e.preventDefault();
  if (household.length) {
    postHousehold();
    resetForm();
    clearErrors();
  } else {
    displayHouseholdError();
  }
}

////Person & Household Functions

function resetForm() {
  resetPersonValues();
  household = [];
  displayHousehold();
}

function resetPersonValues() {
  currentPerson = {
    id: null,
    age: null,
    relationship: null,
    smoker: null
  };
  wrappingForm().reset();
}

function savePersonValues() {
  personIdCounter += 1;
  currentPerson["id"] = personIdCounter;
  currentPerson["age"] = ageValue();
  currentPerson["relationship"] = relationshipValue();
  currentPerson["smoker"] = smokerValue();
}

function addPersonToHousehold() {
  household.push(currentPerson);
}

function displayHousehold() {
  householdList().innerHTML = "";
  household.forEach(function(currentPerson) {
    householdList().appendChild(personListItem(currentPerson));
  });
}

function personListItem(personObj) {
  var listItem = document.createElement("li");
  listItem.className = "person";
  listItem.innerText = personDescription(personObj);
  listItem.appendChild(personDeleteButton(personObj["id"]));
  return listItem;
}

function personDeleteButton(id) {
  var button = document.createElement("button");
  button.addEventListener("click", function() {
    removePerson(id);
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

function removePerson(id) {
  household = household.filter(function(person) {
    return person.id != id;
  });
  displayHousehold();
}

//API Functions

function postHousehold() {
  debugPre().style.display = "block";
  debugPre().innerText = JSON.stringify(household);
}

//Error Messaging

function createErrorDiv() {
  var error = document.createElement("div");
  error.className = "error";
  error.style.color = "red";
  builderDiv().insertBefore(error, householdList());
}

function displayPersonError() {
  errorDiv().innerText = "Please enter a valid age and relationship.";
}

function displayHouseholdError() {
  errorDiv().innerText = "Please add at least one person to your household.";
}

function clearErrors() {
  errorDiv().innerText = "";
}

//Initialization

function initialize() {
  addPersonButton().addEventListener("click", personSubmissionListener);
  submitHouseholdButton().addEventListener(
    "click",
    householdSubmissionListener
  );
  createErrorDiv();
}

document.addEventListener("DOMContentLoaded", initialize);
