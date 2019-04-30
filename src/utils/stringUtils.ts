export const fjernWhitespace = (string: string): string => {
    return string.replace(/ /g, '');
};

export const inneholderKunSifre = (string: string) => /^\d+$/.test(string);
