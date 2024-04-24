import { TestBed } from '@angular/core/testing';

import { JogadoresService } from './jogadores.service';

describe('JogadoresService', () => {
  let service: JogadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JogadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
