'use client';

import classNames from 'classnames';
import React, { useRef, useState, useEffect, FC, useMemo } from 'react';

import { Input, Label } from 'components';

type Props = {
  onChange: (value: string) => void;
  value: string;
  label?: string;
  options?: { value: string; label: string }[];
  error?: string;
};

const SelectInput: FC<Props> = ({ onChange, value, label, options, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasError = Boolean(error);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const inputValue = useMemo(() => {
    const selectedOption = options?.find((option) => option.value === value);

    if (!selectedOption) return '';

    return selectedOption.label;
  }, [value, options]);

  return (
    <Label label={label}>
      <div className="relative" ref={dropdownRef}>
        <Input value={inputValue} className={classNames(hasError && 'border-red-700', 'w-full')} onClick={toggleDropdown} />
        {hasError && <p className={'text-red-700'}>{error}</p>}
        {isOpen && (
          <ul className="border-[1px] w-full bg-white text-black border-black absolute">
            {options?.map((option) => (
              <li key={option.value} className={'p-2 hover:bg-gray-400 cursor-pointer '} onClick={() => handleOptionClick(option.value)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Label>
  );
};

export default SelectInput;
