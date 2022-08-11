import { getEditableComponents } from './utils';

describe('getEditableComponents', () => {
  it('should get all registered components', () => {
    const properties = getEditableComponents();

    expect(Object.keys(properties)).toHaveLength(4);
  });
});
