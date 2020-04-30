import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompilationCardComponent } from './compilation-card.component';

describe('CompilationCardComponent', () => {
  let component: CompilationCardComponent;
  let fixture: ComponentFixture<CompilationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompilationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompilationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
