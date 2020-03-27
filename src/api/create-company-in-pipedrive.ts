import axios from 'axios';

import { getApiToken } from '../helpers/getApiToken';
import prepareData from '../helpers/prepareCompanyData';

const createCompanyInPipedrive = async (cvr: number) => {
    const data = await prepareData(cvr);

    interface IValues {
        [key: string]: any;
    }
    const values: IValues = {};

    data.forEach((_, index) => {
        values[data[index]['key']] = data[index]['value'];
    });

    return await axios.post(
        `https://app.pipedrive.com/v1/organizations?api_token=${getApiToken()}`,
        values,
    );
};

export default createCompanyInPipedrive;
