/* @ngInject */
function configRoute($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $injector) {
    // $locationProvider.html5Mode(true).hashPrefix('!')
    $urlRouterProvider.otherwise('/');

    $urlRouterProvider.rule(function ($injector, $location) {
        if (!localStorage.getItem("Authorization")) {
            $location.path('login')
            return false
        }
    })

    $httpProvider.interceptors.push(($injector) => {
        return {
            request: function (req) {
                req.headers.Authorization = 'Bearer ' + localStorage.getItem("Authorization")
                return req
            },
            responseError: function (error) {
                const {
                    status
                } = error
                switch (status) {
                    case 401:
                        localStorage.removeItem('Authorization')
                        var state = $injector.get('$state')
                        state.go('login')
                        break
                    case 403:
                        console.info('atual URL:', window.location)
                        break
                }
                return
            },
            requestError: function (err) {
                console.warn(" ||| aqui >>>", err)
            }
        }
    })

    $stateProvider
        .state('home', {
            url: '/',
            component: 'home'
        })
        .state('login', {
            url: '/login',
            views: {
                '': {
                    component: 'login'
                }
            }
        })
        .state('grupo', {
            url: '/grupo',
            component: 'grupo',
            resolve: {
                redirectIfNotAuthenticated: teste
            }
        })
        .state('grupoform-edit', {
            url: '/grupo/{add}',
            component: 'grupoform'
        })
        .state('grupoform-add', {
            url: '/grupo/add',
            component: 'grupoform'
        })
        .state('subgrupo', {
            url: '/subgrupo',
            component: 'subgrupo',
            resolve: {
                redirectIfNotAuthenticated: teste
            }
        })

    function teste() {
        console.info('estou aqui X')
    }
}

export default configRoute