/**
 * Creates page navigation
 * @param navObject: object for navigation elements with keys being name and values being the src
 * @param parentEl: html element to place form in
 */
module.exports = class Navigation {
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


/**
 * Creates a form
 * @param elClass: class assigned to the Form element
 * @param elId: id assigned to the Form element
 * @param input: array of object with type and name properties
 * @param parentEl: html element to place form in
 */
module.exports = class Form {
    constructor(elClass, elId, input, parentEl) {
        this.elClass = elClass;
        this.elId = elId;
        this.input = input;
        this.parentEl = parentEl;
    }

    creatForm() {
        let parent = document.getElementById(this.parentEl);
        let form = document.createElement('form');
        form.className = this.elClass;
        form.id = this.elId;
        for (var i = 0; i < this.input.length; i++) {
            let input = document.createElement(input[i].type);
            input.type = this.input[i];
            tr.appendChild(th);
        }
        parent.appendChild(input);
    }
}

/**
 * Creates a table
 * @param elClass: class assigned to the Form element
 * @param elId: id assigned to the Form element
 * @param input: array of object with type and name properties
 * @param parentEl: html element to place form in
 */
module.exports = class Table {
    constructor(data, head, parentEl) {
        this.data = data;
        this.head = head;
        this.parentEl = parentEl;
    }

    head() {
        let parent = document.getElementById(this.parentEl);
        let tr = document.createElement('tr');
        for (var i = 0; i < this.head.length; i++) {
            let th = document.createElement('th');
            th.textContent = this.head[i];
            tr.appendChild(th);
        }
        parent.appendChild(tr);
    }

    row() {
        for (var i = 0; i < this.data.length; i++) {
            let tr = document.createElement('tr');
            for (var j = 0; j < this.head.length; j++) {
                let td = document.createElement('td');
                if (j === 0) {
                    td.innerHTML = this.data[i];
                }
                tr.appendChild(td);
            }
            parent.appendChild(tr);
        }
    }

    populate() {
        this.head();
        this.row();
    }
}