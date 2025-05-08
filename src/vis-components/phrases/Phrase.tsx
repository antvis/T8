import {
  PhraseSpec,
  EntityPhraseSpec,
  CustomPhraseSpec,
  isTextPhrase,
  isEntityPhrase,
  EntityMetaData,
} from '../../schema';
import { Entity, Bold, Italic, Underline } from '../../styled';
import { getPrefixCls, classnames as cx, functionalize, kebabCase, isFunction, isEmpty } from '../../utils';
import { ExtensionProps, PhraseEvents } from '../../interface';
import { PhraseDescriptor } from '../../plugin';
import { type ThemeProps, defaultTheme } from '../../theme';
import { presetPluginManager } from '../../plugin';
import { ComponentChildren, FunctionComponent } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

type PhraseProps = ExtensionProps &
  PhraseEvents & {
    /**
     * @description specification of phrase text spec
     * @description.zh-CN 短语描述 json 信息
     */
    spec: PhraseSpec;
    /**
     * @description theme props
     * @description.zh-CN 主题配置
     */
    theme?: ThemeProps;
  };

function renderPhraseByDescriptor(
  spec: EntityPhraseSpec | CustomPhraseSpec,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descriptor: PhraseDescriptor<any>,
  theme: ThemeProps,
  events: PhraseEvents,
) {
  const { value = '', metadata = {}, styles: specStyles = {} } = spec;
  const {
    overwrite,
    classNames,
    style: descriptorStyle,
    onHover,
    // tooltip,
    onClick,
    render = () => value,
  } = descriptor || {};

  const handleClick = () => {
    onClick?.(spec?.value, metadata);
    events?.onClickPhrase?.(spec);
  };

  const handleMouseEnter = () => {
    onHover?.(spec?.value, metadata);
    events?.onMouseEnterPhrase?.(spec);
  };
  const handleMouseLeave = () => {
    events?.onMouseLeavePhrase?.(spec);
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
  }, [value, metadata, render]);

  const defaultNode: ComponentChildren = (
    <Entity
      theme={theme}
      forwardRef={entityRef}
      style={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...functionalize(descriptorStyle, {})(spec?.value, metadata as any),
        ...specStyles,
      }}
      className={cx(
        getPrefixCls('value'),
        isEntityPhrase(spec) ? getPrefixCls(kebabCase(spec.metadata.entityType)) : '',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...functionalize(classNames, [])(spec?.value, metadata as any),
      )}
    />
  );
  if (isFunction(overwrite)) {
    // TODO: need to convert DocumentFragment & HTMLElement to VNode
    // defaultNode = overwrite(entityRef.current, value, metadata);
  }

  const nodeWithEvents =
    !isEmpty(events) || isFunction(onClick) || isFunction(onHover) ? (
      <span onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {defaultNode}
      </span>
    ) : (
      defaultNode
    );

  return nodeWithEvents;
  // TODO: add tooltip without antd
  // const showTooltip = tooltip && tooltip?.title(value, metadata);
  // return !isNil(showTooltip) ? (
  //   <Tooltip {...tooltip} title={showTooltip}>
  //     {nodeWithEvents}
  //   </Tooltip>
  // ) : (
  //   nodeWithEvents
  // );
}

/** <Phrase /> can use independence */
export const Phrase: FunctionComponent<PhraseProps> = ({
  spec: phrase,
  theme = defaultTheme,
  pluginManager = presetPluginManager,
  ...events
}) => {
  const onClick = () => {
    events?.onClickPhrase?.(phrase);
  };
  const onMouseEnter = () => {
    events?.onMouseEnterPhrase?.(phrase);
  };
  const onMouseLeave = () => {
    events?.onMouseLeavePhrase?.(phrase);
  };
  let defaultText = !isEmpty(events) ? (
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
    return <>{renderPhraseByDescriptor(phrase, descriptor, theme, events)}</>;
  }

  return defaultText;
};
