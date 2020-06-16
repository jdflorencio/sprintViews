import angular from 'angular'
import '@uirouter/angularjs'
import 'angular-material'

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
        
        'firebase',
    ])
    .config(configRoute)
    .config(function ($mdThemingProvider, $httpProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue')
            .accentPalette('teal')
    })
    .factory('appService', appService)
    .config(function ($mdIconProvider) {
        $mdIconProvider.fontSet('md', 'material-icons')
    })
    .config(chartConfig)
    .filter('reverse', function() {
        return function(items) {
          return items.slice().reverse();
        };
      })