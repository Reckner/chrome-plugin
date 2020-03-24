import _ from 'lodash';

import getCompanyByNamePipedrive from '../api/get-company-by-name-pipedrive';

const ifCompanyExistsInPipedrive = async (name: string): Promise<boolean> => {
    const companies = await getCompanyByNamePipedrive(name);
    let result = false;

    if (!_.isEmpty(companies)) {
        companies.forEach(company => {
            if (company.name.trim() === name.trim()) {
                result = true;
            }
        });
    }

    return result;
};

export default ifCompanyExistsInPipedrive;
