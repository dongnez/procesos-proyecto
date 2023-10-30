import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "src/@/components/ui/avatar";
import { User2 } from "lucide-react";

export const UserIcon = ({
  image,
  size = 24,
  fallbackProps,
  imageProps,
  ...rest
}: React.ComponentPropsWithoutRef<typeof Avatar> & {
  image: string;
  size?: number;
  imageProps?: React.ComponentPropsWithoutRef<typeof AvatarImage>;
  fallbackProps?: React.ComponentPropsWithoutRef<typeof AvatarFallback>;
}) => {
  return (
    <Avatar
      {...rest}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}>
      <AvatarImage {...imageProps} src={image} />

      <AvatarFallback {...fallbackProps}>
	  	<User2 size={size / 2} />
      </AvatarFallback>
    </Avatar>
  );
};