import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LiteYouTube } from '../src';

const App = () => {
  return (
    <div>
      <LiteYouTube videoId="ogfYd705cRs" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
