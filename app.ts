class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }
  addMembers() {
    return;
  }
}

const accounting = new Department('Accounting');

console.log(accounting);
