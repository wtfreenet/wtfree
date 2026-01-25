'use client'; // Required for client components in App Router

import Script from 'next/script';

const HistatsAnalytics = () => {
  return (
    <>
      <Script id="histats-analytics" strategy="afterInteractive">
        {`
          var _Hasync= _Hasync|| [];
          _Hasync.push(['Histats.start', '1,5004979,4,511,95,18,00000000']);
          _Hasync.push(['Histats.fasi', '1']);
          _Hasync.push(['Histats.track_hits', '']);
          (function() {
            var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
            hs.src = ('//s10.histats.com/js15_as.js');
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
          })();
        `}
      </Script>
      <noscript>
        <a href="/" target="_blank">
          <img
            src="//sstatic1.histats.com/0.gif?5004979&101"
            alt="free site statistics"
            style={{ border: 0 }}
          />
        </a>
      </noscript>
    </>
  );
};

export default HistatsAnalytics;
