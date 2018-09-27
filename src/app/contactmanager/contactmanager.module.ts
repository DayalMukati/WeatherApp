import { ProductDetailsComponent } from './ProductDetails/ProductDetails.component';
import { RejectedProductComponent } from './components/RejectedProduct/RejectedProduct.component';
import { ApprovedProductComponent } from './components/ApprovedProduct/ApprovedProduct.component';
import { ProductHistoryComponent } from './components/product-history/product-history.component';
import { TransferProductComponent } from './components/transfer-product/transfer-product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NotesComponent } from './components/notes/notes.component';
import { NewContactDialogComponent } from './components/new-contact-dialog/new-contact-dialog.component';
import { UserComponent } from './components/user/user.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { Product_details_dialogComponent } from './product_details_dialog/product_details_dialog.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ],
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    NotesComponent,
    NewContactDialogComponent,
    TransferProductComponent,
    ProductHistoryComponent,
    ProductHistoryComponent,
    Product_details_dialogComponent,
    ApprovedProductComponent,
    RejectedProductComponent,
    ProductDetailsComponent
],
  entryComponents: [
    NewContactDialogComponent,
    TransferProductComponent,
    Product_details_dialogComponent,
    ApprovedProductComponent,
    RejectedProductComponent,
    ProductDetailsComponent
  ]
})
export class ContactmanagerModule { }
