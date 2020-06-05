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
    .config(['ChartJsProvider', function (ChartJsProvider) {
        ChartJsProvider.setOptions({
            chartColors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            responsive: true,
            
            // legend: {
            //     display: true,
            //     position: 'left'
            // },

            labels: {
                display: true
            },
            
            scaleShowLabels: false,
            borderWidth: 15
        })
        // Configure all line charts
        ChartJsProvider.setOptions('bar', {
            chartColors: [ '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            gridLines: {
                display: false
            },
            //   legend: {
            //     display: true,
            //     position: 'bottom',
            //     align: true,
            //     fullWidth: true
            // },
            scales: {
                xAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: false,
                        },
                        scaleLabel: {
                            display: false
                        }

                    },

                ],
                yAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false
                    },
                    ticks: {
                        display: false,
                        drawBorder: false,
                        beginAtZero:true,
                       
                       
                    }
                }],
            },
        })

        ChartJsProvider.setOptions('bubble', {
            chartColors: [ '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            gridLines: {
                display: false
            },
              legend: {
                display: true,
                position: 'bottom',
                align: true,
                fullWidth: true
            },
            scales: {
                xAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: false,
                        },
                        scaleLabel: {
                            display: false
                        }

                    },

                ],
                yAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false
                    },
                    ticks: {
                        display: false,
                        drawBorder: false,
                        beginAtZero:false,
                       
                       
                    }
                }],
            },
        })

    }])