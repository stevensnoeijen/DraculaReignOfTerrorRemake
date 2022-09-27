import { createTreeOptions } from './utils';

describe('createTreeOptions', () => {
  it('should create root option', () => {
    const options = createTreeOptions([
      {
        name: 'test',
        properties: {},
      },
    ]);

    expect(options).toHaveLength(1);
    expect(options[0].label).toEqual('test');
    expect(options[0].key).toEqual('test');
  });

  it('should create option with children', () => {
    const options = createTreeOptions([
      {
        name: 'layer/test',
        properties: {},
      },
    ]);

    expect(options).toHaveLength(1);
    expect(options[0].label).toEqual('layer');
    expect(options[0].key).toEqual('layer');

    expect(options[0].children).toHaveLength(1);
    expect(options[0].children![0].label).toEqual('test');
    expect(options[0].children![0].key).toEqual('layer/test');
  });

  it('should create multiple layered', () => {
    const options = createTreeOptions([
      {
        name: '1/2/3/4/5/test',
        properties: {},
      },
    ]);

    expect(options).toHaveLength(1);
    expect(options[0].label).toEqual('1');
    expect(options[0].key).toEqual('1');

    expect(options[0].children).toHaveLength(1);
    expect(options[0].children![0].label).toEqual('2');
    expect(options[0].children![0].key).toEqual('1/2');

    expect(options[0].children![0].children).toHaveLength(1);
    expect(options[0].children![0].children![0].label).toEqual('3');
    expect(options[0].children![0].children![0].key).toEqual('1/2/3');
  });

  it('should create multiple items in layers', () => {
    const options = createTreeOptions([
      {
        name: '1/2/3/4/5/test',
        properties: {},
      },
      {
        name: '1/2/test',
        properties: {},
      },
    ]);

    expect(
      options[0].children![0].children![0].children![0].children![0]
        .children![0].label
    ).toEqual('test');
    expect(
      options[0].children![0].children![0].children![0].children![0]
        .children![0].key
    ).toEqual('1/2/3/4/5/test');

    expect(options[0].children![0].children![1].label).toEqual('test');
    expect(options[0].children![0].children![1].key).toEqual('1/2/test');
  });
});
