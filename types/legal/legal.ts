// types/legal/legal.ts

export interface LegalInfoSection {
    label: string;
    value: string;
    isLink?: boolean;
}

export interface LegalInfoData {
    title: string;
    sections: LegalInfoSection[];
}