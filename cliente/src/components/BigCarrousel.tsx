
import { HTMLAttributes } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "src/@/components/ui/carousel"
import { cn } from "src/@/lib/utils"

export function BigCarrousel({items,className,...rest}:HTMLAttributes<HTMLDivElement> & {
	items: React.ReactNode[]
}) {
  return (
    <Carousel
		{...rest}
      opts={{
        align: "start",
      }}
      className={cn("w-full max-w-[80%]",className)}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className=" md:basis-1/1 lg:basis-1/2 xl:basis-1/3">
			{item}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
