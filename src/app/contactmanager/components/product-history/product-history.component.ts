import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styleUrls: ['./product-history.component.scss'] 
})
export class ProductHistoryComponent implements OnInit {

  displayedColumns = ['alert_id', 'sevarity', 'forecast_date_time','state_comment','state_status', 'central_comment','central_status'];
  dataSource: MatTableDataSource<Product>;

  productList = [];
  productList2 = [];
  product = new Product;
  constructor(private productService: ProductService, private tostr: ToastrService) { }

  ngOnInit() {
  }

  getProduct(productForm: NgForm) {
    this.productService.getHistoryForProduct( productForm.value.weatherAlertID)
      .subscribe((data: any) => {
        this.productList2 = [];
        console.log("This is response data: data................................." + JSON.stringify(data));
        // console.log("Owner is : "+ localStorage.getItem('owner') )
        // console.log("User Name is : "+ localStorage.getItem('owner'))
        data.forEach(element => {
          this.product = new Product;
                this.product.weatherAlertID = element.Value.walertid;
                this.product.severity = element.Value.severity;
                this.product.disasterType = element.Value.disastertype;
                this.product.disasterOrigin =element.Value.disasterorigin;// new Date(parseInt(element.expdate))// element.expdate;
                this.product.impactedArea = element.Value.dnpactedArea;
                this.product.imdDateTime = new Date(parseInt(element.Value.imddatetime));// element.manfdate;
                this.product.stateDateTime =  new Date(parseInt(element.Value.statedatetime));
                this.product.stateComment = element.Value.statecomment;
                this.product.stateStatus = element.Value.statestatus;
                this.product.centralDateTime =  new Date(parseInt(element.Value.centraldatetime));
                this.product.centralComment = element.Value.centralcomment;
                this.product.centralStatus = element.Value.centralstatus;

          this.productList2.push(this.product)
        })

        this.productList = this.productList2 as Product[];

        this.dataSource = new MatTableDataSource<Product>(this.productList);
        //this.cd.markForCheck();
        //this.sam= data;
        console.log("This is list==========================" + JSON.stringify(this.productList));
        console.log("This is response data==========================" + JSON.stringify(data));
        //console.log("This is response data"+ JSON.stringify(productList));

        // this.tostr.success('Added Succcessfully', 'Product Added');
        // console.log("value of e"+ JSON.stringify(e));
      }, err => {
        if (err.status == 200) {
          this.tostr.success('Product Fetched Successfully', '');
          console.log("Trx ID is " + err.error.text);
        }

        // console.log("value of e"+ JSON.stringify(e));
        console.log("error occured" + JSON.stringify(err));
      });

  }

}