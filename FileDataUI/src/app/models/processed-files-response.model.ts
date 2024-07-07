import { Company } from './company.model';

export interface ProcessedFilesResponse {
    validFiles: string[];
    invalidFiles: string[];
    companies: Company[];
}