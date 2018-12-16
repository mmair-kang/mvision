import React, { Component } from 'react';
import JenniferPerformance  from '../components/body/row2/JenniferPerformance';
import * as api             from '../factories/apiFactory';
var Config = window.__config__;

class JenniferPerformanceContainer extends Component{ 
    settings = {
        interval : Config.interval.jenniferPerformance * 1000
    }  

    initState = {
        biz : {
            used            : true,
            threadQuantity  : 0,
            dbConnection    : 0,
            heapUsage       : 0,
            serviceRate     : 0
        },
        soap : {
            used            : true,
            threadQuantity  : 0,
            dbConnection    : 0,
            heapUsage       : 0,
            serviceRate     : 0
        },
        square : {
            used            : true,
            threadQuantity  : 0,
            dbConnection    : 0,
            heapUsage       : 0,
            serviceRate     : 0
        },
        cyber : {
            used            : true,
            threadQuantity  : 0,
            dbConnection    : 0,
            heapUsage       : 0,
            serviceRate     : 0
        },
        mos : {
            used            : true,
            threadQuantity  : 0,
            dbConnection    : 0,
            heapUsage       : 0,
            serviceRate     : 0
        },
        mulan : {
            used            : true,
            threadQuantity  : 0,
            dbConnection    : 0,
            heapUsage       : 0,
            serviceRate     : 0
        }
    }

    storage = {
        middleTitle : {
            metsys      : Config.text.middleTitle.jenniferPerformance.metsys,
            metsquare   : Config.text.middleTitle.jenniferPerformance.metsquare,
            cyber       : Config.text.middleTitle.jenniferPerformance.cyber,
            mos         : Config.text.middleTitle.jenniferPerformance.mos,
            mulan       : Config.text.middleTitle.jenniferPerformance.mulan,
        },
        subtitle : {
            biz         : Config.text.subtitle.jennifer.biz,
            soap        : Config.text.subtitle.jennifer.soap,
            metsquare   : Config.text.subtitle.jennifer.metsquare,
            cyber       : Config.text.subtitle.jennifer.cyber,
            mos         : Config.text.subtitle.jennifer.mos,
            mulan       : Config.text.subtitle.jennifer.mulan,
        },
        intervalDelay   : Config.interval.delay.jennifer
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
        let random = Math.floor((Math.random() * 10000 )) + 1;  
        const info = Promise.all([
            api.getJenniferPerformance1(random),
            api.getJenniferPerformance2(random)
        ])
        
        info
        .then( async (r) => {     
            let type = {
                'BIZ'    : Config.jennifer.biz.agent,
                'SOAP'   : Config.jennifer.soap.agent,
                'SQUARE' : Config.jennifer.square.agent,
                'CYBER'  : Config.jennifer.cyber.agent,
                'MOS'    : Config.jennifer.mos.agent,
                'MULAN'  : Config.jennifer.mulan.agent 
            }

            let jenniferMap  = new Map(),
                jenniferList = [];

            var makeMap = ( list ) => {
                for( let i = 0; list.length > i; i++ ){
                    // let instance = list[i].$;
                    let instance = list[i],
                        agent    = instance.agent ? instance.agent : instance.instacneName;

                    switch( agent ){
                        case type.BIZ :  
                            jenniferMap.set( 'biz', { biz : this.getJennifer('biz', instance) } );
                            break;

                        case type.SOAP :  
                            jenniferMap.set( 'soap', { soap : this.getJennifer('soap', instance) } )
                            break;

                        case type.SQUARE :  
                            jenniferMap.set( 'square', { square : this.getJennifer('square', instance) } )
                            break;

                        case type.CYBER :  
                            jenniferMap.set( 'cyber', { cyber : this.getJennifer('cyber', instance) } )
                            break;

                        case type.MOS :   
                            jenniferMap.set( 'mos', { mos : this.getJennifer('mos', instance) } )
                            break;

                        case type.MULAN :  
                            jenniferMap.set( 'mulan', { mulan : this.getJennifer('mulan', instance) } )
                            break;

                        default :
                            break;
                    }    
                }
            }

            var parseJSON1 = r[0],
                parseJSON2 = r[1]; 

            try{ makeMap( parseJSON1.perf.instance );               }catch(e){};
            try{ makeMap( parseJSON2.RealtimeInstanceData.item );   }catch(e){};
              
            jenniferList.push( jenniferMap.get('biz')       ? jenniferMap.get('biz')    : {biz    : {used: false}} );
            jenniferList.push( jenniferMap.get('soap')      ? jenniferMap.get('soap')   : {soap   : {used: false}} );
            jenniferList.push( jenniferMap.get('square')    ? jenniferMap.get('square') : {square : {used: false}} );
            jenniferList.push( jenniferMap.get('cyber')     ? jenniferMap.get('cyber')  : {cyber  : {used: false}} );
            jenniferList.push( jenniferMap.get('mos')       ? jenniferMap.get('mos')    : {mos    : {used: false}} );
            jenniferList.push( jenniferMap.get('mulan')     ? jenniferMap.get('mulan')  : {mulan  : {used: false}} );

            for( let j = 0; jenniferList.length > j; j++ ){
                setTimeout(() => { 
                    this.setState(jenniferList[j]) 
                }, j * this.storage.intervalDelay * 1000)
            }  
        }) 
        .catch((r) => {
            console.log( 'Jennifer api connection error!!' );
            console.log( 'msg : ' + r );
        }) 
    } 

    getJennifer = function( id, instance ){
        let data =  {
            used            : true,
            threadQuantity  : Config.jennifer[id].thread(instance),
            dbConnection    : Config.jennifer[id].db(instance),
            heapUsage       : Config.jennifer[id].heap(instance),
            serviceRate     : Config.jennifer[id].service(instance),
        }
        
        let series = {
            threadSeries    : Config.jennifer[id].threadSeries( data.threadQuantity,   Config.jennifer[id].max),
            dbSeries        : Config.jennifer[id].dbSeries(     data.dbConnection,     Config.jennifer[id].max),
            heapSeries      : Config.jennifer[id].heapSeries(   data.heapUsage,        Config.jennifer[id].max),
        } 

        return Object.assign({}, data, series);
    }   

    render(){
        return(
            <div> 
                <div className="metsys-container">
                    <div className="metsys-title"><span>{ this.storage.middleTitle.metsys }</span></div>                                     
                    <JenniferPerformance {...this.state.biz} subtitle={ this.storage.subtitle.biz } />
                    <JenniferPerformance {...this.state.soap} subtitle={ this.storage.subtitle.soap } />
                </div>
                <div className="metsquare-container">
                    <div className="metsquare-title"><span>{ this.storage.middleTitle.metsquare }</span></div>    
                        <JenniferPerformance {...this.state.square} subtitle={ this.storage.subtitle.metsquare } />
                </div>
                <div className="cyber-container">
                    <div className="cyber-title"><span>{ this.storage.middleTitle.cyber }</span></div>    
                        <JenniferPerformance {...this.state.cyber} subtitle={ this.storage.subtitle.cyber } />
                </div>
                <div className="mos-container">
                    <div className="mos-title"><span>{ this.storage.middleTitle.mos }</span></div>    
                        <JenniferPerformance {...this.state.mos} subtitle={ this.storage.subtitle.mos } />
                </div>
                <div className="mulan-container">
                    <div className="mulan-title"><span>{ this.storage.middleTitle.mulan }</span></div>    
                        <JenniferPerformance {...this.state.mulan} subtitle={ this.storage.subtitle.mulan } />
                </div>
            </div>
        )
    }
}

export default JenniferPerformanceContainer