import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStoryViewersComponent } from './view-story-viewers.component';

describe('ViewStoryViewersComponent', () => {
  let component: ViewStoryViewersComponent;
  let fixture: ComponentFixture<ViewStoryViewersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStoryViewersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStoryViewersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
