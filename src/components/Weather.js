import React, { Component } from 'react';

import $                    from 'jquery';

import { version, Button }  from 'antd';
import "antd/dist/antd.css";



class Weather extends Component{
    constructor(props){
        super(props);
        this.state = {
            weather: {
                list: []
            },
            view: {
                list: []
            }
        }
    }

    componentDidMount(){
        this.data = () => {
            let url = 'http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=4113564000';
            let url2 = 'http://spreadsheets.google.com/a/google.com/tq?key=117RNobktAAa7bI3nlkelV0F_Jjq6gXCZdSMp5RYQfAM&gid=1959405572';

            this.state.weather.list = ['1','2','3','4'];

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



                    let viewList = viewData.map((item, i) => {
                        return (
                            <li>
                                <span>{item.hour}</span>
                                <span>{item.type}</span>
                                <span>{item.temp}</span>
                                <span>{item.pop}</span>
                            </li>
                        );
                    });

                    this.setState({
                        weather: {
                            list: jsonData
                        },
                        view: {
                            list: viewList
                        }
                    });

                }
            );


            $.getJSON("https://query.yahooapis.com/v1/public/yql", {
                q: "select * from json where url='" + url2 + "'",
                    format      : 'json',
                    dataType    : 'jsonp',
                    jsonCompat  : 'new',
                }, (t) => {

                    console.log(t.query);


                }
            );


            // let newDate = new Date();
            // let date = {
            //     year    : newDate.getFullYear(),
            //     mon     : newDate.getMonth()+1,
            //     day     : newDate.getDate(),
            //     hour    : newDate.getHours(),
            //     min     : newDate.getMinutes(),
            //     sec     : newDate.getSeconds(),
            //
            //     hour12  : '12',
            //     am      : 'AM',
            //     week    : newDate.getDay(),
            // };
            //
            // // 12시간 기준
            // if ( date.hour < 12 ) {
            //     date.hour12  = date.hour;
            //     date.am      = 'AM';
            // }
            // else {
            //     date.hour12  = date.hour - 12;
            //     date.am      = 'PM';
            // }
            //
            // // 0붙이기
            // if ( String(date.min).length === 1 ) date.min = '0' + date.min;
            // if ( String(date.sec).length === 1 ) date.sec = '0' + date.sec;
            //
            // // 요일 넣기
            // var weekArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            //
            // this.setState({
            //     timer: {
            //         date: date.year + '. ' + date.mon + '. ' + date.day,
            //         week : 'SunDay',
            //         am  : date.am,
            //         time: date.hour12 + ':' + date.min + ':' + date.sec,
            //         week: weekArr[date.week]
            //     }
            // });
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
          }

        }

        return (
          <div style={style.box} >
            <div style={style.weather}>{this.state.view.list}</div>
          </div>
        );


    }
}

export default Weather
