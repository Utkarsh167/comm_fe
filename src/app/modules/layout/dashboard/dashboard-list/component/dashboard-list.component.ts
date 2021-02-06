import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DashboardService } from '../service/dashboard.service';
import { TRIP_TYPE } from 'src/app/constant/app-constant';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import * as _moment from "moment";
import { FormControl } from '@angular/forms';

const moment = _moment;
export const MY_FORMATS = {  // For year and month picker
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
  providers: [ // For year and month picker

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DashboardListComponent implements OnInit {

  date = new FormControl(moment());
  pointPadding: any;
  rangePicker = false;
  dashboardData: any;
  tripHistory: any;
  tripType = TRIP_TYPE;
  currentMonth: number;
  currentYear: number;
  lastDayInMonth: number;
  from: any;
  fromDate: any;
  toDate: any;
  to: any;
  shiftType: string = "login"
  chart: any;
  chart1: any;
  chart2: any;
  chart3: any;
  chart4: any;

  constructor(private _dashBoardService: DashboardService, ) {

  }
  ngOnInit() {
    this.getDashboardData();
    this.getDate();
  }

  getDashboardData() {
    this._dashBoardService.getAllDashBoardData()
      .subscribe(
        response => {
          if (response && response.statusCode == 200) {
            this.dashboardData = response.data;
            this.drawChart();
          }
        }, err => {

        }
      )
  }


  getDashboardTripHistory() {
    this._dashBoardService.getTripHistory({ shiftType: this.shiftType, fromDate: this.fromDate, toDate: this.toDate })
      .subscribe(
        response => {
          if (response && response.statusCode == 200) {
            this.tripHistory = response.data;
          }
        }, err => {

        }
      )
  }

  getDate() { // for getting cuurent  date , month ,year 
    var n = moment().month();
    this.currentMonth = n + 1;
    this.currentYear = moment().year()
    this.lastDayInMonth = moment().daysInMonth();
    this.makeFromDate();
    this.makeToDate();
    this.getDashboardTripHistory();
  }

  chosenYearHandler(normalizedYear: Moment) { // for month and year calendar
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) { // for month and year calendar
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.setDate();
    this.makeFromDate();
    this.makeToDate();
    this.getDashboardTripHistory();
  }

  setDate() { // Set date for filter
    this.currentYear = this.date.value.year();
    var n = this.date.value.month();
    this.currentMonth = n + 1;
    this.lastDayInMonth = this.date.value.daysInMonth();
  }

  makeFromDate() { // make from date
    this.from = moment(1 + "-" + this.currentMonth + "-" + this.currentYear, "DD-MM-YYYY");
    // this.fromDate = this.from._d.toDateString();
    this.fromDate = this.from._d.getTime();
  }

  makeToDate() { // make to date
    this.to = moment(this.lastDayInMonth + "-" + this.currentMonth + "-" + this.currentYear, "DD-MM-YYYY");
    // this.toDate = this.to._d.toDateString();
    this.toDate = this.to._d.getTime();
  }

  openrangepicker() {
    this.rangePicker = !this.rangePicker;
  }

  filter(event) {
    this.shiftType = event;
    this.getDashboardTripHistory();
  }

  drawChart() {
    /* For  CRF */

    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      xAxis: {
        categories: ['']
      },
      title: {
        text: ''
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: ''
        }
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + this.y + '<br/>';
        }
      },
      plotOptions: {
        series: {
          borderWidth: 0
        }
      },
      series: [{
        type: undefined,
        name: 'Pending',
        data: [this.dashboardData.pendingcrf],
        stack: '',
        color: 'rgb(248, 161, 63)'
      }, {
        type: undefined,
        name: 'Approved',
        data: [this.dashboardData.pendingcrf],
        stack: '',
        color: '#8bc34a'
      }]
    })

    /* END */

    /* FOR CABS */
    this.chart1 = new Chart({

      chart: {
        type: 'column'
      },
      xAxis: {
        categories: ['']
      },
      title: {
        text: ''
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: ''
        }
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + this.y + '<br/>';
        }
      },
      plotOptions: {
        column: {
        },
        series: {
          borderWidth: 0
        }
      },
      series: [{

        type: undefined,
        name: 'Assigned',
        data: [this.dashboardData.cabData[0].cabAssign],
        stack: '',
        color: 'rgb(68, 169, 168)'
      }, {
        type: undefined,
        name: 'Unassigned',
        data: [this.dashboardData.cabData[0].cabUnassign],
        stack: '',
        color: 'rgb(255, 195, 255)'
      }]
    })
    /* END */


    /* FOR DRIVERS */
    this.chart2 = new Chart({
      chart: {
        type: 'column'
      },

      xAxis: {
        categories: ['']
      },
      title: {
        text: ''
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: ''
        }
      },

      tooltip: {
        formatter: function () {
          return '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + this.y + '<br/>';
        }
      },

      plotOptions: {
        column: {
        },
        series: {
          borderWidth: 0
        }
      },
      series: [{
        type: undefined,
        name: 'Assigned',
        data: [this.dashboardData.usersData[0].driverAssign],
        stack: '',
        color: '#8bc34a'
      }, {
        type: undefined,
        name: 'Unassigned',
        data: [this.dashboardData.usersData[0].driverUnassign],
        stack: '',
        color: '#f44336'
      }]
    })

    /* END */

    /* FOR ROUTES */
    this.chart3 = new Chart({
      chart: {
        type: 'column'
      },

      xAxis: {
        categories: ['']
      },
      title: {
        text: ''
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: ''
        }
      },

      tooltip: {
        formatter: function () {
          return '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + this.y + '<br/>';
        }
      },

      plotOptions: {
        column: {
        },
        series: {
          borderWidth: 0
        }
      },

      series: [{
        type: undefined,
        name: 'Approved',
        data: [this.dashboardData.routeData[0].routeApproved],
        stack: '',
        color: 'rgb(144, 177, 216)'
      }, {
        type: undefined,
        name: 'Pending',
        data: [this.dashboardData.routeData[0].routePending],
        stack: '',
        color: 'rgb(170, 238, 238)'
      }]
    })

    /* END */

    /* FOR SOS */

    this.chart4 = new Chart({
      chart: {
        type: 'column'
      },

      xAxis: {
        categories: ['']
      },
      title: {
        text: ''
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: ''
        }
      },

      tooltip: {
        formatter: function () {
          return '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + this.y + '<br/>';
        }
      },

      plotOptions: {
        column: {
        },
        series: {
          borderWidth: 0
        }
      },

      series: [{
        type: undefined,
        name: 'Catered',
        data: [this.dashboardData.sosData[0].sosCatered],
        stack: '',
        color: '#8bc34a'
      }, {
        type: undefined,
        name: 'Pending',
        data: [this.dashboardData.sosData[0].sosPending],
        stack: '',
        color: '#f44336'
      }]
    })
    /* END */
  }
}
