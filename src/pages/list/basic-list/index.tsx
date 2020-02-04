import React, { Component } from 'react';
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  List,
  Menu,
  Progress,
  Radio,
  Row,
  Result,
  Modal
} from 'antd';
import moment from 'moment';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { findDOMNode } from 'react-dom';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch } from 'redux';
import { StateType } from './model';
import { BasicListItemDataType } from './data.d';
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search, TextArea } = Input;

interface BasicListProps extends FormComponentProps {
  listBasicList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface BasicListState {
  visible: boolean;
  done: boolean;
  current?: Partial<BasicListItemDataType>;
}

class BasicList extends Component<BasicListProps, BasicListState> {
  addBtn: HTMLButtonElement | undefined | null = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listBasicList/fetch',
      payload: {
        count: 5,
      },
    });
  }

  deleteItem = (id: string) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'listBasicList/submit',
      payload: { id },
    });
  };

  render() {
    const {
      listBasicList: { list },
      loading,
    } = this.props;

    const editAndDelete = (key: string, currentItem: BasicListItemDataType) => {
      // if (key === 'edit') this.showEditModal(currentItem);
      if (key === 'delete') {
        Modal.confirm({
          title: 'Want remove item?',
          content: 'Remove item',
          okText: 'Yes',
          centered: true,
          cancelText: 'Cancel',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const Info: React.FC<{
      title: React.ReactNode;
      value: React.ReactNode;
      bordered?: boolean;
    }> = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">All</RadioButton>
          <RadioButton value="progress">Progress</RadioButton>
          <RadioButton value="waiting">Waiting</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="name placeholder" onSearch={() => ({})} />
      </div>
    );

    const ListContent = ({
      data: { owner, createdAt, percent, status },
    }: {
      data: BasicListItemDataType;
    }) => (
        <div className={styles.listContent}>
          <div className={styles.listContentItem}>
            <span>Owner</span>
            <p>{owner}</p>
          </div>
          <div className={styles.listContentItem}>
            <span>开始时间</span>
            <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
          </div>
          <div className={styles.listContentItem}>
            <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
          </div>
        </div>
      );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const MoreBtn: React.FC<{
      item: BasicListItemDataType;
    }> = ({ item }) => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, item)}>
            <Menu.Item key="edit">Edit</Menu.Item>
            <Menu.Item key="delete">Delete</Menu.Item>
          </Menu>
        }
      >
        <a>
          Options <DownOutlined />
        </a>
      </Dropdown>
    );


    return (
      <>
        <PageHeaderWrapper content="content" title="title"
        >
          <div className={styles.standardList}>
            <Card bordered={false}>
              <Row>
                <Col sm={8} xs={24}>
                  <Info title="Total" value="8 item" bordered />
                </Col>
                <Col sm={8} xs={24}>
                  <Info title="Element" value="32 item" bordered />
                </Col>
                <Col sm={8} xs={24}>
                  <Info title="Watting" value="24 item" />
                </Col>
              </Row>
            </Card>
            <Card
              className={styles.listCard}
              bordered={false}
              title="List basic"
              style={{ marginTop: 24 }}
              bodyStyle={{ padding: '0 32px 40px 32px' }}
              extra={extraContent}
            >
              <Button
                type="dashed"
                style={{ width: '100%', marginBottom: 8 }}
                icon={<PlusOutlined />}
                // onClick={this.showModal}
                ref={component => {
                  // eslint-disable-next-line  react/no-find-dom-node
                  this.addBtn = findDOMNode(component) as HTMLButtonElement;
                }}
              >
                Add
              </Button>
              <List
                size="large"
                rowKey="id"
                loading={loading}
                pagination={paginationProps}
                dataSource={list}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <a
                        key="edit"
                        onClick={e => {
                          e.preventDefault();
                          // this.showEditModal(item);
                        }}
                      >
                        编辑
                      </a>,
                      <MoreBtn key="more" item={item} />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.logo} shape="square" size="large" />}
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.subDescription}
                    />
                    <ListContent data={item} />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </PageHeaderWrapper>
      </>
    );
  }
}

const mapStateToProps = (state: { listBasicList: StateType; loading: { models: { [key: string]: boolean }; }; }) => ({
  listBasicList: state.listBasicList,
  loading: state.loading.models.listBasicList
})

export default connect(mapStateToProps)(BasicList);