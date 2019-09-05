import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

//integrate service
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-input-form',
  templateUrl: './user-input-form.component.html',
  styleUrls: ['./user-input-form.component.css']
})
export class UserInputFormComponent implements OnInit {
  registered: boolean;
  submitted: boolean;
  guid: string;
  userForm: FormGroup;
  serviceErrors: any = {};

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.registered = false;
    this.submitted = false;

    this.http.get('/api/v1/generate_uid').subscribe((data:any) => {
      this.guid = data.guid;
    }, (error) => {
      console.error('There was an error generating the proper GUID on the server', error);
    });
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    });
  }

  invalidUserName() {
    return (this.submitted && (this.serviceErrors.user_name !== null && this.userForm.controls.user_name.errors != null));
  }

  invalidFirstName() {
    return (this.submitted && (this.serviceErrors.first_name !== null && this.userForm.controls.first_name.errors != null));
  }

  invalidLastName() {
    return (this.submitted && (this.serviceErrors.last_name !== null && this.userForm.controls.last_name.errors != null));
  }

  invalidEmail() {
    return (this.submitted && (this.serviceErrors.email !== null && this.userForm.controls.email.errors != null));
  }

  invalidZipcode() {
    return (this.submitted && (this.serviceErrors.zipcode !== null && this.userForm.controls.zipcode.errors != null));
  }

  invalidPassword() {
    return (this.submitted && (this.serviceErrors.password !== null && this.userForm.controls.password.errors != null));
  }

  onSubmit() {
    this. submitted = true;

    if (this.userForm.invalid !== true) {
      let data: any = Object.assign({guid: this.guid}, this.userForm.value);

      this.http.post('/api/v1/customer', data).subscribe((data: any) => {
        const path = '/user/' + data.customer.uid;

        this.router.navigate([path]);
      }, error => {
        this.serviceErrors = error.error.error;
      });
      this.registered = true;
    }
  }
}
