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
    "revision": "02166e0e3b2b576c684406d2c8a37260"
  },
  {
    "url": "assets/css/0.styles.27faccf6.css",
    "revision": "963943070e938eb7c895cd4618adebe8"
  },
  {
    "url": "assets/img/aloneandmirco.png",
    "revision": "7928ed253c381dba2391a114a9fef2a7"
  },
  {
    "url": "assets/img/consulandetcd.png",
    "revision": "c4731b62b1023d8dfae2efb5d8612d85"
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
    "url": "assets/js/10.87145463.js",
    "revision": "b0a93f732e8e521dc8ebe2ce8b7de6c2"
  },
  {
    "url": "assets/js/11.221fba97.js",
    "revision": "0d017e0d2a309bc6e8a6635b2154772e"
  },
  {
    "url": "assets/js/12.27a5f108.js",
    "revision": "8ba794ec8d25ff47e3425eb5c6590493"
  },
  {
    "url": "assets/js/13.5621dfa6.js",
    "revision": "ec44b5480714098703894660ae997c29"
  },
  {
    "url": "assets/js/14.2ec4739f.js",
    "revision": "46e0677e79007fb9c760de6160fa6850"
  },
  {
    "url": "assets/js/15.7978d65f.js",
    "revision": "ee5777c4b1c16d2c938271a977c30625"
  },
  {
    "url": "assets/js/16.a4bbafb3.js",
    "revision": "1c22ca9e7b7c43d6879fc88af0cfaaac"
  },
  {
    "url": "assets/js/17.155e45f3.js",
    "revision": "6002f421170df575bcc9db65781a8356"
  },
  {
    "url": "assets/js/18.1e424122.js",
    "revision": "5d7b4a95da4709d031296906ddf487c6"
  },
  {
    "url": "assets/js/19.ba302dd1.js",
    "revision": "393d7bb596fc4cca4f297df0906bedd2"
  },
  {
    "url": "assets/js/2.1492d491.js",
    "revision": "0621bbb87261ec7788c8097fa4530257"
  },
  {
    "url": "assets/js/20.9a4ebae3.js",
    "revision": "5218bed4cd463c9ecb2f20de505bcf0c"
  },
  {
    "url": "assets/js/21.9f481994.js",
    "revision": "3ea1e5f3e65aacb7ba579d11a108cf18"
  },
  {
    "url": "assets/js/22.100055d7.js",
    "revision": "c98428d5014e8e0d2beb7af4e12b382a"
  },
  {
    "url": "assets/js/23.d2447aea.js",
    "revision": "dcd2470bdf0e504bc0663ea881735842"
  },
  {
    "url": "assets/js/24.28bff12b.js",
    "revision": "8454160b1e15a4ca97885bf8b479fce7"
  },
  {
    "url": "assets/js/25.3fbec856.js",
    "revision": "8cce5c93cde8b69d71d0afd75fbdcb2d"
  },
  {
    "url": "assets/js/26.59c4ff75.js",
    "revision": "9efeeea847eb8c90f2c22b65ab417ddf"
  },
  {
    "url": "assets/js/27.9553aeb5.js",
    "revision": "b8db511da08b00707325adba1e8f75b8"
  },
  {
    "url": "assets/js/28.20bad81c.js",
    "revision": "ccfe5bc2fe98af9f22a8d830de33f4e6"
  },
  {
    "url": "assets/js/29.b3f96c7b.js",
    "revision": "fb1df332078efb9dad44cc0c856fcfa7"
  },
  {
    "url": "assets/js/3.90399333.js",
    "revision": "61e58df782650ca84da9824e90a3b262"
  },
  {
    "url": "assets/js/30.85ff35d9.js",
    "revision": "9b4995e157df711f8723e70354bccf66"
  },
  {
    "url": "assets/js/31.34457343.js",
    "revision": "ca66cb102a6acfb3ba521c9e868f44ea"
  },
  {
    "url": "assets/js/32.d29e33a7.js",
    "revision": "b6d648595878f50d6a9d4f41b91bf56f"
  },
  {
    "url": "assets/js/33.7f0bb146.js",
    "revision": "f3ce2306d44e8386416d212835861cc4"
  },
  {
    "url": "assets/js/34.22f42eb7.js",
    "revision": "5cc34d17628c3431e291facc9df97c63"
  },
  {
    "url": "assets/js/35.8da0a2e7.js",
    "revision": "a16e582f4316c6837c43718cba941e8f"
  },
  {
    "url": "assets/js/36.886317b1.js",
    "revision": "36623691e81955af5918cb07580bf20d"
  },
  {
    "url": "assets/js/37.3b7af4a8.js",
    "revision": "f3cd96d6f745e275224f275de292b487"
  },
  {
    "url": "assets/js/38.5c38d261.js",
    "revision": "c50cafaa07676ee7bfec04fe9822dbbc"
  },
  {
    "url": "assets/js/39.6e003123.js",
    "revision": "4bb865eacf2acdd97cffb9450f9ad195"
  },
  {
    "url": "assets/js/4.9afa6061.js",
    "revision": "3fb5eb149601441006c79b398782ba41"
  },
  {
    "url": "assets/js/40.ec5c04a8.js",
    "revision": "0d75cd9b52f058db631e76d629e77e9a"
  },
  {
    "url": "assets/js/41.a8ace955.js",
    "revision": "dbd6ded2be3febea589ca7aa73813041"
  },
  {
    "url": "assets/js/42.54abc729.js",
    "revision": "c9406648fe2fbf00cb8e7f5f15744759"
  },
  {
    "url": "assets/js/43.c6d0b564.js",
    "revision": "7ca8ecb073d81aaee3e9504a7dcb1b1b"
  },
  {
    "url": "assets/js/44.6174cfcf.js",
    "revision": "517e6da6b9c2ebb3bbaa643499cb7721"
  },
  {
    "url": "assets/js/45.09f6dca3.js",
    "revision": "1fb5b80269f3dc85c79e625524bef7b3"
  },
  {
    "url": "assets/js/46.da2e383b.js",
    "revision": "fcc6a55ec780aca29708b3d866686859"
  },
  {
    "url": "assets/js/47.63973a6e.js",
    "revision": "e9cc3c3d1ee3ecf5545d93ed899b3683"
  },
  {
    "url": "assets/js/48.dfd70d39.js",
    "revision": "060ca3cfd9998a1fc50ed141d0dc528c"
  },
  {
    "url": "assets/js/49.54fd64f2.js",
    "revision": "4dbd21c8b362d5d0260924e706572b4c"
  },
  {
    "url": "assets/js/5.e99d3266.js",
    "revision": "693b84091cccecffd4bf76d3b5434494"
  },
  {
    "url": "assets/js/50.a7cbc80a.js",
    "revision": "1d71f657f215678528d035062b7b3022"
  },
  {
    "url": "assets/js/51.0e2ca6d1.js",
    "revision": "d5cc5611bb1cb825ef8784c96ea058aa"
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
    "url": "assets/js/8.e855ae57.js",
    "revision": "01c657b57dd2a7aa4308198a560e7195"
  },
  {
    "url": "assets/js/9.a7df38a9.js",
    "revision": "a8f10c03ee16e565da360b2fdf750894"
  },
  {
    "url": "assets/js/app.edd54447.js",
    "revision": "4d36d15c22305cbf5dfa15c8dba9a0b0"
  },
  {
    "url": "backend/cplus/index.html",
    "revision": "80d6aa49063f1849a176176cd6a46292"
  },
  {
    "url": "backend/golang/context.html",
    "revision": "9ad1400b22e9b10447a1c95db1951765"
  },
  {
    "url": "backend/golang/coredump.html",
    "revision": "6f30fce66aa8f891390c6ed91d281e71"
  },
  {
    "url": "backend/golang/distributed.html",
    "revision": "9f884784c7a7ac6beeefd05fc98babb2"
  },
  {
    "url": "backend/golang/index.html",
    "revision": "31118d4ff2ac3992ad40e3917529c0c2"
  },
  {
    "url": "backend/golang/logrus.html",
    "revision": "2effdd581c7b71a9cc687174ced2c160"
  },
  {
    "url": "backend/golang/map.html",
    "revision": "4ffeca681c2f93b3b66eb33cd0c4a672"
  },
  {
    "url": "backend/golang/micro.html",
    "revision": "2f8ed2f8bdf0c6ab2118ba9b5f39a209"
  },
  {
    "url": "backend/lua/index.html",
    "revision": "f129f13dba8735822ac8eae42def0d5c"
  },
  {
    "url": "backend/python/django.html",
    "revision": "fc66f635ad22522c8f83f41d211ede34"
  },
  {
    "url": "backend/python/index.html",
    "revision": "ad6ab2294a54b124085d3d516f57c829"
  },
  {
    "url": "backend/vba/index.html",
    "revision": "6dcd9eee55bcfbf37a6b38c393d29b67"
  },
  {
    "url": "database/etcd/index.html",
    "revision": "1b302d069293a38acb71b30aa7fb215d"
  },
  {
    "url": "database/mongodb/index.html",
    "revision": "5edbca1e06035da97c093d51cb3cbce6"
  },
  {
    "url": "database/mysql/index.html",
    "revision": "d4142009ad150e9da5536cbc748be9bd"
  },
  {
    "url": "database/mysql/lock.html",
    "revision": "ea4fa50ad787bd5d6b0d9996b2517251"
  },
  {
    "url": "database/mysql/split.html",
    "revision": "50fb75c565b010cf818d83e503d319b7"
  },
  {
    "url": "database/mysql/thing.html",
    "revision": "4a68932c898c609939306c31a3f0bac5"
  },
  {
    "url": "database/redis/index.html",
    "revision": "e0553f2395b0a62b44f5ad04016d4ff4"
  },
  {
    "url": "frontend/vue/index.html",
    "revision": "0c7228990fc289c532ccc26bd575a189"
  },
  {
    "url": "guide/index.html",
    "revision": "e60423e9e7316707c130f0f93082fcac"
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
    "revision": "e8ef2663f755e6774dd16fce60e1d76b"
  },
  {
    "url": "opersystem/linux/index.html",
    "revision": "e635307eede5842e1c4407d1b4e9e31e"
  },
  {
    "url": "opersystem/linux/shell.html",
    "revision": "977165dc4a6aa5df4a61fee822a9b861"
  },
  {
    "url": "opersystem/windows/index.html",
    "revision": "1678165091c9e4ef4911ab26f5119743"
  },
  {
    "url": "other/docker/index.html",
    "revision": "e3edfc2e8781087b2836d931e8a9ad75"
  },
  {
    "url": "other/interview/index.html",
    "revision": "771e1784c349fe694a4faae3f364d71b"
  },
  {
    "url": "other/k8s/index.html",
    "revision": "c99256bacec4b5d66dc14a15b48ccfb2"
  },
  {
    "url": "other/nginx/index.html",
    "revision": "11206a6688d726d235940a2c9f0a1f8f"
  },
  {
    "url": "other/other/index.html",
    "revision": "3260e95667492d40b1919703a2dae303"
  },
  {
    "url": "other/other/system.html",
    "revision": "359bac8c0e8a948bbe7e1323994c1272"
  },
  {
    "url": "other/rabbitmq/index.html",
    "revision": "59756e2033487c20dfdfebaf58e4e091"
  },
  {
    "url": "other/workrecord/index.html",
    "revision": "501a3649f3baa8415e242ccb549ae582"
  },
  {
    "url": "programming/algo/index.html",
    "revision": "5624a79de2617419802e30da4e535c96"
  },
  {
    "url": "programming/algo/tree.html",
    "revision": "0a2de4827247301508e4c84bcd45725f"
  },
  {
    "url": "programming/pattern/index.html",
    "revision": "7c0f454f2ce35528d6f681251d6c5d9d"
  },
  {
    "url": "programming/pattern/item.html",
    "revision": "5a4713cec9ca3e3cce3adee2ca2e5ccc"
  },
  {
    "url": "tool/git/index.html",
    "revision": "10b8faa235ac3e53c31b158cda4938f3"
  },
  {
    "url": "tool/goland/index.html",
    "revision": "6290aaa84e45154c77def93beb7be15f"
  },
  {
    "url": "tool/pycharm/index.html",
    "revision": "9f2bd3b1950993f360ef2ba6f722c008"
  },
  {
    "url": "tool/vscode/index.html",
    "revision": "ee88d61a8464c4f3f4fb4e1d87fa282e"
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
