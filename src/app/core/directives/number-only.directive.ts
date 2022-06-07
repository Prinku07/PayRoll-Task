import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appNumberOnly]'
})
export class NumberOnlyDirective {

  constructor(private el : ElementRef) { }

  @HostListener('input',['$event']) onInputChange(event: { stopPropagation: () => void; }){
    const initalvalue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalvalue.replace(/[^0-9]*/g,'');
    if(initalvalue !== this.el.nativeElement.value)
    event.stopPropagation();

  }
}
