import { $Keys } from 'utility-types';

export type ClassProps<Class extends Object> = Omit<Class, $Keys<Class>>;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
