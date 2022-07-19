"use strict";
class Department {
    constructor(n) {
        this.name = 'NO_DEPARTMENT_NAME';
        this.description = '';
        this.name = n;
    }
    addMembers() {
        return;
    }
    addDescription(d) {
        this.description = d;
    }
    describe() {
        console.log(`The ${this.name} Department  is for: ${this.description}`);
    }
}
const accounting = new Department('Accounting');
accounting.addDescription("Accountants' department");
accounting.describe();
const accountingCopy = { describe: accounting.describe };
// console.log(accounting);
accountingCopy.describe.bind(accounting);
