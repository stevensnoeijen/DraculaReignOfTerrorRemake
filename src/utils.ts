export const filterEmpty = Boolean as <T>(t: T) => NonNullable<T>;

export type Options = Record<string, string[]|undefined>;

export const getOptions = (): Options => {
    return window.location.hash
        .substring(1)
        .split('&')
        .filter(filterEmpty)
        .map((option) => option.split('='))
        .reduce((acc, curr) => {
            acc[curr[0]] = curr[1].split(',').filter(filterEmpty);
            return acc;
        }, {} as Options)
};

export type HasEquals = { equals: (other: unknown) => boolean };
type Predicate<T> = (this: void, value: T, index: number, obj: T[]) => boolean;

export const toEqual = <T extends HasEquals>(other: T): Predicate<T> => {
	return (item: T) => item.equals(other)
};

export const arrayIncludesByEquals = <T extends HasEquals>(array: T[], object: T): boolean => {
    return array.find(toEqual(object)) != null;
}