namespace App {
  //Autobinding
  export function AutoBinder(
    target: any,
    methodName: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    console.log(target);
    console.log(methodName);
    console.log(descriptor);

    const originalMethod = descriptor.value;
    // console.log(originalMethod);

    const newDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        // console.log('This', this);
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return newDescriptor;
  }
}
