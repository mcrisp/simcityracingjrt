// Display the datas contained in text variable
function update_datas(text) {

    if (text != "") {

        if (text != -1) {
            text_header_ = text.split("??");
            text_header = text_header_[0];
        }
        else {
            text_header = ""
        }

        if (text != -1 && text_header != "-2" && text_header != "-3" && text != "") {
            donnees_new = JSON.parse(text);


            // On modifie les fps des pages non actives dans le launcher
            if (broadcast == 0) {
                if (is_launcher == 1 && donnees_new.launcher_page != undefined) {
                    if (( (window_shortname != donnees_new.launcher_page && iframe_dashboard_pagename == "") || (iframe_dashboard_pagename != "" && iframe_dashboard_pagename != donnees_new.launcher_page) ) && fps > 2) {
                        //console.log("---", window_shortname)
                        fps_original = fps;
                        fps = 2;
                        clearInterval(ws_boucle);
                        t0_typ2_ms = parseInt(Date.now());
                        local_tick = 0;
                        local_tick2 = 0;
                        ws_boucle = setInterval(ws_boucle_compteur, 1000 / fps);
                    } else if (( (window_shortname == donnees_new.launcher_page && iframe_dashboard_pagename == "") || (iframe_dashboard_pagename != "" && iframe_dashboard_pagename == donnees_new.launcher_page)) && fps != fps_original) {
                        //console.log("+++", window_shortname)
                        fps = fps_original;
                        clearInterval(ws_boucle);
                        t0_typ2_ms = parseInt(Date.now());
                        local_tick = 0;
                        local_tick2 = 0;
                        ws_boucle = setInterval(ws_boucle_compteur, 1000 / fps);
                    }
                    if (donnees_new.jrt_session_start_time != undefined) {
                        jrt_session_start_time = donnees_new.jrt_session_start_time
                    }
                    // On sort de la fonction pour �conomiser des ressources, sauf si :
                    // - c'est la page active du launcher ou un iframe d'un dashboard actif
                    // - ou si on vient de charger la page il y a moins de 3s
                    // - ou si on vient d'entrer dans une session iRacing il y a moins de 3s
                    // - ou si on a des donn�es de typ 1, 11, 21, 31
                    if (( (window_shortname != donnees_new.launcher_page && iframe_dashboard_pagename == "") || (iframe_dashboard_pagename != "" && iframe_dashboard_pagename != donnees_new.launcher_page) ) && (Date.now() - chargement_page_tstamp > 3000) && (Date.now() - jrt_session_start_time * 1000 > 3000) && (donnees_new.typ != "spotter" && donnees_new.typ % 10 != 1)) {
                        return;
                    }
                }
            }


            for (nom in var_sent_every_second) {
                if (donnees_new[nom] != undefined) {
                    save_donnees_new[nom] = donnees_new[nom];
                } else {
                    donnees_new[nom] = save_donnees_new[nom];
                }
            }

            if (donnees_new.trackname != undefined)
                trackname_new = donnees_new.trackname;
            else
                trackname_new = trackname;

            if (trackname_new != trackname && trackname == "init") {
                console.log("Chargement du circuit ...");
                responsive_dim();
            }

            if ((trackname_new == trackname) && (donnees_new.styp == type_session) && (donnees_new.sname == name_session) && (donnees_new.sn == sessionnum) && (donnees_new.sid == sessionid)) {     // If we are still in the same session, we don't delete the old datas
                $.extend(true, donnees, donnees_new);     // Merge donnees_new into donnees, recursively
                if (donnees_new.nb != nb_drivers) { // Si le nombre de pilotes a chang� il faudra recalculer le SOF
                    sof_displayed = 0;
                    nb_drivers = donnees_new.nb;
                }
            } else {
                donnees_defined = 1;

                sof_displayed = 0;
                sessionnum = donnees_new.sn;
                sessionid = donnees_new.sid;
                type_session = donnees_new.styp;
                name_session = donnees_new.sname;
                donnees = JSON.parse(text);
                if (broadcast == 0) {
                    ws.send("31");    // we want to collect the statics datas (name, num, ir)
                } else if (broadcast == 1) {
                    ws3.send("31");    // we want to collect the statics datas (name, num, ir)
                }

            }

            if (donnees_new.nb != undefined) {
                nb_drivers = donnees_new.nb;
            }

            if (donnees.carname != undefined) {
                // On met en kg les voitures qui utilisent kg comme la fw31 ou la hpd
                if (donnees.carname in car_in_kg) {
                    disp_kg_livre = 1
                } else {
                    disp_kg_livre = 0
                }
            }

            if (trackname_new != undefined)
                trackname = trackname_new;

            donnees_reform = {};

            $.extend(true, donnees_reform, donnees);
        } else if (text_header == "-3") {
            trackname = "none";  // utile pour savoir qu'il faudra recharger la page si c'est la premi�re fois qu'on charge un circuit
        }

        // On calcule les coefficient d'essence en fonction des options
        if (disp_kg_livre == 1) {
            if (donnees.u == 1) {  // systeme metric
                coef_fuel = 0.75
            } else {
                coef_fuel = 1 / (0.45359237 / 0.75 / 3.78541178);        //  1 Ga = 3.78541178 L     1 livre = 0.45359237 kg
            }
        } else {
            coef_fuel = 1;
        }

        if (donnees.d != undefined) {

            // Put here the data updates
            update_compteur();

        }


        if (text_header == "-3" || text_header == "-2") {
            send_config = JSON.parse(text_header_[1]);
        } else {
            send_config = donnees_new.s_c;
        }

        // Changement de configuration
        //window_shortname = get_window_shortname(window_name);
        if (send_config != undefined && window_shortname in send_config) {
            send_config = send_config[window_shortname];
        } else {
            send_config = {};
        }
        if (send_config != undefined && broadcast <= 1 && text != -1) {
            if ("tstamp" in send_config) {
                if (send_config_tstamp != send_config.tstamp && send_config != "") {
                    send_config_tstamp = send_config.tstamp;
                    //console.log(send_config);
                    change_config(send_config);
                }
            }
        }
    }
}


function change_kg_livre() {
    disp_kg_livre = 1;
    if (donnees.u == 1) {  // systeme metric
        coef_fuel = 0.75
    } else {
        coef_fuel = 1 / (0.45359237 / 0.75 / 3.78541178);        //  1 Ga = 3.78541178 L     1 livre = 0.45359237 kg
    }
    update_datas(-1)
}


function change_litre_gallon() {
    disp_kg_livre = 0;
    coef_fuel = 1;
    update_datas(-1)
}


// ************************ MAIN PROGRAM *************************


function init() {
    responsive_dim();
    window.onresize = function() {
        responsive_dim();

        if (broadcast == 0 && drag_overlays) {
            ws.send("window_resize;" + window_name + ";" + window_shortname);
        }

    };

}


// D�marrage de la connection websocket
window.onload = function() {
    console.log("page charg�e");
    init_var();
    init();
    init_ws();

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

    if (!document.fullscreenElement &&    // alternative standard method
          !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
        // On n'est pas en fullscreen
        if (fullscreen_button == 1 && is_launcher == 0) {
            $("#fullscreen").css("display", "block");
            if (fullscreen_button_timeout > 0) {
                setTimeout(function () {
                    $("#fullscreen").css("display", "none");
                }, 1000*fullscreen_button_timeout)
            }
        }
    } else {
        // On est d�j� en fullscreen donc on cache le bouton
        $("#fullscreen").css("display", "none");
    }

    // On cache le bouton pour les spectateurs
    if (broadcast >= 2) {
        $("#fullscreen").css("display", "none");
    }
    if( /iPhone|iPad/i.test(navigator.userAgent)) {  //Si c'est un iPad ou iPhone
        $("#fullscreen").css("display", "none");
    }

};
