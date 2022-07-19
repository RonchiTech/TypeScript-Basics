"use strict";
var Department = /** @class */ (function () {
    function Department(n) {
        this.name = n;
    }
    Department.prototype.addMembers = function () {
        return;
    };
    return Department;
}());
var accounting = new Department('Accounting');
console.log(accounting);
