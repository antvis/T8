---
url: /en/tutorial/advanced/events.md
---

# Event Listening

T8 provides a complete event system that allows you to monitor and respond to various interaction events in text visualization.

## Event Types

T8 supports the following levels of events:

1. Narrative text events (`narrative:*`)
2. Section block events (`section:*`)
3. Paragraph events (`paragraph:*`)
4. Phrase events (`phrase:*`)

## Basic Usage

Use the `on` method to register event listeners:

```ts
const text = new Text('#container');

// Listen for phrase click events
text.on('phrase:click', (spec) => {
  console.log('Phrase clicked:', spec);
});

// Listen for paragraph click events
text.on('paragraph:click', (spec) => {
  console.log('Paragraph clicked:', spec);
});

// Listen for section click events
text.on('section:click', (spec) => {
  console.log('Section clicked:', spec);
});

// Listen for narrative text click events
text.on('narrative:click', (spec) => {
  console.log('Narrative text clicked:', spec);
});
```

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';
import spec from './example.json';

const app = document.getElementById('app');

// Instantiate Text
const text = new Text(document.getElementById('app'));

// Specify visualization elements
text.schema(spec).theme('light', { fontSize: 40 });

text.on('phrase:click', (spec) => {
  console.log('Phrase clicked:', spec);
});

// Listen for paragraph click events
text.on('paragraph:click', (spec) => {
  console.log('Paragraph clicked:', spec);
});

// Listen for section click events
text.on('section:click', (spec) => {
  console.log('Section clicked:', spec);
});

// Listen for narrative text click events
text.on('narrative:click', (spec) => {
  console.log('Narrative text clicked:', spec);
});

// Render
text.render();
```

```json example.json
{
  "sections": [
    {
      "key": "insight",
      "paragraphs": [
        {
          "type": "normal",
          "phrases": [
            {
              "type": "text",
              "value": "The "
            },
            {
              "type": "entity",
              "value": "average deal size",
              "metadata": {
                "entityType": "metric_name"
              }
            },
            {
              "type": "text",
              "value": " ("
            },
            {
              "type": "entity",
              "value": "$12k",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ") "
            },
            {
              "type": "text",
              "value": "is down "
            },
            {
              "type": "entity",
              "value": "$2k",
              "metadata": {
                "entityType": "delta_value",
                "assessment": "negative"
              }
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "text",
              "value": "relative to the same time last quarter"
            },
            {
              "type": "text",
              "value": " ("
            },
            {
              "type": "entity",
              "value": "$14k",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ") "
            },
            {
              "type": "text",
              "value": ". "
            }
          ]
        }
      ]
    }
  ]
}
```

:::

## Event Parameters

Each event handler receives an event parameter object that contains detailed information about the event:

```ts
text.on('phrase:click', (spec) => {
  const {
    type, // Event type
    value, // Phrase value
    metadata, // Related metadata
    // ... other properties
  } = spec;

  // Handle the event
});
```

## Event Unbinding

You can use the `off` method to remove event listeners:

```ts
// Define event handler
const handleClick = (spec) => {
  console.log('Click event:', spec);
};

// Register event
text.on('phrase:click', handleClick);

// Remove specific event listener
text.off('phrase:click', handleClick);

// Remove all listeners for a specific event type
text.off('phrase:click');

// Remove all event listeners
text.off();
```

## Event Bubbling

T8's event system supports event bubbling mechanism, where events propagate from the most specific element up to more general elements:

```ts
text.on('phrase:click', (spec) => {
  console.log('1. Phrase clicked');
});

text.on('paragraph:click', (spec) => {
  console.log('2. Paragraph clicked');
});

text.on('section:click', (spec) => {
  console.log('3. Section clicked');
});

text.on('narrative:click', (spec) => {
  console.log('4. Narrative text clicked');
});

// When a phrase is clicked, all of the above event handlers will execute in sequence
```
