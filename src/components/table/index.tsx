import { Table } from 'antd';
import { usePromiseTracker } from 'react-promise-tracker';

interface Props {
  id: string;
  columns: any;
  dataSource: any;
}

function TableBase(props: Props) {
  const { promiseInProgress } = usePromiseTracker({ area: props.id });
  const generalProgress = usePromiseTracker();
  return (
    <Table
      columns={props.columns}
      dataSource={props.dataSource}
      rowKey='id'
      loading={
        promiseInProgress || (generalProgress.promiseInProgress && !props.id)
      }
    />
  );
}

export default TableBase;
