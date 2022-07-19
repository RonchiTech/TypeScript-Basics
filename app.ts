class Department {
  // private name: string = 'NO_DEPARTMENT_NAME';
  protected employees: string[] = [];

  constructor(private readonly id: string, protected name: string) {}

  describe(this: Department) {
    console.log(`This is the ${this.name}. ID:${this.id}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  private returnEmployees() {
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
  private admins: string[];

  constructor(id: string, admins: string[] = []) {
    super(id, 'Information Technology');
    this.admins = admins;
  }

  addAdmin(name: string) {
    this.admins.push(name);
  }
}

const ITDepartment = new IT('IT101');
ITDepartment.addAdmin('Floyd');
ITDepartment.addEmployee('Floyd');
ITDepartment.describe();
console.log(ITDepartment);

class Finance extends Department {
  constructor(id: string, employees: string[], private reports: string[] = []) {
    super(id, 'Finance');
    this.employees = employees;
  }

  addReport(report: string) {
    this.reports.push(report);
  }
  printReports() {
    console.log(this.reports);
  }

  addEmployee(employee: string): void {
    if (this.employees.includes(employee)) {
      console.log(`${employee} is already an employee`);
      return;
    }
    this.employees.push(employee);
  }
  updateName(name: string) {
    this.name = name;
  }
  // updateName(newName: string) {
  //   this.name = newName;
  // }
}

const finance = new Finance('FI103', ['Nikka']);
finance.addEmployee('Nikka');
finance.addEmployee('Trammz');
finance.addEmployee('Nikka');
finance.addEmployee('Trammz');
finance.addEmployee('Greta');
finance.addEmployee('Chuchi');
finance.addReport('Paid petty cash');
finance.printReports();
finance.updateName('Finance Department');
console.log(finance);
// finance.name = 'New Name';
// console.log(finance);
