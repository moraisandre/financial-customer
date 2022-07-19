import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/angular-material.module';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { TableCustomerComponent } from './table-customer/table-customer.component';
import { HttpClientModule } from '@angular/common/http';
import { CpfPipe } from './pipes/cpf.pipe';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    AppComponent,
    CreateCustomerComponent,
    TableCustomerComponent,
    CpfPipe,
    DialogConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
