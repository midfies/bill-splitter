'use strict';

//********************attach DOM to JS - Set Up Data****************************
var theSignUpForm = document.getElementById('signUpForm');
var theLoginForm = document.getElementById('logInForm');
//******************************************************************************
var formValues;

var houseArray = localStorage.getItem('houseArray');
if (!houseArray) {
  houseArray = [];
} else {
  houseArray = JSON.parse(houseArray);
}

//*****************add how it hears the click to run function*******************

theSignUpForm.addEventListener('submit',storeSignUpData);
theLoginForm.addEventListener('submit', signIn);
//******************************************************************************

//***********************SignUp function****************************************
function storeSignUpData(event) {   //also called a callback.
  event.preventDefault();
  var whoAmI = event.target.elements.user_id.value;
  var thePasswordIs = event.target.elements.password.value;
  var verifyPassword = event.target.elements.verify.value;
  var formValues = {user_id: whoAmI, password: thePasswordIs,
  verify:verifyPassword};

  houseArray.push(formValues);
  var houseArrayStringified = JSON.stringify(houseArray);
  localStorage.setItem('houseArray', houseArrayStringified);

  for (var i = 0; i < houseArray.length; i++) {

    if (formValues.verify === houseArray[i].verify
      && formValues.password === houseArray[i].password
    && formValues.user_id !== houseArray[i].user_id) {
      document.write('Sign Up Successful. You will now be returned to Log In.');
      setTimeout(function() {
        window.location.href = 'index.html';
      }, 3000);
      break;}

    if (formValues.user_id === houseArray[i].user_id) {
      alert('This username already exists, please choose another.');
      break;}
    // console.log('passwords dont match');
    // }
  }


}
//**********************Log In Function*****************************************
// when I press the Log in button, I want the computer to see if the key:value is
// present in localStorage and then parse it out. If it's there, go to the next
// page. If there is not a match, alert, "this user name /pw combo does not match."

function signIn (event) {
  event.preventDefault();
  var myNameIs = event.target.elements.login_id.value;
  var myPassword = event.target.elements.mypassword.value;
  var logInValues = {login_id: myNameIs, mypassword:myPassword};
  // var getFromStorage = localStorage.getItem('signUpValues');
  // var formValues = JSON.parse(getFromStorage);
  // console.log(formValues);
  for (var i = 0; i < houseArray.length; i++) {

    if (logInValues.login_id === houseArray[i].user_id
  && logInValues.mypassword === houseArray[i].password) {
      console.log('user has logged in correctly');
      window.location.href = 'https://www.google.com';
    }
    else {
      alert('User ID/Password not found. Please try again!');
      console.log('user info not found');
      break;
    }
  }
}
//******************************************************************************
