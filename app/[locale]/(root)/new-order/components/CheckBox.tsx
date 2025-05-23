import { Checkbox as CheckboxPrimitive } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export function Checkbox({
  label,
  checked,
  onCheckedChange,
  id,
  className,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <CheckboxPrimitive
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary size-5"
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
