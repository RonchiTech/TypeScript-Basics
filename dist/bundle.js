(()=>{"use strict";class e{constructor(e,t,n,r){this.templateElement=document.getElementById(e),this.hostElement=document.getElementById(t);const s=document.importNode(this.templateElement.content,!0);this.element=s.firstElementChild,r&&(this.element.id=r),this.attach(n)}attach(e){this.hostElement.insertAdjacentElement(e?"afterbegin":"beforeend",this.element)}}function t(e){let t=!0;return e.required&&(t=t&&0!==e.value.toString().trim().length),null!=e.min&&"number"==typeof e.value&&(t=t&&e.value>=e.min),null!=e.max&&"number"==typeof e.value&&(t=t&&e.value<=e.max),null!=e.minLength&&"string"==typeof e.value&&(t=t&&e.value.trim().length>=e.minLength),null!=e.maxLength&&"string"==typeof e.value&&(t=t&&e.value.trim().length<=e.maxLength),t}function n(e,t,n){console.log(e),console.log(t),console.log(n);const r=n.value;return{configurable:!0,enumerable:!1,get(){return r.bind(this)}}}var r;!function(e){e[e.Active=0]="Active",e[e.Finished=1]="Finished"}(r||(r={}));class s{constructor(e,t,n,r,s){this.id=e,this.title=t,this.description=n,this.people=r,this.status=s}}class i extends class{constructor(){this.listeners=[]}addListener(e){console.log("listerFunction",e),console.log("this.listeners",this.listeners),this.listeners.push(e)}}{constructor(){super(),this.projects=[]}static getInstance(){return this.instance||(this.instance=new i),this.instance}addProjects(e,t,n){const i=new s(`${Math.random()}-${(new Date).getMilliseconds()}`,e,t,n,r.Active);this.projects.push(i),this.updateListeners()}moveProject(e,t){const n=this.projects.find((t=>t.id===e));n&&n.status!==t&&(n.status=t),this.updateListeners()}updateListeners(){for(const e of this.listeners)e(this.projects.slice())}}const l=i.getInstance();class o extends e{constructor(){super("project-input","app",!0,"user-input"),this.titleInputElement=this.element.querySelector("#title"),this.descriptionInputElement=this.element.querySelector("#description"),this.peopleInputElement=this.element.querySelector("#people"),this.configure()}configure(){this.element.addEventListener("submit",this.submitHandler)}renderContent(){}getUserInput(){const e=this.titleInputElement.value,n={value:this.descriptionInputElement.value,required:!0,minLength:5},r={value:+ +this.peopleInputElement.value,required:!0,min:1,max:10};if(t({value:e,required:!0})&&t(n)&&t(r))return[this.titleInputElement.value,this.descriptionInputElement.value,+this.peopleInputElement.value];alert("Invalid input, please try again later!")}submitHandler(e){e.preventDefault();const t=this.getUserInput();if(Array.isArray(t)){const[e,n,r]=t;console.log(e,n,r),l.addProjects(e,n,r),this.clearInput()}else console.log("Invalid Input!")}clearInput(){this.titleInputElement.value="",this.descriptionInputElement.value="",this.peopleInputElement.value=""}}!function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);i>3&&l&&Object.defineProperty(t,n,l)}([n],o.prototype,"submitHandler",null);class a extends e{constructor(e,t){super("single-project",e,!1,t.id),this.project=t,this.configure(),this.renderContent()}get persons(){return(1===this.project.people?" 1 person":`${this.project.people} persons`)+" "}dragStartHandler(e){console.log(e),e.dataTransfer.setData("text/plain",this.project.id),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){console.log("Drag End",e)}configure(){this.element.addEventListener("dragstart",this.dragStartHandler),this.element.addEventListener("dragend",this.dragEndHandler)}renderContent(){this.element.querySelector("h2").textContent=this.project.title,this.element.querySelector("h3").textContent=this.persons+" assigned",this.element.querySelector("p").textContent=this.project.description}}!function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);i>3&&l&&Object.defineProperty(t,n,l)}([n],a.prototype,"dragStartHandler",null);var c=function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);return i>3&&l&&Object.defineProperty(t,n,l),l};class d extends e{constructor(e){super("project-list","app",!1,`${e}-projects`),this.type=e,this.assignedProjects=[],this.configure(),this.renderContent()}dragOverHandler(e){var t;"text/plain"===(null===(t=null==e?void 0:e.dataTransfer)||void 0===t?void 0:t.types[0])&&(e.preventDefault(),this.element.querySelector("ul").classList.add("droppable"))}dropHandler(e){const t=e.dataTransfer.getData("text/plain");l.moveProject(t,"active"===this.type?r.Active:r.Finished)}dragLeaveHandler(e){this.element.querySelector("ul").classList.remove("droppable")}configure(){this.element.addEventListener("dragover",this.dragOverHandler),this.element.addEventListener("dragleave",this.dragLeaveHandler),this.element.addEventListener("drop",this.dropHandler),l.addListener((e=>{console.log("projects...",e);const t=e.filter((e=>"active"===this.type?e.status===r.Active:e.status===r.Finished));this.assignedProjects=t,this.renderProjects()}))}renderContent(){const e=`${this.type}-project-list`;this.element.querySelector("ul").id=e,this.element.querySelector("h2").textContent=this.type.toUpperCase()+"PROJECTS"}renderProjects(){document.getElementById(`${this.type}-project-list`).innerHTML="";for(const e of this.assignedProjects)new a(this.element.querySelector("ul").id,e)}}c([n],d.prototype,"dragOverHandler",null),c([n],d.prototype,"dropHandler",null),c([n],d.prototype,"dragLeaveHandler",null),new o,new d("active"),new d("finished")})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bUcsaUJBQzdCLElBQUlYLEVBQVl4RixLQUFLUSxRQUFROEQsY0FBYyxNQUFPNUQsR0FBSTBHLEVBRTFELEVBeERBLEdBREMzRixHLG9DQVVELEdBRENBLEcsZ0NBVUQsR0FEQ0EsRyxxQ0M1QkgsSUFBSTJDLEVBQ0osSUFBSTZCLEVBQVksVUFDaEIsSUFBSUEsRUFBWSxXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vMDEtLS10eXBlc2NyaXB0LWJhc2ljcy8uL3NyYy9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50LnRzIiwid2VicGFjazovLzAxLS0tdHlwZXNjcmlwdC1iYXNpY3MvLi9zcmMvdXRpbHMvdmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly8wMS0tLXR5cGVzY3JpcHQtYmFzaWNzLy4vc3JjL2RlY29yYXRvcnMvYXV0b2JpbmQudHMiLCJ3ZWJwYWNrOi8vMDEtLS10eXBlc2NyaXB0LWJhc2ljcy8uL3NyYy9tb2RlbHMvcHJvamVjdC50cyIsIndlYnBhY2s6Ly8wMS0tLXR5cGVzY3JpcHQtYmFzaWNzLy4vc3JjL3N0YXRlL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vMDEtLS10eXBlc2NyaXB0LWJhc2ljcy8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vMDEtLS10eXBlc2NyaXB0LWJhc2ljcy8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaXRlbS50cyIsIndlYnBhY2s6Ly8wMS0tLXR5cGVzY3JpcHQtYmFzaWNzLy4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1saXN0LnRzIiwid2VicGFjazovLzAxLS0tdHlwZXNjcmlwdC1iYXNpY3MvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vQ29tcG9uZW50IEJhc2UgQ2xhc3NcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudDxUIGV4dGVuZHMgSFRNTEVsZW1lbnQsIFUgZXh0ZW5kcyBIVE1MRWxlbWVudD4ge1xyXG4gIC8vYWJzdGFjdCwgc2hvdWxkIG5ldmVyIGRpcmVjbHR5IGJlIGluc3RhbmNpYXRlZC4gSXQgc2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgaW5oZXJpdGFuY2UuXHJcbiAgdGVtcGxhdGVFbGVtZW50OiBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gIGhvc3RFbGVtZW50OiBUO1xyXG4gIGVsZW1lbnQ6IFU7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICB0ZW1wbGF0ZUlkOiBzdHJpbmcsXHJcbiAgICBob3N0RWxlbWVudElkOiBzdHJpbmcsXHJcbiAgICBpbnNlcnRTdGFydDogYm9vbGVhbixcclxuICAgIG5ld0VsZW1lbnRJZD86IHN0cmluZ1xyXG4gICkge1xyXG4gICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgdGVtcGxhdGVJZFxyXG4gICAgKSEgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIHRoaXMuaG9zdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVudElkKSEgYXMgVDtcclxuICAgIGNvbnN0IGltcG9ydGVkTm9kZSA9IGRvY3VtZW50LmltcG9ydE5vZGUoXHJcbiAgICAgIHRoaXMudGVtcGxhdGVFbGVtZW50LmNvbnRlbnQsXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBpbXBvcnRlZE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQgYXMgVTtcclxuICAgIGlmIChuZXdFbGVtZW50SWQpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hdHRhY2goaW5zZXJ0U3RhcnQpO1xyXG4gIH1cclxuICBwcml2YXRlIGF0dGFjaChpbnNlcnRTdGFydDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5ob3N0RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgIGluc2VydFN0YXJ0ID8gJ2FmdGVyYmVnaW4nIDogJ2JlZm9yZWVuZCcsXHJcbiAgICAgIHRoaXMuZWxlbWVudFxyXG4gICAgKTtcclxuICB9XHJcbiAgYWJzdHJhY3QgY29uZmlndXJlKCk6IHZvaWQ7XHJcbiAgYWJzdHJhY3QgcmVuZGVyQ29udGVudCgpOiB2b2lkO1xyXG59XHJcbiIsIi8vVmFsaWRhdGlvblxyXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRhYmxlIHtcclxuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyOyAvLz8gPSBvcHRpb25hbFxyXG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcclxuICBtaW5MZW5ndGg/OiBudW1iZXI7XHJcbiAgbWF4TGVuZ3RoPzogbnVtYmVyO1xyXG4gIG1pbj86IG51bWJlcjtcclxuICBtYXg/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZShpbnB1dDogVmFsaWRhdGFibGUpIHtcclxuICBsZXQgaXNWYWxpZCA9IHRydWU7XHJcbiAgaWYgKGlucHV0LnJlcXVpcmVkKSB7XHJcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBpbnB1dC52YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggIT09IDA7XHJcbiAgfVxyXG4gIGlmIChpbnB1dC5taW4gIT0gbnVsbCAmJiB0eXBlb2YgaW5wdXQudmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBpbnB1dC52YWx1ZSA+PSBpbnB1dC5taW47XHJcbiAgfVxyXG4gIGlmIChpbnB1dC5tYXggIT0gbnVsbCAmJiB0eXBlb2YgaW5wdXQudmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBpbnB1dC52YWx1ZSA8PSBpbnB1dC5tYXg7XHJcbiAgfVxyXG4gIGlmIChpbnB1dC5taW5MZW5ndGggIT0gbnVsbCAmJiB0eXBlb2YgaW5wdXQudmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBpbnB1dC52YWx1ZS50cmltKCkubGVuZ3RoID49IGlucHV0Lm1pbkxlbmd0aDtcclxuICB9XHJcbiAgaWYgKGlucHV0Lm1heExlbmd0aCAhPSBudWxsICYmIHR5cGVvZiBpbnB1dC52YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIGlucHV0LnZhbHVlLnRyaW0oKS5sZW5ndGggPD0gaW5wdXQubWF4TGVuZ3RoO1xyXG4gIH1cclxuICByZXR1cm4gaXNWYWxpZDtcclxufVxyXG4iLCIvL0F1dG9iaW5kaW5nXHJcbmV4cG9ydCBmdW5jdGlvbiBBdXRvQmluZGVyKFxyXG4gIHRhcmdldDogYW55LFxyXG4gIG1ldGhvZE5hbWU6IHN0cmluZyB8IHN5bWJvbCxcclxuICBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3JcclxuKSB7XHJcbiAgY29uc29sZS5sb2codGFyZ2V0KTtcclxuICBjb25zb2xlLmxvZyhtZXRob2ROYW1lKTtcclxuICBjb25zb2xlLmxvZyhkZXNjcmlwdG9yKTtcclxuXHJcbiAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xyXG4gIC8vIGNvbnNvbGUubG9nKG9yaWdpbmFsTWV0aG9kKTtcclxuXHJcbiAgY29uc3QgbmV3RGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xyXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICBnZXQoKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdUaGlzJywgdGhpcyk7XHJcbiAgICAgIGNvbnN0IGJvdW5kRm4gPSBvcmlnaW5hbE1ldGhvZC5iaW5kKHRoaXMpO1xyXG4gICAgICByZXR1cm4gYm91bmRGbjtcclxuICAgIH0sXHJcbiAgfTtcclxuICByZXR1cm4gbmV3RGVzY3JpcHRvcjtcclxufVxyXG4iLCJleHBvcnQgZW51bSBQcm9qZWN0U3RhdHVzIHtcclxuICBBY3RpdmUsXHJcbiAgRmluaXNoZWQsXHJcbn1cclxuXHJcbi8vUHJvamVjdCBDbGFzc1xyXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyxcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxyXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgcGVvcGxlOiBudW1iZXIsXHJcbiAgICBwdWJsaWMgc3RhdHVzOiBQcm9qZWN0U3RhdHVzXHJcbiAgKSB7fVxyXG59XHJcbiIsImltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXMgfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdCc7XHJcbnR5cGUgTGlzdGVuZXI8VD4gPSAoaXRlbXM6IFRbXSkgPT4gdm9pZDtcclxuLy9Qcm9qZWN0U3RhdGUgQ2xhc3NcclxuY2xhc3MgU3RhdGU8VD4ge1xyXG4gIHByb3RlY3RlZCBsaXN0ZW5lcnM6IExpc3RlbmVyPFQ+W10gPSBbXTtcclxuXHJcbiAgYWRkTGlzdGVuZXIobGlzdGVyRnVuY3Rpb246IExpc3RlbmVyPFQ+KSB7XHJcbiAgICBjb25zb2xlLmxvZygnbGlzdGVyRnVuY3Rpb24nLCBsaXN0ZXJGdW5jdGlvbik7XHJcbiAgICBjb25zb2xlLmxvZygndGhpcy5saXN0ZW5lcnMnLCB0aGlzLmxpc3RlbmVycyk7XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZXJGdW5jdGlvbik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvamVjdFN0YXRlIGV4dGVuZHMgU3RhdGU8UHJvamVjdD4ge1xyXG4gIHByaXZhdGUgcHJvamVjdHM6IFByb2plY3RbXSA9IFtdO1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBQcm9qZWN0U3RhdGU7XHJcblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFByb2plY3RTdGF0ZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBhZGRQcm9qZWN0cyh0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBwZW9wbGU6IG51bWJlcikge1xyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KFxyXG4gICAgICBgJHtNYXRoLnJhbmRvbSgpfS0ke25ldyBEYXRlKCkuZ2V0TWlsbGlzZWNvbmRzKCl9YCxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBwZW9wbGUsXHJcbiAgICAgIFByb2plY3RTdGF0dXMuQWN0aXZlXHJcbiAgICApO1xyXG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xyXG4gICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKTtcclxuICB9XHJcbiAgbW92ZVByb2plY3QocHJvamVjdElkOiBzdHJpbmcsIG5ld1N0YXR1czogUHJvamVjdFN0YXR1cykge1xyXG4gICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4ge1xyXG4gICAgICByZXR1cm4gcHJvamVjdC5pZCA9PT0gcHJvamVjdElkO1xyXG4gICAgfSk7XHJcbiAgICBpZiAocHJvamVjdCAmJiBwcm9qZWN0LnN0YXR1cyAhPT0gbmV3U3RhdHVzKSB7XHJcbiAgICAgIHByb2plY3Quc3RhdHVzID0gbmV3U3RhdHVzO1xyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSB1cGRhdGVMaXN0ZW5lcnMoKSB7XHJcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyRnVuY3Rpb24gb2YgdGhpcy5saXN0ZW5lcnMpIHtcclxuICAgICAgbGlzdGVuZXJGdW5jdGlvbih0aGlzLnByb2plY3RzLnNsaWNlKCkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5leHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKCk7XHJcbiIsIlxyXG4vLyAvIDxyZWZlcmVuY2UgcGF0aD1cImJhc2UtY29tcG9uZW50LnRzXCIgLz5cclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlLWNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFR1cGxlT3JWb2lkIH0gZnJvbSAnLi8uLi90eXBlcy90dXBsZS12b2lkJztcclxuaW1wb3J0IHsgVmFsaWRhdGFibGUsIHZhbGlkYXRlIH0gZnJvbSAnLi4vdXRpbHMvdmFsaWRhdGlvbic7XHJcbmltcG9ydCB7IEF1dG9CaW5kZXIgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kJztcclxuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvcHJvamVjdCc7XHJcbi8vUHJvamVjdElucHV0IENsYXNzXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0SW5wdXQgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxGb3JtRWxlbWVudD4ge1xyXG4gIHRpdGxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGRlc2NyaXB0aW9uSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHBlb3BsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigncHJvamVjdC1pbnB1dCcsICdhcHAnLCB0cnVlLCAndXNlci1pbnB1dCcpO1xyXG4gICAgdGhpcy50aXRsZUlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnI3RpdGxlJ1xyXG4gICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJyNkZXNjcmlwdGlvbidcclxuICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgICB0aGlzLnBlb3BsZUlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnI3Blb3BsZSdcclxuICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMuY29uZmlndXJlKCk7XHJcbiAgfVxyXG5cclxuICBjb25maWd1cmUoKSB7XHJcbiAgICAvLyB0aGlzLmZvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0SGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEhhbmRsZXIpO1xyXG4gIH1cclxuICByZW5kZXJDb250ZW50KCk6IHZvaWQge31cclxuXHJcbiAgcHJpdmF0ZSBnZXRVc2VySW5wdXQoKTogVHVwbGVPclZvaWQge1xyXG4gICAgY29uc3QgZW50ZXJlZFRpdGxlID0gdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZTtcclxuICAgIGNvbnN0IGVudGVyZWREZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWU7XHJcbiAgICBjb25zdCBlbnRlcmVkUGVvcGxlID0gK3RoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlVmFsaWRhdGFibGU6IFZhbGlkYXRhYmxlID0ge1xyXG4gICAgICB2YWx1ZTogZW50ZXJlZFRpdGxlLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvblZhbGlkYXRhYmxlOiBWYWxpZGF0YWJsZSA9IHtcclxuICAgICAgdmFsdWU6IGVudGVyZWREZXNjcmlwdGlvbixcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIG1pbkxlbmd0aDogNSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwZW9wbGVWYWxpZGF0YWJsZTogVmFsaWRhdGFibGUgPSB7XHJcbiAgICAgIHZhbHVlOiArZW50ZXJlZFBlb3BsZSxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIG1pbjogMSxcclxuICAgICAgbWF4OiAxMCxcclxuICAgIH07XHJcblxyXG4gICAgLy9Db3VsZCBpbXByb3ZlIHRoZSB2YWxpZGF0aW9uLCBtYWtlIGl0IG1vcmUgc2NhbGFibGVcclxuICAgIGlmIChcclxuICAgICAgIXZhbGlkYXRlKHRpdGxlVmFsaWRhdGFibGUpIHx8XHJcbiAgICAgICF2YWxpZGF0ZShkZXNjcmlwdGlvblZhbGlkYXRhYmxlKSB8fFxyXG4gICAgICAhdmFsaWRhdGUocGVvcGxlVmFsaWRhdGFibGUpXHJcbiAgICApIHtcclxuICAgICAgYWxlcnQoJ0ludmFsaWQgaW5wdXQsIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIhJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBbXHJcbiAgICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWUsXHJcbiAgICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWUsXHJcbiAgICAgICt0aGlzLnBlb3BsZUlucHV0RWxlbWVudC52YWx1ZSxcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBAQXV0b0JpbmRlclxyXG4gIHByaXZhdGUgc3VibWl0SGFuZGxlcihldmVudDogRXZlbnQpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgY29uc3QgdXNlcklucHV0ID0gdGhpcy5nZXRVc2VySW5wdXQoKTtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh1c2VySW5wdXQpKSB7XHJcbiAgICAgIGNvbnN0IFt0aXRsZSwgZGVzY3JpcHRpb24sIHBlb3BsZV0gPSB1c2VySW5wdXQ7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRpdGxlLCBkZXNjcmlwdGlvbiwgcGVvcGxlKTtcclxuICAgICAgcHJvamVjdFN0YXRlLmFkZFByb2plY3RzKHRpdGxlLCBkZXNjcmlwdGlvbiwgcGVvcGxlKTtcclxuICAgICAgdGhpcy5jbGVhcklucHV0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnSW52YWxpZCBJbnB1dCEnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYXJJbnB1dCgpIHtcclxuICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XHJcbiAgfVxyXG59XHJcbiIsIi8vIC8gPHJlZmVyZW5jZSBwYXRoPVwiYmFzZS1jb21wb25lbnQudHNcIiAvPlxyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlLWNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERyYWdnYWJsZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvZHJhZy1hbmQtZHJvcCc7XHJcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdCc7XHJcbmltcG9ydCB7IEF1dG9CaW5kZXIgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kJztcclxuLy9Qcm9qZWN0SXRlbSBDbGFzc1xyXG5leHBvcnQgY2xhc3MgUHJvamVjdEl0ZW1cclxuICBleHRlbmRzIENvbXBvbmVudDxIVE1MVUxpc3RFbGVtZW50LCBIVE1MTElFbGVtZW50PlxyXG4gIGltcGxlbWVudHMgRHJhZ2dhYmxlXHJcbntcclxuICBwcml2YXRlIHByb2plY3Q6IFByb2plY3Q7XHJcblxyXG4gIGdldCBwZXJzb25zKCkge1xyXG4gICAgcmV0dXJuIGAke1xyXG4gICAgICB0aGlzLnByb2plY3QucGVvcGxlID09PSAxID8gJyAxIHBlcnNvbicgOiBgJHt0aGlzLnByb2plY3QucGVvcGxlfSBwZXJzb25zYFxyXG4gICAgfSBgO1xyXG4gIH1cclxuICBjb25zdHJ1Y3Rvcihob3N0SWQ6IHN0cmluZywgcHJvamVjdDogUHJvamVjdCkge1xyXG4gICAgc3VwZXIoJ3NpbmdsZS1wcm9qZWN0JywgaG9zdElkLCBmYWxzZSwgcHJvamVjdC5pZCk7XHJcbiAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG4gIH1cclxuICBAQXV0b0JpbmRlclxyXG4gIGRyYWdTdGFydEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGhpcy5wcm9qZWN0LmlkKTtcclxuICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcclxuICB9XHJcblxyXG4gIGRyYWdFbmRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdEcmFnIEVuZCcsIGV2ZW50KTtcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLmRyYWdTdGFydEhhbmRsZXIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLmRyYWdFbmRIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckNvbnRlbnQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDInKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QudGl0bGU7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDMnKSEudGV4dENvbnRlbnQgPSB0aGlzLnBlcnNvbnMgKyAnIGFzc2lnbmVkJztcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigncCcpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbjtcclxuICB9XHJcbn1cclxuIiwiLy8gLyA8cmVmZXJlbmNlIHBhdGg9XCJiYXNlLWNvbXBvbmVudC50c1wiIC8+XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4vYmFzZS1jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQcm9qZWN0SXRlbSB9IGZyb20gJy4vcHJvamVjdC1pdGVtJztcclxuaW1wb3J0IHsgRHJvcHBhYmxlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9kcmFnLWFuZC1kcm9wJztcclxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcclxuaW1wb3J0IHsgQXV0b0JpbmRlciB9IGZyb20gJy4uL2RlY29yYXRvcnMvYXV0b2JpbmQnO1xyXG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tICcuLi9zdGF0ZS9wcm9qZWN0JztcclxuaW1wb3J0IHsgUHJvamVjdFN0YXR1cyB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcclxuLy9Qcm9qZWN0TGlzdCBDbGFzc1xyXG5leHBvcnQgY2xhc3MgUHJvamVjdExpc3RcclxuICBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEVsZW1lbnQ+XHJcbiAgaW1wbGVtZW50cyBEcm9wcGFibGVcclxue1xyXG4gIGFzc2lnbmVkUHJvamVjdHM6IFByb2plY3RbXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiAnYWN0aXZlJyB8ICdmaW5pc2hlZCcpIHtcclxuICAgIHN1cGVyKCdwcm9qZWN0LWxpc3QnLCAnYXBwJywgZmFsc2UsIGAke3R5cGV9LXByb2plY3RzYCk7XHJcblxyXG4gICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gW107XHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgfVxyXG5cclxuICBAQXV0b0JpbmRlclxyXG4gIGRyYWdPdmVySGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQ/LmRhdGFUcmFuc2Zlcj8udHlwZXNbMF0gPT09ICd0ZXh0L3BsYWluJykge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCBsaXN0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpITtcclxuICAgICAgbGlzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHJvcHBhYmxlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBAQXV0b0JpbmRlclxyXG4gIGRyb3BIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHByb2plY3RJZCA9IGV2ZW50LmRhdGFUcmFuc2ZlciEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xyXG4gICAgcHJvamVjdFN0YXRlLm1vdmVQcm9qZWN0KFxyXG4gICAgICBwcm9qZWN0SWQsXHJcbiAgICAgIHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScgPyBQcm9qZWN0U3RhdHVzLkFjdGl2ZSA6IFByb2plY3RTdGF0dXMuRmluaXNoZWRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBAQXV0b0JpbmRlclxyXG4gIGRyYWdMZWF2ZUhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgbGlzdEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSE7XHJcbiAgICBsaXN0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wcGFibGUnKTtcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXJIYW5kbGVyKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzLmRyYWdMZWF2ZUhhbmRsZXIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLmRyb3BIYW5kbGVyKTtcclxuXHJcbiAgICBwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ3Byb2plY3RzLi4uJywgcHJvamVjdHMpO1xyXG4gICAgICBjb25zdCByZWxldmFudFByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKChwcmopID0+IHtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnYWN0aXZlJykge1xyXG4gICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuQWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJqLnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5GaW5pc2hlZDtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IHJlbGV2YW50UHJvamVjdHM7XHJcbiAgICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgIGNvbnN0IGxpc3RJZCA9IGAke3RoaXMudHlwZX0tcHJvamVjdC1saXN0YDtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIS5pZCA9IGxpc3RJZDtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMicpIS50ZXh0Q29udGVudCA9XHJcbiAgICAgIHRoaXMudHlwZS50b1VwcGVyQ2FzZSgpICsgJ1BST0pFQ1RTJztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVuZGVyUHJvamVjdHMoKSB7XHJcbiAgICBjb25zdCBsaXN0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICBgJHt0aGlzLnR5cGV9LXByb2plY3QtbGlzdGBcclxuICAgICkhIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICBsaXN0RWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuICAgIGZvciAoY29uc3QgcHJvamVjdEl0ZW0gb2YgdGhpcy5hc3NpZ25lZFByb2plY3RzKSB7XHJcbiAgICAgIG5ldyBQcm9qZWN0SXRlbSh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSEuaWQsIHByb2plY3RJdGVtKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLy8gLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2ludGVyZmFjZXMvZHJhZy1hbmQtZHJvcC50c1wiLz5cclxuLy8gLyA8cmVmZXJlbmNlIHBhdGg9XCIuL21vZGVscy9wcm9qZWN0LnRzXCIvPlxyXG4vLyAvIDxyZWZlcmVuY2UgcGF0aD1cIi4vc3RhdGUvcHJvamVjdC50c1wiLz5cclxuLy8gLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3V0aWxzL3ZhbGlkYXRpb24udHNcIi8+XHJcbi8vIC8gPHJlZmVyZW5jZSBwYXRoPVwiLi9kZWNvcmF0b3JzL2F1dG9iaW5kLnRzXCIvPlxyXG4vLyAvIDxyZWZlcmVuY2UgcGF0aD1cIi4vY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudC50c1wiLz5cclxuLy8gLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dC50c1wiLz5cclxuLy8gLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2NvbXBvbmVudHMvcHJvamVjdC1pdGVtLnRzXCIvPlxyXG4vLyAvIDxyZWZlcmVuY2UgcGF0aD1cIi4vY29tcG9uZW50cy9wcm9qZWN0LWxpc3QudHNcIi8+XHJcbi8vIC8gPHJlZmVyZW5jZSBwYXRoPVwiLi90eXBlcy90dXBsZS12b2lkLnRzXCIvPlxyXG5pbXBvcnQgeyBQcm9qZWN0SW5wdXQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dCc7XHJcbmltcG9ydCB7IFByb2plY3RMaXN0IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2plY3QtbGlzdCc7XHJcblxyXG5uZXcgUHJvamVjdElucHV0KCk7XHJcbm5ldyBQcm9qZWN0TGlzdCgnYWN0aXZlJyk7XHJcbm5ldyBQcm9qZWN0TGlzdCgnZmluaXNoZWQnKTtcclxuXHJcbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInRlbXBsYXRlSWQiLCJob3N0RWxlbWVudElkIiwiaW5zZXJ0U3RhcnQiLCJuZXdFbGVtZW50SWQiLCJ0aGlzIiwidGVtcGxhdGVFbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImhvc3RFbGVtZW50IiwiaW1wb3J0ZWROb2RlIiwiaW1wb3J0Tm9kZSIsImNvbnRlbnQiLCJlbGVtZW50IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJpZCIsImF0dGFjaCIsImluc2VydEFkamFjZW50RWxlbWVudCIsInZhbGlkYXRlIiwiaW5wdXQiLCJpc1ZhbGlkIiwicmVxdWlyZWQiLCJ2YWx1ZSIsInRvU3RyaW5nIiwidHJpbSIsImxlbmd0aCIsIm1pbiIsIm1heCIsIm1pbkxlbmd0aCIsIm1heExlbmd0aCIsIkF1dG9CaW5kZXIiLCJ0YXJnZXQiLCJtZXRob2ROYW1lIiwiZGVzY3JpcHRvciIsImNvbnNvbGUiLCJsb2ciLCJvcmlnaW5hbE1ldGhvZCIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJnZXQiLCJiaW5kIiwiUHJvamVjdFN0YXR1cyIsIlByb2plY3QiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwicGVvcGxlIiwic3RhdHVzIiwiUHJvamVjdFN0YXRlIiwibGlzdGVuZXJzIiwiYWRkTGlzdGVuZXIiLCJsaXN0ZXJGdW5jdGlvbiIsInB1c2giLCJzdXBlciIsInByb2plY3RzIiwic3RhdGljIiwiaW5zdGFuY2UiLCJhZGRQcm9qZWN0cyIsIm5ld1Byb2plY3QiLCJNYXRoIiwicmFuZG9tIiwiRGF0ZSIsImdldE1pbGxpc2Vjb25kcyIsIkFjdGl2ZSIsInVwZGF0ZUxpc3RlbmVycyIsIm1vdmVQcm9qZWN0IiwicHJvamVjdElkIiwibmV3U3RhdHVzIiwicHJvamVjdCIsImZpbmQiLCJsaXN0ZW5lckZ1bmN0aW9uIiwic2xpY2UiLCJwcm9qZWN0U3RhdGUiLCJnZXRJbnN0YW5jZSIsIlByb2plY3RJbnB1dCIsInRpdGxlSW5wdXRFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImRlc2NyaXB0aW9uSW5wdXRFbGVtZW50IiwicGVvcGxlSW5wdXRFbGVtZW50IiwiY29uZmlndXJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN1Ym1pdEhhbmRsZXIiLCJyZW5kZXJDb250ZW50IiwiZ2V0VXNlcklucHV0IiwiZW50ZXJlZFRpdGxlIiwiZGVzY3JpcHRpb25WYWxpZGF0YWJsZSIsInBlb3BsZVZhbGlkYXRhYmxlIiwiYWxlcnQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidXNlcklucHV0IiwiQXJyYXkiLCJpc0FycmF5IiwiY2xlYXJJbnB1dCIsIlByb2plY3RJdGVtIiwiaG9zdElkIiwicGVyc29ucyIsImRyYWdTdGFydEhhbmRsZXIiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiZWZmZWN0QWxsb3dlZCIsImRyYWdFbmRIYW5kbGVyIiwidGV4dENvbnRlbnQiLCJQcm9qZWN0TGlzdCIsInR5cGUiLCJhc3NpZ25lZFByb2plY3RzIiwiZHJhZ092ZXJIYW5kbGVyIiwidHlwZXMiLCJjbGFzc0xpc3QiLCJhZGQiLCJkcm9wSGFuZGxlciIsImdldERhdGEiLCJGaW5pc2hlZCIsImRyYWdMZWF2ZUhhbmRsZXIiLCJyZW1vdmUiLCJyZWxldmFudFByb2plY3RzIiwiZmlsdGVyIiwicHJqIiwicmVuZGVyUHJvamVjdHMiLCJsaXN0SWQiLCJ0b1VwcGVyQ2FzZSIsImlubmVySFRNTCIsInByb2plY3RJdGVtIl0sInNvdXJjZVJvb3QiOiIifQ==