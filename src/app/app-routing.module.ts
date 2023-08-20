import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BuyerComponent } from './buyer/buyer.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { RegisterComponent } from './register/register.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerLandingComponent } from './seller-landing/seller-landing.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ApproveRewardPointsComponent } from './approve-reward-points/approve-reward-points.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'buyer-landing', component: BuyerComponent },
  {path: 'register/buyer', component: RegisterComponent},
  {path: 'register/seller', component: RegisterComponent},
  {path: 'seller-landing', component: SellerLandingComponent },
  {path: 'seller-add-product', component: SellerAddProductComponent },
  {path: 'admin-landing', component: AdminLandingComponent },
  {path: 'transaction-history', component: TransactionHistoryComponent },
  {path: 'approve-reward-points', component: ApproveRewardPointsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
