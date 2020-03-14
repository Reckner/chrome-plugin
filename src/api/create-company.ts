import axios from 'axios';

const token = '9352e66cf5185840cdd3dc97a1a06bf9efac2192';
const createCompanyInPipedrive = async ({ name }) => {
    await axios.post(
        `https://app.pipedrive.com/v1/organizations?api_token=${token}`,
        {
            name,
        },
    );
};

export default createCompanyInPipedrive;
