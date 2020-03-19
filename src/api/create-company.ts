import axios from 'axios';

const token = '9352e66cf5185840cdd3dc97a1a06bf9efac2192';
const createCompanyInPipedrive = async ({
    name,
    cvr,
    address,
    postal_code_and_city,
}) => {
    await axios.post(
        `https://app.pipedrive.com/v1/organizations?api_token=${token}`,
        {
            name,
            address: address + postal_code_and_city,
            '462267c6cce70a0a4bd9f49c2fd88868da22409e': cvr,
        },
    );
};

export default createCompanyInPipedrive;
