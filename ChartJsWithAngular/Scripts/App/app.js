var app = angular.module('dashboard', []);

app.controller("chartcontroller", function ($scope) {
    $scope.type = 'bar';
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke: true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing: 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1
    };

    $scope.data = {
        labels: ['Opened', 'Clicked'],
        datasets: [
          {
              label: 'Unique',
              fillColor: 'rgba(220,220,220,0.5)',
              strokeColor: 'rgba(220,220,220,0.8)',
              highlightFill: 'rgba(220,220,220,0.75)',
              highlightStroke: 'rgba(220,220,220,1)',
              data: [1,1]
          },
          {
              label: 'Total',
              fillColor: 'rgba(151,187,205,0.5)',
              strokeColor: 'rgba(151,187,205,0.8)',
              highlightFill: 'rgba(151,187,205,0.75)',
              highlightStroke: 'rgba(151,187,205,1)',
              data: [1,1]
          }
        ]
    };
});


app.directive('chartJs', function () {

    return {
        restrict: "A",
        scope: {
            data: '=chartData',
            options: '=chartOptions',            
            legend: '=chartLegend',
            chart: '=chart'
        }
        ,
        link: function ($scope, $elem, $attrs) {

            var ctx = $elem[0].getContext('2d');
            var chart = new Chart(ctx);
            var chartObj;
            var showLegend = false;
            var autoLegend = false;
            var exposeChart = false;
            var legendElem = null;

            for (var attr in $attrs) {
                if (attr === 'chartLegend') {
                    showLegend = true;
                } else if (attr === 'chart') {
                    exposeChart = true;
                } else if (attr === 'autoLegend') {
                    autoLegend = true;
                }
            }

            $scope.$on('$destroy', function () {
                if (chartObj) {
                    chartObj.destroy();
                }
            });
            $scope.$watch(
         'data',
         function (value) {

             if (value) {
                 if (chartObj) {
                     chartObj.destroy();
                 }
                
                
                     chartObj = chart[cleanChartName('bar')]($scope.data, $scope.options);
                

                 if (showLegend) {
                     $scope.legend = chartObj.generateLegend();
                 }

                 if (autoLegend) {
                     if (legendElem) {
                         legendElem.remove();
                     }
                     angular.element($elem[0]).after(chartObj.generateLegend());
                     legendElem = angular.element($elem[0]).next();
                 }

                 if (exposeChart) {
                     $scope.chart = chartObj;
                 }
                 chartObj.resize();
             }

         },
         true
       );

        }
    };

    function cleanChartName(type) {
        var typeLowerCase = type.toLowerCase();
        switch (typeLowerCase) {
            case 'line':
                return 'Line';
            case 'bar':
                return 'Bar';
            case 'radar':
                return 'Radar';
            case 'polararea':
                return 'PolarArea';
            case 'pie':
                return 'Pie';
            case 'doughnut':
                return 'Doughnut';
            default:
                return type;
        }
    }
      
})
