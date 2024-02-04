export default (blob: Blob) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();

  const handleResolve = () => {
    reader.removeEventListener('loadend', handleResolve);
    if (typeof reader.result !== 'string') {
      reject(new Error(`Invalid type: ${typeof reader.result}`));
    } else {
      resolve(reader.result);
    }
  };

  const handleError = (err: any) => {
    reader.removeEventListener('error', handleError);
    reject(err);
  };

  reader.addEventListener('error', handleError);
  reader.addEventListener('loadend', handleResolve);
  reader.readAsDataURL(blob);
});
