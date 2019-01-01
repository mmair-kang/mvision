import React, { Component } from 'react';
import $                    from 'jquery';

import ReactHighcharts      from 'react-highcharts';
import HighchartsMore       from 'highcharts-more';
import SolidGauge from 'highcharts-solid-gauge';

import * as util    from './../factories/utilFactory';

class Air extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {
                time: '',
                pm10: 0,
                pm25: 0,
                pm10grade: 1,
                pm25grade: 1
            },
            view: {
                pm25: [],
                pm10: [],
                temp: [],
                pop: []
            },
            style: {
                main: {
                    color:'#ff0000'
                }
            }

        }

    }

    componentDidMount(){
        this.data = () => {
            let stationName = '종로구';
            let serviceKey  = 'vaCdg8CmePABUXN3SEnFxAeSdVtPl7JcE5e1gGLo2zRS8yUJ3DnkANdi1%2F1%2BA93bji%2B1o2I9RRKKRFdYjnOqSQ%3D%3D';
            let rint = util.randomInt(1, 10000);

            let url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=' + serviceKey;
            url += '&numOfRows=10&pageSize=10&pageNo=1&startPage=1&stationName=' + stationName + '&dataTerm=DAILY&ver=1.3&' + rint;

            $.getJSON("https://query.yahooapis.com/v1/public/yql", {
                q: "select * from xml where url='" + url + "'",
                    format: "json",
                }, (t) => {
                    let list = [];
                    try {
                        list = t.query.results.response.body.items.item;
                    }
                    catch(e){}

                    if ( list.length > 0 ) {
                        console.log(list[0]);


                        this.setState({
                            data: {
                                time        : list[0].dataTime,
                                pm10        : list[0].pm10Value,
                                pm10grade   : list[0].pm10Grade,
                                pm25        : list[0].pm25Value,
                                pm25grade   : list[0].pm25Grade
                            }


                        });

                    }
                }
            );


        }

        this.loop = setInterval(() => {

        }, 1000000);

        this.data();
    }

    componentWillUnmount(){
        clearInterval( this.loop );
    }



    render(){
        let style = {
            box: {
                border    : '1px solid #666',
                fontSize  : '0.8em',
                width     : 1080,
                textAlign : 'center',
                height    : '400px'
            },
            time: {
                p1: {
                    fontSize: '0.9em',
                    color: '#aaa'
                },
                p2: {
                    color: '#ccc'
                }
            },
            pm: {
                main: {
                    position:'absolute'
                },
                pm10: {
                    p1: {
                        color: '#ccc'
                    },
                    p2: {
                        color: '#ccc'
                    }
                },
                pm25: {
                    p1: {
                        color: '#ccc'
                    },
                    p2: {
                        color: '#ccc'
                    }
                },
            }



        }

        return (
            <div style={style.box} >
                <div style={style.air}>
                    <div>
                        <div>
                            <span style={style.time.p1}>미세먼지 측정시각 </span>
                            <span style={style.time.p2}> {this.state.data.time}</span>
                        </div>
                        <div style={style.pm.main}>
                            <div>
                                <span style={style.pm.pm10.p1}>pm10 </span>
                                <span style={style.pm.pm10.p2}>{this.state.data.pm10}</span>
                            </div>
                            <div>
                                <span style={style.pm.pm25.p1}>pm2.5 </span>
                                <span style={style.pm.pm25.p2}>{this.state.data.pm25}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );


    }
}

export default Air
