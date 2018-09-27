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
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss'],
  providers:[NotesComponent]
})
export class NewContactDialogComponent implements OnInit {

  avatars = [
    'svg-1', 'svg-2', 'svg-3', 'svg-4'
  ];

  user: User;
  owner: string = '';
  isProcessing= false;
  product: Product;
  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,private notecomp: NotesComponent,
    private router: Router, private productService: ProductService, private tostr: ToastrService) { }

  name = new FormControl('', [Validators.required]);
  productName = new FormControl('', [Validators.required])

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }
  getErrorMessageForProductName() {
    return this.productName.hasError('required') ? 'You must enter a Alert Id' : '';
  }

  ngOnInit() {
    this.owner = localStorage.getItem('owner');
    //this.user = new User();
    this.product = new Product();
    // this.product.ownership = 'Manufacturer';
    // this.product.status = 'In Manufacturer Queue'
  }

  save() {
    this.isProcessing=true;
    console.log("submit button clicked")
    this.productService.addProduct(this.product)
      .subscribe(data => {
        console.log("This is response data" + data);
        this.tostr.success('Added Succcessfully', 'Alert Created');
        this.dialogRef.close(this.product);
        this.router.navigate(['/home']);
        this.isProcessing=false;
       this.notecomp.fetchData();
        // console.log("value of e"+ JSON.stringify(e));
      }, err => {
        this.isProcessing=false;
        if (err.status == 200) {
          this.tostr.success('Added Succcessfully', 'Alert Created');
          console.log("Trx ID is " + err.error.text);
          this.dialogRef.close(this.product);
          this.notecomp.ngOnInit();
          //this.listComp.fetchData();
          // this.listComp.ngOnInit();
          this.router.navigate(['/home']);

        }
        

        // console.log("value of e"+ JSON.stringify(e));
        this.dialogRef.close(this.product);
       // this.tostr.error('Something went wrong', 'Error Occured');
        console.log("error occured" + JSON.stringify(err));
      });


    // this.userService.addUser(this.user).then(user => {
    //   this.dialogRef.close(user);
    // });
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
