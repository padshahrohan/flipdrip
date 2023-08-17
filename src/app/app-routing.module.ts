import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BuyerComponent } from './buyer/buyer.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'buyer', component: BuyerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
