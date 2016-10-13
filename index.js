'use strict';

//********************attach DOM to JS - Set Up Data****************************
var theSignUpForm = document.getElementById('signUpForm');
var theLoginForm = document.getElementById('logInForm');
//******************************************************************************
// var formValues;
localStorage.setItem('loggedInID', '');
var houseArray = localStorage.getItem('allTheHouses');
if (!houseArray) {
  houseArray = [];
} else {
  houseArray = JSON.parse(houseArray);
}

//*****************add how it hears the click to run function*******************

theSignUpForm.addEventListener('submit',storeSignUpData);
theLoginForm.addEventListener('submit', signIn);
//******************************************************************************
function House(userName, password){
  this.userName = userName,
  this.password = password,
  this.roommates = [];
  this.bills = [];
}
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
      alert('Thank you for signing up. You may now log in.');
      return true;
    }
    if (thePasswordIs !== verifyPassword){
      alert('Password and Verify must match. Please try again.');
      return false;
    }
  }
  var samePasswordDesicion = isPasswordandVerifytheSame(thePasswordIs, verifyPassword);

  if (emptyArrayDecision === true && duplicateDecision === false && samePasswordDesicion === true ) {
    var houseObject = new House(formValues.user_id, formValues.password);
    var houseToStore = JSON.stringify(houseObject);
    localStorage.setItem(formValues.user_id, houseToStore);
    savetoLocalStorage(formValues);

  }

  function savetoLocalStorage(formValues) {
    houseArray.push(formValues);
    var houseArrayStringified = JSON.stringify(houseArray);
    localStorage.setItem('allTheHouses', houseArrayStringified);
  }

} // end of sign up

//**********************Log In Function*****************************************
// when I press the Log in button, I want the computer to see if the key:value is
// present in localStorage and then parse it out. If it's there, go to the next
// page. If there is not a match, alert, "this user name /pw combo does not match."
function signIn (event) {
  event.preventDefault();
  console.log(houseArray);
  var myNameIs = event.target.elements.login_id.value;
  var myPassword = event.target.elements.mypassword.value;
  var logInValues = {
    login_id:   myNameIs,
    mypassword: myPassword
  };

  function iDandPWmatch ( myNameIs,houseArray) {
    for (var i = 0; i < houseArray.length; i++) {
      console.log(myNameIs + ' myNameIs');
      console.log(houseArray[i].user_id + ' houseArray[i].user_id');
      if (myNameIs === houseArray[i].user_id) {
        return true;
      }
    }
    alert('User not found');
    //end of loop
  }//endofFunction

  iDandPWmatch( myNameIs,houseArray);
  if (myPassword === '') {
    alert('Please enter a password');
    return false;
  }
  if (myNameIs === ''){
    alert('Please enter a User ID');
    return false;
  }

  var letsLogIn = iDandPWmatch( myNameIs,houseArray);
  console.log(letsLogIn);
  if(letsLogIn === true ) {
    // console.log('I want to go to the website');
    localStorage.setItem('loggedInID', myNameIs);
    window.location.href = 'home.html';
  }


  // var getFromStorage = localStorage.getItem('signUpValues');
//   // var formValues = JSON.parse(getFromStorage);
//
// } //end of SignIn Function
// //   for (var i = 0; i < houseArray.length; i++) {
// //
// //     if (logInValues.login_id !== houseArray[i]) {
//       alert('User ID/Password not found. Please try again!');
//       console.log('user info not found');
//       break;
//     }
  }
// }
// } //end of SignIn
// //***************************************************************************
