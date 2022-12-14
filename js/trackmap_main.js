effacer_select_menu_btn = null;

function clear_drivers_selection() {
    driver_selected_caridx_[window_shortname] = {};
    localStorage.driver_selected_caridx_ = JSON.stringify(driver_selected_caridx_);
    update_drivers_list();
}

function change_driver_selected(caridx) {
    if (caridx in driver_selected_caridx_[window_shortname] && driver_selected_caridx_[window_shortname][caridx] == 1) {
        driver_selected_caridx_[window_shortname][caridx] = 0;
    } else {
        driver_selected_caridx_[window_shortname][caridx] = 1;
    }
    localStorage.driver_selected_caridx_ = JSON.stringify(driver_selected_caridx_);
    update_drivers_list();
}

function update_drivers_list() {
    if (donnees.d != undefined) {
        var aff = "";
        for (var i in donnees.d) {

            // Couleur de la class du pilote
            var str = donnees.d[i].cc;
            var tmp_num = donnees.d[i].num;
            if (tmp_num in bg_by_num) {
                str = "0x" + bg_by_num[tmp_num].slice(1);
            }
            if (donnees.d[i].classid in bg_by_classid_corr) {
                str = "0x" + bg_by_classid_corr[donnees.d[i].classid].slice(1);
            }

            if (str != undefined) {
                str = str.slice(2);
                for (n = str.length; n < 6; n++) {
                    str = "0" + str
                }
            }
            var coul = "#" + str;

            var font_coul = "#bbbbbb";
            var font_weight = "normal";

            if (trackmap_select_drivers_number == 0 || donnees.d[i].cpos <= trackmap_select_drivers_number) {
                font_coul = "#ffffff";
                font_weight = "bold";
            }

            if (i in driver_selected_caridx_[window_shortname] && driver_selected_caridx_[window_shortname][i] == 1) {
                font_coul = "#ffff00";
                font_weight = "bold";
            }
            aff += '<div onclick="change_driver_selected(' + i + ')" id="caridx_' + i + '" class="driver_line" style="font-weight: ' + font_weight + '; color: ' + font_coul + '">';
            aff += '<div style="flex: 0 0 0.25rem; margin-left: 0.25rem; margin-right: 0.25rem; background-color: ' + coul + ';"></div>';
            aff += '<div style="text-align: right; flex: 0 0 1.5rem; margin-right: 0.25rem;">' + donnees.d[i].cpos + '.</div>';
            aff += '<div style="text-align: center; flex: 0 0 2.25rem; margin-right: 0.25rem;">#' + donnees.d[i].num + '</div>';
            aff += '<div style="text-align: left; flex: 0 1 auto; margin-right: 0.25rem; overflow: hidden; text-overflow:clip; white-space:nowrap;">' + donnees.d[i].name + '</div>';
            aff += '</div>';

        }
        set_inner_html("drivers_list", aff);  // c'est important de ne pas mettre à jour tout le temps en utilisant la fonction set_inner_html sinon on ne pourra pas cliquer

        // On ordonne maintenant par class position en groupant par classe
        for (var i in donnees.d) {
            document.getElementById("caridx_" + i).style.order = donnees.d[i].cpos + donnees.d[i].classid * 100;
        }
    }
}

function select_drivers(n) {
    trackmap_select_drivers_number = n;
}

function display_select_menu_btn() {
    if (document.getElementById("select_menu") && document.getElementById("select_menu").style.display != "block") {
        clearTimeout(effacer_select_menu_btn);
        document.getElementById("select_menu_btn").style.opacity = 1;
        effacer_select_menu_btn = setTimeout(function () {
            document.getElementById("select_menu_btn").style.opacity = 0;
        }, 1000);
    }
}

function select_menu(x) {
    x.classList.toggle("change");
    if (document.getElementById("select_menu").style.display != "block") {
        clearTimeout(effacer_select_menu_btn);
        document.getElementById("select_menu_btn").style.opacity = 1;
        document.getElementById("select_menu").style.display = "block";
        setTimeout(function () {
            document.getElementById("select_menu").style.opacity = 1;
        }, 0);
    } else {
        document.getElementById("select_menu").style.opacity = 0;
        setTimeout(function () {
            document.getElementById("select_menu").style.display = "none";
        }, 400);
        effacer_select_menu_btn = setTimeout(function () {
            document.getElementById("select_menu_btn").style.opacity = 0;
        }, 1000);
    }
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

				if (sessionid != JSON.parse(localStorage.sessionid)[window_shortname]) {
					driver_selected_caridx_[window_shortname] = {};
					localStorage.driver_selected_caridx_ = JSON.stringify(driver_selected_caridx_);
                    var tmp_sid = JSON.parse(localStorage.sessionid);
                    tmp_sid[window_shortname] = sessionid;
					localStorage.sessionid = JSON.stringify(tmp_sid);  // pour savoir pour quelle session on a mémorisé le driver_selected_caridx_[window_shortname]
				}

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

			update_drivers_list();  // mise à jour pour les positions notamment

            //}

            selected_idxjs = donnees.c;

            if (donnees_new.trackname != undefined)
                trackname_new = donnees_new.trackname;
            else
                trackname_new = trackname;

            //console.log("***", trackname_new, trackname)
            if (trackname_new != trackname && trackname != "init") {
                console.log("Chargement du nouveau circuit ...");
                load_track_data = 1;  // pour le mode broadcast
				if (broadcast == 0) {
					ws.send("11");
				} else if (broadcast == 1) {
					ws3.send("11");
				}
                //ws.send("Chargement du nouveau circuit : nouveau = '" + trackname_new +"' ancien = '"+trackname+"'");
                //location.reload();
                // On efface les anciens virages
                donnees.turn_num = donnees_new.turn_num;
                donnees.turn_ldp = donnees_new.turn_ldp;
                donnees.turn_side = donnees_new.turn_side;
                donnees.turn_info = donnees_new.turn_info;
                responsive_dim();
            }
            if (trackname_new != trackname && trackname == "init") {
                console.log("Chargement du circuit ...");
                responsive_dim();
            }

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

            if (trackname_new != undefined) {
                trackname = trackname_new;
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
                //console.log(send_config)
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


function init() {
    responsive_dim();
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

    window.onmousemove = display_select_menu_btn;
    window.onclick = display_select_menu_btn;  // permet de faire apparaître le menu en tapant sur l'écran pour les tablettes

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

