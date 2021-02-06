import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard-vendor-trips',
  templateUrl: './dashboard-vendor-trips.component.html',
  styleUrls: ['./dashboard-vendor-trips.component.scss']
})
export class DashboardVendorTripsComponent implements OnInit {


  tripsPerVendor: any;
  tripStatus: any;

  @Input() set vendorTrips(data: any) {
    if (data) {
      this.makeData(data)
    }
  }

  constructor() { }

  ngOnInit() {
  }

  makeData(data) {
    let vendorsName = [];
    let vendorTrips = [];
    data.vendorData.map(x => {
      if (x) {
        vendorsName.push(x._id.vendoName);
        vendorTrips.push(x.count);
      }
    })
    this.drawBarChart(vendorsName, vendorTrips, data);
  }


  drawBarChart(name, trips, chartData) {
    this.tripsPerVendor = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories: name,
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      tooltip: {
        valueSuffix: ''
      },
      series: [{
        name: '',
        data: trips,
        type: undefined,
        color: 'rgb(248, 161, 63)'
      }]
    });



    this.tripStatus = new Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: '',
        colorByPoint: true,
        data: [{
          name: 'Completed',
          y: chartData.tripData[0].tripCompleted ? chartData.tripData[0].tripCompleted : 0
        }, {
          name: 'Ongoing',
          y: chartData.tripData[0].tripOngoing ? chartData.tripData[0].tripOngoing : 0,
        }, {
          name: 'Scheduled',
          y: chartData.tripData[0].tripScheduled ? chartData.tripData[0].tripScheduled : 0
        }],
        type: undefined
      }]
    });
  }
}
