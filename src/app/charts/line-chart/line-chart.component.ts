import { Component } from '@angular/core';
import { ChartType } from 'chart.js';

const LINE_CHART_SAMPLE_DATA: any[] = [
  {
    data: [32, 14, 46, 23, 38, 56],
    label: 'Sentiment Analysis',
    backgroundColor: 'rgba(6,214,160,0.2)',
    borderColor: 'rgba(0,200,140,0.5)',
    pointBackgroundColor: '#000',
    pointBorderColor: '#000',
    pointHoverBackgroundColor: '#555',
    pointHoverBorderColor: '#555',
    fill: 'origin',
  },
  {
    data: [25, 65, 36, 78, 45, 23],
    label: 'Image Recognition',
    backgroundColor: 'rgba(255 , 209, 102, 0.2)',
    borderColor: 'rgba(240, 180, 89, 0.5)',
    pointBackgroundColor: '#000',
    pointBorderColor: '#000',
    pointHoverBackgroundColor: '#555',
    pointHoverBorderColor: '#555',
    fill: 'origin',
  },
  {
    data: [32, 59, 21, 40, 38, 67],
    label: 'Forecasting',
    backgroundColor: 'rgba(15, 78, 133, 0.2)',
    borderColor: 'rgba(3, 64, 128, 0.5)',
    pointBackgroundColor: '#000',
    pointBorderColor: '#000',
    pointHoverBackgroundColor: '#555',
    pointHoverBorderColor: '#555',
    fill: 'origin',
  },
];

const LINE_CHART_LABELS: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent {
  public lineChartData = LINE_CHART_SAMPLE_DATA;
  public lineChartLabels = LINE_CHART_LABELS;
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
}
