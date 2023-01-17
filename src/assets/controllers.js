App.controllers = {

    getCart() {
        const rawData = localStorage.getItem("cart")
        if(rawData) {
            const data = JSON.parse(rawData)

            App.state.cart = data
            App.controllers.updateCart()
        }
    },

    navigate(to) {
        //`はstringと変数を合体させる時に使う。
        history.pushState({ page: 1 }, null, `?page=${to}`)        
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
        let total = 0
        App.state.cart.forEach((product) => {
            total += product.price
        })
        el.innerHTML = `${App.state.cart.length} item <br> Total:USD ${total}`
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
        //price//
        const price = document.createElement("div")
        price.innerHTML = product.price
        //description//
        const desc = document.createElement("div")
        desc.innerHTML = product.description
        //action button//
        const btn = document.createElement("button")
        btn.innerHTML = "Add to cart"
        btn.onclick = () => {
            if (dokokara === "main") {
                App.state.cart.push(product)               
            } else if (dokokara === "cart") {
                //Search the product in the cart
                const idx = App.state.cart.findIndex((p) => p.id === product.id)
                //remove from state
                App.state.cart.splice(idx, 1)
                App.controllers.showCart()
            }
            localStorage.setItem("cart", JSON.stringify(App.state.cart))
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
        els.main.root.style.background = "gray"
        const container = document.createElement("div")
        container.style.display = "flex"
        container.style.gap = "85px"
        container.style.flexWrap = "wrap"
        els.main.root.innerHTML = ""
        els.main.root.appendChild(container)
        App.state.products.forEach((product) => {
            const card = App.controllers.card(product, "main")
            container.appendChild(card)
        })
    },

    showCart() {
        const els = App.elements
        els.main.root.style.display = "none"
        els.cart.root.innerHTML = ""
        const titleContainer = document.createElement("div")
        const title = document.createElement("div")
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
        App.state.cart.forEach((product) => {
            const card = App.controllers.card(product, "cart")
            cartContainer.appendChild(card)
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
        header.hidari.root.style.border = "1px solid black"
        header.hidari.root.innerHTML = "hidari"
        header.hidari.root.style.border = "1px solid black"
        header.hidari.root.innerHTML = "hidari"
        header.migi.root.style.border = "1px solid black"
        header.migi.root.innerHTML = "migi"
        header.migi.root.style.border = "1px solid black"
        header.migi.root.innerHTML = "migi"
        //temporary button for router
        const btn = document.createElement("button")
        btn.innerHTML = "Go to /cart"
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
        els.main.root.style.border = "1px solid black"
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
        els.footer.root.innerHTML = "footer"
        els.app.appendChild(els.footer.root)
    },

    createStaticElements() {
        console.log("create Static Elements")
        const els = App.elements
        els.app.style.width = "100%"
        els.app.style.height = "100%"
        els.app.style.display = "flex"
        els.app.style.flexDirection = "column"
        els.app.style.border = "1px solid black"
        App.controllers.createHeader()
        App.controllers.createMain()
        App.controllers.createCart()
        App.controllers.createFooter()
        console.log("static Elements Created")
    },

}
