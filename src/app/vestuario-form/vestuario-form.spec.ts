import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestuarioForm } from './vestuario-form';

describe('VestuarioForm', () => {
  let component: VestuarioForm;
  let fixture: ComponentFixture<VestuarioForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VestuarioForm],
    }).compileComponents();

    fixture = TestBed.createComponent(VestuarioForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
