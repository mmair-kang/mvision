import React, { Component } from 'react';

import $                    from 'jquery';

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
    }

    componentDidMount(){
        this.data = () => {
            let url = 'http://gsx2json.com/api?id=117RNobktAAa7bI3nlkelV0F_Jjq6gXCZdSMp5RYQfAM&sheet=1';

            this.state.dday.list = ['1','2','3','4'];

            $.getJSON("https://query.yahooapis.com/v1/public/yql", {
                q: "select * from json where url='" + url + "'",
                    format: 'json'
                }, (t) => {
                    var jsonData = t.query.results.json.rows;
                    var viewData = [];
                    for ( var fi of jsonData ) {
                        viewData.push({
                            title   : fi.title,  // 제목
                            max     : fi.max,    // Dday 최대치
                            dday    : fi.dday,   // 지난 Dday
                        });
                    }
                    // }
                    //
                    //
                    //
                    let viewList = viewData.map((item, i) => {
                        console.log(item);
                        return (
                            <div>
                                {item.dday}
                            </div>
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
          dday: { //날짜
            color   : '#ffff00'
          }

        }

        return (
          <div style={style.box} >
            <div style={style.dday}>{this.state.view.list}</div>
          </div>
        );


    }
}

export default Dday
