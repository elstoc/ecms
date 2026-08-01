import { use } from 'react';

import { CalibreDbContext } from '../components/CalibreDbProvider';

export const useCalibreDb = () => use(CalibreDbContext);
