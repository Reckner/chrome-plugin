import axios from 'axios';
import prepareData from '../helpers/prepareCompanyData';

const token = '9352e66cf5185840cdd3dc97a1a06bf9efac2192';
const createCompanyInPipedrive = async (cvr: number) => {

    const data = await prepareData(cvr);

    interface d {
        [key: string] : any
    }
    const values : d = {};

    data.forEach(( _, index) =>{
        values[data[index]['key']] = data[index]['value'];
    })
    console.log(values);

    await axios.post(
        `https://app.pipedrive.com/v1/organizations?api_token=${token}`, values
    );
};

export default createCompanyInPipedrive;
