'use strict';

let houseUser = [];
let roommate = [];
let bills = [];

module.exports = class House {
    constructor(houseUser, housePassword) {
        this.houseUser = houseUser;
        this.housePassword = housePassword;
        houseUser.push(this);
    }
}

module.exports = class Roommate {
    constructor(roommate, unpaid, paid) {
        this.roommate = roommate;
        this.unpaid = unpaid;
        this.paid = paid;
    }

    addRoommate() {
        roommate.push(this);
    }

    deleteRoommate() {
        let roommateToDel = roommate.indexOf(this.Roommate);
        roommate.splice(roommateToDel, 1);
    }
}

module.exports = class Bill {
    constructor(name, roommates, amountDue, frequency, numSplit, category, paid, dueDate) {
        this.name = name;
        this.roommates = roommates;
        this.amountDue = amountDue;
        this.frequency = frequency;
        this.numSplit = numSplit;
        this.category = category;
        this.paid = paid;
        this.dueDate = dueDate;
    }

    addBill() {
        bills.push(this);
    }

    removeBill() {
        let billToDel = bills.indexOf(this.bills.name);
        bills.splice(billToDel, 1);
    }

    modifyBill() {
        let billToModify = bills.indexOf(this.bills.name);
    }

    archiveBill() {

    }
}

module.exports = class Calculations extends Bill {
    constructor() {
        super();
    }
    split() {
        let perPerson = this.amount / this.roommates;
        return perPerson;
    }
}