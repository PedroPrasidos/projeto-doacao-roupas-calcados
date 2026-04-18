import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestuarioList } from './vestuario-list';

describe('VestuarioList', () => {
  let component: VestuarioList;
  let fixture: ComponentFixture<VestuarioList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VestuarioList],
    }).compileComponents();

    fixture = TestBed.createComponent(VestuarioList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
