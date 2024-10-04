import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsSuggestionsComponent } from './friends-suggestions.component';

describe('FriendsSuggestionsComponent', () => {
  let component: FriendsSuggestionsComponent;
  let fixture: ComponentFixture<FriendsSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsSuggestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
