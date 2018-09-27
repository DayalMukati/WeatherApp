import { Router } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isLoginError = true;
  constructor(private router: Router, private productSrevice: ProductService) { }

  ngOnInit() {
  }

  OnSubmit(userName, password) {
    // this.productSrevice.getNodeData()
    // .subscribe(data => this.product = data,
    //           error => this.errorMessage=error);
    //           console.log("This is error: "+ this.errorMessage)

   // this.router.navigate(['/home']);

   this.isLoginError= true;

    this.productSrevice.userAuthentication(userName, password).subscribe((data: any) => {
      localStorage.setItem('accessToken', data.token)

      // this.router.navigate(['/sample'])
      //console.log("This is Token: "+ data.)
      console.log("This is Token: " + data.token)
      // if (password == "org1") {
        
        localStorage.setItem('owner', userName)
        localStorage.setItem('password', password)
        console.log("This is password: "+ password)
        console.log("This is password ---Storage : "+ localStorage.getItem('password'))
        this.router.navigate(['/home']);
        
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;

      });
  }
}
