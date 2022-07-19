import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogInfoComponent } from '../dialog-info/dialog-info.component';
import { CustomerService } from '../services/customer.service';
import { CustomValidators } from '../validators/custom-validators';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customerFormGroup: FormGroup;
  minDate: Date;
  maxDate: Date;


  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.createForm();
  }

  ngOnInit() {
    const today = new Date();
    this.minDate = new Date(
      today.getFullYear() - 60,
      today.getMonth(),
      today.getDate()
    );
    this.maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
  }

  createForm() {
    this.customerFormGroup = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/)]),
      cpf: new FormControl('', [Validators.required, CustomValidators.ValidaCpf]),
      dataNascimento: new FormControl('', Validators.required),
      rendaMensal: new FormControl('', [Validators.required, Validators.min(1)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dataCadastro: new FormControl(new Date())
    });
  }

  get form(): { [key: string]: AbstractControl; }
  {
      return this.customerFormGroup.controls;
  }

  saveCustomer() {
    



    this.customerService.insertCustomer(this.customerFormGroup.value)
      .subscribe(() => {
        this.dialog.open(DialogInfoComponent)
          .afterClosed().subscribe(() => {
            
            this.router.navigate(['/customers']);
          });  
      });

  }

}
