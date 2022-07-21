type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type Promoted = Admin & Employee;

let me: Promoted;

me = {
  name: 'Ronchi',
  privileges: ['Update Server'],
  startDate: new Date(),
};

console.log(me);

type Result = string | number;
type Numeric = number | boolean;

type Intersected = Result & Numeric