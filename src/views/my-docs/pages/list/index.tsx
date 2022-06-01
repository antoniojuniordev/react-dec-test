import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, Space, Table } from 'antd';
import Pagination from 'antd/es/pagination';
import { ColumnsType } from 'antd/lib/table';

import Button from 'components/button';
import useDebounce from 'hooks/userDebounce';
import { downloadDoc } from 'utils/functions/downloadFile';
import { Doc } from 'views/my-docs/model/docs';
import { serviceDoc } from 'views/my-docs/services';
import Input from 'components/form/input';
import { Order } from 'views/my-docs/services/serviceDoc';
import { stringify } from 'querystring';

export default function ListDoc() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [docs, setDocs] = useState<any>();
  const [countPage, setCountPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [value, setValue] = useState<string>('');
  const [order, setOrder] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(value, 500);

  async function loadingDocs() {
    setLoading(true);
    const response = await serviceDoc.getDocs(
      { page, name: value, order },
      'get-docs'
    );
    if (response) {
      setCountPage(response.count);
      setDocs(response.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadingDocs();
  }, []);

  useEffect(() => {
    loadingDocs();
  }, [debouncedValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const columns: ColumnsType<Doc> = [
    {
      title: t('File name'),
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => a.name.length - b.name.length,
        multiple: 1,
      },
    },
    {
      title: t('Title'),
      dataIndex: 'title',
      key: 'title',
      sorter: {
        compare: (a, b) => a.title.length - b.title.length,
        multiple: 2,
      },
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
    setPage(event);
    loadingDocs();
  }

  const onChange: any['onChange'] = (
    pagination: any,
    filters: any,
    sorter: any
  ) => {
    if (sorter.length > 1) {
      setOrder(sorter.map((e: any) => ({ order: e.order, field: e.field })));
    } else {
      setOrder([{ order: sorter.order, field: sorter.field }]);
    }
    loadingDocs();
  };

  return (
    <>
      <Row justify='end' className='mb-2'>
        <Button type='primary' onClick={handleNavigateToNewDoc}>
          {t('New Document')}
        </Button>
      </Row>
      <Card className='mt-2'>
        <Col span={12}>
          <Input
            placeholder={t('Search by file name')}
            maxLength={255}
            value={value}
            onChange={handleChange}
          ></Input>
        </Col>

        <Col span={24} className='mt-1'>
          <Table
            pagination={false}
            columns={columns}
            dataSource={docs}
            rowKey='id'
            tableLayout='auto'
            showSorterTooltip
            loading={loading}
            scroll={{ y: 540 }}
            onChange={onChange}
          />
          <Row justify='end' className='mt-2'>
            <Pagination
              responsive
              defaultCurrent={1}
              current={page}
              total={countPage}
              showSizeChanger={false}
              showTotal={(total) => `${total} ${t('items')}`}
              onChange={(e) => handleChangeTable(e)}
            />
          </Row>
        </Col>
      </Card>
    </>
  );
}
