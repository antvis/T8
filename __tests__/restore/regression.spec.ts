import { describe, it, expect } from 'vitest';
import { restore } from '../../src/utils/schema-simplified';
import { NarrativeTextSpec } from '../../src/schema/structure';
import { ParagraphSpec, BulletsParagraphSpec, BulletItemSpec } from '../../src/schema/paragraph';
import { EntityPhraseSpec, PhraseSpec } from '../../src/schema/phrase';

describe('restore - 回归测试', () => {
  describe('实体类型解码修复 (Issue: et 数字未正确解码)', () => {
    it('应该正确解码所有实体类型 (20-29)', () => {
      const compressedData = {
        h: { t: 30, p: { dt: 1, i: [{ v: '测试标题' }] } },
        s: [
          {
            pa: {
              dt: 10,
              i: [
                {
                  p: {
                    dt: 1,
                    i: [
                      { v: '普通文本 ' },
                      { t: 2, v: '指标名', m: { et: 20 } }, // metric_name
                      { t: 2, v: '主指标值', m: { et: 21 } }, // metric_value
                      { t: 2, v: '其他指标值', m: { et: 22 } }, // other_metric_value
                      { t: 2, v: '贡献度', m: { et: 23 } }, // contribute_ratio
                      { t: 2, v: '变化值', m: { et: 24 } }, // delta_value
                      { t: 2, v: '变化率', m: { et: 25 } }, // ratio_value
                      { t: 2, v: '趋势描述', m: { et: 26 } }, // trend_desc
                      { t: 2, v: '维值', m: { et: 27 } }, // dim_value
                      { t: 2, v: '时间值', m: { et: 28 } }, // time_desc
                      { t: 2, v: '占比', m: { et: 29 } }, // proportion
                    ],
                  },
                },
              ],
            },
          },
        ],
      };

      const restored = restore(compressedData) as NarrativeTextSpec;
      const paragraph = restored.sections![0].paragraphs![0] as ParagraphSpec & { phrases: PhraseSpec[] };
      const phrases = paragraph.phrases;

      // 验证实体类型解码
      const expectedMappings = [
        { index: 1, value: '指标名', entityType: 'metric_name' },
        { index: 2, value: '主指标值', entityType: 'metric_value' },
        { index: 3, value: '其他指标值', entityType: 'other_metric_value' },
        { index: 4, value: '贡献度', entityType: 'contribute_ratio' },
        { index: 5, value: '变化值', entityType: 'delta_value' },
        { index: 6, value: '变化率', entityType: 'ratio_value' },
        { index: 7, value: '趋势描述', entityType: 'trend_desc' },
        { index: 8, value: '维值', entityType: 'dim_value' },
        { index: 9, value: '时间值', entityType: 'time_desc' },
        { index: 10, value: '占比', entityType: 'proportion' },
      ];

      expectedMappings.forEach(({ index, value, entityType }) => {
        const phrase = phrases[index] as EntityPhraseSpec;
        expect(phrase.type).toBe('entity');
        expect(phrase.value).toBe(value);
        expect(phrase.metadata.entityType).toBe(entityType);
      });
    });

    it('应该正确处理带有 origin 和 assessment 的实体', () => {
      const compressedData = {
        h: { t: 30, p: { dt: 1, i: [{ v: '测试' }] } },
        s: [
          {
            pa: {
              dt: 10,
              i: [
                {
                  p: { dt: 1, i: [{ t: 2, v: '五十多种', m: { et: 22, o: '50', a: 'p' } }] },
                },
              ],
            },
          },
        ],
      };

      const restored = restore(compressedData) as NarrativeTextSpec;
      const paragraph = restored.sections![0].paragraphs![0] as ParagraphSpec & { phrases: PhraseSpec[] };
      const phrase = paragraph.phrases[0] as EntityPhraseSpec;

      expect(phrase.type).toBe('entity');
      expect(phrase.value).toBe('五十多种');
      expect(phrase.metadata.entityType).toBe('other_metric_value');
      expect(phrase.metadata.origin).toBe(50); // 字符串数字应该转换为数字
      expect(phrase.metadata.assessment).toBe('positive'); // 'p' 应该解码为 'positive'
    });
  });

  describe('非压缩段落数组处理修复 (Issue: pa 数组中的 bullets 段落丢失)', () => {
    it('应该正确处理非压缩的段落数组 pa: [...]', () => {
      // 这是 test_json8.json 中的实际结构格式
      const compressedData = {
        h: { t: 30, p: { dt: 1, i: [{ v: 'ECharts 测试' }] } },
        s: [
          {
            pa: [
              // 注意：这里是数组，不是 { dt: ..., i: [...] } 格式
              {
                // 第一个段落：heading2
                p: { dt: 1, i: [{ v: 'ECharts 的核心优势' }] },
                t: 13,
              },
              {
                // 第二个段落：bullets (只有 b 键，没有其他属性)
                b: {
                  dt: 32,
                  i: [
                    {
                      p: { dt: 1, i: [{ v: '丰富的 ' }, { t: 2, v: '图表类型', m: { et: 20 } }, { v: '测试文本' }] },
                    },
                    {
                      p: { dt: 1, i: [{ v: '出色的 ' }, { t: 2, v: '性能', m: { et: 20 } }] },
                    },
                  ],
                  io: false,
                  t: 11,
                },
              },
            ],
          },
        ],
      };

      const restored = restore(compressedData) as NarrativeTextSpec;
      const section = restored.sections![0];

      // 验证段落数量
      expect(section.paragraphs).toBeDefined();
      expect((section.paragraphs as ParagraphSpec[]).length).toBe(2);

      // 验证第一个段落 (heading2)
      const heading = (section.paragraphs as ParagraphSpec[])[0] as ParagraphSpec & { phrases: PhraseSpec[] };
      expect(heading.type).toBe('heading2');
      expect(heading.phrases).toBeDefined();
      expect(heading.phrases.length).toBe(1);
      expect(heading.phrases[0].value).toBe('ECharts 的核心优势');

      // 验证第二个段落 (bullets)
      const bulletsData = (section.paragraphs as ParagraphSpec[])[1] as BulletsParagraphSpec;
      expect(bulletsData.type).toBe('bullets');
      expect(bulletsData.isOrder).toBe(false);
      expect(bulletsData.bullets).toBeDefined();
      expect(bulletsData.bullets.length).toBe(2);

      // 验证第一个 bullet-item
      const firstBullet = bulletsData.bullets[0] as BulletItemSpec & { phrases: PhraseSpec[] };
      expect(firstBullet.type).toBe('bullet-item');
      expect(firstBullet.phrases.length).toBe(3);
      expect(firstBullet.phrases[0].value).toBe('丰富的 ');
      expect(firstBullet.phrases[1].value).toBe('图表类型');
      expect((firstBullet.phrases[1] as EntityPhraseSpec).metadata.entityType).toBe('metric_name');
      expect(firstBullet.phrases[2].value).toBe('测试文本');

      // 验证第二个 bullet-item
      const secondBullet = bulletsData.bullets[1] as BulletItemSpec & { phrases: PhraseSpec[] };
      expect(secondBullet.type).toBe('bullet-item');
      expect(secondBullet.phrases.length).toBe(2);
      expect(secondBullet.phrases[0].value).toBe('出色的 ');
      expect(secondBullet.phrases[1].value).toBe('性能');
      expect((secondBullet.phrases[1] as EntityPhraseSpec).metadata.entityType).toBe('metric_name');
    });

    it('应该避免错误的 bullets 嵌套结构', () => {
      const compressedData = {
        h: { t: 30, p: { dt: 1, i: [{ v: '测试' }] } },
        s: [
          {
            pa: [
              {
                b: {
                  dt: 32,
                  i: [{ p: { dt: 1, i: [{ v: '测试内容' }] } }],
                  io: false,
                  t: 11,
                },
              },
            ],
          },
        ],
      };

      const restored = restore(compressedData) as NarrativeTextSpec;
      const bulletsData = restored.sections![0].paragraphs![0] as BulletsParagraphSpec;

      // 确保结构是正确的：{ type: 'bullets', isOrder: false, bullets: [...] }
      // 而不是错误的：{ bullets: { type: 'bullets', isOrder: false, bullets: [...] } }
      expect(bulletsData.type).toBe('bullets');
      expect(bulletsData.isOrder).toBe(false);
      expect(bulletsData.bullets).toBeDefined();
      expect(Array.isArray(bulletsData.bullets)).toBe(true);

      // 确保没有错误的嵌套 bullets 属性
      expect('bullets' in bulletsData.bullets).toBe(false);
    });
  });

  describe('综合回归测试 (基于 test_json8.json 的实际场景)', () => {
    it('应该完整还原包含复杂嵌套结构的文档', () => {
      // 模拟 test_json8.json 中问题区域的简化版本
      const compressedData = {
        h: {
          p: { dt: 1, i: [{ v: 'Apache ECharts：强大的数据可视化利器' }] },
          t: 30,
        },
        s: [
          {
            pa: { dt: 10, i: [{ p: { dt: 1, i: [{ v: '第一节内容' }] } }] },
          },
          {
            pa: [
              {
                p: { dt: 1, i: [{ t: 1, v: 'ECharts 的核心优势' }] },
                t: 13,
              },
              {
                b: {
                  dt: 32,
                  i: [
                    {
                      p: {
                        dt: 1,
                        i: [
                          { v: '丰富的 ' },
                          { t: 2, v: '图表类型', m: { et: 20 } },
                          { v: '：支持包括 ' },
                          { t: 2, v: '折线图', m: { et: 27 } },
                          { v: '在内的 ' },
                          { t: 2, v: '五十多种', m: { et: 22, o: '50', a: 'p' } },
                          { v: ' 图表。' },
                        ],
                      },
                    },
                  ],
                  io: false,
                  t: 11,
                },
              },
            ],
          },
        ],
      };

      const restored = restore(compressedData) as NarrativeTextSpec;

      // 验证标题
      expect(restored.headline).toBeDefined();
      expect(restored.headline!.phrases[0].value).toBe('Apache ECharts：强大的数据可视化利器');

      // 验证第一个 section (压缩格式)
      expect((restored.sections![0].paragraphs as ParagraphSpec[]).length).toBe(1);
      expect((restored.sections![0].paragraphs as ParagraphSpec[])[0].type).toBe('normal');

      // 验证第二个 section (非压缩格式)
      const section2 = restored.sections![1];
      expect((section2.paragraphs as ParagraphSpec[]).length).toBe(2);

      // 验证 heading2
      const heading = (section2.paragraphs as ParagraphSpec[])[0] as ParagraphSpec & { phrases: PhraseSpec[] };
      expect(heading.type).toBe('heading2');
      expect(heading.phrases[0].value).toBe('ECharts 的核心优势');

      // 验证 bullets 段落和实体解码
      const bulletsData = (section2.paragraphs as ParagraphSpec[])[1] as BulletsParagraphSpec;
      expect(bulletsData.type).toBe('bullets');

      const bulletPhrases = (bulletsData.bullets[0] as BulletItemSpec & { phrases: PhraseSpec[] }).phrases;
      expect(bulletPhrases[0].value).toBe('丰富的 ');
      expect(bulletPhrases[1].value).toBe('图表类型');
      expect((bulletPhrases[1] as EntityPhraseSpec).metadata.entityType).toBe('metric_name'); // et: 20
      expect(bulletPhrases[3].value).toBe('折线图');
      expect((bulletPhrases[3] as EntityPhraseSpec).metadata.entityType).toBe('dim_value'); // et: 27
      expect(bulletPhrases[5].value).toBe('五十多种');
      expect((bulletPhrases[5] as EntityPhraseSpec).metadata.entityType).toBe('other_metric_value'); // et: 22
      expect((bulletPhrases[5] as EntityPhraseSpec).metadata.origin).toBe(50); // o: "50" -> 50
      expect((bulletPhrases[5] as EntityPhraseSpec).metadata.assessment).toBe('positive'); // a: "p" -> "positive"
    });
  });
});
