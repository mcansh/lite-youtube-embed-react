# Lite YouTube Embed - React

Port of Paul Irish's [Lite YouTube Embed](https://github.com/paulirish/lite-youtube-embed) to a React Component

### Installation

```shell
$ yarn add @mcansh/lite-youtube-embed-react
// or
$ npm install @mcansh/lite-youtube-embed-react
```

## Basic Usage

```tsx
import * as React from 'react';
import { render } from 'react-dom';
import { LiteYouTubeEmbed } from 'react-lite-youtube-embed';

const App = () => (
  <div>
    <LiteYouTubeEmbed id="ogfYd705cRs" />
  </div>
);

render(<App />, document.getElementById('root'));
```
