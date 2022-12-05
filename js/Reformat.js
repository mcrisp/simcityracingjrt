function reformat_avg(n, i) {
    if (n == 1) {
        return "<div title ='[" + startlap_avg1_[i] + "-" + (startlap_avg1_[i] + avg1_nblaps - 1) + "]'>" + reformat_laptime(laptime_avg1_[i]) + "</div>";
    } else if (n == 2) {
        return "<div title ='[" + startlap_avg2_[i] + "-" + (startlap_avg2_[i] + avg2_nblaps - 1) + "]'>" + reformat_laptime(laptime_avg2_[i]) + "</div>";
    } else if (n == 3) {
        return "<div title ='[" + startlap_avg3_[i] + "-" + (startlap_avg3_[i] + avg3_nblaps - 1) + "]'>" + reformat_laptime(laptime_avg3_[i]) + "</div>";
    } else {
        return "--"
    }
}


function compounds_name_color(car) {
    if (car == "Dallara IR18") {
        return [
            ["PRI", "white", "pirelli-white.png"],
            ["ALT", "red", "pirelli-red.png"],
        ];
    } else {
        return [
            ["SOFT", "red", "pirelli-red.png"],
            ["MED", "#ffdd00", "pirelli-yellow.png"],
            ["HARD", "white", "pirelli-white.png"]
        ];
    }
}


function reformat_tires_stints(car, tires_stints, tires_stintcompounds, tires_stints_align, is_dashboard) {

    var str, h, tmp_border, tmp_col, tmp_text_col, tmp_txt, tmp_debug;

    if (is_dashboard == 0) {
        if (disp_param == 0) {
            reference_w_ = reference_w
        } else {
            reference_w_ = 2000
        }
        if (responsive) h = window_innerWidth / reference_w_ * ligne_h / dpi_factor_;
        else h = ligne_h / dpi_factor_;
        tmp_border = h / 10;
    }

    var compounds_name_color_ = compounds_name_color(car);

    /*if (i != selected_idxjs || selected_driver_mode == 0) {
        tmp_text_col = "white";
    } else {
        tmp_text_col = "black";
    }*/
    tmp_text_col = "white";

    // On compte combien de "pneus" � afficher pour les aligner � droite
    var nb_pneus = 0;
    for (var n=0; n < 3; n++) {
        if (tires_stints[n] != -1) {
            nb_pneus++;
        }
    }
    var tire_compound = 0;

    str = "";

    if (tires_stints_align == 1) {
        for (var n = 0; n < 3 - nb_pneus; n++) {
            if (is_dashboard == 0) {
                //str += "<div style='background-color: black; font-size: " + h * 0.5 + "px; display: inline-block; line-height: " + h * 0.8 + "px; width: " + h * 0.67 + "px; margin-top: " + h / 10 + "px; text-align: center; vertical-align: top; color: " + tmp_text_col + "; border-radius: 50%; border-left: " + tmp_border + "px solid #888888; border-right: " + tmp_border + "px solid " + tmp_col + "'></div> ";
                str += "<div style='background-color: black; font-size: " + 2 * 0.5 + "em; display: inline-block; line-height: " + h * 0.8 + "px; width: " + h * 0.67 + "px; margin-top: " + h / 10 + "px; text-align: center; vertical-align: top; color: " + tmp_text_col + "; border-radius: 50%; border-left: " + tmp_border + "px solid #888888; border-right: " + tmp_border + "px solid " + tmp_col + "'></div> ";
            } else {
                str += "<div style='background-color: black; font-size: " + 2 * 0.5 + "em; display: inline-block; line-height: 1.14em; width: 1em; margin-top: -0.18em; text-align: center; vertical-align: middle; color: " + tmp_text_col + "; border-radius: 50%; border-left: " + tmp_border + "px solid #888888; border-right: 0.1em solid " + tmp_col + "'></div> ";
            }
        }
    }

	var font_coef;
    for (var n=0; n < nb_pneus; n++) {

        //tire_compound = donnees.d[i].tires_stintcompounds[n];
        tire_compound = tires_stintcompounds[n];
        if (0 <= tire_compound && tire_compound < compounds_name_color_.length) {
            tmp_col = compounds_name_color_[tire_compound][1];
        } else {
            tmp_col = "#888888";
        }

		font_coef = 0.6;
        if (tires_stints[n] != -1) {
			if (tires_stints[n] >= 10 && tires_stints[n] < 100) {
                font_coef = 0.42;
            } else if (tires_stints[n] >= 100) {
				font_coef = 0.31;
			}
            tmp_txt = tires_stints[n];
        } else {
            tmp_txt = "";
        }
		//font_coef = 0.31;  // debug
        //tmp_txt=988;  // debug
        //tmp_col = "white";  // debug
        tmp_debug = "";
        //tmp_debug = donnees.d[i].tires_stintstarts[n];
        if (is_dashboard == 0) {
            //str += tmp_debug + "<div style='background-color: black; font-size: " + h * font_coef + "px; display: inline-block; line-height: " + h * 0.8 + "px; width: " + h * 0.67 + "px; margin-top: " + h / 10 + "px; text-align: center; vertical-align: top; color: " + tmp_text_col + "; border-radius: 50%; border-left: " + tmp_border + "px solid " + tmp_col + "; border-right: " + tmp_border + "px solid " + tmp_col + "'>" + tmp_txt + "</div> ";
            str += tmp_debug + "<div style='background-color: black; font-size: " + 2 * font_coef + "em; display: inline-block; line-height: " + h * 0.8 + "px; width: " + h * 0.67 + "px; margin-top: " + h / 10 + "px; text-align: center; vertical-align: top; color: " + tmp_text_col + "; border-radius: 50%; border-left: " + tmp_border + "px solid " + tmp_col + "; border-right: " + tmp_border + "px solid " + tmp_col + "'>" + tmp_txt + "</div> ";
        } else {
            str += tmp_debug + "<div style='background-color: black; font-size: " + 2 * font_coef + "em; display: inline-block; line-height: " + 1.14/2/font_coef + "em; width: " + 1.07/2/font_coef + "em; margin-top: -" + 0.18/2/font_coef + "em; text-align: center; vertical-align: middle; color: " + tmp_text_col + "; border-radius: 50%; border-left: " + 0.1/2/font_coef + "em solid " + tmp_col + "; border-right: " + 0.1/2/font_coef + "em solid " + tmp_col + "'>" + tmp_txt + "</div> ";
        }
    }

    if (tires_stints_align == 3) {
        for (var n = 0; n < 3 - nb_pneus; n++) {
            //str += "<div style='background-color: black; font-size: " + h * 0.5 + "px; display: inline-block; line-height: " + h * 0.8 + "px; width: " + h * 0.67 + "px; margin-top: " + h / 10 + "px; text-align: center; vertical-align: top; color: " + tmp_text_col + "; border-radius: 50%; border-left: " + tmp_border + "px solid #888888; border-right: " + tmp_border + "px solid " + tmp_col + "'></div> ";
            str += "<div style='background-color: black; font-size: " + 2 * 0.5 + "em; display: inline-block; line-height: " + h * 0.8 + "px; width: " + h * 0.67 + "px; margin-top: " + h / 10 + "px; text-align: center; vertical-align: top; color: " + tmp_text_col + "; border-radius: 50%; border-left: " + tmp_border + "px solid #888888; border-right: " + tmp_border + "px solid " + tmp_col + "'></div> ";
        }
    }

    //return tires_stints[0] + " " + tires_stints[1] + " " + tires_stints[2];
    return str;
}

function reformat_tire_compound(car, tire_compound, tire_compound_mode, is_dashboard) {

    var h;
    if (is_dashboard == 0) {  // c'est qu'on vient du timing
        if (disp_param == 0) {
            reference_w_ = reference_w
        } else {
            reference_w_ = 2000
        }
        if (responsive) h = window_innerWidth / reference_w_ * ligne_h / dpi_factor_;
        else h = ligne_h / dpi_factor_;
    }

    var compounds_name_color_ = compounds_name_color(car);

    if (tire_compound_mode == 1) {  // nom

        if (0 <= tire_compound && tire_compound < compounds_name_color_.length) {
            tmp_col = compounds_name_color_[tire_compound][1];
            tmp_txt = compounds_name_color_[tire_compound][0];
            //return "<div style='font-size: " + h*0.57 + "px; display: inline-block; line-height: " + h*0.8 + "px; margin-top: " + h/10 + "px; text-align: center; vertical-align: top; color: " + tmp_col + ";'>" + tmp_txt + "</div>";
            return "<div style='font-size: " + 2*0.57 + "em; display: inline-block; line-height: " + h*0.8 + "px; margin-top: " + h/10 + "px; text-align: center; vertical-align: top; color: " + tmp_col + ";'>" + tmp_txt + "</div>";
        } else {
            return "";
        }
    } else if (tire_compound_mode == 2) {  // logo
        // REM : faut pas mettre le cache sinon l'image va �tre recharger � chaque it�ration
        //var nocache = new Date().getTime();

        if (0 <= tire_compound && tire_compound < compounds_name_color_.length) {
            tmp_col = compounds_name_color_[tire_compound][1];
            tmp_txt = compounds_name_color_[tire_compound][0];
            tmp_img = compounds_name_color_[tire_compound][2];
            imgurl = "./img - default/" + tmp_img;
            return "<div title='" + tmp_txt + "'><img style='vertical-align:top;' height='" + h + "' src='" + imgurl + "'></div>";
        } else {
            return "";
        }
    } else {
        //tire_compound = 2;  // debug
        var tmp_border = h / 10;

        if (0 <= tire_compound && tire_compound < compounds_name_color_.length) {
            tmp_col = compounds_name_color_[tire_compound][1];
            tmp_txt = compounds_name_color_[tire_compound][0];
            //return "<div style='background-color: black; font-size: " + h*0.57 + "px; display: inline-block; line-height: " + h*0.8 + "px; width: " + h*0.67 + "px; margin-top: " + h/10 + "px; text-align: center; vertical-align: top; color: " + tmp_col + "; border-radius: 50%; border-left: " + tmp_border + "px solid " + tmp_col + "; border-right: " + tmp_border + "px solid " + tmp_col + "'>" + tmp_txt[0] + "</div>";
            if (is_dashboard == 0) {
                return "<div style='background-color: black; font-size: " + 2 * 0.57 + "em; display: inline-block; line-height: " + h * 0.8 + "px; width: " + h * 0.67 + "px; margin-top: " + h / 10 + "px; text-align: center; vertical-align: top; color: " + tmp_col + "; border-radius: 50%; border-left: " + tmp_border + "px solid " + tmp_col + "; border-right: " + tmp_border + "px solid " + tmp_col + "'>" + tmp_txt[0] + "</div>";
            } else {
                return "<div style='background-color: black; font-size: 1em; display: inline-block; width: 1em; margin-top: -0.18em; line-height: 1.14em; text-align: center; vertical-align: middle; color: " + tmp_col + "; border-radius: 50%; border-left: 0.1em solid " + tmp_col + "; border-right: 0.1em solid " + tmp_col + "'>" + tmp_txt[0] + "</div>";
            }
        } else {
            return "";
        }
    }
}

function reformat_car(car, i, car_mode, is_dashboard) {

    //console.log(car_mode, car, i)

    var h;
    if (is_dashboard == 0) {  // c'est qu'on vient du timing
        if (disp_param == 0) {
            reference_w_ = reference_w
        } else {
            reference_w_ = 2000
        }
        if (responsive) h = window_innerWidth / reference_w_ * ligne_h / dpi_factor_;
        else h = ligne_h / dpi_factor_;
    }

    //nocache = sessionid;  // pour forcer le rechargement des images � chaque nouvelles session
    if (is_dashboard == 0) {
        var nocache = new Date().getTime();
    } else {
        var nocache = 0;  // sinon l'image clignote dans le dashboard car elle est recharg�e
    }
    //nocache = 0;
    if (car_mode == 4) {
        if (donnees_reform_car[i] === undefined) {  // si on n'a pas encore fait le reform
            imgurl = "./img/driver_" + donnees.d[i].uid + ".png?cache=" + nocache;
            img = new Image();
            img.src = imgurl;
            $(img)
                .load(function () {
                    // On prend l'image team_xxxx.png d�fnie car elle existe
                    imgurl = "./img/driver_" + donnees.d[i].uid + ".png?cache=" + nocache;
                    donnees_reform_car[i] = "<div title='" + car + "'><img style='vertical-align:middle;' height='" + h + "' src='" + imgurl + "'></div>";
                })
                .error(function () {
                    imgurl = "./img/driver_default_" + car + ".png?cache=" + nocache;
                    donnees_reform_car[i] = "<div title='" + car + "'><img style='vertical-align:middle;' height='" + h + "' src='" + imgurl + "'></div>";
                });
            img = null;
        } else {
            return donnees_reform_car[i];
        }
        //return "<div title='"+car+"'><img style='vertical-align:middle;' height='" + h + "' src='./img/driver_" + donnees.d[i].uid + ".png?cache=" + nocache + "'></div>";
    } else if (car_mode == 5) {
        if (donnees_reform_car[i] === undefined) {  // si on n'a pas encore fait le reform
            imgurl = "./img/team_" + donnees.d[i].tid + ".png?cache=" + nocache;
            img = new Image();
            img.src = imgurl;
            $(img)
                .load(function () {
                    // On prend l'image team_xxxx.png d�fnie car elle existe
                    imgurl = "./img/team_" + donnees.d[i].tid + ".png?cache=" + nocache;
                    donnees_reform_car[i] = "<div title='" + car + "'><img style='vertical-align:middle;' height='" + h + "' src='" + imgurl + "'></div>";
                })
                .error(function () {
                    imgurl = "./img/team_default_" + car + ".png?cache=" + nocache;
                    donnees_reform_car[i] = "<div title='" + car + "'><img style='vertical-align:middle;' height='" + h + "' src='" + imgurl + "'></div>";
                });
            img = null;
        } else {
            return donnees_reform_car[i];
        }
        //return "<div title='"+car+"'><img style='vertical-align:middle;' height='" + h + "' src='" + imgurl + "'></div>";
    } else if (car_mode == 6) {
        if (donnees.d[i].uid in driver_) {
            return "<div title='" + car + "'>" + driver_[donnees.d[i].uid] + "</div>";
        } else {
            return "<div title='" + car + "'></div>";
        }
    } else if (car_mode == 7) {
        if (donnees.d[i].tid in team_) {
            return "<div title='" + car + "'>" + team_[donnees.d[i].tid] + "</div>";
        } else {
            return "<div title='" + car + "'></div>";
        }
    } else if (car_mode == 1) {
        return "<span style='font-size: " + (h * 20 / 40) + "px'>" + car + "</span>";
    } else if (car_mode == 8 || car_mode == 9) {
        // Le 0.1*h c'est pour rajouter une marge de 10% au-dessus du logo --> je l'ai enlev� car plus besoin avec le middle
        //return "<div title='"+car+"'><img style='vertical-align:top;margin-top:" + 0.1*h + "px;' height='" + h*0.8 + "' src='./cars - logos/" + car + ".png?cache=" + nocache + "'></div>";
        // REM : on va lire directement dans le dossier 'cars - logos - default'.
        if (is_dashboard == 0) {
            if (is_cars_logos_perso == 0) {
                return "<div title='" + car + "'><img style='vertical-align:middle;margin-top:" + 0.1 * h * 0 + "px;' height='" + h * 0.8 + "' src='./cars - logos - default/" + car + ".png?cache=" + nocache + "'></div>";
            } else {
                return "<div title='" + car + "'><img style='vertical-align:middle;margin-top:" + 0.1 * h * 0 + "px;' height='" + h * 0.8 + "' src='./cars - logos - perso/" + car + ".png?cache=" + nocache + "'></div>";
            }
        } else {
            if (is_cars_logos_perso == 0) {
                return "<img style='vertical-align:top; height:100%;' src='./cars - logos - default/" + car + ".png?cache=" + nocache + "'>";
            } else {
                return "<img style='vertical-align:top; height:100%;' src='./cars - logos - perso/" + car + ".png?cache=" + nocache + "'>";
            }
        }
    } else {
        return "<div title='"+car+"'><img style='vertical-align:middle;' height='" + h + "' src='./img/car" + i + team + ".png?cache=" + nocache + "'></div>";
    }
}

function reformat_skies(skies) {
    if (skies == 0)
        return "Clear";
    else if (skies == 1)
        return "Partly Cloudy";
    else if (skies == 2)
        return "Mostly Cloudy";
    else if (skies == 3)
        return "Overcast";
    else
        return "";

}

function reformat_clubname(clubname, clubname_mode, is_dashboard) {

    var h;
    if (is_dashboard == 0) {  // c'est qu'on vient du timing
        if (disp_param == 0) {
            reference_w_ = reference_w
        } else {
            reference_w_ = 2000
        }
        if (responsive) h = window_innerWidth / reference_w_ * ligne_h / dpi_factor_;
        else h = ligne_h / dpi_factor_;
    }

    if (clubname_mode == 1)
         return "<span style='font-size: "+(h * 20 / 40)+"px'>"+clubname+"</span>";
    else {
        c = clubname;

        if (is_dashboard == 0) {
            var nocache = new Date().getTime();
        } else {
            var nocache = 0;  // sinon l'image clignote dans le dashboard car elle est recharg�e
        }

        if (c.toString().substr(0,4) == "Hisp") {
            c = "Hispanoamerica";
        }

        if (c in clubid) {
            if (clubname_mode == 2) {
                if (is_dashboard == 0) {
                    if (is_clubs_logos_perso == 0) {
                        return "<img style='vertical-align:middle;' height='" + h + "' src='clubs - logos/" + clubid[c] + ".png?cache=" + nocache + "'>";
                    } else {
                        return "<img style='vertical-align:middle;' height='" + h + "' src='clubs - logos - perso/" + clubid[c] + ".png?cache=" + nocache + "'>";
                    }
                } else {
                    if (is_clubs_logos_perso == 0) {
                        return "<img style='vertical-align:top; height: 100%;' src='clubs - logos/" + clubid[c] + ".png?cache=" + nocache + "'>";
                    } else {
                        return "<img style='vertical-align:top; height: 100%;' src='clubs - logos - perso/" + clubid[c] + ".png?cache=" + nocache + "'>";
                    }
                }
            } else {
                if (is_dashboard == 0) {
                    return "<img style='vertical-align:middle;' height='" + h + "' src='flags - logos/" + clubid[c] + ".png?cache=" + nocache + "'>";
                } else {
                    return "<img style='vertical-align:top; height: 100%;' src='flags - logos/" + clubid[c] + ".png?cache=" + nocache + "'>";
                }
            }
        } else {
            return "<img style='vertical-align:middle;' height='" + h + "' src='clubs - logos/000.png?cache=" + nocache + "'>"
        }
    }
}


function reformat_gain(gain) {

    if (donnees.styp == "Race" && gain != 999) {  // gain = 999 signifie qu'on ne veut pas l'afficher
        if (gain < 0) {
            return "<span style='color:#ff0000'>" + gain + "</span>"
        } else if (gain > 0) {
            return "<span style='color:#00dd00'>+" + gain + "</span>"
        } else {
            return "--"
        }
    } else {
        return "&nbsp;"
    }
}


function reformat_delta(delta, color_perso) {
    if (color_perso != undefined && color_perso == 1) {
        return delta.toFixed(2);
    } else {
        if (delta < 0) {
            return "<span style='color:#00dd00'>"+delta.toFixed(2)+"</span>";
        } else {
            return "<span style='color:#ff0000'>+"+delta.toFixed(2)+"</span>";
        }
    }
}


function reformat_name(name, teamname, disp_vW, i, is_dashboard) {
    // disp_vW c'est pour afficher un asterix devant le nom du virtual winner

    //console.log(name, teamname);
    if (is_dashboard == 1) {  // c'est qu'on vient du dashboard
        name_mode = dashboard_name_mode;
        if (name == "&nbsp;") {
            name = "";
        }
        if (teamname == "&nbsp;") {
            teamname = "";
        }
    }

    // Si ce n'est pas une course en team en passe du mode 5 ou du mode 6 au mode 1
    if (is_dashboard == 0) {  // c'est qu'on vient du timing
        if ((name_mode == 5 || name_mode == 6) && (donnees.teamracing == 0))
            name_mode_ = 1;
        else {
            name_mode_ = name_mode;
        }
    } else {
        name_mode_ = name_mode;
    }

    //name_mode_ = 5;  // DEBUG

    //name_old = name

    // personnalisation du nom du pilote (pas g�r� pour le dashboard)
    if (is_dashboard == 0) {  // c'est qu'on vient du timing
        if (donnees.d[i].uid != undefined && donnees.d[i].uid in driver_) {
            name = driver_[donnees.d[i].uid];
        }

        // personnalisation du nom de la team
        if (donnees.d[i].tid != undefined && donnees.d[i].tid != 0 && donnees.d[i].tid in team_) {
            teamname = team_[donnees.d[i].tid];
        }

        // Utile si on a personnalis� le nom du pilote et qu'on a s�lectionn� l'option "4. Team Name"
        if (donnees.d[i].tid == 0) {
            teamname = name;
        }
    }

    if (name.length > 0) {
        nom_ = name.split(" ");
        prenom = nom_[0];
        lettreprenom = prenom[0];
        nom = nom_[nom_.length - 1].toUpperCase();
        if (nom.length > 0) {
            lettrenom = nom[0];
        } else {
            lettrenom = "";
        }

        tmp_name = "";
        for (var i = 0; i < 3; i++) {
            if (nom[i] != undefined) {
                tmp_name += nom[i];
            }
        }
        name_3letters = tmp_name;
    } else {
        return "";
    }

    var vW_txt = "";
    if (is_dashboard == 0) {
        if (disp_vW) {
            vW_txt = "* ";  // * devant le virtual winner
        }
    }

    //name_mode_ = 5;  // DEBUG

    if (name_mode_ == 1) {
        name = vW_txt + name;
    } else if (name_mode_ == 2) {
        name = vW_txt + lettreprenom + ". " + nom
    } else if (name_mode_ == 3) {
        name = vW_txt + name_3letters;
    } else if (name_mode_ == 4) {
        name = vW_txt + teamname
    } else if (name_mode_ == 5) {
        if (is_dashboard == 1) {  // c'est qu'on vient du dashboard
            name = "<div style='vertical-align: middle; display: inline-block; line-height: 100%;'>" + vW_txt + teamname + "<br>" + "<span style='color:#9e9e9e; font-weight:500;'>" + name + "</span>" + "</div>";
        } else {
            //name = vW_txt + teamname + "<br>" + "<span style='color:#9e9e9e; font-weight:500;'>" + name + "</span>";
            name = "<div style='line-height: " + (line_space_coef * 1.5) + "em;'>" + vW_txt + teamname + "<br>" + "<span style='color:#9e9e9e; font-weight:500;'>" + name + "</span>" + "</div>";
        }
    } else if (name_mode_ == 6) {
        name = vW_txt + teamname + "<span style='color:#9e9e9e; font-weight:500'> (" + lettreprenom + ". " + nom + ")</span>"
    } else if (name_mode_ == 7) {
        name = vW_txt + prenom + " " + lettrenom + ".";
    } else if (name_mode_ == 8) {
        name = vW_txt + "<span style='font-weight:normal'>" + lettreprenom + "</span>" + " " + name_3letters;
    } else if (name_mode_ == 9) {
        name = vW_txt + nom;
    }

    return name;
}


function reformat_pit_time(time) {
    if (time <= 0) return "";
    if (Math.abs(time) < 60) t = time.toFixed(1);
    else {
        if (time < 3600) {
            min = Math.floor(time / 60);
            sec = (Math.abs(time) % 60).toFixed(0);
            if (sec < 10) sec = "0" + sec;
            t = min + "'" + sec
        } else {
            heu = Math.floor(time / 3600);
            min = Math.floor((Math.abs(time-3600*heu) / 60));
            if (min < 10) min = "0" + min;
            t = heu + "h" + min
        }
    }
    return t
}


function reformat_speed(speed) {
    if (speed > 500 || speed <= 0) return "";
    var s = Math.floor(1000*speedfactor*speed)/1000;
    if (speed_mode == 1) {
        return s.toFixed(0);
    } else if (speed_mode == 3) {
        return s.toFixed(2);
    } else {
        return s.toFixed(1);
    }
}


function reformat_accel(accel) {
    var a = accel.toFixed(1);
    if (a >= 0) a = "+" + a;
    return a
}


function reformat_gap(gap) {
    //if (gap == 0) return "&nbsp";
    if (gap == 0) return "";  // REM : si on met &nbsp; on ne peut pas utiliser le CSS selecteur g:empty pour par exemple ne pas afficher le gap s'il est vide
    var abs_gap = Math.abs(gap);
    if (abs_gap < 60) g = abs_gap.toFixed(2);
    else {
        if (abs_gap < 3600) {
            min = Math.floor(abs_gap / 60);
            //sec = (abs_gap % 60).toFixed(0);
            sec = Math.floor(abs_gap - 60*min);
            if (sec < 10) sec = "0" + sec;
            g = min + "'" + sec
        } else {
            heu = Math.floor(abs_gap / 3600);
            min = Math.floor((abs_gap-3600*heu) / 60);
            if (min < 10) min = "0" + min;
            g = heu + "h" + min
        }
    }
    if (gap >= 0) g = "+" + g;
    else g = "-" + g
    return g
}


// On affiche le chrono sous la forme h:mm:sec.xx
function reformat_chrono(gap) {
    //if (gap == 0) return "&nbsp";
    if (gap == 0) return "";  // REM : si on met &nbsp; on ne peut pas utiliser le CSS selecteur g:empty pour par exemple ne pas afficher le gap s'il est vide
    var abs_gap = Math.abs(gap);
    g = abs_gap;
    heu = 0;
    min = 0;
    if (g >= 3600) {
        heu = Math.floor(g / 3600);
        g = g % 3600;
    }
    sec = (g % 60).toFixed(2);
    if (sec < 10) sec = "0" + sec;
    min = Math.floor(g / 60);
    if (min < 10 && heu != 0) min = "0" + min;

    if (heu != 0) {
        g = heu + "h" + min + "'" + sec;
    } else {
        g = min + "'" + sec;
    }
    return g;
}


function reformat_lc(lc) {
    if (lc <= 0) return "--";
    return lc
}


function reformat_laptime(laptime) {
    if (laptime <= 0) return "--'--.---";
    min = Math.floor(laptime / 60);
    sec = (laptime % 60 - 0.0001).toFixed(3);
    if (sec < 0) sec = 0;
    if (sec < 10) sec = "0" + sec;
    if (min > 0) {
        return min + "'" + sec;
    } else {
        return sec;
    }
    //return laptime
}


function reformat_lic(lic, sub) {
    var h;

    if (disp_param == 0) {
        reference_w_ = reference_w
    } else {
        reference_w_ = 2000
    }
    var l = "?";
    if ((lic_mode == 1) || (lic_mode == 3)) {
        if (lic == "0x8800a0") l = "IA";  // IA
        if (lic == "0xfc0706") l = "R";
        if (lic == "0xfc8a27") l = "D";
        if (lic == "0xfeec04") l = "C";
        if (lic == "0xc702") l = "B";
        if (lic == "0x153db") l = "A";
        if (lic == "0x0") l = "P";
    } else {
        if (lic == "0x8800a0") l = "IA";  // IA
        if (lic == "0xfc0706") l = "Rookie";
        if (lic == "0xfc8a27") l = "CLASS D";
        if (lic == "0xfeec04") l = "CLASS C";
        if (lic == "0xc702") l = "CLASS B";
        if (lic == "0x153db") l = "CLASS A";
        if (lic == "0x0") l = "Pro";
    }
    var s = " " + (sub/100).toFixed(2);
    bcol = lic.slice(2);
    for (var n = bcol.length; n < 6; n++) {
        bcol = "0" + bcol
    }
    if (bcol == "fc8a27" || bcol == "feec04") col = "#000000";
    else col = "#FFFFFF";
    bcol = "#" + bcol;

    if (lic_mode >= 3) {
        if (responsive) h = window_innerWidth / reference_w_ * ligne_h / dpi_factor_;
        else h = ligne_h / dpi_factor_;
        pw = h/1.5*16/40;
        ph = h/5*16/40;
        if (coef_ligne / (window_innerWidth / reference_w_ / dpi_factor_)==2) ph += h/2.5;
        return "<span style='padding:"+ph+"px "+pw+"px;border: 1px solid #555555;background-color:"+bcol+";color:"+col+";vertical-align:top;line-height:"+coef_ligne*ligne_h / dpi_factor_+"px;font-size:"+(h * 16 / 40)+"px'>" + l + s + "</span>";
    } else {
        return l + s;
    }
}


function reformat_lic_dashboard(elt_id, lic, sub) {
    var l = "?";
    if (lic == "0x8800a0") l = "IA";  // IA
    if (lic == "0xfc0706") l = "R";
    if (lic == "0xfc8a27") l = "D";
    if (lic == "0xfeec04") l = "C";
    if (lic == "0xc702") l = "B";
    if (lic == "0x153db") l = "A";
    if (lic == "0x0") l = "P";
    var s = " " + (sub/100).toFixed(2);
    bcol = lic.slice(2);
    for (var n = bcol.length; n < 6; n++) {
        bcol = "0" + bcol
    }
    if (bcol == "fc8a27" || bcol == "feec04") col = "#000000";
    else col = "#FFFFFF";
    bcol = "#" + bcol;

    set_style_bg(elt_id, bcol);
    set_style_color(elt_id, col);

    return l + s
}


function reformat_timeremain(time) {
    if (time != "unlimited") {
        if (time < 167*3600 && time >= 0) {
            heu = Math.floor(time / 3600);
            min = Math.floor((time - 3600 * heu) / 60);
            sec = Math.floor(time - 3600 * heu - 60 * min);
            if (min < 10) min = "0" + min;
            if (sec < 10) sec = "0" + sec;
            t = heu + ":" + min + ":" + sec;
            return t
        } else {
            if (time == -1) {
                return "<span style='font-size: 0.75em; vertical-align: top; top: 25%;'>Last lap</span>"
            } else if (time == -2) {
                return "<span style='font-size: 0.75em; vertical-align: top; top: 25%;'>Finishing</span>"
            } else if (time == -3) {
                return "<span  style='font-size: 0.75em; vertical-align: top; top: 25%;'>Official</span>"
            } else {
                return "--"
            }
        }
    } else {
        return time
    }
}


function reformat_lapsremain(laps) {
    /*lapdistpctraw_s = 0;
    l = 0;
    if (selected_idxjs in donnees.d)
        lapdistpctraw_s = Math.floor(10*(donnees.d[selected_idxjs].dp - donnees.d[selected_idxjs].lc))/10;
    if ((selected_idxjs in donnees.d) && (donnees.p1 in donnees.d)) {
        l = laps + 1 - lapdistpctraw_s;
        if (donnees.d[donnees.p1].dp - donnees.d[donnees.p1].lc < donnees.d[selected_idxjs].dp - donnees.d[selected_idxjs].lc)  // Si le pilote n'est pas dans le m�me tour
            l += 1
    }
    if (l < 0) l = 0;
    return l.toFixed(1)*/

    // On indique si l'estimation n'est pas correcte lorsque le leader n'est pas connect�
    if (donnees.estim_status == 0) {
        //document.getElementById("lapsremain").style.color = "#666666";
        set_style_color("lapsremain", "#666666");
    } else {
        //document.getElementById("lapsremain").style.color = "#ff9900";
        set_style_color("lapsremain", "#ff9900");
    }

    if (laps < 0) return "--";
    if (laps > 32000) return "&infin;";
    if (laps > 9999) {
        return "9999";
    } else if(laps > 999) {
        return (laps - 0.05).toFixed(0);
    } else {
        return (laps - 0.05).toFixed(lapsremain_decimal);
    }
}


function reformat_winddir(dir) {
    dir = dir % 360;
    if (Math.abs(dir - 45) <= 22.5 )
        return "NE";
    else if (Math.abs(dir - 90) <= 22.5 )
        return "E";
    else if (Math.abs(dir - 135) <= 22.5 )
        return "SE";
    else if (Math.abs(dir - 180) <= 22.5 )
        return "S";
    else if (Math.abs(dir - 225) <= 22.5 )
        return "SW";
    else if (Math.abs(dir - 270) <= 22.5 )
        return "W";
    else if (Math.abs(dir - 315) <= 22.5 )
        return "NW";
    else
        return "N"
}


function reformat_track_status(track_status) {

    // -2: vide (ne pas afficher)
    // -1: not in the world
    //  0: off track
    //  1: in pit stall
    //  2: approaching pits
    //  3: on track
    //  4: outlap
    //  5: outlap et off track

    var col = "#00ff00";
    var txt = "RUN";

    switch (track_status) {
        case -1:
            col = "#ff0000";
            txt = "RET";
            break;
        case 0:
            col = "#cc88ff";
            txt = "OFF";
            break;
        case 1:
            col = "#ff8800";
            txt = "BOX";
            break;
        case 2:
            col = "#ff8800";
            txt = "PIT";
            break;
        case 3:
            col = "#00ff00";
            txt = "RUN";
            break;
        case 4:
            col = "#ffff00";
            txt = "OUT";
            break;
        case 5:
            col = "#ffff00";
            txt = "OUT <span style='color: #cc88ff'>OFF</span>";
            break;
    }

    return "<span style='color:" + col + ";'>" + txt+ "</span>"
}
