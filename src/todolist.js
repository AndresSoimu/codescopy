import React from "react";
import { decorate, observable } from "mobx";
import { inject, observer } from "mobx-react";

const connect = str => Comp => inject([str])(observer(Comp));

export class TodoListClass {
  items = ["get milk"]; // observable array
  onSubmit = e => this.items.push(e); // action
}
decorate(TodoListClass, { items: observable });

const Display = connect("todolist")(({ todolist }) => {
  const [title, list] = todolist;
  return (
    <React.Fragment>
      <ul>
        <h3>{title}</h3>
        {list.items.map(item => <li key={item}>{item}</li>)}
      </ul>
    </React.Fragment>
  );
});

const Input = connect("todolist")(
  class Input extends React.Component {
    render() {
      // reaction
      const [, list] = this.props.todolist;
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            list.onSubmit(this.input.value);
            this.input.value = "";
          }}
        >
          <input type="items" ref={x => (this.input = x)} />
        </form>
      );
    }
  }
);

export const TodoList = () => (
  <React.Fragment>
    <Display />
    <Input />
  </React.Fragment>
);
