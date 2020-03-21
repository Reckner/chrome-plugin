import axios from 'axios';

const getCompanyData = async (cvr:number) => {
    return await axios.get(`https://cvrapi.dk/api?search=${cvr}&country=dk`);
};

export default getCompanyData;
