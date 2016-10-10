'use strict';

var houseUser = [];
var roommate = [];
var bills = [];

//Mock Objects 
var roommate = [
    { first: 'Jed', last: 'Thompson', email: 'jedlee2004@gmail.com', unpaid: [] },
    { first: 'Firshta', last: 'Shefa', email: 'firshtashefa@gmail.com', unpaid: [] },
    { first: 'Jeff', last: 'Wallace', email: 'rs4race@gmail.com' },
    { first: 'Jason', last: 'Chu', email: 'jchu@gmail.com', unpaid: [] },
];

(function roommateSelect() {
    var parent = document.getElementById('rmOptions');
    for (var i = 0; i < roommate.length; i++) {
        var option = document.createElement('option');
        option.value = roommate[i].first + ' ' + roommate[i].last;
        option.innerHTML = roommate[i].first + ' ' + roommate[i].last;
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
    var amountDue = parseInt(event.target.amount.value);
    var frequency = parseInt(event.target.frequency.value);
    var category = event.target.category.value;
    var dueDate = event.target.duedate.value;
    var newBill = new Bill(roommatesArr, name, amountDue, frequency, category, dueDate);
    bills.push(newBill);
    newBill.splitBill();
    new LocalStorage('BillsArray', bills).saveObj();

}

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

function newRmBill(name, amountDue, dueDate, category) {
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
            new newRmBill(this.name, splitAmnt, this.dueDate, this.category); 
            
            var getRoommate = roommate.indexOf(this.roommates[i]).unpaid;
            console.log(roommate);
        }
    }

}

Bill.prototype.removeBill = function() {
    var billToDel = bills.indexOf(this.bills.name);
    bills.splice(billToDel, 1);
}

Bill.prototype.modifyBill = function() {
    var billToModify = bills.indexOf(this.bills.name);
}

function LocalStorage(key, obj) {
    this.key = key;
    this.obj = obj;
}

LocalStorage.prototype.saveObj = function() {
    let objToJSON = JSON.stringify(this.obj);
    console.log(objToJSON);
    localStorage.setItem(this.key, this.objToJSON);
}

LocalStorage.prototype.getObj = function() {
    let storedObj = localStorage.getItem(this.key);
    let objToArr = JSON.parse(storedObj);
    return objToArr;
}

LocalStorage.prototype.deleteObj = function() {
    localStorage.removeItem(this.key);
}

function House(houseUser, housePassword) {
    this.houseUser = houseUser;
    this.housePassword = housePassword;
    houseUser.push(this);
}