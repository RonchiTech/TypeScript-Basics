"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // private name: string = 'NO_DEPARTMENT_NAME';
        this.employees = [];
    }
    describe() {
        console.log(`This is the ${this.name}. ID:${this.id}`);
    }
    addEmployee(employee) {
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
const accounting = new Department('acc1', 'Accounting');
accounting.addEmployee('Ronchi');
// accounting.describe();
// accounting.employees[1] = 'Floyd' //cannot do this once the property/field is set to private
// accounting.showInfo();
console.log(accounting);
class IT extends Department {
    constructor(id, admins = []) {
        super(id, 'Information Technology');
        this.admins = admins;
    }
    addAdmin(name) {
        this.admins.push(name);
    }
}
const ITDepartment = new IT('IT101');
ITDepartment.addAdmin('Floyd');
ITDepartment.addEmployee('Floyd');
ITDepartment.describe();
console.log(ITDepartment);
class Finance extends Department {
    constructor(id, reports = []) {
        super(id, 'Finance');
        this.reports = reports;
    }
    addReport(report) {
        this.reports.push(report);
    }
    printReports() {
        console.log(this.reports);
    }
}
const finance = new Finance('FI103');
finance.addEmployee('Nikka');
finance.addReport('Paid petty cash');
finance.printReports();
console.log(finance);
// finance.name = 'New Name';
console.log(finance);
