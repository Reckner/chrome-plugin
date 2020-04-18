export default interface ICompany{
    cvr: number;
    name: string;
    postal_code_and_city: string;
    address: string;
    phone: string | null;
    start_date: Date;
    employees: string | null;
    industry_code: string | null;
    industry_description: string | null;
    сompany_description: string;
    status: string | null;
    advertising_protection: string;
    commune: string | null;
    companyExist?: boolean;
}