export interface VirkResponse{
    took: number;
    timed_out: boolean;
    _shards: {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    }
    hits: {
        total: number;
        max_score: number;
        hits: Company[];
    }
}

export interface Company{
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: {
        Vrvirksomhed: CompanyData;
    };
}

export interface CompanyData{ 
    telefonNummer: Phone[];
    cvrNummer: number;
    reklamebeskyttet: boolean;
    virksomhedMetadata: CompanyMetaData;
}

export default interface Phone{
    sidstOpdateret: Date;
    hemmelig: boolean;
    kontaktoplysning: number;
    periode: {
        gyldigFra: Date;
        gyldigTil: Date | null;
    };
}

export interface CompanyMetaData{
    stiftelsesDato: Date;
    nyesteHovedbranche: {
        branchetekst: string;
        branchekode: string;
    }
    sammensatStatus: string;
    nyesteNavn: {
        navn: string;
    }
    nyesteBeliggenhedsadresse: {
        kommune: {
            kommuneNavn: string;
        }
        husnummerFra: number;
        postnummer: number;
        etage: string | null;
        bynavn: string | null;
        vejnavn: string;
        sidedoer: string | null;
        postdistrikt: string;
    }
    nyesteAarsbeskaeftigelse: {
        intervalKodeAntalAnsatte: string;
    }
    nyesteVirksomhedsform: {
        langBeskrivelse: string;
        kortBeskrivelse: string;
    }
}