const { createBrowserRouter } = require("react-router-dom");
const { default: App } = require("../App");

const route=createBrowserRouter([
    {
        path:'/',
        element:<App/>
    },
])