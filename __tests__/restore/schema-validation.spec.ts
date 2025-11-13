import { describe, it, expect } from 'vitest';
import { restore } from '../utils/schema-simplified';
import { NarrativeTextSpec } from '../../src/schema/structure';
import { generateTestDataset, getSchemaValidator } from './test-utils';

// 初始化 AJV 验证器
const validateSchema = getSchemaValidator();

describe('restore - Schema 验证测试', () => {
  describe('随机压缩数据的 Schema 合规性验证', () => {
    it('生成的随机压缩数据应该被正确还原为符合 Schema 的结构', () => {
      // 生成多个测试案例
      const testCases = generateTestDataset(50);

      testCases.forEach((compressedData, index) => {
        // 执行还原操作
        const restoredData = restore(compressedData) as NarrativeTextSpec;

        // 验证还原后的数据符合 Schema
        const isValid = validateSchema(restoredData);

        if (!isValid) {
          console.error(`测试案例 ${index} Schema 验证失败:`, {
            errors: validateSchema.errors,
            compressedData,
            restoredData,
          });
        }

        expect(isValid).toBe(true);
      });
    });

    it('验证实体类型(20-29)的正确处理', () => {
      const testCases = generateTestDataset(30);

      testCases.forEach((compressedData) => {
        const restoredData = restore(compressedData) as NarrativeTextSpec;

        // 验证整体 Schema 合规性
        const isValid = validateSchema(restoredData);
        expect(isValid).toBe(true);

        // 特别验证实体类型字段
        const walkAndValidateEntities = (obj: unknown): void => {
          if (Array.isArray(obj)) {
            obj.forEach(walkAndValidateEntities);
          } else if (obj && typeof obj === 'object') {
            const objRecord = obj as Record<string, unknown>;
            if (objRecord.type === 'entity' && objRecord.metadata && typeof objRecord.metadata === 'object') {
              const metadata = objRecord.metadata as Record<string, unknown>;
              // 验证实体类型是字符串且在有效范围内
              const validEntityTypes = [
                'metric_name',
                'metric_value',
                'other_metric_value',
                'contribute_ratio',
                'delta_value',
                'ratio_value',
                'trend_desc',
                'dim_value',
                'time_desc',
                'proportion',
              ];
              expect(typeof metadata.entityType).toBe('string');
              expect(validEntityTypes).toContain(metadata.entityType);
            }

            Object.values(objRecord).forEach(walkAndValidateEntities);
          }
        };

        walkAndValidateEntities(restoredData);
      });
    });

    it('验证assessment字段只包含合法值', () => {
      const testCases = generateTestDataset(30);

      testCases.forEach((compressedData) => {
        const restoredData = restore(compressedData) as NarrativeTextSpec;

        // 验证整体 Schema 合规性
        const isValid = validateSchema(restoredData);
        expect(isValid).toBe(true);

        // 特别验证 assessment 字段
        const walkAndValidateAssessments = (obj: unknown): void => {
          if (Array.isArray(obj)) {
            obj.forEach(walkAndValidateAssessments);
          } else if (obj && typeof obj === 'object') {
            const objRecord = obj as Record<string, unknown>;
            if (objRecord.metadata && typeof objRecord.metadata === 'object') {
              const metadata = objRecord.metadata as Record<string, unknown>;
              if (metadata.assessment) {
                // 验证assessment值符合enum定义
                expect(['positive', 'negative', 'equal']).toContain(metadata.assessment);
              }
            }

            Object.values(objRecord).forEach(walkAndValidateAssessments);
          }
        };

        walkAndValidateAssessments(restoredData);
      });
    });
  });

  describe('边界情况和错误处理', () => {
    it('空数据结构的处理', () => {
      const emptyData = {
        h: { dt: 1, i: [] },
        s: { dt: 31, i: [] },
      };

      const restored = restore(emptyData) as NarrativeTextSpec;
      const isValid = validateSchema(restored);

      expect(isValid).toBe(true);
      expect(restored.headline?.phrases).toEqual([]);
      expect(restored.sections).toEqual([]);
    });

    it('只包含文本短语的简单情况', () => {
      const simpleData = {
        h: {
          dt: 1,
          i: [{ v: '简单标题' }],
        },
        s: {
          dt: 31,
          i: [
            {
              pa: {
                dt: 10,
                i: [
                  {
                    t: 10,
                    dt: 1,
                    i: [{ v: '简单文本内容' }],
                  },
                ],
              },
            },
          ],
        },
      };

      const restored = restore(simpleData) as NarrativeTextSpec;
      const isValid = validateSchema(restored);

      expect(isValid).toBe(true);
      expect(restored.headline?.phrases?.[0]?.value).toBe('简单标题');
    });

    it('混合段落类型的复杂结构', () => {
      const complexData = {
        h: {
          dt: 1,
          i: [{ v: '复杂文档标题' }],
        },
        s: {
          dt: 31,
          i: [
            {
              pa: {
                dt: 10,
                i: [
                  {
                    t: 10,
                    dt: 1,
                    i: [{ v: '普通段落' }],
                  },
                  {
                    t: 12,
                    dt: 1,
                    i: [{ v: '标题段落' }],
                  },
                  {
                    t: 11,
                    b: {
                      dt: 32,
                      i: [
                        {
                          p: {
                            dt: 1,
                            i: [{ v: '项目符号内容' }],
                          },
                        },
                      ],
                      io: false,
                    },
                  },
                ],
              },
            },
          ],
        },
      };

      const restored = restore(complexData) as NarrativeTextSpec;
      const isValid = validateSchema(restored);

      expect(isValid).toBe(true);
    });
  });

  describe('性能和稳定性测试', () => {
    it('大量数据的处理性能', () => {
      const startTime = Date.now();
      const largeBatch = generateTestDataset(200);

      largeBatch.forEach((compressedData) => {
        const restored = restore(compressedData) as NarrativeTextSpec;
        const isValid = validateSchema(restored);
        expect(isValid).toBe(true);
      });

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      console.log(`处理 200 个案例耗时: ${processingTime}ms`);
      expect(processingTime).toBeLessThan(5000); // 期望在5秒内完成
    });

    it('数据一致性验证 - 多次还原应产生相同结果', () => {
      const testData = generateTestDataset(10);

      testData.forEach((compressedData) => {
        const restored1 = restore(compressedData);
        const restored2 = restore(compressedData);

        expect(JSON.stringify(restored1)).toBe(JSON.stringify(restored2));

        const isValid1 = validateSchema(restored1);
        const isValid2 = validateSchema(restored2);

        expect(isValid1).toBe(true);
        expect(isValid2).toBe(true);
      });
    });
  });
});
