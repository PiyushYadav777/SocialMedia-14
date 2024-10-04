import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFriendsListComponent } from './all-friends-list.component';

describe('AllFriendsListComponent', () => {
  let component: AllFriendsListComponent;
  let fixture: ComponentFixture<AllFriendsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFriendsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
