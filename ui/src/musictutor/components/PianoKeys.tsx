import cn from 'classnames';

import * as styles from './PianoKeys.module.css';

export const PianoKeys = () => (
  <div className={styles.Root}>
    <div className={styles.Piano}>
      <div className={styles.Key}>C</div>
      <div className={cn(styles.Key, styles.Black)}>C#</div>
      <div className={styles.Key}>D</div>
      <div className={cn(styles.Key, styles.Black)}>D#</div>
      <div className={styles.Key}>E</div>
      <div className={styles.Key}>F</div>
      <div className={cn(styles.Key, styles.Black)}>F#</div>
      <div className={styles.Key}>G</div>
      <div className={cn(styles.Key, styles.Black)}>G#</div>
      <div className={styles.Key}>A</div>
      <div className={cn(styles.Key, styles.Black)}>A#</div>
      <div className={styles.Key}>B</div>
    </div>
  </div>
);
