import getCompanyData from '../api/get-company-data';
import getCustomFields from './getCustomFields';
import moment from 'moment';

const prepareData = async (cvr:number) => {
    const data = await getCompanyData(cvr);
    const customFields = await getCustomFields();
    const formattedData : object[] = [];
    const fields = ['vat', 'name', 'address', 'zipcode', 'city', 'cityname', 'phone', 'startdate', 'employees', 'industrycode', 'industrydesc', 'companydesc'];
    const values: object[] = []; 

    if(customFields !== null){
        fields.forEach(function (field) {
            values.push({field: field, value: data.data[field]})
        });
    }

    let address = values[2]['value'];
    if(values[5]['value'] !== null){
        address = address + ', ' + values[5]['value'];
    }
    address = address + ', ' + values[4]['value'] + ', ' + values[3]['value'];
    const startdate = values[7]['value'].split(' - ')[1] + '-' + values[7]['value'].split(' - ')[0].split('/')[1] + '-' + values[7]['value'].split(' - ')[0].split('/')[0];

    const date = moment(startdate).format('YYYY-MM-DD');

    enum businessType {
        //'A/S'
        'Aktieselskab' = 'A/S',
        'A/S' = 'A/S',

        //'ApS'
        'Anpartsselskab' = 'ApS',
        'ApS' = 'ApS',

        //'IVS'
        'Iværksætterselskab' = 'IVS',
        'IVS' = 'IVS',

        //'K/S'
        'Kommanditselskab' = 'K/S',
        'K/S' = 'K/S',

        //'P/S'
        'Partnerselskab' = 'P/S',
        'Kommanditaktieselskab/Partnerselskab' = 'P/S',
        'P/S' = 'P/S',

        //'Enkeltmandsvirksomhed'
        'Enkeltmandsvirksomhed' = 'Enkeltmandsvirksomhed',

        //'Øvrige virksomhedsformer'
        'Øvrige virksomhedsformer' = 'Øvrige virksomhedsformer',

        //'Personlig Mindre Virksomhed'
        'Personlig Mindre Virksomhed' = 'Personlig Mindre Virksomhed',
        'Personligt ejet Mindre Virksomhed' = 'Personlig Mindre Virksomhed',

        //'Interessentskab'
        'Interessentskab' = 'Interessentskab',
        'I/S' = 'Interessentskab',

        //'Forening'
        'Forening' = 'Forening',

        //'Anden udenlandsk virksomhed'
        'Anden udenlandsk virksomhed' = 'Anden udenlandsk virksomhed'
    }
    
    const businessform = businessType[values[11]['value']];
    console.log(businessform);

   formattedData.push(
       {name: customFields[0].name, key: customFields[0].key, value: values[0]['value']},
       {name: customFields[1].name, key: customFields[1].key, value: values[1]['value']},
       {name: customFields[2].name, key: customFields[2].key, value: address},
       {name: customFields[3].name, key: customFields[3].key, value: values[6]['value']},
       {name: customFields[4].name, key: customFields[4].key, value: date},
       {name: customFields[5].name, key: customFields[5].key, value: values[8]['value']},
       {name: customFields[6].name, key: customFields[6].key, value: values[9]['value']},
       {name: customFields[7].name, key: customFields[7].key, value: values[10]['value']},
       {name: customFields[8].name, key: customFields[8].key, value: businessform}
       );
    
    return formattedData;
}

export default prepareData;