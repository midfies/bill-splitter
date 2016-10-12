'use strict';

//var houseUser = [];
var roommate = [];
var bills = [];

if (localStorage.getItem('roommates')) {
  roommate = JSON.parse(localStorage.getItem('roommates'));
}
if (localStorage.getItem('Bills')){
  console.log('Fetching Bills LS...');
  bills = JSON.parse(localStorage.getItem('Bills'));
}


function createChkBox(parentEl, obj) {
  var parent = document.getElementById(parentEl);
  var div = document.createElement('div');
  div.id = 'customAmnt';
  for (var i = 0; i < obj.length; i++) {
    var label = document.createElement('label');
    var inputChkBox = document.createElement('input');
    var text = document.createElement('input');
    inputChkBox.type = 'checkbox';
    inputChkBox.name = 'roommates';
    inputChkBox.value = (obj[i].firstName + ' ' + obj[i].lastName);
    inputChkBox.checked = 'on';
    inputChkBox.id = 'check' + i;
    text.type = 'text';
    text.name = 'customAmnt';
    text.id = 'check' + i + 'txt';
    label.for = obj[i].firstName + ' ' + obj[i].lastName;
    label.innerHTML = obj[i].firstName + ' ' + obj[i].lastName;
    div.appendChild(label);
    div.appendChild(inputChkBox);
    div.appendChild(text);
  }
  parent.appendChild(div);
}
createChkBox('checkboxes', roommate);

var customBill = document.getElementById('customAmnt');
customBill.addEventListener('change', customBillHandler);

function customBillHandler(event) {
  event.preventDefault();
  var chkBox = event.target;
  //disable txt input upon unchecking roommate;
  if (chkBox.checked) {
    customAmnt.style.visibility = 'visible';
      //customAmnt.style.display = '';
  }
  if (!chkBox.checked) {
    customAmnt.style.visibility = 'hidden';
      //customAmnt.style.display = 'none';
  }

  if (chkBox.checked) {
    console.log(chkBox);
    var customAmnt = document.getElementById(chkBox.id + 'txt');
  }
}

var billForm = document.getElementById('bill-form');
billForm.addEventListener('submit', newBillHandler);

function newBillHandler(event) {
  event.preventDefault();
  var roommates = [];
  (function() {
    var totalPercent = 0;
    var chkBoxArr = document.forms['bill-form'].elements.roommates;
    var customAmntArr = document.forms['bill-form'].elements.customAmnt;
    for (var i = 0; i < chkBoxArr.length; i++) {
      if (chkBoxArr[i].checked) {
        var percentageOwed;

        if (customAmntArr[i].value) {
          percentageOwed = parseFloat(customAmntArr[i].value) / 100;
        } else {
          percentageOwed = 1 / chkBoxArr.length;
        }

        var individualBill = {
          name: chkBoxArr[i].value,
          percentOwed: percentageOwed,
          amountOwed: 0,
          paid: 0,
        };
      }
      if (totalPercent <= 100 || totalPercent <= 1) {
        totalPercent += parseFloat(customAmntArr[i].value);
        roommates.push(individualBill);
      }
      if (totalPercent > 100) {
        alert('Your total exceeds 100% of the bill!');
        break;
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
    var newBill = new Bill(roommates, name, amountDue, frequency, category, dueDate, bills.length);
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
  this.paid = 0; //handle later
  this.dueDate = dueDate;
  this.id = id;
  bills.push(this);

  this.splitBill = function() {
    if (localStorage.getItem('roommates')) {
      roommate = JSON.parse(localStorage.getItem('roommates'));
    }
    console.log('roommates arr length', this.roommates);
    for (var i = 0; i < this.roommates.length; i++) {
      var selectedRM = this.roommates[i];
      if (roommate.indexOf(selectedRM.roommate)) {
        if (selectedRM.percentOwed) {
          selectedRM.amountOwed = (this.amountDue * selectedRM.percentOwed).toFixed(2);
        }
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
  Bill.prototype.payDown = function(){
    this.amountDue = this.amountDue - this.amountPaid;
  };
}

function makeHeaderRow() {
  var headings = ['Bill Name', 'Category', 'Due Date', 'Amount Due', 'Total Bill'];
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
    rowElement.setAttribute('id', bills[i].id);
    dataElement = makeTD(bills[i].id);
    dataElement.textContent = bills[i].name;
    rowElement.appendChild(dataElement);
    dataElement = makeTD(bills[i].id);
    dataElement.textContent = bills[i].category;
    rowElement.appendChild(dataElement);
    dataElement = makeTD(bills[i].id);
    dataElement.textContent = bills[i].dueDate;
    rowElement.appendChild(dataElement);
    dataElement = makeTD(bills[i].id);
    dataElement.textContent = bills[i].amountPaid;
    rowElement.appendChild(dataElement);
    dataElement = makeTD(bills[i].id);
    dataElement.textContent = bills[i].amountDue;
    rowElement.appendChild(dataElement);
    table.appendChild(rowElement);
  }
}
function makeTD(id){
  var dataElement = document.createElement('td');
  dataElement.setAttribute('id', id);
  return dataElement;
}

var billDiv = document.getElementById('billList');
var individualBillTable = document.getElementById('individualBillTable');
billDiv.addEventListener('click', handleIndividualBillDisplay);

function handleIndividualBillDisplay(event) {
  var billToDisplay = parseInt(event.target.id);
  for (var i = 0; i < bills.length; i++){
    if (billToDisplay === bills[i].id){
      individualBillTable.innerHTML = '';
      buildIndividualBillHeader(billToDisplay);
      for (var j = 0; j < bills[i].roommates.length; j++){
        var rowElement = document.createElement('tr');
        var dataElement = document.createElement('td');
        console.log(bills[i].roommates[j].name);
        dataElement.textContent = bills[i].roommates[j].name;
        rowElement.appendChild(dataElement);
        dataElement = document.createElement('td');
        rowElement.appendChild(dataElement);
        dataElement = document.createElement('td');
        dataElement.id = 'amountOwed';
        dataElement.textContent = bills[i].roommates[j].amountOwed;
        rowElement.appendChild(dataElement);
        dataElement = document.createElement('td');

        individualBillTable.appendChild(rowElement);
      }

      function buildIndividualBillHeader(billToDisplay){
        var headings = ['Bill: ' + bills[billToDisplay].name + ' | ','Category: ' + bills[billToDisplay].category  + ' | ' , 'Amount Due | '];
        var rowElement = document.createElement('tr');
        for (var i = 0; i < headings.length; i++){
          var headElement = document.createElement('th');
          headElement.textContent = headings[i];
          rowElement.appendChild(headElement);
        }
        headElement = document.createElement('th');
        headElement.textContent = 'Close';
        headElement.setAttribute('id', 'closeBox');
        rowElement.appendChild(headElement);
        individualBillTable.appendChild(rowElement);
      }
    }
  }
  var closeBox = document.getElementById('closeBox');
  closeBox.addEventListener('click', function(){
    individualBillTable.innerHTML = '';
  });
}
fillBillTable();
