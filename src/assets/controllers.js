App.controllers = {

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
       
        header.root.appendChild(header.hidari.root)
        header.root.appendChild(header.migi.root)
        els.app.appendChild(header.root)

    },


    createMain() {

        const els = App.elements

        els.main.root.style.border ="1px solid black"
        els.main.root.innerHTML = "body"
        els.main.root.style.flexGrow =1
        els.app.appendChild(els.main.root)


    },
    createCart() {
        const els = App.elements

        els.cart.root.style.border ="1px solid black"
        els.cart.root.innerHTML = "cart"
        els.cart.root.style.flexGrow =1
        els.app.appendChild(els.cart.root)

    },
    createFooter() {

        const els = App.elements

        els.footer.root.style.border ="1px solid black"
        els.footer.root.innerHTML = "footer"
        els.app.appendChild(els.footer.root)

    },


    createStaticElements() {
        console.log("create Static Elements")
        const els = App.elements

        els.app.style.width= "100%"
        els.app.style.height= "100%"
        els.app.style.display ="flex"
        els.app.style.flexDirection ="column"
        els.app.style.border ="1px solid black"

        
        App.controllers.createHeader()
        App.controllers.createMain()
        // App.controllers.createCart()
        App.controllers.createFooter()
        console.log("static Elements Created")


    },
    
}


