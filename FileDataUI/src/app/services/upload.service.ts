import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Company } from '../models/company.model';
import { SortOptions } from '../models/sort-options.model';
import { ProcessedFilesResponse } from '../models/processed-files-response.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    uploadFiles(files: File[]): Observable<ProcessedFilesResponse> {
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('files', file);
        });
        return this.http.post<ProcessedFilesResponse>(`${this.baseUrl}/UploadFiles`, formData)
            .pipe(
                catchError(error => {
                    console.error('Error uploading files:', error);
                    throw error;
                })
            );
    }

    sortData(sortOptions: SortOptions, companies: Company[]): Observable<Company[]> {
        return this.http.post<Company[]>(`${this.baseUrl}/SortData`, { sortOptions, companies })
            .pipe(
                catchError(error => {
                    console.error('Error sorting data:', error);
                    throw error;
                })
            );
    }
}
