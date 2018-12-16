import React, { Component } from 'react';

import Timer    from '../components/Timer';
import Weather  from '../components/Weather';


// import Body                 from './Body';
import * as util    from './../factories/utilFactory';
import { TweenMax } from 'gsap';

class App extends Component{

    componentDidMount(){
        this.fit('init');
        window.addEventListener('resize', () => {
            this.fit('resize');
        })
    }

    fit(method){
        let w = window.innerWidth,
            h = window.innerHeight;

        let scaleX = w / 1080,
            scaleY = h / 1920;

        TweenMax.set('#root', {
            style : {
                position : 'absolute',
                top      : "0px",
                left     : "0px"
            }
        });

        switch(method){
            case 'init' :
                setTimeout(() => {
                    TweenMax.set('#root', {
                        transformOrigin : '0% 0%',
                        scaleX : scaleX,
                        scaleY : scaleY
                    });
                }, 100)
                break;

            case 'resize' :
                    TweenMax.set('#root', {
                        transformOrigin : '0% 0%',
                        scaleX : scaleX,
                        scaleY : scaleY
                    });
                break;

            default :
                break;
        }
    }

    render(){
        return(
            <div>
              <Timer />
              <Weather />
            </div>
        )
    }
}

export default App;
