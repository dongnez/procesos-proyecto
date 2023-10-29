import { useMedia } from "react-use";

export const useDeviceSm = ()=> useMedia("(max-width: 640px)");

export const useDeviceMd = () =>
  useMedia("(min-width: 640px) and (max-width: 1024px)");
export const useDeviceLg = () => useMedia("(min-width: 1024px)");
