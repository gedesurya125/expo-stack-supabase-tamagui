export const convertHTMLText = (htmlText: string) => {
  const replacedPasByPTag = htmlText?.replace(/<\/p><p>/g, '\\n');

  // remove the p tag
  const removedFrontPTag = replacedPasByPTag?.replace(/<p>/g, '');
  const removedBackPTag = removedFrontPTag?.replace(/<\/p>/g, '');
  return removedBackPTag?.replace(/<br\s\/>/gi, '\n');
};
