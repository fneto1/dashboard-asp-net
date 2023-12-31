import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/order';
import { SalesDataService } from '../../services/sales-data.service';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css'],
})
export class SectionOrdersComponent implements OnInit {
  constructor(private _salesData: SalesDataService) {}

  orders?: Order[];
  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this._salesData.getOrders(this.page, this.limit).subscribe((res: any) => {
      console.log(res);
      this.orders = res.page.data;
      this.total = res.page.total;
      this.loading = false;
    });
  }

  goToPrevious(): void {
    //console.log('Evento 1');
    this.page--;
    this.getOrders();
  }

  goToNext(): void {
    //console.log('Evento 2');
    this.page++;
    this.getOrders();
  }

  goToPage(n: number): void {
    this.page = n;
    this.getOrders();
  }
}
