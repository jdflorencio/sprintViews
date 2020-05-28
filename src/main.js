import angular from 'angular'
import '@uirouter/angularjs'
import 'angular-material'
import 'angular-chart.js'
import appService from './main.services'
import 'angularfire'


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
        'chart.js',
        'firebase'

    ])
    // .constant('API', 'http://127.0.0.1:3333/api') //'https://mycom-backend.herokuapp.com/api'
    .config(configRoute)
    .config(function ($mdThemingProvider, $httpProvider) {
        $mdThemingProvider.theme('default').dark()
            .primaryPalette('light-blue')
            .accentPalette('teal')
    })
    .factory('appService', appService)
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
    