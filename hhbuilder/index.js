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

function householdContainer() {
  return document.querySelector(".debug");
}

function builderDiv() {
  return document.querySelector(".builder");
}

function errorDiv() {
  return document.querySelector(".error");
}

function householdEditButton() {
  return document.querySelector(".household-edit");
}

function personDeleteButtons() {
  return document.querySelectorAll(".delete-person");
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
    hideHouseholdForm();
    displayEditButton();
    hideDeleteButtons();
  } else {
    displayHouseholdError();
  }
}

////Person & Household Functions

function resetForm() {
  resetPersonValues();
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
  button.className = "delete-person";
  button.addEventListener("click", function() {
    removePerson(id);
  });
  button.innerText = "x";
  return button;
}

function hideDeleteButtons() {
  personDeleteButtons().forEach(function(button) {
    button.style.display = "none";
  });
}

function displayDeleteButtons() {
  personDeleteButtons().forEach(function(button) {
    button.style.display = "inline";
  });
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

function createEditButton() {
  let editButton = document.createElement("button");
  editButton.className = "household-edit";
  editButton.innerText = "Edit Household";
  editButton.style.display = "none";
  editButton.addEventListener("click", editHousehold);
  builderDiv().appendChild(editButton);
}

function displayEditButton() {
  householdEditButton().style.display = "block";
}

function hideEditButton() {
  householdEditButton().style.display = "none";
}

function editHousehold(e) {
  e.preventDefault();
  getHousehold();
  displayHousehold();
  displayHouseholdForm();
  displayDeleteButtons();
  hideEditButton();
}

function hideHouseholdForm() {
  wrappingForm().style.display = "none";
}

function displayHouseholdForm() {
  wrappingForm().style.display = "block";
}

//Fake API Calls

function postHousehold() {
  householdContainer().style.display = "block";
  householdContainer().innerHTML = JSON.stringify(household);
}

function getHousehold() {
  household = JSON.parse(householdContainer().innerHTML);
  householdContainer().style.display = "none";
  householdContainer().innerHTML = "";
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
  createEditButton();
  createErrorDiv();
}

document.addEventListener("DOMContentLoaded", initialize);
