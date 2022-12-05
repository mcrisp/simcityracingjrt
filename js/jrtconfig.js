
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

// Fonction modulo (car % ne fonctionne pas avec les nombres n�gatifs)
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};


function init_donnees() {
    // Valeurs par default
    donnees = {
        status: 0,
        trackname_path: "--",
        carname_path: "--",
        trackname: "--",
        carname: "--",
        pro_version: 0,
        "licence_str": "",
        "licence_col": "#888888",
        param: {"general": {}, "track": {}, "car": {}, "pit": {}, "broadcast": {}}
    };
}


//premier_chargement = true;

search_num = 0;
search_nb = 0;

search_options_to_display = {};
search_page_to_display = {};

elements_created = 0;

no_cuda = -1;

color_cycle_num = 0;

color_before_highlight = {};

save_button_status = 0;  // Pour savoir si le bouton SAVE est allum� ou pas. 0 : OFF, 1: ON
undo_button_status = 0;  // Pour savoir si le bouton UNDO est allum� ou pas. 0 : OFF, 1: ON
redo_button_status = 0;  // Pour savoir si le bouton REDO est allum� ou pas. 0 : OFF, 1: ON

touchY = 0;

order_nums_ = {};

orientation_old = 0;
val_old = {};

init_donnees();

version_checked = 0;
text_new = "";

// Objet contenant le contenu html des groupes
elements_html_ = {};

//group_list = {};

list_title_id = {};


page_active = "general";  // ce param�tre permet de savoir � quelle page le dernier changement correspond

// Couleurs automatique des bordures gauche et droite (box-shadow)
color_cycle = [
    "#ff66ff",
    "#ff2222",
    "#00ddff",
    "#ff8800",
    "#33ff33",
]

type_setting = {
    "timing": "Timing",
    "timing2": "Timing",
    "timing3": "Timing",
    "timing4": "Timing",
    "timing_broadcast": "Timing",
    "dashboard": "Dashboard",
    "dashboard2": "Dashboard",
    "trackmap": "Trackmap",
    "trackmap2": "Trackmap",
}

list_timing_pages = {
    "timing": 1,
    "timing2": 1,
    "timing3": 1,
    "timing4": 1,
    "timing_broadcast": 1
};

list_trackmap_pages = {
    "trackmap": 1,
    "trackmap2": 1
};

list_trackmap_3d_pages = {
    "trackmap_3d": 1,
};

list_dashboard_pages = {
    "dashboard": 1,
    "dashboard2": 1
};

list_overlays_pages = {
    "timing": 1,
    "timing2": 1,
    "timing3": 1,
    "timing4": 1,
    "timing_broadcast": 1,
    "dashboard": 1,
    "dashboard2": 1,
    "trackmap": 1,
    "trackmap2": 1,
    "trackmap_3d": 1,
    "calculator": 1,
    "compteur": 1,
    "launcher": 1,
    "spotter": 1,
    "telemetry_inputs": 1,
}
// Liste des r�glages possible des overlays
list_overlays_settings = {
    "window_topmost": 1,
    "window_parent_name": 1,
    "window_click_through": 1,
    "show_overlay_sim_not_running": 1,
    "show_overlay_not_incar": 1,
    "show_overlay_ingarage": 1,
    "show_overlay_incar": 1,
    "window_x": 1,
    "window_y": 1,
    "window_w": 1,
    "window_h": 1,
    "overlay_hide": 1,
}

// Groupes � afficher au chargement de la page (sera chang� dynamiquement avec les menus)
// mettre � 1 pour afficher le groupe et 0 sinon
groups_to_display = {
    "license_info": 1,
    "general": 1,
    "general_buttons": 0,
    "fuel_options": 0,
    "refuel_manual_options": 0,
    "refuel_semiauto_options": 0,
    "refuel_auto_options": 0,
    "fuel_options2": 0,
    "calculations_set_options": 0,
    "sound_options": 0,
    "speech_options": 0,
    "buttonbox_options": 0,
    "other_options": 0,
    "usb_displays_options": 0,
    "telemetry_options": 0,
    "turns": 0,
    "track": 0,
    "car": 0,
    "gears": 0,
    "rpm_leds": 0,
    "pit": 0,
    "broadcast": 0,

    "overlays_general": 0,

    "timing_import_export": 0,
    "timing_columns": 0,
    "timing_general": 0,
    "timing_trackmap": 0,
    "timing_overlay": 0,
    "timing2_import_export": 0,
    "timing2_columns": 0,
    "timing2_general": 0,
    "timing2_trackmap": 0,
    "timing2_overlay": 0,
    "timing3_import_export": 0,
    "timing3_columns": 0,
    "timing3_general": 0,
    "timing3_trackmap": 0,
    "timing3_overlay": 0,
    "timing4_import_export": 0,
    "timing4_columns": 0,
    "timing4_general": 0,
    "timing4_trackmap": 0,
    "timing4_overlay": 0,
    "timing_broadcast_import_export": 0,
    "timing_broadcast_columns": 0,
    "timing_broadcast_general": 0,
    "timing_broadcast_trackmap": 0,
    "timing_broadcast_overlay": 0,

    "trackmap_import_export": 0,
    "trackmap_general": 0,
    "trackmap_overlay": 0,
    "trackmap2_import_export": 0,
    "trackmap2_general": 0,
    "trackmap2_overlay": 0,

    "trackmap_3d_general": 0,
    "trackmap_3d_overlay": 0,
    "trackmap_3d_3d_options": 0,

    "dashboard_import_export": 0,
    "dashboard_general": 0,
    "dashboard_overlay": 0,
    "dashboard_advanced": 0,
    "dashboard2_import_export": 0,
    "dashboard2_general": 0,
    "dashboard2_overlay": 0,
    "dashboard2_advanced": 0,

    "calculator_general": 0,
    "calculator_overlay": 0,

    "compteur_general": 0,
    "compteur_overlay": 0,

    "launcher_general": 0,
    "launcher_menu": 0,
    "launcher_buttons": 0,
    "launcher_overlay": 0,

    "spotter_general": 0,
    "spotter_overlay": 0,

    "buttonbox_general": 0,

    "telemetry_inputs_general": 0,
    "telemetry_inputs_overlay": 0,

};


// On d�finit les sous-groupes existant dans les pages JRT
pages_sous_groups = {
    "timing": {
        "import_export": 1,
        "columns": 1,
        "general": 1,
        "trackmap": 1,
        "overlay": 1,
    },
    "timing2": {
        "import_export": 1,
        "columns": 1,
        "general": 1,
        "trackmap": 1,
        "overlay": 1,
    },
    "timing3": {
        "import_export": 1,
        "columns": 1,
        "general": 1,
        "trackmap": 1,
        "overlay": 1,
    },
    "timing4": {
        "import_export": 1,
        "columns": 1,
        "general": 1,
        "trackmap": 1,
        "overlay": 1,
    },
    "timing_broadcast": {
        "import_export": 1,
        "columns": 1,
        "general": 1,
        "trackmap": 1,
        "overlay": 1,
    },
    "dashboard": {
        "import_export": 1,
        "general": 1,
        "advanced": 1,
        "overlay": 1,
    },
    "dashboard2": {
        "import_export": 1,
        "general": 1,
        "advanced": 1,
        "overlay": 1,
    },
    "trackmap": {
        "import_export": 1,
        "general": 1,
        "overlay": 1,
    },
    "trackmap2": {
        "import_export": 1,
        "general": 1,
        "overlay": 1,
    },
    "trackmap_3d": {
        "general": 1,
        "3d_options": 1,
        "overlay": 1,
    },
    "calculator": {
        "general": 1,
        "overlay": 1,
    },
    "compteur": {
        "general": 1,
        "overlay": 1,
    },
    "spotter": {
        "general": 1,
        "overlay": 1,
    },
    "launcher": {
        "general": 1,
        "menu": 1,
        "buttons": 1,
        "overlay": 1,
    },
    "buttonbox": {
        "general": 1,
    },
    "telemetry_inputs": {
        "general": 1,
        "overlay": 1,
    },
};


// On d�finit les groupes d'options disponibles dans la d�roulantes des options (voir fonction display_options)
set_options = {
    "license_options": {
        "license_info": 1,
    },
    "general_options": {
        "general": 1,
    },
    "buttons_options": {
        "general_buttons": 1,
    },
    "track_options": {
        "track": 1,
        "turns": 1,
    },
    "car_options": {
        "car": 1,
        "gears": 1,
        "rpm_leds": 1,
    },
    "fuel_options": {
        "fuel_options": 1,
        "refuel_manual_options": 1,
        "refuel_semiauto_options": 1,
        "refuel_auto_options": 1,
    },
    "fuel_options2": {
        "fuel_options2": 1,
        "calculations_set_options": 1,
    },
    "pit_options": {
        "pit": 1,
    },
    "sound_options": {
        "sound_options": 1,
    },
    "speech_options": {
        "speech_options": 1,
    },
    "buttonbox_options": {
        "buttonbox_options": 1,
    },
    "other_options": {
        "other_options": 1,
    },
    "usb_displays_options": {
        "usb_displays_options": 1,
    },
    "telemetry_options": {
        "telemetry_options": 1,
    },
    "broadcast_options": {
        "broadcast": 1,
    },
    "pages_options": {

    },
    "overlays_options": {
        "overlays_general": 1,
        "timing_overlay": 1,
        "timing2_overlay": 1,
        "timing3_overlay": 1,
        "timing4_overlay": 1,
        "timing_broadcast_overlay": 1,
        "dashboard_overlay": 1,
        "dashboard2_overlay": 1,
        "trackmap_overlay": 1,
        "trackmap2_overlay": 1,
        "trackmap_3d_overlay": 1,
        "calculator_overlay": 1,
        "compteur_overlay": 1,
        "spotter_overlay": 1,
        "launcher_overlay": 1,
        "telemetry_inputs_overlay": 1,
    },
};


// Elements du menu et ses caract�ristiques
// param est un tableau donnant la structure des param�tres donnees.param envoy�s par le serveur JRT
// param est null si on doit g�rer les param�tres de mani�res tr�s sp�cifique comme les gears, les turns, les colonnes des timing ...
// val_type peut �tre de type int, float, str, ...
// elt_type peut �tre de type checkbox, input, input_key ...
menu_elements = [

    {"group_id": "license_info", "param" : ["licence_str"], "texte": "", "val_type": "str", "elt_type": "info"},
    /*{"group_id": "license_info", "param" : null, "texte": "Put your key here <span style='color: orange;'>(not needed if you purchased JRT in september 2019 or later)</span> ", "val_type": "int", "elt_type": "input_key", "long": 10},*/
    /*{"group_id": "license_info", "param" : null, "texte": "", "val_type": "", "elt_type": "licence_key_list", "long": 20},*/
    /*{"group_id": "license_info", "param" : null, "texte": {"margin-top": 0, "margin-bottom": 0, "content": ""}, "elt_type": "text"},*/

    {"group_id": "general", "param" : ["general", "mydocuments_mode"], "texte": "Set manually where the config files will be saved (enter the path below)", "val_type": "int", "elt_type": "switch", "newgroup": 1, "color_cycle_num": 0},
    {"group_id": "general", "param" : ["general", "mydocuments_manual"], "texte": "Config Files ", "val_type": "str", "elt_type": "input", "long": 30, "endgroup": 1,
        "texte2": "A new 'Joel Real Timing' folder will be created inside the folder entered above that will contain the config files."
    },

    {"group_id": "general", "param" : ["general", "mydocuments_iRacing_paint"], "texte": "iRacing Paint Folder ", "val_type": "str", "elt_type": "input", "long": 30, "newgroup": 1, "endgroup": 1, "color_cycle_num": 0,
        "texte2": " "
    },

    {"group_id": "general", "param" : ["general", "PORT"], "texte": "JRT Webserver port (1024 - 65535) ", "val_type": "int", "step": 1, "elt_type": "input", "long": 5, "newgroup": 1,
        "texte2": "In some rare cases, the default port 8000 is already used by another program, then you have to change it."
    },
    {"group_id": "general", "param" : ["general", "PORT8001"], "texte": "Port for local data transfer (1024 - 65535) ", "val_type": "int", "step": 1, "elt_type": "input", "long": 5,
        "texte2": "This port is used to transfer the data to the JRT pages."
    },
    {"group_id": "general", "param" : ["general", "PORT8003"], "texte": "Port for internet data transfert (1024 - 65535) ", "val_type": "int", "step": 1, "elt_type": "input", "long": 5,
        "texte2": "It is used only for the broadcast mode 1."
    },
    {"group_id": "general", "param" : ["general", "localIP"], "texte": "Local IP", "val_type": "str", "elt_type": "info", "long": 15,
        "texte2": "If JRT didn't detect the correct local IP and that you need to specify it manually, you have to edit the set_IPs.txt file located" +
        " in the config files folder and to replace auto by the correct IP."
    },
    {"group_id": "general", "param" : ["general", "internetIP"], "texte": "Internet IP", "val_type": "str", "elt_type": "info", "long": 15, "endgroup": 1,
        "texte2": "It is used only for the broadcast mode 1."
    },

    {"group_id": "general", "param" : ["general", "tethering_mode"], "texte": "Use USB Tethering mode", "val_type": "int", "elt_type": "switch", "newgroup": 1,
        "texte2": "<span style='color: orange'>NOTE : This mode does not work on all configs.<br>If you can't get this mode working, delete the tethering_mode.txt file in the 'My Documents/Joel Real Timing' folder and restart the JRT server.</span><br><br>" +
            "It's possible to replace the wifi connection by the USB connection with the USB tethering mode of your tablet.<br>Follow those steps :<br>" +
            "- Connect your tablet to your PC using the tethering mode.<br>" +
            "- Activate USB tethering mode and enter the IPv4 address below" +
            " (To know it, open the windows console and type ipconfig).<br>" +
            "- Restart the JRT server.<br>" +
            "- On your tablet browser, type the address http://localip:8000/timing.html where localip is the IPv4 address."
    },
    {"group_id": "general", "param" : ["general", "tethering_IP"], "texte": "Tethering IP ", "val_type": "str", "elt_type": "input", "long": 15, "endgroup": 1},

    {"group_id": "general", "param" : ["general", "fps_calc"], "texte": "Calculations rate ", "val_type": "int", "step": 1, "elt_type": "input", "long": 4, "newgroup": 1, "endgroup": 1,
        "texte2": "It's the rate of the main loop where most of the calculations are done.<br>" +
        "Higher values require more CPU. It's not recommanded to change this value.<br>" +
        "Minimum value is 10 and value below 10 will be ignored"
    },

    {"group_id": "general_buttons", "param" : ["general", "tires_all"], "texte": "Check All Tires", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "color_cycle_num": 0},
    {"group_id": "general_buttons", "param" : ["general", "tires_none"], "texte": "Uncheck All Tires", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "general_buttons", "param" : ["general", "tires_left"], "texte": "Check Left Tires Only", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "general_buttons", "param" : ["general", "tires_right"], "texte": "Check Right Tires Only", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "general_buttons", "param" : ["general", "tires_front"], "texte": "Check Front Tires Only", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "general_buttons", "param" : ["general", "tires_rear"], "texte": "Check Rear Tires Only", "val_type": "int", "elt_type": "set_button", "endgroup": 1},

    {"group_id": "general_buttons", "param" : ["general", "check_windshield"], "texte": "check Windshield Tearoff", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1},
    {"group_id": "general_buttons", "param" : ["general", "uncheck_windshield"], "texte": "Uncheck Windshield Tearoff", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1},

    {"group_id": "general_buttons", "param" : ["general", "check_fastrepair"], "texte": "Check request a fast repair", "val_type": "int", "elt_type": "set_button", "newgroup": 1},
    {"group_id": "general_buttons", "param" : ["general", "uncheck_fastrepair"], "texte": "Uncheck request a fast repair", "val_type": "int", "elt_type": "set_button", "endgroup": 1},

    {"group_id": "general_buttons", "param" : null, "texte": {"margin-top": 0, "margin-bottom": 0, "content": "<i><b>The buttons below work with all the timing pages at the same time</b></i>"}, "elt_type": "text", "newgroup": 1},
    {"group_id": "general_buttons", "param" : ["general", "scroll_up"], "texte": "Scroll the timing up", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "general_buttons", "param" : ["general", "scroll_down"], "texte": "Scroll the timing down", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "general_buttons", "param" : ["general", "switch_f3box"], "texte": "Toggle the timing from Standard to Relatives (F3 Box Mode)", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "general_buttons", "param" : ["general", "trackmap"], "texte": "Display the trackmap", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "general_buttons", "param" : ["general", "add_event"], "texte": "Add a Custom event", "val_type": "int", "elt_type": "set_button", "endgroup": 1,
        "texte2": "Adding a Custom event will add a mark that you can see in the events ticker on the timing pages. It is useful if you want to retrieve quickly an event on the replay at the end of the race."
    },

    {"group_id": "general_buttons", "param" : ["general", "garage_hide"], "texte": "Hide/Show the settings using the garage.html page", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1},

    {"group_id": "general_buttons", "param" : ["general", "overlays_hide"], "texte": "Hide/Show the Overlays", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1},

    {"group_id": "general_buttons", "param" : ["general", "restart_jrt_server"], "texte": "Restart the JRT Server", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1 },


    /*{"group_id": "fuel_options", "param" : ["general", "fuel_use_avg"], "texte": "Use the last 5 laps consumption instead of the last one for the calculations", "val_type": "int", "elt_type": "switch"},*/
    {"group_id": "fuel_options", "param" : ["general", "refuel_mode"], "texte": {titre: "Refuel mode",
        options: ["Manual", "Semi-Auto", "Auto"]}, "val_type": "int", "elt_type": "select", "newgroup": 1, "color_cycle_num": 0, "endgroup": 1,
        "texte2": "- <b>Manual</b> : Let iRacing do the refuel.<br><br>" +
        "- <b>Semi-Auto</b> : Automatically refuel with the 'fuel to add' value set manually below and untick automatically the refuel box in iRacing. By default, when you use this mode, the 'fuel to add' manual value will be displayed in the 'fuel to add' box instead of the 'fuel to add' calculated value. You can change this behaviour by deactivating the setting below named 'Display the 'fuel to add' manual value above in the 'fuel to add' box instead of the 'fuel to add' calculated value'.<br><br>" +
        "- <b>Auto</b> : Automatically refuel with the 'fuel to add' value calculated by JRT and untick automatically the refuel box in iRacing.",
    },

    {"group_id": "fuel_options", "param" : ["general", "refuel_mode_dec"], "texte": "Previous refuel mode", "val_type": "int", "elt_type": "set_button", "newgroup": 1},
    {"group_id": "fuel_options", "param" : ["general", "refuel_mode_inc"], "texte": "Next refuel mode", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "fuel_options", "param" : null, "texte": {"margin-top": 0.5, "margin-bottom": 0, "content": "<i><b>Choose below the modes you want to be available when using <div class='button_text2'>Previous refuel mode</div> and <div class='button_text2'>Next refuel mode</div> buttons :</b></i>"}, "elt_type": "text"},
    {"group_id": "fuel_options", "param" : ["general", "refuel_mode_0_switchable"], "texte": "'<b>Manual</b>' refuel mode", "val_type": "int", "elt_type": "switch"},
    {"group_id": "fuel_options", "param" : ["general", "refuel_mode_1_switchable"], "texte": "'<b>Semi-Auto</b>' refuel mode", "val_type": "int", "elt_type": "switch"},
    {"group_id": "fuel_options", "param" : ["general", "refuel_mode_2_switchable"], "texte": "'<b>Auto</b>' refuel mode", "val_type": "int", "elt_type": "switch", "endgroup": 1},

    {"group_id": "refuel_manual_options", "param" : ["general", "refuel"], "texte": "Refuel with the 'Fuel to add' value calculated", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1,
        "texte2": "This button works only when you are in Manual Refuel mode." +
        " It will check the refuel box in iRacing and set the refuel value."
    },

    {"group_id": "refuel_semiauto_options", "param" : ["general", "fuelneed_man"], "texte": "Set the 'fuel to add' manual value in liters or kWh for the 'Semi-Auto' refuel mode", "val_type": "float", "step": 0.1, "elt_type": "input", "long": 5, "newgroup": 1},
    {"group_id": "refuel_semiauto_options", "param" : ["general", "fuelneed_man_disp"], "texte": "Display the 'fuel to add' manual value above in the 'fuel to add' box instead of the 'fuel to add' calculated value", "val_type": "int", "elt_type": "switch",
        "texte2": "This value is converted into the unit used in iRacing."
    },
    {"group_id": "refuel_semiauto_options", "param" : ["general", "fuelneed_man_dec"], "texte": "Decrease 'fuel to add' manual value", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "refuel_semiauto_options", "param" : ["general", "fuelneed_man_inc"], "texte": "Increase 'fuel to add' manual value", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "refuel_semiauto_options", "param" : ["general", "fuelneed_man_reset"], "texte": "Reset the 'fuel to add' value to the calculated value for the 'Semi-Auto' refuel mode", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "refuel_semiauto_options", "param" : ["general", "refuel_semiauto_practice_qualy_off"], "texte": "Deactivate the 'Semi-Auto' refuel mode for practice/qualy sessions", "val_type": "int", "elt_type": "switch", "endgroup": 1},

    {"group_id": "refuel_auto_options", "param" : ["general", "fuelneed_auto_offset"], "texte": "'Fuel to add' Offset for the 'Auto' Refuel mode", "val_type": "float", "step": 0.1, "elt_type": "input", "long": 5, "newgroup": 1,
        "texte2": "Amount of fuel in liters or kWh that will be added in the tank additionnally to the 'fuel to add' calculated value when using the 'Auto' refuel mode.<br>" +
        "Enter a negative value if you want to add less fuel.<br>" +
        "<b>NOTES :</b> When you change this value, the new value is displayed for 2 seconds in the 'fuel to add' box. It is also displayed in the 'fuel to add header' box. This value is converted into " +
        "the unit used in iRacing."
    },
    {"group_id": "refuel_auto_options", "param" : ["general", "fuelneed_auto_offset_dec"], "texte": "Decrease the 'fuel to add' Offset value", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "refuel_auto_options", "param" : ["general", "fuelneed_auto_offset_inc"], "texte": "Inrease the 'fuel to add' Offset value", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "refuel_auto_options", "param" : ["general", "fuelneed_auto_offset_step"], "texte": "Step when you increase / decrease the offset value with a button", "val_type": "float", "step": 0.1, "elt_type": "input", "long": 5},
    {"group_id": "refuel_auto_options", "param" : ["general", "refuel_auto_practice_qualy_off"], "texte": "Deactivate the 'Auto' refuel mode for practice/qualy sessions", "val_type": "int", "elt_type": "switch", "endgroup": 1},


    /*{"group_id": "fuel_options", "param" : null, "texte": {"margin-top": 0, "margin-bottom": 0, "content": ""}, "elt_type": "text"},*/

    /*{"group_id": "fuel_options", "param" : ["general", "force_auto_in_team"], "texte": "Force Semi-Auto and Auto refuel mode to work in team racing. <i><b>WARNING:</b> In team racing, those modes can be unpredictable if you don't know what you are doing !</i>", "val_type": "int", "elt_type": "switch", "endgroup": 1},*/

    /*{"group_id": "fuel_options", "param" : null, "texte": {"margin-top": 0, "margin-bottom": 0, "content": ""}, "elt_type": "text"},*/

    {"group_id": "fuel_options2", "param" : ["general", "calculations_mode"], "texte": {titre: "Calculations mode",
        options: ["1L", "5L", "MAX", "Set"]},
        texte2: "- <b>1L</b> : Use the last lap consumption<br>- <b>5L</b> : Use the last 5 laps average consumption<br>- <b>MAX</b> : Use the maximum consumption from the start of the session<br>- <b>Set</b> : Use the consumption set manually below",
        "val_type": "int", "elt_type": "select", "newgroup": 1, "endgroup": 1},

    {"group_id": "fuel_options2", "param" : ["general", "calculations_mode_dec"], "texte": "Previous calculations mode", "val_type": "int", "elt_type": "set_button", "newgroup": 1},
    {"group_id": "fuel_options2", "param" : ["general", "calculations_mode_inc"], "texte": "Next calculations mode", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "fuel_options2", "param" : null, "texte": {"margin-top": 0.5, "margin-bottom": 0, "content": "<i><b>Choose below the modes you want to be available when using <div class='button_text2'>Previous calculations mode</div> and <div class='button_text2'>Next calculations mode</div> buttons :</b></i>"}, "elt_type": "text"},
    {"group_id": "fuel_options2", "param" : ["general", "calculations_mode_0_switchable"], "texte": "'<b>1L</b>' calculations mode", "val_type": "int", "elt_type": "switch"},
    {"group_id": "fuel_options2", "param" : ["general", "calculations_mode_1_switchable"], "texte": "'<b>5L</b>' calculations mode", "val_type": "int", "elt_type": "switch"},
    {"group_id": "fuel_options2", "param" : ["general", "calculations_mode_2_switchable"], "texte": "'<b>MAX</b>' calculations mode", "val_type": "int", "elt_type": "switch"},
    {"group_id": "fuel_options2", "param" : ["general", "calculations_mode_3_switchable"], "texte": "'<b>Set</b>' calculations mode", "val_type": "int", "elt_type": "switch", "endgroup": 1},

    {"group_id": "fuel_options2", "param" : ["general", "fuel_spare_nblaps"], "texte": "Number of spare laps to add for the fuel calculations ", "val_type": "float", "step": 0.1, "elt_type": "input", "long": 5, "newgroup": 1, "endgroup": 1,
        "texte2": "If you set it to 0.5 and that you consume 3 L/lap, the 'fuel to add' value calculated will be increased by 1.5 L"
    },

    {"group_id": "calculations_set_options", "param" : ["general", "conso_Set"], "texte": "Manually set consumption in liters or kWh/lap", "val_type": "float", "step": 0.001, "elt_type": "input", "long": 5, "newgroup": 1},
    {"group_id": "calculations_set_options", "param" : ["general", "conso_Set_dec"], "texte": "Decrease the consumption value", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "calculations_set_options", "param" : ["general", "conso_Set_inc"], "texte": "Increase the consumption value", "val_type": "int", "elt_type": "set_button"},
    {"group_id": "calculations_set_options", "param" : ["general", "conso_Set_reset"], "texte": "Reset the consumption value to the calculated value for the 'Set' calculations mode ", "val_type": "int", "elt_type": "set_button", "endgroup": 1},

    /*{"group_id": "fuel_options2", "param" : null, "texte": {"margin-top": 0, "margin-bottom": 0, "content": ""}, "elt_type": "text"},*/


    {"group_id": "sound_options", "param" : ["general", "fuel_sound_alert"], "texte": "Play a sound alert in race when you need to pit or if you didn't put full tank when gridding", "val_type": "int", "elt_type": "switch", "newgroup": 1, "color_cycle_num": 0,
        "texte2": "The sound is played only in a Race session. It is played 2 times : one lap and a 1500 meters or half a lap before you have to pit.<br>" +
        "With this option, you will also avoid to start a race with the qualy setup."
    },
    {"group_id": "sound_options", "param" : ["general", "fuel_sound_alert_gainDB"], "texte": "Adjust the gain in dB for the 'fuel alert' sound", "val_type": "float", "step": 1, "elt_type": "input", "long": 5},

    {"group_id": "sound_options", "param" : ["general", "play_enough_fuel_sound"], "texte": "Play a sound when there is enough fuel in the tank", "val_type": "int", "elt_type": "switch"},
    {"group_id": "sound_options", "param" : ["general", "play_enough_fuel_sound_gainDB"], "texte": "Adjust the gain in dB for the 'enough fuel' sound", "val_type": "float", "step": 1, "elt_type": "input", "long": 5, "endgroup": 1},

    {"group_id": "sound_options", "param" : ["general", "spotter_bips"], "texte": "Spotter with beep sounds", "val_type": "int", "elt_type": "switch", "newgroup": 1,
        "texte2": "Don't forget to specify the car length in the 'Car Parameters' for more accuracy."
    },
    {"group_id": "sound_options", "param" : ["general", "spotter_bips_ahead_gainDB"], "texte": "Adjust the gain in dB for the 'spotter beep' sounds when a car is ahead", "val_type": "float", "step": 1, "elt_type": "input", "long": 5},
    {"group_id": "sound_options", "param" : ["general", "spotter_bips_behind_gainDB"], "texte": "Adjust the gain in dB for the 'spotter beep' sounds when a car is behind", "val_type": "float", "step": 1, "elt_type": "input", "long": 5},
    {"group_id": "sound_options", "param" : ["general", "spotter_bips_contact_gainDB"], "texte": "Adjust the gain in dB for the 'spotter beep' sounds when you are side by side", "val_type": "float", "step": 1, "elt_type": "input", "long": 5, "endgroup": 1},

    {"group_id": "sound_options", "param" : ["general", "fastcar_bip"], "texte": "Fast car Beep", "val_type": "int", "elt_type": "switch", "newgroup": 1,
        "texte2": "If the car behind you is closer to the distance specify below and if his best laptime is 2% faster than yours, a brief sound alert is played. This sound is also played if you are slow on the track" +
        " to alert that a car is coming very fast."
    },
    {"group_id": "sound_options", "param" : ["general", "fastcar_bip_gainDB"], "texte": "Adjust the gain in dB for the 'fastcar beep' sounds", "val_type": "float", "step": 1, "elt_type": "input", "long": 5},
    {"group_id": "sound_options", "param" : ["general", "fastcar_dist"], "texte": "Specify here the distance in meters for the fast car beep ", "val_type": "float", "step": 1, "elt_type": "input", "long": 5, "endgroup": 1},

    {"group_id": "sound_options", "param" : ["general", "mgu_bips"], "texte": "Beep sounds when LMP1 or F1 boost is activated/deactivated", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": "sound_options", "param" : ["general", "mgu_bips_gainDB"], "texte": "Adjust the gain in dB for the 'Boost beep' sounds", "val_type": "float", "step": 1, "elt_type": "input", "long": 5, "endgroup": 1},

    {"group_id": "sound_options", "param" : ["general", "drs_zone_bips"], "texte": "Beep sound when you cross the DRS detection zone within the 1 second delta in a race", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": "sound_options", "param" : ["general", "drs_zone_bips_gainDB"], "texte": "Adjust the gain in dB for the 'DRS beep' sounds", "val_type": "float", "step": 1, "elt_type": "input", "long": 5},
    {"group_id": "sound_options", "param" : ["general", "drs_bips"], "texte": "Beep sound when the DRS can be activated", "val_type": "int", "elt_type": "switch"},
    {"group_id": "sound_options", "param" : ["general", "drs_bips_off_in_practice"], "texte": "Deactivate the DRS Beep sounds in practice and test sessions", "val_type": "int", "elt_type": "switch"},
    {"group_id": "sound_options", "param" : ["general", "drs_bips_gainDB"], "texte": "Adjust the gain in dB for the 'DRS beep' sounds", "val_type": "float", "step": 1, "elt_type": "input", "long": 5, "endgroup": 1},

    {"group_id": "sound_options", "param" : ["general", "play_tireschange_sounds"], "texte": "Play wheel guns sounds when changing tires", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": "sound_options", "param" : ["general", "play_tireschange_sounds_gainDB"], "texte": "Adjust the gain in dB for the 'wheel guns' sounds", "val_type": "float", "step": 1, "elt_type": "input", "long": 5, "endgroup": 1},


    {"group_id": "speech_options", "param" : ["general", "text_to_speech_language"], "texte": {titre: "Language",
        options: [
            "0: English",
            "1: French",
        ]
    }, "val_type": "int", "elt_type": "select", "newgroup": 1},
    {"group_id": "speech_options", "param" : ["general", "text_to_speech_gainDB"], "texte": "Adjust the gain in dB for the speech", "val_type": "float", "step": 1, "elt_type": "input", "long": 5, "endgroup": 1},

    {"group_id": "speech_options", "param" : ["general", "conso_to_speech_sf"], "texte": "Say the last lap consumption when passing the start/finish line", "val_type": "int", "elt_type": "switch"},
    {"group_id": "speech_options", "param" : ["general", "conso_to_speech"], "texte": "Read the last lap consumption", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1,
        "texte2": "The last lap consumption will be read when you press the button set."
    },

    {"group_id": "speech_options", "param" : ["general", "pitbox_distance_to_speech"], "texte": "Say the remaining distance to the pit box (in meters)", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": "speech_options", "param" : ["general", "pitbox_distance_to_speech_decompte"], "texte": "Say 5, 4, 3, 2, 1 instead of the distance in meters ", "val_type": "int", "elt_type": "switch",
        "texte2": "Example : say 5, 4, 3, 2, 1 instead of 100, 80, 60, 40, 20 if the interval below is set to 20."
    },
    {"group_id": "speech_options", "param" : ["general", "pitbox_distance_to_speech_start"], "texte": "Distance in meters from which JRT starts to say the remaining distance", "val_type": "float", "step": 1, "elt_type": "input", "long": 5},
    {"group_id": "speech_options", "param" : ["general", "pitbox_distance_to_speech_interval"], "texte": "Interval in meters between two distances say", "val_type": "float", "step": 1, "elt_type": "input", "long": 5, "endgroup": 1,
        "texte2": "Minimum interval accepted is 10."
    },


    {"group_id": "buttonbox_options", "param" : ["general", "activate_vjoy"], "texte": "Activate vJoy for the buttonbox", "val_type": "int", "elt_type": "switch", "newgroup": 1,
        "texte2" : "The virtual buttonbox use vJoy drivers to work. You have to activate it and to choose a vJoy device number below.<br>" +
        "<a href='https://joel-real-timing.com/buttons_en.html'>More infos here</a>."
    },
    {"group_id": "buttonbox_options", "param" : ["general", "vjoy_device_number"], "texte": "vJoy device number", "val_type": "int", "step": 1, "elt_type": "input", "endgroup": 1},


    {"group_id": "other_options", "param" : ["general", "open_jrtconfig_at_start"], "texte": "Open JRT config when you start the server", "val_type": "int", "elt_type": "switch", "newgroup": 1, "color_cycle_num": 0},
    {"group_id": "other_options", "param" : ["general", "open_download_page"], "texte": "Open the download page if a new version is available", "val_type": "int", "elt_type": "switch", "endgroup": 1},

    {"group_id": "other_options", "param" : ["general", "dashboard_traffic_slow"], "texte": "Laptime % that defines a slow car for the traffic prediction on the dashboard", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "newgroup": 1,
        "texte2": "The default value is 0.5%. It means that if the laptime is about 1min40s, a car slower by 0.5s will be considered as a traffic."
    },
    {"group_id": "other_options", "param" : ["general", "dashboard_traffic_fast"], "texte": "Laptime % that defines a fast car for the traffic prediction on the dashboard", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},
    {"group_id": "other_options", "param" : ["general", "dash_same_class"], "texte": "On the dashboard, display only drivers in the same class", "val_type": "int", "elt_type": "switch", "endgroup": 1},

    {"group_id": "other_options", "param" : ["general", "is_detect_class"], "texte": "Use JRT class detection", "val_type": "int", "elt_type": "switch", "newgroup": 1,
        "texte2": "" +
        "Uncheck it if you want to keep the iRacing class colors.<br>" +
        "When you activate this option, JRT uses his own colors and name for some classes (P1, P2, GTE, GT3, ...).<br>" +
        "Note that when a new car is coming to iRacing, you will have to " +
        "wait for a JRT update to have this car added in the JRT classes."
    },
    {"group_id": "other_options", "param" : ["general", "auto_bg_color_class1"], "texte": "Automatic Color for the 1st Class", "val_type": "int", "elt_type": "switch"},
    {"group_id": "other_options", "param" : ["general", "bg_color_class1"], "texte": "1st Class Background Color", "val_type": "str", "long":5, "elt_type": "input_color"},
    {"group_id": "other_options", "param" : ["general", "auto_bg_color_class2"], "texte": "Automatic Color for the 2nd Class", "val_type": "int", "elt_type": "switch"},
    {"group_id": "other_options", "param" : ["general", "bg_color_class2"], "texte": "2nd Class Background Color", "val_type": "str", "long":5, "elt_type": "input_color"},
    {"group_id": "other_options", "param" : ["general", "auto_bg_color_class3"], "texte": "Automatic Color for the 3rd Class", "val_type": "int", "elt_type": "switch"},
    {"group_id": "other_options", "param" : ["general", "bg_color_class3"], "texte": "3rd Class Background Color", "val_type": "str", "long":5, "elt_type": "input_color"},
    {"group_id": "other_options", "param" : ["general", "auto_bg_color_class4"], "texte": "Automatic Color for the 4th Class", "val_type": "int", "elt_type": "switch"},
    {"group_id": "other_options", "param" : ["general", "bg_color_class4"], "texte": "4th Class Background Color", "val_type": "str", "long":5, "elt_type": "input_color"},
    {"group_id": "other_options", "param" : ["general", "auto_bg_color_class5"], "texte": "Automatic Color for the 5th Class", "val_type": "int", "elt_type": "switch"},
    {"group_id": "other_options", "param" : ["general", "bg_color_class5"], "texte": "5th Class Background Color", "val_type": "str", "long":5, "elt_type": "input_color", "endgroup": 1},

    {"group_id": "other_options", "param" : ["general", "f3box_mode"], "texte": "On the dashboard and the timing relatives (F3 box mode), hide the drivers in the pits", "val_type": "int", "elt_type": "switch", "newgroup": 1},

    /*{"group_id": "other_options", "param" : ["general", "colorize_paints"], "texte": "Colorize the car paints in iRacing with the colors selected in the timing page", "val_type": "int", "elt_type": "switch"},*/
    {"group_id": "other_options", "param" : ["general", "force_hide_taskbar"], "texte": "Force taskbar to be hidden when you are in the car", "val_type": "int", "elt_type": "switch",
        "texte2": "Try this only if you have an issue with the taskbar that stays visible."
    },
    {"group_id": "other_options", "param" : ["general", "log_sessions"], "texte": "Save laptimes and fuel infos to csv files", "val_type": "int", "elt_type": "switch",
        "texte2": "Those files will be saved in 'My Documents/Joel Real Timing/log_sessions' folder."
    },
    {"group_id": "other_options", "param" : ["general", "save_debug_files"], "texte": "Save debug files", "val_type": "int", "elt_type": "switch", "endgroup": 1,
        "texte2": "Those files will be saved in 'My Documents/Joel Real Timing/debug files' folder."
    },

    {"group_id": "other_options", "param" : ["general", "save_gap_data_60s"], "texte": "Save all the data for the timing every 60 seconds when you are not in the car.", "val_type": "int", "elt_type": "switch", "newgroup": 1,
        "texte2": "WARNING! When this option is activated, it can cause some stuttering depending of your configuration, especially in endurance races." +
        "This option is usefull only if you want to retrieve the gap times between cars after a JRT restart.<br>" +
        "NB : The data is not saved when you are spectating."
    },
    {"group_id": "other_options", "param" : ["general", "save_light_data_60s"], "texte": "Save basic data for the timing every 60 seconds when you are not in the car.", "val_type": "int", "elt_type": "switch",
        "texte2": "When you are not in the car, the basic data is saved every 60s, so if you restart JRT you should retrieve the pit stop infos and some other data like the events data.<br>" +
        "NB : The data is not saved when you are spectating."
    },
    {"group_id": "other_options", "param" : ["general", "save_light_data_quit"], "texte": "Save basic data for the timing when closing iRacing.", "val_type": "int", "elt_type": "switch", "endgroup": 1,
        "texte2": "With this option activated, the timing infos are saved when the race is finished and when you exit iRacing, so you can load the timing later when iRacing is closed. Those infos " +
        "are also useful when you load the replay later.<br>" +
        "NB : The data is not saved when you are spectating."
    },

    {"group_id": "other_options", "param" : ["general", "deactivate_events_calculations"], "texte": "Deactivate the events calculations.", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1,
        "texte2": "If you have some issues with JRT being slow in endurance races, deactivating the events calculations may help."
    },

    {"group_id": "other_options", "param" : null, "texte": "Save the results to a csv file in 'My Documents/Joel Real Timing/log_sessions/results'", "val_type": "", "long": 30, "elt_type": "button", "action": "calc_log_results"},


    {"group_id": "usb_displays_options", "param" : ["general", "use_usbscreen"], "texte": {titre: "Select your USB display type where you want to display the dashboard ", options: ["None", "USBD480", 'VOCORE 4.x"', 'VOCORE 5"']}, "val_type": "int", "elt_type": "select", "newgroup": 1,
        "texte2": "" +
        "After selecting or changing the USB display type, connect your USB display if it's not connected yet and restart the JRT server.<br>" +
        "Don't forget to deactivate the 'add this page to the overlays' option for the pages you don't want to display as an overlay.<br><br>" +
        "NB : To display the dashboard to the USB screen, JRT uses the windows clipboard, so keep in mind that when the JRT Overlays are opened, it won't be possible to use the copy/paste function in others applications."},
    {"group_id": "usb_displays_options", "param" : ["general", "usbscreen_rotate_180"], "texte": "Rotate the view by 180&deg", "val_type": "int", "elt_type": "switch"},
    {"group_id": "usb_displays_options", "param" : ["general", "usbscreen_backlight"], "texte": "Light (between 1 and 255)", "val_type": "int", "step": 1, "elt_type": "input", "long": 4},
    {"group_id": "usb_displays_options", "param" : ["general", "usbscreen_set_black_when_iracing_off"], "texte": "Turn off the display when iRacing is not started", "val_type": "int", "elt_type": "switch", "endgroup": 1},
    {"group_id": "usb_displays_options", "param" : ["general", "usbscreen_shift_margin"], "texte": "Adjust this value (positive or negative) if the screen is splitted", "val_type": "int", "step": 1, "elt_type": "input", "long": 4, "newgroup": 1, "endgroup": 1},


    {"group_id": "telemetry_options", "param" : ["general", "allow_telemetry"], "texte": "Allow JRT to activate/deactivate the iRacing telemetry", "val_type": "int", "elt_type": "switch",
        "texte2": "<span style='color: white;'>NOTE that tires data is only available in practice and test sessions.</span><br>" +
        "- With this option activated, JRT will read the data on the telemetry file created by iRacing in My Documents/iRacing/telemetry. If the" +
        " telemetry was already activated by the driver, it will stop it and restart it to create a new file.<br>" +
        "<span style='color: red; font-weight: bold;'>- Don't activate it if you already have another app that use the telemetry, for example the VRS app.</span><br>" +
        "<b><span style='color: orange;'>- If you have a SSD hard drive and that you don't want to harass it, it may be better to redirect the iRacing telemetry folder to another hard drive.</span></b>",
        "newgroup": 1, "color_cycle_num": 0},
    {"group_id": "telemetry_options", "param" : ["general", "mydocuments_iRacing_telemetry"], "texte": "iRacing Telemetry Folder ", "val_type": "str", "elt_type": "input", "long": 30,
        "texte2": " "
    },
    {"group_id": "telemetry_options", "param" : ["general", "telemetry_rate"], "texte": {titre: "Tires Data Update Rate ", options: ["Manual", "5 seconds", "Turns"]}, "val_type": "int", "elt_type": "select",
        "texte2": "- <b>Manual</b> : use the < telemetry update > button set below to update the data.<br>" +
        "- <b>5 seconds</b> : update the data every 5 seconds.<br>" +
        "- <b>Turns</b> : update the data after each turn and give the maximum value reached in the turn. When you enter a turn, the text color is greyed on the dashboard until the next update."},
    {"group_id": "telemetry_options", "param" : ["general", "telemetry_update"], "texte": "Telemetry update", "val_type": "int", "elt_type": "set_button", "endgroup": 1},


    {"group_id": null, "param" : null, "texte": "", "val_type": "", "elt_type": "turns"},
    {"group_id": "track", "param" : null, "texte": "", "val_type": "str", "elt_type": "info_track"},
    {"group_id": "track", "param" : ["track", "orientation_auto"], "texte": "Automatic Trackmap Orientation ", "val_type": "int", "elt_type": "switch", "newgroup": 1, "color_cycle_num": 0},
    {"group_id": "track", "param" : ["track", "orientation"], "texte": "Trackmap Orientation value in degrees ", "val_type": "float", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},
    {"group_id": "track", "param" : null, "texte": "RESET THIS TRACKMAP ", "val_type": "", "long": 30, "elt_type": "button", "action": "reset_trackmap"},

    {"group_id": null, "param" : null, "texte": "", "val_type": "", "elt_type": "gears"},
    {"group_id": "car", "param" : null, "texte": "", "val_type": "str", "elt_type": "info_car"},
    {"group_id": "car", "param" : ["car", "car_length"], "texte": "Car length", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "newgroup": 1, "endgroup": 1, "color_cycle_num": 0,
        "texte2": "It is useful if you are using the sound or the visual spotter."
    },
    {"group_id": "rpm_leds", "param" : ["car", "rpm_leds_N_red"], "texte": "LED number that lights up when the rpm limit defined above is reached", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1,
        "texte2": "LED #1 is the LED on the left and LED #12 is the one on the right."
    },
    {"group_id": "rpm_leds", "param" : ["car", "rpm_leds_led1_pct"], "texte": "RPM  Limit percentage for the LED #1", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "endgroup": 1,
        "texte2": "It must be a number between 0 and 1. It defines when you want the LED #1 to light up. For example, if you set 0.8 and that the RPM Limit is set to 10000, the LED #1 will light up at 8000 rpm."
    },


    {"group_id": "pit", "param" : null, "texte": "", "val_type": "str", "elt_type": "info_car"},
    {"group_id": "pit", "param" : ["pit", "tank_capacity"], "texte": "Tank capacity (in liter or kWh)", "val_type": "float", "elt_type": "info", "long": 10, "newgroup": 1, "color_cycle_num": 0,
        "texte2": "It is just for info. That takes into account the max fuel % for the serie."
    },
    {"group_id": "pit", "param" : ["pit", "refuelspeed"], "texte": "Refuel speed (in liter or kWh per second)", "val_type": "float", "step": 0.01, "long": 5, "elt_type": "input",
        "texte2": "To calculate it, divide the refuel amount by the time in seconds."
    },
    {"group_id": "pit", "param" : ["pit", "pittimelost3"], "texte": "Time lost in seconds when changing all tires", "val_type": "float", "step": 0.1, "long": 5, "elt_type": "input",
        "texte2": "It's about 27 seconds for GT cars."
    },
    {"group_id": "pit", "param" : ["pit", "fuel_engine_cut"], "texte": "Amount of fuel in liter when engine cuts", "val_type": "float", "step": 0.1, "long": 5, "elt_type": "input",
        "texte2": "This amount will be added to the 'fuel to add' calculation."
    },
    {"group_id": "pit", "param" : ["pit", "tires_and_fuel"], "texte": "Check if tires changes and refuel are done at the same time", "val_type": "int", "elt_type": "switch", "endgroup": 1},
    {"group_id": "pit", "param" : null, "texte": "", "val_type": "str", "elt_type": "info_track"},
    {"group_id": "pit", "param" : ["pit", "pittimelost1"], "texte": "Time lost in seconds in pit w/o refuel nor tires changes ", "val_type": "float", "step": 0.1, "long": 5, "elt_type": "input", "newgroup": 1,
        "texte2": "To calculate it, you have to do a reference lap, an inlap, a pit stop," +
        " stop the car somewhere in the pitlane without changing the tires nor refueling, and finish the outlap.<br>" +
        "Then you calculate the difference between the sum of last two laps and twice your reference laptime.<br>" +
        "For example if your reference lap time is 1'50, your inlap 2'05 and your outlap 2'02, you do :<br>2'05 + 2'02 - 1'50 - 1'50 = 27 seconds."
    },
    {"group_id": "pit", "param" : ["general", "is_pittimelost1_auto"], "texte": "Automatically calculate the Time lost in seconds in pit w/o refuel nor tires changes", "val_type": "int", "elt_type": "switch",
        "texte2": "Try to calculate the 'Time lost in seconds in pit w/o refuel nor tires changes' value you have to enter in 'Pit parameters' for the car and the track when you do " +
        "full pit stop simulations in practice.<br> " +
        "For your pit stop simulation, you have to do a reference lap, an inlap, a pit stop (it's not required to stop the car in your pit box, you can stop it anywhere in the pit lane)" +
        " and finish the outlap.<br>" +
        "It's not recommended to activate this setting everytime because it can calculate wrong value if you do bad reference lap, inlap or outlap."
    },
    {"group_id": "pit", "param" : ["pit", "conso_moy"], "texte": "Average consumption in liters or kWh/lap (this value is recalculated every lap) ", "val_type": "float", "step": 0.001, "long": 5, "elt_type": "input", "endgroup": 1,
        "texte2": "You don't need to edit this value. However, it can be useful when you are spotting to help JRT estimating the amount of fuel left in the tank of your teammate. When you change this value," +
        "the 'estimated laps' value is immediately updated, but you have to wait the end of the lap to get the correct 'laps remaining' and 'fuel to add' values."
    },

    {"group_id": "pit", "param" : ["pit", "fuel_in_tank_manual"], "texte": "Fuel in the tank manual value (in Liters, L or kWh)", "val_type": "float", "step": 0.001, "long": 6, "elt_type": "input_fuel_in_tank_manual", "newgroup": 1,
        "texte2": "Change this value when your team mate is driving to have the correct fuel calculations.<br>" +
        "You can also adjust the average consumption used above. It will be taken into account even if your calculation mode is on MAX, 1L or Set.<br>" +
        "Click on the apply button below to validate it.<br>" +
        "If you don't validate it, you can use this as a simple conversion calculator."
    },
    {"group_id": "pit", "param" : ["pit", "fuel_in_tank_manual_ga"], "texte": "Fuel in the tank manual value (in Gallons, Ga)", "val_type": "float", "step": 0.001, "long": 6, "elt_type": "input_fuel_in_tank_manual_ga"},
    {"group_id": "pit", "param" : ["pit", "fuel_in_tank_manual_kg"], "texte": "Fuel in the tank manual value (in Kilograms, Kg)", "val_type": "float", "step": 0.001, "long": 6, "elt_type": "input_fuel_in_tank_manual_kg"},
    {"group_id": "pit", "param" : ["pit", "fuel_in_tank_manual_lb"], "texte": "Fuel in the tank manual value (in Pounds, Lb)", "val_type": "float", "step": 0.001, "long": 6, "elt_type": "input_fuel_in_tank_manual_lb", "endgroup": 1},


    {"group_id": "broadcast", "param" : ["broadcast", "broadcast_mode"], "texte": {titre: "Broadcast", options: ["Mode 0", "Mode 1", "Mode 2", "Mode 3"]}, "val_type": "int", "elt_type": "select", "newgroup": 1, "color_cycle_num": 0,
        "texte2": "- <b>0</b> : no broadcast.<br>" +
        "- <b>1</b> : use your iRacing computer as a web server (NOTE : you must restart the JRT server after selecting this mode).<br>" +
        "- <b>2</b> : use an external web server.<br>" +
        "- <b>3</b> : like mode 2 but it shares the data only if you are driving and you receive the data of the driver if he runs JRT with the same broadcast parameters."
    },
    {"group_id": "broadcast", "param" : ["broadcast", "broadcast_pause"], "texte": "Pause (milliseconds)", "val_type": "int", "step": 1000, "long": 5, "elt_type": "input",
        "texte2": "Specify the time between data updates.<br>" +
        "It's not recommended to use values under 5000 because your web server may not support it and will block the data transfer requests.<br>"
    },
    {"group_id": "broadcast", "param" : ["broadcast", "post_adress"], "texte": "post.php address", "val_type": "str", "long": 30, "elt_type": "input",
        "texte2": "If that's not working, check if you don't have to use https instead of http."
    },
    {"group_id": "broadcast", "param" : ["broadcast", "password"], "texte": "password", "val_type": "str", "long": 30, "elt_type": "input", "endgroup": 1},

    /*{"group_id": "broadcast", "param" : null, "texte": {"margin-top": 0, "margin-bottom": 0, "content": ""}, "elt_type": "text"},*/
    {"group_id": "broadcast", "param" : ["broadcast", "log_broadcast"], "texte": "Broadcast logging", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": "broadcast", "param" : ["broadcast", "log_post_adress"], "texte": "log_post.php address", "val_type": "str", "long": 30, "elt_type": "input"},
    {"group_id": "broadcast", "param" : ["broadcast", "log_password"], "texte": "log_password", "val_type": "str", "long": 30, "elt_type": "input", "endgroup": 1},

    {"group_id": null, "param" : null, "texte": "", "val_type": "", "elt_type": "timing_columns"},

    {"group_id": "overlays_general", "param" : ["general", "overlays_hardware_accel"], "texte": "Use hardware acceleration", "val_type": "int", "elt_type": "switch", "newgroup": 1,
        "texte2": "If you have some stutters because of the overlays, try to change this setting. You'll need to restart the overlays after the change and save."
    },
    {"group_id": "overlays_general", "param" : ["general", "overlays_autostart"], "texte": "Start automatically the JRT overlays when it's ready", "val_type": "int", "elt_type": "switch", "endgroup": 1,
        "texte2": "When activated, the JRT overlays will start automatically with the JRT server, and will restart automatically when you activate/deactivate a new overlay window and click on the SAVE button."
    },

    {"group_id": "overlays_general", "param" : ["general", "drag_overlays"], "texte": "Make overlays windows movable", "val_type": "int", "elt_type": "switch", "newgroup": 1,
        "texte2": "This option will help you to move and to resize the overlays by highlighting them and deactivating if needed the 'click through the overlays' option.<br>The X position,Y position, Width and Height values will be updated while moving the overlays.<br>Once you have placed the overlays, you will have to click on the SAVE button to memorize the new positions."
    },
    {"group_id": "overlays_general", "param" : ["general", "drag_overlays_button"], "texte": "Switch to movable overlays / SAVE", "val_type": "int", "elt_type": "set_button", "endgroup": 1,
        "texte2": "When you press the button to set the 'Make overlays windows movalbe' option to OFF, the JRT settings will be saved automatically so you don't have to go in JRT Config and to press the SAVE button."
    },

    /* -----------------------------------------------------------------------------------------------------------------------------------------*/

    /*
    {"group_id": "group101", "param" : ["dashboard", "nb_displays"], "texte": "Nb displays : ", "val_type": "int", "elt_type": "info"},
    {"group_id": "group101", "param" : ["trackmap", "fps_trackmap"], "texte": "trackmap refresh rate : ", "val_type": "float", "step": 1, "long": 3, "elt_type": "input"},
    {"group_id": "group101", "param" : ["timing4", "fps"], "texte": "timing4 refresh rate : ", "val_type": "float", "step": 1, "long": 3, "elt_type": "input"},
    {"group_id": "group101", "param" : ["timing4", "set_title", "name"], "texte": "name title : ", "val_type": "str", "elt_type": "input"},
    {"group_id": "group101", "param" : ["timing4", "responsive"], "texte": "timing4, Responsive : ", "val_type": "int", "elt_type": "switch"},
    {"group_id": "group101", "param" : ["timing4", "ligne_h"], "texte": "timing4, Absolute / Relative line height : ", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"group_id": "group101", "param" : ["calculator", "responsive"], "texte": "calculator, Responsive : ", "val_type": "int", "elt_type": "switch"},
    {"group_id": "group101", "param" : ["calculator", "ligne_h"], "texte": "calculator, Absolute / Relative line height : ", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"group_id": "group101", "param" : ["dashboard", "advanced", "display_selected"], "texte": "Display selected : ", "val_type": "int", "elt_type": "info"},
    */
];


// Options general / trackmap et overlay pour les pages de timing
for (var page in list_timing_pages) {
    menu_elements.push(

        {"group_id": page + "_import_export", "param" : [page], "elt_type": "import_export"},

        {"group_id": page + "_general", "param" : null, "texte": "URL", "page_name": page, "elt_type": "page_link", "newgroup": 1, "endgroup": 1, "color_cycle_num": 4,
            "texte2": "Url to enter in a browser on your iRacing computer or on your external device to access to this JRT page."
        },

        {"group_id": page + "_general", "param" : [page, "fps"], "texte": "Refresh Rate (FPS)", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "newgroup": 1, "color_cycle_num": 0,
            "texte2": "How many times per seconds you want the data to be updated. Higher the value is, higher the CPU will consume."
        },
        {"group_id": page + "_general", "param" : [page, "fps_broadcast"], "texte": "Broadcast Rate", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "endgroup": 1,
            "texte2": "Used only for the broadcast mode 1."
        },

        {"group_id": page + "_general", "param" : [page, "use_css_perso"], "texte": "Use the " + page + "_perso.css file", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1,
            "texte2": "This file is located in the 'My Documents/Joel Real Timing/css' folder.<br>" +
            "If you edited this file, you will have to restart the JRT server and to reload the page for the changes to take effect.<br>" +
            "NOTE : When you deactivate this option, the page is automatically reloaded to ignore the css perso settings."
        },

        {"group_id": page + "_general", "param" : [page, "reload_on_dblclick"], "texte": "Reload the timing page when double click anywhere on it", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1 },

        {"group_id": page + "_general", "param" : [page, "responsive"], "texte": "Responsive Mode", "val_type": "int", "elt_type": "switch", "newgroup": 1,
            "texte2": "With this option ON, the font size is proportional to the window width divided by the width reference."
        },
        {"group_id": page + "_general", "param" : [page, "reference_w_auto"], "texte": "Automatic Width Reference", "val_type": "int", "elt_type": "switch",
            "texte2": "With this option, the width reference will be set to the sum of widths of the selected columns.<br>" +
            "This way, the timing with responsive mode activated will look the same than when responsive mode is deactivated but it will be zoomed so the columns will fill the window.<br>"
        },
        {"group_id": page + "_general", "param" : [page, "reference_w"], "texte": "Width Reference", "val_type": "int", "step": 1, "long": 5, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "ligne_h"], "texte": "Line Height", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "transparency_OBS"], "texte": "Transparent background", "val_type": "int", "elt_type": "switch",
            "texte2": "Useful if you display the timing page as an overlay."
        },
        {"group_id": page + "_general", "param" : [page, "background_color"], "texte": "Background Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "transparence_lignes"], "texte": "Lines transparency coefficient", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input",
            "texte2" : "Enter a value between 0 and 1."
        },
        {"group_id": page + "_general", "param" : [page, "show_cars_stopped_darker"], "texte": "Make the line darker when the car is stopped", "val_type": "int", "elt_type": "switch" },
        {"group_id": page + "_general", "param" : [page, "show_name_orange_inpits"], "texte": "Change the name color to orange when the driver is in the pit lane", "val_type": "int", "elt_type": "switch" },
        {"group_id": page + "_general", "param" : [page, "show_name_bleu_red_not_samelap"], "texte": "Change the name color to red/blue when the driver is not in the same lap", "val_type": "int", "elt_type": "switch" },
        {"group_id": page + "_general", "param" : [page, "show_colorized_drivers"], "texte": "Show the colorized drivers", "val_type": "int", "elt_type": "switch",
            "texte2": "When this option is activated, you can colorize the drivers lines using the 'Colorize Drivers' menu."
        },
        {"group_id": page + "_general", "param" : [page, "show_name_selected_orange"], "texte": "Change the name color to the color definied below for the driver that has the focus", "val_type": "int", "elt_type": "switch" },
        {"group_id": page + "_general", "param" : [page, "show_name_selected_color"], "texte": "Name color for the driver that has the focus", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "fond_blanc"],  "texte": {titre: "White background Mode", options: ["0: Default", "1: Always", "2: Never except the selected driver", "3: Never"]}, "val_type": "int", "elt_type": "select", "endgroup": 1,
            "texte2": "'Default' : the background goes white when the driver finishes the race.<br>" +
            "'Always' : the background will stay white for all the drivers even before the end of the race.<br>" +
            "'Never except the selected driver' : the background will never be white, except for the selected driver.<br>" +
            "'Never' : the background will never be white, even for the selected driver."
        },

        {"group_id": page + "_general", "param" : [page, "selected_driver_mode"], "texte": {titre: "Selected Driver Mode", options: ["0: Disabled", "1: Selected by the user", "2: Auto-select the focused car"]}, "val_type": "int", "elt_type": "select", "newgroup": 1,
            "texte2": "With the modes 1 or 2, the selected driver is highlighted in white.<br>" +
            "With mode 1, double click on a name to select the driver."
        },
        {"group_id": page + "_general", "param" : [page, "focus_replay_delay"], "texte": "Focus on click delay (ms)", "val_type": "int", "step": 1, "long": 5, "elt_type": "input",
            "texte2": "When you click and hold on a driver name for the above time, iRacing will focus on him.<br>" +
            "Set to 0 to have instant focus by a simple click."
        },
        {"group_id": page + "_general", "param" : [page, "autoscroll"], "texte": "Autoscroll for the selected driver", "val_type": "int", "elt_type": "switch",
            "texte2": "It works only if the 'Selected Driver Mode' is set to 1 or 2."
        },
        {"group_id": page + "_general", "param" : [page, "autoscroll_mode"], "texte": {titre: "Autoscroll Mode : ",
            options: [
                "",
                "1: Center vertically the selected driver (and move to the top so there is no empty space)",
                "2: Move the selected driver to the bottom (and move to the top so there is no empty space)",
                "3: Center vertically the selected driver (even if there is empty space at the top)",
            ]}, "val_type": "int", "elt_type": "select"},
        {"group_id": page + "_general", "param" : [page, "toggle_autoscroll"], "texte": "Toggle Autoscroll", "val_type": "int", "elt_type": "set_button",
            "texte2": "With this button you can activate/deactivate the autoscroll option with a button."
        },
        {"group_id": page + "_general", "param" : [page, "autoscroll_off_when_notincar"], "texte": "Automatically turns off the autoscroll when you are not in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1 },

        {"group_id": page + "_general", "param" : [page, "banner_height"], "texte": "Banner Height", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1,
            "texte2": "The banner displays basic infos on the iRacing session. Set to 0 if you don't want to display it."
        },
        {"group_id": page + "_general", "param" : [page, "banner_mode"], "texte": {titre: "Banner Mode", options: ["0: Use the logo below", "1: Use the iRacing Serie logo", "2: No logo"]}, "val_type": "int", "elt_type": "select"},
        {"group_id": page + "_general", "param" : [page, "banner_logo"], "texte": "Banner Logo Relative Path", "val_type": "str", "long": 30, "elt_type": "input",
            "texte2": "Just specify here the relative path from the 'My Documents/Joel Real Timing/skins' folder.<br>You may need to restart the JRT server for the changes to take effect."
        },
        {"group_id": page + "_general", "param" : [page, "banner_background"], "texte": "Banner Background Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "banner_color"], "texte": "Banner Text Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "banner_live_disp"], "texte": "Display the live status (online/offline) on the top right of the banner", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "disp_sofbar"], "texte": "Display a little SOF bar", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "sofbar_h"], "texte": "SOF Bar Height", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "disp_events_ticker"], "texte": "Display the Events Ticker", "val_type": "int", "elt_type": "switch", "newgroup": 1,
            "texte2": "Specify if you want to display a ticker at the top of the page with live informations on the drivers."
        },
        {"group_id": page + "_general", "param" : [page, "events_ticker_height"], "texte": "Events Ticker Height", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "events_ticker_font_coef"], "texte": "Events Ticker Font Size Coef", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "events_ticker_disp_pits"], "texte": "Display the <span style='color: #ff8800'>Pit Entry/Exit</span> events in the Ticker", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "events_ticker_disp_pits_me"], "texte": "Display the <span style='color: #ff8800'>Pit Entry/Exit</span> events for the selected driver in the Ticker", "val_type": "int", "elt_type": "switch",
            "texte2": "If the selected driver changes, you will have to reload the timing page to see the old events for the selected driver."
        },
        {"group_id": page + "_general", "param" : [page, "events_ticker_disp_newbest"], "texte": "Display the <span style='color: #ff66ff'>New Best Laptime</span> events in the Events Ticker", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "events_ticker_disp_newleader"], "texte": "Display the <span style='color: #dddddd'>New Leader</span> events in the Events Ticker", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "events_ticker_disp_driverswap"], "texte": "Display the <span style='color: #dddddd'>Driver Swap</span> events in the Events Ticker", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "events_ticker_disp_driverswap_me"], "texte": "Display the <span style='color: #dddddd'>Driver Swap</span> events  for the selected driver in the Events Ticker", "val_type": "int", "elt_type": "switch",
            "texte2": "If the selected driver changes, you will have to reload the timing page to see the old events for the selected driver."
        },
        {"group_id": page + "_general", "param" : [page, "events_ticker_disp_overtake"], "texte": "Display the <span style='color: #dddddd'>Overtake</span> events in the Events Ticker", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "events_ticker_disp_overtake_me"], "texte": "Display the <span style='color: #dddddd'>Overtake</span> events for the selected driver in the Events Ticker", "val_type": "int", "elt_type": "switch",
            "texte2": "If the selected driver changes, you will have to reload the timing page to see the old events for the selected driver."
        },
        {"group_id": page + "_general", "param" : [page, "events_ticker_disp_flags"], "texte": "Display the <span style='color: #ffff00'>Flag</span> events in the Events Ticker", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "events_ticker_disp_incidents_me"], "texte": "Display the <span style='color: #00b300'>My Incidents</span> events in the Events Ticker", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "events_ticker_disp_three_wide"], "texte": "Display the <span style='color: #00bbff'>3-wides</span> events in the Events Ticker", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "events_ticker_disp_custom"], "texte": "Display the <span style='color: #ff0000'>Custom</span> events in the Events Ticker", "val_type": "int", "elt_type": "switch",
            "texte2": "Custom events are set by clicking on the <div class='button_text2'>Add a Custom event</div> button. See the 'General Buttons' menu to set it."
        },
        {"group_id": page + "_general", "param" : [page, "disable_all_events"], "texte": "Disable all events", "val_type": "int", "elt_type": "switch", "endgroup": 1,
            "texte2": "Set it to ON will disable all the events, the laptime history and the avg columns.<br>It will use less bandwitch and can help if you have performance issues."
        },

        {"group_id": page + "_general", "param" : [page, "disp_infosbar"], "texte": {titre: "Infos Bar Mode", options: ["0: Disabled", "1: Display on One line", "2: Display on Two lines"]}, "val_type": "int", "elt_type": "select", "newgroup": 1,
            "texte2": "The infos bar displays the time and the laps remaining, the fuel infos, the SOF and the tires buttons."
        },
        {"group_id": page + "_general", "param" : [page, "infosbar_coef"], "texte": "Infos Bar Coef", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input",
            "texte2": "Increase this value if you want to increase the font size."
        },
        {"group_id": page + "_general", "param" : [page, "temperature_mode"], "texte": {titre: "Temperatures Unit", options: ["0: Auto", "1: Celsius", "2: Fahrenheit"]}, "val_type": "int", "elt_type": "select"},
        {"group_id": page + "_general", "param" : [page, "estlaps_decimal"], "texte": {titre: "Number of decimals for the estimated laps value", options: ["No decimals", "1 decimal", "2 decimals", "3 decimals"]}, "val_type": "int", "elt_type": "select"},
        {"group_id": page + "_general", "param" : [page, "lapsremain_decimal"], "texte": {titre: "Number of decimals for the remaining laps value", options: ["No decimals", "1 decimal", "2 decimals", "3 decimals"]}, "val_type": "int", "elt_type": "select"},
        {"group_id": page + "_general", "param" : [page, "sessioninfos_height"], "texte": "Weather Infos Relative Height", "val_type": "int", "step": 1, "long": 4, "elt_type": "input",
            "texte2": "Set to 0 if you don't want to display it."
        },
        {"group_id": page + "_general", "param" : [page, "disp_fuelinfos"], "texte": "Display the Fuel Infos", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "disp_conso_bigger"], "texte": "Display the consumption bigger between the tank and the est. laps", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "tires_buttons"], "texte": "Display the Tires Buttons", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "jrt_logo_disp"], "texte": "Display the JRT logo", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "class_selected"], "texte": {titre: "Filter by class", options: ["All classes", "My class", "1st class", "2nd class", "3rd class", "4th class", "5th class"]}, "val_type": "int", "elt_type": "select", "newgroup": 1, "endgroup":1},

        {"group_id": page + "_general", "param" : [page, "disp_titres"], "texte": "Display the columns titles", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "deltagraph_for_all"], "texte": "Delta Graphic for all", "val_type": "int", "elt_type": "switch",
            "texte2": "Uncheck if you want to show the deltagraph only for the cars in the same class."
        },
        {"group_id": page + "_general", "param" : [page, "f3_box"], "texte": "Display the Relatives (F3 Box Mode) instead of the Standings", "val_type": "int", "elt_type": "switch",
            "texte2": "When this option is ON, the standings will be replaced by the relative positions on the track, and your car will be centered vertically.<br>" +
            "The options 'Group by class', 'Force a number of leading cars to be displayed' and 'Reverse the standing so the leader will be displayed at the bottom' will be ignored.<br>" +
            "NOTE : It's not possible to display only the cars in the same class with this mode so you have to set the 'Filter by class' option to 'All classes' for this mode to work."
        },
        {"group_id": page + "_general", "param" : [page, "toggle_f3_box"], "texte": "Toggle the timing from Standard to Relatives (F3 Box Mode)", "val_type": "int", "elt_type": "set_button"},
        /*{"group_id": page + "_general", "param" : [page, "animation"], "texte": "Animations", "val_type": "int", "elt_type": "switch",
            "texte2": "When this options is ON, it activates animations when there is position changes.<br>" +
            "It is recommended to deactivate it if you have performance issues."
        },*/
        {"group_id": page + "_general", "param" : [page, "position_change_animation"], "texte": "Positions change animations", "val_type": "int", "elt_type": "switch",
            "texte2": "When this options is ON, it activates animations when there is position changes.<br>" +
            "It is recommended to deactivate it if you have performance issues."
        },
        {"group_id": page + "_general", "param" : [page, "best_last_animation"], "texte": "Best/Last lap time animations", "val_type": "int", "elt_type": "switch",
            "texte2": "When this options is ON, it activates animations for the last and best lap time columns when there is a new best or last lap.<br>" +
            "It is recommended to deactivate it if you have performance issues."
        },
        {"group_id": page + "_general", "param" : [page, "disp_gapcolors"], "texte": "Display Gap Colors", "val_type": "int", "elt_type": "switch",
            "texte2": "The colors change depending of the gap evolution. Deactivate this option to display the gaps in white and have a better contrast."
        },
        {"group_id": page + "_general", "param" : [page, "display_virtual_winner"], "texte": "Add an asterisk before the virtual winner name", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "disp_scrollbar"], "texte": "Display the Scroll Bar", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "sf_line_disp"], "texte": "Display the double yellow line under the latest driver that passed the start/finish line", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "auto_hide_cpos_scpos"], "texte": "Automatically hide the cpos and scpos columns when there is only one classe in the session", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "wind_alert"], "texte": "Display Wind Alert", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1,
            "texte2": "Specify if you want to display an Alert when the wind direction and/or speed changes."
        },

        /*{"group_id": page + "_general", "param" : null, "texte": {"margin-top": 0, "margin-bottom": 0, "content": ""}, "elt_type": "text"},*/

        {"group_id": page + "_general", "param" : [page, "pack_disp"], "texte": "Highlight Groups of cars", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "pack_gap"], "texte": "Gap between cars to make a group (in seconds)", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "pack_color"], "texte": "Color for the groups of cars", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "pack_transparency"], "texte": "Transparency for the groups of cars", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "endgroup": 1},


        {"group_id": page + "_general", "param" : [page, "group_by_class"], "texte": "Group by class", "val_type": "int", "elt_type": "switch", "newgroup": 1,
            "texte2": "This option will be ignored if you are displaying the relatives (f3 box mode)."
        },
        {"group_id": page + "_general", "param" : [page, "group_by_class_nb_drivers_max_me"], "texte": "Maximum number of drivers in your own class to display", "val_type": "int", "step": 1, "long": 4, "elt_type": "input",
            "texte2": "Set it to 0 for unlimited.<br><br>" +
            "Note that if you are a spectator, your own class is determined by the car selected when connecting to the server. But you can change that by activating the <b>'Set your own class to be the class of the car selected on the timing'</b> option below.<br><br>" +
            "You have also the possibility to determine your own class by adding the myownclassid parameter in the timing page url, for example http://127.0.0.1:8000/timing.html?myownclassid=2"
        },
        {"group_id": page + "_general", "param" : [page, "group_by_class_my_own_class_is_selected"], "texte": "Set your own class to be the class of the car selected on the timing", "val_type": "int", "elt_type": "switch",
            "texte2": "If there is no car selected on the timing, it will take the car focused in iRacing."
        },
        {"group_id": page + "_general", "param" : [page, "group_by_class_nb_drivers_max_others"], "texte": "Maximum number of drivers in the others classes to display", "val_type": "int", "step": 1, "long": 4, "elt_type": "input",
            "texte2": "Set it to 0 for unlimited."
        },
        {"group_id": page + "_general", "param" : [page, "group_by_class_nb_lines_max_total"], "texte": "Maximum number of lines", "val_type": "int", "step": 1, "long": 4, "elt_type": "input",
            "texte2": "It includes the class headers if displayed.<br>" +
            "Set it to 0 to use the number of lines available on the page depending of the window height.<br>" +
            "Set it to -1 to display all the lines."
        },
        {"group_id": page + "_general", "param" : [page, "group_by_class_disp_header"], "texte": "Display an header for each class", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "group_by_class_header_color_mode"], "texte": {titre: "Class header color mode",
            options: [
                "0: Auto mode 1",
                "1: Auto mode 2",
                "2: Semi-Auto mode 1",
                "3: Semi-Auto mode 2",
                "4: Manual"]
            },
            "val_type": "int", "elt_type": "select",
            "texte2": "- Auto mode 1 : the background color is the class color and the text color is automatic.<br>" +
            "- Auto mode 2 : the text color is the class color and the background color is automatic.<br>" +
            "- Semi-auto mode 1 : the background color is the class color and the text color is the selected text color below.<br>" +
            "- Semi-auto mode 2 : the text color is the class color and the background color is the selected background color below.<br>" +
            "- Manual : The background and the text colors are the colors selected below."
        },
        {"group_id": page + "_general", "param" : [page, "group_by_class_header_bg_color"], "texte": "Class header background color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "group_by_class_header_text_color"], "texte": "Class header text color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "group_by_class_header_bg_transparency"], "texte": "Transparency for the class header background", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "group_by_class_margin_between_classes"], "texte": "Margin between the classes", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "endgroup": 1,
            "texte2": "Enter a number of lines. It can be a decimal number, for example 0.3."
        },

        {"group_id": page + "_general", "param" : [page, "group_nb_leading_cars"], "texte": "Force a number of leading cars to be displayed", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1,
            "texte2": "A dividing line will be displayed if there is a jump in the standing.<br>" +
            "This option will be ignored if you are displaying the relatives (f3 box mode)."
        },
        {"group_id": page + "_general", "param" : [page, "group_nb_leading_cars_line_coef"], "texte": "Dividing line thickness coefficient", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "group_nb_leading_cars_line_color_mode"], "texte": {titre: "Dividing line color mode",
            options: [
                "0: Auto",
                "1: Manual"]
            },
            "val_type": "int", "elt_type": "select",
            "texte2": "- Auto : The color is the class color.<br>" +
            "- Manual : The color selected below."
        },
        {"group_id": page + "_general", "param" : [page, "group_nb_leading_cars_line_color"], "texte": "Dividing line color", "val_type": "str", "long":5, "elt_type": "input_color", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "group_defile_others"], "texte": "Rotate the standing automatically", "val_type": "int", "elt_type": "switch", "newgroup": 1,
            "texte2": "You can set the delay for the rotation below."
        },
        {"group_id": page + "_general", "param" : [page, "group_defile_interval"], "texte": "Delay in seconds for the standing rotation", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1 },

        {"group_id": page + "_general", "param" : [page, "group_reverse_mode"], "texte": "Reverse the standing so the leader will be displayed at the bottom", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1,
            "texte2": "This option will be ignored if you are displaying the relatives (f3 box mode)."
        },

        {"group_id": page + "_general", "param" : [page, "clock_disp"], "texte": "Display a clock in overlay at the top right of the page", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "disp_menu"], "texte": "Display the Menu at the bottom", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "drag_enable"], "texte": "Center zone draggable for the overlay", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "fullscreen_button"], "texte": "Fullscreen button", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "fullscreen_button_timeout"], "texte": "Fullscreen button timeout(in seconds)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_trackmap", "param" : [page, "trackmap_disp_mode"], "texte": {titre: "Display Mode", options: ["0: Normal", "1: Car Number", "2: First 3 letters of the name", "3: Car Position"]}, "val_type": "int", "elt_type": "select", "newgroup": 1, "endgroup": 1, "color_cycle_num": 0},

        {"group_id": page + "_trackmap", "param" : [page, "trackmap_font_family"], "texte": "Font Family", "val_type": "str", "elt_type": "input", "long": 30, "newgroup": 1, "endgroup": 1,
            "texte2": "You can enter the font name if you have installed it on windows.<br>You can also enter the file name of your own font file. Before that, you need to copy the file in the 'My&nbsp;Documents/Joel&nbsp;Real&nbsp;Timing/displays_fonts/' folder," +
            " to restart the JRT server and to reload the trackmap page.<br>" +
            "Note, that only otf, ttf and woff formats are working (the default value is Arial)."
        },

        {"group_id": page + "_trackmap", "param" : [page, "trackmap_circular"], "texte": "Make the trackmap circular", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_circular_angle"], "texte": "Circular Trackmap Orientation value in degrees ", "val_type": "float", "step": 1, "long": 5, "elt_type": "input"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_circular_reverse"], "texte": "Change the direction of rotation", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_circular_centered_on_driver"], "texte": "Keep the focused car in the same place on the trackmap", "val_type": "int", "elt_type": "switch", "endgroup": 1,
            "texte2": "With this option ON, you will see the other cars moving around you.<br>" +
            "The north arrow and the wind arrow will be hidden."
        },

        {"group_id": page + "_trackmap", "param" : [page, "trackmap_thickness_coef"], "texte": "Track Thickness Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_color"], "texte": "Track Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_outline_disp"], "texte": "Display an Outline around the track", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_outline_coef"], "texte": "Track Outline Thickness Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_outline_color"], "texte": "Track Outline Color", "val_type": "str", "long":5, "elt_type": "input_color", "endgroup": 1},

        {"group_id": page + "_trackmap", "param" : [page, "trackmap_disp_turns"], "texte": "Display the turns infos", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_turn_distance_coef"], "texte": "Turn infos distance Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_turn_num_color"], "texte": "Turn # Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_turn_num_coef"], "texte": "Turn # font size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_turn_info_color"], "texte": "Turn name Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_turn_info_coef"], "texte": "Turn name font size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_trackmap", "param" : [page, "trackmap_bg_color"], "texte": "Background Color", "val_type": "str", "long":5, "elt_type": "input_color", "newgroup": 1},
        {"group_id": page + "_trackmap", "param" : [page, "transparence_fond_trackmap"], "texte": "Background Transparency Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input",
            "texte2": "Put 0 to have full transparency and 1 to have full opacity."
        },
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_bg_img"], "texte": "Display the background image", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_disp_logo"], "texte": "Display the Track Logo", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_trackmap", "param" : [page, "trackmap_start_finish_line_disp"], "texte": "Display the Start/Finsih line", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_start_finish_color"], "texte": "Start/Finish line Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_start_finish_line_thickness_coef"], "texte": "Start/Finish line Thickness Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_start_finish_line_length_coef"], "texte": "Start/Finish line Length Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_start_finish_arrow_disp"], "texte": "Display the Start/Finsih arrow", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_start_finish_arrow_color"], "texte": "Start/Finish arrow Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_start_finish_arrow_thickness_coef"], "texte": "Start/Finish arrow Thickness Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_start_finish_arrow_length_coef"], "texte": "Start/Finish arrow Length Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_start_finish_arrow_distance_coef"], "texte": "Start/Finish arrow Distance Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_coef"], "texte": "Car Size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_color_auto"], "texte": "Automatic Car Color", "val_type": "int", "elt_type": "switch",
            "texte2": "Deactivate it if you want to specify the car color below."
        },
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_color"], "texte": "Car Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_color_transparency"], "texte": "Car Color Transparency Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input",
            "texte2": "Put 0 to have full transparency and 1 to have full opacity."
        },
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_carnum_coef"], "texte": "Car Font Size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_font_color_auto"], "texte": "Automatic Car Font Color", "val_type": "int", "elt_type": "switch",
            "texte2": "Deactivate it if you want to specify the car font color below."
        },
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_font_color"], "texte": "Car Font Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_border_disp"], "texte": "Display an Outline around the cars", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_border_color"], "texte": "Car Outline Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_border_coef"], "texte": "Car Outline Thickness Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input","endgroup": 1},


        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_me_specify"], "texte": "Specify different settings for the Car Selected", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_me_coef"], "texte": "Car Selected Size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_me_color_auto"], "texte": "Automatic Car Selected Color", "val_type": "int", "elt_type": "switch",
            "texte2": "Deactivate it if you want to specify the car color below."
        },
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_me_color"], "texte": "Car Selected Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_carnum_me_coef"], "texte": "Car Selected Font Size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_me_font_color_auto"], "texte": "Automatic Car Selected Font Color", "val_type": "int", "elt_type": "switch",
            "texte2": "Deactivate it if you want to specify the car font color below."
        },
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_me_font_color"], "texte": "Car Selected Font Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_me_border_disp"], "texte": "Display an Outline around the Car Selected", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_me_border_color"], "texte": "Car Selected Outline Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_me_border_coef"], "texte": "Car Selected Outline Thickness Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input","endgroup": 1},


        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_myclass_only"], "texte": "Display only the cars in my class", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_inpits_disp"], "texte": "Display the cars in the pitlane", "val_type": "int", "elt_type": "switch",
            "texte2": "The car selected will stay visible."
        },
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_disp_predicted"], "texte": "Display the predicted position after the pit stop (orange circle)", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_ring_selected"], "texte": "Display a white ring around the car selected or the focused car", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_ring_colorized"], "texte": "Display a ring around the cars colorized in the timing", "val_type": "int", "elt_type": "switch" },
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_ring_yellow"], "texte": "Display a yellow ring around the cars that are stopped on the track", "val_type": "int", "elt_type": "switch" },
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_ring_lapper"], "texte": "Display a little ring blue or red to indicate cars not being in the same lap", "val_type": "int", "elt_type": "switch" },
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_black_dot"], "texte": "Display a black dot on the cars that pitted more than 1 lap after the selected driver", "val_type": "int", "elt_type": "switch", },
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_P1"], "texte": "Display the P1 label", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_car_P1_myclass_only"], "texte": "Display the P1 label only for my class", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_trackmap", "param" : [page, "trackmap_disp_timelost"], "texte": "Display the Time Lost in Pits", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_plost_coef"], "texte": "Time Lost in Pits font size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_disp_north"], "texte": "Display the North Arrow", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_north_coef"], "texte": "North Arrow size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_disp_wind"], "texte": "Display the Wind Arrow", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_winddir_coef"], "texte": "Wind Arrow size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_disp_weather_infos"], "texte": "Display the Weather Infos", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_trackmap", "param" : [page, "trackmap_weather_info_coef"], "texte": "Weather Infos font size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_trackmap", "param" : [page, "disp_timing_under_trackmap"], "texte": "Display the Timing under the Trackmap", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_trackmap", "param" : [page, "timing_trackmap_leftmargin"], "texte": "Left Margin", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_overlay", "param" : ["overlays", page], "texte": "Add this page to the overlays", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1, "color_cycle_num": 0},

        {"group_id": page + "_overlay", "param" : [page, "window_topmost"], "texte": "Always on top", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_overlay", "param" : [page, "window_parent_name"], "texte": {titre: "Specify if you want another overlay to be displayed under this one", options: ["None", "timing", "timing2", "timing3", "timing4", "timing_broadcast", "dashboard", "dashboard2", "trackmap", "trackmap2", "trackmap_3d", "calculator", "compteur", "spotter", "launcher", "telemetry_inputs"]}, "val_type": "int", "elt_type": "select",
            "texte2": "- If you select an overlay, both overlays will be displayed in the taskbar as a unique window.<br>- If you set auto-hide for the overlay selected, this overlay will also be auto-hidden."
        },
        {"group_id": page + "_overlay", "param" : [page, "window_click_through"], "texte": "Click through the overlay", "val_type": "int", "elt_type": "switch",
            "texte2": "You need to restart the overlays for the changes to take effect."
        },
        /*{"group_id": page + "_overlay", "param" : [page, "auto_hide"], "texte": "Automatically Hide the overlay when you are not in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},*/
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_sim_not_running"], "texte": "Show the overlay when the sim is not running", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_not_incar"], "texte": "Show the overlay when you are not in the car and the sim is running", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_ingarage"], "texte": "Show the overlay when you are in the garage", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_incar"], "texte": "Show the overlay when you are in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_overlay", "param" : [page, "window_x"], "texte": "X position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_overlay", "param" : [page, "window_y"], "texte": "Y position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_overlay", "param" : [page, "window_w"], "texte": "Width", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_overlay", "param" : [page, "window_h"], "texte": "Height", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},
        /*{"group_id": page + "_overlay", "param" : [page, "window_borders"], "texte": "Borders (only if you open the window as a Chrome app)", "val_type": "int", "elt_type": "switch"},*/  // Ne fonctionne plus

        {"group_id": page + "_overlay", "param" : [page, "overlay_hide"], "texte": "Hide/Show the Overlays", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1},

    );
}


// Options general et overlay pour les pages de trackmap 2D
for (var page in list_trackmap_pages) {
    menu_elements.push(
        {"group_id": page + "_import_export", "param" : [page], "elt_type": "import_export"},

        {"group_id": page + "_general", "param" : null, "texte": "URL", "page_name": page, "elt_type": "page_link", "newgroup": 1, "endgroup": 1, "color_cycle_num": 4,
            "texte2": "Url to enter in a browser on your iRacing computer or on your external device to access to this JRT page."
        },

        {"group_id": page + "_general", "param" : [page, "fps_trackmap"], "texte": "Refresh Rate (FPS)", "val_type": "float", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1, "color_cycle_num": 0,
            "texte2": "How many times per seconds you want the data to be updated. Higher the value is, higher the CPU will consume."
        },
        {"group_id": page + "_general", "param" : [page, "fps_broadcast"], "texte": "Broadcast Rate", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "endgroup": 1,
            "texte2": "Used only for the broadcast mode 1."
        },

        {"group_id": page + "_general", "param" : [page, "use_css_perso"], "texte": "Use the " + page + "_perso.css file", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1,
            "texte2": "This file is located in the 'My Documents/Joel Real Timing/css' folder.<br>" +
            "If you edited this file, you will have to restart the JRT server and to reload the page for the changes to take effect.<br>" +
            "NOTE : When you deactivate this option, the page is automatically reloaded to ignore the css perso settings."
        },

        {"group_id": page + "_general", "param" : [page, "trackmap_disp_mode"], "texte": {titre: "Display Mode", options: ["0: Normal", "1: Car Number", "2: First 3 letters of the name", "3: Car Position"]}, "val_type": "int", "elt_type": "select", "newgroup": 1, "endgroup": 1, "color_cycle_num": 0},

        {"group_id": page + "_general", "param" : [page, "trackmap_font_family"], "texte": "Font Family", "val_type": "str", "elt_type": "input", "long": 30, "newgroup": 1, "endgroup": 1,
            "texte2": "You can enter the font name if you have installed it on windows.<br>You can also enter the file name of your own font file. Before that, you need to copy the file in the 'My&nbsp;Documents/Joel&nbsp;Real&nbsp;Timing/displays_fonts/' folder," +
            " to restart the JRT server and to reload the trackmap page.<br>" +
            "Note, that only otf, ttf and woff formats are working (the default value is Arial)."
        },

        {"group_id": page + "_general", "param" : [page, "trackmap_circular"], "texte": "Make the trackmap circular", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_circular_angle"], "texte": "Circular Trackmap Orientation value in degrees ", "val_type": "float", "step": 1, "long": 5, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "trackmap_circular_reverse"], "texte": "Change the direction of rotation", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_circular_centered_on_driver"], "texte": "Keep the focused car in the same place on the trackmap", "val_type": "int", "elt_type": "switch", "endgroup": 1,
            "texte2": "With this option ON, you will see the other cars moving around you.<br>" +
            "The north arrow and the wind arrow will be hidden."
        },

        {"group_id": page + "_general", "param" : [page, "trackmap_thickness_coef"], "texte": "Track Thickness Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_color"], "texte": "Track Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "trackmap_outline_disp"], "texte": "Display an Outline around the track", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_outline_coef"], "texte": "Track Outline Thickness Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "trackmap_outline_color"], "texte": "Track Outline Color", "val_type": "str", "long":5, "elt_type": "input_color", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "trackmap_disp_turns"], "texte": "Display the turns infos", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_turn_distance_coef"], "texte": "Turn infos distance Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "trackmap_turn_num_color"], "texte": "Turn # Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "trackmap_turn_num_coef"], "texte": "Turn # font size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "trackmap_turn_info_color"], "texte": "Turn name Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "trackmap_turn_info_coef"], "texte": "Turn name font size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "trackmap_bg_color"], "texte": "Background Color", "val_type": "str", "long":5, "elt_type": "input_color", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "transparence_fond_trackmap"], "texte": "Background Transparency Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input",
            "texte2": "Put 0 to have full transparency and 1 to have full opacity."
        },
        {"group_id": page + "_general", "param" : [page, "trackmap_bg_img"], "texte": "Display the background image", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_disp_logo"], "texte": "Display the Track Logo", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "trackmap_start_finish_line_disp"], "texte": "Display the Start/Finsih line", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_start_finish_color"], "texte": "Start/Finish line Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "trackmap_start_finish_line_thickness_coef"], "texte": "Start/Finish line Thickness Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "trackmap_start_finish_line_length_coef"], "texte": "Start/Finish line Length Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "trackmap_start_finish_arrow_disp"], "texte": "Display the Start/Finsih arrow", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_start_finish_arrow_color"], "texte": "Start/Finish arrow Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "trackmap_start_finish_arrow_thickness_coef"], "texte": "Start/Finish arrow Thickness Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "trackmap_start_finish_arrow_length_coef"], "texte": "Start/Finish arrow Length Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "trackmap_start_finish_arrow_distance_coef"], "texte": "Start/Finish arrow Distance Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "trackmap_car_coef"], "texte": "Car Size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_color_auto"], "texte": "Automatic Car Color", "val_type": "int", "elt_type": "switch",
            "texte2": "Deactivate it if you want to specify the car color below."
        },
        {"group_id": page + "_general", "param" : [page, "trackmap_car_color"], "texte": "Car Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_color_transparency"], "texte": "Car Color Transparency Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input",
            "texte2": "Put 0 to have full transparency and 1 to have full opacity."
        },
        {"group_id": page + "_general", "param" : [page, "trackmap_carnum_coef"], "texte": "Car Font Size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_font_color_auto"], "texte": "Automatic Car Font Color", "val_type": "int", "elt_type": "switch",
            "texte2": "Deactivate it if you want to specify the car font color below."
        },
        {"group_id": page + "_general", "param" : [page, "trackmap_car_font_color"], "texte": "Car Font Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_border_disp"], "texte": "Display an Outline around the cars", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_border_color"], "texte": "Car Outline Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_border_coef"], "texte": "Car Outline Thickness Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input","endgroup": 1},


        {"group_id": page + "_general", "param" : [page, "trackmap_car_me_specify"], "texte": "Specify different settings for the Car Selected", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_me_coef"], "texte": "Car Selected Size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_me_color_auto"], "texte": "Automatic Car Selected Color", "val_type": "int", "elt_type": "switch",
            "texte2": "Deactivate it if you want to specify the car color below."
        },
        {"group_id": page + "_general", "param" : [page, "trackmap_car_me_color"], "texte": "Car Selected Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "trackmap_carnum_me_coef"], "texte": "Car Selected Font Size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_me_font_color_auto"], "texte": "Automatic Car Selected Font Color", "val_type": "int", "elt_type": "switch",
            "texte2": "Deactivate it if you want to specify the car font color below."
        },
        {"group_id": page + "_general", "param" : [page, "trackmap_car_me_font_color"], "texte": "Car Selected Font Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_me_border_disp"], "texte": "Display an Outline around the Car Selected", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_me_border_color"], "texte": "Car Selected Outline Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_me_border_coef"], "texte": "Car Selected Outline Thickness Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input","endgroup": 1},


        {"group_id": page + "_general", "param" : [page, "trackmap_car_myclass_only"], "texte": "Display only the cars in my class", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_inpits_disp"], "texte": "Display the cars in the pitlane", "val_type": "int", "elt_type": "switch",
            "texte2": "The car selected will stay visible."
        },
        {"group_id": page + "_general", "param" : [page, "trackmap_disp_predicted"], "texte": "Display the predicted position after the pit stop (orange circle)", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "trackmap_car_ring_selected"], "texte": "Display a white ring around the car selected or the focused car", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_ring_colorized"], "texte": "Display a ring around the cars colorized in the timing", "val_type": "int", "elt_type": "switch" },
        {"group_id": page + "_general", "param" : [page, "trackmap_car_ring_yellow"], "texte": "Display a yellow ring around the cars that are stopped on the track", "val_type": "int", "elt_type": "switch" },
        {"group_id": page + "_general", "param" : [page, "trackmap_car_ring_lapper"], "texte": "Display a little ring blue or red to indicate cars not being in the same lap", "val_type": "int", "elt_type": "switch" },
        {"group_id": page + "_general", "param" : [page, "trackmap_car_black_dot"], "texte": "Display a black dot on the cars that pitted more than 1 lap after the selected driver", "val_type": "int", "elt_type": "switch", },
        {"group_id": page + "_general", "param" : [page, "trackmap_car_P1"], "texte": "Display the P1 label", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_P1_myclass_only"], "texte": "Display the P1 label only for my class", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "trackmap_disp_timelost"], "texte": "Display the Time Lost in Pits", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_plost_coef"], "texte": "Time Lost in Pits font size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "trackmap_disp_north"], "texte": "Display the North Arrow", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_north_coef"], "texte": "North Arrow size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "trackmap_disp_wind"], "texte": "Display the Wind Arrow", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_winddir_coef"], "texte": "Wind Arrow size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "trackmap_disp_weather_infos"], "texte": "Display the Weather Infos", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_weather_info_coef"], "texte": "Weather Infos font size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "temperature_mode"], "texte": {titre: "Temperature Units", options: ["0: Auto", "1: Celsius", "2: Fahrenheit"]}, "val_type": "int", "elt_type": "select", "newgroup": 1, "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "drag_enable"], "texte": "Center zone draggable for the overlay", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "fullscreen_button"], "texte": "Fullscreen button", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "fullscreen_button_timeout"], "texte": "Fullscreen button timeout(in seconds)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_overlay", "param" : ["overlays", page], "texte": "Add this page to the overlays", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1, "color_cycle_num": 0},

        {"group_id": page + "_overlay", "param" : [page, "window_topmost"], "texte": "Always on top", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_overlay", "param" : [page, "window_parent_name"], "texte": {titre: "Specify if you want another overlay to be displayed under this one", options: ["None", "timing", "timing2", "timing3", "timing4", "timing_broadcast", "dashboard", "dashboard2", "trackmap", "trackmap2", "trackmap_3d", "calculator", "compteur", "spotter", "launcher", "telemetry_inputs"]}, "val_type": "int", "elt_type": "select",
            "texte2": "- If you select an overlay, both overlays will be displayed in the taskbar as a unique window.<br>- If you set auto-hide for the overlay selected, this overlay will also be auto-hidden."
        },
        {"group_id": page + "_overlay", "param" : [page, "window_click_through"], "texte": "Click through the overlay", "val_type": "int", "elt_type": "switch",
            "texte2": "You need to restart the overlays for the changes to take effect."
        },
        /*{"group_id": page + "_overlay", "param" : [page, "auto_hide"], "texte": "Automatically Hide the overlay when you are not in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},*/
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_sim_not_running"], "texte": "Show the overlay when the sim is not running", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_not_incar"], "texte": "Show the overlay when you are not in the car and the sim is running", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_ingarage"], "texte": "Show the overlay when you are in the garage", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_incar"], "texte": "Show the overlay when you are in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_overlay", "param" : [page, "window_x"], "texte": "X position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_overlay", "param" : [page, "window_y"], "texte": "Y position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_overlay", "param" : [page, "window_w"], "texte": "Width", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_overlay", "param" : [page, "window_h"], "texte": "Height", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

        /*{"group_id": page + "_overlay", "param" : [page, "window_borders"], "texte": "Borders (only if you open the window as a Chrome app)", "val_type": "int", "elt_type": "switch"},*/  // Ne fonctionne plus

        {"group_id": page + "_overlay", "param" : [page, "overlay_hide"], "texte": "Hide/Show the Overlays", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1},

    );
}


// Options general et overlay pour les pages de trackmap en 3D
for (var page in list_trackmap_3d_pages) {
    menu_elements.push(
        {"group_id": page + "_general", "param" : null, "texte": "URL", "page_name": page, "elt_type": "page_link", "newgroup": 1, "endgroup": 1, "color_cycle_num": 4,
            "texte2": "Url to enter in a browser on your iRacing computer or on your external device to access to this JRT page."
        },

        {"group_id": page + "_general", "param" : [page, "fps_trackmap"], "texte": "Refresh Rate (FPS)", "val_type": "float", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1, "color_cycle_num": 0,
            "texte2": "How many times per seconds you want the data to be updated. Higher the value is, higher the CPU will consume."
        },
        {"group_id": page + "_general", "param" : [page, "fps_broadcast"], "texte": "Broadcast Rate", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "endgroup": 1,
            "texte2": "Used only for the broadcast mode 1."
        },

        {"group_id": page + "_general", "param" : [page, "trackmap_disp_mode"], "texte": {titre: "Display Mode", options: ["0: Normal", "1: Car Number", "2: First 3 letters of the name", "3: Car Position"]}, "val_type": "int", "elt_type": "select", "newgroup": 1, "endgroup": 1, "color_cycle_num": 0},

        {"group_id": page + "_general", "param" : [page, "trackmap_thickness_coef"], "texte": "Track Thickness Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_color"], "texte": "Track Color", "val_type": "str", "long":5, "elt_type": "input_color", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "trackmap_disp_turns"], "texte": "Display the turns infos", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_turn_num_coef"], "texte": "Turn # font size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "trackmap_turn_info_coef"], "texte": "Turn name font size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "trackmap_bg_color"], "texte": "Background Color : ", "val_type": "str", "long":5, "elt_type": "input_color", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "transparence_fond_trackmap"], "texte": "Background Transparency Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input",
            "texte2": "Put 0 to have full transparency and 1 to have full opacity."
        },
        {"group_id": page + "_general", "param" : [page, "trackmap_bg_img"], "texte": "Display the background image", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_start_finish_line_disp"], "texte": "Display the Start/Finsih line", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_start_finish_arrow_disp"], "texte": "Display the Start/Finsih arrow", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_start_finish_color"], "texte": "Start/Finish line and arrow Color", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "trackmap_disp_logo"], "texte": "Display the Track Logo", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "trackmap_car_coef"], "texte": "Car Size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_color_auto"], "texte": "Automatic Car Color", "val_type": "int", "elt_type": "switch",
            "texte2": "Deactivate it if you want to specify the car color below."
        },
        {"group_id": page + "_general", "param" : [page, "trackmap_car_color"], "texte": "Car Color", "val_type": "str", "long":5, "elt_type": "input_color", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "trackmap_carnum_coef"], "texte": "Car Font Size Coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_font_color_auto"], "texte": "Automatic Car Font Color", "val_type": "int", "elt_type": "switch",
            "texte2": "Deactivate it if you want to specify the car font color below."
        },
        {"group_id": page + "_general", "param" : [page, "trackmap_car_font_color"], "texte": "Car Font Color", "val_type": "str", "long":5, "elt_type": "input_color", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "trackmap_car_myclass_only"], "texte": "Display only the cars in my class", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_disp_predicted"], "texte": "Display the predicted position after the pit stop (orange circle)", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "trackmap_car_ring_selected"], "texte": "Display a white ring around the car selected or the focused car", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_ring_colorized"], "texte": "Display a ring around the cars colorized in the timing", "val_type": "int", "elt_type": "switch" },
        {"group_id": page + "_general", "param" : [page, "trackmap_car_ring_yellow"], "texte": "Display a yellow ring around the cars that are stopped on the track", "val_type": "int", "elt_type": "switch" },
        {"group_id": page + "_general", "param" : [page, "trackmap_car_ring_lapper"], "texte": "Display a little ring blue or red to indicate cars not being in the same lap", "val_type": "int", "elt_type": "switch" },
        {"group_id": page + "_general", "param" : [page, "trackmap_car_black_dot"], "texte": "Display a black dot on the cars that pitted more than 1 lap after the selected driver", "val_type": "int", "elt_type": "switch", },
        {"group_id": page + "_general", "param" : [page, "trackmap_car_P1"], "texte": "Display the P1 label", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_car_P1_myclass_only"], "texte": "Display the P1 label only for my class", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        /*{"group_id": page + "_general", "param" : [page, "trackmap_disp_timelost"], "texte": "Display the Time Lost in Pits", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "trackmap_disp_north"], "texte": "Display the North Arrow", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_disp_wind"], "texte": "Display the Wind Arrow", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "trackmap_disp_weather_infos"], "texte": "Display the Weather Infos", "val_type": "int", "elt_type": "switch", "endgroup": 1},*/

        {"group_id": page + "_general", "param" : [page, "temperature_mode"], "texte": {titre: "Temperature Units", options: ["0: Auto", "1: Celsius", "2: Fahrenheit"]}, "val_type": "int", "elt_type": "select", "newgroup": 1, "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "drag_enable"], "texte": "Center zone draggable for the overlay", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "fullscreen_button"], "texte": "Fullscreen button", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "fullscreen_button_timeout"], "texte": "Fullscreen button timeout(in seconds)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},


        {"group_id": page + "_3d_options", "param" : [page, "trackmap_camera_fov"], "texte": "Camera Vertical FOV", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_3d_options", "param" : [page, "trackmap_elevation_factor"], "texte": "Elevation Factor", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},
        {"group_id": page + "_3d_options", "param" : [page, "trackmap_banking_factor"], "texte": "Banking Factor", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},
        {"group_id": page + "_3d_options", "param" : [page, "trackmap_lateral_color"], "texte": "Lateral Color : ", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_3d_options", "param" : [page, "trackmap_antialias"], "texte": "Anti-Aliasing", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_overlay", "param" : ["overlays", page], "texte": "Add this page to the overlays", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1, "color_cycle_num": 0},

        {"group_id": page + "_overlay", "param" : [page, "window_topmost"], "texte": "Always on top", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_overlay", "param" : [page, "window_parent_name"], "texte": {titre: "Specify if you want another overlay to be displayed under this one", options: ["None", "timing", "timing2", "timing3", "timing4", "timing_broadcast", "dashboard", "dashboard2", "trackmap", "trackmap2", "trackmap_3d", "calculator", "compteur", "spotter", "launcher", "telemetry_inputs"]}, "val_type": "int", "elt_type": "select",
            "texte2": "- If you select an overlay, both overlays will be displayed in the taskbar as a unique window.<br>- If you set auto-hide for the overlay selected, this overlay will also be auto-hidden."
        },
        {"group_id": page + "_overlay", "param" : [page, "window_click_through"], "texte": "Click through the overlay", "val_type": "int", "elt_type": "switch",
            "texte2": "You need to restart the overlays for the changes to take effect."
        },
        /*{"group_id": page + "_overlay", "param" : [page, "auto_hide"], "texte": "Automatically Hide the overlay when you are not in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},*/
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_sim_not_running"], "texte": "Show the overlay when the sim is not running", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_not_incar"], "texte": "Show the overlay when you are not in the car and the sim is running", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_ingarage"], "texte": "Show the overlay when you are in the garage", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_incar"], "texte": "Show the overlay when you are in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_overlay", "param" : [page, "window_x"], "texte": "X position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_overlay", "param" : [page, "window_y"], "texte": "Y position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_overlay", "param" : [page, "window_w"], "texte": "Width", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_overlay", "param" : [page, "window_h"], "texte": "Height", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

        /*{"group_id": page + "_overlay", "param" : [page, "window_borders"], "texte": "Borders (only if you open the window as a Chrome app)", "val_type": "int", "elt_type": "switch"},*/  // Ne fonctionne plus

        {"group_id": page + "_overlay", "param" : [page, "overlay_hide"], "texte": "Hide/Show the Overlays", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1},

    );
}


// Options general et overlay pour les pages de dashboard
for (var page in list_dashboard_pages) {
    menu_elements.push(
        {"group_id": page + "_import_export", "param" : [page], "elt_type": "import_export"},

        {"group_id": page + "_general", "param" : null, "texte": "URL", "page_name": page, "elt_type": "page_link", "newgroup": 1, "endgroup": 1, "color_cycle_num": 4,
            "texte2": "Url to enter in a browser on your iRacing computer or on your external device to access to this JRT page."
        },

        {"group_id": page + "_general", "param" : [page, "fps_dashboard"], "texte": "Refresh Rate (FPS)", "val_type": "float", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1, "color_cycle_num": 0,
            "texte2": "How many times per seconds you want the data to be updated. Higher the value is, higher the CPU will consume.<br>" +
            "NB: If you change the refresh rate and you are using an USB Display, you will have to restart the JRT server."
        },
        {"group_id": page + "_general", "param" : [page, "fps_broadcast"], "texte": "Broadcast Rate", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "endgroup": 1,
            "texte2": "Used only for the broadcast mode 1."
        },

        /*{"group_id": page + "_general", "param" : [page, "dashboard_ref_w"], "texte": "Width Reference", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1,
        },
        {"group_id": page + "_general", "param" : [page, "dashboard_ref_h"], "texte": "Height Reference", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1,
            "texte2": "These values define a box in pixels where the elements will be put, and this box will be resize to fit the dashboard window. When you activate the lights, it fills this box.<br><br>" +
            "For example, in the default settings, width and height reference are 1280 x 720, so the elements set in the dashboard advanced options are placed in a 1280 x 720 box. " +
            "By default the ratio is 1280 / 720 = 16 / 9 to adpapt most phones or tablets but you can change it if you use the dashboard in a window or as an overlay. "
        },*/

        /*{"group_id": page + "_general", "param" : [page, "transparency_OBS"], "texte": "Transparent background", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1,
            "texte2": "Useful if you want to add a background image or if you display the dashboard page as an overlay."
        },*/

        /*{"group_id": page + "_general", "param" : [page, "advanced", "font-family"], "texte": "CSS Font Family", "val_type": "str", "elt_type": "input", "long": 30, "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "advanced", "font-weight"], "texte": "CSS Font Weight", "val_type": "str", "elt_type": "input", "long": 30},
        {"group_id": page + "_general", "param" : [page, "advanced", "font-style"], "texte": "CSS Font Style", "val_type": "str", "elt_type": "input", "long": 30, "endgroup": 1},*/

        {"group_id": page + "_general", "param" : [page, "use_css_perso"], "texte": "Use the " + page + "_perso.css file", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1,
            "texte2": "This file is located in the 'My Documents/Joel Real Timing/css' folder.<br>" +
            "If you edited this file, you will have to restart the JRT server and to reload the page for the changes to take effect.<br>" +
            "NOTE : When you deactivate this option, the page is automatically reloaded to ignore the css perso settings."
        },



        /*{"group_id": page + "_general", "param" : [page, "advanced", "shiftlight_on"], "texte": "Shift-light (Shift-light, Flags light, pit limiter light, ...)", "val_type": "int", "elt_type": "switch", "newgroup": 1,
            "texte2": "The dashboard is colorized pink when you have to shift up or when the pit limiter is active in the pitlane.<br>" +
            "When there is a flag, it takes the flag color.<br>" +
            "In qualy, if you made an off-track, it turns red to indicate that the lap won't count."
        },*/
        {"group_id": page + "_general", "param" : [page, "advanced", "shiftlight_on"], "texte": "Shift-light", "val_type": "int", "elt_type": "switch", "newgroup": 1,
            "texte2": "The dashboard or a zone is colorized when you reach the RPM limit or when the pit limiter is active.<br>" +
                "You can set the colors and some options below"
        },
        {"group_id": page + "_general", "param" : [page, "advanced", "shiftlight_gear_rpm_speed_on"], "texte": "Change also the RPM, Gear and Speed background color", "val_type": "int", "elt_type": "switch"},

        {"group_id": page + "_general", "param" : [page, "shiftlight_Xpct"], "texte": "Shift-light X position in %", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "shiftlight_Ypct"], "texte": "Shift-light Y position in %", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "shiftlight_Wpct"], "texte": "Shift-light Width in %", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "shiftlight_Hpct"], "texte": "Shift-light Height in %", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},

        {"group_id": page + "_general", "param" : null, "texte": {"margin-top": 0, "margin-bottom": 0, "content": "---"}, "elt_type": "text"},
        {"group_id": page + "_general", "param" : [page, "shiftlight_mode"], "texte": {titre: "Shift-light Mode", options: ["0: Manual", "1: Auto"]}, "val_type": "int", "elt_type": "select",
            "texte2": "With Auto mode, it will try to find the optimal shiftlight range using the acceleration data.<br>" +
            "You can see the RPM values calculated by clicking on the RPM/GEAR/SPEED values on the dashboard."
        },
        {"group_id": page + "_general", "param" : [page, "advanced", "shiftlight_color"], "texte": "Shift-light Color when you reach the RPM limit", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "advanced", "pitlimiter_light_on"], "texte": "Pit limiter Light", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "advanced", "pitlimiter_light_inpit_color"], "texte": "Shift-light Color when the pit limiter is active and when you are in the pitlane", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "advanced", "pitlimiter_light_outpit_color"], "texte": "Shift-light Color when the pit limiter is active and when you are not in the pitlane", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : null, "texte": {"margin-top": 0, "margin-bottom": 0, "content": "---"}, "elt_type": "text"},
        {"group_id": page + "_general", "param" : [page, "shiftlight_opacity"], "texte": "Shift-light opacity", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "endgroup": 1,
            "texte2": "Set 0 for full transparency and 1 for full opacity.<br>" +
            "If you set it to 0, you will still see the gear / rpm / speed background color changed."
        },


        {"group_id": page + "_general", "param" : [page, "advanced", "dashboard_light_on"], "texte": "Dashboard Light", "val_type": "int", "elt_type": "switch", "newgroup": 1,
            "texte2": "The dashboard or a zone is colorized according to the parameters set below.<br>" +
            "The priority param"
        },
        {"group_id": page + "_general", "param" : [page, "dashboard_light_Xpct"], "texte": "Dashboard Lights X position in %", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "dashboard_light_Ypct"], "texte": "Dashboard Lights Y position in %", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "dashboard_light_Wpct"], "texte": "Dashboard Lights Width in %", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "dashboard_light_Hpct"], "texte": "Dashboard Lights Height in %", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},

        {"group_id": page + "_general", "param" : null, "texte": {"margin-top": 0, "margin-bottom": 0, "content": "---"}, "elt_type": "text"},
        {"group_id": page + "_general", "param" : [page, "advanced", "yellowflag_light_activated"], "texte": "Light when there is a Yellow Flag", "val_type": "int", "elt_type": "switch",
            "texte2": "'SC' is displayed if the safety car is out."
        },
        {"group_id": page + "_general", "param" : [page, "advanced", "yellowflag_light_color"], "texte": "Light Color when there is a Yellow Flag", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "advanced", "yellowflag_light_priority"], "texte": "Priority order for the Light when there is a Yellow Flag", "val_type": "int", "long": 4, "step": 1, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "advanced", "car_stopped_ontrack_light_activated"], "texte": "Light when a car is stopped on the track ahead", "val_type": "int", "elt_type": "switch",
            "texte2": "The distance between you and the car stopped is displayed."
        },
        {"group_id": page + "_general", "param" : [page, "advanced", "car_stopped_ontrack_light_color"], "texte": "Light Color when a car is stopped on the track ahead", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "advanced", "car_stopped_ontrack_light_priority"], "texte": "Priority order for the Light when a car is stopped on the track ahead", "val_type": "int", "long": 4, "step": 1, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "advanced", "greenflag_light_activated"], "texte": "Light when there is the Green Flag", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "advanced", "greenflag_light_color"], "texte": "Light Color when there is the Green Flag", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "advanced", "greenflag_light_priority"], "texte": "Priority order for the Light when there is the Green Flag", "val_type": "int", "long": 4, "step": 1, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "advanced", "blueflag_light_activated"], "texte": "Light when there is a Blue Flag", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "advanced", "blueflag_light_color"], "texte": "Light Color when there is a Blue Flag", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "advanced", "blueflag_light_priority"], "texte": "Priority order for the Light when there is a Blue Flag", "val_type": "int", "long": 4, "step": 1, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "advanced", "whiteflag_light_activated"], "texte": "Light when there is the White Flag", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "advanced", "whiteflag_light_color"], "texte": "Light Color when there is the White Flag", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "advanced", "whiteflag_light_priority"], "texte": "Priority order for the Light when there is the White Flag", "val_type": "int", "long": 4, "step": 1, "elt_type": "input"},

        {"group_id": page + "_general", "param" : null, "texte": {"margin-top": 0, "margin-bottom": 0, "content": "---"}, "elt_type": "text"},
        {"group_id": page + "_general", "param" : [page, "advanced", "switch_off_flags_auto"], "texte": "Switch OFF automatically the flag lights above after the delay specified below", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "advanced", "switch_off_flags_auto_delay"], "texte": "Delay in seconds for the flag lights to be automatically switched off", "val_type": "int", "long": 4, "step": 1, "elt_type": "input"},
        {"group_id": page + "_general", "param" : null, "texte": {"margin-top": 0, "margin-bottom": 0, "content": "---"}, "elt_type": "text"},

        {"group_id": page + "_general", "param" : [page, "advanced", "qualy_not_valid_light_activated"], "texte": "Light when the Qualy lap is not valid", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "advanced", "qualy_not_valid_light_color"], "texte": "Light Color when the Qualy lap is not valid", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "advanced", "qualy_not_valid_light_priority"], "texte": "Priority order for the Light when the Qualy lap is not valid", "val_type": "int", "long": 4, "step": 1, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "advanced", "oil_temp_alert_light_activated"], "texte": "Light when there is an Oil Temperature Alert", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "advanced", "oil_temp_alert_light_color"], "texte": "Light Color when there is an Oil Temperature Alert", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "advanced", "oil_temp_alert_light_priority"], "texte": "Priority order for the Light when there is an Oil Temperature Alert", "val_type": "int", "long": 4, "step": 1, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "advanced", "water_temp_alert_light_activated"], "texte": "Light when there is a Water Temperature Alert", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "advanced", "water_temp_alert_light_color"], "texte": "Light Color when there is a Water Temperature Alert", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "advanced", "water_temp_alert_light_priority"], "texte": "Priority order for the Light when there is a Water Temperature Alert", "val_type": "int", "long": 4, "step": 1, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "advanced", "fuel_alert_light_activated"], "texte": "Light if you need to refuel next lap or when you didn't put enough fuel for the race", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "advanced", "fuel_alert_light_color"], "texte": "Light Color if you need to refuel next lap or when you didn't put enough fuel for the race", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "advanced", "fuel_alert_light_priority"], "texte": "Priority order for the Light if you need to refuel next lap or when you didn't put enough fuel for the race", "val_type": "int", "long": 4, "step": 1, "elt_type": "input"},

        {"group_id": page + "_general", "param" : [page, "advanced", "abs_active_light_activated"], "texte": "Light when ABS is active", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "advanced", "abs_active_light_color"], "texte": "Light Color when ABS is active", "val_type": "str", "long":5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "advanced", "abs_active_light_priority"], "texte": "Priority order for the Light when ABS is active", "val_type": "int", "long": 4, "step": 1, "elt_type": "input"},

        {"group_id": page + "_general", "param" : null, "texte": {"margin-top": 0, "margin-bottom": 0, "content": "---"}, "elt_type": "text"},
        {"group_id": page + "_general", "param" : [page, "advanced", "math_channel_light_activated"], "texte": "Light when the conditional formula below is True", "val_type": "int", "elt_type": "switch",
            "texte2": "You can use those letters in the formula :<br>" +
                "b : brake in %<br>" +
                "t : throttle in %<br>" +
                "c : clutch in %<br>" +
                "wa : steering wheel angle in rad<br>" +
                "a : acceleration in m/s^2<br>" +
                "s : speed in m/s<br>" +
                "For example, this formula will detect a pressure of the brake and the throttle at the same time : <span style='background-color: #dddddd; color: black;'>&nbsp;b > 0 and t > 0&nbsp;</span>"
        },
        {"group_id": page + "_general", "param" : [page, "advanced", "math_channel_light_formula"], "texte": "Conditional Formula", "val_type": "str", "long": 30, "elt_type": "input"},
        {"group_id": page + "_general", "param" : [page, "advanced", "math_channel_light_color"], "texte": "Light Color when the conditional formula above is True", "val_type": "str", "long": 5, "elt_type": "input_color"},
        {"group_id": page + "_general", "param" : [page, "advanced", "math_channel_light_priority"], "texte": "Priority order for the Light when the conditional formula above is True", "val_type": "int", "long": 4, "step": 1, "elt_type": "input"},

        {"group_id": page + "_general", "param" : null, "texte": {"margin-top": 0, "margin-bottom": 0, "content": "---"}, "elt_type": "text"},
        {"group_id": page + "_general", "param" : [page, "dashboard_light_opacity"], "texte": "Dashboard Light opacity", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "endgroup": 1,
            "texte2": "Set 0 for full transparency and 1 for full opacity.<br>"
        },

        {"group_id": page + "_general", "param" : [page, "incar_set_change_delay"], "texte": "In-car settings display Delay (in seconds)", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "newgroup": 1, "endgroup": 1,
            "texte2": "How long you want the in-car settings changes been displayed in fullscreen.<br>Set to 0 if you don't want to display it."
        },

        {"group_id": page + "_general", "param" : [page, "advanced", "pitbox_bar_on"], "texte": "Display the pitbox yellow bar", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1,
            "texte2": "When you approach your pit box, a yellow bar indicates how far you are from it."
        },

        {"group_id": page + "_general", "param" : [page, "f3_mode_in_race_dashboard"], "texte": {titre: "Drivers Ahead & Behind Mode", options: ["0: In the standings", "1: On the track (F3 box mode)"]}, "val_type": "int", "elt_type": "select", "newgroup": 1,
            "texte2": "Note that in practice, the mode < 1: On the track > will always be selected automatically."
        },
        {"group_id": page + "_general", "param" : [page, "toggle_f3mode"], "texte": "Toggle F3 Box Mode", "val_type": "int", "elt_type": "set_button",
            "texte2": "With this button you can switch between the two modes above."
        },
        {"group_id": page + "_general", "param" : [page, "dashboard_f3mode_dot"], "texte": "Add a period before the driver names around you when the F3 box mode is active", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_general", "param" : [page, "dashboard_name_mode"], "texte": {titre: "Name Mode", options: ["", "1: Full Driver Name", "2: First Name initial and Last Name",           "3: Last Name 3 first letters", "4: Team Name", "5: Team and Driver Names (on two lines)", "6: Team and Driver Names (First Name Initial and Last Name)", "7: First Name and Last Name initial", "8: First Name initial and Last Name 3 first letters", "9: Last Name only"]}, "val_type": "int", "elt_type": "select", "endgroup": 1 },

        {"group_id": page + "_general", "param" : [page, "temperature_mode"], "texte": {titre: "Temperature Units", options: ["0: Auto", "1: Celsius", "2: Fahrenheit"]}, "val_type": "int", "elt_type": "select", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "hybrid_decimal"], "texte": {titre: "Number of decimals for the Hybrid numbers (ERS, MGU, ...)", options: ["No decimals", "1 decimal", "2 decimals"]}, "val_type": "int", "elt_type": "select"},
        {"group_id": page + "_general", "param" : [page, "estlaps_decimal"], "texte": {titre: "Number of decimals for the estimated laps value", options: ["No decimals", "1 decimal", "2 decimals", "3 decimals"]}, "val_type": "int", "elt_type": "select"},
        {"group_id": page + "_general", "param" : [page, "lapsremain_decimal"], "texte": {titre: "Number of decimals for the remaining laps value", options: ["No decimals", "1 decimal", "2 decimals", "3 decimals"]}, "val_type": "int", "elt_type": "select"},
        {"group_id": page + "_general", "param" : [page, "conso_decimal"], "texte": {titre: "Number of decimals for the consumption values", options: ["No decimals", "1 decimal", "2 decimals", "3 decimals"]}, "val_type": "int", "elt_type": "select"},
        {"group_id": page + "_general", "param" : [page, "fuel_decimal"], "texte": {titre: "Number of decimals for all the other fuel values", options: ["No decimals", "1 decimal", "2 decimals", "3 decimals"]}, "val_type": "int", "elt_type": "select", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "drag_enable"], "texte": "Center zone draggable for the overlay", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "fullscreen_button"], "texte": "Fullscreen button", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "fullscreen_button_timeout"], "texte": "Fullscreen button timeout(in seconds)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_general", "param" : [page, "advanced", "previous_display"], "texte": "Previous Display", "val_type": "int", "elt_type": "set_button", "newgroup": 1},
        {"group_id": page + "_general", "param" : [page, "advanced", "next_display"], "texte": "Next Display", "val_type": "int", "elt_type": "set_button", "endgroup": 1,
            "texte2": "By setting these buttons, you will be able to switch between different dashboard displays."
        },

        {"group_id": page + "_overlay", "param" : ["overlays", page], "texte": "Add this page to the overlays", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1, "color_cycle_num": 0},

        {"group_id": page + "_overlay", "param" : [page, "window_topmost"], "texte": "Always on top", "val_type": "int", "elt_type": "switch", "newgroup": 1},
        {"group_id": page + "_overlay", "param" : [page, "window_parent_name"], "texte": {titre: "Specify if you want another overlay to be displayed under this one", options: ["None", "timing", "timing2", "timing3", "timing4", "timing_broadcast", "dashboard", "dashboard2", "trackmap", "trackmap2", "trackmap_3d", "calculator", "compteur", "spotter", "launcher", "telemetry_inputs"]}, "val_type": "int", "elt_type": "select",
            "texte2": "- If you select an overlay, both overlays will be displayed in the taskbar as a unique window.<br>- If you set auto-hide for the overlay selected, this overlay will also be auto-hidden."
        },
        {"group_id": page + "_overlay", "param" : [page, "window_click_through"], "texte": "Click through the overlay", "val_type": "int", "elt_type": "switch",
            "texte2": "You need to restart the overlays for the changes to take effect."
        },
        /*{"group_id": page + "_overlay", "param" : [page, "auto_hide"], "texte": "Automatically Hide the overlay when you are not in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},*/
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_sim_not_running"], "texte": "Show the overlay when the sim is not running", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_not_incar"], "texte": "Show the overlay when you are not in the car and the sim is running", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_ingarage"], "texte": "Show the overlay when you are in the garage", "val_type": "int", "elt_type": "switch"},
        {"group_id": page + "_overlay", "param" : [page, "show_overlay_incar"], "texte": "Show the overlay when you are in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},

        {"group_id": page + "_overlay", "param" : [page, "window_x"], "texte": "X position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_overlay", "param" : [page, "window_y"], "texte": "Y position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

        {"group_id": page + "_overlay", "param" : [page, "window_w"], "texte": "Width", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
        {"group_id": page + "_overlay", "param" : [page, "window_h"], "texte": "Height", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1,
            "texte2": "It is recommended to use the same ratio defined by the width and height reference so the dashboard box will fit perfectly the overlay window.<br>" +
            "The ratio is the quotient width / height."
        },
        /*{"group_id": page + "_overlay", "param" : [page, "window_borders"], "texte": "Borders (only if you open the window as a Chrome app)", "val_type": "int", "elt_type": "switch"},*/  // Ne fonctionne plus

        {"group_id": page + "_overlay", "param" : [page, "overlay_hide"], "texte": "Hide/Show the Overlays", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1},

    );
}


// Options pour la page calculator
page = "calculator";
menu_elements.push(
    {"group_id": page + "_general", "param" : null, "texte": "URL", "page_name": page, "elt_type": "page_link", "newgroup": 1, "endgroup": 1, "color_cycle_num": 4,
        "texte2": "Url to enter in a browser on your iRacing computer or on your external device to access to this JRT page."
    },

    {"group_id": page + "_general", "param" : [page, "fps_calculator"], "texte": "Refresh Rate (FPS)", "val_type": "float", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1, "color_cycle_num": 0,
        "texte2": "How many times per seconds you want the data to be updated. Higher the value is, higher the CPU will consume."
    },
    {"group_id": page + "_general", "param" : [page, "fps_broadcast"], "texte": "Broadcast Rate", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "endgroup": 1,
        "texte2": "Used only for the broadcast mode 1."
    },

    {"group_id": page + "_general", "param" : [page, "use_css_perso"], "texte": "Use the " + page + "_perso.css file", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1,
        "texte2": "This file is located in the 'My Documents/Joel Real Timing/css' folder.<br>" +
            "If you edited this file, you will have to restart the JRT server and to reload the page for the changes to take effect.<br>" +
            "NOTE : When you deactivate this option, the page is automatically reloaded to ignore the css perso settings."
    },

    {"group_id": page + "_general", "param" : [page, "responsive"], "texte": "Responsive Mode", "val_type": "int", "elt_type": "switch", "newgroup": 1,
        "texte2": "With this option ON, the font size is proportional to the window width divided by the width reference."
    },
    {"group_id": page + "_general", "param" : [page, "reference_w"], "texte": "Width Reference", "val_type": "int", "step": 1, "long": 6, "elt_type": "input"},
    {"group_id": page + "_general", "param" : [page, "ligne_h"], "texte": "Line Height", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "disp_sofbar"], "texte": "Display a little SOF bar", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "sofbar_h"], "texte": "SOF Bar Height", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "disp_infosbar"], "texte": {titre: "Infos Bar Mode", options: ["", "1: Display on One line", "2: Display on Two lines"]}, "val_type": "int", "elt_type": "select", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "infosbar_coef"], "texte": "Infos Bar Coef", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input",
        "texte2": "Increase this value if you want to increase the font size."
    },
    {"group_id": page + "_general", "param" : [page, "temperature_mode"], "texte": {titre: "Temperatures Unit", options: ["0: Auto", "1: Celsius", "2: Fahrenheit"]}, "val_type": "int", "elt_type": "select"},
    {"group_id": page + "_general", "param" : [page, "estlaps_decimal"], "texte": {titre: "Number of decimals for the estimated laps value", options: ["No decimals", "1 decimal", "2 decimals", "3 decimals"]}, "val_type": "int", "elt_type": "select"},
    {"group_id": page + "_general", "param" : [page, "lapsremain_decimal"], "texte": {titre: "Number of decimals for the remaining laps value", options: ["No decimals", "1 decimal", "2 decimals", "3 decimals"]}, "val_type": "int", "elt_type": "select"},
    {"group_id": page + "_general", "param" : [page, "sessioninfos_height"], "texte": "Weather Infos Relative Height", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"group_id": page + "_general", "param" : [page, "disp_fuelinfos"], "texte": "Display the Fuel Infos", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_general", "param" : [page, "disp_conso_bigger"], "texte": "Display the consumption bigger between the tank and the est. laps", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_general", "param" : [page, "tires_buttons"], "texte": "Display the Tires Buttons", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_general", "param" : [page, "jrt_logo_disp"], "texte": "Display the JRT logo", "val_type": "int", "elt_type": "switch", "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "drag_enable"], "texte": "Center zone draggable for the overlay", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "fullscreen_button"], "texte": "Fullscreen button", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "fullscreen_button_timeout"], "texte": "Fullscreen button timeout(in seconds)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"group_id": page + "_overlay", "param" : ["overlays", page], "texte": "Add this page to the overlays", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1, "color_cycle_num": 0},

    {"group_id": page + "_overlay", "param" : [page, "window_topmost"], "texte": "Always on top", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_overlay", "param" : [page, "window_parent_name"], "texte": {titre: "Specify if you want another overlay to be displayed under this one", options: ["None", "timing", "timing2", "timing3", "timing4", "timing_broadcast", "dashboard", "dashboard2", "trackmap", "trackmap2", "trackmap_3d", "calculator", "compteur", "spotter", "launcher", "telemetry_inputs"]}, "val_type": "int", "elt_type": "select",
        "texte2": "- If you select an overlay, both overlays will be displayed in the taskbar as a unique window.<br>- If you set auto-hide for the overlay selected, this overlay will also be auto-hidden."
    },
    {"group_id": page + "_overlay", "param" : [page, "window_click_through"], "texte": "Click through the overlay", "val_type": "int", "elt_type": "switch",
        "texte2": "You need to restart the overlays for the changes to take effect."
    },
    /*{"group_id": page + "_overlay", "param" : [page, "auto_hide"], "texte": "Automatically Hide the overlay when you are not in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},*/
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_sim_not_running"], "texte": "Show the overlay when the sim is not running", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_not_incar"], "texte": "Show the overlay when you are not in the car and the sim is running", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_ingarage"], "texte": "Show the overlay when you are in the garage", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_incar"], "texte": "Show the overlay when you are in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},

    {"group_id": page + "_overlay", "param" : [page, "window_x"], "texte": "X position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
    {"group_id": page + "_overlay", "param" : [page, "window_y"], "texte": "Y position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

    {"group_id": page + "_overlay", "param" : [page, "window_w"], "texte": "Width", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
    {"group_id": page + "_overlay", "param" : [page, "window_h"], "texte": "Height", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

    /*{"group_id": page + "_overlay", "param" : [page, "window_borders"], "texte": "Borders (only if you open the window as a Chrome app)", "val_type": "int", "elt_type": "switch"},*/  // Ne fonctionne plus

    {"group_id": page + "_overlay", "param" : [page, "overlay_hide"], "texte": "Hide/Show the Overlays", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1},

);


// Options pour la page compteur
page = "compteur";
menu_elements.push(
    {"group_id": page + "_general", "param" : null, "texte": "URL", "page_name": page, "elt_type": "page_link", "newgroup": 1, "endgroup": 1, "color_cycle_num": 4,
        "texte2": "Url to enter in a browser on your iRacing computer or on your external device to access to this JRT page."
    },

    {"group_id": page + "_general", "param" : [page, "fps"], "texte": "Refresh Rate (FPS)", "val_type": "float", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1, "color_cycle_num": 0,
        "texte2": "How many times per seconds you want the data to be updated. Higher the value is, higher the CPU will consume."
    },
    {"group_id": page + "_general", "param" : [page, "fps_broadcast"], "texte": "Broadcast Rate", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "endgroup": 1,
        "texte2": "Used only for the broadcast mode 1."
    },

    {"group_id": page + "_general", "param" : [page, "disp_wheel"], "texte": "Display the steering wheel indicator", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "disp_clutch"], "texte": "Display the clutch pedal", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "compteur_rev1_color"], "texte": "Rev color 1", "val_type": "str", "long":5, "elt_type": "input_color", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "compteur_rev2_color"], "texte": "Rev color 2", "val_type": "str", "long":5, "elt_type": "input_color", "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "compteur_bg_transparency"], "texte": "Background transparency coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "newgroup": 1, "endgroup": 1 },

    {"group_id": page + "_general", "param" : [page, "drag_enable"], "texte": "Center zone draggable for the overlay", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "fullscreen_button"], "texte": "Fullscreen button", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "fullscreen_button_timeout"], "texte": "Fullscreen button timeout(in seconds)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"group_id": page + "_overlay", "param" : ["overlays", page], "texte": "Add this page to the overlays", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1, "color_cycle_num": 0},

    {"group_id": page + "_overlay", "param" : [page, "window_topmost"], "texte": "Always on top", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_overlay", "param" : [page, "window_parent_name"], "texte": {titre: "Specify if you want another overlay to be displayed under this one", options: ["None", "timing", "timing2", "timing3", "timing4", "timing_broadcast", "dashboard", "dashboard2", "trackmap", "trackmap2", "trackmap_3d", "calculator", "compteur", "spotter", "launcher", "telemetry_inputs"]}, "val_type": "int", "elt_type": "select",
        "texte2": "- If you select an overlay, both overlays will be displayed in the taskbar as a unique window.<br>- If you set auto-hide for the overlay selected, this overlay will also be auto-hidden."
    },
    {"group_id": page + "_overlay", "param" : [page, "window_click_through"], "texte": "Click through the overlay", "val_type": "int", "elt_type": "switch",
        "texte2": "You need to restart the overlays for the changes to take effect."
    },
    /*{"group_id": page + "_overlay", "param" : [page, "auto_hide"], "texte": "Automatically Hide the overlay when you are not in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},*/
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_sim_not_running"], "texte": "Show the overlay when the sim is not running", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_not_incar"], "texte": "Show the overlay when you are not in the car and the sim is running", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_ingarage"], "texte": "Show the overlay when you are in the garage", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_incar"], "texte": "Show the overlay when you are in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},

    {"group_id": page + "_overlay", "param" : [page, "window_x"], "texte": "X position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
    {"group_id": page + "_overlay", "param" : [page, "window_y"], "texte": "Y position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

    {"group_id": page + "_overlay", "param" : [page, "window_w"], "texte": "Width", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
    {"group_id": page + "_overlay", "param" : [page, "window_h"], "texte": "Height", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

    /*{"group_id": page + "_overlay", "param" : [page, "window_borders"], "texte": "Borders (only if you open the window as a Chrome app)", "val_type": "int", "elt_type": "switch"},*/  // Ne fonctionne plus

    {"group_id": page + "_overlay", "param" : [page, "overlay_hide"], "texte": "Hide/Show the Overlays", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1},

);


// Options pour la page launcher
page = "launcher";
menu_elements.push(
    {"group_id": page + "_general", "param" : null, "texte": "URL", "page_name": page, "elt_type": "page_link", "newgroup": 1, "endgroup": 1, "color_cycle_num": 4,
        "texte2": "Url to enter in a browser on your iRacing computer or on your external device to access to this JRT page."
    },

    {"group_id": page + "_general", "param" : [page, "launcher_menu_disp"], "texte": "Display the menu at the bottom", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1, "color_cycle_num": 0},

    {"group_id": page + "_general", "param" : [page, "launcher_switch_fast"], "texte": "Make the switch between pages faster", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1,
        "texte2": "WARNING! This will load all the pages in the background, so it can increase the CPU load for the JRT server and the browser because " +
        "each page will continue to be updated in the background, even if they will be updated at a lower rate to optimize performances."
    },

    {"group_id": page + "_general", "param" : [page, "drag_enable"], "texte": "Center zone draggable for the overlay", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "fullscreen_button"], "texte": "Fullscreen button", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "fullscreen_button_timeout"], "texte": "Fullscreen button timeout(in seconds)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"group_id": page + "_menu", "param" : [page, "launcher_empty_disp"], "texte": "Display the 'empty' button on the Menu", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_menu", "param" : [page, "launcher_timing_disp"], "texte": "Display the 'timing' button on the Menu", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_menu", "param" : [page, "launcher_timing2_disp"], "texte": "Display the 'timing2' button on the Menu", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_menu", "param" : [page, "launcher_timing3_disp"], "texte": "Display the 'timing3' button on the Menu", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_menu", "param" : [page, "launcher_timing4_disp"], "texte": "Display the 'timing4' button on the Menu", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_menu", "param" : [page, "launcher_timing_broadcast_disp"], "texte": "Display the 'timing_broadcast' button on the Menu", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_menu", "param" : [page, "launcher_trackmap_disp"], "texte": "Display the 'trackmap' button on the Menu", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_menu", "param" : [page, "launcher_trackmap2_disp"], "texte": "Display the 'trackmap2' button on the Menu", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_menu", "param" : [page, "launcher_trackmap_3d_disp"], "texte": "Display the 'trackmap_3d' button on the Menu", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_menu", "param" : [page, "launcher_dashboard_disp"], "texte": "Display the 'dashboard' button on the Menu", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_menu", "param" : [page, "launcher_dashboard2_disp"], "texte": "Display the 'dashboard2' button on the Menu", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_menu", "param" : [page, "launcher_compteur_disp"], "texte": "Display the 'compteur' button on the Menu", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_menu", "param" : [page, "launcher_calculator_disp"], "texte": "Display the 'calculator' button on the Menu", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_menu", "param" : [page, "launcher_buttonbox_disp"], "texte": "Display the 'buttonbox' button on the Menu", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_menu", "param" : [page, "launcher_spotter_disp"], "texte": "Display the 'spotter' button on the Menu", "val_type": "int", "elt_type": "switch", "endgroup": 1},

    {"group_id": page + "_buttons", "param" : [page, "launcher_previous"], "texte": "Go to the Previous page", "val_type": "int", "elt_type": "set_button", "newgroup": 1},
    {"group_id": page + "_buttons", "param" : [page, "launcher_next"], "texte": "Go to the Next page", "val_type": "int", "elt_type": "set_button"},
    {"group_id": page + "_buttons", "param" : [page, "launcher_empty"], "texte": "Go to the empty page", "val_type": "int", "elt_type": "set_button"},
    {"group_id": page + "_buttons", "param" : [page, "launcher_timing"], "texte": "Go to the timing page", "val_type": "int", "elt_type": "set_button"},
    {"group_id": page + "_buttons", "param" : [page, "launcher_timing2"], "texte": "Go to the timing2 page", "val_type": "int", "elt_type": "set_button"},
    {"group_id": page + "_buttons", "param" : [page, "launcher_timing3"], "texte": "Go to the timing3 page", "val_type": "int", "elt_type": "set_button"},
    {"group_id": page + "_buttons", "param" : [page, "launcher_timing4"], "texte": "Go to the timing4 page", "val_type": "int", "elt_type": "set_button"},
    {"group_id": page + "_buttons", "param" : [page, "launcher_timing_broadcast"], "texte": "Go to the timing_broadcast page", "val_type": "int", "elt_type": "set_button"},
    {"group_id": page + "_buttons", "param" : [page, "launcher_trackmap"], "texte": "Go to the trackmap page", "val_type": "int", "elt_type": "set_button"},
    {"group_id": page + "_buttons", "param" : [page, "launcher_trackmap2"], "texte": "Go to the trackmap2 page", "val_type": "int", "elt_type": "set_button"},
    {"group_id": page + "_buttons", "param" : [page, "launcher_trackmap_3d"], "texte": "Go to the trackmap_3d page", "val_type": "int", "elt_type": "set_button"},
    {"group_id": page + "_buttons", "param" : [page, "launcher_dashboard"], "texte": "Go to the dashboard page", "val_type": "int", "elt_type": "set_button"},
    {"group_id": page + "_buttons", "param" : [page, "launcher_dashboard2"], "texte": "Go to the dashboard2 page", "val_type": "int", "elt_type": "set_button"},
    {"group_id": page + "_buttons", "param" : [page, "launcher_compteur"], "texte": "Go to the compteur page", "val_type": "int", "elt_type": "set_button"},
    {"group_id": page + "_buttons", "param" : [page, "launcher_calculator"], "texte": "Go to the calculator page", "val_type": "int", "elt_type": "set_button"},
    {"group_id": page + "_buttons", "param" : [page, "launcher_buttonbox"], "texte": "Go to the buttonbox page", "val_type": "int", "elt_type": "set_button"},
    {"group_id": page + "_buttons", "param" : [page, "launcher_spotter"], "texte": "Go to the spotter page", "val_type": "int", "elt_type": "set_button", "endgroup": 1},

    {"group_id": page + "_overlay", "param" : ["overlays", page], "texte": "Add this page to the overlays", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1, "color_cycle_num": 0},

    {"group_id": page + "_overlay", "param" : [page, "window_topmost"], "texte": "Always on top", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_overlay", "param" : [page, "window_parent_name"], "texte": {titre: "Specify if you want another overlay to be displayed under this one", options: ["None", "timing", "timing2", "timing3", "timing4", "timing_broadcast", "dashboard", "dashboard2", "trackmap", "trackmap2", "trackmap_3d", "calculator", "compteur", "spotter", "launcher", "telemetry_inputs"]}, "val_type": "int", "elt_type": "select",
        "texte2": "- If you select an overlay, both overlays will be displayed in the taskbar as a unique window.<br>- If you set auto-hide for the overlay selected, this overlay will also be auto-hidden."
    },
    {"group_id": page + "_overlay", "param" : [page, "window_click_through"], "texte": "Click through the overlay", "val_type": "int", "elt_type": "switch",
        "texte2": "You need to restart the overlays for the changes to take effect."
    },
    /*{"group_id": page + "_overlay", "param" : [page, "auto_hide"], "texte": "Automatically Hide the overlay when you are not in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},*/
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_sim_not_running"], "texte": "Show the overlay when the sim is not running", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_not_incar"], "texte": "Show the overlay when you are not in the car and the sim is running", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_ingarage"], "texte": "Show the overlay when you are in the garage", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_incar"], "texte": "Show the overlay when you are in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},

    {"group_id": page + "_overlay", "param" : [page, "window_x"], "texte": "X position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
    {"group_id": page + "_overlay", "param" : [page, "window_y"], "texte": "Y position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

    {"group_id": page + "_overlay", "param" : [page, "window_w"], "texte": "Width", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
    {"group_id": page + "_overlay", "param" : [page, "window_h"], "texte": "Height", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

    /*{"group_id": page + "_overlay", "param" : [page, "window_borders"], "texte": "Borders (only if you open the window as a Chrome app)", "val_type": "int", "elt_type": "switch"},*/  // Ne fonctionne plus

    {"group_id": page + "_overlay", "param" : [page, "overlay_hide"], "texte": "Hide/Show the Overlays", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1},

);


// Options pour la page spotter
page = "spotter";
menu_elements.push(
    {"group_id": page + "_general", "param" : null, "texte": "URL", "page_name": page, "elt_type": "page_link", "newgroup": 1, "endgroup": 1, "color_cycle_num": 4,
        "texte2": "Url to enter in a browser on your iRacing computer or on your external device to access to this JRT page."
    },

    {"group_id": page + "_general", "param" : [page, "fps"], "texte": "Refresh Rate (you will have to reload the spotter page)", "val_type": "float", "step": 1, "long": 3, "elt_type": "input", "newgroup": 1, "endgroup": 1, "color_cycle_num": 0,
        "texte2": "How many times per seconds you want the data to be updated. Higher the value is, higher the CPU will consume."
    },

    {"group_id": page + "_general", "param" : [page, "spotter_when_not_ontrack"], "texte": "Display the visual spotter when you are spectating", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1,
        "texte2": "If you deactivate this option, the spotter will be visible only when you are driving."
    },

    {"group_id": page + "_general", "param" : [page, "spotter_landmark_disp"], "texte": "Display the landmarks to help positioning", "val_type": "int", "elt_type": "switch", "newgroup": 1},

    {"group_id": page + "_general", "param" : [page, "spotter_rule_disp"], "texte": "Display the rule", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_general", "param" : [page, "spotter_rule_opacity_coef"], "texte": "Rule opacity coefficient", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input",
        "texte2": "Set it to 1 to have it 100% opaque."
    },
    {"group_id": page + "_general", "param" : [page, "spotter_rule_shadow"], "texte": "Display the rule shadows", "val_type": "int", "elt_type": "switch", "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "spotter_side_arrow_blink"], "texte": "Blink the orange side arrows", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "spotter_arrow_inverted"], "texte": "Inverted arrows direction", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_general", "param" : [page, "spotter_arrow_coef"], "texte": "Arrows size coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input",
        "texte2": "Enter a value less than or equal to 1 otherwise some arrows may be cut."
    },
    {"group_id": page + "_general", "param" : [page, "spotter_arrow_opacity_coef"], "texte": "Arrows opacity coefficient", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input",
        "texte2": "Set it to 1 to have it 100% opaque."
    },
    {"group_id": page + "_general", "param" : [page, "spotter_arrow_shadow"], "texte": "Display the arrows shadows", "val_type": "int", "elt_type": "switch", "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "spotter_background_mode"], "texte": {titre: "Background mode", options: ["0: No background", "1: Always", "2: Only when arrows are displayed"]}, "val_type": "int", "elt_type": "select", "newgroup": 1,
        "texte2": "You can display the background to imrove the contrast for the arrows."
    },
    {"group_id": page + "_general", "param" : [page, "spotter_background_transparency_coef"], "texte": "Background transparency coefficient", "val_type": "float", "step": 0.01, "long": 4, "elt_type": "input", "endgroup": 1,
        "texte2": "Set it to 1 to have the background completely opaque and to 0 for a background full transparent."
    },

    {"group_id": page + "_general", "param" : [page, "drag_enable"], "texte": "Center zone draggable for the overlay", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1},

    {"group_id": page + "_overlay", "param" : ["overlays", page], "texte": "Add this page to the overlays", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1, "color_cycle_num": 0},

    {"group_id": page + "_overlay", "param" : [page, "window_topmost"], "texte": "Always on top", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_overlay", "param" : [page, "window_parent_name"], "texte": {titre: "Specify if you want another overlay to be displayed under this one", options: ["None", "timing", "timing2", "timing3", "timing4", "timing_broadcast", "dashboard", "dashboard2", "trackmap", "trackmap2", "trackmap_3d", "calculator", "compteur", "spotter", "launcher", "telemetry_inputs"]}, "val_type": "int", "elt_type": "select",
        "texte2": "- If you select an overlay, both overlays will be displayed in the taskbar as a unique window.<br>- If you set auto-hide for the overlay selected, this overlay will also be auto-hidden."
    },
    {"group_id": page + "_overlay", "param" : [page, "window_click_through"], "texte": "Click through the overlay", "val_type": "int", "elt_type": "switch",
        "texte2": "You need to restart the overlays for the changes to take effect."
    },
    /*{"group_id": page + "_overlay", "param" : [page, "auto_hide"], "texte": "Automatically Hide the overlay when you are not in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},*/
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_sim_not_running"], "texte": "Show the overlay when the sim is not running", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_not_incar"], "texte": "Show the overlay when you are not in the car and the sim is running", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_ingarage"], "texte": "Show the overlay when you are in the garage", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_incar"], "texte": "Show the overlay when you are in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},

    {"group_id": page + "_overlay", "param" : [page, "window_x"], "texte": "X position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
    {"group_id": page + "_overlay", "param" : [page, "window_y"], "texte": "Y position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

    {"group_id": page + "_overlay", "param" : [page, "window_w"], "texte": "Width", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
    {"group_id": page + "_overlay", "param" : [page, "window_h"], "texte": "Height", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

    /*{"group_id": page + "_overlay", "param" : [page, "window_borders"], "texte": "Borders (only if you open the window as a Chrome app)", "val_type": "int", "elt_type": "switch"},*/  // Ne fonctionne plus

    {"group_id": page + "_overlay", "param" : [page, "overlay_hide"], "texte": "Hide/Show the Overlays", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1},

);


// Options pour la page buttonbox
page = "buttonbox";
menu_elements.push(
    {"group_id": page + "_general", "param" : null, "texte": "URL", "page_name": page, "elt_type": "page_link", "newgroup": 1, "endgroup": 1, "color_cycle_num": 4,
        "texte2": "Url to enter in a browser on your iRacing computer or on your external device to access to this JRT page."
    },

    {"group_id": page + "_general", "param" : [page, "fps_buttonbox"], "texte": "Refresh Rate (FPS)", "val_type": "float", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1, "color_cycle_num": 0,
        "texte2": "How many times per seconds you want the data to be updated. Higher the value is, higher the CPU will consume.<br>You can set it to 0 if there is no data to refresh."
    },

    {"group_id": page + "_general", "param" : [page, "fullscreen_button"], "texte": "Fullscreen button", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "fullscreen_button_timeout"], "texte": "Fullscreen button timeout(in seconds)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

);


// Options pour la page telemetry_inputs
page = "telemetry_inputs";
menu_elements.push(
    {"group_id": page + "_general", "param" : null, "texte": "URL", "page_name": page, "elt_type": "page_link", "newgroup": 1, "endgroup": 1, "color_cycle_num": 4,
        "texte2": "Url to enter in a browser on your iRacing computer or on your external device to access to this JRT page."
    },

    {"group_id": page + "_general", "param" : [page, "inputs_color"], "texte": "Background color", "val_type": "str", "long":5, "elt_type": "input_color", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "inputs_opacity"], "texte": "Background opacity", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input",
        "texte2": "Set 0 for full transparency and 1 for full opacity.<br>"
    },
    {"group_id": page + "_general", "param" : [page, "inputs_curve_thickness_coef"], "texte": "Curves thickness coefficient", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},
    {"group_id": page + "_general", "param" : [page, "inputs_curve_animation_speed_coef"], "texte": "Curves animation speed coefficient", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "endgroup": 1,
        "texte2": "Increase this coefficient to have the curves moving faster"
    },

    {"group_id": page + "_general", "param" : [page, "inputs_dash_lines"], "texte": "Dash lines for 25%, 50% and 75% values", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "inputs_dash_lines_thickness_coef"], "texte": "Dash lines thickness coefficient", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input"},
    {"group_id": page + "_general", "param" : [page, "inputs_dash_lines_color"], "texte": "Dash lines color", "val_type": "str", "long":5, "elt_type": "input_color", "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "inputs_display_throttle_graph"], "texte": "Throttle curve", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "inputs_throttle_color"], "texte": "Throttle color", "val_type": "str", "long":5, "elt_type": "input_color"},
    {"group_id": page + "_general", "param" : [page, "inputs_throttle_opacity"], "texte": "Throttle background opacity", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "inputs_display_brake_graph"], "texte": "Brake curve", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "inputs_brake_color"], "texte": "Brake color", "val_type": "str", "long":5, "elt_type": "input_color"},
    {"group_id": page + "_general", "param" : [page, "inputs_brake_opacity"], "texte": "Brake background opacity", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "inputs_display_clutch_graph"], "texte": "Clutch curve", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "inputs_clutch_color"], "texte": "Clutch color", "val_type": "str", "long":5, "elt_type": "input_color"},
    {"group_id": page + "_general", "param" : [page, "inputs_clutch_opacity"], "texte": "Clutch background opacity", "val_type": "float", "step": 0.1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "inputs_display_wheel_graph"], "texte": "Wheel curve", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "inputs_wheel_color"], "texte": "Wheel curve color", "val_type": "str", "long":5, "elt_type": "input_color", "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "inputs_display_pedals"], "texte": "Brake and throttle pedals", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "inputs_throttle_pct_color"], "texte": "Throttle % color", "val_type": "str", "long":5, "elt_type": "input_color"},
    {"group_id": page + "_general", "param" : [page, "inputs_brake_pct_color"], "texte": "Brake % color", "val_type": "str", "long":5, "elt_type": "input_color"},
    {"group_id": page + "_general", "param" : [page, "inputs_display_clutch_pedal"], "texte": "Clutch pedal", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_general", "param" : [page, "inputs_clutch_pct_color"], "texte": "Clutch % color", "val_type": "str", "long":5, "elt_type": "input_color"},
    {"group_id": page + "_general", "param" : [page, "inputs_display_pct"], "texte": "Display the % values", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_general", "param" : [page, "inputs_text_orientation_upright"], "texte": "% values orientation upright", "val_type": "int", "elt_type": "switch", "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "inputs_display_wheel"], "texte": "Wheel", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "inputs_wheel_color1"], "texte": "Wheel color #1", "val_type": "str", "long":5, "elt_type": "input_color"},
    {"group_id": page + "_general", "param" : [page, "inputs_wheel_color2"], "texte": "Wheel color #2", "val_type": "str", "long":5, "elt_type": "input_color", "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "inputs_display_gear_speed"], "texte": "Display the gear and the speed", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_general", "param" : [page, "inputs_speed_color"], "texte": "Speed color", "val_type": "str", "long":5, "elt_type": "input_color"},
    {"group_id": page + "_general", "param" : [page, "inputs_gear_color"], "texte": "Gear color", "val_type": "str", "long":5, "elt_type": "input_color", "endgroup": 1},

    {"group_id": page + "_general", "param" : [page, "inputs_font_family"], "texte": "Font family", "val_type": "str", "elt_type": "input", "long": 30, "newgroup": 1, "endgroup": 1,
        "texte2": "You can enter the font name if you have installed it on windows.<br>You can also enter the file name of your own font file. " +
        "Before that, you need to copy the file in the 'My&nbsp;Documents/Joel&nbsp;Real&nbsp;Timing/displays_fonts/' folder," +
        " to restart the JRT server and to reload the telemetry_inputs page.<br>" +
        "Note, that only otf, ttf and woff formats are working (the default value is Arial)."
    },

    {"group_id": page + "_general", "param" : [page, "drag_enable"], "texte": "Center zone draggable for the overlay", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1},

    {"group_id": page + "_overlay", "param" : ["overlays", page], "texte": "Add this page to the overlays", "val_type": "int", "elt_type": "switch", "newgroup": 1, "endgroup": 1, "color_cycle_num": 0},

    {"group_id": page + "_overlay", "param" : [page, "window_topmost"], "texte": "Always on top", "val_type": "int", "elt_type": "switch", "newgroup": 1},
    {"group_id": page + "_overlay", "param" : [page, "window_parent_name"], "texte": {titre: "Specify if you want another overlay to be displayed under this one", options: ["None", "timing", "timing2", "timing3", "timing4", "timing_broadcast", "dashboard", "dashboard2", "trackmap", "trackmap2", "trackmap_3d", "calculator", "compteur", "spotter", "launcher", "telemetry_inputs"]}, "val_type": "int", "elt_type": "select",
        "texte2": "- If you select an overlay, both overlays will be displayed in the taskbar as a unique window.<br>- If you set auto-hide for the overlay selected, this overlay will also be auto-hidden."
    },
    {"group_id": page + "_overlay", "param" : [page, "window_click_through"], "texte": "Click through the overlay", "val_type": "int", "elt_type": "switch",
        "texte2": "You need to restart the overlays for the changes to take effect."
    },
    /*{"group_id": page + "_overlay", "param" : [page, "auto_hide"], "texte": "Automatically Hide the overlay when you are not in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},*/
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_sim_not_running"], "texte": "Show the overlay when the sim is not running", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_not_incar"], "texte": "Show the overlay when you are not in the car and the sim is running", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_ingarage"], "texte": "Show the overlay when you are in the garage", "val_type": "int", "elt_type": "switch"},
    {"group_id": page + "_overlay", "param" : [page, "show_overlay_incar"], "texte": "Show the overlay when you are in the car", "val_type": "int", "elt_type": "switch", "endgroup": 1},

    {"group_id": page + "_overlay", "param" : [page, "window_x"], "texte": "X position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
    {"group_id": page + "_overlay", "param" : [page, "window_y"], "texte": "Y position", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

    {"group_id": page + "_overlay", "param" : [page, "window_w"], "texte": "Width", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "newgroup": 1},
    {"group_id": page + "_overlay", "param" : [page, "window_h"], "texte": "Height", "val_type": "int", "step": 1, "long": 5, "elt_type": "input", "endgroup": 1},

    /*{"group_id": page + "_overlay", "param" : [page, "window_borders"], "texte": "Borders (only if you open the window as a Chrome app)", "val_type": "int", "elt_type": "switch"},*/  // Ne fonctionne plus

    {"group_id": page + "_overlay", "param" : [page, "overlay_hide"], "texte": "Hide/Show the Overlays", "val_type": "int", "elt_type": "set_button", "newgroup": 1, "endgroup": 1},
);


menu_elements_timing_columns_option = [
    {title_id: "name", "param" : ["name_mode"],
        options: [
            "",
            "1: Full Driver Name",
            "2: First Name initial and Last Name",
            "3: Last Name 3 first letters",
            "4: Team Name",
            "5: Team and Driver Names (on two lines)",
            "6: Team and Driver Names (First Name Initial and Last Name)",
            "7: First Name and Last Name initial",
            "8: First Name initial and Last Name 3 first letters",
            "9: Last Name only"
        ]},
    {title_id: "clubname", "param" : ["clubname_mode"], options: ["", "1: Name", "2: Logo", "3: Country Flag"]},
    {title_id: "ir", "param" : ["ir_mode"], options: ["", "1: Normal display", "2: Display with license color", "3: Normal display with projected iRating and iRating gain in brackets (race only)", "4: Display with license color, projected iRating and iRating gain in brackets (race only)"]},
    {title_id: "lic", "param" : ["lic_mode"], options: ["", "1: Compact", "2: Full", "3: iRacing style Compact", "4: iRacing style Full"]},
    {title_id: "speed", "param" : ["speed_mode"], options: ["", "1: No Decimals", "2: 1 Decimal", "3: 2 Decimals"]},
    {title_id: "rel", "param" : ["rel_mode"], options: ["", "1: In Seconds", "2: In Laps"]},
    {title_id: "gap", "param" : ["gap_mode"], options: ["", "1: In Seconds with time elapsed for the leader", "2: In Laps with time elapsed for the leader", "3: In Seconds", "4: In Laps"]},
    {title_id: "cgap", "param" : ["cgap_mode"], options: ["", "1: In Seconds with time elapsed for the leader", "2: In Laps with time elapsed for the leader", "3: In Seconds", "4: In Laps"]},
    {title_id: "car", "param" : ["car_mode"], options: ["", "1: Name", "2: Image/transparent background", "3: Image/grey background", "4: Customized driver logo", "5: Customized team logo", "6: Customized driver text", "7: Customized team text", "8: Logo/transparent background", "9: Logo/grey background"]},
    {title_id: "tire_compound", "param" : ["tire_compound_mode"], options: ["", "1: Name in color", "2: Logo", "3: Color Circle with the Initial"]},
    {title_id: "tires_stints", "param" : ["tires_stints_align"], options: ["", "1: Aligned to the right", "2: Centered", "3: Aligned to the left"]},
];

timing_columns_infos_bulle = {
    "line_num": "Line number. It is useful if you want to see the positions when you sort the columns by iRating, Best laptime, ...",
    "pos" : "Position",
    "cpos" : "Position in class",
    "spos" : "Start position",
    "scpos" : "Start position in class",
    "gain" : "Spots gained or lost since the start. On replays, this number is correct only if the replay is launched from the start of the race",
    "cgain" : "Spots gained or lost in class since the start",
    "num" : "Car number",
    "class_box" : "Box colored by the class color",
    "name" : "Driver Name/Team",
    "clubname" : "Driver club name",
    "ir" : "iRating",
    "ir_gain" : "iRating Gain",
    "lic" : "License",
    "interval" : "Gap with the driver ahead in the overall standing in RACE sessions",
    "rel" : "Relative gap in real-time between the driver and the selected driver",
    "delta" : "Colored graphic that shows the gap changes in real-time with the selected driver",
    "gap" : "Absolute gap in real-time with the leader",
    "cgap" : "Gap in real-time with the class leader",
    "last" : "Last laptime. When you read a replay, if JRT was started when the race was live, the laptimes were saved and should be correct, otherwise it is an estimation",
    "best" : "Best laptime. When you read a replay, if JRT was started when the race was live, the laptimes were saved and should be correct, otherwise it is an estimation",
    "lc" : "Laps completed",
    "speed" : "Estimated speed. This estimation is correct most of the time on replays but can be less accurate in live depending upon the bandwitch quality, specially when there are a lot of cars on the track",
    "accel" : "Estimated acceleration in G",
    "topspeed" : "Estimated top speed",
    "apex_speed" : "Estimated minimum speed at the last turn",
    "max_speed" : "Estimated maximum speed before the last braking zone",
    "stint" : "Laps completed since the last pitstop",
    "pit" : "Number of pitstops",
    "pitroadtime" : "Total time spent in the pitlane. The background of the other drivers goes green if your pit road time was at least 5 seconds faster and it goes red if your pit road time was 5 seconds slower",
    "pitstalltime" : "Total time spent in the pitstall",
    "inc" : "Incident number for your car and an off-track estimation number for the others. This number is correct on replays but can be totally wrong in live depending upon your connection and the server quality",
    "distpct" : "Overall distance in laps. For example, 12.5 means we did 12 laps and a half",
    "car" : "Default iRacing Car name or logo. You have also the possibility to use this column to display a customized driver/team logo or or customized driver/team text. See the web site for more info.",
    "qualy" : "Qualy times when available",
    "points" : "Estimated iRacing championship points",
    "gap_dist" : "Gap in meters",
    "avg1" : "Average of the last / best X consecutives laps\nNote that it won't work if selected the 'Disble all events' setting.",
    "avg2" : "Average of the last / best X consecutives laps\nNote that it won't work if selected the 'Disble all events' setting.",
    "avg3" : "Average of the last / best X consecutives laps\nNote that it won't work if selected the 'Disble all events' setting.",
    "sectors" : "Sectors. It is just an estimation and can be inaccurate sometimes",
    "p2p" : "Push-to-pass count for the Indycar",
    "tire_compound" : "It display the tire compound (hard, medium, soft) for the cars that can use different compounds like the F1 car",
    "tires_stints" : "It displays the number of laps done on the tires and the compound used. It tries to detect if the tires has been changed for the drivers or not depending of the time spent in the pits",
    "tires_nb_changes" : "It displays an estimated number of the tire changes in the session.\nThe estimation is based on the time spent in the pit stall so if a driver does some repairs and doesn't change any tire, the value will be wrong.",
    "empty" : "It is an empty column",
    "nblaps_race" : "Predicted Race length for the Car",
    "fuel" : "Estimated amount of fuel in the tank.",
    "predicted_pos" : "Predicted overall position at the end of the race.",
    "predicted_cpos" : "Predicted class position at the end of the race.",
    "laps_led" : "Number of laps led in the race.",
    "track_status" : "Track status",
}

menu_elements_dashboard_advanced = [

    {"param" : ["name"], "texte": "Display Name", "val_type": "str", "elt_type": "input", "long": 30, "newgroup": 1, "color_cycle_num": 4},
    {"param" : ["select_display"], "texte": "Select this display", "val_type": "int", "elt_type": "set_button",
        "texte2": "You can set a button to access directly to this display."
    },
    {"param" : ["ref_w"], "texte": "Width Reference", "val_type": "int", "step": 1, "long": 6, "elt_type": "input"},
    {"param" : ["ref_h"], "texte": "Height Reference", "val_type": "int", "step": 1, "long": 6, "elt_type": "input",
        "texte2": "These values define a box in pixels where the elements will be put, and this box will be resize to fit the dashboard window. When you activate the lights, it fills this box.<br><br>" +
        "For example, in the default settings, width and height reference are 1280 x 720, so the elements set in the dashboard advanced options are placed in a 1280 x 720 box. " +
        "By default the ratio is 1280 / 720 = 16 / 9 to adpapt most phones or tablets but you can change it if you use the dashboard in a window or as an overlay. "
    },
    {"param" : ["transparency_OBS"], "texte": "Transparent background", "val_type": "int", "elt_type": "switch",
        "texte2": "Useful if you want to add a background image or if you display the dashboard page as an overlay."
    },
    {"param" : ["image_de_fond"], "texte": "Background Image File Name", "val_type": "str", "elt_type": "input", "long": 30,
        "texte2": "Firstly, you have to activate the 'transparent background' setting above.<br>" +
        "Then, if you want a transparent background without any background image, let this field empty.<br>" +
        "If you want to add your own image, enter the file name here, save, copy the file in the <br>'My Documents/Joel Real Timing/displays_bg/' folder " +
        "and restart the JRT server."
    },
    {"param" : ["image_de_premier_plan"], "texte": "Foreground Image File Name", "val_type": "str", "elt_type": "input", "long": 30,
        "texte2": "If you don't want a foreground image, let this field empty.<br>" +
        "If you want to add your own image, enter the file name here, save, copy the file in the <br>'My Documents/Joel Real Timing/displays_bg/' folder " +
        "and restart the JRT server."
    },
    {"param" : ["font_family"], "texte": "Font Family", "val_type": "str", "elt_type": "input", "long": 30,
        "texte2": "You can enter the font name if you have installed it on windows.<br>You can also enter the file name of your own font file. Before that, you need to copy the file in the 'My&nbsp;Documents/Joel&nbsp;Real&nbsp;Timing/displays_fonts/' folder," +
        " to restart the JRT server and to reload the trackmap page.<br>" +
        "Note, that only otf, ttf and woff formats are working (the default value is Arial)."
    },
    {"param" : ["font_weight"], "texte": "Font Weight", "val_type": "str", "elt_type": "input", "long": 30,
        "texte2": "You have the choice between normal and bold (the default value is bold)."
    },
    {"param" : ["font_style"], "texte": "Font Style", "val_type": "str", "elt_type": "input", "long": 30, "endgroup": 1,
        "texte2": "You have the choice between normal and italic (the default value is normal)."
    },

    {"param" : ["grid_disp"], "texte": "Display the grid", "val_type": "int", "elt_type": "switch", "newgroup": 1,
        "texte2": "The grid will be displayed only when you make one element movable"
    },
    {"param" : ["grid_front"], "texte": "Move the grid to the front", "val_type": "int", "elt_type": "switch"},
    {"param" : ["grid_w"], "texte": "Grid width size", "val_type": "int", "step": 1, "long": 6, "elt_type": "input"},
    {"param" : ["grid_h"], "texte": "Grid height size", "val_type": "int", "step": 1, "long": 6, "elt_type": "input"},
    {"param" : ["grid_snap"], "texte": "Snap to grid", "val_type": "int", "elt_type": "switch", "endgroup": 1},


    /* REM les iframes sont ajout�s juste apr�s */


    {"param" : ["sof"], "group_num": 1, "texte": "Strength of field (SOF) for your class", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["sof_class0"], "group_num": 1, "texte": "Strength of field (SOF) for all classes", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["sof_class1"], "group_num": 1, "texte": "Strength of field (SOF) for the 1st class", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["sof_class2"], "group_num": 1, "texte": "Strength of field (SOF) for the 2nd class", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["sof_class3"], "group_num": 1, "texte": "Strength of field (SOF) for the 3rd class", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["sof_class4"], "group_num": 1, "texte": "Strength of field (SOF) for the 4th class", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["compass"], "group_num": 1, "texte": "Compass", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["weather"], "group_num": 1, "texte": "Weather", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},

    {"param" : ["session_type"], "group_num": 1, "texte": "Session type", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["trackname"], "group_num": 1, "texte": "Track name", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["trackconfig"], "group_num": 1, "texte": "Track config name", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["sky"], "group_num": 1, "texte": "Sky", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["humidity"], "group_num": 1, "texte": "Humidity", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["air_press"], "group_num": 1, "texte": "Air pressure", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["air_dens"], "group_num": 1, "texte": "Air density", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["fog"], "group_num": 1, "texte": "Fog level", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["wind_dir"], "group_num": 1, "texte": "Wind direction", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["wind_dir_deg"], "group_num": 1, "texte": "Wind direction in degrees", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["wind_speed"], "group_num": 1, "texte": "Wind speed", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["air_temp"], "group_num": 1, "texte": "Air temperature", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["track_temp"], "group_num": 1, "texte": "Track temperature", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["track_usage"], "group_num": 1, "texte": "Track usage", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},

    {"param" : ["date_ingame"], "group_num": 1, "texte": "Date in game", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["time_of_day"], "group_num": 1, "texte": "Time of day in game", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["time"], "group_num": 1, "texte": "Clock", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["gear"], "group_num": 9, "texte": "Gear", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["rpm"], "group_num": 9, "texte": "RPM", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["rpm_leds"], "group_num": 9, "texte": "RPM leds", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["speed"], "group_num": 9, "texte": "Speed", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pit_speed_diff"], "group_num": 9, "texte": "Pit Speed Diff", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["oil"], "group_num": 9, "texte": "Oil temperature", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["water"], "group_num": 9, "texte": "Water temperature", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["perfs"], "group_num": 9, "texte": "Last performance results for : 0-100km/H, 400m, 1000m", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["iR_gain"], "group_num": 9, "texte": "iRating gain", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["iR_proj"], "group_num": 9, "texte": "Projected iRating", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["apex_speed"], "group_num": 9, "texte": "Apex Speed", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["iracing_fuel_box"], "group_num": 11, "texte": "Begin Fueling Box in iRacing", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["iracing_fuel_add"], "group_num": 11, "texte": "Fuel Add Value in iRacing", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["iracing_windshield_box"], "group_num": 11, "texte": "Windshield Tearoff Box in iRacing", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["iracing_fastrepair_box"], "group_num": 11, "texte": "Fast Repair Box in iRacing", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["iracing_fastrepair_remaining"], "group_num": 11, "texte": "Fast Repair Remaining in iRacing", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["iracing_lf_tire_box"], "group_num": 11, "texte": "Left Front Tire Box in iRacing", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["iracing_rf_tire_box"], "group_num": 11, "texte": "Right Front Tire Box in iRacing", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["iracing_lr_tire_box"], "group_num": 11, "texte": "Left Rear Tire Box in iRacing", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["iracing_rr_tire_box"], "group_num": 11, "texte": "Right Rear Tire Box in iRacing", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["LeftTireSetsAvailable"], "group_num": 10, "texte": "Left Tires Sets Available", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["RightTireSetsAvailable"], "group_num": 10, "texte": "Right Tires Sets Available", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["RRpressure"], "group_num": 10, "texte": "<span style='color: #cccccc'>Right Rear Tire Pressure</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["RFpressure"], "group_num": 10, "texte": "<span style='color: #cccccc'>Right Front Tire Pressure</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["LFpressure"], "group_num": 10, "texte": "<span style='color: #cccccc'>Left Front Tire Pressure</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["LRpressure"], "group_num": 10, "texte": "<span style='color: #cccccc'>Left Rear Tire Pressure</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["RRtempL"], "group_num": 10, "texte": "<span style='color: #cccccc'>Right Rear Tire Temperature (Left Side)</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["RRtempM"], "group_num": 10, "texte": "<span style='color: #cccccc'>Right Rear Tire Temperature (Middle Side)</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["RRtempR"], "group_num": 10, "texte": "<span style='color: #cccccc'>Right Rear Tire Temperature (Right Side)</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["RFtempL"], "group_num": 10, "texte": "<span style='color: #cccccc'>Right Front Tire Temperature (Left Side)</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["RFtempM"], "group_num": 10, "texte": "<span style='color: #cccccc'>Right Front Tire Temperature (Middle Side)</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["RFtempR"], "group_num": 10, "texte": "<span style='color: #cccccc'>Right Front Tire Temperature (Right Side)</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["LFtempL"], "group_num": 10, "texte": "<span style='color: #cccccc'>Left Front Tire Temperature (Left Side)</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["LFtempM"], "group_num": 10, "texte": "<span style='color: #cccccc'>Left Front Tire Temperature (Middle Side)</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["LFtempR"], "group_num": 10, "texte": "<span style='color: #cccccc'>Left Front Tire Temperature (Right Side)</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["LRtempL"], "group_num": 10, "texte": "<span style='color: #cccccc'>Left Rear Tire Temperature (Left Side)</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["LRtempM"], "group_num": 10, "texte": "<span style='color: #cccccc'>Left Rear Tire Temperature (Middle Side)</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["LRtempR"], "group_num": 10, "texte": "<span style='color: #cccccc'>Left Rear Tire Temperature (Right Side)</span>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["RRwearL"], "group_num": 10, "texte": "Right Rear Tire Percent Tread Remaining (Left Side)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["RRwearM"], "group_num": 10, "texte": "Right Rear Tire Percent Tread Remaining (Middle Side)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["RRwearR"], "group_num": 10, "texte": "Right Rear Tire Percent Tread Remaining (Right Side)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["RFwearL"], "group_num": 10, "texte": "Right Front Tire Percent Tread Remaining (Left Side)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["RFwearM"], "group_num": 10, "texte": "Right Front Tire Percent Tread Remaining (Middle Side)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["RFwearR"], "group_num": 10, "texte": "Right Front Tire Percent Tread Remaining (Right Side)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["LFwearL"], "group_num": 10, "texte": "Left Front Tire Percent Tread Remaining (Left Side)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["LFwearM"], "group_num": 10, "texte": "Left Front Tire Percent Tread Remaining (Middle Side)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["LFwearR"], "group_num": 10, "texte": "Left Front Tire Percent Tread Remaining (Right Side)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["LRwearL"], "group_num": 10, "texte": "Left Rear Tire Percent Tread Remaining (Left Side)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["LRwearM"], "group_num": 10, "texte": "Left Rear Tire Percent Tread Remaining (Middle Side)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["LRwearR"], "group_num": 10, "texte": "Left Rear Tire Percent Tread Remaining (Right Side)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["tank_h"], "group_num": 2, "texte": "Fuel in the tank header", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["tank"], "group_num": 2, "texte": "Fuel in the tank", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["timeremain"], "group_num": 2, "texte": "Remaining time", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["estlaps_h"], "group_num": 2, "texte": "Estimated laps header", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["estlaps"], "group_num": 2, "texte": "Estimated laps", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["time_with_fuel"], "group_num": 2, "texte": "Estimated time you can drive with the fuel left in the tank", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["predicted_stint_time"], "group_num": 2, "texte": "Predicted full stint time including a complete pit stop", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["nblaps_race_driver"], "group_num": 2, "texte": "Predicted Race Length for the driver", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["nblaps_race_winner"], "group_num": 2, "texte": "Predicted Race Length for the virtual winner", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["nblaps_per_tank"], "group_num": 2, "texte": "Number of laps per full tank", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["nblaps_before_pit_window"], "group_num": 2, "texte": "Number of laps before the pit window", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["nblaps_to_equalize_stints"], "group_num": 2, "texte": "Number of laps before the next pit to equilibrate the stints", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["lapsremain_h"], "group_num": 2, "texte": "Remaining laps header", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["lapsremain"], "group_num": 2, "texte": "Remaining laps", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["lapsremain_orange_bar_pct"], "group_num": 2, "texte": "Orange gauge % in the remaining laps", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["lapsremain_gold_line_pct"], "group_num": 2, "texte": "Gold/blue vertical line % in the remaining laps", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["fuelneed_h"], "group_num": 2, "texte": "Fuel to add header", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["fuelneed"], "group_num": 2, "texte": "Fuel to add", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["fuelneed1"], "group_num": 2, "texte": "Fuel to add based on the last lap consumption", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["fuelneed5"], "group_num": 2, "texte": "Fuel to add based on the last 5 laps consumption", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["refuel_min"], "group_num": 2, "texte": "Min. fuel to add at the next pit to avoid an additionnal pit", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["refuel_avg"], "group_num": 2, "texte": "Fuel to add to equilibrate the stints", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["refuel_avg_now"], "group_num": 2, "texte": "Fuel to add to do equal stints if you pit now", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["last_partial_fuel_fill"], "group_num": 2, "texte": "Fuel to add on the last pit stop", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["conso"], "group_num": 2, "texte": "Lap consumption used for the calculations", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["conso1"], "group_num": 2, "texte": "Last lap consumption", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["conso5"], "group_num": 2, "texte": "Last 5 laps consumption average", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["target_conso"], "group_num": 2, "texte": "Consumption required to finish the race without pitting", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["est_conso"], "group_num": 2, "texte": "Estimated consumption of the current lap", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["fuel_end"], "group_num": 2, "texte": "Fuel left in the tank at the end of the race", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["nbpits"], "group_num": 2, "texte": "Number of pit stops needed", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["nextpittimelost"], "group_num": 2, "texte": "Time lost for next pit stop", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["traffic"], "group_num": 2, "texte": "Traffic prediction", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["traffic_pit"], "group_num": 2, "texte": "Traffic prediction after the pit stop", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["pre_pos"], "group_num": 3, "texte": "Position of the car <b><i>ahead</i></b> with dot and shadow", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["pre_pos2"], "group_num": 3, "texte": "Position of the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_cpos"], "group_num": 3, "texte": "Position in class of the car <b><i>ahead</i></b> with dot and shadow", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_cpos2"], "group_num": 3, "texte": "Position in class of the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_gain"], "group_num": 3, "texte": "Number of positions gained by the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_cgain"], "group_num": 3, "texte": "Number of positions gained in class by the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_best"], "group_num": 3, "texte": "Best laptime of the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_last"], "group_num": 3, "texte": "Last laptime of the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_rel"], "group_num": 3, "texte": "Relative gap with the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["delta_pre"], "group_num": 3, "texte": "Delta graphic with the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_stint"], "group_num": 3, "texte": "Number of laps since the last pit stop for the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_name"], "group_num": 3, "texte": "Driver Name of the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_p2p"], "group_num": 3, "texte": "Push to Pass Count for the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_lic"], "group_num": 3, "texte": "License of the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_ir"], "group_num": 3, "texte": "iRating of the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_track_status"], "group_num": 3, "texte": "Track status of the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_tire_compound"], "group_num": 3, "texte": "Tire compound of the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_tires_stints"], "group_num": 3, "texte": "Tire compound and stints of the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_tires_nb_changes"], "group_num": 3, "texte": "Estimated number of tire changes for the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_club_name"], "group_num": 3, "texte": "Club name for the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_club_logo"], "group_num": 3, "texte": "Club logo for the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_club_flag"], "group_num": 3, "texte": "Club flag for the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_car_name"], "group_num": 3, "texte": "Car name for the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_car_logo"], "group_num": 3, "texte": "Car logo for the car <b><i>ahead</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_topspeed"], "group_num": 3, "texte": "Maximum speed for the car <b><i>ahead</i></b> during the session", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_max_speed"], "group_num": 3, "texte": "Maximum speed for the car <b><i>ahead</i></b> before the last corner", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["pre_apex_speed"], "group_num": 3, "texte": "Minimum speed for the car <b><i>ahead</i></b> in the last corner", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["me_pos"], "group_num": 4, "texte": "Position of the car <b><i>focused</i></b> with dot and shadow", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["me_pos2"], "group_num": 4, "texte": "Position of the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_cpos"], "group_num": 4, "texte": "Position in class of the car <b><i>focused</i></b> with dot and shadow", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_cpos2"], "group_num": 4, "texte": "Position in class of the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_gain"], "group_num": 4, "texte": "Number of positions gained for the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_cgain"], "group_num": 4, "texte": "Number of positions gained in class for the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_best"], "group_num": 4, "texte": "Best laptime for the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_last"], "group_num": 4, "texte": "Last laptime for the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_current"], "group_num": 4, "texte": "Current laptime", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_estlaptime"], "group_num": 4, "texte": "Estimated laptime", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_stint"], "group_num": 4, "texte": "Number of laps since the last pit stop for the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_lc"], "group_num": 4, "texte": "Number of laps since the race start for the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_name"], "group_num": 4, "texte": "Driver Name of the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["delta_best_h"], "group_num": 4, "texte": "Best session laptime delta header", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["delta_best"], "group_num": 4, "texte": "Best session laptime delta", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["delta_last_h"], "group_num": 4, "texte": "Last session laptime delta header", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["delta_last"], "group_num": 4, "texte": "Last session laptime delta", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_gap"], "group_num": 4, "texte": "Gap with the leader", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_cgap"], "group_num": 4, "texte": "Gap with the class leader", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["delta_avg_h"], "group_num": 4, "texte": "Average delta header", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["delta_avg"], "group_num": 4, "texte": "Average delta with the fastest stint in the session", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["delta_tot0"], "group_num": 4, "texte": "Delta with the fastest stint in the session", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["delta_tot"], "group_num": 4, "texte": "Delta with the fastest stint in the session + (total)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["delta_tot2"], "group_num": 4, "texte": "Delta with the fastest stint in the session + (average)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["inc"], "group_num": 4, "texte": "Number of incidents / incidents limit for the <b><i>team/driver</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["points"], "group_num": 4, "texte": "Points for the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_p2p"], "group_num": 4, "texte": "Push to Pass Count for the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_tire_compound"], "group_num": 4, "texte": "Tire compound of the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_tires_stints"], "group_num": 4, "texte": "Tire compound and stints in the stints of the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_tires_nb_changes"], "group_num": 4, "texte": "Estimated number of tire changes for the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_club_name"], "group_num": 4, "texte": "Club name for the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_club_logo"], "group_num": 4, "texte": "Club logo for the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_club_flag"], "group_num": 4, "texte": "Club flag for the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_car_name"], "group_num": 4, "texte": "Car name for the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_car_logo"], "group_num": 4, "texte": "Car logo for the car <b><i>focused</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_topspeed"], "group_num": 4, "texte": "Maximum speed for the car <b><i>focused</i></b> during the session", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_max_speed"], "group_num": 4, "texte": "Maximum speed for the car <b><i>focused</i></b> before the last corner", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["me_apex_speed"], "group_num": 4, "texte": "Minimum speed for the car <b><i>focused</i></b> in the last corner", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["post_pos"], "group_num": 5, "texte": "Position of the car <b><i>behind</i></b> with dot and shadow", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["post_pos2"], "group_num": 5, "texte": "Position of the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_cpos"], "group_num": 5, "texte": "Position in class of the car <b><i>behind</i></b> with dot and shadow", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_cpos2"], "group_num": 5, "texte": "Position in class of the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_gain"], "group_num": 5, "texte": "Number of positions gained by the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_cgain"], "group_num": 5, "texte": "Number of positions gained in class by the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_best"], "group_num": 5, "texte": "Best laptime of the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_last"], "group_num": 5, "texte": "Last laptime of the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_rel"], "group_num": 5, "texte": "Relative gap with the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["delta_post"], "group_num": 5, "texte": "Delta graphic with the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_stint"], "group_num": 5, "texte": "Number of laps since the last pit stop for the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_name"], "group_num": 5, "texte": "Driver Name of the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_p2p"], "group_num": 5, "texte": "Push to Pass Count for the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_lic"], "group_num": 5, "texte": "License of the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_ir"], "group_num": 5, "texte": "iRating of the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_track_status"], "group_num": 5, "texte": "Track status of the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_tire_compound"], "group_num": 5, "texte": "Tire compound of the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_tires_stints"], "group_num": 5, "texte": "Tire compound and stints of the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_tires_nb_changes"], "group_num": 5, "texte": "Estimated number of tire changes for the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_club_name"], "group_num": 5, "texte": "Club name for the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_club_logo"], "group_num": 5, "texte": "Club logo for the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_club_flag"], "group_num": 5, "texte": "Club flag for the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_car_name"], "group_num": 5, "texte": "Car name for the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_car_logo"], "group_num": 5, "texte": "Car logo for the car <b><i>behind</i></b>", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_topspeed"], "group_num": 5, "texte": "Maximum speed for the car <b><i>behind</i></b> during the session", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_max_speed"], "group_num": 5, "texte": "Maximum speed for the car <b><i>behind</i></b> before the last corner", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["post_apex_speed"], "group_num": 5, "texte": "Minimum speed for the car <b><i>behind</i></b> in the last corner", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["b_cont"], "group_num": 6, "texte": "Brake vertical bar", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["brake2"], "group_num": 6, "texte": "Brake horizontal bar", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["brake3"], "group_num": 6, "texte": "Brake horizontal bar including %", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["peak_brake_pressure"], "group_num": 6, "texte": "Peak Brake Pressure in %", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["t_cont"], "group_num": 6, "texte": "Throttle vertical bar", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["throttle2"], "group_num": 6, "texte": "Throttle horizontal bar", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["throttle3"], "group_num": 6, "texte": "Throttle horizontal bar including %", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["c_cont"], "group_num": 6, "texte": "Clutch vertical bar", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["clutch2"], "group_num": 6, "texte": "Clutch horizontal bar including %", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["ffbpct_cont"], "group_num": 6, "texte": "Force Feedback vertical bar", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["ffb"], "group_num": 6, "texte": "Force Feedback value in Nm", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["ffb2"], "group_num": 6, "texte": "Force feedback horizontal bar including the value in Nm", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["bb"], "group_num": 7, "texte": "Brake bias", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["peak_bb"], "group_num": 7, "texte": "Peak brake bias", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["tc"], "group_num": 7, "texte": "Traction control", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["tc2"], "group_num": 7, "texte": "Traction control 2", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["abs"], "group_num": 7, "texte": "ABS", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["abs_light"], "group_num": 7, "texte": "ABS light when ABS is active", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["eng_br"], "group_num": 7, "texte": "Engine braking", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["fuel_mixture"], "group_num": 7, "texte": "Fuel mixture", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["boo"], "group_num": 7, "texte": "Boost Map", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["t_sh"], "group_num": 7, "texte": "Throttle Shape (TPS)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["eng_pw"], "group_num": 7, "texte": "Engine power (or fuel mixture depending of the cars)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["diff_preload"], "group_num": 7, "texte": "Differential preload", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["diff_entry"], "group_num": 7, "texte": "Differential entry", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["diff_mid"], "group_num": 7, "texte": "Differential middle", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["diff_exit"], "group_num": 7, "texte": "Differential exit", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["wj"], "group_num": 7, "texte": "Weight Jacker", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["arb_f"], "group_num": 7, "texte": "Front ARB", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["arb_r"], "group_num": 7, "texte": "Rear ARB", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["powersteering"], "group_num": 7, "texte": "Power Steering Assist", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},

    {"param" : ["drs"], "group_num": 8, "texte": "DRS Status", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "newgroup": 1},
    {"param" : ["mgum"], "group_num": 8, "texte": "Target batt SoC request for the McLaren F1", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["mgua"], "group_num": 8, "texte": "ERS/HYS/MGU-K deploy mode", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["mguf"], "group_num": 8, "texte": "ERS/HYS deploy trim (grayed if auto mode is selected)", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["ers"], "group_num": 8, "texte": "ERS/HYS battery charge", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["ers_bar"], "group_num": 8, "texte": "ERS/HYS bar", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["ersco"], "group_num": 8, "texte": "ERS/HYS last lap consumption", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["ers_margin"], "group_num": 8, "texte": "ERS/HYS margin for the LMP1 cars", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["mgul"], "group_num": 8, "texte": "Current battery deployment % in the lap", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["mgu"], "group_num": 8, "texte": "Battery % used last lap", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["regen_lap"], "group_num": 8, "texte": "Battery % regenerated on the last lap", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["regen_turn"], "group_num": 8, "texte": "Battery % regenerated on the last braking zone", "val_type": "int", "step": 1, "long": 4, "elt_type": "input"},
    {"param" : ["regen_gain"], "group_num": 8, "texte": "Regen gain", "val_type": "int", "step": 1, "long": 4, "elt_type": "input", "endgroup": 1},
];


// On remplit un tableau permettant de retrouver le nom complet (texte) d'un param�tre avanc�
dashboard_advanced_texte = {};
for (var i in menu_elements_dashboard_advanced) {
    var name = menu_elements_dashboard_advanced[i]["param"][0];
    var texte = menu_elements_dashboard_advanced[i]["texte"];
    dashboard_advanced_texte[name] = texte;
}


dashboard_advanced_infos_bulle = {
    "rpm_leds": "The behaviour of the leds can be changed for each car in JRT&nbsp;Config&nbsp;>&nbsp;Car&nbsp;Parameters",
    "pit_speed_diff": "Display the speed difference with the pitlane speed limit when this difference is under 3.3 km/h",
    "RRpressure": "This value is updated live in practice if you activated tires data in JRT&nbsp;Config. It will display the cold pressure in race or if you deactivated tires data in JRT&nbsp;Config.",
    "RFpressure": "This value is updated live in practice if you activated tires data in JRT&nbsp;Config. It will display the cold pressure in race or if you deactivated tires data in JRT&nbsp;Config.",
    "LRpressure": "This value is updated live in practice if you activated tires data in JRT&nbsp;Config. It will display the cold pressure in race or if you deactivated tires data in JRT&nbsp;Config.",
    "LFpressure": "This value is updated live in practice if you activated tires data in JRT&nbsp;Config. It will display the cold pressure in race or if you deactivated tires data in JRT&nbsp;Config.",
    "RRtempL": "In practice and if you activated tires data in JRT&nbsp;Config, it is the surface temperature and it is updated live. In race or if you deactivated tires data in JRT&nbsp;Config, it is the core temperature and is updated only after the pit stop.",
    "RRtempM": "In practice and if you activated tires data in JRT&nbsp;Config, it is the surface temperature and it is updated live. In race or if you deactivated tires data in JRT&nbsp;Config, it is the core temperature and is updated only after the pit stop.",
    "RRtempR": "In practice and if you activated tires data in JRT&nbsp;Config, it is the surface temperature and it is updated live. In race or if you deactivated tires data in JRT&nbsp;Config, it is the core temperature and is updated only after the pit stop.",
    "RFtempL": "In practice and if you activated tires data in JRT&nbsp;Config, it is the surface temperature and it is updated live. In race or if you deactivated tires data in JRT&nbsp;Config, it is the core temperature and is updated only after the pit stop.",
    "RFtempM": "In practice and if you activated tires data in JRT&nbsp;Config, it is the surface temperature and it is updated live. In race or if you deactivated tires data in JRT&nbsp;Config, it is the core temperature and is updated only after the pit stop.",
    "RFtempR": "In practice and if you activated tires data in JRT&nbsp;Config, it is the surface temperature and it is updated live. In race or if you deactivated tires data in JRT&nbsp;Config, it is the core temperature and is updated only after the pit stop.",
    "LFtempL": "In practice and if you activated tires data in JRT&nbsp;Config, it is the surface temperature and it is updated live. In race or if you deactivated tires data in JRT&nbsp;Config, it is the core temperature and is updated only after the pit stop.",
    "LFtempM": "In practice and if you activated tires data in JRT&nbsp;Config, it is the surface temperature and it is updated live. In race or if you deactivated tires data in JRT&nbsp;Config, it is the core temperature and is updated only after the pit stop.",
    "LFtempR": "In practice and if you activated tires data in JRT&nbsp;Config, it is the surface temperature and it is updated live. In race or if you deactivated tires data in JRT&nbsp;Config, it is the core temperature and is updated only after the pit stop.",
    "LRtempL": "In practice and if you activated tires data in JRT&nbsp;Config, it is the surface temperature and it is updated live. In race or if you deactivated tires data in JRT&nbsp;Config, it is the core temperature and is updated only after the pit stop.",
    "LRtempM": "In practice and if you activated tires data in JRT&nbsp;Config, it is the surface temperature and it is updated live. In race or if you deactivated tires data in JRT&nbsp;Config, it is the core temperature and is updated only after the pit stop.",
    "LRtempR": "In practice and if you activated tires data in JRT&nbsp;Config, it is the surface temperature and it is updated live. In race or if you deactivated tires data in JRT&nbsp;Config, it is the core temperature and is updated only after the pit stop.",
    "RRwearL": "It is updated only after the pit stop.",
    "RRwearM": "It is updated only after the pit stop.",
    "RRwearR": "It is updated only after the pit stop.",
    "RFwearL": "It is updated only after the pit stop.",
    "RFwearM": "It is updated only after the pit stop.",
    "RFwearR": "It is updated only after the pit stop.",
    "LFwearL": "It is updated only after the pit stop.",
    "LFwearM": "It is updated only after the pit stop.",
    "LFwearR": "It is updated only after the pit stop.",
    "LRwearL": "It is updated only after the pit stop.",
    "LRwearM": "It is updated only after the pit stop.",
    "LRwearR": "It is updated only after the pit stop.",
    "estlaps": "Number of laps you can do without refueling (based on the calculations mode selected).\nSee the website for explanations on the background colors.",
    "fuelneed": "Amount of fuel to add to finish the race (based on the calculations mode selected) or the 'fuel to add' manual value set for the semi-auto mode.\nSee the website for explanations on the background colors.",
    "conso": "lap consumption based on the calculations mode selected",
    "est_conso": "It is calculated based on your last lap consumption",
    "nbpits": "Number of pit stops needed to finish the race. On the background, you have a dark red gauge that indicates how close you are to have an additionnal pit stop required.",
    "last_partial_fuel_fill": "It is the last partial fuel fill in case you put full tank for the others stints and refuel at the last moment every time.",
    "nextpittimelost": "Time lost in the next pit considering the tires and fuel settings",
    "traffic": "It displays 3 numbers. The first (resp. second, third) number is the number of laps in which you meet the first (resp. second, third) car in the traffic. The colors correspond to the car class. A red apostrophe behind the number indicates that the car you will meet is faster. JRT considers cars as traffic if they are at least 0.5 seconds faster or slower",
    "traffic_pit": "The same than the traffic value but after the pit stop",
    "ers": "The background is red, it becomes magenta if in the last turn the ers battery was recharged to 100%, and it becomes grey if the battery reached 0% in the lap",
    "ers_margin": "It displays 2 little red and green bars and a number. When you do a complete lap with the same mode, a reference lap with the ers use is calculated. When for a mode a reference lap has been calculated, it can display the bars and the number. Then, the reference lap is adjusted continually even when you change mode. The red bar on top shows the percent of battery you can use with the boost button without taking the risk to have the battery empty in one lap. You have also a light blue bar that may appears and indicate how many percent of boost is free to use without loosing energy overall because of the recharge until one lap. But be carefull, it doesn't take into acount the amount energy available for the lap. The green bar on bottom shows the percent of additional mgu you can use with the boost button without taking the risk to reach 100% before the end of the lap. The red (resp. green) bar goes yellow (resp. white) and is align on the right when there is not enough battery (resp. mgu). The number is the delta battery percent with the reference lap for the mode selected. The background becomes orange when the boost button is pushed and when the mode selected would not have use the boost. IMPORTANT NOTE : To be more accurate, JRT need to know if you are using the boost button or not. You will find in JRT Config > Main Options > General an option to set what is your boost button for iRacing. It is also important that when you are doing your laps with a certain mode to dp some laps where the battery don't reach 100% or 0%, otherwise, at these parts of the track, JRT can't calculate how much battery can be regenerated or how much battery is consumed. The bars height vary depending of the font size for the delta. If you put 0, both bars will fill the box and the delta number will disappear. The background is black to indicate that the reference lap data on the part of the track you are driving is missing. If it's white, that means that it has just been calculated and if it's blue or orange, it's good.",
    "mgul": "The background is usually green and becomes grey until the end of the lap when there is not enough energy for the boost",
    "delta_tot": "The total time of the fastest stint is displayed in parentheses in seconds",
    "delta_tot2": "The average laptime of the fastest stint is displayed in parentheses",
    "refuel_avg": "Use it in conjonction with the 'Number&nbsp;of&nbsp;laps&nbsp;before&nbsp;the&nbsp;next&nbsp;pit&nbsp;to&nbsp;equilibrate&nbsp;the&nbsp;stints' value to optimize your stints",
    "peak_brake_pressure": "Maximum brake pressure in the latest braking zone",
}


// On ajoute les options pour les iframes
for (var n = 1; n <= 4; n++) {
    menu_elements_dashboard_advanced.push(
        {"param" : ["iframe" + n + "_disp"], "texte": "Activate the Frame #" + n, "val_type": "int", "elt_type": "switch", "newgroup": 1,
            "texte2": "You can display an html page in a frame. You specify the address below."
        },
        {"param" : ["iframe" + n + "_src"], "texte": "Frame #" + n + " - Source", "val_type": "str", "elt_type": "input", "long": 50,
            "texte2": "Enter the html page address under this form : timing.html or http://127.0.0.1:8000/timing.html"
        },
        {"param" : ["iframe" + n + "_X"], "texte": "Frame #" + n + " - X position", "val_type": "int", "step": 1, "long": 6, "elt_type": "input"},
        {"param" : ["iframe" + n + "_Y"], "texte": "Frame #" + n + " - Y position", "val_type": "int", "step": 1, "long": 6, "elt_type": "input"},
        {"param" : ["iframe" + n + "_W"], "texte": "Frame #" + n + " - Width", "val_type": "int", "step": 1, "long": 6, "elt_type": "input"},
        {"param" : ["iframe" + n + "_H"], "texte": "Frame #" + n + " - Height", "val_type": "int", "step": 1, "long": 6, "elt_type": "input"},
        {"param" : ["iframe" + n + "_zIndex"], "texte": "Frame #" + n + " - Z-index", "val_type": "int", "step": 1, "long": 6, "elt_type": "input",
            "texte2": "- Enter the value 4 or higher to have the frame displayed over the other dashboard elements.<br>" +
            "- Enter the value -2 or lower to have the frame displayed under the other dashboard elements. With this value you have to activate the 'Transparent&nbsp;background' setting for this dashboard " +
            "otherwise it will be hidden by the dashboard background."
        },
        {"param" : ["iframe" + n + "_click_through"], "texte": "Frame #" + n + " - Click through", "val_type": "int", "elt_type": "switch", "endgroup": 1,
            "texte2": "Activate this option if you want to be able to click through the frame."
        },
    );
}



// Liste de certaines options sp�ciales des displays des dashboards
// Les options qui ne sont pas dans cette liste sont les �l�ments qu'on peut param�trer (X, Y, W, H, Font, Opac., ...)
displays_list = {
    "name": 1,
    "select_display": 1,
    "ref_w": 1,
    "ref_h": 1,
    "transparency_OBS": 1,
    "image_de_fond": 1,
    "image_de_premier_plan": 1,
    "font_family": 1,
    "font_weight": 1,
    "font_style": 1,
    "iframe1_disp": 1,
    "iframe1_src": 1,
    "iframe1_X": 1,
    "iframe1_Y": 1,
    "iframe1_W": 1,
    "iframe1_H": 1,
    "iframe1_zIndex": 1,
    "iframe1_click_through": 1,
    "iframe2_disp": 1,
    "iframe2_src": 1,
    "iframe2_X": 1,
    "iframe2_Y": 1,
    "iframe2_W": 1,
    "iframe2_H": 1,
    "iframe2_zIndex": 1,
    "iframe2_click_through": 1,
    "iframe3_disp": 1,
    "iframe3_src": 1,
    "iframe3_X": 1,
    "iframe3_Y": 1,
    "iframe3_W": 1,
    "iframe3_H": 1,
    "iframe3_zIndex": 1,
    "iframe3_click_through": 1,
    "iframe4_disp": 1,
    "iframe4_src": 1,
    "iframe4_X": 1,
    "iframe4_Y": 1,
    "iframe4_W": 1,
    "iframe4_H": 1,
    "iframe4_zIndex": 1,
    "iframe4_click_through": 1,
    "grid_disp": 1,
    "grid_front": 1,
    "grid_w": 1,
    "grid_h": 1,
    "grid_snap": 1,
}

// Largeur les colonnes affich�es dans les options avanc�es du dashboard
// 0, Name, X, Y, W, H, Font, Opac.
largeur_colonnes_dashboard_display = [0, 29, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5];

dashboard_advanced_col = {
    1: "white",
    2: "white",
    3: "white",
    4: "white",
    5: "white",
    6: "white",
    7: "white",
    8: "white",
    9: "white",
    10: "white",
    11: "white",
};
dashboard_advanced_bg = {
    1: "#00ddff",
    2: "#ff8800",
    3: "#ff0000",
    4: "#ffffff",
    5: "#00ff00",
    6: "#00aaff",
    7: "#ff66aa",
    8: "#bb77ff",
    9: "#ffff00",
    10: "#dd00dd",
    11: "#000000",
};

var_dashboard_advanced = [
    {nom : "disp", texte: "", "val_type": "int", "step": 1, "long": 3, elt_type: "checkbox", is_more_options: 0},
    {nom : "x", texte: "X", "val_type": "int", "step": 1, "long": 4, elt_type: "input", is_more_options: 0},
    {nom : "y", texte: "Y", "val_type": "int", "step": 1, "long": 4, elt_type: "input", is_more_options: 0},
    {nom : "w", texte: "W", "val_type": "int", "step": 1, "long": 4, elt_type: "input", is_more_options: 0},
    {nom : "h", texte: "H", "val_type": "int", "step": 1, "long": 4, elt_type: "input", is_more_options: 0},
    {nom : "f", texte: "Font", "val_type": "float", "step": 1, "long": 4, elt_type: "input", is_more_options: 0},
    {nom : "bg", texte: "Opac.", "val_type": "float", "step": 0.1, "long": 4, elt_type: "input", is_more_options: 0},

//];
//DEBUG = [
    /* more options - options suppl�mentaires */

    {nom : "highlight", texte: "Show the box and make it movable", "val_type": "int", elt_type: "switch", is_more_options: 1, "endgroup": 1, default_value: 0},

    {nom : "zindex_offset", texte: "Z-index offset", "val_type": "int", "step": 1, "long": 4, elt_type: "input", is_more_options: 1, "endgroup": 1, default_value: 0,
        "texte2": "Increase this value if the box is hidden by another element",
    },

    {nom : "box_border_left_width", texte: "Box border Left Width", "val_type": "float", "step": 1, "long": 4, elt_type: "input", is_more_options: 1, default_value: 0},
    {nom : "box_border_top_width", texte: "Box border Top Width", "val_type": "float", "step": 1, "long": 4, elt_type: "input", is_more_options: 1, default_value: 0},
    {nom : "box_border_right_width", texte: "Box border Right Width", "val_type": "float", "step": 1, "long": 4, elt_type: "input", is_more_options: 1, default_value: 0},
    {nom : "box_border_bottom_width", texte: "Box border Bottom Width", "val_type": "float", "step": 1, "long": 4, elt_type: "input", is_more_options: 1, default_value: 0},
    {nom : "ccc_box_border_color", texte: "Use the class color as Box border Color", "val_type": "int", elt_type: "switch", is_more_options: 1, add_carclasscolor_option: 1, default_value: 0},
    {nom : "box_border_color", texte: "Box border Color", "val_type": "str", "long": 5, elt_type: "input_color", is_more_options: 1, default_value: "#666666"},
    {nom : "box_border_tl_radius", texte: "Box border Top Left Radius", "val_type": "int", "step": 1, "long": 4, elt_type: "input", is_more_options: 1, default_value: 0},
    {nom : "box_border_tr_radius", texte: "Box border Top Right Radius", "val_type": "int", "step": 1, "long": 4, elt_type: "input", is_more_options: 1, default_value: 0},
    {nom : "box_border_bl_radius", texte: "Box border Bottom Left Radius", "val_type": "int", "step": 1, "long": 4, elt_type: "input", is_more_options: 1, default_value: 0},
    {nom : "box_border_br_radius", texte: "Box border Bottom Right Radius", "val_type": "int", "step": 1, "long": 4, elt_type: "input", is_more_options: 1, "endgroup": 1, default_value: 0},

    /* options pour la valeur */
    {nom : "perso_bg_color", texte: "Personalize the Value Background Color", "val_type": "int", elt_type: "switch", is_more_options: 1, default_value: 0},
    {nom : "ccc_bg_color", texte: "Use the class color as Background Color", "val_type": "int", elt_type: "switch", is_more_options: 1, add_carclasscolor_option: 1, default_value: 0},
    {nom : "bg_color", texte: "Background Color", "val_type": "str", "long": 5, elt_type: "input_color", is_more_options: 1, default_value: "#000000"},
    {nom : "perso_font_color", texte: "Personalize the Value Font Color", "val_type": "int", elt_type: "switch", is_more_options: 1, default_value: 0},
    {nom : "adapt_font_color", texte: "Adapt the Value Font Color to the background", "val_type": "int", elt_type: "switch", is_more_options: 1, add_carclasscolor_option: 1, default_value: 0,
        "texte2": "The Value Font Color will be white or black depending of the background to keep a good contrast."
    },
    {nom : "ccc_font_color", texte: "Use the class color as Font Color", "val_type": "int", elt_type: "switch", is_more_options: 1, add_carclasscolor_option: 1, default_value: 0},
    {nom : "font_color", texte: "Font Color", "val_type": "str", "long": 5, elt_type: "input_color", is_more_options: 1, default_value: "#ffffff"},
    {nom : "perso_font_family", texte: "Personalize the Value Font Family", "val_type": "int", elt_type: "switch", is_more_options: 1, default_value: 0},
    {nom : "font_family", texte: "Font Family", "val_type": "str", "long": 29, elt_type: "input", is_more_options: 1, default_value: "Arial"},
    {nom : "perso_font_weight", texte: "Personalize the Value Font Weight", "val_type": "int", elt_type: "switch", is_more_options: 1, default_value: 0},
    {nom : "font_weight", texte: "Font Weight", "val_type": "str", "long": 29, elt_type: "input", is_more_options: 1, default_value: "bold"},
    {nom : "perso_font_style", texte: "Personalize the Value Font Style", "val_type": "int", elt_type: "switch", is_more_options: 1, default_value: 0},
    {nom : "font_style", texte: "Font Style", "val_type": "str", "long": 29, elt_type: "input", is_more_options: 1, "endgroup": 1, default_value: "normal"},

    /* options pour l'en-t�te (header) */
    {nom : "header_disp", texte: "Display the Header", "val_type": "int", elt_type: "switch", is_more_options: 1, /*"newgroup": 1,*/ default_value: 0},
    {nom : "header_width", texte: "Header Width", "val_type": "int", "step": 1, "long": 4, elt_type:"input", is_more_options: 1, default_value: 32},
    {nom : "header_font_size", texte: "Header Font Size", "val_type": "float", "step": 1, "long": 4, elt_type:"input", is_more_options: 1, default_value: 24},
    {nom : "header_text", texte: "Header Text", "val_type": "str", "long": 29, elt_type: "input", is_more_options: 1, default_value: "Header",
        "texte2": "You can use html code here."
    },
    {nom: "header_text_orientation", texte: {titre: "Header Text Orientation", options: ["Horizontal", "Vertical"]}, "val_type": "int", elt_type: "select", is_more_options: 1, default_value: 0},
    {nom: "header_position", texte: {titre: "Header Position", options: ["Top", "Left", "Bottom"]}, "val_type": "int", elt_type: "select", is_more_options: 1, default_value: 0},
    {nom : "header_is_foreground", texte: "Put the header in the foreground and make it free to move", "val_type": "int", elt_type: "switch", is_more_options: 1, default_value: 0,
        "texte2": "This option is usefull if you want the header to be displayed in front of the Box border and move it using the offset value below."
    },
    {nom : "header_x_offset", texte: "Header horizontal offset", "val_type": "float", "step": 1, "long": 4, elt_type:"input", is_more_options: 1, default_value: 0},
    {nom : "header_y_offset", texte: "Header vertical offset", "val_type": "float", "step": 1, "long": 4, elt_type:"input", is_more_options: 1, default_value: 0},
    {nom : "ccc_header_bg_color", texte: "Use the class color as Header Background Color", "val_type": "int", elt_type: "switch", is_more_options: 1, add_carclasscolor_option: 1, default_value: 0},
    {nom : "header_bg_color", texte: "Header Background Color", "val_type": "str", "long": 5, elt_type: "input_color", is_more_options: 1, default_value: "#666666"},
    {nom : "header_bg_opacity", texte: "Header Background Opacity", "val_type": "float", "step": 0.1, "long": 4, elt_type:"input", is_more_options: 1, default_value: 1},
    {nom : "adapt_header_font_color", texte: "Adapt the Header Font Color to the background", "val_type": "int", elt_type: "switch", is_more_options: 1, add_carclasscolor_option: 1, default_value: 0,
        "texte2": "The Header Font Color will be white or black depending of the background to keep a good contrast."
    },
    {nom : "ccc_header_font_color", texte: "Use the class color as Header Font Color", "val_type": "int", elt_type: "switch", is_more_options: 1, add_carclasscolor_option: 1, default_value: 0},
    {nom : "header_font_color", texte: "Header Font Color", "val_type": "str", "long": 5, elt_type: "input_color", is_more_options: 1, default_value: "#bbbbbb"},
    {nom : "header_font_family", texte: "Header Font Family", "val_type": "str", "long": 29, elt_type: "input", is_more_options: 1, default_value: "Arial"},
    {nom : "header_font_weight", texte: "Header Font Weight", "val_type": "str", "long": 29, elt_type: "input", is_more_options: 1, default_value: "bold"},
    {nom : "header_font_style", texte: "Header Font Style", "val_type": "str", "long": 29, elt_type: "input", is_more_options: 1, default_value: "normal"},
    {nom : "header_border_left_width", texte: "Header border Left Width", "val_type": "float", "step": 1, "long": 4, elt_type:"input", is_more_options: 1, default_value: 0},
    {nom : "header_border_top_width", texte: "Header border Top Width", "val_type": "float", "step": 1, "long": 4, elt_type:"input", is_more_options: 1, default_value: 0},
    {nom : "header_border_right_width", texte: "Header border Right Width", "val_type": "float", "step": 1, "long": 4, elt_type:"input", is_more_options: 1, default_value: 0},
    {nom : "header_border_bottom_width", texte: "Header border Bottom Width", "val_type": "float", "step": 1, "long": 4, elt_type:"input", is_more_options: 1, default_value: 0},
    {nom : "ccc_header_border_color", texte: "Use the class color as Header Border Color", "val_type": "int", elt_type: "switch", is_more_options: 1, add_carclasscolor_option: 1, default_value: 0},
    {nom : "header_border_color", texte: "Header border Color", "val_type": "str", "long": 5, elt_type: "input_color", is_more_options: 1, default_value: "#0088ff"},
    {nom : "header_border_opacity", texte: "Header border Opacity", "val_type": "float", "step": 0.1, "long": 4, elt_type:"input", is_more_options: 1, default_value: 1},
    {nom : "header_border_tl_radius", texte: "Header border Top Left Radius", "val_type": "int", "step": 1, "long": 4, elt_type:"input", is_more_options: 1, default_value: 0},
    {nom : "header_border_tr_radius", texte: "Header border Top Right Radius", "val_type": "int", "step": 1, "long": 4, elt_type:"input", is_more_options: 1, default_value: 0},
    {nom : "header_border_bl_radius", texte: "Header border Bottom Left Radius", "val_type": "int", "step": 1, "long": 4, elt_type:"input", is_more_options: 1, default_value: 0},
    {nom : "header_border_br_radius", texte: "Header border Bottom Right Radius", "val_type": "int", "step": 1, "long": 4, elt_type:"input", is_more_options: 1, "endgroup": 1, default_value: 0},

];

add_carclasscolor_option_list = {};
add_carclasscolor_option_list["pre"] = {
    "pre_pos": 1,
    "pre_pos2": 1,
    "pre_cpos": 1,
    "pre_cpos2": 1,
    "pre_gain": 1,
    "pre_cgain": 1,
    "pre_best": 1,
    "pre_last": 1,
    "pre_rel": 1,
    "pre_stint": 1,
    "pre_name": 1,
    "pre_topspeed": 1,
    "pre_max_speed": 1,
    "pre_apex_speed": 1,
    "pre_p2p": 1,
    "pre_lic": 1,
    "pre_ir": 1,
    "pre_track_status": 1,
    "pre_tire_compound": 1,
    "pre_tires_stints": 1,
    "pre_tires_nb_changes": 1,
    "pre_club_name": 1,
    "pre_car_name": 1,
}
add_carclasscolor_option_list["me"] = {
    "me_pos": 1,
    "me_pos2": 1,
    "me_cpos": 1,
    "me_cpos2": 1,
    "me_gain": 1,
    "me_cgain": 1,
    "me_best": 1,
    "me_last": 1,
    "me_current": 1,
    "me_estlaptime": 1,
    "me_stint": 1,
    "me_lc": 1,
    "me_name": 1,
    "delta_best": 1,
    "delta_last": 1,
    "me_gap": 1,
    "me_cgap": 1,
    "me_topspeed": 1,
    "me_max_speed": 1,
    "me_apex_speed": 1,
    "delta_avg": 1,
    "delta_tot0": 1,
    "delta_tot": 1,
    "delta_tot2": 1,
    "inc": 1,
    "points": 1,
    "me_p2p": 1,
    "me_tire_compound": 1,
    "me_tires_stints": 1,
    "me_tires_nb_changes": 1,
    "me_club_name": 1,
    "me_car_name": 1,
}
add_carclasscolor_option_list["post"] = {
    "post_pos": 1,
    "post_pos2": 1,
    "post_cpos": 1,
    "post_cpos2": 1,
    "post_gain": 1,
    "post_cgain": 1,
    "post_best": 1,
    "post_last": 1,
    "post_rel": 1,
    "post_stint": 1,
    "post_name": 1,
    "post_topspeed": 1,
    "post_max_speed": 1,
    "post_apex_speed": 1,
    "post_p2p": 1,
    "post_lic": 1,
    "post_ir": 1,
    "post_track_status": 1,
    "post_tire_compound": 1,
    "post_tires_stints": 1,
    "post_tires_nb_changes": 1,
    "post_club_name": 1,
    "post_car_name": 1,
}


// Fonction permettant d'attribuer une valeur pour tous les �l�ments d'un m�me nom (utilis� uniquement pour les infos)
/*function set_innerHTML_byName(name, val) {
    elements = document.getElementsByName(name);
    for (var i=0; i < elements.length; i++) {
        elements[i].innerHTML = val;
    }
}*/


function update_datas(donnees_new) {


    if (donnees_new.partial != undefined) {
        // on met � jour juste les donn�es X, Y, W, H envoy�es quand on a d�plac� un �l�ment sur le dashboard
        // ou bien on met � jour le display_selected si on l'a chang� avec un bouton

        if ( !input_en_cours ) {  // on s'assure qu'on n'est pas en train de modifier des valeurs au clavier ou avec les fl�ches
            //console.log(donnees_new.partial)

            elt_params = donnees_new.partial;
            for (var elt_i = 0; elt_i < elt_params.length; elt_i++) {

                var elt_param = elt_params[elt_i]["param"];

                if (elt_param.length == 3 && elt_param[2] == "display_selected") {
                    var val = elt_params[elt_i]["value"];
                    var dashboard = elt_param[0];
                    donnees.param[dashboard]["advanced"]["display_selected"] = val;
                    create_elements_display(dashboard, val, 0);
                } else {
                    var nom_var = elt_param[0];
                    for (var i = 1; i < elt_param.length; i++) {
                        nom_var += "_" + elt_param[i];
                    }
                    var val = elt_params[elt_i]["value"];
                    var elt_type = elt_params[elt_i]["elt_type"];
                    //console.log(nom_var, val);
                    //console.log(elt_param[0], elt_param[1])

                    switch (elt_param.length) {
                        case 1:
                            donnees.param[elt_param[0]] = val;
                            break;
                        case 2:
                            if (!(elt_param[0] in donnees.param)) {
                                donnees.param[elt_param[0]] = {};
                            }
                            donnees.param[elt_param[0]][elt_param[1]] = val;
                            break;
                        case 3:
                            if (!(elt_param[0] in donnees.param)) {
                                donnees.param[elt_param[0]] = {};
                            }
                            if (!(elt_param[1] in donnees.param[elt_param[0]])) {
                                donnees.param[elt_param[0]][elt_param[1]] = {};
                            }
                            donnees.param[elt_param[0]][elt_param[1]][elt_param[2]] = val;
                            break;
                    }

                    load_elt(null, elt_param, elt_type);
                }

            }
        }

    } else {

        //console.log(donnees_new.refresh)

        status_old = donnees.status;
        trackname_old = donnees.trackname;
        trackname_path_old = donnees.trackname_path;
        carname_old = donnees.carname;
        //pro_version_old = donnees.pro_version;
        licence_str_old = donnees.licence_str;

        if (donnees_new.licence_str != undefined && donnees_new.licence_str == "") {
            //console.log("licence_str :", donnees_new.licence_str)
            //return;  // pour �viter de perdre le licence_str
        }
        //console.log("***", donnees_new.licence_str)

        $.extend(true, donnees, donnees_new);  // on merge les donn�es

        //console.log(donnees.param["dashboard"]["window_w"])

        //console.log(donnees.param["dashboard"]["advanced"]["display_selected"])

        //if (donnees_new.param != undefined) {
        //    console.log(donnees_new.param["overlays"], donnees.param["overlays"])
        //}

        // On repasse les valeurs use_css_perso n�gatives en positif
        for (var page in donnees.param) {
            if (donnees.param[page]["use_css_perso"] != undefined) {
                while (donnees.param[page]["use_css_perso"] < 0) {
                    donnees.param[page]["use_css_perso"] += 10;
                }
            }
        }

        // Le $.extend ne va pas effacer les colonnes enlev�es dans le tab_titres donc faut faire �a :
        if (donnees_new.param != undefined) {
            for (var page in list_timing_pages) {
                donnees.param[page]['tab_titres'] = donnees_new.param[page]['tab_titres'];
            }
        }

        // Le $.extend ne va pas effacer les overlays enlev�s :
        if (donnees_new.param != undefined && "overlays" in donnees_new.param) {
            donnees.param["overlays"] = donnees_new.param["overlays"];
        }

        // On consid�re qu'il y a un changement de track ou car que si la session est initialis�e
        /*if (donnees_new.initialized != 1) {
         donnees.trackname = trackname_old;
         donnees.trackname_path = trackname_path_old;
         donnees.carname = carname_old;
         }*/

        /*if (donnees_new.param != undefined) {
         //console.log(page, donnees_new.param["timing2"]['tab_titres'])
         console.log(page, donnees.param["timing2"]['tab_titres'])
         }*/

        //if (version_checked == 0) {
        //console.log(donnees);
        //}

        //console.log("***",donnees.jrt_memory_used,"***", !isNaN(donnees.jrt_memory_used))
        if (donnees.jrt_memory_used != undefined && donnees.jrt_memory_used != "--" && !isNaN(donnees.jrt_memory_used) && donnees.jrt_memory_used != 0) {
            jrt_memory_used = (parseFloat(donnees.jrt_memory_used)).toFixed(0);
        } else {
            jrt_memory_used = "--";
        }
        if (donnees.jrt_cpu_percent != undefined && donnees.jrt_cpu_percent != "--" && !isNaN(donnees.jrt_cpu_percent) && donnees.jrt_cpu_percent != 0) {
            jrt_cpu_percent = (parseFloat(donnees.jrt_cpu_percent)).toFixed(1);
        } else {
            jrt_cpu_percent = "0.0";
        }
        if (donnees.status == 1) {
            $("#status").html("<b><span style='color: #00cc00;'>iRacing is running</span></b> - <span style='color: #ffffff;'>JRT Server Memory Usage : <b><i>" + jrt_memory_used + "</i> MB</b></span> - <span style='color: #00ccff;'>JRT Server CPU Usage : <b><i>" + jrt_cpu_percent + "</i> %</b></span>");
        } else {
            $("#status").html("<b><span style='color: #ff0000;'>iRacing is stopped</span></b> - <span style='color: #ffffff;'>JRT Server Memory Usage : <b><i>" + jrt_memory_used + "</i> MB</b></span> - <span style='color: #00ccff;'>JRT Server CPU Usage : <b><i>" + jrt_cpu_percent + "</i> %</b></span>");
            donnees.trackname = "--";
            donnees.carname = "--";
            donnees.trackname_path = "--";
        }

        if (donnees_new.no_cuda != undefined && donnees_new.no_cuda != -1) {
            no_cuda = donnees_new.no_cuda;
        }

        if (donnees.param.new_version_available != undefined && version_checked == 0) {
            if (donnees.param.new_version_available == 1) {
                text_new = " - <a href='https://joel-real-timing.com/releasenotes_en.html' target='_blank'><i>A new version is available !</i></a>"
            } else if (donnees.param.new_version_available == 0) {
                text_new = " - <i>It is the latest version !</i>"
            } else if (donnees.param.new_version_available == 0) {
                text_new = " - <i>No idea if it is the latest version !</i>"
            }
            if (no_cuda == 1) {
                text_cuda = " (no CUDA) ";
            } else if (no_cuda == 0) {
                text_cuda = " (CUDA) ";
            } else {
                text_cuda = "";
            }
            $("#version").html("You are using JRT v" + version + text_cuda + text_new);
            version_checked = 1;

            //console.log("Latest version available :", donnees.param.lastversion);

        }

        // On v�rifie si le status de la version pro a chang�e
        if (donnees.licence_str != licence_str_old && donnees_new.refresh == 1 && donnees.licence_str) {  // !== pour v�rifier que c'est pas un empty string
            var d = donnees.licence_str;
            d = d.replace(/\n/g, "<br>");  // on remplace tous les \n par <br>
            if (d == "") d = "CHECKING LICENSE ...<br><br>ENTER AN IRACING SESSION AND GET IN THE CAR IF YOUR LICENSE WAS NOT ACTIVATED YET...<br>(Reload this page if you still see this message after getting in the car)";
            if (document.getElementById("licence_str") && document.getElementById("key_asterix")) {
                document.getElementById("licence_str").innerHTML = d;
                if (donnees.licence_col == "#00cc00") {
                    document.getElementById("key_asterix").innerHTML = "";
                } else {
                    document.getElementById("key_asterix").innerHTML = '* If you have a key, send an email to <a style="font-style: normal;" href="mailto:joel@joel-real-timing.com">joel@joel-real-timing.com';
                }
                document.getElementById("licence_str").style.backgroundColor = donnees.licence_col;
            }
            //console.log("License update expiration :", donnees.param.licence_base_expiration_date_update);

        }

        // V�rifie si on a chang� de circuit au moment du 'refresh'
        //if (donnees.trackname != trackname_old && donnees.trackname != "--") {
        //if (donnees.trackname != trackname_old && donnees.trackname != "--" && donnees_new.refresh == 1) {
        /*if (donnees.trackname_path != trackname_path_old && donnees.trackname != "--" && donnees_new.refresh == 1) {
         //console.log(donnees.trackname)
         $("#trackname").html(donnees.trackname);
         ws.send("jrtconfig;loadtrack");
         //console.log("track change", trackname_old, "-->", donnees.trackname)
         }
         // V�rifie si on a chang� de voiture au moment du 'refresh'
         //if (donnees.carname != carname_old && donnees.carname != "--") {
         if (donnees.carname != carname_old && donnees.carname != "--" && donnees_new.refresh == 1) {
         $("#carname").html(donnees.carname);
         ws.send("jrtconfig;loadcar");
         //console.log("car change", carname_old, "-->", donnees.carname)
         }*/
        // On v�rifie le track et le car en m�me temps pour �viter de recharger tout 2 fois
        // on v�rifie aussi le initialized pour �tre s�r que les turns par exemple soient charg�s
        if (((donnees.trackname_path != trackname_path_old && donnees.trackname != "--") || (donnees.carname != carname_old && donnees.carname != "--")) && donnees_new.refresh == 1 && donnees_new.initialized == 1) {
            //console.log(donnees.trackname)
            ws.send("jrtconfig;load");  // on recharge tout et pas seulement le track et le car car on veut aussi les donn�es comme les turns par exemple
            console.log("jrtconfig;load");
            //console.log("track change", trackname_old, "-->", donnees.trackname)
        }

        // On v�rifie s'il faut mettre � jour un nouveau bouton
        if (donnees_new.buttons != undefined) {
            if (donnees_new.buttons[0] != -2 || donnees_new.buttons[1] != -2) {
                var id_joy = donnees_new.nom_var + "_joy";
                var id_button = donnees_new.nom_var + "_button";
                document.getElementById(donnees_new.nom_var).style.display = "inline-block"
                document.getElementById(id_joy).innerHTML = donnees_new.buttons[0];
                // Faut g�rer l'affichage diff�rement si donnees_new.buttons[1] est un tableau
                var tmp_button = "";
                if (Array.isArray(donnees_new.buttons[1])) {
                    /*tmp_button += "[" + donnees_new.buttons[1][0];
                     for (var i=1; i < donnees_new.buttons[1].length; i++ ) {
                     tmp_button += "," + donnees_new.buttons[1][i];
                     }
                     tmp_button += "]";*/
                    tmp_button = JSON.stringify(donnees_new.buttons[1]);
                } else {
                    tmp_button = donnees_new.buttons[1];
                }
                document.getElementById(id_button).innerHTML = tmp_button;
                //console.log("chgt boutons", id_joy, donnees_new.buttons[0], donnees_new.buttons[1]);
            }
            //document.getElementById(donnees_new.nom_var + "_info").innerHTML = "";
            document.getElementById("press_button_to_set_cont").style.display = "none";

            clearInterval(ws_boucle_temporaire);
            clearTimeout(setTimeout_clear_temporaire);

            set_config_page("", 0, 0);  // Pour enregistrer les param�tres dans la m�moire du serveur JRT
            // REM : je ne fais pas de set_config_page_partial car c'est un peu compliqu�

        }

        // Dans le cas o� ce n'est pas un refresh, on met � jour tous les param�tres
        if (donnees_new.refresh != 1 && "param" in donnees_new) {
            //console.log("***")

            //var menu_elements_dashboard_advanced_save = menu_elements_dashboard_advanced;
            //menu_elements_dashboard_advanced = []

            //console.log("***", donnees_new)

            var t = Date.now();
            create_elements(1, 0);
            console.log("Loading duration:", ((Date.now() - t)/1000).toFixed(3) + "s")

            document.getElementById("loading_cont").style.display = "none";
            document.getElementById("container").style.display = "block";

            /*menu_elements_dashboard_advanced = menu_elements_dashboard_advanced_save;
            setTimeout(function () {
                create_elements(1, 0);
            }, 0);*/
        }

        if (donnees.save_status == 1) {
            toggle_save_button_ON();
        } else {
            toggle_save_button_OFF();
        }
        if (donnees.undo_status == 1) {
            toggle_undo_button_ON();
        } else {
            toggle_undo_button_OFF();
        }
        if (donnees.redo_status == 1) {
            toggle_redo_button_ON();
        } else {
            toggle_redo_button_OFF();
        }

        // Si on n'a pas encore de valeurs pour les autres unit�s on les initialise
        if (document.getElementById("pit_fuel_in_tank_manual")) {
            if (document.getElementById("pit_fuel_in_tank_manual").value == "") {
                document.getElementById("pit_fuel_in_tank_manual").value = 0;
            }
        }
        if (document.getElementById("pit_fuel_in_tank_manual_ga") && document.getElementById("pit_fuel_in_tank_manual_kg") && document.getElementById("pit_fuel_in_tank_manual_lb")) {
            if (document.getElementById("pit_fuel_in_tank_manual_ga").value == "" || document.getElementById("pit_fuel_in_tank_manual_kg").value == "" || document.getElementById("pit_fuel_in_tank_manual_lb").value == "") {
                update_fuel_in_tank_manual("input_fuel_in_tank_manual");
            }
        }

        if (donnees.status != status_old) {
            create_elements(0, 0);  // permet de griser/d�griser les param�tres pit/track/car
        }
    }
}


// On �teint le bouton "SAVE" que s'il �tait allum�
function toggle_save_button_OFF() {
    if (save_button_status == 1) {
        var element = document.getElementById("save_button");
        element.classList.toggle("save_button_on");
        save_button_status = Math.abs(save_button_status - 1);
    }
}
// On �teint le bouton "UNDO" que s'il �tait allum�
function toggle_undo_button_OFF() {
    if (undo_button_status == 1) {
        var element = document.getElementById("undo_button");
        element.classList.toggle("undo_button_on");
        undo_button_status = Math.abs(undo_button_status - 1);
    }
}
// On �teint le bouton "REDO" que s'il �tait allum�
function toggle_redo_button_OFF() {
    if (redo_button_status == 1) {
        var element = document.getElementById("redo_button");
        element.classList.toggle("redo_button_on");
        redo_button_status = Math.abs(redo_button_status - 1);
    }
}
// On allume le bouton "SAVE" que s'il �tait �teint
function toggle_save_button_ON() {
    if (save_button_status == 0) {
        var element = document.getElementById("save_button");
        element.classList.toggle("save_button_on");
        save_button_status = Math.abs(save_button_status - 1);
    }
}
// On allume le bouton "UNDO" que s'il �tait �teint
function toggle_undo_button_ON() {
    if (undo_button_status == 0) {
        var element = document.getElementById("undo_button");
        element.classList.toggle("undo_button_on");
        undo_button_status = Math.abs(undo_button_status - 1);
    }
}
// On allume le bouton "REDO" que s'il �tait �teint
function toggle_redo_button_ON() {
    if (redo_button_status == 0) {
        var element = document.getElementById("redo_button");
        element.classList.toggle("redo_button_on");
        redo_button_status = Math.abs(redo_button_status - 1);
    }
}


// On affiche les groupes envoy�s dans l'objet groups et on cache le reste
function display_groups(groups) {
    //console.log(groups)
    for (var i in elements_html_) {
        //console.log(i)
        if (i in groups && groups[i] == 1) {
            document.getElementById(i + "_cont").style.display = "block";
        } else {
            document.getElementById(i + "_cont").style.display = "none";
        }
    }

    // On affiche seulement le display selected pour les dashboards
    for (var dashboard in {"dashboard": 1, "dashboard2": 1}) {
        for (var x = 1; x <= donnees.param[dashboard]["nb_displays"]; x++) {
            if (document.getElementById(dashboard + "_display" + x)) {
                if (x == donnees.param[dashboard]["advanced"]["display_selected"]) {
                    document.getElementById(dashboard + "_display" + x).style.display = "block";
                } else {
                    document.getElementById(dashboard + "_display" + x).style.display = "none";
                }
            }
        }
    }

    //setTimeout(function() { document.getElementById("dashboard" + "_display" + 1).style.display = "none"}, 1000 * 5);

}


// On affiche les options en fonction de ce qui est s�lectionn� dans la liste d�roulante
//function display_options(scroll=1, page=null) {
function display_options(scroll, page, is_select_display) {
    // is_select_display = 1 sert � savoir si on a pu potentiellement chang� de display
    // is_select_display = 2 permet de savoir qu'on a chang� le menu

    //console.log(document.getElementById("options_displayed").value)

    if (is_select_display == undefined) {
        is_select_display = 0;
    }

    if (page != null) {
        page_active = page;
    }

    options_to_display = document.getElementById("options_displayed").value;

    for (var o in groups_to_display) {
        groups_to_display[o] = 0;
    }

    for (var o in set_options[options_to_display]) {
        groups_to_display[o] = 1;
    }

    if (options_to_display == "pages_options") {
        page_to_display = document.getElementById("page_displayed").value;
        document.getElementById("page_displayed").style.display = "inline-block";
        for (var sous_group in pages_sous_groups[page_to_display]) {
            groups_to_display[page_to_display + "_" + sous_group] = 1;
        }
    } else {
        document.getElementById("page_displayed").style.display = "None";
    }

    // On regarde si on a chang� de display et dans ce cas on envoie la nouvelle valeur au serveur JRT
    var tmp_is_display_changed = false;
    if (is_select_display == 1) {
        for (var dashboard in {"dashboard": 1, "dashboard2": 1}) {
            if (dashboard == document.getElementById("page_displayed").value) {

                var ds = donnees.param[dashboard]["advanced"]["display_selected"];
                //if (document.getElementById(dashboard + "_select_display")) {
                    var d = parseInt(document.getElementById(dashboard + "_select_display").value);
                //} else {
                //    d = -1;  // c'est qu'on a juste chang� de page dans le menu
                //}

                if (d != ds) {
                    //console.log(dashboard, ds, d);
                    //if (d != -1) {
                        donnees.param[dashboard]["advanced"]["display_selected"] = d;
                        tmp_is_display_changed = true;
                    //}

                    create_elements_display(dashboard, donnees.param[dashboard]["advanced"]["display_selected"], scroll);

                    //if (d != -1) {
                        //toggle_save_button_ON();
                        ws.send("jrtconfig;apply;" + dashboard + ";0;" + JSON.stringify(donnees.param));  // Le 0 c'est pour dire qu'on n'a pas besoin de recharger les couleurs de classes
                        console.log("jrtconfig;apply;" + dashboard);
                    //}
                }
            }
        }
    } else if (is_select_display == 2) {
        var dashboard = document.getElementById("page_displayed").value;
        if (dashboard in {"dashboard": 1, "dashboard2": 1}) {
            // le dernier param�tre dit � la fonction create_elements_display de ne pas repasser par la fct display_options
            create_elements_display(dashboard, donnees.param[dashboard]["advanced"]["display_selected"], scroll, 1);
        }
    }

    // Si on n'a pas chang� de display, c'est qu'on a chang� de menu et on scroll vers le haut
    if (!tmp_is_display_changed && scroll == 1) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    display_groups(groups_to_display);
}


// Mise � jour la liste des displays
function update_display_list(dashboard) {
    if (dashboard == document.getElementById("page_displayed").value) {
        var tmp_html = '';
        tmp_html += '<select class="select_display" style="min-width: 32.4em; width: 100%;" size="' + Math.max(2, donnees.param[dashboard]["nb_displays"]) + '" id="' + dashboard + '_select_display" onchange="display_options(0, \'' + dashboard + '\', 1)">';
        for (var x = 1; x <= donnees.param[dashboard]["nb_displays"]; x++) {
            if (x == donnees.param[dashboard]["advanced"]["display_selected"]) {
                tmp_html += '<option selected value="' + x + '">#' + x + " - " + donnees.param[dashboard]["advanced"]["name_" + x] + '</option>';
            } else {
                tmp_html += '<option value="' + x + '">#' + x + " - " + donnees.param[dashboard]["advanced"]["name_" + x] + '</option>';
            }
        }
        tmp_html += '</select>';
        document.getElementById(dashboard + "_select_display_div").innerHTML = tmp_html;
    }
}


function create_elements_bloc2_more_options(elt_i, dashboard, x) {

    // Couleur de la bordure de gauche
    var tmp_bg_col = dashboard_advanced_bg[menu_elements_dashboard_advanced[elt_i]["group_num"]];

    var elements_html = "";

    for (var var_i in var_dashboard_advanced) {

        if (var_dashboard_advanced[var_i]["is_more_options"] == 1) {

            if (var_dashboard_advanced[var_i]["add_carclasscolor_option"] != 1 || menu_elements_dashboard_advanced[elt_i]["param"][0] in add_carclasscolor_option_list["pre"] || menu_elements_dashboard_advanced[elt_i]["param"][0] in add_carclasscolor_option_list["me"] || menu_elements_dashboard_advanced[elt_i]["param"][0] in add_carclasscolor_option_list["post"]) {

                var tmp_elt = {
                    "param": [var_dashboard_advanced[var_i]["nom"] + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0]],
                    "texte": var_dashboard_advanced[var_i]["texte"],
                    "val_type": var_dashboard_advanced[var_i]["val_type"],
                    "elt_type": var_dashboard_advanced[var_i]["elt_type"],
                };

                if ("long" in var_dashboard_advanced[var_i]) {
                    tmp_elt["long"] = var_dashboard_advanced[var_i]["long"];
                }

                // REM : faut pas mettre le step si ce n'est pas un nombre sinon le type_str pour le input sera consid�r� comme un nombre
                if ("step" in var_dashboard_advanced[var_i]) {
                    tmp_elt["step"] = var_dashboard_advanced[var_i]["step"];
                }

                if ("newgroup" in var_dashboard_advanced[var_i]) {
                    tmp_elt["newgroup"] = var_dashboard_advanced[var_i]["newgroup"];
                }
                if ("endgroup" in var_dashboard_advanced[var_i]) {
                    tmp_elt["endgroup"] = var_dashboard_advanced[var_i]["endgroup"];
                }
                if ("texte2" in var_dashboard_advanced[var_i]) {
                    tmp_elt["texte2"] = var_dashboard_advanced[var_i]["texte2"];
                }


                // On d�finit les valeurs par d�faut s'il n'y en avait pas pour les options suppl�mentaires avanc�es
                if (!(tmp_elt["param"][0] + "_" + x in donnees.param[dashboard]["advanced"])) {
                    donnees.param[dashboard]["advanced"][tmp_elt["param"][0] + "_" + x] = var_dashboard_advanced[var_i]["default_value"];
                }


                elements_html += "<div>";

                elements_html += str_elt([dashboard, "advanced", tmp_elt["param"][0] + "_" + x], tmp_elt, tmp_elt["elt_type"], 0, 1, tmp_bg_col, "#000000");

                elements_html += "</div>";
            }
        }
    }

    return elements_html;
}


function create_elements_html_display(dashboard, x) {

    var elements_html = '';

    if (dashboard == document.getElementById("page_displayed").value) {

        // Menu d�roulant pour pouvoir s�lectionner le display
        elements_html += '<div style="display: inline-block; box-sizing: border-box;  margin-left: 0em; padding-right: 0.2em; margin-bottom: 0.2em; width: 33.333%;"><button style="width: 100%;" onclick="insert_display(\'' + dashboard + '\')">INSERT A DISPLAY</button></div>';
        elements_html += '<div style="display: inline-block; box-sizing: border-box; margin-left: 0.0em; padding-left: 0.1em; padding-right: 0.1em; margin-bottom: 0.2em; width: 33.333%;"><button style="width: 100%;" onclick="add_display(\'' + dashboard + '\')" >ADD A DISPLAY</button></div>';
        elements_html += '<div style="display: inline-block; box-sizing: border-box; margin-left: 0.0em; padding-left: 0.2em; margin-bottom: 0.2em; width: 33.333%;"><button style="width: 100%;" onclick="delete_display(\'' + dashboard + '\')" >DELETE THE DISPLAY</button></div><br>';
        elements_html += '<div id = "' + dashboard + '_select_display_div">';
        elements_html += '</div>';
        elements_html += '<div style="display: inline-block; box-sizing: border-box; margin-top: 0.2em; padding-right: 0.15em; margin-left: 0em; width: 50%;"><button style="width: 100%;" onclick="up_display(\'' + dashboard + '\')" >UP</button></div>';
        elements_html += '<div style="display: inline-block; box-sizing: border-box; margin-top: 0.2em; padding-left: 0.15em; margin-left: 0.0em; width: 50%;"><button style="width: 100%;" onclick="down_display(\'' + dashboard + '\')" >DOWN</button></div>';

        //for (var x = 1; x <= donnees.param[dashboard]["nb_displays"]; x++) {
        //for (var x = donnees.param[dashboard]["advanced"]["display_selected"]; x <= donnees.param[dashboard]["advanced"]["display_selected"] && x <= donnees.param[dashboard]["nb_displays"]; x++) {
        //console.log(dashboard, x)
        //for (var x = donnees.param[dashboard]["nb_displays"]; x >= 1; x--) {
        elements_html += '<div id="' + dashboard + '_display' + x + '">';
        //'<div style="display: inline-block; margin-top: 0.5em; margin-bottom: 0.25em; line-height: 1.5em; width: 100%; background-color: yellow; color: black; text-align: center;"><b><i>Display #' + x + '</i></b></div><br>';

        var tmp_name_i = 0;
        var tmp_name_i2 = 0;
        for (var elt_i in menu_elements_dashboard_advanced) {

            tmp_name_i++;

            // On affiche les boutons "load default, load, export"
            if (tmp_name_i == 1) {

                elements_html += '<button onclick="load_default_display(\'' + dashboard + '\')" class="button_advanced_display" style="margin-top: 0.5em; margin-bottom: 0.0em;">Default</button>';
                elements_html += '<button onclick="load_display(\'' + dashboard + '\')" class="button_advanced_display" style="margin-top: 0.5em; margin-bottom: 0.0em;">Load</button>';
                elements_html += '<button onclick="export_display(\'' + dashboard + '\')" class="button_advanced_display" style="margin-top: 0.5em; margin-bottom: 0.0em;">Export</button>';

            }

            if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "name") {
                menu_elements_dashboard_advanced[elt_i]["texte"] = "<i>Display #" + x + " Name</i>";
                elements_html += '<div style="display: inline-block; margin-bottom: 1.2em; width: 100%; text-align: left;">' + str_elt([dashboard, "advanced", menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], menu_elements_dashboard_advanced[elt_i], menu_elements_dashboard_advanced[elt_i]["elt_type"], 1, 0) + "</div><br>";
                //} else if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "select_display" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "transparency_OBS" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "ref_w" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "ref_h" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "image_de_fond") {
            } else if (menu_elements_dashboard_advanced[elt_i]["param"][0] in displays_list) {  // REM displays_list contient aussi name et select_display mais c'est pas grave car ils sont trait�s avant le else if

                // Si la font-family/weight/style ne sont pas d�finies on prend le advanced["font-family/weight/style"]
                for (var fontsetname in {"family": 1, "weight": 1, "style": 1}) {
                    if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "font_" + fontsetname) {
                        if (donnees.param[dashboard]["advanced"]["font_" + fontsetname + "_" + x] == undefined) {
                            donnees.param[dashboard]["advanced"]["font_" + fontsetname + "_" + x] = donnees.param[dashboard]["advanced"]["font-" + fontsetname];
                        }
                    }
                }

                // Si l'image de fond n'est pas d�fini on indique le chemin qui �tait utilis� auparavant
                // REM : pas besoin de le faire pour l'image de premier plan car c'est une option qui a �t� ajout�e apr�s
                if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "image_de_fond") {
                    if (donnees.param[dashboard]["advanced"]["image_de_fond_" + x] == undefined) {
                        donnees.param[dashboard]["advanced"]["image_de_fond_" + x] = dashboard + "/display_" + x + ".png";
                    }
                }

                // Si le ref_w et ref_h ne sont pas d�finis on prend le dashboard_ref_w et dashboard_ref_h
                if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "ref_w") {
                    if (donnees.param[dashboard]["advanced"]["ref_w_" + x] == undefined) {
                        donnees.param[dashboard]["advanced"]["ref_w_" + x] = donnees.param[dashboard]["dashboard_ref_w"]
                    }
                }
                if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "ref_h") {
                    if (donnees.param[dashboard]["advanced"]["ref_h_" + x] == undefined) {
                        donnees.param[dashboard]["advanced"]["ref_h_" + x] = donnees.param[dashboard]["dashboard_ref_h"]
                    }
                }
                // Si le transparency_OBS n'est pas d�finis on prend l'ancienne valeur
                if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "transparency_OBS") {
                    if (donnees.param[dashboard]["advanced"]["transparency_OBS_" + x] == undefined) {
                        donnees.param[dashboard]["advanced"]["transparency_OBS_" + x] = donnees.param[dashboard]["transparency_OBS"]
                    }
                }

                elements_html += '<div style="display: inline-block; margin-bottom: 1.2em; width: 100%; text-align: left;">' + str_elt([dashboard, "advanced", menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], menu_elements_dashboard_advanced[elt_i], menu_elements_dashboard_advanced[elt_i]["elt_type"], 1, 0) + "</div><br>";

            } else {


                // On affiche les boutons "check all, uncheck all" et la l�gende
                tmp_name_i2++;
                if (tmp_name_i2 == 1) {
                    var tmp_aj = -0.0;

                    elements_html += '<button onclick="check_all(\'' + dashboard + '\')" class="button_advanced_display" style="margin-top: 0.0em; margin-bottom: 0.5em;">All</button>';
                    elements_html += '<button onclick="check_none(\'' + dashboard + '\')" class="button_advanced_display" style="margin-top: 0.0em; margin-bottom: 0.5em;">None</button>';

                    elements_html += '<div style="background-color: #333333;"><div style="display: inline-block; background-color: #333333; color: white; margin-top: 0.0em; line-height: 1.5em;">';
                    elements_html += '<div style="margin-left: 0.3em; display: inline-block; border-right: 0px solid white; text-align: center; width: ' + (largeur_colonnes_dashboard_display[1] + 0.3) + 'em">Name</div>';
                    elements_html += '<div style="display: inline-block; border-right: 0px solid white; text-align: center; width: ' + (largeur_colonnes_dashboard_display[2] + tmp_aj) + 'em">X</div>';
                    elements_html += '<div style="display: inline-block; border-right: 0px solid white; text-align: center; width: ' + (largeur_colonnes_dashboard_display[3] + tmp_aj) + 'em">Y</div>';
                    elements_html += '<div style="display: inline-block; border-right: 0px solid white; text-align: center; width: ' + (largeur_colonnes_dashboard_display[4] + tmp_aj) + 'em">W</div>';
                    elements_html += '<div style="display: inline-block; border-right: 0px solid white; text-align: center; width: ' + (largeur_colonnes_dashboard_display[5] + tmp_aj) + 'em">H</div>';
                    elements_html += '<div style="display: inline-block; border-right: 0px solid white; text-align: center; width: ' + (largeur_colonnes_dashboard_display[6] + tmp_aj) + 'em">Font</div>';
                    elements_html += '<div style="display: inline-block; border-right: 0px solid white; text-align: center; width: ' + (largeur_colonnes_dashboard_display[7] + 0.15) + 'em">Opac.</div>';
                    elements_html += '</div></div>';

                }

                var tmp_col_i = 0;

                // Couleur de la bordure de gauche
                var tmp_bg_col = dashboard_advanced_bg[menu_elements_dashboard_advanced[elt_i]["group_num"]];

                if ("newgroup" in menu_elements_dashboard_advanced[elt_i] && "endgroup" in menu_elements_dashboard_advanced[elt_i]) {
                    elements_html += '<div id="bloc_' + dashboard + '_advanced_' + menu_elements_dashboard_advanced[elt_i]["param"][0] + '_' + x + '" class="bloc_dashboard_advanced" style="margin-top: 0.5em; margin-bottom: 0.5em; text-align: left; color:' + dashboard_advanced_col[menu_elements_dashboard_advanced[elt_i]["group_num"]] + ';background-color: #444444; border-top: 1px solid #333333; border-bottom: 1px solid #333333; ' +
                        'box-shadow: inset 2px 0px ' + tmp_bg_col + ', inset -0px 0px ' + tmp_bg_col + '">';
                } else if ("newgroup" in menu_elements_dashboard_advanced[elt_i]) {
                    elements_html += '<div id="bloc_' + dashboard + '_advanced_' + menu_elements_dashboard_advanced[elt_i]["param"][0] + '_' + x + '" class="bloc_dashboard_advanced" style="margin-top: 0.5em; text-align: left; color:' + dashboard_advanced_col[menu_elements_dashboard_advanced[elt_i]["group_num"]] + ';background-color: #444444; border-top: 1px solid #333333; ' +
                        'box-shadow: inset 2px 0px ' + tmp_bg_col + ', inset -0px 0px ' + tmp_bg_col + '">';
                } else if ("endgroup" in menu_elements_dashboard_advanced[elt_i]) {
                    elements_html += '<div id="bloc_' + dashboard + '_advanced_' + menu_elements_dashboard_advanced[elt_i]["param"][0] + '_' + x + '" class="bloc_dashboard_advanced" style="margin-bottom: 0.5em; text-align: left; color:' + dashboard_advanced_col[menu_elements_dashboard_advanced[elt_i]["group_num"]] + ';background-color: #444444; border-bottom: 1px solid #333333; ' +
                        'box-shadow: inset 2px 0px ' + tmp_bg_col + ', inset -0px 0px ' + tmp_bg_col + '">';
                } else {
                    elements_html += '<div id="bloc_' + dashboard + '_advanced_' + menu_elements_dashboard_advanced[elt_i]["param"][0] + '_' + x + '" class="bloc_dashboard_advanced" style="text-align: left; color:' + dashboard_advanced_col[menu_elements_dashboard_advanced[elt_i]["group_num"]] + ';background-color: #444444; ' +
                        'box-shadow: inset 2px 0px ' + tmp_bg_col + ', inset -0px 0px ' + tmp_bg_col + '">';
                }

                var infos_bulle = "";
                var name = menu_elements_dashboard_advanced[elt_i]["param"][0];
                if (name in dashboard_advanced_infos_bulle) {
                    infos_bulle = dashboard_advanced_infos_bulle[name];
                } else {
                    infos_bulle = "";
                }

                for (var var_i in var_dashboard_advanced) {

                    if (var_dashboard_advanced[var_i]["is_more_options"] == 0) {
                        tmp_col_i++;

                        var tmp_elt = {
                            "param": [var_dashboard_advanced[var_i]["nom"] + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0]],
                            "texte": menu_elements_dashboard_advanced[elt_i]["texte"] + " " + var_dashboard_advanced[var_i]["texte"],
                            "val_type": var_dashboard_advanced[var_i]["val_type"],
                            "elt_type": var_dashboard_advanced[var_i]["elt_type"]
                        };
                        if ("long" in var_dashboard_advanced[var_i]) {
                            tmp_elt["long"] = var_dashboard_advanced[var_i]["long"];
                        }
                        if ("step" in var_dashboard_advanced[var_i]) {
                            tmp_elt["step"] = var_dashboard_advanced[var_i]["step"];
                        }
                        //elements_html += str_elt([dashboard, "advanced", tmp_elt["param"][0] + "_" + x], tmp_elt, tmp_elt["elt_type"]) + "<br>";
                        //console.log(str_elt([dashboard, "advanced", tmp_elt["param"][0] + "_" + x], tmp_elt, tmp_elt["elt_type"]) + "<br>")

                        if (tmp_elt["elt_type"] == "checkbox") {

                            elements_html += '<div title="' + infos_bulle + '" class="bloc" id="' + dashboard + '_advanced_' + tmp_elt["param"][0] + "_" + x + '_bloc" style="overflow: hidden; vertical-align: middle; text-align: left; margin: 0 0 0 0.3em; display: inline-block; width: ' + largeur_colonnes_dashboard_display[tmp_col_i] + 'em" >' +
                                    /*'<input type="checkbox" id="' + dashboard + '_advanced_' + tmp_elt["param"][0] + "_" + x + '" value="" onclick="set_config_page(\'' + dashboard + '\', 0, 0)">' + tmp_elt["texte"] +*/
                                '<input type="checkbox" id="' + dashboard + '_advanced_' + tmp_elt["param"][0] + "_" + x + '" value="" onclick="set_config_page_partial(\'' + dashboard + '\', \'' + JSON.stringify([dashboard, "advanced", tmp_elt["param"][0] + "_" + x]).replace(/"/g, '&quot;') + '\', \'' + tmp_elt["val_type"] + '\', \'' + tmp_elt["elt_type"] + '\', 0, 0)">' + tmp_elt["texte"] +
                                '</div> ';

                            // *** Pr�paration du set_config_page_partial ***
                            //console.log('*** set_config_page_partial(\'' + dashboard + '\', \'' + JSON.stringify([dashboard, "advanced", tmp_elt["param"][0] + "_" + x]).replace(/"/g, '&quot;') + '\', \'' + tmp_elt["val_type"] + '\', \'' + tmp_elt["elt_type"] + '\') ***');

                        } else if (tmp_elt["elt_type"] == "input" || tmp_elt["elt_type"].substr(0, 25) == "input_fuel_in_tank_manual") {
                            elements_html += '<div class="bloc" id="' + dashboard + '_advanced_' + tmp_elt["param"][0] + "_" + x + '_bloc" style="vertical-align: middle; margin: 0px; display: inline-block; width: ' + largeur_colonnes_dashboard_display[tmp_col_i] + 'em" >' +
                                '<span id="' + dashboard + '_advanced_' + tmp_elt["param"][0] + "_" + x + '_text"></span> ' +
                                    /*'<input autocomplete="off" type="number" step="' + tmp_elt["step"] + '" style="vertical-align: middle; height:1.25em; width: ' + tmp_elt["long"] + 'em;" id="' + dashboard + '_advanced_' + tmp_elt["param"][0] + "_" + x + '" size="' + tmp_elt["long"] + '" value="" oninput="set_config_page(\'' + dashboard + '\', 0, 0)"> ' +*/
                                '<input autocomplete="off" type="number" step="' + tmp_elt["step"] + '" style="vertical-align: middle; height:1.25em; width: ' + tmp_elt["long"] + 'em;" id="' + dashboard + '_advanced_' + tmp_elt["param"][0] + "_" + x + '" size="' + tmp_elt["long"] + '" value="" oninput="set_config_page_partial(\'' + dashboard + '\', \'' + JSON.stringify([dashboard, "advanced", tmp_elt["param"][0] + "_" + x]).replace(/"/g, '&quot;') + '\', \'' + tmp_elt["val_type"] + '\', \'' + tmp_elt["elt_type"] + '\', 0, 0)"> ' +
                                '</div>';
                            // *** Pr�paration du set_config_page_partial ***
                            //console.log('*** set_config_page_partial(\'' + dashboard + '\', \'' + JSON.stringify([dashboard, "advanced", tmp_elt["param"][0] + "_" + x]).replace(/"/g, '&quot;') + '\', \'' + tmp_elt["val_type"] + '\', \'' + tmp_elt["elt_type"] + '\') ***');
                        }
                        // REM : si je rajoute d'autre type comme la couleur, il faudra le g�rer ici

                        /*
                         <div class="bloc" id="dashboard_advanced_disp_inc_1_bloc" style="display: inline-block;" >
                         <input type="checkbox" id="dashboard_advanced_disp_inc_1" value="" onclick="set_config_page('dashboard')">Incidents Display :
                         </div><br>
                         */

                        /*
                         <div class="bloc" id="dashboard_advanced_x_inc_1_bloc" style="display: inline-block;" >
                         <span id="dashboard_advanced_x_inc_1_text">Incidents X : </span>
                         <input autocomplete="off" type="number" step="1" style="width: 4em;" id="dashboard_advanced_x_inc_1" size="4" value="" oninput="set_config_page('dashboard')">
                         </div><br>
                         */
                    }

                }


                // Options suppl�mentaires � afficher que si on a cliqu� sur "More options"
                // bloc2 signifie que c'est le bloc des options suppl�mentaires (par d�faut on ne l'affiche pas

                var bloc2_name = "bloc2_" + dashboard + "_advanced_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x;
                var tmp_elements_bloc2_more_options = "";
                var more_options_texte = "&nbsp;+ options&nbsp;";
                var more_options_style = "display: none;";
                if (bloc2_name in more_options_value_) {
                    more_options_texte = more_options_value_[bloc2_name];
                    if (more_options_texte.includes("&minus; options")) {
                        more_options_style = "display: block; margin-top: 0.25em;";

                        // On cr�e les options suppl�mentaires qui si elles doivent �tre affich�es
                        tmp_elements_bloc2_more_options = create_elements_bloc2_more_options(elt_i, dashboard, x);
                    }
                }

                elements_html += ' <span class="more_options" id="more_options_bloc2_' + dashboard + '_advanced_' + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x + '" onclick="change_more_options(\'bloc2_' + dashboard + '_advanced_' + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x + '\', \'' + dashboard + '\', \'' + x + '\', \'' + JSON.stringify(elt_i).replace(/"/g, '&quot;') + '\')" style = "font-family: arial; font-weight: bold; cursor: pointer; background-color: #dddddd; color: #444444; border: 1px solid #666666; font-size: 0.7em; vertical-align: middle; padding: 0.1em;">' + more_options_texte + '</span>';
                elements_html += ' <span class="copy_elt_options" id="copy_elt_options_bloc2_' + dashboard + '_advanced_' + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x + '" onclick="copy_elt_options(\'' + dashboard + '\', \'' + menu_elements_dashboard_advanced[elt_i]["param"][0] + '\', ' + x + ')" style = "font-family: arial; font-weight: bold; cursor: pointer; background-color: #dddddd; color: #444444; border: 1px solid #666666; font-size: 0.7em; vertical-align: middle; padding: 0.1em; width: 3.2em; text-align: center; display: inline-block;">' + "copy" + '</span>';
                elements_html += ' <span class="paste_elt_options" id="paste_elt_options_bloc2_' + dashboard + '_advanced_' + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x + '" onclick="paste_elt_options(\'' + dashboard + '\', \'' + menu_elements_dashboard_advanced[elt_i]["param"][0] + '\', ' + x + ')" style = "font-family: arial; font-weight: bold; cursor: pointer; background-color: #dddddd; color: #444444; border: 1px solid #666666; font-size: 0.7em; vertical-align: middle; padding: 0.1em; width: 3.2em; text-align: center; display: inline-block;">' + "&nbsp;paste&nbsp;" + '</span>';

                elements_html += '<br>';
                elements_html += '<div id="bloc2_' + dashboard + '_advanced_' + menu_elements_dashboard_advanced[elt_i]["param"][0] + '_' + x + '" style="' + more_options_style + 'width: 100%; background-color: #555555;">';

                elements_html += tmp_elements_bloc2_more_options;

                elements_html += "</div>";


                elements_html += "</div>";


            }
        }
        elements_html += '</div>';
    }

    elements_html_[dashboard + "_advanced"] = elements_html;
    document.getElementById(dashboard + "_advanced").innerHTML = elements_html;

    update_display_list(dashboard);

    //console.log(JSON.stringify(elements_html).length/1000000)
    return elements_html;
}


function create_elements_display(dashboard, x, scroll, no_display_options) {

    if (no_display_options == undefined) {
        no_display_options = 0;
    }

    //var t = Date.now();

    create_elements_html_display(dashboard, x);

    // On charge les donn�es dans les �l�ments
    load_donnees(1, scroll, 0, 0, no_display_options);

    //console.log(Date.now() - t)
}


// Cr�ation dynamique des �l�ments des menus de param�trage
//function create_elements(load_dashboard_advanced=0, scroll=1) {
function create_elements(load_dashboard_advanced, scroll) {

    //console.log(document.getElementById("license_info").innerHTML);
    //document.getElementById("license_info").innerHTML = ""

    var group_id = -1;
    // Param�tres globaux
    for (var elt_i in menu_elements) {
        if (menu_elements[elt_i]["elt_type"] != "turns" && menu_elements[elt_i]["elt_type"] != "gears" && menu_elements[elt_i]["elt_type"] != "timing_columns") {
            if (menu_elements[elt_i]["group_id"] != group_id) {
                if (group_id != -1) {
                    //console.log(group_id)
                    document.getElementById(group_id).innerHTML = elements_html_[group_id];
                }
                group_id = menu_elements[elt_i]["group_id"];
                elements_html_[group_id] = '';
            }
            //elements_html_[group_id] += str_elt(menu_elements[elt_i]["param"], menu_elements[elt_i], menu_elements[elt_i]["elt_type"], 0, 0) + "<br>";
            elements_html_[group_id] += str_elt(menu_elements[elt_i]["param"], menu_elements[elt_i], menu_elements[elt_i]["elt_type"], 0, 1);
            //console.log(group_id);
        }
    }
    if (group_id != -1) {
        document.getElementById(group_id).innerHTML = elements_html_[group_id];
    }


    // Param�tres avanc�s du dashboard
    if (load_dashboard_advanced == 1) {
        for (var dashboard in {"dashboard": 1, "dashboard2": 1}) {
            create_elements_html_display(dashboard, donnees.param[dashboard]["advanced"]["display_selected"]);
        }
    }

    // Affichage des param�tres de virage pour le circuit s�lectionn�
    nb_turns = donnees.param["track"]["nb_turns"];
    elements_html_["turns"] = '<button onclick="del_turn()">-</button> <button onclick="add_turn()">+</button> ' + nb_turns + ' turns<br>';
    for (var i = 0; i < nb_turns; i++) {
        elements_html_["turns"] += str_elt(null, i, "turns", 0, 0) + "<br>";
    }
    document.getElementById("turns").innerHTML = elements_html_["turns"];

    // Affichage des gears rpm limit pour la voiture s�lectionn�e
    elements_html_["gears"] = '';
    var nb_gears = 8;
    for (var i = 1; i < nb_gears + 1; i++) {
        elements_html_["gears"] += str_elt(null, i, "gears", 0, 0);
    }
    document.getElementById("gears").innerHTML = elements_html_["gears"];

    // Affichage des donn�es des colonnes des timing
    for (var page in list_timing_pages) {
        create_timing_columns(page);
    }

    // On charge les donn�es dans les �l�ments
    load_donnees(load_dashboard_advanced, scroll);

}


function set_copy_paste(dashboard, name, x, mode) {
    if (mode == "clear") {
        if (donnees_copy_dashboard != null && donnees_copy_name != null && donnees_copy_x != null && donnees_paste_dashboard != null && donnees_paste_name != null && donnees_paste_x != null) {
            document.getElementById("copy" + '_elt_options_bloc2_' + donnees_copy_dashboard + '_advanced_' + donnees_copy_name + '_' + donnees_copy_x).style.backgroundColor = "#dddddd";
            document.getElementById("copy" + '_elt_options_bloc2_' + donnees_copy_dashboard + '_advanced_' + donnees_copy_name + '_' + donnees_copy_x).style.color = "#444444";
            document.getElementById("copy" + '_elt_options_bloc2_' + donnees_copy_dashboard + '_advanced_' + donnees_copy_name + '_' + donnees_copy_x).style.borderColor = "#666666";
            document.getElementById("copy" + '_elt_options_bloc2_' + donnees_copy_dashboard + '_advanced_' + donnees_copy_name + '_' + donnees_copy_x).innerHTML = "copy";
            document.getElementById("paste" + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).style.backgroundColor = "#dddddd";
            document.getElementById("paste" + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).style.color = "#444444";
            document.getElementById("paste" + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).style.borderColor = "#666666";
            document.getElementById("paste" + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).innerHTML = "paste";
        }
        donnees_copy = null;
        donnees_reset = null;
    } else {
        if (mode == "copy" && donnees_copy_dashboard != null && donnees_copy_name != null && donnees_copy_x != null) {
            document.getElementById(mode + '_elt_options_bloc2_' + donnees_copy_dashboard + '_advanced_' + donnees_copy_name + '_' + donnees_copy_x).style.backgroundColor = "#dddddd";
            document.getElementById(mode + '_elt_options_bloc2_' + donnees_copy_dashboard + '_advanced_' + donnees_copy_name + '_' + donnees_copy_x).style.color = "#444444";
            document.getElementById(mode + '_elt_options_bloc2_' + donnees_copy_dashboard + '_advanced_' + donnees_copy_name + '_' + donnees_copy_x).style.borderColor = "#666666";
            document.getElementById(mode + '_elt_options_bloc2_' + donnees_copy_dashboard + '_advanced_' + donnees_copy_name + '_' + donnees_copy_x).innerHTML = "copy";
            if (donnees_paste_dashboard != null && donnees_paste_name != null && donnees_paste_x != null) {
                document.getElementById("paste" + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).style.backgroundColor = "#dddddd";
                document.getElementById("paste" + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).style.color = "#444444";
                document.getElementById("paste" + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).style.borderColor = "#666666";
                document.getElementById("paste" + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).innerHTML = "paste";
                donnees_reset = null;
            }
        }
        if (mode == "paste" && donnees_paste_dashboard != null && donnees_paste_name != null && donnees_paste_x != null) {
            document.getElementById(mode + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).style.backgroundColor = "#dddddd";
            document.getElementById(mode + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).style.color = "#444444";
            document.getElementById(mode + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).style.borderColor = "#666666";
            document.getElementById(mode + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).innerHTML = "paste";
        }

        if (mode == "copy") {
            document.getElementById(mode + '_elt_options_bloc2_' + dashboard + '_advanced_' + name + '_' + x).style.backgroundColor = "#0088ff";
            document.getElementById(mode + '_elt_options_bloc2_' + dashboard + '_advanced_' + name + '_' + x).innerHTML = "copied";
        } else if (mode == "paste") {
            document.getElementById(mode + '_elt_options_bloc2_' + dashboard + '_advanced_' + name + '_' + x).style.backgroundColor = "#ff8800";
            document.getElementById(mode + '_elt_options_bloc2_' + dashboard + '_advanced_' + name + '_' + x).innerHTML = "reset";
        } else if (mode == "reset" && donnees_paste_dashboard != null && donnees_paste_name != null && donnees_paste_x != null) {
            document.getElementById("paste" + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).style.backgroundColor = "#dddddd";
            document.getElementById("paste" + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).style.color = "#444444";
            document.getElementById("paste" + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).style.borderColor = "#666666";
            document.getElementById("paste" + '_elt_options_bloc2_' + donnees_paste_dashboard + '_advanced_' + donnees_paste_name + '_' + donnees_paste_x).innerHTML = "paste";
        }
        if (mode == "copy" || mode == "paste") {
            document.getElementById(mode + '_elt_options_bloc2_' + dashboard + '_advanced_' + name + '_' + x).style.color = "#ffffff";
            document.getElementById(mode + '_elt_options_bloc2_' + dashboard + '_advanced_' + name + '_' + x).style.borderColor = "#ffffff";
        }

        if (mode == "copy") {
            donnees_copy_dashboard = dashboard;
            donnees_copy_name = name;
            donnees_copy_x = x;
        }
        if (mode == "paste") {
            donnees_paste_dashboard = dashboard;
            donnees_paste_name = name;
            donnees_paste_x = x;
        }
    }
}


// COPY des options avanc�es d'un �l�ment du dashboard
function copy_elt_options(dashboard, name, x) {
    donnees_copy = {};
    var tmp_tab, elem, elt_param;
    for (var var_i in var_dashboard_advanced) {
        param = var_dashboard_advanced[var_i]["nom"] + "_" + name;
        donnees_copy[var_dashboard_advanced[var_i]["nom"]] = donnees.param[dashboard]["advanced"][param + "_" + x];
    }
    set_copy_paste(dashboard, name, x, "copy");
}


// PASTE des options avanc�es d'un �l�ment du dashboard
function paste_elt_options(dashboard, name, x) {

    var reset = 0;

    // Si on appuie une 2�me fois sur paste c'est que c'est un reset
    if  (donnees_paste_name == name && donnees_reset != null) {
        reset = 1;
    }

    if (donnees_copy != null || reset) {

        //if (reset || confirm("Apply the <" + dashboard_advanced_texte[donnees_copy_name] + "> settings from the " + donnees_copy_dashboard + " display #" + donnees_copy_x + " to <" + dashboard_advanced_texte[name] + "> ?\n\nNB: it won't copy the X, Y, W, H and Font values.")) {
        if (true) {

            // On ne copie pas le param�tre 'highlight' pour �viter les bugs car c'est compliqu� � g�rer et inutile
            // On ne copie pas non plus de disp, le X, le Y, le W, le H, et le font sauf si on le demande
            var exclude_list = {
                "highlight": 1,
                "disp": 1,
                "x": 1,
                "y": 1,
                "w": 1,
                "h": 1,
                "f": 1,
            }
            if (!reset) {
                if (confirm("Click 'OK' if you want to copy also the X, Y, W, H and Font values")) {
                    exclude_list = {
                        "highlight": 1,
                        "disp": 1,
                    }
                }
            } else {
                // on exclut le highlight quoi qu'il arrive
                exclude_list = {
                    "highlight": 1,
                }
            }

            if (!reset) {
                donnees_reset = {};  // permet d'annuler un paste
            }


            for (var var_i in var_dashboard_advanced) {
                param = var_dashboard_advanced[var_i]["nom"] + "_" + name;
                if (reset) {
                    if ( !(var_dashboard_advanced[var_i]["nom"] in exclude_list) ) {
                        donnees.param[dashboard]["advanced"][param + "_" + x] = donnees_reset[var_dashboard_advanced[var_i]["nom"]];
                    }
                } else {
                    donnees_reset[var_dashboard_advanced[var_i]["nom"]] = donnees.param[dashboard]["advanced"][param + "_" + x];  // on sauvegarde les donn�es avant de les modifier pour pouvoir faire un reset ensuite
                    if ( !(var_dashboard_advanced[var_i]["nom"] in exclude_list) ) {
                        donnees.param[dashboard]["advanced"][param + "_" + x] = donnees_copy[var_dashboard_advanced[var_i]["nom"]];
                    }
                }
            }

            // On charge les donn�es dans les �l�ments
            for (var elt_i in menu_elements_dashboard_advanced) {
                if (menu_elements_dashboard_advanced[elt_i]["param"][0] == name) {
                    for (var var_i in var_dashboard_advanced) {
                        var tmp_elt = {
                            "param": [var_dashboard_advanced[var_i]["nom"] + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0]],
                            "texte": menu_elements_dashboard_advanced[elt_i]["texte"] + " " + var_dashboard_advanced[var_i]["texte"] + " : ",
                            "val_type": var_dashboard_advanced[var_i]["val_type"],
                            "elt_type": var_dashboard_advanced[var_i]["elt_type"]
                        }
                        if ("long" in var_dashboard_advanced[var_i]) {
                            tmp_elt["long"] = var_dashboard_advanced[var_i]["long"];
                        }
                        if ("step" in var_dashboard_advanced[var_i]) {
                            tmp_elt["step"] = var_dashboard_advanced[var_i]["step"];
                        }

                        load_elt(null, [dashboard, "advanced", tmp_elt["param"][0] + "_" + x], tmp_elt["elt_type"]);
                    }
                }
            }

            // Pour appliquer les changements
            set_config_page(dashboard, 0, 0);

            if (reset) {
                set_copy_paste(dashboard, name, x, "reset");
            } else {
                set_copy_paste(dashboard, name, x, "paste");
            }

            if (reset) {
                donnees_reset = null;
            }
        }
    }
}


function change_more_options(bloc2_name, dashboard, x, elt_i_str) {
    if (elt_i_str != "") {
        var elt_i = JSON.parse(elt_i_str);

        var more_options_texte = document.getElementById("more_options_" + bloc2_name).innerHTML;
        if (more_options_texte.includes("+ options")) {
            more_options_value_[bloc2_name] = "&nbsp;&minus; options&nbsp;";
            document.getElementById("more_options_" + bloc2_name).innerHTML = "&nbsp;&minus; options&nbsp;";
            document.getElementById(bloc2_name).innerHTML = create_elements_bloc2_more_options(elt_i, dashboard, x);
            // On charge les donn�es dans les �l�ments
            load_donnees(1, 0, dashboard, 1);

            document.getElementById(bloc2_name).style.marginTop = "0.25em";
            document.getElementById(bloc2_name).style.display = "block";
        } else {
            more_options_value_[bloc2_name] = "&nbsp;+ options&nbsp;";
            document.getElementById("more_options_" + bloc2_name).innerHTML = "&nbsp;+ options&nbsp;";
            document.getElementById(bloc2_name).innerHTML = "";
            document.getElementById(bloc2_name).style.marginTop = "0.0em";
            document.getElementById(bloc2_name).style.display = "none";
        }
    }
}


// On charge les donn�es dans les �l�ments
function load_donnees(load_dashboard_advanced, scroll, only_this_dashboard, only_more_options, no_display_options) {

    if (no_display_options == undefined) {
        no_display_options = 0;
    }

    if (only_this_dashboard != undefined && only_this_dashboard != 0) {
        var dashboard_list = JSON.parse('{\"' + only_this_dashboard + '\":1}');
    } else {
        var dashboard_list = {"dashboard": 1, "dashboard2": 1};
    }

    if (only_more_options == undefined) {
        only_more_options = 0;
    }

    // Param�tres globaux
    if (!only_more_options) {
        for (var elt_i in menu_elements) {
            load_elt(menu_elements[elt_i], menu_elements[elt_i]["param"], menu_elements[elt_i]["elt_type"]);
        }
    }

    // Param�tres avanc�s du dashboard
    if (load_dashboard_advanced == 1) {
        for (var dashboard in dashboard_list) {
            var x = donnees.param[dashboard]["advanced"]["display_selected"];
            //for (var x = 1; x <= donnees.param[dashboard]["nb_displays"]; x++) {
                for (var elt_i in menu_elements_dashboard_advanced) {
                    //if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "name" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "select_display" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "transparency_OBS" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "ref_w" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "ref_h" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "image_de_fond") {
                    if (menu_elements_dashboard_advanced[elt_i]["param"][0] in displays_list) {  // REM displays_list contient aussi name et select_display mais c'est pas grave car ils sont trait�s avant le else if
                        load_elt(null, [dashboard, "advanced", menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], menu_elements_dashboard_advanced[elt_i]["elt_type"]);
                    } else {

                        var bloc2_name = "bloc2_" + dashboard + "_advanced_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x;

                        for (var var_i in var_dashboard_advanced) {
                            if (var_dashboard_advanced[var_i]["is_more_options"] == 0 || (bloc2_name in more_options_value_ && more_options_value_[bloc2_name].includes("&minus; options"))) {
                                var tmp_elt = {
                                    "param": [var_dashboard_advanced[var_i]["nom"] + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0]],
                                    "texte": menu_elements_dashboard_advanced[elt_i]["texte"] + " " + var_dashboard_advanced[var_i]["texte"] + " : ",
                                    "val_type": var_dashboard_advanced[var_i]["val_type"],
                                    "elt_type": var_dashboard_advanced[var_i]["elt_type"]
                                }
                                if ("long" in var_dashboard_advanced[var_i]) {
                                    tmp_elt["long"] = var_dashboard_advanced[var_i]["long"];
                                }
                                if ("step" in var_dashboard_advanced[var_i]) {
                                    tmp_elt["step"] = var_dashboard_advanced[var_i]["step"];
                                }

                                load_elt(null, [dashboard, "advanced", tmp_elt["param"][0] + "_" + x], tmp_elt["elt_type"]);
                            }
                        }

                    }
                }
            //}
        }
    }

    if (!only_more_options) {
        // Param�tres des virages pour le circuit s�lectionn�
        load_elt(null, null, "turns");

        // Param�tres des rpm pour la voiture s�lectionn�e
        load_elt(null, null, "gears");
    }

    load_spec();  // charge les sp�cificit�s de toutes les pages (cases gris�es, texte diff�rent en fonction des valeurs, couleurs pour la licence)

    if (!only_more_options) {
        if (!no_display_options) {
            //display_groups(groups_to_display);  // inutile puisqu'on le fait dans display_options
            display_options(scroll, null);
        }
    }

    elements_created = 1;

    // Au chargement de la page on sauvegarde les derniers param�tres sauvegard�s
    /*if (premier_chargement) {
        undo_param = donnees.param;
        premier_chargement = false;
    }*/

}


// On cr�e les colonne du timing sp�cifi� dans page
function create_timing_columns(page) {
    elements_html_[page + "_columns"] = '<div style="display: inline-block; background-color: #333333; color: white; line-height: 1.5em;">';
    elements_html_[page + "_columns"] += '<div style="display: inline-block; border-right: 0px solid white; text-align: center; width: 3.8em">Order</div>';
    elements_html_[page + "_columns"] += '<div style="display: inline-block; border-right: 0px solid white; text-align: center; width: 10em">Title ID</div>';
    elements_html_[page + "_columns"] += '<div style="display: inline-block; border-right: 0px solid white; text-align: center; width: 6.3em">Name</div>';
    elements_html_[page + "_columns"] += '<div style="display: inline-block; border-right: 0px solid white; text-align: center; width: 4.2em">Width</div>';
    elements_html_[page + "_columns"] += '<div style="display: inline-block; text-align: center; width: 17.2em">Option</div>';
    elements_html_[page + "_columns"] += '</div>';
    // On attribut un num�ros d'ordre pour les colonnes du timing
    var order_num = 1;
    list_title_id[page] = {};
    order_nums_[page + "_columns"] = {};
    for (var i in donnees.param[page].tab_titres) {
        title_id = donnees.param[page].tab_titres[i];
        list_title_id[page][title_id] = 1;
        order_nums_[page + "_columns"][title_id] = order_num;
        elements_html_[page + "_columns"] += str_elt(null, {"title_id": title_id, "page": page, "order_num": order_num}, "timing_columns", 0, 0);
        order_num++;
    }
    for (var i in donnees.param[page].tab_titres_all_default) {
        title_id = donnees.param[page].tab_titres_all_default[i];
        if (!(title_id in list_title_id[page])) {
            order_nums_[page + "_columns"][title_id] = null;
            elements_html_[page + "_columns"] += str_elt(null, {"title_id": title_id, "page": page, "order_num": null}, "timing_columns", 0, 0);
        }
    }
    document.getElementById(page + "_columns").innerHTML = elements_html_[page + "_columns"];

    for (var i in donnees.param[page].tab_titres_all_default) {
        title_id = donnees.param[page].tab_titres_all_default[i];
        var elt = document.getElementById(page + "_text_" + title_id);
        //var elt_drag = document.getElementById(page + "_columns_" + title_id + "_drag");
        var elt_order = document.getElementById(page + "_order_" + title_id);

        /* // ATTENTION : au premier chargement les valeurs sont 0 donc je l'ai enlev� !
            if (title_id in list_title_id[page]) {
                //order_nums_[page + "_columns"][title_id] = elt.offsetTop;
                order_nums_[page + "_columns"][title_id] = $(elt_drag).position().top;
            } else {
                //order_nums_[page + "_columns"][title_id] = elt.offsetTop + 999999;
                order_nums_[page + "_columns"][title_id] = $(elt_drag).position().top + 999999;
            }
        */

        drag_title_id(elt, page, title_id);
        drag_title_id(elt_order, page, title_id);
        //console.log(elt.offsetTop);
    }
    /*if (page == "timing") {
        console.log(list_title_id[page]);
    }*/
    //console.log(page, donnees.param[page].tab_titres)

}


function drag_title_id(elt, page, title_id) {
    elt.ontouchstart = elt.onmousedown = function (e) {

        e = e || window.event;
        e.preventDefault();
        elt_bloc = document.getElementById(page + "_columns_" + title_id + "_bloc");
        elt_drag = document.getElementById(page + "_columns_" + title_id + "_drag");

        // On relit les top car les valeurs peuvent avoir �t� fausses juste apr�s la cr�ation des �l�ments timing columns
        for (var i in donnees.param[page].tab_titres_all_default) {
            tmp_title_id = donnees.param[page].tab_titres_all_default[i];
            tmp_elt_drag = document.getElementById(page + "_columns_" + tmp_title_id + "_drag");
            if (tmp_title_id in list_title_id[page]) {
                order_nums_[page + "_columns"][tmp_title_id] = $(tmp_elt_drag).position().top;
            } else {
                order_nums_[page + "_columns"][tmp_title_id] = $(tmp_elt_drag).position().top + 999999;
            }
        }

        elt_text = document.getElementById(page + "_text_" + title_id);
        elt_order = document.getElementById(page + "_order_" + title_id);
        if (!( /Android|webOS|iPhone|iPad/i.test(navigator.userAgent) )) {
            mouse_y0 = e.clientY;
        } else {
            mouse_y0 = e.touches[0].clientY;
        }
        title_id_top0 = $(elt_drag).position().top;
        //console.log("top0", title_id_top0);
        document.ontouchstart = document.onmousedown = function (e) {
            elt_text.style.cursor = "grabbing";
            elt_order.style.cursor = "grabbing";
            elt_drag.style.backgroundColor = "black";
            elt_drag.style.fontWeight = "bold";
            elt_drag.style.color = "white";
            elt_drag.style.position = "absolute";
        };
        document.ontouchmove = document.onmousemove = function (e) {
            e = e || window.event;
            e.preventDefault();
            //elt_drag.style.position = "absolute";
            if (!( /Android|webOS|iPhone|iPad/i.test(navigator.userAgent) )) {
                elt_drag.style.top = title_id_top0 + e.clientY - mouse_y0 + "px";
            } else {
                touchY = e.touches[0].clientY;  // permet d'enregistrer la position du doigt car ontouchend ne le permet pas
                elt_drag.style.top = -window.scrollY + title_id_top0 + e.touches[0].clientY - mouse_y0 + "px";
            }
            //elt_drag.style.backgroundColor = "black";
            //console.log("***", title_id, title_id_top0 + e.clientY - mouse_y0);
        };
        document.ontouchend = document.onmouseup = function (e) {
            e = e || window.event;
            e.preventDefault();
            elt_drag.style.fontWeight = "normal";
            elt_drag.style.color = "initial";
            var tmp_add = 0;
            if (order_nums_[page + "_columns"][title_id] >= 999999) tmp_add = 999999;
            if (!( /Android|webOS|iPhone|iPad/i.test(navigator.userAgent) )) {
                order_nums_[page + "_columns"][title_id] = title_id_top0 + e.clientY - mouse_y0 + tmp_add;
            } else {
                order_nums_[page + "_columns"][title_id] = title_id_top0 + touchY - mouse_y0 + tmp_add;
            }
            //console.log("***", title_id, title_id_top0, e.clientY - mouse_y0);
            //elt.style.position = "block";
            //elt.style.backgroundColor = "initial";

            //set_config_page(page, 1, 0);
            set_config_page_partial(page, null, null, "timing_columns;" + page, 1, 0);

            close_drag_title_id();
        }
    };
}


function close_drag_title_id() {
    document.onmouseup = null;
    document.onmousemove = null;
    document.onmousedown = null;
    document.ontouchend = null;
    document.ontouchmove = null;
    document.ontouchstart = null;
}


// Ajoute / supprime un virage au circuit s�lectionn�
function add_turn() {
    donnees.param["track"]["nb_turns"]++;
    var nb_turns = donnees.param["track"]["nb_turns"];
    donnees.param["track"]["turn_num"][nb_turns - 1] = nb_turns;
    donnees.param["track"]["turn_ldp"][nb_turns - 1] = 0;
    donnees.param["track"]["turn_side"][nb_turns - 1] = -1;
    donnees.param["track"]["turn_info"][nb_turns - 1] = "";
    create_elements(0, 1);  // on est oblig� de recr�er les �l�ments pour ajouter la cl�
    //set_config_page("track", 0, 0)
    set_config_page_partial("track", null, null, "turns", 0, 0);
}
function del_turn() {
    if (donnees.param["track"]["nb_turns"] > 0) {
        donnees.param["track"]["nb_turns"]--;
        var nb_turns = donnees.param["track"]["nb_turns"];
        delete donnees.param["track"]["turn_num"][nb_turns];
        delete donnees.param["track"]["turn_ldp"][nb_turns];
        delete donnees.param["track"]["turn_side"][nb_turns];
        delete donnees.param["track"]["turn_info"][nb_turns];
        create_elements(0, 1);  // on est oblig� de recr�er les �l�ments pour ajouter la cl�
        //set_config_page("track", 0, 0)
        set_config_page_partial("track", null, null, "turns", 0, 0);
    }
}


// On copy les param�tres du display x2 dans le display x1 pour le dashboard
//function copy_display(dashboard, x1, x2, new_display=0) {
function copy_display(dashboard, x1, x2, new_display) {

    set_copy_paste(null, null, null, "clear");

    var tmp_name_i = 0;
    for (var elt_i in menu_elements_dashboard_advanced) {
        if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "name") {
            if (new_display == 1) {
                //donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x1] = "new display";
                donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x1] = donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x2] + " - COPY";
            } else {
                donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x1] = donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x2];
            }
        } else if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "select_display") {
            //donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x1 + "_joy"] = donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x2 + "_joy"];
            //donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x1 + "_button"] = donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x2 + "_button"];
            // On ne copie pas le bouton pour �viter d'avoir le m�me bouton pour 2 displays diff�rents
            donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x1 + "_joy"] = -1;
            donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x1 + "_button"] = -1;
        //} else if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "transparency_OBS" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "ref_w" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "ref_h" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "image_de_fond") {
        } else if (menu_elements_dashboard_advanced[elt_i]["param"][0] in displays_list) {  // REM displays_list contient aussi name et select_display mais c'est pas grave car ils sont trait�s avant le else if
            donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x1] = donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x2];
        } else {
            tmp_name_i++;
            var tmp_col_i = 0;
            for (var var_i in var_dashboard_advanced) {
                tmp_col_i++;
                var tmp_elt = {
                    "param": [var_dashboard_advanced[var_i]["nom"] + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0]],
                    "texte": menu_elements_dashboard_advanced[elt_i]["texte"] + " " + var_dashboard_advanced[var_i]["texte"],
                    "val_type": var_dashboard_advanced[var_i]["val_type"],
                    "elt_type": var_dashboard_advanced[var_i]["elt_type"]
                }
                if ("long" in var_dashboard_advanced[var_i]) {
                    tmp_elt["long"] = var_dashboard_advanced[var_i]["long"];
                }
                if ("step" in var_dashboard_advanced[var_i]) {
                    tmp_elt["step"] = var_dashboard_advanced[var_i]["step"];
                }

                donnees.param[dashboard]["advanced"][tmp_elt["param"][0] + "_" + x1] = donnees.param[dashboard]["advanced"][tmp_elt["param"][0] + "_" + x2];
            }
        }
    }
}


// On efface les valeurs pour un display (ne pas confondre avec delete_display
function efface_display(dashboard, x) {

    set_copy_paste(null, null, null, "clear");

    var tmp_name_i = 0;
    for (var elt_i in menu_elements_dashboard_advanced) {
        //if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "name" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "select_display" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "transparency_OBS" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "ref_w" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "ref_h" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "image_de_fond") {
        if (menu_elements_dashboard_advanced[elt_i]["param"][0] in displays_list) {
            if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "select_display") {
                delete donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x + "_joy"];
                delete donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x + "_button"];
            } else {
                delete donnees.param[dashboard]["advanced"][menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x];
            }
        } else {
            tmp_name_i++;
            var tmp_col_i = 0;
            for (var var_i in var_dashboard_advanced) {
                tmp_col_i++;
                var tmp_elt = {
                    "param": [var_dashboard_advanced[var_i]["nom"] + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0]],
                    "texte": menu_elements_dashboard_advanced[elt_i]["texte"] + " " + var_dashboard_advanced[var_i]["texte"],
                    "val_type": var_dashboard_advanced[var_i]["val_type"],
                    "elt_type": var_dashboard_advanced[var_i]["elt_type"]
                }
                if ("long" in var_dashboard_advanced[var_i]) {
                    tmp_elt["long"] = var_dashboard_advanced[var_i]["long"];
                }
                if ("step" in var_dashboard_advanced[var_i]) {
                    tmp_elt["step"] = var_dashboard_advanced[var_i]["step"];
                }

                delete donnees.param[dashboard]["advanced"][tmp_elt["param"][0] + "_" + x];
            }
        }
    }
}


// Insert / Ajoute / supprime / up / down pour les displays d'un dashboard
function insert_display(dashboard) {

    set_copy_paste(null, null, null, "clear");

    donnees.param[dashboard]["nb_displays"]++;

    var nb_d = donnees.param[dashboard]["nb_displays"];
    var ds = donnees.param[dashboard]["advanced"]["display_selected"];

    for (var x = nb_d; x >= ds + 1; x--) {
        copy_display(dashboard, x, x - 1, 0);
    }
    copy_display(dashboard, ds, ds, 1);

    create_elements(1, 0);  // on recr�e les �l�ments dont le dashboard avanc� et on ne scroll pas
    set_config_page(dashboard, 0, 1);
    // REM : on ne fait pas de set_config_page_partial car il y a beaucoup de param�tres � mettre � jour
}
function add_display(dashboard) {

    set_copy_paste(null, null, null, "clear");

    donnees.param[dashboard]["nb_displays"]++;

    var nb_d = donnees.param[dashboard]["nb_displays"];
    var ds = donnees.param[dashboard]["advanced"]["display_selected"];

    copy_display(dashboard, nb_d, ds, 1);
    donnees.param[dashboard]["advanced"]["display_selected"] = nb_d;

    create_elements(1, 0);  // on recr�e les �l�ments dont le dashboard avanc� et on ne scroll pas
    set_config_page(dashboard, 0, 1);
    // REM : on ne fait pas de set_config_page_partial car il y a beaucoup de param�tres � mettre � jour
}
function delete_display(dashboard) {

    set_copy_paste(null, null, null, "clear");

    var ds = donnees.param[dashboard]["advanced"]["display_selected"];
    var name = donnees.param[dashboard]["advanced"]["name_" + ds];
    document.getElementById("hide").style.display = "block";
    if (confirm("Are you sure that you want to delete the display #" + ds + " - " + name + " ?")) {
        if (donnees.param[dashboard]["nb_displays"] >= 2) {
            donnees.param[dashboard]["nb_displays"]--;

            var nb_d = donnees.param[dashboard]["nb_displays"];

            if (ds <= nb_d) {
                for (var x = ds; x <= nb_d; x++) {
                    copy_display(dashboard, x, x + 1, 0);
                }
            } else {
                donnees.param[dashboard]["advanced"]["display_selected"]--;
            }
            efface_display(dashboard, nb_d + 1);

            create_elements(1, 0);  // on recr�e les �l�ments dont le dashboard avanc� et on ne scroll pas
            set_config_page(dashboard, 0, 1);
            // REM : on ne fait pas de set_config_page_partial car il y a beaucoup de param�tres � mettre � jour
        }
    }
    document.getElementById("hide").style.display = "none";
}
function up_display(dashboard) {

    set_copy_paste(null, null, null, "clear");

    var nb_d = donnees.param[dashboard]["nb_displays"];
    var ds = donnees.param[dashboard]["advanced"]["display_selected"];

    if (ds > 1) {
        copy_display(dashboard, "tmp", ds, 0);  // on copy d'abord le display selected dans une m�moire temporaire
        copy_display(dashboard, ds, ds - 1, 0);
        copy_display(dashboard, ds - 1, "tmp", 0);
        efface_display(dashboard, "tmp");
        //console.log(donnees.param[dashboard]["advanced"]);
        donnees.param[dashboard]["advanced"]["display_selected"]--;

        create_elements(1, 0);  // on recr�e les �l�ments dont le dashboard avanc� et on ne scroll pas
        set_config_page(dashboard, 0, 1);
        // REM : on ne fait pas de set_config_page_partial car il y a beaucoup de param�tres � mettre � jour
    }
}
function down_display(dashboard) {

    set_copy_paste(null, null, null, "clear");

    var nb_d = donnees.param[dashboard]["nb_displays"];
    var ds = donnees.param[dashboard]["advanced"]["display_selected"];

    if (ds < nb_d) {
        copy_display(dashboard, "tmp", ds, 0);  // on copy d'abord le display selected dans une m�moire temporaire
        copy_display(dashboard, ds, ds + 1, 0);
        copy_display(dashboard, ds + 1, "tmp", 0);
        efface_display(dashboard, "tmp");
        donnees.param[dashboard]["advanced"]["display_selected"]++;

        create_elements(1, 0);  // on recr�e les �l�ments dont le dashboard avanc� et on ne scroll pas
        set_config_page(dashboard, 0, 1);
        // REM : on ne fait pas de set_config_page_partial car il y a beaucoup de param�tres � mettre � jour
    }
}
// Pour cocher toutes les cases d'un display
function check_all(dashboard) {
    var ds = donnees.param[dashboard]["advanced"]["display_selected"];
    var elt = null;
    for (var elt_i in menu_elements_dashboard_advanced) {
        //if (menu_elements_dashboard_advanced[elt_i]["param"][0] != "name" && menu_elements_dashboard_advanced[elt_i]["param"][0] != "select_display" && menu_elements_dashboard_advanced[elt_i]["param"][0] != "transparency_OBS" && menu_elements_dashboard_advanced[elt_i]["param"][0] != "ref_w" && menu_elements_dashboard_advanced[elt_i]["param"][0] != "ref_h" && menu_elements_dashboard_advanced[elt_i]["param"][0] != "image_de_fond") {
        if ( !(menu_elements_dashboard_advanced[elt_i]["param"][0] in displays_list) ) {
            //console.log(dashboard + "_advanced_" + "disp" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + ds);
            elt = dashboard + "_advanced_" + "disp" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + ds;
            document.getElementById(elt).checked = true;
        }
    }
    set_config_page(dashboard, 0, 0);
    // REM : on ne fait pas de set_config_page_partial car il y a beaucoup de param�tres � mettre � jour
}
// Pour d�cocher toutes les cases d'un display
function check_none(dashboard) {
    var ds = donnees.param[dashboard]["advanced"]["display_selected"];
    var elt = null;
    for (var elt_i in menu_elements_dashboard_advanced) {
        //if (menu_elements_dashboard_advanced[elt_i]["param"][0] != "name" && menu_elements_dashboard_advanced[elt_i]["param"][0] != "select_display" && menu_elements_dashboard_advanced[elt_i]["param"][0] != "transparency_OBS" && menu_elements_dashboard_advanced[elt_i]["param"][0] != "ref_w" && menu_elements_dashboard_advanced[elt_i]["param"][0] != "ref_h" && menu_elements_dashboard_advanced[elt_i]["param"][0] != "image_de_fond") {
        if ( !(menu_elements_dashboard_advanced[elt_i]["param"][0] in displays_list) ) {
            //console.log(dashboard + "_advanced_" + "disp" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + ds);
            elt = dashboard + "_advanced_" + "disp" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + ds;
            document.getElementById(elt).checked = false;
        }
    }
    set_config_page(dashboard, 0, 0);
    // REM : on ne fait pas de set_config_page_partial car il y a beaucoup de param�tres � mettre � jour
}
// Pour charger les r�glages par d�faut
function load_default_display(dashboard) {

    set_copy_paste(null, null, null, "clear");

    page_active = dashboard;

    set_copy_paste(null, null, null, "clear");

    var ds = donnees.param[dashboard]["advanced"]["display_selected"];
    //var name = donnees.param[dashboard]["advanced"]["name_" + ds];
    //if (confirm("Are you sure that you want to load the default settings for the display #" + ds + " - " + name + " ?")) {
    var elt = null;
    var elt_default = null;
    var d = null;
    for (var elt_i in menu_elements_dashboard_advanced) {

        /*if (menu_elements_dashboard_advanced[elt_i]["param"][0].includes("frame")) {
            console.log(menu_elements_dashboard_advanced[elt_i]["param"][0]);
        }*/

        //if (menu_elements_dashboard_advanced[elt_i]["param"][0] != "name" && menu_elements_dashboard_advanced[elt_i]["param"][0] != "select_display" && menu_elements_dashboard_advanced[elt_i]["param"][0] != "transparency_OBS" && menu_elements_dashboard_advanced[elt_i]["param"][0] != "ref_w" && menu_elements_dashboard_advanced[elt_i]["param"][0] != "ref_h" && menu_elements_dashboard_advanced[elt_i]["param"][0] != "image_de_fond") {
        if ( !(menu_elements_dashboard_advanced[elt_i]["param"][0] in displays_list) ) {

            for (var var_i in var_dashboard_advanced) {

                //console.log(donnees.param["default"]["advanced"][var_dashboard_advanced[var_i]["nom"] + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + 1]);
                elt = dashboard + "_advanced_" + var_dashboard_advanced[var_i]["nom"] + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + ds;

                if (var_dashboard_advanced[var_i]["add_carclasscolor_option"] != 1 || menu_elements_dashboard_advanced[elt_i]["param"][0] in add_carclasscolor_option_list["pre"] || menu_elements_dashboard_advanced[elt_i]["param"][0] in add_carclasscolor_option_list["me"] || menu_elements_dashboard_advanced[elt_i]["param"][0] in add_carclasscolor_option_list["post"]) {

                    d = donnees.param["default"]["advanced"][var_dashboard_advanced[var_i]["nom"] + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + 1];
                    donnees.param[dashboard]["advanced"][var_dashboard_advanced[var_i]["nom"] + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + ds] = d;

                    // On met � jour les �l�ments (plus rapide que de refaire un create_elements apr�s)
                    if (document.getElementById(elt)) {
                        if (var_dashboard_advanced[var_i]["elt_type"] == "switch" || var_dashboard_advanced[var_i]["elt_type"] == "checkbox") {
                            if (d != 0) {
                                document.getElementById(elt).checked = true;
                            } else {
                                document.getElementById(elt).checked = false;
                            }
                            if (var_dashboard_advanced[var_i]["elt_type"] == "switch") {
                                nom_var = dashboard + "_advanced_" + var_dashboard_advanced[var_i]["nom"] + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + ds;
                                set_switch(nom_var);  // on met en forme le switch en fonction de l'activation ou non
                            }
                        } else {
                            document.getElementById(elt).value = d;
                        }
                    }
                }
            }
        }
    }

    //for (var nom in {"name": 1, "ref_w": 1, "ref_h": 1, "transparency_OBS": 1, "image_de_fond": 1}) {
    for (var nom in displays_list) {
        d = donnees.param["default"]["advanced"][nom + "_1"];

        // Comme ref_w et ref_h n'ont pas de valeur par d�faut dans var_default_options.js, on le d�finit ici lorsqu'on charge les options par d�faut en partant des options dashboard_ref_w & h
        if (nom == "ref_w" || nom == "ref_h")  {
            d = donnees.param["default"]["dashboard_" + nom];
        }

        // Comme font_family/weight/style n'ont pas de valeur par d�faut dans var_default_options.js, on le d�finit ici lorsqu'on charge les options par d�faut
        if (nom == "font_family") {
            d = "Arial";
        }
        if (nom == "font_weight") {
            d = "bold";
        }
        if (nom == "font_style") {
            d = "normal";
        }

        // Comme image_de_fond n'a pas de valeur par d�faut dans var_default_options.js, on le d�finit ici lorsqu'on charge les options par d�faut
        if (nom == "image_de_fond") {
            d = "display_vide.png";
        }
        if (nom == "image_de_premier_plan") {
            d = "display_vide.png";
        }

        nom_var = dashboard + "_advanced_" + nom + "_" + ds;
        //console.log(nom + "_" + ds, d)
        donnees.param[dashboard]["advanced"][nom + "_" + ds] = d;
        if (document.getElementById(nom_var)) {
            if (nom == "transparency_OBS" || nom == "iframe1_disp" || nom == "iframe2_disp" || nom == "iframe3_disp" || nom == "iframe4_disp") {  // comme c'est un switch on g�re diff�remment
                if (d) {
                    document.getElementById(nom_var).checked = true;
                } else {
                    document.getElementById(nom_var).checked = false;
                }
                set_switch(nom_var);  // on met en forme le switch en fonction de l'activation ou non
            } else {
                document.getElementById(nom_var).value = d;
            }
        }
    }

    set_config_page(dashboard, 0, 1);
    // REM : on ne fait pas de set_config_page_partial car il y a beaucoup de param�tres � mettre � jour
    //}
}

// Chargement des r�glages d'une page
function load_default_page(page) {

    set_copy_paste(null, null, null, "clear");

    page_active = page;
    button_action('load_default_page;' + page, null);

}
function load_page(page) {

    set_copy_paste(null, null, null, "clear");

    page_active = page;

    document.getElementById("import_export_cont").style.visibility = "visible";
    document.getElementById("import_export_cont").style.opacity = 1;
    document.getElementById("import_export_type").innerHTML = "Load a " + type_setting[page] + " page setting";
    document.getElementById("import_export_list").innerHTML = type_setting[page] + " pages settings list";
    var liste_pages = donnees.liste_configs[type_setting[page].toLowerCase() + " pages"];
    var tmp_size = Math.min(10, liste_pages.length);  // on limite la hauteur du select
    tmp_size = Math.max(2, tmp_size);  // on veut un minimum de 2 sinon quand on a qu'un seul display on ne peut pas le s�lectionner
    var str_html = '<select id="import_export_select" style="width: 80%;" size="' + tmp_size + '" onchange="document.getElementById(\'import_export_filename\').value=document.getElementById(\'import_export_select\').value;" >';
    for (var i = 0; i < liste_pages.length; i++) {
        str_html += '<option value="' + liste_pages[i] + '">' + liste_pages[i] + '</option>';
    }
    str_html += '</select>';
    str_html += '<div style="margin-top: 1em;">Select a ' + type_setting[page] + ' page setting from the list above</div>';
    str_html += '<input id="import_export_filename" type="text" disabled style="width: 80%; margin-top: 0.5em;" />';
    str_html += '<br><button onclick="load_page_do(\'' + page + '\')" style="margin-top: 0.25em; margin-right: 0.125em; width: 40%; font-size: 2em;">LOAD</button>';
    str_html += '<button onclick="document.getElementById(\'import_export_cont\').style.visibility = \'hidden\'; document.getElementById(\'import_export_cont\').style.opacity = 0" style="margin-top: 0.5em; margin-left: 0.125em; width: 40%; font-size: 2em;">Cancel</button>';
    document.getElementById("import_export_files").innerHTML = str_html;
}
function load_page_do(page) {
    var name = document.getElementById('import_export_filename').value;
    if (name != "") {
        button_action('load_page;' + page + ";" + type_setting[page] + ';' + name, null);
        document.getElementById("import_export_cont").style.visibility = "hidden";
        document.getElementById("import_export_cont").style.opacity = 0;
    }
}

// Export des r�glages d'une page pour pouvoir l'importer plus tard
function export_page(page) {

    var do_export = false;

    if (donnees.save_status == 1) {
        alert("You must save the settings before you can export them !")
    } else {
        do_export = true;
    }

    if (do_export) {
        document.getElementById("import_export_cont").style.visibility = "visible";
        document.getElementById("import_export_cont").style.opacity = 1;
        document.getElementById("import_export_type").innerHTML = "Export a " + type_setting[page] + " page setting";
        document.getElementById("import_export_list").innerHTML = type_setting[page] + " pages settings list";
        var liste_pages = donnees.liste_configs[type_setting[page].toLowerCase() + " pages"];
        var tmp_size = Math.min(10, liste_pages.length);  // on limite la hauteur du select
        tmp_size = Math.max(2, tmp_size);  // on veut un minimum de 2 sinon quand on a qu'un seul display on ne peut pas le s�lectionner
        var str_html = '<select id="import_export_select" style="width: 80%;" size="' + tmp_size + '" onchange="document.getElementById(\'import_export_filename\').value=document.getElementById(\'import_export_select\').value;" >';
        for (var i = 0; i < liste_pages.length; i++) {
            str_html += '<option value="' + liste_pages[i] + '">' + liste_pages[i] + '</option>';
        }
        str_html += '</select>';
        str_html += '<div style="margin-top: 1em;">Select a ' + type_setting[page] + ' page setting from the list above or enter a new name</div>';
        str_html += '<input id="import_export_filename" type="text" style="width: 80%; margin-top: 0.5em;" />';
        str_html += '<br><button onclick="export_page_do(\'' + page + '\')" style="margin-top: 0.25em; margin-right: 0.125em; width: 40%; font-size: 2em;">EXPORT</button>';
        str_html += '<button onclick="document.getElementById(\'import_export_cont\').style.visibility = \'hidden\'; document.getElementById(\'import_export_cont\').style.opacity = 0" style="margin-top: 0.5em; margin-left: 0.125em; width: 40%; font-size: 2em;">Cancel</button>';
        str_html += '<br><br><div style="line-height: 1.5em; padding-left: 10%; padding-right: 10%; color: #0088ff;">NOTE : the display settings will be saved in this folder :<br>' + donnees.param["general"]["mydocuments_jrt"] + 'import - export\\' + type_setting[page] + ' pages' + '</div>';
        document.getElementById("import_export_files").innerHTML = str_html;
    }
}
function export_page_do(page) {
    var name = document.getElementById('import_export_filename').value;

    // On regarde si le nom existe d�j� pour donner un avertissement au cas o�
    var liste_pages = donnees.liste_configs[type_setting[page].toLowerCase() + " pages"];
    var tmp_existe = false;
    for (var i=0; i < liste_pages.length; i++) {
        if (liste_pages[i] == name) tmp_existe = true;
    }

    tmp_continue = true;
    if (tmp_existe) {
        tmp_continue = confirm("Do you want to overwrite the old setting ?");
    }
    if (name != "" && tmp_continue) {
        button_action('export_page;' + page + ";" + type_setting[page] + ';' + name, null);
        document.getElementById("import_export_cont").style.visibility = "hidden";
        document.getElementById("import_export_cont").style.opacity = 0;
    }
}

// Chargement d'un display � partir d'une pr�c�dente exportation
function load_display(dashboard) {

    set_copy_paste(null, null, null, "clear");

    page_active = dashboard;

    var ds = donnees.param[dashboard]["advanced"]["display_selected"];
    //document.getElementById("import_export_cont").style.display = "block";
    document.getElementById("import_export_cont").style.visibility = "visible";
    document.getElementById("import_export_cont").style.opacity = 1;
    document.getElementById("import_export_type").innerHTML = "LOAD A DISPLAY";
    document.getElementById("import_export_list").innerHTML = "Displays list";
    var liste_displays = donnees.liste_configs["dashboard displays"];
    var tmp_size = Math.min(10, liste_displays.length);  // on limite la hauteur du select
    tmp_size = Math.max(2, tmp_size);  // on veut un minimum de 2 sinon quand on a qu'un seul display on ne peut pas le s�lectionner
    var str_html = '<select id="import_export_select" style="width: 80%;" size="' + tmp_size + '" onchange="document.getElementById(\'import_export_filename\').value=document.getElementById(\'import_export_select\').value;" >';
    for (var i = 0; i < liste_displays.length; i++) {
        str_html += '<option value="' + liste_displays[i] + '">' + liste_displays[i] + '</option>';
    }
    str_html += '</select>';
    str_html += '<div style="margin-top: 1em;">Select a display from the list above</div>';
    str_html += '<input id="import_export_filename" type="text" disabled style="width: 80%; margin-top: 0.5em;" />';
    str_html += '<br><button onclick="load_display_do(\'' + dashboard + '\', ' + ds + ')" style="margin-top: 0.25em; margin-right: 0.125em; width: 40%; font-size: 2em;">LOAD</button>';
    //str_html += '<button onclick="document.getElementById(\'import_export_cont\').style.display = \'none\';" style="margin-top: 0.5em; margin-left: 0.125em; width: 40%; font-size: 2em;">Cancel</button>';
    str_html += '<button onclick="document.getElementById(\'import_export_cont\').style.visibility = \'hidden\'; document.getElementById(\'import_export_cont\').style.opacity = 0" style="margin-top: 0.5em; margin-left: 0.125em; width: 40%; font-size: 2em;">Cancel</button>';
    var old_display_name = donnees.param[dashboard]["advanced"]["name_" + ds];
    document.getElementById("import_export_files").innerHTML = str_html;
}
function load_display_do(dashboard, ds) {
    var name = document.getElementById('import_export_filename').value;
    if (name != "") {
        //if (confirm("Note that if you had a background image, it will be replaced by the new one\nand the old one will be lost. Do you want to continue ?")) {
            button_action('load_display;' + dashboard + ';' + ds + ';' + name, null);
            //document.getElementById('import_export_cont').style.display = 'none';
            document.getElementById("import_export_cont").style.visibility = "hidden";
            document.getElementById("import_export_cont").style.opacity = 0;
        //}
    }
}

// Export d'un display pour pouvoir l'importer plus tard
function export_display(dashboard) {
    var ds = donnees.param[dashboard]["advanced"]["display_selected"];
    //document.getElementById("import_export_cont").style.display = "block";
    document.getElementById("import_export_cont").style.visibility = "visible";
    document.getElementById("import_export_cont").style.opacity = 1;
    document.getElementById("import_export_type").innerHTML = "EXPORT A DISPLAY";
    document.getElementById("import_export_list").innerHTML = "Displays list";
    var liste_displays = donnees.liste_configs["dashboard displays"];
    var tmp_size = Math.min(10, liste_displays.length);  // on limite la hauteur du select
    tmp_size = Math.max(2, tmp_size);  // on veut un minimum de 2 sinon quand on a qu'un seul display on ne peut pas le s�lectionner
    var str_html = '<select id="import_export_select" style="width: 80%;" size="' + tmp_size + '" onchange="document.getElementById(\'import_export_filename\').value=document.getElementById(\'import_export_select\').value;" >';
    for (var i = 0; i < liste_displays.length; i++) {
        str_html += '<option value="' + liste_displays[i] + '">' + liste_displays[i] + '</option>';
    }
    str_html += '</select>';
    str_html += '<div style="margin-top: 1em;">Select a display from the list above or enter a new name</div>';
    str_html += '<input id="import_export_filename" type="text" style="width: 80%; margin-top: 0.5em;" />';
    str_html += '<br><button onclick="export_display_do(\'' + dashboard + '\', ' + ds + ')" style="margin-top: 0.25em; margin-right: 0.125em; width: 40%; font-size: 2em;">EXPORT</button>';
    //str_html += '<button onclick="document.getElementById(\'import_export_cont\').style.display = \'none\';" style="margin-top: 0.5em; margin-left: 0.125em; width: 40%; font-size: 2em;">Cancel</button>';
    str_html += '<button onclick="document.getElementById(\'import_export_cont\').style.visibility = \'hidden\'; document.getElementById(\'import_export_cont\').style.opacity = 0" style="margin-top: 0.5em; margin-left: 0.125em; width: 40%; font-size: 2em;">Cancel</button>';
    str_html += '<br><br><div style="line-height: 1.5em; padding-left: 10%; padding-right: 10%; color: #0088ff;">NOTE : the display settings will be saved in this folder :<br>' + donnees.param["general"]["mydocuments_jrt"] + 'import - export\\dashboard displays' + '</div>';
    document.getElementById("import_export_files").innerHTML = str_html;
}
function export_display_do(dashboard, ds) {
    var name = document.getElementById('import_export_filename').value;

    // On regarde si le nom existe d�j� pour donner un avertissement au cas o�
    var liste_displays = donnees.liste_configs["dashboard displays"];
    var tmp_existe = false;
    for (var i=0; i < liste_displays.length; i++) {
        if (liste_displays[i] == name) tmp_existe = true;
    }

    tmp_continue = true;
    if (tmp_existe) {
        tmp_continue = confirm("Do you want to overwrite the old setting ?");
    }
    if (name != "" && tmp_continue) {
        button_action('export_display;' + dashboard + ';' + ds + ';' + name, null);
        //document.getElementById('import_export_cont').style.display = 'none';
        document.getElementById("import_export_cont").style.visibility = "hidden";
        document.getElementById("import_export_cont").style.opacity = 0;
    }
}

// On lit - enregistre la valeur sp�cifi�e dans elt_param du tableau donnees.param qui contient tous les param�tres
function donnees_elt_param(elt_param, opt, val) {

    // REM : avec l'option "save" on retournera un tableau permettant d'indiquer le param�tres enregistr� ainsi que la valeur

    var d;
    if (opt == "load") {
        switch (elt_param.length) {
            case 1:
                d = donnees.param[elt_param[0]];
                break;
            case 2:
                d = donnees.param[elt_param[0]][elt_param[1]];
                break;
            case 3:
                d = donnees.param[elt_param[0]][elt_param[1]][elt_param[2]];
                break;
        }
        return d;
    } else if (opt == "save" || opt == "copy") {
        var donnees_param_partial = {};
        switch (elt_param.length) {
            case 1:
                if (opt == "save") {
                    donnees.param[elt_param[0]] = val;
                }
                //return {"param": [elt_param[0]], "value": val};
                donnees_param_partial[elt_param[0]] = val ;
                return donnees_param_partial;
                //break;
            case 2:
                if (opt == "save") {
                    donnees.param[elt_param[0]][elt_param[1]] = val;
                }
                //return {"param": [elt_param[0], elt_param[1]], "value": val};
                donnees_param_partial[elt_param[0]] = {} ;
                donnees_param_partial[elt_param[0]][elt_param[1]] = val;
                return donnees_param_partial;
                //break;
            case 3:
                if (opt == "save") {
                    donnees.param[elt_param[0]][elt_param[1]][elt_param[2]] = val;
                }
                //return {"param": [elt_param[0], elt_param[1], elt_param[2]], "value": val};
                donnees_param_partial[elt_param[0]] = {} ;
                donnees_param_partial[elt_param[0]][elt_param[1]] = {} ;
                donnees_param_partial[elt_param[0]][elt_param[1]][elt_param[2]] = val;
                return donnees_param_partial;
                //break;
        }
        return false;  // pour ne pas provoquer d'erreur au cas o� mais normalement on n'y arriver pas ici
    }
}


// On lit - enregistre la valeur sp�cifi�e pour les boutons dans elt_param du tableau donnees.param qui contient tous les param�tres
function donnees_button_elt_param(elt_param, opt, val) {

    // REM : avec l'option "save" on retournera un tableau permettant d'indiquer le param�tres enregistr� ainsi que la valeur

    var d;
    if (opt == "load") {
        switch (elt_param.length) {
            case 1:
                d = [donnees.param[elt_param[0] + "_joy"], donnees.param[elt_param[0] + "_button"]];
                break;
            case 2:
                d = [donnees.param[elt_param[0]][elt_param[1] + "_joy"], donnees.param[elt_param[0]][elt_param[1] + "_button"]];
                break;
            case 3:
                d = [donnees.param[elt_param[0]][elt_param[1]][elt_param[2] + "_joy"], donnees.param[elt_param[0]][elt_param[1]][elt_param[2] + "_button"]];
                break;
        }
        return d;
    } else if (opt == "save" || opt == "copy") {
        var donnees_param_partial = {};
        var donnees_param_partial_tab = [];
        switch (elt_param.length) {
            case 1:
                if (opt == "save") {
                    donnees.param[elt_param[0] + "_joy"] = val[0];
                    donnees.param[elt_param[0] + "_button"] = val[1];
                }

                donnees_param_partial[elt_param[0] + "_joy"] = val[0];
                donnees_param_partial_tab.push(donnees_param_partial);

                donnees_param_partial = {};
                donnees_param_partial[elt_param[0] + "_button"] = val[1];
                donnees_param_partial_tab.push(donnees_param_partial);

                return donnees_param_partial_tab;
                //break;
            case 2:
                if (opt == "save") {
                    donnees.param[elt_param[0]][elt_param[1] + "_joy"] = val[0];
                    donnees.param[elt_param[0]][elt_param[1] + "_button"] = val[1];
                }

                donnees_param_partial[elt_param[0]] = {} ;
                donnees_param_partial[elt_param[0]][elt_param[1] + "_joy"] = val[0];
                donnees_param_partial_tab.push(donnees_param_partial);

                donnees_param_partial = {};
                donnees_param_partial[elt_param[0]] = {} ;
                donnees_param_partial[elt_param[0]][elt_param[1] + "_button"] = val[1];
                donnees_param_partial_tab.push(donnees_param_partial);

                return donnees_param_partial_tab;
                //break;
            case 3:
                if (opt == "save") {
                    donnees.param[elt_param[0]][elt_param[1]][elt_param[2] + "_joy"] = val[0];
                    donnees.param[elt_param[0]][elt_param[1]][elt_param[2] + "_button"] = val[1];
                }

                donnees_param_partial[elt_param[0]] = {} ;
                donnees_param_partial[elt_param[0]][elt_param[1]] = {} ;
                donnees_param_partial[elt_param[0]][elt_param[1]][elt_param[2] + "_joy"] = val[0];
                donnees_param_partial_tab.push(donnees_param_partial);

                donnees_param_partial = {};
                donnees_param_partial[elt_param[0]] = {} ;
                donnees_param_partial[elt_param[0]][elt_param[1]] = {} ;
                donnees_param_partial[elt_param[0]][elt_param[1]][elt_param[2] + "_button"] = val[1];
                donnees_param_partial_tab.push(donnees_param_partial);

                return donnees_param_partial_tab;
                //break;
        }
        return false;  // pour ne pas provoquer d'erreur au cas o� mais normalement on n'y arriver pas ici
    }
}


// On charge les valeurs de config transmises par le serveur JRT
function load_elt(elt, elt_param, elt_type) {
    if (elt_param != null && elt_type != "import_export") {
        var nom_var = elt_param[0];
        var d;
        for (var i = 1; i < elt_param.length; i++) {
            nom_var += "_" + elt_param[i];
        }
        if (elt_type == "set_button") {
            d = donnees_button_elt_param(elt_param, "load");
        } else {
            d = donnees_elt_param(elt_param, "load");
        }
        if (d != undefined && document.getElementById(nom_var)) {  // Pour �viter les blocages
            if (elt_type == "input_color") {
                document.getElementById(nom_var).value = d;
            }
            if (elt_type == "input" || elt_type.substr(0, 25) == "input_fuel_in_tank_manual") {
                if (d != "auto" || nom_var != "track_orientation") {  // "auto" c'est pour le cas particulier de la track orientation
                    if (d != undefined) {
                        if (typeof d == "string") {
                            d = d.replace(/&apos;/g, "'");  // On r�tablit les apostrophes
                        }
                        document.getElementById(nom_var).value = d;
                    }
                    val_old[nom_var] = d;
                }
            } else if (elt_type == "info") {
                if (nom_var == "licence_str") {
                    d = d.replace(/\n/g, "<br>");  // on remplace tous les \n par <br>
                    if (d == "") d = "CHECKING LICENSE ...<br><br>ENTER AN IRACING SESSION AND GET IN THE CAR IF YOUR LICENSE WAS NOT ACTIVATED YET...<br>(Reload this page if you still see this message after getting on the track)";
                } else if (nom_var == "trackname" || nom_var == "carname") {
                    d = donnees[nom_var];
                }
                //console.log(nom_var, d)
                //set_innerHTML_byName(nom_var, d);
                document.getElementById(nom_var).innerHTML = d;
            } else if (elt_type == "switch" && document.getElementById(nom_var) != undefined) {  // le !undefined c'est pour les ccc_bg_color, ccc_font_color, ... qui ne sont pas d�finis pour tous
                if (d) {
                    document.getElementById(nom_var).checked = true;
                } else {
                    document.getElementById(nom_var).checked = false;
                }
                set_switch(nom_var);  // on met en forme le switch en fonction de l'activation ou non
            } else if (elt_type == "checkbox") {
                if (d) {
                    document.getElementById(nom_var).checked = true;
                } else {
                    document.getElementById(nom_var).checked = false;
                }
            } else if (elt_type == "set_button") {
                /*if (d[0] != -1) {
                 document.getElementById(nom_var).checked = true;
                 } else {
                 document.getElementById(nom_var).checked = false;
                 }*/
                document.getElementById(nom_var + "_joy").innerHTML = d[0];
                document.getElementById(nom_var + "_button").innerHTML = JSON.stringify(d[1]);
            } else if (elt_type == "select") {
                if (nom_var.substr(-14, 14) == "class_selected") {  // REM : si la valeur est -1 c'est le filtre "my class" ...
                    if (d == -1) {
                        d = 1;
                    } else if (d >= 1) {
                        d = d + 1;
                    }
                }
                document.getElementById(nom_var).value = d;
            }
        }
    } else {
        if (elt_type == "turns") {
            var nb_turns = donnees.param["track"]["nb_turns"];
            for (var i=0; i < nb_turns; i++) {
                var val = donnees_elt_param(["track", "turn_num", i], "load");
                if (val != undefined) document.getElementById("track_turn_num_" + i).value = val;
                val = donnees_elt_param(["track", "turn_ldp", i], "load");
                if (val != undefined) document.getElementById("track_turn_ldp_" + i).value = val;
                val = donnees_elt_param(["track", "turn_side", i], "load");
                if (val != undefined) document.getElementById("track_turn_side_" + i).value = val;
                val = donnees_elt_param(["track", "turn_info", i], "load");
                if (val != undefined) document.getElementById("track_turn_info_" + i).value = val;
            }
        } else if (elt_type == "gears") {
            var nb_gears = 8;
            for (var i=1; i < nb_gears + 1; i++) {
                var val = donnees_elt_param(["car", "rpm" + i], "load");
                if (val != undefined) document.getElementById("car_rpm" + i).value = val;
            }
        } else if (elt_type == "info_car") {
            document.getElementById(elt["group_id"] + "_info_car").innerHTML = donnees.carname;
        } else if (elt_type == "info_track") {
            document.getElementById(elt["group_id"] + "_info_track").innerHTML = donnees.trackname;
        } else if (elt_type == "timing_columns") {
            //title_id = donnees.param["timing"].tab_titres[i];
            //console.log(i, "Title ID :", title_id, ", Name :", donnees.param["timing"].set_title[title_id], ", Width :", donnees.param["timing"].w[title_id])

            for (var page in list_timing_pages) {
                load_timing_columns(page);
            }
        }
    }
}


// C'est ici qu'on active/d�sactive le checkbox cach� du switch
function change_switch(nom_var, page) {
    //if (document.getElementById(nom_var).disabled == false) {  // si on veut emp�cher la modification du r�glage quand c'est gris�
    if (document.getElementById(nom_var)) {
        //console.log(nom_var)
        if (document.getElementById(nom_var).checked) {
            document.getElementById(nom_var).checked = false;
        } else {
            document.getElementById(nom_var).checked = true;

            // On met � OFF toutes les autres options 'highlight' des options suppl�mentaires du dashboard avanc� car un seul ne peut �tre activ�
            if (page in {"dashboard": 1, "dashboard2": 1} && nom_var.includes("highlight")) {
                var ds = donnees.param[page]["advanced"]["display_selected"];
                //console.log(page, nom_var, ds);
                for (var elt_i in menu_elements_dashboard_advanced) {
                    if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "name") {
                        //
                    } else if (menu_elements_dashboard_advanced[elt_i]["param"][0] in displays_list) {  // REM displays_list contient aussi name et select_display mais c'est pas grave car ils sont trait�s avant le else if
                        //
                    } else {
                        var tmp_name = page + "_advanced_highlight_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + ds;
                        if (tmp_name != nom_var) {
                            if (document.getElementById(tmp_name)) {
                                document.getElementById(tmp_name).checked = false;
                                set_switch(tmp_name);
                            }
                            // si l'�l�ment n'existe pas il faut quand m�me d�sactiver la valeur
                            donnees.param[page]["advanced"]["highlight_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + ds] = 0;
                        }
                    }
                }
            }

        }
        set_switch(nom_var);
    }
    //}
}


// On met en forme le switch en fonction des param�tres
function set_switch(nom_var) {

    //console.log(nom_var)

    if (document.getElementById(nom_var)) {
        if (document.getElementById(nom_var).checked) {
            document.getElementById(nom_var + "_switch_rond").style.marginLeft = "2em";
            document.getElementById(nom_var + "_switch").innerHTML = "<div style='user-select: none; display: inline-block; font-weight: bold; font-size: 0.75em; line-height: 1.6em; vertical-align: top; padding-left: 0.7em;'>ON</div>";
            document.getElementById(nom_var + "_switch").style.textAlign = "left";
        } else {
            document.getElementById(nom_var + "_switch_rond").style.marginLeft = "0em";
            document.getElementById(nom_var + "_switch").innerHTML = "<div style='user-select: none; display: inline-block; font-weight: bold; font-size: 0.75em; line-height: 1.6em; vertical-align: top; padding-right: 0.45em;'>OFF</div>";
            document.getElementById(nom_var + "_switch").style.textAlign = "right";
        }

        // Grisage si disabled
        if (document.getElementById(nom_var).disabled) {
            if (document.getElementById(nom_var).checked) {
                document.getElementById(nom_var + "_text").style.color = "#888888";
                document.getElementById(nom_var + "_switch_rond").style.backgroundColor = "#bbbbbb";
                document.getElementById(nom_var + "_switch").style.backgroundColor = "#888888";
                document.getElementById(nom_var + "_switch").style.color = "#bbbbbb";
            } else {
                //document.getElementById(nom_var + "_text").style.color = "white";
                document.getElementById(nom_var + "_text").style.color = "#888888";
                document.getElementById(nom_var + "_switch_rond").style.backgroundColor = "#777777";
                document.getElementById(nom_var + "_switch").style.backgroundColor = "#333333";
                document.getElementById(nom_var + "_switch").style.color = "#777777";
            }
        } else {
            document.getElementById(nom_var + "_text").style.color = "white";
            if (document.getElementById(nom_var).checked) {
                document.getElementById(nom_var + "_switch_rond").style.backgroundColor = "white";
                document.getElementById(nom_var + "_switch").style.backgroundColor = "#00aac4";
                document.getElementById(nom_var + "_switch").style.color = "white";
            } else {
                document.getElementById(nom_var + "_switch_rond").style.backgroundColor = "white";
                document.getElementById(nom_var + "_switch").style.backgroundColor = "#2a2a2a";
                document.getElementById(nom_var + "_switch").style.color = "white";
            }
        }
    }

}


// On color en jaune le text quand on passe la souris sur le switch
function switch_hover(nom_var) {
    document.getElementById(nom_var + "_text").style.color = "yellow";
    document.getElementById(nom_var + "_switch").style.color = "yellow";
    document.getElementById(nom_var + "_switch_rond").style.backgroundColor = "yellow";
}


function load_timing_columns(page) {
    for (var i in donnees.param[page].tab_titres_all_default) {
        title_id = donnees.param[page].tab_titres_all_default[i];
        //if (order_nums_[page + "_columns"][title_id] != null) {
        if (order_nums_[page + "_columns"][title_id] == null || order_nums_[page + "_columns"][title_id] >= 999999) {
            document.getElementById(page + "_display_" + title_id).checked = false;
        } else {
            document.getElementById(page + "_display_" + title_id).checked = true;
        }
        //document.getElementById(page + "_order_num_" + title_id).value = order_nums_[page + "_columns"][title_id];
        document.getElementById(page + "_set_title_" + title_id).value = donnees_elt_param([page, "set_title", title_id], "load");
        document.getElementById(page + "_w_" + title_id).value = donnees_elt_param([page, "w", title_id], "load");

    }

    // On s'occupe des options pour les colonnes du timing
    // # D'abord les options sous forme de liste d�roulante
    for (var o = 0; o < menu_elements_timing_columns_option.length; o++) {
        var param = menu_elements_timing_columns_option[o].param;
        document.getElementById(page + "_" + param[0]).value = donnees_elt_param([page, param[0]], "load");
    }

    // # Ensuite les options pour les avg1, avg2, avg3
    for (var i = 1; i <= 3; i++) {
        document.getElementById(page + "_avg" + i + "_nblaps").value = donnees_elt_param([page, "avg" + i + "_nblaps"], "load");
        var c = donnees_elt_param([page, "avg" + i + "_best"], "load");
        if (c == 1) {
            document.getElementById(page + "_avg" + i + "_best").checked = true;
        } else {
            document.getElementById(page + "_avg" + i + "_best").checked = false;
        }
    }
}


// charge les sp�cificit�s de toutes les pages (cases gris�es, texte diff�rent en fonction des valeurs)
function load_spec() {

    // Gestion de l'activation ou non du bouton create files to export on the web server
    if (donnees.param["broadcast"]["broadcast_mode"] <= 1 && donnees.param["broadcast"]["log_broadcast"] == 0) {
        document.getElementById("create_broadcast_files").className = "export_broadcast_button_off";
        document.getElementById("create_broadcast_files").disabled = true;
    } else {
        document.getElementById("create_broadcast_files").className = "export_broadcast_button_on";
        document.getElementById("create_broadcast_files").disabled = false;
    }

    /*gestion_couleurs_inputs_selects(donnees.param["general"]["mydocuments_iRacing_telemetry_mode"], [1, 1], 1, "general_mydocuments_iRacing_telemetry");
    if (donnees.param["general"]["mydocuments_iRacing_telemetry_mode"] == 1) {
        document.getElementById("general_mydocuments_iRacing_telemetry_text2").style.color = "#00ff00";
        document.getElementById("general_mydocuments_iRacing_telemetry_text2").innerHTML = "<b>iRacing Telemetry folder VALID</b>";
    } else {
        document.getElementById("general_mydocuments_iRacing_telemetry_text2").style.color = "#ff0000";
        document.getElementById("general_mydocuments_iRacing_telemetry_text2").innerHTML = "<b>iRacing Telemetry folder INVALID ! Check it above</b>";
    }*/

    gestion_couleurs_inputs_selects(donnees.param["general"]["mydocuments_iRacing_paint_mode"], [1, 1], 1, "general_mydocuments_iRacing_paint");
    if (donnees.param["general"]["mydocuments_iRacing_paint_mode"] == 1) {
        document.getElementById("general_mydocuments_iRacing_paint_text2").style.color = "#00ff00";
        document.getElementById("general_mydocuments_iRacing_paint_text2").innerHTML = "<b>iRacing paint folder VALID</b>";
    } else {
        document.getElementById("general_mydocuments_iRacing_paint_text2").style.color = "#ff0000";
        document.getElementById("general_mydocuments_iRacing_paint_text2").innerHTML = "<b>iRacing paint folder INVALID ! Check it above</b>";
    }

    if (donnees.param["general"]["mydocuments_mode"] == 0) {
        document.getElementById("general" + "_" + "mydocuments_manual").value = donnees.param["general"]["mydocuments_auto"];
        donnees.param["general"]["mydocuments_manual"] = donnees.param["general"]["mydocuments_auto"];
    }

    // On rend switchable automatiquement le r�glage refuel mode s�lectionn�
    for (var m = 0; m < 3; m++) {
        if (donnees.param["general"]["refuel_mode"] == m) {
            donnees.param["general"]["refuel_mode_" + m + "_switchable"] = 1;
            document.getElementById("general" + "_" + "refuel_mode_" + m + "_switchable").checked = true;
            document.getElementById("general" + "_" + "refuel_mode_" + m + "_switchable_bloc").style.color = "#888888";
            document.getElementById("general" + "_" + "refuel_mode_" + m + "_switchable").disabled = true;
        } else {
            document.getElementById("general" + "_" + "refuel_mode_" + m + "_switchable_bloc").style.color = "unset";
            document.getElementById("general" + "_" + "refuel_mode_" + m + "_switchable").disabled = false;
        }
    }

    // On rend switchable automatiquement le r�glage calculations mode s�lectionn�
    for (var m = 0; m < 4; m++) {
        if (donnees.param["general"]["calculations_mode"] == m) {
            donnees.param["general"]["calculations_mode_" + m + "_switchable"] = 1;
            document.getElementById("general" + "_" + "calculations_mode_" + m + "_switchable").checked = true;
            document.getElementById("general" + "_" + "calculations_mode_" + m + "_switchable_bloc").style.color = "#888888";
            document.getElementById("general" + "_" + "calculations_mode_" + m + "_switchable").disabled = true;
        } else {
            document.getElementById("general" + "_" + "calculations_mode_" + m + "_switchable_bloc").style.color = "unset";
            document.getElementById("general" + "_" + "calculations_mode_" + m + "_switchable").disabled = false;
        }
    }

    for (var page in list_timing_pages) {
        if (donnees.param[page]["responsive"] == 1) {
            document.getElementById(page + "_" + "ligne_h" + "_text").innerHTML = "<b>Relative line height</b>";
            document.getElementById(page + "_" + "sessioninfos_height" + "_text").innerHTML = "<b>Weather Infos Relative Height</b>";
        } else {
            document.getElementById(page + "_" + "ligne_h" + "_text").innerHTML = "<b>Absolute line height</b>";
            document.getElementById(page + "_" + "sessioninfos_height" + "_text").innerHTML = "<b>Weather Infos Absolute Height</b>";
        }
    }

    if (donnees.param["calculator"]["responsive"] == 1) {
        document.getElementById("calculator" + "_" + "ligne_h" + "_text").innerHTML = "<b>Relative line height</b>";
        document.getElementById("calculator" + "_" + "sessioninfos_height" + "_text").innerHTML = "<b>Weather Infos Relative Height</b>";
    } else {
        document.getElementById("calculator" + "_" + "ligne_h" + "_text").innerHTML = "<b>Absolute line height</b>";
        document.getElementById("calculator" + "_" + "sessioninfos_height" + "_text").innerHTML = "<b>Weather Infos Absolute Height</b>";
    }

    if (donnees.param["licence_col"] == "#00cc00") {
        document.getElementById("key_asterix").innerHTML = "";
    } else {
        document.getElementById("key_asterix").innerHTML = '* If you have a key, send an email to <a style="font-style: normal;" href="mailto:joel@joel-real-timing.com">joel@joel-real-timing.com';
    }
    //console.log(donnees.param["licence_col"])
    document.getElementById("licence_str").style.backgroundColor = donnees.param["licence_col"];

    // On cache les n� de bouton si le bouton n'est pas param�tr�
    for (var elt_i in menu_elements) {
        var elt_param = menu_elements[elt_i]["param"];
        var elt_type = menu_elements[elt_i]["elt_type"];
        if (elt_type == "set_button") {
            var nom_var = elt_param[0];
            for (var i = 1; i < elt_param.length; i++) {
                nom_var += "_" + elt_param[i];
            }
            if (document.getElementById(nom_var)) {
                if (document.getElementById(nom_var + "_joy").innerHTML == -1) {
                    document.getElementById(nom_var).style.display = "none";
                    document.getElementById(nom_var + "_del").style.setProperty('background-color', '#666666', 'important');  // le !important sert � �viter que �a passe en jaune quand on met la souris dessus
                    document.getElementById(nom_var + "_del").style.setProperty('color', '#444444', 'important');  // le !important sert � �viter que �a passe en jaune quand on met la souris dessus
                    document.getElementById(nom_var + "_del").disabled = true;
                } else {
                    document.getElementById(nom_var).style.display = "inline-block";
                    document.getElementById(nom_var + "_del").style.backgroundColor = "red";
                    document.getElementById(nom_var + "_del").style.color = "white";
                    document.getElementById(nom_var + "_del").disabled = false;
                }
            }
        }
    }
    // On cache les n� de bouton si le bouton n'est pas param�tr� pour le bouton select_display
    //for (var dashboard in {"dashboard": 1, "dashboard2": 1}) {
    for (var dashboard in list_dashboard_pages) {
        for (var x = 1; x <= donnees.param[dashboard]["nb_displays"]; x++) {
            for (var elt_i in menu_elements_dashboard_advanced) {
                if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "select_display") {
                    var nom_var = dashboard + "_advanced_select_display_" + x;
                    if (document.getElementById(nom_var)) {
                        if (document.getElementById(nom_var + "_joy").innerHTML == -1) {
                            document.getElementById(nom_var).style.display = "none";
                            document.getElementById(nom_var + "_del").style.setProperty('background-color', '#666666', 'important');  // le !important sert � �viter que �a passe en jaune quand on met la souris dessus
                            document.getElementById(nom_var + "_del").style.setProperty('color', '#444444', 'important');  // le !important sert � �viter que �a passe en jaune quand on met la souris dessus
                            document.getElementById(nom_var + "_del").disabled = true;
                        } else {
                            document.getElementById(nom_var).style.display = "inline-block";
                            document.getElementById(nom_var + "_del").style.backgroundColor = "red";
                            document.getElementById(nom_var + "_del").style.color = "white";
                            document.getElementById(nom_var + "_del").disabled = false;
                        }
                    }
                }
            }
        }
    }

    // Cas particulier de la valeur orientation qui doit �tre "auto" si le mode auto est activ�
    if (!isNaN(donnees.param["track"]["orientation"])) {
        orientation_old = donnees.param["track"]["orientation"];
    }
    if (donnees.param["track"]["orientation_auto"] == 1) {
        donnees.param["track"]["orientation"] = "auto";
    }

    // ###################################################################################################
    //  Gestion des couleurs des inputs et des selects en fonction des activations de certains param�tres
    // ###################################################################################################
    //

    gestion_couleurs_inputs_selects(donnees.param["general"]["fuel_sound_alert"], [1, 1], 0, "general_fuel_sound_alert_gainDB");
    gestion_couleurs_inputs_selects(donnees.param["general"]["play_enough_fuel_sound"], [1, 1], 0, "general_play_enough_fuel_sound_gainDB");
    gestion_couleurs_inputs_selects(donnees.param["general"]["spotter_bips"], [1, 1], 0, "general_spotter_bips_ahead_gainDB");
    gestion_couleurs_inputs_selects(donnees.param["general"]["spotter_bips"], [1, 1], 0, "general_spotter_bips_behind_gainDB");
    gestion_couleurs_inputs_selects(donnees.param["general"]["spotter_bips"], [1, 1], 0, "general_spotter_bips_contact_gainDB");
    gestion_couleurs_inputs_selects(donnees.param["general"]["fastcar_bip"], [1, 1], 0, "general_fastcar_bip_gainDB");
    gestion_couleurs_inputs_selects(donnees.param["general"]["fastcar_bip"], [0, 0], 1, "general_fastcar_dist");
    gestion_couleurs_inputs_selects(donnees.param["general"]["mgu_bips"], [1, 1], 0, "general_mgu_bips_gainDB");
    gestion_couleurs_inputs_selects(donnees.param["general"]["drs_zone_bips"], [1, 1], 0, "general_drs_zone_bips_gainDB");
    gestion_couleurs_inputs_selects(donnees.param["general"]["drs_bips"], [1, 1], 0, "general_drs_bips_off_in_practice");
    set_switch("general_drs_bips_off_in_practice");
    gestion_couleurs_inputs_selects(donnees.param["general"]["drs_bips"], [1, 1], 0, "general_drs_bips_gainDB");
    gestion_couleurs_inputs_selects(donnees.param["general"]["play_tireschange_sounds"], [1, 1], 0, "general_play_tireschange_sounds_gainDB");

    gestion_couleurs_inputs_selects(donnees.param["general"]["mydocuments_mode"], [0, 0], 1, "general_mydocuments_manual");
    gestion_couleurs_inputs_selects(donnees.param["general"]["tethering_mode"], [0, 0], 1, "general_tethering_IP");

    gestion_couleurs_inputs_selects(donnees.status, [1, 1], 0, "track_orientation_auto");
    set_switch("track_orientation_auto");
    if (donnees.param["track"]["orientation_auto"] || donnees.status != 1) {
        tmp_cond = 1;
    } else {
        tmp_cond = 0;
    }
    gestion_couleurs_inputs_selects(tmp_cond, [1, 1], 1, "track_orientation");

    gestion_couleurs_inputs_selects(donnees.param["broadcast"]["broadcast_mode"], [-999, 1], 1, "broadcast_broadcast_pause");
    gestion_couleurs_inputs_selects(donnees.param["broadcast"]["broadcast_mode"], [-999, 1], 1, "broadcast_post_adress");
    gestion_couleurs_inputs_selects(donnees.param["broadcast"]["broadcast_mode"], [-999, 1], 1, "broadcast_password");
    gestion_couleurs_inputs_selects(donnees.param["broadcast"]["log_broadcast"], [0, 0], 1, "broadcast_log_post_adress");
    gestion_couleurs_inputs_selects(donnees.param["broadcast"]["log_broadcast"], [0, 0], 1, "broadcast_log_password");
    gestion_couleurs_inputs_selects(donnees.param["general"]["refuel_mode_1_switchable"], [1, 1], 0, "general_fuelneed_man");
    gestion_couleurs_inputs_selects(donnees.param["general"]["refuel_mode_1_switchable"], [1, 1], 0, "general_fuelneed_man_disp");
    gestion_couleurs_inputs_selects(donnees.param["general"]["calculations_mode_3_switchable"], [1, 1], 0, "general_conso_Set");
    gestion_couleurs_inputs_selects(donnees.param["calculator"]["disp_sofbar"], [1, 1], 0, "calculator_sofbar_h");
    gestion_couleurs_inputs_selects(donnees.param["calculator"]["responsive"], [1, 1], 0, "calculator_reference_w");
    gestion_couleurs_inputs_selects(donnees.param["spotter"]["spotter_background_mode"], [0, 0], 1, "spotter_spotter_background_transparency_coef");
    gestion_couleurs_inputs_selects(donnees.param["general"]["allow_telemetry"], [1, 1], 0, "general_telemetry_rate");
    gestion_couleurs_inputs_selects(donnees.param["general"]["activate_vjoy"], [1, 1], 0, "general_vjoy_device_number");

    gestion_couleurs_inputs_selects(donnees.status, [1, 1], 0, "pit_refuelspeed");
    gestion_couleurs_inputs_selects(donnees.status, [1, 1], 0, "pit_pittimelost3");
    gestion_couleurs_inputs_selects(donnees.status, [1, 1], 0, "pit_fuel_engine_cut");
    gestion_couleurs_inputs_selects(donnees.status, [1, 1], 0, "pit_tires_and_fuel");
    set_switch("pit_tires_and_fuel");
    gestion_couleurs_inputs_selects(donnees.status, [1, 1], 0, "pit_pittimelost1");
    gestion_couleurs_inputs_selects(donnees.status, [1, 1], 0, "pit_conso_moy");

    gestion_couleurs_inputs_selects(donnees.status, [1, 1], 0, "car_car_length");
    gestion_couleurs_inputs_selects(donnees.status, [1, 1], 0, "car_rpm_leds_N_red");
    gestion_couleurs_inputs_selects(donnees.status, [1, 1], 0, "car_rpm_leds_led1_pct");

    for (var page in list_timing_pages) {
        if (donnees.param[page]["responsive"] == 0 || donnees.param[page]["reference_w_auto"] == 1) {
            tmp_param = 1;
        } else {
            tmp_param = 0;
        }
        gestion_couleurs_inputs_selects(tmp_param, [1, 1], 1, page + "_" + "reference_w");
        gestion_couleurs_inputs_selects(donnees.param[page]["responsive"], [1, 1], 0, page + "_" + "reference_w_auto");
        set_switch(page + "_" + "reference_w_auto");

        // on affiche le reference width calcul� pour le mode auto
        largeur_totale = 0;
        for (var i in donnees.param[page]["tab_titres"]) {
            largeur_totale += parseInt(donnees.param[page]["w"][donnees.param[page]["tab_titres"][i]]);
        }
        document.getElementById(page + "_" + "reference_w_auto_text").innerHTML = "Automatic Width Reference = " + largeur_totale;

        gestion_couleurs_inputs_selects(donnees.param[page]["banner_height"], [0, 0], 1, page + "_" + "banner_mode");
        gestion_couleurs_inputs_selects(donnees.param[page]["banner_height"], [0, 0], 1, page + "_" + "banner_background");
        gestion_couleurs_inputs_selects(donnees.param[page]["banner_height"], [0, 0], 1, page + "_" + "banner_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["banner_height"], [0, 0], 1, page + "_" + "banner_live_disp");
        set_switch(page + "_" + "banner_live_disp");
        gestion_couleurs_inputs_selects(donnees.param[page]["banner_mode"] || (donnees.param[page]["banner_height"] == 0), [0, 0], 0, page + "_" + "banner_logo");

        gestion_couleurs_inputs_selects(donnees.param[page]["disp_sofbar"], [1, 1], 0, page + "_" + "sofbar_h");
        //gestion_couleurs_inputs_selects(donnees.param[page]["autoscroll"], [1, 1], 0, page + "_" + "autoscroll_mode");  // REM : il faut toujours pouvoir changer ce mode dans le cas o� on utiliserait le bouton toggle_autoscroll
        gestion_couleurs_inputs_selects(donnees.param["broadcast"]["broadcast_mode"], [1, 1], 0, page + "_fps_broadcast");
        gestion_couleurs_inputs_selects(donnees.param[page]["pack_disp"], [0, 0], 1, page + "_" + "pack_gap");
        gestion_couleurs_inputs_selects(donnees.param[page]["pack_disp"], [0, 0], 1, page + "_" + "pack_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["pack_disp"], [0, 0], 1, page + "_" + "pack_transparency");

        gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class"], [1, 1], 0, page + "_" + "group_by_class_nb_drivers_max_me");
        gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class"], [1, 1], 0, page + "_" + "group_by_class_my_own_class_is_selected");
        set_switch(page + "_" + "group_by_class_my_own_class_is_selected");
        gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class"], [1, 1], 0, page + "_" + "group_by_class_nb_drivers_max_others");
        gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class"], [1, 1], 0, page + "_" + "group_by_class_nb_lines_max_total");

        gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class"], [1, 1], 0, page + "_" + "group_by_class_disp_header");
        set_switch(page + "_" + "group_by_class_disp_header");
        gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class"], [1, 1], 0, page + "_" + "group_by_class_header_color_mode");
        gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class"], [1, 1], 0, page + "_" + "group_by_class_header_text_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class"], [1, 1], 0, page + "_" + "group_by_class_header_bg_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class"], [1, 1], 0, page + "_" + "group_by_class_header_bg_transparency");
        if (donnees.param[page]["group_by_class"]) {  // pour �viter d'avoir des options non gris�es lorsque le group_by_class est d�sactiv�
            gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class_disp_header"], [1, 1], 0, page + "_" + "group_by_class_header_color_mode");
            gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class_disp_header"], [1, 1], 0, page + "_" + "group_by_class_header_text_color");
            gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class_disp_header"], [1, 1], 0, page + "_" + "group_by_class_header_bg_color");
            gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class_disp_header"], [1, 1], 0, page + "_" + "group_by_class_header_bg_transparency");
            if (donnees.param[page]["group_by_class_disp_header"]) {  // pour �viter d'avoir des options non gris�es lorsque le group_by_class_disp_header est d�sactiv�
                gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class_header_color_mode"], [3, 4], 0, page + "_" + "group_by_class_header_bg_color");
                if (donnees.param[page]["group_by_class_header_color_mode"] == 2 || donnees.param[page]["group_by_class_header_color_mode"] == 4) {
                    gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class_header_color_mode"], [0, 4], 0, page + "_" + "group_by_class_header_text_color");
                } else {
                    gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class_header_color_mode"], [0, 4], 1, page + "_" + "group_by_class_header_text_color");
                }
            }
        }

        gestion_couleurs_inputs_selects(donnees.param[page]["group_by_class"], [1, 1], 0, page + "_" + "group_by_class_margin_between_classes");

        gestion_couleurs_inputs_selects(donnees.param[page]["group_nb_leading_cars"], [-9999, 0], 1, page + "_" + "group_nb_leading_cars_line_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["group_nb_leading_cars"], [-9999, 0], 1, page + "_" + "group_nb_leading_cars_line_color_mode");
        gestion_couleurs_inputs_selects(donnees.param[page]["group_nb_leading_cars"], [-9999, 0], 1, page + "_" + "group_nb_leading_cars_line_color");
        if (donnees.param[page]["group_nb_leading_cars"] > 0) {  // pour �viter d'avoir des options non gris�es lorsque le group_nb_leading_cars est � 0
            gestion_couleurs_inputs_selects(donnees.param[page]["group_nb_leading_cars_line_color_mode"], [1, 1], 0, page + "_" + "group_nb_leading_cars_line_color");
        }

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_color_auto"], [1, 1], 1, page + "_" + "trackmap_car_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_font_color_auto"], [1, 1], 1, page + "_" + "trackmap_car_font_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_border_disp"], [1, 1], 0, page + "_" + "trackmap_car_border_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_border_disp"], [1, 1], 0, page + "_" + "trackmap_car_border_coef");

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_color_auto"], [1, 1], 1, page + "_" + "trackmap_car_me_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_font_color_auto"], [1, 1], 1, page + "_" + "trackmap_car_me_font_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_border_disp"], [1, 1], 0, page + "_" + "trackmap_car_me_border_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_border_disp"], [1, 1], 0, page + "_" + "trackmap_car_me_border_coef");

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_color_auto");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_font_color_auto");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_font_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_carnum_me_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_border_disp");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_border_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_border_coef");
        set_switch(page + "_" + "trackmap_car_me_color_auto");
        set_switch(page + "_" + "trackmap_car_me_font_color_auto");
        set_switch(page + "_" + "trackmap_car_me_border_disp");
        if (donnees.param[page]["trackmap_car_me_specify"]) {
            gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_color_auto"], [1, 1], 1, page + "_" + "trackmap_car_me_color");
            gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_font_color_auto"], [1, 1], 1, page + "_" + "trackmap_car_me_font_color");
            gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_border_disp"], [1, 1], 0, page + "_" + "trackmap_car_me_border_color");
            gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_border_disp"], [1, 1], 0, page + "_" + "trackmap_car_me_border_coef");
        }

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_disp_turns"], [1, 1], 0, page + "_" + "trackmap_turn_distance_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_disp_turns"], [1, 1], 0, page + "_" + "trackmap_turn_num_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_disp_turns"], [1, 1], 0, page + "_" + "trackmap_turn_num_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_disp_turns"], [1, 1], 0, page + "_" + "trackmap_turn_info_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_disp_turns"], [1, 1], 0, page + "_" + "trackmap_turn_info_coef");

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_start_finish_line_disp"], [1, 1], 0, page + "_" + "trackmap_start_finish_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_start_finish_line_disp"], [1, 1], 0, page + "_" + "trackmap_start_finish_line_thickness_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_start_finish_line_disp"], [1, 1], 0, page + "_" + "trackmap_start_finish_line_length_coef");

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_start_finish_arrow_disp"], [1, 1], 0, page + "_" + "trackmap_start_finish_arrow_thickness_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_start_finish_arrow_disp"], [1, 1], 0, page + "_" + "trackmap_start_finish_arrow_length_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_start_finish_arrow_disp"], [1, 1], 0, page + "_" + "trackmap_start_finish_arrow_distance_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_start_finish_arrow_disp"], [1, 1], 0, page + "_" + "trackmap_start_finish_arrow_color");

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_circular"], [1, 1], 0, page + "_" + "trackmap_circular_angle");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_circular"], [1, 1], 0, page + "_" + "trackmap_circular_reverse");
        set_switch(page + "_" + "trackmap_circular_reverse");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_circular"], [1, 1], 0, page + "_" + "trackmap_circular_centered_on_driver");
        set_switch(page + "_" + "trackmap_circular_centered_on_driver");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_outline_disp"], [1, 1], 0, page + "_" + "trackmap_outline_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_outline_disp"], [1, 1], 0, page + "_" + "trackmap_outline_color");

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_P1"], [1, 1], 0, page + "_" + "trackmap_car_P1_myclass_only");
        set_switch(page + "_" + "trackmap_car_P1_myclass_only");

        gestion_couleurs_inputs_selects(donnees.param[page]["show_name_selected_orange"], [1, 1], 0, page + "_" + "show_name_selected_color");

        set_switch("overlays_" + page);
    }
    for (var page in list_dashboard_pages) {
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["shiftlight_on"], [1, 1], 0, page + "_shiftlight_Xpct");
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["shiftlight_on"], [1, 1], 0, page + "_shiftlight_Ypct");
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["shiftlight_on"], [1, 1], 0, page + "_shiftlight_Wpct");
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["shiftlight_on"], [1, 1], 0, page + "_shiftlight_Hpct");
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["shiftlight_on"], [1, 1], 0, page + "_shiftlight_opacity");
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["shiftlight_on"], [1, 1], 0, page + "_shiftlight_mode");

        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["shiftlight_on"], [1, 1], 0, page + "_advanced_shiftlight_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["shiftlight_on"], [1, 1], 0, page + "_advanced_shiftlight_gear_rpm_speed_on");
        set_switch(page + "_advanced_shiftlight_gear_rpm_speed_on");
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["shiftlight_on"], [1, 1], 0, page + "_advanced_pitlimiter_light_on");
        set_switch(page + "_advanced_pitlimiter_light_on");
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["shiftlight_on"] && donnees.param[page]["advanced"]["pitlimiter_light_on"], [1, 1], 0, page + "_advanced_pitlimiter_light_inpit_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["shiftlight_on"] && donnees.param[page]["advanced"]["pitlimiter_light_on"], [1, 1], 0, page + "_advanced_pitlimiter_light_outpit_color");

        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["dashboard_light_on"], [1, 1], 0, page + "_dashboard_light_Xpct");
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["dashboard_light_on"], [1, 1], 0, page + "_dashboard_light_Ypct");
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["dashboard_light_on"], [1, 1], 0, page + "_dashboard_light_Wpct");
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["dashboard_light_on"], [1, 1], 0, page + "_dashboard_light_Hpct");

        var liste_dashboard_light_type = {
            "yellowflag_light": 1,
            "car_stopped_ontrack_light": 1,
            "greenflag_light": 1,
            "blueflag_light": 1,
            "whiteflag_light": 1,
            "qualy_not_valid_light": 1,
            "oil_temp_alert_light": 1,
            "water_temp_alert_light": 1,
            "fuel_alert_light": 1,
            "abs_active_light": 1,
            "math_channel_light": 1,
        }
        for (var t in liste_dashboard_light_type) {
            gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["dashboard_light_on"], [1, 1], 0, page + "_advanced_" + t + "_activated");
            set_switch(page + "_advanced_" + t + "_activated");
            gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["dashboard_light_on"] && donnees.param[page]["advanced"][t + "_activated"], [1, 1], 0, page + "_advanced_" + t + "_color");
            gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["dashboard_light_on"] && donnees.param[page]["advanced"][t + "_activated"], [1, 1], 0, page + "_advanced_" + t + "_priority");
        }
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["dashboard_light_on"] && donnees.param[page]["advanced"]["math_channel_light_activated"], [1, 1], 0, page + "_advanced_math_channel_light_formula");
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["dashboard_light_on"], [1, 1], 0, page + "_advanced_switch_off_flags_auto");
        set_switch(page + "_advanced_switch_off_flags_auto");
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["dashboard_light_on"] && donnees.param[page]["advanced"]["switch_off_flags_auto"], [1, 1], 0, page + "_advanced_switch_off_flags_auto_delay");
        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["dashboard_light_on"], [1, 1], 0, page + "_dashboard_light_opacity");

        gestion_couleurs_inputs_selects(donnees.param["broadcast"]["broadcast_mode"], [1, 1], 0, page + "_fps_broadcast");
        set_switch("overlays_" + page);

        // On s'occupse des options avanc�es suppl�mentaires
        for (var x = 1; x <= donnees.param[page]["nb_displays"]; x++) {
            for (var elt_i in menu_elements_dashboard_advanced) {
                if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "name") {
                    //
                } else if (menu_elements_dashboard_advanced[elt_i]["param"][0] in displays_list) {  // REM displays_list contient aussi name et select_display mais c'est pas grave car ils sont trait�s avant le else if
                    //
                } else {

                    gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["ccc_box_border_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], [1, 1], 1, page + "_advanced_" + "box_border_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);

                    gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["perso_bg_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x] && !donnees.param[page]["advanced"]["ccc_bg_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], [1, 1], 0, page + "_advanced_" + "bg_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);
                    gestion_couleurs_inputs_selects(!donnees.param[page]["advanced"]["perso_bg_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], [1, 1], 1, page + "_advanced_" + "ccc_bg_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);
                    set_switch(page + "_advanced_" + "ccc_bg_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);

                    gestion_couleurs_inputs_selects(!donnees.param[page]["advanced"]["perso_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], [1, 1], 1, page + "_advanced_" + "adapt_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);
                    set_switch(page + "_advanced_" + "adapt_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);
                    gestion_couleurs_inputs_selects(!donnees.param[page]["advanced"]["perso_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x] || donnees.param[page]["advanced"]["adapt_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], [1, 1], 1, page + "_advanced_" + "ccc_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);
                    set_switch(page + "_advanced_" + "ccc_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);
                    gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["perso_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x] && !donnees.param[page]["advanced"]["adapt_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x] && !donnees.param[page]["advanced"]["ccc_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], [1, 1], 0, page + "_advanced_" + "font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);

                    gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["perso_font_family" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], [1, 1], 0, page + "_advanced_" + "font_family" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);
                    gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["perso_font_weight" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], [1, 1], 0, page + "_advanced_" + "font_weight" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);
                    gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["perso_font_style" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], [1, 1], 0, page + "_advanced_" + "font_style" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);

                    // Liste des param�tres du header
                    // REM : mettre la valeur 1 si c'est un switch
                    var tmp_list = {
                        "header_width": 0,
                        "header_font_size": 0,
                        "header_text": 0,
                        "header_text_orientation": 0,
                        "header_position": 0,
                        "header_is_foreground": 1,
                        "header_x_offset": 0,
                        "header_y_offset": 0,
                        "ccc_header_bg_color": 1,
                        "header_bg_color": 0,
                        "header_bg_opacity": 0,
                        "adapt_header_font_color": 1,
                        "ccc_header_font_color": 1,
                        "header_font_color": 0,
                        "header_font_family": 0,
                        "header_font_weight": 0,
                        "header_font_style": 0,
                        "header_border_left_width": 0,
                        "header_border_top_width": 0,
                        "header_border_right_width": 0,
                        "header_border_bottom_width": 0,
                        "ccc_header_border_color": 1,
                        "header_border_color": 0,
                        "header_border_opacity": 0,
                        "header_border_tl_radius": 0,
                        "header_border_tr_radius": 0,
                        "header_border_bl_radius": 0,
                        "header_border_br_radius": 0,
                    }
                    for (var name in tmp_list) {
                        gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["header_disp" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], [1, 1], 0, page + "_advanced_" + name + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);
                        if (tmp_list[name] == 1) {
                            set_switch(page + "_advanced_" + name + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);
                        }
                    }
                    gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["header_disp" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x] && donnees.param[page]["advanced"]["header_is_foreground" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], [1, 1], 0, page + "_advanced_" + "header_x_offset" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);
                    gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["header_disp" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x] && donnees.param[page]["advanced"]["header_is_foreground" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], [1, 1], 0, page + "_advanced_" + "header_y_offset" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);

                    gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["header_disp" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x] && !donnees.param[page]["advanced"]["ccc_header_bg_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], [1, 1], 0, page + "_advanced_" + "header_bg_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);

                    gestion_couleurs_inputs_selects(!donnees.param[page]["advanced"]["header_disp" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x] || donnees.param[page]["advanced"]["adapt_header_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], [1, 1], 1, page + "_advanced_" + "ccc_header_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);
                    set_switch(page + "_advanced_" + "ccc_header_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);
                    gestion_couleurs_inputs_selects(donnees.param[page]["advanced"]["header_disp" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x] && !donnees.param[page]["advanced"]["adapt_header_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x] && !donnees.param[page]["advanced"]["ccc_header_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], [1, 1], 0, page + "_advanced_" + "header_font_color" + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x);
                }

            }
        }

    }
    for (var page in list_trackmap_pages) {
        gestion_couleurs_inputs_selects(donnees.param["broadcast"]["broadcast_mode"], [1, 1], 0, page + "_fps_broadcast");

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_color_auto"], [1, 1], 1, page + "_" + "trackmap_car_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_font_color_auto"], [1, 1], 1, page + "_" + "trackmap_car_font_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_border_disp"], [1, 1], 0, page + "_" + "trackmap_car_border_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_border_disp"], [1, 1], 0, page + "_" + "trackmap_car_border_coef");

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_color_auto");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_font_color_auto");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_font_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_carnum_me_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_border_disp");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_border_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_specify"], [1, 1], 0, page + "_" + "trackmap_car_me_border_coef");
        set_switch(page + "_" + "trackmap_car_me_color_auto");
        set_switch(page + "_" + "trackmap_car_me_font_color_auto");
        set_switch(page + "_" + "trackmap_car_me_border_disp");
        if (donnees.param[page]["trackmap_car_me_specify"]) {
            gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_color_auto"], [1, 1], 1, page + "_" + "trackmap_car_me_color");
            gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_font_color_auto"], [1, 1], 1, page + "_" + "trackmap_car_me_font_color");
            gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_border_disp"], [1, 1], 0, page + "_" + "trackmap_car_me_border_color");
            gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_me_border_disp"], [1, 1], 0, page + "_" + "trackmap_car_me_border_coef");
        }

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_circular"], [1, 1], 0, page + "_" + "trackmap_circular_angle");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_circular"], [1, 1], 0, page + "_" + "trackmap_circular_reverse");
        set_switch(page + "_" + "trackmap_circular_reverse");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_circular"], [1, 1], 0, page + "_" + "trackmap_circular_centered_on_driver");
        set_switch(page + "_" + "trackmap_circular_centered_on_driver");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_outline_disp"], [1, 1], 0, page + "_" + "trackmap_outline_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_outline_disp"], [1, 1], 0, page + "_" + "trackmap_outline_color");

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_disp_turns"], [1, 1], 0, page + "_" + "trackmap_turn_distance_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_disp_turns"], [1, 1], 0, page + "_" + "trackmap_turn_num_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_disp_turns"], [1, 1], 0, page + "_" + "trackmap_turn_num_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_disp_turns"], [1, 1], 0, page + "_" + "trackmap_turn_info_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_disp_turns"], [1, 1], 0, page + "_" + "trackmap_turn_info_coef");

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_start_finish_line_disp"], [1, 1], 0, page + "_" + "trackmap_start_finish_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_start_finish_line_disp"], [1, 1], 0, page + "_" + "trackmap_start_finish_line_thickness_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_start_finish_line_disp"], [1, 1], 0, page + "_" + "trackmap_start_finish_line_length_coef");

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_start_finish_arrow_disp"], [1, 1], 0, page + "_" + "trackmap_start_finish_arrow_thickness_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_start_finish_arrow_disp"], [1, 1], 0, page + "_" + "trackmap_start_finish_arrow_length_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_start_finish_arrow_disp"], [1, 1], 0, page + "_" + "trackmap_start_finish_arrow_distance_coef");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_start_finish_arrow_disp"], [1, 1], 0, page + "_" + "trackmap_start_finish_arrow_color");

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_P1"], [1, 1], 0, page + "_" + "trackmap_car_P1_myclass_only");
        set_switch(page + "_" + "trackmap_car_P1_myclass_only");

        set_switch("overlays_" + page);
    }
    for (var page in list_trackmap_3d_pages) {
        gestion_couleurs_inputs_selects(donnees.param["broadcast"]["broadcast_mode"], [1, 1], 0, page + "_fps_broadcast");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_color_auto"], [1, 1], 1, page + "_" + "trackmap_car_color");
        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_font_color_auto"], [1, 1], 1, page + "_" + "trackmap_car_font_color");

        gestion_couleurs_inputs_selects(donnees.param[page]["trackmap_car_P1"], [1, 1], 0, page + "_" + "trackmap_car_P1_myclass_only");
        set_switch(page + "_" + "trackmap_car_P1_myclass_only");

        set_switch("overlays_" + page);
    }
    gestion_couleurs_inputs_selects(donnees.param["broadcast"]["broadcast_mode"], [1, 1], 0, "calculator_fps_broadcast");
    gestion_couleurs_inputs_selects(donnees.param["broadcast"]["broadcast_mode"], [1, 1], 0, "compteur_fps_broadcast");
    set_switch("overlays_calculator");
    set_switch("overlays_compteur");
    set_switch("overlays_launcher");
    set_switch("overlays_spotter");
    set_switch("overlays_telemetry_inputs");

    for (var m = 0; m < 3; m++) {
        set_switch("general" + "_" + "refuel_mode_" + m + "_switchable");
    }
    for (var m = 0; m < 4; m++) {
        set_switch("general" + "_" + "calculations_mode_" + m + "_switchable");
    }

    gestion_couleurs_inputs_selects(donnees.param["general"]["pitbox_distance_to_speech"], [1, 1], 0, "general_pitbox_distance_to_speech_decompte");
    set_switch("general_pitbox_distance_to_speech_decompte");
    gestion_couleurs_inputs_selects(donnees.param["general"]["pitbox_distance_to_speech"], [1, 1], 0, "general_pitbox_distance_to_speech_start");
    gestion_couleurs_inputs_selects(donnees.param["general"]["pitbox_distance_to_speech"], [1, 1], 0, "general_pitbox_distance_to_speech_interval");

    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_throttle_graph"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_throttle_color");
    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_throttle_graph"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_throttle_opacity");
    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_brake_graph"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_brake_color");
    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_brake_graph"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_brake_opacity");
    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_clutch_graph"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_clutch_color");
    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_clutch_graph"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_clutch_opacity");
    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_wheel_graph"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_wheel_color");
    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_wheel"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_wheel_color1");
    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_wheel"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_wheel_color2");

    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_pedals"] || donnees.param["telemetry_inputs"]["inputs_display_clutch_pedal"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_display_pct");
    set_switch("telemetry_inputs" + "_" + "inputs_display_pct");
    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_pedals"] && donnees.param["telemetry_inputs"]["inputs_display_pct"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_brake_pct_color");
    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_pedals"] && donnees.param["telemetry_inputs"]["inputs_display_pct"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_throttle_pct_color");
    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_clutch_pedal"] && donnees.param["telemetry_inputs"]["inputs_display_pct"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_clutch_pct_color");
    gestion_couleurs_inputs_selects((donnees.param["telemetry_inputs"]["inputs_display_pedals"] || donnees.param["telemetry_inputs"]["inputs_display_clutch_pedal"]) && donnees.param["telemetry_inputs"]["inputs_display_pct"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_text_orientation_upright");
    set_switch("telemetry_inputs" + "_" + "inputs_text_orientation_upright");

    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_gear_speed"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_font_family");
    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_gear_speed"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_speed_color");
    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_display_gear_speed"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_gear_color");
    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_dash_lines"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_dash_lines_thickness_coef");
    gestion_couleurs_inputs_selects(donnees.param["telemetry_inputs"]["inputs_dash_lines"], [1, 1], 0, "telemetry_inputs" + "_" + "inputs_dash_lines_color");

    for (var numc = 1; numc <= 5; numc++) {
        gestion_couleurs_inputs_selects(donnees.param["general"]["auto_bg_color_class" + numc], [0, 0], 0, "general" + "_" + "bg_color_class" + numc);
    }

    hide_overlays_settings_unused();

    // REM : faudra aussi g�rer les select

}


// On cache les options des overlays s'il ne sont pas activ�s
function hide_overlays_settings_unused() {
    for (var page in list_overlays_pages) {
        if (page in donnees.param["overlays"] && donnees.param["overlays"][page] == 1) {
            for (var setting in list_overlays_settings) {
                //document.getElementById(page + "_" + setting + "_bloc").style.opacity = 1;
                document.getElementById(page + "_" + setting + "_bloc").style.display = "block";
            }
        } else {
            for (var setting in list_overlays_settings) {
                //document.getElementById(page + "_" + setting + "_bloc").style.opacity = 0.25;
                document.getElementById(page + "_" + setting + "_bloc").style.display = "none";
            }
        }
    }
}


// Gestion des couleurs des inputs et des selects en fonction des activations de certains param�tres
// 'param' est l'�l�ment faisant modifier l'�tat de l'�l�ment 'nom'
// interval est un tableau avec la valeur min et max pour lesquels on d�sactive l'�l�ment
// equal permet de savoir s'il faut tester l'appartenance ou la non appartenance � l'interval
function gestion_couleurs_inputs_selects(param, interval, equal, nom) {
    if (document.getElementById(nom)) {
        if (equal == 1) {
            if (param >= interval[0] && param <= interval[1]) {
                document.getElementById(nom).style.color = "#888888";
                document.getElementById(nom + "_text").style.color = "#888888";
                if (document.getElementById(nom + "_text2") != null) {
                    document.getElementById(nom + "_text2").style.color = "#666666";
                }
                document.getElementById(nom).disabled = true;
            } else {
                document.getElementById(nom).style.color = "#00ddff";
                document.getElementById(nom + "_text").style.color = "white";
                if (document.getElementById(nom + "_text2") != null) {
                    document.getElementById(nom + "_text2").style.color = "#aaaaaa";
                }
                document.getElementById(nom).disabled = false;
            }
        } else {
            if (param < interval[0] || param > interval[1]) {
                document.getElementById(nom).style.color = "#888888";
                document.getElementById(nom + "_text").style.color = "#888888";
                if (document.getElementById(nom + "_text2") != null) {
                    document.getElementById(nom + "_text2").style.color = "#666666";
                }
                document.getElementById(nom).disabled = true;
            } else {
                document.getElementById(nom).style.color = "#00ddff";
                document.getElementById(nom + "_text").style.color = "white";
                if (document.getElementById(nom + "_text2") != null) {
                    document.getElementById(nom + "_text2").style.color = "#aaaaaa";
                }
                document.getElementById(nom).disabled = false;
            }
        }
    }
}



// On v�rifie si c'est bien une adresse IP
function checkIP(IP) {
    var elements = IP.split(".");
    if (elements.length!=4) return false;
    for (var i=0; i<4; i++) {
        if (elements[i]<0 || elements[i]>255) {
            return false;
        }
        if (i==0 && elements[i]==0) {
            return false;
        }
        return true;
    }
}


// On enregistre les valeurs modifi�e dans le tableau des param�tres donnees.param
//function set_config_elt(elt_param, val_type="str", elt_type, update_timing_columns=0) {
function set_config_elt(elt_param, val_type, elt_type, update_timing_columns, save_type) {

    // REM : on retournera un tableau permettant d'indiquer le param�tres enregistr� ainsi que la valeur
    // Il peut y en avoir plusieurs, donc on aura un tableau de tableaux
    var elt_params_val_tab = [];

    // Si on envoie "copy", on ne changera pas le donnees.param
    if (save_type == undefined) {
        save_type = "save";
    }

    if (elt_param != null && elt_type != "import_export") {
        //console.log(elt_param);
        var nom_var = elt_param[0];
        for (var i = 1; i < elt_param.length; i++) {
            nom_var += "_" + elt_param[i];
        }
        var d = null;
        if (document.getElementById(nom_var) && (elt_type == "checkbox" || elt_type == "switch")) {
            if (document.getElementById(nom_var).checked) {
                d = 1;
            } else {
                d = 0;
            }
        } else if (elt_type == "info") {
            // ...
        } else if (document.getElementById(nom_var) && elt_type == "input_color") {
            d = document.getElementById(nom_var).value;
        } else if (document.getElementById(nom_var) && (elt_type == "input" || elt_type.substr(0, 25) == "input_fuel_in_tank_manual")) {
            //console.log(nom_var)
            d = document.getElementById(nom_var).value;
            d = d.replace(/'/g, "&apos;");  // Pour �viter les bug avec le fichier de config
        } else if (document.getElementById(nom_var + "_button") && document.getElementById(nom_var + "_joy") && elt_type == "set_button") {
            // REM : le JSON.parse est important au cas o� les boutons seraient un tableau
            nom_var_button = document.getElementById(nom_var + "_button").innerHTML;
            if (nom_var_button != "undefined" && nom_var_button != "") {
                d = [document.getElementById(nom_var + "_joy").innerHTML, JSON.parse(nom_var_button)];
            } else {
                d = [document.getElementById(nom_var + "_joy").innerHTML, -1];
            }
            //console.log(nom_var_button)
        } else if (document.getElementById(nom_var) && elt_type == "select") {
            d = document.getElementById(nom_var).value;
            if (nom_var.substr(-14, 14) == "class_selected") {  // REM : "my class" doit avoir -1 comme valeur ...
                if (d == 1) d = -1;
                if (d > 1) d = d - 1;
            }
        }

        no_error = true;
        if (d == null) {
            no_error = false;
        } else {
            // On v�rifie que le type de valeur entr�e est bien celle attendue

            if (elt_type == "set_button") {
                if (!isNaN(parseInt(d[0]))) {  // si c'est une cha�ne qui peut �tre transform�e en valeur num�rique on le fait
                    var val_joy = parseInt(d[0]);
                } else {
                    var val_joy = d[0];  // joy peut �tre une cha�ne de caract�res
                }
                //if (isNaN(val_joy)) no_error = false;  // on signale une erreur on on ne change pas la valeur
                var val_button = d[1];
                //console.log("***", val_button)
                // REM : bouton peut �tre un tableau donc on ne signale pas d'erreur si ce n'est pas un nombre
                //if (isNaN(val_button)) no_error = false;  // on signale une erreur on on ne change pas la valeur
                val = [val_joy, val_button];
                //console.log(val)
            } else if (elt_type == "info") {
                // ...
            } else if (val_type == "int") {
                var val = parseInt(d);
                if (isNaN(val)) {
                    //console.log(nom_var, val, d);
                    no_error = false;  // on signale une erreur on on ne change pas la valeur
                }
            } else if (val_type == "float") {
                var val = parseFloat(d);
                if (isNaN(val)) {  // on signale une erreur on on ne change pas la valeur
                    //console.log(nom_var, "*" + d +"*");
                    if (nom_var in val_old) {
                        val = val_old[nom_var];
                    } else {
                        no_error = false;
                    }
                    if (nom_var == "track_orientation") {
                        val = orientation_old;
                        if (!isNaN(val)) {
                            document.getElementById("track_orientation").value = val;
                            no_error = true;
                        }
                    }
                } else {
                    val_old[nom_var] = val;  // On enregistre la derni�re valeur valide au cas o� on utilise le "." pendant la saisie
                }
            } else {  // de type str par d�faut
                var val = (d).toString();
                if (nom_var == "general_tethering_IP") {
                    if (!checkIP(val)) no_error = false;  // Si le format d'IP n'est pas bon, on ne l'enregistre pas
                }

                // On �limine les '//' inutiles. On garde juste celui apr�s le 'http://' ou le 'https://'
                if (nom_var.includes("iframe1_src") || nom_var.includes("iframe2_src") || nom_var.includes("iframe3_src") || nom_var.includes("iframe4_src")) {
                    val = val.replace("http://", "http<END>");
                    val = val.replace("https://", "https<END>");
                    val = val.replace(/\/\/+/g, '/');  // on remplace les multiple slashes par des simple
                    if (val.includes("https")) {
                        val = val.replace("https<END>", "https://");
                    } else {
                        val = val.replace("http<END>", "http://");
                    }
                }

                //if (nom_var.includes("sof")) {
                //    console.log(nom_var, val);
                //}

            }
        }


        if (no_error) {
            if (elt_type == "info") {
                // ...
            } else if (elt_type == "set_button") {
                var tmp_tab = donnees_button_elt_param(elt_param, save_type, val);
                if (tmp_tab) {
                    elt_params_val_tab.push(tmp_tab[0]);  // joy value
                    elt_params_val_tab.push(tmp_tab[1]);  // button value
                }
            } else {
                //console.log(nom_var, val)
                elt_params_val_tab.push(donnees_elt_param(elt_param, save_type, val));
            }
        } else {
            //console.log(nom_var)
            //console.log("Error", nom_var, document.getElementById(nom_var).value, "*" + val + "*", "*" + d + "*");
            // On recharge les valeurs enregistr�es
            // REM : finalement on ne recharge pas car sinon cela bloque certaines saisies. Ce qui compte c'est que la valeur ne soit pas envoy�e au serveur JRT
            //load_elt(null, elt_param, elt_type);
        }
    } else {
        if (elt_type == "turns") {
            var nb_turns = donnees.param["track"]["nb_turns"];
            var val = 0;
            var recharge = false;
            for (var i=0; i < nb_turns; i++) {
                val = document.getElementById("track_turn_num_" + i).value;
                elt_params_val_tab.push(donnees_elt_param(["track", "turn_num", i], save_type, val));
                val = parseFloat(document.getElementById("track_turn_ldp_" + i).value);
                if (!isNaN(val)) {
                    if (val < 0 || val >= 1) recharge = true;
                    val = Math.round((val.mod(1)) * 10000) / 10000;  // on ram�ne � une valeur comprise entre 0 et 1 et on arrondi � 4 chiffres apr�s la virgule
                    elt_params_val_tab.push(donnees_elt_param(["track", "turn_ldp", i], save_type, val));
                }
                val = document.getElementById("track_turn_side_" + i).value;
                elt_params_val_tab.push(donnees_elt_param(["track", "turn_side", i], save_type, val));
                val = document.getElementById("track_turn_info_" + i).value;
                elt_params_val_tab.push(donnees_elt_param(["track", "turn_info", i], save_type, val));
            }
            // On recharge les ldp au cas o� une valeur rentr�e ne serait pas comprise entre 0 et 1
            if (recharge) load_elt(null, null, "turns");
        } else if (elt_type == "gears") {
            var nb_gears = 8;
            var val = 0;
            for (var i=1; i < nb_gears + 1; i++) {
                val = parseInt(document.getElementById("car_rpm" + i).value);
                if (!isNaN(val)) {
                    elt_params_val_tab.push(donnees_elt_param(["car", "rpm" + i], save_type, val));
                }
            }
        } else if (elt_type.substr(0, 14) == "timing_columns") {
            var page = elt_type.substr(15);
            if (page != "") {
                for (var i in donnees.param[page].tab_titres_all_default) {
                    title_id = donnees.param[page].tab_titres_all_default[i];
                    val = document.getElementById(page + "_set_title_" + title_id).value;
                    elt_params_val_tab.push(donnees_elt_param([page, "set_title", title_id], save_type, val));
                    val = document.getElementById(page + "_w_" + title_id).value;
                    elt_params_val_tab.push(donnees_elt_param([page, "w", title_id], save_type, val));
                }

                // On s'occupe des options pour les colonnes du timing
                // # D'abord les options sous forme de liste d�roulante
                for (var o = 0; o < menu_elements_timing_columns_option.length; o++ ) {
                    var param = menu_elements_timing_columns_option[o].param;
                    val = document.getElementById(page + "_" + param[0]).value;
                    elt_params_val_tab.push(donnees_elt_param([page, param[0]], save_type, val));
                }

                // # Ensuite les options pour les avg1, avg2, avg3
                for (var i = 1; i <= 3; i++) {
                    var old_val = donnees_elt_param([page, "avg" + i + "_nblaps"], "load");
                    val = parseInt(document.getElementById(page + "_avg" + i + "_nblaps").value);
                    if (isNaN(val) || val < 1) val = old_val;  // On v�rifie qu'il s'agit bien d'un nombre entre sup�rieur ou �gal � 1
                    elt_params_val_tab.push(donnees_elt_param([page, "avg" + i + "_nblaps"], save_type, val));
                    if (document.getElementById(page + "_avg" + i + "_best").checked) {
                        val = 1;
                    } else {
                        val = 0;
                    }
                    elt_params_val_tab.push(donnees_elt_param([page, "avg" + i + "_best"], save_type, val));
                }

                // On recr�e le tab_titres en fonction des cases coch�es et de l'ordre
                // REM : on le fait que si on a coch� / d�coch� un titre ou si on a chang� l'ordre
                if (update_timing_columns) {
                    new_tab_titres = [];
                    new_tab_titres_all_default = [];
                    for (var i in donnees.param[page].tab_titres_all_default) {
                        title_id = donnees.param[page].tab_titres_all_default[i];
                        val = order_nums_[page + "_columns"][title_id];
                        if (val == "" || val == null) val = 999999;
                        if (document.getElementById(page + "_display_" + title_id).checked) {
                            //val = document.getElementById(page + "_order_num_" + title_id).value;
                            /*if (page == "timing") {
                                console.log(title_id, val);
                            }*/
                            new_tab_titres.push([title_id, val]);
                        }
                        new_tab_titres_all_default.push([title_id, val]);
                    }
                    new_tab_titres.sort(function (a, b) {
                        return a[1] - b[1];
                    });
                    new_tab_titres_all_default.sort(function (a, b) {
                        return a[1] - b[1];
                    });

                    val = {};
                    for (var i = 0; i < new_tab_titres.length; i++) {
                        titre_id = new_tab_titres[i][0];
                        val[i] = titre_id;
                    }
                    if (new_tab_titres.length > 0) {  // on �vite d'envoyer un tab_titres vide aux pages du timing, car �a provoque des erreurs javascript
                        elt_params_val_tab.push(donnees_elt_param([page, "tab_titres"], save_type, val));
                        //create_elements(0, 0);  // On doit recr�er les �l�ments pour r�ordonner le tab_titre mais sans scroller vers le haut
                        create_timing_columns(page);
                    }

                    val = {};
                    for (var i = 0; i < new_tab_titres_all_default.length; i++) {
                        titre_id = new_tab_titres_all_default[i][0];
                        val[i] = titre_id;
                    }
                    if (new_tab_titres_all_default.length > 0) {  // on �vite d'envoyer un tab_titres vide aux pages du timing, car �a provoque des erreurs javascript
                        elt_params_val_tab.push(donnees_elt_param([page, "tab_titres_all_default"], save_type, val));
                        //create_elements(0, 0);  // On doit recr�er les �l�ments pour r�ordonner le tab_titre mais sans scroller vers le haut
                        create_timing_columns(page);
                    }

                    load_timing_columns(page);  // Pour recocher les checkboxes
                }
            }
        }
    }

    //console.log(elt_params_val_tab)
    return elt_params_val_tab;
}


// On applique les changements et on les envoie au serveur JRT
function set_config_page(page, update_timing_columns, update_displays_list) {

    page_active = page;

    // Param�tres automatiques sp�cifi�s dans menu_elements dont param est diff�rent de null
    for (var elt_i in menu_elements) {
        set_config_elt(menu_elements[elt_i]["param"], menu_elements[elt_i]["val_type"], menu_elements[elt_i]["elt_type"], 0);
    }

    // Param�tres avanc�s du dashboard
    if (page in {"dashboard": 1, "dashboard2": 1}) {
        for (var dashboard in {"dashboard": 1, "dashboard2": 1}) {
            for (var x = 1; x <= donnees.param[dashboard]["nb_displays"]; x++) {
                for (var elt_i in menu_elements_dashboard_advanced) {
                    //if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "name" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "select_display" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "transparency_OBS" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "ref_w" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "ref_h" || menu_elements_dashboard_advanced[elt_i]["param"][0] == "image_de_fond") {
                    if (menu_elements_dashboard_advanced[elt_i]["param"][0] in displays_list) {
                        set_config_elt([dashboard, "advanced", menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], menu_elements_dashboard_advanced[elt_i]["val_type"], menu_elements_dashboard_advanced[elt_i]["elt_type"], 0);
                    } else {
                        for (var var_i in var_dashboard_advanced) {
                            var tmp_elt = {
                                "param": [var_dashboard_advanced[var_i]["nom"] + "_" + menu_elements_dashboard_advanced[elt_i]["param"][0]],
                                "texte": menu_elements_dashboard_advanced[elt_i]["texte"] + " " + var_dashboard_advanced[var_i]["texte"] + " : ",
                                "val_type": var_dashboard_advanced[var_i]["val_type"],
                                "elt_type": var_dashboard_advanced[var_i]["elt_type"]
                            };
                            if ("long" in var_dashboard_advanced[var_i]) {
                                tmp_elt["long"] = var_dashboard_advanced[var_i]["long"];
                            }
                            if ("step" in var_dashboard_advanced[var_i]) {
                                tmp_elt["step"] = var_dashboard_advanced[var_i]["step"];
                            }

                            //if (var_dashboard_advanced[var_i]["nom"] == "font_family" && menu_elements_dashboard_advanced[elt_i]["param"][0] == "sof") {
                            //    console.log(tmp_elt["param"][0] + "_" + x);
                            //}


                            set_config_elt([dashboard, "advanced", tmp_elt["param"][0] + "_" + x], tmp_elt["val_type"], tmp_elt["elt_type"], 0);
                        }
                    }
                }
            }

            // On met �ventuellemnt � jour la liste des displays
            if (update_displays_list == 1) {
                update_display_list(dashboard);
            }

        }
    }

    // Pour le bouton select_display du dashboard avanc�
    if (page == "") {
        for (var dashboard in {"dashboard": 1, "dashboard2": 1}) {
            for (var x = 1; x <= donnees.param[dashboard]["nb_displays"]; x++) {
                for (var elt_i in menu_elements_dashboard_advanced) {
                    if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "select_display") {
                        set_config_elt([dashboard, "advanced", menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + x], menu_elements_dashboard_advanced[elt_i]["val_type"], menu_elements_dashboard_advanced[elt_i]["elt_type"], 0);
                    }
                }
            }
        }
    }

    // Param�tres sp�cifiques du circuit s�lectionn�
    if (page =="track") {
        set_config_elt(null, null, "turns", 0);
    }

    // Param�tres sp�cifiques de la voiture s�lectionn�e
    if (page =="car") {
        set_config_elt(null, null, "gears", 0);
    }

    // Param�tres sp�ciaux du timing
    if (page =="timing" || page == "timing2" || page == "timing3" || page == "timing4" || page == "timing_broadcast") {
        // colonnes du timing
        set_config_elt(null, null, "timing_columns;" + page, update_timing_columns);  // REM : il faut transmettre la page � charger
    }

    //console.log(donnees.param);

    //toggle_save_button_ON();

    //console.log(page)
    //console.log("Parameters size:", JSON.stringify(donnees.param).length)

    ws.send("jrtconfig;apply;"+ page + ";1;" + JSON.stringify(donnees.param));  // le 1 c'est pour dire au serveur de recharger les couleurs de classes

    load_spec();  // charge les sp�cificit�s de toutes les pages (cases gris�es, texte diff�rent en fonction des valeurs)

    console.log("jrtconfig;apply");
    //console.log(page);
}


// On applique les changements et on les envoie au serveur JRT -> on envoie uniquement le param�tre chang�
function set_config_page_partial(page, elt_param_str, val_type, elt_type, update_timing_columns, update_displays_list) {

    input_en_cours = true;

    tstamp = Date.now();

    // Il faudra dire au serveur JRT de recharger les couleurs de class dans certains cas
    reload_carclasscolor_list = {
        '["general","is_detect_class"]': 1,
        '["general","auto_bg_color_class1"]': 1,
        '["general","auto_bg_color_class2"]': 1,
        '["general","auto_bg_color_class3"]': 1,
        '["general","auto_bg_color_class4"]': 1,
        '["general","auto_bg_color_class5"]': 1,
        '["general","bg_color_class1"]': 1,
        '["general","bg_color_class2"]': 1,
        '["general","bg_color_class3"]': 1,
        '["general","bg_color_class4"]': 1,
        '["general","bg_color_class5"]': 1,
    }
    if (elt_param_str in reload_carclasscolor_list) {
        reload_carclasscolor = 1;
    } else {
        reload_carclasscolor = 0;
    }

    // REM ! le elt_param a �t� stringifi� pour pouvoir �tre pass� en param�tre dans un string apr�s le onclick=, donc il faut le parser
    var elt_param = JSON.parse(elt_param_str);

    page_active = page;

    var tmp_tab = [];

    // Param�tres automatiques sp�cifi�s dans menu_elements dont param est diff�rent de null
    if (elt_type.substr(0, 25) == "input_fuel_in_tank_manual") {
        // Si on chang� l'une des valeurs input_fuel_in_tank_manual, il faut enregistrer aussi les autres

        // REM : comme set_config_elt renvoie un tableau il faut prendre chacun des �l�ments du tableau et les ajouter au tableau donnees_param_partial

        tmp_tab = set_config_elt(["pit", "fuel_in_tank_manual"], "float", "input_fuel_in_tank_manual", update_timing_columns);
        for (var i in tmp_tab) {
            donnees_param_partial.push(tmp_tab[i]);
        }
        tmp_tab = set_config_elt(["pit", "fuel_in_tank_manual_ga"], "float", "input_fuel_in_tank_manual_ga", update_timing_columns);
        for (var i in tmp_tab) {
            donnees_param_partial.push(tmp_tab[i]);
        }
        tmp_tab = set_config_elt(["pit", "fuel_in_tank_manual_kg"], "float", "input_fuel_in_tank_manual_kg", update_timing_columns);
        for (var i in tmp_tab) {
            donnees_param_partial.push(tmp_tab[i]);
        }
        tmp_tab = set_config_elt(["pit", "fuel_in_tank_manual_lb"], "float", "input_fuel_in_tank_manual_lb", update_timing_columns);
        for (var i in tmp_tab) {
            donnees_param_partial.push(tmp_tab[i]);
        }
    } else {
        tmp_tab = set_config_elt(elt_param, val_type, elt_type, update_timing_columns);
        for (var i in tmp_tab) {
            donnees_param_partial.push(tmp_tab[i]);
        }
    }

    // On met � jour toutes les options 'highlight' des options suppl�mentaires du dashboard avanc� car un seul ne peut �tre activ�
    if (page in {"dashboard": 1, "dashboard2": 1} && elt_param.length == 3 && elt_param[2].includes("highlight")) {
        var ds = donnees.param[page]["advanced"]["display_selected"];
        for (var elt_i in menu_elements_dashboard_advanced) {
            if (menu_elements_dashboard_advanced[elt_i]["param"][0] == "name") {
                //
            } else if (menu_elements_dashboard_advanced[elt_i]["param"][0] in displays_list) {  // REM displays_list contient aussi name et select_display mais c'est pas grave car ils sont trait�s avant le else if
                //
            } else {
                var elt_param2 = [page, "advanced", "highlight_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + ds]
                tmp_tab = set_config_elt(elt_param2, "int", "switch", update_timing_columns);

                // On ajoute les valeurs de highlight dont le more options n'est pas affich�
                var nom_var = page + "advanced" + "highlight_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + ds;
                var val = donnees.param[page]["advanced"]["highlight_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + ds];
                if ( !document.getElementById(nom_var) ) {
                    tmp_tab.push(donnees_elt_param(elt_param2, "save", val));
                }

                //console.log(page, "highlight_" + menu_elements_dashboard_advanced[elt_i]["param"][0] + "_" + ds)
                for (var i in tmp_tab) {
                    donnees_param_partial.push(tmp_tab[i]);
                }
            }
        }
    }

    if (update_displays_list == 1) {
        if (page in {"dashboard": 1, "dashboard2": 1}) {
            // On met �ventuellemnt � jour la liste des displays
            update_display_list(page);
        }
    }

    // Param�tres sp�ciaux du timing
    if (page =="timing" || page == "timing2" || page == "timing3" || page == "timing4" || page == "timing_broadcast") {
        // colonnes du timing
        tmp_tab = set_config_elt(null, null, "timing_columns;" + page, update_timing_columns);  // REM : il faut transmettre la page � charger
        for (var i in tmp_tab) {
            donnees_param_partial.push(tmp_tab[i]);
        }
    }


    // On reconstruit le nom du param�tre modifi� pour savoir si le prochain param�tre modifi� est le m�me
    var setting_changed = "";
    if (elt_param != null && elt_param.length > 0) {
        setting_changed = elt_param[0];
        for (var i = 1; i < elt_param.length; i++) {
            setting_changed += "_" + elt_param[i];
        }
    }

    var datas_to_send = "jrtconfig;apply_partial;" + page + ";" + reload_carclasscolor + ";" + JSON.stringify(donnees_param_partial);
    last_datas_to_send = datas_to_send;
    last_datas_to_send_tstamp = tstamp;

    if (Date.now() - last_setting_changed_tstamp < 250) {
        // On reporte l'envoie des donn�es si on est encore en train de faire des changements
        // L'envoie des donn�es se fera quand m�me mais seulement toutes les 350ms

        clearTimeout(report_load_spec);

        report_load_spec = setTimeout(function (tstamp) {
            input_en_cours = false;
            if (last_datas_to_send_tstamp >= tstamp) {
                ws.send(last_datas_to_send);
                load_spec();
            }
        }, 250, tstamp);  // charge les sp�cificit�s de toutes les pages (cases gris�es, texte diff�rent en fonction des valeurs)

    } else {  // on n'envoie pas les chgt si on en a d�j� fait un plus r�cent

        clearTimeout(report_load_spec);

        // On enregistre le dernier envoie de changement de setting effectu�
        last_setting_changed = setting_changed;
        last_setting_changed_tstamp = tstamp;

        ws.send(datas_to_send);
        donnees_param_partial = [];

        // j'ai mis le load_spec apr�s pour optimiser le temps de r�action
        // et j'ai ajout� un setTimeout pour ne pas ralentir le changement des valeurs rapides
        report_load_spec = setTimeout(function (tstamp) {
            input_en_cours = false;
            load_spec();
        }, 250, tstamp);  // charge les sp�cificit�s de toutes les pages (cases gris�es, texte diff�rent en fonction des valeurs)

        //console.log("jrtconfig;apply_partial", tstamp, donnees_param_partial);
        //console.log("jrtconfig;apply_partial", setting_changed);

    }
}


// Cr�ation des �l�ments

// REM : cette fonction n'est plus utilis�e
function add_key() {
    var nb_keys = Object.keys(donnees.param["general"]["licence_key"]).length;
    var val = parseInt(document.getElementById("input_key").value);
    no_error = true;
    if (isNaN(val)) no_error = false;  // on signale une erreur on on ne change pas la valeur
    if (no_error) {
        donnees.param["general"]["licence_key"][nb_keys] = val;
        //console.log(donnees.param["general"]["licence_key"]);
        create_elements(0, 1);  // on est oblig� de recr�er les �l�ments pour ajouter la cl�
        set_config_page("general", 0, 0);
    } else {
        console.log("You have to enter a number for the key !")
    }
}


// REM : cette fonction n'est plus utilis�e
function del_key() {
    var n = document.getElementById("licence_key_list").value;
    delete donnees.param["general"]["licence_key"][n];
    // On renomme les cl�s pour �viter les sauts
    var i = 0;
    var tmp = 0;
    for (n in donnees.param["general"]["licence_key"]) {
        tmp = donnees.param["general"]["licence_key"][n];
        delete donnees.param["general"]["licence_key"][n];
        donnees.param["general"]["licence_key"][i] = tmp;
        i++;
    }
    create_elements(0, 1);  // on est oblig� de recr�er les �l�ments pour ajouter la cl�
    set_config_page("general", 0, 0);
}


function set_button(nom_var) {
    if (donnees.licence_str !== "") {  // on v�rifie qu'on a v�rifi� la licence sinon, on va perdre les infos de licence
        document.getElementById(nom_var).style.display = "none";
        //document.getElementById(nom_var + "_info").innerHTML = " <b><i> PRESS THE BUTTON TO SET</i></b>";
        document.getElementById("press_button_to_set_cont").style.display = "block";
        //console.log(nom_var);
        ws.send("jrtconfig;set_button;" + nom_var);
        console.log("jrtconfig;set_button");

        // On augmente la fr�quence des refresh pendant 5 secondes pour avoir l'affichage des boutons plus vite
        clearInterval(ws_boucle_temporaire);
        clearTimeout(setTimeout_clear_temporaire);
        ws_boucle_temporaire = setInterval(function () {
            //if (ws.bufferedAmount == 0 && (ws.readyState == ws.OPEN)) {
            if (ws.readyState == ws.OPEN) {  // on ne fait plus le test ws.bufferedAmount == 0 car �a semble bugguer
                ws.send("jrtconfig;refresh");
                //console.log("jrtconfig;refresh in set_button");
            }
        }, 100);
        setTimeout_clear_temporaire = setTimeout(function() {
            clearInterval(ws_boucle_temporaire);
        }, 5000);

    }
}


function clear_button(nom_var) {
    if (donnees.licence_str !== "") {  // on v�rifie qu'on a v�rifi� la licence sinon, on va perdre les infos de licence
        console.log("clear button");
        ws.send("jrtconfig;clear_button;" + nom_var);
        console.log("jrtconfig;clear_button");
    }
}


// On g�re le text qui s'allume en jaune quand on passe la souris dessus et qui revient � sa couleur d'origine quand on la souris s'en va
function onmouseover_text(nom_var) {
    var tmp_col = document.getElementById(nom_var + '_text').style.color;
    if (tmp_col != "yellow" && document.getElementById(nom_var).disabled == false) {
        if (tmp_col.length != 0) {  // on v�rifie que tmp_col n'est pas 'empty' et que la couleur n'est pas d�j� en jaune
            color_before_highlight[nom_var] = tmp_col;
        } else {
            color_before_highlight[nom_var] = "unset";
        }
        document.getElementById(nom_var + '_text').style.color = 'yellow';
    }
}
function onmouseout_text(nom_var) {
    if (nom_var in color_before_highlight && document.getElementById(nom_var).disabled == false) {
        document.getElementById(nom_var + '_text').style.color = color_before_highlight[nom_var];
    }
}


function update_fuel_in_tank_manual(elt_type) {
    if (elt_type.substr(26) == "") {  // si on a chang� la valeur en litres
        document.getElementById("pit_fuel_in_tank_manual_ga").value = (parseFloat(document.getElementById("pit_fuel_in_tank_manual").value) / 3.78541178).toFixed(3);
        document.getElementById("pit_fuel_in_tank_manual_kg").value = (parseFloat(document.getElementById("pit_fuel_in_tank_manual").value) * 0.75).toFixed(3);
        document.getElementById("pit_fuel_in_tank_manual_lb").value = (parseFloat(document.getElementById("pit_fuel_in_tank_manual").value) * 0.75 / 0.45359237).toFixed(3);
    } else if (elt_type.substr(26) == "ga") {  // si on a chang� la valeur en gallons
        document.getElementById("pit_fuel_in_tank_manual").value = (parseFloat(document.getElementById("pit_fuel_in_tank_manual_ga").value)  * 3.78541178).toFixed(3);
        document.getElementById("pit_fuel_in_tank_manual_kg").value = (parseFloat(document.getElementById("pit_fuel_in_tank_manual_ga").value) * 3.78541178 * 0.75).toFixed(3);
        document.getElementById("pit_fuel_in_tank_manual_lb").value = (parseFloat(document.getElementById("pit_fuel_in_tank_manual_ga").value) * 3.78541178 * 0.75 / 0.45359237).toFixed(3);
    } else if (elt_type.substr(26) == "kg") {  // si on a chang� la valeur en kg
        document.getElementById("pit_fuel_in_tank_manual").value = (parseFloat(document.getElementById("pit_fuel_in_tank_manual_kg").value) / 0.75).toFixed(3);
        document.getElementById("pit_fuel_in_tank_manual_ga").value = (parseFloat(document.getElementById("pit_fuel_in_tank_manual_kg").value) / 0.75 / 3.78541178).toFixed(3);
        document.getElementById("pit_fuel_in_tank_manual_lb").value = (parseFloat(document.getElementById("pit_fuel_in_tank_manual_kg").value) / 0.45359237).toFixed(3);
    } else if (elt_type.substr(26) == "lb") {  // si on a chang� la valeur en lb
        document.getElementById("pit_fuel_in_tank_manual").value = (parseFloat(document.getElementById("pit_fuel_in_tank_manual_lb").value) / 0.75 * 0.45359237).toFixed(3);
        document.getElementById("pit_fuel_in_tank_manual_ga").value = (parseFloat(document.getElementById("pit_fuel_in_tank_manual_lb").value) / 0.75 * 0.45359237 / 3.78541178).toFixed(3);
        document.getElementById("pit_fuel_in_tank_manual_kg").value = (parseFloat(document.getElementById("pit_fuel_in_tank_manual_lb").value) * 0.45359237).toFixed(3);
    }
}

// On cr�e la cha�ne de caract�res qui servira � cr�er les �l�ments html
//function str_elt(elt_param, elt, elt_type, update_displays_list=0) {
function str_elt(elt_param, elt, elt_type, update_displays_list, add_br, bg_col, background_col) {
    // REM : bg_col c'est juste la couleur de la bordure de gauche

    if (background_col == undefined) {
        background_col = "#444444";
    }

    //set_params = '{type: \'input_text\'}';
    var str_ret = "";

    if (add_br == 1) {
        str_br = "";
        str_br2 = "<br>";
    } else {
        str_br = "";
        str_br2 = "";
    }
    if (add_br && elt_param != null && elt_param.length > 1 && elt_param[1] in list_overlays_settings) {
        str_br = "<br>";
        str_br2 = "";
    }

    if (elt_type != "turns" && elt_type != "gears" && elt_type != "timing_columns") {  // pour �viter les erreurs car dans ce cas, elt n'est pas un �l�ment mais le num�ros de virage ou le n� du gear
        if ("long" in elt) {
            long = elt["long"];  // � d�finir plus tard dans menu_elements
        } else {
            long = 29;
        }
        if ("texte" in elt) {
            texte = elt["texte"];
        } else {
            texte = "";
        }
        if ("texte2" in elt) {
            texte2 = elt["texte2"];
        } else {
            texte2 = "";
        }

        if ("color_cycle_num" in elt) {
            color_cycle_num = elt["color_cycle_num"]
        }
        if ('newgroup' in elt) {
            color_cycle_num++;
        }

    }

    if (color_cycle_num >= color_cycle.length) {
        color_cycle_num = 0;
    }

    if (bg_col == undefined) {
        bg_col = color_cycle[color_cycle_num];
    }

    if (elt_param != null) {
        page = elt_param[0];
        nom_var = elt_param[0];
        for (var i = 1; i < elt_param.length; i++) {
            nom_var += "_" + elt_param[i];
        }
        if (elt_type == "input_color") {

            str_ret = '<div id="' + nom_var + '_bloc" >' +
                '<div style="position: absolute; right: 4em; float: right; z-index: 2; background-color: rgba(0,0,0,0); display: block; text-align: right;" >' +
                    '<div id="' + nom_var + '_input_bg" style="vertical-align: top; text-align: right; background-color: rgba(0,0,0,0); display: inline-block;">' +

                        '<input onmouseenter="onmouseover_text(\'' + nom_var + '\');" onmouseleave="onmouseout_text(\'' + nom_var + '\');"' +
                            'onmouseleave="document.getElementById(\'' + nom_var + '_text\').style.color = save_color;" ' +
                            'text-align: right; border: 0; background-color: rgba(0,255,0,0); color: #00ddff;" type="color" autocomplete="off" id="' + nom_var + '" ' +
                            /*'size="' + long + '" onchange="set_config_page(\'' + page + '\', 0, 0)">' +*/
                            'size="' + long + '" onchange="set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + "str" + '\', \'' + elt_type + '\', 0, 0)">' +

                    '</div>' +
                '</div>';
                // *** Pr�paration du set_config_page_partial ***
                //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + "str" + '\', \'' + elt_type + '\') ***');

                if ('newgroup' in elt && 'endgroup' in elt) {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 1px solid #333333; border-bottom: 1px solid #333333; margin-top: 0.5em ; margin-bottom: -0.7em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                } else if ('newgroup' in elt) {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 1px solid #333333; border-bottom: 0px solid #333333; margin-top: 0.5em ; margin-bottom: -1.2em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                } else if ('endgroup' in elt) {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 0px solid #333333; border-bottom: 1px solid #333333; margin-top: -0.25em ; margin-bottom: -0.7em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                } else {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 0px solid #333333; border-bottom: 0px solid #333333; margin-top: -0.25em ; margin-bottom: -1.2em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                }

                str_ret += '<div id="' + nom_var + '_text" style="text-align: left; background-color: rgba(0,0,0,0); display: inline-block; width: 75%; padding: 0.5em 1em 0.5em 1em;">' +
                '<b>' + texte + '</b>';
            if (texte2 != "") {
                str_ret += '<br><div id="' + nom_var + '_text2" style = "display: inline-block; box-sizing: border-box; width: 100%; font-style: italic; margin-top: 0.5em; margin-left: 1em; color: #aaaaaa;">' + texte2 + '</div>';
            }
            str_ret += '</div>' +
                '</div>' + str_br +
            '</div>';


            //str_ret = '<div class="bloc" id="' + nom_var + '_bloc" style="display: inline-block; margin-bottom: 1em;" ><span id="' + nom_var + '_text">' + texte + '</span>' + '<input type="color" autocomplete="off" id="' + nom_var + '" size="' + long + '" onchange="set_config_page(\'' + page + '\')"></div>';

        } else if (elt_type == "input" || elt_type.substr(0, 25) == "input_fuel_in_tank_manual") {
            var type_str = 'type="text"';
            var not_number = 1;  // permet de rajouter un padding suppl�mentaire quand ce n'est pas un nombre car on n'a pas le spinner
            if ('step' in elt) {
                type_str = 'type="number" step="' + elt["step"] + '"';
                not_number = 0;
            }

            var place_holder = "Enter the text here";

            if (long > 29) {
                if (long == 50) {
                    // C'est qu'il s'agit du Frame #X - Source et on autorise sp�cialement
                    //console.log(elt_param);
                } else {
                    long = 29;  // sinon �a fait bugguer les blocks
                }
            }

            if (elt_type.substr(0, 25) == "input_fuel_in_tank_manual") {  // utilis� notamment pour ne pas appliquer imm�diatement le chgt de la valeur 'fuel in the tank'
                str_ret = '<div class="input2" style= "" id="' + nom_var + '_bloc" >' +
                    '<div style="position: absolute; right: 1.5em; float: right; z-index: 2; background-color: rgba(0,0,0,0); display: block; text-align: right;" >' +
                        '<div id="' + nom_var + '_input_bg" style="vertical-align: top; text-align: right; background-color: rgba(0,0,0,0); display: inline-block; padding: 0.5em ' + (1 + 1.7*not_number) + 'em 0.5em 1em;">' +
                            '<div onmouseenter="onmouseover_text(\'' + nom_var + '\');" onmouseleave="onmouseout_text(\'' + nom_var + '\');" style="width:29em;">' +
                            /*'<input placeholder="' + place_holder + '" style="width: ' + long + 'em; text-align: right; border: 0; background-color: rgba(0,255,0,0); color: #00ddff;" autocomplete="off"' + type_str + ' id="' + nom_var + '" size="" value="" oninput="update_fuel_in_tank_manual(\'' + elt_type + '\'); set_config_page(\'' + page + '\', 0, ' + update_displays_list + ')">' +*/
                            '<input placeholder="' + place_holder + '" style="width: ' + long + 'em; text-align: right; border: 0; background-color: rgba(0,255,0,0); color: #00ddff;" autocomplete="off"' + type_str + ' id="' + nom_var + '" size="" value="" oninput="update_fuel_in_tank_manual(\'' + elt_type + '\'); set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + "float" + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ')">' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                // *** Pr�paration du set_config_page_partial ***
                //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + "float" + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ') ***');

            } else {
                str_ret = '<div class="input2" style= "" id="' + nom_var + '_bloc" >' +
                    '<div style="position: absolute; right: 1.5em; float: right; z-index: 2; background-color: rgba(0,0,0,0); display: block; text-align: right;" >' +
                        '<div id="' + nom_var + '_input_bg" style="vertical-align: top; text-align: right; background-color: rgba(0,0,0,0); display: inline-block; padding: 0.5em ' + (1 + 1.7*not_number) + 'em 0.5em 1em;">' +
                            '<div onmouseenter="onmouseover_text(\'' + nom_var + '\');" onmouseleave="onmouseout_text(\'' + nom_var + '\');" style="width:'+long+'em;">' +
                            '<input placeholder="' + place_holder + '" style="width: ' + long + 'em; text-align: right; border: 0; background-color: rgba(0,255,0,0); color: #00ddff;" autocomplete="off"' + type_str + ' id="' + nom_var + '" size="" value="" ' +
                            /*'oninput="set_config_page(\'' + page + '\', 0, ' + update_displays_list + ')">' +*/
                            'oninput="set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ')">' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                // *** Pr�paration du set_config_page_partial ***
                //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ') ***');
            }

                if ('newgroup' in elt && 'endgroup' in elt) {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 1px solid #333333; border-bottom: 1px solid #333333; margin-top: 0.5em ; margin-bottom: -0.7em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                } else if ('newgroup' in elt) {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 1px solid #333333; border-bottom: 0px solid #333333; margin-top: 0.5em ; margin-bottom: -1.2em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                } else if ('endgroup' in elt) {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 0px solid #333333; border-bottom: 1px solid #333333; margin-top: -0.25em ; margin-bottom: -0.7em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                } else {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 0px solid #333333; border-bottom: 0px solid #333333; margin-top: -0.25em ; margin-bottom: -1.2em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                }

                str_ret += '<div id="' + nom_var + '_text" style="text-align: left; background-color: rgba(0,0,0,0); display: inline-block; width: 75%; padding: 0.5em 1em 0.5em 1em;">' +
                '<b>' + texte + '</b>';
            if (texte2 != "") {
                str_ret += '<br><div id="' + nom_var + '_text2" style = "display: inline-block; box-sizing: border-box; width: 125%; font-style: italic; margin-top: 0.5em; margin-left: 1em; color: #aaaaaa;">' + texte2 + '</div>';
            }
            str_ret += '</div>' +
                '</div>' + str_br +
            '</div>';
        } else if (elt_type == "info") {
            if (nom_var != "licence_str") {
                str_ret = '<div style= "" id="' + nom_var + '_bloc" >' +
                    '<div style="position: absolute; right: 1.5em; float: right; z-index: 2; background-color: rgba(255,0,0,0); display: block; text-align: right;" >' +
                        '<div id="' + nom_var + '_input_bg" style="vertical-align: top; text-align: right; background-color: rgba(0,0,0,0); display: inline-block; padding: 0.5em 1em 0.5em 1em;">' +
                            '<div style="padding-right: 1.7em; text-align: right; border: 0; background-color: rgba(0,0,0,0); color: #888888; " autocomplete="off"' + type_str + ' id="' + nom_var + '" size="" value="" ' +
                            /*'oninput="set_config_page(\'' + page + '\', 0, ' + update_displays_list + ')"></div>' +*/
                            'oninput="set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ')"></div>' +
                        '</div>' +
                    '</div>';
                    // *** Pr�paration du set_config_page_partial ***
                    //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ') ***');

                    if ('newgroup' in elt && 'endgroup' in elt) {
                        str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 1px solid #333333; border-bottom: 1px solid #333333; margin-top: 0.5em; margin-bottom: -0.7em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                    } else if ('newgroup' in elt) {
                        str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 1px solid #333333; border-bottom: 0px solid #333333; margin-top: 0.5em; margin-bottom: -1.2em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                    } else if ('endgroup' in elt) {
                        str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 0px solid #333333; border-bottom: 1px solid #333333; margin-top: -0.25em ; margin-bottom: -0.7em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                    } else {
                        str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 0px solid #333333; border-bottom: 0px solid #333333; margin-top: -0.25em; margin-bottom: -1.2em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                    }

                    str_ret += '<div id="' + nom_var + '_text" style="text-align: left; background-color: rgba(0,0,0,0); display: inline-block; width: 50%; padding: 0.5em 1em 0.5em 1em;">' +
                    '<b>' + texte + '</b>';
                if (texte2 != "") {
                    str_ret += '<br><div id="' + nom_var + '_text2" style = "display: inline-block; box-sizing: border-box; width: 100%; font-style: italic; margin-top: 0.5em; margin-left: 1em; color: #aaaaaa;">' + texte2 + '</div>';
                }
                str_ret += '</div>' +
                    '</div>' + str_br +
                '</div>';
            } else {
                str_ret = '<div id="' + nom_var + '" >--</div>';
            }

        } else if (elt_type == "switch") {

            //str_ret = '<div class="bloc" id="' + nom_var + '_bloc" style="background-color: #ff4444; display: block; margin-bottom: -1.2em; padding: 0.25em; margin: 0;" ><input type="checkbox" id="' + nom_var + '" value="" onclick="set_config_page(\'' + page + '\')">' + texte + '</div>';

            //var set_config_str = 'set_config_page(\'' + page + '\', 0, 0)" onmouseenter="switch_hover(\'' + nom_var + '\');" onmouseleave="set_switch(\'' + nom_var + '\');" style="cursor: pointer; width: 3.2em; text-align: right; border: 0; border-radius: 0.6em; color: white; transition-duration: 0.3s; height: 1.2em; margin-right: 1.5em;" id="' + nom_var + '_switch" >'
            var set_config_str = 'set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, 0)" onmouseenter="switch_hover(\'' + nom_var + '\');" onmouseleave="set_switch(\'' + nom_var + '\');" style="cursor: pointer; width: 3.2em; text-align: right; border: 0; border-radius: 0.6em; color: white; transition-duration: 0.3s; height: 1.2em; margin-right: 1.5em;" id="' + nom_var + '_switch" >'

            str_ret = '<div class="checkbox2" id="' + nom_var + '_bloc" >' +
                '<div style="position: absolute; right: 1.5em; float: right; z-index: 2; background-color: rgba(0,0,0,0); display: block; text-align: right;" >' +
                    '<div style="vertical-align: top; text-align: right; background-color: rgba(255,0,0,0.0); display: inline-block; padding: 0.575em 1.15em 0.5em 1em;">' +
                        '<div onclick="change_switch(\'' + nom_var + '\', \'' + page + '\'); ' +
                        /*'set_config_page(\'' + page + '\', 0, 0)" onmouseenter="switch_hover(\'' + nom_var + '\');" onmouseleave="set_switch(\'' + nom_var + '\');" style="cursor: pointer; width: 3.2em; text-align: right; border: 0; border-radius: 0.6em; color: white; transition-duration: 0.3s; height: 1.2em; margin-right: 1.5em;" id="' + nom_var + '_switch" >' +*/
                        set_config_str +

                            '' +

                        '</div>' +
                            '<div id="' + nom_var + '_switch_rond" style="position: absolute; transition-duration: 0.3s; pointer-events: none; top: 0.5em; border-radius: 0.6em; background-color: black; width: 1.2em; height: 1.2em;"></div>' +
                    '</div>' +
                '</div>';
                // *** Pr�paration du set_config_page_partial ***
                //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, 0) ***');

                if ('newgroup' in elt && 'endgroup' in elt) {
                    str_ret += '<div id="' + nom_var + '_bloc" style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; padding-left: 0.875em; padding-top: 0.25em; padding-bottom: 0.25em; padding-right: 6em; background-color: ' + background_col + '; border-top: 1px solid #333333; border-bottom: 1px solid #333333; margin-top: 0.5em ; margin-bottom: -0.7em; z-index: 1; color: white; display: block; text-align: left;" >';
                } else if ('newgroup' in elt) {
                    str_ret += '<div id="' + nom_var + '_bloc" style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; padding-left: 0.875em; padding-top: 0.25em; padding-bottom: 0.25em; padding-right: 6em; background-color: ' + background_col + '; border-top: 1px solid #333333; border-bottom: 0px solid #333333; margin-top: 0.5em ; margin-bottom: -1.2em; z-index: 1; color: white; display: block; text-align: left;" >';
                } else if ('endgroup' in elt) {
                    str_ret += '<div id="' + nom_var + '_bloc" style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; padding-left: 0.875em; padding-top: 0.25em; padding-bottom: 0.25em; padding-right: 6em; background-color: ' + background_col + '; border-top: 0px solid #333333; border-bottom: 1px solid #333333; margin-top: 0em ; margin-bottom: -0.7em; z-index: 1; color: white; display: block; text-align: left;" >';
                } else {
                    str_ret += '<div id="' + nom_var + '_bloc" style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; padding-left: 0.875em; padding-top: 0.25em; padding-bottom: 0.25em; padding-right: 6em; background-color: ' + background_col + '; border-top: 0px solid #333333; border-bottom: 0px solid #333333; margin-top: 0em ; margin-bottom: -1.2em; z-index: 1; color: white; display: block; text-align: left;" >';
                }

                str_ret += '<input id="' + nom_var + '" type="checkbox" value="" ' +
                    /*'onclick="set_config_page(\'' + page + '\', 0, 0)">' + '<b><span style="padding: 0.5em 1em 0.5em 0.3em;" id="' + nom_var + '_text" >' + texte + '</span></b>';*/
                    'onclick="set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, 0)">' + '<b><span style="padding: 0.5em 1em 0.5em 0.3em;" id="' + nom_var + '_text" >' + texte + '</span></b>';
                // *** Pr�paration du set_config_page_partial ***
                //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, 0) ***');

            if (texte2 != "") {
                str_ret += '<br><div id="' + nom_var + '_text2" style = "display: inline-block; box-sizing: border-box; width: 100%; font-style: italic; margin-top: 0.25em; padding-left: 1em; padding-right: 1em; color: #aaaaaa;">' + texte2 + '</div>';
            }
            str_ret +=  '</div>' + str_br + '</div>';

        } else if (elt_type == "checkbox") {

            //str_ret = '<div class="bloc" id="' + nom_var + '_bloc" style="background-color: #ff4444; display: block; margin-bottom: -1.2em; padding: 0.25em; margin: 0;" ><input type="checkbox" id="' + nom_var + '" value="" onclick="set_config_page(\'' + page + '\')">' + texte + '</div>';

            if ('newgroup' in elt && 'endgroup' in elt) {
                str_ret = '<div id="' + nom_var + '_bloc" style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; padding-left: 0.7em; padding-top: 0.25em; padding-bottom: 0.25em; padding-right: 1em; background-color: ' + background_col + '; border-top: 1px solid #333333; border-bottom: 1px solid #333333; margin-top: 0.5em ; margin-bottom: -0.7em; z-index: 1; color: white; display: block; text-align: left;" >' +
                    '<input type="checkbox" id="' + nom_var + '" value="" ' +
                    /*'onclick="set_config_page(\'' + page + '\', 0, 0)">' + "<b>" + texte + "</b>";*/
                    'onclick="set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, 0)">' + "<b>" + texte + "</b>";
            } else if ('newgroup' in elt) {
                str_ret = '<div id="' + nom_var + '_bloc" style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; padding-left: 0.7em; padding-top: 0.25em; padding-bottom: 0.25em; padding-right: 1em; background-color: ' + background_col + '; border-top: 1px solid #333333; border-bottom: 0px solid #333333; margin-top: 0.5em ; margin-bottom: -1.2em; z-index: 1; color: white; display: block; text-align: left;" >' +
                    '<input type="checkbox" id="' + nom_var + '" value="" ' +
                    /*'onclick="set_config_page(\'' + page + '\', 0, 0)">' + "<b>" + texte + "</b>";*/
                    'onclick="set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, 0)">' + "<b>" + texte + "</b>";
            } else if ('endgroup' in elt) {
                str_ret = '<div id="' + nom_var + '_bloc" style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; padding-left: 0.7em; padding-top: 0.25em; padding-bottom: 0.25em; padding-right: 1em; background-color: ' + background_col + '; border-top: 0px solid #333333; border-bottom: 1px solid #333333; margin-top: 0em ; margin-bottom: -0.7em; z-index: 1; color: white; display: block; text-align: left;" >' +
                    '<input type="checkbox" id="' + nom_var + '" value="" ' +
                    /*'onclick="set_config_page(\'' + page + '\', 0, 0)">' + "<b>" + texte + "</b>";*/
                    'onclick="set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, 0)">' + "<b>" + texte + "</b>";
            } else {
                str_ret = '<div id="' + nom_var + '_bloc" style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; padding-left: 0.7em; padding-top: 0.25em; padding-bottom: 0.25em; padding-right: 1em; background-color: ' + background_col + '; border-top: 0px solid #333333; border-bottom: 0px solid #333333; margin-top: 0em ; margin-bottom: -1.2em; z-index: 1; color: white; display: block; text-align: left;" >' +
                    '<input type="checkbox" id="' + nom_var + '" value="" ' +
                    /*'onclick="set_config_page(\'' + page + '\', 0, 0)">' + "<b>" + texte + "</b>";*/
                    'onclick="set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, 0)">' + "<b>" + texte + "</b>";
            }
            // *** Pr�paration du set_config_page_partial ***
            //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, 0) ***');
            if (texte2 != "") {
                str_ret += '<br><div id="' + nom_var + '_text2" style = "display: inline-block; box-sizing: border-box; width: 100%; font-style: italic; margin-top: 0.25em; padding-left: 1em; padding-right: 1em; color: #aaaaaa;">' + texte2 + '</div>';
            }
            str_ret += str_br + '</div>';

        } else if (elt_type == "set_button") {

            str_ret = '<div style= "" id="' + nom_var + '_bloc" >' +
                '<div style="position: absolute; right: 1.5em; float: right; z-index: 2; background-color: rgba(0,255,0,0.0); display: block; text-align: right;" >' +
                    '<div id="' + nom_var + '_input_bg" style="vertical-align: top; text-align: right; background-color: rgba(0,0,0,0); display: inline-block; padding: 0.5em 1em 0.5em 1em;">' +
                        '<div class="joystick_button" style="margin-right: 0.5em;" id="' + nom_var + '">' +
                            ' Joystick <span style="display: inline-block;" id="' + nom_var + '_joy"></span>' +
                            ' - Button <span style="display: inline-block;" id="' + nom_var + '_button"></span>' +
                        '</div>' +
                        '<span style="display: inline-block; margin-right: 1em; color: red;" id="' + nom_var + '_info"></span>' +

                    '</div>' +
                '</div>';

                if ('newgroup' in elt && 'endgroup' in elt) {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 1px solid #333333; border-bottom: 1px solid #333333; margin-top: 0.5em ; margin-bottom: -0.7em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                } else if ('newgroup' in elt) {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 1px solid #333333; border-bottom: 0px solid #333333; margin-top: 0.5em ; margin-bottom: -1.2em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                } else if ('endgroup' in elt) {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 0px solid #333333; border-bottom: 1px solid #333333; margin-top: -0.25em ; margin-bottom: -0.7em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                } else {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 0px solid #333333; border-bottom: 0px solid #333333; margin-top: -0.25em ; margin-bottom: -1.2em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                }
                str_ret += '<div style="box-sizing: border-box; text-align: left; background-color: rgba(0,0,255,0.0); display: inline-block; width: 95%; padding: 0.5em 1em 0.5em 1em;">' +
                        '<button id="' + nom_var + '_set" class="set" onmouseenter="document.getElementById(\'' + nom_var + '_text\').style.backgroundColor = \'yellow\';document.getElementById(\'' + nom_var + '\').style.color = \'yellow\';" onmouseleave="document.getElementById(\'' + nom_var + '_text\').style.backgroundColor = \'white\';document.getElementById(\'' + nom_var + '\').style.color = \'#00ddff\';" onclick="set_button(\'' + nom_var + '\')">SET</button>' +
                        '<button id="' + nom_var + '_del" class="del" onmouseenter="document.getElementById(\'' + nom_var + '_text\').style.backgroundColor = \'yellow\';document.getElementById(\'' + nom_var + '\').style.color = \'yellow\';" onmouseleave="document.getElementById(\'' + nom_var + '_text\').style.backgroundColor = \'white\';document.getElementById(\'' + nom_var + '\').style.color = \'#00ddff\';" onclick="clear_button(\'' + nom_var + '\')">DEL</button>' +
                '<div id="' + nom_var + '_text" class="button_text">' + texte + '</div>';
            if (texte2 != "") {
                str_ret += '<br><div id="' + nom_var + '_text2" style = "display: inline-block; box-sizing: border-box; width: 100%; font-style: italic; margin-top: 0.5em; margin-left: 1em; color: #aaaaaa;">' + texte2 + '</div>';
            }
            str_ret += '</div>' +
                '</div>' + str_br +
            '</div>';

        } else if (elt_type == "select") {

            str_ret = '<div id="' + nom_var + '_bloc" >' +
                '<div style="position: absolute; right: 1.5em; float: right; z-index: 2; background-color: rgba(255,0,0,0); display: block; text-align: right;" >' +
                    '<div id="' + nom_var + '_input_bg" style="vertical-align: top; text-align: right; background-color: rgba(0,0,0,0); display: inline-block; padding: 0.5em 1em 0.5em 1em;">';

                    str_ret += '<select style="max-width: 29em; background-color: rgba(255,0,0,0); color: #00ddff; border: 0; height: 1.5em;" onmouseenter="onmouseover_text(\'' + nom_var + '\');" onmouseleave="onmouseout_text(\'' + nom_var + '\');" autocomplete="off"' + type_str +
                        ' id="' + nom_var + '" value="" ' +
                        /*'onchange="console.log(0);set_config_page(\'' + page + '\', 0, ' + update_displays_list + ')">';*/
                        'onchange="set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ')">';

                        for (var i=0; i < texte.options.length; i++) {
                            if (texte.options[i] != "") {  // Utile si on veut commencer les valeurs � 1 au lieu de 0 comme c'est le cas pour ir_mode par exemple
                                str_ret += '<option style="background-color: #383838 !important; color: white !important;" value=' + i + '>' + texte.options[i] + '</option>';
                            }
                        }
                    // *** Pr�paration du set_config_page_partial ***
                    //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ') ***');

                    str_ret += '</select>';

            str_ret += '</div>' +
                '</div>';

                if ('newgroup' in elt && 'endgroup' in elt) {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 1px solid #333333; border-bottom: 1px solid #333333; margin-top: 0.5em ; margin-bottom: -0.7em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                } else if ('newgroup' in elt) {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 1px solid #333333; border-bottom: 0px solid #333333; margin-top: 0.5em ; margin-bottom: -1.2em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                } else if ('endgroup' in elt) {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 0px solid #333333; border-bottom: 1px solid #333333; margin-top: -0.25em ; margin-bottom: -0.7em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                } else {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 0px solid #333333; border-bottom: 0px solid #333333; margin-top: -0.25em ; margin-bottom: -1.2em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                }

                str_ret += '<div id="' + nom_var + '_text" style="text-align: left; background-color: rgba(0,0,0,0); display: inline-block; width: 50%; padding: 0.5em 1em 0.5em 1em;">' +
                '<b>' + texte.titre + '</b>';
            if (texte2 != "") {
                str_ret += '<br><div id="' + nom_var + '_text2" style = "display: inline-block; width: 189%; font-style: italic; margin-top: 0.5em; margin-left: 1em; color: #aaaaaa;">' + texte2 + '</div>';
            }
            str_ret += '</div>' +
                '</div>' + str_br +
            '</div>';
        } else if (elt_type == "import_export") {
            str_ret += '<button onclick="load_default_page(\'' + page + '\')" class="button_advanced_display" style="text-transform: capitalize; min-width: 10em; width: auto; margin-top: 0.0em; margin-bottom: 0.5em;">' + page + ' Default</button>';
            str_ret += '<button onclick="load_page(\'' + page + '\')" class="button_advanced_display" style="min-width: 10em; width: auto; margin-top: 0.0em; margin-bottom: 0.5em;">Load a ' + type_setting[page] + ' page</button>';
            str_ret += '<button onclick="export_page(\'' + page + '\')" class="button_advanced_display" style="min-width: 10em; width: auto; margin-top: 0.0em; margin-bottom: 0.5em;">Export ' + page + '</button>';
        } else {
            console.log("elt_type not defined : ", elt_type);
        }
    } else {
        if (elt_type == "page_link") {
            nom_var = elt["page_name"] + "_link";
            //console.log(nomvar, "http://" + localIP + ":" + donnees.param["general"]["PORT"] + "/" + elt["page_name"] + ".html")
            var url = "http://" + localIP + ":" + donnees.param["general"]["PORT"] + "/" + elt["page_name"] + ".html";

            str_ret = '<div style= "" id="' + nom_var + '_bloc" >' +
                '<div style="position: absolute; right: 1.5em; float: right; z-index: 2; background-color: rgba(255,0,0,0); display: block; text-align: right;" >' +
                    '<div id="' + nom_var + '_input_bg" style="vertical-align: top; text-align: right; background-color: rgba(0,0,0,0); display: inline-block; padding: 0.5em 1em 0.5em 1em;">' +
                        '<a href="' + url + '" style="padding-right: 1.7em; text-align: right; border: 0; background-color: rgba(0,0,0,0); " id="' + nom_var + '">' + url + '</a>' +
                    '</div>' +
                '</div>';

                if ('newgroup' in elt && 'endgroup' in elt) {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 1px solid #333333; border-bottom: 1px solid #333333; margin-top: 0.5em; margin-bottom: -0.7em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                } else if ('newgroup' in elt) {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 1px solid #333333; border-bottom: 0px solid #333333; margin-top: 0.5em; margin-bottom: -1.2em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                } else if ('endgroup' in elt) {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 0px solid #333333; border-bottom: 1px solid #333333; margin-top: -0.25em ; margin-bottom: -0.7em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                } else {
                    str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 0px solid #333333; border-bottom: 0px solid #333333; margin-top: -0.25em; margin-bottom: -1.2em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                }

                str_ret += '<div id="' + nom_var + '_text" style="text-align: left; background-color: rgba(0,0,0,0); display: inline-block; width: 50%; padding: 0.5em 1em 0.5em 1em;">' +
                '<b>' + texte + '</b>';
            if (texte2 != "") {
                str_ret += '<br><div id="' + nom_var + '_text2" style = "display: inline-block; box-sizing: border-box; width: 189%; font-style: italic; margin-top: 0.5em; margin-left: 1em; color: #aaaaaa;">' + texte2 + '</div>';
            }
            str_ret += '</div>' +
                '</div>' + str_br +
            '</div>';

        } else if (elt_type == "text") {
            texte = elt["texte"]["content"];
            margin_top = elt["texte"]["margin-top"];
            margin_bottom = elt["texte"]["margin-bottom"];
            if (texte == "<hr>") {
                str_ret = '<hr>';
            } else {

                str_ret = '<div>' +
                    '<div style="position: absolute; right: 1.5em; float: right; z-index: 2; background-color: rgba(255,0,0,0); display: block; text-align: right;" >' +
                        '<div id="' + nom_var + '_input_bg" style="vertical-align: top; text-align: right; background-color: rgba(0,0,0,0); display: inline-block; padding: 0.5em 1em 0.5em 1em;">' +
                            '<div style="padding-right: 1.7em; text-align: right; border: 0; background-color: rgba(0,0,0,0); color: #888888; " id="' + nom_var + '"></div>' +
                        '</div>' +
                    '</div>';

                    if ('newgroup' in elt && 'endgroup' in elt) {
                        str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 1px solid #333333; border-bottom: 1px solid #333333; margin-top: 0.5em; margin-bottom: -0.7em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                    } else if ('newgroup' in elt) {
                        str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 1px solid #333333; border-bottom: 0px solid #333333; margin-top: 0.5em; margin-bottom: -1.2em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                    } else if ('endgroup' in elt) {
                        str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 0px solid #333333; border-bottom: 1px solid #333333; margin-top: -0.25em ; margin-bottom: -0.7em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                    } else {
                        str_ret += '<div style="box-shadow: inset 2px 0px ' + bg_col + ', inset -0px 0px ' + bg_col + '; border-top: 0px solid #333333; border-bottom: 0px solid #333333; margin-top: -0.25em; margin-bottom: -1.2em; position: relative; z-index: 1; width: 100%; color: white; background-color: ' + background_col + '; display: block; text-align: left;" >';
                    }

                    str_ret += '<div style="box-sizing: border-box; margin-top: ' + margin_top + 'em; margin-bottom: ' + margin_bottom + 'em; text-align: left; background-color: rgba(0,0,0,0); display: inline-block; width: 100%; padding: 0.5em 1em 0.5em 1em;">' +
                    '<b>' + texte + '</b>';
                if (texte2 != "") {
                    str_ret += '<br><div style = "display: inline-block; box-sizing: border-box; width: 100%; font-style: italic; margin-top: 0.5em; margin-left: 1em; color: #aaaaaa;">' + texte2 + '</div>';
                }
                str_ret += '</div>' +
                    '</div>' + str_br +
                '</div>';


                //str_ret = '<div style="margin-top: ' + margin_top + 'em; margin-bottom: ' + margin_bottom + 'em; display: inline-block;">' + texte + '</div>';
            }
        } else if (elt_type == "input_key") {
            nom_var = "input_key";
            str_ret = '<div class="bloc" id="' + nom_var + '_bloc" style="display: inline-block;" ><span id="' + nom_var + '_text">' + texte + '</span>' + '<input autocomplete="off" type="text" id="' + nom_var + '" size="' + long + '" value=""><button onclick="add_key()">Add Key</button>' + str_br + '</div>';
        } else if (elt_type == "licence_key_list") {
            nom_var = "licence_key_list";
            var size = Object.keys(donnees.param["general"]["licence_key"]).length + 1;
            str_ret =  '<div class="bloc" id="' + nom_var + '_bloc" style="display: inline-block;" ><select id="' + nom_var + '" size=' + size + '>';
            for (var n in donnees.param["general"]["licence_key"]) {
                str_ret += '<option value="' + n + '">' + donnees.param["general"]["licence_key"][n] + '</option>';
            }
            str_ret += '</select>';
            str_ret += '<br><button onclick="del_key()">Del Key</button>' + str_br + '</div>';
        } else if (elt_type == "info_car") {
            nom_var = elt["group_id"] + "_info_car";
            texte = elt["texte"];
            str_ret = '<div class="bloc" id="' + nom_var + '_bloc" style="display: block;" >' + texte + '<span style="display: inline-block;" id="' + nom_var + '" >--</span>' + str_br + '</div>';
        } else if (elt_type == "info_track") {
            nom_var = elt["group_id"] + "_info_track";
            texte = elt["texte"];
            str_ret = '<div class="bloc" id="' + nom_var + '_bloc" style="display: block;" >' + texte + '<span style="display: inline-block;" id="' + nom_var + '" >--</span>' + str_br + '</div>';
        } else if (elt_type == "turns") {
            var i = elt;
            str_ret = '<div class="bloc" id="track_turn_' + i + '_bloc" style="display: inline-block;" >';
            str_ret += '<input autocomplete="off" type="text" id="track_turn_num_' + i + '" size="4" value="" ' +
                /*'oninput="set_config_page(\'track\', 0, 0)">';*/
                'oninput="set_config_page_partial(\'track\', null, null, \'' + elt_type + '\', 0, 0)">';
            str_ret += '<input autocomplete="off" style="width: 4em;" type="number" step="0.001" id="track_turn_ldp_' + i + '" value="" ' +
                /*'oninput="set_config_page(\'track\', 0, 0)">';*/
                'oninput="set_config_page_partial(\'track\', null, null, \'' + elt_type + '\', 0, 0)">';
            str_ret += '<select id="track_turn_side_' + i + '"  ' +
                /*'onchange="set_config_page(\'track\', 0, 0)"><option value="-1">Left</option><option value="1">Right</option></select>';*/
                'onchange="set_config_page_partial(\'track\', null, null, \'' + elt_type + '\', 0, 0)"><option value="-1">Left</option><option value="1">Right</option></select>';
            str_ret += '<input autocomplete="off" type="text" id="track_turn_info_' + i + '" size="40" value="" ' +
                /*'oninput="set_config_page(\'track\', 0, 0)">';*/
                'oninput="set_config_page_partial(\'track\', null, null, \'' + elt_type + '\', 0, 0)">';
            // *** Pr�paration du set_config_page_partial ***
            //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ') ***');
            str_ret += str_br + '</div>';
        } else if (elt_type == "gears") {
            var i = elt;
            str_ret = '<div class="bloc" id="car_gear_' + i + '_bloc" style="display: block;" >';
            str_th = "th";
            if (i == 1) str_th = "st";
            if (i == 2) str_th = "nd";
            if (i == 3) str_th = "rd";
            str_ret += "<div style='width: 2em; display: inline-block;'>" + i + str_th + ' ' + '</div><input style="width: 4em;" autocomplete="off" type="number" step="1" id="car_rpm' + i + '" value="" ' +
                /*'oninput="set_config_page(\'car\', 0, 0)">';*/
                'oninput="set_config_page_partial(\'car\', null, null, \'' + elt_type + '\', 0, 0)">';
            // *** Pr�paration du set_config_page_partial ***
            //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ') ***');
            str_ret += str_br + '</div>';
        } else if (elt_type == "button") {
            if (elt["action"] == "reset_trackmap") {
                str_ret = '<button id="' + elt["action"] + '" onclick="button_action(\'' + elt["action"] + '\', [\'' + donnees.trackname_path + '\', \'' + donnees.trackname + '\'])">' + "RESET '" + donnees.trackname + "' TRACKMAP" + '</button>' + str_br;
            } else {
                str_ret = '<button id="' + elt["action"] + '" onclick="button_action(\'' + elt["action"] + '\')">' + texte + '</button>' + str_br;
            }
        } else if (elt_type == "timing_columns") {
            //var i = elt;
            //title_id = donnees.param["timing"].tab_titres_all_default[i];
            var title_id = elt["title_id"];
            if (title_id in timing_columns_infos_bulle) {
                var infos_bulle = timing_columns_infos_bulle[title_id];
            } else {
                var infos_bulle = "";
            }
            var page = elt["page"];
            var order_num = elt["order_num"];
            var color_title = "#eeeeee";
            if (order_num == null) {
                order_num = "";
                color_title = "#aaaaaa";
            } else {
                order_num = order_num + ".";
            }
            //console.log(i, "Title ID :", title_id, ", Name :", donnees.param["timing"].set_title[title_id], ", Width :", donnees.param["timing"].w[title_id])
            //str_ret = "<div>" + title_id  + " - " + order_nums_["timing_columns"][title_id] + " - " + donnees.param["timing"].set_title[title_id] + " - " + donnees.param["timing"].w[title_id] + "</div>";

            //str_ret = '<div class="bloc" id="' + page + '_columns_bloc">';
            str_ret = '<div class="timing_columns_bloc" id="' + page + '_columns_' + title_id + '_bloc" title="' + infos_bulle + '">&nbsp;';
            str_ret += '<div class="timing_columns_drag" style="display: inline-block;" id="' + page + '_columns_' + title_id + '_drag">';

            str_ret += '<div  style="display: inline-block; user-select: none;" ><div style="color : #00ddff; display: inline-block; width: 3em; cursor: grab;" id = "' + page + '_order_' + title_id + '">&nbsp;' + order_num + '</div> <input type="checkbox" id="' + page + '_display_' + title_id + '" value="" ' +
                /*'onclick="set_config_page(\'' + page + '\', 1, 0)">' +*/
                'onclick="set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 1, 0)">' +
                '<div style="display: inline-block; width: 8em; cursor: grab; color: ' + color_title + '" id = "' + page + '_text_' + title_id + '">' + title_id + '</div></div> ';
            // *** Pr�paration du set_config_page_partial ***
            //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ') ***');

            //str_ret += '<input style="width: 4em;" autocomplete="off" type="number" id="' + page + '_order_num_' + title_id + '" value="" oninput="set_config_page(\'' + page + '\')">';

            str_ret += '<input style="width: 6em;" autocomplete="off" type="text" id="' + page + '_set_title_' + title_id + '" value="" ' +
                /*'oninput="set_config_page(\'' + page + '\', 0, 0)">';*/
                'oninput="set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, 0)">';
            // *** Pr�paration du set_config_page_partial ***
            //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ') ***');
            str_ret += '<input style="width: 3.9em;" autocomplete="off" type="number" step="1" id="' + page + '_w_' + title_id + '" value="" ' +
                /*'oninput="set_config_page(\'' + page + '\', 0, 0)">&nbsp;';*/
                'oninput="set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, 0)">&nbsp;';
            // *** Pr�paration du set_config_page_partial ***
            //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ') ***');

            for (var o = 0; o < menu_elements_timing_columns_option.length; o++ ) {
                var param = menu_elements_timing_columns_option[o].param;
                //nom_var = param[0] + "_" + param[1];
                nom_var = page + "_" + param[0];
                var options = menu_elements_timing_columns_option[o].options;
                if (menu_elements_timing_columns_option[o].title_id == title_id) {
                    str_ret += '<select style="width:16.8em; margin-left: 0.1em; height:1.5em;" id="' + nom_var + '" ' +
                        /*'onchange="set_config_page(\'' + page + '\', 0, 0)">';*/
                        'onchange="set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, 0)">';
                    // *** Pr�paration du set_config_page_partial ***
                    //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ') ***');
                    for (var i = 0; i < options.length; i++) {
                        if (options[i] != "") {  // Utile si on veut commencer les valeurs � 1 au lieu de 0 comme c'est le cas pour ir_mode par exemple
                            str_ret += '<option value=' + i + '>' + options[i] + '</option>';
                        }
                    }
                    str_ret += '</select>';
                }
            }

            // # On affiche les options pour les avg1, avg2, avg3
            if (title_id == "avg1" || title_id == "avg2" || title_id == "avg3") {
                str_ret += ' Number of laps <input style="width: 4em;" autocomplete="off" type="number" step="1" min="1" id="' + page + '_' + title_id + '_nblaps" value="" ' +
                    /*'oninput="set_config_page(\'' + page + '\', 0, 0)">';*/
                    'oninput="set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, 0)">';
                // *** Pr�paration du set_config_page_partial ***
                //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ') ***');
                str_ret += '&nbsp; <input type="checkbox" id="' + page + '_' + title_id + '_best" value="" ' +
                    /*'onclick="set_config_page(\'' + page + '\', 0, 0)"> Best';*/
                    'onclick="set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, 0)"> Best';
                // *** Pr�paration du set_config_page_partial ***
                //console.log('*** set_config_page_partial(\'' + page + '\', \'' + JSON.stringify(elt_param).replace(/"/g, '&quot;') + '\', \'' + elt["val_type"] + '\', \'' + elt_type + '\', 0, ' + update_displays_list + ') ***');
            }

            str_ret += '</div>';
            str_ret += str_br + '</div>';
        }
    }

    str_ret += str_br2;
    //console.log(str_ret)
    return str_ret;
}


// Sert � envoyer une instruction au serveur JRT
function button_action(action, opt) {
    if (action != undefined) {
        if (opt != null) {
            if (action == "reset_trackmap") {
                document.getElementById("hide").style.display = "block";
                // REM : on est oblig� de passer par un setTimeout car sinon la box emp�che la modif de l'�l�ment #hide
                setTimeout(function () { button_action("reset_trackmap_confirm", opt); }, 100);
                return;
            }
            if (action == "reset_trackmap_confirm") {
                if (!confirm("Delete the " + opt[1] + " trackmap data ?")) {
                    document.getElementById("hide").style.display = "none";
                    return;  // on ne fait rien
                }
                document.getElementById("hide").style.display ="none";
            }
            ws.send("jrtconfig;" + action + ";" + opt[0]);
            console.log("jrtconfig;" + action);
        } else {

            // Quand on appuie sur le bouton "SAVE" on grise le bouton
            /*if (action == "save_settings") {
                toggle_save_button_OFF();
            }*/

            if (action == "apply_fuel_in_tank_manual_value") {
                ws.send("jrtconfig;" + action + ";" + document.getElementById("pit_fuel_in_tank_manual").value);
                //set_config_page('pit', 0, 0);
            } else {
                ws.send("jrtconfig;" + action);
            }
            console.log("jrtconfig;" + action);

        }
    }
}

// On essaie de retrouver les menus qui contiennent un text
// On va chercher plus exactement d'abord les groups_to_display, puis les options_to_display et page_to_display
// REM : pages_otpions est particulier car c'est le seul � avoir un 2�me menu page_to_display
function search_menus_dec() {
    if (search_nb > 0) {
        search_num--;
        if (search_num < 1) {
            search_num = search_nb;
        }
        if (!search_highlight(search_num)) {
            search_menus_dec();
        }
    }
}
function search_menus_inc() {
    if (search_nb > 0) {
        search_num++;
        if (search_num > search_nb) {
            search_num = 1;
        }
        if (!search_highlight(search_num)) {
            search_menus_inc();
        }
    }
}
function search_highlight(s_num) {
    tmp_ret = true;
    if (search_nb > 0) {
        if (s_num in search_options_to_display) {
            document.getElementById("options_displayed").value = search_options_to_display[s_num];
        }
        if (s_num in search_page_to_display) {
            document.getElementById("page_displayed").value = search_page_to_display[s_num];
        }
        display_options(0, null);

        if (document.getElementById("text_search" + (s_num)) === null || document.getElementById("text_search" + (s_num)).offsetParent === null) {  // si l'�l�ment n'est pas visible (par exemple si c'est un display du dashboard non actif
            tmp_ret = false;
        } else {
            for (var n=1;n<=search_nb;n++) {
                if (document.getElementById("text_search" + (n)) !== null) {
                    document.getElementById("text_search" + (n)).className = "highlight_search_no";
                }
            }
            document.getElementById("text_search" + (s_num)).className = "highlight_search";
            //console.log("***", document.getElementById("text_search" + (s_num)).offsetParent);
            document.getElementById("text_search" + (s_num)).scrollIntoView();
            // Il faut le descendre pour qu'il soit visible et pas cach� par le menu
            window.scrollBy(0, -parseInt($("#bandeau_fixe").css("height")));
        }
    }
    if (search_nb > 0) {
        document.getElementById("search_num").innerHTML = s_num;
    } else {
        document.getElementById("search_num").innerHTML = "-";
    }
    return tmp_ret;
}
function init_search() {
    if (search_nb > 0) {
        create_elements(1, 0);
        search_nb = 0;
        search_options_to_display = {};
        search_page_to_display = {};
        document.getElementById("search_num").innerHTML = "-";
        document.getElementById("search_nb").innerHTML = "-";
    }
    document.getElementById("search_button_text").innerHTML = "Search";
    document.getElementById("search_button_text").style.color = "#00cc00";
}
function search_menus(s_num) {
    if (search_nb > 0)  {
        /*create_elements(1, 0);
        search_nb = 0;
        document.getElementById("search_button_text").innerHTML = "Search";*/
        document.getElementById("search_input").value = "";
        init_search();
    } else if (s_num > 0) {

        create_elements(1, 0);
        search_options_to_display = {};
        search_page_to_display = {};

        search_num = s_num;
        text = document.getElementById("search_input").value;

        var s_nb = 0;

        for (group in groups_to_display) {
            if ((document.getElementById(group + "_cont").innerText).toLowerCase().includes(text.toLowerCase()) || (document.getElementById(group + "_cont").textContent).toLowerCase().includes(text.toLowerCase())) {
                for (var options_to_display in set_options) {
                    if (group in set_options[options_to_display]) {
                        regexp = RegExp(">[^>^<]*" + text + "[^>^<]*<", "gi");  // le i du gi c'est pour que ce soit insensible � la casse
                        text_array = [...document.getElementById(group + "_cont").innerHTML.matchAll(regexp)];
                        html_split = document.getElementById(group + "_cont").innerHTML.split(regexp);
                        html = "";
                        for (var i = 0; i < html_split.length - 1; i++) {
                            s_nb++;
                            html += html_split[i] + "><span id='text_search" + (s_nb) + "'>" + String(text_array[i]).substring(1, String(text_array[i]).length - 1) + "</span><";
                            if (s_nb == s_num) {
                                document.getElementById("options_displayed").value = options_to_display;
                                display_options(0, null);
                            }
                            search_options_to_display[s_nb] = options_to_display;
                        }
                        if (html_split.length >= 1) {
                            html += html_split[html_split.length - 1];
                        }
                        //console.log(document.getElementById(group + "_cont").innerHTML)
                        document.getElementById(group + "_cont").innerHTML = html;
                        //console.log("Le groupe '" + group + "' contient le texte '" + text + "' " + (html_split.length - 1) + " fois.");
                    }
                    // On regarde aussi dans les pages_options
                    if (options_to_display == "pages_options") {
                        for (var page_to_display in pages_sous_groups) {
                            for (var sous_group in pages_sous_groups[page_to_display]) {
                                if (group == page_to_display + "_" + sous_group) {
                                    regexp = RegExp(">[^>^<]*" + text + "[^>^<]*<", "gi");  // le i du gi c'est pour que ce soit insensible � la casse
                                    text_array = [...document.getElementById(group + "_cont").innerHTML.matchAll(regexp)];
                                    html_split = document.getElementById(group + "_cont").innerHTML.split(regexp);
                                    html = "";
                                    for (var i = 0; i < html_split.length - 1; i++) {
                                        s_nb++;
                                        html += html_split[i] + "><span id='text_search" + (s_nb) + "'>" + String(text_array[i]).substring(1, String(text_array[i]).length - 1) + "</span><";
                                        if (s_nb == s_num) {
                                            document.getElementById("options_displayed").value = options_to_display;
                                            document.getElementById("page_displayed").value = page_to_display;
                                            display_options(0, null);
                                        }
                                        search_options_to_display[s_nb] = options_to_display;
                                        search_page_to_display[s_nb] = page_to_display;
                                        //console.log(s_nb, String(text_array[i]).substring(1, String(text_array[i]).length - 1));
                                    }
                                    if (html_split.length >= 1) {
                                        html += html_split[html_split.length - 1];
                                    }
                                    document.getElementById(group + "_cont").innerHTML = html;
                                    //console.log("Le sous-groupe '" + sous_group + "' de la page '" + page_to_display + "' contient le texte '" + text + "' " + (html_split.length - 1) + " fois.");
                                }
                            }
                        }
                    }
                }
            }
        }

        load_donnees(1, 0);  // c'est important sinon on va perdre les donn�es, par exemple le port 8000 dans general_cont

        document.getElementById("search_nb").innerHTML = s_nb;
        search_nb = s_nb;

        // On va directement au premier �l�ment visible
        if (!search_highlight(s_num)) {
            search_menus_inc();
        }

        if (search_nb > 0) {
            document.getElementById("search_button_text").innerHTML = "Clear";
            document.getElementById("search_button_text").style.color = "#ff8800";
        }
    }
}


// connections websocket avec le serveur Python
function init_ws() {
    ws_boucle = null;  // important pour �viter un message d'erreur dans config.js

    try {
        ws = new WebSocket("ws://" + localIP + ":" + PORT8001 + "/");
    } catch (error) {
        // on r�essaie plus tard
        setTimeout(function () { init_ws(); },1000);
        return;
    }
    // Socket for the local communications

    ws.onmessage = function (d) {
        var datas = d.data;
        //console.log(datas);
        if (datas != "") {
            var tmp_donnees = JSON.parse(datas);
            //console.log(tmp_donnees);
            update_datas(tmp_donnees);
        }
    };
    ws.onclose = function () {
        console.log("Websocket closed")
        //setTimeout(function () {location.reload()},5000);
        setTimeout(function () { clearInterval(ws_boucle); init_ws(); },1000);
        ws.close();
    };
    window.onbeforeunload = function () {
        ws.onclose = function () {
        }; // disable onclose handler first
        ws.close();
    };
    ws.onopen = function () {
        ws.send("window_shortname;" + "jrtconfig");

        // On r�cup�re tous les param�tres
        init_donnees();  // si on relance le JRT server sans recharger la page JRT config, cela permettra de r�cup�rer dans la m�moire les bonnes valeurs
        //ws.send("jrtconfig;load");
        //console.log("jrtconfig;load");

        // On fait un refresh au lieu d'un load, puisque le premier refresh va automatiquement g�n�rer un load_jrtconfig
        ws.send("jrtconfig;refresh");
        //console.log("jrtconfig;refresh");

        // 2 fois par seconde on demande une mise � jour des valeurs status, trackname et carname
        ws_boucle = setInterval(function () {
            //if (ws.bufferedAmount == 0 && (ws.readyState == ws.OPEN)) {
            if (ws.readyState == ws.OPEN) {  // on ne fait plus le test ws.bufferedAmount == 0 car �a semble bugguer
                ws.send("jrtconfig;refresh");
                //console.log("jrtconfig;refresh");
            }
        }, 500);
    };

}


window.onload = function () {
    init_ws();
    //document.getElementById("loading").style.display = "none";

    // Get the input field
    var search_input = document.getElementById("search_input");

    // Execute a function when the user releases a key on the keyboard
    search_input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            //document.getElementById("search_button_text").click();
            if (search_nb == 0) {
                search_menus(1);
            } else {
                search_menus_inc();
            }
        }
    });

}


more_options_value_ = {};

donnees_copy = null;
donnees_copy_dashboard = null;
donnees_copy_name = null;
donnees_copy_x = null;
donnees_paste_dashboard = null;
donnees_paste_name = null;
donnees_paste_x = null;
donnees_reset = null;

window_shortname = "jrtconfig";

ws_boucle_temporaire = null;
setTimeout_clear_temporaire = null;

donnees_param_partial = [];
input_en_cours = false;
last_setting_changed = null;
last_setting_changed_tstamp = 0;
report_load_spec = null;
last_datas_to_send = null;
