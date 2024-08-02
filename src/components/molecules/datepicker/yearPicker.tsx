import classNames from 'classnames';
import { FC, useMemo, useState } from 'react';

import styles from './datepicker.module.css';
import { convertToPersianNumbers } from './helper';

interface Props {
  currentYear: number;
  onSelectYear: (year: number) => void;
}

const YearPicker: FC<Props> = ({ currentYear, onSelectYear }) => {
  const [page, setPage] = useState(0);

  const yearList = useMemo(() => {
    const firstYear = currentYear + page * 20;

    const yearArray = [];

    for (let i = 0; i < 20; i++) {
      yearArray.push(firstYear - i);
    }

    return yearArray;
  }, [page]);

  const changePageHandler = (offset: -1 | 1) => {
    setPage((prev) => prev + offset);
  };

  const selectYearHandler = (year: number) => {
    onSelectYear(year);
  };

  return (
    <div className={styles['yearpicker__container']}>
      <div className={styles['yearpicker__header']}>
        <div className={styles['yearpicker__header--next']} onClick={() => changePageHandler(1)}>
          {'<'}
        </div>
        <div>
          <span>{`${convertToPersianNumbers(yearList[0].toString())} - ${convertToPersianNumbers(
            yearList[yearList.length - 1].toString()
          )}`}</span>
        </div>
        <div className={styles['yearpicker__header--previous']} onClick={() => changePageHandler(-1)}>
          {'>'}
        </div>
      </div>
      <div className={styles['yearpicker__body']}>
        {yearList.map((year) => (
          <div
            key={year}
            className={classNames(styles['yearpicker__year'], year === currentYear && styles['yearpicker__year--selected'])}
            onClick={() => selectYearHandler(year)}
          >
            <span>{convertToPersianNumbers(year.toString())}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearPicker;
