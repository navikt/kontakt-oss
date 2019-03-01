export interface Fylke {
    nummer: string;
    navn: string;
}

export const fylkeListe: Fylke[] = [
    {nummer: "1000", navn: "Agder (Aust-Agder og Vest-Agder)"},
    {nummer: "1100", navn: "Rogaland"},
    {nummer: "1200", navn: "Vestland"},
    {nummer: "1500", navn: "Møre og Romsdal"},
    {nummer: "1800", navn: "Nordland"},
    {nummer: "1900", navn: "Troms og Finnmark"},
    {nummer: "5700", navn: "Trøndelag"},
    {nummer: "0600", navn: "Vest-Viken (Buskerud, Bærum og Asker)"},
    {nummer: "0400", navn: "Innlandet (Oppland og Hedmark)"},
    {nummer: "0200", navn: "Øst-Viken (Østfold, Follo og Romerike)"},
    {nummer: "0300", navn: "Oslo"},
    {nummer: "0800", navn: "Vestfold og Telemark"},
];