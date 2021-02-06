import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../service/profile.service";
import { Router } from "@angular/router";
import { EMPLOYEES } from "../../../../constant/absolute-routes";
import { DataTransferService } from "../../../shared/services/data-transfer.service";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewComponent implements OnInit {
  constructor(private _profile: ProfileService, private _router: Router) {}

  profileData: any;
  adminRole: string;

  ngOnInit() {
    this.adminRole = localStorage.getItem("fleet-admin-role");
    this.getProfileData();
  }

  getProfileData() {
    this._profile.getProfileDetails(true).subscribe(
      response => {
        if (!response.data) {
          this._router.navigate([EMPLOYEES]);
        }
        this.profileData = response.data;
        // console.log(this.profileData);
      },
      err => {
        this._router.navigate([EMPLOYEES]);
      }
    );
  }
}
