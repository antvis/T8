import {
  PhraseSpec,
  EntityPhraseSpec,
  CustomPhraseSpec,
  isTextPhrase,
  isEntityPhrase,
  EntityMetaData,
} from '../../schema';
import { Entity, Bold, Italic, Underline } from '../styled';
import { getPrefixCls, classnames as cx, functionalize, kebabCase, isFunction, isEmpty, isNil } from '../../utils';
import { PhraseDescriptor } from '../../plugin';
import { useTheme, usePluginManager, useEvent } from '../context';
import { ComponentChildren, FunctionComponent } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { Tooltip } from './ui';
import { SeedTokenOptions } from '../../theme';
import { EventType } from '../types';

type PhraseProps = {
  /**
   * @description specification of phrase text spec
   * @description.zh-CN 短语描述 json 信息
   */
  spec: PhraseSpec;
};

function renderPhraseByDescriptor(
  spec: EntityPhraseSpec | CustomPhraseSpec,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descriptor: PhraseDescriptor<any>,
  theme: SeedTokenOptions,
  events: {
    onPhraseClick: (eventType: EventType, spec: PhraseSpec) => void;
    onPhraseMouseEnter: (eventType: EventType, spec: PhraseSpec) => void;
    onPhraseMouseLeave: (eventType: EventType, spec: PhraseSpec) => void;
  },
) {
  const { value = '', metadata = {}, styles: specStyles = {} } = spec;
  const {
    classNames,
    style: descriptorStyle,
    onHover,
    // tooltip,
    onClick,
    render = () => value,
    tooltip,
  } = descriptor || {};

  const handleClick = () => {
    onClick?.(spec?.value, metadata);
    events?.onPhraseClick?.(EventType.ON_PHRASE_CLICK, spec);
  };

  const handleMouseEnter = () => {
    onHover?.(spec?.value, metadata);
    events?.onPhraseMouseEnter?.(EventType.ON_PHRASE_MOUSE_ENTER, spec);
  };
  const handleMouseLeave = () => {
    events?.onPhraseMouseLeave?.(EventType.ON_PHRASE_MOUSE_LEAVE, spec);
  };

  const entityRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (entityRef.current) {
      const contentResult = functionalize<HTMLElement | DocumentFragment | string>(render, null)(
        value,
        metadata as EntityMetaData,
      );
      if (typeof contentResult === 'string' || typeof contentResult === 'number') {
        entityRef.current.textContent = contentResult;
      } else if (contentResult instanceof DocumentFragment || contentResult instanceof HTMLElement) {
        entityRef.current.appendChild(contentResult);
      } else {
        // Handle other possible return types or log a warning
        console.warn('Unexpected content type returned from render function:', contentResult);
      }
    }
  }, [value, metadata]);

  const defaultNode: ComponentChildren = (
    <Entity
      theme={theme}
      forwardRef={entityRef}
      style={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...functionalize(descriptorStyle, {})(spec?.value, metadata as any, theme),
        ...specStyles,
      }}
      className={cx(
        getPrefixCls('value'),
        isEntityPhrase(spec) ? getPrefixCls(kebabCase(spec.metadata.entityType)) : '',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(functionalize(classNames, [])(spec?.value, metadata as any) as Array<string>),
      )}
    />
  );

  const nodeWithEvents =
    !isEmpty(events) || isFunction(onClick) || isFunction(onHover) ? (
      <span onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {defaultNode}
      </span>
    ) : (
      defaultNode
    );

  // return nodeWithEvents;
  const showTooltip = tooltip && functionalize(tooltip.title, null)(value, metadata as EntityMetaData);

  return !isNil(showTooltip) ? (
    <Tooltip {...tooltip} title={showTooltip}>
      {nodeWithEvents}
    </Tooltip>
  ) : (
    nodeWithEvents
  );
}

/** <Phrase /> can use independence */
export const Phrase: FunctionComponent<PhraseProps> = ({ spec: phrase }) => {
  const { onClick: onPhraseClick, onMouseEnter: onPhraseMouseEnter, onMouseLeave: onPhraseMouseLeave } = useEvent();
  const themeSeedToken = useTheme();
  const pluginManager = usePluginManager();

  const onClick = () => {
    onPhraseClick?.(EventType.ON_PHRASE_CLICK, phrase);
  };
  const onMouseEnter = () => {
    onPhraseMouseEnter?.(EventType.ON_PHRASE_MOUSE_ENTER, phrase);
  };
  const onMouseLeave = () => {
    onPhraseMouseLeave?.(EventType.ON_PHRASE_MOUSE_LEAVE, phrase);
  };
  let defaultText = !isEmpty(onPhraseClick) ? (
    <span onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {phrase.value}
    </span>
  ) : (
    <>{phrase.value}</>
  );
  if (isTextPhrase(phrase)) {
    if (phrase.bold) defaultText = <Bold>{defaultText}</Bold>;
    if (phrase.italic) defaultText = <Italic>{defaultText}</Italic>;
    if (phrase.underline) defaultText = <Underline>{defaultText}</Underline>;
    if (phrase.url)
      defaultText = (
        <a target="_blank" rel="noreferrer" href={phrase.url}>
          {defaultText}
        </a>
      );
    return defaultText;
  }

  const descriptor = pluginManager?.getPhraseDescriptorBySpec(phrase);
  if (descriptor) {
    return (
      <>
        {renderPhraseByDescriptor(phrase, descriptor, themeSeedToken, {
          onPhraseClick,
          onPhraseMouseEnter,
          onPhraseMouseLeave,
        })}
      </>
    );
  }

  return defaultText;
};
