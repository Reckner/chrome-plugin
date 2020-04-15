import _ from 'lodash';

import getCompanyByNamePipedrive from '../api/get-company-by-name-pipedrive';

const ifCompanyExistsInPipedrive = async (name: string, cvr: number): Promise<boolean> => {
    const companies = await getCompanyByNamePipedrive(name);
    let result = false;

    if (!_.isEmpty(companies)) {
        companies.forEach((company) => {
            if (company.item.name.trim() === name.trim() && parseInt(company.item.custom_fields[0]) === cvr) {
                result = true;
            }
        });
    }

    return result;
};

export default ifCompanyExistsInPipedrive;
