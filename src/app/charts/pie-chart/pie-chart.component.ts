import { map } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import _ from 'lodash';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  @Input() inputData: any;
  @Input() limit?: number;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    borderColor: '#111',
    maintainAspectRatio: false,
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  pieChartLabels: string[] = [];
  public pieChartType: ChartType = 'doughnut';

  ngOnInit(): void {
    this.parseChartData(this.inputData, this.limit);
  }

  parseChartData(res: any, limit?: number) {
    //console.log(res);
    const allData = res.slice(0, limit);

    // let arr: string[] = Object.keys(allData[0]);

    // console.log(arr[0]);

    this.pieChartData.datasets[0].data = allData.map(
      (x: any) => _.values(x)[1]
    );
    this.pieChartData.labels = allData.map((x: any) => _.values(x)[0]);
  }
}
