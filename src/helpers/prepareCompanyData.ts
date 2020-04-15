import moment from 'moment';

import getCustomFields from './getCustomFields';
import ICompany from '../models/Company';

const prepareData = async (company: ICompany) => {
    const customFields = await getCustomFields();
    const formattedData: object[] = [];
    const fields = [
        'cvr',
        'name',
        'postal_code_and_city',
        'address',
        'phone',
        'start_date',
        'employees',
        'industry_code',
        'industry_description',
        'сompany_description',
        'status',
        'advertising_protection',
        'commune',
    ];
    const values: object[] = [];
    

    if (customFields !== null) {
        fields.forEach(function(field) {
            values.push({ field: field, value: company[field] });
        });
    }

    let address: string = `${values[3]['value']}, ${values[2]['value']}`;

    enum businessType {
        //'ApS'
        'Anpartsselskab' = 'ApS',
        'ApS' = 'ApS',
        
        //'A/S'
        'Aktieselskab' = 'A/S',
        'A/S' = 'A/S',

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
        'Anden udenlandsk virksomhed' = 'Anden udenlandsk virksomhed',
    }

    const businessform = businessType[values[9]['value']];

    formattedData.push(
        {
            //cvr
            name: customFields[0].name,
            key: customFields[0].key,
            value: values[0]['value'],
        },
        {
            //name
            name: customFields[1].name,
            key: customFields[1].key,
            value: values[1]['value'],
        },
        {
            //address
            name: customFields[2].name,
            key: customFields[2].key,
            value: address,
        },
        {
            //phone
            name: customFields[3].name,
            key: customFields[3].key,
            value: values[4]['value'],
        },
        { 
            //startdate
            name: customFields[4].name, 
            key: customFields[4].key, 
            value: values[5]['value'] 
        },
        {
            //employees
            name: customFields[5].name,
            key: customFields[5].key,
            value: values[6]['value'],
        },
        {
            //industrycode
            name: customFields[6].name,
            key: customFields[6].key,
            value: values[7]['value'],
        },
        {
            //industrydesc
            name: customFields[7].name,
            key: customFields[7].key,
            value: values[8]['value'],
        },
        {
            //companydesc
            name: customFields[8].name,
            key: customFields[8].key,
            value: businessform,
        },
        {
            //status
            name: customFields[9].name,
            key: customFields[9].key,
            value: values[10]['value'],
        },
        {
            //ad_protection
            name: customFields[10].name,
            key: customFields[10].key,
            value: values[11]['value'],
        },
        {
            //commune
            name: customFields[11].name,
            key: customFields[11].key,
            value: values[12]['value'],
        },
    );

    return formattedData;
};

export default prepareData;
