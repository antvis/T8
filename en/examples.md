---
url: /en/examples.md
---

# Interactive Examples

Explore comprehensive examples of T8 features and capabilities. Each example demonstrates different aspects of T8's text visualization power and includes the full T8 Syntax source code.

## Example: 2024 Smartphone Market Analysis

This comprehensive example showcases T8's capabilities for rendering data-driven narrative text with rich entity annotations and inline visualizations. The example includes:

* Multiple entity types (metrics, dimensions, trends, ratios, etc.)
* Inline mini-charts (distributions, correlations, seasonality)
* Complex data relationships (rankings, proportions, comparisons)
* Structured markdown with sections and subsections

### Streaming Render

Watch the content render incrementally, simulating real-time data streaming or AI-generated content. Perfect for scenarios where data arrives progressively.

### Dark Theme with Custom Settings

The same content rendered with a dark theme and custom typography settings (12px font size, 20px line height).

### Custom Plugin - Styled Dimension Values

This example demonstrates how to customize entity rendering using plugins. Here, dimension values (like country/region names) are styled with custom colors and fonts.

## Understanding T8 Syntax

The examples above use **T8 Syntax** - a markdown-based declarative language for narrative text visualization. Key features demonstrated:

### Entity Annotations

Entities are marked using bracket notation: `[text](entity_type, properties)`

* `[smartphone shipments](metric_name)` - Metric names
* `[1.2 billion units](metric_value, origin=1200000000)` - Metric values with raw data
* `[2024](time_desc)` - Time descriptions
* `[modest decline of 2.1%](ratio_value, origin=-0.021, assessment="negative")` - Ratios with sentiment
* `[Asia-Pacific](dim_value)` - Dimension values (categories, regions, etc.)
* `[resilience](trend_desc, assessment="positive")` - Trend descriptions
* `[ranked 1st](rank, detail=[320, 180, 90, 65, 45])` - Rankings with data

### Inline Visualizations

* `[distribution](distribution, detail=[15, 25, 35, 15, 10])` - Mini bar charts
* `[strong correlation](association, detail=[...])` - Scatter plots
* `[clear seasonality](seasonality, detail={...})` - Line charts
* `[gap of 140M units](difference, detail=[200, 180, 160, 140])` - Difference indicators

### Markdown Formatting

Standard markdown syntax is supported:

* `**bold**` for emphasis
* `*italic*` for subtle emphasis
* `__underline__` for highlighting
* Headers (`#`, `##`, `###`) for structure
* Lists (numbered and bulleted)
* Links

Learn more in the [T8 Syntax Documentation](/en/syntax/).
