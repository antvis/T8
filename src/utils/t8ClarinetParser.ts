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
 * T8 Clarinet Parser
 * Handles streaming JSON parsing for T8 narrative text specifications
 */
export class T8ClarinetParser {
  // Core parser instance
  private parser: clarinet.CParser;

  // State management
  private buffer: string = '';
  private result: Partial<NarrativeTextSpec> = {};
  private isComplete: boolean = false;
  private error: string | undefined = undefined;
  private currentValue: unknown = null;

  // Navigation state - tracks current position in the JSON structure
  private currentPath: (string | number)[] = []; // e.g., ['sections', 'paragraphs', 'phrases']
  private wrapperStructure: string[] = []; // e.g., ['object', 'object', 'array']

  constructor() {
    this.parser = new clarinet.CParser();
    this.setupEventHandlers();
  }

  /**
   * Append JSON fragment for parsing
   */
  append(chunk: string): void {
    this.buffer += chunk;
    try {
      this.parser.write(chunk);
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Unknown error';
    }
  }

  /**
   * Get current parse result
   */
  getResult(): T8ClarinetParseResult {
    return {
      document: this.result,
      isComplete: this.isComplete,
      error: this.error,
      currentPath: this.currentPath,
    };
  }

  /**
   * Reset parser to initial state
   */
  reset(): void {
    this.clearState();
    this.initializeParser();
  }

  /**
   * Get current error message
   */
  getError(): string | undefined {
    return this.error;
  }

  /**
   * Initialize the clarinet parser and set up event handlers
   */
  private initializeParser(): void {
    this.parser = new clarinet.CParser();
    this.setupEventHandlers();
  }

  /**
   * Clear all parser state
   */
  private clearState(): void {
    this.buffer = '';
    this.result = {};
    this.isComplete = false;
    this.currentPath = [];
    this.error = undefined;
    this.currentValue = null;
    this.wrapperStructure = [];
  }

  /**
   * Set up clarinet parser event handlers
   */
  private setupEventHandlers(): void {
    this.setupObjectHandlers();
    this.setupArrayHandlers();
    this.setupValueHandlers();
    this.setupErrorHandlers();
  }

  /**
   * Set up object-related event handlers
   */
  private setupObjectHandlers(): void {
    this.parser.onopenobject = (key) => {
      this.handleObjectOpen(key);
    };

    this.parser.oncloseobject = () => {
      this.handleObjectClose();
    };

    this.parser.onkey = (key) => {
      this.currentPath.push(key);
    };
  }

  /**
   * Set up array-related event handlers
   */
  private setupArrayHandlers(): void {
    this.parser.onopenarray = () => {
      this.handleArrayOpen();
    };

    this.parser.onclosearray = () => {
      this.handleArrayClose();
    };
  }

  /**
   * Set up value and completion event handlers
   */
  private setupValueHandlers(): void {
    this.parser.onvalue = (value) => {
      this.handleValue(value);
    };

    this.parser.onend = () => {
      this.isComplete = true;
    };
  }

  /**
   * Set up error handling
   */
  private setupErrorHandlers(): void {
    this.parser.onerror = (error) => {
      this.error = error.message;
    };
  }

  /**
   * Handle opening of an object
   */
  private handleObjectOpen(key: string): void {
    this.wrapperStructure.push('object');
    setValueByPath(this.result, this.currentPath, { [key]: undefined });
    this.currentPath.push(key);
  }

  /**
   * Handle closing of an object
   */
  private handleObjectClose(): void {
    this.wrapperStructure.pop();
    const currentArrayIndex = this.currentPath.pop();

    // If we're inside an array, increment the index
    if (this.wrapperStructure[this.wrapperStructure.length - 1] === 'array') {
      this.currentPath.push(Number(currentArrayIndex) + 1);
    }
  }

  /**
   * Handle opening of an array
   */
  private handleArrayOpen(): void {
    this.wrapperStructure.push('array');
    setValueByPath(this.result, this.currentPath, []);
    this.currentPath.push(0);
  }

  /**
   * Handle closing of an array
   */
  private handleArrayClose(): void {
    this.wrapperStructure.pop();
    this.currentPath.pop();

    // Remove the parent key if we're not nested in another array
    if (this.wrapperStructure[this.wrapperStructure.length - 1] !== 'array') {
      this.currentPath.pop();
    }
  }

  /**
   * Handle value assignment
   */
  private handleValue(value: unknown): void {
    this.currentValue = value;
    setValueByPath(this.result, this.currentPath, this.currentValue);

    const currentArrayIndex = this.currentPath.pop();

    // If we're inside an array, increment the index for the next element
    if (this.wrapperStructure[this.wrapperStructure.length - 1] === 'array') {
      this.currentPath.push(Number(currentArrayIndex) + 1);
    }
  }
}

const parser = new T8ClarinetParser();

/**
 * Parse T8 JSON fragment with streaming support
 */
export function parseT8WithClarinet(
  fragment: string,
  options: {
    onError?: (error: string) => void;
    onComplete?: (result: T8ClarinetParseResult) => void;
  },
): () => void {
  parser.append(fragment);
  const result = parser.getResult();

  if (options.onComplete) {
    options.onComplete(result);
  }

  if (options.onError && result.error) {
    options.onError(result.error);
  }

  return parser.reset;
}
