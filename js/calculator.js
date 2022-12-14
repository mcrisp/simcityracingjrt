// Joel Real Timing

function charge_official_results() {
    this.document.location.href = "http://members.iracing.com/membersite/member/EventResult.do?&subsessionid=" + donnees.sid;
}

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

        donnees_new = null;

        //if (text != -1 && text != "-2" && text != "-3") {
        if (text != -1 && text_header != "-2" && text_header != "-3") {
            donnees_new = JSON.parse(text);


            // On modifie les fps des pages non actives dans le launcher
            if (broadcast == 0) {
                if (is_launcher == 1 && donnees_new.launcher_page != undefined) {
                    if (( (window_shortname != donnees_new.launcher_page && iframe_dashboard_pagename == "") || (iframe_dashboard_pagename != "" && iframe_dashboard_pagename != donnees_new.launcher_page) ) && fps_calculator > 2) {
                        //console.log("---", window_shortname)
                        fps_original = fps_calculator;
                        fps_calculator = 1;
                        clearInterval(ws_boucle);
                        ws_boucle = setInterval(function () {
                            //if ((wait == 0) && (ws.bufferedAmount == 0) && (ws.readyState == ws.OPEN)) {   // On vérifie que tout a bien déjà été envoyé
                            if (wait == 0 && ws.readyState == ws.OPEN) {  // on ne fait plus le test ws.bufferedAmount == 0 car ça semble bugguer

                                // On ne demande les actualisations définies par la page que si on a changé de config il y a plus de 5s
                                //if (Date.now() - last_change_config_tstamp > 5000) {

                                ws.send("22");
                                t0_typ2_ms = parseInt(Date.now());
                                /*} else if (parseInt(Date.now()) - t0_typ2_ms >= 500) {  // on limite à 2 fps
                                 ws.send("22");
                                 t0_typ2_ms = parseInt(Date.now());
                                 }*/
                            }
                        }, 1000 / fps_calculator);
                    } else if (( (window_shortname == donnees_new.launcher_page && iframe_dashboard_pagename == "") || (iframe_dashboard_pagename != "" && iframe_dashboard_pagename == donnees_new.launcher_page)) && fps_calculator != fps_original) {
                        //console.log("+++", window_shortname)
                        fps_calculator = fps_original;
                        clearInterval(ws_boucle);
                        ws_boucle = setInterval(function () {
                            //if ((wait == 0) && (ws.bufferedAmount == 0) && (ws.readyState == ws.OPEN)) {   // On vérifie que tout a bien déjà été envoyé
                            if (wait == 0 && ws.readyState == ws.OPEN) {  // on ne fait plus le test ws.bufferedAmount == 0 car ça semble bugguer

                                // On ne demande les actualisations définies par la page que si on a changé de config il y a plus de 5s
                                //if (Date.now() - last_change_config_tstamp > 5000) {

                                ws.send("22");
                                t0_typ2_ms = parseInt(Date.now());
                                /*} else if (parseInt(Date.now()) - t0_typ2_ms >= 500) {  // on limite à 2 fps
                                 ws.send("22");
                                 t0_typ2_ms = parseInt(Date.now());
                                 }*/
                            }
                        }, 1000 / fps_calculator);
                    }
                    if (donnees_new.jrt_session_start_time != undefined) {
                        jrt_session_start_time = donnees_new.jrt_session_start_time
                    }
                    // On sort de la fonction pour économiser des ressources, sauf si :
                    // - c'est la page active du launcher ou un iframe d'un dashboard actif
                    // - ou si on vient de charger la page il y a moins de 3s
                    // - ou si on vient d'entrer dans une session iRacing il y a moins de 3s
                    // - ou si on a des données de typ 1, 11, 21, 31
                    if (( (window_shortname != donnees_new.launcher_page && iframe_dashboard_pagename == "") || (iframe_dashboard_pagename != "" && iframe_dashboard_pagename != donnees_new.launcher_page) ) && (Date.now() - chargement_page_tstamp > 3000) && (Date.now() - jrt_session_start_time * 1000 > 3000) && (donnees_new.typ != "spotter" && donnees_new.typ % 10 != 1)) {
                        return;
                    }
                }
            }


            if (donnees_new.hors_connexion == undefined) {

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

                /*if (trackname_new != trackname && trackname != "init") {
                 console.log("Chargement du nouveau circuit ...");
                 location.reload();
                 }*/
                if (trackname_new != trackname && trackname == "init") {
                    console.log("Chargement du circuit ...");
                    responsive_dim();
                }

                if ((trackname_new == trackname) && (donnees_new.styp == type_session) && (donnees_new.sname == name_session) && (donnees_new.sn == sessionnum) && (donnees_new.sid == sessionid)) {     // If we are still in the same session, we don't delete the old datas
                    $.extend(true, donnees, donnees_new);     // Merge donnees_new into donnees, recursively
                    if (donnees_new.nb != nb_drivers) { // Si le nombre de pilotes a changé il faudra recalculer le SOF
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
                        ws.send("21");    // we want to collect the statics datas (name, num, ir)
                    } else if (broadcast == 1) {
                        ws3.send("21");    // we want to collect the statics datas (name, num, ir)
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

            }

            //} else if (text == "-3") {
        } else if (text_header == "-3") {
            trackname = "none";  // utile pour savoir qu'il faudra recharger la page si c'est la première fois qu'on charge un circuit
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

            update_infosbar();

        }


        // On indique si c'est la version pro
        if (donnees_new != null && donnees_new.pro_v != undefined) {
            if (donnees_new.pro_v != pro_v_old) {
                if (donnees_new.pro_v <= 0) {
                    prefixe_pro = "";
                } else {
                    prefixe_pro = "PRO ";
                }

                document.getElementById("app_name").innerHTML = prefixe_pro + "v" + version;
                // S'il y a une nouvelle version on le signale
                //if (lastversion != version)
                //    document.getElementById("app_name").innerHTML += " <span style='font-weight:bold;color:#ff0000;'>!!!</span>";
            }
            pro_v_old = donnees_new.pro_v;
        } else {
            if (ask_ispro == 1) {
                if (broadcast == 0) {
                    ws.send("ispro");
                    //} else if (broadcast == 1) {
                    //    ws3.send("ispro");
                }
                ask_ispro = 0;
            }
        }


        if (text_header == "-3" || text_header == "-2") {
            send_config = JSON.parse(text_header_[1]);
        } else if (donnees_new != null) {
            send_config = donnees_new.s_c;
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
    responsive_dim()
    window.onresize = function() {
        sof_displayed = 0;
        responsive_dim();

        if (broadcast == 0 && drag_overlays) {
            ws.send("window_resize;" + window_name + ";" + window_shortname);
        }

    }
}


// Démarrage de la connection websocket
window.onload = function() {
    console.log("page chargée");
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
        // On est déjà en fullscreen donc on cache le bouton
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
