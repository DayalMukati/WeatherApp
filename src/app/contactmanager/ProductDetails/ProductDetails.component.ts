import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../services/product.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { Product } from './../models/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ProductDetails',
  templateUrl: './ProductDetails.component.html',
  styleUrls: ['./ProductDetails.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ProductDetailsComponent>,
    private router: Router, private productService: ProductService, private tostr: ToastrService) { }

  owner: string = '';
  // product: Product;
  product = new Product;

  ngOnInit() {
    this.product=this.productService.transferingProduct;
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
