'use strict';

var houseUser = [];
var roommate = [];
var bills = [];

if (localStorage.getItem('roommates')) {
    console.log('Fetching LS...');
    roommate = JSON.parse(localStorage.getItem('roommates'));
    console.log(roommate);
} else {
    roommate = [
        { userID: 'jedthompson', firstName: 'Jed', lastName: 'Thompson', email: 'jedlee2004@gmail.com', unpaid: [] },
        { userID: 'firshtashefa', firstName: 'Firshta', lastName: 'Shefa', email: 'firshtashefa@gmail.com', unpaid: [] },
        { userID: 'jeffwallace', firstName: 'Jeff', lastName: 'Wallace', email: 'rs4race@gmail.com', unpaid: [] },
        { userID: 'jasonchu', firstName: 'Jason', lastName: 'Chu', email: 'jchu@gmail.com', unpaid: [] },
    ];
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

//Event Handler
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
    var newBill = new Bill(roommatesArr, name, amountDue, frequency, category, dueDate);

    //Updating data structures
    bills.push(newBill);
    newBill.splitBill();

    //Saving to local storage
    localStorage.setItem('Bills', JSON.stringify(bills));
    localStorage.setItem('roommates', JSON.stringify(roommate));

    //clear form
    billForm.reset();
}

// Bill Constructor
function Bill(roommates, name, amountDue, frequency, category, dueDate) {
    this.roommates = roommates;
    this.name = name;
    this.amountDue = amountDue;
    this.frequency = frequency;
    this.category = category;
    this.paid = false;
    this.dueDate = dueDate;

    this.splitBill = function() {
        var div = this.roommates.length;
        for (var i = 0; i < div; i++) {
            if (roommate.indexOf(this.roommates[i])) {
                var splitAmnt = this.amountDue / div; //rework split calculation
                var billObj = new NewRmBill(this.name, splitAmnt, this.dueDate, this.category);
                var rmIndex = roommate.findIndex(x => x.userID == this.roommates[i]);
                roommate[rmIndex].unpaid.push(billObj);
                console.log('unpaid', roommate[rmIndex].unpaid);
            } else {
                return Error;
            }
        }
    }

    this.removeBill = function() {
        var billIndex = bills.findIndex(x => x.name == this.roommates[i]);
        var rmBillIndex;
        bills.splice(billIndex, 1);
        //remove from bills array and from unpaid array of each roommate obj
    }

    this.modifyBill = function() {
        //  var billToModify = bills.indexOf(this.bills.name);
        var bill
    }
}

// roommate bill portion Constructor
function NewRmBill(name, amountDue, dueDate, category) {
    this.name = name;
    this.amountDue = amountDue;
    this.dueDate = dueDate;
    this.category = category;
}

function LocalStorage(key, obj) {
    this.key = key;
    this.obj = obj;

    this.saveObj = function() {
        var objToJSON = JSON.stringify(this.obj);
        localStorage.setItem(this.key, this.objToJSON);
    };

    this.getObj = function() {
        var storedObj = localStorage.getItem(this.key);
        var objToArr = JSON.parse(storedObj);
        return objToArr;
    };

    this.deleteObj = function() {
        localStorage.removeItem(this.key);
    };
}

(function displayBills() {
    billList.innerHTML = '';
    for (var i = 0; i < bills.length; i++) {
        var ulElement = document.getElementById('billList');
        var lineElement = document.createElement('li');
        lineElement.textContent = 'Bill Name: ' + bills[i].name + ' Amount: ' + bills[i].amountDue + ' ' + bills[i].dueDate;
        ulElement.appendChild(lineElement);
    }
}())