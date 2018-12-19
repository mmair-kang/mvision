import React, { Component } from 'react';
import $                    from 'jquery';

import ReactHighcharts      from 'react-highcharts';
import HighchartsMore       from 'highcharts-more';
import SolidGauge from 'highcharts-solid-gauge';

import * as util    from './../factories/utilFactory';

class Dday extends Component{
    constructor(props){
        super(props);
        this.state = {
            dday: {
                list: []
            },
            view: {
                list: []
            }
        }

        //하이차트 애드온하기
        HighchartsMore(ReactHighcharts.Highcharts);
        SolidGauge(ReactHighcharts.Highcharts);
    }

    componentDidMount(){


        this.data = () => {

            let rint = util.randomInt(1, 10000);
            let url = 'http://gsx2json.com/api?id=117RNobktAAa7bI3nlkelV0F_Jjq6gXCZdSMp5RYQfAM&sheet=1&dash=' + rint;

            this.state.dday.list = ['1','2','3','4'];

            $.getJSON("https://query.yahooapis.com/v1/public/yql", {
                q: "select * from json where url='" + url + "'",
                    format: 'json'
                }, (t) => {
                    try { if ( t.query.results.json.rows ) {} }
                    catch(e){return}

                    var jsonData = t.query.results.json.rows;
                    var viewData = [];

                    for ( var fi of jsonData ) {

                        let options = util.blackTheme();

                        options.chart.type = 'solidgauge';
                        options.title = null;
                        options.series = [{
                            name: 'Speed',
                            data: [parseInt(fi.dday)],
                            dataLabels: {
                                format: '<div style="text-align:center"><span style="font-size:30px;color:' +
                                    ('#ccc') + '">' + fi.title + '</span><br/>' +
                                       '<span style="font-size:50px;color:#fff">{y}</span></div>'
                            },
                            tooltip: {
                                valueSuffix: ''
                            }
                        }];


                        options.pane = {
                            center: ['50%', '50%'],
                            size: '100%',
                            startAngle: 0,
                            endAngle: 360,
                            background: {
                                backgroundColor: '#222',
                                innerRadius: '60%',
                                outerRadius: '100%',
                                shape: 'arc'
                            }
                        };

                        options.tooltip = {
                            enabled: false
                        };

                        options.yAxis = {
                            stops: [
                                [0.2, '#00ff00'], // green
                                [0.5, '#ffff00'], // yellow
                                [0.8, '#ff3300'] // red
                            ],
                            lineWidth: 0,
            				minorTickInterval: null,
            				tickPixelInterval: 100,
            				tickWidth: 0,
            				title		: { enabled: false },
            				labels		: { enabled:false },
                            min         : 0,
                            max         : parseInt(fi.max)
                        };
                        options.plotOptions = {
                            solidgauge: {
                                dataLabels: {
                                    y: -50,
                                    borderWidth: 0,
                                    useHTML: true
                                },
                                animation: true
                            }
                        };

                        options.credits = {
            				enabled: false
            			};

                        viewData.push({
                            title   : fi.title,  // 제목
                            max     : fi.max,    // Dday 최대치
                            dday    : fi.dday,   // 지난 Dday
                            options : options
                        });

                    }














                    // }
                    //
                    //
                    //



                    let chartStyle = {
                        float: 'left',
                        width: '268px'
                    }


                    let viewList = viewData.map((item, i) => {
                        return (
                            <div style={chartStyle} key={i}><ReactHighcharts config={item.options}></ReactHighcharts></div>
                        );
                    });






                    //
                    this.setState({
                        dday: {
                            list: jsonData
                        },
                        view: {
                            list: viewList
                        }
                    });

                }
            );



        }

        this.loop = setInterval(() => {
            this.data();

        }, 10000);

        this.data();
    }

    componentWillUnmount(){
        clearInterval( this.loop );
    }



    render(){
        let style = {
            box: {
                border    : '1px solid #4d4d4d',
                fontSize  : '50pt',
                width     : 1080,
                textAlign : 'center'
            },
            dday: { //날짜
                color   : '#ffff00'
            }
        };

        return (
          <div style={style.box} >
            <div style={style.dday}>{this.state.view.list}</div>
          </div>
        );


    }
}

export default Dday
