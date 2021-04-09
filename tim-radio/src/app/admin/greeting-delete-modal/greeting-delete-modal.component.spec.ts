import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingDeleteModalComponent } from './greeting-delete-modal.component';

describe('GreetingDeleteModalComponent', () => {
  let component: GreetingDeleteModalComponent;
  let fixture: ComponentFixture<GreetingDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreetingDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetingDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
