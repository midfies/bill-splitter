'use strict';

//var houseUser = [];
var roommate = [];
var bills = [];

if (localStorage.getItem('roommates')) {
  console.log('Fetching Roommate LS...');
  roommate = JSON.parse(localStorage.getItem('roommates'));
  console.log(roommate);
}
if (localStorage.getItem('Bills')){
  console.log('Fetching Bills LS...');
  bills = JSON.parse(localStorage.getItem('Bills'));
}

(function roommateSelect() {
  var parent = document.getElementById('rmOptions');
  for (var i = 0; i < roommate.length; i++) {
    var option = document.createElement('option');
    option.value = roommate[i].firstName + ' ' + roommate[i].lastName;
    option.id = roommate[i].userID;
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
        roommatesArr.push(options[i].id);
      }
    }
  }());

  //retrieve form values
  var name = event.target.billname.value;
  var amountDue = parseFloat(event.target.amount.value);
  var frequency = parseInt(event.target.frequency.value);
  var category = event.target.category.value;
  var dueDate = event.target.duedate.value;

  //Creatomg Bill Object
  if (name && amountDue && frequency && category && dueDate) {
       //Creating Bill Object
       var newBill = new Bill(roommatesArr, name, amountDue, frequency, category, dueDate, bills.length);
       console.log(bills);
       //Updating data structures
       newBill.splitBill();

       //Saving to local storage
       localStorage.setItem('Bills', JSON.stringify(bills));
       localStorage.setItem('roommates', JSON.stringify(roommate));

       //clear form
       billForm.reset();
   } else {
     alert('Please fill out all fields for the bill!');
   }
}

function Bill(roommates, name, amountDue, frequency, category, dueDate, id) {
  this.roommates = roommates;
  this.name = name;
  this.amountDue = amountDue;
  this.frequency = frequency;
  this.category = category;
  this.paid; //handle later
  this.dueDate = dueDate;
  this.id = id;
  bills.push(this);

  this.splitBill = function() {
    var div = this.roommates.length;
    for (var i = 0; i < div; i++) {
      if (roommate.indexOf(this.roommates[i])) {
        var splitAmnt = this.amountDue / div;
        var billObj = new IndividualBill(this.id, splitAmnt);
        var rmIndex = roommate.findIndex(x => x.userID === this.roommates[i]);
        console.log(roommate[rmIndex].unpaid);
        roommate[rmIndex].unpaid.push(billObj);
      } else {
        return Error;
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
}


function IndividualBill(id, amountDue) {
<<<<<<< HEAD
    this.id = id;
    this.paid = false;
    this.amountDue = amountDue;
    this.dueDate = dueDate;
    this.category = category;

    this.modifyRmBill = function(amntPaid) {
        this.amountDue = this.amountDue - amntPaid;
    }

}())

}
=======
  this.id = id;
  this.amountDue = amountDue;
  this.amountPaid = 0;
  this.paid = false;
}

function makeHeaderRow() {
  var headings = ['Bill Name', 'Category', 'Due Date', 'Amount Due']
  var table = document.getElementById('billTable');
  var rowElement = document.createElement('tr');
  for (var i = 0; i < headings.length; i++){
    var headElement = document.createElement('th');
    headElement.textContent = headings[i];
    rowElement.appendChild(headElement);
  }
  table.appendChild(rowElement);
}
function fillBillTable(){
  var table = document.getElementById('billTable');
  table.innerHTML = '';
  makeHeaderRow();
  var rowElement = document.createElement('tr');
  var dataElement = document.createElement('td');
  dataElement.textContent = 'Total';
  rowElement.appendChild(dataElement);

  for(var i = 0; i < bills.length; i++){
    rowElement = document.createElement('tr');
    dataElement = document.createElement('td');
    dataElement.textContent = bills[i].name;
    rowElement.appendChild(dataElement);
    dataElement = document.createElement('td');
    dataElement.textContent = bills[i].category;
    rowElement.appendChild(dataElement);
    dataElement = document.createElement('td');
    dataElement.textContent = bills[i].dueDate;
    rowElement.appendChild(dataElement);
    dataElement = document.createElement('td');
    dataElement.textContent = bills[i].amountDue;
    rowElement.appendChild(dataElement);
    table.appendChild(rowElement);
  }

}
fillBillTable();
>>>>>>> master
