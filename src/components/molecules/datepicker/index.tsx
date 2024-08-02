'use client';
import classNames from 'classnames';
import { useState, useEffect, FC, ReactNode } from 'react';
import { usePopper } from 'react-popper';

import Calendar from './Calendar';

interface Props {
  onChange: (value: { from?: Date | undefined; to?: Date | undefined }) => void;
  value?: { from?: Date | number; to?: Date | number };
  inputClassName?: string;
  type?: 'range' | 'single';
  mode?: 'modal' | 'dropdown';
  doubleMonth?: boolean;
  disablePreviousDays?: boolean;
  renderDayFn?: (day: { timestamp: number; currentMonth: boolean }, index: number) => ReactNode;
  label?: string;
}

const DatePicker: FC<Props> = ({
  onChange,
  value,
  inputClassName,
  mode = 'dropdown',
  type = 'single',
  doubleMonth = false,
  disablePreviousDays = false,
  renderDayFn,
  label
}) => {
  const [date, setDate] = useState<{ from: null | number; to: null | number }>({
    from: value?.from ? new Date(value.from).setHours(0, 0, 0, 0) : null,
    to: value?.to ? new Date(value.to).setHours(0, 0, 0, 0) : null
  });

  const [visible, setVisible] = useState(false);

  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const [confirmed, setConfirmed] = useState({ state: false });

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    strategy: 'absolute',
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top'],
          allowedAutoPlacements: ['top', 'bottom'] // by default, all the placements are allowed
        }
      },
      {
        name: 'offset',
        options: {
          offset: [0, 10]
        }
      }
    ]
  });

  useEffect(() => {
    if (mode === 'modal') return;

    const clickOutsideHandler = (e: globalThis.MouseEvent) => {
      if (!referenceElement?.contains(e.target as Node)) {
        setConfirmed({ state: false });
      }
    };

    if (!referenceElement) return;

    document.addEventListener('mousedown', clickOutsideHandler);

    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, [mode, referenceElement]);

  const converDate = (timestamp: number | Date) => {
    return new Date(timestamp).toLocaleDateString('fa', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const submitDateHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!date.from) return;
    if (type === 'range' && !date.to) return;

    setConfirmed({ state: true });
  };

  useEffect(() => {
    if (!visible) return;
    if (!confirmed.state) {
      setDate({ from: null, to: null });
      onChange({ from: undefined, to: undefined });
    } else if (confirmed.state && date.from) {
      const startDate = new Date(date.from);

      const endDate = date.to ? new Date(date.to) : undefined;

      onChange({ from: startDate, to: endDate });
    }
    setVisible(false);
  }, [confirmed]);

  const startDate = value?.from ? converDate(value?.from) : '';

  const toDate = date.to ? converDate(date.to) : '';

  return (
    <div
      className={classNames(
        'w-full h-[52px] border-black bg-white text-black border-[1px] rounded-lg p-4 relative',
        visible && 'border-primary-1',
        inputClassName
      )}
      onClick={() => setVisible(true)}
      ref={setReferenceElement}
    >
      {label ? (
        <span
          className={classNames(
            'absolute text-xs px-1 transition-all duration-200 top-[1rem]',
            (visible || value?.from) && '!-top-[.8rem] bg-white text-primary-1',
            !visible && '!text-black'
          )}
        >
          {label}
        </span>
      ) : (
        ''
      )}
      <div className="absolute left-2">
        <i className="fi fi-rr-calendar"></i>
      </div>
      <span className="text-sm">{startDate}</span>
      {type === 'range' && date.to && (
        <>
          <span className="mx-4">-</span>
          <span className="text-sm">{toDate}</span>
        </>
      )}
      {visible && mode === 'dropdown' ? (
        <div
          ref={setPopperElement}
          {...attributes.popper}
          style={{ ...styles.popper }}
          className={classNames(
            'flex px-9 py-6 border-2 border-primary-1 rounded-lg flex-col justify-center items-center bg-white z-40 md:min-w-[375px]'
          )}
        >
          <Calendar
            onChange={(from, to) => {
              setDate({ from, to });
            }}
            startDate={date.from}
            endDate={date.to}
            locale="fa"
            disablePreviousDays={disablePreviousDays}
            type={type}
            doubleMonth={doubleMonth}
            renderDayFn={renderDayFn}
          />
          <button
            className="mt-auto bg-blue-600  text-white h-12 w-full"
            // block
            onClick={submitDateHandler}
            disabled={(type === 'range' && (!date.from || !date.to)) || (type === 'single' && !date.from)}
          >
            ثبت
          </button>
        </div>
      ) : visible && mode === 'modal' ? (
        <div className="flex flex-col items-center fixed top-0 right-0 left-0 bottom-0 bg-white p-6 z-40">
          <button
            style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)' }}
            className="rounded-[10px] w-8 h-8 flex justify-center items-center absolute top-6 right-6"
            // icon={<i className="fi fi-rr-arrow-right text-black"></i>}
            onClick={(e) => {
              e.stopPropagation();
              setVisible(false);
            }}
          />
          <Calendar
            onChange={(from, to) => {
              setDate({ from, to });
            }}
            startDate={date.from}
            endDate={date.to}
            containerClassName="mt-24"
            locale="fa"
            disablePreviousDays={disablePreviousDays}
            type={type}
            doubleMonth={doubleMonth}
            renderDayFn={renderDayFn}
          />
          <button
            className="mt-auto bg-primary-1 text-white h-12"
            // block
            onClick={submitDateHandler}
            disabled={(type === 'range' && (!date.from || !date.to)) || (type === 'single' && !date.from)}
          >
            ثبت
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DatePicker;
