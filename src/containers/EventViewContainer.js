import React, { Component } from 'react';
import EventView            from '../components/body/row3/EventView';
import * as api             from '../factories/apiFactory';
var Config = window.__config__;

class EventViewContainer extends Component{
    settings = {
        interval : Config.interval.eventView * 1000
    } 

    initState = {
        down     : 0,
        critical : 0,
        major    : 0,
        minor    : 0,
        info     : 0
    }

    constructor(props){
        super(props); 
        this.state = this.initState;
        this.fetchInfo();
    }

    componentDidMount(){
        setInterval(() => {
            this.fetchInfo();    
        },
        this.settings.interval)   
    } 

    fetchInfo = () => {
        const info = Promise.all([
            api.getEventView('info'),
            api.getEventView('minor'),
            api.getEventView('major'),
            api.getEventView('critical'),
            api.getEventView('down')
        ]);
  
        info
        .then((r) => { 
            let info        = r[0].DATAS[0].RESULT_DATA[0].CNT,
                minor       = r[1].DATAS[0].RESULT_DATA[0].CNT,
                major       = r[2].DATAS[0].RESULT_DATA[0].CNT,
                critical    = r[3].DATAS[0].RESULT_DATA[0].CNT,
                down        = r[4].DATAS[0].RESULT_DATA[0].CNT;

            this.setState({
                down     : down,
                critical : critical,
                major    : major,
                minor    : minor,
                info     : info
            })  
        }) 
        .catch((r) => {
            console.log( 'EventView api connection error!!' );
            console.log( 'msg : ' + r );
        })  
    } 

    render(){
        let series = [];

        if( this.state.down     === 0 &
            this.state.critical === 0 &
            this.state.major    === 0 &
            this.state.minor    === 0 &
            this.state.info     === 0 ){
                series.push({
                    name    : '',
                    y       : 100
                })
        }
        else {
            series.push({
                name     : 'Down',
                y        : this.state.down
            })
            series.push({
                name     : 'Critical',
                y        : this.state.critical
            })
            series.push({
                name     : 'Major',
                y        : this.state.major
            })
            series.push({
                name     : 'Minor',
                y        : this.state.minor
            })
            series.push({
                name     : 'Info',
                y        : this.state.info
            })
        }

        return(
            <EventView {...this.state} series={series} subtitle={this.props.subtitle} {...Config.text.name.eventView} />
        )
    }
}

export default EventViewContainer