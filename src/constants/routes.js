const routes = {
    homepage: '/',

    toys: '/collection',
    toy: id => `/collection/${id}`,
    subscribe: '/subscribe',
    placeorder: '/placeorder',

    contact: '/contact',
    blog: '/blog',
    reviews: '/reviews',
    faq: '/faq',

    login: '/login',
    signup: '/signup',
    profile: '/profile',
    logout: '/logout',

    forgotpass: '/forgotpass',

    admin: '/admin',
}

export default routes