const App = {
    init(){
        console.log("App Started")
        App.controllers.createStaticElements()
        App.controllers.renderer()
        console.log("App Ended", App)
    },



}