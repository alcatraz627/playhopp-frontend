const routes = {
    homepage: '/',

    toys: '/toys',
    toy: id => `/toys/${id}`,
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