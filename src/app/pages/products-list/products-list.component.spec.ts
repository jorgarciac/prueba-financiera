import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let mockService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);

    await TestBed.configureTestingModule({
      declarations: [ ProductsListComponent ],
      imports: [ RouterTestingModule, FormsModule, SharedModule  ],
      providers: [
        { provide: ProductService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    const mockData = { data: [{ id: '1', name: 'Test', description: 'Desc', logo: '', date_release: '', date_revision: '' }] };
    mockService.getProducts.and.returnValue(of(mockData));
    
    component.ngOnInit();

    expect(mockService.getProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(1);
  });

  it('should apply filters', () => {
    component.products = [
      { id: '1', name: 'Test1', description: 'Desc1', logo: '', date_release: '', date_revision: '' },
      { id: '2', name: 'Test2', description: 'Desc2', logo: '', date_release: '', date_revision: '' }
    ];
    component.searchText = 'Test1';
    component.applyFilters();

    expect(component.filteredProducts.length).toBe(1);
  });

  it('should call deleteProduct on deleteConfirmed', () => {
    mockService.deleteProduct.and.returnValue(of({ message: 'success' }));
    component.idToDelete = '1';
    component.loadProducts = jasmine.createSpy();

    component.deleteConfirmed();

    expect(mockService.deleteProduct).toHaveBeenCalledWith('1');
    expect(component.loadProducts).toHaveBeenCalled();
  });

  it('should change items per page and update paged products', () => {
    component.products = [
      { id: '1', name: 'A', description: 'A', logo: '', date_release: '', date_revision: '' },
      { id: '2', name: 'B', description: 'B', logo: '', date_release: '', date_revision: '' },
      { id: '3', name: 'C', description: 'C', logo: '', date_release: '', date_revision: '' }
    ];
    component.filteredProducts = component.products;
    component.itemsPerPage = 2;
    component.updatePagedProducts();
    expect(component.pagedProducts.length).toBe(2);
  });

  it('should toggle menu open and close', () => {
    component.toggleMenu('1');
    expect(component.activeMenuId).toBe('1');
    component.toggleMenu('1');
    expect(component.activeMenuId).toBeNull();
  });

  it('should handle delete with error', () => {
    mockService.deleteProduct.and.returnValue(of({}));
    component.idToDelete = '1';
    component.loadProducts = jasmine.createSpy();
    component.deleteConfirmed();
    expect(mockService.deleteProduct).toHaveBeenCalledWith('1');
  });

  it('should change page correctly', () => {
    component.products = Array(10).fill({ id: '1', name: 'a', description: 'b', logo: '', date_release: '', date_revision: '' });
    component.filteredProducts = component.products;
    component.itemsPerPage = 5;
    component.currentPage = 1;
    component.updatePagedProducts();
    component.onPageChange(1);
    expect(component.currentPage).toBe(2);
  });

  it('should not exceed totalPages on next page', () => {
    component.currentPage = 1;
    component.totalPages = 1;
    component.onPageChange(1);
    expect(component.currentPage).toBe(1);
  });

  it('should not go below page 1 on previous page', () => {
    component.currentPage = 1;
    component.onPageChange(-1);
    expect(component.currentPage).toBe(1);
  });
});
