class Department {
  name: string = 'NO_DEPARTMENT_NAME';
  description: string = '';

  constructor(n: string) {
    this.name = n;
  }
  addMembers() {
    return;
  }
  addDescription(d: string) {
    this.description = d;
  }
  describe(this: Department) {
    console.log(`The ${this.name} Department  is for: ${this.description}`);
  }
}

const accounting = new Department('Accounting');
accounting.addDescription("Accountants' department");
accounting.describe();

const accountingCopy = { describe: accounting.describe };

// console.log(accounting);
accountingCopy.describe.bind(accounting);

