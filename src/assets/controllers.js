App.controllers = {
    createStaticElements (){
        console.log("create Static Elements")
        const els = App.elements

        els.app.style.width = "100%"
        els.app.style.height = "100%"

        const header = els.header
        header.root.style.border = "1px solid black"

       

        console.log("static Elements Created")
         

    },
    createMain(){

    },
    createCart(){

    },
    createFooter(){

    },
}
    App.controllers.createHeader()
    App.controllers.createMain()
    App.controllers.createCart()
    App.controllers.createFooter()

