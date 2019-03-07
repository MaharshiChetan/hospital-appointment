import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBillPage } from './create-bill.page';

describe('CreateBillPage', () => {
  let component: CreateBillPage;
  let fixture: ComponentFixture<CreateBillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
