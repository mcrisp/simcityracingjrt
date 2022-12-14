function str_heure() {
    var dt = new Date();
    hrs=dt.getHours();
    min=dt.getMinutes();
    sec=dt.getSeconds();
    tm=(((hrs<10)?"0":"") +hrs)+":";
    tm+=((min<10)?"0":"")+min+":";
    tm+=((sec<10)?"0":"")+sec;
    return tm;
}


function rpm_led_in_pits() {
    tmp = 6 + (donnees.s - donnees.pitspeedlimit) * 3.6;
    num_led = Math.floor(tmp);
    led_col_intensite = tmp - num_led;
    tmp = Math.floor(200 - led_col_intensite * 200);
    for (i = 1; i <= 12; i++) {
        if (num_led <= 6) {
            if (i <= num_led) {
                set_style_bg("led" + i, "#00ff00");
            } else {
                if (i <= 6) {
                    if (i == num_led + 1) {
                        set_style_bg("led" + i, 'rgb(' + tmp + ', 255,' + tmp + ')');
                    } else {
                        set_style_bg("led" + i, "#c8ffc8");
                    }
                } else {
                    if (i == num_led + 1) {
                        set_style_bg("led" + i, 'rgb(255, ' + tmp + ',' + tmp + ')');
                    } else {
                        set_style_bg("led" + i, "#ffc8c8");
                    }
                }
            }
        } else {
            if (i <= num_led && i > 6) {
                set_style_bg("led" + i, "#ff0000");
            } else {
                if (i <= 6) {
                    set_style_bg("led" + i, "#00ff00");
                } else {
                    if (i == num_led + 1) {
                        set_style_bg("led" + i, 'rgb(255, ' + tmp + ',' + tmp + ')');
                    } else {
                        set_style_bg("led" + i, "#ffc8c8");
                    }
                }
            }
        }

    }
}


// Nouvelle méthode de gestion des rpm leds dans les pits
// Quand on est sous la vitesse on affiche les leds en vert (toutes les leds sont affichées si on est juste en-dessous de la vitesse)
// Quand on est juste au-dessus, on affiche une seule led rouge
function rpm_led_in_pits2() {
    var speed_delta_max = advanced["rpm_led_in_pits2_delta_" + "rpm_leds" + disp_sel];
    //console.log(speed_delta_max)
    //donnees.pitspeedlimit = 40/3.6;  // DEBUG

    //donnees.s = (400 + 0.5*3.3/12)/3.6;  // DEBUG
    if (donnees.s < donnees.pitspeedlimit) {
        //tmp = Math.max(0, 12.5 + (donnees.s - donnees.pitspeedlimit) * 3.6 / (3.3 / 12));  // 3.3 km/h pour les 12 leds
        //tmp = Math.max(0, 12.5 + (donnees.s - donnees.pitspeedlimit) * 3.6 / (1.4 / 12));  // 1.4 km/h pour les 12 leds
        tmp = Math.max(0, 12.5 + (donnees.s - donnees.pitspeedlimit) * 3.6 / (speed_delta_max / 12));  // 1.4 km/h pour les 12 leds
        num_led = Math.floor(tmp);
        for (i = 1; i <= 12; i++) {
            if (i <= num_led) {
                set_style_bg("led" + i, led_on_speed_low_color);
            } else {
                set_style_bg("led" + i, led_off_speed_low_color);
            }
        }
    } else {
        //tmp = Math.min(12, (donnees.s - donnees.pitspeedlimit) * 3.6 / (3.3 / 12));  // 3.3 km/h pour les 12 leds
        //tmp = Math.min(12, (donnees.s - donnees.pitspeedlimit) * 3.6 / (1.4 / 12));  // 1.4 km/h pour les 12 leds
        tmp = Math.min(12, (donnees.s - donnees.pitspeedlimit) * 3.6 / (speed_delta_max / 12));  // 1.4 km/h pour les 12 leds
        num_led = Math.floor(tmp);
        for (i = 1; i <= 12; i++) {
            if (i <= num_led) {
                set_style_bg("led" + i, led_on_speed_high_color);
            } else {
                set_style_bg("led" + i, led_off_speed_high_color);
            }
        }
    }

}


function update_dashboard() {

    //console.log(donnees.typ);

    if (!donnees.is_iracing_started) {
        donnees.fuel_accurate = 1;
        donnees.co = 8.888;
        donnees.co1 = 8.888;
        donnees.co5 = 8.888;
        donnees.estlaps_bg1_pct = 0.5;
        donnees.lapsremain_bg1_pct = 0.5;
        donnees.gap_pct_lastlap = 0.75;  // pour positionner la ligne bleue/or à 75%
        donnees.lead_lap = 1;  // ligne bleue si on finit dans le même tour
        donnees.refuelspeed = 88.888 / 5 * 2;  // pour que la barre bleue verticale soit à 50%
        donnees.fn = 88.888;
        donnees.fn5 = 88.888;
        donnees.fnman = 88.888;
        donnees.fn5 = 88.888;
        donnees.fnMAX = 88.888;
        donnees.fnSet = 88.888;
        // ...
    }

    disp_sel = "_" + advanced["display_selected"];

    if (donnees.fnman != fnman_old) {
        fnman_disp_temporary_tstamp = Date.now() / 1000;
        fnman_old = donnees.fnman;
    }
    if (donnees.fn_auto_offset != fn_auto_offset_old) {
        fn_auto_offset_disp_temporary_tstamp = Date.now() / 1000;
        fn_auto_offset_old = donnees.fn_auto_offset;
    }

    if (donnees["licence_str"] != undefined) {
        pro_expired_old = pro_expired;
        pro_expired = donnees["expired"];
        if (pro_expired != pro_expired_old) {
            if (pro_expired == 1) {
                $("#expired").css("display", "block");
                $("#expired").html("<br>" + donnees["licence_str"].replace(/\n/g, "<br>"));
            } else {
                $("#expired").css("display", "none");
            }
        }
    } else {
        $("#expired").css("display", "none");
    }

    if ((donnees.me_pos != undefined && donnees.me_pos == 1 && donnees.styp == "Race") || f3_mode_in_race_dashboard == 1) {  // si on est en tête on affiche devant le pilote sur lequel on revient comme si on était en mode f3
        f3_mode_for_pre = 1;
    } else {
        f3_mode_for_pre = 0;
    }

    // REM : _f3 est utilisé dans la fonction deltas_and_gapcolor()
    if (donnees.styp == "Race" && f3_mode_in_race_dashboard == 0) {
        _f3 = "";
        _f3_tag = "";
    } else {
        _f3 = "_f3";
        if (dashboard_f3mode_dot) {
            _f3_tag = ".";
        } else {
            _f3_tag = "";
        }
    }

    if (donnees.styp == "Race" && (f3_mode_in_race_dashboard == 0 && f3_mode_for_pre == 0)) {
        _f3_pre = "";
        _f3_pre_tag = "";
    } else {
        _f3_pre = "_f3";
        if (dashboard_f3mode_dot) {
            _f3_pre_tag = ".";
        } else {
            _f3_pre_tag = "";
        }
    }
    if (donnees.styp == "Race" && f3_mode_in_race_dashboard == 0) {
        _f3_post = "";
        _f3_post_tag = "";
    } else {
        _f3_post = "_f3";
        if (dashboard_f3mode_dot) {
            _f3_post_tag = ".";
        } else {
            _f3_post_tag = "";
        }
    }

    _f3_pre_me_post = {
        "pre": _f3_pre,
        "me": "",
        "post": _f3_post
    }

    if (donnees.typ == 31 || donnees.typ == 1 || force_update_data_type1) {

        corrige_bg_col_by_classid(donnees);

        //
        if (advanced["disp_" + "trackname" + disp_sel]) {
            if (donnees.trackname != undefined) {
                set_inner_html("trackname", donnees.trackname);
            }
        }

        //
        if (advanced["disp_" + "trackconfig" + disp_sel]) {
            if (donnees.trackconfig != undefined) {
                set_inner_html("trackconfig", donnees.trackconfig);
            }
        }

        //
        if (advanced["disp_" + "sof" + disp_sel]) {
            if (donnees.sof_me != undefined) {
                //document.getElementById("sof").innerHTML = donnees.sof_me;
                set_inner_html("sof", donnees.sof_me);
            }
        }

        //
        for (var c = 0; c <= 4; c++) {
            if (advanced["disp_" + "sof_class" + c + disp_sel]) {
                if (donnees.sof != undefined && c in donnees.sof && donnees.sof[c] != undefined) {

                    var str = "0x000000";
                    if (donnees.carclasscolor != undefined && (c in donnees.carclasscolor)) {
                        str = donnees.carclasscolor[c];
                    }

                    if (str == "0x0") str = "0xaaaaaa";
                    str = str.slice(2);
                    for (n = str.length; n < 6; n++) {
                        str = "0" + str
                    }

                    if (c in bg_by_classid_corr) {  // si on a définit une class spécifique pour un numéros ainsi qu'un couleur
                        str = bg_by_classid_corr[c].slice(1);
                    }

                    // Si on a défini la couleur de fond dans JRT Config, on force cette couleur
                    if (advanced["perso_bg_color_" + "sof_class" + c + disp_sel]) {
                        str = advanced["bg_color_" + "sof_class" + c + disp_sel].slice(1);  // slice pour enlever le #
                    }

                    // On calcule la bonne couleur pour la font sauf si on l'a choisi dans JRT Config
                    if (advanced["perso_font_color_" + "sof_class" + c + disp_sel]) {
                        font_coul = advanced["font_color_" + "sof_class" + c + disp_sel].slice(1);  // slice pour enlever le #
                    } else {
                        var r = parseInt("0x" + str.substr(0, 2));
                        var g = parseInt("0x" + str.substr(2, 2));
                        var b = parseInt("0x" + str.substr(4, 2));
                        var moy = (r + g + b) / 3;
                        var font_coul = "000000";
                        if (moy < 150) {
                            font_coul = "ffffff";
                        }
                        if (c in col_by_classid_corr) {  // si on a définit une class spécifique pour un numéros ainsi qu'un couleur
                            font_coul = col_by_classid_corr[c].slice(1);
                        }
                    }

                    set_inner_html("sof_class" + c, donnees.sof[c]);
                    set_style_bg_alpha("sof_class" + c, "#" + str, advanced["bg_" + "sof_class" + c + disp_sel]);
                    set_style_color("sof_class" + c, "#" + font_coul);

                } else {
                    set_inner_html("sof_class" + c, "&nbsp;");
                    set_style_bg_alpha("sof_class" + c, "#000000", 0);
                }
            }
        }

        if (advanced["disp_" + "drs" + disp_sel]) {
            if ((carname in car_with_drs) && (carname != "formularenault35")) {  // REM : la valeur DRS_status ne fonctionne pas pour la formule renault 3.5, donc pas possible de savoir si le DRS est activable
                //document.getElementById("drs").innerHTML = "DRS";
                set_inner_html("drs", "DRS");
            }
        }

        rpm_leds_N_red = donnees["rpm_leds_N_red"];
        rpm_leds_led1_pct = donnees["rpm_leds_led1_pct"];

        force_update_data_type1 = false;
    }

    // Toutes les secondes ou bien si on est en cours de changement de config
    if (donnees.typ <= 32 || (Date.now() - last_change_config_tstamp <= 5000) ) {

        if (donnees.u != undefined) {
            speedfactor = donnees.u == 1 ? 1 : 1 / 1.609344;
            if (donnees.carname == "lotus79" || donnees.carname == "lotus49") {
                fuelfactor = donnees.u == 1 ? 1 : 1 / 4.54609;
            } else {
                fuelfactor = donnees.u == 1 ? 1 : 1 / 3.78541178;
            }
        }

        if (!advanced["perso_font_color_" + "pre_cpos" + disp_sel] && donnees["pre_cc" + _f3_pre] != undefined && advanced["disp_" + "pre_cpos" + disp_sel]) {
            //document.getElementById("pre_cpos").style.color = cc(donnees["pre_cc" + _f3_pre]);
            set_style_color("pre_cpos", cc(donnees["pre_cc" + _f3_pre], donnees["pre_num" + _f3_pre], donnees["pre_uid" + _f3_pre], donnees["pre_tid" + _f3_pre], donnees["pre_classid" + _f3_pre]));
        }
        if (!advanced["perso_font_color_" + "me_cpos" + disp_sel] && donnees.me_cc != undefined && advanced["disp_" + "me_cpos" + disp_sel]) {
            //document.getElementById("me_cpos").style.color = cc(donnees.me_cc);
            set_style_color("me_cpos", cc(donnees.me_cc, donnees.me_num, donnees.me_uid, donnees.me_tid, donnees.me_classid));
        }
        if (!advanced["perso_font_color_" + "post_cpos" + disp_sel] && donnees["post_cc" + _f3_post] != undefined && advanced["disp_" + "post_cpos" + disp_sel]) {
            //document.getElementById("post_cpos").style.color = cc(donnees["post_cc" + _f3_post]);
            set_style_color("post_cpos", cc(donnees["post_cc" + _f3_post], donnees["post_num" + _f3_post], donnees["post_uid" + _f3_post], donnees["post_tid" + _f3_post], donnees["post_classid" + _f3_post]));
        }

        // Application des couleurs de class pour certains éléments
        for (var pre_me_post in {"pre": 1, "me": 1, "post": 1}) {
            //for (var name in add_carclasscolor_option_list[pre_me_post]) {
            for (var name in special_options_list["add_carclasscolor_option_" + pre_me_post]) {
                if (advanced["disp_" + name + disp_sel]) {
                    if (advanced["perso_bg_color_" + name + disp_sel]) {

                        var colorize_col = null;
                        if (advanced["colorize_bg_color_" + name + disp_sel]) {
                            if (colorize_drivers_init == 0) {  // pour s'assurer que le colorize_ est bien défini
                                var nom, id;
                                if (donnees.teamracing) {
                                    nom = donnees[pre_me_post + "_teamname" + _f3_pre_me_post[pre_me_post]];
                                    id = donnees[pre_me_post + "_tid" + _f3_pre_me_post[pre_me_post]];
                                } else {
                                    nom = donnees[pre_me_post + "_name" + _f3_pre_me_post[pre_me_post]];
                                    id = donnees[pre_me_post + "_uid" + _f3_pre_me_post[pre_me_post]];
                                }

                                var col_ = null;
                                for (var idx_ in colorize_) {
                                    if (nom != undefined && nom.toUpperCase().includes(idx_.toUpperCase())) {
                                        col_ = colorize_[idx_];
                                    }
                                }

                                // On colorize le pilote avec les données du fichier _colorize.js (même couleur que dans le timing)
                                if (id in colorize_) {
                                    colorize_col = colorize_[id];
                                } else if (col_ !== null) {
                                    colorize_col = col_;
                                }
                                if (colorize_col !== null) {
                                    if ( !(name in elt_list_with_["_cont"]) ) {
                                        set_style_bg_alpha(name, colorize_col, advanced["bg_" + name + disp_sel]);
                                    } else {
                                        set_style_bg_alpha(name + "_cont", colorize_col, advanced["bg_" + name + disp_sel]);
                                    }
                                }
                            }
                        }

                        if (colorize_col == null) {
                            if (!(name in elt_list_with_["_cont"])) {
                                if (advanced["ccc_bg_color_" + name + disp_sel]) {
                                    set_style_bg_alpha(name, cc(donnees[pre_me_post + "_cc" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_num" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_uid" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_tid" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_classid" + _f3_pre_me_post[pre_me_post]]), advanced["bg_" + name + disp_sel]);
                                } else {
                                    set_style_bg_alpha(name, advanced["bg_color_" + name + disp_sel], advanced["bg_" + name + disp_sel]);
                                }

                            } else {
                                if (advanced["ccc_bg_color_" + name + disp_sel]) {
                                    set_style_bg_alpha(name + "_cont", cc(donnees[pre_me_post + "_cc" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_num" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_uid" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_tid" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_classid" + _f3_pre_me_post[pre_me_post]]), advanced["bg_" + name + disp_sel]);
                                } else {
                                    set_style_bg_alpha(name + "_cont", advanced["bg_color_" + name + disp_sel], advanced["bg_" + name + disp_sel]);
                                }
                            }
                        }

                    }
                    if (advanced["perso_font_color_" + name + disp_sel]) {
                        if (advanced["adapt_font_color_" + name + disp_sel]) {
                            set_style_color(name, calc_font_coul(document.getElementById(name).style.backgroundColor));
                        } else if (advanced["ccc_font_color_" + name + disp_sel]) {
                            set_style_color(name, cc(donnees[pre_me_post + "_cc" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_num" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_uid" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_tid" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_classid" + _f3_pre_me_post[pre_me_post]]));
                        } else {
                            set_style_color(name, advanced["font_color_" + name + disp_sel]);
                        }
                    }

                    if (advanced["ccc_box_border_color_" + name + disp_sel]) {
                        //var elt = document.getElementById(name + "_box_border");
                        //if (elt) {
                        //elt.style.borderColor = cc(donnees[pre_me_post + "_cc" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_num" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_classid" + _f3_pre_me_post[pre_me_post]]);
                        set_style_border_color(name + "_box_border", cc(donnees[pre_me_post + "_cc" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_num" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_uid" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_tid" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_classid" + _f3_pre_me_post[pre_me_post]]));
                        //}
                    }
                    if (advanced["ccc_header_bg_color_" + name + disp_sel]) {
                        set_style_bg_alpha(name + "_label", cc(donnees[pre_me_post + "_cc" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_num" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_uid" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_tid" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_classid" + _f3_pre_me_post[pre_me_post]]), advanced["header_bg_opacity_" + name + disp_sel]);
                    }
                    if (advanced["adapt_header_font_color_" + name + disp_sel]) {
                        set_style_color(name + "_label", calc_font_coul(document.getElementById(name + "_label").style.backgroundColor));
                    } else if (advanced["ccc_header_font_color_" + name + disp_sel]) {
                        set_style_color(name + "_label", cc(donnees[pre_me_post + "_cc" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_num" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_uid" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_tid" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_classid" + _f3_pre_me_post[pre_me_post]]));
                    }
                    if (advanced["ccc_header_border_color_" + name + disp_sel]) {
                        //var elt = document.getElementById(name + "_label");
                        //if (elt) {
                        //elt.style.borderColor = cc(donnees[pre_me_post + "_cc" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_num" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_classid" + _f3_pre_me_post[pre_me_post]]);
                        //RGBA(elt, advanced["header_border_opacity_" + name + disp_sel], "border-color");
                        set_style_border_color_alpha(name + "_label", cc(donnees[pre_me_post + "_cc" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_num" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_uid" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_tid" + _f3_pre_me_post[pre_me_post]], donnees[pre_me_post + "_classid" + _f3_pre_me_post[pre_me_post]]), advanced["header_border_opacity_" + name + disp_sel]);
                        //}
                    }
                }
            }
        }


        cache_pre_old = cache_pre;
        cache_post_old = cache_post;
        cache_pre = 0;
        cache_post = 0;
        /*if (donnees_new["pre_rc" + _f3_pre] != undefined) {
            if (donnees_new["pre_rc" + _f3_pre] < 0) {
                cache_pre = 1;
            }
        }
        if (donnees_new["post_rc" + _f3_post] != undefined) {
            if (donnees_new["post_rc" + _f3_post] > 0) {
                cache_post = 1;
            }
        }*/
        // REM : c'est important d'utiliser donnees_new pour le pre_rc, post_rc, pre_rcf3, post_rcf3 pour éviter de se retrouver avec une ancienne valeur
        if (donnees.styp == "Race" && (f3_mode_in_race_dashboard == 0 && f3_mode_for_pre == 0)) {
            if (donnees_new.pre_rc != undefined) {
                if (donnees_new.pre_rc <= 0) {
                    cache_pre = 1;
                }
            } else {
                cache_pre = 1;
            }
        } else {
            // En dehors des courses, on affiche l'écart sur la piste
            if (donnees_new["pre_rcf3" + _f3_pre] != undefined) {
                if (donnees_new["pre_rcf3" + _f3_pre] <= 0) {
                    cache_pre = 1;
                }
            } else {
                cache_pre = 1;
            }
        }
        if (donnees.styp == "Race" && f3_mode_in_race_dashboard == 0) {
            if (donnees_new.post_rc != undefined) {
                if (donnees_new.post_rc >= 0) {
                    cache_post = 1;
                }
            } else {
                cache_post = 1;
            }
        } else {
            // En dehors des courses, on affiche l'écart sur la piste
            if (donnees_new["post_rcf3" + _f3_post] != undefined) {
                if (donnees_new["post_rcf3" + _f3_post] >= 0) {
                    cache_post = 1;
                }
            } else {
                cache_post = 1;
            }
        }

        //console.log(donnees_new["pre_rcf3" + _f3])

        // Le plus simple est de mettre undefined quand on veux cacher une valeur pre/post
        if (donnees["pre_eq_me" + _f3_pre] == 1 || cache_pre) {
            donnees["pre_track_status" + _f3_pre] = -2;
            donnees["pre_ir" + _f3_pre] = "&nbsp;";
            donnees["pre_name" + _f3_pre] = "&nbsp;";
            donnees["pre_pos" + _f3_pre] = "&nbsp;";
            donnees["pre_posb" + _f3_pre] = "&nbsp;";
            donnees["pre_cpos" + _f3_pre] = "&nbsp;";
            donnees["pre_cposb" + _f3_pre] = "&nbsp;";
            donnees["pre_gain" + _f3_pre] = 999;
            donnees["pre_cgain" + _f3_pre] = 999;
            donnees["pre_b" + _f3_pre] = 0;
            donnees["pre_l" + _f3_pre] = 0;
            donnees["pre_rc" + _f3_pre] = 0;
            donnees["pre_rcf3" + _f3_pre] = 0;
            donnees["pre_lc" + _f3_pre] = "&nbsp;";
            donnees["pre_sti" + _f3_pre] = "&nbsp;";
            donnees["pre_p2p_count" + _f3_pre] = -1;
            donnees["pre_tire_compound" + _f3_pre] = -1;
            donnees["pre_tires_stints" + _f3_pre] = undefined;
            donnees["pre_tires_nb_changes" + _f3_pre] = undefined;
            donnees["pre_club_name" + _f3_pre] = undefined;
            donnees["pre_club_logo" + _f3_pre] = undefined;
            donnees["pre_club_flag" + _f3_pre] = undefined;
            donnees["pre_car_name" + _f3_pre] = undefined;
            donnees["pre_car_logo" + _f3_pre] = undefined;
            donnees["pre_topspeed" + _f3_pre] = undefined;
            donnees["pre_max_speed" + _f3_pre] = undefined;
            donnees["pre_apex_speed" + _f3_pre] = undefined;
        }
        if (donnees["post_eq_me" + _f3_post] == 1 || cache_post) {
            donnees["post_track_status" + _f3_post] = -2;
            donnees["post_ir" + _f3_post] = "&nbsp;";
            donnees["post_name" + _f3_post] = "&nbsp;";
            donnees["post_pos" + _f3_post] = "&nbsp;";
            donnees["post_posb" + _f3_post] = "&nbsp;";
            donnees["post_cpos" + _f3_post] = "&nbsp;";
            donnees["post_cposb" + _f3_post] = "&nbsp;";
            donnees["post_gain" + _f3_post] = 999;
            donnees["post_cgain" + _f3_post] = 999;
            donnees["post_b" + _f3_post] = 0;
            donnees["post_l" + _f3_post] = 0;
            donnees["post_rc" + _f3_post] = 0;
            donnees["post_rcf3" + _f3_post] = 0;
            donnees["post_lc" + _f3_post] = "&nbsp;";
            donnees["post_sti" + _f3_post] = "&nbsp;";
            donnees["post_p2p_count" + _f3_post] = -1;
            donnees["post_tire_compound" + _f3_post] = -1;
            donnees["post_tires_stints" + _f3_post] = undefined;
            donnees["post_tires_nb_changes" + _f3_post] = undefined;
            donnees["post_club_name" + _f3_post] = undefined;
            donnees["post_club_logo" + _f3_post] = undefined;
            donnees["post_club_flag" + _f3_post] = undefined;
            donnees["post_car_name" + _f3_post] = undefined;
            donnees["post_car_logo" + _f3_post] = undefined;
            donnees["post_topspeed" + _f3_post] = undefined;
            donnees["post_max_speed" + _f3_post] = undefined;
            donnees["post_apex_speed" + _f3_post] = undefined;
        }

        // On cache le delta graphic quand il n'y a personne devant / derrière
        if (advanced["disp_delta_pre" + disp_sel] && cache_pre != cache_pre_old) {
            if (cache_pre) {
                $("#delta_pre").css("display", "none");
                $("#deltaB_pre").css("display", "none");
            } else {
                $("#delta_pre").css("display", "inline-block");
                $("#deltaB_pre").css("display", "inline-block");
            }
        }
        if (advanced["disp_delta_post" + disp_sel] && cache_post != cache_post_old) {
            if (cache_post) {
                $("#delta_post").css("display", "none");
                $("#deltaB_post").css("display", "none");
            } else {
                $("#delta_post").css("display", "inline-block");
                $("#deltaB_post").css("display", "inline-block");
            }
        }

        if (advanced["disp_" + "session_type" + disp_sel]) {
            var tmp;
            if (donnees.styp != undefined) {
                if (donnees.styp == "Race" && donnees.sname != "RACE") {
                    tmp = donnees.sname;
                } else {
                    tmp = donnees.styp;
                }
                set_inner_html("session_type", tmp);
            }
        }
        if (advanced["disp_" + "sky" + disp_sel]) {
            if (donnees.skies != undefined) {
                set_inner_html("sky", reformat_skies(donnees.skies));
            }
        }
        if (advanced["disp_" + "humidity" + disp_sel]) {
            var tmp = parseFloat(donnees.humidity);
            if (!isNaN(tmp) && donnees.humidity != undefined) {
                set_inner_html("humidity", (tmp * 100).toFixed(0) + "%");
            }
        }
        if (advanced["disp_" + "wind_dir" + disp_sel]) {
            var tmp = parseFloat(donnees.winddir);
            if (!isNaN(tmp) && donnees.winddir != undefined) {
                set_inner_html("wind_dir", reformat_winddir(tmp / Math.PI * 180));
            }
        }
        if (advanced["disp_" + "wind_dir_deg" + disp_sel]) {
            var tmp = parseFloat(donnees.winddir);
            if (!isNaN(tmp) && donnees.winddir != undefined) {
                set_inner_html("wind_dir_deg", ((tmp / Math.PI * 180) % 360).toFixed(0) + "&deg");
            }
        }



        if (advanced["disp_" + "wind_speed" + disp_sel]) {
            var tmp = parseFloat(donnees.windspeed);
            if (!isNaN(tmp) && donnees.windspeed != undefined) {
                if (donnees.u == 1) {
                    str_speed = (tmp * 3.6).toFixed(1) + " km/h";
                } else {
                    str_speed = (tmp * 3.6 / 1.609344).toFixed(1) + " MPH";
                }
                set_inner_html("wind_speed", str_speed);
            }
        }
        if (advanced["disp_" + "air_temp" + disp_sel]) {
            var tmp = parseFloat(donnees.airtemp);
            if (!isNaN(tmp) && donnees.airtemp != undefined) {
                if ((temperature_mode != 2) && ((donnees.u == 1 && temperature_mode == 0) || (temperature_mode == 1))) {  // systeme metric ou forcé en Celsius dans les options
                    tmp = tmp.toFixed(1) + "&degC";
                } else {
                    tmp = (tmp * 1.8 + 32).toFixed(1) + "&degF";
                }
                set_inner_html("air_temp", tmp);
            }
        }
        if (advanced["disp_" + "air_press" + disp_sel]) {
            var tmp = parseFloat(donnees.airpress);
            if (!isNaN(tmp) && donnees.airpress != undefined) {
                tmp = tmp * 3.38639;
                //set_inner_html("air_press", tmp.toFixed(1) + " kPa");
                set_inner_html("air_press", tmp.toFixed(1));
            }
        }
        if (advanced["disp_" + "air_dens" + disp_sel]) {
            var tmp = parseFloat(donnees.airdens);
            if (!isNaN(tmp) && donnees.airdens != undefined) {
                //set_inner_html("air_dens", tmp.toFixed(2) + " kg/m<sup style='font-size: 0.66em; line-height: 100%; vertical-align: top;'>3</sup>");
                //set_inner_html("air_dens", tmp.toFixed(2) + " kg/m<sup style='font-size: 0.5em;'>3</sup>");
                set_inner_html("air_dens", tmp.toFixed(2));
            }
        }
        if (advanced["disp_" + "fog" + disp_sel]) {
            var tmp = parseFloat(donnees.fog);
            if (!isNaN(tmp) && donnees.fog != undefined) {
                set_inner_html("fog", (tmp * 100).toFixed(0) + "%");
            }
        }
        if (advanced["disp_" + "track_temp" + disp_sel]) {
            var tmp = parseFloat(donnees.tracktemp);
            if (!isNaN(tmp) && donnees.tracktemp != undefined) {
                if ((temperature_mode != 2) && ((donnees.u == 1 && temperature_mode == 0) || (temperature_mode == 1))) {  // systeme metric ou forcé en Celsius dans les options
                    tmp = tmp.toFixed(1) + "&degC";
                } else {
                    tmp = (tmp * 1.8 + 32).toFixed(1) + "&degF";
                }
                set_inner_html("track_temp", tmp);
            }
        }
        if (advanced["disp_" + "track_usage" + disp_sel]) {
            //var tmp = parseFloat(donnees.track_usage);
            var tmp = donnees.track_usage;
            //if (!isNaN(tmp) && donnees.track_usage != undefined) {
            if (donnees.track_usage != undefined) {  // REM : le track usage est du texte
                //tmp = tmp.toFixed(1) + "%";
                set_inner_html("track_usage", tmp);
            }
        }

        if (advanced["disp_" + "date_ingame" + disp_sel]) {
            if (donnees.date_ingame != undefined) {
                //set_inner_html("date_ingame", donnees.date_ingame);
                var year = donnees.date_ingame.substr(0, 4);
                var month = donnees.date_ingame.substr(5, 2);
                var day = donnees.date_ingame.substr(8, 2);
                set_inner_html("date_ingame_year", year);
                set_inner_html("date_ingame_month", "");
                document.getElementById("date_ingame_month").lang = month;
                set_inner_html("date_ingame_day", "");
                document.getElementById("date_ingame_day").lang = day;
            }
        }

        if (advanced["disp_" + "weather" + disp_sel]) {
            tmp_weather = "&nbsp;";
            if (donnees.styp == "Race" && donnees.sname != "RACE") {
                tmp_weather += donnees.sname + ", ";
            } else if (donnees.styp != undefined) {
                tmp_weather += donnees.styp + ", ";
            } else {
                tmp_weather += "Weather ...";
            }
            tmp_weather += reformat_skies(donnees.skies);

            // On s'assure d'avoir des nombres pour éviter les erreurs
            donnees.windspeed = parseFloat(donnees.windspeed);
            donnees.airtemp = parseFloat(donnees.airtemp);
            donnees.airpress = parseFloat(donnees.airpress);
            donnees.airdens = parseFloat(donnees.airdens);
            donnees.tracktemp = parseFloat(donnees.tracktemp);
            donnees.winddir = parseFloat(donnees.winddir);
            donnees.humidity = parseFloat(donnees.humidity);
            donnees.fog = parseFloat(donnees.fog);
            var tmp_isNaN = false;
            if (isNaN(donnees.windspeed) || isNaN(donnees.airtemp) || isNaN(donnees.airdens) || isNaN(donnees.airpress) || isNaN(donnees.tracktemp) || isNaN(donnees.winddir) || isNaN(donnees.humidity) || isNaN(donnees.fog)) {
                tmp_isNaN = true;
            }

            if (!tmp_isNaN && (donnees.airtemp != undefined) && (donnees.airpress != undefined) && (donnees.airdens != undefined) && (donnees.tracktemp != undefined) && (donnees.winddir != undefined) && (donnees.humidity != undefined)) {
                if (donnees.u == 1) {
                    str_speed = (donnees.windspeed * 3.6).toFixed(1) + " km/h";
                } else {
                    str_speed = (donnees.windspeed * 3.6 / 1.609344).toFixed(1) + " MPH";
                }
                if ((temperature_mode != 2) && ((donnees.u == 1 && temperature_mode == 0) || (temperature_mode == 1))) {  // systeme metric ou forcé en Celsius dans les options
                    tmp_weather += " " + "<span style='font-style: italic; font-weight: bold'>" + donnees.airtemp.toFixed(1) + "&degC</span>";
                    tmp_weather += ", tr " + "<span style='font-style: italic; font-weight: bold'>" + donnees.tracktemp.toFixed(1) + "&degC</span>";
                    tmp_weather += ", " + "<span style='font-style: italic; font-weight: bold'>" + reformat_winddir(donnees.winddir / Math.PI * 180) + " " + ((donnees.winddir / Math.PI * 180) % 360).toFixed(0) + "&deg</span>";
                    tmp_weather += " " + "<span style='font-style: italic; font-weight: bold'>" + str_speed + "</span>";
                } else {
                    tmp_weather += " " + "<span style='font-style: italic; font-weight: bold'>" + (donnees.airtemp * 1.8 + 32).toFixed(1) + "&degF</span>";
                    tmp_weather += ", tr " + "<span style='font-style: italic; font-weight: bold'>" + (donnees.tracktemp * 1.8 + 32).toFixed(1) + "&degF</span>";
                    tmp_weather += ", " + "<span style='font-style: italic; font-weight: bold'>" + reformat_winddir(donnees.winddir / Math.PI * 180) + " " + ((donnees.winddir / Math.PI * 180) % 360).toFixed(0) + "&deg</span>";
                    tmp_weather += " " + "<span style='font-style: italic; font-weight: bold'>" + str_speed + "</span>";
                }
                tmp_weather += ", " + "<span style='font-style: italic; font-weight: bold'>" + (donnees.humidity * 100).toFixed(0) + "%</span>";
            }
            //tmp_weather += ", Pressure " + "<span style='font-style: italic; font-weight: bold'>" + donnees.airpress.toFixed(0) + " Hg</span>";
            //tmp_weather += ", Density " + "<span style='font-style: italic; font-weight: bold'>" + donnees.airdens.toFixed(3) + " kg/m<sup>3</sup></span>";
            //tmp_weather += ", Fog " + "<span style='font-style: italic; font-weight: bold'>" + (donnees.fog * 100).toFixed(0) + "%</span>";

            //document.getElementById("weather").innerHTML = tmp_weather;
            set_inner_html("weather", tmp_weather);
        }

        if (advanced["disp_" + "time_of_day" + disp_sel]) {
            if (donnees.tod != undefined) {
                //document.getElementById("time_of_day").innerHTML = donnees.tod;
                set_inner_html("time_of_day", donnees.tod);
            } else {
                //document.getElementById("time_of_day").innerHTML = "--";
                if (donnees.is_iracing_started) {
                    set_inner_html("time_of_day", "--:--:--");
                } else {
                    set_inner_html("time_of_day", "88:88:88");
                }
            }
        }

        if (donnees.tr != undefined && donnees.state != undefined && advanced["disp_" + "timeremain" + disp_sel]) {
            if (donnees.state >= 4 && donnees.laps_l == 1 && donnees.tr != -1 && donnees.tr != -2 && donnees.tr != -3 && donnees.tr != "unlimited" && donnees.styp == "Race" && donnees.laps != "unlimited") {
                //document.getElementById("timeremain").innerHTML = "<span style='font-size: 0.75em; vertical-align: top; top: 25%;'>" + "Lap " + (donnees.lead_lc + 1) + "/" + donnees.laps + "</span>";
                set_inner_html("timeremain", "<span style='font-size: 0.75em; vertical-align: top; top: 25%;'>" + "Lap " + (donnees.lead_lc + 1) + "/" + donnees.laps + "</span>");
            } else {
                //document.getElementById("timeremain").innerHTML = reformat_timeremain(donnees.tr);
                set_inner_html("timeremain", reformat_timeremain(donnees.tr));
            }
        }


        conso = 0;
        conso1 = donnees.co;
        conso5 = donnees.co5;
        if (donnees.calculations_mode != undefined) {
            calculations_mode = donnees.calculations_mode;
        }
        if (donnees.refuel_mode != undefined) {
            refuel_mode = donnees.refuel_mode;
        }


        if (calculations_mode == 1) {
            conso = donnees.co5;
            fuelneed = donnees.fn5;
            text_conso = "(5L)";
            text_fuelneed = "(5L-";
        } else if (calculations_mode == 2) {
            conso = donnees.coMAX;
            fuelneed = donnees.fnMAX;
            text_conso = "(MAX)"
            text_fuelneed = "(MAX-";
        } else if (calculations_mode == 3) {
            conso = donnees.coSet;
            fuelneed = donnees.fnSet;
            text_conso = "(Set)";
            text_fuelneed = "(Set-";
        } else {
            conso = donnees.co;
            fuelneed = donnees.fn;
            text_conso = "(1L)";
            text_fuelneed = "(1L-";
        }

        fuelneed_p = fuelneed;  // fuelneed pour le calcul des nbpits
        fn_dont_change_colors = 0;

        if (refuel_mode == 2) {
            if (Date.now() / 1000 - fn_auto_offset_disp_temporary_tstamp <= 2) {
                fn_dont_change_colors = 1;
            }
        }

        fuelneed1 = donnees.fn;
        fuelneed5 = donnees.fn5;

        refuel_min = donnees.rf_m;
        refuel_avg = donnees.rf_a;
        refuel_avg_now = donnees.rf_an;

        // Si on peut pitter sans risquer de devoir faire un pit de plus on met le fond en mauve
        // Estimation d'abord du nombre de pits restants
        if (fuelneed_p > 0 && donnees.tcap > 0) {
            //p = ((fuelneed_p - 1*conso) / donnees.tcap) + 1;
            // Calcul plus précis tenant compte du fait qu'on remet toujours un peu moins de fuel que tcap car il reste toujours un peu d'essence dans le réservoir (au moins 0.1 L)
            if (conso > 0) {
                tmp_max_refuel_per_pit = (donnees.tcap - Math.min(donnees.tcap % conso, 0.1));
            } else {
                tmp_max_refuel_per_pit = donnees.tcap - 0.1;
            }
            p = ((fuelneed_p) / tmp_max_refuel_per_pit) + 1;
            if (p < 0)
                p = 0;
            //p = parseFloat(p).toFixed(2);
            p = parseFloat(p);
        } else {
            p = 0;
        }
        nbpits = p;  // on enregistre la valeur pour pouvoir l'utiliser ensuite pour le calcul du nblaps_pit_window et pour l'affichage du "nbpits"

        if (!donnees.is_iracing_started) {
            nbpits = 8.539;
            // ...
        }

        if (advanced["disp_" + "fuelneed" + disp_sel]) {
            if (fn_dont_change_colors == 0) {
                var fn_bg0_col_default = "#ff9900";
                if (advanced["perso_bg_color_" + "fuelneed" + disp_sel]) {
                    fn_bg0_col_default = advanced["bg_color_" + "fuelneed" + disp_sel];
                }
                var fn_bg0_col = fn_bg0_col_default;
                if (donnees.estim_status == 0) {
                    fn_bg0_col = "#999999";
                } else {
                    if (Math.floor(p) > 0 && fuelneed < donnees.tcap * Math.floor(p) - donnees.f) {
                        fn_bg0_col = advanced["pit_window_bg_color_" + "fuelneed" + disp_sel];
                    } else {
                        fn_bg0_col = fn_bg0_col_default;
                    }
                }
                change_bg("fuelneed_bg0", fn_bg0_col, advanced["bg_" + "fuelneed" + disp_sel]);
            }
        }
        if (fuelneed1 > 0 && donnees.tcap > 0) {
            //p = ((fuelneed1 - 1*conso1) / donnees.tcap) + 1;
            // Calcul plus précis tenant compte du fait qu'on remet toujours un peu moins de fuel que tcap car il reste toujours un peu d'essence dans le réservoir (au moins 0.1 L)
            if (conso1 > 0) {
                tmp_max_refuel_per_pit = (donnees.tcap - Math.min(donnees.tcap % conso1, 0.1));
            } else {
                tmp_max_refuel_per_pit = donnees.tcap - 0.1;
            }
            p = ((fuelneed1) / tmp_max_refuel_per_pit) + 1;
            if (p < 0)
                p = 0;
            //p = parseFloat(p).toFixed(2);
            p = parseFloat(p);

        } else {
            p = 0;
        }
        if (advanced["disp_" + "fuelneed1" + disp_sel]) {
            var fn_bg0_col_default = "#ff9900";
            if (advanced["perso_bg_color_" + "fuelneed1" + disp_sel]) {
                fn_bg0_col_default = advanced["bg_color_" + "fuelneed1" + disp_sel];
            }
            var fn_bg0_col = fn_bg0_col_default;
            if (donnees.estim_status == 0) {
                fn_bg0_col = "#999999";
            } else {
                if (Math.floor(p) > 0 && fuelneed1 < donnees.tcap * Math.floor(p) - donnees.f) {
                    fn_bg0_col = advanced["pit_window_bg_color_" + "fuelneed1" + disp_sel];
                } else {
                    fn_bg0_col = fn_bg0_col_default;
                }
            }
            change_bg("fuelneed1_bg0", fn_bg0_col, advanced["bg_" + "fuelneed1" + disp_sel]);
        }
        if (fuelneed5 > 0 && donnees.tcap > 0) {
            //p = ((fuelneed5 - 1*conso5) / donnees.tcap) + 1;
            // Calcul plus précis tenant compte du fait qu'on remet toujours un peu moins de fuel que tcap car il reste toujours un peu d'essence dans le réservoir (au moins 0.1 L)
            if (conso5 > 0) {
                tmp_max_refuel_per_pit = (donnees.tcap - Math.min(donnees.tcap % conso5, 0.1));
            } else {
                tmp_max_refuel_per_pit = donnees.tcap - 0.1;
            }
            p = ((fuelneed5) / tmp_max_refuel_per_pit) + 1;
            if (p < 0)
                p = 0;
            //p = parseFloat(p).toFixed(2);
            p = parseFloat(p);
        } else {
            p = 0;
        }
        if (advanced["disp_" + "fuelneed5" + disp_sel]) {
            var fn_bg0_col_default = "#ff9900";
            if (advanced["perso_bg_color_" + "fuelneed5" + disp_sel]) {
                fn_bg0_col_default = advanced["bg_color_" + "fuelneed5" + disp_sel];
            }
            var fn_bg0_col = fn_bg0_col_default;
            if (donnees.estim_status == 0) {
                fn_bg0_col = "#999999";
            } else {
                if (Math.floor(p) > 0 && fuelneed5 < donnees.tcap * Math.floor(p) - donnees.f) {
                    fn_bg0_col = advanced["pit_window_bg_color_" + "fuelneed5" + disp_sel];
                } else {
                    fn_bg0_col = fn_bg0_col_default;
                }
            }
            change_bg("fuelneed5_bg0", fn_bg0_col, advanced["bg_" + "fuelneed5" + disp_sel]);
        }

        if (advanced["disp_" + "timeremain" + disp_sel]) {
            if (donnees.estim_status == 2 && donnees.tr >= 0 && donnees.laps_l != 1) {
                if (advanced["perso_font_color_" + "timeremain" + disp_sel]) {
                    set_style_color("timeremain", advanced["font_color_" + "timeremain" + disp_sel]);
                } else {
                    set_style_color("timeremain", "#333333");
                }
            } else {
                if (advanced["perso_font_color_" + "timeremain" + disp_sel]) {
                    set_style_color("timeremain", advanced["font_color_" + "timeremain" + disp_sel]);
                } else {
                    set_style_color("timeremain", "#ffffff");
                }
            }
        }


        // DEBUG
        //nbpits = 2.36;
        //conso = 1.84;
        //donnees.fuel_accurate = 1;
        //donnees.f_alert = 1;
        //donnees.estlaps_bg1_pct = 0.25
        //console.log(donnees.estlaps_bg1_pct)

        if (conso > 0) {
            if (advanced["disp_" + "estlaps" + disp_sel] || advanced["disp_" + "estlaps_white_bar_pct" + disp_sel]) {
                if (advanced["disp_" + "estlaps" + disp_sel]) {
                    if (donnees.pro_v == 1 || donnees.try_v == 1 || donnees.pro_v == undefined) {
                        tmp_estlaps = donnees.estlaps;
                        if (tmp_estlaps == 0 && conso > 0) { // utile pour afficher le estlaps alors que la course n'est pas commencée
                            tmp_estlaps = donnees.f / conso;
                        }
                        if (tmp_estlaps != undefined) {
                            set_inner_html("estlaps", tmp_estlaps.toFixed(estlaps_decimal));
                        }
                    } else {
                        set_inner_html("estlaps", "buy pro");
                    }
                    if (donnees.fuel_accurate != 1) {
                        if (advanced["perso_font_color_" + "estlaps" + disp_sel]) {
                            set_style_color("estlaps", advanced["font_color_" + "estlaps" + disp_sel]);
                        } else {
                            set_style_color("estlaps", "#555555");
                        }
                    } else {
                        if (advanced["perso_font_color_" + "estlaps" + disp_sel]) {
                            set_style_color("estlaps", advanced["font_color_" + "estlaps" + disp_sel]);
                        } else {
                            set_style_color("estlaps", "#000000");
                        }
                    }
                }
                estlaps_bg1_pct = donnees.estlaps_bg1_pct;
                if (estlaps_bg1_pct != estlaps_bg1_pct_old) {
                    if (advanced["disp_" + "estlaps" + disp_sel]) {
                        //set("estlaps_bg1", advanced["x_" + "estlaps" + disp_sel], advanced["y_" + "estlaps" + disp_sel], Math.floor(advanced["w_" + "estlaps" + disp_sel] * estlaps_bg1_pct), advanced["h_" + "estlaps" + disp_sel], advanced["f_" + "estlaps" + disp_sel] / dashboard_ref_w);
                        do_set_boxes("estlaps_bg1", "estlaps", disp_sel, 0, 0, estlaps_bg1_pct, 1);
                    }

                    if (advanced["disp_" + "estlaps_white_bar_pct" + disp_sel]) {
                        set_inner_html("estlaps_white_bar_pct", (estlaps_bg1_pct * 100).toFixed(1) + "%");
                    }
                }
                estlaps_bg1_pct_old = estlaps_bg1_pct;
            }

            if (donnees.f_alert == 1) {
                if (advanced["perso_bg_color_" + "estlaps" + disp_sel]) {
                    change_bg("estlaps_bg0", advanced["bg_color_" + "estlaps" + disp_sel], advanced["bg_" + "estlaps" + disp_sel]);
                } else {
                    change_bg("estlaps_bg0", "#ee0000", advanced["bg_" + "estlaps" + disp_sel]);
                }
                if (advanced["perso_bg_color_" + "tank" + disp_sel]) {
                    change_bg("tank", advanced["bg_color_" + "tank" + disp_sel], advanced["bg_" + "tank" + disp_sel]);
                } else {
                    change_bg("tank", "#cc0000", advanced["bg_" + "tank" + disp_sel]);
                }
                if (advanced["perso_bg_color_" + "conso" + disp_sel]) {
                    change_bg("conso", advanced["bg_color_" + "conso" + disp_sel], advanced["bg_" + "conso" + disp_sel]);
                } else {
                    change_bg("conso", "#880000", advanced["bg_" + "conso" + disp_sel]);
                }
            } else {
                if (advanced["disp_" + "estlaps" + disp_sel]) {
                    if (advanced["perso_bg_color_" + "estlaps" + disp_sel]) {
                        change_bg("estlaps_bg0", advanced["bg_color_" + "estlaps" + disp_sel], advanced["bg_" + "estlaps" + disp_sel]);
                    } else {
                        change_bg("estlaps_bg0", "#00aa00", advanced["bg_" + "estlaps" + disp_sel]);
                    }
                }
                if (advanced["disp_" + "tank" + disp_sel]) {
                    if (advanced["perso_bg_color_" + "tank" + disp_sel]) {
                        change_bg("tank", advanced["bg_color_" + "tank" + disp_sel], advanced["bg_" + "tank" + disp_sel]);
                    } else {
                        change_bg("tank", "#008800", advanced["bg_" + "tank" + disp_sel]);
                    }
                }
                if (advanced["disp_" + "conso" + disp_sel]) {
                    if (advanced["perso_bg_color_" + "conso" + disp_sel]) {
                        change_bg("conso", advanced["bg_color_" + "conso" + disp_sel], advanced["bg_" + "conso" + disp_sel]);
                    } else {
                        change_bg("conso", "#005500", advanced["bg_" + "conso" + disp_sel]);
                    }
                }
            }
            if (advanced["disp_" + "nbpits" + disp_sel]) {
                //nbpits = 8.539;  // DEBUG
                if (nbpits != nbpits_old) {
                    if (advanced["nbpits_nb_decimals_" + "nbpits" + disp_sel] == 0) {
                        set_inner_html("nbpits", Math.floor(nbpits) + "");
                    } else if (advanced["nbpits_nb_decimals_" + "nbpits" + disp_sel] == 1) {
                        set_inner_html("nbpits", Math.floor(nbpits*10)/10 + "");
                    } else {
                        set_inner_html("nbpits", Math.floor(nbpits*100)/100 + "");
                    }
                    //set("nbpits_bg1", advanced["x_" + "nbpits" + disp_sel], advanced["y_" + "nbpits" + disp_sel], advanced["w_" + "nbpits" + disp_sel] * (nbpits % 1), advanced["h_" + "nbpits" + disp_sel], advanced["f_" + "nbpits" + disp_sel] / dashboard_ref_w);
                    do_set_boxes("nbpits_bg1", "nbpits", disp_sel, 0, 0, nbpits % 1, 1);

                    if (advanced["perso_font_color_" + "nbpits" + disp_sel]) {
                        set_style_color("nbpits", advanced["font_color_" + "nbpits" + disp_sel]);
                    } else {
                        if (donnees.fuel_accurate != 1) {
                            set_style_color("nbpits", "#666666");
                        } else {
                            set_style_color("nbpits", "#ffbb00");
                        }
                    }
                }
                nbpits_old = nbpits;
            }
        } else {
            if (advanced["disp_" + "estlaps" + disp_sel]) {
                if (donnees.is_iracing_started) {
                    set_inner_html("estlaps", "--");
                } else {
                    set_inner_html("estlaps", (88.888).toFixed(estlaps_decimal));
                }
            }
            if (advanced["disp_" + "nbpits" + disp_sel]) {
                set_inner_html("nbpits", "--");
            }
        }

        if (advanced["disp_" + "lapsremain" + disp_sel] || advanced["disp_" + "lapsremain_orange_bar_pct" + disp_sel] || advanced["disp_" + "lapsremain_gold_line_pct" + disp_sel]) {

            if (advanced["disp_" + "lapsremain" + disp_sel] && donnees.lr != undefined) {
                if (donnees.pro_v == 1 || donnees.try_v == 1 || donnees.pro_v == undefined) {
                    //document.getElementById("lapsremain").innerHTML = reformat_lapsremain(donnees.lr);
                    set_inner_html("lapsremain", reformat_lapsremain(donnees.lr));
                } else {
                    //document.getElementById("lapsremain").innerHTML = "buy pro";
                    set_inner_html("lapsremain", "buy pro");
                }
                /*if (donnees.fuel_accurate != 1) {
                    document.getElementById("lapsremain").style.color = "#666666";
                } else {
                    document.getElementById("lapsremain").style.color = "#ff9900";
                }*/
            }
            if (donnees.lapsremain_bg1_pct != undefined) {
                lapsremain_bg1_pct = donnees.lapsremain_bg1_pct;
                //lapsremain_bg1_pct = 0.8;  // DEBUG
                if (lapsremain_bg1_pct != lapsremain_bg1_pct_old) {
                    if (advanced["disp_" + "lapsremain" + disp_sel]) {
                        //set("lapsremain_bg1", advanced["x_" + "lapsremain" + disp_sel], advanced["y_" + "lapsremain" + disp_sel], Math.floor(advanced["w_" + "lapsremain" + disp_sel] * lapsremain_bg1_pct), advanced["h_" + "lapsremain" + disp_sel], advanced["f_" + "lapsremain" + disp_sel] / dashboard_ref_w);
                        do_set_boxes("lapsremain_bg1", "lapsremain", disp_sel, 0, 0, lapsremain_bg1_pct, 1);
                    }

                    if (advanced["disp_" + "lapsremain_orange_bar_pct" + disp_sel]) {
                        set_inner_html("lapsremain_orange_bar_pct", (lapsremain_bg1_pct * 100).toFixed(1) + "%");
                    }
                }
                lapsremain_bg1_pct_old = lapsremain_bg1_pct;

            }
            //donnees.gap_pct_lastlap = 0.001
            if (donnees.gap_pct_lastlap != undefined && donnees.lead_lap != undefined) {
                gap_pct_lastlap = donnees.gap_pct_lastlap;
                //gap_pct_lastlap = 0.0001
                if (gap_pct_lastlap != gap_pct_lastlap_old) {
                    tmp_x = Math.floor(advanced["w_" + "lapsremain" + disp_sel] * gap_pct_lastlap);
                    // On évite de sortir du cadre sinon la gold barre devient invisible
                    if (tmp_x > Math.floor(advanced["w_" + "lapsremain" + disp_sel] - 2)) {
                        tmp_x = Math.floor(advanced["w_" + "lapsremain" + disp_sel] - 2)
                    }
                    if (tmp_x < 0) {
                        tmp_x = 0;
                    }
                    //tmp_x = 128
                    //console.log(tmp_x)

                    if (advanced["disp_" + "lapsremain" + disp_sel]) {
                        //set("lapsremain_bg2", advanced["x_" + "lapsremain" + disp_sel] + tmp_x, advanced["y_" + "lapsremain" + disp_sel], 1, advanced["h_" + "lapsremain" + disp_sel], advanced["f_" + "lapsremain" + disp_sel] / dashboard_ref_w);
                        do_set_boxes("lapsremain_bg2", "lapsremain", disp_sel, tmp_x / advanced["w_" + "lapsremain" + disp_sel], 0, 1 / advanced["w_" + "lapsremain" + disp_sel], 1);

                        //if (gap_pct_lastlap == 0) {
                        //document.getElementById("lapsremain_bg2").style.width = 0 + "px";
                        //} else {
                        document.getElementById("lapsremain_bg2").style.width = 2 + "px";
                        //}
                    }

                    if (advanced["disp_" + "lapsremain_gold_line_pct" + disp_sel]) {
                        set_inner_html("lapsremain_gold_line_pct", (gap_pct_lastlap * 100).toFixed(1) + "%");
                    }
                }
                gap_pct_lastlap_old = gap_pct_lastlap;

                // Si on doit finir dans le même tour que le leader alors on n'affiche la gold line d'une autre couleur
                if (donnees.lead_lap == 1) {
                    if (advanced["disp_" + "lapsremain" + disp_sel]) {
                        //set_style_bg("lapsremain_bg2", "#0088ff");
                        set_style_bg("lapsremain_bg2", advanced["vertical_line_blue_color_" + "lapsremain" + disp_sel]);
                    }
                    if (advanced["disp_" + "lapsremain_gold_line_pct" + disp_sel]) {
                        //set_style_color("lapsremain_gold_line_pct", "#0088ff");
                        set_style_color("lapsremain_gold_line_pct", advanced["vertical_line_blue_color_" + "lapsremain" + disp_sel]);
                    }
                } else {
                    if (advanced["disp_" + "lapsremain" + disp_sel]) {
                        //set_style_bg("lapsremain_bg2", "#ffd700");
                        set_style_bg("lapsremain_bg2", advanced["vertical_line_gold_color_" + "lapsremain" + disp_sel]);
                    }
                    if (advanced["disp_" + "lapsremain_gold_line_pct" + disp_sel]) {
                        //set_style_color("lapsremain_gold_line_pct", "#ffd700");
                        set_style_color("lapsremain_gold_line_pct", advanced["vertical_line_gold_color_" + "lapsremain" + disp_sel]);
                    }
                }
            }
        }

        if (advanced["disp_" + "refuel_min" + disp_sel]) {
            if (conso > 0.01)
                if (donnees.pro_v == 1 || donnees.try_v == 1 || donnees.pro_v == undefined) {
                    if (refuel_min > 0) {
                        //document.getElementById("refuel_min").innerHTML = (fuelfactor * coef_fuel * refuel_min).toFixed(1);
                        set_inner_html("refuel_min", (fuelfactor * coef_fuel * refuel_min).toFixed(fuel_decimal));
                    } else {
                        //document.getElementById("refuel_min").innerHTML = "--";
                        set_inner_html("refuel_min", "--");
                    }
                } else {
                    //document.getElementById("refuel_min").innerHTML = "buy pro";
                    set_inner_html("refuel_min", "buy pro");
                }
            else {
                if (donnees.is_iracing_started) {
                    set_inner_html("refuel_min", "--");
                } else {
                    set_inner_html("refuel_min", (88.888).toFixed(fuel_decimal));
                }
            }
        }
        if (advanced["disp_" + "refuel_avg" + disp_sel]) {
            if (conso > 0.01)
                if (donnees.pro_v == 1 || donnees.try_v == 1 || donnees.pro_v == undefined) {
                    if (refuel_avg > 0) {
                        //document.getElementById("refuel_avg").innerHTML = (fuelfactor * coef_fuel * refuel_avg).toFixed(1);
                        set_inner_html("refuel_avg", (fuelfactor * coef_fuel * refuel_avg).toFixed(fuel_decimal));
                    } else {
                        //document.getElementById("refuel_avg").innerHTML = "--";
                        set_inner_html("refuel_avg", "--");
                    }
                } else {
                    //document.getElementById("refuel_avg").innerHTML = "buy pro";
                    set_inner_html("refuel_avg", "buy pro");
                }
            else {
                if (donnees.is_iracing_started) {
                    set_inner_html("refuel_avg", "--");
                } else {
                    set_inner_html("refuel_avg", (88.888).toFixed(fuel_decimal));
                }
            }
        }
        if (advanced["disp_" + "refuel_avg_now" + disp_sel]) {
            if (conso > 0.01)
                if (donnees.pro_v == 1 || donnees.try_v == 1 || donnees.pro_v == undefined) {
                    if (refuel_avg_now > 0) {
                        //document.getElementById("refuel_avg_now").innerHTML = (fuelfactor * coef_fuel * refuel_avg_now).toFixed(1);
                        set_inner_html("refuel_avg_now", (fuelfactor * coef_fuel * refuel_avg_now).toFixed(fuel_decimal));
                    } else {
                        //document.getElementById("refuel_avg_now").innerHTML = "--";
                        set_inner_html("refuel_avg_now", "--");
                    }
                } else {
                    //document.getElementById("refuel_avg_now").innerHTML = "buy pro";
                    set_inner_html("refuel_avg_now", "buy pro");
                }
            else {
                if (donnees.is_iracing_started) {
                    set_inner_html("refuel_avg_now", "--");
                } else {
                    set_inner_html("refuel_avg_now", (88.888).toFixed(fuel_decimal));
                }
            }
        }

        if (advanced["disp_" + "last_partial_fuel_fill" + disp_sel]) {
            if (conso > 0.01) {
                last_partial_fuel_fill = (nbpits % 1) * donnees.tcap;
                if (donnees.pro_v == 1 || donnees.try_v == 1 || donnees.pro_v == undefined) {
                    if (last_partial_fuel_fill > 0) {
                        set_inner_html("last_partial_fuel_fill", (fuelfactor * coef_fuel * last_partial_fuel_fill).toFixed(fuel_decimal));
                    } else {
                        set_inner_html("last_partial_fuel_fill", "--");
                    }
                } else {
                    set_inner_html("last_partial_fuel_fill", "buy pro");
                }
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("last_partial_fuel_fill", "--");
                } else {
                    set_inner_html("last_partial_fuel_fill", (88.888).toFixed(fuel_decimal));
                }
            }
        }

        // On s'assure pour la suite que les valeurs sont bien des float pour éviter les erreurs
        donnees.oil = set_float(donnees.oil);
        donnees.w = set_float(donnees.w);

        if (advanced["disp_" + "oil" + disp_sel] || advanced["disp_" + "water" + disp_sel]) {
            if (donnees.oil != undefined && donnees.w != undefined) {
                if ((temperature_mode != 2) && ((donnees.u == 1 && temperature_mode == 0) || (temperature_mode == 1))) {  // systeme metric ou forcé en Celsius dans les options
                    //set_inner_html("oil", "O " + donnees.oil.toFixed(1) + "&degC");
                    set_inner_html("oil", donnees.oil.toFixed(1) + "&degC");
                    //set_inner_html("water", "W " + donnees.w.toFixed(1) + "&degC");
                    set_inner_html("water", donnees.w.toFixed(1) + "&degC");
                } else {
                    //set_inner_html("oil", "O " + (donnees.oil * 1.8 + 32).toFixed(1) + "&degF");
                    set_inner_html("oil", (donnees.oil * 1.8 + 32).toFixed(1) + "&degF");
                    //set_inner_html("water", "W " + (donnees.w * 1.8 + 32).toFixed(1) + "&degF");
                    set_inner_html("water", (donnees.w * 1.8 + 32).toFixed(1) + "&degF");
                }
            }
        }

        if (donnees.styp == "Race") {
            if (advanced["disp_" + "pre_pos" + disp_sel] || advanced["disp_" + "me_pos" + disp_sel] || advanced["disp_" + "post_pos" + disp_sel] || advanced["disp_" + "pre_cpos" + disp_sel] || advanced["disp_" + "me_cpos" + disp_sel] || advanced["disp_" + "post_cpos" + disp_sel]) {
                if (donnees["pre_pos" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                    set_inner_html("pre_pos", donnees["pre_pos" + _f3_pre] + ".");
                    //set_inner_html("pre_pos", donnees["pre_pos" + _f3_pre]);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("pre_pos", "");
                    } else {
                        set_inner_html("pre_pos", "8.");
                    }
                }
                if (donnees.me_pos != undefined) {
                    set_inner_html("me_pos", donnees.me_pos + ".");
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_pos", "");
                    } else {
                        set_inner_html("me_pos", "8.");
                    }
                }
                if (donnees["post_pos" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                    set_inner_html("post_pos", donnees["post_pos" + _f3_post] + ".");
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("post_pos", "");
                    } else {
                        set_inner_html("post_pos", "8.");
                    }
                }
                if (donnees["pre_cpos" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                    set_inner_html("pre_cpos", donnees["pre_cpos" + _f3_pre] + ".");
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("pre_cpos", "");
                    } else {
                        set_inner_html("pre_cpos", "8.");
                    }
                }
                if (donnees.me_cpos != undefined) {
                    set_inner_html("me_cpos", donnees.me_cpos + ".");
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_cpos", "");
                    } else {
                        set_inner_html("me_cpos", "8.");
                    }
                }
                if (donnees["post_cpos" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                    set_inner_html("post_cpos", donnees["post_cpos" + _f3_post] + ".");
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("post_cpos", "");
                    } else {
                        set_inner_html("post_cpos", "8.");
                    }
                }
            }

            if (advanced["disp_" + "pre_pos2" + disp_sel] || advanced["disp_" + "me_pos2" + disp_sel] || advanced["disp_" + "post_pos2" + disp_sel] || advanced["disp_" + "pre_cpos2" + disp_sel] || advanced["disp_" + "me_cpos2" + disp_sel] || advanced["disp_" + "post_cpos2" + disp_sel]) {
                if (donnees["pre_pos" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                    set_inner_html("pre_pos2", donnees["pre_pos" + _f3_pre]);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("pre_pos2", "");
                    } else {
                        set_inner_html("pre_pos2", "8");
                    }
                }
                if (donnees.me_pos != undefined) {
                    set_inner_html("me_pos2", donnees.me_pos);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_pos2", "");
                    } else {
                        set_inner_html("me_pos2", "8");
                    }
                }
                if (donnees["post_pos" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                    set_inner_html("post_pos2", donnees["post_pos" + _f3_post]);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("post_pos2", "");
                    } else {
                        set_inner_html("post_pos2", "8");
                    }
                }
                if (donnees["pre_cpos" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                    set_inner_html("pre_cpos2", donnees["pre_cpos" + _f3_pre]);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("pre_cpos2", "");
                    } else {
                        set_inner_html("pre_cpos2", "8");
                    }
                }
                if (donnees.me_cpos != undefined) {
                    set_inner_html("me_cpos2", donnees.me_cpos);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_cpos2", "");
                    } else {
                        set_inner_html("me_cpos2", "8");
                    }
                }
                if (donnees["post_cpos" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                    set_inner_html("post_cpos2", donnees["post_cpos" + _f3_post]);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("post_cpos2", "");
                    } else {
                        set_inner_html("post_cpos2", "8");
                    }
                }
            }

            if (advanced["disp_" + "pre_gain" + disp_sel] || advanced["disp_" + "me_gain" + disp_sel] || advanced["disp_" + "post_gain" + disp_sel] || advanced["disp_" + "pre_cgain" + disp_sel] || advanced["disp_" + "me_cgain" + disp_sel] || advanced["disp_" + "post_cgain" + disp_sel]) {
                if (donnees["pre_gain" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                    //document.getElementById("pre_gain").innerHTML = reformat_gain(donnees["pre_gain" + _f3_pre]);
                    set_inner_html("pre_gain", reformat_gain(donnees["pre_gain" + _f3_pre]));
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("pre_gain", "");
                    } else {
                        set_inner_html("pre_gain", "+8");
                    }
                }
                if (donnees.me_gain != undefined) {
                    //document.getElementById("me_gain").innerHTML = reformat_gain(donnees.me_gain);
                    set_inner_html("me_gain", reformat_gain(donnees.me_gain));
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_gain", "");
                    } else {
                        set_inner_html("me_gain", "+8");
                    }
                }
                if (donnees["post_gain" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                    //document.getElementById("post_gain").innerHTML = reformat_gain(donnees["post_gain" + _f3_post]);
                    set_inner_html("post_gain", reformat_gain(donnees["post_gain" + _f3_post]));
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("post_gain", "");
                    } else {
                        set_inner_html("post_gain", "+8");
                    }
                }
                if (donnees["pre_cgain" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                    //document.getElementById("pre_cgain").innerHTML = reformat_gain(donnees["pre_cgain" + _f3_pre]);
                    set_inner_html("pre_cgain", reformat_gain(donnees["pre_cgain" + _f3_pre]));
                } else {
                    //document.getElementById("pre_cgain").innerHTML = "";
                    if (donnees.is_iracing_started) {
                        set_inner_html("pre_cgain", "");
                    } else {
                        set_inner_html("pre_cgain", "+8");
                    }
                }
                if (donnees.me_cgain != undefined) {
                    //document.getElementById("me_cgain").innerHTML = reformat_gain(donnees.me_cgain);
                    set_inner_html("me_cgain", reformat_gain(donnees.me_cgain));
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_cgain", "");
                    } else {
                        set_inner_html("me_cgain", "+8");
                    }
                }
                if (donnees["post_cgain" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                    //document.getElementById("post_cgain").innerHTML = reformat_gain(donnees["post_cgain" + _f3_post]);
                    set_inner_html("post_cgain", reformat_gain(donnees["post_cgain" + _f3_post]));
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("post_cgain", "");
                    } else {
                        set_inner_html("post_cgain", "+8");
                    }
                }
            }
        } else {
            if (advanced["disp_" + "pre_pos" + disp_sel] || advanced["disp_" + "me_pos" + disp_sel] || advanced["disp_" + "post_pos" + disp_sel] || advanced["disp_" + "pre_cpos" + disp_sel] || advanced["disp_" + "me_cpos" + disp_sel] || advanced["disp_" + "post_cpos" + disp_sel]) {
                // En dehors des courses, on affiche le classement en fonction du meilleur temps
                if (donnees["pre_posb" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                    set_inner_html("pre_pos", donnees["pre_posb" + _f3_pre] + ".");
                    //set_inner_html("pre_pos", donnees["pre_posb" + _f3_pre]);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("pre_pos", "");
                    } else {
                        set_inner_html("pre_pos", "8.");
                    }
                }
                if (donnees.me_posb != undefined) {
                    set_inner_html("me_pos", donnees.me_posb + ".");
                    //set_inner_html("me_pos", donnees.me_posb);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_pos", "");
                    } else {
                        set_inner_html("me_pos", "8.");
                    }
                }
                if (donnees["post_posb" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                    set_inner_html("post_pos", donnees["post_posb" + _f3_post] + ".");
                    //set_inner_html("post_pos", donnees["post_posb" + _f3_post]);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("post_pos", "");
                    } else {
                        set_inner_html("post_pos", "8.");
                    }
                }
                if (donnees["pre_cposb" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                    set_inner_html("pre_cpos", donnees["pre_cposb" + _f3_pre] + ".");
                    //set_inner_html("pre_cpos", donnees["pre_cposb" + _f3_pre]);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("pre_cpos", "");
                    } else {
                        set_inner_html("pre_cpos", "8.");
                    }
                }
                if (donnees.me_cposb != undefined) {
                    set_inner_html("me_cpos", donnees.me_cposb + ".");
                    //set_inner_html("me_cpos", donnees.me_cposb);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_cpos", "");
                    } else {
                        set_inner_html("me_cpos", "8.");
                    }
                }
                if (donnees["post_cposb" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                    set_inner_html("post_cpos", donnees["post_cposb" + _f3_post] + ".");
                    //set_inner_html("post_cpos", donnees["post_cposb" + _f3_post]);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("post_cpos", "");
                    } else {
                        set_inner_html("post_cpos", "8.");
                    }
                }
            }

            if (advanced["disp_" + "pre_pos2" + disp_sel] || advanced["disp_" + "me_pos2" + disp_sel] || advanced["disp_" + "post_pos2" + disp_sel] || advanced["disp_" + "pre_cpos2" + disp_sel] || advanced["disp_" + "me_cpos2" + disp_sel] || advanced["disp_" + "post_cpos2" + disp_sel]) {
                // En dehors des courses, on affiche le classement en fonction du meilleur temps
                if (donnees["pre_posb" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                    set_inner_html("pre_pos2", donnees["pre_posb" + _f3_pre]);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("pre_pos2", "");
                    } else {
                        set_inner_html("pre_pos2", "8");
                    }
                }
                if (donnees.me_posb != undefined) {
                    set_inner_html("me_pos2", donnees.me_posb);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_pos2", "");
                    } else {
                        set_inner_html("me_pos2", "8");
                    }
                }
                if (donnees["post_posb" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                    set_inner_html("post_pos2", donnees["post_posb" + _f3_post]);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("post_pos2", "");
                    } else {
                        set_inner_html("post_pos2", "8");
                    }
                }
                if (donnees["pre_cposb" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                    set_inner_html("pre_cpos2", donnees["pre_cposb" + _f3_pre]);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("pre_cpos2", "");
                    } else {
                        set_inner_html("pre_cpos2", "8");
                    }
                }
                if (donnees.me_cposb != undefined) {
                    set_inner_html("me_cpos2", donnees.me_cposb);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_cpos2", "");
                    } else {
                        set_inner_html("me_cpos2", "8");
                    }
                }
                if (donnees["post_cposb" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                    set_inner_html("post_cpos2", donnees["post_cposb" + _f3_post]);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("post_cpos2", "");
                    } else {
                        set_inner_html("post_cpos2", "8");
                    }
                }
            }

            if (advanced["disp_" + "pre_gain" + disp_sel] || advanced["disp_" + "me_gain" + disp_sel] || advanced["disp_" + "post_gain" + disp_sel] || advanced["disp_" + "pre_cgain" + disp_sel] || advanced["disp_" + "me_cgain" + disp_sel] || advanced["disp_" + "post_cgain" + disp_sel]) {
                // En dehors des courses, on n'affiche pas le gain des positions sauf hors ligne
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_gain", "&nbsp;");
                    set_inner_html("me_gain", "&nbsp;");
                    set_inner_html("post_gain", "&nbsp;");
                    set_inner_html("pre_cgain", "&nbsp;");
                    set_inner_html("me_cgain", "&nbsp;");
                    set_inner_html("post_cgain", "&nbsp;");
                } else {
                    set_inner_html("pre_gain", "+8");
                    set_inner_html("me_gain", "+8");
                    set_inner_html("post_gain", "+8");
                    set_inner_html("pre_cgain", "+8");
                    set_inner_html("me_cgain", "+8");
                    set_inner_html("post_cgain", "+8");
                }
            }
        }


        if (advanced["disp_" + "leader_best" + disp_sel]) {
            if (donnees.leader_best != undefined) {
                set_inner_html("leader_best", reformat_laptime(donnees.leader_best));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("leader_best", "-'--.---");
                } else {
                    set_inner_html("leader_best", "8'88.888");
                }
            }
        }
        if (advanced["disp_" + "cleader_best" + disp_sel]) {
            if (donnees.cleader_best != undefined) {
                set_inner_html("cleader_best", reformat_laptime(donnees.cleader_best));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("cleader_best", "-'--.---");
                } else {
                    set_inner_html("cleader_best", "8'88.888");
                }
            }
        }
        if (advanced["disp_" + "leader_last" + disp_sel]) {
            if (donnees.leader_last != undefined) {
                set_inner_html("leader_last", reformat_laptime(donnees.leader_last));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("leader_last", "-'--.---");
                } else {
                    set_inner_html("leader_last", "8'88.888");
                }
            }
        }
        if (advanced["disp_" + "cleader_last" + disp_sel]) {
            if (donnees.cleader_last != undefined) {
                set_inner_html("cleader_last", reformat_laptime(donnees.cleader_last));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("cleader_last", "-'--.---");
                } else {
                    set_inner_html("cleader_last", "8'88.888");
                }
            }
        }


        if (advanced["disp_" + "pre_best" + disp_sel] || advanced["disp_" + "pre_last" + disp_sel] || advanced["disp_" + "me_best" + disp_sel] || advanced["disp_" + "me_last" + disp_sel] || advanced["disp_" + "post_best" + disp_sel] || advanced["disp_" + "post_last" + disp_sel]) {
            if (donnees["pre_b" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                //document.getElementById("pre_best").innerHTML = reformat_laptime(donnees["pre_b" + _f3_pre]);
                set_inner_html("pre_best", reformat_laptime(donnees["pre_b" + _f3_pre]));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_best", "-'--.---");
                } else {
                    set_inner_html("pre_best", "8'88.888");
                }
            }
            if (donnees["pre_l" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                //document.getElementById("pre_last").innerHTML = reformat_laptime(donnees["pre_l" + _f3_pre]);
                set_inner_html("pre_last", reformat_laptime(donnees["pre_l" + _f3_pre]));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_last", "-'--.---");
                } else {
                    set_inner_html("pre_last", "8'88.888");
                }
            }
            if (donnees.me_b != undefined) {
                //document.getElementById("me_best").innerHTML = reformat_laptime(donnees.me_b);
                set_inner_html("me_best", reformat_laptime(donnees.me_b));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_best", "-'--.---");
                } else {
                    set_inner_html("me_best", "8'88.888");
                }
            }
            if (donnees.me_l != undefined) {
                //document.getElementById("me_last").innerHTML = reformat_laptime(donnees.me_l);
                set_inner_html("me_last", reformat_laptime(donnees.me_l));
            }
            if (donnees["post_b" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                //document.getElementById("post_best").innerHTML = reformat_laptime(donnees["post_b" + _f3_post]);
                set_inner_html("post_best", reformat_laptime(donnees["post_b" + _f3_post]));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_best", "-'--.---");
                } else {
                    set_inner_html("post_best", "8'88.888");
                }
            }
            if (donnees["post_l" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                //document.getElementById("post_last").innerHTML = reformat_laptime(donnees["post_l" + _f3_post]);
                set_inner_html("post_last", reformat_laptime(donnees["post_l" + _f3_post]));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_last", "-'--.---");
                } else {
                    set_inner_html("post_last", "8'88.888");
                }
            }
        }

        if (advanced["disp_" + "pre_stint" + disp_sel] || advanced["disp_" + "me_stint" + disp_sel] || advanced["disp_" + "post_stint" + disp_sel]) {
            if (donnees["pre_sti" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                //document.getElementById("pre_stint").innerHTML = donnees["pre_sti" + _f3_pre];
                set_inner_html("pre_stint", donnees["pre_sti" + _f3_pre]);
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_stint", "");
                } else {
                    set_inner_html("pre_stint", "8.8");
                }
            }
            if (donnees.me_sti != undefined) {
                //document.getElementById("me_stint").innerHTML = donnees.me_sti;
                set_inner_html("me_stint", donnees.me_sti);
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_stint", "");
                } else {
                    set_inner_html("me_stint", "8.8");
                }
            }
            if (donnees["post_sti" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                //document.getElementById("post_stint").innerHTML = donnees["post_sti" + _f3_post];
                set_inner_html("post_stint", donnees["post_sti" + _f3_post]);
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_stint", "");
                } else {
                    set_inner_html("post_stint", "8.8");
                }
            }
        }

        if (advanced["disp_" + "me_lc" + disp_sel]) {
            if (donnees.me_lc != undefined) {
                set_inner_html("me_lc", donnees.me_lc);
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_lc", "");
                } else {
                    set_inner_html("me_lc", "88");
                }
            }
        }

        if (advanced["disp_" + "leader_name" + disp_sel]) {
            if (donnees.leader_name != undefined) {
                set_inner_html("leader_name", "&nbsp;" + reformat_name(donnees.leader_name, donnees.leader_teamname, 0, 0, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("leader_name", "");
                } else {
                    set_inner_html("leader_name", "&nbsp;" + reformat_name("Name Leader", "Team Leader", 0, 0, 1));
                }
            }
        }
        if (advanced["disp_" + "cleader_name" + disp_sel]) {
            if (donnees.cleader_name != undefined) {
                set_inner_html("cleader_name", "&nbsp;" + reformat_name(donnees.cleader_name, donnees.cleader_teamname, 0, 0, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("cleader_name", "");
                } else {
                    set_inner_html("cleader_name", "&nbsp;" + reformat_name("Name Class Leader", "Team Class Leader", 0, 0, 1));
                }
            }
        }


        if (advanced["disp_" + "me_name" + disp_sel]) {
            if (donnees.me_name != undefined) {
                set_inner_html("me_name", "&nbsp;" + reformat_name(donnees.me_name, donnees.me_teamname, 0, 0, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_name", "&nbsp;");
                } else {
                    set_inner_html("me_name", "&nbsp;" + _f3_pre_tag + reformat_name("Name Focused", "Team focused", 0, 0, 1));
                }
            }
        }
        if (advanced["disp_" + "pre_name" + disp_sel]) {
            if (donnees["pre_name" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                set_inner_html("pre_name", "&nbsp;" + _f3_pre_tag + reformat_name(donnees["pre_name" + _f3_pre], donnees["pre_teamname" + _f3_pre], 0, 0, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_name", "&nbsp;");
                } else {
                    set_inner_html("pre_name", "&nbsp;" + _f3_pre_tag + reformat_name("Name Ahead", "Team Ahead", 0, 0, 1));
                }
            }
        }
        if (advanced["disp_" + "post_name" + disp_sel]) {
            if (donnees["post_name" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                set_inner_html("post_name", "&nbsp;" + _f3_post_tag + reformat_name(donnees["post_name" + _f3_post], donnees["post_teamname" + _f3_post], 0, 0, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_name", "&nbsp;");
                } else {
                    set_inner_html("post_name", "&nbsp;" + _f3_pre_tag + reformat_name("Name Behind", "Team Behind", 0, 0, 1));
                }
            }
        }


        if (advanced["disp_" + "pre_lic" + disp_sel]) {
            if (!((donnees["pre_eq_me" + _f3_pre] == 1 || cache_pre)) && donnees["pre_liccolor" + _f3_pre] != undefined && donnees["pre_licsub" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                set_inner_html("pre_lic", reformat_lic_dashboard("pre_lic", donnees["pre_liccolor" + _f3_pre], donnees["pre_licsub" + _f3_pre], advanced["bg_" + "pre_lic" + disp_sel]));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_lic", "");
                    set_style_bg_alpha("pre_lic", "#000000", advanced["bg_" + "pre_lic" + disp_sel]);
                } else {
                    set_inner_html("pre_lic", reformat_lic_dashboard("pre_lic", "0xfc0706", 888, advanced["bg_" + "pre_lic" + disp_sel]));
                }
            }
        }
        if (advanced["disp_" + "post_lic" + disp_sel]) {
            if (!((donnees["post_eq_me" + _f3_post] == 1 || cache_post)) && donnees["post_liccolor" + _f3_post] != undefined && donnees["post_licsub" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                set_inner_html("post_lic", reformat_lic_dashboard("post_lic", donnees["post_liccolor" + _f3_post], donnees["post_licsub" + _f3_post], advanced["bg_" + "post_lic" + disp_sel]));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_lic", "");
                    set_style_bg_alpha("post_lic", "#000000", advanced["bg_" + "post_lic" + disp_sel]);
                } else {
                    set_inner_html("post_lic", reformat_lic_dashboard("post_lic", "0x153db", 888, advanced["bg_" + "post_lic" + disp_sel]));
                }
            }
        }

        if (advanced["disp_" + "pre_ir" + disp_sel]) {
            if (donnees["pre_ir" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                set_inner_html("pre_ir", donnees["pre_ir" + _f3_pre]);
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_ir", "");
                } else {
                    set_inner_html("pre_ir", "8888");
                }
            }
        }
        if (advanced["disp_" + "post_ir" + disp_sel]) {
            if (donnees["post_ir" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                set_inner_html("post_ir", donnees["post_ir" + _f3_post]);
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_ir", "");
                } else {
                    set_inner_html("post_ir", "8888");
                }
            }
        }

        if (advanced["disp_" + "pre_tires_nb_changes" + disp_sel]) {
            if (donnees["pre_tires_nb_changes" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                set_inner_html("pre_tires_nb_changes", donnees["pre_tires_nb_changes" + _f3_pre]);
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_tires_nb_changes", "");
                } else {
                    set_inner_html("pre_tires_nb_changes", "8");
                }
            }
        }
        if (advanced["disp_" + "me_tires_nb_changes" + disp_sel]) {
            if (donnees["me_tires_nb_changes"] != undefined) {
                set_inner_html("me_tires_nb_changes", donnees["me_tires_nb_changes"]);
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_tires_nb_changes", "");
                } else {
                    set_inner_html("me_tires_nb_changes", "8");
                }
            }
        }
        if (advanced["disp_" + "post_tires_nb_changes" + disp_sel]) {
            if (donnees["post_tires_nb_changes" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                set_inner_html("post_tires_nb_changes", donnees["post_tires_nb_changes" + _f3_post]);
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_tires_nb_changes", "");
                } else {
                    set_inner_html("post_tires_nb_changes", "8");
                }
            }
        }

        if (advanced["disp_" + "pre_tire_compound" + disp_sel]) {
            if (donnees["pre_tire_compound" + _f3_pre] != undefined && donnees["pre_car" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                set_inner_html("pre_tire_compound", reformat_tire_compound(donnees["pre_car" + _f3_pre], donnees["pre_tire_compound" + _f3_pre], 3, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_tire_compound", "");
                } else {
                    set_inner_html("pre_tire_compound", "<div style='background-color: black; font-size: 1em; display: inline-block; width: 1em; margin-top: -0.18em; line-height: 1.14em; text-align: center; vertical-align: middle; color: #ff0000; border-radius: 50%; border-left: 0.1em solid #ff0000; border-right: 0.1em solid #ff0000'>S</div>");
                }
            }
        }
        if (advanced["disp_" + "me_tire_compound" + disp_sel]) {
            if (donnees["me_tire_compound"] != undefined && donnees["me_car"] != undefined) {
                set_inner_html("me_tire_compound", reformat_tire_compound(donnees["me_car"], donnees["me_tire_compound"], 3, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_tire_compound", "");
                } else {
                    set_inner_html("me_tire_compound", "<div style='background-color: black; font-size: 1em; display: inline-block; width: 1em; margin-top: -0.18em; line-height: 1.14em; text-align: center; vertical-align: middle; color: #ff0000; border-radius: 50%; border-left: 0.1em solid #ff0000; border-right: 0.1em solid #ff0000'>S</div>");
                }
            }
        }
        if (advanced["disp_" + "post_tire_compound" + disp_sel]) {
            if (donnees["post_tire_compound" + _f3_post] != undefined && donnees["post_car" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                set_inner_html("post_tire_compound", reformat_tire_compound(donnees["post_car" + _f3_post], donnees["post_tire_compound" + _f3_post], 3, 1))
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_tire_compound", "");
                } else {
                    set_inner_html("post_tire_compound", "<div style='background-color: black; font-size: 1em; display: inline-block; width: 1em; margin-top: -0.18em; line-height: 1.14em; text-align: center; vertical-align: middle; color: #ff0000; border-radius: 50%; border-left: 0.1em solid #ff0000; border-right: 0.1em solid #ff0000'>S</div>");
                }
            }
        }

        if (advanced["disp_" + "pre_tires_stints" + disp_sel]) {
            if (donnees["pre_tires_stints" + _f3_pre] != undefined && donnees["pre_car" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                set_inner_html("pre_tires_stints", reformat_tires_stints(donnees["pre_car" + _f3_pre], donnees["pre_tires_stints" + _f3_pre], donnees["pre_tires_stintcompounds" + _f3_pre], 1, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_tires_stints", "");
                } else {
                    set_inner_html("pre_tires_stints", reformat_tires_stints("Dallara IR18", [888, 88, 8], [0, 1, 0], 1, 1));
                }
            }
        }
        if (advanced["disp_" + "me_tires_stints" + disp_sel]) {
            if (donnees["me_tires_stints"] != undefined && donnees["me_car"] != undefined) {
                set_inner_html("me_tires_stints", reformat_tires_stints(donnees["me_car"], donnees["me_tires_stints"], donnees["me_tires_stintcompounds"], 1, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_tires_stints", "");
                } else {
                    set_inner_html("me_tires_stints", reformat_tires_stints("Dallara IR18", [888, 88, 8], [0, 1, 0], 1, 1));
                }
            }
        }
        if (advanced["disp_" + "post_tires_stints" + disp_sel]) {
            if (donnees["post_tires_stints" + _f3_post] != undefined && donnees["post_car" + _f3_post] != undefined && donnees_new["post_rc" + _f3_post] != undefined) {
                set_inner_html("post_tires_stints", reformat_tires_stints(donnees["post_car" + _f3_post], donnees["post_tires_stints" + _f3_post], donnees["post_tires_stintcompounds" + _f3_post], 1, 1))
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_tires_stints", "");
                } else {
                    set_inner_html("post_tires_stints", reformat_tires_stints("Dallara IR18", [888, 88, 8], [0, 1, 0], 1, 1));
                }
            }
        }

        if (advanced["disp_" + "pre_club_name" + disp_sel]) {
            if (donnees["pre_clubname" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                set_inner_html("pre_club_name", reformat_clubname(donnees["pre_clubname" + _f3_pre], 1, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_club_name", "");
                } else {
                    set_inner_html("pre_club_name", "Club name");
                }
            }
        }
        if (advanced["disp_" + "me_club_name" + disp_sel]) {
            if (donnees["me_clubname"] != undefined) {
                set_inner_html("me_club_name", reformat_clubname(donnees["me_clubname"], 1, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_club_name", "");
                } else {
                    set_inner_html("me_club_name", "Club name");
                }
            }
        }
        if (advanced["disp_" + "post_club_name" + disp_sel]) {
            if (donnees["post_clubname" + _f3_post] != undefined && donnees_new["post_rc" + _f3_pre] != undefined) {
                set_inner_html("post_club_name", reformat_clubname(donnees["post_clubname" + _f3_post], 1, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_club_name", "");
                } else {
                    set_inner_html("post_club_name", "Club name");
                }
            }
        }

        if (advanced["disp_" + "pre_club_logo" + disp_sel]) {
            if (donnees["pre_clubname" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                set_inner_html("pre_club_logo", reformat_clubname(donnees["pre_clubname" + _f3_pre], 2, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_club_logo", "");
                } else {
                    set_inner_html("pre_club_logo", reformat_clubname("France", 2, 1));
                }
            }
        }
        if (advanced["disp_" + "me_club_logo" + disp_sel]) {
            if (donnees["me_clubname"] != undefined) {
                set_inner_html("me_club_logo", reformat_clubname(donnees["me_clubname"], 2, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_club_logo", "");
                } else {
                    set_inner_html("me_club_logo", reformat_clubname("France", 2, 1));
                }
            }
        }
        if (advanced["disp_" + "post_club_logo" + disp_sel]) {
            if (donnees["post_clubname" + _f3_post] != undefined && donnees_new["post_rc" + _f3_pre] != undefined) {
                set_inner_html("post_club_logo", reformat_clubname(donnees["post_clubname" + _f3_post], 2, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_club_logo", "");
                } else {
                    set_inner_html("post_club_logo", reformat_clubname("France", 2, 1));
                }
            }
        }

        if (advanced["disp_" + "pre_club_flag" + disp_sel]) {
            if (donnees["pre_clubname" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                set_inner_html("pre_club_flag", reformat_clubname(donnees["pre_clubname" + _f3_pre], 3, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_club_flag", "");
                } else {
                    set_inner_html("pre_club_flag", reformat_clubname("France", 3, 1));
                }
            }
        }
        if (advanced["disp_" + "me_club_flag" + disp_sel]) {
            if (donnees["me_clubname"] != undefined) {
                set_inner_html("me_club_flag", reformat_clubname(donnees["me_clubname"], 3, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_club_flag", "");
                } else {
                    set_inner_html("me_club_flag", reformat_clubname("France", 3, 1));
                }
            }
        }
        if (advanced["disp_" + "post_club_flag" + disp_sel]) {
            if (donnees["post_clubname" + _f3_post] != undefined && donnees_new["post_rc" + _f3_pre] != undefined) {
                set_inner_html("post_club_flag", reformat_clubname(donnees["post_clubname" + _f3_post], 3, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_club_flag", "");
                } else {
                    set_inner_html("post_club_flag", reformat_clubname("France", 3, 1));
                }
            }
        }

        if (advanced["disp_" + "pre_car_name" + disp_sel]) {
            if (donnees["pre_car" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                set_inner_html("pre_car_name", reformat_car(donnees["pre_car" + _f3_pre], 0, 1, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_car_name", "");
                } else {
                    set_inner_html("pre_car_name", reformat_car("Dallara IR18", 0, 1, 1));
                }
            }
        }
        if (advanced["disp_" + "me_car_name" + disp_sel]) {
            if (donnees["me_car"] != undefined) {
                set_inner_html("me_car_name", reformat_car(donnees["me_car"], 0, 1, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_car_name", "");
                } else {
                    set_inner_html("me_car_name", reformat_car("Dallara IR18", 0, 1, 1));
                }
            }
        }
        if (advanced["disp_" + "post_car_name" + disp_sel]) {
            if (donnees["post_car" + _f3_post] != undefined && donnees_new["post_rc" + _f3_pre] != undefined) {
                set_inner_html("post_car_name", reformat_car(donnees["post_car" + _f3_post], 0, 1, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_car_name", "");
                } else {
                    set_inner_html("post_car_name", reformat_car("Dallara IR18", 0, 1, 1));
                }
            }
        }

        if (advanced["disp_" + "pre_car_logo" + disp_sel]) {
            if (donnees["pre_car" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                set_inner_html("pre_car_logo", reformat_car(donnees["pre_car" + _f3_pre], 0, 8, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_car_logo", "");
                } else {
                    set_inner_html("pre_car_logo", reformat_car("BMW M4 GT4", 0, 8, 1));
                }
            }
        }
        if (advanced["disp_" + "me_car_logo" + disp_sel]) {
            if (donnees["me_car"] != undefined) {
                set_inner_html("me_car_logo", reformat_car(donnees["me_car"], 0, 8, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_car_logo", "");
                } else {
                    set_inner_html("me_car_logo", reformat_car("BMW M4 GT4", 0, 8, 1));
                }
            }
        }
        if (advanced["disp_" + "post_car_logo" + disp_sel]) {
            if (donnees["post_car" + _f3_post] != undefined && donnees_new["post_rc" + _f3_pre] != undefined) {
                set_inner_html("post_car_logo", reformat_car(donnees["post_car" + _f3_post], 0, 8, 1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_car_logo", "");
                } else {
                    set_inner_html("post_car_logo", reformat_car("BMW M4 GT4", 0, 8, 1));
                }
            }
        }

        if (advanced["disp_" + "pre_track_status" + disp_sel]) {
            if (donnees["pre_track_status" + _f3_pre] != undefined && donnees_new["pre_rc" + _f3_pre] != undefined) {
                set_inner_html("pre_track_status", reformat_track_status(donnees["pre_track_status" + _f3_pre]));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_track_status", "");
                } else {
                    set_inner_html("pre_track_status", reformat_track_status(0));
                }
            }
        }
        if (advanced["disp_" + "post_track_status" + disp_sel]) {
            if (donnees["post_track_status" + _f3_post] != undefined && donnees_new["post_rc" + _f3_pre] != undefined) {
                set_inner_html("post_track_status", reformat_track_status(donnees["post_track_status" + _f3_post]));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_track_status", "");
                } else {
                    set_inner_html("post_track_status", reformat_track_status(0));
                }
            }
        }

        // topspeed
        if (advanced["disp_" + "pre_topspeed" + disp_sel]) {
            if (donnees["pre_topspeed" + _f3_pre] != undefined && donnees["pre_topspeed" + _f3_pre] != 0 && donnees_new["pre_rc" + _f3_pre] != undefined) {
                set_inner_html("pre_topspeed", (speedfactor * donnees["pre_topspeed" + _f3_pre]).toFixed(1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_topspeed", "&nbsp;");
                } else {
                    set_inner_html("pre_topspeed", "888.8");
                }
            }
        }
        if (advanced["disp_" + "me_topspeed" + disp_sel]) {
            if (donnees["me_topspeed"] != undefined && donnees["me_topspeed"] != 0) {
                set_inner_html("me_topspeed", (speedfactor * donnees["me_topspeed"]).toFixed(1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_topspeed", "&nbsp;");
                } else {
                    set_inner_html("me_topspeed", "888.8");
                }
            }
        }
        if (advanced["disp_" + "post_topspeed" + disp_sel]) {
            if (donnees["post_topspeed" + _f3_pre] != undefined && donnees["post_topspeed" + _f3_pre] != 0 && donnees_new["post_rc" + _f3_pre] != undefined) {
                set_inner_html("post_topspeed", (speedfactor * donnees["post_topspeed" + _f3_pre]).toFixed(1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_topspeed", "&nbsp;");
                } else {
                    set_inner_html("post_topspeed", "888.8");
                }
            }
        }
        // max_speed
        if (advanced["disp_" + "pre_max_speed" + disp_sel]) {
            if (donnees["pre_max_speed" + _f3_pre] != undefined && donnees["pre_max_speed" + _f3_pre] != 0 && donnees_new["pre_rc" + _f3_pre] != undefined) {
                set_inner_html("pre_max_speed", (speedfactor * donnees["pre_max_speed" + _f3_pre]).toFixed(1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_max_speed", "&nbsp;");
                } else {
                    set_inner_html("pre_max_speed", "888.8");
                }
            }
        }
        if (advanced["disp_" + "me_max_speed" + disp_sel]) {
            if (donnees["me_max_speed"] != undefined && donnees["me_max_speed"] != 0) {
                set_inner_html("me_max_speed", (speedfactor * donnees["me_max_speed"]).toFixed(1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_max_speed", "&nbsp;");
                } else {
                    set_inner_html("me_max_speed", "888.8");
                }
            }
        }
        if (advanced["disp_" + "post_max_speed" + disp_sel]) {
            if (donnees["post_max_speed" + _f3_pre] != undefined && donnees["post_max_speed" + _f3_pre] != 0 && donnees_new["post_rc" + _f3_pre] != undefined) {
                set_inner_html("post_max_speed", (speedfactor * donnees["post_max_speed" + _f3_pre]).toFixed(1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_max_speed", "&nbsp;");
                } else {
                    set_inner_html("post_max_speed", "888.8");
                }
            }
        }
        // apex_speed
        if (advanced["disp_" + "pre_apex_speed" + disp_sel]) {
            if (donnees["pre_apex_speed" + _f3_pre] != undefined && donnees["pre_apex_speed" + _f3_pre] != 0 && donnees_new["pre_rc" + _f3_pre] != undefined) {
                set_inner_html("pre_apex_speed", (speedfactor * donnees["pre_apex_speed" + _f3_pre]).toFixed(1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("pre_apex_speed", "&nbsp;");
                } else {
                    set_inner_html("pre_apex_speed", "888.8");
                }
            }
        }
        if (advanced["disp_" + "me_apex_speed" + disp_sel]) {
            if (donnees["me_apex_speed"] != undefined && donnees["me_apex_speed"] != 0) {
                set_inner_html("me_apex_speed", (speedfactor * donnees["me_apex_speed"]).toFixed(1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_apex_speed", "&nbsp;");
                } else {
                    set_inner_html("me_apex_speed", "888.8");
                }
            }
        }
        if (advanced["disp_" + "post_apex_speed" + disp_sel]) {
            if (donnees["post_apex_speed" + _f3_pre] != undefined && donnees["post_apex_speed" + _f3_pre] != 0 && donnees_new["post_rc" + _f3_pre] != undefined) {
                set_inner_html("post_apex_speed", (speedfactor * donnees["post_apex_speed" + _f3_pre]).toFixed(1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("post_apex_speed", "&nbsp;");
                } else {
                    set_inner_html("post_apex_speed", "888.8");
                }
            }
        }


        if (advanced["pitbox_bar_on"]) {  // on traite seulement si pitbar activée
            if (donnees.isontrack != 1 || ( (donnees.cts < 1 || donnees.cts > 2) && !donnees.p) || advanced["pitbox_bar_on"] == 0) {  // Si on est pas dans les pits on n'affiche pas l'indicateur de pits. On sécurise avec le onpitroad.
                document.getElementById("pitbar8").style.display = "none";
                document.getElementById("pitbar16").style.display = "none";
                document.getElementById("pitbar32").style.display = "none";
                document.getElementById("pitbar64").style.display = "none";
            } else {
                document.getElementById("pitbar8").style.display = "block";
                document.getElementById("pitbar16").style.display = "block";
                document.getElementById("pitbar32").style.display = "block";
                document.getElementById("pitbar64").style.display = "block";
            }
        }

        if (advanced["disp_" + "target_conso" + disp_sel]) {
            if (donnees.f_sf != undefined && donnees.lr != undefined && donnees.lr != 0) {
                set_inner_html("target_conso", (fuelfactor * coef_fuel * donnees.f_sf / (Math.floor(donnees.lr) + 1)).toFixed(conso_decimal));
            } else {
                if (!donnees.is_iracing_started) {
                    set_inner_html("target_conso", (8.888).toFixed(conso_decimal));
                }
            }
        }

        if (advanced["disp_" + "est_conso" + disp_sel]) {
            if (donnees.est_co != undefined) {
                set_inner_html("est_conso", (fuelfactor * coef_fuel * donnees.est_co).toFixed(conso_decimal));
            } else {
                if (!donnees.is_iracing_started) {
                    set_inner_html("est_conso", (8.888).toFixed(conso_decimal));
                }
            }
        }

        if (advanced["disp_" + "fuel_end" + disp_sel]) {
            if (donnees.f_sf != undefined && donnees.lr != undefined) {
                set_inner_html("fuel_end", (fuelfactor * coef_fuel * (donnees.f_sf - conso * (Math.floor(donnees.lr) + 1))).toFixed(fuel_decimal));
            } else {
                if (!donnees.is_iracing_started) {
                    set_inner_html("fuel_end", (88.888).toFixed(fuel_decimal));
                }
            }
        }

        if (advanced["disp_" + "nblaps_race_winner" + disp_sel]) {
            if (donnees.nblaps_race_winner != undefined) {
                if (donnees.nblaps_race_winner != 0) {
                    set_inner_html("nblaps_race_winner", (donnees.nblaps_race_winner).toFixed(0));
                } else {
                    set_inner_html("nblaps_race_winner", "--");
                }
            } else {
                if (!donnees.is_iracing_started) {
                    set_inner_html("nblaps_race_winner", 88);
                }
            }
        }

        if (advanced["disp_" + "nblaps_race_driver" + disp_sel]) {
            if (donnees.nblaps_race_driver != undefined) {
                if (donnees.nblaps_race_driver != 0) {
                    set_inner_html("nblaps_race_driver", (donnees.nblaps_race_driver).toFixed(0));
                } else {
                    set_inner_html("nblaps_race_driver", "--");
                }
            } else {
                if (!donnees.is_iracing_started) {
                    set_inner_html("nblaps_race_driver", 88);
                }
            }
        }

        if (advanced["disp_" + "time_with_fuel" + disp_sel]) {
            if (conso > 0 && donnees.f != undefined && donnees.laptime_avg5 != undefined && donnees.dp != undefined) {
                //var tmp_nb_laps = Math.trunc(donnees.f / conso);  // REM : on tronque pour avoir le nombre de tours entiers qu'on peut faire
                var tmp_nb_laps = donnees.f / conso;  // REM : on ne tronque pas car sinon la valeur va faire des sauts
                // Le nombre de tours restant dépend de notre position en piste car on devra obligatoirement s'arrêter s'il ne reste pas
                // assez d'essence pour unn tour de plus
                var tmp_lapdistpct = (donnees.dp + 2) % 1;  // ici on fait +2 car si le dp est négatif, le % 1 en javascript ne va pas le ramener entre 0 et 1
                var tmp_nb_laps_after_this_lap = Math.max(0, Math.floor(tmp_nb_laps - (1 - tmp_lapdistpct))) ;  // Nombre de tours entiers qu'on pourra faire une fois ce tour terminé
                tmp_nb_laps = tmp_nb_laps_after_this_lap + 1 - tmp_lapdistpct;
                set_inner_html("time_with_fuel", reformat_timeremain(tmp_nb_laps * donnees.laptime_avg5));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("time_with_fuel", "--");
                } else {
                    set_inner_html("time_with_fuel", "8:88:88");
                }
            }
        }

        if (advanced["disp_" + "predicted_stint_time" + disp_sel]) {
            if (conso > 0 && donnees.laptime_avg5 != undefined && donnees.full_plost != undefined && donnees.tcap != undefined) {
                set_inner_html("predicted_stint_time", reformat_timeremain(Math.floor(donnees.tcap / conso) * donnees.laptime_avg5 + donnees.full_plost));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("predicted_stint_time", "--");
                } else {
                    set_inner_html("predicted_stint_time", "8:88:88");
                }
            }
        }


        if (advanced["disp_" + "nblaps_per_tank" + disp_sel]) {
            if (conso > 0 && donnees.tcap != undefined) {
                set_inner_html("nblaps_per_tank", (donnees.tcap / conso).toFixed(1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("nblaps_per_tank", "--");
                } else {
                    set_inner_html("nblaps_per_tank", 88.8);
                }
            }
        }

        if (advanced["disp_" + "nblaps_before_pit_window" + disp_sel]) {
            tmp_nbpits = Math.floor(nbpits);
            if (conso > 0 && donnees.f != undefined && donnees.tcap != undefined && tmp_nbpits > 0) {
                tmp_nblaps_before_pit_window = (fuelneed - donnees.tcap * tmp_nbpits + donnees.f) / conso;
                set_inner_html("nblaps_before_pit_window", (tmp_nblaps_before_pit_window).toFixed(1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("nblaps_before_pit_window", "--");
                } else {
                    set_inner_html("nblaps_before_pit_window", 88.8);
                }
            }
        }

        if (advanced["disp_" + "nblaps_to_equalize_stints" + disp_sel]) {
            if (conso > 0 && donnees.lr != undefined && donnees.f != undefined && donnees.tcap != undefined && donnees.me_sti != undefined && donnees.lr != undefined) {

                // REM : si on doit changer la méthode de calcul du tmp_nblaps ici, il faut le faire aussi dans le calcul.py

                tmp_nbpits = Math.floor(nbpits);

                tmp_nblaps_before_pit_window = (fuelneed - donnees.tcap * tmp_nbpits + donnees.f) / conso;
                if (tmp_nbpits == 0) {
                    // on compte au moins 1 pit restant si jamais on veut quand même pitter pour juste changer les pneus
                    tmp_nbpits = 1;
                    tmp_nblaps_before_pit_window = 0;
                }

                // Nombre de tours par stint (on arrondi à l'entier supérieur en mettant +0.4 au cas où on aurait N.05 tours par stint)
                //   REM : on enlève les tours sous drapeau jaune car on n'a pas usé les pneus à ce moment la
                tmp_nblaps_per_stint = Math.round(0.4 + (donnees.lr + donnees.me_sti - donnees.nblaps_under_yellow_since_pit)/(tmp_nbpits + 1));

                if (tmp_nblaps_per_stint != 0) {
                    tmp_nblaps = donnees.lr % tmp_nblaps_per_stint;
                    tmp_estlaps = donnees.estlaps;

                    if ((tmp_nblaps_before_pit_window > tmp_nblaps) || (tmp_nblaps > tmp_estlaps)) {
                        // Si la fenêtre des pits est après, on va repousser le pit pour éviter de faire un pit de plus
                        if (tmp_nblaps_before_pit_window > tmp_nblaps) {
                            if (tmp_nblaps_before_pit_window <= tmp_estlaps) {
                                tmp_nblaps = tmp_nblaps_before_pit_window;
                            } else {
                                tmp_nblaps = tmp_estlaps;  // Si on ne peut pas faire le nombre de tour recommandé parce qu'on n'a pas assez d'essence on va pitter plus tôt
                            }
                        } else {  // if (tmp_nblaps > tmp_estlaps)
                            tmp_nblaps = tmp_estlaps;  // Si on ne peut pas faire le nombre de tour recommandé parce qu'on n'a pas assez d'essence on va pitter plus tôt
                        }
                    }

                    set_inner_html("nblaps_to_equalize_stints", (tmp_nblaps).toFixed(1));
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("nblaps_to_equalize_stints", "--");
                    } else {
                        set_inner_html("nblaps_to_equalize_stints", 88.8);
                    }
                }
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("nblaps_to_equalize_stints", "--");
                } else {
                    set_inner_html("nblaps_to_equalize_stints", 88.8);
                }
            }
        }

        if (advanced["disp_" + "time" + disp_sel]) {
            //document.getElementById("time").innerHTML = str_heure();
            set_inner_html("time", str_heure());
        }

        if (advanced["disp_" + "perfs" + disp_sel]) {
            if (donnees.pss != undefined) {
                //document.getElementById("perfs_dist").innerHTML = donnees.pss;
                set_inner_html("perfs_dist", donnees.pss);
            } else {
                if (!donnees.is_iracing_started) {
                    set_inner_html("perfs_dist", 888);
                }
            }
            if (donnees.p100 != undefined && donnees.p400 != undefined && donnees.p1000 != undefined) {
                //document.getElementById("perfs_100kmh").innerHTML = donnees.p100.toFixed(1);
                set_inner_html("perfs_100kmh", donnees.p100.toFixed(1));
                //document.getElementById("perfs_400m").innerHTML = donnees.p400.toFixed(1);
                set_inner_html("perfs_400m", donnees.p400.toFixed(1));
                //document.getElementById("perfs_1000m").innerHTML = donnees.p1000.toFixed(1);
                set_inner_html("perfs_1000m", donnees.p1000.toFixed(1));
                if (donnees.p100d != undefined && donnees.p400s != undefined && donnees.p1000s != undefined) {
                    //document.getElementById("perfs_100kmh_dist").innerHTML = donnees.p100d.toFixed(0) + " m";
                    set_inner_html("perfs_100kmh_dist", donnees.p100d.toFixed(0) + " m");
                    if (speedfactor == 1) {
                        tmp_unit = " km/h";
                    } else {
                        tmp_unit = " MPH";
                    }
                    //document.getElementById("perfs_400m_speed").innerHTML = (speedfactor * donnees.p400s * 3.6).toFixed(0) + tmp_unit;
                    set_inner_html("perfs_400m_speed", (speedfactor * donnees.p400s * 3.6).toFixed(0) + tmp_unit);
                    //document.getElementById("perfs_1000m_speed").innerHTML = (speedfactor * donnees.p1000s * 3.6).toFixed(0) + tmp_unit;
                    set_inner_html("perfs_1000m_speed", (speedfactor * donnees.p1000s * 3.6).toFixed(0) + tmp_unit);
                }
            } else {
                if (!donnees.is_iracing_started) {
                    if (speedfactor == 1) {
                        tmp_unit = " km/h";
                    } else {
                        tmp_unit = " MPH";
                    }
                    set_inner_html("perfs_100kmh", 88.8);
                    set_inner_html("perfs_400m", 88.8);
                    set_inner_html("perfs_1000m", 88.8);
                    set_inner_html("perfs_100kmh_dist", "888 m");
                    set_inner_html("perfs_400m_speed", 888 + tmp_unit);
                    set_inner_html("perfs_1000m_speed", 888 + tmp_unit);
                }
            }
        }

        if (advanced["disp_" + "inc" + disp_sel]) {
            if (donnees.inc != undefined) {
                if (donnees.inc_limit == "unlimited") {
                    //document.getElementById("inc").innerHTML = donnees.inc + " / " + "&infin;";
                    set_inner_html("inc", donnees.inc + " / " + "&infin;");
                } else {
                    //document.getElementById("inc").innerHTML = donnees.inc + " / " + donnees.inc_limit;
                    set_inner_html("inc", donnees.inc + " / " + donnees.inc_limit);
                }
            } else {
                set_inner_html("inc", "88 / 88");
            }
        }
        if (advanced["disp_" + "nextpittimelost" + disp_sel]) {
            if (donnees.plost != undefined) {
                if (donnees.pro_v == 1 || donnees.try_v == 1 || donnees.pro_v == undefined) {
                    //document.getElementById("nextpittimelost").innerHTML = (donnees.plost).toFixed(1) + "s";
                    set_inner_html("nextpittimelost", (donnees.plost).toFixed(1) + "s");
                } else {
                    //document.getElementById("nextpittimelost").innerHTML = "buy pro";
                    set_inner_html("nextpittimelost", "buy pro");
                }
            }
        }

        if (advanced["disp_" + "conso1" + disp_sel]) {
            if (donnees.co != undefined) {
                if (donnees.pro_v == 1 || donnees.try_v == 1 || donnees.pro_v == undefined) {
                    //document.getElementById("conso1").innerHTML = (fuelfactor * coef_fuel * donnees.co).toFixed(3);
                    set_inner_html("conso1", (fuelfactor * coef_fuel * donnees.co).toFixed(conso_decimal));
                } else {
                    //document.getElementById("conso1").innerHTML = "buy pro";
                    set_inner_html("conso1", "buy pro");
                }
            } else {
                set_inner_html("conso1", 8.888.toFixed(conso_decimal));
            }
            if (advanced["perso_font_color_" + "conso1" + disp_sel]) {
                set_style_color("conso1", advanced["font_color_" + "conso1" + disp_sel]);
            } else {
                if (donnees.fuel_accurate != 1) {
                    set_style_color("conso1", "#bbbbbb");
                } else {
                    set_style_color("conso1", "#ffffff");
                }
            }
        }
        if (advanced["disp_" + "conso5" + disp_sel]) {
            if (donnees.co5 != undefined) {
                if (donnees.pro_v == 1 || donnees.try_v == 1 || donnees.pro_v == undefined) {
                    //document.getElementById("conso5").innerHTML = (fuelfactor * coef_fuel * donnees.co5).toFixed(3);
                    set_inner_html("conso5", (fuelfactor * coef_fuel * donnees.co5).toFixed(conso_decimal));
                } else {
                    //document.getElementById("conso5").innerHTML = "buy pro";
                    set_inner_html("conso5", "buy pro");
                }
            } else {
                set_inner_html("conso5", 8.888.toFixed(conso_decimal));
            }
            if (advanced["perso_font_color_" + "conso5" + disp_sel]) {
                set_style_color("conso5", advanced["font_color_" + "conso5" + disp_sel]);
            } else {
                if (donnees.fuel_accurate != 1) {
                    set_style_color("conso5", "#bbbbbb");
                } else {
                    set_style_color("conso5", "#ffffff");
                }
            }
        }
        if (advanced["disp_" + "points" + disp_sel]) {
            if (donnees.pts_me != undefined) {
                if (donnees.styp == "Race") {
                    //document.getElementById("points").innerHTML = donnees.pts_me;
                    set_inner_html("points", donnees.pts_me);
                }else {
                    //document.getElementById("points").innerHTML = "--";
                    set_inner_html("points", "--");
                }
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("points", "--");
                } else {
                    set_inner_html("points", "888");
                }
            }
        }
        if (advanced["disp_" + "delta_avg" + disp_sel]) {
            if (donnees.d_a != undefined) {
                //document.getElementById("delta_avg").innerHTML = reformat_delta(donnees.d_a);
                set_inner_html("delta_avg", reformat_delta(donnees.d_a));
            } else {
                //document.getElementById("delta_avg").innerHTML = "--";
                set_inner_html("delta_avg", "+0.00");
            }
        }
        if (advanced["disp_" + "delta_tot0" + disp_sel]) {
            if (donnees.d_tot != undefined) {
                set_inner_html("delta_tot0", reformat_delta(donnees.d_tot));
            } else {
                set_inner_html("delta_tot0", "+0.00");
            }
        }
        if (advanced["disp_" + "delta_tot" + disp_sel]) {
            if (donnees.d_tot != undefined && donnees.st_avg != undefined && donnees.st_ref != undefined && donnees.tot_ref != undefined) {
                if (donnees.new_tot) {
                    tot_color = "#ff00ff";
                } else {
                    tot_color = "#000000";
                }
                //document.getElementById("delta_tot").innerHTML = reformat_delta(donnees.d_tot) + " <span style='vertical-align: top; color:#0088ff'>" + donnees.st_avg + "/" + donnees.st_ref + "</span> <span style='vertical-align: top; font-size:75%;color:" + tot_color + ";'>" + donnees.tot_ref + "</span>";
                set_inner_html("delta_tot", reformat_delta(donnees.d_tot) + " <span style='vertical-align: top; color:#0088ff'>" + donnees.st_avg + "/" + donnees.st_ref + "</span> <span style='vertical-align: top; font-size:75%;color:" + tot_color + ";'>" + donnees.tot_ref + "</span>");
            } else {
                //document.getElementById("delta_tot").innerHTML = "&nbsp;";
                set_inner_html("delta_tot", "+0.00 <span style='vertical-align: top; color:#0088ff'>0/0</span> <span style='vertical-align: top; font-size:75%;color:#000000;'>000.000</span>");
            }
        }
        if (advanced["disp_" + "delta_tot2" + disp_sel]) {
            if (donnees.d_tot != undefined && donnees.st_avg != undefined && donnees.st_ref != undefined && donnees.tot_ref != undefined) {
                if (donnees.new_tot) {
                    tot_color = "#ff00ff";
                } else {
                    tot_color = "#000000";
                }
                set_inner_html("delta_tot2", reformat_delta(donnees.d_tot) + " <span style='vertical-align: top; color:#0088ff'>" + donnees.st_avg + "/" + donnees.st_ref + "</span> <span style='vertical-align: top; font-size:75%;color:" + tot_color + ";'>" + (donnees.st_ref > 0 ? reformat_laptime(donnees.tot_ref / donnees.st_ref) : "--") + "</span>");
            } else {
                set_inner_html("delta_tot2", "+0.00 <span style='vertical-align: top; color:#0088ff'>0/0</span> <span style='vertical-align: top; font-size:75%;color:#000000;'>--</span>");
            }
        }

        if (advanced["disp_" + "traffic" + disp_sel]) {
            if (donnees.catch_0 != undefined && donnees.catch_1 != undefined && donnees.catch_2 != undefined) {
                c0 = donnees.catch_0;
                c1 = donnees.catch_1;
                c2 = donnees.catch_2;
                if (donnees.cc_0.slice(0,1) == "+") ccs_0 = "";
                else ccs_0 = "<span style='color: #ff0000; vertical-align: top; '>'</span>";
                if (donnees.cc_1.slice(0,1) == "+") ccs_1 = "";
                else ccs_1 = "<span style='color: #ff0000; vertical-align: top; '>'</span>";
                if (donnees.cc_2.slice(0,1) == "+") ccs_2 = "";
                else ccs_2 = "<span style='color: #ff0000; vertical-align: top; '>'</span>";
                if (c0 < 10) c0 = c0.toFixed(1);
                if (c1 < 10) c1 = c1.toFixed(1);
                if (c2 < 10) c2 = c2.toFixed(1);
                if (c0 == 9999) c0 = ".";
                if (c1 == 9999) c1 = ".";
                if (c2 == 9999) c2 = ".";
                //document.getElementById("traffic").innerHTML = "<span class='shadow' style='color: " + donnees.cc_0.slice(1,8) + "; vertical-align: top; font-size:100%'> " + c0 + ccs_0 + "</span><span class='shadow' style='opacity:1; color: " + donnees.cc_1.slice(1,8) + "; vertical-align: top; font-size:75%'> " + c1 + ccs_1 + "</span><span class='shadow' style='opacity: 1; color: " + donnees.cc_2.slice(1,8) + "; vertical-align: top; font-size:50%'> " + c2 + ccs_2 + "</span>";
                set_inner_html("traffic", "<span class='shadow' style='color: " + donnees.cc_0.slice(1,8) + "; vertical-align: top; font-size:100%'> " + c0 + ccs_0 + "</span><span class='shadow' style='opacity:1; color: " + donnees.cc_1.slice(1,8) + "; vertical-align: top; font-size:75%'> " + c1 + ccs_1 + "</span><span class='shadow' style='opacity: 1; color: " + donnees.cc_2.slice(1,8) + "; vertical-align: top; font-size:50%'> " + c2 + ccs_2 + "</span>");
            } else {
                if (!donnees.is_iracing_started) {
                    set_inner_html("traffic", "<span class='shadow' style='color: " + 88 + "; vertical-align: top; font-size:100%'> " + 88 + "</span><span class='shadow' style='opacity:1; color: " + 88 + "; vertical-align: top; font-size:75%'> " + 88 + "</span><span class='shadow' style='opacity: 1; color: " + 88 + "; vertical-align: top; font-size:50%'> " + 88 + "</span>");
                }
            }
        }
        if (advanced["disp_" + "traffic_pit" + disp_sel]) {
            if (donnees.catchpit_0 != undefined && donnees.catchpit_1 != undefined && donnees.catchpit_2 != undefined) {
                c0 = donnees.catchpit_0;
                c1 = donnees.catchpit_1;
                c2 = donnees.catchpit_2;
                if (donnees.ccpit_0.slice(0,1) == "+") ccs_0 = "";
                else ccs_0 = "<span style='color: #ff0000; vertical-align: top; '>'</span>";
                if (donnees.ccpit_1.slice(0,1) == "+") ccs_1 = "";
                else ccs_1 = "<span style='color: #ff0000; vertical-align: top; '>'</span>";
                if (donnees.ccpit_2.slice(0,1) == "+") ccs_2 = "";
                else ccs_2 = "<span style='color: #ff0000; vertical-align: top; '>'</span>";
                if (c0 < 10) c0 = c0.toFixed(1);
                if (c1 < 10) c1 = c1.toFixed(1);
                if (c2 < 10) c2 = c2.toFixed(1);
                if (c0 == 9999) c0 = ".";
                if (c1 == 9999) c1 = ".";
                if (c2 == 9999) c2 = ".";
                //document.getElementById("traffic_pit").innerHTML = "<span class='shadow' style='color: " + donnees.ccpit_0.slice(1,8) + "; vertical-align: top; font-size:100%'> " + c0 + ccs_0 + "</span><span class='shadow' style='opacity:1; color: " + donnees.ccpit_1.slice(1,8) + "; vertical-align: top; font-size:75%'> " + c1 + ccs_1 + "</span><span class='shadow' style='opacity:1; color: " + donnees.ccpit_2.slice(1,8) + "; vertical-align: top; font-size:50%'> " + c2 + ccs_2 + "</span>";
                set_inner_html("traffic_pit", "<span class='shadow' style='color: " + donnees.ccpit_0.slice(1,8) + "; vertical-align: top; font-size:100%'> " + c0 + ccs_0 + "</span><span class='shadow' style='opacity:1; color: " + donnees.ccpit_1.slice(1,8) + "; vertical-align: top; font-size:75%'> " + c1 + ccs_1 + "</span><span class='shadow' style='opacity:1; color: " + donnees.ccpit_2.slice(1,8) + "; vertical-align: top; font-size:50%'> " + c2 + ccs_2 + "</span>");
            } else {
                if (!donnees.is_iracing_started) {
                    set_inner_html("traffic_pit", "<span class='shadow' style='color: " + 88 + "; vertical-align: top; font-size:100%'> " + 88 + "</span><span class='shadow' style='opacity:1; color: " + 88 + "; vertical-align: top; font-size:75%'> " + 88 + "</span><span class='shadow' style='opacity:1; color: " + 88 + "; vertical-align: top; font-size:50%'> " + 88 + "</span>");
                }
            }
        }

        if (advanced["disp_" + "regen_lap" + disp_sel]) {
            if (donnees.regen_lap != undefined) {
                signe = "";
                if (donnees.regen_lap >= 0) {
                    signe = "+";
                }
                //document.getElementById("regen_lap").innerHTML = signe + donnees.regen_lap.toFixed(hybrid_decimal);
                set_inner_html("regen_lap", signe + donnees.regen_lap.toFixed(hybrid_decimal));
                if (donnees.regen_status != regen_status_old) {
                    if (donnees.regen_status == 1) {
                        if (advanced["perso_bg_color_" + "regen_lap" + disp_sel]) {
                            change_bg("regen_lap", advanced["bg_color_" + "regen_lap" + disp_sel], advanced["bg_" + "regen_lap" + disp_sel]);
                        } else {
                            change_bg("regen_lap", "#ffffff", advanced["bg_" + "regen_lap" + disp_sel]);
                        }
                        if (advanced["perso_font_color_" + "regen_lap" + disp_sel]) {
                            set_style_color("regen_lap", advanced["font_color_" + "regen_lap" + disp_sel]);
                        } else {
                            set_style_color("regen_lap", "#ff0000");
                        }
                    } else {
                        if (advanced["perso_bg_color_" + "regen_lap" + disp_sel]) {
                            change_bg("regen_lap", advanced["bg_color_" + "regen_lap" + disp_sel], advanced["bg_" + "regen_lap" + disp_sel]);
                        } else {
                            change_bg("regen_lap", "#999999", advanced["bg_" + "regen_lap" + disp_sel]);
                        }
                        if (advanced["perso_font_color_" + "regen_lap" + disp_sel]) {
                            set_style_color("regen_lap", advanced["font_color_" + "regen_lap" + disp_sel]);
                        } else {
                            set_style_color("regen_lap", "#ff00ff");
                        }
                    }
                }
                regen_status_old = donnees.regen_status;
            } else {
                set_inner_html("regen_lap", "+" + (88.888).toFixed(hybrid_decimal));
            }
        }

        if (advanced["disp_" + "regen_turn" + disp_sel]) {
            if (donnees.regen_turn != undefined) {
                signe = "";
                if (donnees.regen_turn >= 0) {
                    signe = "+";
                }
                //document.getElementById("regen_turn").innerHTML = signe + donnees.regen_turn.toFixed(hybrid_decimal);
                set_inner_html("regen_turn", signe + donnees.regen_turn.toFixed(hybrid_decimal));
            } else {
                set_inner_html("regen_turn", "+" + (88.888).toFixed(hybrid_decimal));
            }
        }

        // Mise à jour des Températures et pression des pneus
        // 1 : pressions
        // 0 : temperatures
        // 2 : wear
        var tmp_list_var = {
            'RRpressure': 1,
            'RFpressure': 1,
            'LFpressure': 1,
            'LRpressure': 1,
            'RRtempL': 0,
            'RRtempM': 0,
            'RRtempR': 0,
            'RFtempL': 0,
            'RFtempM': 0,
            'RFtempR': 0,
            'LFtempL': 0,
            'LFtempM': 0,
            'LFtempR': 0,
            'LRtempL': 0,
            'LRtempM': 0,
            'LRtempR': 0,
            'RRwearL': 2,
            'RRwearM': 2,
            'RRwearR': 2,
            'RFwearL': 2,
            'RFwearM': 2,
            'RFwearR': 2,
            'LFwearL': 2,
            'LFwearM': 2,
            'LFwearR': 2,
            'LRwearL': 2,
            'LRwearM': 2,
            'LRwearR': 2,
        };
        var suffixe = "";

        for (var name in tmp_list_var) {
            if (advanced["disp_" + name + disp_sel]) {
                if (donnees[name] != undefined) {
                    //suffixe = "&deg;C";
                    //if (name.substr(-8) == "pressure" ) suffixe = " kPa";
                    if (tmp_list_var[name] == 1) {  // s'il s'agit d'une pression
                        if (donnees.u == 1) {  // pressions en Kpa
                            //document.getElementById(name).innerHTML = donnees[name].toFixed(1);
                            set_inner_html(name, donnees[name].toFixed(1));
                        } else {  // pressions en Psi
                            //document.getElementById(name).innerHTML = (0.145038 * donnees[name]).toFixed(1);
                            set_inner_html(name, (0.145038 * donnees[name]).toFixed(1));
                        }
                    } else if (tmp_list_var[name] == 2) {  // s'il s'agit d'un de l'usure
                        set_inner_html(name, donnees[name].toFixed(1) + "%");
                    } else {  // s'il s'agit d'une température
                        if ((temperature_mode != 2) && ((donnees.u == 1 && temperature_mode == 0) || (temperature_mode == 1))) {  // systeme metric ou forcé en Celsius dans les options
                            //document.getElementById(name).innerHTML = donnees[name].toFixed(1);
                            set_inner_html(name, donnees[name].toFixed(1));
                        } else {
                            //document.getElementById(name).innerHTML = (donnees[name] * 1.8 + 32).toFixed(1);
                            set_inner_html(name, (donnees[name] * 1.8 + 32).toFixed(1));
                        }
                    }
                }
            }
        }


        if (advanced["disp_" + "iR_gain" + disp_sel]) {
            if (donnees.iR_gain != undefined) {
                var tmp_prefixe = "";
                if (donnees.iR_gain >= 0) tmp_prefixe = "+";
                //document.getElementById("iR_gain").innerHTML = tmp_prefixe + donnees.iR_gain;
                set_inner_html("iR_gain", tmp_prefixe + donnees.iR_gain);
            } else {
                if (!donnees.is_iracing_started) {
                    set_inner_html("iR_gain", "+88");
                }
            }
        }
        if (advanced["disp_" + "iR_proj" + disp_sel]) {
            if (donnees.iR_proj != undefined) {
                //document.getElementById("iR_proj").innerHTML = donnees.iR_proj;
                set_inner_html("iR_proj", donnees.iR_proj);
            } else {
                if (!donnees.is_iracing_started) {
                    set_inner_html("iR_proj", "8888");
                }
            }
        }
        if (advanced["disp_" + "apex_speed" + disp_sel]) {
            if (donnees.apex_speed != undefined) {
                //document.getElementById("apex_speed").innerHTML = donnees.apex_speed;
                set_inner_html("apex_speed", donnees.apex_speed);
            } else {
                if (!donnees.is_iracing_started) {
                    set_inner_html("apex_speed", 888);
                }
            }
        }
        if (advanced["disp_" + "peak_brake_pressure" + disp_sel]) {
            if (donnees.peak_brake_pressure != undefined) {
                set_inner_html("peak_brake_pressure", donnees.peak_brake_pressure);
            } else {
                if (!donnees.is_iracing_started) {
                    set_inner_html("peak_brake_pressure", 88.8);
                }
            }
        }
        tmp_list_var = {
            "LeftTireSetsAvailable": 1,
            "RightTireSetsAvailable": 1,
        }
        for (var name in tmp_list_var) {
            if (advanced["disp_" + name + disp_sel]) {
                if (donnees[name] != undefined && donnees[name] != 255) {
                    set_inner_html(name, donnees[name]);
                } else {
                    if (donnees[name] == 255) {
                        set_inner_html(name, "&infin;");
                    } else {
                        if (donnees.is_iracing_started) {
                            set_inner_html(name, "--");
                        } else {
                            set_inner_html(name, 8);
                        }
                    }
                }
            }
        }

    }


    if (donnees.typ <= 33) {  // toutes les <refresh rate> secondes

        if (!donnees.is_iracing_started) {
            donnees.b = 88;
            donnees.t = 88;
            donnees.clutch = 88;
            donnees.ffb = 88;
            donnees.ffbpct = 88;
            donnees.yaw = Math.PI/2;
            donnees.winddir = Math.PI/2;
        }

        conso = 0;
        conso1 = donnees.co;
        conso5 = donnees.co5;
        if (donnees.calculations_mode != undefined) {
            calculations_mode = donnees.calculations_mode;
        }
        if (donnees.refuel_mode != undefined) {
            refuel_mode = donnees.refuel_mode;
        }

        if (calculations_mode == 1) {
            conso = donnees.co5;
            fuelneed = donnees.fn5;
            text_conso = "(5L)";
            text_fuelneed = "(5L-";
        } else if (calculations_mode == 2) {
            conso = donnees.coMAX;
            fuelneed = donnees.fnMAX;
            text_conso = "(MAX)"
            text_fuelneed = "(MAX-";
        } else if (calculations_mode == 3) {
            conso = donnees.coSet;
            fuelneed = donnees.fnSet;
            text_conso = "(Set)"
            text_fuelneed = "(Set-";
        } else {
            conso = donnees.co;
            fuelneed = donnees.fn;
            text_conso = "(1L)";
            text_fuelneed = "(1L-";
        }

        fuelneed1 = donnees.fn;
        fuelneed5 = donnees.fn5;

        if (donnees.refuelspeed == 0) {
            donnees.refuelspeed = 1
        }
        if (fuelneed >= 5*donnees.refuelspeed) {
            fuelneed_bg1_pct = 1;
        } else if (fuelneed <= 0) {
            fuelneed_bg1_pct = 0;
        } else {
            fuelneed_bg1_pct = fuelneed / (5 * donnees.refuelspeed);
        }

        if (fuelneed1 >= 5*donnees.refuelspeed) {
            fuelneed1_bg1_pct = 1;
        } else if (fuelneed1 <= 0) {
            fuelneed1_bg1_pct = 0;
        } else {
            fuelneed1_bg1_pct = fuelneed1 / (5 * donnees.refuelspeed);
        }

        if (fuelneed5 >= 5*donnees.refuelspeed) {
            fuelneed5_bg1_pct = 1;
        } else if (fuelneed5 <= 0) {
            fuelneed5_bg1_pct = 0;
        } else {
            fuelneed5_bg1_pct = fuelneed5 / (5 * donnees.refuelspeed);
        }


        fn_dont_change_colors = 0;
        fn_auto_offset_signe = "";
        fuelneed_replaced = false;

        // On affiche la valeur 'fuel to add' entrée manuellement ou bien l'offset en mode auto pendant 2 secondes
        if (refuel_mode == 1) {
            nb_decimal_fnman = fuel_decimal;
            if ( Math.abs((fuelfactor * coef_fuel * donnees.fnman * 10) % 1) < 0.1 ) {
                nb_decimal_fnman = 1;
            }
            if (donnees.fnman_disp || (Date.now() / 1000 - fnman_disp_temporary_tstamp <= 2) ) {
                fuelneed_replaced = true;
                set_inner_html("fuelneed", (fuelfactor * coef_fuel * donnees.fnman).toFixed(nb_decimal_fnman));
            }
            text_fuelneed = "(S-A:" + (fuelfactor * coef_fuel * donnees.fnman).toFixed(nb_decimal_fnman) + ")";
        } else if (refuel_mode == 0) {
            text_fuelneed += "M)";
        } else if (refuel_mode == 2) {
            if (donnees.fn_auto_offset >= 0) {
                fn_auto_offset_signe = "+";
            }
            nb_decimal_fn_auto_offset = fuel_decimal;
            if ( Math.abs((fuelfactor * coef_fuel * donnees.fn_auto_offset * 10) % 1) < 0.1 ) {
                nb_decimal_fn_auto_offset = 1;
            }
            if (Date.now() / 1000 - fn_auto_offset_disp_temporary_tstamp <= 2) {  // en fonction de l'option choisie, on l'affiche tout le temps ou bien juste pendant 2 secondes
                fn_dont_change_colors = 1;
                fuelneed_replaced = true;
                set_inner_html("fuelneed", fn_auto_offset_signe + (fuelfactor * coef_fuel * donnees.fn_auto_offset).toFixed(nb_decimal_fn_auto_offset));
            }

            text_fuelneed += "A:" + fn_auto_offset_signe + (fuelfactor * coef_fuel * donnees.fn_auto_offset).toFixed(nb_decimal_fn_auto_offset) + ")";
        }

        set_inner_html("fuelneed_h", "F2add <span style='font-size: 0.75em; vertical-align: middle; line-height: 1em;'>" + text_fuelneed + "</span>");


        tmp_list_var = {
            "iracing_fuel_box": 1,
            "iracing_fuel_add": 1,
            "iracing_windshield_box": 1,
            "iracing_fastrepair_box": 1,
            "iracing_fastrepair_remaining": 1,
            "iracing_lf_tire_box": 1,
            "iracing_rf_tire_box": 1,
            "iracing_lr_tire_box": 1,
            "iracing_rr_tire_box": 1,
        }
        tmp_list_var_box = {
            "iracing_fuel_box": 1,
            "iracing_windshield_box": 1,
            "iracing_fastrepair_box": 1,
            "iracing_lf_tire_box": 1,
            "iracing_rf_tire_box": 1,
            "iracing_lr_tire_box": 1,
            "iracing_rr_tire_box": 1,
        }

        var tmp_val;
        for (var name in tmp_list_var) {
            if (advanced["disp_" + name + disp_sel]) {
                if (donnees[name] != undefined) {
                    if (name == "iracing_fuel_add") {  // on affiche dans la bonne unité
                        tmp_val = (fuelfactor * coef_fuel * donnees[name]).toFixed(fuel_decimal);
                    }
                    if (donnees[name] != -1) {
                        if (name in tmp_list_var_box) {
                            if (donnees[name] == 1) {
                                //tmp_val = "X";
                                tmp_val = "&#10004;";
                            } else {
                                tmp_val = "";
                            }
                        }
                        set_inner_html(name, tmp_val);
                    } else {
                        set_inner_html(name, "?");
                    }
                }
            }
        }


        if (advanced["disp_" + "tank" + disp_sel]) {
            if (donnees.f != undefined) {
                set_inner_html("tank", (fuelfactor * coef_fuel * donnees.f).toFixed(fuel_decimal));
                if (donnees.fuel_accurate != 1) {
                    if (advanced["perso_font_color_" + "tank" + disp_sel]) {
                        set_style_color("tank", advanced["font_color_" + "tank" + disp_sel]);
                    } else {
                        set_style_color("tank", "#bbbbbb");
                    }
                } else {
                    if (advanced["perso_font_color_" + "tank" + disp_sel]) {
                        set_style_color("tank", advanced["font_color_" + "tank" + disp_sel]);
                    } else {
                        set_style_color("tank", "#ffffff");
                    }
                }
            } else {
                if (!donnees.is_iracing_started) {
                    set_inner_html("tank", (88.888).toFixed(fuel_decimal));
                }
            }
        }

        if (conso > 0) {
            if (advanced["disp_" + "conso" + disp_sel]) {
                if (donnees.pro_v == 1 || donnees.try_v == 1 || donnees.pro_v == undefined) {
                    set_inner_html("conso", (fuelfactor * coef_fuel * conso).toFixed(conso_decimal) + " " + "<span style='font-size:0.75em; vertical-align: middle; line-height: 1em; font-weight:normal'>" + text_conso + "</span>");
                } else {
                    set_inner_html("conso", "buy pro");
                }
                if (advanced["perso_font_color_" + "conso" + disp_sel]) {
                    set_style_color("conso", advanced["font_color_" + "conso" + disp_sel]);
                } else {
                    if (donnees.fuel_accurate != 1) {
                        set_style_color("conso", "#bbbbbb");
                    } else {
                        set_style_color("conso", "#ffffff");
                    }
                }
            }
        } else {
            if (advanced["disp_" + "conso" + disp_sel]) {
                if (donnees.pro_v == 1 || donnees.try_v == 1 || donnees.pro_v == undefined) {
                    if (donnees.is_iracing_started) {
                        set_inner_html("conso", "-- " + "<span style='font-size:0.75em; vertical-align: middle; line-height: 1em; font-weight:normal'>" + text_conso + "</span>");
                    } else {
                        set_inner_html("conso", (8.888).toFixed(conso_decimal) + " " + "<span style='font-size:0.75em; vertical-align: middle; line-height: 1em; font-weight:normal'>" + text_conso + "</span>");
                    }
                } else {
                    set_inner_html("conso", "buy pro");
                }
            }
        }

        if (advanced["disp_" + "fuelneed" + disp_sel]) {
            if (fn_dont_change_colors == 0) {
                //fuelneed_bg1_pct = 0.5;  // DEBUG
                if (fuelneed_bg1_pct != fuelneed_bg1_pct_old) {
                    //set("fuelneed_bg1", advanced["x_" + "fuelneed" + disp_sel], advanced["y_" + "fuelneed" + disp_sel] + Math.floor(fuelneed_bg1_pct * advanced["h_" + "fuelneed" + disp_sel]), Math.floor(advanced["w_" + "fuelneed" + disp_sel]), advanced["h_" + "fuelneed" + disp_sel] - Math.floor(fuelneed_bg1_pct * advanced["h_" + "fuelneed" + disp_sel]), advanced["f_" + "fuelneed" + disp_sel] / dashboard_ref_w);
                    do_set_boxes("fuelneed_bg1", "fuelneed", disp_sel, 0, fuelneed_bg1_pct, 1, 1);
                }
                fuelneed_bg1_pct_old = fuelneed_bg1_pct;

                if (advanced["perso_font_color_" + "fuelneed" + disp_sel]) {
                    set_style_color("fuelneed", advanced["font_color_" + "fuelneed" + disp_sel]);
                } else {
                    if (donnees.estim_status == 0 || donnees.fuel_accurate != 1) {
                        set_style_color("fuelneed", "#666666");
                    } else {
                        if (fuelneed_bg1_pct == 0) {
                            set_style_color("fuelneed", "#ffffff");
                        } else {
                            set_style_color("fuelneed", "#000000");
                        }
                    }
                }
            }
        }

        if (advanced["disp_" + "fuelneed1" + disp_sel]) {
            if (fuelneed1_bg1_pct != fuelneed1_bg1_pct_old) {
                //set("fuelneed1_bg1", advanced["x_" + "fuelneed1" + disp_sel], advanced["y_" + "fuelneed1" + disp_sel] + Math.floor(fuelneed1_bg1_pct * advanced["h_" + "fuelneed1" + disp_sel]), Math.floor(advanced["w_" + "fuelneed1" + disp_sel]), advanced["h_" + "fuelneed1" + disp_sel] - Math.floor(fuelneed1_bg1_pct * advanced["h_" + "fuelneed1" + disp_sel]), advanced["f_" + "fuelneed1" + disp_sel] / dashboard_ref_w);
                do_set_boxes("fuelneed1_bg1", "fuelneed1", disp_sel, 0, fuelneed1_bg1_pct, 1, 1);
            }
            fuelneed1_bg1_pct_old = fuelneed1_bg1_pct;

            if (advanced["perso_font_color_" + "fuelneed1" + disp_sel]) {
                set_style_color("fuelneed1", advanced["font_color_" + "fuelneed1" + disp_sel]);
            } else {
                if (donnees.estim_status == 0 || donnees.fuel_accurate != 1) {
                    set_style_color("fuelneed1", "#666666");
                } else {
                    if (fuelneed1_bg1_pct == 0) {
                        set_style_color("fuelneed1", "#ffffff");
                    } else {
                        set_style_color("fuelneed1", "#000000");
                    }
                }
            }
        }

        if (advanced["disp_" + "fuelneed5" + disp_sel]) {
            if (fuelneed5_bg1_pct != fuelneed5_bg1_pct_old) {
                //set("fuelneed5_bg1", advanced["x_" + "fuelneed5" + disp_sel], advanced["y_" + "fuelneed5" + disp_sel] + Math.floor(fuelneed5_bg1_pct * advanced["h_" + "fuelneed5" + disp_sel]), Math.floor(advanced["w_" + "fuelneed5" + disp_sel]), advanced["h_" + "fuelneed5" + disp_sel] - Math.floor(fuelneed5_bg1_pct * advanced["h_" + "fuelneed5" + disp_sel]), advanced["f_" + "fuelneed5" + disp_sel] / dashboard_ref_w);
                do_set_boxes("fuelneed5_bg1", "fuelneed5", disp_sel, 0, fuelneed5_bg1_pct, 1, 1);
            }
            fuelneed5_bg1_pct_old = fuelneed5_bg1_pct;

            if (advanced["perso_font_color_" + "fuelneed5" + disp_sel]) {
                set_style_color("fuelneed5", advanced["font_color_" + "fuelneed5" + disp_sel]);
            } else {
                if (donnees.estim_status == 0 || donnees.fuel_accurate != 1) {
                    set_style_color("fuelneed5", "#666666");
                } else {
                    if (fuelneed5_bg1_pct == 0) {
                        set_style_color("fuelneed5", "#ffffff");
                    } else {
                        set_style_color("fuelneed5", "#000000");
                    }
                }
            }
        }

        if (donnees.pro_v == 1 || donnees.try_v == 1 || donnees.pro_v == undefined) {

            if (advanced["disp_" + "fuelneed" + disp_sel] && !fuelneed_replaced) {
                if (conso > 0.01) {
                    if (fuelfactor * coef_fuel * fuelneed > 9999) {
                        set_inner_html("fuelneed", "9999");
                    } else if (fuelfactor * coef_fuel * fuelneed > 999) {
                        set_inner_html("fuelneed", (fuelfactor * coef_fuel * fuelneed).toFixed(0));
                    } else {
                        set_inner_html("fuelneed", (fuelfactor * coef_fuel * fuelneed).toFixed(fuel_decimal));
                    }
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("fuelneed", "--");
                    } else {
                        set_inner_html("fuelneed", (88.888).toFixed(fuel_decimal));
                    }
                }
            }
            if (advanced["disp_" + "fuelneed1" + disp_sel]) {
                if (conso1 > 0.01)
                    if (fuelfactor * coef_fuel * fuelneed1 > 9999) {
                        set_inner_html("fuelneed1", "9999");
                    } else if (fuelfactor * coef_fuel * fuelneed1 > 999) {
                        set_inner_html("fuelneed1", (fuelfactor * coef_fuel * fuelneed1).toFixed(0));
                    } else {
                        set_inner_html("fuelneed1", (fuelfactor * coef_fuel * fuelneed1).toFixed(fuel_decimal));
                    }
                else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("fuelneed1", "--");
                    } else {
                        set_inner_html("fuelneed1", (88.888).toFixed(fuel_decimal));
                    }
                }
            }
            if (advanced["disp_" + "fuelneed5" + disp_sel]) {
                if (conso5 > 0.01)
                    if (fuelfactor * coef_fuel * fuelneed5 > 9999) {
                        set_inner_html("fuelneed5", "9999");
                    } else if (fuelfactor * coef_fuel * fuelneed5 > 999) {
                        set_inner_html("fuelneed5", (fuelfactor * coef_fuel * fuelneed5).toFixed(0));
                    } else {
                        set_inner_html("fuelneed5", (fuelfactor * coef_fuel * fuelneed5).toFixed(fuel_decimal));
                    }
                else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("fuelneed5", "--");
                    } else {
                        set_inner_html("fuelneed5", (88.888).toFixed(fuel_decimal));
                    }
                }
            }
        } else {
            set_inner_html("fuelneed", "buy pro");
            set_inner_html("fuelneed1", "buy pro");
            set_inner_html("fuelneed5", "buy pro");
        }


        if (advanced["disp_" + "brake2" + disp_sel]) {
            if (donnees.b != undefined) {
                document.getElementById("brake2_").style.right = (100 - donnees.b) + "%";
                if (donnees.b == 0) {
                    //document.getElementById("brake2_text").style.color = "#000000";
                    set_style_color("brake2_text", "#000000");
                } else if (donnees.b == 100) {
                    //document.getElementById("brake2_text").style.color = "#c80000";
                    set_style_color("brake2_text", "#c80000");
                } else {
                    //document.getElementById("brake2_text").style.color = "#ffffff";
                    set_style_color("brake2_text", "#ffffff");
                }
            }
        }
        if (advanced["disp_" + "brake3" + disp_sel]) {
            if (donnees.b != undefined) {
                document.getElementById("brake3_").style.right = (100 - donnees.b) + "%";
                //document.getElementById("brake3_text").innerHTML = (100 - donnees.b).toFixed(1) + "%&nbsp;";
                set_inner_html("brake3_text", (donnees.b).toFixed(1) + "%&nbsp;");
                if (donnees.b == 0) {
                    //document.getElementById("brake3_text").style.color = "#000000";
                    set_style_color("brake3_text", "#000000");
                } else if (donnees.b == 100) {
                    //document.getElementById("brake3_text").style.color = "#0000c8";
                    set_style_color("brake3_text", "#c80000");
                } else {
                    //document.getElementById("brake3_text").style.color = "#ffffff";
                    set_style_color("brake3_text", "#ffffff");
                }
            }
        }
        if (advanced["disp_" + "throttle2" + disp_sel]) {
            if (donnees.t != undefined) {
                document.getElementById("throttle2_").style.right = (100 - donnees.t) + "%";
                if (donnees.t == 0) {
                    //document.getElementById("throttle2_text").style.color = "#000000";
                    set_style_color("throttle2_text", "#000000");
                } else if (donnees.t == 100) {
                    //document.getElementById("throttle2_text").style.color = "#00a800";
                    set_style_color("throttle2_text", "#00a800");
                } else {
                    //document.getElementById("throttle2_text").style.color = "#ffffff";
                    set_style_color("throttle2_text", "#ffffff");
                }
            }
        }
        if (advanced["disp_" + "throttle3" + disp_sel]) {
            if (donnees.t != undefined) {
                document.getElementById("throttle3_").style.right = (100 - donnees.t) + "%";
                //document.getElementById("throttle3_text").innerHTML = (100 - donnees.b).toFixed(1) + "%&nbsp;";
                set_inner_html("throttle3_text", (donnees.t).toFixed(1) + "%&nbsp;");
                if (donnees.t == 0) {
                    //document.getElementById("throttle3_text").style.color = "#000000";
                    set_style_color("throttle3_text", "#000000");
                } else if (donnees.t == 100) {
                    //document.getElementById("throttle3_text").style.color = "#0000c8";
                    set_style_color("throttle3_text", "#00a800");
                } else {
                    //document.getElementById("throttle3_text").style.color = "#ffffff";
                    set_style_color("throttle3_text", "#ffffff");
                }
            }
        }
        if (advanced["disp_" + "clutch2" + disp_sel]) {
            if (donnees.clutch != undefined) {
                document.getElementById("clutch2_").style.right = (donnees.clutch) + "%";
                //document.getElementById("clutch2_text").innerHTML = (100 - donnees.clutch).toFixed(1) + "%&nbsp;";
                set_inner_html("clutch2_text", (100 - donnees.clutch).toFixed(1) + "%&nbsp;");
                if (donnees.clutch == 100) {
                    //document.getElementById("clutch2_text").style.color = "#000000";
                    set_style_color("clutch2_text", "#000000");
                } else if (donnees.clutch == 0) {
                    //document.getElementById("clutch2_text").style.color = "#0000c8";
                    set_style_color("clutch2_text", "#0000c8");
                } else {
                    //document.getElementById("clutch2_text").style.color = "#ffffff";
                    set_style_color("clutch2_text", "#ffffff");
                }
            }
        }
        if (advanced["disp_" + "ffb2" + disp_sel]) {
            if (donnees.ffb != undefined && donnees.ffbpct != undefined) {
                document.getElementById("ffb2_").style.right = (100 - donnees.ffbpct) + "%";
                //document.getElementById("ffb2_text").innerHTML = donnees.ffb + " Nm&nbsp;";
                set_inner_html("ffb2_text", donnees.ffb + " Nm&nbsp;");
                if (donnees.ffbpct == 0) {
                    //document.getElementById("ffb2_text").style.color = "#000000";
                    set_style_color("ffb2_text", "#000000");
                } else if (donnees.ffbpct == 100) {
                    //document.getElementById("ffb2_text").style.color = "#1757ee";
                    set_style_color("ffb2_text", "#1757ee");
                } else {
                    //document.getElementById("ffb2_text").style.color = "#ffffff";
                    set_style_color("ffb2_text", "#ffffff");
                }
            }
        }

        if (advanced["disp_" + "perfs" + disp_sel]) {
            if (donnees.pss != undefined) {
                set_inner_html("perfs_dist", donnees.pss);
            }
        }

        // Indication des pits
        if (advanced["pitbox_bar_on"]) {  // on traite seulement si pitbar activée
            if (donnees.isontrack != 1 || ( (donnees.cts < 1 || donnees.cts > 2) && !donnees.p) ) {
                // on ne traite pas si on n'est pas sur la piste
                // ou si on n'est pas dans la voie des stands et qu'on est sur la piste
            } else {
                if (donnees.pitpct != undefined && donnees.dp != undefined) {

                    dp_diff = ((donnees.dp + 2) % 1) - donnees.pitpct;  // ici on fait +2 car si le dp est négatif, le % 1 en javascript ne va pas le ramener entre 0 et 1
                    if (dp_diff > 0.5) {
                        dp_diff -= 1;
                    }
                    dp_diff = dp_diff * donnees.dtrack;
                    //console.log(dp_diff)

                    //document.getElementById("pitbar8").style.top = (1 - 0.111 - 0.222) * window_innerHeight * (1 + dp_diff / 12.5) + "px";
                    set_style_top("pitbar8", (1 - 0.111 - 0.222) * window_innerHeight * (1 + dp_diff / 12.5) + "px");
                    //document.getElementById("pitbar16").style.top = (1 - 0.111 - 0.222) * window_innerHeight * (1 + dp_diff / 25) + "px";
                    set_style_top("pitbar16", (1 - 0.111 - 0.222) * window_innerHeight * (1 + dp_diff / 25) + "px");
                    //document.getElementById("pitbar32").style.top = (1 - 0.111 - 0.222) * window_innerHeight * (1 + dp_diff / 50) + "px";
                    set_style_top("pitbar32", (1 - 0.111 - 0.222) * window_innerHeight * (1 + dp_diff / 50) + "px");
                    //document.getElementById("pitbar64").style.top = (1 - 0.111 - 0.222) * window_innerHeight * (1 + dp_diff / 100) + "px";
                    set_style_top("pitbar64", (1 - 0.111 - 0.222) * window_innerHeight * (1 + dp_diff / 100) + "px");
                    //document.getElementById("pitbar64").innerHTML = dp_diff.toFixed(2);
                    set_inner_html("pitbar64", dp_diff.toFixed(2));
                } else {
                    //document.getElementById("pitbar8").style.top = window_innerHeight + 1 + "px";
                    set_style_top("pitbar8", window_innerHeight + 1 + "px");
                    //document.getElementById("pitbar16").style.top = window_innerHeight + 1 + "px";
                    set_style_top("pitbar16", window_innerHeight + 1 + "px");
                    //document.getElementById("pitbar32").style.top = window_innerHeight + 1 + "px";
                    set_style_top("pitbar32", window_innerHeight + 1 + "px");
                    //document.getElementById("pitbar64").style.top = window_innerHeight + 1 + "px";
                    set_style_top("pitbar64", window_innerHeight + 1 + "px");
                    //document.getElementById("pitbar64").innerHTML = "";
                    set_inner_html("pitbar64", "");
                }
            }
        }

        /*if (1 + dp_diff / 5 > 1) {
            document.getElementById("pitbar0").style.backgroundColor = "#ffff00"
        } else {
            document.getElementById("pitbar0").style.backgroundColor = "#ffffff"
        }
        if ((1 - 0.111 - 0.222) * (1 + dp_diff / 5) > 1 ) {
            document.getElementById("pitbar0").style.display = "none";
        } else {
            //document.getElementById("pitbar0").style.display = "block";
            document.getElementById("pitbar0").style.display = "none";
        }*/

        // Si on a changé de voiture, on réinitialise les données d'optimisations de rapport de boite
        // Et on affiche ou efface certains blocs en fonction de la voiture
        if (donnees.carname != carname) {
            carname = donnees.carname;
            responsive_dim();
        }


        // On regarde s'il faut afficher l'overview du dashboard light
        // REM : list_param_id est défini dans config.js
        for (var name in list_param_id) {
            if (name in param_overview_tstamp && (Date.now() - param_overview_tstamp[name] < 2000)) {
                //console.log(name)
                //console.log(name, param_overview_tstamp[name])
                param_overview[name] = 1;
            } else {
                param_overview[name] = 0;
            }
        }


        // Engine Warnings
        water_warn = 0;
        if (param_overview["water_temp_alert"]) {
            water_warn = 2;  // le 2 c'est pour qu'on sache que c'est une preview
        }
        oil_warn = 0;
        if (param_overview["oil_temp_alert"]) {
            oil_warn = 2;  // le 2 c'est pour qu'on sache que c'est une preview
        }
        pit_speed_limiter = 0;
        if (donnees.warn != undefined) {
            //if (donnees.warn.slice(-1) == "1") water_warn = 1;
            //if (donnees.warn.slice(-3, -2) == "1") oil_warn = 1;
            if (donnees.warn.slice(-5, -4) == "1") pit_speed_limiter = 1;
        }
        // OIL > 140° C et WATER > 130° C
        if ((donnees.oil >= 140 || oil_warn == 2) && (!(advanced["oil_temp_alert_light_blink"]) || (Date.now() % 500) <= 250)) {  // on fait clignotter
            oil_warn = 1;
        }
        if (oil_warn == 2) {  // si on est resté à 2 c'est qu'on ne l'active pas
            oil_warn = 0;
        }
        //if ((donnees.w >= 130 || water_warn == 2) && Math.abs((Date.now() % 500) - 375) <= 125) {
        if ((donnees.w >= 130 || water_warn == 2) && (!(advanced["water_temp_alert_light_blink"]) || Math.abs((Date.now() % 500) - 375) <= 125)) {
            water_warn = 1;
        }
        if (water_warn == 2) {  // si on est resté à 2 c'est qu'on ne l'active pas
            water_warn = 0;
        }

        // Boussole
        if(advanced["disp_" + "compass" + disp_sel]) {
            if (donnees.north != 99) {
                //compass_w = w * 128 / 1280;  // valeur du dashboard par défaut

                //compass_w = Math.max(1, wh(w * advanced["x_" + "compass" + disp_sel] / dashboard_ref_w, w * advanced["w_" + "compass" + disp_sel] / dashboard_ref_w));
                //compass_h = Math.max(1, wh(w * advanced["y_" + "compass" + disp_sel] / dashboard_ref_w, w * advanced["h_" + "compass" + disp_sel] / dashboard_ref_w));
                compass_w = context_compass.canvas.width;
                compass_h = context_compass.canvas.height;

                compass_rayon = Math.min(compass_w, compass_h) / 2;

                context_compass.clearRect(0, 0, compass_w, compass_h);

                // Dessin de la flèche indiquant la direction du nord
                compass = coord_compass(donnees.yaw + donnees.north, compass_rayon, "northL");
                draw(compass, "#ff0000", 0);
                compass = coord_compass(donnees.yaw + donnees.north, compass_rayon, "northR");
                draw(compass, "#ff0000", 0);

                // Dessin de la flèche indiquant la direction du vent
                compass = coord_compass(donnees.yaw + donnees.north + donnees.winddir, compass_rayon, "wind");
                draw(compass, "rgba(0,128,255,0.75)", 0);
            }
        }

        if (advanced["disp_" + "delta_pre" + disp_sel] || advanced["disp_" + "delta_post" + disp_sel] || advanced["disp_" + "pre_rel" + disp_sel] || advanced["disp_" + "post_rel" + disp_sel]) {
            // Update des delta graphs
            deltas_and_gapcolor();
        }

        if (donnees.rpm != undefined && advanced["disp_" + "rpm" + disp_sel]) {
            //document.getElementById("rpm").innerHTML = donnees.rpm.toFixed(0);
            set_inner_html("rpm", donnees.rpm.toFixed(0));
        }


        if (donnees.gr != undefined && advanced["disp_" + "gear" + disp_sel]) {
            if (donnees.gr == -1)
                donnees.gr = "R";
            if (donnees.gr == 0)
                donnees.gr = "N";
            //document.getElementById("gear").innerHTML = donnees.gr;
            set_inner_html("gear", donnees.gr);
        }

        // Couleur du drapeau (ou indication d'une voiture arrêtée)
        is_cars_stopped_ontrack = false;
        //is_cars_stopped_ontrack = true;  // DEBUG
        cars_stopped_dist = 0;
        // REM : c'est important de tester le donnees_new ici pour le cars_stopped_ontrack car sinon on peut garder une ancienne données
        if (donnees_new.cars_stopped_ontrack != undefined && donnees_new.me_ldp != undefined) {
            for (var i in donnees_new.cars_stopped_ontrack) {
                tmp_ldp_diff = donnees_new.cars_stopped_ontrack[i] - donnees_new.me_ldp;
                if (tmp_ldp_diff < 0) tmp_ldp_diff++;
                tmp_cars_stopped_dist = tmp_ldp_diff * donnees.dtrack;
                if (tmp_cars_stopped_dist > 10 && tmp_cars_stopped_dist <= 400) {  // on avertit si la voiture lente est à moins de 400 mètres.
                    // REM : Le tmp_cars_stopped_dist > 10 sert à éviter de garder l'indication si c'est notre voiture qui est arrêtée ou si on est déjà sur l'accident
                    is_cars_stopped_ontrack = true;
                    //console.log(i, tmp_cars_stopped_dist)
                    if (cars_stopped_dist == 0 || tmp_cars_stopped_dist < cars_stopped_dist) {
                        cars_stopped_dist = tmp_cars_stopped_dist;
                    }
                }
            }
        }

        var disp_flag_light = false;
        var dashboard_flag_type = "none";
        var tmp_dashboard_flag_type = "none";
        var dashboard_light_highest_order_priority = -1;
        var tmp_order_priority = -1;

        // Valeurs par défaut si iRacing n'est pas lancé pour éviter d'avoir l'overview bloqué
        if (!donnees.is_iracing_started) {
            donnees.flag = "0b000000000000000000000000000000";
            is_cars_stopped_ontrack = 0;
        }

        if (param_overview["yellowflag"]) {
            donnees.flag = "0b100000000000001000000000000000";
        }
        if (param_overview["greenflag"]) {
            donnees.flag = "0b100000000000000000000000000100";
        }
        if (param_overview["blueflag"]) {
            donnees.flag = "0b100000000000000000000000100000";
        }
        if (param_overview["whiteflag"]) {
            donnees.flag = "0b100000000000000000000000000010";
        }
        if (param_overview["car_stopped_ontrack"] || param_overview["dashboard_light"]) {
            donnees.flag = "0b100000000000000000000000000000";
            is_cars_stopped_ontrack = 1;
            cars_stopped_dist = 888;
        }

        // DEBUG
        //donnees.flag = "0b10000000000000000000000100000";  // blue flag
        //donnees.flag = "0b100000000000000000000000000100";  // green flag
        //donnees.flag = "0b100000000000001000000000100100";  // yellow, blue & green flags
        //donnees.flag = "0b100000000000001000000000000000";  // yellow
        //donnees.flag = "0b100000000000000000000000000010";  // white flags
        //is_cars_stopped_ontrack = 1;

        if (donnees.flag != undefined || is_cars_stopped_ontrack) {

            text_flag = "";

            if (is_cars_stopped_ontrack) {
                tmp_dashboard_flag_type = "car_stopped_ontrack";
                tmp_order_priority = Math.max(0, advanced[tmp_dashboard_flag_type + "_light_priority"]);  // REM: on ignore les valeurs inférieures à 0
                //if (advanced["car_stopped_ontrack_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority) && ( !(advanced[tmp_dashboard_flag_type + "_light_blink"]) || (Date.now() % 500) <= 250)) {
                // REM le blink est gérer plus loin
                if (advanced["car_stopped_ontrack_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority)) {
                    disp_flag_light = 1;
                    dashboard_flag_type = "car_stopped_ontrack";
                    //bg = "#ffcc00";
                    bg = advanced[dashboard_flag_type + "_light_color"];
                    text_flag = '<div style="vertical-align:middle; display:inline-block;font-size: ' + 0.2*advanced["car_stopped_ontrack_light_text_coef"] + 'em; line-height:100%;">SLOW CAR<br/>' + cars_stopped_dist.toFixed(0) + 'm<br/>&nbsp;</div>';  // Car stopped on track (Slow Car)
                    dashboard_light_highest_order_priority = tmp_order_priority;
                }
            }
            if (donnees.flag.slice(-4, -3) == "1") {
                tmp_dashboard_flag_type = "yellowflag";
                tmp_order_priority = Math.max(0, advanced[tmp_dashboard_flag_type + "_light_priority"]);  // REM: on ignore les valeurs inférieures à 0
                //if (advanced["yellowflag_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority) && ( !(advanced[tmp_dashboard_flag_type + "_light_blink"]) || (Date.now() % 500) <= 250)) {
                // REM le blink est gérer plus loin
                if (advanced["yellowflag_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority)) {
                    disp_flag_light = 1;
                    dashboard_flag_type = "yellowflag";
                    //bg = "#ffff00";  // yellow
                    bg = advanced[dashboard_flag_type + "_light_color"];
                    text_flag = "";
                    dashboard_light_highest_order_priority = tmp_order_priority;
                }
            }
            if (donnees.flag.slice(-9, -8) == "1") {
                tmp_dashboard_flag_type = "yellowflag";
                tmp_order_priority = Math.max(0, advanced[tmp_dashboard_flag_type + "_light_priority"]);  // REM: on ignore les valeurs inférieures à 0
                //if (advanced["yellowflag_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority) && ( !(advanced[tmp_dashboard_flag_type + "_light_blink"]) || (Date.now() % 500) <= 250)) {
                // REM le blink est gérer plus loin
                if (advanced["yellowflag_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority)) {
                    disp_flag_light = 1;
                    dashboard_flag_type = "yellowflag";
                    //bg = "#ffff00";  // yellow waving
                    bg = advanced[dashboard_flag_type + "_light_color"];
                    text_flag = "";
                    dashboard_light_highest_order_priority = tmp_order_priority;
                }
            }
            if (donnees.flag.slice(-15, -14) == "1") {
                tmp_dashboard_flag_type = "yellowflag";
                tmp_order_priority = Math.max(0, advanced[tmp_dashboard_flag_type + "_light_priority"]);  // REM: on ignore les valeurs inférieures à 0
                //if (advanced["yellowflag_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority) && ( !(advanced[tmp_dashboard_flag_type + "_light_blink"]) || (Date.now() % 500) <= 250)) {
                // REM le blink est gérer plus loin
                if (advanced["yellowflag_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority)) {
                    disp_flag_light = 1;
                    dashboard_flag_type = "yellowflag";
                    //bg = "#ffff00";  // caution
                    bg = advanced[dashboard_flag_type + "_light_color"];
                    text_flag = "<div style='font-size: " + advanced["yellowflag_light_text_coef"] + "em;'>SC</div>";  // Safety Car
                    dashboard_light_highest_order_priority = tmp_order_priority;
                }
            }
            if (donnees.flag.slice(-16, -15) == "1") {
                tmp_dashboard_flag_type = "yellowflag";
                tmp_order_priority = Math.max(0, advanced[tmp_dashboard_flag_type + "_light_priority"]);  // REM: on ignore les valeurs inférieures à 0
                //if (advanced["yellowflag_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority) && ( !(advanced[tmp_dashboard_flag_type + "_light_blink"]) || (Date.now() % 500) <= 250)) {
                // REM le blink est gérer plus loin
                if (advanced["yellowflag_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority)) {
                    disp_flag_light = 1;
                    dashboard_flag_type = "yellowflag";
                    //bg = "#ffff00";  // caution waving
                    bg = advanced[dashboard_flag_type + "_light_color"];
                    text_flag = "<div style='font-size: " + advanced["yellowflag_light_text_coef"] + "em;'>SC</div>";  // Safety Car
                    dashboard_light_highest_order_priority = tmp_order_priority;
                }
            }
            if (donnees.flag.slice(-6, -5) == "1") {
                tmp_dashboard_flag_type = "blueflag";
                tmp_order_priority = Math.max(0, advanced[tmp_dashboard_flag_type + "_light_priority"]);  // REM: on ignore les valeurs inférieures à 0
                //if (advanced["blueflag_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority) && ( !(advanced[tmp_dashboard_flag_type + "_light_blink"]) || (Date.now() % 500) <= 250)) {
                // REM le blink est gérer plus loin
                if (advanced["blueflag_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority)) {
                    disp_flag_light = 1;
                    dashboard_flag_type = "blueflag";
                    //bg = "#0000ff";  // blue
                    bg = advanced[dashboard_flag_type + "_light_color"];
                    text_flag = "";
                    dashboard_light_highest_order_priority = tmp_order_priority;
                }
            }
            if (donnees.flag.slice(-2, -1) == "1") {
                tmp_dashboard_flag_type = "whiteflag";
                tmp_order_priority = Math.max(0, advanced[tmp_dashboard_flag_type + "_light_priority"]);  // REM: on ignore les valeurs inférieures à 0
                //if (advanced["whiteflag_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority) && ( !(advanced[tmp_dashboard_flag_type + "_light_blink"]) || (Date.now() % 500) <= 250)) {
                // REM le blink est gérer plus loin
                if (advanced["whiteflag_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority)) {
                    disp_flag_light = 1;
                    dashboard_flag_type = "whiteflag";
                    //bg = "#ffffff";  // white
                    bg = advanced[dashboard_flag_type + "_light_color"];
                    text_flag = "";
                    dashboard_light_highest_order_priority = tmp_order_priority;
                }
            }
            if (donnees.flag.slice(-3, -2) == "1") {
                tmp_dashboard_flag_type = "greenflag";
                tmp_order_priority = Math.max(0, advanced[tmp_dashboard_flag_type + "_light_priority"]);  // REM: on ignore les valeurs inférieures à 0
                //if (advanced["greenflag_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority) && ( !(advanced[tmp_dashboard_flag_type + "_light_blink"]) || (Date.now() % 500) <= 250)) {
                // REM le blink est gérer plus loin
                if (advanced["greenflag_light_activated"] && (dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority)) {
                    disp_flag_light = 1;
                    dashboard_flag_type = "greenflag";
                    //bg = "#00ff00";  // green
                    bg = advanced[dashboard_flag_type + "_light_color"];
                    text_flag = "";
                    dashboard_light_highest_order_priority = tmp_order_priority;
                }
            }
            if (dashboard_light_highest_order_priority == -1) {
                dashboard_flag_type = "none";
                bg = "#bbbbbb";  // autres
            }

            if (bg != bg_flag_old) {  // si on a changé de couleur de drapeau
                bg_flag_start_time = Date.now() / 1000;
            }
            // REM : en option, après un certain délais en secondes on enlève l'affichage du drapeau
            if (Date.now() / 1000 - bg_flag_start_time < advanced["switch_off_flags_auto_delay"] || is_cars_stopped_ontrack || !advanced["switch_off_flags_auto"]) {
                bg_flag = bg;
            } else {
                bg_flag = "#bbbbbb";
                dashboard_flag_type = "none";
                text_flag = "";
            }
            bg_flag_old = bg;

            //document.getElementById("weather").style.backgroundColor = bg;
            /*if (advanced["disp_" + "weather" + disp_sel]) {
                change_bg("weather", bg, advanced["bg_" + "weather" + disp_sel]);
                set_style_color("weather", font_coul_on_bg(bg));
            }*/
        }

        if (donnees.shift != undefined) {
            if (shiftlight_mode == 1) {
                shift = donnees.shift[1];
            } else {
                shift = donnees.shift[0];
            }

            // On détermine le rpm optimal pour chaque vitesse
            if (shift_old != 1 && donnees.shift[1] == 1 && donnees.gr == gear_old && donnees.rpm > rpm_old && donnees.s > speed_old) {
                gear_[donnees.gr] = rpm_old;
            }

            //if (donnees.shift[1] == 1 || (donnees.shift[1] == 0 && donnees.s < speed_old)) {
            // REM : j'ai enlevé la condition ci-dessus sinon le gear_ ne se mettant pas à jour si on ne ralentissait pas
                shift_old = donnees.shift[1];
            //}
        }

        // On détermine la vitesse maximale atteinte dans un rapport
        if (donnees.gr in maxspeed_) {
            if (donnees.s > maxspeed_[donnees.gr]) {
                maxspeed_[donnees.gr] = donnees.s
            }
        } else {
            maxspeed_[donnees.gr] = donnees.s
        }

        rpm_old = donnees.rpm;
        gear_old = donnees.gr;
        if (shiftlight_mode == 1) {
            if (donnees.rpm >= gear_[donnees.gr]) {
                shift2 = 1;
            } else {
                shift2 = 0;
            }
        } else {
            shift2 = shift
        }


        // DEBUG
        //disp_flag_light = true;
        //bg_flag = "#00ff00";
        //dashboard_flag_type = "car_stopped_ontrack";
        //text_flag = '<div style="vertical-align:middle; display:inline-block;font-size: 0.2em; line-height:1.2em;">SLOW CAR<br/>' + 275 + 'm</div>';
        //shift2 = 1;
        //donnees.gr = 2;
        //


        if (donnees.rpm != undefined && advanced["disp_" + "rpm_leds" + disp_sel]) {
            //red_rpm = donnees.rpm_first;
            if (donnees.gear_ != undefined) {
                if(donnees.gr >= 1) {
                    red_rpm = donnees.gear_[donnees.gr];
                } else {
                    red_rpm = donnees.gear_[1];
                }
            }
            //console.log(red_rpm)
            // On vérifie que ce n'est pas trop bas par rapport au max
            //if (red_rpm / max_rpm < 0.8) {
            //    red_rpm = 0.8 * max_rpm;
            //}
            //rpm_coef_a = 4 / (max_rpm - red_rpm);

            if (donnees.rpm_redline != undefined) {
                max_rpm = donnees.rpm_redline;  // important de le mettre à jour tout le temps car sinon on peut avoir des valeurs absurdes quand le red_rpm est à 99999
            }
            if (red_rpm >= max_rpm && red_rpm < 20000) {  // on s'assure que le red_rpm n'était pas absurde
                max_rpm = red_rpm / 0.80;
            }

            // La 5ème led s'allume quand on atteint le red_rpm
            //rpm_coef_a = 7.5 / (max_rpm - red_rpm);
            //rpm_coef_b = 12 - rpm_coef_a * max_rpm;
            //rpm_coef_a = (12.5 - rpm_leds_N_red) / (max_rpm - red_rpm);
            //rpm_coef_b = 12 - rpm_coef_a * max_rpm;
            //num_led = (rpm_coef_a * donnees.rpm + rpm_coef_b).toFixed(0);

            // On élimine les valeurs incohérentes
            if (rpm_leds_N_red < 1) rpm_leds_N_red = 1;
            if (rpm_leds_N_red > 12) rpm_leds_N_red = 12;
            if (rpm_leds_led1_pct < 0) rpm_leds_led1_pct = 0;
            if (rpm_leds_led1_pct > 1) rpm_leds_led1_pct = 1;
            //console.log(rpm_leds_N_red, rpm_leds_led1_pct);

            var led1_rpm = rpm_leds_led1_pct * red_rpm
            if (donnees.rpm < led1_rpm) {
                //num_led = ( 1 / led1_rpm * donnees.rpm ).toFixed(0);
                num_led = 0;
            }
            //console.log(led1_rpm);

            if (led1_rpm <= donnees.rpm && donnees.rpm < red_rpm) {
                num_led = parseInt(( (rpm_leds_N_red - 0.5 - (1 - 0.5)) / (red_rpm -  led1_rpm) * (donnees.rpm - led1_rpm) + 1 - 0.5 ).toFixed(0));
            }
            if (red_rpm <= donnees.rpm) {
                //num_led = parseInt(( (11.6 - (rpm_leds_N_red - 0.5)) / (max_rpm -  red_rpm) * (donnees.rpm - red_rpm) + rpm_leds_N_red - 0.5).toFixed(0));
                // J'ai mis 13.1 au lieu de 11.6 sinon la dernière LED bleue ne s'allume quasiment jamais
                num_led = parseInt(( (13.1 - (rpm_leds_N_red - 0.5)) / (max_rpm -  red_rpm) * (donnees.rpm - red_rpm) + rpm_leds_N_red - 0.5).toFixed(0));
            }
            //console.log(donnees.rpm, num_led)
            //console.log(num_led)

            if (pit_speed_limiter == 1 && donnees.isontrack == 1 && advanced["rpm_led_in_pits2_" + "rpm_leds" + disp_sel]) {
                // Si pit limiter activé
                if(donnees.p) {
                    for (i = 1; i <= 12; i++) {
                        //set_style_bg("led" + i, "#ff0088");
                        set_style_bg("led" + i, led_on_speed_high_color);
                    }
                } else {  // Dès qu'on sort des pits on affiche les leds en vert
                    for (i = 1; i <= 12; i++) {
                        //set_style_bg("led" + i, "#00ff00");
                        set_style_bg("led" + i, led_on_speed_low_color);
                    }
                }
            } else {
                if (pit_speed_limiter == 0 && donnees.p && advanced["rpm_led_in_pits2_" + "rpm_leds" + disp_sel]) {  // Dans les pits, on indique notre vitesse par rapport à la vitesse limite
                //if (true) {  // DEBUG
                    //rpm_led_in_pits();  // ancienne méthode
                    rpm_led_in_pits2();
                } else {
                    for (i = 1; i <= 12; i++) {
                        if (i < num_led) {
                            /*if (dashboard_flag_type != "none") {
                                set_style_bg("led" + i, bg_flag);
                            } else if (oil_warn) {
                                set_style_bg("led" + i, "#df49d8");
                            } else if (water_warn) {
                                set_style_bg("led" + i, "#3c9ffb");
                            } else {*/
                                set_style_bg("led" + i, led_col_on[i - 1]);
                            //}
                        } else if (i == num_led) {
                            set_style_bg("led" + i, led_col_on[i - 1]);
                        } else {
                            /*if (dashboard_flag_type != "none") {
                                set_style_bg("led" + i, bg_flag);
                            } else if (oil_warn) {
                                set_style_bg("led" + i, "#df49d8");
                            } else if (water_warn) {
                                set_style_bg("led" + i, "#3c9ffb");
                            } else {*/
                                set_style_bg("led" + i, led_col_off[i - 1]);
                            //}
                        }
                    }
                }
            }

        }
        // else

        // Pour les overviews :
        if (param_overview["shiftlight"]) {
            shift2 = 1;
            donnees.gr = 8;
        }
        if (param_overview["shiftlight_pitlimiter_inpit"]) {
            pit_speed_limiter = 1;
            donnees.isontrack = 1;
            donnees.p = 1;
        }
        if (param_overview["shiftlight_pitlimiter_outpit"]) {
            pit_speed_limiter = 1;
            donnees.isontrack = 1;
            donnees.p = 0;
        }

        if ((shift2 == 1 && donnees.gr > 0) || (pit_speed_limiter == 1 && donnees.isontrack == 1)) {
        //if (((shift2 == 1 && donnees.gr > 0) || pit_speed_limiter == 1) && (!advanced["disp_" + "rpm_leds" + disp_sel])) {  // On n'affiche pas le shiftlight si les leds sont utilisées
            if(donnees.p || pit_speed_limiter == 0) {
                if (pit_speed_limiter == 1) {
                    if (advanced["pitlimiter_light_on"]) {
                        shiftlight(advanced["pitlimiter_light_inpit_color"], "#ffffff", "");
                    } else {
                        shiftlight_off();
                    }
                } else {
                    shiftlight(advanced["shiftlight_color"], "#ffffff", "");
                }
            } else {
                if (advanced["pitlimiter_light_on"]) {
                    shiftlight(advanced["pitlimiter_light_outpit_color"], "#ffffff", "");
                } else {
                    shiftlight_off();
                }
            }
        } else {
            if (shift == 2 && donnees.gr > 1) {
            //    shiftlight("#00ff88", "#ffffff", "");
            } else if (donnees.gr > 1 && shiftlight_mode == 1) {
                //if (donnees.s > maxspeed_[donnees.gr - 1]) {
                    //shiftlight("#00ff88", "#ffffff", "");
                //} else {
                    shiftlight_off();
                //}
            } else {
                shiftlight_off();
            }
        }

        dashboard_light_highest_order_priority = -1;
        tmp_order_priority = -1;

        if (advanced["math_channel_light_activated"] && (param_overview["math_channel"] || (donnees.math_channel_formula != undefined && window_shortname in donnees.math_channel_formula && donnees.math_channel_formula[window_shortname] != undefined && donnees.math_channel_formula[window_shortname] && donnees.isontrack == 1))) {
            tmp_order_priority = Math.max(0, advanced["math_channel_light_priority"]);  // REM: on ignore les valeurs inférieures à 0
            if ((dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority) && ( !(advanced["math_channel_light_blink"]) || (Date.now() % 500) <= 250)) {
                dashboard_light(advanced["math_channel_light_color"], "");
                dashboard_light_highest_order_priority = tmp_order_priority;
            }
        }
        if (advanced["abs_active_light_activated"] && (param_overview["abs_active"] || (donnees.abs_active != undefined && donnees.abs_active && donnees.isontrack == 1))) {
            tmp_order_priority = Math.max(0, advanced["abs_active_light_priority"]);  // REM: on ignore les valeurs inférieures à 0
            if ((dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority) && ( !(advanced["abs_active_light_blink"]) || (Date.now() % 500) <= 250)) {
                dashboard_light(advanced["abs_active_light_color"], "");
                dashboard_light_highest_order_priority = tmp_order_priority;
            }
        }
        if (advanced["fuel_alert_light_activated"] && (param_overview["fuel_alert"] || (donnees.isontrack == 1 && donnees.f_alert == 1)) && (Date.now() % 500) <= 250) {
            tmp_order_priority = Math.max(0, advanced["fuel_alert_light_priority"]);  // REM: on ignore les valeurs inférieures à 0
            if ((dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority) && ( !(advanced["fuel_alert_light_blink"]) || (Date.now() % 500) <= 250)) {
                dashboard_light(advanced["fuel_alert_light_color"], "");
                dashboard_light_highest_order_priority = tmp_order_priority;
            }
        }
        if (dashboard_flag_type != "none" && disp_flag_light) {
            tmp_order_priority = Math.max(0, advanced[dashboard_flag_type + "_light_priority"]);  // REM: on ignore les valeurs inférieures à 0
            if ((dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority) && ( !(advanced[dashboard_flag_type + "_light_blink"]) || (Date.now() % 500) <= 250)) {
                dashboard_light(bg_flag, text_flag);
                dashboard_light_highest_order_priority = tmp_order_priority;
            }
        }
        if (oil_warn && advanced["oil_temp_alert_light_activated"]) {
            tmp_order_priority = Math.max(0, advanced["oil_temp_alert_light_priority"]);  // REM: on ignore les valeurs inférieures à 0
            if ((dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority) && ( !(advanced["oil_temp_alert_light_blink"]) || (Date.now() % 500) <= 250)) {
                dashboard_light(advanced["oil_temp_alert_light_color"], "");
                dashboard_light_highest_order_priority = tmp_order_priority;
            }
        }
        if (water_warn && advanced["water_temp_alert_light_activated"]) {
            tmp_order_priority = Math.max(0, advanced["water_temp_alert_light_priority"]);  // REM: on ignore les valeurs inférieures à 0
            if ((dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority) && ( !(advanced["water_temp_alert_light_blink"]) || Math.abs((Date.now() % 500) - 375) <= 125)) {
                dashboard_light(advanced["water_temp_alert_light_color"], "");
                dashboard_light_highest_order_priority = tmp_order_priority;
            }
        }
        if ( (param_overview["qualy_not_valid"] || (donnees.styp == "Open Qualify" || donnees.styp == "Lone Qualify") && (donnees.qinv)) && advanced["qualy_not_valid_light_activated"]) {
            tmp_order_priority = Math.max(0, advanced["qualy_not_valid_light_priority"]);  // REM: on ignore les valeurs inférieures à 0
            if ((dashboard_light_highest_order_priority == -1 || tmp_order_priority < dashboard_light_highest_order_priority) && ( !(advanced["qualy_not_valid_light_blink"]) || (Date.now() % 500) <= 250)) {
                dashboard_light(advanced["qualy_not_valid_light_color"], "");  // On allume le dashboard en rouge si le temps de qualif est invalidé suite à un off-track
                dashboard_light_highest_order_priority = tmp_order_priority;
            }
        }
        if (dashboard_light_highest_order_priority == -1) {
            dashboard_light_off();
        }

        /*if (donnees.abs_active) {
            dashboard_light("#0088ff", "");
        } else if (advanced["fuel_alert_light_activated"] && donnees.isontrack == 1 && donnees.f_alert == 1 && (Date.now() % 500) <= 250) {
            dashboard_light("#ff8800", "");
        //} else if (bg_flag != "#bbbbbb" && disp_flag_light) {
        } else if (dashboard_flag_type != "none" && disp_flag_light) {

            dashboard_light(bg_flag, text_flag);

        } else if (oil_warn && advanced["oil_temp_alert_light_activated"]) {
            dashboard_light("#df49d8", "");
        } else if (water_warn && advanced["water_temp_alert_light_activated"]) {
            dashboard_light("#3c9ffb", "");
        } else if ((donnees.styp == "Open Qualify" || donnees.styp == "Lone Qualify") && (donnees.qinv) && advanced["qualy_not_valid_light_activated"]) {
            dashboard_light("#ff0000", "");  // On allume le dashboard en rouge si le temps de qualif est invalidé suite à un off-track
        } else {
            dashboard_light_off();
        }*/

        if (advanced["disp_" + "abs_light" + disp_sel]) {
            if ( ("abs_light" in param_overview && param_overview["abs_light"]) || (donnees.abs_active != undefined && donnees.abs_active && donnees.isontrack == 1) ) {
                if (advanced["perso_bg_color_" + "abs_light" + disp_sel]) {
                    change_bg("abs_light", advanced["bg_color_" + "abs_light" + disp_sel], advanced["bg_" + "abs_light" + disp_sel]);
                } else {
                    change_bg("abs_light", "#0088ff", advanced["bg_" + "abs_light" + disp_sel]);
                }
            } else {
                change_bg("abs_light", "#000000", 0);  // on rend le abs light transparent pour qu'il soit invisible
            }
        }

        if (advanced["disp_" + "oil" + disp_sel] || advanced["disp_" + "water" + disp_sel]) {
            if (oil_warn) {
                if (advanced["perso_bg_color_" + "oil" + disp_sel]) {
                    change_bg("oil", advanced["bg_color_" + "oil" + disp_sel], advanced["bg_" + "oil" + disp_sel]);
                } else {
                    change_bg("oil", "#df49d8", advanced["bg_" + "oil" + disp_sel]);
                }
                if (advanced["perso_font_color_" + "oil" + disp_sel]) {
                    set_style_color("oil", advanced["font_color_" + "oil" + disp_sel]);
                } else {
                    set_style_color("oil", "#000000");
                }
            } else {
                if (advanced["perso_bg_color_" + "oil" + disp_sel]) {
                    change_bg("oil", advanced["bg_color_" + "oil" + disp_sel], advanced["bg_" + "oil" + disp_sel]);
                } else {
                    change_bg("oil", "#6f0968", advanced["bg_" + "oil" + disp_sel]);
                }
                if (advanced["perso_font_color_" + "oil" + disp_sel]) {
                    set_style_color("oil", advanced["font_color_" + "oil" + disp_sel]);
                } else {
                    set_style_color("oil", "#ffffff");
                }
            }

            if (water_warn) {
                if (advanced["perso_bg_color_" + "water" + disp_sel]) {
                    change_bg("water", advanced["bg_color_" + "water" + disp_sel], advanced["bg_" + "water" + disp_sel]);
                } else {
                    change_bg("water", "#3c9ffb", advanced["bg_" + "water" + disp_sel]);
                }
                if (advanced["perso_font_color_" + "water" + disp_sel]) {
                    set_style_color("water", advanced["font_color_" + "water" + disp_sel]);
                } else {
                    set_style_color("water", "#000000");
                }
            } else {
                if (advanced["perso_bg_color_" + "water" + disp_sel]) {
                    change_bg("water", advanced["bg_color_" + "water" + disp_sel], advanced["bg_" + "water" + disp_sel]);
                } else {
                    change_bg("water", "#0c4f8b", advanced["bg_" + "water" + disp_sel]);
                }
                if (advanced["perso_font_color_" + "water" + disp_sel]) {
                    set_style_color("water", advanced["font_color_" + "water" + disp_sel]);
                } else {
                    set_style_color("water", "#ffffff");
                }
            }
        }

        // DEBUG
        //donnees.s = 50
        //donnees.p = 1
        if (donnees.s != undefined && (advanced["disp_" + "speed" + disp_sel] || advanced["disp_" + "pit_speed_diff" + disp_sel])) {
            //document.getElementById("speed").innerHTML = (speedfactor * donnees.s * 3.6).toFixed(0);
            tmp_speed = speedfactor * donnees.s * 3.6;
            tmp_diff = speedfactor * (donnees.s - donnees.pitspeedlimit) * 3.6;
            // DEBUG
            //tmp_diff = 2.1
            if (donnees.p && tmp_speed != 0 && Math.abs(tmp_diff) <= 3.3) {  // à moins de 3.3 km/h de différence avec la vitesse de pit on affiche la différence
                tmp_speed = tmp_diff;
                str_speed = Math.floor(Math.abs(tmp_speed)) + '<span style="display: inline-block; line-height: 100%; font-size: 0.75em;">.' + (Math.floor(Math.abs(tmp_speed * 10)) % 10) + '</span>';
                //str_speed = (Math.floor(tmp_speed * 10) / 10).toFixed(1);
                if (tmp_speed < 0) {
                    str_speed = "-" + str_speed;
                } else {
                    str_speed = "+" + str_speed;
                }
                // On rajoute un code couleur en fonction de la vitesse par rapport à la vitesse max dans les pits
                tmp_col = Math.round(((-donnees.s + donnees.pitspeedlimit) * 3.6 / 2.8) * 64) + 32;  // 2.8 pour une étendue de 2.8 km/h, -1.4km/h (bleu) -0.7 (vert) 0 (gris) +0.7 (rouge) +1.4hm/h (rose)
                if (tmp_col > 64) {
                    tmp_col = 64
                }
                if (tmp_col < 0) {
                    tmp_col = 0
                }
                if (tmp_col <= 0) {
                    if (advanced["disp_" + "speed" + disp_sel]) {
                        if (advanced["perso_bg_color_" + "speed" + disp_sel]) {
                            change_bg("speed", advanced["bg_color_" + "speed" + disp_sel], advanced["bg_" + "speed" + disp_sel]);
                        } else {
                            change_bg("speed", "#ffff00", advanced["bg_" + "speed" + disp_sel]);
                        }
                    }
                    if (advanced["disp_" + "pit_speed_diff" + disp_sel]) {
                        if (advanced["perso_bg_color_" + "pit_speed_diff" + disp_sel]) {
                            change_bg("pit_speed_diff", advanced["bg_color_" + "pit_speed_diff" + disp_sel], advanced["bg_" + "pit_speed_diff" + disp_sel]);
                        } else {
                            change_bg("pit_speed_diff", "#ffff00", advanced["bg_" + "pit_speed_diff" + disp_sel]);
                        }
                    }
                } else if (advanced["disp_" + "pit_speed_diff" + disp_sel]) {
                        if (advanced["perso_bg_color_" + "pit_speed_diff" + disp_sel]) {
                            change_bg("pit_speed_diff", advanced["bg_color_" + "pit_speed_diff" + disp_sel], advanced["bg_" + "pit_speed_diff" + disp_sel]);
                        } else {
                            change_bg("pit_speed_diff", "#000000", advanced["bg_" + "pit_speed_diff" + disp_sel]);
                        }
                }
                tmp_col = couleurs2[tmp_col];
                str_speed0 = str_speed;
                str_speed = '<span style="color: ' + tmp_col + '">' +  str_speed0 + '</span>';
                str_speed_diff = str_speed;
                if (advanced["perso_font_color_" + "pit_speed_diff" + disp_sel]) {
                    str_pit_speed_diff = '<span style="color: ' + advanced["font_color_" + "pit_speed_diff" + disp_sel] + '">' +  str_speed0 + '</span>';
                } else {
                    str_pit_speed_diff = str_speed_diff;
                }

                if (advanced["disp_" + "pit_speed_diff" + disp_sel]) {
                    document.getElementById("pit_speed_diff" + "_box").style.display = "inline-block";
                    document.getElementById("pit_speed_diff" + "_box_border").style.display = "inline-block";
                    document.getElementById("pit_speed_diff" + "_box_no_border").style.display = "inline-block";
                }

            } else {
                str_speed = tmp_speed.toFixed(0);
                str_speed_diff = '';
                str_pit_speed_diff = '';
                if (advanced["disp_" + "pit_speed_diff" + disp_sel]) {
                    change_bg("pit_speed_diff", "#000000", 0);

                    document.getElementById("pit_speed_diff" + "_box").style.display = "none";
                    document.getElementById("pit_speed_diff" + "_box_border").style.display = "none";
                    document.getElementById("pit_speed_diff" + "_box_no_border").style.display = "none";
                }
            }

            if (advanced["disp_" + "speed" + disp_sel]) {
                set_inner_html("speed", str_speed);
            }
            if (advanced["disp_" + "pit_speed_diff" + disp_sel]) {
                set_inner_html("pit_speed_diff", str_pit_speed_diff);
            }

            // REM : speed_unit est utilisé juste pour le compteur donc pas défini ici
            /*if (donnees.u) {
                //$("#speed_unit").html("km/h");
                set_inner_html("speed_unit", "km/h");
            } else {
                //$("#speed_unit").html("m/h");
                set_inner_html("speed_unit", "m/h");
            }*/

        }

        /*if (donnees_new["pre_rc" + _f3_pre] != undefined)
            document.getElementById("pre_rel").innerHTML = reformat_gap(donnees_new["pre_rc" + _f3_pre]) ;
        if (donnees_new["post_rc" + _f3_post] != undefined)
            document.getElementById("post_rel").innerHTML = reformat_gap(donnees_new["post_rc" + _f3_post]) ;*/

        // REM : c'est important d'utiliser donnees_new pour les gap pour éviter de se retrouver avec une ancienne valeur

        if (advanced["disp_" + "pre_rel" + disp_sel] || advanced["disp_" + "post_rel" + disp_sel]) {
            if (donnees.styp == "Race" && (f3_mode_in_race_dashboard == 0 && f3_mode_for_pre == 0)) {
                if (donnees_new.pre_rc != undefined) {
                    //document.getElementById("pre_rel").innerHTML = reformat_gap(donnees_new.pre_rc);
                    set_inner_html("pre_rel", reformat_gap(donnees_new.pre_rc));
                } else {
                    //document.getElementById("pre_rel").innerHTML = "";
                    if (donnees.is_iracing_started) {
                        set_inner_html("pre_rel", "");
                    } else {
                        set_inner_html("pre_rel", "+8.88");
                    }
                }
            } else {
                // En dehors des courses, on affiche l'écart sur la piste
                if (donnees_new.pre_rcf3_f3 != undefined) {
                    //document.getElementById("pre_rel").innerHTML = reformat_gap(donnees_new.pre_rcf3_f3);
                    set_inner_html("pre_rel", reformat_gap(donnees_new.pre_rcf3_f3));
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("pre_rel", "");
                    } else {
                        set_inner_html("pre_rel", "+8.88");
                    }
                }
            }
            if (donnees.styp == "Race" && f3_mode_in_race_dashboard == 0) {
                if (donnees_new.post_rc != undefined) {
                    //document.getElementById("post_rel").innerHTML = reformat_gap(donnees_new.post_rc);
                    set_inner_html("post_rel", reformat_gap(donnees_new.post_rc));
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("post_rel", "");
                    } else {
                        set_inner_html("post_rel", "-8.88");
                    }
                }
            } else {
                if (donnees_new.post_rcf3_f3 != undefined) {
                    //document.getElementById("post_rel").innerHTML = reformat_gap(donnees_new.post_rcf3_f3);
                    set_inner_html("post_rel", reformat_gap(donnees_new.post_rcf3_f3));
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("post_rel", "");
                    } else {
                        set_inner_html("post_rel", "-8.88");
                    }
                }
            }
        }


        if (advanced["disp_" + "me_gap" + disp_sel]) {
            if (donnees.styp == "Race") {
                if (donnees_new.me_gap != undefined) {
                    set_inner_html("me_gap", reformat_gap(donnees_new.me_gap));
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_gap", "");
                    } else {
                        set_inner_html("me_gap", "+8.88");
                    }
                }
            } else {  // en dehors des courses on affiche l'écart entre les best lap
                if (donnees.leader_best != undefined && donnees.leader_best > 0 && donnees.me_b != undefined && donnees.me_b > 0 && donnees.me_b - donnees.leader_best > 0) {  // REM : le gap est forcément positif
                    set_inner_html("me_gap", reformat_gap(donnees.me_b - donnees.leader_best));
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_gap", "");
                    } else {
                        set_inner_html("me_gap", "+8.88");
                    }
                }
            }
        }
        if (advanced["disp_" + "me_cgap" + disp_sel]) {
            if (donnees.styp == "Race") {
                if (donnees_new.me_cgap != undefined) {
                    set_inner_html("me_cgap", reformat_gap(donnees_new.me_cgap));
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_cgap", "");
                    } else {
                        set_inner_html("me_cgap", "+8.88");
                    }
                }
            } else {  // en dehors des courses on affiche l'écart entre les best lap
                if (donnees.cleader_best != undefined && donnees.cleader_best > 0 && donnees.me_b != undefined && donnees.me_b > 0 && donnees.me_b - donnees.cleader_best) {
                    set_inner_html("me_cgap", reformat_gap(donnees.me_b - donnees.cleader_best));
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_cgap", "");
                    } else {
                        set_inner_html("me_cgap", "+8.88");
                    }
                }
            }
        }


        if (advanced["disp_" + "me_current" + disp_sel]) {
            if (donnees.me_current != undefined && donnees.me_current > 0) {
                set_inner_html("me_current", reformat_laptime(donnees.me_current));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_current", "-'--.---");
                } else {
                    set_inner_html("me_current", "8'88.888");
                }
            }
        }


        if (advanced["disp_" + "me_estlaptime" + disp_sel]) {
            if (advanced["estlaptime_mode_" + "me_estlaptime" + disp_sel] == 0) {
                if (donnees.me_b_wo_inc != undefined && donnees.d_b != undefined && donnees.me_b_wo_inc > 0) {
                    set_inner_html("me_estlaptime", reformat_laptime(donnees.me_b_wo_inc + donnees.d_b));
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_estlaptime", "-'--.---");
                    } else {
                        set_inner_html("me_estlaptime", "8'88.888");
                    }
                }
            } else {
                if (donnees.me_l_wo_inc != undefined && donnees.d_l != undefined && donnees.me_l_wo_inc > 0) {
                    set_inner_html("me_estlaptime", reformat_laptime(donnees.me_l_wo_inc + donnees.d_l));
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("me_estlaptime", "-'--.---");
                    } else {
                        set_inner_html("me_estlaptime", "8'88.888");
                    }
                }
            }
        }


        if (donnees.d_b != undefined && advanced["disp_" + "delta_best" + disp_sel]) {
            //document.getElementById("delta_best").innerHTML = reformat_delta(donnees.d_b);
            set_inner_html("delta_best", reformat_delta(donnees.d_b, advanced["perso_font_color_" + "delta_best" + disp_sel]));
        }
        if (donnees.d_l != undefined && advanced["disp_" + "delta_last" + disp_sel]) {
            //document.getElementById("delta_last").innerHTML = reformat_delta(donnees.d_l);
            set_inner_html("delta_last", reformat_delta(donnees.d_l, advanced["perso_font_color_" + "delta_last" + disp_sel]));
        }

        if (advanced["disp_" + "bb" + disp_sel]) {
            if (donnees.bb != undefined) {
                set_inner_html("bb", donnees.bb.toFixed(1));
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("bb", "--");
                } else {
                    set_inner_html("bb", "88.8");
                }
            }
        }
        if (advanced["disp_" + "tc" + disp_sel]) {
            if (donnees.tc != undefined) {
                set_inner_html("tc", donnees.tc);
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("tc", "--");
                } else {
                    set_inner_html("tc", "8");
                }
            }
        }
        if (advanced["disp_" + "tc2" + disp_sel]) {
            if (donnees.tc2 != undefined) {
                set_inner_html("tc2", donnees.tc2);
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("tc2", "--");
                } else {
                    set_inner_html("tc2", "8");
                }
            }
        }
        if (advanced["disp_" + "ffb" + disp_sel]) {
            if (donnees.ffb != undefined) {
                set_inner_html("ffb", donnees.ffb);
            }
        }

        if (advanced["disp_" + "b_cont" + disp_sel]) {
            if (donnees.b != undefined) {
                set_style_top("b", (100 - donnees.b) + "%");
            }
        }
        if (advanced["disp_" + "t_cont" + disp_sel]) {
            if (donnees.t != undefined) {
                set_style_top("t", (100 - donnees.t) + "%");
            }
        }
        if (advanced["disp_" + "c_cont" + disp_sel]) {
            if (donnees.clutch != undefined) {
                set_style_top("c", (donnees.clutch) + "%");
            }
        }
        if (advanced["disp_" + "ffbpct_cont" + disp_sel]) {
            if (donnees.ffbpct != undefined) {
                set_style_top("ffbpct", (100 - donnees.ffbpct) + "%");
            }
        }

        if (carname in car_with_ers_drs) {
            if (advanced["disp_" + "mgum" + disp_sel] || advanced["disp_" + "mgua" + disp_sel] || advanced["disp_" + "mguf" + disp_sel] || advanced["disp_" + "ers" + disp_sel] || advanced["disp_" + "ers_bar" + disp_sel] || advanced["disp_" + "ersco" + disp_sel] || advanced["disp_" + "ers_margin" + disp_sel] || advanced["disp_" + "mgul" + disp_sel] || advanced["disp_" + "mgu" + disp_sel] || advanced["disp_" + "drs" + disp_sel]) {

                //if (donnees.mgua != undefined && donnees.mguf != undefined) {
                if ( (donnees.mguf != undefined && advanced["disp_" + "mguf" + disp_sel]) || (donnees.mgum != undefined && (donnees.carname == "mclarenmp430" || donnees.carname == "mercedesw12" || donnees.carname == "mercedesw13" || donnees.carname == "bmwlmdh") && (advanced["disp_" + "mgum" + disp_sel] || advanced["disp_" + "mgua" + disp_sel])) ) {
                    //mgua = donnees.mgua;
                    mguf = donnees.mguf;
                    //if (mgua < 10) mgua = "0" + mgua;
                    //if (mguf < 10) mguf = "0" + mguf;
                    if (mguf != mguf_old) {
                        //document.getElementById("mguf").innerHTML = mguf;
                        set_inner_html("mguf", mguf);
                    }
                    if (donnees.mgum != mgum_old) {
                        if (donnees.carname == "mclarenmp430") {
                            if (donnees.styp == "Open Qualify" || donnees.styp == "Lone Qualify") {
                                set_inner_html("mgua", "Qual");
                            } else {
                                set_inner_html("mgua", "Race");
                            }
                            set_inner_html("mgum", donnees.mgum);
                        } else if (donnees.carname == "mercedesw12" || donnees.carname == "mercedesw13") {
                            if (donnees.mgum == 0) {  // on est en manuel
                                set_inner_html("mgua", "No");
                                set_inner_html("mgum", 100);
                            } else if (donnees.mgum == 1) {  // on est en Qualy
                                set_inner_html("mgua", "Qual");
                                set_inner_html("mgum", 0);
                            } else if (donnees.mgum == 2) {  // on est en Qualy
                                set_inner_html("mgua", "Att.");
                                set_inner_html("mgum", 0);
                            } else if (donnees.mgum == 3) {  // on est en Balanced
                                set_inner_html("mgua", "Bal.");
                                set_inner_html("mgum", 80);
                            } else {  // On est en Build
                                set_inner_html("mgua", "Build");
                                set_inner_html("mgum", 100);
                            }
                        } else if (donnees.carname == "bmwlmdh") {
                            if (donnees.mgum == 0) {  // on est en manuel
                                set_inner_html("mgua", "No");
                                set_inner_html("mgum", 100);
                            } else if (donnees.mgum == 1) {  // on est en Qualy
                                set_inner_html("mgua", "Qual");
                                set_inner_html("mgum", 0);
                            } else if (donnees.mgum == 2) {  // on est en Qualy
                                set_inner_html("mgua", "Att.");
                                set_inner_html("mgum", 0);
                            } else if (donnees.mgum == 3) {  // on est en Balanced
                                set_inner_html("mgua", "Bal.");
                                set_inner_html("mgum", 50);
                            } else {  // On est en Build
                                set_inner_html("mgua", "Build");
                                set_inner_html("mgum", 100);
                            }
                        } else {
                            if (donnees.mgum == 0) {  // on est en manuel
                                set_inner_html("mgua", "Man.");
                            } else if (donnees.mgum == 2) {  // on est en Qualy
                                set_inner_html("mgua", "Qual");
                            } else {  // on est en auto
                                set_inner_html("mgua", "Auto");
                            }
                            if (donnees.mgum != undefined) {
                                if (donnees.mgum == 0) {  // si on est en manuel
                                    change_bg("mguf", "#ffffff", advanced["bg_" + "mguf" + disp_sel]);
                                } else {  // si on est en auto
                                    change_bg("mguf", "#555555", advanced["bg_" + "mguf" + disp_sel]);
                                }
                            }
                        }
                    }
                    mguf_old = mguf;
                    mgum_old = donnees.mgum;
                }

                if (donnees.ers != undefined && (advanced["disp_" + "ers" + disp_sel] || advanced["disp_" + "ers_bar" + disp_sel] || advanced["disp_" + "regen_turn" + disp_sel])) {
                    //document.getElementById("ers").innerHTML = donnees.ers.toFixed(hybrid_decimal);  //
                    set_inner_html("ers", donnees.ers.toFixed(hybrid_decimal));
                    //document.getElementById("ers_bar_").style.top = (100 - donnees.ers) + "%";
                    set_style_top("ers_bar_", (100 - donnees.ers) + "%");
                    if (donnees.ers != ers_old) {
                        if (donnees.nee) {  // si pas assez d'energie
                            ers_bg = "#888888";
                        } else if (donnees.s <= speed_old && donnees.nee == 0 && donnees.ers > 99.9) {
                            ers_bg = "#ff00ff";
                        } else {
                            ers_bg = "#ff0000";
                        }
                        if (ers_bg != ers_bg_old) {
                            //document.getElementById("ers").style.backgroundColor = ers_bg;
                            set_style_bg("ers", ers_bg);
                            if (ers_bg != "888888") {
                                regen_col = ers_bg;
                            } else {
                                regen_col = "#ff0000";
                            }
                            if (advanced["perso_font_color_" + "regen_turn" + disp_sel]) {
                                set_style_color("regen_turn", advanced["font_color_" + "regen_turn" + disp_sel]);
                            } else {
                                set_style_color("regen_turn", regen_col);
                            }
                        }
                        ers_bg_old = ers_bg;
                    }
                    ers_old = donnees.ers;
                }
                if (donnees.ersco != undefined) {
                    signe = "";
                    if (donnees.ersco >= 0) {
                        signe = "+";
                    }
                    //document.getElementById("ersco").innerHTML = signe + donnees.ersco.toFixed(hybrid_decimal);  //
                    set_inner_html("ersco", signe + donnees.ersco.toFixed(hybrid_decimal));
                }
                if (donnees.ers_margin != undefined && advanced["disp_" + "ers_margin" + disp_sel]) {
                    signe = "";
                    if (donnees.ers_delta >= 0) {
                        signe = "+";
                    }
                    //donnees.ers_margin = 50;
                    //donnees.ers_margin_free = 25;
                    //donnees.mgu_margin = 50;
                    //donnees.ers_delta = -99.9;
                    if (donnees.ers_margin > -100) {
                        // Cette mini barre indique à combien de % l'ers sera au mini par rapport au dernier tour
                        if (donnees.ers_margin_free > 0) {
                            tmp_ers_margin = donnees.ers_margin;
                            if (tmp_ers_margin < 0) tmp_ers_margin = 0;
                            tmp_ers_margin_tot = tmp_ers_margin + donnees.ers_margin_free;
                            if (tmp_ers_margin_tot > 100) tmp_ers_margin_tot = 100;
                            document.getElementById("ers_margin_free_bar_").style.left = tmp_ers_margin + "%";
                            document.getElementById("ers_margin_free_bar_").style.right = (100 - tmp_ers_margin_tot) + "%";
                        } else {
                            document.getElementById("ers_margin_free_bar_").style.left = 100 + "%";
                            document.getElementById("ers_margin_free_bar_").style.right = 0 + "%";
                        }
                        if (donnees.ers_margin < 0) {
                            document.getElementById("ers_margin_min_bar_").style.right = 0 + "%";
                            document.getElementById("ers_margin_min_bar_").style.left = (100 + donnees.ers_margin) + "%";
                            //document.getElementById("ers_margin_min_bar_").style.backgroundColor = "#ffff00";
                            set_style_bg("ers_margin_min_bar_", "#ffff00");
                        } else {
                            document.getElementById("ers_margin_min_bar_").style.left = 0 + "%";
                            document.getElementById("ers_margin_min_bar_").style.right = (100 - donnees.ers_margin) + "%";
                            //document.getElementById("ers_margin_min_bar_").style.backgroundColor = "#ff0000";
                            set_style_bg("ers_margin_min_bar_", "#ff0000");
                        }
                        if (donnees.mgu_margin < 0) {
                            document.getElementById("mgu_margin_max_bar_").style.right = 0 + "%";
                            document.getElementById("mgu_margin_max_bar_").style.left = (100 + donnees.mgu_margin) + "%";
                            //document.getElementById("mgu_margin_max_bar_").style.backgroundColor = "#ffffff";
                            set_style_bg("mgu_margin_max_bar_", "#ffffff");
                        } else {
                            document.getElementById("mgu_margin_max_bar_").style.left = 0 + "%";
                            document.getElementById("mgu_margin_max_bar_").style.right = (100 - donnees.mgu_margin) + "%";
                            //document.getElementById("mgu_margin_max_bar_").style.backgroundColor = "#00ff00";
                            set_style_bg("mgu_margin_max_bar_", "#00ff00");
                        }
                    } else {
                        document.getElementById("ers_margin_min_bar_").style.right = 100 + "%";
                        document.getElementById("mgu_margin_max_bar_").style.right = 100 + "%";
                        document.getElementById("ers_margin_free_bar_").style.left = 100 + "%";
                        document.getElementById("ers_margin_free_bar_").style.right = 0 + "%";
                    }
                    if (donnees.ers_delta > -100) {
                        //document.getElementById("ers_margin").innerHTML = signe + (donnees.ers_delta).toFixed(hybrid_decimal);
                        set_inner_html("ers_margin", signe + (donnees.ers_delta).toFixed(hybrid_decimal));
                    } else {
                        //document.getElementById("ers_margin").innerHTML = "--";
                        set_inner_html("ers_margin", "--");
                    }
                    if (donnees.boost_manu != boost_manu_old || donnees.ref_ok != ref_ok_old) {
                        if (donnees.ref_ok == 0) {
                            //document.getElementById("ers_margin").style.backgroundColor = "#000000";
                            set_style_bg("ers_margin", "#000000");
                        } else if (donnees.ref_ok == 2) {
                            //document.getElementById("ers_margin").style.backgroundColor = "#ffffff";
                            set_style_bg("ers_margin", "#ffffff");
                        } else if (donnees.boost_manu == 1) {  // boost activé manuellement en dehors du déployment normal du mode choisi
                            //document.getElementById("ers_margin").style.backgroundColor = "#ff8800";
                            set_style_bg("ers_margin", "#ff8800");
                            //document.getElementById("ers_margin").style.color = "#00d9ff";
                            set_style_color("ers_margin", "#00d9ff");
                        } else {
                            //document.getElementById("ers_margin").style.backgroundColor = "#0088ff";
                            set_style_bg("ers_margin", "#0088ff");
                            //document.getElementById("ers_margin").style.color = "#ffffff";
                            set_style_color("ers_margin", "#ffffff");
                        }
                    }
                    boost_manu_old = donnees.boost_manu;
                    ref_ok_old = donnees.ref_ok;
                }
                if (donnees.mgul != undefined) {
                    set_inner_html("mgul", donnees.mgul.toFixed(hybrid_decimal));
                    // On change ensuite la couleur de fond si l'énergie est utilisée
                    // On ne change le fond que si la valeur a changée pour optimiser les performances graphiques
                    if (donnees.boost != boost_old) {
                        if (donnees.boost) {
                            //set_style_bg("mgul", "#00d9ff");
                            if (advanced["perso_bg_color_" + "mgul" + disp_sel]) {
                                set_style_bg_alpha("mgul", advanced["bg_color_" + "mgul" + disp_sel], advanced["bg_" + "mgul" + disp_sel]);
                            } else {
                                set_style_bg_alpha("mgul", '#00d9ff', advanced["bg_" + "mgul" + disp_sel]);
                            }

                            //set_style_color("mgul", "#ff8800");
                            if (advanced["perso_font_color_" + "mgul" + disp_sel]) {
                                set_style_color("mgul", advanced["font_color_" + "mgul" + disp_sel]);
                            } else {
                                set_style_color("mgul", "#ff8800");
                            }
                        } else {
                            //set_style_bg("mgul", "#00ff00");
                            if (advanced["perso_bg_color_" + "mgul" + disp_sel]) {
                                set_style_bg_alpha("mgul", advanced["bg_color_" + "mgul" + disp_sel], advanced["bg_" + "mgul" + disp_sel]);
                            } else {
                                set_style_bg_alpha("mgul", '#00ff00', advanced["bg_" + "mgul" + disp_sel]);
                            }

                            //set_style_color("mgul", "#000000");
                            if (advanced["perso_font_color_" + "mgul" + disp_sel]) {
                                set_style_color("mgul", advanced["font_color_" + "mgul" + disp_sel]);
                            } else {
                                set_style_color("mgul", "#000000");
                            }
                        }
                    }
                    if (donnees.boost_off != boost_off_old) {
                        if (donnees.boost_off) {
                            //set_style_bg("mgul", "#666666");
                            if (advanced["perso_bg_color_" + "mgul" + disp_sel]) {
                                set_style_bg_alpha("mgul", advanced["bg_color_" + "mgul" + disp_sel], advanced["bg_" + "mgul" + disp_sel]);
                            } else {
                                set_style_bg_alpha("mgul", '#666666', advanced["bg_" + "mgul" + disp_sel]);
                            }

                            //set_style_color("mgul", "#333333");
                            if (advanced["perso_font_color_" + "mgul" + disp_sel]) {
                                set_style_color("mgul", advanced["font_color_" + "mgul" + disp_sel]);
                            } else {
                                set_style_color("mgul", "#333333");
                            }
                        } else {
                            //set_style_bg("mgul", "#00ff00");
                            if (advanced["perso_bg_color_" + "mgul" + disp_sel]) {
                                set_style_bg_alpha("mgul", advanced["bg_color_" + "mgul" + disp_sel], advanced["bg_" + "mgul" + disp_sel]);
                            } else {
                                set_style_bg_alpha("mgul", '#00ff00', advanced["bg_" + "mgul" + disp_sel]);
                            }

                            //set_style_color("mgul", "#000000");
                            if (advanced["perso_font_color_" + "mgul" + disp_sel]) {
                                set_style_color("mgul", advanced["font_color_" + "mgul" + disp_sel]);
                            } else {
                                set_style_color("mgul", "#000000");
                            }
                        }
                    }
                    boost_old = donnees.boost;
                    boost_off_old = donnees.boost_off;
                }
                if (donnees.mgu != undefined) {
                    if (donnees.mgu != 0) {
                        set_inner_html("mgu", donnees.mgu.toFixed(hybrid_decimal));
                    } else {
                        if (donnees.is_iracing_started) {
                            set_inner_html("mgu", "--");
                        } else {
                            set_inner_html("mgu", "88");
                        }
                    }
                }
            }
        }
        if (carname in car_with_drs) {
            if (advanced["disp_" + "drs" + disp_sel] || advanced["disp_" + "gear" + disp_sel]) {
                if (carname == "formularenault35" && donnees.drs_c != undefined) {
                    if (donnees.drs_c != drs_c_old) {
                        if (donnees.styp == "Race") {
                            //document.getElementById("drs").innerHTML = (8 - donnees.drs_c).toFixed(0);
                            set_inner_html("drs", (8 - donnees.drs_c).toFixed(0));
                        } else {
                            //document.getElementById("drs").innerHTML = (donnees.drs_c).toFixed(0);
                            set_inner_html("drs", (donnees.drs_c).toFixed(0));
                        }
                    }
                    drs_c_old = donnees.drs_c;
                }
                if (donnees.drs != undefined) {
                    if (donnees.drs == 0) {  // DRS Inactive
                        //document.getElementById("drs").style.backgroundColor = "#000000";
                        change_bg("drs", "#000000", advanced["bg_" + "drs" + disp_sel]);
                        //document.getElementById("drs").style.color = "#333333";
                        set_style_color("drs", "#333333");
                        if (!shiftlight_gear_rpm_speed_is_on) {
                            //change_bg("gear", "#cccccc", advanced["bg_" + "gear" + disp_sel]);
                            //set_style_color("gear", "#000000");
                            if (advanced["perso_bg_color_" + "gear" + disp_sel]) {
                                change_bg("gear", advanced["bg_color_" + "gear" + disp_sel], advanced["bg_" + "gear" + disp_sel]);
                            } else {
                                change_bg("gear", bg_default_value["gear"], advanced["bg_" + "gear" + disp_sel]);
                            }
                            if (advanced["perso_font_color_" + "gear" + disp_sel]) {
                                set_style_color("gear", advanced["font_color_" + "gear" + disp_sel]);
                            } else {
                                set_style_color("gear", font_col_default_value["gear"]);
                            }
                        }
                    }
                    if (donnees.drs == 1) {  // DRS Available in Next Zone
                        //document.getElementById("drs").style.backgroundColor = "#000000";
                        change_bg("drs", "#000000", advanced["bg_" + "drs" + disp_sel]);
                        //document.getElementById("drs").style.color = "#ffffff";
                        set_style_color("drs", "#ffffff");
                        if (!shiftlight_gear_rpm_speed_is_on) {
                            //document.getElementById("gear").style.backgroundColor = "#000000";
                            if (advanced["perso_bg_color_" + "gear" + disp_sel]) {
                                change_bg("gear", advanced["bg_color_" + "gear" + disp_sel], advanced["bg_" + "gear" + disp_sel]);
                            } else {
                                change_bg("gear", "#000000", advanced["bg_" + "gear" + disp_sel]);
                            }
                            //document.getElementById("gear").style.color = "#ffffff";
                            if (advanced["perso_font_color_" + "gear" + disp_sel]) {
                                set_style_color("gear", advanced["font_color_" + "gear" + disp_sel]);
                            } else {
                                set_style_color("gear", "#ffffff");
                            }
                        }
                    }
                    if (donnees.drs == 2) {  // DRS Available and in a DRS Zone
                        //document.getElementById("drs").style.backgroundColor = "#ffffff";
                        change_bg("drs", "#ffffff", advanced["bg_" + "drs" + disp_sel]);
                        //document.getElementById("drs").style.color = "#00dd00";
                        set_style_color("drs", "#00dd00");
                        if (!shiftlight_gear_rpm_speed_is_on) {
                            //document.getElementById("gear").style.backgroundColor = "#ffffff";
                            if (advanced["perso_bg_color_" + "gear" + disp_sel]) {
                                change_bg("gear", advanced["bg_color_" + "gear" + disp_sel], advanced["bg_" + "gear" + disp_sel]);
                            } else {
                                change_bg("gear", "#ffffff", advanced["bg_" + "gear" + disp_sel]);
                            }
                            //document.getElementById("gear").style.color = "#00dd00";
                            if (advanced["perso_font_color_" + "gear" + disp_sel]) {
                                set_style_color("gear", advanced["font_color_" + "gear" + disp_sel]);
                            } else {
                                set_style_color("gear", "#00dd00");
                            }
                        }
                    }
                    if (donnees.drs == 3) {  // DRS Active
                        //document.getElementById("drs").style.backgroundColor = "#00dd00";
                        change_bg("drs", "#00dd00", advanced["bg_" + "drs" + disp_sel]);
                        //document.getElementById("drs").style.color = "#ee00aa";
                        set_style_color("drs", "#ee00aa");
                        if (!shiftlight_gear_rpm_speed_is_on) {
                            //document.getElementById("gear").style.backgroundColor = "#00dd00";
                            if (advanced["perso_bg_color_" + "gear" + disp_sel]) {
                                change_bg("gear", advanced["bg_color_" + "gear" + disp_sel], advanced["bg_" + "gear" + disp_sel]);
                            } else {
                                change_bg("gear", "#00dd00", advanced["bg_" + "gear" + disp_sel]);
                            }
                            //document.getElementById("gear").style.color = "#ee00aa";
                            if (advanced["perso_font_color_" + "gear" + disp_sel]) {
                                set_style_color("gear", advanced["font_color_" + "gear" + disp_sel]);
                            } else {
                                set_style_color("gear", "#ee00aa");
                            }
                        }
                    }
                }
            }

        }


        tmp_list = [
            "arb_f",
            "arb_r",
            "powersteering",
            "regen_gain",
            "fuel_mixture",
            "eng_pw",
            "peak_bb",
            "diff_preload",
            "diff_entry",
            "diff_mid",
            "diff_exit",
            "eng_br",
            "wj",
            "abs",
            "boo",
            "t_sh",
        ];
        for (var i in tmp_list) {
            tmp_name = tmp_list[i];
            if (advanced["disp_" + tmp_name + disp_sel]) {
                if (donnees[tmp_name] != undefined) {
                    set_inner_html(tmp_name, donnees[tmp_name]);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html(tmp_name, "--");
                    } else {
                        set_inner_html(tmp_name, "88");
                    }
                }
            }
        }


        if (advanced["disp_" + "me_p2p" + disp_sel] && donnees.me_p2p_count != undefined) {
            if (donnees.me_p2p_count != -1) {
                //document.getElementById("me_p2p").innerHTML = donnees.me_p2p_count;
                set_inner_html("me_p2p", donnees.me_p2p_count);
            } else {
                if (donnees.is_iracing_started) {
                    set_inner_html("me_p2p", "--");
                } else {
                    set_inner_html("me_p2p", "88");
                }
            }
            if (advanced["perso_bg_color_" + "me_p2p" + disp_sel]) {
                if (advanced["ccc_bg_color_" + "me_p2p" + disp_sel]) {
                    set_style_bg_alpha("me_p2p", cc(donnees["me" + "_cc" + _f3_pre_me_post["me"]], donnees["me" + "_num" + _f3_pre_me_post["me"]], donnees["me" + "_uid" + _f3_pre_me_post["me"]], donnees["me" + "_tid" + _f3_pre_me_post["me"]], donnees["me" + "_classid" + _f3_pre_me_post["me"]]), advanced["bg_" + "me_p2p" + disp_sel]);
                } else {
                    set_style_bg_alpha("me_p2p", advanced["bg_color_" + "me_p2p" + disp_sel], advanced["bg_" + "me_p2p" + disp_sel]);
                }
            } else {
                if (donnees.me_p2p_status != undefined && donnees.me_p2p_status == 1) {
                    set_style_bg_alpha("me_p2p", '#bb77ff', advanced["bg_" + "me_p2p" + disp_sel]);
                } else {
                    set_style_bg_alpha("me_p2p", '#000000', advanced["bg_" + "me_p2p" + disp_sel]);
                }
            }
        }
        if (donnees.styp == "Race" && (f3_mode_in_race_dashboard == 0 && f3_mode_for_pre == 0)) {
            if (advanced["disp_" + "pre_p2p" + disp_sel] && donnees.pre_p2p_count != undefined) {
                if (donnees.pre_p2p_count != -1) {
                    //document.getElementById("pre_p2p").innerHTML = donnees.pre_p2p_count;
                    set_inner_html("pre_p2p", donnees.pre_p2p_count);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("pre_p2p", "--");
                    } else {
                        set_inner_html("pre_p2p", "88");
                    }
                }
                if (advanced["perso_bg_color_" + "pre_p2p" + disp_sel]) {
                    if (advanced["ccc_bg_color_" + "pre_p2p" + disp_sel]) {
                        set_style_bg_alpha("pre_p2p", cc(donnees["pre" + "_cc" + _f3_pre_me_post["pre"]], donnees["pre" + "_num" + _f3_pre_me_post["pre"]], donnees["pre" + "_uid" + _f3_pre_me_post["pre"]], donnees["pre" + "_tid" + _f3_pre_me_post["pre"]], donnees["pre" + "_classid" + _f3_pre_me_post["pre"]]), advanced["bg_" + "pre_p2p" + disp_sel]);
                    } else {
                        set_style_bg_alpha("pre_p2p", advanced["bg_color_" + "pre_p2p" + disp_sel], advanced["bg_" + "pre_p2p" + disp_sel]);
                    }
                } else {
                    if (donnees.pre_p2p_status != undefined && donnees.pre_p2p_status == 1) {
                        set_style_bg_alpha("pre_p2p", '#bb77ff', advanced["bg_" + "pre_p2p" + disp_sel]);
                    } else {
                        set_style_bg_alpha("pre_p2p", '#000000', advanced["bg_" + "pre_p2p" + disp_sel]);
                    }
                }
            }
        } else {
            if (advanced["disp_" + "pre_p2p" + disp_sel] && donnees.pre_p2p_count_f3 != undefined) {
                if (donnees.pre_p2p_count_f3 != -1) {
                    //document.getElementById("pre_p2p").innerHTML = donnees.pre_p2p_count_f3;
                    set_inner_html("pre_p2p", donnees.pre_p2p_count_f3);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("pre_p2p", "--");
                    } else {
                        set_inner_html("pre_p2p", "88");
                    }
                }
                if (advanced["perso_bg_color_" + "pre_p2p" + disp_sel]) {
                    if (advanced["ccc_bg_color_" + "pre_p2p" + disp_sel]) {
                        set_style_bg_alpha("pre_p2p", cc(donnees["pre" + "_cc" + _f3_pre_me_post["pre"]], donnees["pre" + "_num" + _f3_pre_me_post["pre"]], donnees["pre" + "_uid" + _f3_pre_me_post["pre"]], donnees["pre" + "_tid" + _f3_pre_me_post["pre"]], donnees["pre" + "_classid" + _f3_pre_me_post["pre"]]), advanced["bg_" + "pre_p2p" + disp_sel]);
                    } else {
                        set_style_bg_alpha("pre_p2p", advanced["bg_color_" + "pre_p2p" + disp_sel], advanced["bg_" + "pre_p2p" + disp_sel]);
                    }
                } else {
                    if (donnees.pre_p2p_status_f3 != undefined && donnees.pre_p2p_status_f3 == 1) {
                        set_style_bg_alpha("pre_p2p", '#bb77ff', advanced["bg_" + "pre_p2p" + disp_sel]);
                    } else {
                        set_style_bg_alpha("pre_p2p", '#000000', advanced["bg_" + "pre_p2p" + disp_sel]);
                    }
                }
            }
        }
        if (donnees.styp == "Race" && f3_mode_in_race_dashboard == 0) {
            if (advanced["disp_" + "post_p2p" + disp_sel] && donnees.post_p2p_count != undefined) {
                if (donnees.post_p2p_count != -1) {
                    //document.getElementById("post_p2p").innerHTML = donnees.post_p2p_count;
                    set_inner_html("post_p2p", donnees.post_p2p_count);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("post_p2p", "--");
                    } else {
                        set_inner_html("post_p2p", "88");
                    }
                }
                if (advanced["perso_bg_color_" + "post_p2p" + disp_sel]) {
                    if (advanced["ccc_bg_color_" + "post_p2p" + disp_sel]) {
                        set_style_bg_alpha("post_p2p", cc(donnees["post" + "_cc" + _f3_pre_me_post["post"]], donnees["post" + "_num" + _f3_pre_me_post["post"]], donnees["post" + "_uid" + _f3_pre_me_post["post"]], donnees["post" + "_tid" + _f3_pre_me_post["post"]], donnees["post" + "_classid" + _f3_pre_me_post["post"]]), advanced["bg_" + "post_p2p" + disp_sel]);
                    } else {
                        set_style_bg_alpha("post_p2p", advanced["bg_color_" + "post_p2p" + disp_sel], advanced["bg_" + "post_p2p" + disp_sel]);
                    }
                } else {
                    if (donnees.post_p2p_status != undefined && donnees.post_p2p_status == 1) {
                        set_style_bg_alpha("post_p2p", '#bb77ff', advanced["bg_" + "post_p2p" + disp_sel]);
                    } else {
                        set_style_bg_alpha("post_p2p", '#000000', advanced["bg_" + "post_p2p" + disp_sel]);
                    }
                }
            }
        } else {
            if (advanced["disp_" + "post_p2p" + disp_sel] && donnees.post_p2p_count_f3 != undefined) {
                if (donnees.post_p2p_count_f3 != -1) {
                    //document.getElementById("post_p2p").innerHTML = donnees.post_p2p_count_f3;
                    set_inner_html("post_p2p", donnees.post_p2p_count_f3);
                } else {
                    if (donnees.is_iracing_started) {
                        set_inner_html("post_p2p", "--");
                    } else {
                        set_inner_html("post_p2p", "88");
                    }
                }
                if (advanced["perso_bg_color_" + "post_p2p" + disp_sel]) {
                    if (advanced["ccc_bg_color_" + "post_p2p" + disp_sel]) {
                        set_style_bg_alpha("post_p2p", cc(donnees["post" + "_cc" + _f3_pre_me_post["post"]], donnees["post" + "_num" + _f3_pre_me_post["post"]], donnees["post" + "_uid" + _f3_pre_me_post["post"]], donnees["post" + "_tid" + _f3_pre_me_post["post"]], donnees["post" + "_classid" + _f3_pre_me_post["post"]]), advanced["bg_" + "post_p2p" + disp_sel]);
                    } else {
                        set_style_bg_alpha("post_p2p", advanced["bg_color_" + "post_p2p" + disp_sel], advanced["bg_" + "post_p2p" + disp_sel]);
                    }
                } else {
                    if (donnees.post_p2p_status_f3 != undefined && donnees.post_p2p_status_f3 == 1) {
                        set_style_bg_alpha("post_p2p", '#bb77ff', advanced["bg_" + "post_p2p" + disp_sel]);
                    } else {
                        set_style_bg_alpha("post_p2p", '#000000', advanced["bg_" + "post_p2p" + disp_sel]);
                    }
                }
            }
        }


        var tmp_time = Date.now() / 1000;  // utilisé pour le display_changed_time et le setting_changed_time

        // On affiche le nom du display pendant le temps défini s'il a changé
        var tmp_name = advanced["name" + disp_sel];
        if (tmp_name != undefined) {
            if (tmp_name != display_changed_name) {
                display_changed_name = tmp_name;
                display_changed_time = tmp_time;
                set_inner_html("display_changed_name", display_changed_name);
            }

            if (tmp_time - display_changed_time < 1 && display_changed_disp) {
                document.getElementById("display_changed_name").style.display = "block";
            } else if (document.getElementById("display_changed_name").style.display != "none") {
                document.getElementById("display_changed_name").style.display = "none";
            }

        }

        // On affiche les valeurs changées (TC, ABS, ...) pendant incar_set_change_delay secondes
        for (tmp_name in tab_setting) {
            if (donnees[tmp_name] != undefined) {
                if (donnees[tmp_name] != setting_[tmp_name]) {
                    if (setting_[tmp_name] != undefined) {
                        setting_changed_time = tmp_time;
                    }
                    setting_changed_name = tab_setting[tmp_name];
                    if (tmp_name == "mgum") {
                        if (donnees.carname == "mclarenmp430") {
                            setting_changed_name = "Target batt SoC request";
                            setting_changed_value = donnees[tmp_name];
                        } else if (donnees.carname == "mercedesw12" || donnees.carname == "mercedesw13" || donnees.carname == "bmwlmdh") {
                            setting_changed_name = "MGU-K deploy mode";
                            if (donnees[tmp_name] == 0) {
                                setting_changed_value = "No";
                            } else if (donnees[tmp_name] == 1) {
                                setting_changed_value = "Qual";
                            } else if (donnees[tmp_name] == 2) {
                                setting_changed_value = "Att.";
                            } else if (donnees[tmp_name] == 3) {
                                setting_changed_value = "Bal.";
                            } else if (donnees[tmp_name] == 4) {
                                setting_changed_value = "Build";
                            }
                        } else {
                            if (donnees[tmp_name] == 0) {
                                setting_changed_value = "Man.";
                            } else if (donnees[tmp_name] == 1) {
                                setting_changed_value = "Auto";
                            } else if (donnees[tmp_name] == 2) {
                                setting_changed_value = "Qual";
                            }
                        }
                    } else if (tmp_name == "tc_tog") {
                        // REM : j'ai inversé le ON/OFF car sur les GT4 c'était inversé (cela n'est pas pris en compte sur les GT3 sauf la Mercedes)
                        if (donnees.carname == "mercedesamggt3") {
                            if (donnees[tmp_name] == 0) {
                                setting_changed_value = "OFF";
                            } else {
                                setting_changed_value = "ON";
                            }
                        } else {
                            if (donnees[tmp_name] == 0) {
                                setting_changed_value = "ON";
                            } else {
                                setting_changed_value = "OFF";
                            }
                        }
                    } else if (tmp_name == "iracing_fuel_add") {
                        setting_changed_value = (fuelfactor * coef_fuel * donnees[tmp_name]).toFixed(fuel_decimal);
                        if (donnees.u == 1) {  // L ou Kg
                            if (coef_fuel ==1) {  // Kg
                                if (donnees.carname in car_electric) {
                                    setting_changed_name = "Fuel Add (kWh)";
                                } else {
                                    setting_changed_name = "Fuel Add (L)";
                                }
                            } else {
                                setting_changed_name = "Fuel Add (Kg)";
                            }
                        } else {  // Ga ou Lb
                            if (coef_fuel ==1) {
                                if (donnees.carname in car_electric) {
                                    setting_changed_name = "Fuel Add (kWh)";
                                } else {
                                    setting_changed_name = "Fuel Add (Ga)";
                                }
                            } else {
                                setting_changed_name = "Fuel Add (Lb)";
                            }
                        }
                    } else {
                        setting_changed_value = donnees[tmp_name];
                    }
                    setting_[tmp_name] = donnees[tmp_name];
                }
            }
        }

        if (tmp_time - setting_changed_time < incar_set_change_delay) {
            document.getElementById("setting_changed_name").style.display = "block" ;
            document.getElementById("setting_changed_value").style.display = "block" ;
            //document.getElementById("setting_changed_name").innerHTML = setting_changed_name;
            set_inner_html("setting_changed_name", setting_changed_name);
            //document.getElementById("setting_changed_value").innerHTML = setting_changed_value;
            set_inner_html("setting_changed_value", setting_changed_value);
        } else {
            document.getElementById("setting_changed_name").style.display = "none" ;
            document.getElementById("setting_changed_value").style.display = "none" ;
        }

        // On change la couleur du texte des données des pneus en fonction du update_telemetry_status
        if (donnees.uts != update_telemetry_status) {
            update_telemetry_status = donnees.uts;
            for (var param1 in {"RR": 1, "RF": 1, "LF": 1, "LR": 1}) {
                //for (var param2 in {"pressure": 1, "tempL": 1, "tempM": 1, "tempR": 1, "wearL": 1, "wearM": 1, "wearR": 1}) {
                for (var param2 in {"pressure": 1, "tempL": 1, "tempM": 1, "tempR": 1}) {  // Pour le tread wear, on ne change pas de couleur puisque ce n'est pas calculé avec la télémétrie
                    if (advanced["disp_" + param1 + param2 + disp_sel]) {
                        if (update_telemetry_status >= 11) {
                            if (advanced["perso_font_color_" + param1 + param2 + disp_sel]) {
                                set_style_color(param1 + param2, advanced["font_color_" + param1 + param2 + disp_sel]);
                            } else {
                                set_style_color(param1 + param2, "#444444");
                            }
                        } else {
                            if (advanced["perso_font_color_" + param1 + param2 + disp_sel]) {
                                set_style_color(param1 + param2, advanced["font_color_" + param1 + param2 + disp_sel]);
                            } else {
                                set_style_color(param1 + param2, "#ffffff");
                            }
                            if (donnees[param1 + param2] != undefined) {
                                set_inner_html(param1 + param2, donnees[param1 + param2].toFixed(1));
                            } else {
                                if (donnees.is_iracing_started) {
                                    set_inner_html(param1 + param2, "--");
                                } else {
                                    set_inner_html(param1 + param2, "88.8");
                                }
                            }
                        }
                    }
                }
            }
        }

        speed_old = donnees.s;

    }

}


function coord_compass(angle, rayon, type) {


    if (type == "wind") {
        coord = {
            1: {'x': -0.25, 'y': -1},
            2: {'x': -0.25, 'y': 0.5},
            3: {'x': -0.5, 'y': 0.5},
            4: {'x': 0, 'y': 1},
            5: {'x': 0.5, 'y': 0.5},
            6: {'x': 0.25, 'y': 0.5},
            7: {'x': 0.25, 'y': -1}
        };
    }
    if (type == "northL") {
        coord = {
            1: {'x': 0, 'y': -1},
            2: {'x': 0.625, 'y': 0.75},
            3: {'x': 0.25, 'y': 0.625},
            4: {'x': 0, 'y': -0.125}
        };
    }
    if (type == "northR") {
        coord = {
            1: {'x': 0, 'y': -1},
            2: {'x': -0.625, 'y': 0.75},
            3: {'x': -0.25, 'y': 0.625},
            4: {'x': 0, 'y': -0.125}
        };
    }

    // On fait la rotation
    coord2 = {};
    for (i in coord) {
        coord2[i] = {};
        coord2[i].x = (coord[i].x * Math.cos(angle) - coord[i].y * Math.sin(angle) + 1) * rayon;
        coord2[i].y = (coord[i].x * Math.sin(angle) + coord[i].y * Math.cos(angle) + 1) * rayon;
    }

    return coord2;
}


function draw(compass, coul, ombrage) {

    if (ombrage == 1) {
        // On met l'Ombrage
        context_compass.shadowColor = "black";
        context_compass.shadowOffsetX = compass_w / 6 / 10;
        context_compass.shadowOffsetY = compass_w / 6 / 10;
        context_compass.shadowBlur = compass_w / 2 / 10;
    }

    context_compass.beginPath(); //On démarre un nouveau tracé.
    context_compass.fillStyle = coul;
    //context_compass.globalCompositeOperation = "destination-out";
    for (i in compass) {
        if (i == 0) {
            context_compass.moveTo(compass[0].x, compass[0].y);
        } else {
            context_compass.lineTo(compass[i].x, compass[i].y);
        }
    }
    context_compass.fill(); //On trace seulement les lignes.
    context_compass.closePath();

    if (ombrage == 1) {
        // On enlève l'ombrage
        context_compass.shadowOffsetX = 0;
        context_compass.shadowOffsetY = 0;
        context_compass.shadowBlur = 0;
        context_compass.inset = 1;
    }

}

function shiftlight(bg, col, text) {
    if (advanced["shiftlight_on"]) {  // Que si le shiftlight est actif

        if (text == "") {
            text = "&nbsp;";
        }
        set_inner_html("shift", text);

        //document.getElementById("shift").style.backgroundColor = bg;
        set_style_bg("shift", bg);
        //document.getElementById("shift_bg").style.backgroundColor = bg;
        //set_style_bg("shift_bg", bg);

        if (advanced["shiftlight_gear_rpm_speed_on"]) {
            if (advanced["perso_bg_color_" + "gear" + disp_sel]) {
                change_bg("gear", advanced["bg_color_" + "gear" + disp_sel], advanced["bg_" + "gear" + disp_sel]);
            } else {
                change_bg("gear", bg, advanced["bg_" + "gear" + "_" + advanced["display_selected"]]);
            }
            if (advanced["perso_bg_color_" + "rpm" + disp_sel]) {
                change_bg("rpm", advanced["bg_color_" + "rpm" + disp_sel], advanced["bg_" + "rpm" + disp_sel]);
            } else {
                change_bg("rpm", bg, advanced["bg_" + "rpm" + "_" + advanced["display_selected"]]);
            }
            if (advanced["perso_bg_color_" + "speed" + disp_sel]) {
                change_bg("speed", advanced["bg_color_" + "speed" + disp_sel], advanced["bg_" + "speed" + disp_sel]);
            } else {
                change_bg("speed", bg, advanced["bg_" + "speed" + "_" + advanced["display_selected"]]);
            }
            if (advanced["perso_font_color_" + "gear" + disp_sel]) {
                set_style_color("gear", advanced["font_color_" + "gear" + disp_sel]);
            } else {
                set_style_color("gear", col);
            }
            if (advanced["perso_font_color_" + "rpm" + disp_sel]) {
                set_style_color("rpm", advanced["font_color_" + "rpm" + disp_sel]);
            } else {
                set_style_color("rpm", col);
            }
            if (advanced["perso_font_color_" + "speed" + disp_sel]) {
                set_style_color("speed", advanced["font_color_" + "speed" + disp_sel]);
            } else {
                set_style_color("speed", col);
            }
            shiftlight_gear_rpm_speed_is_on = true;
        } else {
            //change_bg("gear", "#cccccc", advanced["bg_" + "gear" + "_" + advanced["display_selected"]]);
            if (advanced["perso_bg_color_" + "gear" + disp_sel]) {
                change_bg("gear", advanced["bg_color_" + "gear" + disp_sel], advanced["bg_" + "gear" + disp_sel]);
            } else {
                change_bg("gear", bg_default_value["gear"], advanced["bg_" + "gear" + "_" + advanced["display_selected"]]);
            }
            //change_bg("rpm", "#cccccc", advanced["bg_" + "rpm" + "_" + advanced["display_selected"]]);
            if (advanced["perso_bg_color_" + "rpm" + disp_sel]) {
                change_bg("rpm", advanced["bg_color_" + "rpm" + disp_sel], advanced["bg_" + "rpm" + disp_sel]);
            } else {
                change_bg("rpm", bg_default_value["rpm"], advanced["bg_" + "rpm" + "_" + advanced["display_selected"]]);
            }
            //change_bg("speed", "#444444", advanced["bg_" + "speed" + "_" + advanced["display_selected"]]);
            if (advanced["perso_bg_color_" + "speed" + disp_sel]) {
                change_bg("speed", advanced["bg_color_" + "speed" + disp_sel], advanced["bg_" + "speed" + disp_sel]);
            } else {
                change_bg("speed", bg_default_value["speed"], advanced["bg_" + "speed" + "_" + advanced["display_selected"]]);
            }
            //set_style_color("speed", "#ffffff");
            if (advanced["perso_font_color_" + "speed" + disp_sel]) {
                set_style_color("speed", advanced["font_color_" + "speed" + disp_sel]);
            } else {
                set_style_color("speed", font_col_default_value["speed"]);
            }
            //set_style_color("gear", "#000000");
            if (advanced["perso_font_color_" + "gear" + disp_sel]) {
                set_style_color("gear", advanced["font_color_" + "gear" + disp_sel]);
            } else {
                set_style_color("gear", font_col_default_value["gear"]);
            }
            //set_style_color("rpm", "#000000");
            if (advanced["perso_font_color_" + "rpm" + disp_sel]) {
                set_style_color("rpm", advanced["font_color_" + "rpm" + disp_sel]);
            } else {
                set_style_color("rpm", font_col_default_value["rpm"]);
            }
        }

        document.getElementById("shift").style.zIndex = 99;  // 99 et pas 11 pour que ça reste au-dessus du dashboard light
    } else {
        shiftlight_off();
    }
}

function shiftlight_off() {
    document.getElementById("shift").style.zIndex = -1;

    set_inner_html("shift", "&nbsp;");

    if (transparency_OBS) {
        //document.getElementById("shift").style.backgroundColor = "rgba(0,0,0,0)";
        set_style_bg("shift", "rgba(0,0,0,0)");
        //document.getElementById("shift_bg").style.backgroundColor = "rgba(0,0,0,0)";
        //set_style_bg("shift_bg", "rgba(0,0,0,0)");
    } else {
        //document.getElementById("shift").style.backgroundColor = "#000000";
        set_style_bg("shift", "#000000");
        //document.getElementById("shift_bg").style.backgroundColor = "#000000";
        //set_style_bg("shift_bg", "#000000");
    }

    //change_bg("gear", "#cccccc", advanced["bg_" + "gear" + "_" + advanced["display_selected"]]);
    if (advanced["perso_bg_color_" + "gear" + disp_sel]) {
        change_bg("gear", advanced["bg_color_" + "gear" + disp_sel], advanced["bg_" + "gear" + disp_sel]);
    } else {
        change_bg("gear", bg_default_value["gear"], advanced["bg_" + "gear" + "_" + advanced["display_selected"]]);
    }
    //change_bg("rpm", "#cccccc", advanced["bg_" + "rpm" + "_" + advanced["display_selected"]]);
    if (advanced["perso_bg_color_" + "rpm" + disp_sel]) {
        change_bg("rpm", advanced["bg_color_" + "rpm" + disp_sel], advanced["bg_" + "rpm" + disp_sel]);
    } else {
        change_bg("rpm", bg_default_value["rpm"], advanced["bg_" + "rpm" + "_" + advanced["display_selected"]]);
    }
    //change_bg("speed", "#444444", advanced["bg_" + "speed" + "_" + advanced["display_selected"]]);
    if (advanced["perso_bg_color_" + "speed" + disp_sel]) {
        change_bg("speed", advanced["bg_color_" + "speed" + disp_sel], advanced["bg_" + "speed" + disp_sel]);
    } else {
        change_bg("speed", bg_default_value["speed"], advanced["bg_" + "speed" + "_" + advanced["display_selected"]]);
    }
    //set_style_color("speed", "#ffffff");
    if (advanced["perso_font_color_" + "speed" + disp_sel]) {
        set_style_color("speed", advanced["font_color_" + "speed" + disp_sel]);
    } else {
        set_style_color("speed", font_col_default_value["speed"]);
    }
    //set_style_color("gear", "#000000");
    if (advanced["perso_font_color_" + "gear" + disp_sel]) {
        set_style_color("gear", advanced["font_color_" + "gear" + disp_sel]);
    } else {
        set_style_color("gear", font_col_default_value["gear"]);
    }
    //set_style_color("rpm", "#000000");
    if (advanced["perso_font_color_" + "rpm" + disp_sel]) {
        set_style_color("rpm", advanced["font_color_" + "rpm" + disp_sel]);
    } else {
        set_style_color("rpm", font_col_default_value["rpm"]);
    }

    shiftlight_gear_rpm_speed_is_on = false;
}

function dashboard_light(bg, text) {
    if (advanced["dashboard_light_on"]) {

        if (text == "") {
            text = "&nbsp;";
        }
        set_inner_html("dashboard_light", text);

        //set_style_bg("dashboard_light", bg);
        set_style_bg_alpha("dashboard_light", bg, dashboard_light_opacity);
        //set_style_bg("dashboard_light_bg", bg);

        set_style_color("dashboard_light", font_coul_on_bg(bg));

        document.getElementById("dashboard_light").style.zIndex = 11 + dashboard_light_zindex_offset;  // j'ai mis 11 au lieu de 10 pour que ça reste au-dessus des borders
    } else {
        dashboard_light_off();
    }
}

function dashboard_light_off() {
    document.getElementById("dashboard_light").style.zIndex = -1;

    set_inner_html("dashboard_light", "&nbsp;");

    if (transparency_OBS) {
        set_style_bg("dashboard_light", "rgba(0,0,0,0)");
        //set_style_bg("dashboard_light_bg", "rgba(0,0,0,0)");
    } else {
        set_style_bg("dashboard_light", "#000000");
        //set_style_bg("dashboard_light_bg", "#000000");
    }
}

function display_rpm() {
    if (display_rpmshift == 0) {
        document.getElementById("display_rpmshift").style.display = "block";
        display_rpmshift = 1;
        /*document.getElementById("display_rpmshift").innerHTML = "";
        for (i in gear_) {
            if (i != "N") {
                document.getElementById("display_rpmshift").innerHTML += "GEAR " + i + " : " + gear_[i].toFixed(0) + "<br>"
            }
        }*/
    } else {
        document.getElementById("display_rpmshift").style.display = "none";
        display_rpmshift = 0;
    }
}

function font_coul_on_bg(bg) {
    var str = bg.slice(1)
    var r = parseInt("0x" + str.substr(0, 2));
    var g = parseInt("0x" + str.substr(2, 2));
    var b = parseInt("0x" + str.substr(4, 2));
    var moy = (r + g + b) / 3;
    var font_coul = "#000000";
    if (moy < 150) {
        font_coul = "#ffffff";
    }

    // DEBUG
    //font_coul = "#ffffff";

    return font_coul;
}
