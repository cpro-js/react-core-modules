# @cpro-js/react-di

A simplified & preconfigured wrapper of InversifyJS that works out the box with React.

## Installation

```
$ yarn add @cpro-js/react-di
```

## Example

```tsx
import { Container, store, service } from "@cpro-js/react-di";
import { observable, makeObservable } from "mobx";
import { observer } from "mobx-react";
import { Component } from "react";
import ReactDOM from "react-dom";


@store()
class Store {
  @observable
  public items: Array<string> = [];

  constructor() {
    makeObservable(this);
  }
}

@service()
class Service {

  constructor(@inject(Store) private store: Store) {
  }

  getItems() {
    return this.store.items;
  }
}

@observer
class App extends Component<{}> {
  @inject(Service) private service!: Service;

  render() {
    return (
      <ul>
        {this.service.getItems().map((item, index) => <ul key={index}>{item}</ul>)}
      </ul>
    );
  }
}


// setup dependency injection container
const container = new Container();
container.addSingleton(Store); // alias for container.addSingleton(Store, Store);
container.addSingleton(Service); // alias for container.addSingleton(Service, Service);

// render react app
ReactDOM.render(
  <React.StrictMode>
    <ContainerProvider container={container}>
      <App/>
    </ContainerProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

## Usage

### Declare dependencies using the @injectable, @service or @store decorator

Decorators:

- _injectable_: Base decorator to declare a class as injectable.
- _@service_: Alias for `@injectable`. Should be used for service classes to identify them easier.
- _@store_: Alias for `@injectable`. Should be used for mobx stores. In the future we may provide additional functionality
  based on this decorator like data persistence or SSR-hydration.

```ts
@store()
class Store {
  @observable
  public items: Array<string> = [];

  constructor() {
    makeObservable(this);
  }
}

@service()
class Service {

  constructor(private store: Store) {
  }

  getItems() {
    return this.store.items;
  }
}

```

### Create and configure a DI Container

```ts
// setup dependency injection container
const container = new Container();
container.addSingleton(Store); // alias for container.addSingleton(Store, Store);
container.addSingleton(Service); // alias for container.addSingleton(Service, Service);
```

Setup your DI container for React Components:

```tsx
// render react app
ReactDOM.render(
  <React.StrictMode>
    <ContainerProvider container={container}>
      <App/>
    </ContainerProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

### Inject dependencies using @inject into classes

Into normal classes like services or stores:

```tsx
@service()
class Service {

  constructor(@inject(Store) private store: Store) {
  }

  getItems() {
    return this.store.items;
  }
}

```

Or into react class components:

```tsx
@observer
class App extends Component<{}> {
  @inject(Service) private service!: Service;
  @inject.optional(Service) private orAsOptionalService?: Service;

  render() {
    return (
      <ul>
        {this.service.getItems().map((item, index) => <ul key={index}>{item}</ul>)}
      </ul>
    );
  }
}
```

Injecting into functional components is also possible using the useInjection hook:

```tsx

const App: FC<{}> = observer(() => {
  const service = useInjection(Service);

  return (
    <ul>
      {service.getItems().map((item, index) => <ul key={index}>{item}</ul>)}
    </ul>
  );
})
```
