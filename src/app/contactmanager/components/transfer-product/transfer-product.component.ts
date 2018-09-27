import { MainContentComponent } from './../main-content/main-content.component';
import { NotesComponent } from './../notes/notes.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transfer-product',
  templateUrl: './transfer-product.component.html',
  styleUrls: ['./transfer-product.component.scss']
})
export class TransferProductComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<TransferProductComponent>,
    private router: Router, private productService: ProductService, private tostr: ToastrService) { }

    owner: string = '';
    isProcessing=false;
    product: Product;
    selected = 'Distributer_1';
    options = (localStorage.getItem('password') == "org1") ?  this.options = ["Distributer_Pune"] : this.options = ["Manufacturer", "Retailer_Hinjewadi", "Retailer_Aundh","Retailer_Hadapsar"];

  ngOnInit() {
    this.owner = localStorage.getItem('owner');
    console.log("This is password : " + localStorage.getItem('password'));
    //this.user = new User();
    this.product=this.productService.transferingProduct;

  }

  name = new FormControl('', [Validators.required]);
  productName = new FormControl('', [Validators.required])

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }
  getErrorMessageForProductName() {
    return this.productName.hasError('required') ? 'You must enter a Product name' : '';
  }

  save() {
    this.isProcessing=true;
    console.log("submit button clicked")
    // this.product.ownership=this.selected;
    // this.product.status= this.selected +' '+'Queue';
    this.productService.transferProduct(this.product)
      .subscribe(data => {
        console.log("This is response data" + data);
        this.tostr.success('Added Succcessfully', 'Alert Added');
        this.isProcessing=false;
        this.dialogRef.close(this.product);
        this.router.navigate(['/home']);
        //this.noteComponent.ngOnInit();
        // console.log("value of e"+ JSON.stringify(e));
      }, err => {
        if (err.status == 200) {
          this.tostr.success('Added Succcessfully', 'Alert Added');
          console.log("Trx ID is " + err.error.text);
          this.isProcessing=false;
          this.dialogRef.close(this.product);
         // this.noteComponent.ngOnInit();
          //this.listComp.fetchData();
          // this.listComp.ngOnInit();
          this.router.navigate(['/home']);

        }

        // console.log("value of e"+ JSON.stringify(e));
        this.dialogRef.close(this.product);
        this.tostr.error('Something went wrong', 'Error Occured');
        console.log("error occured" + JSON.stringify(err));
      });
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
