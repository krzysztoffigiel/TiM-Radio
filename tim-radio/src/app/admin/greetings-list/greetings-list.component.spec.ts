import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingsListComponent } from './greetings-list.component';

describe('GreetingsListComponent', () => {
  let component: GreetingsListComponent;
  let fixture: ComponentFixture<GreetingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreetingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
