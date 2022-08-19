import { Class } from 'utility-types';

export class Reflector<Data> {
  private map: Record<string, Record<string, Data> | undefined> = {};

  public set(classType: Class<any>, propertyName: string, data: Data): void {
    if (this.map[classType.name] == null) {
      this.map[classType.name] = {};
    }

    this.map[classType.name]![propertyName] = data;
  }

  public get(
    classType: Class<any> | string,
    propertyName: string
  ): Data | null {
    const name = typeof classType === 'string' ? classType : classType.name;

    if (this.map[name] == null) return null;

    return this.map[name]![propertyName] ?? null;
  }

  public getAllByClass<ClassType extends Class<any>>(classType: ClassType) {
    return this.map[classType.name] ?? null;
  }

  public getAll() {
    return this.map;
  }
}
