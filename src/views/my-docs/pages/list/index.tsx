import { Card, Col, Row, Space, Table } from 'antd';
import Pagination from 'antd/es/pagination';
import { ColumnsType } from 'antd/lib/table';
import Button from 'components/button';
import TableBase from 'components/table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { downloadDoc } from 'utils/functions/downloadFile';
import { Doc } from 'views/my-docs/model/docs';
import { serviceDoc } from 'views/my-docs/services';

export default function ListDoc() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [docs, setDocs] = useState<any>();
  const [countPage, setCountPage] = useState<number>(1);

  async function loadingDocs(page = 1) {
    const response = await serviceDoc.getDocs({ page }, 'get-docs');
    if (response) {
      setCountPage(response.count);
      setDocs(response.data);
    }
  }

  useEffect(() => {
    loadingDocs();
  }, []);

  const columns: ColumnsType<Doc> = [
    {
      title: t('File name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('Title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('Description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('Created at'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => (
        <Space size='middle'>
          {new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(new Date(record?.createdAt || new Date()))}
        </Space>
      ),
    },
    {
      title: t('Action'),
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Link type='link' to={`view/${record.id}`}>
            {t('View')}
          </Link>
          <Link type='link' to={`edit/${record.id}`}>
            {t('Edit')}
          </Link>
          <Button
            type='link'
            size='small'
            onClick={() => downloadDoc(record.link || '')}
          >
            {t('Download')}
          </Button>
        </Space>
      ),
    },
  ];

  function handleNavigateToNewDoc() {
    navigate('/my-docs/new');
  }

  function handleChangeTable(event: number) {
    loadingDocs(event);
  }

  return (
    <>
      <Row justify='end' gutter={[0, 12]}>
        <Button type='primary' onClick={handleNavigateToNewDoc}>
          {t('New Document')}
        </Button>
        <Col span={24}>
          <Card>
            <Table
              pagination={false}
              columns={columns}
              dataSource={docs}
              rowKey='id'
              tableLayout='auto'
              showSorterTooltip
              scroll={{ y: 540 }}
            />
            <Row justify='end' className='mt-2'>
              <Pagination
                responsive
                defaultCurrent={1}
                total={countPage}
                showSizeChanger={false}
                showTotal={(total) => `${total} ${t('items')}`}
                onChange={(e) => handleChangeTable(e)}
              />
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}
