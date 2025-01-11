# vanilla-extract-bun-plugin

# DOESN'T WORK - WIP


## Running Tests

```
bun i
bun --watch test
```

## Using

```
bun i @vanilla-extract/css
bun i https://github.com/stoand/vanilla-extract-bun-plugin
```

```typescript
// app.css.ts

import { style, globalStyle } from '@vanilla-extract/css';

export const myStyle = style({
  display: 'flex',
  paddingTop: '3px'
});

globalStyle('body', {
  margin: 0
});
```
