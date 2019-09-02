import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserInputFormComponent } from './user-input-form/user-input-form.component';
import { DisplayUserDataComponent } from './display-user-data/display-user-data.component';
import {Routes, RouterModule} from '@angular/router';

//route declaration
const routes: Routes = [{
  path: '',
  component: UserInputFormComponent
}, {
  path: 'user/:uid',
  component: DisplayUserDataComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    UserInputFormComponent,
    DisplayUserDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
