'use strict';

//********************attach DOM to JS - Set Up Data****************************
var theSignUpForm = document.getElementById('signUpForm');
var theLoginForm = document.getElementById('logInForm');
//******************************************************************************
// var formValues;

var houseArray = localStorage.getItem('allTheHouses');
if (!houseArray) {
  houseArray = [];
} else {
  houseArray = JSON.parse(houseArray);
}

//*****************add how it hears the click to run function*******************

theSignUpForm.addEventListener('submit',storeSignUpData);
// theLoginForm.addEventListener('submit', signIn);
//******************************************************************************

//***********************SignUp function****************************************
function storeSignUpData(event) {   //also called a callback.
  event.preventDefault();
  var whoAmI = event.target.elements.user_id.value;
  var thePasswordIs = event.target.elements.password.value;
  var verifyPassword = event.target.elements.verify.value;
  var formValues = {
    user_id:  whoAmI,
    password: thePasswordIs,
    verify:   verifyPassword
  };

  function emptyArray () {
    if (whoAmI === '') {
      alert('User ID cannot be empty. Please enter a User ID.');
      return false;
    }
    if (thePasswordIs === '') {
      alert('Password value cannot be empty! Please enter a password.');
      return false;
    }
    if (verifyPassword === '') {
      alert('Please verify password.');
      return false;
    }
    else {
      return true;
    }
  }
  var emptyArrayDecision = emptyArray();   //handles the decision

  function checkIfNameIsaDuplicate ( whoAmI, houseArray ) {
    for (var i = 0; i < houseArray.length; i++) {
      if (formValues.user_id === houseArray[i].user_id) {
        return true;
      }
    }
    return false;
  }

  var duplicateDecision = checkIfNameIsaDuplicate( whoAmI, houseArray);

  if(duplicateDecision === true) {
    alert('User ID has already been found. Please select another.');
    return true;
  }

  function isPasswordandVerifytheSame (thePasswordIs, verifyPassword) {
    if (verifyPassword === thePasswordIs) {
      document.write('Sign Up Successful. You will now be returned to Log In.');
      setTimeout(function() {
        window.location.href = 'index.html';
      }, 3000);
    }
    if (thePasswordIs !== verifyPassword){
      alert('Password and Verify must match. Please try again.');
      return false;
    }
  }
  var samePasswordDesicion = isPasswordandVerifytheSame(thePasswordIs, verifyPassword);

  if (emptyArrayDecision === true && duplicateDecision === false && samePasswordDesicion === true ) {
    pushOrDontPush(formValues);

  }

  function pushOrDontPush(formValues) {
    houseArray.push(formValues);
    var houseArrayStringified = JSON.stringify(houseArray);
    localStorage.setItem('allTheHouses', houseArrayStringified);
  }
} // end of


//**********************Log In Function*****************************************
// when I press the Log in button, I want the computer to see if the key:value is
// present in localStorage and then parse it out. If it's there, go to the next
// page. If there is not a match, alert, "this user name /pw combo does not match."
// function signIn (event) {
//   event.preventDefault();
//   var myNameIs = event.target.elements.login_id.value;
//   var myPassword = event.target.elements.mypassword.value;
//   var logInValues = {login_id: myNameIs, mypassword:myPassword};
//   // var getFromStorage = localStorage.getItem('signUpValues');
//   // var formValues = JSON.parse(getFromStorage);
//   // console.log(formValues);
//   for (var i = 0; i < houseArray.length; i++) {
//
//     if (logInValues.login_id === houseArray[i].user_id
//   && logInValues.mypassword === houseArray[i].password) {
//       console.log('user has logged in correctly');
//       window.location.href = 'https://www.google.com';
//     }
//     if (logInValues.login_id !== houseArray[i]) {
//       alert('User ID/Password not found. Please try again!');
//       console.log('user info not found');
//       break;
//     }
//     if (myPassword === '') {
//       alert('Please enter a password');
//     }
//     if (myNameIs === '')
//       alert('Please enter a User ID');
//   }
// }
//
// //******************************************************************************
