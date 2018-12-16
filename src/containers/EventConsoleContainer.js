import React, { Component } from 'react';
import EventConsole         from '../components/body/row3/EventConsole';
import * as api             from '../factories/apiFactory';
var Config = window.__config__;

class EventConsoleContainer extends Component{
    settings = {
        interval : Config.interval.eventConsole * 1000
    }

    initState = {
        dataSource : []
    }

    constructor(props){
        super(props);        
        this.state = this.initState;
        this.fetchInfo();
    }

    componentDidMount() {  
         setInterval(() => {
            this.fetchInfo();    
        },
        this.settings.interval) 
    }
 
    fetchInfo = () => {
        const info = api.getEventConsole(); 
        
        info
        .then((r) => { 
            let datas = r.DATAS[0].RESULT_DATA.map((data, index) => {
                let year    = data.OCCURRED_DATE.substring(0, 4),
                    month   = data.OCCURRED_DATE.substring(4, 6),
                    day     = data.OCCURRED_DATE.substring(6, 8),
                    hour    = data.OCCURRED_DATE.substring(8, 10),
                    minute  = data.OCCURRED_DATE.substring(10, 12),
                    second  = data.OCCURRED_DATE.substring(12, 14);
                return {
                    host        : data.HOSTNAME,
                    message     : data.FAULT_MSG,
                    occurTime   : year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second,
                    ip          : data.IPADDRESS
                }
            });

            this.setState({
                dataSource : datas
            }) 
        })
        .catch((r) => {
            console.log( 'Event Console api connection error!!' );
            console.log( 'msg : ' + r );
        })   
    }

    render(){
        return(
            <EventConsole {...this.state} />
        )
    }
}

export default EventConsoleContainer