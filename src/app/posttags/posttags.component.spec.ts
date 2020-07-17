import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosttagsComponent } from './posttags.component';

describe('PosttagsComponent', () => {
  let component: PosttagsComponent;
  let fixture: ComponentFixture<PosttagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosttagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosttagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
