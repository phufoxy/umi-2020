import React, { Component } from 'react';
import { connect } from 'dva';
import { StateType } from './model';

interface BasicListProps {
  listTableList: StateType;
  loading: boolean
}
interface BasicListState {
}

class TableList extends Component<BasicListProps, BasicListState> {
  state: BasicListState = {
  };

  render() {
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