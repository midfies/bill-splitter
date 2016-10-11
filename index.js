'use strict';

//attach DOM to JS - Set Up Data
var theSignUpForm = document.getElementById('signUpForm');
console.log(theSignUpForm);
//add how it hears the click to run function

theSignUpForm.addEventListener('submit',storeSignUpData);
//event handler? event.target? if the above runs the function, how does the info
// get into localStorage?????



//need to store key:value data into array somehow and those values need to
// match when they log in. This data needs to be JSON'd.
var userNamePWCombo = {'user_id':'password'};

console.log(userNamePWCombo); //this is coming back in console log as user_id: password. I want it to be what I enter into the text field.

//also need to have a if/else statement that verifies same password and verification field. Do I do that by id, name, string?
// if (//password and verify match) {
  // then proceed to start page
// }

// else { // error prompt (password and verify did not match.)

// }

function storeSignUpData(event) {   //also called a callback.
  event.preventDefault();
  var whoAmI = event.target.elements.user_id.value;
  var thePasswordIs = event.target.elements.password.value;
  var verifyPassword = event.target.elements.verify.value;
  var formValues = {user_id: whoAmI, password: thePasswordIs, verify:verifyPassword};

  var formValuesStringed = JSON.stringify(formValues);
  console.log(formValuesStringed);
  localStorage.setItem('signUpValues', formValuesStringed);

  if (formValues.verify === formValues.password) {
    console.log('user registered correctly');
  }
  else {
    console.log('passwords dont match');
  }
}

function SignIn ()
