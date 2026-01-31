---
url: /zh/syntax.md
---

# T8 语法

## 概述

T8 语法是一种类 Markdown 的标记语言，用于创建富文本叙事可视化。它在标准 Markdown 基础上扩展了数据实体的特殊标注，使得在文本中突出显示指标、趋势和洞察变得简单。

## 为什么使用 T8 语法？

T8 语法的设计目标：

* **人类可读**：基于 Markdown，熟悉且易于学习
* **AI 友好**：可以通过简单的提示词轻松被 AI 模型生成
* **数据感知**：内置支持指标值、百分比、趋势等数据实体
* **可扩展**：支持自定义短语和区块

## 基本语法

T8 语法使用标准 Markdown 来组织结构，并使用以下格式添加特殊的实体标注：

```
[显示文本](实体类型, 属性=值, ...)
```

### 示例

```markdown
# 销售报告

总销售额达到 [¥1,234,567](metric_value, origin=1234567)。

华东地区贡献 [¥800,000](metric_value)，
占比 [64.8%](contribute_ratio, assessment="positive")。
```

## 核心组成

T8 语法按照以下层级结构组织：

1. **文档**
   * 整个叙事文本的顶层容器
   * 可以包含标题和多个段落区块
   * 支持全局样式配置

2. **段落区块 (Section)**
   * 将相关段落组织在一起
   * 支持标准段落和自定义区块
   * 可以根据不同展示需求进行扩展

3. **段落 (Paragraph)**
   * 支持多种类型：标题（# 到 ######）、文本、列表
   * 标准 Markdown 段落语法
   * 可以通过自定义类型扩展

4. **短语与实体**
   * 文本的最小单位
   * 纯文本或标注的实体
   * 实体包括指标、维度、趋势等

## 实体类型

T8 的强大之处在于其丰富的实体类型集，这超越了标准 Markdown 的能力。这些实体使您能够在叙述文本中语义化地标记数据，提供视觉强调和交互功能。

### 核心指标实体

#### `metric_name`

**介绍**：标识正在讨论的指标的名称或标签。

**使用场景**：

* 介绍关键绩效指标（KPI）
* 在解释性文本中标注指标
* 创建术语表式定义

**示例**：

```markdown
[日活跃用户数](metric_name)本季度显著增长。
```

#### `metric_value`

**介绍**：表示指标的数值，支持格式化和原始数据。

**使用场景**：

* 显示 KPI 值
* 展示测量结果
* 呈现统计数据

**属性**：

* `origin`：原始数值（用于计算）
* `unit`：可选的度量单位

**示例**：

```markdown
总收入达到 [¥1,234,567](metric_value, origin=1234567)。
销售量为 [12亿台](metric_value, origin=1200000000)。
```

#### `other_metric_value`

**介绍**：用于次要或辅助指标值，不是主要关注点。

**使用场景**：

* 支持性统计数据
* 上下文指标
* 比较基准

**示例**：

```markdown
[平均订单价值](other_metric_value)为 [¥125](metric_value, origin=125)。
```

### 变化与趋势实体

#### `delta_value`

**介绍**：表示指标值的绝对变化，带有正负评估。

**使用场景**：

* 显示绝对增长或减少
* 同比比较
* 连续期间变化

**属性**：

* `origin`：数值变化量
* `assessment`："positive"、"negative" 或 "equal"

**示例**：

```markdown
销售额增长了 [¥180,000](delta_value, origin=180000, assessment="positive")。
收入下降了 [¥50,000](delta_value, origin=-50000, assessment="negative")。
```

#### `ratio_value`

**介绍**：表示百分比变化或增长率。

**使用场景**：

* 增长率
* 百分比变化
* 环比同比分析

**属性**：

* `origin`：十进制比率（如 0.15 表示 15%）
* `assessment`：方向评估

**示例**：

```markdown
收入增长了 [15%](ratio_value, origin=0.15, assessment="positive")。
销售额同比下降 [3.2%](ratio_value, origin=-0.032, assessment="negative")。
```

#### `contribute_ratio`

**介绍**：表示部分对整体的贡献百分比。

**使用场景**：

* 市场份额
* 贡献度分析
* 组成分解

**属性**：

* `origin`：十进制比率
* `assessment`：贡献度评估

**示例**：

```markdown
华东地区占总销售额的 [64.8%](contribute_ratio, origin=0.648, assessment="positive")。
```

#### `proportion`

**介绍**：表示部分与整体的比率或分数。

**使用场景**：

* 显示分数
* 人口分布
* 细分数据

**属性**：

* `origin`：十进制比例

**示例**：

```markdown
[四分之三](proportion, origin=0.75)的客户偏好在线购物。
```

#### `trend_desc`

**介绍**：趋势或方向的定性描述。

**使用场景**：

* 描述运动模式
* 趋势特征
* 定性评估

**属性**：

* `assessment`：趋势方向的评估

**示例**：

```markdown
市场呈现[强劲增长](trend_desc, assessment="positive")态势。
价格保持[稳定](trend_desc, assessment="equal")。
```

### 维度实体

#### `dim_value`

**介绍**：表示维度值，如类别、地区、产品或细分市场。

**使用场景**：

* 地理区域
* 产品类别
* 客户细分
* 时间段

**示例**：

```markdown
[亚太地区](dim_value)仍是最大市场。
[高端设备](dim_value)表现出强劲增长。
```

#### `time_desc`

**介绍**：时间引用和时间段描述。

**使用场景**：

* 日期引用
* 时间段标签
* 时间比较

**示例**：

```markdown
在 [2024年](time_desc)，全球出货量创新高。
[2023年第四季度](time_desc)的结果超出预期。
```

### 高级分析实体

#### `rank`

**介绍**：表示排名位置，可选详细排名数据。

**使用场景**：

* 竞争排名
* 最佳/最差表现者
* 排序列表

**属性**：

* `detail`：用于可视化的值数组

**示例**：

```markdown
中国在全球[排名第一](rank, detail=[320, 180, 90, 65, 45])。
```

#### `difference`

**介绍**：突出显示值之间的差距或差异。

**使用场景**：

* 比较分析
* 差距分析
* 距离度量

**属性**：

* `detail`：显示进展的数组

**示例**：

```markdown
[1.4亿台的差距](difference, detail=[200, 180, 160, 140])正在缩小。
```

#### `anomaly`

**介绍**：标记数据中的异常模式或离群值。

**使用场景**：

* 离群值检测
* 异常模式
* 数据质量问题

**属性**：

* `detail`：显示异常的数据

**示例**：

```markdown
我们检测到城市地区的[异常集中](anomaly, detail=[15, 18, 20, 65, 22])。
```

#### `association`

**介绍**：描述变量之间的相关性或关系。

**使用场景**：

* 相关性分析
* 因果关系
* 依赖模式

**属性**：

* `detail`：显示关联的数据点

**示例**：

```markdown
销售额与营销支出呈现[强相关性](association, detail=[{"x":100,"y":105},{"x":120,"y":128}])。
```

#### `distribution`

**介绍**：表示数据如何在类别或范围内分布。

**使用场景**：

* 频率分布
* 类别分解
* 范围分析

**属性**：

* `detail`：分布值数组

**示例**：

```markdown
[分布](distribution, detail=[15, 25, 35, 15, 10])呈现正常特征。
```

#### `seasonality`

**介绍**：表示数据中的周期性或季节性模式。

**使用场景**：

* 季节性趋势
* 周期性模式
* 定期变化

**属性**：

* `detail`：包含数据和可选范围的对象

**示例**：

```markdown
我们观察到第四季度达到峰值的[明显季节性](seasonality, detail={"data":[80, 90, 95, 135], "range":[0, 150]})。
```

## 完整示例

以下是使用多种实体类型的综合示例：

```markdown
# 第四季度销售报告

## 概述

在 [2024年第四季度](time_desc)，[总收入](metric_name)达到 
[¥520万](metric_value, origin=5200000)，相比第三季度增长了 
[¥80万](delta_value, origin=800000, assessment="positive")，
增长率为 [18%](ratio_value, origin=0.18, assessment="positive")。

## 各地区表现

[北美地区](dim_value)以 [¥210万](metric_value, origin=2100000)领先，
占总收入的 [40%](contribute_ratio, origin=0.40, assessment="positive")。
该地区在所有市场中[排名第一](rank, detail=[2100000, 1800000, 1300000])。

[欧洲](dim_value)呈现[强劲势头](trend_desc, assessment="positive")，
[近一半](proportion, origin=0.48)的销售额来自新客户。
```

技术实现细节请参阅 [短语与实体](./types/phrase.md)。

## 详细文档

* [结构](./structure.md) - 了解整体语法结构
* 元素
  * [文档](./types/narrative-text.md) - 顶层文档结构
  * [段落区块](./types/section.md) - 段落区块
  * [段落](./types/paragraph.md) - 段落类型
  * [短语与实体](./types/phrase.md) - 文本和实体标注
