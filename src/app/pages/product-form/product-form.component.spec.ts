import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { throwError } from 'rxjs';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let mockService: jasmine.SpyObj<ProductService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockRoute: any;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ProductService', ['getProducts', 'getProductVerification', 'addProduct', 'updateProduct']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRoute = {
      snapshot: { paramMap: { get: () => null } }
    };

    await TestBed.configureTestingModule({
      declarations: [ ProductFormComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: ProductService, useValue: mockService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify ID', () => {
    mockService.getProductVerification.and.returnValue(of(false));
    component.product.id = 'abc';
    component.autoVerifyId();
    expect(mockService.getProductVerification).toHaveBeenCalledWith('abc');
  });

  it('should add product if ID available', () => {
    mockService.addProduct.and.returnValue(of({}));
    component.idExists = false;
    component.product = {
      id: 'abc',
      name: 'Name',
      description: 'Desc',
      logo: '',
      date_release: '',
      date_revision: ''
    };
    component.onSubmit();
    expect(mockService.addProduct).toHaveBeenCalled();
  });

  it('should update product in edit mode', () => {
    mockService.updateProduct.and.returnValue(of({}));
    component.isEditMode = true;
    component.product.id = 'abc';
    component.product.name = 'Name';
    component.product.description = 'Desc';
    component.product.logo = '';
    component.product.date_release = '';
    component.product.date_revision = '';
    component.onSubmit();
    expect(mockService.updateProduct).toHaveBeenCalledWith('abc', component.product);
  });

  it('should not submit if ID exists in create mode', () => {
    component.isEditMode = false;
    component.idExists = true;
    component.product = { id: 'abc', name: 'Name', description: 'Desc', logo: '', date_release: '', date_revision: '' };
    component.onSubmit();
    expect(mockService.addProduct).not.toHaveBeenCalled();
  });

  it('should call verifyId automatically if ID length >= 3', () => {
    mockService.getProductVerification.and.returnValue(of(false));
    component.isEditMode = false;
    component.product.id = 'abc';
    component.autoVerifyId();
    expect(mockService.getProductVerification).toHaveBeenCalledWith('abc');
  });

  it('should skip verifyId in edit mode', () => {
    component.isEditMode = true;
    component.product.id = 'abc';
    component.autoVerifyId();
    expect(component.idExists).toBeNull();
  });

  it('should reset the form', () => {
    component.product = {
      id: 'abc',
      name: 'test',
      description: 'desc',
      logo: 'logo',
      date_release: '2025-01-01',
      date_revision: '2026-01-01'
    };
    component.resetForm();
    expect(component.product.id).toBe('');
  });

  it('should not add product if ID exists in create mode', () => {
    component.isEditMode = false;
    component.idExists = true; // simula ID ya existente
    component.product = {
      id: 'abc',
      name: 'name',
      description: 'desc',
      logo: '',
      date_release: '',
      date_revision: ''
    };
    component.onSubmit();
    expect(mockService.addProduct).not.toHaveBeenCalled();
  });

  it('should handle error in addProduct', () => {
    mockService.addProduct.and.returnValue(throwError(() => new Error('fail')));
    component.isEditMode = false;
    component.idExists = false;
    component.product = {
      id: 'abc',
      name: 'name',
      description: 'desc',
      logo: '',
      date_release: '',
      date_revision: ''
    };
    component.onSubmit();
    expect(mockService.addProduct).toHaveBeenCalled();
  });

  it('should handle error in updateProduct', () => {
    mockService.updateProduct.and.returnValue(throwError(() => new Error('fail')));
    component.isEditMode = true;
    component.product = {
      id: 'abc',
      name: 'name',
      description: 'desc',
      logo: '',
      date_release: '',
      date_revision: ''
    };
    component.onSubmit();
    expect(mockService.updateProduct).toHaveBeenCalled();
  });

  

});
