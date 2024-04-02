export const convertHTMLText = (htmlText: string) => {
  return htmlText?.replace(/<br\s\/>/gi, '\n');
};
