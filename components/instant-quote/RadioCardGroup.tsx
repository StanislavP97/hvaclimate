interface RadioCardOption<T extends string> {
  value: T;
  label: string;
}

interface RadioCardGroupProps<T extends string> {
  name: string;
  options: RadioCardOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function RadioCardGroup<T extends string>({
  name,
  options,
  value,
  onChange,
}: RadioCardGroupProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const checked = option.value === value;
        return (
          <label
            key={option.value}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
              checked
                ? "border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB] font-medium"
                : "border-[#e6ebf1] text-[#374151] hover:border-[#2563EB]/50"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={checked}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
