import axios from 'axios-jsonp-pro';    

var Config = window.__config__;

//"https://jsonplaceholder.typicode.com/posts/"
const url          = Config.server.url;  
const testUrl      = Config.server.test;
const jenniferUrl1 = Config.server.jennifer1;
const jenniferUrl2 = Config.server.jennifer2;

const local        = true; 

const connection = ( type, options ) => {
    if( type === 'jsonp' ){
        return axios.jsonp(options.url, options);
    }
    else {
        return axios(options);
    } 
};  

export function getSystemViewFail(id){    
    return connection('jsonp', { 
        url         : url + 'common',
        params      : {
            JSON : {
                DATAS : [
                    {
                        REQUEST_ID : Config.server.id.systemView[id].fail,
                        PARAMETER  : { 
                        }
                    }
                ]
            }
        }
    }) 
} 

export function getSystemViewTotal(id){    
    return connection('jsonp', { 
        url         : url + 'common',
        params      : {
            JSON : {
                DATAS : [
                    {
                        REQUEST_ID : Config.server.id.systemView[id].total,
                        PARAMETER  : { 
                        }
                    }
                ]
            }
        }
    }) 
} 

export function getEventConsole(){
    return connection('jsonp', { 
        url         : url + 'common',
        params      : {
            JSON : {
                DATAS : [
                    {
                        REQUEST_ID : Config.server.id.eventConsole,
                        PARAMETER  : {  
                        }
                    }
                ]
            }
        }
    })
}

export function getServerPerformance(id){
    if( local ){
        if( id === 'metsys' ){
            return new Promise((resolve, reject) => resolve( require('../assets/datas/serverPerformance_m.json') ) );
        }
        else if( id === 'channel' ){
            return new Promise((resolve, reject) => resolve( require('../assets/datas/serverPerformance_c.json') ) );
        }
    }
    else {
        return connection('jsonp', { 
            url         : url + 'common',
            params      : {
                JSON : {
                    DATAS : [
                        {
                            REQUEST_ID : Config.server.id.serverPerformance[id],
                            PARAMETER  : { 
                                LOCATION_VALUE : Config.server.value.serverPerformance[id]
                            }
                        }
                    ]
                }
            }
        })
    } 
}

export function getJenniferPerformance1( random ){
    return connection('jsonp', { 
        url         : url + 'web/data',
        params      : {
            JSON : {
                DATAS : [
                    {
                        REQUEST_ID  : Config.server.id.jennifer1,
                        SEQ         : "0",
                        PARAMETER   : {  
                            URL             : jenniferUrl1 + '?dash=' + random,
                            ANCESTRY        : "", 
                            INTERVAL        : "60", 
                            MEMCACHED_USED  : "N"
                        },
                        HEADER_LIST : [
                            {"KEY":"", "VALUE":""}
                        ]
                    }
                ] 
            }
        }
    }) 
}

export function getJenniferPerformance2( random ){
    return connection('jsonp', { 
        url         : url + 'web/data',
        params      : {
            JSON : {
                DATAS : [
                    {
                        REQUEST_ID  : Config.server.id.jennifer2,
                        SEQ         : "0",
                        PARAMETER   : {  
                            URL             : jenniferUrl2,
                            ANCESTRY        : "", 
                            INTERVAL        : "60", 
                            MEMCACHED_USED  : "N"
                        },
                        HEADER_LIST : [
                            {"KEY":"", "VALUE":""}
                        ]
                    }
                ] 
            }
        }
    }) 
}

export function getEventView(id){
    return connection('jsonp', { 
        url         : url + 'common',
        params      : {
            JSON : {
                DATAS : [
                    {
                        REQUEST_ID : Config.server.id.eventView[id],
                        PARAMETER  : {  
                        }
                    }
                ]
            }
        }
    })
} 

export function getTest(method, path, datas){
    return connection('json', {
        method      : method,
        url         : testUrl + path,
        params      : {
            datas : JSON.stringify(datas)
        }
    })
} 