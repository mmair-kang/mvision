import React, { Component } from 'react';

/* mmair Component */


class Timer extends Component{
    constructor(props){
        super(props);
        this.state = {
            timer: {
                date    : '',
                week    : '',
                am      : '',
                time    : ''
            }
        }
    }

    componentDidMount(){
        this.timerID = setInterval(() => {
            let newDate = new Date();
            let date = {
                year    : newDate.getFullYear(),
                mon     : newDate.getMonth()+1,
                day     : newDate.getDate(),
                hour    : newDate.getHours(),
                min     : newDate.getMinutes(),
                sec     : newDate.getSeconds(),

                hour12  : '12',
                am      : 'AM',
                week    : newDate.getDay(),
            };

            // 12시간 기준
            if ( date.hour < 12 ) {
                date.hour12  = date.hour;
                date.am      = 'AM';
            }
            else {
                date.hour12  = date.hour - 12;
                date.am      = 'PM';
            }

            // 0붙이기
            if ( String(date.min).length === 1 ) date.min = '0' + date.min;
            if ( String(date.sec).length === 1 ) date.sec = '0' + date.sec;

            // 요일 넣기
            var weekArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            this.setState({
                timer: {
                    date: date.year + '. ' + date.mon + '. ' + date.day,
                    week : 'SunDay',
                    am  : date.am,
                    time: date.hour12 + ':' + date.min + ':' + date.sec,
                    week: weekArr[date.week]
                }
            });

        }, 1000);
    }

    componentWillUnmount(){
        clearInterval( this.timerID );
    }

    render(){
        let style = {
          box: {
              border    : '1px solid #4d4d4d',
              fontSize  : '70pt',
              width     : 1080,
              textAlign : 'center'
          },
          date: { //날짜
            color   : '#ffff00'
          },
          day: { // 요일
            color   : '#ffcc00'
          },
          time: { //시간
            color   : '#ffaa00'
          }
        }

        return (
            <div style={style.box} >
                <div>
                    <span style={style.date}>{this.state.timer.date} </span>
                    <span style={style.date}>{this.state.timer.week}</span>
                    </div>
                <div>
                    <span style={style.time}>{this.state.timer.am} </span>
                    <span style={style.time}>{this.state.timer.time}</span>
                </div>
            </div>
        );
    }
}

export default Timer
