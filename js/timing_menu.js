
// Pour les navigateurs qui ne supportent pas la fonction includes
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}


function set_style_text_shadow(i) {

    // On ne modifie le text_shadow que si on a fait un changement dans la couleur de fond des lignes
    if ( !(i in style_text_shadow_pB) || !(i in style_text_shadow_p) || style_text_shadow_pB[i] != document.getElementById('pB' + i).style.backgroundColor || style_text_shadow_p[i] != document.getElementById('p' + i).style.backgroundColor ) {

        style_text_shadow_pB[i] = document.getElementById('pB' + i).style.backgroundColor;
        style_text_shadow_p[i] = document.getElementById('p' + i).style.backgroundColor;

        if (document.getElementById('pB' + i).style.backgroundColor != "rgba(0, 0, 0, 0)") {
            // On rajoute une ombre au texte des colonnes
            for (var j = 0; j < tab_titres_all.length; j++) {
                var t = tab_titres_all[j];
                if (t in liste_donnees) {
                    if (window.getComputedStyle(document.getElementById(t + i), null).getPropertyValue('color') != "rgb(0, 0, 0)") {  // si le text n'est pas en noir pour éviter de rajouter un ombre inesthétique
                        document.getElementById(t + i).classList.add("text_shadow");
                    } else {
                        document.getElementById(t + i).classList.remove("text_shadow");
                    }
                }
            }
        } else {
            // On renlève l'ombre
            for (var j = 0; j < tab_titres_all.length; j++) {
                var t = tab_titres_all[j];
                if (t in liste_donnees) {
                    document.getElementById(t + i).classList.remove("text_shadow");
                }
            }
        }
    }
}


function colorize_driver(i, save) {

    if (show_colorized_drivers) {

        id = donnees.d[i].uid;
        if (donnees.teamracing) {
            id = donnees.d[i].tid;
        }

        if (document.getElementById('opt_colorize_drivers_' + i).checked && filter_colorized == 0) {

            if (id != undefined) {
                colorize_[id] = document.getElementById('colorize_drivers_col_' + i).value;
                delete uncolorize_[id];
            }

            document.getElementById('pB' + i).style.transitionDuration = "0s";
            document.getElementById('pB' + i).style.transitionDelay = "0s";
            document.getElementById('pB' + i).style.backgroundColor = document.getElementById('colorize_drivers_col_' + i).value;
            RGBA(document.getElementById('pB' + i), 0.8);  // on remet les couleurs pour les pilotes colorisés

            // On rajoute une ombre au texte des colonnes
            /*for (var j=0; j < tab_titres_all.length; j++) {
                var t = tab_titres_all[j];
                if (t in liste_donnees) {
                    if (window.getComputedStyle(document.getElementById(t + i), null).getPropertyValue('color') != "rgb(0, 0, 0)") {  // si le text n'est pas en noir pour éviter de rajouter un ombre inesthétique
                        document.getElementById(t + i).classList.add("text_shadow");
                    }
                }
            }*/

        } else {

            delete colorize_[id];
            uncolorize_[id] = 1;

            document.getElementById('pB' + i).style.transitionDuration = "0s";
            document.getElementById('pB' + i).style.transitionDelay = "0s";
            document.getElementById('pB' + i).style.backgroundColor = 'rgba(0,0,0,0)';

            // On renlève l'ombre
            /*for (var j=0; j < tab_titres_all.length; j++) {
                var t = tab_titres_all[j];
                if (t in liste_donnees) {
                    document.getElementById(t + i).classList.remove("text_shadow");
                }
            }*/

        }

        set_style_text_shadow(i);

        if (save) {
            //console.log("SAVE");
            if (broadcast == 0) {
                ws.send("colorize;" + JSON.stringify(colorize_) + ";" + JSON.stringify(uncolorize_))
            }
        }

    }

}


function timing_menu(mode) {

    // REM : on report d'une seconde le chargement du menu pour éviter de ralentir le chargement de la page
    // REM2 : j'ai enlevé le report d'1s car cela provoque des erreurs car certains éléments ne sont pas définis
    //setTimeout( function () {
        // Standings Filter
        if (mode == 1 && donnees.d != undefined) {
            if (jQuery.isEmptyObject(cars_list)) {
                // On crée la liste des voitures et le menu standing_filter
                document.getElementById("standing_filter_checkboxes").innerHTML = "";
                tmp = '<input type="checkbox" id="opt_all" value="all" onclick="opt_standing_filter(this, \'all\')"> </input>' + '<span style ="cursor:pointer;" onclick="opt_standing_filter2(\'all\')" >ALL Cars</span><br>';
                document.getElementById("standing_filter_checkboxes").innerHTML += tmp;
                for (var i = 0; i < 64; i++) {
                    if (i in donnees.d) {
                        if (!(donnees.d[i].car in cars_list) && donnees.d[i].car != undefined) {
                            cars_list[donnees.d[i].car] = 1;  // vaut 0 si la voiture n'est pas affichée dans le classement
                            tmp = '<input type="checkbox" id="opt_' + donnees.d[i].car + '" value="' + donnees.d[i].car + '" onclick="opt_standing_filter(this, \'' + donnees.d[i].car + '\')"></input>' + '<span style ="cursor:pointer;" onclick="opt_standing_filter2(\'' + donnees.d[i].car + '\')" > ' + donnees.d[i].car + '</span><br>';
                            document.getElementById("standing_filter_checkboxes").innerHTML += tmp;
                        }
                    }
                }
                document.getElementById("opt_all").checked = true;
                for (var car in cars_list) {
                    document.getElementById("opt_" + car).checked = true;
                }
            }
        }

        // Events Filter
        if (mode == 1 && donnees.d != undefined) {
            document.getElementById("events_filter_checkboxes").innerHTML = "";
            tmp = '<input type="checkbox" id="opt_events_filter_all" value="all" onclick="opt_events_filter(this, \'all\')"> </input>' + '<span style ="cursor:pointer;" onclick="opt_events_filter2(\'all\')" >ALL Events</span><br>';
            document.getElementById("events_filter_checkboxes").innerHTML += tmp;
            type_events_list = {
                "PIT Entry or Exit": events_ticker_disp_pits,
                "PIT Entry or Exit (only selected driver)": events_ticker_disp_pits_me,
                "New Best Laptime in a Class": events_ticker_disp_newbest,
                "New Leader in a Class": events_ticker_disp_newleader,
                "Driver Swap": events_ticker_disp_driverswap,
                "Driver Swap (only selected driver)": events_ticker_disp_driverswap_me,
                "Overtake": events_ticker_disp_overtake,
                "Overtake (only selected driver)": events_ticker_disp_overtake_me,
                "3-wide & 4-wide": events_ticker_disp_three_wide,
                "Flags": events_ticker_disp_flags,
                "My incidents": events_ticker_disp_incidents_me,
                "Custom Events": events_ticker_disp_custom
            };

            for (var n in type_events_list) {
                tmp = '<input type="checkbox" id="opt_events_filter_' + n + '" value="' + n + '" onclick="opt_events_filter(this, \'' + n + '\')"></input>' + '<span style ="cursor:pointer;" onclick="opt_events_filter2(\'' + n + '\')"> ' + n + '</span><br>';
                document.getElementById("events_filter_checkboxes").innerHTML += tmp;
            }

            document.getElementById("opt_events_filter_all").checked = true;
            for (var n in type_events_list) {
                if (type_events_list[n] == 1) {
                    document.getElementById("opt_events_filter_" + n).checked = true;
                } else {
                    document.getElementById("opt_events_filter_" + n).checked = false;
                    document.getElementById("opt_events_filter_all").checked = false;
                }
            }
        }

        // Colorize Drivers
        if (mode == 1 && donnees.d != undefined) {

            if (colorize_drivers_init == 2) {
                document.getElementById("drivers").innerHTML = "";

                var order_by_name = [];
                for (var i = 0; i < 64; i++) {
                    if (i in donnees.d) {
                        nom = donnees.d[i].name;
                        if (donnees.teamracing) {
                            nom = donnees.d[i].tn;
                        }
                        order_by_name.push([parseInt(i), nom]);
                    } else {
                        order_by_name.push([parseInt(i), "--"]);
                    }
                }
                order_by_name.sort(function (a, b) {
                    if (a[1] != undefined && b[1] != undefined) {
                        if (a[1].toLowerCase() < b[1].toLowerCase()) return -1;
                        if (a[1].toLowerCase() > b[1].toLowerCase()) return 1;
                    }
                    return 0;
                });
                //console.log(order_by_name)

                for (var i = 0; i < 64; i++) {
                    //if (i in donnees.d) {
                    if (order_by_name[i][0] in donnees.d) {
                        tmp = '<span onchange="colorize_driver(' + order_by_name[i][0] + ', 1);" id="colorize_drivers_line_' + order_by_name[i][0] + '"><input type="checkbox" id="opt_colorize_drivers_' + order_by_name[i][0] + '" value="' + order_by_name[i][0] + '"></input>' +
                            '<input onchange="document.getElementById(\'colorize_drivers_col_hex_' + order_by_name[i][0] + '\').value = document.getElementById(\'colorize_drivers_col_' + order_by_name[i][0] + '\').value;colorize_driver(' + order_by_name[i][0] + ', 1);" type="color" size="15" id="colorize_drivers_col_' + order_by_name[i][0] + '" value="#0088ff"></input>' +
                            ' <input onchange="document.getElementById(\'colorize_drivers_col_' + order_by_name[i][0] + '\').value = document.getElementById(\'colorize_drivers_col_hex_' + order_by_name[i][0] + '\').value;colorize_driver(' + order_by_name[i][0] + ', 1);" type="text" size="7" id="colorize_drivers_col_hex_' + order_by_name[i][0] + '" value="#0088ff"></input>' +
                            '<span id="colorize_drivers_name_' + order_by_name[i][0] + '" style ="cursor:pointer;">' + " #" + donnees.d[order_by_name[i][0]].num + " " + order_by_name[i][1] + '</span><br></span>';
                    } else {
                        tmp = '<span onchange="colorize_driver(' + order_by_name[i][0] + ', 1);" id="colorize_drivers_line_' + order_by_name[i][0] + '"><input type="checkbox" id="opt_colorize_drivers_' + order_by_name[i][0] + '" value="' + order_by_name[i][0] + '"></input>' +
                            '<input onchange="document.getElementById(\'colorize_drivers_col_hex_' + order_by_name[i][0] + '\').value = document.getElementById(\'colorize_drivers_col_' + order_by_name[i][0] + '\').value;colorize_driver(' + order_by_name[i][0] + ', 1);" type="color" size="15" id="colorize_drivers_col_' + order_by_name[i][0] + '" value="#0088ff"></input>' +
                            ' <input onchange="document.getElementById(\'colorize_drivers_col_' + order_by_name[i][0] + '\').value = document.getElementById(\'colorize_drivers_col_hex_' + order_by_name[i][0] + '\').value;colorize_driver(' + order_by_name[i][0] + ', 1);" type="text" size="7" id="colorize_drivers_col_hex_' + order_by_name[i][0] + '" value="#0088ff"></input>' +
                            '<span id="colorize_drivers_name_' + order_by_name[i][0] + '" style ="cursor:pointer;"> -- </span><br></span>';
                    }
                    document.getElementById("drivers").innerHTML += tmp;
                }
                colorize_drivers_init = 1;
                //opt_colorize_drivers_defined = 1;
            }

            if (colorize_drivers_init == 1) {
                var nom;
                var col_;
                if (donnees.teamracing) {
                    colorize_ = colorize_team_;
                } else {
                    colorize_ = colorize_driver_;
                }
                for (var i = 0; i < 64; i++) {
                    //document.getElementById('opt_colorize_drivers_' + i).checked = false;
                    if (i in donnees.d && donnees.d[i].num != "") {
                        nom = donnees.d[i].name;
                        id = donnees.d[i].uid;
                        if (donnees.teamracing) {
                            nom = donnees.d[i].tn;
                            id = donnees.d[i].tid;
                        }

                        col_ = null;
                        for (var idx_ in colorize_) {
                            if (nom != undefined && nom.toUpperCase().includes(idx_.toUpperCase())) {
                                col_ = colorize_[idx_];
                            }
                        }

                        //document.getElementById("colorize_drivers_name_" + i).innerHTML = " #" + donnees.d[i].num + " " + nom;
                        document.getElementById("colorize_drivers_line_" + i).style.display = "block";
                        if (id in colorize_) {
                            document.getElementById('colorize_drivers_col_hex_' + i).value = colorize_[id];
                            document.getElementById('colorize_drivers_col_' + i).value = colorize_[id];
                            document.getElementById('opt_colorize_drivers_' + i).checked = true;
                        } else if (col_ !== null) {
                            document.getElementById('colorize_drivers_col_hex_' + i).value = col_;
                            document.getElementById('colorize_drivers_col_' + i).value = col_;
                            document.getElementById('opt_colorize_drivers_' + i).checked = true;
                        } else {
                            document.getElementById('opt_colorize_drivers_' + i).checked = false;
                        }
                        colorize_driver(i, 0);
                    } else {
                        document.getElementById("colorize_drivers_line_" + i).style.display = "none";
                    }
                }
                colorize_drivers_init = 0;
            }

        }

        // My Results
        for (var t in liste_sessions_) {
            style = "";
            if (my_results_filter[t] == 0) {
                style = "style='display:block;width:100%; background-color:#ff8800; font-weight:normal;color:#ffffff;'";
            }
            cont_html = "<span " + style + " class='filter_hover' onclick ='my_results_apply_filter(\"" + t + "\", 0);'>ALL</span>";
            for (var i in liste_sessions_[t]) {
                style = "";
                if (i == my_results_filter[t]) {
                    style = "style='display:block;width:100%; background-color:#ff8800; font-weight:normal;color:#ffffff;'";
                }
                n = i;
                if (t == "mois") {
                    n = mois[i]
                }
                cont_html += "<span " + style + " title='" + n + "' class='filter_hover' onclick ='my_results_apply_filter(\"" + t + "\", \"" + i + "\");'>" + n + "</span>";
            }
            document.getElementById(t).innerHTML = cont_html;
        }


        if (is_launcher == 1) {
            tmp_target = ""
        } else {
            tmp_target = " target='blank'";
        }
        cont_html = "";
        for (var i in liste_sessions) {
            cond = true;
            for (var t in liste_sessions_) {
                cond = cond && (my_results_filter[t] == 0 || liste_sessions[i][t] == my_results_filter[t]);
            }
            if (cond) {
                tmp = "http://members.iracing.com/membersite/member/EventResult.do?&subsessionid=" + liste_sessions[i].sessionid;
                cont_html += "" +
                    "<span style='display:flex;display: -webkit-flex; /* NEW */' class='filter_hover'>" +
                    "<input type='checkbox' id='sid" + liste_sessions[i].sessionid + "_num" + liste_sessions[i].sessionnum + "'> </input>" +
                    "<a title='See iRacing Official Results' " + tmp_target + " class='iracing_link' href='" + tmp + "'>[Results]</a> " +
                    "&nbsp;<span title='" + liste_sessions[i].sessionid + " - " + liste_sessions[i].nom + "' class='filter_hover' onclick='load_session(" + liste_sessions[i].sessionid + ", " + liste_sessions[i].sessionnum + ", 1)'>" +
                    liste_sessions[i].nom + "</span></span>";
            }
        }
        document.getElementById("session").innerHTML = cont_html;

        document.getElementById("my_results_check_all").checked = false;

    //}, 1000);
}

function my_results_apply_filter(type, filtre) {
    my_results_filter[type] = filtre;
    timing_menu(0);
}

function load_session(sid, num, mode) {
    // mode 1 : normal avec init_var()
    // mode 0 : sans init_var(). Utile pour lorsqu'on change les settings dans JRT config et éviter les rechargements infinis

    if (broadcast <= 1) {

        if (force_inner_h) {
            window_innerHeight = inner_height;
        } else {
            window_innerHeight = window.innerHeight;
        }

        $("#loading").css("display", "block");
        //$("#loading").html("LOADING DATA ...");

        //if (decalage > 10) {  // On vérifie qu'on n'est pas en live
            setTimeout(function() {
                document.getElementById('my_results_menu').style.display = 'none';
                $("#loading").html("LOADING DATA ...");
                //$("#loading").html(broadcast);
            }, 450);
            my_results_menu = 0;
            $('#my_results_button').attr('class', 'menu_button');
            $('#my_results_menu').transition({x: 0, y: window_innerHeight}, 450, 'ease');
            //document.getElementById('my_results_menu').style.display = 'none';
            if (mode == 1) {
                init_var(1);
            }
            if (broadcast == 0) {
                ws.send("load_session;" + sid + ";" + num);
            } else {
                ws3.send("load_session;" + sid + ";" + num);
            }
        //}
    }
}

function menu_top(name) {

    if (menu_[name].mode == "down") {
        var top = 18 + parseInt($('#' + name + '_menu').css('height')) + parseInt($('#' + name + '_button').css('height'));
    } else {
        if (force_inner_h) {
            window_innerHeight = inner_height;
        } else {
            window_innerHeight = window.innerHeight;
        }
        var top = window_innerHeight;
    }
    return top;
}

function open_menu(name) {
    var delay = 450;
    if (menu_wait == 0) {
        if (menu_[name].state == 0) {
            menu_wait = 1;

            $("#" + name + "_menu").transition({x: 0, y: menu_top(name)}, 0);
            document.getElementById(name + "_menu").style.display = "block";
            menu_[name].state = 1;
            $("#" + name + "_button").attr("class", "menu_button_on");
            $("#" + name + "_menu").transition({x: 0, y: 0}, delay, "ease");
            //
            for (n in menu_) {
                if (n != name) {
                    menu_[n].state = 0;
                    $("#" + n + "_button").attr("class", "menu_button");
                    $("#" + n + "_menu").transition({x: 0, y: menu_top(n)}, delay, "ease");
                }
            }
            setTimeout(function () {
                for (n in menu_) {
                    if (n != name) {
                        document.getElementById(n + "_menu").style.display = "none";
                    }
                }
                menu_wait = 0;
            }, delay);
        } else {
            setTimeout(function () {
                document.getElementById(name + "_menu").style.display = "none"
            }, delay);
            menu_[name].state = 0;
            $("#" + name + "_button").attr("class", "menu_button");
            $("#" + name + "_menu").transition({x: 0, y: menu_top(name)}, delay, "ease");
        }
    }
    //console.log("*** responsive_dim timing_menu")
    responsive_dim(disp_param, 1);  // REM : faut laisser l'option to_draw_track à 1 sinon la trackmap va s'effacer quand on rentrera dans un menu
}

function my_results_check_all() {
    for (var i in liste_sessions) {
        cond = true;
        for (var t in liste_sessions_) {
            cond = cond && (my_results_filter[t] == 0 || liste_sessions[i][t] == my_results_filter[t]);
        }
        if (cond) {
            if (document.getElementById("my_results_check_all").checked) {
                document.getElementById("sid" + liste_sessions[i].sessionid + "_num" + liste_sessions[i].sessionnum).checked = true;
            } else {
                document.getElementById("sid" + liste_sessions[i].sessionid + "_num" + liste_sessions[i].sessionnum).checked = false;
            }
        }
    }
}

function delete_sessions() {
    if (broadcast == 0) {
        for (var i in liste_sessions) {
            cond = true;
            for (var t in liste_sessions_) {
                cond = cond && (my_results_filter[t] == 0 || liste_sessions[i][t] == my_results_filter[t]);
            }
            if (cond) {
                if (document.getElementById("sid" + liste_sessions[i].sessionid + "_num" + liste_sessions[i].sessionnum).checked) {
                    ws.send("delete_session;" + liste_sessions[i].sessionid + ";" + liste_sessions[i].sessionnum);
                    delete liste_sessions[i];
                }
            }
        }
    }

    // On reforme le tableau liste_sessions_
    liste_sessions_ = {};
    tmp = ["car", "track", "annee", "mois", "jour", "type"];
    for (t in tmp) {
        liste_sessions_[tmp[t]] = {};
        for (i in liste_sessions) {
            if (!(liste_sessions[i][tmp[t]] in liste_sessions_[tmp[t]])) {
                liste_sessions_[tmp[t]][liste_sessions[i][tmp[t]]] = 1;
            }
        }
    }

    timing_menu(0);
}


style_text_shadow = {};
style_text_shadow_pB = {};
style_text_shadow_p = {};
