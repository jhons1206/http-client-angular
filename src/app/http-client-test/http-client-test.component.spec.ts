import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestComponent } from './http-client-test.component';

describe('HttpClientTestComponent', () => {
  let component: HttpClientTestComponent;
  let fixture: ComponentFixture<HttpClientTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpClientTestComponent]
    });
    fixture = TestBed.createComponent(HttpClientTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
