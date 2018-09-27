import { Product } from './../models/product.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductService } from './../services/product.service';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product_details_dialog',
  templateUrl: './product_details_dialog.component.html',
  styleUrls: ['./product_details_dialog.component.scss']
})
export class Product_details_dialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<Product_details_dialogComponent>,
    private router: Router, private productService: ProductService, private tostr: ToastrService) { }

  owner: string = '';
  // product: Product;
  product = new Product;
  isProcessing= false;

  ngOnInit() {
  
    this.product=this.productService.transferingProduct;
  }


  approve(value: string) {
    this.isProcessing=true;
    // if (value === '1') {
    //   this.product.status = this.product.ownership + ' ' + 'Approved';
    // } else if (value === '2') {
    //   this.product.status = this.product.ownership + ' ' + 'Rejected';
    // }

    console.log("submit button clicked")

     if(localStorage.getItem('owner')=='Avni'){
      this.product.stateDateTime=new Date();
      this.productService.updateState(this.product)
      .subscribe(data => {
        this.isProcessing=false
       // console.log("This is response data" + data);
        if (value === '1') {
          this.tostr.success('Approved', 'Alert Acknowledged');
        } else if (value === '2') {
          this.tostr.warning('Rejected', 'Alert Rejected');
        }
        this.dialogRef.close(this.product);
        //this.router.navigate(['/home']);
      }, err => {
        if (err.status == 200) {
          this.isProcessing=false
          //this.tostr.success('Approved', 'Alert Acknowledged');
          if (value === '1') {
            this.tostr.success('Approved', 'Alert Acknowledged');
          } else if (value === '2') {
            this.tostr.warning('Rejected', 'Alert Rejected');
          }
          console.log("Trx ID is " + err.error.text);
          this.dialogRef.close(this.product);
          // this.noteComponent.ngOnInit();
          //this.listComp.fetchData();
          // this.listComp.ngOnInit();
          //this.router.navigate(['/home']);

        }

        // console.log("value of e"+ JSON.stringify(e));
        this.dialogRef.close(this.product);
        this.isProcessing=false
       // this.tostr.error('Something went wrong', 'Error Occured');
        console.log("error occured" + JSON.stringify(err));
      });
     }else {
       this.product.centralComment=this.product.stateComment;
       this.product.centralStatus=this.product.stateStatus;
       this.product.centralDateTime=new Date();
      this.productService.updateCentral(this.product)
      .subscribe(data => {
        this.isProcessing=false
       // console.log("This is response data" + data);
        if (value === '1') {
          this.tostr.success('Approved', 'Alert Acknowledged');
        } else if (value === '2') {
          this.tostr.warning('Rejected', 'Alert Rejected');
        }
        this.dialogRef.close(this.product);
        //this.router.navigate(['/home']);
      }, err => {
        if (err.status == 200) {
          this.isProcessing=false
          //this.tostr.success('Approved', 'Alert Acknowledged');
          if (value === '1') {
            this.tostr.success('Approved', 'Alert Acknowledged');
          } else if (value === '2') {
            this.tostr.warning('Rejected', 'Alert Rejected');
          }
          console.log("Trx ID is " + err.error.text);
          this.dialogRef.close(this.product);
          // this.noteComponent.ngOnInit();
          //this.listComp.fetchData();
          // this.listComp.ngOnInit();
          //this.router.navigate(['/home']);

        }

        // console.log("value of e"+ JSON.stringify(e));
        this.dialogRef.close(this.product);
        this.isProcessing=false
       // this.tostr.error('Something went wrong', 'Error Occured');
        console.log("error occured" + JSON.stringify(err));
      });
     }

    // this.product.status= this.product.ownership+' '+ 'Approved';
    
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
