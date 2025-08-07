import * as clarinet from 'clarinet';
import { NarrativeTextSpec } from '../schema/structure';
import { setValueByPath } from './setValueByPath';

/**
 * T8 Clarinet Parser Result
 */
export interface T8ClarinetParseResult {
  document: Partial<NarrativeTextSpec>;
  isComplete: boolean;
  error?: string;
  currentPath: (string | number)[];
}

/**
 * T8 Clarinet Parser State
 */
interface ParserState {
  parser: clarinet.CParser;
  buffer: string;
  result: Partial<NarrativeTextSpec>;
  isComplete: boolean;
  error: string | undefined;
  currentValue: unknown;
  currentPath: (string | number)[];
  wrapperStructure: string[];
}

/**
 * T8 Clarinet Parser
 */
export interface T8ClarinetParser {
  append: (chunk: string) => void;
  getResult: () => T8ClarinetParseResult;
  reset: () => void;
  getError: () => string | undefined;
}

/**
 * Create a new T8 Clarinet Parser instance
 * Handles streaming JSON parsing for T8 narrative text specifications
 */
export function createT8ClarinetParser(): T8ClarinetParser {
  // State management using closure
  let state: ParserState = {
    parser: new clarinet.CParser(),
    buffer: '',
    result: {},
    isComplete: false,
    error: undefined,
    currentValue: null,
    currentPath: [],
    wrapperStructure: [],
  };

  /**
   * Initialize the clarinet parser and set up event handlers
   */
  const initializeParser = (): void => {
    state.parser = new clarinet.CParser();
    setupEventHandlers();
  };

  /**
   * Clear all parser state
   */
  const clearState = (): void => {
    state = {
      parser: new clarinet.CParser(),
      buffer: '',
      result: {},
      isComplete: false,
      error: undefined,
      currentValue: null,
      currentPath: [],
      wrapperStructure: [],
    };
  };

  /**
   * Set up clarinet parser event handlers
   */
  const setupEventHandlers = (): void => {
    setupObjectHandlers();
    setupArrayHandlers();
    setupValueHandlers();
    setupErrorHandlers();
  };

  /**
   * Set up object-related event handlers
   */
  const setupObjectHandlers = (): void => {
    state.parser.onopenobject = (key) => {
      handleObjectOpen(key);
    };

    state.parser.oncloseobject = () => {
      handleObjectClose();
    };

    state.parser.onkey = (key) => {
      state.currentPath.push(key);
    };
  };

  /**
   * Set up array-related event handlers
   */
  const setupArrayHandlers = (): void => {
    state.parser.onopenarray = () => {
      handleArrayOpen();
    };

    state.parser.onclosearray = () => {
      handleArrayClose();
    };
  };

  /**
   * Set up value and completion event handlers
   */
  const setupValueHandlers = (): void => {
    state.parser.onvalue = (value) => {
      handleValue(value);
    };

    state.parser.onend = () => {
      state.isComplete = true;
    };
  };

  /**
   * Set up error handling
   */
  const setupErrorHandlers = (): void => {
    state.parser.onerror = (error) => {
      state.error = error.message;
    };
  };

  /**
   * Handle opening of an object
   */
  const handleObjectOpen = (key: string): void => {
    state.wrapperStructure.push('object');
    setValueByPath(state.result, state.currentPath, { [key]: undefined });
    state.currentPath.push(key);
  };

  /**
   * Handle closing of an object
   */
  const handleObjectClose = (): void => {
    state.wrapperStructure.pop();
    const currentArrayIndex = state.currentPath.pop();

    // If we're inside an array, increment the index
    if (state.wrapperStructure[state.wrapperStructure.length - 1] === 'array') {
      state.currentPath.push(Number(currentArrayIndex) + 1);
    }
  };

  /**
   * Handle opening of an array
   */
  const handleArrayOpen = (): void => {
    state.wrapperStructure.push('array');
    setValueByPath(state.result, state.currentPath, []);
    state.currentPath.push(0);
  };

  /**
   * Handle closing of an array
   */
  const handleArrayClose = (): void => {
    state.wrapperStructure.pop();
    state.currentPath.pop();

    // Remove the parent key if we're not nested in another array
    if (state.wrapperStructure[state.wrapperStructure.length - 1] !== 'array') {
      state.currentPath.pop();
    }
  };

  /**
   * Handle value assignment
   */
  const handleValue = (value: unknown): void => {
    state.currentValue = value;
    setValueByPath(state.result, state.currentPath, state.currentValue);

    const currentArrayIndex = state.currentPath.pop();

    // If we're inside an array, increment the index for the next element
    if (state.wrapperStructure[state.wrapperStructure.length - 1] === 'array') {
      state.currentPath.push(Number(currentArrayIndex) + 1);
    }
  };

  // Initialize the parser
  initializeParser();

  // Return the public API
  return {
    /**
     * Append JSON fragment for parsing
     */
    append: (chunk: string): void => {
      state.buffer += chunk;
      try {
        state.parser.write(chunk);
      } catch (error) {
        state.error = error instanceof Error ? error.message : 'Unknown error';
      }
    },

    /**
     * Get current parse result
     */
    getResult: (): T8ClarinetParseResult => ({
      document: state.result,
      isComplete: state.isComplete,
      error: state.error,
      currentPath: state.currentPath,
    }),

    /**
     * Reset parser to initial state
     */
    reset: (): void => {
      clearState();
      initializeParser();
    },

    /**
     * Get current error message
     */
    getError: (): string | undefined => state.error,
  };
}

// // Create a singleton instance for backward compatibility
// const parser = createT8ClarinetParser();

// /**
//  * Parse T8 JSON fragment with streaming support
//  */
// export function parseT8WithClarinet(
//   fragment: string,
//   options: {
//     onError?: (error: string) => void;
//     onComplete?: (result: T8ClarinetParseResult) => void;
//   },
// ): () => void {
//   parser.append(fragment);
//   const result = parser.getResult();

//   if (options.onComplete) {
//     options.onComplete(result);
//   }

//   if (options.onError && result.error) {
//     options.onError(result.error);
//   }

//   return parser.reset;
// }
