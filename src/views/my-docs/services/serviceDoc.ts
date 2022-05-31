import { t } from 'i18next';
import services from 'services/api';
import { Doc, Docs } from '../model/docs';

interface PropsPaginationOptions {
  count: number;
  pages: number;
  current_page: number;
  limit?: number;
}

export default {
  async getDocs(
    params: Partial<Docs> & Partial<PropsPaginationOptions>,
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
        t('Equipment saved successfully!'),
        reference
      );
      return response as unknown as Doc;
    } catch (error) {
      return false;
    }
  },
};
