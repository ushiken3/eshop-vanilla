const App = {
    init(){
        console.log("App Started") 
        App.controllers.createStaticElements()
        App.controllers.renderer()
        App.controllers.getCart()
        console.log("App Ended", App)
    },



}
