export const webSpeech = (param) => {
    /*
    ** Param Example
    props = {
        // Default Options
        option : {
            pitch   : 1,
            rate    : 1,
            voice   : window.speechSynthesis.getVoices()[0],
            volume  : 1
        },

        // Message List
        messages : [],

        // Message Interval
        interval : 1
    }
    */

    // Declare Controller
    var controller = {
        init : (param) => {
            /*
            * Combination option
            */

            const props = $.extend(
                    true,
                    {},
                    {
                        option : {
                            // BCP 47 language tag. ( en-US, ko-KR )
                            lang : 'ko-KR',

                            // It can range between 0 (lowest) and 2 (highest), with 1 being the default pitch
                            pitch : 1,

                            // It can range between 0.1 (lowest) and 10 (highest), with 1 being the default pitch
                            rate : 1,

                            // If not set by the time the utterance is spoken,
                            // the voice used will be the most suitable default voice available for the utterance's lang setting.
                            voice : window.speechSynthesis.getVoices()[0],

                            // If not set, the default value 1 will be used.
                            volume : 1,

                            // Fired when the utterance ahs finished
                            onend : function(e) {
                            }
                        },
                        messages  : [],
                        interval  : 0
                    },
                    param
            );

            return props;
        },
        browserCheck : () => {
            /*
            * Check for browser support
            */

            if( 'speechSynthesis' in window ){
                // Supports
                return true;
            }
            else {
                // Not supports
                return false;
            }
        },
        create : (props) => {
            // Create Speech Instance
            let speechInstance = new SpeechSynthesisUtterance(),
                toDoMessages   = props.messages.slice(1);

            // Set Options
            speechInstance.lang     = props.option.lang;
            speechInstance.pitch    = props.option.pitch;
            speechInstance.rate     = props.option.rate;
            speechInstance.text     = props.messages[0];
            speechInstance.voice    = props.option.voice;
            speechInstance.volume   = props.option.volume;
            speechInstance.onstart  = (e) => { if( props.option.onstart ) props.option.onstart();   },
            speechInstance.pause    = (e) => { if( props.option.pause   ) props.option.pause();     },
            speechInstance.resume   = (e) => { if( props.option.resume  ) props.option.resume();    },
            speechInstance.onend    = (e) => {
                if( props.option.onend ) props.option.onend();

                // Next Setting
                if( toDoMessages && toDoMessages.length > 0 ){
                    setTimeout(function(){
                        props.messages      = props.messages.slice(1);
                        var speechInstance  = controller.create( props );
                        controller.speak( speechInstance );
                    }, props.interval * 1000)
                }
            }

            return speechInstance;
        },
        speak : ( speechInstance ) => {
            // Speak

            console.log( speechInstance )

            window.speechSynthesis.speak(speechInstance);
        }
    }

    // 1. Browser Check
    if( controller.browserCheck() ){

    // 2. Options Setting
        const props = controller.init(param);

        if( props.messages.length > 0 ){
    // 3. Speech Instance Setting
            let speechInstance  = controller.create(props),
                message         = props.messages[0];

    // 4. Message Setting
            speechInstance.text = message;

    // 5. Play
            controller.speak(speechInstance)
        }
    }
    else {
        console.log( 'WebSpeech(TTS) : Unsupported Browser.');
    }
} 