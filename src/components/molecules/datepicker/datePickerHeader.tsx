import classNames from 'classnames';
import React from 'react';

import { PmonthMap, monthMap } from './constants';
import styles from './datepicker.module.css';
import { convertToPersianNumbers } from './helper';
import { CalendarViews } from './interface';

interface CalendarHeaderProps {
  setMonth: (offset: 1 | -1) => void;
  year: number;
  month: number;
  doubleMonth: boolean;
  locale: 'en' | 'fa';
  onViewChange: (viewName: CalendarViews) => void;
}

const DatePickerHeader: React.FC<CalendarHeaderProps> = ({ setMonth, year, month, doubleMonth, locale, onViewChange }) => {
  const currentMonth = locale === 'fa' ? PmonthMap[month] : monthMap[month];

  const nextMonth = locale === 'fa' ? PmonthMap[month === 11 ? 0 : month + 1] : monthMap[month === 11 ? 0 : month + 1];

  return (
    <div
      className={styles['calendar__header']}
      style={{
        gap: doubleMonth ? '1rem' : 0,
        flexDirection: locale === 'fa' ? 'row' : 'row-reverse'
      }}
    >
      <div className={classNames(styles['calendar-header__previous'])} onClick={() => (locale === 'fa' ? setMonth(+1) : setMonth(-1))}>
        {'>'}
      </div>
      <div>
        <span onClick={() => onViewChange(CalendarViews.MONTH)}>{currentMonth}</span>
        <span style={{ margin: '0 .5rem' }} onClick={() => onViewChange(CalendarViews.YEAR)}>
          {convertToPersianNumbers(year.toString())}
        </span>
      </div>
      {doubleMonth && (
        <div className={styles['calendar-header__navigation']}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ marginLeft: '.5rem' }}>{month === 11 ? year + 1 : year}</span>
            <span>{nextMonth}</span>
          </div>
        </div>
      )}
      <div className={classNames(styles['calendar-header__next'])} onClick={() => (locale === 'fa' ? setMonth(-1) : setMonth(1))}>
        {'<'}
      </div>
    </div>
  );
};

export default DatePickerHeader;
