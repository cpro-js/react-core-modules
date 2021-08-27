# @cpro-js/di

A simplified & preconfigured wrapper of InversifyJS that works out the box with React.

## Installation

```
$ yarn add @cpro-js/di
```

## Example

```tsx
import { Container, store, service } from "@cpro-js/di";
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
container.addSingleton(Store);
container.addSingleton(Service);

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
