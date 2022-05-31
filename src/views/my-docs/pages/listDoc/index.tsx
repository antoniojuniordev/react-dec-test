import { Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import TableBase from 'components/table';
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

interface DataType {
  key: string;
  title: string;
  description: string;
}

export default function ListDoc() {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a>Download</a>
          <a>Editar</a>
          <a>Deletar</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      title: 'John Brown',
      description: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      title: 'Jim Green',
      description: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      title: 'Joe Black',
      description: 'Sidney No. 1 Lake Park',
    },
  ];

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href=''>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href=''>
          <UserOutlined />
          <span>Application List</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Application</Breadcrumb.Item>
      </Breadcrumb>
      <TableBase id='table' columns={columns} dataSource={data} />
    </>
  );
}
