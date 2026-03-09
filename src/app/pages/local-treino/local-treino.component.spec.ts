import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalTreinoComponent } from './local-treino.component';

describe('LocalTreinoComponent', () => {
  let component: LocalTreinoComponent;
  let fixture: ComponentFixture<LocalTreinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalTreinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalTreinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
