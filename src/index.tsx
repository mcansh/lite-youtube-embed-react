import * as React from 'react';
import styled from 'styled-components';

const LiteYouTubeWrapper = styled.div`
  background-color: #000;
  position: relative;
  display: block;
  contain: content;
  background-position: center center;
  background-size: cover;
  cursor: pointer;

  /* gradient */
  ::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);
    background-position: top;
    background-repeat: repeat-x;
    height: 60px;
    padding-bottom: 50px;
    width: 100%;
    transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  }

  /* responsive iframe with a 16:9 aspect ratio
    thanks https://css-tricks.com/responsive-iframes/
  */
  ::after {
    content: '';
    display: block;
    padding-bottom: calc(100% / (16 / 9));
  }
  & > iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  /* play button */
  & > .lty-playbtn {
    width: 70px;
    height: 46px;
    background-color: #212121;
    z-index: 1;
    opacity: 0.8;
    border-radius: 14%; /* TODO: Consider replacing this with YT's actual svg. Eh. */
    transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  }
  :hover > .lty-playbtn {
    background-color: #f00;
    opacity: 1;
  }
  /* play button triangle */
  & > .lty-playbtn:before {
    content: '';
    border-style: solid;
    border-width: 11px 0 11px 19px;
    border-color: transparent transparent transparent #fff;
  }

  & > .lty-playbtn,
  & > .lty-playbtn:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  /* Post-click styles */
  &.lyt-activated {
    cursor: unset;
  }

  &.lyt-activated::before,
  &.lyt-activated > .lty-playbtn {
    opacity: 0;
    pointer-events: none;
  }
`;

function addPrefetch(kind: 'preload' | 'preconnect', url: string, as?: string) {
  const linkElem = document.createElement('link');
  linkElem.rel = kind;
  linkElem.href = url;
  if (as) linkElem.as = as;
  linkElem.crossOrigin = 'true';
  document.head.append(linkElem);
}

const LiteYouTube = ({
  videoId,
  style,
}: {
  videoId: string;
  style?: React.CSSProperties;
}) => {
  const encodedVideoId = encodeURIComponent(videoId);
  var posterUrl = `https://i.ytimg.com/vi/${encodedVideoId}/hqdefault.jpg`;

  React.useEffect(() => {
    addPrefetch('preload', posterUrl, 'image');
    addPrefetch('preconnect', 'https://www.youtube.com');
    // The botguard script is fetched off from google.com
    addPrefetch('preconnect', 'https://www.google.com');
    // Not certain if these ad related domains are in the critical path. Could verify with domain-specific throttling.
    addPrefetch('preconnect', 'https://googleads.g.doubleclick.net');
    addPrefetch('preconnect', 'https://static.doubleclick.net');
  }, []);

  const [activated, setActivated] = React.useState(false);

  const addIframe = () => {
    if (activated) return;
    return setActivated(true);
  };

  return (
    <LiteYouTubeWrapper
      style={{ ...style, backgroundImage: `url(${posterUrl})` }}
      onClick={addIframe}
      className={`yt-lite ${activated && 'lyt-activated'}`}
    >
      <div className="lty-playbtn"></div>
      {activated && (
        <iframe
          width="560"
          height="315"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          src={`https://www.youtube.com/embed/${encodedVideoId}?autoplay=1`}
        ></iframe>
      )}
    </LiteYouTubeWrapper>
  );
};

export { LiteYouTube };
