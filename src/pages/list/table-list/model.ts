import { TableListData } from './data.d';

export interface StateType {
  data: TableListData;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
  };
  reducers: {
  };
}

const Model: ModelType = {
  namespace: 'listTableList',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
  },
  reducers: {
  },
};

export default Model;
