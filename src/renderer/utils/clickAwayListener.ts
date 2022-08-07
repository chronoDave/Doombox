export default (selector: string, cb: () => void) => {
  const handleClick = (event: MouseEvent) => {
    const target = (event.target as HTMLElement);
    if (!target.closest(selector)) {
      cb();
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
};
