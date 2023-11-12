import { cn } from "src/@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/@/components/ui/select";
import { HTMLAttributes } from "react";

export const SimpleSelect = ({
  placeholder,
  list,
  defaultValue,
  className,
  ...res
}: HTMLAttributes<HTMLButtonElement> & {
  list: Array<{
    name: string;
    value: string;
  }>;
  placeholder?: string;
  defaultValue?: string;
}) => {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger
        {...res}
        className={cn(`w-fit `, className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={``}>
        <SelectGroup>
          {list.map((item, index) => {
            return (
              <SelectItem
                className=""
                key={index}
                value={item.value}>
                {item.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
