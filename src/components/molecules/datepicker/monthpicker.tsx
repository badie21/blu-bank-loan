import classNames from 'classnames';
import { FC } from 'react';

import { months } from './constants';
import styles from './datepicker.module.css';
import { convertToPersianNumbers } from './helper';

interface Props {
  currentMonth: number;
  onSelectMonth: (month: number) => void;
  locale: 'fa' | 'en';
  currentYear: number;
  onChangeYear: (offset: -1 | 1) => void;
}

const Monthpicker: FC<Props> = ({ currentMonth, locale, onSelectMonth, currentYear, onChangeYear }) => {
  const monthList = months[locale];

  return (
    <div className={styles['monthpicker__container']}>
      <div className={styles['monthpicker__header']}>
        <div onClick={() => onChangeYear(1)}>{'<'}</div>
        <div>
          <span>{convertToPersianNumbers(currentYear.toString())}</span>
        </div>
        <div onClick={() => onChangeYear(-1)}>{'>'}</div>
      </div>
      <div className={styles['monthpicker__body']}>
        {monthList.map((month, index) => (
          <div
            key={index}
            className={classNames(styles['monthpicker__month'], currentMonth === index && styles['monthpicker__month--selected'])}
            onClick={() => onSelectMonth(index)}
          >
            <span>{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Monthpicker;
