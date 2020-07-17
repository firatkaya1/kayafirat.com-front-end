import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorationerrorComponent } from './authorationerror.component';

describe('AuthorationerrorComponent', () => {
  let component: AuthorationerrorComponent;
  let fixture: ComponentFixture<AuthorationerrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorationerrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorationerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
