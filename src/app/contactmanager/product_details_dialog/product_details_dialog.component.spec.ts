/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Product_details_dialogComponent } from './product_details_dialog.component';

describe('Product_details_dialogComponent', () => {
  let component: Product_details_dialogComponent;
  let fixture: ComponentFixture<Product_details_dialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Product_details_dialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Product_details_dialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
