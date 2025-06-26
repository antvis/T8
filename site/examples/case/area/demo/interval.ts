/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/geo_choropleth.html
 */

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/us-10m.json').then((res) => res.json()),
  fetch('https://assets.antv.antgroup.com/g2/unemployment2.json').then((res) => res.json()),
]).then(() => {
  // 测试报错之后，切换 tab 是否正常
  throw new Error('');
});
