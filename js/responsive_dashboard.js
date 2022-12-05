

// On met � jour le tableau advanced avec les nouvelles valeurs non d�finies dans le fichier de config js
function set_var_dashboard_advanced_more_options_and_list_not_defined_default(d) {

    //var t = Date.now()

    var var_dashboard_advanced_more_options_default = [

        {"nom" : "zindex_offset", "default_value": 0},

        {"nom" : "highlight", "default_value": 0},

        {"nom" : "box_border_left_width", "default_value": 0},
        {"nom" : "box_border_top_width", "default_value": 0},
        {"nom" : "box_border_right_width", "default_value": 0},
        {"nom" : "box_border_bottom_width", "default_value": 0},
        {"nom" : "ccc_box_border_color", "default_value": 0},
        {"nom" : "box_border_color", "default_value": "#666666"},
        {"nom" : "box_border_tl_radius", "default_value": 0},
        {"nom" : "box_border_tr_radius", "default_value": 0},
        {"nom" : "box_border_bl_radius", "default_value": 0},
        {"nom" : "box_border_br_radius", "default_value": 0},

        {"nom" : "perso_bg_color", "default_value": 0},
        {"nom" : "ccc_bg_color", "default_value": 0},
        {"nom" : "bg_color", "default_value": "#000000"},
        {"nom" : "perso_font_color", "default_value": 0},
        {"nom" : "adapt_font_color", "default_value": 0},
        {"nom" : "ccc_font_color", "default_value": 0},
        {"nom" : "font_color", "default_value": "#ffffff"},
        {"nom" : "perso_font_family", "default_value": 0},
        {"nom" : "font_family", "default_value": "Arial"},
        {"nom" : "perso_font_weight", "default_value": 0},
        {"nom" : "font_weight", "default_value": "bold"},
        {"nom" : "perso_font_style", "default_value": 0},
        {"nom" : "font_style", "default_value": "normal"},

        {"nom" : "header_disp", "default_value": 0},
        {"nom" : "header_width", "default_value": 32},
        {"nom" : "header_font_size", "default_value": 24},
        {"nom" : "header_text", "default_value": "Header"},
        {"nom" : "header_text_orientation", "default_value": 0},
        {"nom" : "header_position", "default_value": 0},
        {"nom" : "header_is_foreground", "default_value": 0},
        {"nom" : "header_x_offset", "default_value": 0},
        {"nom" : "header_y_offset", "default_value": 0},
        {"nom" : "ccc_header_bg_color", "default_value": 0},
        {"nom" : "header_bg_color", "default_value": "#666666"},
        {"nom" : "header_bg_opacity", "default_value": 1},
        {"nom" : "adapt_header_font_color", "default_value": 0},
        {"nom" : "ccc_header_font_color", "default_value": 0},
        {"nom" : "header_font_color", "default_value": "#bbbbbb"},
        {"nom" : "header_font_family", "default_value": "Arial"},
        {"nom" : "header_font_weight", "default_value": "bold"},
        {"nom" : "header_font_style", "default_value": "normal"},
        {"nom" : "header_border_left_width", "default_value": 0},
        {"nom" : "header_border_top_width", "default_value": 0},
        {"nom" : "header_border_right_width", "default_value": 0},
        {"nom" : "header_border_bottom_width", "default_value": 0},
        {"nom" : "ccc_header_border_color", "default_value": 0},
        {"nom" : "header_border_color", "default_value": "#0088ff"},
        {"nom" : "header_border_opacity", "default_value": 1},
        {"nom" : "header_border_tl_radius", "default_value": 0},
        {"nom" : "header_border_tr_radius", "default_value": 0},
        {"nom" : "header_border_bl_radius", "default_value": 0},
        {"nom" : "header_border_br_radius", "default_value": 0},

    ]
    // Liste des options avanc�es du dashboard sp�cifique � chauqe display, et non d�finies par d�faut dans le var_default_options.js
    var displays_list_not_defined = [
        {"nom": "image_de_premier_plan", "default_value": ""},
        {"nom": "grid_disp", "default_value": 1},
        {"nom": "grid_front", "default_value": 1},
        {"nom": "grid_w", "default_value": 16},
        {"nom": "grid_h", "default_value": 16},
        {"nom": "grid_snap", "default_value": 1},
    ]

    var name, nom, default_value;

    for (var i in var_dashboard_advanced_more_options_default) {
        nom = var_dashboard_advanced_more_options_default[i]["nom"];
        default_value = var_dashboard_advanced_more_options_default[i]["default_value"];
        for (var j in modlist) {
            name = modlist[j];
            if (advanced[nom + "_" + name + d] == undefined) {
                advanced[nom + "_" + name + d] = default_value;
            }
        }
    }

    for (var i in displays_list_not_defined) {
        nom = displays_list_not_defined[i]["nom"];
        default_value = displays_list_not_defined[i]["default_value"];
        if (advanced[nom + d] == undefined) {
            advanced[nom + d] = default_value;
        }
    }

    //console.log(Date.now() - t)

}


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

function RGBA(e, alpha, param) { //e = jQuery element, alpha = background-opacity, param : le param�tre css dont on veut sp�cifier l'opacit�
    if (param == undefined) {
        param = "background-color";  // param�tre par d�faut
    }

    if (alpha < 1/500) {  // Pour �viter de bugguer avec firefox
        alpha = 1/500;
    }
    //b = e.css('backgroundColor');
    b = $(e).css(param);

    if (b != 'transparent' && b != undefined && b != "") {
        //$(e).css('backgroundColor', 'rgba' + b.slice(b.indexOf('('), ( (b.match(/,/g).length == 2) ? -1 : b.lastIndexOf(',') - b.length)) + ', ' + alpha + ')');
        $(e).css(param, 'rgba' + b.slice(b.indexOf('('), ( (b.match(/,/g).length == 2) ? -1 : b.lastIndexOf(',') - b.length)) + ', ' + alpha + ')');
    }

}

function hexToRgb(str) {
    if ( /^#([0-9a-f]{3}|[0-9a-f]{6})$/ig.test(str) ) {
        var hex = str.substr(1);
        hex = hex.length == 3 ? hex.replace(/(.)/g, '$1$1') : hex;
        var rgb = parseInt(hex, 16);
        return 'rgb(' + [(rgb >> 16) & 255, (rgb >> 8) & 255, rgb & 255].join(',') + ')';
    }

    return false;
}

function change_bg(name, bg, alpha) {
    if (bg != "") {
        if (bg.includes("rgb")) {
            var b = bg;
        } else {
            var b = hexToRgb(bg);
        }

        var tmp_bg = 'rgba' + b.slice(b.indexOf('('), ( (b.match(/,/g).length == 2) ? -1 : b.lastIndexOf(',') - b.length)) + ', ' + alpha + ')';
        //jQuery('#' + name).css('backgroundColor', tmp_bg);
        set_style_bg(name, tmp_bg)
    } else {
        set_style_bg(name, "")
    }
}

function set(id, left, top, larg, haut, fontsize) {
    //console.log(id, left, top, larg, haut)
    if (document.getElementById(id) != undefined) {
        document.getElementById(id).style.left = Math.floor(w * left / dashboard_ref_w) + x_offset + "px";
        if (larg >= 0)
            document.getElementById(id).style.width = wh(w * left / dashboard_ref_w, w * larg / dashboard_ref_w) + "px";
        document.getElementById(id).style.top = Math.floor(w * top / dashboard_ref_w) + y_offset + "px";
        if (haut >= 0) {
            document.getElementById(id).style.lineHeight = wh(w * top / dashboard_ref_w, w * haut / dashboard_ref_w) + "px";
            document.getElementById(id).style.height = wh(w * top / dashboard_ref_w, w * haut / dashboard_ref_w) + "px";  // important pour les iframes qui sont affich� en block et pas en inline-block
        }
        if (fontsize > 0)
            document.getElementById(id).style.fontSize = w * fontsize + "px";
    }
}

function set_box(id, left, top, larg, larg_offset, haut, haut_offset, fontsize, x_pct, y_pct, w_pct, h_pct) {

    if (x_pct != undefined) {
        left = x_pct * (larg + larg_offset) + left;
    } else {
        x_pct = 0;
    }
    if (y_pct != undefined) {
        top = y_pct * (haut + haut_offset) + top;
    } else {
        y_pct = 1;
    }
    if (w_pct == undefined) {
        w_pct = 1;
    }
    if (h_pct == undefined) {
        h_pct = 1;
    }

    if (id == "rpm_leds") {
        set_box_leds(left, top, larg, larg_offset, haut, haut_offset);
    } else {

        // REM : si larg_offset ou haut_offset = 0 c'est qu'on est � 100%

        if (document.getElementById(id) != undefined) {

            //document.getElementById(id).style.left = Math.floor(w * left / dashboard_ref_w) + "px";
            document.getElementById(id).style.left = w * left / dashboard_ref_w + "px";
            if (larg >= 0 && larg_offset != 0) {
                //document.getElementById(id).style.width = w * (larg + larg_offset) / dashboard_ref_w + "px";
                document.getElementById(id).style.width = Math.min(Math.round(w * 1 * (larg) / dashboard_ref_w + 0.5*w_pct) - w * left / dashboard_ref_w, Math.round(w * w_pct * (larg + larg_offset) / dashboard_ref_w + 0.5*w_pct)) + "px";
            } else if (larg_offset == 0) {
                document.getElementById(id).style.width = 100*w_pct + "%";
            }
            document.getElementById(id).style.top = w * top / dashboard_ref_w + "px";
            if (haut >= 0 && haut_offset != 0) {
                //document.getElementById(id).style.lineHeight = w * (haut + haut_offset) / dashboard_ref_w + "px";
                //document.getElementById(id).style.height = w * (haut + haut_offset) / dashboard_ref_w + "px";  // important pour les iframes qui sont affich� en block et pas en inline-block
                document.getElementById(id).style.lineHeight = Math.min(Math.round(w * 1 * (haut) / dashboard_ref_w + 0.5*h_pct) - w * top / dashboard_ref_w, Math.round(w * h_pct * (haut + haut_offset) / dashboard_ref_w + 0.5*h_pct)) + "px";
                document.getElementById(id).style.height = Math.min(Math.round(w * 1 * (haut) / dashboard_ref_w + 0.5*h_pct) - w * top / dashboard_ref_w, Math.round(w * h_pct * (haut + haut_offset) / dashboard_ref_w + 0.5*h_pct)) + "px";  // important pour les iframes qui sont affich� en block et pas en inline-block
            } else if (haut_offset == 0) {
                // REM : le 100% ne fonctionne pss pour le lineHeight car quand on change de setting �a bug
                document.getElementById(id).style.lineHeight = Math.min(w * 1 * (haut) / dashboard_ref_w - w * top / dashboard_ref_w, w * h_pct * (haut + haut_offset) / dashboard_ref_w) + "px";
                document.getElementById(id).style.height = 100*h_pct + "%";
            }
            if (fontsize > 0)
                document.getElementById(id).style.fontSize = w * fontsize + "px";
        }

        // On traite les �l�ments particuliers
        var name = id;
        for (var suffixe in elt_list_with_) {
            if (name in elt_list_with_[suffixe]) {
                set_box(name + suffixe, left, top, larg, larg_offset, haut, haut_offset, fontsize);
            }
        }
        if (name == "delta_pre") {
            context_pre.canvas.width = Math.min(w * 1 * (larg) / dashboard_ref_w - w * left / dashboard_ref_w, w * w_pct * (larg + larg_offset) / dashboard_ref_w);
            context_pre.canvas.height = Math.min(w * 1 * (haut) / dashboard_ref_w - w * top / dashboard_ref_w, w * h_pct * (haut + haut_offset) / dashboard_ref_w);
            contextB_pre.canvas.width = Math.min(w * 1 * (larg) / dashboard_ref_w - w * left / dashboard_ref_w, w * w_pct * (larg + larg_offset) / dashboard_ref_w);
            contextB_pre.canvas.height = Math.min(w * 1 * (haut) / dashboard_ref_w - w * top / dashboard_ref_w, w * h_pct * (haut + haut_offset) / dashboard_ref_w);
            set_box("deltaB_pre", left, top, larg, larg_offset, haut, haut_offset, fontsize);
        }
        if (name == "delta_post") {
            context_post.canvas.width = Math.min(w * 1 * (larg) / dashboard_ref_w - w * left / dashboard_ref_w, w * w_pct * (larg + larg_offset) / dashboard_ref_w);
            context_post.canvas.height = Math.min(w * 1 * (haut) / dashboard_ref_w - w * top / dashboard_ref_w, w * h_pct * (haut + haut_offset) / dashboard_ref_w);
            contextB_post.canvas.width = Math.min(w * 1 * (larg) / dashboard_ref_w - w * left / dashboard_ref_w, w * w_pct * (larg + larg_offset) / dashboard_ref_w);
            contextB_post.canvas.height = Math.min(w * 1 * (haut) / dashboard_ref_w - w * top / dashboard_ref_w, w * h_pct * (haut + haut_offset) / dashboard_ref_w);
            set_box("deltaB_post", left, top, larg, larg_offset, haut, haut_offset, fontsize);
        }
        if (name == "compass") {
            context_compass.canvas.width = Math.min(w * 1 * (larg) / dashboard_ref_w - w * left / dashboard_ref_w, w * w_pct * (larg + larg_offset) / dashboard_ref_w);
            context_compass.canvas.height = Math.min(w * 1 * (haut) / dashboard_ref_w - w * top / dashboard_ref_w, w * h_pct * (haut + haut_offset) / dashboard_ref_w);
        }
    }
}

// REM : la diff�rence avec le set_box c'est le lineHeight qui est divis� par 4
function set_box4perfs(id, left, top, larg, larg_offset, haut, haut_offset, fontsize, x_pct, y_pct, w_pct, h_pct) {

    if (x_pct != undefined) {
        left = x_pct * (larg + larg_offset) + left;
    } else {
        x_pct = 0;
    }
    if (y_pct != undefined) {
        top = y_pct * (haut + haut_offset) + top;
    } else {
        y_pct = 1;
    }
    if (w_pct == undefined) {
        w_pct = 1;
    }
    if (h_pct == undefined) {
        h_pct = 1;
    }

    // REM : si larg_offset ou haut_offset = 0 c'est qu'on est � 100%

    if (document.getElementById(id) != undefined) {
        document.getElementById(id).style.left = w * left / dashboard_ref_w + "px";
        if (larg >= 0 && larg_offset != 0) {
            document.getElementById(id).style.width = Math.min(Math.round(w * 1 * (larg) / dashboard_ref_w + 0.5*w_pct) - w * left / dashboard_ref_w, Math.round(w * w_pct * (larg + larg_offset) / dashboard_ref_w + 0.5*w_pct)) + "px";
        } else if (larg_offset == 0) {
            document.getElementById(id).style.width = 100* w_pct + "%";
        }
        document.getElementById(id).style.top = w * top / dashboard_ref_w + "px";
        if (haut >= 0 && haut_offset != 0) {
            document.getElementById(id).style.lineHeight = 100* h_pct + "%";
            document.getElementById(id).style.height = Math.min(Math.round(w * 1 * (haut) / dashboard_ref_w + 0.5*h_pct) - w * top / dashboard_ref_w, Math.round(w * h_pct * (haut + haut_offset) / dashboard_ref_w + 0.5*h_pct)) + "px";  // important pour les iframes qui sont affich� en block et pas en inline-block
        } else if (haut_offset == 0) {
            document.getElementById(id).style.lineHeight = 100* h_pct + "%";
            document.getElementById(id).style.height = 100* h_pct + "%";
        }
        if (fontsize > 0)
            document.getElementById(id).style.fontSize = w * fontsize + "px";
    }
}


function set_label(id, larg, haut, fontsize, border_top_bottom_width) {
    if (document.getElementById(id) != undefined) {
        document.getElementById(id).style.left = 0 + "px";
        if (larg >= 0)
            document.getElementById(id).style.width = wh(w * 0 / dashboard_ref_w, w * larg / dashboard_ref_w) + "px";
        document.getElementById(id).style.top = 0 + "px";
        if (haut >= 0) {
            document.getElementById(id).style.lineHeight = wh(w * 0 / dashboard_ref_w, w * (haut - border_top_bottom_width) / dashboard_ref_w) + "px";
            document.getElementById(id).style.height = wh(w * 0 / dashboard_ref_w, w * haut / dashboard_ref_w) + "px";  // important pour les iframes qui sont affich� en block et pas en inline-block
        }
        if (fontsize > 0)
            document.getElementById(id).style.fontSize = w * fontsize + "px";
    }
}


function set_label2(id, left, top, larg, haut, fontsize, border_left_right_width, border_top_bottom_width, text_orientation) {
    if (document.getElementById(id) != undefined) {
        //document.getElementById(id).style.left = Math.floor(w * left / dashboard_ref_w) + "px";
        document.getElementById(id).style.left = w * left / dashboard_ref_w + "px";
        if (larg >= 0)
            //document.getElementById(id).style.width = wh(w * 0 / dashboard_ref_w, w * larg / dashboard_ref_w) + "px";
            document.getElementById(id).style.width = w * larg / dashboard_ref_w + "px";
        //document.getElementById(id).style.top = Math.floor(w * top / dashboard_ref_w) + "px";
        document.getElementById(id).style.top = w * top / dashboard_ref_w + "px";
        if (haut >= 0) {
            if (text_orientation == 0) {
                //document.getElementById(id).style.lineHeight = wh(w * 0 / dashboard_ref_w, w * (haut - border_top_bottom_width) / dashboard_ref_w) + "px";
                document.getElementById(id).style.lineHeight = w * (haut - border_top_bottom_width) / dashboard_ref_w + 2 * 0 + "px";
            } else {
                document.getElementById(id).style.lineHeight = w * (larg - border_left_right_width) / dashboard_ref_w + 2 * 0 + "px";
            }
            //document.getElementById(id).style.height = wh(w * 0 / dashboard_ref_w, w * haut / dashboard_ref_w) + "px";  // important pour les iframes qui sont affich� en block et pas en inline-block
            document.getElementById(id).style.height = w * haut / dashboard_ref_w + 2*0 + "px";  // important pour les iframes qui sont affich� en block et pas en inline-block
        }
        if (fontsize > 0)
            document.getElementById(id).style.fontSize = w * fontsize + "px";
    }
}

function set_box_leds(left, top, larg, larg_offset, haut, haut_offset) {
    //haut = larg * 128 / 1536;
    var id = "rpm_leds";

    document.getElementById(id).style.left = w * left / dashboard_ref_w + "px";
    if (larg >= 0 && larg_offset != 0) {
        document.getElementById(id).style.width = w * (larg + larg_offset) / dashboard_ref_w + "px";
    } else if (larg_offset == 0) {
        document.getElementById(id).style.width = "100%";
    }
    document.getElementById(id).style.top = w * top / dashboard_ref_w + "px";
    if (haut >= 0 && haut_offset != 0) {
        document.getElementById(id).style.height = w * (haut + haut_offset) / dashboard_ref_w + "px";  // important pour les iframes qui sont affich� en block et pas en inline-block
    } else if (haut_offset == 0) {
        // REM : le 100% ne fonctionne pss pour le lineHeight car quand on change de setting �a bug
        document.getElementById(id).style.height = "100%";
    }

    for (var i = 1; i <= 12; i++) {
        document.getElementById("led" + i).style.left = w / dashboard_ref_w * (larg + larg_offset) * (8 + 128 * (i - 1)) / 1536 + "px";
        document.getElementById("led" + i).style.top = w * (larg + larg_offset) / dashboard_ref_w * 8 / 1536 + "px";
        document.getElementById("led" + i).style.width = w * (larg + larg_offset) / dashboard_ref_w * 112 / 1536 + "px";
        tmp_h = Math.abs(w * (haut + haut_offset) / dashboard_ref_w - w * (larg + larg_offset) / dashboard_ref_w * 16 / 1536);   // On fait ABS sinon pour les petites valeurs, cela devient n�gatif et la hauteur n'est pas mise � jour
        document.getElementById("led" + i).style.height = tmp_h + "px";
    }

}


function set_leds(left, top, larg, haut) {
    //haut = larg * 128 / 1536;
    var id = "rpm_leds";
    document.getElementById(id).style.left = Math.floor(w * left / dashboard_ref_w) + x_offset + "px";
    if (larg >= 0) {
        document.getElementById(id).style.width = wh(w * left / dashboard_ref_w, w * larg / dashboard_ref_w) + "px";
    }
    document.getElementById(id).style.top = Math.floor(w * top / dashboard_ref_w) + y_offset + "px";
    if (haut >= 0) {
        document.getElementById(id).style.height = wh(w * top / dashboard_ref_w, w * haut / dashboard_ref_w) + "px";
    }

    for (var i = 1; i <= 12; i++) {
        document.getElementById("led" + i).style.left = w / dashboard_ref_w * larg * (8 + 128 * (i - 1)) / 1536 + "px";
        document.getElementById("led" + i).style.top = w * larg / dashboard_ref_w * 8 / 1536 + "px";
        document.getElementById("led" + i).style.width = w * larg / dashboard_ref_w * 112 / 1536 + "px";
        tmp_h = Math.abs(w * haut / dashboard_ref_w - w * larg / dashboard_ref_w * 16 / 1536);   // On fait ABS sinon pour les petites valeurs, cela devient n�gatif et la hauteur n'est pas mise � jour
        document.getElementById("led" + i).style.height = tmp_h + "px";
    }

}


// REM : la diff�rence avec le set c'est le lineHeight qui est divis� par 4
function set4perfs(id, left, top, larg, haut, fontsize) {
    if (document.getElementById(id) != undefined) {
        document.getElementById(id).style.left = Math.floor(w * left / dashboard_ref_w) + x_offset + "px";
        if (larg >= 0)
            document.getElementById(id).style.width = wh(w * left / dashboard_ref_w, w * larg / dashboard_ref_w) + "px";
        document.getElementById(id).style.top = Math.floor(w * top / dashboard_ref_w) + y_offset + "px";
        if (haut >= 0) {
            document.getElementById(id).style.lineHeight = wh(w * top / dashboard_ref_w, w * haut / dashboard_ref_w / 4) + "px";
            document.getElementById(id).style.height = wh(w * top / dashboard_ref_w, w * haut / dashboard_ref_w) + "px";
        }
        if (fontsize > 0)
            document.getElementById(id).style.fontSize = w * fontsize + "px";
    }
}

function cc(d, num, c) {
    var str = d;
    //if (str == "0xffffff" || str == "0x0") str = "0xaaaaaa";
    if (str != undefined) {
        //if (str != "0xffffff" && str != "0x0") {
            str = str.slice(2);
            for (n = str.length; n < 6; n++) {
                str = "0" + str
            }

            // on change le classid si c'est le cas dans classid_by_num
            if (num != undefined && num in classid_by_num) {
                c = classid_by_num[num];
            }

            if (num != undefined && num in bg_by_num) {
                str = bg_by_num[num].slice(1);
            }
            if (c != undefined && c in bg_by_classid_corr) {  // si on a d�finit une class sp�cifique pour un num�ros ainsi qu'une couleur
                str = bg_by_classid_corr[c].slice(1);
            }

            return "#" + str;
        /*} else {
            return "#9e9e9e";
        }*/
    }
}

function wh(start, long) {
    return Math.floor(start + long) - Math.floor(start);
}


function do_set_boxes(name, name_without_suffixe, d, x_pct, y_pct, w_pct, h_pct) {


    // Pourquoi le name_without_suffixe ?
    // C'est parce que quand on appelle do_set_boxes("estlaps_bg1",
    // on veut pouvoir r�cup�rer les bons param�tres car il n'y en a pas pour estlaps_bg1,
    // mais uniquement pour estlaps

    if (x_pct == undefined) x_pct = 0;
    if (y_pct == undefined) y_pct = 0;
    if (w_pct == undefined) w_pct = 1;
    if (h_pct == undefined) h_pct = 1;



    var header_width = 0;
    if (advanced["header_disp_" + name_without_suffixe + d]) {
        header_width = advanced["header_width_" + name_without_suffixe + d];
    }

    // On inverse top avec bottom et left avec right car on fait une rotation � 180 si on est en vertical
    if (advanced["header_text_orientation_" + name_without_suffixe + d] == 0) {
        var header_left_width = advanced["header_border_left_width_" + name_without_suffixe + d];
        var header_top_width = advanced["header_border_top_width_" + name_without_suffixe + d];
        var header_right_width = advanced["header_border_right_width_" + name_without_suffixe + d];
        var header_bottom_width = advanced["header_border_bottom_width_" + name_without_suffixe + d];
    } else {
        var header_left_width = advanced["header_border_right_width_" + name_without_suffixe + d];
        var header_top_width = advanced["header_border_bottom_width_" + name_without_suffixe + d];
        var header_right_width = advanced["header_border_left_width_" + name_without_suffixe + d];
        var header_bottom_width = advanced["header_border_top_width_" + name_without_suffixe + d];
    }

    var box_left_width = advanced["box_border_left_width_" + name_without_suffixe + d];
    var box_top_width = advanced["box_border_top_width_" + name_without_suffixe + d];
    var box_right_width = advanced["box_border_right_width_" + name_without_suffixe + d];
    var box_bottom_width = advanced["box_border_bottom_width_" + name_without_suffixe + d];

    if (advanced["header_position_" + name_without_suffixe + d] == 0) {  // Header en haut
        if (name_without_suffixe == 'perfs') {
            if (advanced["header_is_foreground_" + name_without_suffixe + d] && advanced["header_disp_" + name_without_suffixe + d]) {
                set_box4perfs(name, box_left_width + 0, 0 + header_width + advanced["header_y_offset_" + name_without_suffixe + d], advanced["w_" + name_without_suffixe + d], -0 - box_left_width - box_right_width, advanced["h_" + name_without_suffixe + d], -header_width - 0 - box_bottom_width - advanced["header_y_offset_" + name_without_suffixe + d], advanced["f_" + name_without_suffixe + d] / dashboard_ref_w, x_pct, y_pct, w_pct, h_pct);
            } else {
                set_box4perfs(name, box_left_width + 0, box_top_width + header_width, advanced["w_" + name_without_suffixe + d], -0 - box_left_width - box_right_width, advanced["h_" + name_without_suffixe + d], -header_width - box_top_width - box_bottom_width, advanced["f_" + name_without_suffixe + d] / dashboard_ref_w, x_pct, y_pct, w_pct, h_pct);
            }
        } else {
            if (advanced["header_is_foreground_" + name_without_suffixe + d] && advanced["header_disp_" + name_without_suffixe + d]) {
                set_box(name, box_left_width + 0, 0 + header_width + advanced["header_y_offset_" + name_without_suffixe + d], advanced["w_" + name_without_suffixe + d], -0 - box_left_width - box_right_width, advanced["h_" + name_without_suffixe + d], -header_width - 0 - box_bottom_width - advanced["header_y_offset_" + name_without_suffixe + d], advanced["f_" + name_without_suffixe + d] / dashboard_ref_w, x_pct, y_pct, w_pct, h_pct);
            } else {
                set_box(name, box_left_width + 0, box_top_width + header_width, advanced["w_" + name_without_suffixe + d], -0 - box_left_width - box_right_width, advanced["h_" + name_without_suffixe + d], -header_width - box_top_width - box_bottom_width, advanced["f_" + name_without_suffixe + d] / dashboard_ref_w, x_pct, y_pct, w_pct, h_pct);
            }
        }
    } else if (advanced["header_position_" + name_without_suffixe + d] == 1) {  // Header � gauche
        if (name_without_suffixe == 'perfs') {
            if (advanced["header_is_foreground_" + name_without_suffixe + d] && advanced["header_disp_" + name_without_suffixe + d]) {
                set_box4perfs(name, 0 + header_width + advanced["header_x_offset_" + name_without_suffixe + d], box_top_width + 0, advanced["w_" + name_without_suffixe + d], -header_width - 0 - box_right_width - advanced["header_x_offset_" + name_without_suffixe + d], advanced["h_" + name_without_suffixe + d], -0 - box_top_width - box_bottom_width, advanced["f_" + name_without_suffixe + d] / dashboard_ref_w, x_pct, y_pct, w_pct, h_pct);
            } else {
                set_box4perfs(name, box_left_width + header_width, box_top_width + 0, advanced["w_" + name_without_suffixe + d], -header_width - box_left_width - box_right_width, advanced["h_" + name_without_suffixe + d], -0 - box_top_width - box_bottom_width, advanced["f_" + name_without_suffixe + d] / dashboard_ref_w, x_pct, y_pct, w_pct, h_pct);
            }
        } else {
            if (advanced["header_is_foreground_" + name_without_suffixe + d] && advanced["header_disp_" + name_without_suffixe + d]) {
                set_box(name, 0 + header_width + advanced["header_x_offset_" + name_without_suffixe + d], box_top_width + 0, advanced["w_" + name_without_suffixe + d], -header_width - 0 - box_right_width - advanced["header_x_offset_" + name_without_suffixe + d], advanced["h_" + name_without_suffixe + d], -0 - box_top_width - box_bottom_width, advanced["f_" + name_without_suffixe + d] / dashboard_ref_w, x_pct, y_pct, w_pct, h_pct);
            } else {
                set_box(name, box_left_width + header_width, box_top_width + 0, advanced["w_" + name_without_suffixe + d], -header_width - box_left_width - box_right_width, advanced["h_" + name_without_suffixe + d], -0 - box_top_width - box_bottom_width, advanced["f_" + name_without_suffixe + d] / dashboard_ref_w, x_pct, y_pct, w_pct, h_pct);
            }
        }
    } else {  // Header en bas
        if (name_without_suffixe == 'perfs') {
            if (advanced["header_is_foreground_" + name_without_suffixe + d] && advanced["header_disp_" + name_without_suffixe + d]) {
                set_box4perfs(name, box_left_width + 0, box_top_width + 0, advanced["w_" + name_without_suffixe + d], -0 - box_left_width - box_right_width, advanced["h_" + name_without_suffixe + d], -header_width - box_top_width - 0 + advanced["header_y_offset_" + name_without_suffixe + d], advanced["f_" + name_without_suffixe + d] / dashboard_ref_w, x_pct, y_pct, w_pct, h_pct);
            } else {
                set_box4perfs(name, box_left_width + 0, box_top_width + 0, advanced["w_" + name_without_suffixe + d], -0 - box_left_width - box_right_width, advanced["h_" + name_without_suffixe + d], -header_width - box_top_width - box_bottom_width, advanced["f_" + name_without_suffixe + d] / dashboard_ref_w, x_pct, y_pct, w_pct, h_pct);
            }
        } else {
            if (advanced["header_is_foreground_" + name_without_suffixe + d] && advanced["header_disp_" + name_without_suffixe + d]) {
                set_box(name, box_left_width + 0, box_top_width + 0, advanced["w_" + name_without_suffixe + d], -0 - box_left_width - box_right_width, advanced["h_" + name_without_suffixe + d], -header_width - box_top_width - 0 + advanced["header_y_offset_" + name_without_suffixe + d], advanced["f_" + name_without_suffixe + d] / dashboard_ref_w, x_pct, y_pct, w_pct, h_pct);
            } else {
                set_box(name, box_left_width + 0, box_top_width + 0, advanced["w_" + name_without_suffixe + d], -0 - box_left_width - box_right_width, advanced["h_" + name_without_suffixe + d], -header_width - box_top_width - box_bottom_width, advanced["f_" + name_without_suffixe + d] / dashboard_ref_w, x_pct, y_pct, w_pct, h_pct);
            }
        }
    }

}


function responsive_dim() {

    var dpr = window.devicePixelRatio || 1;

    init_html_style();  // important car sinon le set_style_top, set_inner_html, ..., ne seront pas pris en compte

    // On rectifie la valeur du use_css_perso qu'on avait rendu n�gatif pour avertir config.js qu'il fallait recharger la page
    while (use_css_perso < 0) {
        use_css_perso += 10;
    }

    // On applique le style contenu dans JRT Config
    if (use_css_perso) {
        if (css_perso_content != "init") {
            document.getElementById("style_perso").innerHTML = css_perso_content;
        }
    } else {
        document.getElementById("css_perso").href = "";
        document.getElementById("style_perso").innerHTML = "";
    }

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

    estlaps_bg1_pct = 0;
    fuelneed_bg1_pct = 0;
    fuelneed1_bg1_pct = 0;
    fuelneed5_bg1_pct = 0;
    lapsremain_bg1_pct = 0;
    gap_pct_lastlap = 0;

    estlaps_bg1_pct_old = null;
    nbpits_old = null;
    lapsremain_bg1_pct_old = null;
    gap_pct_lastlap_old = null;
    fuelneed_bg1_pct_old = null;
    fuelneed1_bg1_pct_old = null;
    fuelneed5_bg1_pct_old = null;

    w = window_innerWidth;
    h = window_innerHeight;

    // Si le ref_w et ref_h sont d�finis pour le display, il remplace le r�glage g�n�ral
    disp_sel = "_" + advanced["display_selected"];
    ref_w = advanced["ref_w" + disp_sel];
    ref_h = advanced["ref_h" + disp_sel];
    if (ref_w != undefined) dashboard_ref_w = ref_w;
    if (ref_h != undefined) dashboard_ref_h = ref_h;
    trans_obs = advanced["transparency_OBS" + disp_sel];
    if (trans_obs != undefined) transparency_OBS = trans_obs;

    ratio = dashboard_ref_w / dashboard_ref_h;

    if (w/h > ratio) {
        w = Math.floor(h * ratio);
        x_offset = (window_innerWidth - w)/2;  // pour centrer le dashboard
        y_offset = 0;
    } else {
        h = Math.floor(w / ratio);
        x_offset = 0;
        y_offset = (window_innerHeight - h)/2;  // pour centrer le dashboard
    }

    if (transparency_OBS) {
        //document.body.style.backgroundColor = "rgba(134,34,34,0.0)";
        RGBA(jQuery('body'), 0.0);
        RGBA(jQuery('#page'), 0.0);
        document.getElementById("shift").style.backgroundColor = "rgba(0,0,0,0)";
        //document.getElementById("shift_bg").style.backgroundColor = "rgba(0,0,0,0)";
        document.getElementById("dashboard_light").style.backgroundColor = "rgba(0,0,0,0)";
        //document.getElementById("dashboard_light_bg").style.backgroundColor = "rgba(0,0,0,0)";
        change_bg("bb", "#000000", advanced["bg_" + "bb" + "_" + advanced["display_selected"]]);
        change_bg("tc", "#00bb00", advanced["bg_" + "tc" + "_" + advanced["display_selected"]]);
        change_bg("tc2", "#00bb00", advanced["bg_" + "tc2" + "_" + advanced["display_selected"]]);
        change_bg("ffb", "#000000", advanced["bg_" + "ffb" + "_" + advanced["display_selected"]]);
        change_bg("b_cont", "#000000", advanced["bg_" + "b_cont" + "_" + advanced["display_selected"]]);
        change_bg("t_cont", "#000000", advanced["bg_" + "t_cont" + "_" + advanced["display_selected"]]);
        change_bg("c_cont", "#000000", advanced["bg_" + "c_cont" + "_" + advanced["display_selected"]]);
        change_bg("ffbpct_cont", "#000000", advanced["bg_" + "ffbpct_cont" + "_" + advanced["display_selected"]]);
        // ??? change_bg("abs", "#bb0000", advanced["bg_" + "abs" + "_" + advanced["display_selected"]]);
        // ??? change_bg("wj", "#000000", advanced["bg_" + "wj" + "_" + advanced["display_selected"]]);
    } else {
        //document.body.style.backgroundColor = "rgba(34,34,34,1.0)";
        RGBA(jQuery('body'), 1.0);
        RGBA(jQuery('#page'), 1.0);
    }

    $("#page").css("width", window_innerWidth + "px");
    $("#page").css("height", window_innerHeight + "px");

    if (carname in car_with_drs) {
        document.getElementById("drs").style.display = "inline-block";
    } else {
        document.getElementById("drs").style.display = "none";
    }
    if (carname in car_with_ers_drs) {
        document.getElementById("ers").style.display = "inline-block";
        document.getElementById("ersco").style.display = "inline-block";
        document.getElementById("ers_margin").style.display = "inline-block";
        document.getElementById("mgul").style.display = "inline-block";
        document.getElementById("mgu").style.display = "inline-block";
        document.getElementById("mgua").style.display = "inline-block";
        document.getElementById("mguf").style.display = "inline-block";
        document.getElementById("regen_lap").style.display = "inline-block";
        document.getElementById("regen_turn").style.display = "inline-block";
    } else {
        document.getElementById("ers").style.display = "none";
        document.getElementById("ersco").style.display = "none";
        document.getElementById("ers_margin").style.display = "none";
        document.getElementById("mgul").style.display = "none";
        document.getElementById("mgu").style.display = "none";
        document.getElementById("mgua").style.display = "none";
        document.getElementById("mguf").style.display = "none";
        document.getElementById("regen_lap").style.display = "none";
        document.getElementById("regen_turn").style.display = "none";
    }

    document.getElementById("shift").style.fontSize = h * shiftlight_Hpct / 100 + "px";
    document.getElementById("shift").style.lineHeight = window_innerHeight * shiftlight_Hpct / 100 + "px";
    document.getElementById("shift").style.opacity = shiftlight_opacity;
    //document.getElementById("shift_bg").style.opacity = shiftlight_opacity;
    document.getElementById("shift").style.left = x_offset + shiftlight_Xpct * w / 100 + "px";
    document.getElementById("shift").style.top = y_offset + shiftlight_Ypct * h / 100 + "px";
    document.getElementById("shift").style.width = w * shiftlight_Wpct / 100 + "px";
    document.getElementById("shift").style.height = h * shiftlight_Hpct / 100 + "px";

    document.getElementById("dashboard_light").style.fontSize = h * dashboard_light_Hpct / 100 + "px";
    document.getElementById("dashboard_light").style.lineHeight = window_innerHeight * dashboard_light_Hpct / 100 + "px";
    //document.getElementById("dashboard_light").style.opacity = dashboard_light_opacity;
    document.getElementById("dashboard_light").style.opacity = 1;
    //document.getElementById("dashboard_light_bg").style.opacity = dashboard_light_opacity;
    document.getElementById("dashboard_light").style.left = x_offset + dashboard_light_Xpct * w / 100 + "px";
    document.getElementById("dashboard_light").style.top = y_offset + dashboard_light_Ypct * h / 100 + "px";
    document.getElementById("dashboard_light").style.width = w * dashboard_light_Wpct / 100 + "px";
    document.getElementById("dashboard_light").style.height = h * dashboard_light_Hpct / 100 + "px";

    d = "_" + advanced["display_selected"];

    if (window_name == "JRT Dashboard") {
        window_shortname = "dashboard";
    }
    if (window_name == "JRT Dashboard2") {
        window_shortname = "dashboard2";
    }

    if (transparency_OBS) {
        // On lit l'image de fond si elle existe et qu'on a choisi l'option transparency for CLR Browser

        if ("image_de_fond" + d in advanced) {
            filename_loc = advanced["image_de_fond" + d];
        } else {
            filename_loc = window_shortname + "/display" + d + ".png";
        }
        if (filename_loc == "") filename_loc = "display_vide.png";
        //console.log("*" +  filename_loc + "*");

        if (filename_loc != filename_loc_old) {
            imgurl = "./" + dashboard_online_folder + "displays_bg/" + filename_loc;

            img = new Image();
            img.src = imgurl;
            $(img)
                .load(function () {
                    imgurl = "./" + dashboard_online_folder + "displays_bg/" + filename_loc;
                    $("#page").css("background-image", "url('" + imgurl + "?" + Math.random() + "')");
                    //$("#page").css("background-position", x_offset + "px " + y_offset + "px");
                    //$("#page").css("background-size", w + "px " + h + "px");
                })
                .error(function () {
                    // Pas d'image de fond -> on charge une image transparente
                    imgurl = "./" + dashboard_online_folder + "displays_bg - default/display_vide.png";
                    $("#page").css("background-image", "url('" + imgurl + "?" + Math.random() + "')");
                    //$("#page").css("background-position", x_offset + "px " + y_offset + "px");
                    //$("#page").css("background-size", w + "px " + h + "px");
                });
            img = null;
            filename_loc_old = filename_loc;
        }

        $("#page").css("background-position", x_offset + "px " + y_offset + "px");
        $("#page").css("background-size", w + "px " + h + "px");

    } else {
        $("#page").css("background-image", "");
    }

    // On lit l'image de premier plan si elle existe
    if ("image_de_premier_plan" + d in advanced) {
        filename_loc_fg = advanced["image_de_premier_plan" + d];
    } else {
        filename_loc_fg = "";
    }

    if (filename_loc_fg != filename_loc_fg_old) {
        if (filename_loc_fg == "") {
            imgurl_fg = "";
        } else {
            imgurl_fg = "./" + dashboard_online_folder + "displays_bg/" + filename_loc_fg;
        }

        if (imgurl_fg != "") {
            img_fg = new Image();
            img_fg.src = imgurl_fg;
            $(img_fg)
                .load(function () {
                    imgurl_fg = "./" + dashboard_online_folder + "displays_bg/" + filename_loc_fg;
                    $("#page_frontground").css("display", "block");
                    $("#page_frontground").css("background-image", "url('" + imgurl_fg + "?" + Math.random() + "')");
                    $("#page_frontground").css("background-position", x_offset + "px " + y_offset + "px");
                    $("#page_frontground").css("background-size", w + "px " + h + "px");
                })
                .error(function () {
                    // Pas d'image de fond -> on charge une image transparente
                    //imgurl_fg = "./" + dashboard_online_folder + "displays_bg - default/display_vide.png";
                    //$("#page_frontground").css("background-image", "url('" + imgurl_fg + "?" + Math.random() + "')");
                    //$("#page_frontground").css("background-position", x_offset + "px " + y_offset + "px");
                    //$("#page_frontground").css("background-size", w + "px " + h + "px");
                    $("#page_frontground").css("background-image", "");
                    $("#page_frontground").css("display", "none");
                });
            img_fg = null;
            filename_loc_fg_old = filename_loc_fg;
        }
    } else {
        $("#page_frontground").css("background-image", "");
        $("#page_frontground").css("display", "none");
    }


    //console.log(bg_default_value["gear"], document.getElementById("gear").style.backgroundColor);

    document.getElementById("highlight_elt_cont").style.display = "none";  // affich� apr�s si n�cessaire
    name_highlighted = null;
    d_highlighted = null;

    // Si certaines valeurs ne sont pas d�finient on r�gle les valeurs par d�faut pour �viter les bugs si c'est undefined
    set_var_dashboard_advanced_more_options_and_list_not_defined_default(d);

    for (i in modlist) {
        name = modlist[i];

        //if (name != "rpm_leds") {
        if (true) {

            // Au premier chargement de la page, on m�morise les propri�t�s des �l�ments pour savoir quelles sont les valeurs par d�faut pour pouvoir les r�tablir
            // REM : cela ne prendra pas en compte les changement dans le css perso qui sont toujours appliqu�s et prioritaire si on a mis !important
            if (bg_default_value[name] == null) {
                bg_default_value[name] = document.getElementById(name).style.backgroundColor;
            }
            if (font_col_default_value[name] == null) {
                font_col_default_value[name] = document.getElementById(name).style.color;
            }
            if (font_family_default_value[name] == null) {
                font_family_default_value[name] = document.getElementById(name).style.fontFamily;
            }
            if (font_weight_default_value[name] == null) {
                font_weight_default_value[name] = document.getElementById(name).style.fontWeight;
            }
            if (font_style_default_value[name] == null) {
                font_style_default_value[name] = document.getElementById(name).style.fontStyle;
            }

            if (("disp_" + name + d) in advanced) {

                if (advanced["disp_" + name + d]) {

                    // On traite les Options suppl�mentaires

                    if (advanced["highlight_" + name + d]) {
                        document.getElementById("highlight_elt_cont").style.display = "block";
                        set("highlight_elt_cont", advanced["x_" + name + d], advanced["y_" + name + d], advanced["w_" + name + d], advanced["h_" + name + d], advanced["f_" + name + d] / dashboard_ref_w);
                        name_highlighted = name;
                        d_highlighted = d;

                        document.getElementById("highlight_elt_border").style.border = 3 / dpr + "px solid #ffff00";

                    }

                    // Pour les valeurs tmp_barres_with_text_list on change les propri�t�s de font dans name + "_text"
                    var suffixe_text = "";
                    if (name in elt_list_with_["_text"]) {
                        suffixe_text = "_text"
                    }

                    // REM : pas besoin de s'emb�ter avec le set_style_bg_alpha car on fait un RGBA plus loin et ce n'est pas bon car si on envoie une valeur "" le bg_color ne sera pas mis � jour
                    if (advanced["perso_bg_color_" + name + d]) {
                        if (advanced["ccc_bg_color_" + name + d]) {
                            //if (document.getElementById(name).style.backgroundColor == "") {  // REM : on ne fait plus �a car c'est probl�matique quand iRacing n'est pas connect�
                                //set_style_bg_alpha(name, "#ff0000", advanced["bg_" + name + d]);
                                document.getElementById(name).style.backgroundColor = "#ff0000";
                            //}
                        } else {
                            //set_style_bg_alpha(name, advanced["bg_color_" + name + d], advanced["bg_" + name + d]);
                            document.getElementById(name).style.backgroundColor = advanced["bg_color_" + name + d];
                        }
                    } else {
                        //set_style_bg_alpha(name, bg_default_value[name], advanced["bg_" + name + d]);
                        document.getElementById(name).style.backgroundColor = bg_default_value[name];
                    }

                    if (advanced["perso_font_color_" + name + d]) {
                        if (advanced["adapt_font_color_" + name + d]) {
                            set_style_color(name, calc_font_coul(document.getElementById(name).style.backgroundColor));
                        } else if (advanced["ccc_font_color_" + name + d]) {
                            //if (document.getElementById(name).style.color == "") {  // REM : on ne fait plus �a car c'est probl�matique quand iRacing n'est pas connect�
                                set_style_color(name, "red");
                            //}
                        } else {
                            set_style_color(name, advanced["font_color_" + name + d]);
                        }
                    } else {
                        set_style_color(name, font_col_default_value[name]);
                    }


                    if (advanced["perso_font_family_" + name + d]) {
                        $("#" + name + suffixe_text).css("font-family", advanced["font_family_" + name + d]);
                    } else {
                        $("#" + name + suffixe_text).css("font-family", font_family_default_value[name]);  // option par d�faut
                    }
                    if (advanced["perso_font_weight_" + name + d]) {
                        $("#" + name + suffixe_text).css("font-weight", advanced["font_weight_" + name + d]);
                    } else {
                        $("#" + name + suffixe_text).css("font-weight", font_weight_default_value[name]);  // option par d�faut
                    }
                    if (advanced["perso_font_style_" + name + d]) {
                        $("#" + name + suffixe_text).css("font-style", advanced["font_style_" + name + d]);
                    } else {
                        $("#" + name + suffixe_text).css("font-style", font_style_default_value[name]);  // option par d�faut
                    }

                    if (name == 'ers_margin') {
                        set('ers_margin_min_bar', advanced["x_" + name + d], advanced["y_" + name + d], advanced["w_" + name + d], advanced["h_" + name + d], advanced["f_" + name + d] / dashboard_ref_w);
                        set('mgu_margin_max_bar', advanced["x_" + name + d], advanced["y_" + name + d], advanced["w_" + name + d], advanced["h_" + name + d], advanced["f_" + name + d] / dashboard_ref_w);
                        set('ers_margin_free_bar', advanced["x_" + name + d], advanced["y_" + name + d], advanced["w_" + name + d], advanced["h_" + name + d], advanced["f_" + name + d] / dashboard_ref_w);
                    }


                    // Gestion des borders et des headers
                    //
                    var p = document.getElementById("page");

                    // Element qui permet de placer le header au-dessus du border box plus facilement
                    var elt_box_no_border = document.getElementById(name + "_box_no_border");
                    if (!elt_box_no_border) {  // Pour �viter de cr�er l'�l�ment plusieurs fois
                        elt_box_no_border = document.createElement("div");
                        p.appendChild(elt_box_no_border);
                        elt_box_no_border.setAttribute("id", name + "_box_no_border")
                    }
                    elt_box_no_border.style.position = "absolute";
                    elt_box_no_border.style.zIndex = 13 + advanced["zindex_offset_" + name + d];  // pour que le header s'affiche au-dessus du box_border
                    elt_box_no_border.style.display = "inline-block";

                    var elt_box = document.getElementById(name + "_box");
                    if (!elt_box) {  // Pour �viter de cr�er l'�l�ment plusieurs fois
                        elt_box = document.createElement("div");
                        p.appendChild(elt_box);
                        elt_box.setAttribute("id", name + "_box")
                    }
                    elt_box.style.position = "absolute";
                    elt_box.style.zIndex = 9 + advanced["zindex_offset_" + name + d];  // pour que le border s'affiche au-dessus de l'�l�ment principal
                    elt_box.style.display = "inline-block";

                    // REM : le coef 1.01 sert � �liminer les probl�mes de bavures du elt_box sur l'ext�rieur du elt_box_border
                    elt_box.style.borderTopLeftRadius = (advanced["box_border_top_width_" + name + d] > 0 && advanced["box_border_left_width_" + name + d] > 0 ? 1.01 : 1) * advanced["box_border_tl_radius_" + name + d] * w / dashboard_ref_w + "px";
                    elt_box.style.borderTopRightRadius = (advanced["box_border_top_width_" + name + d] > 0 && advanced["box_border_right_width_" + name + d] > 0 ? 1.01 : 1) * advanced["box_border_tr_radius_" + name + d] * w / dashboard_ref_w + "px";
                    elt_box.style.borderBottomLeftRadius = (advanced["box_border_bottom_width_" + name + d] > 0 && advanced["box_border_left_width_" + name + d] > 0 ? 1.01 : 1) * advanced["box_border_bl_radius_" + name + d] * w / dashboard_ref_w + "px";
                    elt_box.style.borderBottomRightRadius = (advanced["box_border_bottom_width_" + name + d] > 0 && advanced["box_border_right_width_" + name + d] > 0 ? 1.01 : 1) * advanced["box_border_br_radius_" + name + d] * w / dashboard_ref_w + "px";

                    // On corrige le bug de l'anti-aliasing en dessinant le border par dessus avec l'�l�ment elt_box_border
                    var elt_box_border = document.getElementById(name + "_box_border");
                    if (!elt_box_border) {  // Pour �viter de cr�er l'�l�ment plusieurs fois
                        elt_box_border = document.createElement("div");
                        p.appendChild(elt_box_border);
                        elt_box_border.setAttribute("id", name + "_box_border")
                    }
                    elt_box_border.style.position = "absolute";
                    elt_box_border.style.zIndex = 11 + advanced["zindex_offset_" + name + d];  // pour que le border s'affiche au-dessus de l'�l�ment principal
                    elt_box_border.style.display = "inline-block";

                    if (advanced["ccc_box_border_color_" + name + d]) {
                        //if (elt_box_border.style.borderColor == "") {  // REM : on ne fait plus �a car c'est probl�matique quand iRacing n'est pas connect�
                            elt_box_border.style.borderColor = "red";
                        //}
                    } else {
                        elt_box_border.style.borderColor = advanced["box_border_color_" + name + d];
                    }

                    // REM : le 0.75 sert � �viter d'avoir un espace entre l'�l�ment et le border_box si on n'est pas ds la d�finition de r�f�rence
                    elt_box_border.style.borderLeftWidth = (advanced["box_border_left_width_" + name + d] > 0 ? 0.75 : 0) + advanced["box_border_left_width_" + name + d] * w / dashboard_ref_w + "px";
                    elt_box_border.style.borderLeftStyle = "solid";
                    elt_box_border.style.borderTopWidth = (advanced["box_border_top_width_" + name + d] > 0 ? 0.75 : 0) + advanced["box_border_top_width_" + name + d] * w / dashboard_ref_w + "px";
                    elt_box_border.style.borderTopStyle = "solid";
                    elt_box_border.style.borderRightWidth = (advanced["box_border_right_width_" + name + d] > 0 ? 0.75 : 0) + advanced["box_border_right_width_" + name + d] * w / dashboard_ref_w + "px";
                    elt_box_border.style.borderRightStyle = "solid";
                    elt_box_border.style.borderBottomWidth = (advanced["box_border_bottom_width_" + name + d] > 0 ? 0.75 : 0) + advanced["box_border_bottom_width_" + name + d] * w / dashboard_ref_w + "px";
                    elt_box_border.style.borderBottomStyle = "solid";

                    elt_box_border.style.borderTopLeftRadius = advanced["box_border_tl_radius_" + name + d] * w / dashboard_ref_w + "px";
                    elt_box_border.style.borderTopRightRadius = advanced["box_border_tr_radius_" + name + d] * w / dashboard_ref_w + "px";
                    elt_box_border.style.borderBottomLeftRadius = advanced["box_border_bl_radius_" + name + d] * w / dashboard_ref_w + "px";
                    elt_box_border.style.borderBottomRightRadius = advanced["box_border_br_radius_" + name + d] * w / dashboard_ref_w + "px";

                    var elt_label = document.getElementById(name + "_label");
                    if (!elt_label) {  // Pour �viter de cr�er l'�l�ment plusieurs fois
                        elt_label = document.createElement("div");
                        elt_label.setAttribute("id", name + "_label");
                    }
                    if (advanced["header_is_foreground_" + name + d]) {
                        elt_box_no_border.appendChild(elt_label);
                    } else {
                        elt_box.appendChild(elt_label);
                    }
                    elt_label.style.position = "absolute";
                    elt_label.style.display = "inline-block";
                    elt_label.style.textAlign = "center";
                    //elt_label.style.zIndex = 11;

                    elt_box.appendChild(document.getElementById(name));
                    for (var suffixe in elt_list_with_) {
                        if (name in elt_list_with_[suffixe]) {
                            elt_box.appendChild(document.getElementById(name + suffixe));
                        }
                    }
                    if (name == "delta_pre") {
                        elt_box.appendChild(document.getElementById("deltaB_pre"));
                    }
                    if (name == "delta_post") {
                        elt_box.appendChild(document.getElementById("deltaB_post"));
                    }

                    var header_width = 0;
                    if (advanced["header_disp_" + name + d]) {
                        header_width = advanced["header_width_" + name + d];
                    }
                    // REM : on r�tablit les apostrophes pour prendre en compte le code html du style <div style=''></div>
                    if (advanced["header_text_" + name + d] != undefined && typeof advanced["header_text_" + name + d] == "string") {
                        //elt_label.innerHTML = advanced["header_text_" + name + d].replaceAll("&apos;", "'");
                        elt_label.innerHTML = advanced["header_text_" + name + d].replace(/&apos;/g, "'");  // replaceAll n'est pas reconnu par Chromium pour les overlays
                    }

                    // On inverse top avec bottom et left avec right car on fait une rotation � 180 si on est en vertical
                    if (advanced["header_text_orientation_" + name + d] == 0) {
                        var header_left_width = advanced["header_border_left_width_" + name + d];
                        var header_top_width = advanced["header_border_top_width_" + name + d];
                        var header_right_width = advanced["header_border_right_width_" + name + d];
                        var header_bottom_width = advanced["header_border_bottom_width_" + name + d];
                    } else {
                        var header_left_width = advanced["header_border_right_width_" + name + d];
                        var header_top_width = advanced["header_border_bottom_width_" + name + d];
                        var header_right_width = advanced["header_border_left_width_" + name + d];
                        var header_bottom_width = advanced["header_border_top_width_" + name + d];
                    }

                    if (advanced["ccc_header_bg_color_" + name + d]) {
                        //if (elt_label.style.backgroundColor == "") {  // REM : on ne fait plus �a car c'est probl�matique quand iRacing n'est pas connect�
                            elt_label.style.backgroundColor = "red";
                        //}
                    } else {
                        elt_label.style.backgroundColor = advanced["header_bg_color_" + name + d];
                    }
                    RGBA(jQuery('#' + name + "_label"), advanced["header_bg_opacity_" + name + d], "background-color");
                    if (advanced["adapt_header_font_color_" + name + d]) {
                        elt_label.style.color = calc_font_coul(elt_label.style.backgroundColor);
                    } else if (advanced["ccc_header_font_color_" + name + d]) {
                        //if (elt_label.style.color == "") {  // REM : on ne fait plus �a car c'est probl�matique quand iRacing n'est pas connect�
                            elt_label.style.color = "red";
                        //}
                    } else {
                        elt_label.style.color = advanced["header_font_color_" + name + d];
                    }

                    elt_label.style.fontFamily = advanced["header_font_family_" + name + d];
                    elt_label.style.fontWeight = advanced["header_font_weight_" + name + d];
                    elt_label.style.fontStyle = advanced["header_font_style_" + name + d];

                    if (advanced["ccc_header_border_color_" + name + d]) {
                        //if (elt_label.style.borderColor == "") {  // REM : on ne fait plus �a car c'est probl�matique quand iRacing n'est pas connect�
                            elt_label.style.borderColor = "red";
                        //}
                    } else {
                        elt_label.style.borderColor = advanced["header_border_color_" + name + d];
                    }

                    elt_label.style.borderLeftWidth = header_left_width * w / dashboard_ref_w + "px";
                    elt_label.style.borderLeftStyle = "solid";
                    elt_label.style.borderTopWidth = header_top_width * w / dashboard_ref_w + "px";
                    elt_label.style.borderTopStyle = "solid";
                    elt_label.style.borderRightWidth = header_right_width * w / dashboard_ref_w + "px";
                    elt_label.style.borderRightStyle = "solid";
                    elt_label.style.borderBottomWidth = header_bottom_width * w / dashboard_ref_w + "px";
                    elt_label.style.borderBottomStyle = "solid";

                    RGBA(elt_label, advanced["header_border_opacity_" + name + d], "border-color");
                    $(elt_label).css("background-clip", "padding-box");  // Pour que le fond n'apparaisse pas sous le border
                    $(elt_label).css("background-clip: padding-box", "padding-box");  // pour Safari

                    elt_label.style.borderTopLeftRadius = advanced["header_border_tl_radius_" + name + d] * w / dashboard_ref_w + "px";
                    elt_label.style.borderTopRightRadius = advanced["header_border_tr_radius_" + name + d] * w / dashboard_ref_w + "px";
                    elt_label.style.borderBottomLeftRadius = advanced["header_border_bl_radius_" + name + d] * w / dashboard_ref_w + "px";
                    elt_label.style.borderBottomRightRadius = advanced["header_border_br_radius_" + name + d] * w / dashboard_ref_w + "px";

                    if (advanced["header_text_orientation_" + name + d] == 0) {  // text horizontal (par d�faut)
                        elt_label.style.writingMode = "";
                        elt_label.style.textOrientation = "";
                        elt_label.style.transform = "";
                    } else {
                        elt_label.style.writingMode = "vertical-rl";
                        elt_label.style.textOrientation = "mixed";
                        elt_label.style.transform = "rotate(-180deg)";
                    }

                    var box_left_width = advanced["box_border_left_width_" + name + d];
                    var box_top_width = advanced["box_border_top_width_" + name + d];
                    var box_right_width = advanced["box_border_right_width_" + name + d];
                    var box_bottom_width = advanced["box_border_bottom_width_" + name + d];

                    if (advanced["header_position_" + name + d] == 0) {  // Header en haut
                        if (advanced["header_is_foreground_" + name + d]) {
                            set_label2(name + "_label", 0, 0, advanced["w_" + name + d], header_width, advanced["header_font_size_" + name + d] / dashboard_ref_w, header_left_width + header_right_width, header_top_width + header_bottom_width, advanced["header_text_orientation_" + name + d]);
                        } else {
                            set_label2(name + "_label", box_left_width, box_top_width, advanced["w_" + name + d] - box_left_width - box_right_width, header_width, advanced["header_font_size_" + name + d] / dashboard_ref_w, header_left_width + header_right_width, header_top_width + header_bottom_width, advanced["header_text_orientation_" + name + d]);
                        }
                    } else if (advanced["header_position_" + name + d] == 1) {  // Header � gauche
                        if (advanced["header_is_foreground_" + name + d]) {
                            set_label2(name + "_label", 0, 0, header_width, advanced["h_" + name + d], advanced["header_font_size_" + name + d] / dashboard_ref_w, header_left_width + header_right_width, header_top_width + header_bottom_width, advanced["header_text_orientation_" + name + d]);
                        } else {
                            set_label2(name + "_label", box_left_width, box_top_width, header_width, advanced["h_" + name + d] - box_top_width - box_bottom_width, advanced["header_font_size_" + name + d] / dashboard_ref_w, header_left_width + header_right_width, header_top_width + header_bottom_width, advanced["header_text_orientation_" + name + d]);
                        }
                    } else {  // Header en bas
                        if (advanced["header_is_foreground_" + name + d]) {
                            set_label2(name + "_label", 0, box_top_width + advanced["h_" + name + d] - header_width - box_top_width - 0, advanced["w_" + name + d] - 0 - 0, header_width, advanced["header_font_size_" + name + d] / dashboard_ref_w, header_left_width + header_right_width, header_top_width + header_bottom_width, advanced["header_text_orientation_" + name + d]);
                        } else {
                            set_label2(name + "_label", box_left_width, box_top_width + advanced["h_" + name + d] - header_width - box_top_width - box_bottom_width, advanced["w_" + name + d] - box_left_width - box_right_width, header_width, advanced["header_font_size_" + name + d] / dashboard_ref_w, header_left_width + header_right_width, header_top_width + header_bottom_width, advanced["header_text_orientation_" + name + d]);
                        }
                    }

                    // Pour �viter le bug o� le header n'est pas tout � fait de la bonne largeur parfois
                    if (advanced["header_is_foreground_" + name + d]) {
                        if (advanced["header_position_" + name + d] == 0 || advanced["header_position_" + name + d] == 2) {
                            elt_label.style.width = "100%";
                        } else {
                            elt_label.style.height = "100%";
                        }
                    }

                    set(name + "_box", advanced["x_" + name + d], advanced["y_" + name + d], advanced["w_" + name + d], advanced["h_" + name + d], advanced["f_" + name + d] / dashboard_ref_w);
                    set(name + "_box_border", advanced["x_" + name + d], advanced["y_" + name + d], advanced["w_" + name + d], advanced["h_" + name + d], advanced["f_" + name + d] / dashboard_ref_w);
                    if (advanced["header_disp_" + name + d]) {
                        set(name + "_box_no_border", advanced["x_" + name + d] + advanced["header_x_offset_" + name + d], advanced["y_" + name + d] + advanced["header_y_offset_" + name + d], advanced["w_" + name + d], advanced["h_" + name + d], advanced["f_" + name + d] / dashboard_ref_w);
                    } else {
                        set(name + "_box_no_border", advanced["x_" + name + d] + 0, advanced["y_" + name + d] + 0, advanced["w_" + name + d], advanced["h_" + name + d], advanced["f_" + name + d] / dashboard_ref_w);
                    }

                   do_set_boxes(name, name, d);  // le name, name c'est normal, le 2�me indique qu'il n'y a pas de suffixe

                    //
                    // FIN de gestion des borders et des headers


                    if (name != "nbpits" && name != "pit_speed_diff" && name != "fuelneed" && name != "fuelneed1" && name != "fuelneed5" && name != "estlaps" && name != "lapsremain" && name != "pre_pos" && name != "me_pos" && name != "post_pos" && name != "pre_cpos" && name != "me_cpos" && name != "post_cpos") {
                        RGBA(jQuery('#' + name), advanced["bg_" + name + d]);
                    } else {
                        RGBA(jQuery('#' + name), 0.0);
                    }

                    $("#" + name).css("display", "inline-block");
                    if (name == 'ers_margin') {
                        $("#" + 'ers_margin_min_bar').css("display", "inline-block");
                        $("#" + 'mgu_margin_max_bar').css("display", "inline-block");
                        $("#" + 'ers_margin_free_bar').css("display", "inline-block");
                        tmp_h = (advanced["h_" + name + d] - advanced["f_" + name + d]) / advanced["h_" + name + d] * 100 / 2;
                        $("#" + 'ers_margin_min_bar_').css("height", tmp_h + "%");
                        $("#" + 'mgu_margin_max_bar_').css("height", tmp_h + "%");
                        $("#" + 'ers_margin_free_bar_').css("height", tmp_h + "%");
                    }
                } else {

                    var elt_box_no_border = document.getElementById(name + "_box_no_border");
                    if (elt_box_no_border) {
                        elt_box_no_border.style.display = "none";
                    }
                    var elt_box_border = document.getElementById(name + "_box_border");
                    if (elt_box_border) {
                        elt_box_border.style.display = "none";
                    }
                    var elt_box = document.getElementById(name + "_box");
                    if (elt_box) {
                        elt_box.style.display = "none";
                    }

                    $("#" + name).css("display", "none");
                    if (name == 'ers_margin') {
                        $("#" + 'ers_margin_min_bar').css("display", "none");
                        $("#" + 'mgu_margin_max_bar').css("display", "none");
                        $("#" + 'ers_margin_free_bar').css("display", "none");
                    }

                    if (name in elt_list_with_["_text"]) {
                        $("#" + name + "_text").css("display", "none");
                    }

                }

            } else {
                $("#" + name).css("display", "none");  // C'est important pour ne pas afficher les nouvelles valeurs avanc�es du dashboard si les param�tres n'�taient pas dans le fichier de config
            }
        }
    }

    if (name_highlighted != null && advanced["grid_disp" + d]) {

        document.getElementById("grid_background").style.display = "block";
        set("grid_background", 0, 0, dashboard_ref_w, dashboard_ref_h, 0);

        document.getElementById("canvas_grid").style.display = "block";

        set("canvas_grid", 0, 0, dashboard_ref_w, dashboard_ref_h, 0);

        // On dessine les lignes de la grille

        canvas_grid = document.querySelector('#canvas_grid');
        context_grid = canvas_grid.getContext('2d');

        context_grid.canvas.width = w*dpr;
        context_grid.canvas.height = h*dpr;

        context_grid.lineWidth = 2;
        context_grid.strokeStyle = "#00ffff";
        context_grid.beginPath();
        for (var left = 0; left < dashboard_ref_w; left += Math.max(advanced["grid_w" + d], 1)) {
            var x = Math.floor(w*dpr * left / dashboard_ref_w);
            context_grid.moveTo(x, 0);
            context_grid.lineTo(x, h*dpr);
        }
        for (var top = 0; top < dashboard_ref_h; top += Math.max(advanced["grid_h" + d], 1)) {
            var y = Math.floor(w*dpr * top / dashboard_ref_w);
            context_grid.moveTo(0, y);
            context_grid.lineTo(w*dpr, y);
        }
        // On compl�te le cadre en bas et � droite au cas o�
        context_grid.moveTo(w*dpr, 0);
        context_grid.lineTo(w*dpr, h*dpr);
        context_grid.moveTo(0, h*dpr);
        context_grid.lineTo(w*dpr, h*dpr);

        context_grid.stroke();
        context_grid.closePath();

        if (advanced["grid_front" + d]) {
            document.getElementById("canvas_grid").style.zIndex = 99999;
        } else {
            document.getElementById("canvas_grid").style.zIndex = '';
        }
    } else {
        document.getElementById("grid_background").style.display = "none";
        document.getElementById("canvas_grid").style.display = "none";
    }


    // Elements particuliers dont on veut forcer la couleur de fond
    if (advanced["perso_bg_color_" + "lapsremain" + d]) {
        document.getElementById("lapsremain_bg0").style.backgroundColor = advanced["bg_color_" + "lapsremain" + d];
        // on enl�ve aussi la gold line ainsi que la barre orange
        document.getElementById("lapsremain_bg1").style.opacity = 0;
        document.getElementById("lapsremain_bg2").style.opacity = 0;
    } else {
        document.getElementById("lapsremain_bg0").style.backgroundColor = "";
        document.getElementById("lapsremain_bg1").style.opacity = 1;
        document.getElementById("lapsremain_bg2").style.opacity = 1;
    }
    if (advanced["perso_bg_color_" + "estlaps" + d]) {
        document.getElementById("estlaps_bg0").style.backgroundColor = advanced["bg_color_" + "estlaps" + d];
        // on enl�ve aussi la barre blanche
        document.getElementById("estlaps_bg1").style.opacity = 0;
    } else {
        document.getElementById("estlaps_bg0").style.backgroundColor = "";
        document.getElementById("estlaps_bg1").style.opacity = 1;
    }
    tmp_list = ['fuelneed', 'fuelneed1', 'fuelneed5'];
    for (i in tmp_list) {
        name = tmp_list[i];
        if (advanced["perso_bg_color_" + name + d]) {
            document.getElementById(name + "_bg0").style.backgroundColor = advanced["bg_color_" + name + d];
            // on enl�ve aussi la gauge bleue
            document.getElementById(name + "_bg1").style.opacity = 0;
        } else {
            document.getElementById(name + "_bg0").style.backgroundColor = "";
            document.getElementById(name + "_bg1").style.opacity = 1;
        }
    }
    if (advanced["perso_bg_color_" + "nbpits" + d]) {
        document.getElementById("nbpits_bg0").style.backgroundColor = advanced["bg_color_" + "nbpits" + d];
        document.getElementById("nbpits_bg1").style.opacity = 0;
    } else {
        document.getElementById("nbpits_bg0").style.backgroundColor = "";
        document.getElementById("nbpits_bg1").style.opacity = 1;
    }
    tmp_list = ['pre_pos', 'me_pos', 'post_pos', 'pre_cpos', 'me_cpos', 'post_cpos'];
    for (i in tmp_list) {
        name = tmp_list[i];
        if (advanced["perso_bg_color_" + name + d]) {
            document.getElementById(name + "_cont").style.backgroundColor = advanced["bg_color_" + name + d];
        } else {
            document.getElementById(name + "_cont").style.backgroundColor = "";
        }
    }
    tmp_list = ['b', 't', 'c', 'ffbpct'];
    for (i in tmp_list) {
        name = tmp_list[i] + '_cont';
        if (advanced["perso_font_color_" + name + d]) {
            document.getElementById(tmp_list[i]).style.backgroundColor = advanced["font_color_" + name + d];
        } else {
            document.getElementById(tmp_list[i]).style.backgroundColor = "";
        }
    }
    tmp_list = ['brake2', 'brake3', 'throttle2', 'throttle3', 'clutch2', 'ffb2', 'ers_bar'];
    for (i in tmp_list) {
        name = tmp_list[i];
        if (advanced["perso_font_color_" + name + d]) {
            document.getElementById(name + "_").style.backgroundColor = advanced["font_color_" + name + d];
        } else {
            document.getElementById(name + "_").style.backgroundColor = "";
        }
    }

    // Pour certains �l�ments comme les iRacing boxes, on change aussi la couleurs des bords en plus du texte
    tmp_list = ['iracing_fuel_box', 'iracing_windshield_box', 'iracing_fastrepair_box', 'iracing_lf_tire_box', 'iracing_rf_tire_box', 'iracing_lr_tire_box', 'iracing_rr_tire_box'];
    for (i in tmp_list) {
        name = tmp_list[i];
        if (advanced["perso_font_color_" + name + d]) {
            document.getElementById(name).style.borderColor = advanced["font_color_" + name + d];
        } else {
            document.getElementById(name).style.borderColor = "";
        }
    }


    tmp_list = ['pre_pos', 'me_pos', 'post_pos', 'pre_cpos', 'me_cpos', 'post_cpos'];
    for (i in tmp_list) {
        name = tmp_list[i];
        if (("disp_" + name + d) in advanced) {
            //set(name + "_cont", advanced["x_" + name + d], advanced["y_" + name + d], advanced["w_" + name + d], advanced["h_" + name + d], advanced["f_" + name + d] / dashboard_ref_w);
            RGBA(jQuery('#' + name + "_cont"), advanced["bg_" + name + d]);
            if (advanced["disp_" + name + d])
                $("#" + name + "_cont").css("display", "inline-block");
            else
                $("#" + name + "_cont").css("display", "none");
        }
    }

    // On s'occupe des iframe
    tmp_list = ['iframe1', 'iframe2', 'iframe3', 'iframe4'];
    for (i in tmp_list) {  // i sera compris entre 0 et 3
        name = tmp_list[i];
        if ((name + "_disp" + d) in advanced) {
            set(name + "_cont", advanced[name + "_X" + d], advanced[name + "_Y" + d], advanced[name + "_W" + d], advanced[name + "_H" + d], 0);
            document.getElementById(name + "_cont").style.zIndex = advanced[name + "_zIndex" + d];

            if (advanced[name + "_click_through" + d]) {
                document.getElementById(name + "_cont").style.pointerEvents = "none";
            } else {
                document.getElementById(name + "_cont").style.pointerEvents = "auto";
            }

            if (advanced[name + "_disp" + d]) {
                // On v�rifie si l'adresse entr�e est valide
                var url;
                var is_url_valid = true;
                try {
                    url = advanced[name + "_src" + d];
                    if (url.includes("http")) {
                        //url = new URL(url);
                        //if (!(url.protocol === "http:" || url.protocol === "https:")) {
                        if ( !(url.includes("http://") || url.includes("https://")) ) {
                            is_url_valid = false;
                        }
                        //url = url.href;
                    }
                    // REM : l'adresse doit contenir .php ou .html (REM : je l'ai enlev� sinon certains liens sont impossible, par exemple twitch
                    /*if ( !(url.includes(".html") || url.includes(".php")) ) {
                        is_url_valid = false;
                    }*/
                } catch (_) {
                    is_url_valid = false;
                }

                //console.log(is_url_valid, url)
                if (is_url_valid && advanced[name + "_src" + d] != frame_src_selected[i]) {
                    frame_src_selected[i] = advanced[name + "_src" + d];
                    var left = advanced[name + "_X" + d];
                    var top = advanced[name + "_Y" + d];
                    var larg = advanced[name + "_W" + d];
                    var haut = advanced[name + "_H" + d];
                    var tmp_width = wh(w * left / dashboard_ref_w, w * larg / dashboard_ref_w);
                    var tmp_height = wh(w * top / dashboard_ref_w, w * haut / dashboard_ref_w);
                    var tmp_param = "";
                    // REM : on envoie la largeur et la hauteur en param�tre pour que l'iPad puisse avoir la bonne valeur du innerWidth et innerHeight
                    if( /webOS|iPhone|iPad/i.test(navigator.userAgent) ) {
                        if (url.includes("?")) {
                            url += "&inner_width=" + tmp_width + "&inner_height=" + tmp_height;
                        } else {
                            url += "?inner_width=" + tmp_width + "&inner_height=" + tmp_height;
                        }
                    }
                    // Pour �viter de charger la page en cache
                    if (url.includes("?")) {
                        url += "&cache=" + Math.random();
                    } else {
                        url += "?cache=" + Math.random();
                    }

                    // Pour indiquer � la page de ralentir/stopper les mises � jours si la frame est dans un dashboard qui n'est pas actif dans le launcher
                    // on transmet aussi la valeur du is_launcher (attention! c'est launcher le nom du param�tre)
                    if (url.includes("?")) {
                        url += "&iframe_dashboard_pagename=" + window_shortname + "&launcher=" + is_launcher;
                    } else {
                        url += "?iframe_dashboard_pagename=" + window_shortname + "&launcher=" + is_launcher;
                    }
                    //console.log(url)

                    $("#" + name).attr("src", url);

                }
                $("#" + name).css("display", "block");
            } else {
                frame_src_selected[i] = "";  // Pour bien recharger la page si on r�active la frame plus tard
                $("#" + name).css("display", "none");
                document.getElementById(name + "_cont").style.zIndex = -9999;  // on le place vers l'arri�re pour qu'il n'emp�che pas les clicks
                $("#" + name).attr("src", "");
            }
        }
    }


    // REM : on s'occupe maintenant du _bg0 et du _bg1 dans la gestion des options suppl�mentaires

    //set("nbpits_bg0", advanced["x_" + "nbpits" + d], advanced["y_" + "nbpits" + d], advanced["w_" + "nbpits" + d], advanced["h_" + "nbpits" + d], advanced["f_" + "nbpits" + d] / dashboard_ref_w);
    //set("nbpits_bg1", advanced["x_" + "nbpits" + d], advanced["y_" + "nbpits" + d], advanced["w_" + "nbpits" + d]*1, advanced["h_" + "nbpits" + d], advanced["f_" + "nbpits" + d] / dashboard_ref_w);
    //set("estlaps_bg0", advanced["x_" + "estlaps" + d], advanced["y_" + "estlaps" + d], advanced["w_" + "estlaps" + d], advanced["h_" + "estlaps" + d], advanced["f_" + "estlaps" + d] / dashboard_ref_w);
    //set("estlaps_bg1", advanced["x_" + "estlaps" + d], advanced["y_" + "estlaps" + d], Math.floor(advanced["w_" + "estlaps" + d] * estlaps_bg1_pct), advanced["h_" + "estlaps" + d], advanced["f_" + "estlaps" + d] / dashboard_ref_w);
    //set("fuelneed_bg0", advanced["x_" + "fuelneed" + d], advanced["y_" + "fuelneed" + d], advanced["w_" + "fuelneed" + d], advanced["h_" + "fuelneed" + d], advanced["f_" + "fuelneed" + d] / dashboard_ref_w);
    //set("fuelneed_bg1", advanced["x_" + "fuelneed" + d],advanced["y_" + "fuelneed" + d] + Math.floor(fuelneed_bg1_pct * advanced["h_" + "fuelneed" + d]), Math.floor(advanced["w_" + "fuelneed" + d] * fuelneed_bg1_pct), advanced["h_" + "fuelneed" + d] - Math.floor(fuelneed_bg1_pct * advanced["h_" + "fuelneed" + d]), advanced["f_" + "fuelneed" + d] / dashboard_ref_w);
    //set("fuelneed1_bg0", advanced["x_" + "fuelneed1" + d], advanced["y_" + "fuelneed1" + d], advanced["w_" + "fuelneed1" + d], advanced["h_" + "fuelneed1" + d], advanced["f_" + "fuelneed1" + d] / dashboard_ref_w);
    //set("fuelneed1_bg1", advanced["x_" + "fuelneed1" + d],advanced["y_" + "fuelneed1" + d] + Math.floor(fuelneed1_bg1_pct * advanced["h_" + "fuelneed1" + d]), Math.floor(advanced["w_" + "fuelneed1" + d] * fuelneed1_bg1_pct), advanced["h_" + "fuelneed1" + d] - Math.floor(fuelneed1_bg1_pct * advanced["h_" + "fuelneed1" + d]), advanced["f_" + "fuelneed1" + d] / dashboard_ref_w);
    //set("fuelneed5_bg0", advanced["x_" + "fuelneed5" + d], advanced["y_" + "fuelneed5" + d], advanced["w_" + "fuelneed5" + d], advanced["h_" + "fuelneed5" + d], advanced["f_" + "fuelneed5" + d] / dashboard_ref_w);
    //set("fuelneed5_bg1", advanced["x_" + "fuelneed5" + d],advanced["y_" + "fuelneed5" + d] + Math.floor(fuelneed5_bg1_pct * advanced["h_" + "fuelneed5" + d]), Math.floor(advanced["w_" + "fuelneed5" + d] * fuelneed5_bg1_pct), advanced["h_" + "fuelneed5" + d] - Math.floor(fuelneed5_bg1_pct * advanced["h_" + "fuelneed5" + d]), advanced["f_" + "fuelneed5" + d] / dashboard_ref_w);
    //set("lapsremain_bg0", advanced["x_" + "lapsremain" + d], advanced["y_" + "lapsremain" + d], advanced["w_" + "lapsremain" + d], advanced["h_" + "lapsremain" + d], advanced["f_" + "lapsremain" + d] / dashboard_ref_w);
    //set("lapsremain_bg1", advanced["x_" + "lapsremain" + d], advanced["y_" + "lapsremain" + d], Math.floor(advanced["w_" + "lapsremain" + d] * lapsremain_bg1_pct), advanced["h_" + "lapsremain" + d], advanced["f_" + "lapsremain" + d] / dashboard_ref_w);
    //set("lapsremain_bg2", advanced["x_" + "lapsremain" + d] + Math.floor(advanced["w_" + "lapsremain" + d] * gap_pct_lastlap), advanced["y_" + "lapsremain" + d], 1, advanced["h_" + "lapsremain" + d], advanced["f_" + "lapsremain" + d] / dashboard_ref_w);

    tmp_list = ["nbpits", "estlaps", "fuelneed", "fuelneed1", "fuelneed5", "lapsremain"];
    for (i in tmp_list) {
        name = tmp_list[i];
        if (("disp_" + name + d) in advanced) {
            RGBA(jQuery('#' + name + "_bg0"), advanced["bg_" + name + d]);
            RGBA(jQuery('#' + name + "_bg1"), advanced["bg_" + name + d]);
            if (advanced["disp_" + name + d]) {
                $("#" + name + "_bg0").css("display", "inline-block");
                $("#" + name + "_bg1").css("display", "inline-block");
                $("#" + name + "_bg2").css("display", "inline-block");
            } else {
                $("#" + name + "_bg0").css("display", "none");
                $("#" + name + "_bg1").css("display", "none");
                $("#" + name + "_bg2").css("display", "none");
            }
        }
    }

    //  On s'en occupe maintenant avec les headers
    //set_leds(advanced["x_" + "rpm_leds" + d], advanced["y_" + "rpm_leds" + d], advanced["w_" + "rpm_leds" + d], advanced["h_" + "rpm_leds" + d]);

    // Redimensionnement des delta graphs
    //context_pre.canvas.width = Math.max(1, wh(w * advanced["x_" + "delta_pre" + d] / dashboard_ref_w, w * advanced["w_" + "delta_pre" + d] / dashboard_ref_w));
    //context_pre.canvas.height = Math.max(1, wh(w * advanced["y_" + "delta_pre" + d] / dashboard_ref_w, w * advanced["h_" + "delta_pre" + d] / dashboard_ref_w));
    //context_post.canvas.width = Math.max(1, wh(w * advanced["x_" + "delta_post" + d] / dashboard_ref_w, w * advanced["w_" + "delta_post" + d] / dashboard_ref_w));
    //context_post.canvas.height = Math.max(1, wh(w * advanced["y_" + "delta_post" + d] / dashboard_ref_w, w * advanced["h_" + "delta_post" + d] / dashboard_ref_w));

    //contextB_pre.canvas.width = Math.max(1, wh(w * advanced["x_" + "delta_pre" + d] / dashboard_ref_w, w * advanced["w_" + "delta_pre" + d] / dashboard_ref_w));
    //contextB_pre.canvas.height = Math.max(1, wh(w * advanced["y_" + "delta_pre" + d] / dashboard_ref_w, w * advanced["h_" + "delta_pre" + d] / dashboard_ref_w));
    //contextB_post.canvas.width = Math.max(1, wh(w * advanced["x_" + "delta_post" + d] / dashboard_ref_w, w * advanced["w_" + "delta_post" + d] / dashboard_ref_w));
    //contextB_post.canvas.height = Math.max(1, wh(w * advanced["y_" + "delta_post" + d] / dashboard_ref_w, w * advanced["h_" + "delta_post" + d] / dashboard_ref_w));
    if (advanced["disp_delta_pre" + d]) {
        //set("deltaB_pre", advanced["x_" + "delta_pre" + d], advanced["y_" + "delta_pre" + d], advanced["w_" + "delta_pre" + d], advanced["h_" + "delta_pre" + d], advanced["f_" + "delta_pre" + d] / dashboard_ref_w);
        $("#deltaB_pre").css("display", "inline-block");
        $("#delta_pre").css("display", "inline-block");
    } else {
        $("#deltaB_pre").css("display", "none");
        $("#delta_pre").css("display", "none");
    }
    if (advanced["disp_delta_post" + d]) {
        //set("deltaB_post", advanced["x_" + "delta_post" + d], advanced["y_" + "delta_post" + d], advanced["w_" + "delta_post" + d], advanced["h_" + "delta_post" + d], advanced["f_" + "delta_post" + d] / dashboard_ref_w);
        $("#deltaB_post").css("display", "inline-block");
        $("#delta_post").css("display", "inline-block");
    } else {
        $("#deltaB_post").css("display", "none");
        $("#delta_post").css("display", "none");
    }

    //document.getElementById("delta_pre").style.top = Math.floor(w * 192 / 1280) + y_offset + "px";
    //document.getElementById("delta_pre").style.left = Math.floor(w * 976 / 1280) + x_offset + "px";
    //document.getElementById("delta_post").style.top = Math.floor(w * 448 / 1280) + + y_offset + "px";
    //document.getElementById("delta_post").style.left = Math.floor(w * 976 / 1280) + x_offset + "px";

    // Redimensionnement de la boussole
    //context_compass.canvas.width = Math.max(1, wh(w * advanced["x_" + "compass" + d] / dashboard_ref_w, w * advanced["w_" + "compass" + d] / dashboard_ref_w));
    //context_compass.canvas.height = Math.max(1, wh(w * advanced["y_" + "compass" + d] / dashboard_ref_w, w * advanced["h_" + "compass" + d] / dashboard_ref_w));

    //document.getElementById("compass").style.left = Math.floor(w * 1152 / 1280) + x_offset + "px";
    //document.getElementById("compass").style.top = Math.floor(w * 0 / 1280) + y_offset + "px";

    carname = donnees.carname;
    gear_ = {};
    maxspeed_ = {};
    for (i in donnees.gear_) {
        gear_[i] = donnees.gear_[i]
    }

    if (carname in car_with_drs) {
        tmp_list = ["drs"];
        for (i in tmp_list) {
            name = tmp_list[i];
            if (advanced["disp_" + name + d]) {
                document.getElementById(name).style.display = "inline-block";
            }
        }
    } else {
        document.getElementById("drs").style.display = "none";
    }
    if (carname in car_with_ers_drs) {
        tmp_list = ["ers", "ersco", "ers_margin", "mgul", "mgu", "mgua", "mguf", "regen_lap", "regen_turn"];
        for (i in tmp_list) {
            name = tmp_list[i];
            if (advanced["disp_" + name + d]) {
                document.getElementById(name).style.display = "inline-block";
            }
        }
    } else {
        document.getElementById("ers").style.display = "none";
        document.getElementById("ersco").style.display = "none";
        document.getElementById("ers_margin").style.display = "none";
        document.getElementById("mgul").style.display = "none";
        document.getElementById("mgu").style.display = "none";
        document.getElementById("mgua").style.display = "none";
        document.getElementById("mguf").style.display = "none";
        document.getElementById("regen_lap").style.display = "none";
        document.getElementById("regen_turn").style.display = "none";
    }

    // Utilis� pour les rpm_leds
    if (donnees.rpm_redline != undefined) {
        max_rpm = donnees.rpm_redline;
    }

    /* PLus utilis� car g�r� dans les options suppl�mentaires
    if (advanced["disp_" + "brake2" + d]) {
        $("#brake2").css("border-radius", advanced["h_" + "brake2" + d]/8 * w / dashboard_ref_w + "px");
        $("#brake2_").css("border-radius", advanced["h_" + "brake2" + d]/8 * w / dashboard_ref_w + "px");
        set("brake2_text", advanced["x_" + "brake2" + d], advanced["y_" + "brake2" + d], advanced["w_" + "brake2" + d], advanced["h_" + "brake2" + d], advanced["f_" + "brake2" + d] / dashboard_ref_w);
        $("#brake2_text").css("display", "inline-block");
    } else {
        $("#brake2_text").css("display", "none");
    }
    if (advanced["disp_" + "brake3" + d]) {
        $("#brake3").css("border-radius", advanced["h_" + "brake3" + d]/8 * w / dashboard_ref_w + "px");
        $("#brake3_").css("border-radius", advanced["h_" + "brake3" + d]/8 * w / dashboard_ref_w + "px");
        set("brake3_text", advanced["x_" + "brake3" + d], advanced["y_" + "brake3" + d], advanced["w_" + "brake3" + d], advanced["h_" + "brake3" + d], advanced["f_" + "brake3" + d] / dashboard_ref_w);
        $("#brake3_text").css("display", "inline-block");
    } else {
        $("#brake3_text").css("display", "none");
    }
    if (advanced["disp_" + "throttle2" + d]) {
        $("#throttle2").css("border-radius", advanced["h_" + "throttle2" + d]/8 * w / dashboard_ref_w + "px");
        $("#throttle2_").css("border-radius", advanced["h_" + "throttle2" + d]/8 * w / dashboard_ref_w + "px");
        set("throttle2_text", advanced["x_" + "throttle2" + d], advanced["y_" + "throttle2" + d], advanced["w_" + "throttle2" + d], advanced["h_" + "throttle2" + d], advanced["f_" + "throttle2" + d] / dashboard_ref_w);
        $("#throttle2_text").css("display", "inline-block");
    } else {
        $("#throttle2_text").css("display", "none");
    }
    if (advanced["disp_" + "throttle3" + d]) {
        $("#throttle3").css("border-radius", advanced["h_" + "throttle3" + d]/8 * w / dashboard_ref_w + "px");
        $("#throttle3_").css("border-radius", advanced["h_" + "throttle3" + d]/8 * w / dashboard_ref_w + "px");
        set("throttle3_text", advanced["x_" + "throttle3" + d], advanced["y_" + "throttle3" + d], advanced["w_" + "throttle3" + d], advanced["h_" + "throttle3" + d], advanced["f_" + "throttle3" + d] / dashboard_ref_w);
        $("#throttle3_text").css("display", "inline-block");
    } else {
        $("#throttle3_text").css("display", "none");
    }
    if (advanced["disp_" + "clutch2" + d]) {
        $("#clutch2").css("border-radius", advanced["h_" + "clutch2" + d]/8 * w / dashboard_ref_w + "px");
        $("#clutch2_").css("border-radius", advanced["h_" + "clutch2" + d]/8 * w / dashboard_ref_w + "px");
        set("clutch2_text", advanced["x_" + "clutch2" + d], advanced["y_" + "clutch2" + d], advanced["w_" + "clutch2" + d], advanced["h_" + "clutch2" + d], advanced["f_" + "clutch2" + d] / dashboard_ref_w);
        $("#clutch2_text").css("display", "inline-block");
    } else {
        $("#clutch2_text").css("display", "none");
    }
    if (advanced["disp_" + "ffb2" + d]) {
        $("#ffb2").css("border-radius", advanced["h_" + "ffb2" + d]/8 * w / dashboard_ref_w + "px");
        $("#ffb2_").css("border-radius", advanced["h_" + "ffb2" + d]/8 * w / dashboard_ref_w + "px");
        set("ffb2_text", advanced["x_" + "ffb2" + d], advanced["y_" + "ffb2" + d], advanced["w_" + "ffb2" + d], advanced["h_" + "ffb2" + d], advanced["f_" + "ffb2" + d] / dashboard_ref_w);
        $("#ffb2_text").css("display", "inline-block");
    } else {
        $("#ffb2_text").css("display", "none");
    }
    */


    if (advanced["disp_" + "traffic" + d]) {
        $("#traffic").css("border-radius", advanced["h_" + "traffic" + d]/2 * w / dashboard_ref_w + "px")
    }
    if (advanced["disp_" + "traffic_pit" + d]) {
        $("#traffic_pit").css("border-radius", advanced["h_" + "traffic_pit" + d]/2 * w / dashboard_ref_w + "px")
    }


    // Affichage des valeurs chang�es (TC, ABS, ...)
    //set("setting_changed_name", 0, 0,  dashboard_ref_w, dashboard_ref_h, 0.07);
    document.getElementById("setting_changed_name").style.left = 0 + x_offset + "px";
    document.getElementById("setting_changed_name").style.width = wh(0, w) + "px";
    document.getElementById("setting_changed_name").style.top = 0 + y_offset + "px";
    document.getElementById("setting_changed_name").style.lineHeight = wh(w * 0 / dashboard_ref_w, w * dashboard_ref_h / 5 / dashboard_ref_w) + "px";
    document.getElementById("setting_changed_name").style.fontSize = w * 0.075 + "px";
    //set("setting_changed_value", 0, 0, dashboard_ref_w, dashboard_ref_h, 0.40);
    document.getElementById("setting_changed_value").style.left = 0 + x_offset + "px";
    document.getElementById("setting_changed_value").style.width = wh(0, w) + "px";
    document.getElementById("setting_changed_value").style.top = Math.floor(w * dashboard_ref_h / 5 / dashboard_ref_w) + y_offset + "px";
    document.getElementById("setting_changed_value").style.lineHeight = wh(w * dashboard_ref_h / 5 / dashboard_ref_w, w * dashboard_ref_h * 4/5 / dashboard_ref_w) + "px";
    document.getElementById("setting_changed_value").style.fontSize = w * 0.35 + "px";

    var font_ = {};
    for (var fontsetname in {"family": 1, "weight": 1, "style": 1}) {
        if ("font_" + fontsetname + d in advanced) {
            font_[fontsetname] = advanced["font_" + fontsetname + d];
        } else {
            font_[fontsetname] = advanced["font-" + fontsetname];
        }
    }

    $("body").css("font-family", '"' + font_["family"] + '"');
    $("body").css("font-weight", font_["weight"]);
    $("body").css("font-style", font_["style"]);

    if (drag_enable == 0) {
        document.getElementById("drag").style.display = "none";
    } else {
        document.getElementById("drag").style.display = "block";
    }

    if (drag_overlays == 1) {
        document.getElementById("drag_overlays_cont").style.display = "block";
    } else {
        document.getElementById("drag_overlays_cont").style.display = "none";
    }


    // Gestion du bouton fullscreen
    setTimeout( function() {  // on reporte la fonction responsive pour laisser le temps � �lectron de d�tecter le fullscreen
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
            // On est d�j� en fullscreen donc on cache le bouton
            $("#fullscreen").css("display", "none");
        }
        if (/iPhone|iPad/i.test(navigator.userAgent)) {  //Si c'est un iPad ou iPhone
            $("#fullscreen").css("display", "none");
        }
    }, 500);

    // On charge les �ventuels css perso
    // ...
    //console.log(use_css_perso)
}


// On regarde si on a forc� un display en param�tre : dashboard.html?display=1
display_selected_in_url = getParamValue('display');
if (display_selected_in_url != false) {
    advanced["display_selected"] = parseInt(display_selected_in_url);
}


elt_list_with_ = {
    "_text": {
        'brake2': 1,
        'brake3': 1,
        'throttle2': 1,
        'throttle3': 1,
        'clutch2': 1,
        'ffb2': 1,
    },
    "_bg0": {
        'nbpits': 1,
        'estlaps': 1,
        'fuelneed': 1,
        'fuelneed1': 1,
        'fuelneed5': 1,
        'lapsremain': 1,
    },
    "_bg1": {
        'nbpits': 1,
        'estlaps': 1,
        'fuelneed': 1,
        'fuelneed1': 1,
        'fuelneed5': 1,
        'lapsremain': 1,
    },
    "_bg2": {
        'lapsremain': 1,
    },
    "_cont": {
        'pre_pos': 1,
        'me_pos': 1,
        'post_pos': 1,
        'pre_cpos': 1,
        'me_cpos': 1,
        'post_cpos': 1,
    }
}
