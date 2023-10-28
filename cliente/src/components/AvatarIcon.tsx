import { Skeleton } from "src/@/components/ui/skeleton";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "src/@/components/ui/avatar";

export const AvatarIcon = ({
  image,
  fallback,
  size = 24,
  fallbackProps,
  imageProps,
  ...rest
}: React.ComponentPropsWithoutRef<typeof Avatar> & {
  image: string;
  fallback: string;
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
        <Skeleton
          className="rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      </AvatarFallback>
    </Avatar>
  );
};
