App.elements = {
   app: document.getElementById("app"),
   header: {
      root: document.createElement("div"),
      hidari: {
         root: document.createElement("div"),
         svg: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
         path: document.createElementNS('http://www.w3.org/2000/svg', 'path'),
      },
      migi: {
         root: document.createElement("div"),
         svg: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
         path: document.createElementNS('http://www.w3.org/2000/svg', 'path'),
      },
   },
   main: {
      root: document.createElement("div"),
      bgImg: document.createElement("img"),
      mContainer: {
         root: document.createElement("div"),
         title: document.createElement("h1"),
         description: document.createElement("p"),
         products: document.createElement("div"),
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
      svg: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
      path: document.createElementNS('http://www.w3.org/2000/svg', 'path'),
   },
}
