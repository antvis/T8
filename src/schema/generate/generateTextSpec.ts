import { isUndefined, arr2map } from '../../utils';
import {
  type NarrativeTextSpec,
  type ParagraphSpec,
  type PhraseSpec,
  type TextParagraphSpec,
  type TextPhraseSpec,
  PhraseType,
  ParagraphType,
} from '../schema';
import { type Structure, type Variable, type StructureTemp, StructureDisplayType } from './types';

// Regular expressions for template parsing
const STRUCTURE_TEMPLATE_REGEX = /(&{.*?})/; // Matches &{templateId} in structure templates
const STRUCTURE_VARIABLE_REGEX = /&{(.*?)}/; // Extracts templateId from &{templateId}
const SENTENCE_TEMPLATE_REGEX = /(\${.*?})/; // Matches ${varName} in sentence templates
const SENTENCE_VARIABLE_REGEX = /\${(.*?)}/; // Extracts varName from ${varName}

// Special constants
const METRIC_NAME_SUFFIX = '[metric_name]';
const DEFAULT_EMPTY_VALUE = '-';

/**
 * Generates a narrative text specification from structures and variables
 *
 * @param structures - Array of structure definitions that form the narrative
 * @param structureTemps - Array of structure templates referenced by structures
 * @param variables - Array of variables that provide data for the templates
 * @returns A complete narrative text specification
 */
function generateTextSpec({
  structures,
  structureTemps = [],
  variables = [],
}: {
  structures: Structure[];
  structureTemps?: StructureTemp[];
  variables?: Variable[];
}): NarrativeTextSpec {
  // Convert arrays to maps for efficient lookup
  const variableMap = arr2map<Variable>(variables, 'variableId');
  const structureTempMap = arr2map<StructureTemp>(structureTemps, 'templateId');

  // Collection of paragraphs that will form the narrative
  const paragraphs: ParagraphSpec[] = [];

  // Process each structure to build the narrative
  structures.forEach((structure, structureIdx) => {
    const { template } = structure;

    // First structure is typically a paragraph, others are phrases
    let { displayType = structureIdx === 0 ? StructureDisplayType.PARAGRAPH : StructureDisplayType.PHRASE } = structure;

    // Split template into text and variable parts
    // Example: "System &{s1}, includes &{s2}." → ["System ", "&{s1}", ", includes ", "&{s2}", "."]
    template
      .split(STRUCTURE_TEMPLATE_REGEX)
      .filter(Boolean)
      .forEach((templatePart, partIdx) => {
        // After the first part, everything is treated as a phrase
        if (partIdx > 0) displayType = StructureDisplayType.PHRASE;

        // Extract template ID if this part is a variable reference
        const templateId: string | undefined = STRUCTURE_VARIABLE_REGEX.exec(templatePart)?.[1];

        if (templateId && structureTempMap[templateId]) {
          // Process referenced template
          processStructureTemplate(paragraphs, structureTempMap[templateId], variableMap);
        } else {
          // Handle plain text
          const phrase: TextPhraseSpec = {
            type: PhraseType.TEXT,
            value: templatePart,
          };
          addPhraseToParagraphs(paragraphs, phrase, displayType);
        }
      });
  });

  // Return the complete narrative specification
  return {
    sections: [{ paragraphs }],
  };
}

/**
 * Adds a phrase to the paragraphs collection based on display type
 *
 * @param paragraphs - Collection of paragraphs to modify
 * @param phrase - The phrase to add
 * @param displayType - Whether to add as a paragraph or phrase
 */
function addPhraseToParagraphs(
  paragraphs: ParagraphSpec[],
  phrase: TextPhraseSpec,
  displayType: StructureDisplayType,
): void {
  if (displayType === StructureDisplayType.PARAGRAPH) {
    // Create a new paragraph with this phrase
    paragraphs.push({ type: ParagraphType.NORMAL, phrases: [phrase] });
  } else if (displayType === StructureDisplayType.PHRASE) {
    // Add to the latest paragraph, creating one if needed
    if (!paragraphs.length) {
      paragraphs.push({ type: ParagraphType.NORMAL, phrases: [] });
    }

    const latestParagraph = paragraphs[paragraphs.length - 1] as TextParagraphSpec;
    latestParagraph.phrases.push(phrase);
  }
}

/**
 * Processes a structure template and adds its content to paragraphs
 *
 * @param paragraphs - Collection of paragraphs to modify
 * @param structureTemp - The structure template to process
 * @param variableMap - Map of variables for data lookup
 * @param parentDisplayType - Display type from the parent structure
 */
function processStructureTemplate(
  paragraphs: ParagraphSpec[],
  structureTemp: StructureTemp,
  variableMap: Record<string, Variable>,
): void {
  const {
    template: subTemplate,
    variableId,
    separator,
    displayType: subDisplayType = StructureDisplayType.PHRASE,
  } = structureTemp;

  // Get the variable data if specified
  const variable: Variable | undefined = variableId ? variableMap[variableId] : undefined;

  // Generate sentences from the template and variable data
  const sentences = getSentences(subTemplate, variable?.dataValue, variable?.dataMetaMap);

  if (subDisplayType === StructureDisplayType.PARAGRAPH) {
    // Add each sentence as a separate paragraph
    paragraphs.push(
      ...sentences.map<TextParagraphSpec>((sentence, sentenceIdx) => {
        const phrases = [...sentence];

        // Add separator between sentences if provided
        if (separator && sentenceIdx < sentences.length - 1) {
          phrases.push({ type: PhraseType.TEXT, value: separator });
        }

        return {
          type: ParagraphType.NORMAL,
          phrases,
        };
      }),
    );
  } else if (subDisplayType === StructureDisplayType.PHRASE) {
    // Ensure we have at least one paragraph
    if (!paragraphs.length) {
      paragraphs.push({ type: ParagraphType.NORMAL, phrases: [] });
    }

    const latestParagraph = paragraphs[paragraphs.length - 1] as TextParagraphSpec;

    // Combine all sentences into phrases for the latest paragraph
    latestParagraph.phrases = [
      ...latestParagraph.phrases,
      ...sentences.reduce((allPhrases, sentence, sentenceIdx) => {
        // Add current sentence phrases
        const updatedPhrases = [...allPhrases, ...sentence];

        // Add separator between sentences if provided
        if (separator && sentenceIdx < sentences.length - 1) {
          updatedPhrases.push({ type: PhraseType.TEXT, value: separator });
        }

        return updatedPhrases;
      }, [] as PhraseSpec[]),
    ];
  }
}

/**
 * Converts a template string and data into an array of sentence phrases
 *
 * @param template - Template string with variable placeholders like ${varName}
 * @param dataValue - Data values to substitute into the template
 * @param dataMetaMap - Metadata about the data fields
 * @returns Array of sentences, each containing phrase specifications
 */
function getSentences(
  template: string,
  dataValue?: Variable['dataValue'],
  dataMetaMap?: Variable['dataMetaMap'],
): PhraseSpec[][] {
  // Split template into parts
  // Example: "user ${name}, age is ${age}" → ["user ", "${name}", ", age is ", "${age}"]
  const templateParts = template.split(SENTENCE_TEMPLATE_REGEX).filter(Boolean);

  // Ensure data is an array of objects
  const dataArray = Array.isArray(dataValue) ? dataValue : [dataValue ?? {}];

  // Generate a sentence for each data item
  return dataArray.map((datum) => {
    // Convert each template part to a phrase
    return templateParts.map<PhraseSpec>((part) => {
      // Check if this part is a variable reference
      const varName: string | undefined = SENTENCE_VARIABLE_REGEX.exec(part)?.[1];

      if (!varName) {
        // Plain text part
        return { type: PhraseType.TEXT, value: part };
      }

      // Handle special case for metric names
      if (varName.endsWith(METRIC_NAME_SUFFIX)) {
        const fieldId = varName.slice(0, -METRIC_NAME_SUFFIX.length);
        return {
          type: PhraseType.ENTITY,
          value: dataMetaMap?.[fieldId]?.name || fieldId,
          metadata: { entityType: 'metric_name' },
        };
      }

      // Get data value, defaulting to "-" if undefined
      const data = isUndefined(datum[varName]) ? DEFAULT_EMPTY_VALUE : `${datum[varName]}`;
      const dataMeta = dataMetaMap?.[varName];

      // Return entity or text phrase based on metadata
      return dataMeta?.entityType
        ? {
            type: PhraseType.ENTITY,
            value: data,
            metadata: { entityType: dataMeta.entityType },
          }
        : { type: PhraseType.TEXT, value: data };
    });
  });
}

export default generateTextSpec;
