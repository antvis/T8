import { PhraseSpec, EntityType } from '../schema';
import { isNumber } from '../utils';

/**
 * parse string template to phrases
 * @example
 *  str = `<%= time %>, <%= columnAlias$$metric_name$$ %> is <%= price$$metric_value$$ %>`
 *  data = { time: "2020", columnAlias: "price total", price: "123" }
 *  =>
 *  [
 *    { type: "text", value: "2020" },
 *    { type: "text", value: ", " },
 *    { type: "entity", value: "price total", metadata: { entityType: metric_name } },
 *    { type: "text", value: " is " },
 *    { type: "entity", value: "123", metadata: { entityType: metric_value } },
 *  ]
 */
export function generateSentence(
  template: string,
  formattedData?: Record<string, string>,
  originalData?: Record<string, unknown>,
): PhraseSpec[] {
  const splitReg = /(<%= [\s\S]*?(::\w*?)? %>)/;
  const variableReg = /<%= ([\s\S]*?)(\$\$(\w*)\$\$)? %>/;
  return template.split(splitReg).reduce<PhraseSpec[]>((prev, curr) => {
    if (curr) {
      const variable = variableReg.exec(curr);
      if (variable && variable[1] && formattedData && typeof formattedData[variable[1]] === 'string') {
        const formattedVal = formattedData[variable[1]];
        if (variable[3]) {
          const eType = variable[3] as EntityType;
          const result: PhraseSpec = {
            type: 'entity',
            value: formattedVal,
            metadata: {
              entityType: eType,
            },
          };

          const origin = originalData ? originalData[variable[1]] : undefined;
          if (isNumber(origin)) result.metadata.origin = origin;
          if (
            (result.metadata.entityType === 'delta_value' || result.metadata.entityType === 'ratio_value') &&
            isNumber(origin)
          ) {
            if (origin > 0) {
              result.metadata.assessment = 'positive';
            }
            if (origin < 0) {
              result.metadata.assessment = 'negative';
            }
          }

          prev.push(result);
        } else {
          prev.push({
            type: 'text',
            value: formattedVal,
          });
        }
      } else {
        prev.push({
          type: 'text',
          value: curr,
        });
      }
    }
    return prev;
  }, []);
}
