import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getProducts', () => {
    service.getProducts().subscribe();
    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should call addProduct', () => {
    const data = { id: 'a' };
    service.addProduct(data as any).subscribe();
    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should call updateProduct', () => {
    const data = { name: 'x' };
    service.updateProduct('a', data).subscribe();
    const req = httpMock.expectOne('http://localhost:3002/bp/products/a');
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should call deleteProduct', () => {
    service.deleteProduct('a').subscribe();
    const req = httpMock.expectOne('http://localhost:3002/bp/products/a');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should call getProductVerification', () => {
    service.getProductVerification('a').subscribe();
    const req = httpMock.expectOne('http://localhost:3002/bp/products/verification/a');
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });
});
