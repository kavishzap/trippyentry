import Choices from 'choices.js';
import { type Options as ChoiceOption } from 'choices.js';
import { type ReactElement, useEffect, useRef } from 'react';

export type ChoiceProp = Partial<ChoiceOption> & {
  children: ReactElement[];
  multiple?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
};

const SelectFormInput = ({
  children,
  multiple,
  className,
  onChange,
  value,
  ...choiceOptions
}: ChoiceProp) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (selectRef.current) {
      const choices = new Choices(selectRef.current, {
        ...choiceOptions,
        allowHTML: true,
        shouldSort: false,
      });

      choices.passedElement.element.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLSelectElement;
        if (onChange) {
          onChange(target.value);
        }
      });

      // Sync initial value
      if (value) {
        choices.setChoiceByValue(value);
      }

      return () => {
        choices.destroy();
      };
    }
  }, [value, onChange]);

  return (
    <select
      ref={selectRef}
      multiple={multiple}
      className={className}
      defaultValue={value} // <- use defaultValue instead of value to prevent read-only issue
    >
      {children}
    </select>
  );
};

export default SelectFormInput;
