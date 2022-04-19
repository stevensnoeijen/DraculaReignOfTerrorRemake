import { getOptions } from './utils';

describe('getOptions', () => {
    it('should give empty object when location.hash is empty', () => {
        delete window.location;
        window.location = new URL('http://localhost:3000/')

        expect(getOptions()).toEqual({});
    });

    it('should give empty array when only key is set', () => {
        delete window.location;
        window.location = new URL('http://localhost:3000/#debug=')

        expect(getOptions()).toEqual({debug: []});
    });

    it('should give array when key value is set', () => {
        delete window.location;
        window.location = new URL('http://localhost:3000/#debug=grid')

        expect(getOptions()).toEqual({debug: ['grid']});
    });

    it('should give array when value with commas is set', () => {
        delete window.location;
        window.location = new URL('http://localhost:3000/#debug=grid,fps')

        expect(getOptions()).toEqual({debug: ['grid', 'fps']});
    });
});