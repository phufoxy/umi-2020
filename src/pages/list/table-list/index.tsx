import React, { Component } from 'react';
import { connect } from 'dva';
import { StateType } from './model';

interface BasicListProps {
  listTableList: StateType;
  loading: boolean
}
interface BasicListState {
}

interface Todo {
  title: String,
  description: String,
  count: Number,
  completed: Boolean
}

function updateTodo(todo: Todo, fieldsUpdate: Partial<Todo>) {
  return {
    ...todo,
    ...fieldsUpdate
  }
}

interface PageInfo {
  title: String;
}

type Page = 'home' | 'about' | 'contact';

type pageCurrent = 'title' | 'completed' | 'count'

type TodoPreview = Pick<Todo, pageCurrent>;

type pageCurrentOmit = 'description'

type TodoOmit = Omit<Todo, pageCurrentOmit>

class TableList extends Component<BasicListProps, BasicListState> {
  state: BasicListState = {
  };



  render() {
    // const todo1 = {
    //   title: 'organize desk',
    //   description: 'clear clutter',
    //   count: 10
    // };
    // const todo2 = updateTodo(todo1, {
    //   description: 'throw out trash',
    //   count: 1
    // });

    // const todoOnly: Readonly<Todo> = {
    //   title: 'Delete inactive users',
    // };
    // const x: Record<Page, PageInfo> = {
    //   about: {
    //     title: 'name about'
    //   },
    //   home: {
    //     title: 'name home'
    //   },
    //   contact: {
    //     title: 'name contact'
    //   }
    // }
    const todo: TodoOmit = {
      title: 'vanphu',
      completed: true,
      count: 10,
    }
    console.log(todo);

    return (
      <div>
        table list sample
      </div>
    );
  }
}
const mapStateToProps = (state: { listTableList: any; loading: any; }) => ({
  listTableList: state.listTableList,
  loading: state.loading
})
export default connect(mapStateToProps)(TableList);