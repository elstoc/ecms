import { FluteKey } from './FluteNotes';

import * as styles from './Flute.module.css';

type FluteProps = {
  keysPressed: FluteKey[];
};

export const Flute = ({ keysPressed }: FluteProps) => {
  const pressedStyle = (key: FluteKey) => (keysPressed.includes(key) ? styles.Pressed : '');

  return (
    <div className={styles.Root}>
      <svg
        viewBox='1.35 2.41 51.23 10.75'
        version='1.1'
        id='svg1'
        xmlns='http://www.w3.org/2000/svg'
        stroke='black'
        strokeWidth={0.4}
        strokeLinecap='round'
        strokeLinejoin='round'
        paintOrder='stroke markers fill'
      >
        <ellipse
          className={pressedStyle('L1-Bb')}
          id='L1-Bb'
          cx='2.5373795'
          cy='11.628788'
          rx='0.68745244'
          ry='1.0236251'
        />
        <ellipse
          className={pressedStyle('L1-B')}
          id='L1-B'
          cx='6.1519299'
          cy='11.628788'
          rx='2.2522743'
          ry='0.98299325'
        />
        <circle className={pressedStyle('L2-C')} id='L2-C' cx='7.4556818' cy='7.3943181' r='2' />
        <circle className={pressedStyle('L3-A')} id='L3-A' cx='13.612689' cy='7.3943181' r='2' />
        <circle className={pressedStyle('L4-G')} id='L4-G' cx='19.769697' cy='7.3943181' r='2' />
        <ellipse
          className={pressedStyle('L5-G#')}
          id='L5-G#'
          cx='23.695972'
          cy='3.9358461'
          rx='2'
          ry='1.0291389'
        />
        <path
          id='divider'
          d='m 26.278788,5.1443186 c 0,4.4999988 0,4.4999988 0,4.4999988 v 0 0'
          strokeWidth={0.1}
        />
        <circle className={pressedStyle('R2-F#')} id='R2-F#' cx='30.640154' cy='7.3943181' r='2' />
        <circle className={pressedStyle('R3-E')} id='R3-E' cx='36.797161' cy='7.3943181' r='2' />
        <circle className={pressedStyle('R4-D')} id='R4-D' cx='42.95417' cy='7.3943181' r='2' />
        <ellipse
          className={pressedStyle('R5-D#')}
          id='R5-D#'
          cx='47.90947'
          cy='8.1278067'
          rx='0.90789258'
          ry='1.2980003'
        />
        <ellipse
          className={pressedStyle('R5-LowC#')}
          id='R5-LowC#'
          cx='50.796238'
          cy='8.4097118'
          rx='1.2811966'
          ry='0.98460585'
        />
        <ellipse
          className={pressedStyle('R5-LowC')}
          id='R5-LowC'
          cx='50.769833'
          cy='6.2520604'
          rx='1.2811966'
          ry='0.64909506'
        />
        <ellipse
          className={pressedStyle('IceLever')}
          id='IceLever'
          cx='27.800188'
          cy='10.570456'
          rx='0.68745244'
          ry='1.0236251'
        />
        <ellipse
          className={pressedStyle('DTrill')}
          id='DTrill'
          cx='33.720757'
          cy='10.86083'
          rx='0.90789258'
          ry='1.2980003'
        />
        <ellipse
          className={pressedStyle('D#Trill')}
          id='D#Trill'
          cx='39.873566'
          cy='10.86083'
          rx='0.90789258'
          ry='1.2980003'
        />
      </svg>
    </div>
  );
};
