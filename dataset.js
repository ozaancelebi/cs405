const totalDeath = {
    "Total": [369703, 366471, 376162, 376520, 373041, 391091, 405528, 422964, 426857, 426785, 436624, 509048, 566485, 504839],
};
const babyDeath = {
    "Male": [17607, 15164, 14567, 14974, 14027, 14951, 13677, 12910, 12134, 11718, 11022, 9757, 10089, 9522],
};
const years = {
    "Years": [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
};

// Total Deaths Chart (Line Chart)
const totalDeathChart = c3.generate({
    bindto: '#total-death-chart',
    data: {
        x: 'Years',
        columns: [
            years.Years,
            totalDeath.Total,
        ],
        type: 'line'
    },
    axis: {
        x: {
            label: 'Year'
        },
        y: {
            label: 'Total Deaths'
        }
    }
});

// Baby Deaths Chart (Bar Chart)
const babyDeathChart = c3.generate({
    bindto: '#baby-death-chart',
    data: {
        x: 'Years',
        columns: [
            years.Years,
            babyDeath.Male,
        ],
        type: 'bar'
    },
    axis: {
        x: {
            label: 'Year'
        },
        y: {
            label: 'Baby Deaths'
        }
    }
});
