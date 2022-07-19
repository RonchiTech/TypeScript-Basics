class Department {
  name: string = 'NO_DEPARTMENT_NAME';
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log(`This is the ${this.name}`);
  }

  add(employee: string) {
    this.employees.push(employee);
  }
  private returnEmployees() {
    return this.employees;
  }

  showInfo(){
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
// accounting.employees[1] = 'Floyd' //cannot do this once the property/field is set to private
accounting.showInfo()
