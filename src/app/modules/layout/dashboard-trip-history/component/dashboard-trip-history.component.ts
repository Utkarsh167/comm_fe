import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard-trip-history',
  templateUrl: './dashboard-trip-history.component.html',
  styleUrls: ['./dashboard-trip-history.component.scss']
})
export class DashboardTripHistoryComponent implements OnInit {

  tripHistory: any;
  dateShowing: string[] = [];
  cancelledData: number[] = [];
  rescheduledData: number[] = []

  @Input() set allTripHistory(data: any) {
    if (data) {
      this.makeData(data)
    }
  }

  constructor() { }
  ngOnInit() {
  }

  makeData(data) {
    this.dateShowing = [];
    this.cancelledData = [];
    this.rescheduledData = [];
    data.tripCancelData.map(x => {
      this.dateShowing.push(x.date);
      this.cancelledData.push(x.views);
    })

    data.tripRescheduleData.map(x => {
      this.rescheduledData.push(x.views);
    })

    this.drawLineChart(this.dateShowing, this.cancelledData, this.rescheduledData)
  }

  drawLineChart(dateArray, cancelData, rescheduleData) {
    this.tripHistory = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories: dateArray
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [{
        name: 'Cancelled',
        data: cancelData,
        type: undefined
      }, {
        name: 'Rescheduled',
        data: rescheduleData,
        type: undefined
      }]
    })
  }

}
