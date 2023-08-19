import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BuyerComponent } from './buyer/buyer.component';
import { MenuComponent } from './menu/menu.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { RegisterComponent } from './register/register.component';
import { RulesAndRegulationComponent } from './rules-and-regulation/rules-and-regulation.component';
import { SellerLandingComponent } from './seller-landing/seller-landing.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { HttpClientModule } from '@angular/common/http';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ApproveRewardPointsComponent } from './approve-reward-points/approve-reward-points.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BuyerComponent,
    MenuComponent,
    ProductListComponent,
    AdminLandingComponent,
    RegisterComponent,
    RulesAndRegulationComponent,
    SellerLandingComponent,
    SellerAddProductComponent,
    AddProductFormComponent,
    TransactionHistoryComponent,
    ApproveRewardPointsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
