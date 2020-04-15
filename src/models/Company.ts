export default interface ICompany{
    cvr: number;
    name: string;
    postal_code_and_city: string;
    address: string;
    phone: string;
    start_date: Date;
    employees: string;
    industry_code: string;
    industry_description: string;
    сompany_description: string;
    status: string | null;
    advertising_protection: string;
    commune: string | null;
    companyExist?: boolean;
}