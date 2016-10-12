'use strict';

//var houseUser = [];
var roommate = [];
var bills = [];

if (localStorage.getItem('roommates')) {
    console.log('Fetching Roommate LS...');
    roommate = JSON.parse(localStorage.getItem('roommates'));
    console.log(roommate);
}
if (localStorage.getItem('Bills')) {
    console.log('Fetching Bills LS...');
    bills = JSON.parse(localStorage.getItem('Bills'));
}

function createChkBox(parentEl, obj) {
    var parent = document.getElementById(parentEl);
    for (var i = 0; i < obj.length; i++) {
        var label = document.createElement('label');
        var inputChkBox = document.createElement('input');
        var text = document.createElement('input');
        inputChkBox.type = 'checkbox';
        inputChkBox.name = 'roommates';
        inputChkBox.value = (obj[i].firstName + obj[i].lastName).toLowerCase();
        inputChkBox.checked = 'on';
        text.type = 'text';
        text.name = obj[i].firstName + ' ' + obj[i].lastName;
        label.for = obj[i].firstName + ' ' + obj[i].lastName;
        label.innerHTML = obj[i].firstName + ' ' + obj[i].lastName;
        parent.appendChild(label);
        parent.appendChild(inputChkBox);
        parent.appendChild(text);
    }
}
createChkBox('checkboxes', roommate);


var billForm = document.getElementById('bill-form');
billForm.addEventListener('submit', newBillHandler);

function newBillHandler(event) {
    event.preventDefault();

    var chkBoxArr = document.forms['bill-form'].elements.roommates;
    console.log(chkBoxArr);
    var roommates = [];
    (function() {
        for (var i = 0; i < chkBoxArr.length; i++) {
            if (chkBoxArr[i].checked) {
                roommates.push(chkBoxArr[i].value);
            }
        }
    }());

    //retrieve form values
    var name = event.target.billname.value;
    var amountDue = parseFloat(event.target.amount.value);
    var frequency = parseInt(event.target.frequency.value);
    var category = event.target.category.value;
    var dueDate = event.target.duedate.value;


    //Creating Bill Object
    if (name && amountDue && frequency && category && dueDate) {
        var newBill = new Bill(roommates, name, amountDue, frequency, category, dueDate, bills.length);
        newBill.splitBill();

        //Saving to local storage
        localStorage.setItem('Bills', JSON.stringify(bills));
        localStorage.setItem('roommates', JSON.stringify(roommate));

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
                var splitAmnt = (this.amountDue / div).toFixed(2);
                var billObj = new IndividualBill(splitAmnt);
                var rmIndex = roommate.findIndex(x => x.userID === this.roommates[i]);
                console.log(roommate[rmIndex].unpaid);
                roommate[rmIndex].unpaid.push(billObj);
            } else {
                return Error;
            }
        }
    };

    this.removeBill = function() {
        var billToDel = bills.indexOf(this.bills.name);
        bills.splice(billToDel, 1);
    };

    this.modifyBill = function() {
        //  var billToModify = bills.indexOf(this.bills.name);
    };
}

function IndividualBill(amountDue) {
    this.id = bills.length - 1;
    this.amountDue = amountDue;
    this.amountPaid = 0;
    this.paid = false;
}

function makeHeaderRow() {
    var headings = ['Bill Name', 'Category', 'Due Date', 'Amount Due']
    var table = document.getElementById('billTable');
    var rowElement = document.createElement('tr');
    for (var i = 0; i < headings.length; i++) {
        var headElement = document.createElement('th');
        headElement.textContent = headings[i];
        rowElement.appendChild(headElement);
    }
    table.appendChild(rowElement);
}

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