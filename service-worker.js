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
    "revision": "7db5a6e7323b0c42e1c73773d912a78b"
  },
  {
    "url": "about.html",
    "revision": "5d85b4f159ed60664f730d1cfc51d804"
  },
  {
    "url": "about1.html",
    "revision": "df274dc0d62579a04c9967f8caa05c65"
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
    "url": "assets/js/10.1d975b6f.js",
    "revision": "971e7504cc14b15d1ba204ea0e1d78d7"
  },
  {
    "url": "assets/js/11.5e69b9b9.js",
    "revision": "7ddc18de0dbcffa68b61627d472a0e8b"
  },
  {
    "url": "assets/js/12.680a301a.js",
    "revision": "5deef43e99a8b3dab6ccd2324ca32fb1"
  },
  {
    "url": "assets/js/13.f399e20d.js",
    "revision": "04828cc548dbaa8caae14ac5a2ef99bd"
  },
  {
    "url": "assets/js/14.59700c7b.js",
    "revision": "28e5c293c9ff26433f60db1db0e3b183"
  },
  {
    "url": "assets/js/15.fd778f48.js",
    "revision": "7ffa6843a464a86ec97b569a8d697fc8"
  },
  {
    "url": "assets/js/16.e7e6ecf8.js",
    "revision": "521425215e0737dacad1170951554e68"
  },
  {
    "url": "assets/js/17.e00531cc.js",
    "revision": "44ad27edd3bcfaa5ec81324824c103c5"
  },
  {
    "url": "assets/js/18.f8000283.js",
    "revision": "07a31a02e22db1a6a8c08829d16ee3c0"
  },
  {
    "url": "assets/js/19.f3f954b4.js",
    "revision": "7d6e687ce10cb1b947b114777b4b1182"
  },
  {
    "url": "assets/js/2.413f95f5.js",
    "revision": "9c6238f8125f9d64226e31d3b50d973e"
  },
  {
    "url": "assets/js/20.7a4cae34.js",
    "revision": "ed786c6aec4618a803c358e51527eab1"
  },
  {
    "url": "assets/js/21.f0f63856.js",
    "revision": "2cd699df0229a05c6e0b133714c7c3ae"
  },
  {
    "url": "assets/js/22.77b1b826.js",
    "revision": "19faa6b4fbf80a19f05040790db4fa6f"
  },
  {
    "url": "assets/js/23.fca3fb62.js",
    "revision": "bb43affcc41d4434fd83ccde68be52d4"
  },
  {
    "url": "assets/js/24.58233c9d.js",
    "revision": "d36f18e6af84a6517bb2caf13c158a78"
  },
  {
    "url": "assets/js/25.c5ba5240.js",
    "revision": "1e0ec3135305104d2758c3d16e6ab274"
  },
  {
    "url": "assets/js/3.60464060.js",
    "revision": "6d8bab97bd2a874771208e1f5ebeb510"
  },
  {
    "url": "assets/js/4.6cfccb71.js",
    "revision": "2bdd13bd405d80e24c8c9b21ec098ba1"
  },
  {
    "url": "assets/js/5.1328a16e.js",
    "revision": "a1e9b3574aa3b7aeb0eb773b7337580c"
  },
  {
    "url": "assets/js/6.057d74d2.js",
    "revision": "79d80e3a7e7713024d0ce7ef662d9d26"
  },
  {
    "url": "assets/js/7.144973b5.js",
    "revision": "368e29367270ddad9c30babdd212333b"
  },
  {
    "url": "assets/js/8.d9e38fa6.js",
    "revision": "96579c471f79e3f7c353b5aca32fbdc4"
  },
  {
    "url": "assets/js/9.3fe22e75.js",
    "revision": "82958036ea99bbf13b4abaca99ebe1a9"
  },
  {
    "url": "assets/js/app.86d91b5a.js",
    "revision": "4295407fdc3712af697b4cc50f14ea55"
  },
  {
    "url": "css/index.html",
    "revision": "09977d0fba2e5c5d5680fe8495dccdd8"
  },
  {
    "url": "css/s1/c-aaa.html",
    "revision": "c884e25eda7b0ebbb1154cff250c3763"
  },
  {
    "url": "css/s1/c-bbb.html",
    "revision": "ffd690f6f9f616cfa8ab6af22af983ee"
  },
  {
    "url": "css/s1/c-ccc.html",
    "revision": "5c76217f04b8d3c3869071f2da14e049"
  },
  {
    "url": "css/s1/index.html",
    "revision": "a1f4cc41055fdf41e8c8b0d4edf0a7d5"
  },
  {
    "url": "css/s2/c-aaa.html",
    "revision": "325486b88420c7753bc6ef00596674cb"
  },
  {
    "url": "css/s2/c-bbb.html",
    "revision": "94ad5d4bd9eb2fe83818c30bf38d9a22"
  },
  {
    "url": "css/s2/c-ccc.html",
    "revision": "466fb0f273809f4d1409e6ab78863643"
  },
  {
    "url": "css/s2/index.html",
    "revision": "59ae97ac065614cd0e5247412f0d5e56"
  },
  {
    "url": "css/s3/c-aaa.html",
    "revision": "b7cf111c55f5e98532447f9247206081"
  },
  {
    "url": "css/s3/c-bbb.html",
    "revision": "44d9c4479ec2de02724b5f383a4440a5"
  },
  {
    "url": "css/s3/c-ccc.html",
    "revision": "76bc21bee551b81872f0b30fa22ba9f2"
  },
  {
    "url": "css/s3/index.html",
    "revision": "3df40aaf66697f2ea4ca775ec7904c9b"
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
    "revision": "28c0dd2027f0c136687f6ceaec512a7b"
  },
  {
    "url": "quexue.html",
    "revision": "df783cc2869ef79136e1963ff99d1c37"
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
