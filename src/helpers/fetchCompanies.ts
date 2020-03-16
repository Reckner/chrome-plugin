import axios from 'axios';
import { ICompanyContainer } from '../models/Company';

import jsdom from 'jsdom';
const { JSDOM } = jsdom;

export async function fetchCompanies(
    search: string,
): Promise<ICompanyContainer[]> {
    const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://datacvr.virk.dk/data/visninger?soeg=${search}&oprettet=null&ophoert=null&branche=&type=undefined&language=da`,
    );

    const dom = new JSDOM(response.data);
    const companiesNodes = dom.window.document.querySelectorAll('.item.virk');

    const companies: ICompanyContainer[] = [];

    for (const cNode of companiesNodes) {
        companies.push({
            name: cNode.querySelector('.name a')?.innerHTML,
            cvr: cNode.querySelector('.cvr')?.querySelectorAll('p')[1]
                ?.innerHTML,
            status: cNode.querySelector('.status')?.querySelectorAll('p')[1]
                ?.innerHTML,
            type: cNode.querySelector('.type')?.querySelectorAll('p')[1]
                ?.innerHTML,
            address: cNode
                .querySelector('.row.info')
                ?.querySelector('p')
                ?.innerHTML?.split('<br>')[0],
            postal_code_and_city: cNode
                .querySelector('.row.info')
                ?.querySelector('p')
                ?.innerHTML?.split('<br>')[1],
        });
    }

    return companies;
}
