// Joel Real Timing

start_repeat_button = {};
repeat_button = {};

supportsTouch = false;
if ('ontouchstart' in window) {
    //iOS & android
    supportsTouch = true;
} else if(window.navigator.msPointerEnabled) {
    //Win8
    supportsTouch = true;
}

function responsive_dim() {
    // Gestion du bouton fullscreen
    setTimeout( function() {  // on reporte la fonction responsive pour laisser le temps à électron de détecter le fullscreen
        if ((fullscreen_button == 1 && is_launcher == 0) && (!document.fullscreenElement &&    // alternative standard method
                !document.mozFullScreenElement && !document.webkitFullscreenElement)) {  // current working methods
            // On n'est pas en fullscreen
            if (broadcast <= 1) {
                //if (fullscreen_button == 1) {
                $("#fullscreen").css("display", "block");
                if (fullscreen_button_timeout > 0) {
                    fullscreen_button_settimeout = setTimeout(function () {
                        $("#fullscreen").css("display", "none");
                    }, 1000 * fullscreen_button_timeout)
                }
                //}
            }
        } else {
            // On est déjà en fullscreen donc on cache le bouton
            $("#fullscreen").css("display", "none");
        }
        if (/iPhone|iPad/i.test(navigator.userAgent)) {  //Si c'est un iPad ou iPhone
            $("#fullscreen").css("display", "none");
        }
    }, 500);
}

function update_datas(text) {
    if (text != "") {
        try {

            if (text != -1) {
                text_header_ = text.split("??");
                text_header = text_header_[0];
            }
            else {
                text_header = ""
            }

            donnees = JSON.parse(text);

            for (nom in var_sent_every_second) {
                if (donnees[nom] != undefined) {
                    save_donnees_new[nom] = donnees[nom];
                } else {
                    donnees[nom] = save_donnees_new[nom];
                }
            }

            $("#brakebias").html(donnees.bb);
            $("#tractioncontrol").html(donnees.tc);
            //$("#hys").html(donnees.mguf);


            if (text_header == "-3" || text_header == "-2") {
                send_config = JSON.parse(text_header_[1]);
            } else if (donnees != null) {
                send_config = donnees.s_c;
            } else {
                send_config = {};
            }
            // Changement de configuration
            var send_configs_ = [];
            if (send_config != undefined) {
                for (var page in send_config) {  // de cette manière on prend aussi en compte le "car", "track" ou "pit" et pas seulement le window_shortname
                    send_configs_.push(send_config[page]);
                }
            }
            if (send_configs_ != [] && broadcast <= 1 && text != -1) {
                var new_send_config_tstamp = null;
                for (var send_config_num in send_configs_) {
                    send_config = send_configs_[send_config_num];
                    if ("tstamp" in send_config) {
                        if ( (!(send_config.page in send_config_tstamp_) || send_config_tstamp_[send_config.page] != send_config.tstamp) && send_config != "" ) {
                            new_send_config_tstamp = send_config.tstamp;
                            send_config_tstamp_[send_config.page] = new_send_config_tstamp;   // à faire absolument avec le change_config pour éviter les boulcles infinies
                            change_config(send_config);
                        }
                    }
                }
            }


        } catch (e) {
            //console.log("Json error")
        }
    }
}

function button_down(button_num) {
    ws.send("button;" + button_num + ";" + 1);
    start_repeat_button[button_num] = setTimeout(function () {
        ws.send("button;" + button_num + ";" + 0);
        repeat_button[button_num] = setInterval(function () {
            ws.send("button;" + button_num + ";" + 1);
            setTimeout(function () {
                ws.send("button;" + button_num + ";" + 0);
            }, 50);
        }, 100);
    }, 500)
}

// Ceci est un essaie mais ça ne fonctionne pas bien
/*
function button_down_until_hys_val(button_num, hys_val) {
    if (donnees.mguf > hys_val) {
        console.log(donnees.mguf, hys_val)
        ws.send("button;" + button_num + ";" + 1);
        start_repeat_button[button_num] = setTimeout(function () {
            ws.send("button;" + button_num + ";" + 0);
            repeat_button[button_num] = setInterval(function () {
                if (donnees.mguf <= hys_val) {
                    ws.send("button;" + button_num + ";" + 0);
                    if (start_repeat_button[button_num]) {
                        clearTimeout(start_repeat_button[button_num]);
                    }
                    if (repeat_button[button_num]) {
                        clearInterval(repeat_button[button_num]);
                    }
                } else {
                    ws.send("button;" + button_num + ";" + 1);
                    setTimeout(function () {
                        ws.send("button;" + button_num + ";" + 0);
                    }, 50);
                }
            }, 100);
        }, 500)
    }
}
*/

function button_down_click(button_num) {
    if (supportsTouch == false) {
        ws.send("button;" + button_num + ";" + 1);
        setTimeout(function () {
            ws.send("button;" + button_num + ";" + 0);
        }, 100);
    }
}

function button_down_once(button_num) {
    ws.send("button;" + button_num + ";" + 1);
}

function button_up_once(button_num) {
    ws.send("button;" + button_num + ";" + 0);
}

function button_up(button_num) {
    ws.send("button;" + button_num + ";" + 0);
    if (start_repeat_button[button_num]) {
        clearTimeout(start_repeat_button[button_num]);
    }
    if (repeat_button[button_num]) {
        clearInterval(repeat_button[button_num]);
    }
}

// Démarrage de la connection websocket
window.onload = function() {
    init_ws();

    window.onresize = function() {
        if (force_inner_w) {
            window_innerWidth = inner_width;
        } else {
            window_innerWidth = window.innerWidth;
        }
        if (force_inner_h) {
            window_innerHeight = inner_height;
        } else {
            window_innerHeight = window.innerHeight;
        }
        $("#page").css("width", window_innerWidth + "px");
        $("#page").css("height", window_innerHeight + "px");

        // Gestion du bouton fullscreen
        setTimeout( function() {  // on reporte la fonction responsive pour laisser le temps à électron de détecter le fullscreen
            if ((fullscreen_button == 1 && is_launcher == 0) && (!document.fullscreenElement &&    // alternative standard method
                    !document.mozFullScreenElement && !document.webkitFullscreenElement)) {  // current working methods
                // On n'est pas en fullscreen
                if (broadcast <= 1) {
                    //if (fullscreen_button == 1) {
                    $("#fullscreen").css("display", "block");
                    if (fullscreen_button_timeout > 0) {
                        fullscreen_button_settimeout = setTimeout(function () {
                            $("#fullscreen").css("display", "none");
                        }, 1000 * fullscreen_button_timeout)
                    }
                    //}
                }
            } else {
                // On est déjà en fullscreen donc on cache le bouton
                $("#fullscreen").css("display", "none");
            }
            if (/iPhone|iPad/i.test(navigator.userAgent)) {  //Si c'est un iPad ou iPhone
                $("#fullscreen").css("display", "none");
            }
        }, 500);

    };

    var elem = document.documentElement;
    $("#fullscreen").click(function () {
        if (!document.fullscreenElement &&    // alternative standard method
              !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            }
            $("#fullscreen").css("display", "none");
        }
    });

    if ((fullscreen_button == 1 && is_launcher == 0) && !document.fullscreenElement &&    // alternative standard method
          !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
        // On n'est pas en fullscreen
        //if (fullscreen_button == 1) {
            $("#fullscreen").css("display", "block");
            if (fullscreen_button_timeout > 0) {
                setTimeout(function () {
                    $("#fullscreen").css("display", "none");
                }, 1000*fullscreen_button_timeout)
            }
        //}
    } else {
        // On est déjà en fullscreen donc on cache le bouton
        $("#fullscreen").css("display", "none");
    }

    if( /iPhone|iPad/i.test(navigator.userAgent)) {  //Si c'est un iPad ou iPhone
        $("#fullscreen").css("display", "none");
    }

};
