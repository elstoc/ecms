import { BookList } from './BookList';
import { PathLinks } from './PathLinks';

import * as styles from './Books.module.css';

export const Books = () => {
  return (
    <div className={styles.Root}>
      <PathLinks />
      <BookList />
    </div>
  );
};
