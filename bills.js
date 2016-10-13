'use strict';

var roommate = [];
var bills = [];

if (localStorage.getItem('roommates')) {
    roommate = JSON.parse(localStorage.getItem('roommates'));
}
if (localStorage.getItem('Bills')) {
    bills = JSON.parse(localStorage.getItem('Bills'));
}

function makeHeaderRow() {
    var headings = ['Bill Name', 'Category', 'Due Date', 'Amount Due', 'Total Bill'];
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
