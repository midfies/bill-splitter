/**
 * Creates page navigation
 * @param navObject: object for navigation elements with keys being name and values being the src
 * @param parentEl: html element to place form in
 */
class Navigation {
    constructor(parentEl, navObject) {
        this.parentEl = parentEl;
        this.navObject = navObject;
    }

    navElements() {
        let parent = document.getElementById(this.parentEl);
        Object.keys(this.navObject).forEach(key => {
            let li = document.createElement('li');
            parent.innerHTML += '<a href=' + this.navObject[key] + '>' + key + '</a>';
        })
    }
}

var navObj = {
    'Home': 'home.html',
    'Roommate': 'roommate.html',
    'About Us': 'about_us.html',
    'Bills': 'bills.html'
}
var nav = new Navigation('navigation', navObj).navElements();

/**
 * Creates a form
 * @param elClass: class assigned to the Form element
 * @param elId: id assigned to the Form element
 * @param input: array of object with type and name properties
 * @param parentEl: html element to place form in
 */
function Form(elClass, elId, input, parentEl) {
    this.elClass = elClass;
    this.elId = elId;
    this.input = input;
    this.parentEl = parentEl;
}

Form.prototype.createForm = function() {
    var parent = document.getElementById(this.parentEl);
    var form = document.createElement('form');
    form.className = this.elClass;
    form.id = this.elId;
    for (var i = 0; i < this.input.length; i++) {

        var label = document.createElement('label');
        label.for = this.input[i].name;
        label.innerHTML = this.input[i].name;

        var inputEl = document.createElement('input');
        inputEl.type = this.input[i].type;
        inputEl.name = this.input[i].name;
        form.appendChild(label, inputEl);
        console.log(inputEl);
    }
    parent.appendChild(inputEl);
}

var billForm = [
    { name: 'name', type: 'text' },
    { name: 'category', type: 'text' },
    { name: 'amount', type: 'text' },
    { name: 'frequency', type: 'text' },
    { name: 'dueDate', type: 'text' },
    { name: 'submit', type: 'submit' }
]

//var billForm = new Form('Bills', 'Bill-Form', billForm, 'bill-form').createForm();

/**
 * Creates a table
 * @param elClass: class assigned to the Form element
 * @param elId: id assigned to the Form element
 * @param input: array of object with type and name properties
 * @param parentEl: html element to place form in
 */

//roommates, name, amountDue, frequency, category, dueDate)

class Table {
    constructor(headData, tableData, parentEl) {
        this.tableData = tableData;
        this.headData = headData;
        this.parentEl = parentEl;
    }

    head() {
        let parent = document.getElementById(this.parentEl);
        let tr = document.createElement('tr');
        for (var i = 0; i < this.headData.length; i++) {
            let th = document.createElement('th');
            th.textContent = this.headData[i];
            tr.appendChild(th);
        }
        parent.appendChild(tr);
    }

    billRow() {
        let parent = document.getElementById(this.parentEl);
        console.log(this.tableData);
        var tr = document.createElement('tr');
        var data = Object.keys(this.tableData[i]).forEach(key => {
            var td = document.createElement('td');
            td.innerHTML = this.tableData[key];
            tr.appendChild(td);
        })
        parent.appendChild(tr);
        /*
        for (var i = 0; i < this.tableData.length; i++) {
            var tr = document.createElement('tr');
            var data = Object.keys(this.tableData[i]).forEach(key => {
                var td = document.createElement('td');
                td.innerHTML = this.tableData[key];
                tr.appendChild(td);
            })
            parent.appendChild(tr);
            */
        }

    populate() {
        this.head();
        this.billRow();
    }
}

// Object.keys(this.navObject).forEach(key => {
//     let li = document.createElement('li');
//     parent.innerHTML += '<a href=' + this.navObject[key] + '>' + key + '</a>';
// })
//
// var headData = ['Category', 'Bill Name', 'Frequency', 'Amount Due', 'Due Date'];
// var tableData = JSON.parse(localStorage.getItem('Bills'));
// console.log(tableData);
// var billTable = new Table(headData, tableData, 'bill-table').populate();
