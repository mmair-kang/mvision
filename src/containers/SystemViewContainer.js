import React, {Component}   from 'react'; 
import * as api             from '../factories/apiFactory';
import SystemView           from '../components/body/row1/SystemView';
var Config = window.__config__;

class SystemViewContainer extends Component{
    settings = {
        interval : Config.interval.systemView * 1000
    }

    constructor(props){
        super(props);  
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
            api.getSystemViewFail( this.props.id ),
            api.getSystemViewTotal( this.props.id ) 
        ])
 
        info
        .then((r) => {     
            let fail  = r[0].DATAS[0].RESULT_DATA[0].OCC_CNT,
                total = r[1].DATAS[0].RESULT_DATA[0].ALL_CNT; 

            this.setState({ 
                fail    : fail,
                total   : total
            }) 
        }) 
        .catch((r) => {
            console.log( 'System View api connection error!!' );
            console.log( 'msg : ' + r );
        })   
    }

    render(){
        return(
            <SystemView {...this.state} name={this.props.name} />
        )
    }
}

export default SystemViewContainer