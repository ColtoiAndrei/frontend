import { Component } from '@angular/core';
import { Company } from '../models/company.model';
import { MatTableDataSource } from '@angular/material/table';
import { UploadService } from '../services/upload.service';
import { SortOptions } from '../models/sort-options.model';
import { saveAs } from 'file-saver';
import { ProcessedFilesResponse } from '../models/processed-files-response.model';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.scss']
})
export class CompanyDataComponent {
  selectedFiles: File[] = [];
  companies: Company[] = [];
  dataSource = new MatTableDataSource<Company>();
  displayedColumns: string[] = ['companyName', 'yearsInBusiness', 'contactName', 'contactPhoneNumber', 'contactEmail'];
  errorMessage: string | null = null;
  loading = false;

  constructor(private uploadService: UploadService) { }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    this.errorMessage = null;
  }

  uploadFiles() {
    if (this.selectedFiles.length < 1 || this.selectedFiles.length > 5) {
      this.errorMessage = 'Please select at least one file to upload.';
      return;
    }

    this.loading = true;

    this.uploadService.uploadFiles(this.selectedFiles)
      .subscribe({
        next: (data: ProcessedFilesResponse) => {
          this.companies = data.companies;
          this.dataSource.data = this.companies;
          this.loading = false;
          if (data.invalidFiles.length > 0) {
            this.errorMessage = `There are invalid files that have not been uploaded: ${data.invalidFiles.join(', ')}`;
          }
        },
        error: () => {
          this.errorMessage = 'An error occurred while uploading files. Please try again.';
          this.loading = false;
        }
      });
  }

  onSortChanged(sortOptions: SortOptions) {
    if (this.dataSource.data.length == 0) {
      return;
    }

    this.loading = true;

    this.uploadService.sortData(sortOptions, this.dataSource.data)
      .subscribe({
        next: (sortedData: Company[]) => {
          this.dataSource.data = sortedData;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error sorting data:', error);
          this.loading = false;
        }
      });
  }

  exportToCsv() {
    if (this.dataSource.data.length == 0) {
      return;
    }
    const csvContent = this.convertToCsv(this.dataSource.data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'companies.csv');
  }

  private convertToCsv(data: Company[]): string {
    const headers = [
      'Company Name',
      'Years in Business',
      'Contact Name',
      'Contact Phone Number',
      'Contact Email'
    ];

    if (!data || data.length === 0) {
      return '';
    }

    const header = headers.join(',');
    const rows = data.map(company => Object.values(company).join(',')).join('\n');

    return `${header}\n${rows}`;
  }
}
