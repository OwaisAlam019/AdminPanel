import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingpanelComponent } from './clothingpanel.component';

describe('ClothingpanelComponent', () => {
  let component: ClothingpanelComponent;
  let fixture: ComponentFixture<ClothingpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothingpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
