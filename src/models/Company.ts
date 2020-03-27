export interface ICompanyContainer {
    address?: string;
    advertising_protection?: string;
    companies?: ICompanyContainer[];
    companyExist?: boolean;
    cvr: number;
    name: string;
    postal_code_and_city?: string;
    setCompanies?: any;
    start_date?: string;
    status?: string;
    type?: string;
    setAlertType?: any;
    setAllertMessage?: any;
}
