import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-input-form',
  templateUrl: './user-input-form.component.html',
  styleUrls: ['./user-input-form.component.css']
})
export class UserInputFormComponent implements OnInit {
  registered: boolean;
  submitted: boolean;
  userForm: FormGroup;
  serviceErrors: any;

  constructor(private formBuilder: FormBuilder) {
    this.registered = false;
    this.submitted = false;
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
      this.registered = true;
    }
  }
}
