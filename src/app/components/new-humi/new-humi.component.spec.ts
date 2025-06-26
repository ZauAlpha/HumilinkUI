import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHumiComponent } from './new-humi.component';

describe('NewHumiComponent', () => {
  let component: NewHumiComponent;
  let fixture: ComponentFixture<NewHumiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHumiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewHumiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
