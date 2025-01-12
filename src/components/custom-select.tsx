import * as React from "react";
import { Select, Label, Field } from '@headlessui/react'
import { ChangeEventHandler } from "react";

const CustomSelect: React.FC<{
  items: {label: string, value: string}[],
  name: string,
  ariaLabel?: string,
  label?: string,
  onChange: ChangeEventHandler<HTMLSelectElement>
}> = ({ items, name, ariaLabel, label, onChange }) => {

  return (
    <Field>
      {label && <Label className="data-[disabled]:opacity-50 mr-2 block">{label}</Label>}
      <Select name={name} onChange={onChange} aria-label={ariaLabel} className="rounded cursor-pointer p-2 pr-4">
        {items.map(({label, value}) => (<option value={value}>{label}</option>))}
      </Select>
    </Field>
  );
}

export default CustomSelect;