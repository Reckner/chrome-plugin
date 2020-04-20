import _ from 'lodash';

import getCompanyByCVRPipedrive from '../api/get-company-by-cvr-pipedrive';

const ifCompanyExistsInPipedrive = async (name: string, cvr: number): Promise<boolean> => {
    const companies = await getCompanyByCVRPipedrive(cvr);
    let result = false;

    if (!_.isEmpty(companies)) {
        companies.forEach((company) => {
            if (parseInt(company.item.custom_fields[0], 10) === cvr) {
                result = true;
            }
        });
    }

    return result;
};

export default ifCompanyExistsInPipedrive;
