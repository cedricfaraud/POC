import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YcywComponent } from './ycyw.component';

describe('YcywComponent', () => {
  let component: YcywComponent;
  let fixture: ComponentFixture<YcywComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YcywComponent]
    });
    fixture = TestBed.createComponent(YcywComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
