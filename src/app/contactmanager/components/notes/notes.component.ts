import { ProductDetailsComponent } from './../../ProductDetails/ProductDetails.component';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { Product } from './../../models/product.model';
import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Note } from '../../models/note';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { TransferProductComponent } from '../transfer-product/transfer-product.component';
import { Product_details_dialogComponent } from '../../product_details_dialog/product_details_dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  @Input() notes: Note[];

  displayedColumns = ['position', 'title', 'imddate','centraldate','statedate', 'stateStatus','centralStatus','details', 'acknowledge'];
  dataSource: MatTableDataSource<Product>;
constant=0;
  owner: string = '';
  productList = [];
  productList2 = [];
  product = new Product;

  public options = [
    { "id": 1, "name": "Distributer_1" },
    { "id": 2, "name": "Distributer_2" },
    { "id": 3, "name": "Distributer_3" }
  ]

  constructor(private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private cd: ChangeDetectorRef,
    private tostr: ToastrService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // ngAfterViewInit() {

  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  ngOnInit() {
    // this.productList= this.productService.getFakeProduct();
    this.fetchData();
    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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

  acknowledge(product) {
    this.productService.transferingProduct = product;
    // openAddContactDialog(): void {
    let dialogRef = this.dialog.open(Product_details_dialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      if (result) {
        this.openSnackBar("Alart Added", "Refresh")
          .onAction().subscribe(() => {
            this.router.navigate(['/contactmanager', result.id]);
          });
      }
    });
    // }


    console.log('Transfer Clicked!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  fetchData() {
    this.productList2 = [];
    this.owner = localStorage.getItem('owner');
    this.productService.getAllProductList(this.owner)
      .subscribe((data: any) => {
        console.log("This is response data...............sandip: data................................." + JSON.stringify(data));
        console.log("Owner is : " + localStorage.getItem('owner'))
        console.log("User Name is : " + localStorage.getItem('owner'))
        // if(this.constant==1){
        //   this.productList=undefined;
        // }else
        // {
          if (data.Alert) {

            data.Alert.forEach(element => {
              // if (element.status === 'In Manufacturer Queue' || element.status==='Distributer_Pune Queue'
              // || element.status==='Retailer_Hadapsar Queue') {
                this.product = new Product;
                this.product.weatherAlertID = element.walertid;
                this.product.severity = element.severity;
                this.product.disasterType = element.disastertype;
                this.product.disasterOrigin =element.disasterorigin;// new Date(parseInt(element.expdate))// element.expdate;
                this.product.impactedArea = element.impactedarea;
                this.product.imdComment = element.imdcomment;
                this.product.imdDateTime = new Date(parseInt(element.imddatetime));// element.manfdate;
                this.product.stateDateTime =  new Date(parseInt(element.statedatetime));
                this.product.stateComment = element.statecomment;
                this.product.stateStatus = element.statestatus;
                this.product.centralDateTime =  new Date(parseInt(element.centraldatetime));
                this.product.centralComment = element.centralcomment;
                this.product.centralStatus = element.centralstatus;

                this.productList2.push(this.product)
              // }
  
            })
          }
  
          this.productList = this.productList2 as Product[];
          this.dataSource = new MatTableDataSource<Product>(this.productList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          //this.cd.markForCheck();
          
          console.log("This is list==========================" + JSON.stringify(this.productList));
          console.log("This is response data==========================" + JSON.stringify(data));
          //console.log("This is response data"+ JSON.stringify(productList));
  
          // this.tostr.success('Added Succcessfully', 'Product Added');
          // console.log("value of e"+ JSON.stringify(e));
       

        // }
        //this.constant++;



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
