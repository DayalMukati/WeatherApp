import { ProductHistoryComponent } from './contactmanager/components/product-history/product-history.component';
import { TransferProductComponent } from './contactmanager/components/transfer-product/transfer-product.component';
import { appRoutes } from './contactmanager/routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './contactmanager/components/user/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './contactmanager/services/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './contactmanager/components/user/user.component';
import { SignInComponent } from './contactmanager/components/user/sign-in/sign-in.component';
import { ContactmanagerAppComponent } from './contactmanager/contactmanager-app.component';
import { ContactmanagerModule } from './contactmanager/contactmanager.module';

export const routes: Routes = [
  { path: 'contactmanager', loadChildren: './contactmanager/contactmanager.module#ContactmanagerModule' },
  { path: 'demo', loadChildren: './demo/demo.module#DemoModule' },
  { path: '**', redirectTo: 'contactmanager' }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    ContactmanagerModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ProductService,HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
