const getAnchors = (pagePrefix: string, titles: string[]) =>
  titles.map((title) => ({
    title,
    id: `${pagePrefix}-${title.replaceAll(' ', '-')}`,
    href: `#${pagePrefix}-${title.replaceAll(' ', '-')}`,
  }));

export default getAnchors;
