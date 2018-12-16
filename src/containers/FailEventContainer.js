import React, {Component}   from 'react';  
import * as api             from '../factories/apiFactory';
import FailEvent            from '../components/body/row1/FailEvent';
import { Linear, TweenMax } from 'gsap'; 
import TimelineMax          from 'gsap/TimelineMax';
var Config = window.__config__;

class FailEventContainer extends Component{
    settings = {
        interval : Config.interval.failEvent * 1000
    } 

    datas = {
        eventConsole : []
    };

    constructor(props){
        super(props);  

        this.timelineMax = new TimelineMax();
        this.tweenMax    = undefined; 

        this.fetchInfo();
    }

    componentDidMount(){
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
                    ip          : ''
                }
            });

            if( JSON.stringify(this.datas.eventConsole) !== JSON.stringify(datas) ){
                this.datas.eventConsole = datas;

                this.play('start');
            }        
        })
        
        .catch((r) => {
            console.log( 'Fail Event api connection error!!' );
            console.log( 'msg : ' + r );
        })   
    }

    getDuration(distance, pixelsPerSecond){
        var duration = distance / pixelsPerSecond;
        return duration;
    }
 
    play(method){    
        let maskClazz = '.fail-event-container .wrap .message',
            textClazz = '.fail-event-container .wrap .message span',
            maskEl    = document.querySelectorAll( maskClazz )[0],
            textEl    = document.querySelectorAll( textClazz )[0],
            maskWidth = 0,
            textWidth = 0;
        try{
            maskWidth = maskEl.offsetWidth;
            textWidth = textEl.offsetWidth;
        }catch(e){}

        switch(method){                        
            case 'start' : 
                let event   = this.datas.eventConsole[0] ? this.datas.eventConsole[0] : {},
                    time    = event.occurTime ? event.occurTime : '',
                    message = event.message   ? event.message   : ''; 

                this.setState({
                    index   : 0,
                    time    : time,
                    message : message
                }) 

                this.play('ready');
                break;            

            case 'ready' :                 
                this.timelineMax.kill();
                if( this.tweenMax ){
                    this.tweenMax.kill();
                } 

                this.timelineMax = new TimelineMax();

                maskWidth = maskEl.offsetWidth;
                textWidth = textEl.offsetWidth; 

                textEl.style.position = 'absolute';
                textEl.style.left     = maskWidth + 'px'; 
                this.play('do');
                break;

            case 'do' : 
                let that = this;

                this.tweenMax = TweenMax.to(
                    textClazz, 
                    this.getDuration(maskWidth + textWidth, Config.ticker.speed), 
                    {
                        left : 0 - textWidth, 
                        ease : Linear.easeNone,  
                        onComplete: function(e){   
                            that.play('init');
                        }
                    }
                )

                this.timelineMax.add(
                    this.tweenMax     
                );
                break;

            case 'init' :   
                let index   = this.state.index + 1,
                    endLoop = this.datas.eventConsole.length;
                
                if( index >= endLoop ){
                    index = 0;

                    this.play('start');
                }
                else {
                    this.setState({
                        index   : index,
                        message : this.datas.eventConsole[index].message,
                        time    : this.datas.eventConsole[index].occurTime
                    })  

                    this.play('ready');
                } 
                break;

            case 'resume' : 
                this.timelineMax.resume();
                break;

            case 'pause' : 
                this.timelineMax.pause();
                break;

            default :
                break;
        }  
    }

    render(){
        return(
            <FailEvent {...this.state} play={this.play.bind(this)} />
        )
    }
}

export default FailEventContainer