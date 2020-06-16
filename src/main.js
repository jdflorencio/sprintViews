import angular from 'angular'
import '@uirouter/angularjs'
import 'angular-material'
import Highcharts from 'highcharts';
import 'highcharts-ng'
import 'angularfire'

import './main.scss'
import appService from './main.services'
import configRoute from './configRoutes'

import Views from './MainViews/MainViews'
import Modulos from './Modules/Modulos'

export const app = 'app'
angular.module('app', [
        'ui.router',
        'ngMaterial',
        Views,
        Modulos,
        'highcharts-ng',
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
    .filter('reverse', function() {
        return function(items) {
          return items.slice().reverse();
        };
      })