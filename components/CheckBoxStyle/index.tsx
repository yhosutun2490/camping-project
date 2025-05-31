"use client";

type CheckboxStyleProps = {
  value: string;
  checked: boolean;
  onChange: () => void;
  label?: string;
};

export default function CheckboxStyle({
  value,
  checked,
  onChange,
  label,
}: CheckboxStyleProps) {
  const checkboxId = `checkbox-${value}`;

  return (
    <label htmlFor={checkboxId} className="flex items-center cursor-pointer select-none mr-4 mt-1">
      <input
        id={checkboxId}
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      <div
        className="w-5 h-5 rounded-sm border border-gray-400 flex items-center justify-center text-sm
        peer-checked:bg-primary-500 peer-checked:text-white"
      >
        {checked && "✓"}
      </div>
      {label && (
        <span className="ml-2 text-sm text-neutral-700">{label}</span>
      )}
    </label>
  );
}