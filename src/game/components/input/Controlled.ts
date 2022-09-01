export type By = 'player' | 'ai';

export class Controlled {
  constructor (
    public by: By | null = null,
  ) {};
}
