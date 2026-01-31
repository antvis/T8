import { Text } from '../src';

// Create a container
const container = document.getElementById('root');
if (!container) {
  throw new Error('Container not found');
}

// Define the T8 Syntax string from the problem statement
const syntax = `
# 2024 Smartphone Market Analysis

## Market Overview

Global [smartphone shipments](metric_name) reached [1.2 billion units](metric_value, origin=1200000000) in [2024](time_desc), showing a [modest decline of 2.1%](ratio_value, origin=-0.021, assessment="negative") year-over-year.

The **premium segment** (devices over $800) showed *remarkable* [resilience](trend_desc, assessment="positive"), growing by [5.8%](ratio_value, origin=0.058, assessment="positive"). [Average selling price](other_metric_value) was [$420](metric_value, origin=420, unit="USD").

## Key Findings

1. [Asia-Pacific](dim_value) remains the __largest market__
2. [Premium devices](dim_value) showed **strong growth**
3. Budget segment faced *headwinds*

### Asia-Pacific

[Asia-Pacific](dim_value) remains the largest market with [680 million units](metric_value, origin=680000000) shipped, though this represents a [decline of 180 million units](delta_value, origin=-180000000, assessment="negative") from the previous year.

Key markets:
- [China](dim_value): [320M units](metric_value, origin=320000000) - down [8.5%](ratio_value, origin=-0.085, assessment="negative"), [ranked 1st](rank, detail=[320, 180, 90, 65, 45]) globally, accounting for [47%](contribute_ratio, origin=0.47, assessment="positive") of regional sales
- [India](dim_value): [180M units](metric_value, origin=180000000) - up [12.3%](ratio_value, origin=0.123, assessment="positive"), [ranked 2nd](rank, detail=[320, 180, 90, 65, 45]), representing [3 out of 4](proportion, origin=0.45) of the budget segment
- [Southeast Asia](dim_value): [180M units](metric_value, origin=180000000) - [stable](trend_desc, assessment="equal")

The [gap of 140M units](difference, detail=[200, 180, 160, 140]) between [China](dim_value) and [India](dim_value) is [narrowing](trend_desc, assessment="neutral").

### Market Dynamics

Sales showed [strong correlation](association, detail=[{"x":100,"y":105},{"x":120,"y":128},{"x":150,"y":155}]) with economic indicators. The [distribution](distribution, detail=[15, 25, 35, 15, 10]) was [uneven](anomaly, detail=[15, 18, 20, 65, 22]), with [unexpected concentration](anomaly, detail=[15, 18, 20, 65, 22]) in urban areas.

We observed [clear seasonality](seasonality, detail={"data":[80, 90, 95, 135], "range":[0, 150]}) with [Q4 peaks](seasonality, detail={"data":[80, 90, 95, 135]}) driven by holiday shopping.

For detailed methodology, visit [our research page](https://example.com/methodology).
`;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Create the Text instance and use DSL
const text = new Text(container);
text.theme('light');

let count = 0;
const step = 50;
async function streamingRender() {
  while (count < syntax.length) {
    const chunk = syntax.slice(0, count + step);
    count += step;
    text.render(chunk);
    await delay(100);
  }
}

streamingRender().then(() => {
  console.log('T8 Syntax rendered successfully');
});
