import axios from 'axios';
import prepareData from '../helpers/prepareCompanyData';
import { getApiToken } from '../helpers/getApiToken';

const createCompanyInPipedrive = async (cvr: number) => {
    const data = await prepareData(cvr);

    interface IValues {
        [key: string]: any;
    }
    const values: IValues = {};

    data.forEach((_, index) => {
        values[data[index]['key']] = data[index]['value'];
    });

    await axios.post(
        `https://app.pipedrive.com/v1/organizations?api_token=${getApiToken()}`,
        values,
    );
};

export default createCompanyInPipedrive;
