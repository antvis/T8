import { Text } from '../src';

// Create a container
const container = document.getElementById('root');
if (!container) {
  throw new Error('Container not found');
}

// Define the DSL string from the problem statement
const dsl = `
# 2026年第一季度销售报告

本季度总销售额为 [¥1,234,567](metric_value, origin=1234567, unit="元")，表现出色。

## 各地区表现

华东地区贡献最大，销售额为 [¥800,000](metric_value)，占比 [64.8%](contribute_ratio, assessment="positive")。

华南地区紧随其后，但环比 [下降了 5%](ratio_value, assessment="negative")。
`;

// Create the Text instance and use DSL
const text = new Text(container);
text.dsl(dsl).theme('light').render();

console.log('DSL rendered successfully');
