import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompilationAddComponent } from './compilation-add.component';

describe('CompilationAddComponent', () => {
  let component: CompilationAddComponent;
  let fixture: ComponentFixture<CompilationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompilationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompilationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
