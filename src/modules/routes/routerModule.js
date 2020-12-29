import {connectRouter, routerMiddleware} from "connected-react-router";

export const getRouterExtension = history => ({
    middleware: [routerMiddleware(history)]
});

const RouterModule = history => ({
    id: 'router',
    reducerMap: {
        router: connectRouter(history)
    }
})

export default RouterModule;