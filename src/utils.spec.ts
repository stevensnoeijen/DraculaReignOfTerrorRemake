import { getOptions } from './utils';

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