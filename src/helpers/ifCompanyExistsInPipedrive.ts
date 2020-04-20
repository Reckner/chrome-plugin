import _ from 'lodash';

import getCompanyByCVRPipedrive from '../api/get-company-by-cvr-pipedrive';

const ifCompanyExistsInPipedrive = async (name: string, cvr: number): Promise<boolean> => {
    const companies = await getCompanyByCVRPipedrive(cvr);
    let result = false;

    if (!_.isEmpty(companies)) {
        companies.forEach((company) => {

            const foundCVR = company.item.custom_fields.find((element) => {
                if(element.length === 8 && !isNaN(element)){
                  return element;
                } else {
                    return null;
                }
              });
            if (parseInt(foundCVR, 10) === cvr) {
                result = true;
            }
        });
    }

    return result;
};

export default ifCompanyExistsInPipedrive;
