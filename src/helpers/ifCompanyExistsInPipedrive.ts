import _ from 'lodash';
import getCompanyByNamePipedrive from '../api/get-company-by-name-pipedrive';

const ifCompanyExistsInPipedrive = async (name: string): Promise<boolean> => {
    return !_.isEmpty(await getCompanyByNamePipedrive(name)) ? true : false;
};

export default ifCompanyExistsInPipedrive;
