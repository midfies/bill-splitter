'use strict';

//var houseUser = [];
var roommate = [];
var bills = [];

if (localStorage.getItem('roommates')) {
<<<<<<< HEAD
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
=======
    roommate = JSON.parse(localStorage.getItem('roommates'));
}
if (localStorage.getItem('Bills')) {
    bills = JSON.parse(localStorage.getItem('Bills'));
}

//create checbox and text input for each roommate 
function createChkBox(parentEl, obj) {
    var parent = document.getElementById(parentEl);
    var div = document.createElement('div');
    div.id = "customAmnt";
    for (var i = 0; i < obj.length; i++) {
        var label = document.createElement('label');
        var inputChkBox = document.createElement('input');
        var text = document.createElement('input');
        inputChkBox.type = 'checkbox';
        inputChkBox.name = 'roommates';
        inputChkBox.value = (obj[i].firstName + obj[i].lastName).toLowerCase();
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
    var customAmnt = document.getElementById(chkBox.id + 'txt');
    //disable txt input upon unchecking roommate;
    if (chkBox.checked) {
        customAmnt.style.visibility = 'visible';
        //customAmnt.style.display = ''; 
    }
    if (!chkBox.checked) {
        customAmnt.style.visibility = 'hidden';
        //customAmnt.style.display = 'none'; 
    }
}
>>>>>>> master

var billForm = document.getElementById('bill-form');
billForm.addEventListener('submit', newBillHandler);

function newBillHandler(event) {
<<<<<<< HEAD

  event.preventDefault();
  var options = event.target.rmOptions;
  var roommatesArr = [];
  (function() {
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        roommatesArr.push(options[i].id);
      }
=======
    event.preventDefault();
    var totalPercent = 0;
    var roommates = [];
    //retrieve roommates selected and custom bill amount and push to roommates[]; 
    (function() {
        var customAmntArr = document.forms['bill-form'].elements.customAmnt;
        var chkBoxArr = document.forms['bill-form'].elements.roommates;

        //Filtering for the selected roommates form the checkbox array
        var checked = [];
        for (var i = 0; i < chkBoxArr.length; i++) {
            if (chkBoxArr[i].checked) {
                var checkedObj = {
                    id: chkBoxArr[i].value,
                    customAmnt: customAmntArr[i].value,
                };
                console.log('object of checked input', checkedObj);
                checked.push(checkedObj);
            };
        }

        for (var i = 0; i < checked.length; i++) {
            var individualBill = {
                name: checked[i].id,
                percentOwed: 0,
                amountOwed: 0,
                paid: 0
            };

            if (checked[i].id && checked[i].customAmnt) {
                individualBill.percentOwed = (parseFloat(checked[i].customAmnt) / 100).toFixed(2);
            }
            if (checked[i].id && !checked[i].customAmnt) {
                individualBill.percentOwed = parseFloat(1 / checked.length).toFixed(2);
            }

            if (totalPercent <= 1) {
                totalPercent += parseFloat(individualBill.percentOwed);
            }
            if (totalPercent > 1) {
                alert('Your total exceeds 100% of the bill!');
                break;
            }
            console.log('Percent owed', individualBill);

            roommates.push(individualBill);
        }
    }());

    //retrieve form values
    var name = event.target.billname.value;
    var amountDue = parseFloat(event.target.amount.value);
    var frequency = parseInt(event.target.frequency.value);
    var category = event.target.category.value;
    var dueDate = event.target.duedate.value;

    //Creating Bill Object
    if (roommates && name && amountDue && frequency && category && dueDate) {
        var newBill = new Bill(roommates, name, amountDue, frequency, category, dueDate, bills.length);
        newBill.splitBill();

        //Saving to local storage
        localStorage.setItem('Bills', JSON.stringify(bills));
        localStorage.setItem('roommates', JSON.stringify(roommate));

        billForm.reset();
    } else {
        console.log(totalPercent);
        if (totalPercent !== 1.00) {
            alert('Please look at how you divided the bill!');
        } else {
            alert('Please fill out all fields for the bill!');
        }
>>>>>>> master
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
<<<<<<< HEAD
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
=======
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
    Bill.prototype.payDown = function() {
        this.amountDue = this.amountDue - this.amountPaid;
    };
}

function makeHeaderRow() {
    var headings = ['Bill Name', 'Category', 'Due Date', 'Amount Due', 'Total Bill']
    var table = document.getElementById('billTable');
    var rowElement = document.createElement('tr');
    for (var i = 0; i < headings.length; i++) {
        var headElement = document.createElement('th');
        headElement.textContent = headings[i];
        rowElement.appendChild(headElement);
    }
    table.appendChild(rowElement);
}

//Building the billtable off of the bills array
function fillBillTable() {
    var table = document.getElementById('billTable');
    table.innerHTML = '';
    makeHeaderRow();
    var rowElement = document.createElement('tr');
    var dataElement = document.createElement('td');
    dataElement.textContent = 'Total';
    rowElement.appendChild(dataElement);

    for (var i = 0; i < bills.length; i++) {
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

function makeTD(id) {
    var dataElement = document.createElement('td');
    dataElement.setAttribute('id', id);
    return dataElement;
}
var billDiv = document.getElementById('billList');
billDiv.addEventListener('click', function(event) {
    var billToDisplay = parseInt(event.target.id);
    for (var i = 0; i < bills.length; i++) {
        if (billToDisplay === bills[i].id) {
            var individualBillTable = document.getElementById('individualBillTable');
            individualBillTable.innerHTML = '';
            var headings = ['Bill: ' + bills[billToDisplay].name + ' | ', 'Category: ' + bills[billToDisplay].category + ' | ', 'Amount Due | ', 'To Pay | ']
            var rowElement = document.createElement('tr');
            for (var i = 0; i < headings.length; i++) {
                var headElement = document.createElement('th');
                headElement.textContent = headings[i];
                rowElement.appendChild(headElement);
            }
            var headElement = document.createElement('th');
            headElement.textContent = 'Close';
            headElement.setAttribute('id', 'closeBox');
            rowElement.appendChild(headElement);
            individualBillTable.appendChild(rowElement);
            for (var i = 0; i < roommate.length; i++) {
                var rowElement = document.createElement('tr');
                var dataElement = document.createElement('td');
                dataElement.textContent = roommate[i].firstName + ' ' + roommate[i].lastName;
                rowElement.appendChild(dataElement);
                dataElement = document.createElement('td');
                rowElement.appendChild(dataElement);
                dataElement = document.createElement('td');
                var unpaidIndex = -1;
                for (var j = 0; j < roommate[i].unpaid.length; j++) {
                    if (roommate[i].unpaid[j].id === billToDisplay) {
                        unpaidIndex = j;
                        break;
                    } else {
                        unpaidIndex = -1;
                    }
                }
                if (unpaidIndex === -1) {
                    dataElement.textContent = 'N/A';
                } else {
                    dataElement.textContent = (roommate[i].unpaid[unpaidIndex].amountDue) - (roommate[i].unpaid[unpaidIndex].amountPaid);
                }
                rowElement.appendChild(dataElement);
                ////////////////////////////////////////////////////////////////////////////////////

                dataElement = document.createElement('td');
                var formElement = document.createElement('form');
                var inputElement = document.createElement('INPUT');
                inputElement.setAttribute('type', 'text');
                inputElement.setAttribute('name', i);
                inputElement.setAttribute('id', unpaidIndex);
                inputElement.setAttribute('class', 'payDown');
                formElement.appendChild(inputElement);
                var submitElement = document.createElement('INPUT');
                submitElement.setAttribute('type', 'submit');
                formElement.appendChild(submitElement);
                dataElement.appendChild(formElement);
                rowElement.appendChild(dataElement);
                individualBillTable.appendChild(rowElement);
            }
>>>>>>> master

            individualBillList.addEventListener('submit', function(event) {
                event.preventDefault();
                var toEditID = event.target[unpaidIndex].id;
                var toEditName = event.target[unpaidIndex].name;
                var amountPaid = parseInt(event.target[unpaidIndex].value);
                event.target[unpaidIndex].value = null;
                roommate[toEditName].unpaid[toEditID].amountPaid += amountPaid;


                localStorage.setItem('roommates', JSON.stringify(roommate));
            });
            /////////////////////////////////////////////////////////////////////////////////////
        }
    }
<<<<<<< HEAD

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
=======
    var closeBox = document.getElementById('closeBox');
    closeBox.addEventListener('click', function() {
        individualBillTable.innerHTML = '';
    });
});

fillBillTable();
>>>>>>> master
