App.controllers = {

    navigate(to) {
        history.pushState({page: 1}, null,`?page=${to}`)
        //`はstringと変数を合体させる時に使う。
        App.controllers.renderer()

    },
    renderer(){
        const searchParams = new URLSearchParams(window.location.search)
        const currentPage = searchParams.get("page")

        if (currentPage ==="cart") {
            App.controllers.showCart()
        } else {
            App.controllers.showMain()
        }
        },

        showMain() {
            const els = App.elements

            els.cart.root.style.display ="none"

            els.main.root.style.display ="block"
        },
        showCart(){
            const els = App.elements

            els.main.root.style.display ="none"

            els.cart.root.style.display ="block"

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
       const btn =document.createElement("button")
       btn.innerHTML = "Go to /cart"
       btn.onclick = () =>{
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

        els.main.root.style.border ="1px solid black"
        els.main.root.innerHTML = "body"
        els.main.root.style.flexGrow =1
        els.app.appendChild(els.main.root)


    },
    createCart() {
        const els = App.elements

        els.cart.root.style.display ="none"
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
        App.controllers.createCart()
        App.controllers.createFooter()
        console.log("static Elements Created")


    },
    
}


