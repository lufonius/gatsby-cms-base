import * as React from "react";
import { Select as HeadlessUiSelect, Label, Field } from '@headlessui/react'
import { ChangeEventHandler } from "react";
import { twMerge } from "tailwind-merge";

const Select: React.FC<{
  items: {label: string, value: string}[],
  name: string,
  ariaLabel?: string,
  label?: string,
  className?: string,
  onChange: ChangeEventHandler<HTMLSelectElement>
}> = ({ items, name, ariaLabel, label, onChange, className }) => {

  return (
    <Field>
      {label && <Label className="data-[disabled]:opacity-50 mr-2 block">{label}</Label>}
      <HeadlessUiSelect name={name} onChange={onChange} aria-label={ariaLabel} className={twMerge("rounded cursor-pointer p-2 pr-4", className)}>
        {items.map(({label, value}) => (<option key={value} value={value}>{label}</option>))}
      </HeadlessUiSelect>
    </Field>
  );
}

export default Select;