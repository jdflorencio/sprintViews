function chartjsConfig(ChartJsProvider) {

    ChartJsProvider.setOptions({
        chartColors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
        responsive: true,
        legend: {
            display: true,
            position: 'top',
            textDirection: 'top'
        },
        labels: {
            display: false,
        },
        scaleShowLabels: false,
        borderWidth: 15
    })
    // Configure all line charts
    ChartJsProvider.setOptions('bar', {
        gridLines: {
            display: false
        },
        responsive: true,
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
                    beginAtZero: true,


                }
            }],
        },
    })

    ChartJsProvider.setOptions('bubble', {
        chartColors: ['#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
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
                    beginAtZero: false,
                }
            }],
        },
    })

    ChartJsProvider.setOptions('doughnut', {
        chartColors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
        responsive: false,
        legend: {
            display: true,
            position: 'top'
        },
        labels: {
            display: true
        },
        scaleShowLabels: false,
        borderWidth: 15
    })

    ChartJsProvider.setOptions('pie', {
        gridLines: {
            display: false
        },
        chartColors: ['#803690', '#00ADF9', '#46BFBD', '#FDB45C', ' #41395C', '#4D5360'],
        responsive: true,
        legends: {
            display: true,
            position: 'top',
            align: 'start',
            textDirection: 'top',
            rtl: true,
            
        },
        labels: {
            display: false,
        },
        scaleShowLabels: false,
        borderWidth: 15,
        // options: {
        //     layout: {
        //         padding: {
        //             left: 50,
        //             right: 0,
        //             top: 0,
        //             bottom: 0
        //         }
        //     }
        // }
    })


}

export default chartjsConfig