//1. Intersection Types
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

type Intersected = Result & Numeric;

//2. Type Guards
function add(a: Result, b: Result) {
  if (typeof a === 'string' || typeof b === 'string') {
    //this is the type guard
    return a.toString() + b.toString();
  }
  return a + b;
}

//2.1 Type Guards
type UnknownEmployee = Admin | Employee;
function printEmployeeInfo(employee: UnknownEmployee) {
  console.log('Name: ', employee.name);
  if ('privileges' in employee) {
    //JS code that allows to check if 'privileges' exists as a property
    console.log('Privileges: ', employee.privileges);
  }
  if ('startDate' in employee) {
    //JS code that allows to check if 'startDate' exists as a property
    console.log('startDate: ', employee.startDate);
  }
}

printEmployeeInfo(me);

//2.2 type guards on classes
class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }
  loadCargo(amount: number) {
    console.log('Loading cargo: ', amount);
  }
}

type Vehicle = Truck | Car;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive(); //because this always exists!

  // if ('loadCargo' in vehicle) {
  //   vehicle.loadCargo(1500);
  // }

  //better way
  if (vehicle instanceof Truck) { //instanceof
    vehicle.loadCargo(1500);
  }
}

useVehicle(v1);
useVehicle(v2);
