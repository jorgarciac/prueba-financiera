import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  pagedProducts: Product[] = [];
  activeMenuId: string | null = null;

  searchText = '';
  itemsPerPage = 5;
  currentPage = 1;
  totalPages = 1;

  showModal = false;
  idToDelete: string | null = null;
  productToDeleteTitle = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    });
  }

  applyFilters(): void {
    const text = this.searchText.toLowerCase();
    this.filteredProducts = this.products.filter(p =>
      p.id.toLowerCase().includes(text) ||
      p.name.toLowerCase().includes(text) ||
      p.description.toLowerCase().includes(text)
    );
    this.currentPage = 1;
    this.updatePagedProducts();
  }

  updatePagedProducts(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedProducts = this.filteredProducts.slice(start, end);
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  onSearch(): void {
    this.applyFilters();
  }

  onPageChange(delta: number): void {
    this.currentPage += delta;
    if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    this.updatePagedProducts();
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.updatePagedProducts();
  }

  openModal(id: string, title: string): void {
    this.idToDelete = id;
    this.productToDeleteTitle = title;
    this.showModal = true;
  }

  deleteConfirmed(): void {
    if (this.idToDelete) {
      this.productService.deleteProduct(this.idToDelete).subscribe({
        next: () => {
          alert('Producto eliminado');
          this.loadProducts();
          this.showModal = false;
        },
        error: (err) => {
          console.error('Error deleting product', err);
          alert('Error al eliminar producto');
          this.showModal = false;
        }
      });
    }
  }

  editProduct(id: string): void {
    console.log('Navegando a editar:', id); // Debug
    this.router.navigate(['/edit', id]);
  }

  addProduct(): void {
    this.router.navigate(['/add']);
  }



  toggleMenu(id: string): void {
    this.activeMenuId = this.activeMenuId === id ? null : id;
  }

}
