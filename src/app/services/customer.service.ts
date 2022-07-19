import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = 'http://localhost:3000/clientes';

  constructor(
    private http: HttpClient
  ) { }

  getCustomers(pageEvent: PageEvent | null = null): Observable<Customer[]> {
    console.log(pageEvent);
    

    if (pageEvent) {
      return this.http.get<Customer[]>(`${this.url}?_page=${pageEvent.pageIndex}&_limit=${pageEvent.pageSize}`);
    }
    
    return this.http.get<Customer[]>(this.url);
  }

  deleteCustomer(id: number): Observable<Customer[]> {
    return this.http.delete<Customer[]>(this.url + '/' + id);
  }

  insertCustomer(customer: Customer): Observable<Customer[]> {
    return this.http.post<Customer[]>(this.url, customer);
  }
}
