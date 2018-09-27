import { TransferProductComponent } from './../transfer-product/transfer-product.component';
import { ProductDetailsComponent } from './../../ProductDetails/ProductDetails.component';
import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator, MatSort, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Product } from '../../models/product.model';
import { ToastrService } from 'ngx-toastr';
import { Product_details_dialogComponent } from '../../product_details_dialog/product_details_dialog.component';

@Component({
  selector: 'app-ApprovedProduct',
  templateUrl: './ApprovedProduct.component.html',
  styleUrls: ['./ApprovedProduct.component.scss']
})
export class ApprovedProductComponent implements OnInit {

  constructor(private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private cd: ChangeDetectorRef,
    private tostr: ToastrService) { }

  displayedColumns = ['position', 'title', 'date', 'transfer', 'details'];
  dataSource: MatTableDataSource<Product>;

  owner: string = '';
  productList = [];
  productList2 = [];
  product = new Product;


  public options = [
    { "id": 1, "name": "Distributer_1" },
    { "id": 2, "name": "Distributer_2" },
    { "id": 3, "name": "Distributer_3" }
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // ngAfterViewInit() {

  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  ngOnInit() {
    this.fetchData();
  }

  details(product){
    this.productService.transferingProduct = product;
    // openAddContactDialog(): void {
    let dialogRef = this.dialog.open(ProductDetailsComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      if (result) {
        this.openSnackBar("Alert Added", "Refresh")
          .onAction().subscribe(() => {
            this.router.navigate(['/contactmanager', result.id]);
          });
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  transfer(product) {
   
    this.productService.transferingProduct = product;
    // openAddContactDialog(): void {
    let dialogRef = this.dialog.open(TransferProductComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      if (result) {
        this.openSnackBar("Alert Added", "Refresh")
          .onAction().subscribe(() => {
            this.router.navigate(['/contactmanager', result.id]);
          });
      }
    });
    // }


    console.log('Transfer Clicked!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  }


  fetchData() {
    this.productList2 = [];
    this.owner = localStorage.getItem('owner');
    this.productService.getAllProductList(this.owner)
      .subscribe((data: any) => {
        console.log("Approved Product................................." + JSON.stringify(data));
        console.log("Owner is : " + localStorage.getItem('owner'))
        console.log("User Name is : " + localStorage.getItem('owner'))

        // if (data.Batches) {
        //   data.Batches.forEach(element => {

        //     if (element.status === this.owner + ' ' + 'Approved') {
        //       this.product = new Product;
        //       this.product.batchNumber = element.batchid;
        //       this.product.barcode = element.barcode;
        //       this.product.comment = element.comment;
        //       this.product.expiryDate = new Date(parseInt(element.expdate))// element.expdate;
        //       this.product.manufacturerName = element.manname;
        //       this.product.manufacturingDate = new Date(parseInt(element.manfdate));// element.manfdate;
        //       this.product.ownership = element.ownership;
        //       this.product.price = element.price;
        //       this.product.productName = element.prdname;
        //       this.product.quantity = element.quantity;
        //       this.product.temperature = element.temp;
        //       this.product.weight = element.weight
        //       this.product.status = element.status

        //       this.productList2.push(this.product)
        //     }

        //   })
        // }

        this.productList = this.productList2 as Product[];
        this.dataSource = new MatTableDataSource<Product>(this.productList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cd.markForCheck();
        //this.sam= data;
        console.log("This is list==========================" + JSON.stringify(this.productList));
        console.log("This is response data==========================" + JSON.stringify(data));
        //console.log("This is response data"+ JSON.stringify(productList));

        // this.tostr.success('Added Succcessfully', 'Product Added');
        // console.log("value of e"+ JSON.stringify(e));
      }, err => {
        if (err.status == 200) {
          this.tostr.success('Added Succcessfully', 'Alert Added');
          console.log("Trx ID is " + err.error.text);
        }

        // console.log("value of e"+ JSON.stringify(e));
        console.log("error occured" + JSON.stringify(err));
      });
  }
}
