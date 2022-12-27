export default (elements: NodeListOf<HTMLElement>) => {
  const first = elements[0];
  const last = elements[elements.length - 1];

  first.focus();

  return (
    event: KeyboardEvent,
    props: { onescape: (event: KeyboardEvent) => void }
  ) => {
    if (event.key === 'Escape') props.onescape(event);
    if (event.key === 'Tab') {
      // Backwards
      if (event.shiftKey && document.activeElement === first) last.focus();
      // Forwards
      if (!event.shiftKey && document.activeElement === last) first.focus();
    }
  };
};
