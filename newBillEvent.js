'use strict';

var roommate = [];
var bills = [];

var loggedIn = localStorage.getItem('loggedInID');
var house = JSON.parse(localStorage.getItem(loggedIn));
roommate = house.roommates;
bills = house.bills;

var customBill = document.getElementById('customAmnt');
customBill.addEventListener('change', customBillHandler);

function customBillHandler(event) {
    event.preventDefault();
    var chkBox = event.target;
    var customAmnt = document.getElementById(chkBox.id + 'txt');
    //disable txt input upon unchecking roommate;
    if (chkBox.checked) {
        //customAmnt.style.visibility = 'visible';
        customAmnt.style.display = '';
    }
    if (!chkBox.checked) {
        //customAmnt.style.visibility = 'hidden';
        customAmnt.style.display = 'none';
    }
}

var calendar = document.getElementById('navigation');
calendar.addEventListener('click', calendarHandler);

function calendarHandler(event) {
    event.preventDefault();
    var calendarElement = document.getElementById('calendar');
    var href = event.target.href;
    var click = event.target.innerHTML;
    if (click === 'Calendar') {
        calendarElement.setAttribute('position', 'absolute');
        calendarElement.setAttribute('top', '50%');
        calendarElement.setAttribute('left', '50%');
    } else {
        location.href = href;
    }
}

var billForm = document.getElementById('bill-form');
billForm.addEventListener('submit', newBillHandler);

function newBillHandler(event) {
    event.preventDefault();
    var totalPercent = 0;
    var roommates = [];
    //retrieve roommates selected and custom bill amount and push to roommates[];
    (function() {
        var customAmntArr = document.forms['bill-form'].elements.customAmnt;
        var chkBoxArr = document.forms['bill-form'].elements.roommates;

        //Filtering for the selected roommates from the checkbox array
        var checked = [];
        if (chkBoxArr) {
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
        } else {
            alert('You dont have any roommates added');
        }
        //Creating sub object to store individual bill data in the Bill object
        for (var i = 0; i < checked.length; i++) {
            var individualBill = {
                name: checked[i].id,
                percentOwed: 0,
                amountOwed: 0,
                paid: 0
            };
            //Checks for default split or custom input split
            if (checked[i].id && checked[i].customAmnt) {
                individualBill.percentOwed = (parseFloat(checked[i].customAmnt) / 100).toFixed(2);
            }
            if (checked[i].id && !checked[i].customAmnt) {
                if (checked.length === 1) {
                    individualBill.percentOwed = parseFloat(1 / checked.length).toFixed(2);
                } else if (i === checked.length - 1 && 100 % checked.length !== 0) {
                    individualBill.percentOwed = parseFloat((1 / checked.length) + .01).toFixed(2);
                } else {
                    individualBill.percentOwed = parseFloat(1 / checked.length).toFixed(2);
                }
            }
            if (totalPercent <= 1) {
                totalPercent += parseFloat(individualBill.percentOwed);
            }
            if (totalPercent > 1) {
                alert('Your total exceeds 100% of the bill. Please revisit how the bill is divided!');
                break;
            }
            console.log('Percent owed', individualBill);

            roommates.push(individualBill);
        }
    }());

    //retrieve form values
    var name = event.target.billname.value;
    var amountDue = parseFloat(event.target.amount.value);
    // var frequency = parseInt(event.target.frequency.value);
    var category = event.target.category.value;
    var dueDate = event.target.duedate.value;

    //Creating Bill Object
    if (roommates && name && amountDue && category && dueDate && totalPercent === 1) {
        var newBill = new Bill(roommates, name, amountDue, category, dueDate, bills.length);
        newBill.splitBill();

        //Saving to local storage
        house.bills = bills;
        console.log('house.roommates ', house.roommates);
        console.log('roommates', roommates);
        //  house.roommates = roommates;
        var toLocalStorage = JSON.stringify(house);
        localStorage.setItem(loggedIn, toLocalStorage);
        // localStorage.setItem('Bills', JSON.stringify(bills));
        // localStorage.setItem('roommates', JSON.stringify(roommate));

        billForm.reset();
        var resetcheckboxes = document.getElementById('checkboxes').innerHTML = '';
        createChkBox('checkboxes', roommate);
    } else {
        console.log(totalPercent);
        if (totalPercent !== 1.00) {
            alert('How the bill is divided doesnt sum to 100 percent of the amount due!');
        } else {
            alert('Please fill out all fields for the bill!');
        }
    }
    location.reload();
}

function Bill(roommates, name, amountDue, category, dueDate, id) {
    this.roommates = roommates;
    this.name = name;
    this.amountDue = amountDue;
    this.category = category;
    this.paid = 0; //handle later
    this.dueDate = dueDate;
    this.id = id;
    house.bills.push(this);

    this.splitBill = function() {
        // if (s  .getItem('roommates')) {
        //     roommate = JSON.parse(localStorage.getItem('roommates'));
        // }
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