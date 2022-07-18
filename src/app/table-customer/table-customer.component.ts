import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-table-customer',
  templateUrl: './table-customer.component.html',
  styleUrls: ['./table-customer.component.css']
})
export class TableCustomerComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nome', 'cpf', 'dataNascimento', 'dataCadastro', 'rendaMensal', 'acao'];
  dataSource = new MatTableDataSource<Customer>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageEvent: PageEvent;

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    // this.pageEvent = new PageEvent();
    // this.pageEvent.pageIndex = 1;
    // this.pageEvent.pageSize = 5;

    this.searchCustomer();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  searchCustomer() {
    console.log(this.paginator);
    console.log(this.pageEvent);
    
    this.customerService.getCustomers(this.pageEvent)
      .subscribe(response => {
        this.dataSource = new MatTableDataSource<Customer>(response);
        this.dataSource.paginator = this.paginator;
        console.log(this.paginator);
    console.log(this.pageEvent);
      });
  }

}
