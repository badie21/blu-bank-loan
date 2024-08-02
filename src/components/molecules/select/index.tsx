import React, { useRef, useState, useEffect, FC } from 'react';

import { Input } from 'components';

type Props = {
  onChange: (value: string) => void;
  value: string;
};

const SelectInput: FC<Props> = ({ onChange, value }) => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative" ref={dropdownRef}>
      <Input value={value} onClick={toggleDropdown} />
      {isOpen && (
        <ul className="border-[1px] w-full bg-white text-black border-black absolute">
          {options.map((option) => (
            <li key={option.value} className={'p-2 hover:bg-gray-400 cursor-pointer '} onClick={() => handleOptionClick(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectInput;
