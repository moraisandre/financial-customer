import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { TableCustomerComponent } from './table-customer/table-customer.component';

const routes: Routes = [
  { path: '', component: TableCustomerComponent },
  { path: 'customers', component: TableCustomerComponent },
  { path: 'create-customer', component: CreateCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
