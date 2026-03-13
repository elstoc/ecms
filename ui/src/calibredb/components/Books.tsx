import { BookList } from './BookList';
import { PathLinks } from './PathLinks';

import * as styles from './CalibreDb.module.css';

export const Books = () => {
  return (
    <div className={styles.Books}>
      <PathLinks />
      <BookList />
    </div>
  );
};
