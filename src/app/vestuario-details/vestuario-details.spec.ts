import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestuarioDetails } from './vestuario-details';

describe('VestuarioDetails', () => {
  let component: VestuarioDetails;
  let fixture: ComponentFixture<VestuarioDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VestuarioDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(VestuarioDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
