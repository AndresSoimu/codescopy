import React from "react";
import { render } from "react-dom";
import { observable } from "mobx";
import { inject, observer, Provider } from "mobx-react";
import { TodoList, TodoListClass } from "./todolist";
import "./index.css";

const connect = str => Comp => inject([str])(observer(Comp)); // helper function

const listOfLists = observable.map({
  Todo1: new TodoListClass(),
  Todo2: new TodoListClass()
  // observable map rerenders when you add new members
});
const addNewList = e => listOfLists.set(e, new TodoListClass());

const App = connect("lists")(
  class App extends React.Component {
    render() {
      const { lists } = this.props;
      return (
        <div className="App">
          <span />
          <h1>MobX Kanban</h1>
          <span />
          {Array.from(lists).map((k, i) => (
            <div key={i}>
              {/*Provider within a Provider = Providerception */}
              <Provider todolist={k}>
                <TodoList />
              </Provider>
            </div>
          ))}
          <div>
            <h3>Add New List</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                addNewList(this.input.value);
                this.input.value = "";
              }}
            >
              <input type="text" ref={x => (this.input = x)} />
            </form>
          </div>
        </div>
      );
    }
  }
);

render(
  <Provider lists={listOfLists}>
    <App />
  </Provider>,
  document.getElementById("root")
);
