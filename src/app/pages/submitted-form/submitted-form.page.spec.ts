import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedFormPage } from './submitted-form.page';

describe('SubmittedFormPage', () => {
  let component: SubmittedFormPage;
  let fixture: ComponentFixture<SubmittedFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittedFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
