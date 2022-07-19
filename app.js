"use strict";
class Department {
    constructor(name) {
        this.name = name;
        // private name: string = 'NO_DEPARTMENT_NAME';
        this.employees = [];
    }
    describe() {
        console.log(`This is the ${this.name}`);
    }
    add(employee) {
        this.employees.push(employee);
    }
    returnEmployees() {
        return this.employees;
    }
    showInfo() {
        console.log(this.returnEmployees());
    }
}
// const accounting = new Department('Accounting');
// accounting.describe();
// const accountingCopy = { describe: accounting.describe };
// // console.log(accounting);
// const accDec1 = accountingCopy.describe.bind(accounting);
// accDec1();
// const accountingCopy2 = {
//   name: 'TEST',
//   describe: accounting.describe,
// };
// accountingCopy2.describe();
const accounting = new Department('Accounting');
accounting.add('Ronchi');
accounting.describe();
// accounting.employees[1] = 'Floyd' //cannot do this once the property/field is set to private
accounting.showInfo();
