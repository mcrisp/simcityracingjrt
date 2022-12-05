
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

        //if (text != -1 && text != "-2" && text != "-3") {
        if (text != -1 && text_header != "-2" && text_header != "-3") {

            //if (donnees_defined)
            //    text="interpol"

            //if (text != "interpol") {
            donnees_new = JSON.parse(text);


            // On modifie les fps des pages non actives dans le launcher
            if (broadcast == 0) {
                if (is_launcher == 1 && donnees_new.launcher_page != undefined) {
                    if (( (window_shortname != donnees_new.launcher_page && iframe_dashboard_pagename == "") || (iframe_dashboard_pagename != "" && iframe_dashboard_pagename != donnees_new.launcher_page) ) && fps_trackmap > 2) {
                        //console.log("---", window_shortname)
                        fps_original = fps_trackmap;
                        fps_trackmap = 2;
                        clearInterval(ws_boucle);
                        t0_typ2_ms = parseInt(Date.now());
                        local_tick = 0;
                        local_tick2 = 0;
                        ws_boucle = setInterval(ws_boucle_trackmap, 1000 / fps_trackmap);
                    } else if (( (window_shortname == donnees_new.launcher_page && iframe_dashboard_pagename == "") || (iframe_dashboard_pagename != "" && iframe_dashboard_pagename == donnees_new.launcher_page)) && fps_trackmap != fps_original) {
                        //console.log("+++", window_shortname)
                        fps_trackmap = fps_original;
                        clearInterval(ws_boucle);
                        t0_typ2_ms = parseInt(Date.now());
                        local_tick = 0;
                        local_tick2 = 0;
                        ws_boucle = setInterval(ws_boucle_trackmap, 1000 / fps_trackmap);
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


            for (nom in var_sent_every_second) {
                if (donnees_new[nom] != undefined) {
                    save_donnees_new[nom] = donnees_new[nom];
                } else {
                    donnees_new[nom] = save_donnees_new[nom];
                }
            }

            decalage = (parseInt(Date.now() / 1000) - donnees_new.tstamp);

            //console.log(donnees_new.styp, "*", type_session, "*")

            //if (donnees_defined) {
            if ((decalage > 60) || ((donnees_defined) && (donnees_new.styp == type_session) && (donnees_new.sname == name_session) && (donnees_new.sn == sessionnum) && (donnees_new.sid == sessionid))) {     // If we are still in the same session, we don't delete the old datas
                //if ((donnees_defined) && (donnees_new.styp == type_session) && (donnees_new.sn == sessionnum) && (donnees_new.sid == sessionid)) {     // If we are still in the same session, we don't delete the old datas
                //if ((donnees_new.typ == 1) || ((donnees_defined) && (donnees_new.styp == type_session) && (donnees_new.sn == sessionnum) && (donnees_new.sid == sessionid))) {     // If we are still in the same session, we don't delete the old datas
                $.extend(true, donnees, donnees_new);     // Merge donnees_new into donnees, recursively

                change_classid(donnees);

                if (donnees_new.nb != undefined && donnees_new.nb != nb_drivers) { // Si le nombre de pilotes a changé il faudra coloriser les nouveaux pilotes
                    nb_drivers = donnees_new.nb;
                    colorize_drivers_init = 3;  // il faudra coloriser éventuellement les nouveaux pilotes
                }

            } else {

                load_track_data = 1;
                console.log("New session, we are reloading init session data ...");

                sessionnum = donnees_new.sn;
                sessionid = donnees_new.sid;
                type_session = donnees_new.styp;
                name_session = donnees_new.sname;
                donnees = JSON.parse(text);

                colorize_drivers_init = 3;

                donnees_defined = 1;
                if (broadcast == 0) {
                    //ws.send("send_statics");    // we want to collect the statics datas (name, num, ir)
                    ws.send("11");
                }
                if (broadcast == 1) {
                    ws3.send("11");
                }
            }

            if (donnees_new.nb != undefined) {
                nb_drivers = donnees_new.nb;
            }


            //}

            selected_idxjs = donnees.c;

            if (donnees_new.trackname != undefined)
                trackname_new = donnees_new.trackname;
            else
                trackname_new = trackname;

            if (trackname_new != trackname && trackname != "init") {
                console.log("Chargement du nouveau circuit ...");
                //ws.send("Chargement du nouveau circuit : nouveau = '" + trackname_new +"' ancien = '"+trackname+"'");
                //location.reload();
                // On efface les anciens virages
                donnees.turn_num = donnees_new.turn_num;
                donnees.turn_ldp = donnees_new.turn_ldp;
                donnees.turn_side = donnees_new.turn_side;
                donnees.turn_info = donnees_new.turn_info;
                responsive_dim();
            }
            //console.log("***", trackname_new, trackname)
            if (trackname_new != trackname && trackname == "init") {
                console.log("Chargement du circuit ...");
                responsive_dim();
            }
            if (trackname_new != undefined)
                trackname = trackname_new;

            // Si la trackmap a changée on demande au serveur de nous envoyer les données
            if (donnees.stm != send_trackmap_nbrequest) {
                if (broadcast == 0) {
                    ws.send("11");
                    //ws.send("send_statics");
                    //location.reload();
                } else if (broadcast == 1) {
                    ws3.send("11");
                }
                send_trackmap_nbrequest = donnees.stm
            }

            // Dès qu'on reçoit toutes les données on dessine le circuit
            if (donnees_new.typ == 11) {
                responsive_dim();
            }

            if (donnees.pro_v == 1 || donnees.try_v == 1 || donnees.pro_v == undefined) { // On affiche la trackmap que pour les utilisateurs possédant une licence pro
                trackmap();
                //document.getElementById("buy_paypal").style.display = "none";
            }
            //if (donnees.pro_v <= 0 && donnees.try_v == 0)  // On affiche le bouton BUY de Paypal
            //    document.getElementById("buy_paypal").style.display = "block";

            //} else if (text == "-3") {
        } else if (text_header == "-3") {
            trackname = "none";  // utile pour savoir qu'il faudra recharger la page si c'est la première fois qu'on charge un circuit
        }


        if (text_header == "-3" || text_header == "-2") {
            send_config = JSON.parse(text_header_[1]);
        } else {
            send_config = donnees_new.s_c;
        }

        // Changement de configuration
        //window_shortname = get_window_shortname(window_name);
        if (send_config != undefined && (window_shortname in send_config || "track" in send_config)) {
            if ("track" in send_config) {
                send_config = send_config["track"];
            } else {
                send_config = send_config[window_shortname];
            }
        } else {
            send_config = {};
        }
        if (send_config != undefined && broadcast <= 1 && text != -1) {
            if ("tstamp" in send_config) {
                if (send_config_tstamp != send_config.tstamp && send_config != "") {
                    send_config_tstamp = send_config.tstamp;
                    //console.log(send_config);
                    change_config(send_config);
                    /*init_var();
                     responsive_dim();*/
                }
            }
        }
    }
}


function init() {
    window.onresize = function() {
        redim_canvas_trackmap = 1;
        responsive_dim();
        document.getElementById('opt_window_x').value = window.screenLeft;
        document.getElementById('opt_window_y').value = window.screenTop;
        document.getElementById('opt_window_w').value = window.outerWidth;
        document.getElementById('opt_window_h').value = window.outerHeight;

        if (broadcast == 0 && drag_overlays) {
            ws.send("window_resize;" + window_name + ";" + window_shortname);
        }

    };
}


// Démarrage de la connection websocket
window.onload = function() {
    init_var(1);
    init();

    init_ws();
    //document.onmousewheel = change_turn_edit_ldp;
    $("body").bind("mousewheel DOMMouseScroll", change_turn_edit_ldp);


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

