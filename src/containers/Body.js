import React, {Component}           from 'react'; 
import SystemViewContainer          from './SystemViewContainer'; 
import FailEventContainer           from './FailEventContainer';
import ServerPerformanceContainer   from './ServerPerformanceContainer';
import JenniferPerformanceContainer from './JenniferPerformanceContainer';
import EventViewContainer           from './EventViewContainer'; 
import EventConsoleContainer        from './EventConsoleContainer';
import React9Slice                  from '../components/utils/react9Slice/React9Slice'; 
import panel                        from '../assets/images/panel1.png';  
var Config = window.__config__;

class Body extends Component{
    storage = {
        systemView : {
            title : Config.text.title.systemView,
            datas : [
                {
                    id          : 'server',
                    name        : Config.text.name.systemView.server
                },
                {
                    id          : 'network',
                    name        : Config.text.name.systemView.network
                },
                {
                    id          : 'icmp',
                    name        : Config.text.name.systemView.icmp
                },
                {
                    id          : 'webUrl',
                    name        : Config.text.name.systemView.webUrl
                } 
            ]
        },
        failEvent : {
            title : Config.text.title.failEvent
        },
        serverPerformance : {
            title : Config.text.title.serverPerformance,
            datas : [
                {
                    id          : 'metsys',
                    subtitle    : Config.text.subtitle.serverPerformance.metsys
                },
                {
                    id          : 'channel',
                    subtitle    : Config.text.subtitle.serverPerformance.channel
                }
            ],
            delay : Config.interval.delay.server
        },
        jenniferPerformance : {
            title : Config.text.title.jenifferPerformance
        },
        eventView : {
            title : Config.text.title.eventView,
            subtitle : Config.text.subtitle.eventView.failView
        },
        eventConsole : {
            title : Config.text.title.eventConsole
        }
    } 
 
    render(){ 
        return(
            <section> 
                {/* 시스템 현황 */}
                <div className="system-view-container" >
                    <React9Slice 
                        width={ 510 } 
                        height={ 100 } 
                        border={ 50 } 
                        image={panel} 
                        imageSize={{ x: 339, y: 173 }}  /> 
                    <div className="components-outer" >
                        <div className="components-inner" >
                            <div className="title"><span>{ this.storage.systemView.title }</span></div>
                            { this.storage.systemView.datas.map((data, index) => (
                                <SystemViewContainer {...data} key={index} />
                            ))}
                        </div>
                    </div>  
                </div>

                {/* 장애 이벤트 */}
                <div className="fail-event-container">
                    <React9Slice 
                        width={ 225 } 
                        height={ 100 } 
                        border={ 50 } 
                        image={panel} 
                        imageSize={{ x: 339, y: 173 }}  />  
                    <div className="components-outer" >
                        <div className="components-inner" >
                            <div className="title"><span>{ this.storage.failEvent.title }</span></div>
                            <FailEventContainer />
                        </div>
                    </div>
                </div>

                {/* 서버 성능 */}
                <div className="server-performance-container">
                    <React9Slice 
                        width={ 865 } 
                        height={ 100 } 
                        border={ 50 } 
                        image={panel} 
                        imageSize={{ x: 339, y: 173 }}  />
                    <div className="components-outer" >
                        <div className="components-inner" >
                            <div className="title"><span>{ this.storage.serverPerformance.title }</span></div>
                            { this.storage.serverPerformance.datas.map((data, index) => (                                
                                <ServerPerformanceContainer {...data} key={index} interval={index === 1 ? 0 : this.storage.serverPerformance.delay}  />
                            ))} 
                        </div>
                    </div>   
                </div>
 
                {/* 제니퍼 */}
                <div className="jennifer-performance-container">
                    <React9Slice 
                        width={ 1800 } 
                        height={ 370 } 
                        border={ 50 } 
                        image={panel} 
                        imageSize={{ x: 339, y: 173 }} />  
                    <div className="components-outer" >
                        <div className="components-inner" >
                            <div className="title"><span>{ this.storage.jenniferPerformance.title }</span></div>
                            <JenniferPerformanceContainer />
                        </div>
                    </div>
                </div>

                {/* 이벤트 현황 */}
                <div className="event-view-container" >
                    <React9Slice 
                        width={ 510 } 
                        height={ 150 } 
                        border={ 50 } 
                        image={panel} 
                        imageSize={{ x: 339, y: 173 }} />
                    <div className="components-outer" >
                        <div className="components-inner" >
                            <div className="title"><span>{ this.storage.eventView.title }</span></div> 
                            <EventViewContainer subtitle={this.storage.eventView.subtitle} />
                        </div>
                    </div>
                </div> 

                {/* 이벤트 콘솔*/}
                <div className="event-console-container" >
                    <React9Slice 
                        width={ 1190 } 
                        height={ 150 } 
                        border={ 50 } 
                        image={panel} 
                        imageSize={{ x: 339, y: 173 }} />
                    <div className="components-outer" >
                        <div className="components-inner" >
                            <div className="title"><span>{ this.storage.eventConsole.title }</span></div> 
                            <EventConsoleContainer />
                        </div>
                    </div>
                </div>   
            </section>             
        ) 
    }
}

export default Body; 