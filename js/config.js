
function get_window_shortname(window_name) {
    var window_shortname = "not defined";
    if (window_name == "JRT Compteur") {
        window_shortname = "compteur";
    }
    if (window_name == "JRT Timing") {
        window_shortname = "timing";
    }
    if (window_name == "JRT Timing2") {
        window_shortname = "timing2";
    }
    if (window_name == "JRT Timing3") {
        window_shortname = "timing3";
    }
    if (window_name == "JRT Timing4") {
        window_shortname = "timing4";
    }
    if (window_name == "JRT Timing Broadcast") {
        window_shortname = "timing_broadcast";
    }
    if (window_name == "JRT Trackmap") {
        window_shortname = "trackmap";
    }
    if (window_name == "JRT Trackmap2") {
        window_shortname = "trackmap2";
    }
    if (window_name == "JRT Trackmap3") {
        window_shortname = "trackmap3";
    }
    if (window_name == "JRT Trackmap_3D") {
        window_shortname = "trackmap_3d";
    }
    if (window_name == "JRT Calculator") {
        window_shortname = "calculator";
    }
    if (window_name == "JRT Dashboard") {
        window_shortname = "dashboard";
    }
    if (window_name == "JRT Dashboard2") {
        window_shortname = "dashboard2";
    }
    if (window_name == "JRT ButtonBox") {
        window_shortname = "buttonbox";
    }
    if (window_name == "JRT Spotter") {
        window_shortname = "spotter";
    }
    if (window_name == "JRT Launcher") {
        window_shortname = "launcher";
    }
    if (window_name == "JRT Telemetry Inputs") {
        window_shortname = "telemetry_inputs";
    }

    return window_shortname;
}


function change_config(config) {

    last_change_config_tstamp = Date.now();

    //console.log(JSON.stringify(config).length);
    //console.log("change_config()");
    //console.log(config);

    /*
    config_ = config.split(";");
    config_page = config_[0];  // nom de la page à configurer
    config_ = config_[1].split("=");
    config_varname = config_[0];  // nom du paramètre à changer
    config_value = config_[1];  // nouvelle valeur
    */

    config_page = config.page;
    //console.log(config_page);
    //console.log(config)
    //console.log(config.param)

    // On fait correspondre le nom de la page avec le nom court
    //window_shortname = get_window_shortname(window_name);

    if ((config_page == window_shortname || config_page == "all") && broadcast <= 1) {    // Si les changements doivent bien être effectués pour cette page
                                                                                          // et qu'on n'est pas en mode broadcast

        // Permettra de savoir si on doit redimensionner l'overlay
        var window_params_old = "window;" + window_name + ";" + window_x + ";" + window_y + ";" + window_w + ";" + window_h + ";" + window_alpha + ";" + window_topmost + ";" + window_borders + ";" + window_click_through;

        if (window_name != "JRT Telemetry Inputs") {
            // Permet de ne pas recalculer les avg pour rien si ces valeurs n'ont pas changé
            avg1_nblaps_old = avg1_nblaps;
            avg2_nblaps_old = avg2_nblaps;
            avg3_nblaps_old = avg3_nblaps;

            trackmap_circular_old = trackmap_circular;  // servira à savoir si pour la trackmap du timing on est repassé de la trackmap circulaire à la trackmap normale

            fullscreen_button_old = fullscreen_button;
        }

        for(config_varname in config.param) {
            switch (config_varname) {
                case "tab_titres":
                    tab_titres = config.param["tab_titres"];
                    break;
                case "set_title":
                    set_title = config.param["set_title"];
                    break;
                case "w":
                    w = config.param["w"];
                    break;

                case "css_perso_content":
                    css_perso_content = config.param["css_perso_content"];

                case "tire_compound_mode":
                    tire_compound_mode = config.param["tire_compound_mode"];
                    break;
                case "tires_stints_align":
                    tires_stints_align = config.param["tires_stints_align"];
                    break;
                case "clubname_mode":
                    clubname_mode = config.param["clubname_mode"];
                    break;
                case "name_mode":
                    name_mode = config.param["name_mode"];
                    break;
                case "lic_mode":
                    lic_mode = parseInt(config.param["lic_mode"]);
                    break;
                case "speed_mode":
                    speed_mode = parseInt(config.param["speed_mode"]);
                    break;
                case "ir_mode":
                    ir_mode = config.param["ir_mode"];
                    break;
                case "responsive":
                    responsive = config.param["responsive"];
                    break;
                case "reference_w":
                    reference_w = config.param["reference_w"];
                    break;
                case "reference_w_auto":
                    reference_w_auto = config.param["reference_w_auto"];
                    break;
                case "ligne_h":
                    ligne_h = config.param["ligne_h"];
                    break;
                case "banner_height":
                    banner_height = config.param["banner_height"];
                    break;
                case "banner_logo":
                    banner_logo = config.param["banner_logo"];
                    break;
                case "banner_mode":
                    banner_mode = config.param["banner_mode"];
                    break;
                case "banner_color":
                    banner_color = config.param["banner_color"];
                    break;
                case "banner_background":
                    banner_background = config.param["banner_background"];
                    break;
                case "banner_live_disp":
                    banner_live_disp = config.param["banner_live_disp"];
                    break;
                case "transparency_OBS":
                    transparency_OBS = config.param["transparency_OBS"];
                    break;
                case "background_color":
                    background_color = config.param["background_color"];
                    break;
                case "transparence_lignes":
                    transparence_lignes = config.param["transparence_lignes"];
                    break;
                case "show_cars_stopped_darker":
                    show_cars_stopped_darker = config.param["show_cars_stopped_darker"];
                    break;
                case "show_name_orange_inpits":
                    show_name_orange_inpits = config.param["show_name_orange_inpits"];
                    break;
                case "show_name_bleu_red_not_samelap":
                    show_name_bleu_red_not_samelap = config.param["show_name_bleu_red_not_samelap"];
                    break;
                case "show_colorized_drivers":
                    show_colorized_drivers = config.param["show_colorized_drivers"];
                    break;
                case "show_name_selected_orange":
                    show_name_selected_orange = config.param["show_name_selected_orange"];
                    break;
                case "show_name_selected_color":
                    show_name_selected_color = config.param["show_name_selected_color"];
                    break;
                //case "animation":
                //    animation = config.param["animation"];
                //    break;
                case "best_last_animation":
                    best_last_animation = config.param["best_last_animation"];
                    break;
                case "position_change_animation":
                    position_change_animation = config.param["position_change_animation"];
                    break;
                case "disp_sofbar":
                    disp_sofbar = config.param["disp_sofbar"];
                    break;
                case "sofbar_h":
                    sofbar_h = config.param["sofbar_h"];
                    break;
                case "sof_all_disp":
                    sof_all_disp = config.param["sof_all_disp"];
                    break;
                case "selected_driver_mode":
                    selected_driver_mode = config.param["selected_driver_mode"];
                    break;
                case "deltagraph_for_all":
                    deltagraph_for_all = config.param["deltagraph_for_all"];
                    break;
                case "disp_titres":
                    disp_titres = config.param["disp_titres"];
                    break;
                case "f3_box":
                    f3_box = config.param["f3_box"];
                    break;
                case "tires_buttons":
                    tires_buttons = config.param["tires_buttons"];
                    break;
                case "autoscroll":
                    autoscroll = config.param["autoscroll"];
                    if ( (autoscroll_initial == 1 && autoscroll == 0) || autoscroll == 1 ) {  // si l'autoscroll était activé, on va scroller vers le haut pour afficher les leaders si on l'a désactivé, ou si on l'a activé
                        $("#container").scrollTop(0);
                    }
                    autoscroll_initial = autoscroll;
                    break;
                case "autoscroll_mode":
                    autoscroll_mode = config.param["autoscroll_mode"];
                    break;
                case "autoscroll_off_when_notincar":
                    autoscroll_off_when_notincar = config.param["autoscroll_off_when_notincar"];
                    break;
                case "disp_infosbar":
                    disp_infosbar = config.param["disp_infosbar"];
                    break;
                case "disp_fuelinfos":
                    disp_fuelinfos = config.param["disp_fuelinfos"];
                    break;
                case "disp_gapcolors":
                    disp_gapcolors = config.param["disp_gapcolors"];
                    break;
                case "disp_scrollbar":
                    disp_scrollbar = config.param["disp_scrollbar"];
                    break;
                case "focus_replay_delay":
                    focus_replay_delay = config.param["focus_replay_delay"];
                    break;

                case "trackmap_disp_timelost":
                    trackmap_disp_timelost = config.param["trackmap_disp_timelost"];
                    break;
                case "trackmap_disp_north":
                    trackmap_disp_north = config.param["trackmap_disp_north"];
                    break;
                case "trackmap_disp_wind":
                    trackmap_disp_wind = config.param["trackmap_disp_wind"];
                    break;
                case "trackmap_disp_weather_infos":
                    trackmap_disp_weather_infos = config.param["trackmap_disp_weather_infos"];
                    break;
                case "trackmap_disp_predicted":
                    trackmap_disp_predicted = config.param["trackmap_disp_predicted"];
                    break;
                case "trackmap_turn_num_color":
                    trackmap_turn_num_color = config.param["trackmap_turn_num_color"];
                    break;
                case "trackmap_turn_num_coef":
                    trackmap_turn_num_coef = config.param["trackmap_turn_num_coef"];
                    break;
                case "trackmap_turn_info_color":
                    trackmap_turn_info_color = config.param["trackmap_turn_info_color"];
                    break;
                case "trackmap_turn_info_coef":
                    trackmap_turn_info_coef = config.param["trackmap_turn_info_coef"];
                    break;
                case "trackmap_turn_distance_coef":
                    trackmap_turn_distance_coef = config.param["trackmap_turn_distance_coef"];
                    break;
                case "disp_timing_under_trackmap":
                    disp_timing_under_trackmap = config.param["disp_timing_under_trackmap"];
                    break;
                case "trackmap_weather_info_coef":
                    trackmap_weather_info_coef = config.param["trackmap_weather_info_coef"];
                    break;
                case "trackmap_plost_coef":
                    trackmap_plost_coef = config.param["trackmap_plost_coef"];
                    break;
                case "trackmap_north_coef":
                    trackmap_north_coef = config.param["trackmap_north_coef"];
                    break;
                case "trackmap_winddir_coef":
                    trackmap_winddir_coef = config.param["trackmap_winddir_coef"];
                    break;
                case "timing_trackmap_leftmargin":
                    timing_trackmap_leftmargin = config.param["timing_trackmap_leftmargin"];
                    break;
                case "trackmap_disp_mode":
                    trackmap_disp_mode = config.param["trackmap_disp_mode"];
                    break;
                case "trackmap_thickness_coef":
                    trackmap_thickness_coef = config.param["trackmap_thickness_coef"];
                    break;
                case "trackmap_car_coef":
                    trackmap_car_coef = config.param["trackmap_car_coef"];
                    break;
                case "trackmap_outline_disp":
                    trackmap_outline_disp = config.param["trackmap_outline_disp"];
                    break;
                case "trackmap_outline_coef":
                    trackmap_outline_coef = config.param["trackmap_outline_coef"];
                    break;
                case "trackmap_outline_color":
                    trackmap_outline_color = config.param["trackmap_outline_color"];
                    break;
                case "trackmap_carnum_coef":
                    trackmap_carnum_coef = config.param["trackmap_carnum_coef"];
                    break;

                case "trackmap_car_me_specify":
                    trackmap_car_me_specify = config.param["trackmap_car_me_specify"];
                    break;
                case "trackmap_car_me_color_auto":
                    trackmap_car_me_color_auto = config.param["trackmap_car_me_color_auto"];
                    break;
                case "trackmap_car_me_color":
                    trackmap_car_me_color = config.param["trackmap_car_me_color"];
                    break;
                case "trackmap_car_me_coef":
                    trackmap_car_me_coef = config.param["trackmap_car_me_coef"];
                    break;
                case "trackmap_car_me_font_color_auto":
                    trackmap_car_me_font_color_auto = config.param["trackmap_car_me_font_color_auto"];
                    break;
                case "trackmap_car_me_font_color":
                    trackmap_car_me_font_color = config.param["trackmap_car_me_font_color"];
                    break;
                case "trackmap_carnum_me_coef":
                    trackmap_carnum_me_coef = config.param["trackmap_carnum_me_coef"];
                    break;
                case "trackmap_car_me_border_disp":
                    trackmap_car_me_border_disp = config.param["trackmap_car_me_border_disp"];
                    break;
                case "trackmap_car_me_border_color":
                    trackmap_car_me_border_color = config.param["trackmap_car_me_border_color"];
                    break;
                case "trackmap_car_me_border_coef":
                    trackmap_car_me_border_coef = config.param["trackmap_car_me_border_coef"];
                    break;

                case "transparence_fond_trackmap":
                    transparence_fond_trackmap = config.param["transparence_fond_trackmap"];
                    break;

                case "window_x":
                    window_x = config.param["window_x"];
                    break;
                case "window_y":
                    window_y = config.param["window_y"];
                    break;
                case "window_w":
                    window_w = config.param["window_w"];
                    break;
                case "window_h":
                    window_h = config.param["window_h"];
                    break;
                case "window_alpha":
                    window_alpha = config.param["window_alpha"];
                    break;
                case "window_topmost":
                    window_topmost = config.param["window_topmost"];
                    break;
                case "window_borders":
                    window_borders = config.param["window_borders"];
                    break;
                case "window_click_through":
                    window_click_through = config.param["window_click_through"];
                    break;
                case "fullscreen_button":
                    fullscreen_button = config.param["fullscreen_button"];
                    break;
                case "fullscreen_button_timeout":
                    fullscreen_button_timeout = config.param["fullscreen_button_timeout"];
                    break;

                case "f3_mode_in_race_dashboard": f3_mode_in_race_dashboard = config.param["f3_mode_in_race_dashboard"];break;
                case "dashboard_f3mode_dot": dashboard_f3mode_dot = config.param["dashboard_f3mode_dot"];break;
                case "dashboard_name_mode": dashboard_name_mode = config.param["dashboard_name_mode"];break;

                case "gear_":
                    for (i = 1; i <= 8; i++) {
                        gear_[i] = config.param["gear_"][i];
                        donnees.gear_[i] = gear_[i];
                    }
                    break;

                case "refuelspeed":
                    refuelspeed = config.param["refuelspeed"];
                    donnees.refuelspeed = refuelspeed;
                    break;
                case "conso_moy":
                    donnees.co5 = config.param["conso_moy"];
                    break;
                case "temperature_mode":
                    temperature_mode = parseInt(config.param["temperature_mode"]);
                    //console.log("temperature_mode =", temperature_mode);
                    break;
                case "car_mode":
                    car_mode = config.param["car_mode"];
                    break;
                case "trackmap_disp_logo":
                    trackmap_disp_logo = config.param["trackmap_disp_logo"];
                    break;

                case "trackmap_car_color_auto":
                    trackmap_car_color_auto = config.param["trackmap_car_color_auto"];
                    break;
                case "trackmap_car_color":
                    trackmap_car_color = config.param["trackmap_car_color"];
                    break;
                case "trackmap_car_font_color_auto":
                    trackmap_car_font_color_auto = config.param["trackmap_car_font_color_auto"];
                    break;
                case "trackmap_car_font_color":
                    trackmap_car_font_color = config.param["trackmap_car_font_color"];
                    break;

                case "trackmap_car_myclass_only":
                    trackmap_car_myclass_only = config.param["trackmap_car_myclass_only"];
                    break;
                case "trackmap_car_inpits_disp":
                    trackmap_car_inpits_disp = config.param["trackmap_car_inpits_disp"];
                    break;
                case "trackmap_car_color_transparency":
                    trackmap_car_color_transparency = config.param["trackmap_car_color_transparency"];
                    break;

                case "trackmap_car_ring_lapper":
                    trackmap_car_ring_lapper = config.param["trackmap_car_ring_lapper"];
                    break;
                case "trackmap_car_ring_colorized":
                    trackmap_car_ring_colorized = config.param["trackmap_car_ring_colorized"];
                    break;
                case "trackmap_car_ring_yellow":
                    trackmap_car_ring_yellow = config.param["trackmap_car_ring_yellow"];
                    break;
                case "trackmap_car_ring_selected":
                    trackmap_car_ring_selected = config.param["trackmap_car_ring_selected"];
                    break;
                case "trackmap_car_black_dot":
                    trackmap_car_black_dot = config.param["trackmap_car_black_dot"];
                    break;
                case "trackmap_car_P1":
                    trackmap_car_P1 = config.param["trackmap_car_P1"];
                    break;
                case "trackmap_car_P1_myclass_only":
                    trackmap_car_P1_myclass_only = config.param["trackmap_car_P1_myclass_only"];
                    break;
                case "trackmap_car_border_disp":
                    trackmap_car_border_disp = config.param["trackmap_car_border_disp"];
                    break;
                case "trackmap_car_border_color":
                    trackmap_car_border_color = config.param["trackmap_car_border_color"];
                    break;
                case "trackmap_car_border_coef":
                    trackmap_car_border_coef = config.param["trackmap_car_border_coef"];
                    break;

                case "trackmap_color":
                    trackmap_color = config.param["trackmap_color"];
                    break;
                case "trackmap_bg_img":
                    trackmap_bg_img = config.param["trackmap_bg_img"];
                    break;
                case "trackmap_bg_color":
                    trackmap_bg_color = config.param["trackmap_bg_color"];
                    break;
                case "trackmap_font_family":
                    trackmap_font_family = config.param["trackmap_font_family"];
                    break;
                case "trackmap_start_finish_color":
                    trackmap_start_finish_color = config.param["trackmap_start_finish_color"];
                    break;
                case "trackmap_start_finish_arrow_color":
                    trackmap_start_finish_arrow_color = config.param["trackmap_start_finish_arrow_color"];
                    break;
                case "disp_events_ticker":
                    disp_events_ticker = config.param["disp_events_ticker"];
                    break;
                case "disable_all_events":
                    disable_all_events = config.param["disable_all_events"];
                    break;
                case "events_ticker_height":
                    events_ticker_height = config.param["events_ticker_height"];
                    break;
                case "events_ticker_font_coef":
                    events_ticker_font_coef = config.param["events_ticker_font_coef"];
                    break;
                case "events_ticker_disp_pits":
                    events_ticker_disp_pits = config.param["events_ticker_disp_pits"];
                    break;
                case "events_ticker_disp_pits_me":
                    events_ticker_disp_pits_me = config.param["events_ticker_disp_pits_me"];
                    break;
                case "events_ticker_disp_newbest":
                    events_ticker_disp_newbest = config.param["events_ticker_disp_newbest"];
                    break;
                case "events_ticker_disp_newleader":
                    events_ticker_disp_newleader = config.param["events_ticker_disp_newleader"];
                    break;
                case "events_ticker_disp_driverswap":
                    events_ticker_disp_driverswap = config.param["events_ticker_disp_driverswap"];
                    break;
                case "events_ticker_disp_driverswap_me":
                    events_ticker_disp_driverswap_me = config.param["events_ticker_disp_driverswap_me"];
                    break;
                case "events_ticker_disp_overtake":
                    events_ticker_disp_overtake = config.param["events_ticker_disp_overtake"];
                    break;
                case "events_ticker_disp_overtake_me":
                    events_ticker_disp_overtake_me = config.param["events_ticker_disp_overtake_me"];
                    break;
                case "events_ticker_disp_flags":
                    events_ticker_disp_flags = config.param["events_ticker_disp_flags"];
                    break;
                case "events_ticker_disp_incidents_me":
                    events_ticker_disp_incidents_me = config.param["events_ticker_disp_incidents_me"];
                    break;
                case "events_ticker_disp_three_wide":
                    events_ticker_disp_three_wide = config.param["events_ticker_disp_three_wide"];
                    break;
                case "events_ticker_disp_custom":
                    events_ticker_disp_custom = config.param["events_ticker_disp_custom"];
                    break;
                case "wind_alert":
                    wind_alert = config.param["wind_alert"];
                    break;
                case "disp_menu":
                    disp_menu = config.param["disp_menu"];
                    break;
                case "infosbar_coef":
                    infosbar_coef = config.param["infosbar_coef"];
                    break;
                case "sessioninfos_height":
                    sessioninfos_height = config.param["sessioninfos_height"];
                    break;
                case "gap_mode":
                    gap_mode = config.param["gap_mode"];
                    break;
                case "cgap_mode":
                    cgap_mode = config.param["cgap_mode"];
                    break;
                case "rel_mode":
                    rel_mode = config.param["rel_mode"];
                    break;
                case "pack_disp":
                    pack_disp = config.param["pack_disp"];
                    break;
                case "pack_gap":
                    pack_gap = config.param["pack_gap"];
                    break;
                case "pack_transparency":
                    pack_transparency = config.param["pack_transparency"];
                    break;
                case "pack_color":
                    pack_color = config.param["pack_color"];
                    break;

                case "group_by_class":
                    group_by_class = config.param["group_by_class"];
                    break;
                case "group_by_class_nb_drivers_max_me":
                    group_by_class_nb_drivers_max_me = config.param["group_by_class_nb_drivers_max_me"];
                    break;
                case "group_by_class_my_own_class_is_selected":
                    group_by_class_my_own_class_is_selected = config.param["group_by_class_my_own_class_is_selected"];
                    break;
                case "group_by_class_nb_drivers_max_others":
                    group_by_class_nb_drivers_max_others = config.param["group_by_class_nb_drivers_max_others"];
                    break;
                case "group_by_class_nb_lines_max_total":
                    group_by_class_nb_lines_max_total = config.param["group_by_class_nb_lines_max_total"];
                    break;
                case "group_by_class_disp_header":
                    group_by_class_disp_header = config.param["group_by_class_disp_header"];
                    break;
                case "group_by_class_header_color_mode":
                    group_by_class_header_color_mode = config.param["group_by_class_header_color_mode"];
                    break;
                case "group_by_class_header_text_color":
                    group_by_class_header_text_color = config.param["group_by_class_header_text_color"];
                    break;
                case "group_by_class_header_bg_color":
                    group_by_class_header_bg_color = config.param["group_by_class_header_bg_color"];
                    break;
                case "group_by_class_header_bg_transparency":
                    group_by_class_header_bg_transparency = config.param["group_by_class_header_bg_transparency"];
                    break;
                case "group_by_class_margin_between_classes":
                    group_by_class_margin_between_classes = config.param["group_by_class_margin_between_classes"];
                    break;

                case "group_nb_leading_cars":
                    group_nb_leading_cars = config.param["group_nb_leading_cars"];
                    break;
                case "group_nb_leading_cars_line_coef":
                    group_nb_leading_cars_line_coef = config.param["group_nb_leading_cars_line_coef"];
                    break;
                case "group_nb_leading_cars_line_color_mode":
                    group_nb_leading_cars_line_color_mode = config.param["group_nb_leading_cars_line_color_mode"];
                    break;
                case "group_nb_leading_cars_line_color":
                    group_nb_leading_cars_line_color = config.param["group_nb_leading_cars_line_color"];
                    break;

                case "group_defile_others":
                    group_defile_others = config.param["group_defile_others"];
                    break;
                case "group_defile_interval":
                    group_defile_interval = config.param["group_defile_interval"];
                    break;
                case "group_reverse_mode":
                    group_reverse_mode = config.param["group_reverse_mode"];
                    break;

                case "disp_wheel":
                    disp_wheel = config.param["disp_wheel"];
                    break;
                case "disp_clutch":
                    disp_clutch = config.param["disp_clutch"];
                    break;
                case "compteur_rev1_color":
                    compteur_rev1_color = config.param["compteur_rev1_color"];
                    break;
                case "compteur_rev2_color":
                    compteur_rev2_color = config.param["compteur_rev2_color"];
                    break;
                case "compteur_bg_transparency":
                    compteur_bg_transparency = config.param["compteur_bg_transparency"];
                    break;
                case "incar_set_change_delay":
                    incar_set_change_delay = config.param["incar_set_change_delay"];
                    break;
                case "display_changed_disp":
                    display_changed_disp = config.param["display_changed_disp"];
                    break;
                case "trackmap_camera_fov":
                    trackmap_camera_fov = config.param["trackmap_camera_fov"];
                    break;
                case "trackmap_elevation_factor":
                    trackmap_elevation_factor = config.param["trackmap_elevation_factor"];
                    break;
                case "trackmap_antialias":
                    trackmap_antialias = config.param["trackmap_antialias"];
                    break;
                case "trackmap_lateral_color":
                    trackmap_lateral_color = config.param["trackmap_lateral_color"];
                    break;
                case "trackmap_banking_factor":
                    trackmap_banking_factor = config.param["trackmap_banking_factor"];
                    break;
                case "trackmap_disp_turns":
                    trackmap_disp_turns = config.param["trackmap_disp_turns"];
                    break;
                case "trackmap_start_finish_line_thickness_coef":
                    trackmap_start_finish_line_thickness_coef = config.param["trackmap_start_finish_line_thickness_coef"];
                    break;
                case "trackmap_start_finish_line_length_coef":
                    trackmap_start_finish_line_length_coef = config.param["trackmap_start_finish_line_length_coef"];
                    break;
                case "trackmap_start_finish_line_disp":
                    trackmap_start_finish_line_disp = config.param["trackmap_start_finish_line_disp"];
                    break;
                case "trackmap_start_finish_arrow_disp":
                    trackmap_start_finish_arrow_disp = config.param["trackmap_start_finish_arrow_disp"];
                    break;
                case "trackmap_start_finish_arrow_thickness_coef":
                    trackmap_start_finish_arrow_thickness_coef = config.param["trackmap_start_finish_arrow_thickness_coef"];
                    break;
                case "trackmap_start_finish_arrow_length_coef":
                    trackmap_start_finish_arrow_length_coef = config.param["trackmap_start_finish_arrow_length_coef"];
                    break;
                case "trackmap_start_finish_arrow_distance_coef":
                    trackmap_start_finish_arrow_distance_coef = config.param["trackmap_start_finish_arrow_distance_coef"];
                    break;
                case "trackmap_circular":
                    trackmap_circular = config.param["trackmap_circular"];
                    break;
                case "trackmap_circular_angle":
                    trackmap_circular_angle = config.param["trackmap_circular_angle"];
                    break;
                case "trackmap_circular_reverse":
                    trackmap_circular_reverse = config.param["trackmap_circular_reverse"];
                    break;
                case "trackmap_circular_centered_on_driver":
                    trackmap_circular_centered_on_driver = config.param["trackmap_circular_centered_on_driver"];
                    break;
                case "trackmap_select_drivers_number":
                    trackmap_select_drivers_number = config.param["trackmap_select_drivers_number"];
                    break;
                case "avg1_nblaps":
                    avg1_nblaps = config.param["avg1_nblaps"];
                    break;
                case "avg2_nblaps":
                    avg2_nblaps = config.param["avg2_nblaps"];
                    break;
                case "avg3_nblaps":
                    avg3_nblaps = config.param["avg3_nblaps"];
                    break;
                case "avg1_best":
                    avg1_best = config.param["avg1_best"];
                    break;
                case "avg2_best":
                    avg2_best = config.param["avg2_best"];
                    break;
                case "avg3_best":
                    avg3_best = config.param["avg3_best"];
                    break;
                case "jrt_logo_disp":
                    jrt_logo_disp = config.param["jrt_logo_disp"];
                    break;

                case "spotter_margin":
                    spotter_margin = config.param["spotter_margin"];
                    break;
                case "spotter_landmark_disp":
                    spotter_landmark_disp = config.param["spotter_landmark_disp"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;
                case "spotter_when_not_ontrack":
                    spotter_when_not_ontrack = config.param["spotter_when_not_ontrack"];
                    break;
                case "spotter_rule_disp":
                    spotter_rule_disp = config.param["spotter_rule_disp"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;
                case "spotter_rule_opacity_coef":
                    spotter_rule_opacity_coef = config.param["spotter_rule_opacity_coef"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;
                case "spotter_rule_shadow":
                    spotter_rule_shadow = config.param["spotter_rule_shadow"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;
                case "spotter_rule_redline":
                    spotter_rule_redline = config.param["spotter_rule_redline"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;
                case "spotter_side_arrow_blink":
                    spotter_side_arrow_blink = config.param["spotter_side_arrow_blink"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;
                case "spotter_arrow_coef":
                    spotter_arrow_coef = config.param["spotter_arrow_coef"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;
                case "spotter_arrow_inverted":
                    spotter_arrow_inverted = config.param["spotter_arrow_inverted"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;
                case "spotter_arrow_opacity_coef":
                    spotter_arrow_opacity_coef = config.param["spotter_arrow_opacity_coef"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;
                case "spotter_arrow_shadow":
                    spotter_arrow_shadow = config.param["spotter_arrow_shadow"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;
                case "spotter_arrows_approach":
                    spotter_arrows_approach = config.param["spotter_arrows_approach"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;
                case "spotter_arrows_colorize_blueflag":
                    spotter_arrows_colorize_blueflag = config.param["spotter_arrows_colorize_blueflag"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;
                case "spotter_background_transparency_coef":
                    spotter_background_transparency_coef = config.param["spotter_background_transparency_coef"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;
                case "spotter_background_mode":
                    spotter_background_mode = config.param["spotter_background_mode"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;
                case "spotter_nb_wide_text":
                    spotter_nb_wide_text = config.param["spotter_nb_wide_text"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;
                case "spotter_nb_wide_text_size_coef":
                    spotter_nb_wide_text_size_coef = config.param["spotter_nb_wide_text_size_coef"];
                    param_overview_tstamp["spotter"] = Date.now();
                    break;

                case "drag_enable":
                    drag_enable = config.param["drag_enable"];
                    break;
                case "clock_disp":
                    clock_disp = config.param["clock_disp"];
                    break;
                case "display_virtual_winner":
                    display_virtual_winner = config.param["display_virtual_winner"];
                    break;
                case "use_css_perso":
                    // on recharge la page si on a changé la valeur use_css_perso ou si elle est négative, et qu'on ne vient pas déjà de la charger il y a moins de 3 secondes
                    if ( (config.param["use_css_perso"] < 0 || config.param["use_css_perso"] != use_css_perso) && (Date.now() - chargement_page_tstamp > 3000) ) {
                        location.reload();
                        //console.log("***", window_name);
                        //setTimeout(function () { location.reload() }, 10000) ;
                    }
                    // On rectifie la valeur du use_css_perso qu'on avait rendu négatif pour avertir config.js qu'il fallait recharger la page
                    while (config.param["use_css_perso"] < 0) {
                        config.param["use_css_perso"] += 10;
                    }
                    use_css_perso = config.param["use_css_perso"];
                    //console.log(use_css_perso)
                    if (document.getElementById("css_perso") != null) {
                        document.getElementById("css_perso").href = "";  // on ne tient plus compte du fichier css perso chargé au départ puisque le css a été mis à jour
                    }
                    break;
                case "hybrid_decimal": hybrid_decimal = config.param["hybrid_decimal"];break;
                case "estlaps_decimal": estlaps_decimal = config.param["estlaps_decimal"];break;
                case "lapsremain_decimal": lapsremain_decimal = config.param["lapsremain_decimal"];break;
                case "conso_decimal": conso_decimal = config.param["conso_decimal"];break;
                case "fuel_decimal": fuel_decimal = config.param["fuel_decimal"];break;
                case "fond_blanc": fond_blanc = config.param["fond_blanc"];break;
                case "class_selected": class_selected = config.param["class_selected"];break;
                case "reload_on_dblclick": reload_on_dblclick = config.param["reload_on_dblclick"];break;
                case "sf_line_disp": sf_line_disp = config.param["sf_line_disp"];break;

                case "auto_hide_cpos_scpos": auto_hide_cpos_scpos = config.param["auto_hide_cpos_scpos"];break;

                case "launcher_switch_fast": launcher_switch_fast = config.param["launcher_switch_fast"];break;

                case "launcher_menu_disp": launcher_menu_disp = config.param["launcher_menu_disp"];break;
                case "launcher_empty_disp": launcher_empty_disp = config.param["launcher_empty_disp"];break;
                case "launcher_timing_disp": launcher_timing_disp = config.param["launcher_timing_disp"];break;
                case "launcher_timing2_disp": launcher_timing2_disp = config.param["launcher_timing2_disp"];break;
                case "launcher_timing3_disp": launcher_timing3_disp = config.param["launcher_timing3_disp"];break;
                case "launcher_timing4_disp": launcher_timing4_disp = config.param["launcher_timing4_disp"];break;
                case "launcher_timing_broadcast_disp": launcher_timing_broadcast_disp = config.param["launcher_timing_broadcast_disp"];break;
                case "launcher_trackmap_disp": launcher_trackmap_disp = config.param["launcher_trackmap_disp"];break;
                case "launcher_trackmap2_disp": launcher_trackmap2_disp = config.param["launcher_trackmap2_disp"];break;
                case "launcher_trackmap3_disp": launcher_trackmap3_disp = config.param["launcher_trackmap3_disp"];break;
                case "launcher_trackmap_3d_disp": launcher_trackmap_3d_disp = config.param["launcher_trackmap_3d_disp"];break;
                case "launcher_dashboard_disp": launcher_dashboard_disp = config.param["launcher_dashboard_disp"];break;
                case "launcher_dashboard2_disp": launcher_dashboard2_disp = config.param["launcher_dashboard2_disp"];break;
                case "launcher_compteur_disp": launcher_compteur_disp = config.param["launcher_compteur_disp"];break;
                case "launcher_calculator_disp": launcher_calculator_disp = config.param["launcher_calculator_disp"];break;
                case "launcher_buttonbox_disp": launcher_buttonbox_disp = config.param["launcher_buttonbox_disp"];break;
                case "launcher_spotter_disp": launcher_spotter_disp = config.param["launcher_spotter_disp"];break;

                case "launcher_previous": launcher_previous = config.param["launcher_previous"];break;
                case "launcher_next": launcher_next = config.param["launcher_next"];break;
                case "launcher_empty": launcher_empty = config.param["launcher_empty"];break;
                case "launcher_timing": launcher_timing = config.param["launcher_timing"];break;
                case "launcher_timing2": launcher_timing2 = config.param["launcher_timing2"];break;
                case "launcher_timing3": launcher_timing3 = config.param["launcher_timing3"];break;
                case "launcher_timing4": launcher_timing4 = config.param["launcher_timing4"];break;
                case "launcher_timing_broadcast": launcher_timing_broadcast = config.param["launcher_timing_broadcast"];break;
                case "launcher_trackmap": launcher_trackmap = config.param["launcher_trackmap"];break;
                case "launcher_trackmap2": launcher_trackmap2 = config.param["launcher_trackmap2"];break;
                case "launcher_trackmap3": launcher_trackmap3 = config.param["launcher_trackmap3"];break;
                case "launcher_trackmap_3d": launcher_trackmap_3d = config.param["launcher_trackmap_3d"];break;
                case "launcher_dashboard": launcher_dashboard = config.param["launcher_dashboard"];break;
                case "launcher_dashboard2": launcher_dashboard2 = config.param["launcher_dashboard2"];break;
                case "launcher_compteur": launcher_compteur = config.param["launcher_compteur"];break;
                case "launcher_calculator": launcher_calculator = config.param["launcher_calculator"];break;
                case "launcher_buttonbox": launcher_buttonbox = config.param["launcher_buttonbox"];break;
                case "launcher_spotter": launcher_spotter = config.param["launcher_spotter"];break;

                case "disp_conso_bigger": disp_conso_bigger = config.param["disp_conso_bigger"];break;

                case "inputs_display_pedals": inputs_display_pedals = config.param["inputs_display_pedals"];break;
                case "inputs_display_clutch_pedal": inputs_display_clutch_pedal = config.param["inputs_display_clutch_pedal"];break;
                case "inputs_display_wheel": inputs_display_wheel = config.param["inputs_display_wheel"];break;
                case "inputs_display_gear_speed": inputs_display_gear_speed = config.param["inputs_display_gear_speed"];break;
                case "inputs_display_throttle_graph": inputs_display_throttle_graph = config.param["inputs_display_throttle_graph"];break;
                case "inputs_display_brake_graph": inputs_display_brake_graph = config.param["inputs_display_brake_graph"];break;
                case "inputs_display_wheel_graph": inputs_display_wheel_graph = config.param["inputs_display_wheel_graph"];break;
                case "inputs_display_clutch_graph": inputs_display_clutch_graph = config.param["inputs_display_clutch_graph"];break;
                case "inputs_throttle_color": inputs_throttle_color = config.param["inputs_throttle_color"];break;
                case "inputs_brake_color": inputs_brake_color = config.param["inputs_brake_color"];break;
                case "inputs_wheel_color": inputs_wheel_color = config.param["inputs_wheel_color"];break;
                case "inputs_clutch_color": inputs_clutch_color = config.param["inputs_clutch_color"];break;
                case "inputs_font_family": inputs_font_family = config.param["inputs_font_family"];break;
                case "inputs_throttle_opacity": inputs_throttle_opacity = config.param["inputs_throttle_opacity"];break;
                case "inputs_brake_opacity": inputs_brake_opacity = config.param["inputs_brake_opacity"];break;
                case "inputs_clutch_opacity": inputs_clutch_opacity = config.param["inputs_clutch_opacity"];break;
                case "inputs_opacity": inputs_opacity = config.param["inputs_opacity"];break;
                case "inputs_color": inputs_color = config.param["inputs_color"];break;
                case "inputs_wheel_color1": inputs_wheel_color1 = config.param["inputs_wheel_color1"];break;
                case "inputs_wheel_color2": inputs_wheel_color2 = config.param["inputs_wheel_color2"];break;
                case "inputs_speed_color": inputs_speed_color = config.param["inputs_speed_color"];break;
                case "inputs_gear_color": inputs_gear_color = config.param["inputs_gear_color"];break;
                case "inputs_curve_thickness_coef": inputs_curve_thickness_coef = config.param["inputs_curve_thickness_coef"];break;
                case "inputs_curve_animation_speed_coef": inputs_curve_animation_speed_coef = config.param["inputs_curve_animation_speed_coef"];break;
                case "inputs_dash_lines": inputs_dash_lines = config.param["inputs_dash_lines"];break;
                case "inputs_dash_lines_thickness_coef": inputs_dash_lines_thickness_coef = config.param["inputs_dash_lines_thickness_coef"];break;
                case "inputs_dash_lines_color": inputs_dash_lines_color = config.param["inputs_dash_lines_color"];break;
                case "inputs_display_pct": inputs_display_pct = config.param["inputs_display_pct"];break;
                case "inputs_brake_pct_color": inputs_brake_pct_color = config.param["inputs_brake_pct_color"];break;
                case "inputs_throttle_pct_color": inputs_throttle_pct_color = config.param["inputs_throttle_pct_color"];break;
                case "inputs_clutch_pct_color": inputs_clutch_pct_color = config.param["inputs_clutch_pct_color"];break;
                case "inputs_text_orientation_upright": inputs_text_orientation_upright = config.param["inputs_text_orientation_upright"];break;

                case "drag_overlays":
                    var drag_overlays_old = drag_overlays;
                    drag_overlays = config.param["drag_overlays"];
                    if (drag_overlays != drag_overlays_old) {
                        if (drag_overlays == 1) {
                            document.getElementById("drag_overlays_cont").style.display = "block";
                            window_move_boucle = setInterval(window_move_boucle_fct, 500);
                        } else {
                            document.getElementById("drag_overlays_cont").style.display = "none";
                            clearInterval(window_move_boucle);
                        }
                        //console.log("*", drag_overlays);
                        return;  // pas besoin de faire le reste
                    }
                    break;

                case "shiftlight_Xpct":
                    shiftlight_Xpct = config.param["shiftlight_Xpct"];
                    param_overview_tstamp["shiftlight"] = Date.now();
                    list_param_id["shiftlight"] = 1;
                    break;
                case "shiftlight_Ypct":
                    shiftlight_Ypct = config.param["shiftlight_Ypct"];
                    param_overview_tstamp["shiftlight"] = Date.now();
                    list_param_id["shiftlight"] = 1;
                    break;
                case "shiftlight_Wpct":
                    shiftlight_Wpct = config.param["shiftlight_Wpct"];
                    param_overview_tstamp["shiftlight"] = Date.now();
                    list_param_id["shiftlight"] = 1;
                    break;
                case "shiftlight_Hpct":
                    shiftlight_Hpct = config.param["shiftlight_Hpct"];
                    param_overview_tstamp["shiftlight"] = Date.now();
                    list_param_id["shiftlight"] = 1;
                    break;
                case "shiftlight_opacity":
                    shiftlight_opacity = config.param["shiftlight_opacity"];
                    param_overview_tstamp["shiftlight"] = Date.now();
                    list_param_id["shiftlight"] = 1;
                    break;
                case "shiftlight_mode": shiftlight_mode = config.param["shiftlight_mode"];break;

                case "dashboard_light_zindex_offset":
                    dashboard_light_zindex_offset = config.param["dashboard_light_zindex_offset"];
                    param_overview_tstamp["dashboard_light"] = Date.now();
                    list_param_id["dashboard_light"] = 1;
                    break;
                case "dashboard_light_Xpct":
                    dashboard_light_Xpct = config.param["dashboard_light_Xpct"];
                    param_overview_tstamp["dashboard_light"] = Date.now();
                    list_param_id["dashboard_light"] = 1;
                    break;
                case "dashboard_light_Ypct":
                    dashboard_light_Ypct = config.param["dashboard_light_Ypct"];
                    param_overview_tstamp["dashboard_light"] = Date.now();
                    list_param_id["dashboard_light"] = 1;
                    break;
                case "dashboard_light_Wpct":
                    dashboard_light_Wpct = config.param["dashboard_light_Wpct"];
                    param_overview_tstamp["dashboard_light"] = Date.now();
                    list_param_id["dashboard_light"] = 1;
                    break;
                case "dashboard_light_Hpct":
                    dashboard_light_Hpct = config.param["dashboard_light_Hpct"];
                    param_overview_tstamp["dashboard_light"] = Date.now();
                    list_param_id["dashboard_light"] = 1;
                    break;
                case "dashboard_light_opacity":
                    dashboard_light_opacity = config.param["dashboard_light_opacity"];
                    param_overview_tstamp["dashboard_light"] = Date.now();
                    list_param_id["dashboard_light"] = 1;
                    break;

                case "advanced":

                    //console.log(config.param["advanced"]["car_stopped_ontrack_light_activated"], config.param["advanced"]["car_stopped_ontrack_light_color"])
                    //console.log(config.param["advanced"]);
                    //console.log(config.param["advanced"]["display_selected"], advanced["display_selected"]);

                    var d = "";
                    for (var name in list_param_for_overview) {
                        if ("add_display_num" in list_param_for_overview[name] && list_param_for_overview[name]["add_display_num"]) {
                            d = "_" + advanced["display_selected"];
                        } else {
                            d = "";
                        }
                        if ((name + d) in config.param["advanced"] && (list_param_for_overview[name]["option"] != 0 || config.param["advanced"][name + d] != 0)) {
                            param_overview_tstamp[list_param_for_overview[name]["param_id"]] = Date.now();
                            list_param_id[list_param_for_overview[name]["param_id"]] = 1;
                            //console.log(list_param_for_overview[name]["param_id"], param_overview_tstamp[list_param_for_overview[name]["param_id"]]);
                        }
                    }

                    // On désactive l'overview si c'est un changement de display
                    if (config.param["advanced"]["display_selected"] != undefined && config.param["advanced"]["display_selected"] != advanced["display_selected"]) {
                        param_overview_tstamp = {};
                    }

                    $.extend(true, advanced, config.param["advanced"]);
                    dashboard_ref_w = config.param["dashboard_ref_w"];
                    dashboard_ref_h = config.param["dashboard_ref_h"];
                    // On reste sur le display selected en paramètre si c'est le cas
                    if (display_selected_in_url != false) {
                        advanced["display_selected"] = parseInt(display_selected_in_url);
                    }

                    break;
            }
        }


        // On redimensionne l'overlay si nécessire (REM : aussi si on a changer les 'show the overlay when ...'
        var window_params = "window;" + window_name + ";" + window_x + ";" + window_y + ";" + window_w + ";" + window_h + ";" + window_alpha + ";" + window_topmost + ";" + window_borders + ";" + window_click_through;
        if (window_params != window_params_old || "show_overlay_sim_not_running" in config.param || "show_overlay_not_incar" in config.param || "show_overlay_ingarage" in config.param || "show_overlay_incar" in config.param) {
            ws.send(window_params);
        }


        for(config_varname in config.param) {
            switch (config_varname) {
                case "fps":
                    if (window_name == "JRT Timing" || window_name == "JRT Timing2" || window_name == "JRT Timing3" || window_name == "JRT Timing4" || window_name == "JRT Timing Broadcast" || window_name == "JRT Spotter" || window_name == "JRT Compteur") {
                        if (broadcast == 0) {
                            if (fps != config.param["fps"]) {
                                fps = config.param["fps"];
                                if (fps > 60) fps = 60;  // On limite à 60 les fps
                                if (window_name == "JRT Timing" || window_name == "JRT Timing2" || window_name == "JRT Timing3" || window_name == "JRT Timing4" || window_name == "JRT Timing Broadcast") {
                                    if (fps > 10) fps = 10;  // On limite à 10 les fps pour les timing
                                }
                                if (fps <= 0) fps = 1;
                                clearInterval(ws_boucle);
                                if (config_page == "compteur") {
                                    t0_typ2_ms = parseInt(Date.now());
                                    local_tick = 0;
                                    local_tick2 = 0;
                                    ws_boucle = setInterval(ws_boucle_compteur, 1000 / fps);
                                } else if (config_page == "spotter") {
                                    t0_typ2_ms = parseInt(Date.now());
                                    local_tick = 0;
                                    local_tick2 = 0;
                                    ws_boucle = setInterval(ws_boucle_spotter, 1000 / fps);
                                } else {
                                    t0_typ2_ms = parseInt(Date.now());
                                    local_tick = 0;
                                    local_tick2 = 0;
                                    ws_boucle = setInterval(ws_boucle_timing, 1000 / fps);
                                }
                            }
                            //ws.send("window;" + window_name + ";" + window_x + ";" + window_y + ";" + window_w + ";" + window_h + ";" + window_alpha + ";" + window_topmost + ";" + window_borders + ";" + window_click_through);
                        }
                    }

                    // On ne change pas les fps mais on doit appliquer les nouvelles dimensions
                    if (window_name == "JRT Launcher" || window_name == "JRT Telemetry Inputs") {
                        if (broadcast == 0) {
                            //ws.send("window;" + window_name + ";" + window_x + ";" + window_y + ";" + window_w + ";" + window_h + ";" + window_alpha + ";" + window_topmost + ";" + window_borders + ";" + window_click_through);
                        }
                    }

                    break;

                case "fps_trackmap":
                    if (window_name == "JRT Trackmap" || window_name == "JRT Trackmap2" || window_name == "JRT Trackmap3" || window_name == "JRT Trackmap_3D") {
                        if (broadcast == 0) {
                            if (fps_trackmap != config.param["fps_trackmap"]) {
                                fps_trackmap = config.param["fps_trackmap"];
                                if (fps_trackmap > 60) fps_trackmap = 60;  // On limite à 60 les fps
                                if (fps_trackmap <= 0) fps_trackmap = 1;
                                clearInterval(ws_boucle);
                                t0_typ2_ms = parseInt(Date.now());
                                local_tick = 0;
                                local_tick2 = 0;
                                ws_boucle = setInterval(ws_boucle_trackmap, 1000 / fps_trackmap);
                            }
                            //ws.send("window;" + window_name + ";" + window_x + ";" + window_y + ";" + window_w + ";" + window_h + ";" + window_alpha + ";" + window_topmost + ";" + window_borders + ";" + window_click_through);
                        }
                    }
                    break;

                case "fps_dashboard":
                    if (window_name == "JRT Dashboard" || window_name == "JRT Dashboard2") {
                        if (broadcast == 0) {
                            if (fps_dashboard != config.param["fps_dashboard"]) {
                                fps_dashboard = config.param["fps_dashboard"];
                                if (fps_dashboard > 60) fps_dashboard = 60;  // On limite à 60 les fps
                                if (fps_dashboard <= 0) fps_dashboard = 1;
                                clearInterval(ws_boucle);
                                //document.getElementById("estlaps_h").innerHTML = window_x;
                                t0_typ2_ms = parseInt(Date.now());
                                local_tick = 0;
                                local_tick2 = 0;
                                ws_boucle = setInterval(ws_boucle_dashboard, 1000 / fps_dashboard);
                            }
                            //ws.send("window;" + window_name + ";" + window_x + ";" + window_y + ";" + window_w + ";" + window_h + ";" + window_alpha + ";" + window_topmost + ";" + window_borders + ";" + window_click_through);
                        }
                    }
                    break;

                case "fps_calculator":
                    if (window_name == "JRT Calculator") {
                        if (broadcast == 0) {
                            if (fps_calculator != config.param["fps_calculator"]) {
                                fps_calculator = config.param["fps_calculator"];
                                if (fps_calculator > 60) fps_calculator = 60;  // On limite à 60 les fps
                                if (fps_calculator <= 0) fps_calculator = 1;
                                clearInterval(ws_boucle);
                                ws_boucle = setInterval(function () {
                                    //if ((wait == 0) && (ws.bufferedAmount == 0) && (ws.readyState == ws.OPEN)) {   // On vérifie que tout a bien déjà été envoyé
                                    if (wait == 0 && ws.readyState == ws.OPEN) {  // on ne fait plus le test ws.bufferedAmount == 0 car ça semble bugguer
                                        ws.send("22")
                                    }
                                }, 1000 / fps_calculator);
                            }
                            //ws.send("window;" + window_name + ";" + window_x + ";" + window_y + ";" + window_w + ";" + window_h + ";" + window_alpha + ";" + window_topmost + ";" + window_borders + ";" + window_click_through);
                        }
                    }
                    break;

                case "fps_buttonbox":
                    if (window_name == "JRT ButtonBox") {
                        if (broadcast == 0) {
                            if (fps_buttonbox != config.param["fps_buttonbox"]) {
                                fps_buttonbox = config.param["fps_buttonbox"];
                                if (fps_buttonbox > 60) fps_buttonbox = 60;  // On limite à 60 les fps
                                if (fps_buttonbox <= 0) fps_buttonbox = 1;
                                clearInterval(ws_boucle);
                                ws_boucle = setInterval(ws_boucle_buttonbox, 1000 / fps_buttonbox);
                            }
                        }
                    }
                    break;

            }

            if (window_name != "JRT Telemetry Inputs") {
                if (fullscreen_button_old == 0 && fullscreen_button == 1) {
                    $("#fullscreen").css("display", "block");
                    if (fullscreen_button_timeout > 0) {
                        setTimeout(function () {
                            $("#fullscreen").css("display", "none");
                        }, 1000 * fullscreen_button_timeout)
                    }
                }
            }

        }

        // On applique les modifications

        // On réinitialise ces valeurs pour être sûr que les couleurs soient mises à jour aux changements de paramètres
        if (window_name != "JRT Launcher" && window_name != "JRT Telemetry Inputs") {
            init_html_style();
        }
        // Pour recalculer la largeur du canvas de la trackmap
        trackmap_canvas_w = -1;
        trackmap_canvas_h = -1;

        if (window_name == "JRT Timing" || window_name == "JRT Timing2" || window_name == "JRT Timing3" || window_name == "JRT Timing4" || window_name == "JRT Timing Broadcast") {
            //ws.send("window;"+window_name+";" + window_x + ";" + window_y + ";" + window_w + ";" + window_h + ";" + window_alpha + ";" + window_topmost + ";1");
            for (i = 0; i < 64; i++) {
                $("#canvas" + i).remove();
                $("#canvasB" + i).remove();
            }

            /*$("#trackmap_canvas").remove();
            $("#trackmap_fond_canvas").remove();
            $("#trackmap_fond_turns_canvas").remove();*/


            // On réinitialise juste les canvas pour les deltas et la trackmap

            for (i = 0; i < 64; i++) {
                cv = document.createElement("canvas");
                cv.setAttribute("width", Math.max(1, w['delta']));
                cv.setAttribute("height", Math.max(1, delta_h));
                cv.setAttribute("id", "canvas" + i);
                document.body.appendChild(cv);
            }
            for (i = 0; i < 64; i++) {
                cvB = document.createElement("canvas");
                cvB.setAttribute("class", "canvasB");
                cvB.setAttribute("id", "canvasB" + i);
                cvB.setAttribute("width", Math.max(1, w['delta']));
                cvB.setAttribute("height", Math.max(1, delta_h));
                document.body.appendChild(cvB);
            }

            canvas = [];
            canvasB = [];
            context = [];
            contextB = [];
            for (i = 0; i < 64; i++) {
                canvas[i] = document.querySelector('#canvas' + i);
                context[i] = canvas[i].getContext('2d');
                canvasB[i] = document.querySelector('#canvasB' + i);
                contextB[i] = canvasB[i].getContext('2d');
            }

            // Création du canvas pour la trackmap
            /*cv = document.createElement("canvas");
            cv.setAttribute("id", "trackmap_canvas");
            document.getElementById("trackmap").appendChild(cv);
            trackmap_canvas = document.querySelector('#trackmap_canvas');
            trackmap_context = trackmap_canvas.getContext('2d');

            cv = document.createElement("canvas");
            cv.setAttribute("id", "trackmap_fond_canvas");
            document.getElementById("trackmap").appendChild(cv);
            trackmap_fond_canvas = document.querySelector('#trackmap_fond_canvas');
            trackmap_fond_context = trackmap_fond_canvas.getContext('2d');

            cv = document.createElement("canvas");
            cv.setAttribute("id", "trackmap_fond_turns_canvas");
            document.getElementById("trackmap").appendChild(cv);
            trackmap_fond_turns_canvas = document.querySelector('#trackmap_fond_turns_canvas');
            trackmap_fond_turns_context = trackmap_fond_turns_canvas.getContext('2d');*/

            sof_displayed = 0;  // pour recalculer les dimensions du sof_cont à afficher dans l'infosbar

            // REM : je l'ai enlevé car sinon ça va retélécharger tous les events
            //init_var();
            if (trackmap_circular == 0 && trackmap_circular_old == 1) {
                trackname = "init";  // Pour que le circuit soit rechargé dans le cas où on repasse en mode non circulaire
            }

            // on regarde si le filtre des classes a changé
            change_class_selected();

            // On redéfinit aussi notre class (si on ne fait pas ça, le class_selected risque de repasser à -1 si on avait sélectionné "My Class" dans JRT config.
            if (donnees.d != undefined && donnees.d[donnees.me] != undefined) {
                class_me = donnees.d[donnees.me].classid;
                if (class_selected_me) {
                    class_selected = class_me;  // On affichera seulement les voitures de notre class
                }
                init_group_by_class();
            }

            document.getElementById("trackmap_bg").style.opacity = transparence_fond_trackmap;

            // On range les titres dans le dictionnaire disp pour avoir le bon ordre pour les valeurs affichées
            disp = {};
            //console.log("***", tab_titres)
            for (j = 0; j < tab_titres.length; j++) {
                t = tab_titres[j];
                disp[t] = 1;
            }

            if (donnees.nbclass == 1 && auto_hide_cpos_scpos) {
                if (disp["pos"] == 1) {
                    disp["cpos"] = 0;
                }
                if (disp["spos"] == 1) {
                    disp["scpos"] = 0;
                }
                maj_aff = 0;
            }

            // On rajoute les autres titres à la suite, peu importe l'ordre
            disp_all = {};
            for (j = 0; j < tab_titres_all_default.length; j++) {
                t = tab_titres_all_default[j];
                if (!(t in disp)) {
                    disp[t] = 0;
                }
                disp_all[t] = 1;
            }
            // On forme tab_titres_all
            j = 0;
            tab_titres_all = [];
            for (t in disp) {
                tab_titres_all[j] = t;
                j++;
            }

            colorize_drivers_init = 2;  // pour recoloriser les pilotes

            //maj_aff2 = 1;  // Pour que ça mette bien à jour les colonnes du timing lorsqu'on change les paramètres dans jrtconfig
            //maj_aff = 1;  // pour bien enlever les colonnes cpos et scpos si nécessaire

            init_aff(disp_param);
            //console.log("*** update_aff config.js")
            update_aff(disp_param, 1);

            /*nb_events = save_nb_events;
            document.getElementById("events_ticker").innerHTML = save_events_ticker;
            document.getElementById("laptimes").innerHTML = save_laptimes;
            donnees = save_donnees;
            donnees_new = save_donnees_new;

            trackname = save_trackname;
            type_session = save_type_session;
            name_session = save_name_session;
            sessionnum = save_sessionnum;
            sessionid = save_sessionid;
            sessiontime = save_sessiontime;*/

            //update_datas(-1);
            if ( text_save_typ1 != -1 && donnees_new == null ) {  // si on est hors connexion
                document.getElementById("events_ticker").innerHTML = "";
                update_datas(text_save_typ1);
            } else {
                update_datas(text_save);
            }

            //responsive_dim(disp_param);  // REM : le responsive_dim est fait plus bas, donc inutile ici
            trackmap(); // on dessine aussi tout de suite les pilotes

            if (donnees_new != null && donnees_new != undefined) {
                donnees_new.typ = undefined;  // Pour éviter de redessiner la trackmap en boucle quand on est hors connection
            }

            // On recalcule les averages si c'est utile
            if (avg1_nblaps != avg1_nblaps_old || avg2_nblaps != avg2_nblaps_old || avg3_nblaps != avg3_nblaps_old) {
                for (var i = 0; i < 64; i++) {
                    calc_avg(i);
                }
            }

            timing_menu(1);  // sert à recocher/décocher dans le events filter quand on change les réglages dans JRT Config

            // On recharge les events pour le ticker
            reload_ticker_events();

            //console.log("***", loaded)
            /*if (loaded == 0) {
                loaded = 1;
            } else {
                loaded = -1;
            }*/
        }

        if (window_name == "JRT Trackmap" || window_name == "JRT Trackmap2" || window_name == "JRT Trackmap3" || window_name == "JRT Calculator") {
            //if(parseInt(Date.now()/1000) - 60 < donnees.tct) {  // Si la trackmap a été créée il y a moins de 60 s

            if (window_name == "JRT Trackmap" || window_name == "JRT Trackmap2" || window_name == "JRT Trackmap3") {
                //console.log("redrawing trackmap ...", parseInt(Date.now()/1000) - 3, donnees.tct);
                /*$("#trackmap_canvas").remove();
                 $("#trackmap_fond_canvas").remove();
                 $("#trackmap_fond_turns_canvas").remove();*/
                if (trackmap_circular == 0 && trackmap_circular_old == 1) {
                    init_var();  // Pour que le circuit soit rechargé dans le cas où on repasse en mode non circulaire
                } else {
                    document.getElementById("trackmap_bg").style.opacity = transparence_fond_trackmap;  // c'est la seule ligne du init_var qui est utile en cas de chgt de ce paramètre
                }
            }

            // REM : pour les autres pages, on fait le responsive_dim après
            if (window_name == "JRT Calculator") {
                responsive_dim();
            }

            //}
        }
        if (window_name == "JRT Trackmap_3D") {
            //if(parseInt(Date.now()/1000) - 60 < donnees.tct) {  // Si la trackmap a été créée il y a moins de 60 s
                init_var();
    			draw_track("#ffffff", 1, 1, 1);
            //}
        }
        if (window_name == "JRT Dashboard" || window_name == "JRT Dashboard2" || window_name == "JRT Spotter") {
            //init_var();

            if (window_name == "JRT Dashboard" || window_name == "JRT Dashboard2") {
                // Par défault, la pitbar doit être désactivée dans les dashboards
                document.getElementById("pitbar8").style.display = "none";
                document.getElementById("pitbar16").style.display = "none";
                document.getElementById("pitbar32").style.display = "none";
                document.getElementById("pitbar64").style.display = "none";

                force_update_data_type1 = true;  // utile notamment pour mettre à jour les SOF

            }

            responsive_dim();
            sessiontime = 0;
        }

        if (window_name == "JRT Launcher" || window_name == "JRT Compteur" || window_name == "JRT Telemetry Inputs") {
            responsive_dim();
        }

        if (window_name == "JRT ButtonBox") {
            responsive_dim();  // utile pour la gestion du bouton fullscreen
        }

    }

    // Raffraîchissement des turns et du logo
    if ((config_page == "track" || config_page == "trackmap" || config_page == "trackmap2" || config_page == "trackmap3" || config_page == "trackmap_3d") && broadcast <= 1) {
        if(window_name == "JRT Timing" || window_name == "JRT Timing2" || window_name == "JRT Timing3" ||
            window_name == "JRT Timing4" || window_name == "JRT Timing Broadcast" || window_name == "JRT Trackmap" || window_name == "JRT Trackmap2" || window_name == "JRT Trackmap3" || window_name == "JRT Trackmap_3D") {

            for(config_varname in config.param) {
                //console.log(config_varname);

                switch(config_varname) {
                    case "nb_turns": donnees.nb_turns = config.param["nb_turns"]; break;
                    case "turn_num": donnees.turn_num = config.param["turn_num"];break;
                    case "turn_ldp": donnees.turn_ldp = config.param["turn_ldp"];break;
                    case "turn_side": donnees.turn_side = config.param["turn_side"];break;
                    case "turn_info": donnees.turn_info = config.param["turn_info"];break;
                    case "orientation": donnees.orientation = config.param["orientation"];break;
                }

            }

            if(window_name == "JRT Trackmap" || window_name == "JRT Trackmap2" || window_name == "JRT Trackmap3" || window_name == "JRT Trackmap_3D") {
                if(window_name == "JRT Trackmap_3D") {
        			draw_track("#ffffff", 1, 1, 1);
                } else {
                    responsive_dim();
                }
            } else {
                responsive_dim(disp_param, 1);
            }
        }
    }

    // Mise à jour des rpm limit et rpm leds parameters pour le shiftlight et les rpm leds lorsqu'on passe par jrtconfig
    if (config_page == "car" && broadcast <= 1) {
        if(window_name == "JRT Dashboard" || window_name == "JRT Dashboard2") {
            for (i = 1; i <= 8; i++) {
                //gear_[i] = config.param["gear_"][i];
                gear_[i] = config.param["rpm" + i];
                if (donnees.gear_ != undefined && gear_[i] != undefined) {
                    donnees.gear_[i] = gear_[i];
                }
            }
            if (config.param["rpm_leds_N_red"] != undefined) {
                rpm_leds_N_red = config.param["rpm_leds_N_red"];
            }
            if (config.param["rpm_leds_led1_pct"] != undefined) {
                rpm_leds_led1_pct = config.param["rpm_leds_led1_pct"];
            }
            //console.log(rpm_leds_N_red, rpm_leds_led1_pct);
        }
    }

}

function ws_boucle_compteur() {
    //if (local_tick < local_tick2 && (wait == 0) && (ws.bufferedAmount == 0) && (ws.readyState == ws.OPEN)) {   // On vérifie que tout a bien déjà été envoyé
    //if ( (wait == 0) && (ws.bufferedAmount == 0) && (ws.readyState == ws.OPEN)) {   // On vérifie que tout a bien déjà été envoyé
    if (wait == 0 && ws.readyState == ws.OPEN) {  // on ne fait plus le test ws.bufferedAmount == 0 car ça semble bugguer
        //if (local_tick % fps == 0) {  // specify the refresh rate of the typ2 datas -> 1 time per second

        // On ne demande les actualisations définies par la page que si on a changé de config il y a plus de 5s
        //if (Date.now() - last_change_config_tstamp > 5000) {

            if (parseInt(Date.now()) - t0_typ2_ms >= 1000 || parseInt(Date.now()) < t0_typ2_ms) {  // specify the refresh rate of the typ2 datas -> 1 time per second
                ws.send("32");
                t0_typ2_ms = parseInt(Date.now());
            } else {
                ws.send("33")
            }
        /*} else if (parseInt(Date.now()) - t0_typ2_ms >= 500) {  // on limite à 2 fps
            ws.send("33");
            t0_typ2_ms = parseInt(Date.now());
        }*/
        local_tick++;
    }
}

function ws_boucle_dashboard() {
    //if (local_tick < local_tick2 && (wait == 0) && (ws.bufferedAmount == 0) && (ws.readyState == ws.OPEN)) {   // On vérifie que tout a bien déjà été envoyé
    //if ( (wait == 0) && (ws.bufferedAmount == 0) && (ws.readyState == ws.OPEN) ) {   // On vérifie que tout a bien déjà été envoyé
    if (wait == 0 && ws.readyState == ws.OPEN) {  // on ne fait plus le test ws.bufferedAmount == 0 car ça semble bugguer
        //if (local_tick % fps_dashboard == 0) {  // specify the refresh rate of the typ2 datas -> 1 time per second

        // On ne demande les actualisations définies par la page que si on a changé de config il y a plus de 5s
        //if (Date.now() - last_change_config_tstamp > 5000) {
            //console.log(Date.now() - last_change_config_tstamp)
            if (parseInt(Date.now()) - t0_typ2_ms >= 1000 || parseInt(Date.now()) < t0_typ2_ms) {  // specify the refresh rate of the typ2 datas -> 1 time per second
                ws.send("32");
                t0_typ2_ms = parseInt(Date.now());
            } else {
                ws.send("33");
            }
        /*} else if (parseInt(Date.now()) - t0_typ2_ms >= 500) {  // on limite à 2 fps
            ws.send("33");
            t0_typ2_ms = parseInt(Date.now());
        }*/
        local_tick++;
    }
}

function ws_boucle_buttonbox() {
    //if ( (ws.bufferedAmount == 0) && (ws.readyState == ws.OPEN) ) {   // On vérifie que tout a bien déjà été envoyé
    if (ws.readyState == ws.OPEN) {  // on ne fait plus le test ws.bufferedAmount == 0 car ça semble bugguer
        ws.send("33");
    }
}


function ws_boucle_trackmap() {
    //if (local_tick < local_tick2 && (wait == 0) && (ws.bufferedAmount == 0) && (ws.readyState == ws.OPEN)) {   // On vérifie que tout a bien déjà été envoyé
    //if ( (wait == 0) && (ws.bufferedAmount == 0) && (ws.readyState == ws.OPEN) ) {   // On vérifie que tout a bien déjà été envoyé
    if (wait == 0 && ws.readyState == ws.OPEN) {  // on ne fait plus le test ws.bufferedAmount == 0 car ça semble bugguer

        // On ne demande les actualisations définies par la page que si on a changé de config il y a plus de 5s
        //if (Date.now() - last_change_config_tstamp > 5000) {

            ws.send("12");
            t0_typ2_ms = parseInt(Date.now());
        /*} else if (parseInt(Date.now()) - t0_typ2_ms >= 500) {  // on limite à 2 fps
            ws.send("12");
            t0_typ2_ms = parseInt(Date.now());
        }*/
        local_tick++;
    }
}


function ws_boucle_timing() {
    if (photo_processing == 0 && photo_processing_old == 0) {  // Important pour le mode photo
        //if (local_tick < local_tick2 && (wait == 0) && (ws.bufferedAmount == 0) && (ws.readyState == ws.OPEN)) {   // On vérifie que tout a bien déjà été envoyé
        //if ( (wait == 0) && (ws.bufferedAmount == 0) && (ws.readyState == ws.OPEN) ) {   // On vérifie que tout a bien déjà été envoyé
        if (wait == 0 && ws.readyState == ws.OPEN) {  // on ne fait plus le test ws.bufferedAmount == 0 car ça semble bugguer

            // On ne demande les actualisations définies par la page que si on a changé de config il y a plus de 5s
            //if (Date.now() - last_change_config_tstamp > 5000) {

                if (fps >= 2) {
                    //if (local_tick % fps == 0) {  // specify the refresh rate of the typ2 datas -> 1 time per second
                    if (parseInt(Date.now()) - t0_typ2_ms >= 1000 || parseInt(Date.now()) < t0_typ2_ms) {  // specify the refresh rate of the typ2 datas -> 1 time per second
                        //if (disp_events_ticker) {  // ATTENTION : si on enlève cette partie, les laptimes ne seront pas affichés
                        if (disable_all_events == 0) {
                            ws.send("2;" + nb_events);
                        } else {
                            ws.send("2;-1")
                        }
                        t0_typ2_ms = parseInt(Date.now());
                    } else {
                        ws.send("3")
                    }
                } else {
                    if (disable_all_events == 0) {
                        ws.send("2;" + nb_events);
                    } else {
                        ws.send("2;-1")
                    }
                    t0_typ2_ms = parseInt(Date.now());
                }
            /*} else if (parseInt(Date.now()) - t0_typ2_ms >= 500) {  // on limite à 2 fps
                ws.send("3");
                t0_typ2_ms = parseInt(Date.now());
            }*/
            local_tick++;
            //console.log(local_tick)
        }
    }
}


function ws_boucle_spotter() {
    //if (local_tick < local_tick2 && ws.bufferedAmount == 0 && (ws.readyState == ws.OPEN)) {   // On vérifie que tout a bien déjà été envoyé
    //if ( ws.bufferedAmount == 0 && (ws.readyState == ws.OPEN) ) {   // On vérifie que tout a bien déjà été envoyé
    if (ws.readyState == ws.OPEN) {  // on ne fait plus le test ws.bufferedAmount == 0 car ça semble bugguer

        // On ne demande les actualisations définies par la page que si on a changé de config il y a plus de 5s
        //if (Date.now() - last_change_config_tstamp > 5000) {

            ws.send("spotter");
            t0_typ2_ms = parseInt(Date.now());
        /*} else if (parseInt(Date.now()) - t0_typ2_ms >= 500) {  // on limite à 2 fps
            ws.send("spotter");
            t0_typ2_ms = parseInt(Date.now());
        }*/
        local_tick++;
    }
}


// Utilisé pour les pages de timing et le défilement automatique
function defile_boucle_fonction() {

    if (donnees != undefined) {

        // CALCULS en cas de group by class

        for (var c = 1; c <= donnees.nbclass; c++) {

            // nombre de pilotes restants visible une fois enlevé les x leading cars
            var tmp_nb_drivers_left = Math.max(0, group_by_class_nb_drivers_[c] - group_nb_leading_cars);
            defile_decalage_[c] += tmp_nb_drivers_left;

            var defile_decalage_max = Math.max(0, donnees.nbcars_class[c] - group_nb_leading_cars - 1);
            if (defile_decalage_[c] > defile_decalage_max) {
                defile_decalage_[c] = 0;
            }

        }

        // CALCULS si on est pas en group by class

        // On calcule le nombre de lignes dispos
        tmp_container_height = parseInt($("#container").css("height"));
        tmp_container_margin_top = parseInt($("#container").css("margin-top"));
        nb_lines_dispos = Math.floor(( (tmp_container_height + tmp_container_margin_top) / Math.floor(coef_ligne * ligne_h / dpi_factor_)));
        // nombre de pilotes restants visible une fois enlevé les x leading cars
        tmp_nb_drivers_left = Math.max(0, nb_lines_dispos - group_nb_leading_cars);

        defile_decalage += tmp_nb_drivers_left;

        if (class_selected == 0) {
            var defile_decalage_max = Math.max(0, donnees.nb - group_nb_leading_cars - 1);
        } else {
            var defile_decalage_max = Math.max(0, donnees.nbcars_class[class_selected] - group_nb_leading_cars - 1);
        }

        if (defile_decalage > defile_decalage_max) {
            defile_decalage = 0;
        }

    }

    init_x_leaders_line = 1;

    if ( text_save_typ1 != -1 && donnees_new == null ) {  // si on est hors connexion
        document.getElementById("events_ticker").innerHTML = "";
        update_datas(text_save_typ1);
    }


}


function window_move_boucle_fct() {
    if (document.getElementById("drag_overlays_cont").style.display == "block") {
        if (drag_overlays && ws.readyState == ws.OPEN) {  // on ne fait plus le test ws.bufferedAmount == 0 car ça semble bugguer
            ws.send("window_move;" + window_name + ";" + window_shortname);
            //console.log("window_move");
        }
    }
}


window_name = document.title;
window_shortname = get_window_shortname(window_name);
//console.log(window_shortname)

last_change_config_tstamp = 0;

// Liste des paramètres qui vont activer l'aperçu pendant 2 secondes
// mettre l'option à 0 si on ne souhaite pas afficher l'overview en cas de valeur égale à zéro de l'option
// param_id est l'id qu'on va utiliser dans update_dashboard.js pour afficher l'aperçu ou pas
// add_display_num à 1 va indiquer qu'il faudra ajouter le disp_sel dans la recherche du nom de paramètre et dans le tableau param_overview (voir ce qui est déjà fait avec le abs_light)
list_param_for_overview = {

    "shiftlight_on": {"param_id": "shiftlight", "option": 1},
    "shiftlight_Xpct": {"param_id": "shiftlight", "option": 1},
    "shiftlight_Ypct": {"param_id": "shiftlight", "option": 1},
    "shiftlight_Wpct": {"param_id": "shiftlight", "option": 1},
    "shiftlight_Hpct": {"param_id": "shiftlight", "option": 1},
    "shiftlight_color": {"param_id": "shiftlight", "option": 1},
    "pitlimiter_light_inpit_color": {"param_id": "shiftlight_pitlimiter_inpit", "option": 1},
    "pitlimiter_light_outpit_color": {"param_id": "shiftlight_pitlimiter_outpit", "option": 1},

    "dashboard_light_on": {"param_id": "dashboard_light", "option": 1},
    "yellowflag_light_activated": {"param_id": "yellowflag", "option": 0},
    "yellowflag_light_color": {"param_id": "yellowflag", "option": 1},
    "yellowflag_light_blink": {"param_id": "yellowflag", "option": 1},
    "yellowflag_light_text_coef": {"param_id": "yellowflag", "option": 1},
    "car_stopped_ontrack_light_activated": {"param_id": "car_stopped_ontrack", "option": 0},
    "car_stopped_ontrack_light_color": {"param_id": "car_stopped_ontrack", "option": 1},
    "car_stopped_ontrack_light_blink": {"param_id": "car_stopped_ontrack", "option": 1},
    "car_stopped_ontrack_light_text_coef": {"param_id": "car_stopped_ontrack", "option": 1},
    "greenflag_light_activated": {"param_id": "greenflag", "option": 0},
    "greenflag_light_color": {"param_id": "greenflag", "option": 1},
    "greenflag_light_blink": {"param_id": "greenflag", "option": 1},
    "blueflag_light_activated": {"param_id": "blueflag", "option": 0},
    "blueflag_light_color": {"param_id": "blueflag", "option": 1},
    "blueflag_light_blink": {"param_id": "blueflag", "option": 1},
    "whiteflag_light_activated": {"param_id": "whiteflag", "option": 0},
    "whiteflag_light_color": {"param_id": "whiteflag", "option": 1},
    "whiteflag_light_blink": {"param_id": "whiteflag", "option": 1},
    "qualy_not_valid_light_activated": {"param_id": "qualy_not_valid", "option": 0},
    "qualy_not_valid_light_color": {"param_id": "qualy_not_valid", "option": 1},
    "qualy_not_valid_light_blink": {"param_id": "qualy_not_valid", "option": 1},
    "oil_temp_alert_light_activated": {"param_id": "oil_temp_alert", "option": 0},
    "oil_temp_alert_light_color": {"param_id": "oil_temp_alert", "option": 1},
    "oil_temp_alert_light_blink": {"param_id": "oil_temp_alert", "option": 1},
    "water_temp_alert_light_activated": {"param_id": "water_temp_alert", "option": 0},
    "water_temp_alert_light_color": {"param_id": "water_temp_alert", "option": 1},
    "water_temp_alert_light_blink": {"param_id": "water_temp_alert", "option": 1},
    "fuel_alert_light_activated": {"param_id": "fuel_alert", "option": 0},
    "fuel_alert_light_color": {"param_id": "fuel_alert", "option": 1},
    "fuel_alert_light_blink": {"param_id": "fuel_alert", "option": 1},
    "abs_active_light_activated": {"param_id": "abs_active", "option": 0},
    "abs_active_light_color": {"param_id": "abs_active", "option": 1},
    "abs_active_light_blink": {"param_id": "abs_active", "option": 1},
    "math_channel_light_activated": {"param_id": "math_channel", "option": 0},
    "math_channel_light_color": {"param_id": "math_channel", "option": 1},
    "math_channel_light_blink": {"param_id": "math_channel", "option": 1},

    "disp_abs_light": {"param_id": "abs_light", "option": 0, "add_display_num": 1},
    "x_abs_light": {"param_id": "abs_light", "option": 0, "add_display_num": 1},
    "y_abs_light": {"param_id": "abs_light", "option": 0, "add_display_num": 1},
    "w_abs_light": {"param_id": "abs_light", "option": 0, "add_display_num": 1},
    "h_abs_light": {"param_id": "abs_light", "option": 0, "add_display_num": 1},
    "f_abs_light": {"param_id": "abs_light", "option": 0, "add_display_num": 1},
    "bg_abs_light": {"param_id": "abs_light", "option": 0, "add_display_num": 1},
    "perso_bg_color_abs_light": {"param_id": "abs_light", "option": 0, "add_display_num": 1},
    "bg_color_abs_light": {"param_id": "abs_light", "option": 0, "add_display_num": 1},
    "zindex_offset_abs_light": {"param_id": "abs_light", "option": 0, "add_display_num": 1},
}

list_param_id = {};
param_overview_tstamp = {};
param_overview = {};

param_overview_tstamp["spotter"] = Date.now();  // pour activer l'overview au démarrage de la page
