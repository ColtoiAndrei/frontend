export interface SortOptions {
    sortType: SortType;
    sortOrder: SortOrder;
}

export enum SortType {
    CompanyName = 'companyName',
    ContactName = 'contactName',
    YearsInBusiness = 'yearsInBusiness'
}

export enum SortOrder {
    Ascending = 'asc',
    Descending = 'desc'
}