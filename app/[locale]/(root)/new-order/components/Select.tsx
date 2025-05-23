import {
  Select as SelectPrimitive,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
export default function Select({
  items,
  value,
  onChange,
  label,
  initialValue,
}: {
  items: { name: string; id: number }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  initialValue?: string;
}) {
  return (
    <FormItem className="overflow-hidden">
      <FormLabel className="overflow-hidden">{label}*</FormLabel>
      <SelectPrimitive onValueChange={onChange} value={value}>
        <FormControl>
          <SelectTrigger
            className={
              "w-[160px] md:w-[228px] rtl:justify-end bg-customGray-400 text-black  data-[placeholder]:text-black overflow-hidden"
            }
          >
            <SelectValue placeholder={label} defaultValue={initialValue} />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="overflow-hidden">
          {items.map((item) => (
            <SelectItem
              className="rtl:flex-row-reverse"
              key={item.id}
              value={item.id.toString()}
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPrimitive>
      <FormMessage />
    </FormItem>
  );
}
