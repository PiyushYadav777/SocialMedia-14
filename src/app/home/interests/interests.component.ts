import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { CategoryService } from 'src/app/Services/category.service';
import { HelperService } from 'src/app/Services/helper.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {
  categories: any[] = [];
  selectedCategory: number | null = null;
  posts: any[] = [];
  loading: boolean = false;

  constructor(private apiService: ApiService, 
    private helperService: HelperService,
    private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.apiService.getData('view_all_categories').subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.categories = response.data; 
        } else {
          this.helperService.error(response.msg);
        }
      },
      error: () => this.helperService.error('Error fetching categories.')
    });
  }

  onCategorySelect(categoryId: number): void {
    this.categoryService.selectCategory(categoryId); 
  }
}
