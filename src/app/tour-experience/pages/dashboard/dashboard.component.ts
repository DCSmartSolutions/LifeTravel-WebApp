import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  lineChart: Chart;
  barChart: Chart;

  constructor() {
    this.lineChart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Line Chart Example'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          type: 'line', // Add this line to specify the type
          name: 'Line 1',
          data: [1, 2, 3, 4, 5, 6, 7]
        }
      ]
    });

    this.barChart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Bar Chart Example'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          type: 'bar', // Add this line to specify the type
          name: 'Bar 1',
          data: [7, 6, 5, 4, 3, 2, 1]
        }
      ]
    });
  }
}
