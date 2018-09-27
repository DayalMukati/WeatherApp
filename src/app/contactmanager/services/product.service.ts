import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';


@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }
  productList: Product[] = [];
  product = new Product;
  transferingProduct= new Product;
  selectedOption='1';
  productHistory:string='';

// Home:192.168.31.165 --// 9.193.16.118 //9.191.216.73   //9.193.16.118
private _url: string ='http://9.193.243.178:4000/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=query&args=%5B%22XXX%22%5D'//'http://9.193.16.48:4000/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=query&args=%5B%22'//// 
private authentication_url: string ='http://9.193.16.118:4000/users'//'http://192.168.31.165:4000/users'// ;
getNodeData(): Observable<Product[]> {
  return this.http.get<Product[]>(this._url)
    .catch(this.errorHandler);
}

getSingleProduct(batch) {
  console.log(localStorage.getItem('accessToken'));
  var headerOption = new Headers({ 'Content-Type': 'application/json' });
  return this.http.get(this._url+batch+'%22%5D',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('accessToken')})});

}

private _product_list_url:string='http://9.193.243.178:4000/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=getAllManuFacturerBatches&args=%5B%22'//'http://9.193.16.48:4000/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=getAllManuFacturerBatches&args=%5B%22%22%5D'
getAllProductList(owner){
  console.log(localStorage.getItem('accessToken'));

  var headerOption = new Headers({ 'Content-Type': 'application/json' });
  return this.http.get(this._product_list_url+owner+"%22%5D",{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('accessToken')})});

}

private history_url:string='http://9.193.243.178:4000/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=getweatherhistory&args=%5B%22'
getHistoryForProduct(batchId:string){
  console.log(localStorage.getItem('accessToken'));

  var headerOption = new Headers({ 'Content-Type': 'application/json' });
  return this.http.get(this.history_url+batchId+'%22%5D',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('accessToken')})});

}

private add_url:string='http://9.193.243.178:4000/channels/mgrchannel/chaincodes/mycc'// 'http://9.193.16.48:4000/channels/mgrchannel/chaincodes/mycc'////'
addProduct(productData){
 var dataarray:any;
//  var manudate=(productData.manufacturingDate.getTime()).toString();  
//  var expdate=(productData.expiryDate.getTime()).toString();
 dataarray= [productData.weatherAlertID ,productData.severity,productData.disasterType,productData.disasterOrigin,productData.impactedArea,
  (productData.imdDateTime.getTime()).toString(),productData.imdComment, "","","Awaiting",
  "","","Awaiting"];

 console.log("This is dataarray"+dataarray);

  var data={fcn:'addalert',args:dataarray}
  var reqHeader = new HttpHeaders({  'Authorization':'Bearer '+localStorage.getItem('accessToken') });
  return this.http.post(this.add_url, data, { headers: reqHeader });
}


updateState(productData:Product){
  var dataarray:any;
  // var batch=productData.batchNumber;
  // var manudate=(productData.manufacturingDate.getTime()).toString();
  // var expdate=(productData.stateDateTime.getTime()).toString();
  dataarray= [productData.weatherAlertID, (productData.stateDateTime.getTime()).toString(),productData.stateComment,productData.stateStatus];

  console.log("This is dataarray"+dataarray);

   // var data = "fcn=" + "addProduct" + "&args=" + dataarray;
   var data={fcn:'updatestate',args:dataarray}
   //'Content-Type': 'application/json',, responseType:'text'
   var reqHeader = new HttpHeaders({  'Authorization':'Bearer '+localStorage.getItem('accessToken') });
   return this.http.post(this.add_url, data, { headers: reqHeader });
}



updateCentral(productData:Product){
  //console.log("This is dataarray : "+productData.ownership);
  var dataarray:any;
  // var batch=productData.batchNumber;
  // var manudate=(productData.manufacturingDate.getTime()).toString();
  // var expdate=(productData.stateDateTime.getTime()).toString();
  dataarray= [productData.weatherAlertID, (productData.centralDateTime.getTime()).toString(),productData.centralComment,productData.centralStatus];

  console.log("This is dataarray"+dataarray);

   // var data = "fcn=" + "addProduct" + "&args=" + dataarray;
   var data={fcn:'updatecentral',args:dataarray}
   //'Content-Type': 'application/json',, responseType:'text'
   var reqHeader = new HttpHeaders({  'Authorization':'Bearer '+localStorage.getItem('accessToken') });
   return this.http.post(this.add_url, data, { headers: reqHeader });
}


transferProduct(productData:Product){
  //console.log("This is dataarray : "+productData.ownership);
  var dataarray:any;
  // var batch=productData.batchNumber;
  // var manudate=(productData.manufacturingDate.getTime()).toString();
  // var expdate=(productData.expiryDate.getTime()).toString();
  // dataarray= [productData.weatherAlertID,productData.ownership,productData.status];

  console.log("This is dataarray"+dataarray);

   // var data = "fcn=" + "addProduct" + "&args=" + dataarray;
   var data={fcn:'transferProduct',args:dataarray}
   //'Content-Type': 'application/json',, responseType:'text'
   var reqHeader = new HttpHeaders({  'Authorization':'Bearer '+localStorage.getItem('accessToken') });
   return this.http.post(this.add_url, data, { headers: reqHeader });
}


userAuthentication(username, password) {
  var data = "username=" + username + "&orgName=" + password + "&grant_type=password";
  var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  console.log("username: " + username + "  " +"password: " + password)
  return this.http.post(this.authentication_url, data, { headers: reqHeader });
}

errorHandler(error: HttpErrorResponse) {
  return Observable.throw(error.message || "Server Error");
}

  getFakeProduct() {
    var numbers = ['A', 'B', 'C'];
    for (var _i = 0; _i < numbers.length; _i++) {
      var num = numbers[_i];

      // this.product = new Product;
      // this.product.batchNumber = numbers[_i];
      // this.product.barcode = numbers[_i];
      // this.product.comment = numbers[_i];
      // this.product.expiryDate = new Date()// element.expdate;
      // this.product.manufacturerName = numbers[_i];
      // this.product.manufacturingDate = new Date();// element.manfdate;
      // this.product.ownership = numbers[_i];
      // this.product.price = numbers[_i];
      // this.product.productName = numbers[_i];
      // this.product.quantity = numbers[_i];
      // this.product.temperature = numbers[_i];
      // this.product.weight = numbers[_i];
      // this.product.status = numbers[_i];
      // this.productList.push(this.product)

    }

    return this.productList;


  }

}
