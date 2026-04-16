import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoupasListagem } from './roupas-listagem';

describe('RoupasListagem', () => {
  let component: RoupasListagem;
  let fixture: ComponentFixture<RoupasListagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoupasListagem],
    }).compileComponents();

    fixture = TestBed.createComponent(RoupasListagem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
