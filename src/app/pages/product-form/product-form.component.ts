import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: ''
  };
  idExists: boolean | null = null;
  isEditMode = false;
  showSuccessModal = false;
  successMessage = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadProduct(id);
    }
  }

  loadProduct(id: string): void {
  this.productService.getProducts().subscribe({
    next: (res) => {
      const found = res.data.find(p => p.id === id);
      if (found) {
        this.product = found;
      } else {
        alert('Producto no encontrado');
        this.router.navigate(['/']);
      }
    },
    error: (err) => {
      console.error('Error loading product', err);
      alert('Error cargando producto');
      this.router.navigate(['/']);
    }
  });
}

  verifyId(): void {
    if (this.product.id.length >= 3) {
      this.productService.getProductVerification(this.product.id).subscribe({
        next: (exists) => this.idExists = exists,
        error: (err) => {
          console.error('Error verifying ID', err);
          alert('Error al verificar el ID');
        }
      });
    } else {
      this.idExists = null;
    }
  }

  autoVerifyId(): void {
    if (this.isEditMode) {
      this.idExists = null; 
      return;
    }

    if (this.product.id.length >= 3) {
      this.productService.getProductVerification(this.product.id).subscribe({
        next: (exists) => this.idExists = exists,
        error: (err) => {
          console.error('Error verifying ID', err);
          this.idExists = null;
        }
      });
    } else {
      this.idExists = null;
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.productService.updateProduct(this.product.id, this.product).subscribe({
        next: () => {
          alert('Producto actualizado con éxito');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating product', err);
          alert('Error al actualizar producto');
        }
      });
    } else {
      if (this.idExists === false) {
        this.productService.addProduct(this.product).subscribe({
          next: () => {
            alert('Producto agregado con éxito');
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Error adding product', err);
            alert('Error al agregar producto');
          }
        });
      } else {
        alert('Debe verificar que el ID esté disponible antes de guardar');
      }
    }
  }


  resetForm(): void {
    this.product = {
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: ''
    };
    this.idExists = null;
  }
}
