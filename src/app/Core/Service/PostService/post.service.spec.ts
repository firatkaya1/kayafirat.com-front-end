import { PostService } from './post.service';
import { TestBed } from '@angular/core/testing';


describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
