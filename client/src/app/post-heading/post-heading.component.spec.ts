import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHeadingComponent } from './post-heading.component';

describe('PostHeadingComponent', () => {
  let component: PostHeadingComponent;
  let fixture: ComponentFixture<PostHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostHeadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
