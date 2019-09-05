import {Component, OnInit} from '@angular/core';
import {UserInfoModel} from '../models/userInfoModel';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-display-user-data',
  templateUrl: './display-user-data.component.html',
  styleUrls: ['./display-user-data.component.css']
})
export class DisplayUserDataComponent implements OnInit {
  user: UserInfoModel = new UserInfoModel({
    guid: 'D21ds12x',
    customerUid: 'cust2dsa12dsa',
    user_name: 'unknown',
    first_name: 'John',
    last_name: 'Doe',
    email: 'email@email.com',
    zipcode: 10283,
    password: 'Idasn2x2#'
  });
  private subscriber: any;


  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscriber = this.route.params.subscribe(params => {
      this.http.get('/api/v1/customer' + params.uid).subscribe((data:any) => {
        this.user = new UserInfoModel(data.customer);
      });
    });
  }

}
