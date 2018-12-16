import React, {Component}   from 'react'; 
import * as api             from '../factories/apiFactory';
import ServerPerformance    from '../components/body/row1/ServerPerformance';
var Config = window.__config__;

class ServerPerformanceContainer extends Component{
    settings = {
        interval : Config.interval.serverPerformance * 1000
    } 

    constructor(props){
        super(props);  
        this.fetchInfo();
    }

    componentDidMount(){
        setInterval(() => {
            this.fetchInfo();    
        },
        this.settings.interval + this.props.interval * 1000) 
    } 

    fetchInfo = () => {
        const info = api.getServerPerformance( this.props.id ); 
        
        info
        .then((r) => {
            if( 1 > r.DATAS.length ) return;

            var datasMap = new Map();

            // Filter
            for( let i = 0; r.DATAS[0].RESULT_DATA.length > i; i++ ){
                var data = r.DATAS[0].RESULT_DATA[i],
                    name = data.LOCATION_VALUE;

                if( datasMap.get( name ) ){
                    datasMap.get(name).push( data );
                }
                else {
                    datasMap.set( name, [] );
                    datasMap.get(name).push( data );
                } 
            }

            // let keys        = Array.from( datasMap.keys() );
            let keys = Config.server.value.serverPerformance[this.props.id];
            let series      = [],
                categories  = [];

            for( let i = 0; keys.length > i; i++ ){
            // for( let i = 0; datasMap.size > i; i++ ){
                let key         = keys[i],
                    datas       = datasMap.get(key),
                    name        = '',
                    seriesMap   = new Map();   

                if( !datas ){
                    let configName = Config.text.name.serverPerformance[this.props.id][key];
                    let seriesName = configName ? configName : key; 

                    series.push({
                        name : seriesName,
                        data : []
                    }); 

                    continue;
                }

                for( let j = 0; datas.length > j; j++ ){
                    let result    = datas[j],
                        lastIndex = datas.length - 1;

                    if( j === 0 ){
                        name = result.LOCATION_VALUE; 
                        seriesMap.set(name, []);
                    }

                    let date  = result.EVENT_DATE;  

                    seriesMap.get(name).push({
                        y       : result.AVG_VALUE, 
                        date    : date
                    });

                    if( j === lastIndex ){
                        if( categories.length < 1 ){
                            categories = seriesMap.get(name).map((data, index) => data.date.substring(8, 10));
                        }

                        let configName = Config.text.name.serverPerformance[this.props.id][name];
                        let seriesName = configName ? configName : name; 

                        series.push({
                            name : seriesName,
                            data : seriesMap.get(name)
                        }); 
                    }
                } 
            }  

            this.setState({
                series      : series,
                categories  : categories 
            })    
        }) 
        .catch((r) => {
            console.log( 'Server Performance api connection error!!' );
            console.log( 'msg : ' + r );
        })            
    } 

    render(){
        return(
            <ServerPerformance subtitle={this.props.subtitle} {...this.state} />
        )
    }
}

export default ServerPerformanceContainer