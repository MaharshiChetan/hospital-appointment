import { TestBed } from '@angular/core/testing';

import { PatientAdmissionService } from './patient-admission.service';

describe('PatientAdmissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientAdmissionService = TestBed.get(PatientAdmissionService);
    expect(service).toBeTruthy();
  });
});
