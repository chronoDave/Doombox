const createClickAwayListener = (
  element: Element,
  cb: (event: MouseEvent) => void,
  options?: { abortController: AbortController }
) => {
  const controller = options?.abortController ?? new AbortController();

  document.addEventListener('click', event => {
    if (!element.contains((event.target as Element))) {
      cb(event);
      controller.abort();
    }
  }, { signal: controller.signal });

  return controller.abort;
};

export default createClickAwayListener;
