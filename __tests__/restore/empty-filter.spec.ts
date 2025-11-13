import { restore } from '../../src/utils/schema-simplified';
import { NarrativeTextSpec } from '../../src/schema/structure';
import { ParagraphSpec, BulletsParagraphSpec, BulletItemSpec } from '../../src/schema/paragraph';
import { PhraseSpec } from '../../src/schema/phrase';

// Cases with empty paragraphs / bullets to ensure pruning

describe('restore empty filtering', () => {
  test('prunes empty normal paragraph and keeps heading', () => {
    const compressed = {
      h: { dt: 1, i: [{ v: 'headline' }] },
      s: {
        dt: 31,
        i: [
          {
            pa: {
              dt: 10,
              i: [
                { t: 10, dt: 1, i: [] },
                { t: 12, dt: 1, i: [{ v: 'Title text' }, { v: 'more' }] },
              ],
            },
          },
        ],
      },
    };
    const restored = restore(compressed, { strict: true }) as NarrativeTextSpec;
    const paragraphs = restored.sections![0].paragraphs as ParagraphSpec[];
    expect(paragraphs.length).toBe(1);
    expect(paragraphs[0].type).toMatch(/heading/);
    const heading = paragraphs[0] as ParagraphSpec & { phrases: PhraseSpec[] };
    expect(heading.phrases.length).toBeGreaterThan(0);
  });

  test('prunes empty bullet-items', () => {
    const compressed = {
      h: { dt: 1, i: [{ v: 'headline' }] },
      s: {
        dt: 31,
        i: [
          {
            pa: {
              dt: 10,
              i: [{ t: 11, b: { dt: 32, i: [{ p: { dt: 1, i: [] } }, { p: { dt: 1, i: [{ v: 'keep me' }] } }] } }],
            },
          },
        ],
      },
    };
    const restored = restore(compressed, { strict: true }) as NarrativeTextSpec;
    const paragraphs = restored.sections![0].paragraphs as ParagraphSpec[];
    const bulletsPara = paragraphs.find((p) => p.type === 'bullets') as BulletsParagraphSpec;
    expect(bulletsPara.bullets.length).toBe(1);
    const firstBullet = bulletsPara.bullets[0] as BulletItemSpec & { phrases: PhraseSpec[] };
    expect(firstBullet.phrases[0].value).toBe('keep me');
  });

  test('prunes nested empty subBullets', () => {
    const compressed = {
      h: { dt: 1, i: [{ v: 'headline' }] },
      s: {
        dt: 31,
        i: [
          {
            pa: {
              dt: 10,
              i: [
                {
                  t: 11,
                  b: {
                    dt: 32,
                    i: [
                      {
                        p: { dt: 1, i: [{ v: 'parent item' }] },
                        bs: { dt: 32, i: [{ p: { dt: 1, i: [] } }, { p: { dt: 1, i: [{ v: 'child keep' }] } }] },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    };
    const restored = restore(compressed, { strict: true }) as NarrativeTextSpec;
    const bulletsPara = restored.sections![0].paragraphs![0] as BulletsParagraphSpec;
    const firstBullet = bulletsPara.bullets[0];
    const sub = firstBullet.subBullet!;
    expect(sub.bullets.length).toBe(1);
    const child = sub.bullets[0] as BulletItemSpec & { phrases: PhraseSpec[] };
    expect(child.phrases[0].value).toBe('child keep');
  });
});
