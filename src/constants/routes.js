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

    // auth: 'auth',
    login: '/login',
    signup: '/signup',
    profile: '/profile',
    logout: '/logout',
}

export default routes