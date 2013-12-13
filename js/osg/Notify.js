/** -*- compile-command: 'jslint-cli osg.js' -*- */

define( [], function () {

    var Notify = {};

    Notify.DEBUG = 0;
    Notify.INFO = 1;
    Notify.NOTICE = 2;
    Notify.WARN = 3;
    Notify.ERROR = 4;

    // #FIXME getStackTrace was initially in webgl-utils
    /** Obtain a stacktrace from the current stack http://eriwen.com/javascript/js-stack-trace/
     */
    function getStackTrace( err ) {
        var callstack = [];
        var originalArgs = arguments;
        try {
            if ( arguments.length == 1 ) {
                throw err;
            } else {
                throw new Error();
            }
        } catch ( err ) {
            if ( err.stack ) { //Firefox and Chrome
                callstack = ( err.stack + '\n' ).replace( /^\S[^\(]+?[\n$]/gm, '' ).
                replace( /^\s+(at eval )?at\s+/gm, '' ).
                replace( /^([^\(]+?)([\n$])/gm, '{anonymous}()@$1$2' ).
                replace( /^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}()@$1' ).split( '\n' );
                // Remove call to this function
                callstack.shift();

            }
        }
        // Remove empty entries
        for ( var i = 0; i < callstack.length; ++i ) {
            if ( callstack[ i ] === '' ) {
                callstack.splice( i, 1 );
                --i;
            }
        }

        return callstack;
    }

    Notify.setNotifyLevel = function ( level ) {

        var log = function ( str ) {
            if ( window.console !== undefined ) {
                window.console.log( str, getStackTrace() );
            }
        };

        var info = function ( str ) {
            if ( window.console !== undefined ) {
                window.console.info( str, getStackTrace() );
            }
        };

        var warn = function ( str ) {
            if ( window.console !== undefined ) {
                window.console.warn( str, getStackTrace() );
            }
        };

        var error = function ( str ) {
            if ( window.console !== undefined ) {
                window.console.error( str, getStackTrace() );
            }
        };

        var debug = function ( str ) {
            if ( window.console !== undefined ) {
                window.console.debug( str, getStackTrace() );
            }
        };

        var dummy = function () {};

        Notify.debug = dummy;
        Notify.info = dummy;
        Notify.log = dummy;
        Notify.warn = dummy;
        Notify.error = dummy;

        if ( level <= Notify.DEBUG ) {
            Notify.debug = debug;
        }
        if ( level <= Notify.INFO ) {
            Notify.info = info;
        }
        if ( level <= Notify.NOTICE ) {
            Notify.log = log;
        }
        if ( level <= Notify.WARN ) {
            Notify.warn = warn;
        }
        if ( level <= Notify.ERROR ) {
            Notify.error = error;
        }
    };

    Notify.setNotifyLevel( Notify.NOTICE );

    Notify.reportWebGLError = false;

    return Notify;
} );