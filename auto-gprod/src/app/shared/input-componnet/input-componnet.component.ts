import { Component, ContentChild, Input } from '@angular/core';
import { FormControlName, NgModel } from '@angular/forms';

@Component({
  selector: 'app-input-componnet',
  templateUrl: './input-componnet.component.html',
  styleUrls: ['./input-componnet.component.scss']
})
export class InputComponnetComponent {
  @Input() label: string;
  @Input() errorMessage: string;
  @Input() showTip: boolean = true;

  input: any;

  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.input = this.model || this.control;

    if (this.input === undefined){
      throw new Error('Esse componente precisa ser usado como uma diretiva ngModel ou FormControlName')
    }
  }

  hasSuccess() : boolean {
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError() : boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }
}
