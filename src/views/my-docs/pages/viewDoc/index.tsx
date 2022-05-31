import { Col, Row } from 'antd';
import Button from 'components/button';
import Card from 'components/card';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { downloadDoc } from 'utils/functions/downloadFile';
import { Doc } from 'views/my-docs/model/docs';
import { serviceDoc } from 'views/my-docs/services';

export default function ViewDoc() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [docs, setDocs] = useState<Doc>();

  async function loadingDoc() {
    const response = await serviceDoc.getDoc(id || '', 'get-doc');
    if (response) {
      setDocs(response.data);
    } else {
      navigate('/my-docs');
    }
  }

  useEffect(() => {
    loadingDoc();
  }, []);

  async function deleteDoc() {
    await serviceDoc.deleteDocs(docs?.id || '', 'delete-docs');
    navigate('/my-docs');
  }

  return (
    <>
      <Row justify='end' gutter={[0, 12]}>
        <Col span={24}>
          <Card
            id='get-doc'
            title={docs?.name || ''}
            extra={
              <Button
                type='link'
                id='delete-docs'
                size='small'
                onClick={() => deleteDoc()}
              >
                {t('Delete')}
              </Button>
            }
          >
            <>
              <h4>{docs?.title}</h4>
              <p>{docs?.description}</p>
              <Button
                type='primary'
                onClick={() => downloadDoc(docs?.link || '')}
              >
                {t('Download')}
              </Button>
            </>
          </Card>
        </Col>
      </Row>
    </>
  );
}
