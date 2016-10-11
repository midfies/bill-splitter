'use strict';

var houseUser = [];
var roommate = [];
var bills = [];

if (localStorage.getItem('roommates')) {
    console.log('Fetching roommates...');
    roommate = JSON.parse(localStorage.getItem('roommates'));

}
if (localStorage.getItem('Bills')) {
    console.log('Fetching Bills...');
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

// Bill Constructor
function Bill(roommates, name, amountDue, frequency, category, dueDate, id) {
    this.roommates = roommates;
    this.name = name;
    this.amountDue = amountDue;
    this.frequency = frequency;
    this.category = category;
    this.paid = false;
    this.dueDate = dueDate;
    this.id = id;

    bills.push(this);

    this.splitBill = function() {
        var div = this.roommates.length;
        for (var i = 0; i < div; i++) {
            if (roommate.indexOf(this.roommates[i])) {
                var splitAmnt = this.amountDue / div; //rework split calculation
                var billObj = new NewRmBill(this.id, splitAmnt);
                var rmIndex = roommate.findIndex(x => x.userID === this.roommates[i]);
                roommate[rmIndex].unpaid.push(billObj);
                roommate[rmIndex].id = bills.length;
                console.log('unpaid' + this.roommates[i], roommate[rmIndex].unpaid);
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
function IndividualBill(id, amountDue) {
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
