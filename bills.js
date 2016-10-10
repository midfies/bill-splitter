'use strict';

//var houseUser = [];
var roommate = [];
var bills = [];

if (localStorage.getItem('roommates')){
  console.log('Fetching LS...');
  roommate = JSON.parse(localStorage.getItem('roommates'));
} else {
  //there are no roommates in the list
}
//Mock Objects
// var roommate = [
//     { first: 'Jed', last: 'Thompson', email: 'jedlee2004@gmail.com', unpaid: [] },
//     { first: 'Firshta', last: 'Shefa', email: 'firshtashefa@gmail.com', unpaid: [] },
//     { first: 'Jeff', last: 'Wallace', email: 'rs4race@gmail.com' },
//     { first: 'Jason', last: 'Chu', email: 'jchu@gmail.com', unpaid: [] },
// ];

(function roommateSelect() {
  var parent = document.getElementById('rmOptions');
  for (var i = 0; i < roommate.length; i++) {
    var option = document.createElement('option');
    option.value = roommate[i].firstName + ' ' + roommate[i].lastName;
    option.innerHTML = roommate[i].firstName + ' ' + roommate[i].lastName;
    parent.appendChild(option);
  }
}());

var billForm = document.getElementById('bill-form');
billForm.addEventListener('submit', newBillHandler);

function newBillHandler(event) {
  event.preventDefault();
  var options = event.target.rmOptions;
  var roommatesArr = [];

  (function() {
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        roommatesArr.push(options[i].value);
      }
    }
  }());

  var name = event.target.billname.value;
  var amountDue = parseFloat(event.target.amount.value);
  var frequency = parseInt(event.target.frequency.value);
  var category = event.target.category.value;
  var dueDate = event.target.duedate.value;
  var newBill = new Bill(roommatesArr, name, amountDue, frequency, category, dueDate);
  bills.push(newBill);
  newBill.splitBill();
  new LocalStorage('BillsArray', bills).saveObj();

}
// function House(houseUser, housePassword) {
//   this.houseUser = houseUser;
//   this.housePassword = housePassword;
//   houseUser.push(this);
// }

function Bill(roommates, name, amountDue, frequency, category, dueDate) {
  this.roommates = roommates;
  this.name = name;
  this.amountDue = amountDue;
  this.frequency = frequency;
  this.numSplit; //add in later
  this.category = category;
  this.paid; //handle later
  this.dueDate = dueDate;
}


function NewRmBill(name, amountDue, dueDate, category) {
  this.name = name;
  this.amountDue = amountDue;
  this.dueDate = dueDate;
  this.category = category;
}
/*Object.keys(this.navObject).forEach(key => {
    let li = document.createElement('li');
    parent.innerHTML += '<a href=' + this.navObject[key] + '>' + key + '</a>';
})*/

Bill.prototype.splitBill = function() {
  var div = this.roommates.length;
  for (var i = 0; i < div; i++) {
    if (roommate.indexOf(this.roommates[i])) {
      var splitAmnt = this.amountDue / div;
      new NewRmBill(this.name, splitAmnt, this.dueDate, this.category);

    //  var getRoommate = roommate.indexOf(this.roommates[i]).unpaid;
      console.log(roommate);
    }
  }

};

Bill.prototype.removeBill = function() {
  var billToDel = bills.indexOf(this.bills.name);
  bills.splice(billToDel, 1);
};

Bill.prototype.modifyBill = function() {
//  var billToModify = bills.indexOf(this.bills.name);
};

function LocalStorage(key, obj) {
  this.key = key;
  this.obj = obj;
}

LocalStorage.prototype.saveObj = function() {
  var objToJSON = JSON.stringify(this.obj);
  console.log(objToJSON);
  localStorage.setItem(this.key, this.objToJSON);
};

LocalStorage.prototype.getObj = function() {
  var storedObj = localStorage.getItem(this.key);
  var objToArr = JSON.parse(storedObj);
  return objToArr;
};

LocalStorage.prototype.deleteObj = function() {
  localStorage.removeItem(this.key);
};

function displayBills(){
  billList.innerHTML = '';
  for (var i = 0; i < bills.length; i++){
    var ulElement = document.getElementById('billList');
    var lineElement = document.createElement('li');
    lineElement.textContent = 'Bill Name: ' + bills[i].name + ' Amount: ' + bills[i].amountDue + ' ' + bills[i].dueDate;
    ulElement.appendChild(lineElement);
  }
}
displayBills();
