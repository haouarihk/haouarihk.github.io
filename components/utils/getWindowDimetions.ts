export default function getWindowDimensions() {
  if (typeof window === "undefined")
    return {
      width: 500,
      height: 500,
    };

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
