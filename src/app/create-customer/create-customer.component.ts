import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/custom-validators';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customerFormGroup: FormGroup;


  constructor() {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.customerFormGroup = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required, CustomValidators.ValidaCpf]),
      dataNascimento: new FormControl('', [Validators.required, CustomValidators.MaiorQue18Anos, CustomValidators.MenorQue60Anos]),
      rendaMensal: new FormControl('', [Validators.required, Validators.min(1)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dataCadastro: new FormControl('')
    });
  }

  get form(): { [key: string]: AbstractControl; }
  {
      return this.customerFormGroup.controls;
  }

}
