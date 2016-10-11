'use strict';

//********************attach DOM to JS - Set Up Data****************************
var theSignUpForm = document.getElementById('signUpForm');
var theLoginForm = document.getElementById('logInForm');
//******************************************************************************
var formValues;
//*****************add how it hears the click to run function*******************

theSignUpForm.addEventListener('submit',storeSignUpData);
theLoginForm.addEventListener('submit', signIn);
//******************************************************************************
//event handler? event.target? if the above runs the function, how does the info
// get into localStorage?????

//need to store key:value data into array somehow and those values need to
// match when they log in. This data needs to be JSON'd.
// console.log(userNamePWCombo); //this is coming back in console log as user_id: password. I want it to be what I enter into the text field.

//also need to have a if/else statement that verifies same password and verification field. Do I do that by id, name, string?
// if (//password and verify match) {
  // then proceed to start page
// }

// else { // error prompt (password and verify did not match.)
//***********************SignUp function****************************************
function storeSignUpData(event) {   //also called a callback.
  event.preventDefault();
  var whoAmI = event.target.elements.user_id.value;
  var thePasswordIs = event.target.elements.password.value;
  var verifyPassword = event.target.elements.verify.value;
  var formValues = {user_id: whoAmI, password: thePasswordIs,
  verify:verifyPassword};

  var formValuesStringed = JSON.stringify(formValues);

  localStorage.setItem('signUpValues', formValuesStringed);

  if (formValues.verify === formValues.password) {
    // console.log('user registered correctly');
  }
  else {
    // console.log('passwords dont match');
  }
}
//**********************Log In Function*****************************************
// when I press the Log in button, want the computer to see if the key:value is
// present in localStorage and then parse it out. If it's there, go to the next
// page. If there is not a match, alert, "this user name /pw combo does not match."

function signIn (event) {
  event.preventDefault();
  var myNameIs = event.target.elements.login_id.value;
  var myPassword = event.target.elements.mypassword.value;
  var logInValues = {login_id: myNameIs, mypassword:myPassword};
  var getFromStorage = localStorage.getItem('signUpValues');

  var formValues = JSON.parse(getFromStorage);

  console.log(formValues);
  console.log(formValues);

  if (logInValues.login_id === formValues.user_id
  && logInValues.mypassword === formValues.password) {
    console.log('user has logged in correctly');
  }
  else {
    console.log('user info not found');
  }

}
