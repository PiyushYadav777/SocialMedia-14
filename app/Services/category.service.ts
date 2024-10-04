// app/services/category.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private selectedCategorySource = new BehaviorSubject<number | null>(null);
  selectedCategory$ = this.selectedCategorySource.asObservable();

  selectCategory(categoryId: number | null): void {
    this.selectedCategorySource.next(categoryId);
  }
}
