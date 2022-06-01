import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd/es/upload/interface';
import { Col, Row, Upload } from 'antd';

import Button from 'core/components/button';
import Input from 'core/components/form/input';
import TextArea from 'core/components/form/textarea';
import yup from 'core/services/validates/yup';

import { Doc } from 'views/my-docs/model/docs';
import { serviceDoc } from 'views/my-docs/services';
import Notify from 'core/services/notification/notification';
import { downloadDoc } from 'core/utils/functions/downloadFile';
import Card from 'core/components/card';
import useDebounce from 'core/hooks/userDebounce';

export default function MyDoc() {
  const [fileList, setFileList] = useState<any[]>([]);
  const [docs, setDocs] = useState<Doc>();
  const [value, setValue] = useState<string>('  ');
  const debouncedValue = useDebounce<string>(value, 500);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: '',
      title: '',
      description: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(t('Name needs to be filled')),
      title: yup.string().required(t('Title needs to be filled')),
      description: yup.string(),
    }),
    onSubmit,
  });

  async function loadingDoc() {
    if (id) {
      const response = await serviceDoc.getDoc(id || '', 'get-doc');
      if (response) {
        setDocs(response.data);
        formik.setFieldValue('name', response.data.name);
        formik.setFieldValue('title', response.data.title);
        formik.setFieldValue('description', response.data.description);
      }
    }
  }

  useEffect(() => {
    loadingDoc();
  }, []);

  async function loadingDocs() {
    const response = await serviceDoc.getDocs({ title: value }, 'get-docs');
    if (response && response.data.length > 0) {
      Notify({
        title: t('alert'),
        message: t('Title is already registered'),
        type: 'error',
      });
    }
  }

  useEffect(() => {
    loadingDocs();
  }, [debouncedValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    formik.handleChange(event);
  };

  function getBase64() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[0]);
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject('false');
    });
  }

  async function onSubmit(payload: Doc) {
    let file: any;
    if (docs?.base64) file = docs.base64;
    if (fileList.length > 0) file = await getBase64();

    const formData = new FormData();
    formData.append('base64', file);
    formData.append('title', payload.title);
    formData.append('name', payload.name);
    formData.append('description', payload.description);

    let response: Doc | boolean;
    if (id) response = await serviceDoc.updateDocs(id, formData, 'create-doc');
    else response = await serviceDoc.createDocs(formData, 'create-doc');

    if (response) navigate('/my-docs');
  }

  const props: UploadProps = {
    onRemove: () => setFileList([]),
    beforeUpload: (file) => {
      if (
        file.type !== '' &&
        file.type !== 'application/zip' &&
        file.type !== 'application/octet-stream' &&
        file.type !== 'application/x-msdownload'
      ) {
        setFileList([file]);
      } else {
        Notify({
          title: t('alert'),
          message: t('Invalid file type'),
          type: 'error',
        });
      }
      return false;
    },
    fileList,
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card id='get-doc' title={id ? 'Update Document' : 'New Document'}>
        <Row gutter={[0, 12]}>
          <Col span={24}>
            <Input
              name='name'
              label={t('File name')}
              placeholder={t('File name')}
              maxLength={255}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
            ></Input>
          </Col>
          <Col span={24}>
            <Input
              name='title'
              label={t('Title')}
              placeholder={t('Title')}
              maxLength={100}
              value={formik.values.title}
              onChange={handleChange}
              error={formik.touched.title && formik.errors.title}
            ></Input>
          </Col>
          <Col span={24}>
            <TextArea
              name='description'
              label='Descrição'
              placeholder='Descrição'
              maxLength={2000}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && formik.errors.description}
            ></TextArea>
          </Col>

          <Col md={12} sm={24} xs={24}>
            {docs?.id && (
              <Col md={12} sm={24} xs={24} style={{ marginBottom: 16 }}>
                <Button
                  type='primary'
                  onClick={() => downloadDoc(docs?.link || '')}
                >
                  {t('Download')}
                </Button>
              </Col>
            )}
            <Upload {...props} maxCount={1}>
              <Button icon={<UploadOutlined />}>
                {t('Select a document')}
              </Button>
            </Upload>
          </Col>

          <Col span={24}>
            <Row justify='end' gutter={[0, 12]}>
              <Col md={3} sm={24} xs={24}>
                <Button block type='primary' htmlType='submit' id='create-doc'>
                  {t('Save')}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </form>
  );
}
