import { arrayIncludesByEquals, getOptions, HasEquals, toEqual } from './utils';

describe('getOptions', () => {
    const mockWindowLocation = (url: string) => {
        // @ts-ignore
        delete window.location;
        // @ts-ignore
        window.location = new URL(url);
    };

    it('should give empty object when location.hash is empty', () => {
        mockWindowLocation('http://localhost:3000/');

        expect(getOptions()).toEqual({});
    });

    it('should give empty array when only key is set', () => {
        mockWindowLocation('http://localhost:3000/#debug=');

        expect(getOptions()).toEqual({debug: []});
    });

    it('should give array when key value is set', () => {
        mockWindowLocation('http://localhost:3000/#debug=grid');

        expect(getOptions()).toEqual({debug: ['grid']});
    });

    it('should give array when value with commas is set', () => {
        mockWindowLocation('http://localhost:3000/#debug=grid,fps');

        expect(getOptions()).toEqual({debug: ['grid', 'fps']});
    });
});

const returnTrue = (other: unknown) => true;
const returnFalse = (other: unknown) => false;

describe('toEqual', () => {
    it('should return false when item is not equal', () => {
        const object = {
            equals: returnTrue,
        };

        const predicate = toEqual(object);
        
        expect(predicate({ equals: returnFalse }, 0, [])).toEqual(false);
    });

    it('should return true when item is equal', () => {
        const object = {
            equals: returnFalse,
        };

        const predicate = toEqual(object);
        
        expect(predicate({ equals: returnTrue }, 0, [])).toEqual(true);
    });
});

describe('arrayIncludesByEquals', () => {
    it('should return false if no item is found by equals', () => {
        const array = Array.from({ length: 3 }, () => ({ equals: returnFalse }));
        
        expect(arrayIncludesByEquals(array, { equals: returnFalse })).toBe(false);
    });

    it('should return true when item is found by equals', () => {
        const array = Array.from({ length: 3 }, () => ({ equals: returnTrue }));
        
        expect(arrayIncludesByEquals(array, { equals: returnFalse })).toBe(true);
    });
});