import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-table-customer',
  templateUrl: './table-customer.component.html',
  styleUrls: ['./table-customer.component.css']
})
export class TableCustomerComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cpf', 'dataNascimento', 'dataCadastro', 'rendaMensal', 'acao'];
  dataSource = new MatTableDataSource<Customer>();
  filterInput = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageEvent: PageEvent;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.searchCustomer();
  }

  applyFilter() {
    this.dataSource.filter = this.filterInput.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearField() {
    this.filterInput = '';
    this.searchCustomer();
  }

  searchCustomer() {
    
    this.customerService.getCustomers(this.pageEvent)
      .subscribe(response => {
        this.dataSource = new MatTableDataSource<Customer>(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  deleteCustomer(customer: Customer) {
    this.dialog.open(DialogConfirmationComponent, {
      data: {
        customerName: customer.nome
      }
    })
      .afterClosed().subscribe(result => {
        if (result) {
          this.customerService.deleteCustomer(customer.id)
            .subscribe(resp => {
              this.searchCustomer();
            });
        }
      });;

  }

}
