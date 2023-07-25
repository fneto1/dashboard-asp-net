import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
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
    labels: ['Cobra', 'Wandão', 'DonPollo'],
    datasets: [
      {
        data: [300, 500, 100],
      },
    ],
  };
  pieChartLabels: string[] = ['Cobra', 'Wandão', 'DonPollo'];
  public pieChartType: ChartType = 'doughnut';
}
