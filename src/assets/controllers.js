App.controllers = {

    getCart() {
        const rawData = localStorage.getItem("cart")
        if (rawData) {
            const data = JSON.parse(rawData)

            App.state.cart = data
            App.controllers.updateCart()
            console.log("get")
        }
    },

    navigate(to) {
        history.pushState({ page: 1 }, null, `?page=${to}`)
        //`はstringと変数を合体させる時に使う。
        App.controllers.renderer()

    },

    renderer() {
        const searchParams = new URLSearchParams(window.location.search)
        const currentPage = searchParams.get("page")
        if (currentPage === "cart") {
            App.controllers.showCart()
        } else {
            App.controllers.showMain()
        }
    },

    updateCart() {
        const el = App.elements.header.migi.root
        let totalCount = 0
        let total = 0
        App.state.cart.forEach((product) => {
            total += product.price*product.count
            totalCount += product.count
            console.log(product)
        })
        el.innerHTML = `${totalCount} item <br> Total:USD ${total}`
    },
    card(product, dokokara) {
        const el = document.createElement("div")
        el.style.border = "1px solid black"
        //image//
        const img = document.createElement("img")
        img.src = product.Image
        img.style.maxHeight = "300px"
        img.style.maxWidth = "300px"
        img.style.borderRadius = "50%"
        //title//
        const title = document.createElement("div")
        title.innerHTML = product.name
        title.style.textAlign ="center"
        //price//
        const price = document.createElement("div")
        price.innerHTML = product.price
        price.style.textAlign ="center"
        //description//
        const desc = document.createElement("div")
        desc.innerHTML = product.description
        desc.style.textAlign ="center"
        //action button//
        const btn = document.createElement("button")
        btn.innerHTML = "Add to cart"
        btn.style.display ="flex"
        btn.style.justifyContent ="center"
        btn.onclick = () => {
            if (dokokara === "main") {
                const exist = App.state.cart.find((p) => p.id === product.id)
                const idx = App.state.cart.findIndex((p) => p.id === product.id)
                console.log("eeee",idx)
                if (exist) {
                    App.state.cart[idx].count =  App.state.cart[idx].count+1
                }
                else{
                    App.state.cart.push({
                        ...product, count: 1
                    })
                } 
                console.log("state",App.state.cart)         
                localStorage.setItem("cart", JSON.stringify(App.state.cart))
            } else if (dokokara === "cart") {
                //Search the product in the cart
                const idx = App.state.cart.findIndex((p) => p.id === product.id)
                //remove from state
                const exist = App.state.cart.find((p) => p.id === product.id)
                if (exist ) {
                    App.state.cart[idx].count =  App.state.cart[idx].count-1
                    console.log("ttt",exist)
                }
                else{
                    App.state.cart.push({
                        ...product, count: 1
                        
                    })
                } 
                App.state.cart.splice(idx, 1)
                localStorage.removeItem("cart")
                localStorage.setItem("cart", JSON.stringify(App.state.cart))
                console.log("splice",App.state.cart)
                App.controllers.showCart()
            }
            App.controllers.updateCart()
        }
        if (dokokara === "main") {
            btn.innerHTML = "Add to cart"
        } else if (dokokara === "cart") {
            btn.innerHTML = "Remove from cart"
        }
        el.appendChild(img)
        el.appendChild(title)
        el.appendChild(price)
        el.appendChild(desc)
        el.appendChild(btn)

        return el
    },

    showMain() {
        const els = App.elements
        els.cart.root.style.display = "none"
        els.main.root.style.display = "block"
        els.main.bgImg.src = "https://tokubai-news-photo-production.tokubai.co.jp/c/w=1400,h=865,a=2,f=jpg/86a7/e977/d795/8317/1296/fac8/a92a/c7c9/07dac8a84e337c15.jpg"
        els.main.bgImg.style.width = "1000px"
        els.main.bgImg.style.display = "block"
        els.main.bgImg.style.margin = "auto"
        els.main.mContainer.title.innerHTML = "Our products"
        els.main.mContainer.title.classList.add("mConTitle")
        els.main.mContainer.description.innerHTML = "These fruits will make you happy with these SWEET tastes!!!"
        els.main.mContainer.description.classList.add("mConDsc")
        els.main.mContainer.products = document.createElement("div")
        els.main.mContainer.products.style.display = "flex"
        els.main.mContainer.products.style.justifyContent = "space-between"
        els.main.mContainer.products.style.gap = "85px"
        els.main.mContainer.products.style.flexWrap = "wrap"
        els.main.root.innerHTML = ""
        els.main.root.appendChild(els.main.bgImg)
        els.main.root.appendChild(els.main.mContainer.root)
        els.main.mContainer.root.appendChild(els.main.mContainer.title)
        els.main.mContainer.root.appendChild(els.main.mContainer.description)
        els.main.root.appendChild(els.main.mContainer.products)
        App.state.products.forEach((product) => {
            const card = App.controllers.card(product, "main")
            els.main.mContainer.products.appendChild(card)
        })
    },

    showCart() {
        const els = App.elements
        els.main.root.style.display = "none"
        els.cart.root.innerHTML = ""
        const titleContainer = document.createElement("div")
        const title = document.createElement("div")
        App.controllers.getCart()
        title.innerHTML = `My cart [Total Amount : ${App.state.cart.length}]`
        title.style.fontFamily = "Roboto"
        title.style.fontStyle = "normal"
        title.style.fontWeight = "700"
        title.style.fontSize = "24px"
        title.style.lineHeight = "29px"
        title.style.color = "#000000"
        title.style.textAlign = "center"
        titleContainer.appendChild(title)
        els.cart.root.appendChild(titleContainer)
        const cartContainer = document.createElement("div")
        cartContainer.style.display = "flex"
        cartContainer.style.gap = "85px"
        cartContainer.style.flexWrap = "wrap"
        let createdId = [] 
        App.state.cart.forEach((product) => {
            const hasId = App.state.cart.find(element => element.id === product.id)

            console.log("hasId",hasId)
            const card = App.controllers.card(product, "cart")
            cartContainer.appendChild(card)
            console.log("foreach",product.id)
        })
        els.cart.root.appendChild(cartContainer)
        els.cart.root.style.display = "block"
    },

    createHeader() {
        const els = App.elements
        const header = els.header
        header.root.style.border = "1px solid black"
        header.root.style.display = "flex"
        header.root.style.justifyContent = "space-between"   
        header.hidari.svg.setAttribute("width", "48px")
        header.hidari.svg.setAttribute("height", "36px")
        header.hidari.path.setAttribute("d","M23.25 17.35V11.2h-6.2v-3h6.2V2.05h3V8.2h6.15v3h-6.15v6.15ZM14.5 44q-1.5 0-2.55-1.05-1.05-1.05-1.05-2.55 0-1.5 1.05-2.55Q13 36.8 14.5 36.8q1.5 0 2.55 1.05 1.05 1.05 1.05 2.55 0 1.5-1.05 2.55Q16 44 14.5 44Zm20.2 0q-1.5 0-2.55-1.05-1.05-1.05-1.05-2.55 0-1.5 1.05-2.55 1.05-1.05 2.55-1.05 1.5 0 2.55 1.05 1.05 1.05 1.05 2.55 0 1.5-1.05 2.55Q36.2 44 34.7 44ZM14.5 33.65q-2.1 0-3.075-1.7-.975-1.7.025-3.45l3.05-5.55L7 7H3.1V4h5.8l8.5 18.2H32l7.8-14 2.6 1.4-7.65 13.85q-.45.85-1.225 1.3-.775.45-1.825.45h-15l-3.1 5.45h24.7v3Z")
        header.hidari.root.appendChild(header.hidari.svg)
        header.hidari.svg.appendChild(header.hidari.path)
        header.migi.root.style.border = "1px solid black"
        header.migi.root.innerHTML = "Shopping"
        //temporary button for router
        const btn = document.createElement("button")
        btn.innerHTML = "Go to /cart"
        btn.style.marginLeft = "5px"
        btn.onclick = () => {
            App.controllers.navigate("cart")
        },
            header.hidari.root.appendChild(btn)
        const btn2 = document.createElement("button")
        btn2.innerHTML = "Go to /main"
        btn2.onclick = () => {
            App.controllers.navigate("main")
        },
            header.hidari.root.appendChild(btn2)
        header.root.appendChild(header.hidari.root)    
        header.root.appendChild(header.migi.root)
        els.app.appendChild(header.root)
    },


    createMain() {
        const els = App.elements
      
        els.main.root.innerHTML = "body"
        els.main.root.style.flexGrow = 1
        els.app.appendChild(els.main.root)
    },

    createCart() {
        const els = App.elements
        els.cart.root.style.display = "none"
        els.cart.root.style.border = "1px solid black"
        els.cart.root.innerHTML = "cart"
        els.cart.root.style.flexGrow = 1
        els.app.appendChild(els.cart.root)
    },

    createFooter() {
        const els = App.elements
        els.footer.root.style.border = "1px solid black"
        els.footer.root.style.textAlign = "center"
        els.footer.svg.setAttribute("width", "48px")
        els.footer.svg.setAttribute("height", "36px")
        els.footer.path.setAttribute("d","M23.25 17.35V11.2h-6.2v-3h6.2V2.05h3V8.2h6.15v3h-6.15v6.15ZM14.5 44q-1.5 0-2.55-1.05-1.05-1.05-1.05-2.55 0-1.5 1.05-2.55Q13 36.8 14.5 36.8q1.5 0 2.55 1.05 1.05 1.05 1.05 2.55 0 1.5-1.05 2.55Q16 44 14.5 44Zm20.2 0q-1.5 0-2.55-1.05-1.05-1.05-1.05-2.55 0-1.5 1.05-2.55 1.05-1.05 2.55-1.05 1.5 0 2.55 1.05 1.05 1.05 1.05 2.55 0 1.5-1.05 2.55Q36.2 44 34.7 44ZM14.5 33.65q-2.1 0-3.075-1.7-.975-1.7.025-3.45l3.05-5.55L7 7H3.1V4h5.8l8.5 18.2H32l7.8-14 2.6 1.4-7.65 13.85q-.45.85-1.225 1.3-.775.45-1.825.45h-15l-3.1 5.45h24.7v3Z")
        els.footer.root.appendChild(els.footer.svg)
        els.footer.svg.appendChild(els.footer.path)
        els.app.appendChild(els.footer.root)
    },

    createStaticElements() {
        console.log("create Static Elements")
        const els = App.elements
        els.app.style.width = "100%"
        els.app.style.height = "100%"
        els.app.style.display = "flex"
        els.app.style.flexDirection = "column"
        App.controllers.createHeader()
        App.controllers.createMain()
        App.controllers.createCart()
        App.controllers.createFooter()
        console.log("static Elements Created")
    },

}
