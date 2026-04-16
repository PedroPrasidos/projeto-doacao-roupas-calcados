import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoacoesRoupasCalcados } from './doacoes-roupas-calcados';

describe('DoacoesRoupasCalcados', () => {
  let component: DoacoesRoupasCalcados;
  let fixture: ComponentFixture<DoacoesRoupasCalcados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoacoesRoupasCalcados],
    }).compileComponents();

    fixture = TestBed.createComponent(DoacoesRoupasCalcados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
