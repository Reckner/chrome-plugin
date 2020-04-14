export interface ICompanyContainer {
    address?: string;
    advertising_protection?: string;
    companies?: ICompanyContainer[];
    companyExist?: boolean;
    cvr: number;
    name: string;
    postal_code_and_city?: string;
    setCompanies?: any;
    start_date?: Date;
    status?: string;
    type?: string;
    setAlertType?: any;
    phone?: number;
    employees?: string;
    commune?: string;
    industry_code?: string;
    industry_description?: string;
    сompany_description?: string;
    setAlertMessage?: any;
    isVisibleConfirmation?: boolean;
    setVisibilityConfirmation?: any;
}
