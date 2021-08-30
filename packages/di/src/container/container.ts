import { Container as InversifyContainer, interfaces } from "inversify";

export type AsyncModuleRegistry = (container: Container) => Promise<void>;
export type ModuleRegistry = (container: Container) => void;

export class Container {
  protected container: InversifyContainer;

  constructor(protected parent?: Container) {
    this.container = new InversifyContainer();
    if (this.parent != null) {
      this.container.parent = this.parent.container;
    }
  }

  bindConstant<T>(
    serviceIdentifier: interfaces.ServiceIdentifier<T>,
    value: T
  ): this {
    this.container.bind(serviceIdentifier).toConstantValue(value);
    return this;
  }

  bindDynamic<T>(
    serviceIdentifier: interfaces.ServiceIdentifier<T>,
    func: (context: interfaces.Context) => T
  ): this {
    this.container.bind(serviceIdentifier).toDynamicValue(func);
    return this;
  }

  bindTransient<T>(constructor: { new (...args: any[]): T }): this;
  bindTransient<T>(
    serviceIdentifier: interfaces.ServiceIdentifier<T>,
    constructor: { new (...args: any[]): T }
  ): this;
  bindTransient<T>(
    serviceIdentifierOrConstructor:
      | interfaces.ServiceIdentifier<T>
      | { new (...args: any[]): T },
    constructor?: {
      new (...args: any[]): T;
    }
  ): this {
    this.container
      .bind(serviceIdentifierOrConstructor)
      .to(
        constructor != null
          ? constructor
          : (serviceIdentifierOrConstructor as { new (...args: any[]): T })
      )
      .inTransientScope();
    return this;
  }

  bindSingleton<T>(constructor: { new (...args: any[]): T }): this;
  bindSingleton<T>(
    serviceIdentifier: interfaces.ServiceIdentifier<T>,
    constructor: { new (...args: any[]): T }
  ): this;
  bindSingleton<T>(
    serviceIdentifierOrConstructor:
      | interfaces.ServiceIdentifier<T>
      | { new (...args: any[]): T },
    constructor?: {
      new (...args: any[]): T;
    }
  ): this {
    this.container
      .bind(serviceIdentifierOrConstructor)
      .to(
        constructor != null
          ? constructor
          : (serviceIdentifierOrConstructor as { new (...args: any[]): T })
      )
      .inSingletonScope();
    return this;
  }

  associateWith<T>(
    serviceIdentifierFrom: interfaces.ServiceIdentifier<T>,
    serviceIdentifierTo: interfaces.ServiceIdentifier<T>
  ): this {
    this.container.bind(serviceIdentifierFrom).toService(serviceIdentifierTo);
    return this;
  }

  load(...moduleRegistries: Array<ModuleRegistry>): void {
    moduleRegistries.forEach((registry) => registry(this));
  }

  async loadAsync(
    ...asnycModuleRegistries: Array<AsyncModuleRegistry>
  ): Promise<void> {
    for (const registry of asnycModuleRegistries) {
      await registry(this);
    }
  }

  get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
    return this.container.get(serviceIdentifier);
  }

  getAll<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): Array<T> {
    return this.container.getAll(serviceIdentifier);
  }

  takeSnapshot(): void {
    this.container.snapshot();
  }

  restoreSnapshot(): void {
    this.container.restore();
  }

  _diContainer(): interfaces.Container {
    return this.container;
  }
}
