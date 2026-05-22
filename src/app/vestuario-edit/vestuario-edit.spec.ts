import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestuarioEdit } from './vestuario-edit';

describe('VestuarioEdit', () => {
  let component: VestuarioEdit;
  let fixture: ComponentFixture<VestuarioEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VestuarioEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(VestuarioEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
