import React, { Component } from 'react';
import $                    from 'jquery';

import WeatherImage1 from '../assets/image/weather1.png';
import WeatherImage2 from '../assets/image/weather2.png';
import WeatherImage3 from '../assets/image/weather3.png';
import WeatherImage4 from '../assets/image/weather4.png';
import WeatherImage5 from '../assets/image/weather5.png';

class Weather extends Component{
    constructor(props){
        super(props);
        this.state = {
            weather: {
                list: []
            },
            view: {
                hour: [],
                type: [],
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
            let url = 'http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=4113564000';

            let serviceKey = 'vaCdg8CmePABUXN3SEnFxAeSdVtPl7JcE5e1gGLo2zRS8yUJ3DnkANdi1%2F1%2BA93bji%2B1o2I9RRKKRFdYjnOqSQ%3D%3D';

            let url2 = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=%EC%9A%A9%EC%82%B0%EA%B5%AC&dataTerm=daily&pageNo=1&numOfRows=10&ServiceKey=' + serviceKey;


            //미세먼지 http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=%EC%9A%A9%EC%82%B0%EA%B5%AC&dataTerm=daily&pageNo=1&numOfRows=10&ServiceKey=vaCdg8CmePABUXN3SEnFxAeSdVtPl7JcE5e1gGLo2zRS8yUJ3DnkANdi1%2F1%2BA93bji%2B1o2I9RRKKRFdYjnOqSQ%3D%3D

            $.getJSON("https://query.yahooapis.com/v1/public/yql", {
                q: "select * from rss where url='" + url2 + "'",
                    format: "xml",
                }, (t) => {
                    console.log(t);
                }
            );

            $.getJSON("https://query.yahooapis.com/v1/public/yql", {
                q: "select * from rss where url='" + url + "'",
                    format: "json",
                }, (t) => {



                    var jsonData = t.query.results.item.description.body.data;
                    var viewData = [];
                    for ( var fi of jsonData ) {
                        viewData.push({
                            hour    : fi.hour,  // 시간
                            type    : fi.wfKor, // 날씨타입
                            temp    : fi.temp,  // 온도
                            pop     : fi.pop     // 강수확률
                        })
                    }

                    let viewHour = viewData.map((item, i) => {
                        let style = {
                            hour: {
                                fontSize    : '30pt',
                                width       : 100,
                                textAlign   : 'center'
                            }
                        };

                        let hour = parseInt(item.hour);
                        if ( hour === 12 )                      style.hour.color = '#ddd';
                        else if ( hour === 9 || hour === 15)    style.hour.color = '#bbb';
                        else if ( hour === 6 || hour === 18)    style.hour.color = '#999';
                        else if ( hour === 3 || hour === 21)    style.hour.color = '#777';
                        else                                    style.hour.color = '#555';
                        return <td style={style.hour} key={i}>{item.hour}</td>
                    })


                    let viewType = viewData.map((item, i) => {
                        let style = {
                            type: {
                                color: '#4444ff',
                                fontSize: '30pt'
                            },
                            image: {
                                width:40
                            }
                        };

                        let type = '';
                        if ( item.type.indexOf('눈') > -1 ) {
                            type = WeatherImage5;
                        }
                        else if ( item.type.indexOf('비') > -1 ) {
                            type = WeatherImage4;
                        }
                        else if ( item.type.indexOf('많음') > -1 ) {
                            type = WeatherImage3;
                        }
                        else if ( item.type.indexOf('조금') > -1 ) {
                            type = WeatherImage2;
                        }
                        else {
                            type = WeatherImage1;
                        }

                        return <td style={style.type} key={i}><img src={type} style={style.image} /></td>
                    });

                    let viewTemp = viewData.map((item, i) => {
                        let temp = parseInt(item.temp);

                        let style = {
                            temp: {
                                color: '#4444ff',
                                fontSize: '30pt'
                            }
                        };

                        if ( temp >= 0 ) {
                            style.temp.color = '#ff4444';
                        }
                        else {
                            style.temp.color = '#4444ff';
                        }

                        return <td style={style.temp} key={i}>{temp}</td>
                    });

                    let viewPop = viewData.map((item, i) => {
                        let pop = parseInt(item.pop);

                        let style = {
                            pop: {
                                color: '#6666ff',
                                fontSize: '30pt'
                            }
                        }

                        if ( pop < 10 )         style.pop.color = '#555555';
                        else if ( pop < 20 )    style.pop.color = '#555588';
                        else if ( pop < 30 )    style.pop.color = '#5555aa';
                        else if ( pop < 40 )    style.pop.color = '#5555cc';
                        else if ( pop < 50 )    style.pop.color = '#5555dd';
                        else                    style.pop.color = '#5555ff';
                        return <td style={style.pop} key={i}>{pop}</td>
                    });

                    this.setState({
                        weather: {
                            list: jsonData
                        },
                        view: {
                            hour: viewHour,
                            type: viewType,
                            temp: viewTemp,
                            pop: viewPop

                        }
                    });

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
                border    : '1px solid #4d4d4d',
                fontSize  : '50pt',
                width     : 1080,
                textAlign : 'center'
            },
            weather: { //날짜
                color   : '#ffff00'
            },
            hour: {
                fontSize    : '30pt'
            },
            type: {},
            temp: {},
            pop: {}
        }

        return (
            <div style={style.box} >
                <div style={style.weather}>
                    <table>
                        <tbody>
                            <tr style={style.hour}>{this.state.view.hour}</tr>
                            <tr style={style.type}>{this.state.view.type}</tr>
                            <tr style={style.temp}>{this.state.view.temp}</tr>
                            <tr style={style.pop}>{this.state.view.pop}</tr>
                        </tbody>
                    </table>

                </div>
            </div>
        );


    }
}

export default Weather
