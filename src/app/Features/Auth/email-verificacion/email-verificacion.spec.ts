import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificacion } from './email-verificacion';

describe('EmailVerificacion', () => {
  let component: EmailVerificacion;
  let fixture: ComponentFixture<EmailVerificacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailVerificacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailVerificacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
