import mustache from 'mustache';

export const generate = (template: string, data: any) => {
  const html = mustache.render(template, data);
  return html;
};
