import { select } from 'd3-selection';

const BG_COLOR = '#CDDDFD';
const VALUE_COLOR = '#3471F9';

function getArcPath({ cx, cy, r, angle }: { cx: number; cy: number; r: number; angle: number }) {
  const dx = cx + r * Math.sin(angle);
  const dy = cy - r * Math.cos(angle);
  return `
  M${cx} ${0}
  A ${cx} ${cy} 0 ${angle > Math.PI ? 1 : 0} 1 ${dx} ${dy}
  L ${cx} ${cy} Z
  `;
}

export function drawPie(container: HTMLSpanElement, data: number, d: number) {
  const cx = d / 2;
  const cy = d / 2;
  const r = d / 2;

  const pieSvg = select(container)
    .append('svg')
    .attr('width', d)
    .attr('height', d)
    .style('margin', '0 4px')
    // make text and svg alignment
    .style('transform', 'translate(0, 0.125em)');

  // create circle
  pieSvg.append('circle').attr('cx', cx).attr('cy', cy).attr('r', r).attr('fill', BG_COLOR);

  // create arc
  if (data >= 1) {
    pieSvg.append('circle').attr('cx', cx).attr('cy', cy).attr('r', r).attr('fill', VALUE_COLOR);
  } else if (data > 0) {
    const angle = data * 2 * Math.PI;
    pieSvg.append('path').attr('d', getArcPath({ cx, cy, r, angle })).attr('fill', VALUE_COLOR);
  }

  return pieSvg;
}
