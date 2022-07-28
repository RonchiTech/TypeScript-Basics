
namespace App {
  //Component Base Class
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    //abstact, should never direclty be instanciated. It should only be used for inheritance.
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
    constructor(
      templateId: string,
      hostElementId: string,
      insertStart: boolean,
      newElementId?: string
    ) {
      this.templateElement = document.getElementById(
        templateId
      )! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostElementId)! as T;
      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importedNode.firstElementChild as U;
      if (newElementId) {
        this.element.id = newElementId;
      }
      this.attach(insertStart);
    }
    private attach(insertStart: boolean) {
      this.hostElement.insertAdjacentElement(
        insertStart ? 'afterbegin' : 'beforeend',
        this.element
      );
    }
    abstract configure(): void;
    abstract renderContent(): void;
  }
}
