// OPTIONS BY DEFAULT
// These options will be replaced by the one specified in template.txt
//

// *** Parametres de config par default ***

// Names available : "clubname", "gain", "cgain", "spos", "scpos", "cpos", "pos", "num", "name", "ir", "lic", "rel", "delta", "gap", "last", "best", "lc", "distpct", "speed", "topspeed", "apex_speed", "max_speed", "accel", "stint", "pit", "pitroadtime", "pitstalltime", "inc"

// Liste de toutes les colonnes disponibles (REM : laisser sur une seule ligne sinon JRT ne pourra pas decoder les reglages)
tab_titres_all_default = ["line_num", "pos", "cpos", "spos", "scpos", "gain", "cgain", "num", "class_box", "name", "clubname", "ir", "ir_gain", "lic", "rel", "delta", "gap", "cgap", "interval", "last", "best", "lc", "speed", "accel", "topspeed", "apex_speed", "max_speed", "stint", "pit", "pitroadtime", "pitstalltime", "inc", "distpct", "car", "qualy", "points", "gap_dist", "avg1", "avg2", "avg3", "sectors", "sectors_b", "p2p", "tire_compound", "tires_stints", "tires_nb_changes", "empty", "nblaps_race", "fuel", "predicted_pos", "predicted_cpos", "laps_led", "joker_laps", "track_status", "lap_last_pit"];

// Colonnes utilisées par default
tab_titres = ["pos", "cpos", "num", "name", "ir", "lic", "rel", "delta", "gap", "last", "best", "lc", "speed", "topspeed", "apex_speed", "max_speed", "stint", "pit", "pitroadtime", "pitstalltime", "inc"];

w['car'] = 100
car_mode = 1  // 1: display car name, 2: display car image, 3: logo with grey background, 4: customised driver logo, 5: customised team logo
// Club               // Club name
w['clubname'] = 160
clubname_mode = 2   // 1: display club name, 2: display club logo, 3: display country flag
// PG               // Position gain
w['gain'] = 56
// CG               // Position gain in class
w['cgain'] = 56
// P
w['pos'] = 42     		// Largeur de la colonne P - P column width
// P
w['line_num'] = 42     		// Largeur de la colonne P - P column width
// C				// Position in Class
w['cpos'] = 50     		// Largeur de la colonne C - C column width
// sP				// Start position
w['spos'] = 50     		// Largeur de la colonne sP - sP column width
// sC				// Start Position in Class
w['scpos'] = 50     		// Largeur de la colonne sC - sC column width
// #
w['num'] = 50     		// Largeur de la colonne # - # column width
// class_box
w['class_box'] = 5
// NAME
w['name'] = 342			// Largeur de la colonne NAME - NAME column width
name_mode = 1   		// 1 : full name (ex: Lewis Hamilton), 2 : short name (ex : L. HAMILTON), 3 : very short name (ex : HAM),
						//4: Team Name, 5: team name & full name on 2 lines, 6: team name & short name on the same line,
                        // 7: first name and last name initial, 8: first name initial and last name 3 first letters
// iR
w['ir'] = 72     		// Largeur de la colonne iR - iR column width
ir_mode = 1				// 1: normal display, 2: display with licence color, 3: normal display with irating gain, 4: display with licence color and irating gain,
// iR Gain
w['ir_gain'] = 72
// Lic
w['lic'] = 70     		// Largeur de la colonne Lic - Lic column width
lic_mode = 3    		// 1: compact, 2: full, 3: iRacing style compact, 4: iRacing style full
// SPD
w['speed'] = 76     	// Largeur de la colonne SPD - SPD column width
speed_mode = 1    		// 1: No decimals, 2: 1 decimal, 3: 2 decimals
// TOP
w['topspeed'] = 76     	// Largeur de la colonne TOP - TOP column width
// Accel
w['accel'] = 80     	// Largeur de la colonne Accel - Accel column width
// Apex
w['apex_speed'] = 76	// Largeur de la colonne Apex - Apex column width
// Max
w['max_speed'] = 76		// Largeur de la colonne Max - Max column width
// REL
w['rel'] = 80     		// Largeur de la colonne REL - REL column width
rel_mode = 1  // 1: in seconds, 2: in laps
// Δ
w['delta'] = 100		// Largeur de la colonne REL - REL column width
// GAP
w['gap'] = 80     		// Largeur de la colonne GAP - GAP column width
gap_mode = 1  // 1: in seconds, 2: in laps
// LAST
w['last'] = 106     	// Largeur de la colonne LAST - LAST column width
// BEST
w['best'] = 106     	// Largeur de la colonne BEST - BEST column width
// LC
w['lc'] = 56     		// Largeur de la colonne LC - LC column width
// distpct
w['distpct'] = 120     	// Largeur de la colonne distpct - distpct column width
// St
w['stint'] = 76     	// Largeur de la colonne St - St column width
// PIT
w['pit'] = 46     		// Largeur de la colonne PIT - PIT column width
// lane
w['pitroadtime'] = 72	// Largeur de la colonne lane - lane column width
// Stop
w['pitstalltime'] = 72	// Largeur de la colonne Stop - Stop column width
// INC
w['inc'] = 54			// Largeur de la colonne INC - INC column width
// Q-Lap
w['qualy'] = 106
// Pts
w['points'] = 54
// m
w['gap_dist'] = 120
// avg1
w['avg1'] = 170
// avg2
w['avg2'] = 170
// avg3
w['avg3'] = 170
// sectors
w['sectors'] = 100
// best sectors
w['sectors_b'] = 100
// gap in class
w['cgap'] = 80
cgap_mode = 1  // 1: in seconds, 2: in laps
// p2p
w['p2p'] = 60
// tire compound
w['tire_compound'] = 42
tire_compound_mode = 3   // 1: display compound name, 2: display compound logo, 3: Color Circle with the Initial
tires_stints_align = 1  // 1: aligned to the right, 2 : centered, 3 : aligned to the left
// tires stints
w['tires_stints'] = 150
// number of tire changes
w['tires_nb_changes'] = 42
// empty
w['empty'] = 5
// nblaps_race
w['nblaps_race'] = 60
// fuel
w['fuel'] = 60
// predicted pos
w['predicted_pos'] = 50
// predicted cpos
w['predicted_cpos'] = 50
// laps_led
w['laps_led'] = 60
// joker_laps
w['joker_laps'] = 60
// track_status
w['track_status'] = 100
// interval
w['interval'] = 80
// lap_last_pit
w['lap_last_pit'] = 60

set_title = {}
set_title["pos"] = "P"
set_title["line_num"] = "L"
set_title["cpos"] = "C"
set_title["spos"] = "sP"
set_title["scpos"] = "sC"
set_title["gain"] = "PG"
set_title["cgain"] = "CG"
set_title["num"] = "#"
set_title["class_box"] = ""
set_title["name"] = "NAME"
set_title["ir"] = "iR"
set_title["ir_gain"] = "iRg"
set_title["lic"] = "lic"
set_title["rel"] = "REL"
set_title["delta"] = "Δ"
set_title["gap"] = "GAP"
set_title["last"] = "LAST"
set_title["best"] = "BEST"
set_title["lc"] = "LC"
set_title["speed"] = "SPD"
set_title["topspeed"] = "TOP"
set_title["apex_speed"] = "Apex"
set_title["max_speed"] = "Max"
set_title["accel"] = "Accel"
set_title["stint"] = "St"
set_title["pit"] = "PIT"
set_title["pitroadtime"] = "lane"
set_title["pitstalltime"] = "Stop"
set_title["inc"] = "INC"
set_title["clubname"] = "Club"
set_title["distpct"] = "distpct"
set_title["car"] = "Car"
set_title["qualy"] = "Q-Lap"
set_title["points"] = "Pts"
set_title["gap_dist"] = "m"
set_title["avg1"] = "AVG5"
set_title["avg2"] = "AVG10"
set_title["avg3"] = "AVG15"
set_title["sectors"] = "Sectors"
set_title["sectors_b"] = "Best Sectors"
set_title["cgap"] = "CGAP"
set_title["p2p"] = "P2P"
set_title["tire_compound"] = "TC"
set_title["tires_stints"] = "TS"
set_title["tires_nb_changes"] = "NC"
set_title["empty"] = "EMPTY"
set_title["nblaps_race"] = "RL"
set_title["fuel"] = "Fuel"
set_title["predicted_pos"] = "pP"
set_title["predicted_cpos"] = "pC"
set_title["laps_led"] = "Led"
set_title["joker_laps"] = "JKR"
set_title["track_status"] = "Trk"
set_title["interval"] = "INT"
set_title["lap_last_pit"] = "LP"

// Timing options
responsive = 1   		// Set 1 if you want that the line height, the font-size and the column width change depending of the window width
reference_w = 1600  	// Width in pixel (the line height and font-size are calculated using this reference
reference_w_auto = 0
ligne_h = 40    		// Hauteur des lignes - Lines height

//delta_h = ligne_h		// Ne pas toucher ! - Don't touch !
banner_height = 0;  // Hauteur d'une éventuelle bannière au-dessus
banner_logo = "";
banner_mode = 1;  // 0: logo perso, 1: logo de la série
banner_background = "#333333";
banner_color = "#ffffff";
banner_live_disp = 1;
transparency_OBS = 0;  	// Set 1 to have transparency in OBS with CLR browser
background_color = "#222222";
transparence_lignes = 1.0;  // Background lines transparency coefficient
show_cars_stopped_darker = 1;
show_name_orange_inpits = 1;
show_name_bleu_red_not_samelap = 1;
show_colorized_drivers = 1;
show_name_selected_orange = 0;  // depuis le 15/12/2021, cette option permet en fait de choisir la couleur du nom du pilote sélectionné (orange ou autre)
show_name_selected_color = "#f5b326";
//animation = 0		// Set 0 if you want to deactivate the animations when the drivers gain or loose positions
position_change_animation = 0  // remplace le paramètre animation
best_last_animation = 0  // remplace le paramètre animation
disp_sofbar = 0		// Set 1 if you want to display only the sof in a single line at the top
sofbar_h = 14		// Height of the sofbar
sof_all_disp = 1
selected_driver_mode = 1  // 0: disabled, 1: Selected by the user, 2: auto-select the focused car
deltagraph_for_all = 1  // 0 = show the deltagraph only for the cars in the same class, 1 = show the deltagraph even if the car is not in the same class
disp_titres = 1
f3_box = 0              // Set 1 if you want to display relatives like the F3 box in iRacing
tires_buttons = 1       // Set 0 if you don't need tires buttons
autoscroll = 0          // Spécify if you want the timing to scroll automatically to the selected driver
autoscroll_mode = 1     // 1 pour centrer le pilote sélectionné et 2 pour le placer en bas en affichant le plus de pilotes possible devant
disp_infosbar = 1	// Set 0 if you don't need the infos bar, set 1 to have the infos on 1 line and set 2 to have the infos on 2 lines
infosbar_coef = 1.0  // Allow to change the size of the infos independantly
disp_fuelinfos = 1	// Set 0 if you don't want to show the fuel infos
disp_gapcolors = 1  // Set 0 if you don't want to display the colors (it helps to have a better contrast for streaming videos)
disp_scrollbar = 0  // Set 1 if you want to display the scrollbar
focus_replay_delay = 1000  // Set a delay for the click on a driver to be validate for the focus driver selection
fond_blanc = 0  // 1 if you want a white background everytime and 2 if you never want a white background
class_selected = 0

toggle_autoscroll_joy = -1
toggle_autoscroll_button = -1

toggle_f3_box_joy = -1
toggle_f3_box_button = -1

autoscroll_off_when_notincar = 0

// Options pour le groupement du classement par classe, le reverse mode et l'affichage de X leading cars
group_by_class = 0
group_by_class_nb_drivers_max_me = 0  // Nombre de pilotes max à afficher pour notre classe (0 si illimité)
group_by_class_my_own_class_is_selected = 0
group_by_class_nb_drivers_max_others = 0  // Nombre de pilotes max à afficher pour les autres classes (0 si illimité)
group_by_class_nb_lines_max_total = 0  // Si on veut limiter le nombre de pilotes à afficher sur la page (0 : on limite au nombre de lignes dispos sur la page, -1: no limit)
group_by_class_disp_header = 1  // affiche le nom de la classe sur une ligne
group_by_class_header_color_mode = 0  // ...
// 0: auto mode 1 (bg = class, text = auto),
// 1: auto mode 2 (text = class, bg = auto),
// 2: semi-auto mode 1 (bg = class, text = manual),
// 3: semi-auto mode 2 (text = class, bg = manual),
// 4: Manual
group_by_class_header_text_color = "#000000"  // couleur du texte dans le cas où ce n'est pas automatique
group_by_class_header_bg_color = "#ffffff"  // couleur du fond dans le cas où ce n'est pas automatique
group_by_class_header_bg_transparency = 1  // 0 : full transparent, 1: full opaque
group_by_class_margin_between_classes = 0  // marge en nombre de lignes

group_nb_leading_cars = 0  // 1 ou plus: On affiche un certain des voitures de tête ...
group_nb_leading_cars_line_coef = 1  // coeficient pour changer l'épaisseur de la ligne séparatrice
group_nb_leading_cars_line_color_mode = 0;  // 0: Auto (class color), 1: Manual
group_nb_leading_cars_line_color = "#ffffff";
// si le group_by_class est activé, on le fait juste pour notre classe et on tiendra compte du group_by_class_nb_drivers_max_me
// Cette option est utile en conjonction avec le mode autoscroll ou bien le mode group_defile_others
group_defile_others = 0  // 1: on fait défiler le classement des lignes restantes visible n'affichant pas les leading cars ...
// Cette option ne sera pas activée si on est en autoscroll
group_defile_interval = 5  // interval en secondes pour le défilement automatique

is_cars_logos_perso = 0
is_clubs_logos_perso = 0

group_reverse_mode = 0

pack_disp = 1  // Set 0 if you don't want to display the drivers packs
pack_gap = 1  // Time in second where the gap between cars form a pack
pack_transparency = 0.1
pack_color = "#ff0000"

disp_events_ticker = 0  // Ticker that displays pit entry/pit exit/best lap/driver swap/New Leader/Overtake/Flags
events_ticker_height = 200
events_ticker_font_coef = 1
events_ticker_disp_pits = 1
events_ticker_disp_pits_me = 0
events_ticker_disp_newbest = 1
events_ticker_disp_newleader = 1
events_ticker_disp_driverswap = 1
events_ticker_disp_driverswap_me = 0
events_ticker_disp_overtake = 1
events_ticker_disp_overtake_me = 1
events_ticker_disp_flags = 1
events_ticker_disp_custom = 1
events_ticker_disp_incidents_me = 1
events_ticker_disp_three_wide = 1

// Le session_time est utilisé pour calculer les chronos entre 2 évènements consécutifs de même type
function init_session_time_event() {
    session_time_pit_exit_me = 0;
    session_time_pit_entry_me = 0;
    session_time_custom = 0;
    session_time_driverswap_me = 0;
}
init_session_time_event();

events_ticker_disp_incidents = 0  // REM : Plus utilisé

disable_all_events = 0  // Disable all the events including the laptimes history to avoid problems with some tablets.

sessioninfos_height = 32  // This the relative or absolute height depending of the responsive parameter

wind_alert = 0  // Set 1 if you want to be alerted when the wind changes (direction and/or speed)

disp_menu = 1

avg1_nblaps = 5  // Number of laps to take for the avg1 value
avg2_nblaps = 10  // Number of laps to take for the avg2 value
avg3_nblaps = 15  // Number of laps to take for the avg3 value
avg1_best = 0
avg2_best = 0
avg3_best = 0

disp_conso_bigger = 0  // Set 1 to display conso bigger beside the fuel in the tank

jrt_logo_disp = 1  // Display the jrt logo
drag_enable = 0  // pour rendre l'overlay timing ou dashboard 'draggable'. Désactivé par défaut maintenant pour éviter d'empêcher les clicks

drag_overlays = 0  // pour rendre visible la fenêtre et son contour pour pouvoir déplacer / redimensionner les overlays plus facilement

clock_disp = 0 // affichage de l'horloge

display_virtual_winner = 1  // Mettre à 0 pour ne pas afficher l'astérix

fullscreen_button = 1  // afficher ou non le bouton pour passer en fullscreen
fullscreen_button_timeout = 30  // time in seconds, 0 means infinite time.

reload_on_dblclick = 0  // Set 1 if you want the page to be reloaded when double click

sf_line_disp = 1  // double ligne jaune qui s'affiche sous le pilote qui vient de franchir le start/finish line

auto_hide_cpos_scpos = 1

estlaps_decimal = 1  // nombre de décimals à afficher pour le estimated laps
lapsremain_decimal = 1  // nombre de décimals à afficher pour le remaining laps
conso_decimal = 3  // nombre de décimals à afficher pour les consos
fuel_decimal = 1  // nombre de décimals à afficher pour les valeur de fuel (fuel in the tank, fuel to add, ...)

use_css_perso = 1  // permet de savoir si on doit utiliser les css personnalisés (on laisse à 1 par défaut pour une rétro compatibilité)

shiftlight_Xpct = 0
shiftlight_Ypct = 0
shiftlight_Wpct = 100
shiftlight_Hpct = 100
shiftlight_opacity = 0.65

dashboard_light_zindex_offset = 0
dashboard_light_Xpct = 0
dashboard_light_Ypct = 0
dashboard_light_Wpct = 100
dashboard_light_Hpct = 100
dashboard_light_opacity = 0.65

// *** AJOUTER DES OPTIONS POUR LA TAILLE DES CARACTERES ET TYPE BOLD, ITALIC, ... DES DIFFERENTS ELEMENTS
// *** OPTION "CONTRASTE" POUR MIEUX VOIR LES GAPS DANS LES STREAMS


// Trackmap options
trackmap_disp_timelost = 1  // 0: if you don't want to display the Time Lost Next PIT on the trackmap
trackmap_disp_north = 1  // 0: if you don't want to display the North Arrow on the trackmap
trackmap_disp_wind = 1  // 0: if you don't want to display the Wind Arrow on the trackmap
trackmap_disp_weather_infos = 1  // 0: if you don't want to display the weather info on the trackmap
trackmap_disp_predicted = 1  // 0: if you don't want to display the predicted position after the pit stop orange circle

trackmap_disp_turns = 1
trackmap_turn_num_color = "#ffffff"
trackmap_turn_num_coef = 1
trackmap_turn_info_color = "#ffffff"
trackmap_turn_info_coef = 1
trackmap_turn_distance_coef = 1.25

trackmap_weather_info_coef = 1
trackmap_plost_coef = 1
trackmap_north_coef = 1
trackmap_winddir_coef = 1
disp_timing_under_trackmap = 1
timing_trackmap_leftmargin = 0;
trackmap_disp_mode = 0  // 0: normal mode, 1: displays car numbers, 2: displays first 3 letters of the last name
trackmap_thickness_coef = 1  // Thickness coefficient of the trackmap. 1 is the default value.

transparence_fond_trackmap = 1;
fps_trackmap = 10               // Number of fps for the trackmap in the trackmap.html page
                                // in timing.html page, the fps number is the same choosen in fps.txt file
trackmap_disp_logo = 0
trackmap_color = "#2c2c2c"
trackmap_bg_img = 0     // 1 pour utiliser l'image de fond trackmap_bg.png au lieu de la couleur de fond, 0 sinon
trackmap_bg_color = "#a9a9a9"
trackmap_outline_disp = 0
trackmap_outline_coef = 1
trackmap_outline_color = "#ffffff"

trackmap_car_color_auto = 1
trackmap_car_color = "#ff0000"
trackmap_car_coef = 1  // coefficient pour la taille des ronds
trackmap_car_font_color_auto = 1
trackmap_car_font_color = "#ffffff"
trackmap_carnum_coef = 1  // coefficient pour la taille des caractères pour le numéros des voitures
trackmap_car_border_disp = 0
trackmap_car_border_color = "#ffffff"
trackmap_car_border_coef = 1


// Options spécifiques à la voiture sélectionnées
trackmap_car_me_specify = 0  // Sert à dire si on veut spécifier des couleurs ou taille différente pour notre voiture
trackmap_car_me_color_auto = 1
trackmap_car_me_color = "#00ff00"
trackmap_car_me_coef = 1  // coefficient pour la taille des ronds
trackmap_car_me_font_color_auto = 1
trackmap_car_me_font_color = "#000000"
trackmap_carnum_me_coef = 1
trackmap_car_me_border_disp = 0
trackmap_car_me_border_color = "#000000"
trackmap_car_me_border_coef = 1

trackmap_car_myclass_only = 0
trackmap_car_inpits_disp = 1
trackmap_car_color_transparency = 0.65  // entre 0 et 1

trackmap_car_ring_selected = 1
trackmap_car_ring_colorized = 1
trackmap_car_ring_yellow = 1
trackmap_car_ring_lapper = 1
trackmap_car_black_dot = 1
trackmap_car_P1 = 1
trackmap_car_P1_myclass_only = 0

trackmap_start_finish_line_disp = 1
trackmap_start_finish_color = "#ff0000"
trackmap_start_finish_line_thickness_coef = 1
trackmap_start_finish_line_length_coef = 2.5
trackmap_start_finish_arrow_disp = 1
trackmap_start_finish_arrow_thickness_coef = 1
trackmap_start_finish_arrow_length_coef = 1
trackmap_start_finish_arrow_distance_coef = 1.25
trackmap_start_finish_arrow_color = "#ff0000"

trackmap_font_family = "Arial"

trackmap_circular = 0
trackmap_circular_angle = 180
trackmap_circular_reverse = 1
trackmap_circular_centered_on_driver = 0  // 1: le pilote selectionné ne bouge pas

trackmap_select_drivers_number = 0  // 0: on affiche toutes les voitures, 1: seulement le leader de chaque classe, 2: seulement les 2 premiers, ...

// 3D options
trackmap_camera_fov = 30
trackmap_elevation_factor = 5
trackmap_banking_factor = 1
trackmap_antialias = 1
trackmap_lateral_color = "#0088ff"
trackmap_camera_mode = 0   // 0 : normal mode, 1 : onboard


// *** AJOUTER DES OPTIONS POUR LA TAILLE DES CARACTERES ET TYPE BOLD, ITALIC, COULEUR, ... DES DIFFERENTS ELEMENTS
// *** LES RENDRE INDEPENDANTES DU THICKNESS A PART LE N° DES VOITURES


// Calculator options
fps_calculator = 1


// Dashboard options
f3_mode_in_race_dashboard = 0  // 0: normal mode, 1: in race, displays the drivers ahead and behind on the track and not in the standings
dashboard_f3mode_dot = 1  // 0 : pour enlever le point devant le nom
dashboard_name_mode = 1  // 1 : full name (ex: Lewis Hamilton), 2 : short name (ex : L. HAMILTON), 3 : very short name (ex : HAM),
                         //4: Team Name, 5: team name & full name on 2 lines, 6: team name & short name on the same line,
                         // 7: first name and last name initial, 8: first name initial and last name 3 first letters
shiftlight_mode = 0  // 0 = mode manuel, 1 = mode automatique
fps_dashboard = 20
toggle_f3mode_joy = -1
toggle_f3mode_button = -1
incar_set_change_delay = 0.5
display_changed_disp = 0
hybrid_decimal = 0  // nombre de décimals à afficher pour les valeurs ers/mgu ...
rpm_leds_N_red = 9  // n° de led qui s'allume quand on atteint le rpm red défini dans le "Car Parameters"
rpm_leds_led1_pct = 0.8  // % du rpm red à partir duquel la 1ère led s'allume

// ButtonBox options
fps_buttonbox = 10


// *** AJOUTER DES OPTIONS POUR LA TAILLE DES CARACTERES ET TYPE BOLD, ITALIC, ... DES DIFFERENTS ELEMENTS
// *** AJOUTER AUSSI LA POSSIBILITE DE DEFINIR LES ELEMENTS A AFFICHER AINSI QUE LEUR POSITION


// Compteur options
disp_wheel = 0
disp_clutch = 0
compteur_bg_transparency = 0.5  // coefficient de transparence du fond du compteur
compteur_rev1_color = "#0000ff"
compteur_rev2_color = "#ff0000"

// Telemetry_inputs options
inputs_display_pedals = 1
inputs_display_clutch_pedal = 0
inputs_display_wheel = 1
inputs_display_gear_speed = 1
inputs_display_throttle_graph = 1
inputs_display_brake_graph = 1
inputs_display_wheel_graph = 1
inputs_display_clutch_graph = 0
inputs_color = "#000000"
inputs_throttle_color = "#00ff88"
inputs_brake_color = "#ff0088"
inputs_wheel_color = "#ffffff"
inputs_clutch_color = "#0088ff"
inputs_font_family = "digital"
inputs_throttle_opacity = 0.2
inputs_brake_opacity = 0.2
inputs_clutch_opacity = 0.2
inputs_opacity = 0.5
inputs_wheel_color1 = "#000000"
inputs_wheel_color2 = "#ffffff"
inputs_speed_color = "#ffff00"
inputs_gear_color = "#ffffff"
inputs_curve_thickness_coef = 1
inputs_curve_animation_speed_coef = 1
inputs_dash_lines = 1
inputs_dash_lines_thickness_coef = 0.5
inputs_dash_lines_color = "#ffffff"
inputs_display_pct = 0
inputs_brake_pct_color = "#ffffff"
inputs_throttle_pct_color = "#ffffff"
inputs_clutch_pct_color = "#ffffff"
inputs_text_orientation_upright = 0

// Window overlay options
window_x = -1  // -1 : garde les mêmes valeurs
window_y = -1
window_w = -1
window_h = -1
window_alpha = -1
window_topmost = 1
window_borders = 1
window_click_through = 0
//auto_hide = 0  // Hide the overlay automatically when you are not in the car --> remplacé par les options show_overlay_...
show_overlay_sim_not_running = 1
show_overlay_not_incar = 1
show_overlay_incar = 1
show_overlay_ingarage = 1
window_parent_name = 0

overlay_hide_joy = -1
overlay_hide_button = -1

//iRacing window options
window_iracing_control = 0
window_iracing_x = -1
window_iracing_y = -1
window_iracing_w = -1
window_iracing_h = -1
window_iracing_borders = 1
window_iracing_topmost = 0
iracing_fullscreen = 0

shutter = 16
photo_w = 1920
photo_h = 1080
photo_x0 = 0
photo_y0 = 0
photo_smooth = 1  // smooth coef for the background
photo_bracketting = 0
photo_spotter_pack = 0
photo_cuda_level = 2
photo_display = 1
photo_hide_watermark = 0
photo_AA2 = 0
photo_check = 1
free_ram = -1
ram_required = -1
fix_4K = 0
fix_4K_coef = 2
photo_preview_manual_reso = 0
photo_preview_w = 1280
photo_preview_h = 720
photo_rewind_seconds = 0

//broadcast = 0  // set 2 if you want to use external website
fps = 1
fps_original = 1;

fps_broadcast = 0.2  // Refresh rate for the broadcast modes 1, 2 and 3

// Others options
temperature_mode = 0  // 0: Auto (will be Celsius if metric and fahrenheit if English, 1: Force Celsius, 2: Force fahrenheit)

// Option spéciale pour la page spotter
spotter_margin = 0;
spotter_when_not_ontrack = 1;
spotter_landmark_disp = 1;  // On affiche les repères
spotter_rule_disp = 1;  // On affiche la règle lorsque le spotter est actif
spotter_rule_opacity_coef = 1
spotter_rule_shadow = 1
spotter_rule_redline = 0
spotter_side_arrow_blink = 0;
spotter_arrow_coef = 1;  // Taille des flèches (la valeur doit être inférieure à 1
spotter_arrow_inverted = 0
spotter_arrow_opacity_coef = 1
spotter_arrow_shadow = 1
spotter_arrows_approach = 1
spotter_arrows_colorize_blueflag = 1
spotter_background_mode = 0  // 0: no background, 1: always, 2: only when the arrows are displayed
spotter_background_transparency_coef = 0.75;
spotter_nb_wide_text = 0
spotter_nb_wide_text_size_coef = 1

// Advanced options for the dashboard

dashboard_ref_w = 1280
dashboard_ref_h = 720

advanced = {}
nb_displays = 1

advanced["pitbox_bar_on"] = 1  // 0 pour désactiver la barre jaune des pits
advanced["shiftlight_on"] = 1  // 0 pour désactiver le shiftlight
advanced["shiftlight_gear_rpm_speed_on"] = 1  // 0 pour désactiver
advanced["shiftlight_color"] = "#ff0088"
advanced["pitlimiter_light_on"] = 1  // 0 pour désactiver
advanced["pitlimiter_light_inpit_color"] = "#ff0088"
advanced["pitlimiter_light_outpit_color"] = "#00ff00"

advanced["dashboard_light_on"] = 1  // 0 pour désactiver le dashboard light (drapeaux, ...)
advanced["greenflag_light_activated"] = 1
advanced["greenflag_light_color"] = "#00ff00"
advanced["greenflag_light_blink"] = 0
advanced["greenflag_light_priority"] = 6
advanced["yellowflag_light_activated"] = 1
advanced["yellowflag_light_color"] = "#ffff00"
advanced["yellowflag_light_blink"] = 0
advanced["yellowflag_light_text_coef"] = 1
advanced["yellowflag_light_priority"] = 5
advanced["blueflag_light_activated"] = 1
advanced["blueflag_light_color"] = "#0000ff"
advanced["blueflag_light_blink"] = 0
advanced["blueflag_light_priority"] = 7
advanced["whiteflag_light_activated"] = 1
advanced["whiteflag_light_color"] = "#ffffff"
advanced["whiteflag_light_blink"] = 0
advanced["whiteflag_light_priority"] = 8
advanced["car_stopped_ontrack_light_activated"] = 1
advanced["car_stopped_ontrack_light_color"] = "#ffcc00"
advanced["car_stopped_ontrack_light_blink"] = 0
advanced["car_stopped_ontrack_light_text_coef"] = 1
advanced["car_stopped_ontrack_light_priority"] = 1
advanced["qualy_not_valid_light_activated"] = 1
advanced["qualy_not_valid_light_color"] = "#ff0000"
advanced["qualy_not_valid_light_blink"] = 0
advanced["qualy_not_valid_light_priority"] = 9
advanced["oil_temp_alert_light_activated"] = 1
advanced["oil_temp_alert_light_color"] = "#df49d8"
advanced["oil_temp_alert_light_blink"] = 1
advanced["oil_temp_alert_light_priority"] = 3
advanced["water_temp_alert_light_activated"] = 1
advanced["water_temp_alert_light_color"] = "#3c9ffb"
advanced["water_temp_alert_light_blink"] = 1
advanced["water_temp_alert_light_priority"] = 4
advanced["fuel_alert_light_activated"] = 0
advanced["fuel_alert_light_color"] = "#ff8800"
advanced["fuel_alert_light_blink"] = 0
advanced["fuel_alert_light_priority"] = 2
advanced["abs_active_light_activated"] = 0
advanced["abs_active_light_color"] = "#0088ff"
advanced["abs_active_light_blink"] = 0
advanced["abs_active_light_priority"] = 10

advanced["math_channel_light_activated"] = 0
advanced["math_channel_light_formula"] = "b > 0 and t > 0"
advanced["math_channel_light_color"] = "#ff0088"
advanced["math_channel_light_blink"] = 0
advanced["math_channel_light_priority"] = 11

advanced["switch_off_flags_auto"] = 1
advanced["switch_off_flags_auto_delay"] = 5

advanced["display_selected"] = 1

advanced["next_display_joy"] = -1
advanced["next_display_button"] = -1
advanced["previous_display_joy"] = -1
advanced["previous_display_button"] = -1

advanced["font-family"] = "Arial"
advanced["font-weight"] = "bold"
advanced["font-style"] = "normal"

advanced["name_1"] = "JRT Dashboard - Default"

// REM : faut pas le définir par défaut car si on vient d'une ancienne version, on va prendre comme valeur par défault le dashboard_ref_w et dashboard_ref_h
//advanced["ref_w_1"] = 1280
//advanced["ref_h_1"] = 720

// REM : comme pour ref_w et ref_h on ne définit pas de valeur par défaut.
//advanced["image_de_fond_1"] = "display_vide.png"

advanced["transparency_OBS_1"] = 0

advanced["grid_disp_1"] = 1
advanced["grid_front_1"] = 1
advanced["grid_w_1"] = 16
advanced["grid_h_1"] = 16
advanced["grid_snap_1"] = 1
advanced["hide_unused_dashboard_elements_1"] = 0

// On définit les valeurs par défault des iframes
advanced["iframe1_disp_1"] = 0
advanced["iframe1_src_1"] = ""
advanced["iframe1_X_1"] = 0
advanced["iframe1_Y_1"] = 0
advanced["iframe1_W_1"] = 640
advanced["iframe1_H_1"] = 360
advanced["iframe1_zIndex_1"] = 4
advanced["iframe1_click_through_1"] = 0
advanced["iframe2_disp_1"] = 0
advanced["iframe2_src_1"] = ""
advanced["iframe2_X_1"] = 0
advanced["iframe2_Y_1"] = 0
advanced["iframe2_W_1"] = 640
advanced["iframe2_H_1"] = 360
advanced["iframe2_zIndex_1"] = 5
advanced["iframe2_click_through_1"] = 0
advanced["iframe3_disp_1"] = 0
advanced["iframe3_src_1"] = ""
advanced["iframe3_X_1"] = 0
advanced["iframe3_Y_1"] = 0
advanced["iframe3_W_1"] = 640
advanced["iframe3_H_1"] = 360
advanced["iframe3_zIndex_1"] = 6
advanced["iframe3_click_through_1"] = 0
advanced["iframe4_disp_1"] = 0
advanced["iframe4_src_1"] = ""
advanced["iframe4_X_1"] = 0
advanced["iframe4_Y_1"] = 0
advanced["iframe4_W_1"] = 640
advanced["iframe4_H_1"] = 360
advanced["iframe4_zIndex_1"] = 7
advanced["iframe4_click_through_1"] = 0

advanced["select_display_1_joy"] = -1
advanced["select_display_1_button"] = -1

advanced["disp_gear_1"] = 1
advanced["x_gear_1"] = 512
advanced["y_gear_1"] = 192
advanced["w_gear_1"] = 256
advanced["h_gear_1"] = 320
advanced["f_gear_1"] = 358.4
advanced["bg_gear_1"] = 1

advanced["disp_weather_1"] = 1
advanced["x_weather_1"] = 0
advanced["y_weather_1"] = 64
advanced["w_weather_1"] = 1152
advanced["h_weather_1"] = 64
advanced["f_weather_1"] = 40.96
advanced["bg_weather_1"] = 1

advanced["disp_rpm_1"] = 1
advanced["x_rpm_1"] = 512
advanced["y_rpm_1"] = 128
advanced["w_rpm_1"] = 256
advanced["h_rpm_1"] = 64
advanced["f_rpm_1"] = 70.4
advanced["bg_rpm_1"] = 1

advanced["disp_speed_1"] = 1
advanced["x_speed_1"] = 512
advanced["y_speed_1"] = 512
advanced["w_speed_1"] = 256
advanced["h_speed_1"] = 144
advanced["f_speed_1"] = 134.4
advanced["bg_speed_1"] = 1

advanced["disp_timeremain_1"] = 1
advanced["x_timeremain_1"] = 512
advanced["y_timeremain_1"] = 656
advanced["w_timeremain_1"] = 256
advanced["h_timeremain_1"] = 64
advanced["f_timeremain_1"] = 57.6
advanced["bg_timeremain_1"] = 1

advanced["disp_tank_h_1"] = 1
advanced["x_tank_h_1"] = 0
advanced["y_tank_h_1"] = 512
advanced["w_tank_h_1"] = 256
advanced["h_tank_h_1"] = 48
advanced["f_tank_h_1"] = 32
advanced["bg_tank_h_1"] = 1

advanced["disp_estlaps_h_1"] = 1
advanced["x_estlaps_h_1"] = 256
advanced["y_estlaps_h_1"] = 512
advanced["w_estlaps_h_1"] = 256
advanced["h_estlaps_h_1"] = 48
advanced["f_estlaps_h_1"] = 32
advanced["bg_estlaps_h_1"] = 1

advanced["disp_lapsremain_h_1"] = 1
advanced["x_lapsremain_h_1"] = 768
advanced["y_lapsremain_h_1"] = 512
advanced["w_lapsremain_h_1"] = 256
advanced["h_lapsremain_h_1"] = 48
advanced["f_lapsremain_h_1"] = 32
advanced["bg_lapsremain_h_1"] = 1

advanced["disp_fuelneed_h_1"] = 1
advanced["x_fuelneed_h_1"] = 1024
advanced["y_fuelneed_h_1"] = 512
advanced["w_fuelneed_h_1"] = 256
advanced["h_fuelneed_h_1"] = 48
advanced["f_fuelneed_h_1"] = 32
advanced["bg_fuelneed_h_1"] = 1

advanced["disp_tank_1"] = 1
advanced["x_tank_1"] = 0
advanced["y_tank_1"] = 560
advanced["w_tank_1"] = 256
advanced["h_tank_1"] = 96
advanced["f_tank_1"] = 96
advanced["bg_tank_1"] = 1

advanced["disp_estlaps_1"] = 1
advanced["x_estlaps_1"] = 256
advanced["y_estlaps_1"] = 560
advanced["w_estlaps_1"] = 256
advanced["h_estlaps_1"] = 96
advanced["f_estlaps_1"] = 96
advanced["bg_estlaps_1"] = 1

advanced["disp_estlaps_white_bar_pct_1"] = 0
advanced["x_estlaps_white_bar_pct_1"] = 0
advanced["y_estlaps_white_bar_pct_1"] = 0
advanced["w_estlaps_white_bar_pct_1"] = 256
advanced["h_estlaps_white_bar_pct_1"] = 96
advanced["f_estlaps_white_bar_pct_1"] = 96
advanced["bg_estlaps_white_bar_pct_1"] = 1

advanced["disp_lapsremain_1"] = 1
advanced["x_lapsremain_1"] = 768
advanced["y_lapsremain_1"] = 560
advanced["w_lapsremain_1"] = 256
advanced["h_lapsremain_1"] = 96
advanced["f_lapsremain_1"] = 96
advanced["bg_lapsremain_1"] = 1

advanced["disp_lapsremain_orange_bar_pct_1"] = 0
advanced["x_lapsremain_orange_bar_pct_1"] = 0
advanced["y_lapsremain_orange_bar_pct_1"] = 0
advanced["w_lapsremain_orange_bar_pct_1"] = 256
advanced["h_lapsremain_orange_bar_pct_1"] = 96
advanced["f_lapsremain_orange_bar_pct_1"] = 96
advanced["bg_lapsremain_orange_bar_pct_1"] = 1

advanced["disp_lapsremain_gold_line_pct_1"] = 0
advanced["x_lapsremain_gold_line_pct_1"] = 0
advanced["y_lapsremain_gold_line_pct_1"] = 0
advanced["w_lapsremain_gold_line_pct_1"] = 256
advanced["h_lapsremain_gold_line_pct_1"] = 96
advanced["f_lapsremain_gold_line_pct_1"] = 96
advanced["bg_lapsremain_gold_line_pct_1"] = 1

advanced["disp_fuelneed_1"] = 1
advanced["x_fuelneed_1"] = 1024
advanced["y_fuelneed_1"] = 560
advanced["w_fuelneed_1"] = 256
advanced["h_fuelneed_1"] = 96
advanced["f_fuelneed_1"] = 96
advanced["bg_fuelneed_1"] = 1

advanced["disp_conso_1"] = 1
advanced["x_conso_1"] = 0
advanced["y_conso_1"] = 656
advanced["w_conso_1"] = 320
advanced["h_conso_1"] = 64
advanced["f_conso_1"] = 64
advanced["bg_conso_1"] = 1

advanced["disp_nbpits_1"] = 1
advanced["x_nbpits_1"] = 320
advanced["y_nbpits_1"] = 656
advanced["w_nbpits_1"] = 192
advanced["h_nbpits_1"] = 64
advanced["f_nbpits_1"] = 51.2
advanced["bg_nbpits_1"] = 1

advanced["disp_oil_1"] = 1
advanced["x_oil_1"] = 768
advanced["y_oil_1"] = 656
advanced["w_oil_1"] = 256
advanced["h_oil_1"] = 64
advanced["f_oil_1"] = 51.2
advanced["bg_oil_1"] = 1

advanced["disp_water_1"] = 1
advanced["x_water_1"] = 1024
advanced["y_water_1"] = 656
advanced["w_water_1"] = 256
advanced["h_water_1"] = 64
advanced["f_water_1"] = 51.2
advanced["bg_water_1"] = 1

advanced["disp_pre_pos_1"] = 1
advanced["x_pre_pos_1"] = 0
advanced["y_pre_pos_1"] = 128
advanced["w_pre_pos_1"] = 112
advanced["h_pre_pos_1"] = 64
advanced["f_pre_pos_1"] = 64
advanced["bg_pre_pos_1"] = 1

advanced["disp_me_pos_1"] = 1
advanced["x_me_pos_1"] = 0
advanced["y_me_pos_1"] = 256
advanced["w_me_pos_1"] = 112
advanced["h_me_pos_1"] = 64
advanced["f_me_pos_1"] = 64
advanced["bg_me_pos_1"] = 1

advanced["disp_post_pos_1"] = 1
advanced["x_post_pos_1"] = 0
advanced["y_post_pos_1"] = 384
advanced["w_post_pos_1"] = 112
advanced["h_post_pos_1"] = 64
advanced["f_post_pos_1"] = 64
advanced["bg_post_pos_1"] = 1

advanced["disp_pre_cpos_1"] = 1
advanced["x_pre_cpos_1"] = 0
advanced["y_pre_cpos_1"] = 192
advanced["w_pre_cpos_1"] = 112
advanced["h_pre_cpos_1"] = 64
advanced["f_pre_cpos_1"] = 51.2
advanced["bg_pre_cpos_1"] = 1

advanced["disp_me_cpos_1"] = 1
advanced["x_me_cpos_1"] = 0
advanced["y_me_cpos_1"] = 320
advanced["w_me_cpos_1"] = 112
advanced["h_me_cpos_1"] = 64
advanced["f_me_cpos_1"] = 51.2
advanced["bg_me_cpos_1"] = 1

advanced["disp_post_cpos_1"] = 1
advanced["x_post_cpos_1"] = 0
advanced["y_post_cpos_1"] = 448
advanced["w_post_cpos_1"] = 112
advanced["h_post_cpos_1"] = 64
advanced["f_post_cpos_1"] = 51.2
advanced["bg_post_cpos_1"] = 1

advanced["disp_pre_pos2_1"] = 0
advanced["x_pre_pos2_1"] = 0
advanced["y_pre_pos2_1"] = 128
advanced["w_pre_pos2_1"] = 112
advanced["h_pre_pos2_1"] = 64
advanced["f_pre_pos2_1"] = 64
advanced["bg_pre_pos2_1"] = 1

advanced["disp_me_pos2_1"] = 0
advanced["x_me_pos2_1"] = 0
advanced["y_me_pos2_1"] = 256
advanced["w_me_pos2_1"] = 112
advanced["h_me_pos2_1"] = 64
advanced["f_me_pos2_1"] = 64
advanced["bg_me_pos2_1"] = 1

advanced["disp_post_pos2_1"] = 0
advanced["x_post_pos2_1"] = 0
advanced["y_post_pos2_1"] = 384
advanced["w_post_pos2_1"] = 112
advanced["h_post_pos2_1"] = 64
advanced["f_post_pos2_1"] = 64
advanced["bg_post_pos2_1"] = 1

advanced["disp_pre_cpos2_1"] = 0
advanced["x_pre_cpos2_1"] = 0
advanced["y_pre_cpos2_1"] = 192
advanced["w_pre_cpos2_1"] = 112
advanced["h_pre_cpos2_1"] = 64
advanced["f_pre_cpos2_1"] = 51.2
advanced["bg_pre_cpos2_1"] = 1

advanced["disp_me_cpos2_1"] = 0
advanced["x_me_cpos2_1"] = 0
advanced["y_me_cpos2_1"] = 320
advanced["w_me_cpos2_1"] = 112
advanced["h_me_cpos2_1"] = 64
advanced["f_me_cpos2_1"] = 51.2
advanced["bg_me_cpos2_1"] = 1

advanced["disp_post_cpos2_1"] = 0
advanced["x_post_cpos2_1"] = 0
advanced["y_post_cpos2_1"] = 448
advanced["w_post_cpos2_1"] = 112
advanced["h_post_cpos2_1"] = 64
advanced["f_post_cpos2_1"] = 51.2
advanced["bg_post_cpos2_1"] = 1

advanced["disp_pre_gain_1"] = 1
advanced["x_pre_gain_1"] = 112
advanced["y_pre_gain_1"] = 128
advanced["w_pre_gain_1"] = 112
advanced["h_pre_gain_1"] = 64
advanced["f_pre_gain_1"] = 64
advanced["bg_pre_gain_1"] = 1

advanced["disp_pre_cgain_1"] = 1
advanced["x_pre_cgain_1"] = 112
advanced["y_pre_cgain_1"] = 192
advanced["w_pre_cgain_1"] = 112
advanced["h_pre_cgain_1"] = 64
advanced["f_pre_cgain_1"] = 51.2
advanced["bg_pre_cgain_1"] = 1

advanced["disp_me_gain_1"] = 1
advanced["x_me_gain_1"] = 112
advanced["y_me_gain_1"] = 256
advanced["w_me_gain_1"] = 112
advanced["h_me_gain_1"] = 64
advanced["f_me_gain_1"] = 64
advanced["bg_me_gain_1"] = 1

advanced["disp_me_cgain_1"] = 1
advanced["x_me_cgain_1"] = 112
advanced["y_me_cgain_1"] = 320
advanced["w_me_cgain_1"] = 112
advanced["h_me_cgain_1"] = 64
advanced["f_me_cgain_1"] = 51.2
advanced["bg_me_cgain_1"] = 1

advanced["disp_post_gain_1"] = 1
advanced["x_post_gain_1"] = 112
advanced["y_post_gain_1"] = 384
advanced["w_post_gain_1"] = 112
advanced["h_post_gain_1"] = 64
advanced["f_post_gain_1"] = 64
advanced["bg_post_gain_1"] = 1

advanced["disp_post_cgain_1"] = 1
advanced["x_post_cgain_1"] = 112
advanced["y_post_cgain_1"] = 448
advanced["w_post_cgain_1"] = 112
advanced["h_post_cgain_1"] = 64
advanced["f_post_cgain_1"] = 51.2
advanced["bg_post_cgain_1"] = 1

advanced["disp_pre_best_1"] = 1
advanced["x_pre_best_1"] = 224
advanced["y_pre_best_1"] = 128
advanced["w_pre_best_1"] = 288
advanced["h_pre_best_1"] = 64
advanced["f_pre_best_1"] = 64
advanced["bg_pre_best_1"] = 1

advanced["disp_pre_last_1"] = 1
advanced["x_pre_last_1"] = 224
advanced["y_pre_last_1"] = 192
advanced["w_pre_last_1"] = 288
advanced["h_pre_last_1"] = 64
advanced["f_pre_last_1"] = 51.2
advanced["bg_pre_last_1"] = 1

advanced["disp_me_best_1"] = 1
advanced["x_me_best_1"] = 768
advanced["y_me_best_1"] = 256
advanced["w_me_best_1"] = 368
advanced["h_me_best_1"] = 64
advanced["f_me_best_1"] = 64
advanced["bg_me_best_1"] = 1

advanced["disp_me_last_1"] = 1
advanced["x_me_last_1"] = 768
advanced["y_me_last_1"] = 320
advanced["w_me_last_1"] = 368
advanced["h_me_last_1"] = 64
advanced["f_me_last_1"] = 51.2
advanced["bg_me_last_1"] = 1

advanced["disp_post_best_1"] = 1
advanced["x_post_best_1"] = 224
advanced["y_post_best_1"] = 384
advanced["w_post_best_1"] = 288
advanced["h_post_best_1"] = 64
advanced["f_post_best_1"] = 64
advanced["bg_post_best_1"] = 1

advanced["disp_post_last_1"] = 1
advanced["x_post_last_1"] = 224
advanced["y_post_last_1"] = 448
advanced["w_post_last_1"] = 288
advanced["h_post_last_1"] = 64
advanced["f_post_last_1"] = 51.2
advanced["bg_post_last_1"] = 1

advanced["disp_pre_rel_1"] = 1
advanced["x_pre_rel_1"] = 768
advanced["y_pre_rel_1"] = 192
advanced["w_pre_rel_1"] = 208
advanced["h_pre_rel_1"] = 64
advanced["f_pre_rel_1"] = 64
advanced["bg_pre_rel_1"] = 1

advanced["disp_post_rel_1"] = 1
advanced["x_post_rel_1"] = 768
advanced["y_post_rel_1"] = 448
advanced["w_post_rel_1"] = 208
advanced["h_post_rel_1"] = 64
advanced["f_post_rel_1"] = 64
advanced["bg_post_rel_1"] = 1

advanced["disp_me_gap_1"] = 0
advanced["x_me_gap_1"] = 0
advanced["y_me_gap_1"] = 0
advanced["w_me_gap_1"] = 208
advanced["h_me_gap_1"] = 64
advanced["f_me_gap_1"] = 64
advanced["bg_me_gap_1"] = 1

advanced["disp_me_cgap_1"] = 0
advanced["x_me_cgap_1"] = 0
advanced["y_me_cgap_1"] = 0
advanced["w_me_cgap_1"] = 208
advanced["h_me_cgap_1"] = 64
advanced["f_me_cgap_1"] = 64
advanced["bg_me_cgap_1"] = 1

advanced["disp_pre_topspeed_1"] = 0
advanced["x_pre_topspeed_1"] = 0
advanced["y_pre_topspeed_1"] = 0
advanced["w_pre_topspeed_1"] = 208
advanced["h_pre_topspeed_1"] = 64
advanced["f_pre_topspeed_1"] = 64
advanced["bg_pre_topspeed_1"] = 1

advanced["disp_me_topspeed_1"] = 0
advanced["x_me_topspeed_1"] = 0
advanced["y_me_topspeed_1"] = 0
advanced["w_me_topspeed_1"] = 208
advanced["h_me_topspeed_1"] = 64
advanced["f_me_topspeed_1"] = 64
advanced["bg_me_topspeed_1"] = 1

advanced["disp_post_topspeed_1"] = 0
advanced["x_post_topspeed_1"] = 0
advanced["y_post_topspeed_1"] = 0
advanced["w_post_topspeed_1"] = 208
advanced["h_post_topspeed_1"] = 64
advanced["f_post_topspeed_1"] = 64
advanced["bg_post_topspeed_1"] = 1

advanced["disp_pre_max_speed_1"] = 0
advanced["x_pre_max_speed_1"] = 0
advanced["y_pre_max_speed_1"] = 0
advanced["w_pre_max_speed_1"] = 208
advanced["h_pre_max_speed_1"] = 64
advanced["f_pre_max_speed_1"] = 64
advanced["bg_pre_max_speed_1"] = 1

advanced["disp_me_max_speed_1"] = 0
advanced["x_me_max_speed_1"] = 0
advanced["y_me_max_speed_1"] = 0
advanced["w_me_max_speed_1"] = 208
advanced["h_me_max_speed_1"] = 64
advanced["f_me_max_speed_1"] = 64
advanced["bg_me_max_speed_1"] = 1

advanced["disp_post_max_speed_1"] = 0
advanced["x_post_max_speed_1"] = 0
advanced["y_post_max_speed_1"] = 0
advanced["w_post_max_speed_1"] = 208
advanced["h_post_max_speed_1"] = 64
advanced["f_post_max_speed_1"] = 64
advanced["bg_post_max_speed_1"] = 1

advanced["disp_pre_apex_speed_1"] = 0
advanced["x_pre_apex_speed_1"] = 0
advanced["y_pre_apex_speed_1"] = 0
advanced["w_pre_apex_speed_1"] = 208
advanced["h_pre_apex_speed_1"] = 64
advanced["f_pre_apex_speed_1"] = 64
advanced["bg_pre_apex_speed_1"] = 1

advanced["disp_me_apex_speed_1"] = 0
advanced["x_me_apex_speed_1"] = 0
advanced["y_me_apex_speed_1"] = 0
advanced["w_me_apex_speed_1"] = 208
advanced["h_me_apex_speed_1"] = 64
advanced["f_me_apex_speed_1"] = 64
advanced["bg_me_apex_speed_1"] = 1

advanced["disp_post_apex_speed_1"] = 0
advanced["x_post_apex_speed_1"] = 0
advanced["y_post_apex_speed_1"] = 0
advanced["w_post_apex_speed_1"] = 208
advanced["h_post_apex_speed_1"] = 64
advanced["f_post_apex_speed_1"] = 64
advanced["bg_post_apex_speed_1"] = 1

advanced["disp_me_current_1"] = 0
advanced["x_me_current_1"] = 0
advanced["y_me_current_1"] = 0
advanced["w_me_current_1"] = 368
advanced["h_me_current_1"] = 64
advanced["f_me_current_1"] = 51
advanced["bg_me_current_1"] = 1

advanced["disp_me_estlaptime_1"] = 0
advanced["x_me_estlaptime_1"] = 0
advanced["y_me_estlaptime_1"] = 0
advanced["w_me_estlaptime_1"] = 368
advanced["h_me_estlaptime_1"] = 64
advanced["f_me_estlaptime_1"] = 51
advanced["bg_me_estlaptime_1"] = 1

advanced["disp_pre_stint_1"] = 1
advanced["x_pre_stint_1"] = 1136
advanced["y_pre_stint_1"] = 192
advanced["w_pre_stint_1"] = 144
advanced["h_pre_stint_1"] = 64
advanced["f_pre_stint_1"] = 51.2
advanced["bg_pre_stint_1"] = 1

advanced["disp_me_stint_1"] = 1
advanced["x_me_stint_1"] = 1136
advanced["y_me_stint_1"] = 320
advanced["w_me_stint_1"] = 144
advanced["h_me_stint_1"] = 64
advanced["f_me_stint_1"] = 51.2
advanced["bg_me_stint_1"] = 1

advanced["disp_post_stint_1"] = 1
advanced["x_post_stint_1"] = 1136
advanced["y_post_stint_1"] = 448
advanced["w_post_stint_1"] = 144
advanced["h_post_stint_1"] = 64
advanced["f_post_stint_1"] = 51.2
advanced["bg_post_stint_1"] = 1

advanced["disp_me_lc_1"] = 1
advanced["x_me_lc_1"] = 1136
advanced["y_me_lc_1"] = 256
advanced["w_me_lc_1"] = 144
advanced["h_me_lc_1"] = 64
advanced["f_me_lc_1"] = 64
advanced["bg_me_lc_1"] = 1

advanced["disp_pre_name_1"] = 1
advanced["x_pre_name_1"] = 768
advanced["y_pre_name_1"] = 128
advanced["w_pre_name_1"] = 512
advanced["h_pre_name_1"] = 64
advanced["f_pre_name_1"] = 51.2
advanced["bg_pre_name_1"] = 1

advanced["disp_me_name_1"] = 0
advanced["x_me_name_1"] = 0
advanced["y_me_name_1"] = 0
advanced["w_me_name_1"] = 512
advanced["h_me_name_1"] = 64
advanced["f_me_name_1"] = 51.2
advanced["bg_me_name_1"] = 1

advanced["disp_post_name_1"] = 1
advanced["x_post_name_1"] = 768
advanced["y_post_name_1"] = 384
advanced["w_post_name_1"] = 512
advanced["h_post_name_1"] = 64
advanced["f_post_name_1"] = 51.2
advanced["bg_post_name_1"] = 1

advanced["disp_leader_name_1"] = 0
advanced["x_leader_name_1"] = 0
advanced["y_leader_name_1"] = 0
advanced["w_leader_name_1"] = 512
advanced["h_leader_name_1"] = 64
advanced["f_leader_name_1"] = 51.2
advanced["bg_leader_name_1"] = 1

advanced["disp_cleader_name_1"] = 0
advanced["x_cleader_name_1"] = 0
advanced["y_cleader_name_1"] = 0
advanced["w_cleader_name_1"] = 512
advanced["h_cleader_name_1"] = 64
advanced["f_cleader_name_1"] = 51.2
advanced["bg_cleader_name_1"] = 1

advanced["disp_leader_best_1"] = 0
advanced["x_leader_best_1"] = 0
advanced["y_leader_best_1"] = 0
advanced["w_leader_best_1"] = 368
advanced["h_leader_best_1"] = 64
advanced["f_leader_best_1"] = 51.2
advanced["bg_leader_best_1"] = 1

advanced["disp_cleader_best_1"] = 0
advanced["x_cleader_best_1"] = 0
advanced["y_cleader_best_1"] = 0
advanced["w_cleader_best_1"] = 368
advanced["h_cleader_best_1"] = 64
advanced["f_cleader_best_1"] = 51.2
advanced["bg_cleader_best_1"] = 1

advanced["disp_leader_last_1"] = 0
advanced["x_leader_last_1"] = 0
advanced["y_leader_last_1"] = 0
advanced["w_leader_last_1"] = 368
advanced["h_leader_last_1"] = 64
advanced["f_leader_last_1"] = 51.2
advanced["bg_leader_last_1"] = 1

advanced["disp_cleader_last_1"] = 0
advanced["x_cleader_last_1"] = 0
advanced["y_cleader_last_1"] = 0
advanced["w_cleader_last_1"] = 368
advanced["h_cleader_last_1"] = 64
advanced["f_cleader_last_1"] = 51.2
advanced["bg_cleader_last_1"] = 1

advanced["disp_pre_lic_1"] = 0
advanced["x_pre_lic_1"] = 0
advanced["y_pre_lic_1"] = 0
advanced["w_pre_lic_1"] = 300
advanced["h_pre_lic_1"] = 60
advanced["f_pre_lic_1"] = 54
advanced["bg_pre_lic_1"] = 1

advanced["disp_post_lic_1"] = 0
advanced["x_post_lic_1"] = 0
advanced["y_post_lic_1"] = 120
advanced["w_post_lic_1"] = 300
advanced["h_post_lic_1"] = 60
advanced["f_post_lic_1"] = 54
advanced["bg_post_lic_1"] = 1

advanced["disp_pre_ir_1"] = 0
advanced["x_pre_ir_1"] = 0
advanced["y_pre_ir_1"] = 60
advanced["w_pre_ir_1"] = 300
advanced["h_pre_ir_1"] = 60
advanced["f_pre_ir_1"] = 54
advanced["bg_pre_ir_1"] = 1

advanced["disp_post_ir_1"] = 0
advanced["x_post_ir_1"] = 0
advanced["y_post_ir_1"] = 180
advanced["w_post_ir_1"] = 300
advanced["h_post_ir_1"] = 60
advanced["f_post_ir_1"] = 54
advanced["bg_post_ir_1"] = 1

advanced["disp_pre_track_status_1"] = 0
advanced["x_pre_track_status_1"] = 0
advanced["y_pre_track_status_1"] = 60
advanced["w_pre_track_status_1"] = 300
advanced["h_pre_track_status_1"] = 60
advanced["f_pre_track_status_1"] = 54
advanced["bg_pre_track_status_1"] = 1

advanced["disp_post_track_status_1"] = 0
advanced["x_post_track_status_1"] = 0
advanced["y_post_track_status_1"] = 180
advanced["w_post_track_status_1"] = 300
advanced["h_post_track_status_1"] = 60
advanced["f_post_track_status_1"] = 54
advanced["bg_post_track_status_1"] = 1

advanced["disp_delta_best_h_1"] = 1
advanced["x_delta_best_h_1"] = 224
advanced["y_delta_best_h_1"] = 256
advanced["w_delta_best_h_1"] = 96
advanced["h_delta_best_h_1"] = 64
advanced["f_delta_best_h_1"] = 32
advanced["bg_delta_best_h_1"] = 1

advanced["disp_delta_last_h_1"] = 1
advanced["x_delta_last_h_1"] = 224
advanced["y_delta_last_h_1"] = 320
advanced["w_delta_last_h_1"] = 96
advanced["h_delta_last_h_1"] = 64
advanced["f_delta_last_h_1"] = 32
advanced["bg_delta_last_h_1"] = 1

advanced["disp_delta_best_1"] = 1
advanced["x_delta_best_1"] = 320
advanced["y_delta_best_1"] = 256
advanced["w_delta_best_1"] = 192
advanced["h_delta_best_1"] = 64
advanced["f_delta_best_1"] = 64
advanced["bg_delta_best_1"] = 1

advanced["disp_delta_last_1"] = 1
advanced["x_delta_last_1"] = 320
advanced["y_delta_last_1"] = 320
advanced["w_delta_last_1"] = 192
advanced["h_delta_last_1"] = 64
advanced["f_delta_last_1"] = 64
advanced["bg_delta_last_1"] = 1

advanced["disp_bb_1"] = 1
advanced["x_bb_1"] = 0
advanced["y_bb_1"] = 0
advanced["w_bb_1"] = 80
advanced["h_bb_1"] = 64
advanced["f_bb_1"] = 32
advanced["bg_bb_1"] = 1

advanced["disp_tc_1"] = 1
advanced["x_tc_1"] = 96
advanced["y_tc_1"] = 0
advanced["w_tc_1"] = 48
advanced["h_tc_1"] = 64
advanced["f_tc_1"] = 32
advanced["bg_tc_1"] = 1

advanced["disp_ffb_1"] = 1
advanced["x_ffb_1"] = 160
advanced["y_ffb_1"] = 0
advanced["w_ffb_1"] = 80
advanced["h_ffb_1"] = 64
advanced["f_ffb_1"] = 32
advanced["bg_ffb_1"] = 1

advanced["disp_b_cont_1"] = 1
advanced["x_b_cont_1"] = 80
advanced["y_b_cont_1"] = 0
advanced["w_b_cont_1"] = 16
advanced["h_b_cont_1"] = 64
advanced["f_b_cont_1"] = 32
advanced["bg_b_cont_1"] = 1

advanced["disp_t_cont_1"] = 1
advanced["x_t_cont_1"] = 144
advanced["y_t_cont_1"] = 0
advanced["w_t_cont_1"] = 16
advanced["h_t_cont_1"] = 64
advanced["f_t_cont_1"] = 32
advanced["bg_t_cont_1"] = 1

advanced["disp_ffbpct_cont_1"] = 1
advanced["x_ffbpct_cont_1"] = 240
advanced["y_ffbpct_cont_1"] = 0
advanced["w_ffbpct_cont_1"] = 16
advanced["h_ffbpct_cont_1"] = 64
advanced["f_ffbpct_cont_1"] = 32
advanced["bg_ffbpct_cont_1"] = 1

advanced["disp_mgua_1"] = 1
advanced["x_mgua_1"] = 240
advanced["y_mgua_1"] = 0
advanced["w_mgua_1"] = 80
advanced["h_mgua_1"] = 32
advanced["f_mgua_1"] = 32
advanced["bg_mgua_1"] = 1

advanced["disp_mguf_1"] = 1
advanced["x_mguf_1"] = 240
advanced["y_mguf_1"] = 32
advanced["w_mguf_1"] = 80
advanced["h_mguf_1"] = 32
advanced["f_mguf_1"] = 32
advanced["bg_mguf_1"] = 1

// Target batt SoC request (pour la McLaren F1)
advanced["disp_mgum_1"] = 0
advanced["x_mgum_1"] = 0
advanced["y_mgum_1"] = 0
advanced["w_mgum_1"] = 80
advanced["h_mgum_1"] = 64
advanced["f_mgum_1"] = 57.6
advanced["bg_mgum_1"] = 1

advanced["disp_ers_1"] = 1
advanced["x_ers_1"] = 320
advanced["y_ers_1"] = 0
advanced["w_ers_1"] = 160
advanced["h_ers_1"] = 64
advanced["f_ers_1"] = 57.6
advanced["bg_ers_1"] = 1

advanced["disp_ersco_1"] = 1
advanced["x_ersco_1"] = 480
advanced["y_ersco_1"] = 0
advanced["w_ersco_1"] = 160
advanced["h_ersco_1"] = 64
advanced["f_ersco_1"] = 57.6
advanced["bg_ersco_1"] = 1

advanced["disp_ers_margin_1"] = 0
advanced["x_ers_margin_1"] = 480
advanced["y_ers_margin_1"] = 0
advanced["w_ers_margin_1"] = 160
advanced["h_ers_margin_1"] = 64
advanced["f_ers_margin_1"] = 32
advanced["bg_ers_margin_1"] = 1

advanced["disp_mgul_1"] = 1
advanced["x_mgul_1"] = 640
advanced["y_mgul_1"] = 0
advanced["w_mgul_1"] = 160
advanced["h_mgul_1"] = 64
advanced["f_mgul_1"] = 57.6
advanced["bg_mgul_1"] = 1

advanced["disp_mgu_1"] = 1
advanced["x_mgu_1"] = 800
advanced["y_mgu_1"] = 0
advanced["w_mgu_1"] = 160
advanced["h_mgu_1"] = 64
advanced["f_mgu_1"] = 57.6
advanced["bg_mgu_1"] = 1

advanced["disp_regen_lap_1"] = 0
advanced["x_regen_lap_1"] = 640
advanced["y_regen_lap_1"] = 0
advanced["w_regen_lap_1"] = 160
advanced["h_regen_lap_1"] = 64
advanced["f_regen_lap_1"] = 57.6
advanced["bg_regen_lap_1"] = 1

advanced["disp_regen_turn_1"] = 0
advanced["x_regen_turn_1"] = 640
advanced["y_regen_turn_1"] = 0
advanced["w_regen_turn_1"] = 160
advanced["h_regen_turn_1"] = 64
advanced["f_regen_turn_1"] = 57.6
advanced["bg_regen_turn_1"] = 1

advanced["disp_drs_1"] = 1
advanced["x_drs_1"] = 960
advanced["y_drs_1"] = 0
advanced["w_drs_1"] = 192
advanced["h_drs_1"] = 64
advanced["f_drs_1"] = 70.4
advanced["bg_drs_1"] = 1

advanced["disp_delta_pre_1"] = 1
advanced["x_delta_pre_1"] = 976
advanced["y_delta_pre_1"] = 192
advanced["w_delta_pre_1"] = 160
advanced["h_delta_pre_1"] = 64
advanced["f_delta_pre_1"] = 0
advanced["bg_delta_pre_1"] = 1

advanced["disp_delta_post_1"] = 1
advanced["x_delta_post_1"] = 976
advanced["y_delta_post_1"] = 448
advanced["w_delta_post_1"] = 160
advanced["h_delta_post_1"] = 64
advanced["f_delta_post_1"] = 0
advanced["bg_delta_post_1"] = 1

advanced["disp_compass_1"] = 1
advanced["x_compass_1"] = 1152
advanced["y_compass_1"] = 0
advanced["w_compass_1"] = 128
advanced["h_compass_1"] = 128
advanced["f_compass_1"] = 0
advanced["bg_compass_1"] = 1

// Consommation cible pour finir la course sans pitter
advanced["disp_target_conso_1"] = 0
advanced["x_target_conso_1"] = 0
advanced["y_target_conso_1"] = 0
advanced["w_target_conso_1"] = 320
advanced["h_target_conso_1"] = 72
advanced["f_target_conso_1"] = 72
advanced["bg_target_conso_1"] = 1

// Estimation de la Consommation du tour en cours
advanced["disp_est_conso_1"] = 0
advanced["x_est_conso_1"] = 0
advanced["y_est_conso_1"] = 0
advanced["w_est_conso_1"] = 320
advanced["h_est_conso_1"] = 72
advanced["f_est_conso_1"] = 72
advanced["bg_est_conso_1"] = 1

// Essence contenu dans le réservoir à la fin de la course
advanced["disp_fuel_end_1"] = 0
advanced["x_fuel_end_1"] = 0
advanced["y_fuel_end_1"] = 72
advanced["w_fuel_end_1"] = 320
advanced["h_fuel_end_1"] = 72
advanced["f_fuel_end_1"] = 72
advanced["bg_fuel_end_1"] = 1

// Number of laps predicted for the virtual winner
advanced["disp_nblaps_race_winner_1"] = 0
advanced["x_nblaps_race_winner_1"] = 0
advanced["y_nblaps_race_winner_1"] = 0
advanced["w_nblaps_race_winner_1"] = 320
advanced["h_nblaps_race_winner_1"] = 72
advanced["f_nblaps_race_winner_1"] = 72
advanced["bg_nblaps_race_winner_1"] = 1

// Number of laps predicted for the driver
advanced["disp_nblaps_race_driver_1"] = 0
advanced["x_nblaps_race_driver_1"] = 0
advanced["y_nblaps_race_driver_1"] = 0
advanced["w_nblaps_race_driver_1"] = 320
advanced["h_nblaps_race_driver_1"] = 72
advanced["f_nblaps_race_driver_1"] = 72
advanced["bg_nblaps_race_driver_1"] = 1

// Expected number of laps we can do with the full tank
advanced["disp_nblaps_per_tank_1"] = 0
advanced["x_nblaps_per_tank_1"] = 0
advanced["y_nblaps_per_tank_1"] = 0
advanced["w_nblaps_per_tank_1"] = 320
advanced["h_nblaps_per_tank_1"] = 72
advanced["f_nblaps_per_tank_1"] = 72
advanced["bg_nblaps_per_tank_1"] = 1

// Number of laps before the pit window
advanced["disp_nblaps_before_pit_window_1"] = 0
advanced["x_nblaps_before_pit_window_1"] = 0
advanced["y_nblaps_before_pit_window_1"] = 0
advanced["w_nblaps_before_pit_window_1"] = 320
advanced["h_nblaps_before_pit_window_1"] = 72
advanced["f_nblaps_before_pit_window_1"] = 72
advanced["bg_nblaps_before_pit_window_1"] = 1

// Number of laps before the next pit to equilibrate the stints
advanced["disp_nblaps_to_equalize_stints_1"] = 0
advanced["x_nblaps_to_equalize_stints_1"] = 0
advanced["y_nblaps_to_equalize_stints_1"] = 0
advanced["w_nblaps_to_equalize_stints_1"] = 320
advanced["h_nblaps_to_equalize_stints_1"] = 72
advanced["f_nblaps_to_equalize_stints_1"] = 72
advanced["bg_nblaps_to_equalize_stints_1"] = 1

// Heure
advanced["disp_time_1"] = 0
advanced["x_time_1"] = 0
advanced["y_time_1"] = 144
advanced["w_time_1"] = 320
advanced["h_time_1"] = 72
advanced["f_time_1"] = 72
advanced["bg_time_1"] = 1

// Performances : 0-100km/h, 400m, 1000m départs arrêtés
advanced["disp_perfs_1"] = 0
advanced["x_perfs_1"] = 320
advanced["y_perfs_1"] = 0
advanced["w_perfs_1"] = 640
advanced["h_perfs_1"] = 72
advanced["f_perfs_1"] = 72
advanced["bg_perfs_1"] = 1

// rpm_leds
advanced["disp_rpm_leds_1"] = 0
advanced["x_rpm_leds_1"] = 0
advanced["y_rpm_leds_1"] = 0
advanced["w_rpm_leds_1"] = 1280
advanced["h_rpm_leds_1"] = 128
advanced["f_rpm_leds_1"] = 72
advanced["bg_rpm_leds_1"] = 1

// Brake2 horizontal
advanced["disp_brake2_1"] = 0
advanced["x_brake2_1"] = 0
advanced["y_brake2_1"] = 0
advanced["w_brake2_1"] = 400
advanced["h_brake2_1"] = 80
advanced["f_brake2_1"] = 72
advanced["bg_brake2_1"] = 1

// Brake3 horizontal including %
advanced["disp_brake3_1"] = 0
advanced["x_brake3_1"] = 0
advanced["y_brake3_1"] = 0
advanced["w_brake3_1"] = 400
advanced["h_brake3_1"] = 80
advanced["f_brake3_1"] = 72
advanced["bg_brake3_1"] = 1

// Throttle2 horizontal
advanced["disp_throttle2_1"] = 0
advanced["x_throttle2_1"] = 0
advanced["y_throttle2_1"] = 100
advanced["w_throttle2_1"] = 400
advanced["h_throttle2_1"] = 80
advanced["f_throttle2_1"] = 72
advanced["bg_throttle2_1"] = 1

// Throttle3 horizontal including %
advanced["disp_throttle3_1"] = 0
advanced["x_throttle3_1"] = 0
advanced["y_throttle3_1"] = 100
advanced["w_throttle3_1"] = 400
advanced["h_throttle3_1"] = 80
advanced["f_throttle3_1"] = 72
advanced["bg_throttle3_1"] = 1

// FFB2 horizontal
advanced["disp_ffb2_1"] = 0
advanced["x_ffb2_1"] = 0
advanced["y_ffb2_1"] = 200
advanced["w_ffb2_1"] = 400
advanced["h_ffb2_1"] = 80
advanced["f_ffb2_1"] = 72
advanced["bg_ffb2_1"] = 1

// SOF
advanced["disp_sof_1"] = 0
advanced["x_sof_1"] = 0
advanced["y_sof_1"] = 300
advanced["w_sof_1"] = 400
advanced["h_sof_1"] = 80
advanced["f_sof_1"] = 72
advanced["bg_sof_1"] = 1

// SOF all class
advanced["disp_sof_class0_1"] = 0
advanced["x_sof_class0_1"] = 0
advanced["y_sof_class0_1"] = 300
advanced["w_sof_class0_1"] = 400
advanced["h_sof_class0_1"] = 80
advanced["f_sof_class0_1"] = 72
advanced["bg_sof_class0_1"] = 1


// SOF 1st class
advanced["disp_sof_class1_1"] = 0
advanced["x_sof_class1_1"] = 0
advanced["y_sof_class1_1"] = 300
advanced["w_sof_class1_1"] = 400
advanced["h_sof_class1_1"] = 80
advanced["f_sof_class1_1"] = 72
advanced["bg_sof_class1_1"] = 1

// SOF 2nd class
advanced["disp_sof_class2_1"] = 0
advanced["x_sof_class2_1"] = 0
advanced["y_sof_class2_1"] = 300
advanced["w_sof_class2_1"] = 400
advanced["h_sof_class2_1"] = 80
advanced["f_sof_class2_1"] = 72
advanced["bg_sof_class2_1"] = 1

// SOF 3rd class
advanced["disp_sof_class3_1"] = 0
advanced["x_sof_class3_1"] = 0
advanced["y_sof_class3_1"] = 300
advanced["w_sof_class3_1"] = 400
advanced["h_sof_class3_1"] = 80
advanced["f_sof_class3_1"] = 72
advanced["bg_sof_class3_1"] = 1

// SOF 4th class
advanced["disp_sof_class4_1"] = 0
advanced["x_sof_class4_1"] = 0
advanced["y_sof_class4_1"] = 300
advanced["w_sof_class4_1"] = 400
advanced["h_sof_class4_1"] = 80
advanced["f_sof_class4_1"] = 72
advanced["bg_sof_class4_1"] = 1

// Incidents / Total
advanced["disp_inc_1"] = 0
advanced["x_inc_1"] = 0
advanced["y_inc_1"] = 0
advanced["w_inc_1"] = 400
advanced["h_inc_1"] = 80
advanced["f_inc_1"] = 72
advanced["bg_inc_1"] = 1

// Total Pittimelost
advanced["disp_nextpittimelost_1"] = 0
advanced["x_nextpittimelost_1"] = 0
advanced["y_nextpittimelost_1"] = 0
advanced["w_nextpittimelost_1"] = 400
advanced["h_nextpittimelost_1"] = 80
advanced["f_nextpittimelost_1"] = 72
advanced["bg_nextpittimelost_1"] = 1

// ERS Bar (vertical)
advanced["disp_ers_bar_1"] = 0
advanced["x_ers_bar_1"] = 0
advanced["y_ers_bar_1"] = 0
advanced["w_ers_bar_1"] = 60
advanced["h_ers_bar_1"] = 300
advanced["f_ers_bar_1"] = 72
advanced["bg_ers_bar_1"] = 1

// powersteering
advanced["disp_powersteering_1"] = 0
advanced["x_powersteering_1"] = 0
advanced["y_powersteering_1"] = 0
advanced["w_powersteering_1"] = 300
advanced["h_powersteering_1"] = 60
advanced["f_powersteering_1"] = 72
advanced["bg_powersteering_1"] = 1

// regen_gain
advanced["disp_regen_gain_1"] = 0
advanced["x_regen_gain_1"] = 0
advanced["y_regen_gain_1"] = 0
advanced["w_regen_gain_1"] = 300
advanced["h_regen_gain_1"] = 60
advanced["f_regen_gain_1"] = 72
advanced["bg_regen_gain_1"] = 1

// fuel_mixture
advanced["disp_fuel_mixture_1"] = 0
advanced["x_fuel_mixture_1"] = 0
advanced["y_fuel_mixture_1"] = 0
advanced["w_fuel_mixture_1"] = 300
advanced["h_fuel_mixture_1"] = 60
advanced["f_fuel_mixture_1"] = 72
advanced["bg_fuel_mixture_1"] = 1

// peak_bb
advanced["disp_peak_bb_1"] = 0
advanced["x_peak_bb_1"] = 0
advanced["y_peak_bb_1"] = 0
advanced["w_peak_bb_1"] = 300
advanced["h_peak_bb_1"] = 60
advanced["f_peak_bb_1"] = 72
advanced["bg_peak_bb_1"] = 1

// diff_preload
advanced["disp_diff_preload_1"] = 0
advanced["x_diff_preload_1"] = 0
advanced["y_diff_preload_1"] = 0
advanced["w_diff_preload_1"] = 300
advanced["h_diff_preload_1"] = 60
advanced["f_diff_preload_1"] = 72
advanced["bg_diff_preload_1"] = 1

// diff_entry
advanced["disp_diff_entry_1"] = 0
advanced["x_diff_entry_1"] = 0
advanced["y_diff_entry_1"] = 0
advanced["w_diff_entry_1"] = 300
advanced["h_diff_entry_1"] = 60
advanced["f_diff_entry_1"] = 72
advanced["bg_diff_entry_1"] = 1

// diff_mid
advanced["disp_diff_mid_1"] = 0
advanced["x_diff_mid_1"] = 0
advanced["y_diff_mid_1"] = 0
advanced["w_diff_mid_1"] = 300
advanced["h_diff_mid_1"] = 60
advanced["f_diff_mid_1"] = 72
advanced["bg_diff_mid_1"] = 1

// diff_exit
advanced["disp_diff_exit_1"] = 0
advanced["x_diff_exit_1"] = 0
advanced["y_diff_exit_1"] = 0
advanced["w_diff_exit_1"] = 300
advanced["h_diff_exit_1"] = 60
advanced["f_diff_exit_1"] = 72
advanced["bg_diff_exit_1"] = 1

// eng_br
advanced["disp_eng_br_1"] = 0
advanced["x_eng_br_1"] = 0
advanced["y_eng_br_1"] = 0
advanced["w_eng_br_1"] = 300
advanced["h_eng_br_1"] = 60
advanced["f_eng_br_1"] = 72
advanced["bg_eng_br_1"] = 1

// fuelneed1
advanced["disp_fuelneed1_1"] = 0
advanced["x_fuelneed1_1"] = 0
advanced["y_fuelneed1_1"] = 0
advanced["w_fuelneed1_1"] = 300
advanced["h_fuelneed1_1"] = 60
advanced["f_fuelneed1_1"] = 72
advanced["bg_fuelneed1_1"] = 1

// fuelneed5
advanced["disp_fuelneed5_1"] = 0
advanced["x_fuelneed5_1"] = 0
advanced["y_fuelneed5_1"] = 0
advanced["w_fuelneed5_1"] = 300
advanced["h_fuelneed5_1"] = 60
advanced["f_fuelneed5_1"] = 72
advanced["bg_fuelneed5_1"] = 1

// conso1
advanced["disp_conso1_1"] = 0
advanced["x_conso1_1"] = 0
advanced["y_conso1_1"] = 0
advanced["w_conso1_1"] = 300
advanced["h_conso1_1"] = 60
advanced["f_conso1_1"] = 72
advanced["bg_conso1_1"] = 1

// conso5
advanced["disp_conso5_1"] = 0
advanced["x_conso5_1"] = 0
advanced["y_conso5_1"] = 0
advanced["w_conso5_1"] = 300
advanced["h_conso5_1"] = 60
advanced["f_conso5_1"] = 72
advanced["bg_conso5_1"] = 1

// points
advanced["disp_points_1"] = 0
advanced["x_points_1"] = 0
advanced["y_points_1"] = 0
advanced["w_points_1"] = 300
advanced["h_points_1"] = 60
advanced["f_points_1"] = 72
advanced["bg_points_1"] = 1

// weight jacker
advanced["disp_wj_1"] = 0
advanced["x_wj_1"] = 0
advanced["y_wj_1"] = 0
advanced["w_wj_1"] = 300
advanced["h_wj_1"] = 60
advanced["f_wj_1"] = 72
advanced["bg_wj_1"] = 1

// ABS
advanced["disp_abs_1"] = 0
advanced["x_abs_1"] = 0
advanced["y_abs_1"] = 0
advanced["w_abs_1"] = 300
advanced["h_abs_1"] = 60
advanced["f_abs_1"] = 72
advanced["bg_abs_1"] = 1

// ABS light
advanced["disp_abs_light_1"] = 0
advanced["x_abs_light_1"] = 0
advanced["y_abs_light_1"] = 0
advanced["w_abs_light_1"] = 100
advanced["h_abs_light_1"] = 100
advanced["f_abs_light_1"] = 72
advanced["bg_abs_light_1"] = 1

// ARB Front
advanced["disp_arb_f_1"] = 0
advanced["x_arb_f_1"] = 0
advanced["y_arb_f_1"] = 0
advanced["w_arb_f_1"] = 300
advanced["h_arb_f_1"] = 60
advanced["f_arb_f_1"] = 72
advanced["bg_arb_f_1"] = 1

// ARB Rear
advanced["disp_arb_r_1"] = 0
advanced["x_arb_r_1"] = 0
advanced["y_arb_r_1"] = 0
advanced["w_arb_r_1"] = 300
advanced["h_arb_r_1"] = 60
advanced["f_arb_r_1"] = 72
advanced["bg_arb_r_1"] = 1

// Boost Level
advanced["disp_boo_1"] = 0
advanced["x_boo_1"] = 0
advanced["y_boo_1"] = 0
advanced["w_boo_1"] = 300
advanced["h_boo_1"] = 60
advanced["f_boo_1"] = 72
advanced["bg_boo_1"] = 1

// Throttle Shape
advanced["disp_t_sh_1"] = 0
advanced["x_t_sh_1"] = 0
advanced["y_t_sh_1"] = 0
advanced["w_t_sh_1"] = 300
advanced["h_t_sh_1"] = 60
advanced["f_t_sh_1"] = 72
advanced["bg_t_sh_1"] = 1

// Minimum Fuel to add next pit
advanced["disp_refuel_min_1"] = 0
advanced["x_refuel_min_1"] = 0
advanced["y_refuel_min_1"] = 0
advanced["w_refuel_min_1"] = 300
advanced["h_refuel_min_1"] = 60
advanced["f_refuel_min_1"] = 72
advanced["bg_refuel_min_1"] = 1

// Average Fuel to add next pit if you pit as late as you can
advanced["disp_refuel_avg_1"] = 0
advanced["x_refuel_avg_1"] = 0
advanced["y_refuel_avg_1"] = 0
advanced["w_refuel_avg_1"] = 300
advanced["h_refuel_avg_1"] = 60
advanced["f_refuel_avg_1"] = 72
advanced["bg_refuel_avg_1"] = 1

// Average Fuel to add next pit if you pit now
advanced["disp_refuel_avg_now_1"] = 0
advanced["x_refuel_avg_now_1"] = 0
advanced["y_refuel_avg_now_1"] = 0
advanced["w_refuel_avg_now_1"] = 300
advanced["h_refuel_avg_now_1"] = 60
advanced["f_refuel_avg_now_1"] = 72
advanced["bg_refuel_avg_now_1"] = 1

// last_partial_fuel_fill
advanced["disp_last_partial_fuel_fill_1"] = 0
advanced["x_last_partial_fuel_fill_1"] = 0
advanced["y_last_partial_fuel_fill_1"] = 0
advanced["w_last_partial_fuel_fill_1"] = 300
advanced["h_last_partial_fuel_fill_1"] = 60
advanced["f_last_partial_fuel_fill_1"] = 72
advanced["bg_last_partial_fuel_fill_1"] = 1

// TC2
advanced["disp_tc2_1"] = 0
advanced["x_tc2_1"] = 0
advanced["y_tc2_1"] = 0
advanced["w_tc2_1"] = 300
advanced["h_tc2_1"] = 60
advanced["f_tc2_1"] = 72
advanced["bg_tc2_1"] = 1

// Session type
advanced["disp_session_type_1"] = 0
advanced["x_session_type_1"] = 0
advanced["y_session_type_1"] = 0
advanced["w_session_type_1"] = 300
advanced["h_session_type_1"] = 60
advanced["f_session_type_1"] = 42
advanced["bg_session_type_1"] = 1

// Sky
advanced["disp_sky_1"] = 0
advanced["x_sky_1"] = 0
advanced["y_sky_1"] = 0
advanced["w_sky_1"] = 300
advanced["h_sky_1"] = 60
advanced["f_sky_1"] = 42
advanced["bg_sky_1"] = 1

// Humidity
advanced["disp_humidity_1"] = 0
advanced["x_humidity_1"] = 0
advanced["y_humidity_1"] = 0
advanced["w_humidity_1"] = 300
advanced["h_humidity_1"] = 60
advanced["f_humidity_1"] = 54
advanced["bg_humidity_1"] = 1

// Wind direction
advanced["disp_wind_dir_1"] = 0
advanced["x_wind_dir_1"] = 0
advanced["y_wind_dir_1"] = 0
advanced["w_wind_dir_1"] = 300
advanced["h_wind_dir_1"] = 60
advanced["f_wind_dir_1"] = 54
advanced["bg_wind_dir_1"] = 1

// Wind direction in degrees
advanced["disp_wind_dir_deg_1"] = 0
advanced["x_wind_dir_deg_1"] = 0
advanced["y_wind_dir_deg_1"] = 0
advanced["w_wind_dir_deg_1"] = 300
advanced["h_wind_dir_deg_1"] = 60
advanced["f_wind_dir_deg_1"] = 54
advanced["bg_wind_dir_deg_1"] = 1

// Wind speed
advanced["disp_wind_speed_1"] = 0
advanced["x_wind_speed_1"] = 0
advanced["y_wind_speed_1"] = 0
advanced["w_wind_speed_1"] = 300
advanced["h_wind_speed_1"] = 60
advanced["f_wind_speed_1"] = 54
advanced["bg_wind_speed_1"] = 1

// Air temperature
advanced["disp_air_temp_1"] = 0
advanced["x_air_temp_1"] = 0
advanced["y_air_temp_1"] = 0
advanced["w_air_temp_1"] = 300
advanced["h_air_temp_1"] = 60
advanced["f_air_temp_1"] = 54
advanced["bg_air_temp_1"] = 1

// Air pressure
advanced["disp_air_press_1"] = 0
advanced["x_air_press_1"] = 0
advanced["y_air_press_1"] = 0
advanced["w_air_press_1"] = 300
advanced["h_air_press_1"] = 60
advanced["f_air_press_1"] = 54
advanced["bg_air_press_1"] = 1

// Air density
advanced["disp_air_dens_1"] = 0
advanced["x_air_dens_1"] = 0
advanced["y_air_dens_1"] = 0
advanced["w_air_dens_1"] = 300
advanced["h_air_dens_1"] = 60
advanced["f_air_dens_1"] = 54
advanced["bg_air_dens_1"] = 1

// Fog level
advanced["disp_fog_1"] = 0
advanced["x_fog_1"] = 0
advanced["y_fog_1"] = 0
advanced["w_fog_1"] = 300
advanced["h_fog_1"] = 60
advanced["f_fog_1"] = 54
advanced["bg_fog_1"] = 1

// track temperature
advanced["disp_track_temp_1"] = 0
advanced["x_track_temp_1"] = 0
advanced["y_track_temp_1"] = 0
advanced["w_track_temp_1"] = 300
advanced["h_track_temp_1"] = 60
advanced["f_track_temp_1"] = 54
advanced["bg_track_temp_1"] = 1

// track usage %
advanced["disp_track_usage_1"] = 0
advanced["x_track_usage_1"] = 0
advanced["y_track_usage_1"] = 0
advanced["w_track_usage_1"] = 300
advanced["h_track_usage_1"] = 60
advanced["f_track_usage_1"] = 54
advanced["bg_track_usage_1"] = 1

// Date in game
advanced["disp_date_ingame_1"] = 0
advanced["x_date_ingame_1"] = 0
advanced["y_date_ingame_1"] = 0
advanced["w_date_ingame_1"] = 300
advanced["h_date_ingame_1"] = 60
advanced["f_date_ingame_1"] = 72
advanced["bg_date_ingame_1"] = 1

// Time Of Day
advanced["disp_time_of_day_1"] = 0
advanced["x_time_of_day_1"] = 0
advanced["y_time_of_day_1"] = 0
advanced["w_time_of_day_1"] = 300
advanced["h_time_of_day_1"] = 60
advanced["f_time_of_day_1"] = 72
advanced["bg_time_of_day_1"] = 1

// Delta Average Header
advanced["disp_delta_avg_h_1"] = 0
advanced["x_delta_avg_h_1"] = 0
advanced["y_delta_avg_h_1"] = 0
advanced["w_delta_avg_h_1"] = 96
advanced["h_delta_avg_h_1"] = 64
advanced["f_delta_avg_h_1"] = 32
advanced["bg_delta_avg_h_1"] = 1

// Delta Average
advanced["disp_delta_avg_1"] = 0
advanced["x_delta_avg_1"] = 0
advanced["y_delta_avg_1"] = 0
advanced["w_delta_avg_1"] = 300
advanced["h_delta_avg_1"] = 60
advanced["f_delta_avg_1"] = 72
advanced["bg_delta_avg_1"] = 1

// Delta Totaltime
advanced["disp_delta_tot0_1"] = 0
advanced["x_delta_tot0_1"] = 0
advanced["y_delta_tot0_1"] = 0
advanced["w_delta_tot0_1"] = 300
advanced["h_delta_tot0_1"] = 60
advanced["f_delta_tot0_1"] = 72
advanced["bg_delta_tot0_1"] = 1

// Delta Totaltime + (total)
advanced["disp_delta_tot_1"] = 0
advanced["x_delta_tot_1"] = 0
advanced["y_delta_tot_1"] = 0
advanced["w_delta_tot_1"] = 300
advanced["h_delta_tot_1"] = 60
advanced["f_delta_tot_1"] = 72
advanced["bg_delta_tot_1"] = 1

// Delta Totaltime 2 + (average)
advanced["disp_delta_tot2_1"] = 0
advanced["x_delta_tot2_1"] = 0
advanced["y_delta_tot2_1"] = 0
advanced["w_delta_tot2_1"] = 300
advanced["h_delta_tot2_1"] = 60
advanced["f_delta_tot2_1"] = 72
advanced["bg_delta_tot2_1"] = 1

// Traffic
advanced["disp_traffic_1"] = 0
advanced["x_traffic_1"] = 0
advanced["y_traffic_1"] = 0
advanced["w_traffic_1"] = 300
advanced["h_traffic_1"] = 60
advanced["f_traffic_1"] = 72
advanced["bg_traffic_1"] = 1

// Traffic after the pit stop
advanced["disp_traffic_pit_1"] = 0
advanced["x_traffic_pit_1"] = 0
advanced["y_traffic_pit_1"] = 0
advanced["w_traffic_pit_1"] = 300
advanced["h_traffic_pit_1"] = 60
advanced["f_traffic_pit_1"] = 72
advanced["bg_traffic_pit_1"] = 1

// eng_pw
advanced["disp_eng_pw_1"] = 0
advanced["x_eng_pw_1"] = 0
advanced["y_eng_pw_1"] = 0
advanced["w_eng_pw_1"] = 300
advanced["h_eng_pw_1"] = 60
advanced["f_eng_pw_1"] = 72
advanced["bg_eng_pw_1"] = 1

// Right Rear pressure (RRpressure)
advanced["disp_RRpressure_1"] = 0
advanced["x_RRpressure_1"] = 0
advanced["y_RRpressure_1"] = 0
advanced["w_RRpressure_1"] = 300
advanced["h_RRpressure_1"] = 60
advanced["f_RRpressure_1"] = 72
advanced["bg_RRpressure_1"] = 1

// Right Front pressure (RFpressure)
advanced["disp_RFpressure_1"] = 0
advanced["x_RFpressure_1"] = 0
advanced["y_RFpressure_1"] = 0
advanced["w_RFpressure_1"] = 300
advanced["h_RFpressure_1"] = 60
advanced["f_RFpressure_1"] = 72
advanced["bg_RFpressure_1"] = 1

// Left Front pressure (LFpressure)
advanced["disp_LFpressure_1"] = 0
advanced["x_LFpressure_1"] = 0
advanced["y_LFpressure_1"] = 0
advanced["w_LFpressure_1"] = 300
advanced["h_LFpressure_1"] = 60
advanced["f_LFpressure_1"] = 72
advanced["bg_LFpressure_1"] = 1

// Left Rear pressure (LRpressure)
advanced["disp_LRpressure_1"] = 0
advanced["x_LRpressure_1"] = 0
advanced["y_LRpressure_1"] = 0
advanced["w_LRpressure_1"] = 300
advanced["h_LRpressure_1"] = 60
advanced["f_LRpressure_1"] = 72
advanced["bg_LRpressure_1"] = 1

// Right Rear temperature left (RRtempL)
advanced["disp_RRtempL_1"] = 0
advanced["x_RRtempL_1"] = 0
advanced["y_RRtempL_1"] = 0
advanced["w_RRtempL_1"] = 300
advanced["h_RRtempL_1"] = 60
advanced["f_RRtempL_1"] = 72
advanced["bg_RRtempL_1"] = 1
// Right Rear temperature middle (RRtempM)
advanced["disp_RRtempM_1"] = 0
advanced["x_RRtempM_1"] = 0
advanced["y_RRtempM_1"] = 0
advanced["w_RRtempM_1"] = 300
advanced["h_RRtempM_1"] = 60
advanced["f_RRtempM_1"] = 72
advanced["bg_RRtempM_1"] = 1
// Right Rear temperature right (RRtempR)
advanced["disp_RRtempR_1"] = 0
advanced["x_RRtempR_1"] = 0
advanced["y_RRtempR_1"] = 0
advanced["w_RRtempR_1"] = 300
advanced["h_RRtempR_1"] = 60
advanced["f_RRtempR_1"] = 72
advanced["bg_RRtempR_1"] = 1

// Right Front  temperature left (RFtempL)
advanced["disp_RFtempL_1"] = 0
advanced["x_RFtempL_1"] = 0
advanced["y_RFtempL_1"] = 0
advanced["w_RFtempL_1"] = 300
advanced["h_RFtempL_1"] = 60
advanced["f_RFtempL_1"] = 72
advanced["bg_RFtempL_1"] = 1
// Right Front  temperature middle (RFtempM)
advanced["disp_RFtempM_1"] = 0
advanced["x_RFtempM_1"] = 0
advanced["y_RFtempM_1"] = 0
advanced["w_RFtempM_1"] = 300
advanced["h_RFtempM_1"] = 60
advanced["f_RFtempM_1"] = 72
advanced["bg_RFtempM_1"] = 1
// Right Front  temperature right (RFtempR)
advanced["disp_RFtempR_1"] = 0
advanced["x_RFtempR_1"] = 0
advanced["y_RFtempR_1"] = 0
advanced["w_RFtempR_1"] = 300
advanced["h_RFtempR_1"] = 60
advanced["f_RFtempR_1"] = 72
advanced["bg_RFtempR_1"] = 1

// Left Front temperature left (LFtempL)
advanced["disp_LFtempL_1"] = 0
advanced["x_LFtempL_1"] = 0
advanced["y_LFtempL_1"] = 0
advanced["w_LFtempL_1"] = 300
advanced["h_LFtempL_1"] = 60
advanced["f_LFtempL_1"] = 72
advanced["bg_LFtempL_1"] = 1
// Left Front temperature middle (LFtempM)
advanced["disp_LFtempM_1"] = 0
advanced["x_LFtempM_1"] = 0
advanced["y_LFtempM_1"] = 0
advanced["w_LFtempM_1"] = 300
advanced["h_LFtempM_1"] = 60
advanced["f_LFtempM_1"] = 72
advanced["bg_LFtempM_1"] = 1
// Left Front temperature right (LFtempR)
advanced["disp_LFtempR_1"] = 0
advanced["x_LFtempR_1"] = 0
advanced["y_LFtempR_1"] = 0
advanced["w_LFtempR_1"] = 300
advanced["h_LFtempR_1"] = 60
advanced["f_LFtempR_1"] = 72
advanced["bg_LFtempR_1"] = 1

// Left Rear temperature left (LRtempL)
advanced["disp_LRtempL_1"] = 0
advanced["x_LRtempL_1"] = 0
advanced["y_LRtempL_1"] = 0
advanced["w_LRtempL_1"] = 300
advanced["h_LRtempL_1"] = 60
advanced["f_LRtempL_1"] = 72
advanced["bg_LRtempL_1"] = 1
// Left Rear temperature middle (LRtempM)
advanced["disp_LRtempM_1"] = 0
advanced["x_LRtempM_1"] = 0
advanced["y_LRtempM_1"] = 0
advanced["w_LRtempM_1"] = 300
advanced["h_LRtempM_1"] = 60
advanced["f_LRtempM_1"] = 72
advanced["bg_LRtempM_1"] = 1
// Left Rear temperature right (LRtempR)
advanced["disp_LRtempR_1"] = 0
advanced["x_LRtempR_1"] = 0
advanced["y_LRtempR_1"] = 0
advanced["w_LRtempR_1"] = 300
advanced["h_LRtempR_1"] = 60
advanced["f_LRtempR_1"] = 72
advanced["bg_LRtempR_1"] = 1


// Right Rear Percent Tread Remaining left (RRwearL)
advanced["disp_RRwearL_1"] = 0
advanced["x_RRwearL_1"] = 0
advanced["y_RRwearL_1"] = 0
advanced["w_RRwearL_1"] = 300
advanced["h_RRwearL_1"] = 60
advanced["f_RRwearL_1"] = 72
advanced["bg_RRwearL_1"] = 1
// Right Rear Percent Tread Remaining middle (RRwearM)
advanced["disp_RRwearM_1"] = 0
advanced["x_RRwearM_1"] = 0
advanced["y_RRwearM_1"] = 0
advanced["w_RRwearM_1"] = 300
advanced["h_RRwearM_1"] = 60
advanced["f_RRwearM_1"] = 72
advanced["bg_RRwearM_1"] = 1
// Right Rear Percent Tread Remaining right (RRwearR)
advanced["disp_RRwearR_1"] = 0
advanced["x_RRwearR_1"] = 0
advanced["y_RRwearR_1"] = 0
advanced["w_RRwearR_1"] = 300
advanced["h_RRwearR_1"] = 60
advanced["f_RRwearR_1"] = 72
advanced["bg_RRwearR_1"] = 1

// Right Front  Percent Tread Remaining left (RFwearL)
advanced["disp_RFwearL_1"] = 0
advanced["x_RFwearL_1"] = 0
advanced["y_RFwearL_1"] = 0
advanced["w_RFwearL_1"] = 300
advanced["h_RFwearL_1"] = 60
advanced["f_RFwearL_1"] = 72
advanced["bg_RFwearL_1"] = 1
// Right Front  Percent Tread Remaining middle (RFwearM)
advanced["disp_RFwearM_1"] = 0
advanced["x_RFwearM_1"] = 0
advanced["y_RFwearM_1"] = 0
advanced["w_RFwearM_1"] = 300
advanced["h_RFwearM_1"] = 60
advanced["f_RFwearM_1"] = 72
advanced["bg_RFwearM_1"] = 1
// Right Front  Percent Tread Remaining right (RFwearR)
advanced["disp_RFwearR_1"] = 0
advanced["x_RFwearR_1"] = 0
advanced["y_RFwearR_1"] = 0
advanced["w_RFwearR_1"] = 300
advanced["h_RFwearR_1"] = 60
advanced["f_RFwearR_1"] = 72
advanced["bg_RFwearR_1"] = 1

// Left Front Percent Tread Remaining left (LFwearL)
advanced["disp_LFwearL_1"] = 0
advanced["x_LFwearL_1"] = 0
advanced["y_LFwearL_1"] = 0
advanced["w_LFwearL_1"] = 300
advanced["h_LFwearL_1"] = 60
advanced["f_LFwearL_1"] = 72
advanced["bg_LFwearL_1"] = 1
// Left Front Percent Tread Remaining middle (LFwearM)
advanced["disp_LFwearM_1"] = 0
advanced["x_LFwearM_1"] = 0
advanced["y_LFwearM_1"] = 0
advanced["w_LFwearM_1"] = 300
advanced["h_LFwearM_1"] = 60
advanced["f_LFwearM_1"] = 72
advanced["bg_LFwearM_1"] = 1
// Left Front Percent Tread Remaining right (LFwearR)
advanced["disp_LFwearR_1"] = 0
advanced["x_LFwearR_1"] = 0
advanced["y_LFwearR_1"] = 0
advanced["w_LFwearR_1"] = 300
advanced["h_LFwearR_1"] = 60
advanced["f_LFwearR_1"] = 72
advanced["bg_LFwearR_1"] = 1

// Left Rear Percent Tread Remaining left (LRwearL)
advanced["disp_LRwearL_1"] = 0
advanced["x_LRwearL_1"] = 0
advanced["y_LRwearL_1"] = 0
advanced["w_LRwearL_1"] = 300
advanced["h_LRwearL_1"] = 60
advanced["f_LRwearL_1"] = 72
advanced["bg_LRwearL_1"] = 1
// Left Rear Percent Tread Remaining middle (LRwearM)
advanced["disp_LRwearM_1"] = 0
advanced["x_LRwearM_1"] = 0
advanced["y_LRwearM_1"] = 0
advanced["w_LRwearM_1"] = 300
advanced["h_LRwearM_1"] = 60
advanced["f_LRwearM_1"] = 72
advanced["bg_LRwearM_1"] = 1
// Left Rear Percent Tread Remaining right (LRwearR)
advanced["disp_LRwearR_1"] = 0
advanced["x_LRwearR_1"] = 0
advanced["y_LRwearR_1"] = 0
advanced["w_LRwearR_1"] = 300
advanced["h_LRwearR_1"] = 60
advanced["f_LRwearR_1"] = 72
advanced["bg_LRwearR_1"] = 1




// iRating gain (iR_gain)
advanced["disp_iR_gain_1"] = 0
advanced["x_iR_gain_1"] = 0
advanced["y_iR_gain_1"] = 0
advanced["w_iR_gain_1"] = 300
advanced["h_iR_gain_1"] = 60
advanced["f_iR_gain_1"] = 72
advanced["bg_iR_gain_1"] = 1

// Projected iRating (iR_proj)
advanced["disp_iR_proj_1"] = 0
advanced["x_iR_proj_1"] = 0
advanced["y_iR_proj_1"] = 0
advanced["w_iR_proj_1"] = 300
advanced["h_iR_proj_1"] = 60
advanced["f_iR_proj_1"] = 72
advanced["bg_iR_proj_1"] = 1

// Clutch bar vertical (c_cont)
advanced["disp_c_cont_1"] = 0
advanced["x_c_cont_1"] = 200
advanced["y_c_cont_1"] = 0
advanced["w_c_cont_1"] = 16
advanced["h_c_cont_1"] = 64
advanced["f_c_cont_1"] = 32
advanced["bg_c_cont_1"] = 1

// Clutch bar horizontal (clutch2)
advanced["disp_clutch2_1"] = 0
advanced["x_clutch2_1"] = 0
advanced["y_clutch2_1"] = 200
advanced["w_clutch2_1"] = 400
advanced["h_clutch2_1"] = 80
advanced["f_clutch2_1"] = 72
advanced["bg_clutch2_1"] = 1

// Apex Speed (apex_speed)
advanced["disp_apex_speed_1"] = 0
advanced["x_apex_speed_1"] = 0
advanced["y_apex_speed_1"] = 0
advanced["w_apex_speed_1"] = 300
advanced["h_apex_speed_1"] = 60
advanced["f_apex_speed_1"] = 72
advanced["bg_apex_speed_1"] = 1

// Peak Brake Pressure (peak_brake_pressure)
advanced["disp_peak_brake_pressure_1"] = 0
advanced["x_peak_brake_pressure_1"] = 0
advanced["y_peak_brake_pressure_1"] = 0
advanced["w_peak_brake_pressure_1"] = 300
advanced["h_peak_brake_pressure_1"] = 60
advanced["f_peak_brake_pressure_1"] = 72
advanced["bg_peak_brake_pressure_1"] = 1

// Push to Pass for the car focused
advanced["disp_me_p2p_1"] = 0
advanced["x_me_p2p_1"] = 0
advanced["y_me_p2p_1"] = 0
advanced["w_me_p2p_1"] = 300
advanced["h_me_p2p_1"] = 60
advanced["f_me_p2p_1"] = 72
advanced["bg_me_p2p_1"] = 1

// Push to Pass for the car ahead
advanced["disp_pre_p2p_1"] = 0
advanced["x_pre_p2p_1"] = 0
advanced["y_pre_p2p_1"] = 0
advanced["w_pre_p2p_1"] = 300
advanced["h_pre_p2p_1"] = 60
advanced["f_pre_p2p_1"] = 72
advanced["bg_pre_p2p_1"] = 1

// Push to Pass for the car behind
advanced["disp_post_p2p_1"] = 0
advanced["x_post_p2p_1"] = 0
advanced["y_post_p2p_1"] = 0
advanced["w_post_p2p_1"] = 300
advanced["h_post_p2p_1"] = 60
advanced["f_post_p2p_1"] = 72
advanced["bg_post_p2p_1"] = 1

// LeftTireSetsAvailable
advanced["disp_LeftTireSetsAvailable_1"] = 0
advanced["x_LeftTireSetsAvailable_1"] = 0
advanced["y_LeftTireSetsAvailable_1"] = 0
advanced["w_LeftTireSetsAvailable_1"] = 300
advanced["h_LeftTireSetsAvailable_1"] = 60
advanced["f_LeftTireSetsAvailable_1"] = 72
advanced["bg_LeftTireSetsAvailable_1"] = 1

// RightTireSetsAvailable
advanced["disp_RightTireSetsAvailable_1"] = 0
advanced["x_RightTireSetsAvailable_1"] = 0
advanced["y_RightTireSetsAvailable_1"] = 0
advanced["w_RightTireSetsAvailable_1"] = 300
advanced["h_RightTireSetsAvailable_1"] = 60
advanced["f_RightTireSetsAvailable_1"] = 72
advanced["bg_RightTireSetsAvailable_1"] = 1

// iracing_fuel_box
advanced["disp_iracing_fuel_box_1"] = 0
advanced["x_iracing_fuel_box_1"] = 0
advanced["y_iracing_fuel_box_1"] = 0
advanced["w_iracing_fuel_box_1"] = 50
advanced["h_iracing_fuel_box_1"] = 60
advanced["f_iracing_fuel_box_1"] = 72
advanced["bg_iracing_fuel_box_1"] = 1

// iracing_fuel_add
advanced["disp_iracing_fuel_add_1"] = 0
advanced["x_iracing_fuel_add_1"] = 0
advanced["y_iracing_fuel_add_1"] = 0
advanced["w_iracing_fuel_add_1"] = 300
advanced["h_iracing_fuel_add_1"] = 60
advanced["f_iracing_fuel_add_1"] = 72
advanced["bg_iracing_fuel_add_1"] = 1

// iracing_windshield_box
advanced["disp_iracing_windshield_box_1"] = 0
advanced["x_iracing_windshield_box_1"] = 0
advanced["y_iracing_windshield_box_1"] = 0
advanced["w_iracing_windshield_box_1"] = 50
advanced["h_iracing_windshield_box_1"] = 60
advanced["f_iracing_windshield_box_1"] = 72
advanced["bg_iracing_windshield_box_1"] = 1

// iracing_fastrepair_box
advanced["disp_iracing_fastrepair_box_1"] = 0
advanced["x_iracing_fastrepair_box_1"] = 0
advanced["y_iracing_fastrepair_box_1"] = 0
advanced["w_iracing_fastrepair_box_1"] = 50
advanced["h_iracing_fastrepair_box_1"] = 60
advanced["f_iracing_fastrepair_box_1"] = 72
advanced["bg_iracing_fastrepair_box_1"] = 1

// iracing_fastrepair_remaining
advanced["disp_iracing_fastrepair_remaining_1"] = 0
advanced["x_iracing_fastrepair_remaining_1"] = 0
advanced["y_iracing_fastrepair_remaining_1"] = 0
advanced["w_iracing_fastrepair_remaining_1"] = 300
advanced["h_iracing_fastrepair_remaining_1"] = 60
advanced["f_iracing_fastrepair_remaining_1"] = 72
advanced["bg_iracing_fastrepair_remaining_1"] = 1

// iracing_lf_tire_box
advanced["disp_iracing_lf_tire_box_1"] = 0
advanced["x_iracing_lf_tire_box_1"] = 0
advanced["y_iracing_lf_tire_box_1"] = 0
advanced["w_iracing_lf_tire_box_1"] = 50
advanced["h_iracing_lf_tire_box_1"] = 60
advanced["f_iracing_lf_tire_box_1"] = 72
advanced["bg_iracing_lf_tire_box_1"] = 1

// iracing_rf_tire_box
advanced["disp_iracing_rf_tire_box_1"] = 0
advanced["x_iracing_rf_tire_box_1"] = 0
advanced["y_iracing_rf_tire_box_1"] = 0
advanced["w_iracing_rf_tire_box_1"] = 50
advanced["h_iracing_rf_tire_box_1"] = 60
advanced["f_iracing_rf_tire_box_1"] = 72
advanced["bg_iracing_rf_tire_box_1"] = 1

// iracing_lr_tire_box
advanced["disp_iracing_lr_tire_box_1"] = 0
advanced["x_iracing_lr_tire_box_1"] = 0
advanced["y_iracing_lr_tire_box_1"] = 0
advanced["w_iracing_lr_tire_box_1"] = 50
advanced["h_iracing_lr_tire_box_1"] = 60
advanced["f_iracing_lr_tire_box_1"] = 72
advanced["bg_iracing_lr_tire_box_1"] = 1

// iracing_rr_tire_box
advanced["disp_iracing_rr_tire_box_1"] = 0
advanced["x_iracing_rr_tire_box_1"] = 0
advanced["y_iracing_rr_tire_box_1"] = 0
advanced["w_iracing_rr_tire_box_1"] = 50
advanced["h_iracing_rr_tire_box_1"] = 60
advanced["f_iracing_rr_tire_box_1"] = 72
advanced["bg_iracing_rr_tire_box_1"] = 1

// pit_speed_diff
advanced["disp_pit_speed_diff_1"] = 0
advanced["x_pit_speed_diff_1"] = 0
advanced["y_pit_speed_diff_1"] = 0
advanced["w_pit_speed_diff_1"] = 300
advanced["h_pit_speed_diff_1"] = 60
advanced["f_pit_speed_diff_1"] = 72
advanced["bg_pit_speed_diff_1"] = 1

// Track name
advanced["disp_trackname_1"] = 0
advanced["x_trackname_1"] = 0
advanced["y_trackname_1"] = 300
advanced["w_trackname_1"] = 400
advanced["h_trackname_1"] = 80
advanced["f_trackname_1"] = 72
advanced["bg_trackname_1"] = 1

// Track config name
advanced["disp_trackconfig_1"] = 0
advanced["x_trackconfig_1"] = 0
advanced["y_trackconfig_1"] = 300
advanced["w_trackconfig_1"] = 400
advanced["h_trackconfig_1"] = 80
advanced["f_trackconfig_1"] = 72
advanced["bg_trackconfig_1"] = 1

// pre_tire_compound
advanced["disp_pre_tire_compound_1"] = 0
advanced["x_pre_tire_compound_1"] = 0
advanced["y_pre_tire_compound_1"] = 0
advanced["w_pre_tire_compound_1"] = 60
advanced["h_pre_tire_compound_1"] = 60
advanced["f_pre_tire_compound_1"] = 44
advanced["bg_pre_tire_compound_1"] = 1

// pre_tires_stints
advanced["disp_pre_tires_stints_1"] = 0
advanced["x_pre_tires_stints_1"] = 0
advanced["y_pre_tires_stints_1"] = 0
advanced["w_pre_tires_stints_1"] = 200
advanced["h_pre_tires_stints_1"] = 60
advanced["f_pre_tires_stints_1"] = 44
advanced["bg_pre_tires_stints_1"] = 1

// pre_tires_nb_changes
advanced["disp_pre_tires_nb_changes_1"] = 0
advanced["x_pre_tires_nb_changes_1"] = 0
advanced["y_pre_tires_nb_changes_1"] = 0
advanced["w_pre_tires_nb_changes_1"] = 60
advanced["h_pre_tires_nb_changes_1"] = 60
advanced["f_pre_tires_nb_changes_1"] = 48
advanced["bg_pre_tires_nb_changes_1"] = 1

// me_tire_compound
advanced["disp_me_tire_compound_1"] = 0
advanced["x_me_tire_compound_1"] = 0
advanced["y_me_tire_compound_1"] = 0
advanced["w_me_tire_compound_1"] = 60
advanced["h_me_tire_compound_1"] = 60
advanced["f_me_tire_compound_1"] = 44
advanced["bg_me_tire_compound_1"] = 1

// me_tires_stints
advanced["disp_me_tires_stints_1"] = 0
advanced["x_me_tires_stints_1"] = 0
advanced["y_me_tires_stints_1"] = 0
advanced["w_me_tires_stints_1"] = 200
advanced["h_me_tires_stints_1"] = 60
advanced["f_me_tires_stints_1"] = 44
advanced["bg_me_tires_stints_1"] = 1

// me_tires_nb_changes
advanced["disp_me_tires_nb_changes_1"] = 0
advanced["x_me_tires_nb_changes_1"] = 0
advanced["y_me_tires_nb_changes_1"] = 0
advanced["w_me_tires_nb_changes_1"] = 60
advanced["h_me_tires_nb_changes_1"] = 60
advanced["f_me_tires_nb_changes_1"] = 48
advanced["bg_me_tires_nb_changes_1"] = 1

// post_tire_compound
advanced["disp_post_tire_compound_1"] = 0
advanced["x_post_tire_compound_1"] = 0
advanced["y_post_tire_compound_1"] = 0
advanced["w_post_tire_compound_1"] = 60
advanced["h_post_tire_compound_1"] = 60
advanced["f_post_tire_compound_1"] = 44
advanced["bg_post_tire_compound_1"] = 1

// post_tires_stints
advanced["disp_post_tires_stints_1"] = 0
advanced["x_post_tires_stints_1"] = 0
advanced["y_post_tires_stints_1"] = 0
advanced["w_post_tires_stints_1"] = 200
advanced["h_post_tires_stints_1"] = 60
advanced["f_post_tires_stints_1"] = 44
advanced["bg_post_tires_stints_1"] = 1

// post_tires_nb_changes
advanced["disp_post_tires_nb_changes_1"] = 0
advanced["x_post_tires_nb_changes_1"] = 0
advanced["y_post_tires_nb_changes_1"] = 0
advanced["w_post_tires_nb_changes_1"] = 60
advanced["h_post_tires_nb_changes_1"] = 60
advanced["f_post_tires_nb_changes_1"] = 48
advanced["bg_post_tires_nb_changes_1"] = 1

// pre_club_name
advanced["disp_pre_club_name_1"] = 0
advanced["x_pre_club_name_1"] = 0
advanced["y_pre_club_name_1"] = 0
advanced["w_pre_club_name_1"] = 240
advanced["h_pre_club_name_1"] = 60
advanced["f_pre_club_name_1"] = 44
advanced["bg_pre_club_name_1"] = 1

// me_club_name
advanced["disp_me_club_name_1"] = 0
advanced["x_me_club_name_1"] = 0
advanced["y_me_club_name_1"] = 0
advanced["w_me_club_name_1"] = 240
advanced["h_me_club_name_1"] = 60
advanced["f_me_club_name_1"] = 44
advanced["bg_me_club_name_1"] = 1

// post_club_name
advanced["disp_post_club_name_1"] = 0
advanced["x_post_club_name_1"] = 0
advanced["y_post_club_name_1"] = 0
advanced["w_post_club_name_1"] = 240
advanced["h_post_club_name_1"] = 60
advanced["f_post_club_name_1"] = 44
advanced["bg_post_club_name_1"] = 1

// pre_club_logo
advanced["disp_pre_club_logo_1"] = 0
advanced["x_pre_club_logo_1"] = 0
advanced["y_pre_club_logo_1"] = 0
advanced["w_pre_club_logo_1"] = 240
advanced["h_pre_club_logo_1"] = 60
advanced["f_pre_club_logo_1"] = 44
advanced["bg_pre_club_logo_1"] = 1

// me_club_logo
advanced["disp_me_club_logo_1"] = 0
advanced["x_me_club_logo_1"] = 0
advanced["y_me_club_logo_1"] = 0
advanced["w_me_club_logo_1"] = 240
advanced["h_me_club_logo_1"] = 60
advanced["f_me_club_logo_1"] = 44
advanced["bg_me_club_logo_1"] = 1

// post_club_logo
advanced["disp_post_club_logo_1"] = 0
advanced["x_post_club_logo_1"] = 0
advanced["y_post_club_logo_1"] = 0
advanced["w_post_club_logo_1"] = 240
advanced["h_post_club_logo_1"] = 60
advanced["f_post_club_logo_1"] = 44
advanced["bg_post_club_logo_1"] = 1

// pre_club_flag
advanced["disp_pre_club_flag_1"] = 0
advanced["x_pre_club_flag_1"] = 0
advanced["y_pre_club_flag_1"] = 0
advanced["w_pre_club_flag_1"] = 90
advanced["h_pre_club_flag_1"] = 60
advanced["f_pre_club_flag_1"] = 44
advanced["bg_pre_club_flag_1"] = 1

// me_club_flag
advanced["disp_me_club_flag_1"] = 0
advanced["x_me_club_flag_1"] = 0
advanced["y_me_club_flag_1"] = 0
advanced["w_me_club_flag_1"] = 90
advanced["h_me_club_flag_1"] = 60
advanced["f_me_club_flag_1"] = 44
advanced["bg_me_club_flag_1"] = 1

// post_club_flag
advanced["disp_post_club_flag_1"] = 0
advanced["x_post_club_flag_1"] = 0
advanced["y_post_club_flag_1"] = 0
advanced["w_post_club_flag_1"] = 90
advanced["h_post_club_flag_1"] = 60
advanced["f_post_club_flag_1"] = 44
advanced["bg_post_club_flag_1"] = 1

// pre_car_name
advanced["disp_pre_car_name_1"] = 0
advanced["x_pre_car_name_1"] = 0
advanced["y_pre_car_name_1"] = 0
advanced["w_pre_car_name_1"] = 240
advanced["h_pre_car_name_1"] = 60
advanced["f_pre_car_name_1"] = 44
advanced["bg_pre_car_name_1"] = 1

// me_car_name
advanced["disp_me_car_name_1"] = 0
advanced["x_me_car_name_1"] = 0
advanced["y_me_car_name_1"] = 0
advanced["w_me_car_name_1"] = 240
advanced["h_me_car_name_1"] = 60
advanced["f_me_car_name_1"] = 44
advanced["bg_me_car_name_1"] = 1

// post_car_name
advanced["disp_post_car_name_1"] = 0
advanced["x_post_car_name_1"] = 0
advanced["y_post_car_name_1"] = 0
advanced["w_post_car_name_1"] = 240
advanced["h_post_car_name_1"] = 60
advanced["f_post_car_name_1"] = 44
advanced["bg_post_car_name_1"] = 1

// pre_car_logo
advanced["disp_pre_car_logo_1"] = 0
advanced["x_pre_car_logo_1"] = 0
advanced["y_pre_car_logo_1"] = 0
advanced["w_pre_car_logo_1"] = 240
advanced["h_pre_car_logo_1"] = 60
advanced["f_pre_car_logo_1"] = 44
advanced["bg_pre_car_logo_1"] = 1

// me_car_logo
advanced["disp_me_car_logo_1"] = 0
advanced["x_me_car_logo_1"] = 0
advanced["y_me_car_logo_1"] = 0
advanced["w_me_car_logo_1"] = 240
advanced["h_me_car_logo_1"] = 60
advanced["f_me_car_logo_1"] = 44
advanced["bg_me_car_logo_1"] = 1

// post_car_logo
advanced["disp_post_car_logo_1"] = 0
advanced["x_post_car_logo_1"] = 0
advanced["y_post_car_logo_1"] = 0
advanced["w_post_car_logo_1"] = 240
advanced["h_post_car_logo_1"] = 60
advanced["f_post_car_logo_1"] = 44
advanced["bg_post_car_logo_1"] = 1

// Time with fuel
advanced["disp_time_with_fuel_1"] = 0
advanced["x_time_with_fuel_1"] = 0
advanced["y_time_with_fuel_1"] = 0
advanced["w_time_with_fuel_1"] = 320
advanced["h_time_with_fuel_1"] = 72
advanced["f_time_with_fuel_1"] = 72
advanced["bg_time_with_fuel_1"] = 1

// Predicted stint time
advanced["disp_predicted_stint_time_1"] = 0
advanced["x_predicted_stint_time_1"] = 0
advanced["y_predicted_stint_time_1"] = 0
advanced["w_predicted_stint_time_1"] = 320
advanced["h_predicted_stint_time_1"] = 72
advanced["f_predicted_stint_time_1"] = 72
advanced["bg_predicted_stint_time_1"] = 1


launcher_previous_joy = -1
launcher_previous_button = -1
launcher_next_joy = -1
launcher_next_button = -1
launcher_empty_joy = -1
launcher_empty_button = -1
launcher_timing_joy = -1
launcher_timing_button = -1
launcher_timing2_joy = -1
launcher_timing2_button = -1
launcher_timing3_joy = -1
launcher_timing3_button = -1
launcher_timing4_joy = -1
launcher_timing4_button = -1
launcher_timing_broadcast_joy = -1
launcher_timing_broadcast_button = -1
launcher_trackmap_joy = -1
launcher_trackmap_button = -1
launcher_trackmap2_joy = -1
launcher_trackmap2_button = -1
launcher_trackmap_3d_joy = -1
launcher_trackmap_3d_button = -1
launcher_dashboard_joy = -1
launcher_dashboard_button = -1
launcher_dashboard2_joy = -1
launcher_dashboard2_button = -1
launcher_compteur_joy = -1
launcher_compteur_button = -1
launcher_calculator_joy = -1
launcher_calculator_button = -1
launcher_buttonbox_joy = -1
launcher_buttonbox_button = -1
launcher_spotter_joy = -1
launcher_spotter_button = -1

launcher_menu_disp = 1
launcher_switch_fast = 1

launcher_empty_disp = 1
launcher_timing_disp = 1
launcher_timing2_disp = 1
launcher_timing3_disp = 1
launcher_timing4_disp = 1
launcher_timing_broadcast_disp = 1
launcher_trackmap_disp = 1
launcher_trackmap2_disp = 1
launcher_trackmap3_disp = 0
launcher_trackmap_3d_disp = 1
launcher_dashboard_disp = 1
launcher_dashboard2_disp = 1
launcher_compteur_disp = 1
launcher_calculator_disp = 1
launcher_buttonbox_disp = 1
launcher_spotter_disp = 0

// *** fin de lecture des parametres ***

// Liste des paramètres avancés du dashboard
// IMPORTANT : il y a aussi le modlist à mettre à jour dans le fichier var_param.py
modlist = ['weather', 'gear', 'rpm', 'speed', 'timeremain', 'tank_h', 'estlaps_h', 'lapsremain_h',
    'fuelneed_h', 'tank', 'estlaps', 'estlaps_white_bar_pct', 'lapsremain', 'lapsremain_orange_bar_pct', 'lapsremain_gold_line_pct', 'fuelneed', 'conso', 'nbpits', 'oil', 'water',
    'pre_pos', 'me_pos', 'post_pos', 'pre_cpos', 'me_cpos', 'post_cpos',
    'pre_pos2', 'me_pos2', 'post_pos2', 'pre_cpos2', 'me_cpos2', 'post_cpos2',
    'pre_gain', 'pre_cgain', 'me_gain', 'me_cgain', 'post_gain', 'post_cgain',
    'pre_best', 'pre_last', 'me_best', 'me_last', 'post_best', 'post_last', 'pre_rel', 'post_rel', 'me_gap', 'me_cgap', 'pre_stint', 'me_stint',
    'pre_topspeed', 'pre_max_speed', 'pre_apex_speed', 'me_topspeed', 'me_max_speed', 'me_apex_speed', 'post_topspeed', 'post_max_speed', 'post_apex_speed',
    'post_stint', 'me_lc', 'pre_name', 'me_name', 'post_name', 'pre_lic', 'post_lic', 'pre_ir', 'post_ir',
    'leader_name', 'cleader_name', 'leader_best', 'cleader_best', 'leader_last', 'cleader_last',
    'me_current', 'me_estlaptime',
    'delta_best_h', 'delta_last_h', 'delta_best', 'delta_last', 'bb',
    'tc', 'tc2', 'ffb', 'b_cont', 't_cont', 'ffbpct_cont', 'mgua', 'mguf', 'mgum', 'ers', 'ersco', 'ers_margin', 'mgul', 'mgu', 'regen_lap', 'regen_turn', 'drs', 'compass',
    'delta_pre', 'delta_post', 'time_with_fuel', 'predicted_stint_time', 'target_conso', 'est_conso', 'fuel_end', 'nblaps_race_winner', 'nblaps_race_driver', 'nblaps_per_tank', 'nblaps_before_pit_window', 'nblaps_to_equalize_stints', 'time', 'perfs', 'rpm_leds', 'brake2', 'brake3', 'throttle2', 'throttle3', 'ffb2', 'sof', 'sof_class0', 'sof_class1', 'sof_class2', 'sof_class3', 'sof_class4',
    'inc', 'nextpittimelost', 'ers_bar', 'regen_gain', 'fuel_mixture', 'eng_pw', 'peak_bb', 'diff_preload', 'diff_entry', 'diff_mid', 'diff_exit', 'eng_br', 'fuelneed1',
    'fuelneed5', 'conso1', 'conso5', 'points', 'wj', 'abs', 'abs_light', 'arb_f', 'arb_r', 'powersteering', 'boo', 't_sh', 'refuel_min', 'refuel_avg', 'refuel_avg_now', 'last_partial_fuel_fill',
    'session_type', 'sky', 'humidity', 'air_press', 'air_dens', 'fog', 'wind_dir', 'wind_dir_deg', 'wind_speed', 'air_temp', 'track_temp', 'track_usage', 'date_ingame', 'time_of_day',
    'delta_avg_h', 'delta_avg', 'delta_tot0', 'delta_tot', 'delta_tot2', 'traffic', 'traffic_pit',
    'RRpressure', 'RFpressure', 'LFpressure', 'LRpressure',
    'RRtempL', 'RRtempM', 'RRtempR', 'RFtempL', 'RFtempM', 'RFtempR', 'LFtempL', 'LFtempM', 'LFtempR', 'LRtempL', 'LRtempM', 'LRtempR',
    'RRwearL', 'RRwearM', 'RRwearR', 'RFwearL', 'RFwearM', 'RFwearR', 'LFwearL', 'LFwearM', 'LFwearR', 'LRwearL', 'LRwearM', 'LRwearR',
    'iR_gain', 'iR_proj', 'c_cont', 'clutch2', 'apex_speed', 'me_p2p', 'pre_p2p', 'post_p2p',
    'LeftTireSetsAvailable', 'RightTireSetsAvailable', 'peak_brake_pressure',
    'iracing_fuel_box', 'iracing_fuel_add', 'iracing_windshield_box', 'iracing_fastrepair_box', 'iracing_fastrepair_remaining', 'iracing_lf_tire_box', 'iracing_rf_tire_box', 'iracing_lr_tire_box', 'iracing_rr_tire_box',
    'pit_speed_diff', 'pre_track_status', 'post_track_status', 'trackname', 'trackconfig',
    'pre_tire_compound', 'pre_tires_stints', 'pre_tires_nb_changes',
    'me_tire_compound', 'me_tires_stints', 'me_tires_nb_changes',
    'post_tire_compound', 'post_tires_stints', 'post_tires_nb_changes',
    'pre_club_name', 'me_club_name', 'post_club_name',
    'pre_club_logo', 'me_club_logo', 'post_club_logo',
    'pre_club_flag', 'me_club_flag', 'post_club_flag',
    'pre_car_name', 'me_car_name', 'post_car_name',
    'pre_car_logo', 'me_car_logo', 'post_car_logo',

]


// Broadcast default option


logo_pct = 0.2     // Trackmap logo width in pourcent of window width
disp_trackmap = 0       // Set 1 if you want to display the trackmap when you open the timing page

disp_paypal = 0		// Set 0 if you want to hide paypal link

turn_edit = getParamValue("turn_edit");
if (turn_edit == '') {
    turn_edit = 0;
} else {
    turn_edit = 1;
}

north_edit = 0;

//***utilisé dans fuel_options.txt***fuel_spare_nblaps = 0.0       // Number of spare laps you want to add in the fuel calculation (you can use floating number)

// Define Electric Cars
car_electric = {
    "porschemissionr": 1,
}

// Define the cars that use kg
car_in_kg = {
    "williamsfw31": 1,
    "hpdarx01c": 1,
    "mclarenmp430": 1,
    "nissangtpzxt": 1,
    "mercedesw12": 1,
    "mercedesw13": 1,
};
disp_kg_livre = 0;       // Set 1 if you want to display the fuel in kg or in pounds

// Cars with ERS and DRS --> en fait ce ne sont finalement que les voitures avec ERS
// J'ai rajouté undefined pour pouvoir éditer les éléments sur le dashboard quand iRacing n'est pas lancé
car_with_ers_drs = {
    "undefined": 1,
    "mclarenmp430": 1,
    "audir18": 1,
    "porsche919": 1,
    "mercedesw12": 1,
    "mercedesw13": 1,
    "bmwlmdh": 1,
};
car_with_drs = {
    "undefined": 1,
    "mclarenmp430": 1,
    "formularenault35": 1,
    "mercedesw12": 1,
    "mercedesw13": 1,
};

car_with_wj = {
    "undefined": 1,
    "dallarair18": 1,
    "dallara": 1,
    "dallaradw12": 1,
}


ttl = 0;

// On détecte si la page est lancée en local ou depuis l'extérieur (on activera alors la version broadcast)
h = window.location.hostname
if (h) {
    b = /[0-9]+[.][0-9]+[.][0-9]+[.][0-9]+/.test(h)    // Fait un test pour savoir si le hostname est une adresse ip
} else {
    b = true
}

if (internetIP == "not needed") {
    broadcast = 0;
} else {
    if (h != "localhost" && (h == internetIP || !b)) {
        broadcast = 1
    } else {
        broadcast = 0
    }
    if (internetIP == localIP) {  // Au cas où l'adresse internetIP est la même, on va supposer que c'est un bug et rester en local
        broadcast = 0;
    }
    // On peut forcer le broadcast
    if (window.location.href.split('?').length > 1 && window.location.href.split('?')[1]=="b") {
        broadcast = 1
    }
}

angle = 0;

//send_config_tstamp = 0;
send_config_tstamp_ = {};

carname = "";

maj_aff = 1;
maj_aff2 = 1;

compteur_ref_w = 1280;
compteur_ref_h = 720;

_f3 = "";

var_sent_every_second = {
    "st": 0,
    "state": 0,
    "laps_l": 0,
    "lead_lc": 0,
    "teamracing": 0,
    "skies": 0,
    "tracktemp": 0,
    "airtemp": 0,
    "airpress": 0,
    "airdens": 0,
    "humidity": 0,
    "windspeed": 0,
    "winddir": 0,
    "fog": 0,
    "tod": 0,
    "sn": 0,
    "sid": 0,
    "srid": 0,
    "styp": 0,
    "sname": 0,
    "qinv": 0,
    "nb_sec": 0,
    "u": 0,
    "isontrack": 0,
    "cts": 0,
    "pitpct": 0,
    "ers": 0,
    "mgul": 0,
    "mgua": 0,
    "mguf": 0,
    "mgum": 0,
    "mgu": 0,
    "ersco": 0,
    "oil": 0,
    "w": 0,
    "p100": 0,
    "p400": 0,
    "p1000": 0,
    "p100d": 0,
    "p400s": 0,
    "p1000s": 0,
    "inc": 0,
    "plost": 0,
    "mgua_gain": 0,
    "fuel_mixture": 0,
    "eng_pw": 0,
    "peak_bb": 0,
    "diff_preload": 0,
    "diff_entry": 0,
    "diff_mid": 0,
    "diff_exit": 0,
    "eng_br": 0,
    "vW": 0,
    "d_a": 0,
    "d_tot": 0,
    "st_avg": 0,
    "st_ref": 0,
    "tot_ref": 0,
    "new_tot": 0,
    "tstamp": 0,
    "load_track_data": 0,
    "s_c": 0,
    "tct": 0,
    "catch_0": 0,
    "catch_1": 0,
    "catch_2": 0,
    "catchpit_0": 0,
    "catchpit_1": 0,
    "catchpit_2": 0,
    "RRpressure": 0,
    "RFpressure": 0,
    "LFpressure": 0,
    "LRpressure": 0,
    "RRtempL": 0,
    "RRtempM": 0,
    "RRtempR": 0,
    "RFtempL": 0,
    "RFtempM": 0,
    "RFtempR": 0,
    "LFtempL": 0,
    "LFtempM": 0,
    "LFtempR": 0,
    "LRtempL": 0,
    "LRtempM": 0,
    "LRtempR": 0,
    "RRwearL": 0,
    "RRwearM": 0,
    "RRwearR": 0,
    "RFwearL": 0,
    "RFwearM": 0,
    "RFwearR": 0,
    "LFwearL": 0,
    "LFwearM": 0,
    "LFwearR": 0,
    "LRwearL": 0,
    "LRwearM": 0,
    "LRwearR": 0,
    "iR_gain": 0,
    "iR_proj": 0,
    "apex_speed": 0,
    "peak_brake_pressure": 0,
    "LeftTireSetsAvailable":0,
    "RightTireSetsAvailable":0,
};

save_donnees_new = {};

led_green_off = 'rgba(64,96,64,0.5)';
led_red_off = 'rgba(96,64,64,0.5)';
led_blue_off = 'rgba(64,64,96,0.5)';
led_green_on = 'rgba(0,255,96,1)';
led_red_on = 'rgba(255,0,0,1)';
led_blue_on = 'rgba(0,128,255,1)';
led_col_off = [led_green_off, led_green_off, led_green_off, led_green_off, led_red_off, led_red_off, led_red_off, led_red_off, led_blue_off, led_blue_off, led_blue_off, led_blue_off];
led_col_on = [led_green_on, led_green_on, led_green_on, led_green_on, led_red_on, led_red_on, led_red_on, led_red_on, led_blue_on, led_blue_on, led_blue_on, led_blue_on];
led_off_speed_low_color = 'rgba(64,96,64,0.5)';
led_off_speed_high_color = 'rgba(96,64,64,0.5)';
led_on_speed_low_color = 'rgba(0,255,96,1)';
led_on_speed_high_color = 'rgba(255,0,0,1)';


liste_sessions = [];

function getParamValue(param,url)
{
	var u = url == undefined ? document.location.href : url;
	var reg = new RegExp('(\\?|&|^)'+param+'=(.*?)(&|$)');
	matches = u.match(reg);
	if (matches) {
		return matches[2] != undefined ? decodeURIComponent(matches[2]).replace(/\+/g,' ') : '';
	} else {
		return false;
	}
}

is_launcher = getParamValue("launcher");
if (is_launcher != 1 && is_launcher != "1") {
    is_launcher = 0;
} else {
    is_launcher = 1;
}
//console.log("is_launcher", is_launcher)

// Utilisé pour les car_mode 6 et 7
driver_ = {};
team_ = {};

donnees = null;

// Option pour n'afficher que les pilotes colorisés
if (getParamValue('filter') != '') {
    filter_colorized = 1;
} else {
    filter_colorized = 0
}
// Option pour faire défiler les pilotes automatiquement toutes les x secondes
if (getParamValue('delay') != '') {
    change_drivers_delay = parseInt(getParamValue('delay'));
} else {
    change_drivers_delay = -1
}
change_drivers_delay_init = parseInt(Date.now() / 1000);

ligneP_height = 40;

jrt_session_start_time = 0;
jrt_session_duration = 0;

boost_old = 0;
ers_old = 100;
speed_old = 0;
regen_status_old = -1;
mguf_old = -1;
mgum_old = -1;
ers_bg_old = "";

boost_manu_old = 0;
ref_ok_old = 0;

boost_off_old = 0;
drs_c_old = -1;

text_conso = "";
text_fuelneed = "";

tmp_w = getParamValue('inner_width');
tmp_h = getParamValue('inner_height');
force_inner_w = false;
force_inner_h = false;
if (tmp_w != "") {
    inner_width = tmp_w;
    force_inner_w = true;
}
if (tmp_h != "") {
    inner_height = tmp_h;
    force_inner_h = true;
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

// Pour rendre compatible le mode wifi quand le mode tethering est activé
//ip = window.location.hostname;
//if (ip !="localip" && ip != "127.0.0.1") {
//    localIP = window.location.hostname;
//}
//console.log(localIP);
//if (getParamValue('ip') != '') {
//    localIP = getParamValue('ip');
//}

trackmap_canvas_w = -1;
trackmap_canvas_h = -1;

// Ces fonctions permettent de vérifier si les valeurs ont changées avant de mettre à jour l'affichage et ainsi économiser des ressources
// elle est utilisée dans les pages Dashboard, Timing et Trackmap
function init_html_style() {
    inner_html = {};  // à chaque innerHTML on enregistre la valeur dans un tableau et on vérifie s'il y a eu un changement avant de modifier la valeur
    style_border_color = {};
    style_color = {};
    style_bg = {};
    style_display = {};
    style_top = {};
}

function color_to_R_G_B(val) {
    if (val != "" && val != undefined) {
        if (val.includes("rgb")) {
            var b = val;
        } else {
            var b = hexToRgb(val);
        }
        var rgb_tab = JSON.parse("[" + b.slice(b.indexOf('(') + 1, -1) + "]");
        return {"r": rgb_tab[0], "g": rgb_tab[1], "b": rgb_tab[2]};
    }
    return false;
}
// On calcule la bonne couleur de font parmi noir ou blanc puor s'adapter au bg
function calc_font_coul(bg) {
    var col_ = color_to_R_G_B(bg)
    var font_coul = "#ffffff";  // renvoie blanc par défaut
    if (col_) {
        var r = col_["r"];
        var g = col_["g"];
        var b = col_["b"];
        var moy = (r + g + b) / 3;
        if (moy < 150) {
            font_coul = "#ffffff";
        } else {
            font_coul = "#000000";
        }
    }
    return font_coul;
}

function set_inner_html(id, val) {
    if (document.getElementById(id) && val != inner_html[id]) {
        document.getElementById(id).innerHTML = val;
        inner_html[id] = val;
    }
}
function set_style_border_color(id, val) {
    if (document.getElementById(id) && val != style_border_color[id]) {
        document.getElementById(id).style.borderColor = val;
        style_border_color[id] = val;
    }
}
function set_style_border_color_alpha(id, val, alpha) {
    if (val != "" && val != undefined) {
        if (val.includes("rgb")) {
            var b = val;
        } else {
            var b = hexToRgb(val);
        }
        var val2 = 'rgba' + b.slice(b.indexOf('('), ( (b.match(/,/g).length == 2) ? -1 : b.lastIndexOf(',') - b.length)) + ', ' + alpha + ')';
        if (document.getElementById(id) && val2 != style_bg[id]) {
            document.getElementById(id).style.borderColor = val2;
            style_border_color[id] = val2;
        }
    } else if (val == "" && document.getElementById(id)) {
        document.getElementById(id).style.borderColor = "";
    }
}
function set_style_color(id, val) {
    if (document.getElementById(id) && val != style_color[id]) {
        document.getElementById(id).style.color = val;
        style_color[id] = val;
    }
}
function set_style_bg(id, val) {
    if (document.getElementById(id) && val != style_bg[id]) {
        document.getElementById(id).style.backgroundColor = val;
        style_bg[id] = val;
    }
}

function set_style_bg_alpha(id, val, alpha) {
    if (val != "" && val != undefined) {
        if (val.includes("rgb")) {
            var b = val;
        } else {
            var b = hexToRgb(val);
        }
        var val2 = 'rgba' + b.slice(b.indexOf('('), ( (b.match(/,/g).length == 2) ? -1 : b.lastIndexOf(',') - b.length)) + ', ' + alpha + ')';
        if (document.getElementById(id) && val2 != style_bg[id]) {
            document.getElementById(id).style.backgroundColor = val2;
            style_bg[id] = val2;
        }
    } else if (val == "" && document.getElementById(id)) {
        document.getElementById(id).style.backgroundColor = "";
    }
}

function set_style_display(id, val) {
    if (document.getElementById(id) && val != style_display[id]) { document.getElementById(id).style.display = val; style_display[id] = val; }
}
function set_style_top(id, val) {
    if (document.getElementById(id) && val != style_top[id]) {
        document.getElementById(id).style.top = val; style_top[id] = val;
    }
}

init_html_style();


// fonction qui permet de s'assurer qu'une valeur censé être numérique le soit vraiment pour éviter les erreurs javascript avec .toFixed et les opérations
function set_float(val) {
    val = parseFloat(val);
    if (isNaN(val)) {
        val = 0;
    }
    return val;
}


// On modifie les classid avec ceux spécifiées dans le fichier _colors_by_nums.js
function change_classid(donnees) {

    //console.log("change_classid");

    if (donnees.d != undefined && donnees.classes != undefined) {
        for (var i in donnees.d) {
            if ("classid" in donnees.d[i] && "num" in donnees.d[i]) {
                tmp_num = donnees.d[i].num;

                tmp_id = 0;
                if ("tid" in donnees.d[i] && "uid" in donnees.d[i]) {
                    tmp_id = donnees.d[i].tid;
                    if (tmp_id == 0) {  // on prend en compte le team id si elle n'est pas nulle, sinon on prend l'user id
                        tmp_id = donnees.d[i].uid;
                    }
                }

                if (tmp_num in classid_by_num) {
                    donnees.d[i].classid = classid_by_num[tmp_num];
                    recalc_cpos = true;
                } else if (tmp_id in classid_by_num) {
                    donnees.d[i].classid = classid_by_num[tmp_id];
                    recalc_cpos = true;
                }
            }
        }
        if (recalc_cpos) {

            // on recalcule le nombre de classes (on en rajoute éventuellement mais on n'en enlève pas)
            // ainsi que le nombre de voitures par classe
            // et aussi le leader de chaque classe et les cgap
            var c;
            for (var num in classid_by_num) {
                c = classid_by_num[num];
                donnees.classes[c] = 1;
                if (donnees.carclasscolor != undefined && !(c in donnees.carclasscolor)) {
                    donnees.carclasscolor[c] = "0xcccccc";  // couleur par défaut si elle n'est pas définie
                }
                if (!(c in name_by_classid)) {
                    name_by_classid[c] = "Class " + c;  // Nom de class par défaut si il n'est pas défini
                }
            }

            donnees.nbclass = Object.keys(donnees.classes).length;

            donnees.nbcars_class = {};
            for (var i in donnees.d) {
                if (i != donnees.me || donnees.me_is_spectator == 0) {
                    c = donnees.d[i].classid;
                    if (c in donnees.nbcars_class) {
                        donnees.nbcars_class[c] += 1;
                    } else {
                        donnees.nbcars_class[c] = 1;
                    }
                }
            }

            // On recalcule les positions par classe
            nb_classes = 0;
            donnees.leader = {};
            for (var c in donnees.classes) {

                // On recalcule de cpos, le leader
                var tmp_cpos = [];
                for (var i in donnees.d) {
                    if (c == donnees.d[i].classid) {
                        tmp_cpos.push([i, donnees.d[i].pos]);
                    }
                }
                tmp_cpos.sort(function (a, b) {
                    return a[1] - b[1];
                });
                var g1, g2, interval;
                var idx1, idx2;
                for (var n = 0; n < tmp_cpos.length; n++) {
                    idx1 = tmp_cpos[n][0];

                    donnees.d[idx1].cpos = n + 1;
                    if (n == 0) {
                        donnees.leader[donnees.d[idx1].classid] = idx1;
                    }
                }

                // On recalcule le cgap
                for (var n = 0; n < tmp_cpos.length; n++) {
                    idx1 = tmp_cpos[n][0];
                    idx2 = donnees.leader[donnees.d[tmp_cpos[n][0]].classid];  // leader de la classe

                    //g1 = donnees.d[idx1].g;
                    //g2 = donnees.d[idx2].g;
                    /*if (g1 != 0) {
                        donnees.d[idx1].cg = g1 - g2;
                    } else {
                        donnees.d[idx1].cg = 0;
                    }*/

                    // On utilise les intervals plutôt que les gap pour être plus précis car si ça dépasse 26km on n'a plus les données
                    if ("interval" in donnees.d[idx1]) {
                        interval = donnees.d[idx1].interval[idx2];
                        if (interval < 0) interval = 0;  // l'interval avec le leader est censé être positif
                    } else {
                        interval = 0;
                    }
                    donnees.d[idx1].cg = interval;
                }

                // On recalcule de scpos
                var tmp_scpos = [];
                for (var i in donnees.d) {
                    if (c == donnees.d[i].classid) {
                        tmp_scpos.push([i, donnees.d[i].spos]);
                    }
                }
                tmp_scpos.sort(function (a, b) {
                    return a[1] - b[1];
                });
                for (var n = 0; n < tmp_scpos.length; n++) {
                    donnees.d[tmp_scpos[n][0]].scpos = n + 1;
                }

                // On efface les calculs de sof qui sont alors faux et on efface aussi la classe de l'objet donnees.classes
                donnees.sof[c] = "--";
                if (c in donnees.nbcars_class) {
                    nb_classes++;
                } else if (c in donnees.classes) {
                    delete donnees.classes[c];
                }

            }

        }

        if (donnees.is_detect_class == 0 && donnees.nbclass < donnees.nbclass_raw) {
            for (var c in name_by_classid) {
                if (donnees.carclasscolor[c] == "0xffda59" && 1 in name_by_classid) {
                    name_by_classid_corr[c] = name_by_classid[1];
                } else if (donnees.carclasscolor[c] == "0x33ceff" && 2 in name_by_classid) {
                    name_by_classid_corr[c] = name_by_classid[2];
                } else if (donnees.carclasscolor[c] == "0xff5888" && 3 in name_by_classid) {
                    name_by_classid_corr[c] = name_by_classid[3];
                } else if (donnees.carclasscolor[c] == "0xae6bff" && 4 in name_by_classid) {
                    name_by_classid_corr[c] = name_by_classid[4];
                } else if (donnees.carclasscolor[c] == "0x53ff77" && 5 in name_by_classid) {
                    name_by_classid_corr[c] = name_by_classid[5];
                } else {
                    name_by_classid_corr[c] = name_by_classid[c];
                }
            }
        } else {
            for (var c in name_by_classid) {
                name_by_classid_corr[c] = name_by_classid[c];
            }
        }
        corrige_bg_col_by_classid(donnees);

        // On renomme les classes
        if (donnees.classname != undefined) {
            for (var c in name_by_classid) {
                donnees.classname[c] = name_by_classid_corr[c];
            }
        }

        sof_displayed = 0;  // pour actualiser les barres de sof

    }
}

function corrige_bg_col_by_classid(donnees) {
    if (donnees.is_detect_class == 0 && donnees.nbclass < donnees.nbclass_raw) {
        for (var c in bg_by_classid) {
            if (donnees.carclasscolor[c] == "0xffda59" && 1 in bg_by_classid) {
                bg_by_classid_corr[c] = bg_by_classid[1];
            } else if (donnees.carclasscolor[c] == "0x33ceff" && 2 in bg_by_classid) {
                bg_by_classid_corr[c] = bg_by_classid[2];
            } else if (donnees.carclasscolor[c] == "0xff5888" && 3 in bg_by_classid) {
                bg_by_classid_corr[c] = bg_by_classid[3];
            } else if (donnees.carclasscolor[c] == "0xae6bff" && 4 in bg_by_classid) {
                bg_by_classid_corr[c] = bg_by_classid[4];
            } else if (donnees.carclasscolor[c] == "0x53ff77" && 5 in bg_by_classid) {
                bg_by_classid_corr[c] = bg_by_classid[5];
            } else {
                bg_by_classid_corr[c] = bg_by_classid[c];
            }
        }
        for (var c in col_by_classid) {
            if (donnees.carclasscolor[c] == "0xffda59" && 1 in col_by_classid) {
                col_by_classid_corr[c] = col_by_classid[1];
            } else if (donnees.carclasscolor[c] == "0x33ceff" && 2 in col_by_classid) {
                col_by_classid_corr[c] = col_by_classid[2];
            } else if (donnees.carclasscolor[c] == "0xff5888" && 3 in col_by_classid) {
                col_by_classid_corr[c] = col_by_classid[3];
            } else if (donnees.carclasscolor[c] == "0xae6bff" && 4 in col_by_classid) {
                col_by_classid_corr[c] = col_by_classid[4];
            } else if (donnees.carclasscolor[c] == "0x53ff77" && 5 in col_by_classid) {
                col_by_classid_corr[c] = col_by_classid[5];
            } else {
                col_by_classid_corr[c] = col_by_classid[c];
            }
        }
    } else {
        for (var c in bg_by_classid) {
            bg_by_classid_corr[c] = bg_by_classid[c];
        }
        for (var c in col_by_classid) {
            col_by_classid_corr[c] = col_by_classid[c];
        }
    }
}

col_by_num = {};  // couleur du texte
bg_by_num = {};  // couleur du fond
classid_by_num = {};  // numéros de class
col_by_classid = {};
bg_by_classid = {};
name_by_classid = {};

// Couleurs corrigées si certaines classes sont encore vides
col_by_classid_corr = {};
bg_by_classid_corr = {};
name_by_classid_corr = {};

recalc_cpos = false;  // permet de savoir s'il faut recalculer les cpos car les classes ont été redéfinies dans le fichier _colors_by_num

dpi_factor = 1;  // REM : plus utilisé (faut éviter car cela dépend de l'ordinateur où est lancé la page
devicePixelRatio = window.devicePixelRatio || 1;
dpi_factor_ = 1;

chargement_page_tstamp = Date.now();

css_perso_content = "init";

jrt_session_start_time = 0;

iframe_dashboard_pagename = getParamValue('iframe_dashboard_pagename');
if (!iframe_dashboard_pagename) {
    iframe_dashboard_pagename = "";
}

autoscroll_initial = -1;  // utilisé pour la désactivation automatique de l'autoscroll quand on scroll vers le haut du timing

line_num = [];

group_by_class_nb_drivers_ = {};
group_by_class_nb_lines_p1_ = {};  // nombres de lignes à sauter pour afficher le p1 de la classe
group_nb_drivers_visible = 0;  // nombre de pilotes qu'on peut afficher (calculé dans la fonction responsive_dim,  si on n'est pas en group_by_class

x_leaders_line_disp_ = {};  // pour savoir si on est censé affiché la ligne séparatrice pour les X leaders
defile_decalage_ = {};
for (var c = 1; c <= 6; c++) {
    x_leaders_line_disp_[c] = 0;
    defile_decalage_[c] = 0;
}
defile_decalage = 0;
init_x_leaders_line = 1;

defile_boucle = null;

class_me = null;

nb_lines_dispos = 1;

ws = null;

line_space_coef = 1;  // utilisé juste pour le name_mode 5

nb_classes = null;

