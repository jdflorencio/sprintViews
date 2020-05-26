import angular from 'angular'
import '@uirouter/angularjs'
import 'angular-material'
import 'angular-chart.js'
import appService from './main.services'
import 'angularfire'
import 'firebase/database'
// import 'firebase/auth'

import './main.scss'
import configRoute from './configRoutes'
import Views from './MainViews/MainViews'
import Modulos from './Modules/Modulos'
import firebase from 'firebase'

export const app = 'app'
angular.module('app', [
        'ui.router',
        'ngMaterial',
        Views,
        Modulos,
        'chart.js',
        'firebase'
    ])
    .constant('API', 'http://127.0.0.1:3333/api') //'https://mycom-backend.herokuapp.com/api'
    .config(configRoute)
    .config(function ($mdThemingProvider, $httpProvider) {
        $mdThemingProvider.theme('default').dark()
            .primaryPalette('light-blue')
            .accentPalette('teal')
        // .backgroundPalette("green")

    })
    .factory('appService', appService)
    .controller('appCtrl', ['$mdSidenav', '$stateParams', '$rootScope', '$state',

        function ($mdSidenav, $stateParams, $rootScope, $state) {

            self = this;

            self.siderbar = {
                home: {
                    title: "Home",
                    href: "/"
                },
                Cliente: {
                    title: "Cliente",
                    href: "/clientes"
                },
                Produtos: {
                    title: "Produto",
                    href: "/produtos"
                },
                notasFiscais: {
                    title: "Notas Fiscais",
                    href: "/notasfiscais"
                }
            }

            // Update title using rootscope.js
            self.updateTitle = function () {
                $rootScope.title = $stateParams.title;
            }

            // Run updateTitle on each state change
            $rootScope.$on('$stateChangeSuccess', self.updateTitle);

            self.toggleLeft = function () {
                $mdSidenav('left').toggle();
            }

            self.toggleRight = function () {
                $mdSidenav('right').toggle();
            }

            self.doTheBack = function () {
                window.history.back();
            }

        }
    ])
    .config(function ($mdIconProvider) {
        $mdIconProvider.fontSet('md', 'material-icons')
    })

    // Optional configuration
    .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            chartColors: ['#44475a', '#ff5555'],
            responsive: true
        })
        // Configure all line charts
        ChartJsProvider.setOptions('line', {
            showLines: false
        });
    }])

    .config(function () {

        const firebaseConfig = {
            apiKey: "AIzaSyBI9BeKwO6ydTVlgYNohzU5ZNZsktFgPTA",
            authDomain: "sprintviews.firebaseapp.com",
            databaseURL: "https://sprintviews.firebaseio.com",
            projectId: "sprintviews",
            storageBucket: "sprintviews.appspot.com",
            messagingSenderId: "589988109950",
            appId: "1:589988109950:web:d5340f09c88fbe4aaac22f"
        }
        firebase.initializeApp(firebaseConfig)
        return firebase
    })

