import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  selectedCategory: number | null = null; // Store selected category ID

  onCategorySelected(categoryId: number): void {
    this.selectedCategory = categoryId; // Update the selected category
  }

}
