function chartjsConfig(ChartJsProvider) {

    ChartJsProvider.setOptions({
        chartColors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
        responsive: true,
        // legend: {
        //     display: true,
        //     position: 'top'
        // },
        labels: {
            display: true
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


}

export default chartjsConfig