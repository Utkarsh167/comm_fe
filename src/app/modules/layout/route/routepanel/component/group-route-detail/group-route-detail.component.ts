import { Component, OnInit, Input } from '@angular/core';
// imported GENDER_COLOUR, GENDERS - Shivakumar A
import { GENDER_COLOUR, GENDERS } from '../../../../../../constant/app-constant';

@Component({
  selector: 'app-group-route-detail',
  templateUrl: './group-route-detail.component.html',
  styleUrls: ['./group-route-detail.component.scss']
})
export class GroupRouteDetailComponent implements OnInit {

  empDetails: any;
  // Added newUserDetails - Shivakumar A
  newUserDetails: any;
  overAllDetails: any;
  // definded variables for color and value - Shivakumar A
  maleValue: string;
  femaleValue: string;
  otherValue: string;
  maleColor: string;
  femaleColor: string;
  otherColor: string;
  counter: any;

  @Input() set employeeData(data: any) {
    if (data) {
      this.empDetails = data;
    }
  }

  // get newUserDetails - Shivakumar A
  @Input() set newUserData(data: any) {
    if (data) {
      this.newUserDetails = data;
    }
  }
  // get newUserDetails - Shivakumar A
  @Input() set overallData(data: any) {
    if (data) {
      this.overAllDetails = data;
     
    }
  }
  constructor() {
    // Added color's and value - Shivakumar A
    this.maleColor = GENDER_COLOUR.MALE;
    this.femaleColor = GENDER_COLOUR.FEMALE;
    this.otherColor = GENDER_COLOUR.OTHER;
    this.maleValue = GENDERS[0].value;
    this.femaleValue = GENDERS[1].value;
    this.otherValue = GENDERS[2].value;
  }

  ngOnInit() {
    // Change color of new groups div & scroll - Shivakumar A
    let div = document.getElementsByClassName('group-detail-wrapper');
    this.overAllDetails.forEach((overAllelement, index) => {
      div[index].setAttribute('id', "ID"+index)
      this.newUserDetails.forEach((element) => {

        if (overAllelement.created === element.created && overAllelement.shiftName === element.shiftName) {
          let divColor = div[index] as HTMLElement;
          divColor.classList.add('fadeOut');
          setTimeout(()=>{
            let div =  document.getElementById(divColor.getAttribute('id'));
            div.scrollIntoView({ behavior: 'smooth'});
          }, 1000)

        }
      });
    });
    


  }

}
