import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WachedListComponent } from './wached-list.component';

describe('WachedListComponent', () => {
  let component: WachedListComponent;
  let fixture: ComponentFixture<WachedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WachedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WachedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
