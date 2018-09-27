import { ProductService } from './../../services/product.service';
import { NewContactDialogComponent } from './../new-contact-dialog/new-contact-dialog.component';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav, MatDialog, MatSnackBar, SimpleSnackBar, MatSnackBarRef } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  users: Observable<User[]>;
  isDarkTheme: boolean = false;
  dir: string = 'ltr';
  selectedItem:string='1';
  isManufacturer:boolean=true;


  options =['Add Product', 'Transfer', 'Check History','Delete','More'];

  constructor(
    zone: NgZone,
    private dialog: MatDialog, 
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private router: Router) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = mql));
  }

  home(){
    console.log('Home Clicked!!!!!!!!!!!!!!')
    this.productService.selectedOption='1';
    this.router.navigate(['/home'])
  }

  productHistory(number:string){
    console.log('Home Clicked!!!!!!!!!!!!!!')
    this.productService.selectedOption=number;
    this.router.navigate(['/home/history'])
    console.log('Selected value is : $!!!!!!!!!!!!!!'+ this.productService.selectedOption)
  }

  deleteProduct(number:string){
    console.log('Delete Clicked!!!!!!!!!!!!!!')
    this.productService.selectedOption=number;
    this.router.navigate(['/home/delete'])
    console.log('Selected value is : $!!!!!!!!!!!!!!'+ this.productService.selectedOption)
  }

  openAddContactDialog(): void {
    let dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      if (result) {
        this.openSnackBar("Alert Added", "Refresh")
          .onAction().subscribe(() => {
            this.router.navigate(['/home']);
          });
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
    this.sidenav.toggle().then(() => this.sidenav.toggle());
  }

  ngOnInit() {
    if(localStorage.getItem('owner')==='Jim'){
      this.isManufacturer=true;
    }else{
      this.isManufacturer=false;
    }
    
    
    // this.users = this.userService.users;
    // this.userService.loadAll();

    this.router.events.subscribe(() => {
      if (this.isScreenSmall())
        this.sidenav.close();
    })
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
