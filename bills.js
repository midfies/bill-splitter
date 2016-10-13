'use strict';

//var houseUser = [];
var roommate = [];
var bills = [];
var loggedIn = localStorage.getItem('loggedInID');
var house = JSON.parse(localStorage.getItem(loggedIn));
roommate = house.roommates;
bills = house.bills;
// if (localStorage.getItem('roommates')) {
//     roommate = JSON.parse(localStorage.getItem('roommates'));
// }
// if (localStorage.getItem('Bills')) {
//     bills = JSON.parse(localStorage.getItem('Bills'));
// }

//create checbox and text input for each roommate

function makeHeaderRow() {
    var headings = ['Bill Name', 'Category', 'Due Date', 'Amount Due'];
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
        dataElement.textContent = bills[i].amountDue;
        rowElement.appendChild(dataElement);
        var buttonElement = document.createElement('button');
        buttonElement.setAttribute('id', bills[i].id);
        buttonElement.setAttribute('class', 'removeBill');
        buttonElement.textContent = 'Pay Off';
        rowElement.appendChild(buttonElement);
        table.appendChild(rowElement);
    }
    table.addEventListener('click', function(event) {
     console.log(event);
     if(event.target.nodeName === 'BUTTON'){
       var toRemove = parseInt(event.target.id);
       for (var i = 0; i < bills.length; i++){
         if (toRemove === bills[i].id){
           if (confirm('Are you sure you want to pay and remove ' + bills[i].name + ' from the list?')){
             bills.splice(i, 1);
             house.bills = bills;
             var toLocalStorage = JSON.stringify(house);
             localStorage.setItem(loggedIn,toLocalStorage);
             location.reload();
           }
         }
       }

     }
    });
    var total = 0;
    rowElement = document.createElement('tr');
    dataElement = document.createElement('td');
    dataElement.setAttribute('class','totalRowSpacing');
    rowElement.appendChild(dataElement);
    dataElement = document.createElement('td');
    dataElement.setAttribute('class','totalRowSpacing');
    rowElement.appendChild(dataElement);
    dataElement = document.createElement('td');
    dataElement.setAttribute('class','totalRowSpacing');
    rowElement.appendChild(dataElement);
    for (var i = 0; i < bills.length; i++){
      total += bills[i].amountDue;
    }
    dataElement = document.createElement('td');
    dataElement.textContent = total;
    rowElement.appendChild(dataElement);
    console.log('Total: ', total);
    table.appendChild(rowElement);
}

function makeTD(id) {
    var dataElement = document.createElement('td');
    dataElement.setAttribute('id', id);
    return dataElement;
}

var billDiv = document.getElementById('billList');
var individualBillTable = document.getElementById('individualBillTable');
billDiv.addEventListener('click', handleIndividualBillDisplay);

function handleIndividualBillDisplay(event) {
    var billToDisplay = parseInt(event.target.id);
    for (var i = 0; i < bills.length; i++) {
        if (billToDisplay === bills[i].id) {
            individualBillTable.innerHTML = '';
            buildIndividualBillHeader(billToDisplay);
            for (var j = 0; j < bills[i].roommates.length; j++) {
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

            function buildIndividualBillHeader(billToDisplay) {
                var headings = ['Bill: ' + bills[billToDisplay].name + ' | ', 'Category: ' + bills[billToDisplay].category + ' | ', 'Amount Due | '];
                var rowElement = document.createElement('tr');
                for (var i = 0; i < headings.length; i++) {
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
    closeBox.addEventListener('click', function() {
        individualBillTable.innerHTML = '';
    });
}
fillBillTable();
