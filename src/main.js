import angular from 'angular'
import '@uirouter/angularjs'
import 'angular-material'
import 'angular-chart.js'
import appService from './main.services'
 
import './main.scss'
import configRoute from './configRoutes'
import Views from './MainViews/MainViews'
import Modulos from './Modules/Modulos'

export const app = 'app'
angular.module('app', [
        'ui.router',
        'ngMaterial',
        Views,
        Modulos,
        'chart.js'
    ])
    .constant('API',  'http://127.0.0.1:3333/api') //'https://mycom-backend.herokuapp.com/api'
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
    .config(function($mdIconProvider) {
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

// const apikey = "c267fcb66d1e85211cde26affd9a2ce8"
// const mytoken  = "e459e0bf0800c7af27fa8a9a6c662a753910afea159c9b640b2017cf20eb6cfb"
// const host = "https://api.trello.com/1/"