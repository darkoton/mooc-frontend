export function getWidthWithMargin(el: HTMLElement) {
  const style = getComputedStyle(el);
  const width = el.offsetWidth;
  const marginLeft = parseFloat(style.marginLeft);
  const marginRight = parseFloat(style.marginRight);
  return width + marginLeft + marginRight;
}
