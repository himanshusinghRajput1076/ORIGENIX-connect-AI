import { SearchRepository } from './repository';
import * as schemas from './schemas';
import { z } from 'zod';
const repo = new SearchRepository();
export class SearchService {
  async globalSearch(params: z.infer<typeof schemas.GlobalSearchSchema>) {
    return repo.searchAcrossAll(params.q, params.category);
  }
}
