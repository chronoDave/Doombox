export default (element: Element, cb: (event: MouseEvent) => void) => {
  const handleClick = (event: MouseEvent) => {
    if (!element.contains((event.target as Element))) {
      cb(event);
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);

  return () => document.removeEventListener('click', handleClick);
};
