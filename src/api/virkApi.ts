import axios from 'axios';
import { VirkResponse, CompanyData, Phone } from '../models/VirkResponse';
import ICompany from '../models/Company';

const username = 'ehsj.dk_CVR_I_SKYEN';
const password = 'c5003ca2-efaf-4312-b914-17cdeb4ea6ea';

const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

interface virkApiConfig {
    url?: string;
}

const proxy = 'http://degit.org:8099/';

export async function searchByCompanyName(
    query: string,
    config: virkApiConfig = {},
): Promise<ICompany[]> {
    const response: VirkResponse = await axios
        .post(
            config.url ||
                `${proxy}http://distribution.virk.dk/cvr-permanent/virksomhed/_search`,
            {
                _source: [
                    'Vrvirksomhed.virksomhedMetadata.nyesteNavn.navn',
                    'Vrvirksomhed.cvrNummer',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.husnummerFra',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.vejnavn',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.etage',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.sidedoer',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.postnummer',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.postdistrikt',
                    'Vrvirksomhed.telefonNummer',
                    'Vrvirksomhed.virksomhedMetadata.stiftelsesDato',
                    'Vrvirksomhed.virksomhedMetadata.nyesteVirksomhedsform.langBeskrivelse',
                    'Vrvirksomhed.virksomhedMetadata.nyesteHovedbranche.branchekode',
                    'Vrvirksomhed.virksomhedMetadata.nyesteHovedbranche.branchetekst',
                    'Vrvirksomhed.virksomhedMetadata.nyesteVirksomhedsform.kortBeskrivelse',
                    'Vrvirksomhed.reklamebeskyttet',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.bynavn',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.kommune.kommuneNavn',
                    'Vrvirksomhed.virksomhedMetadata.nyesteAarsbeskaeftigelse.intervalKodeAntalAnsatte',
                    'Vrvirksomhed.virksomhedMetadata.sammensatStatus',
                ],
                query: {
                    match: {
                        'Vrvirksomhed.virksomhedMetadata.nyesteNavn.navn': {
                            query,
                            operator: 'and',
                        },
                    },
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${token}`,
                },
            },
        )
        .then((res) => res.data)
        .catch((err) => {
            throw new Error(err);
        });
    const companies: CompanyData[] = [];
    for (const doc of response.hits.hits) {
        companies.push(doc._source.Vrvirksomhed);
    }

    const companiesFormated: ICompany[] = [];
    for (const company of companies) {
        console.log(company);
        console.log(company.virksomhedMetadata.nyesteHovedbranche.branchekode);
        console.log(company.virksomhedMetadata.nyesteHovedbranche.branchetekst);


        companiesFormated.push({
            cvr: company.cvrNummer,
            name: company.virksomhedMetadata.nyesteNavn.navn.replace(
                /\s\s+/g,
                ' ',
            ),
            postal_code_and_city: `${company.virksomhedMetadata.nyesteBeliggenhedsadresse.postdistrikt}, ${company.virksomhedMetadata.nyesteBeliggenhedsadresse.postnummer}`,
            address: createAddress(company),
            phone: preparePhone(company.telefonNummer),
            start_date: company.virksomhedMetadata.stiftelsesDato,
            employees: createEmployees(company.virksomhedMetadata?.nyesteAarsbeskaeftigelse?.intervalKodeAntalAnsatte),
            industry_code: company.virksomhedMetadata?.nyesteHovedbranche?.branchekode ? company.virksomhedMetadata.nyesteHovedbranche.branchekode : 'Ingen data',
            industry_description: company.virksomhedMetadata?.nyesteHovedbranche?.branchetekst ? company.virksomhedMetadata.nyesteHovedbranche.branchetekst : 'Ingen data',
            сompany_description: company.virksomhedMetadata.nyesteVirksomhedsform.langBeskrivelse,
            status: capitalizeFirstLetter(company.virksomhedMetadata.sammensatStatus),
            advertising_protection: prepareAdStatus(company.reklamebeskyttet),
            commune: capitalizeFirstLetter(company.virksomhedMetadata.nyesteBeliggenhedsadresse.kommune.kommuneNavn),
        });
        console.log(companiesFormated);
    }

    return companiesFormated;
}

function preparePhone(phones: Phone[]){
    let number = 'Ingen data';

    if(phones.length !== 0){
        for (const obj of phones) {
            if (!obj.periode.gyldigTil){
                number = obj.kontaktoplysning;
            }
        }
    }
    return number;
}

function prepareAdStatus(input: boolean){
    if(input){
        return 'Ja';
    } else {
        return 'Nej';
    }
}

function capitalizeFirstLetter(text: string | null){
    if(text){
            text = text.toLowerCase();
        let textParts = text.split('-');

        if(textParts[1]){
            return textParts[0][0].toUpperCase() + textParts[0].slice(1) + '-' + textParts[1][0].toUpperCase() + textParts[1].slice(1);
        } else {
            return textParts[0][0].toUpperCase() + textParts[0].slice(1);
        }
    } else {
        return null;
    } 
    
}

function createEmployees(input: any){
    if(input){
        const start = input.split('_')[1];
        const end = input.split('_')[2];
    
        if(start === '0' && end === '0'){
            return '0';
        } else {
          return `${start}-${end}`;
        }
    } else {
        return 'Ingen data';
    }
}

function createAddress(company: CompanyData) {
    const streetName =
        company.virksomhedMetadata.nyesteBeliggenhedsadresse.vejnavn;
    const houseNumber =
        company.virksomhedMetadata.nyesteBeliggenhedsadresse.husnummerFra;
    const cityname = company.virksomhedMetadata.nyesteBeliggenhedsadresse.bynavn;
    const floor = company.virksomhedMetadata.nyesteBeliggenhedsadresse.etage;
    const sideDoor =
        company.virksomhedMetadata.nyesteBeliggenhedsadresse.sidedoer;

    let address: string;

    address = `${streetName} ${houseNumber}`;
    if (floor) {
        address += `, ${floor}.`;
    }

    if (sideDoor) {
        if (floor === null) {
            address += ',';
        }
        address += ` ${sideDoor}.`;
    }

    if(cityname){
        address += `, ${cityname}`
    }

    console.log(address);
    return address;
}

export async function searchByCVR(cvr: number, config: virkApiConfig = {}): Promise<ICompany[]> {
    const response = await axios
        .post(
            config.url ||
                `${proxy}http://distribution.virk.dk/cvr-permanent/virksomhed/_search`,
            {
                _source: [
                    'Vrvirksomhed.virksomhedMetadata.nyesteNavn.navn',
                    'Vrvirksomhed.cvrNummer',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.husnummerFra',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.vejnavn',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.etage',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.sidedoer',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.postnummer',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.postdistrikt',
                    'Vrvirksomhed.telefonNummer',
                    'Vrvirksomhed.virksomhedMetadata.stiftelsesDato',
                    'Vrvirksomhed.virksomhedMetadata.nyesteVirksomhedsform.langBeskrivelse',
                    'Vrvirksomhed.virksomhedMetadata.nyesteHovedbranche.branchekode',
                    'Vrvirksomhed.virksomhedMetadata.nyesteHovedbranche.branchetekst',
                    'Vrvirksomhed.virksomhedMetadata.nyesteVirksomhedsform.kortBeskrivelse',
                    'Vrvirksomhed.reklamebeskyttet',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.bynavn',
                    'Vrvirksomhed.virksomhedMetadata.nyesteBeliggenhedsadresse.kommune.kommuneNavn',
                    'Vrvirksomhed.virksomhedMetadata.nyesteAarsbeskaeftigelse.intervalKodeAntalAnsatte',
                    'Vrvirksomhed.virksomhedMetadata.sammensatStatus',
                ],
                query: {
                    term: {
                        'Vrvirksomhed.cvrNummer': cvr,
                    },
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${token}`,
                },
            },
        )
        .then((res) => res.data)
        .catch((err) => {
            throw new Error(err);
        });
    const companies: CompanyData[] = [];
    for (const doc of response.hits.hits) {
        companies.push(doc._source.Vrvirksomhed);
    }

    const companiesFormated: ICompany[] = [];
    for (const company of companies) {
        companiesFormated.push({
            cvr: company.cvrNummer,
            name: company.virksomhedMetadata.nyesteNavn.navn.replace(
                /\s\s+/g,
                ' ',
            ),
            postal_code_and_city: `${company.virksomhedMetadata.nyesteBeliggenhedsadresse.postdistrikt}, ${company.virksomhedMetadata.nyesteBeliggenhedsadresse.postnummer}`,
            address: createAddress(company),
            phone: preparePhone(company.telefonNummer),
            start_date: company.virksomhedMetadata.stiftelsesDato,
            employees: createEmployees(company.virksomhedMetadata?.nyesteAarsbeskaeftigelse?.intervalKodeAntalAnsatte),
            industry_code: company.virksomhedMetadata.nyesteHovedbranche.branchekode,
            industry_description: company.virksomhedMetadata.nyesteHovedbranche.branchetekst,
            сompany_description: company.virksomhedMetadata.nyesteVirksomhedsform.langBeskrivelse,
            status: capitalizeFirstLetter(company.virksomhedMetadata.sammensatStatus),
            advertising_protection: prepareAdStatus(company.reklamebeskyttet),
            commune: capitalizeFirstLetter(company.virksomhedMetadata.nyesteBeliggenhedsadresse.kommune.kommuneNavn),
        });
    }

    return companiesFormated;
}
