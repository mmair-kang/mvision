// import Highcharts from 'highcharts/highstock'; 

// export const setChartScale = () => {
//     Highcharts.wrap(Highcharts.Pointer.prototype, 'normalize', function (proceed, event, chartPosition) {
//         var e = proceed.call(this, event, chartPosition);
//         var element = this.chart.container;
//         if (element && element.offsetWidth && element.offsetHeight) {
//
//             var scaleX = element.getBoundingClientRect().width / element.offsetWidth;
//             var scaleY = element.getBoundingClientRect().height / element.offsetHeight;
//             if (scaleX !== 1) {
//                 e.chartX = parseInt(e.chartX / scaleX, 10);
//             }
//             if (scaleY !== 1) {
//                 e.chartY = parseInt(e.chartY / scaleY, 10);
//             }
//
//         }
//         return e;
//     });
// }
