import axios from 'axios';
import { VirkResponse, CompanyData } from '../models/VirkResponse';

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
): Promise<CompanyData[]> {
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

    const companiesFormated: object[] = [];
    for (const company of companies) {
        companiesFormated.push({
            cvr: company['cvrNummer'],
            name: company['virksomhedMetadata']['nyesteNavn']['navn'],
            postal_code_and_city:
                company['virksomhedMetadata']['nyesteBeliggenhedsadresse'][
                    'postnummer'
                ],
            address: `${company['virksomhedMetadata']['nyesteBeliggenhedsadresse']['vejnavn']} ${company['virksomhedMetadata']['nyesteBeliggenhedsadresse']['husnummerFra']}`,
        });
    }

    console.log(companiesFormated);

    return companies;
}

export async function searchByCVR(cvr: number, config: virkApiConfig = {}) {
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
        .then((res) => res.data.hits.hits)
        .catch((err) => {
            throw new Error(err);
        });

    const companies: object[] = [];
    for (const doc of response) {
        companies.push(doc._source.Vrvirksomhed);
    }

    return companies[0];
}
