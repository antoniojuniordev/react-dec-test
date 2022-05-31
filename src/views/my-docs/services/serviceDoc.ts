import { t } from 'i18next';
import services from 'services/api';
import { Doc, Docs, DocsDetail } from '../model/docs';

interface PropsPaginationOptions {
  count: number;
  pages: number;
  current_page: number;
  limit?: number;
}

export default {
  async getDocs(
    params: Partial<Doc> & Partial<PropsPaginationOptions>,
    reference: string
  ): Promise<Docs | false> {
    try {
      const response = await services.getWithFilter('docs', params, reference);
      return response as unknown as Docs;
    } catch (error) {
      return false;
    }
  },
  async createDocs(payload: FormData, reference: string): Promise<Doc | false> {
    try {
      const response = await services.post(
        'docs',
        payload,
        t('Document successfully registered'),
        reference
      );
      return response as unknown as Doc;
    } catch (error) {
      return false;
    }
  },
  async updateDocs(
    id: string,
    payload: FormData,
    reference: string
  ): Promise<Doc | false> {
    try {
      const response = await services.put(
        `docs/${id}`,
        payload,
        t('Document successfully updated'),
        reference
      );
      return response as unknown as Doc;
    } catch (error) {
      return false;
    }
  },
  async getDoc(id: string, reference: string): Promise<DocsDetail | false> {
    try {
      const response = await services.get(`docs/${id}`, reference);
      return response as unknown as DocsDetail;
    } catch (error) {
      return false;
    }
  },
  async deleteDocs(id: string, reference: string): Promise<Doc | false> {
    try {
      const response = await services.delete(
        `docs/${id}`,
        t('Document successfully deleted'),
        reference
      );
      return response as unknown as Doc;
    } catch (error) {
      return false;
    }
  },
};
