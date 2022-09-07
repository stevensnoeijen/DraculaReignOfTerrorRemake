import { getOptions } from './options';

describe('getOptions', () => {
  it('should give empty object when location.hash is empty', () => {
    window.location.assign('http://localhost:3000/');

    expect(getOptions()).toEqual({});
  });

  it('should give empty array when only key is set', () => {
    window.location.assign('http://localhost:3000/#/game?debug=');

    expect(getOptions()).toEqual({ debug: [] });
  });

  it('should give array when key value is set', () => {
    window.location.assign('http://localhost:3000/#/game?debug=grid');

    expect(getOptions()).toEqual({ debug: ['grid'] });
  });

  it('should give array when value with commas is set', () => {
    window.location.assign('http://localhost:3000/#/game?debug=grid,fps');

    expect(getOptions()).toEqual({ debug: ['grid', 'fps'] });
  });
});
