import { Options } from "./types";

const filterEmpty = Boolean;

export const getOptions = (): Options => {
    return window.location.hash
        .substring(1)
        .split('&')
        .filter(filterEmpty)
        .map((option) => option.split('='))
        .reduce((acc, curr) => {
            acc[curr[0]] = curr[1].split(',').filter(filterEmpty);
            return acc;
        }, {})
}