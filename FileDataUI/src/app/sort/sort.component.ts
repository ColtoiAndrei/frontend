import { Component, EventEmitter, Output } from '@angular/core';
import { SortOrder, SortOptions, SortType } from 'src/app/models/sort-options.model';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {
  @Output() sortChanged = new EventEmitter<SortOptions>();

  sortTypes = [
    { value: SortType.CompanyName, viewValue: 'Company Name' },
    { value: SortType.ContactName, viewValue: 'Contact Name' },
    { value: SortType.YearsInBusiness, viewValue: 'Years in Business' }
  ];

  selectedSortType: SortType = SortType.CompanyName;
  sortOrder: SortOrder = SortOrder.Ascending;

  onSortChange() {
    this.emitSortChange();
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
    this.emitSortChange();
  }

  emitSortChange() {
    const sortOptions: SortOptions = {
      sortType: this.selectedSortType,
      sortOrder: this.sortOrder
    };
    this.sortChanged.emit(sortOptions);
  }
}
