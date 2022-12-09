const App = {
    init(){
        console.log("App Started")
        App.controllers.createStaticElements()
        App.controllers.createHeader()
        App.controllers.createMain()
        App.controllers.createCart()
        App.controllers.createFooter()
        console.log("App Ended", App)
    },



}