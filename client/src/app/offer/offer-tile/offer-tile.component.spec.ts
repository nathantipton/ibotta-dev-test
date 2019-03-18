import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTileComponent } from './offer-tile.component';

describe('OfferTileComponent', () => {
  let component: OfferTileComponent;
  let fixture: ComponentFixture<OfferTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
