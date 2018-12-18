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
                    // time: date.hour12 + ':' + date.min + ':' + date.sec,
                    time: {
                        hour: date.hour12,
                        min : date.min
                    },
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
              fontSize  : '1.2em',
              width     : 1080,
              height    : 460,
              textAlign : 'center'

          },
          date: { //날짜
            color   : '#dddd99'
          },
          day: { // 요일
            color   : '#888'
          },
          time: { //시간
              main: {
                  // border: '1px solid #fff',
                  width: '100%',
                  float: 'left',
                  textAlign: 'left',
                  height: 200,
              },
              am: { // 12 12
                  position  : 'absolute',
                  marginTop : 100,
                  marginLeft: 50,
                  width     : 200,
                  textAlign: 'right',
                  // border: '1px solid #fff',
                  color       : '#ffaa00',
                  fontSize    : '1.2em',
              },
              hour: { // 12 12
                  position  : 'absolute',
                  marginLeft: 250,
                  width     : 300,
                  height    : 300,
                  textAlign: 'right',
                  // border: '1px solid #fff',
                  color       : '#eee',
                  fontSize    : '2.2em'
              },
              colon: { // :
                  position  : 'absolute',
                  // border: '1px solid #fff',
                  marginLeft: 550,
                  width     : 100,
                  height    : 300,
                  textAlign: 'center',
                  color       : '#666',
                  fontSize    : '2em'
              },
              min: { // 12 12
                  position  : 'absolute',
                  // border: '1px solid #fff',
                  marginLeft: 650,
                  width     : 300,
                  height    : 300,
                  textAlign: 'left',
                  color       : '#eee',
                  fontSize    : '2.2em'
              }

          }
        }

        return (
            <div style={style.box} >
                <div>
                    <span style={style.date}>{this.state.timer.date} </span>
                    <span style={style.day}>{this.state.timer.week}</span>
                    </div>
                <div style={style.time.main}>
                    <div style={style.time.am}>{this.state.timer.am} </div>
                    <div style={style.time.hour}>{this.state.timer.time.hour}</div>
                    <div style={style.time.colon}> : </div>
                    <div style={style.time.min}>{this.state.timer.time.min}</div>
                </div>
            </div>
        );
    }
}

export default Timer
