import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightContainerComponent } from './highlight-container.component';

describe('HighlightContainerComponent', () => {
  let component: HighlightContainerComponent;
  let fixture: ComponentFixture<HighlightContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
