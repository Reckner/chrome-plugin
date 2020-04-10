import axios from 'axios';

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
) {
    const response = await axios
        .post(
            config.url ||
                `${proxy}http://distribution.virk.dk/cvr-permanent/_search`,
            {
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
        .then((res) => res.data.hits.hits)
        .catch((err) => {
            throw new Error(err);
        });

    const companies: object[] = [];
    for (const doc of response) {
        companies.push(doc._source.Vrvirksomhed);
    }

    return companies;
}

export async function searchByCVR(cvr: number, config: virkApiConfig = {}) {
    const response = await axios
        .post(
            config.url ||
                `${proxy}http://distribution.virk.dk/cvr-permanent/virksomhed/_search`,
            {
                _source: 'Vrvirksomhed.virksomhedMetadata.nyesteNavn.navn',
                query: {
                    term: {
                        'Vrvirksomhed.cvrNummer': 33966121,
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
