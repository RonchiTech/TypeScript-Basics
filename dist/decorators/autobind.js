//Autobinding
export function AutoBinder(target, methodName, descriptor) {
    console.log(target);
    console.log(methodName);
    console.log(descriptor);
    const originalMethod = descriptor.value;
    // console.log(originalMethod);
    const newDescriptor = {
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
//# sourceMappingURL=autobind.js.map