import { Inter } from 'next/font/google';
// import 'react-loading-skeleton/dist/skeleton.css';
import './globals.css';
import './variables.scss';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        {/* <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="shortcut icon" href="/favicon.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="Web phim" />
<link rel="manifest" href="/site.webmanifest" /> */}

      </head>
      <body className={`${inter.className}`} suppressHydrationWarning={true}>
        {children}
        {/* <Script id="chatwoot-live-chat" strategy="afterInteractive">
            {`
              (function(d,t) {
                var BASE_URL = "https://7eec7d18410c.ngrok-free.app";
                var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
                g.src = BASE_URL + "/packs/js/sdk.js";
                g.defer = true;
                g.async = true;
                s.parentNode.insertBefore(g,s);
                // debugger;
                g.onload = function() {
                  try {
                    console.log('Chatwoot SDK loaded', window.chatwootSDK);
                    window.chatwootSDK.run({
                      websiteToken: 'dCd1eTrMyTnrHwx6UzXgNAAy',
                      baseUrl: BASE_URL
                    });
                  } catch (error) {
                    console.error('Chatwoot SDK error:', error);
                  }
                }
              })(document, "script");
            `}
            </Script> */}
      </body>
    </html>
  )
}
