App.elements = {
   app: document.getElementById("app"),
   header: {
      root: document.createElement("div"),
      hidari: {
         root: document.createElement("div"),
         img: document.createElement("img"),
      },
      migi: {
         root: document.createElement("div"),
         img: document.createElement("img"),
      },
   },
   main: {
      root: document.createElement("div"),
      bgImg: document.createElement("img"),
      mContainer: {
         root: document.createElement("div"),
         title: document.createElement("h1"),
         description: document.createElement("p"),
      },
   },
   cart: {
      root: document.createElement("div"),
      products: {
      root: document.createElement("div"),
      },
      confirm: document.createElement("button"),
   },
   footer: {
      root: document.createElement("div"),
      img: document.createElement("img"),
   },
}
