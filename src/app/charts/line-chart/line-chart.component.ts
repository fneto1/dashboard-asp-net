import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { SalesDataService } from 'src/app/services/sales-data.service';
import _ from 'lodash';
import moment from 'moment';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  constructor(private _salesDataService: SalesDataService) {}

  topCustomers: string[] = [];
  allOrders!: any[];

  public lineChartData: any;
  public lineChartLabels: any;
  public lineChartOptions: any = {
    responsive: true,
    elements: {
      line: {
        tension: 0.5,
      },
    },
    maintainAspectRatio: false,
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  ngOnInit() {
    this._salesDataService.getOrders(1, 100).subscribe((res) => {
      //console.log(res);
      this.allOrders = res.page.data;
      //console.log(this.allOrders);

      this._salesDataService.getOrdersByCustomer(3).subscribe((cus) => {
        this.topCustomers = cus.map((x: any) => x.customer);
        //console.log(this.topCustomers);
        const allChartData = this.topCustomers.reduce<any[]>((result, i) => {
          result.push(this.getChartData(this.allOrders, i));
          return result;
        }, []);

        let dates = allChartData
          .map((x) => x.data)
          .reduce((a, i) => {
            a.push(i.map((o: (string | number | Date)[]) => new Date(o[0])));
            return a;
          }, []);

        dates = [].concat.apply([], dates);

        //console.log(dates);
        const r = this.getCustomerOrdersByDate(allChartData, dates)['data'];
        //console.log(r);
        this.lineChartLabels = r[0]['orders'].map(
          (o: { [x: string]: any }) => o['date']
        );

        this.lineChartData = [
          {
            data: r[0]['orders'].map((x: { [x: string]: any }) => x['total']),
            label: r[0]['customer'],
            backgroundColor: 'rgba(6,214,160,0.2)',
            borderColor: 'rgba(0,200,140,0.5)',
            pointBackgroundColor: '#000',
            pointBorderColor: '#000',
            pointHoverBackgroundColor: '#555',
            pointHoverBorderColor: '#555',
            fill: 'origin',
          },
          {
            data: r[1]['orders'].map((x: { [x: string]: any }) => x['total']),
            label: r[1]['customer'],
            backgroundColor: 'rgba(255 , 209, 102, 0.2)',
            borderColor: 'rgba(240, 180, 89, 0.5)',
            pointBackgroundColor: '#000',
            pointBorderColor: '#000',
            pointHoverBackgroundColor: '#555',
            pointHoverBorderColor: '#555',
            fill: 'origin',
          },
          {
            data: r[2]['orders'].map((x: { [x: string]: any }) => x['total']),
            label: r[2]['customer'],
            backgroundColor: 'rgba(15, 78, 133, 0.2)',
            borderColor: 'rgba(3, 64, 128, 0.5)',
            pointBackgroundColor: '#000',
            pointBorderColor: '#000',
            pointHoverBackgroundColor: '#555',
            pointHoverBorderColor: '#555',
            fill: 'origin',
          },
        ];
      });
    });
  }

  getChartData(allOrders: any, name: string) {
    const customerOrders = allOrders.filter(
      (o: { customer: { name: string } }) => o.customer.name === name
    );

    const formattedOrders = customerOrders.reduce(
      (r: any[][], e: { placed: any; total: any }) => {
        r.push([e.placed, e.total]);
        return r;
      },
      []
    );

    return {
      customer: name,
      data: formattedOrders,
    };
  }

  getCustomerOrdersByDate(orders: any, dates: any): any {
    const customers = this.topCustomers;
    const prettyDates = dates.map((x: Date) => this.toFriendlyDate(x));
    const uniqueDates = Array.from(new Set(prettyDates)).sort();
    //console.log(u);
    const result = {
      data: [],
    };
    const dataSets: any[] = result.data;

    customers.forEach((customer) => {
      const customerOrders: any[] = [];
      uniqueDates.forEach((date) => {
        const obj: any = {
          date: date,
          total: this.getCustomerDateTotal(date, customer),
        };
        customerOrders.push(obj);
      });

      dataSets.push({
        customer: customer,
        orders: customerOrders,
      });
    });

    //console.log(result);

    return result;
  }

  toFriendlyDate(date: Date) {
    return moment(date).endOf('day').format('DD-MM-YY');
  }

  getCustomerDateTotal(date: any, customer: string) {
    const r = this.allOrders.filter(
      (o) =>
        o.customer.name === customer && this.toFriendlyDate(o.placed) === date
    );

    const result = r.reduce((a, b) => {
      return a + b.total;
    }, 0);

    return result;
  }
}
