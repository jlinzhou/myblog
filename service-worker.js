/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "4b6d279255997d9d4bd42459baf748d3"
  },
  {
    "url": "about.html",
    "revision": "318c044a544024dac72bf7fc24b79009"
  },
  {
    "url": "about1.html",
    "revision": "867a2979a2f0dbc7da33539a43c2d411"
  },
  {
    "url": "assets/css/0.styles.27faccf6.css",
    "revision": "963943070e938eb7c895cd4618adebe8"
  },
  {
    "url": "assets/img/logo.png",
    "revision": "f9627ffc8f73afdfa11291f45a5530bb"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.90fe747a.js",
    "revision": "626c89f4f4b243b9f67bb092469a0979"
  },
  {
    "url": "assets/js/11.49b66e17.js",
    "revision": "c5d2201cc20d6fe39a0b04b818b6e59b"
  },
  {
    "url": "assets/js/12.162dab37.js",
    "revision": "4040994c0d53b19aa6294a27ec8d6bd4"
  },
  {
    "url": "assets/js/13.b5fc09a4.js",
    "revision": "03ea6cc1960e39828e4778e84b168517"
  },
  {
    "url": "assets/js/14.b10affa5.js",
    "revision": "74b36d019e37f8f1914f5cb5ee202f46"
  },
  {
    "url": "assets/js/15.c8e10135.js",
    "revision": "91a2af2af9f843c15e73a5e46a6145cb"
  },
  {
    "url": "assets/js/16.bc51b658.js",
    "revision": "b870e74dfc92bf5690bf06ec2cc782b0"
  },
  {
    "url": "assets/js/17.f9afbc3d.js",
    "revision": "f295dab3c9fd6d38bdc62e83d9c3e1e3"
  },
  {
    "url": "assets/js/18.9eb71ed7.js",
    "revision": "5d7b4a95da4709d031296906ddf487c6"
  },
  {
    "url": "assets/js/19.2e1bd6da.js",
    "revision": "c4d61f77f32f918b0f21dd00582b46bb"
  },
  {
    "url": "assets/js/2.1492d491.js",
    "revision": "0621bbb87261ec7788c8097fa4530257"
  },
  {
    "url": "assets/js/20.179fa2e7.js",
    "revision": "bd25fa66d86223845ab36b57f89733e3"
  },
  {
    "url": "assets/js/21.8d62d0c4.js",
    "revision": "2496bfb79a2b66d30960d4bf8ff5289e"
  },
  {
    "url": "assets/js/22.e2724702.js",
    "revision": "c98428d5014e8e0d2beb7af4e12b382a"
  },
  {
    "url": "assets/js/23.6ab70dc1.js",
    "revision": "dcd2470bdf0e504bc0663ea881735842"
  },
  {
    "url": "assets/js/24.276649f6.js",
    "revision": "5946b0d664db954504349f9e4c752b7f"
  },
  {
    "url": "assets/js/25.35eab6ec.js",
    "revision": "4feee6c02216b41fa0a4dc77590ab2cf"
  },
  {
    "url": "assets/js/26.c50ce340.js",
    "revision": "cd717fe81a860ca1706ec20955c4d357"
  },
  {
    "url": "assets/js/27.feff0012.js",
    "revision": "6c33e5db9ae258bed61debf666108e90"
  },
  {
    "url": "assets/js/28.096a75b1.js",
    "revision": "08388c307e1d74ddfe51dd1e869ee604"
  },
  {
    "url": "assets/js/3.fb57ba34.js",
    "revision": "7df1fe8edc626e14c505584b02d4235f"
  },
  {
    "url": "assets/js/4.3a5aefed.js",
    "revision": "dc4a00ff898d034989fcf6a378dfa690"
  },
  {
    "url": "assets/js/5.a5677d38.js",
    "revision": "2e04132bb1384084bf03e0486977bfd6"
  },
  {
    "url": "assets/js/6.a4c4b5d6.js",
    "revision": "c774c38d04533e427ba814d0508beece"
  },
  {
    "url": "assets/js/7.be7c9864.js",
    "revision": "4620e14b1195a6918b6c5f6c3f8fbb25"
  },
  {
    "url": "assets/js/8.f9084c3e.js",
    "revision": "fd4f3630b343c4973f81fd98493ee661"
  },
  {
    "url": "assets/js/9.2e88165f.js",
    "revision": "8ce0dd935e258418b295928e7a067546"
  },
  {
    "url": "assets/js/app.69313f03.js",
    "revision": "7e52dc014dc058501c159a098218031a"
  },
  {
    "url": "countup.html",
    "revision": "04afd1ce3538cfbd5f01961b62770bbb"
  },
  {
    "url": "css/index.html",
    "revision": "fef30f1416b0f3fbdf484ac76863da45"
  },
  {
    "url": "css/s1/c-aaa.html",
    "revision": "33def8d4520f1ddc65f01707a8a2899b"
  },
  {
    "url": "css/s1/c-bbb.html",
    "revision": "4f0a595ee09da3e28cfb58a7dd491b32"
  },
  {
    "url": "css/s1/c-ccc.html",
    "revision": "1096e4b03d4e82454e105f0a7c298395"
  },
  {
    "url": "css/s1/index.html",
    "revision": "c53698a6a6571a61c4ae8c0e25f0cd98"
  },
  {
    "url": "css/s2/c-aaa.html",
    "revision": "ee9d05ae9e19584d6eb82648f9002edd"
  },
  {
    "url": "css/s2/c-bbb.html",
    "revision": "815176a122ae7d02d857a7466cf5a1b3"
  },
  {
    "url": "css/s2/c-ccc.html",
    "revision": "df102a0b17a684fa5e5c3da72ad90c45"
  },
  {
    "url": "css/s2/index.html",
    "revision": "a4e588cc44fe66a33031f4e41c421883"
  },
  {
    "url": "css/s3/c-aaa.html",
    "revision": "f6fa876d905c2f024bfbef8a49ab9074"
  },
  {
    "url": "css/s3/c-bbb.html",
    "revision": "ff3c00286be15e940c968dad80e61734"
  },
  {
    "url": "css/s3/c-ccc.html",
    "revision": "c925d2661b882fc63429e1ec48f85ac9"
  },
  {
    "url": "css/s3/index.html",
    "revision": "751a5b727f5d11bd579ecd9f8e336d4c"
  },
  {
    "url": "icons/icon-128x128.png",
    "revision": "786b2590386eeae21d38ec00ab68c092"
  },
  {
    "url": "icons/icon-144x144.png",
    "revision": "633a83c21dbe70306bd1be4844b6db89"
  },
  {
    "url": "icons/icon-152x152.png",
    "revision": "7ee1bc0268cadd0e758b83521a72ceb6"
  },
  {
    "url": "icons/icon-192x192.png",
    "revision": "23e6ce7ab545ce7eff8af97295203b7b"
  },
  {
    "url": "icons/icon-384x384.png",
    "revision": "48e9011337f800dbdf2d2b0de8ac96a4"
  },
  {
    "url": "icons/icon-512x512.png",
    "revision": "8c2b387ea48f978aa9b24f69e6683d5b"
  },
  {
    "url": "icons/icon-72x72.png",
    "revision": "6fea87609efe807ce5617aa3abb4a4ae"
  },
  {
    "url": "icons/icon-96x96.png",
    "revision": "48e32f7f06a0c1d389023cd23a911729"
  },
  {
    "url": "index.html",
    "revision": "1344432a13b151d05058b22433a6c360"
  },
  {
    "url": "quexue.html",
    "revision": "c8f1c06e435c6816e2a7a96462bcae46"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
