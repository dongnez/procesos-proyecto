import { HTMLMotionProps, motion } from "framer-motion";

export const PageWraper = ({
  children,
  ...rest
}: HTMLMotionProps<"div">) => {
  return (
    <motion.div
	  className="overflow-y-hidden"
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 , ease: "easeInOut"}}
	  {...rest}
	  >
      {children}
    </motion.div>
  );
};
