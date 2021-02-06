import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stakeholders',
  templateUrl: './stakeholders.component.html',
  styleUrls: ['./stakeholders.component.scss']
})
export class StakeholdersComponent implements OnInit {

  adminRole: string;
  constructor() { }

  ngOnInit() {
    this.adminRole = localStorage.getItem('fleet-admin-role');

  }

}
