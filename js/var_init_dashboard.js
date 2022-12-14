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


function initDragElement() {
    var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
    var elmnt_left = 0, elmnt_top = 0;
    var popup = document.getElementById("highlight_elt_cont");
    var elmnt = null;
    var currentZIndex = 999999; //TODO reset z index when a threshold is passed

    //var header = getHeader(popup);
    header = popup;

    popup.onmousedown = function() {
        this.style.zIndex = "" + ++currentZIndex;
    };

    if (header) {
      header.parentPopup = popup;
      header.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        if (!is_resizing) {
            elmnt = this.parentPopup;
            elmnt.style.zIndex = "" + ++currentZIndex;

            e = e || window.event;
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;

            elmnt_top = elmnt.offsetTop;
            elmnt_left = elmnt.offsetLeft;

            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
    }

    function elementDrag(e) {

        if (!elmnt) {
            return;
        }

        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        //console.log(pos4)

        var new_top = elmnt_top - pos2;
        var new_left = elmnt_left - pos1;

        // Position sans le snap
        elmnt_top = new_top;
        elmnt_left = new_left;

        var grid_h = 1;
        var grid_w = 1;
        if (advanced["grid_snap" + d]) {
            grid_h = Math.max(advanced["grid_h" + d], 1);
            grid_w = Math.max(advanced["grid_w" + d], 1);
        }
        var new_top_ref = Math.round((new_top - y_offset) * dashboard_ref_w / w / grid_h) * grid_h;
        var new_left_ref = Math.round((new_left - x_offset) * dashboard_ref_w / w / grid_w) * grid_w;
        new_top = (w * new_top_ref / dashboard_ref_w) + y_offset;
        new_left = (w * new_left_ref / dashboard_ref_w) + x_offset;

        // set the element's new position:
        elmnt.style.top = new_top + "px";
        elmnt.style.left = new_left + "px";

        var elt_box = document.getElementById(name_highlighted + "_box");
        var elt_box_border = document.getElementById(name_highlighted + "_box_border");
        var elt_box_no_border = document.getElementById(name_highlighted + "_box_no_border");

        var tmp_list = {'pre_pos': 1, 'me_pos': 1, 'post_pos': 1, 'pre_cpos': 1, 'me_cpos': 1, 'post_cpos': 1};
        if (name_highlighted in tmp_list) {
            var elt_box_cont = document.getElementById(name_highlighted + "_cont");
            elt_box_cont.style.top = new_top + "px";
            elt_box_cont.style.left = new_left + "px";
        }

        elt_box.style.top = new_top + "px";
        elt_box.style.left = new_left + "px";
        elt_box_border.style.top = new_top + "px";
        elt_box_border.style.left = new_left + "px";
        if (advanced["header_disp_" + name_highlighted + d]) {
            elt_box_no_border.style.top = new_top + advanced["header_y_offset_" + name_highlighted + d] * w / dashboard_ref_w + "px";
            elt_box_no_border.style.left = new_left + advanced["header_x_offset_" + name_highlighted + d] * w / dashboard_ref_w + "px";
        } else {
            elt_box_no_border.style.top = new_top + "px";
            elt_box_no_border.style.left = new_left + "px";
        }

    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        apply_drag_and_resize(1, 1, 0, 0);
    }

}


function initResizeElement() {
    var p = document.getElementById("highlight_elt_cont");
    var element = null;
    var startX, startY, startWidth, startHeight, startLeft, startTop, startBottom, startRight;

    var drag_type;

    var move_x, move_y, move_w, move_h;

    var left = document.createElement("div");
    left.className = "resizer-left";
    p.appendChild(left);
    left.addEventListener("mousedown", initDrag_w_left, false);
    left.parentPopup = p;

    var right = document.createElement("div");
    right.className = "resizer-right";
    p.appendChild(right);
    right.addEventListener("mousedown", initDrag_w_right, false);
    right.parentPopup = p;

    var top = document.createElement("div");
    top.className = "resizer-top";
    p.appendChild(top);
    top.addEventListener("mousedown", initDrag_h_top, false);
    top.parentPopup = p;

    var bottom = document.createElement("div");
    bottom.className = "resizer-bottom";
    p.appendChild(bottom);
    bottom.addEventListener("mousedown", initDrag_h_bottom, false);
    bottom.parentPopup = p;

    var both_lt = document.createElement("div");
    both_lt.className = "resizer-both_lt";
    p.appendChild(both_lt);
    both_lt.addEventListener("mousedown", initDrag_both_lt, false);
    both_lt.parentPopup = p;

    var both_rt = document.createElement("div");
    both_rt.className = "resizer-both_rt";
    p.appendChild(both_rt);
    both_rt.addEventListener("mousedown", initDrag_both_rt, false);
    both_rt.parentPopup = p;

    var both_lb = document.createElement("div");
    both_lb.className = "resizer-both_lb";
    p.appendChild(both_lb);
    both_lb.addEventListener("mousedown", initDrag_both_lb, false);
    both_lb.parentPopup = p;

    var both_rb = document.createElement("div");
    both_rb.className = "resizer-both_rb";
    p.appendChild(both_rb);
    both_rb.addEventListener("mousedown", initDrag_both_rb, false);
    both_rb.parentPopup = p;

    function initDrag_w_left(e) {
        move_x = 1;
        move_y = 0;
        move_w = 1;
        move_h = 0;
        drag_type = "w_left";
        startX = e.clientX;
        startY = e.clientY;
        element = this.parentPopup;
        initDrag();
    }
    function initDrag_w_right(e) {
        move_x = 0;
        move_y = 0;
        move_w = 1;
        move_h = 0;
        drag_type = "w_right";
        startX = e.clientX;
        startY = e.clientY;
        element = this.parentPopup;
        initDrag();
    }
    function initDrag_h_top(e) {
        move_x = 0;
        move_y = 1;
        move_w = 0;
        move_h = 1;
        drag_type = "h_top";
        startX = e.clientX;
        startY = e.clientY;
        element = this.parentPopup;
        initDrag();
    }
    function initDrag_h_bottom(e) {
        move_x = 0;
        move_y = 0;
        move_w = 0;
        move_h = 1;
        drag_type = "h_bottom";
        startX = e.clientX;
        startY = e.clientY;
        element = this.parentPopup;
        initDrag();
    }
    function initDrag_both_lt(e) {
        move_x = 1;
        move_y = 1;
        move_w = 1;
        move_h = 1;
        drag_type = "both_lt";
        startX = e.clientX;
        startY = e.clientY;
        element = this.parentPopup;
        initDrag();
    }
    function initDrag_both_rt(e) {
        move_x = 0;
        move_y = 1;
        move_w = 1;
        move_h = 1;
        drag_type = "both_rt";
        startX = e.clientX;
        startY = e.clientY;
        element = this.parentPopup;
        initDrag();
    }
    function initDrag_both_lb(e) {
        move_x = 1;
        move_y = 0;
        move_w = 1;
        move_h = 1;
        drag_type = "both_lb";
        startX = e.clientX;
        startY = e.clientY;
        element = this.parentPopup;
        initDrag();
    }
    function initDrag_both_rb(e) {
        move_x = 0;
        move_y = 0;
        move_w = 1;
        move_h = 1;
        drag_type = "both_rb";
        startX = e.clientX;
        startY = e.clientY;
        element = this.parentPopup;
        initDrag();
    }
    function initDrag() {
        is_resizing = true;
        startLeft = parseInt(
          document.defaultView.getComputedStyle(element).left,
          10
        );
        startTop = parseInt(
          document.defaultView.getComputedStyle(element).top,
          10
        );
        startWidth = parseInt(
          document.defaultView.getComputedStyle(element).width,
          10
        );
        startHeight = parseInt(
          document.defaultView.getComputedStyle(element).height,
          10
        );
        startBottom = startTop + startHeight;
        startRight = startLeft + startWidth;
        document.documentElement.addEventListener("mousemove", doDrag, false);
        document.documentElement.addEventListener("mouseup", stopDrag, false);
    }
    function doDrag(e) {
        var elt = document.getElementById(name_highlighted);
        var elt_label = document.getElementById(name_highlighted + "_label");
        var elt_box = document.getElementById(name_highlighted + "_box");
        var elt_box_border = document.getElementById(name_highlighted + "_box_border");
        var elt_box_no_border = document.getElementById(name_highlighted + "_box_no_border");

        var elt_box_cont = null;
        var tmp_list = {'pre_pos': 1, 'me_pos': 1, 'post_pos': 1, 'pre_cpos': 1, 'me_cpos': 1, 'post_cpos': 1};
        if (name_highlighted in tmp_list) {
            elt_box_cont = document.getElementById(name_highlighted + "_cont");
        }

        var new_width, new_height, new_left, new_top;

        var grid_h = 1;
        var grid_w = 1;
        if (advanced["grid_snap" + d]) {
            grid_h = Math.max(advanced["grid_h" + d], 1);
            grid_w = Math.max(advanced["grid_w" + d], 1);
        }

        var box_left_width = advanced["box_border_left_width_" + name_highlighted + d];
        var box_top_width = advanced["box_border_top_width_" + name_highlighted + d];
        var box_right_width = advanced["box_border_right_width_" + name_highlighted + d];
        var box_bottom_width = advanced["box_border_bottom_width_" + name_highlighted + d];
        var label_left_width = advanced["header_border_left_width_" + name_highlighted + d];
        var label_top_width = advanced["header_border_top_width_" + name_highlighted + d];
        var label_right_width = advanced["header_border_right_width_" + name_highlighted + d];
        var label_bottom_width = advanced["header_border_bottom_width_" + name_highlighted + d];
        var header_width = 0;
        if (advanced["header_disp_" + name_highlighted + d]) {
            header_width = advanced["header_width_" + name_highlighted + d];
        }


        if (drag_type == "w_left" || drag_type == "w_right" || drag_type == "both_rb" || drag_type == "both_lt" || drag_type == "both_rt" || drag_type == "both_lb") {
            new_left = startLeft;
            if (drag_type == "w_left" || drag_type == "both_lt" || drag_type == "both_lb") {
                new_width = startWidth - e.clientX + startX;
                new_left = startLeft + e.clientX - startX;
            } else {
                new_width = startWidth + e.clientX - startX;
            }
            //if (advanced["grid_snap" + d]) {
                var new_left_ref = Math.round((new_left - x_offset) * dashboard_ref_w / w / grid_w) * grid_w;
                //new_left = Math.round(w * new_left_ref / dashboard_ref_w) + x_offset;
                new_left = (w * new_left_ref / dashboard_ref_w) + x_offset;
                if (drag_type == "w_right" || drag_type == "both_rb" || drag_type == "both_rt") {
                    var new_width_ref = Math.round(new_width * dashboard_ref_w / w / grid_w) * grid_w;
                    //new_width = Math.round(w * new_width_ref / dashboard_ref_w);
                    new_width = (w * new_width_ref / dashboard_ref_w);
                } else {
                    new_width = startRight - new_left;  // pour pas que la position du right change
                }
            //}
            element.style.width = new_width + "px";
            element.style.left = new_left + "px";
            elt_box.style.width = new_width + "px";
            elt_box.style.left = new_left + "px";
            elt_box_border.style.width = new_width + "px";
            elt_box_border.style.left = new_left + "px";
            elt_box_no_border.style.width = new_width + "px";
            if (advanced["header_x_offset_" + name_highlighted + d]) {
                elt_box_no_border.style.left = new_left + advanced["header_x_offset_" + name_highlighted + d] * w / dashboard_ref_w + "px";
            } else {
                elt_box_no_border.style.left = new_left + "px";
            }
            if (advanced["header_position_" + name_highlighted + d] == 0 || advanced["header_position_" + name_highlighted + d] == 2) {  // Header en haut
                elt.style.width = new_width - (box_left_width + box_right_width) * w / dashboard_ref_w + "px";
                if (advanced["header_is_foreground_" + name_highlighted + d] && advanced["header_disp_" + name_highlighted + d]) {
                    elt_label.style.width = new_width - (0 + 0) * w / dashboard_ref_w + "px";
                } else {
                    elt_label.style.width = new_width - (box_left_width + box_right_width) * w / dashboard_ref_w + "px";
                }
                if (advanced["header_text_orientation_" + name_highlighted + d] == 0) {  // horizontal
                    //
                } else {  // vertical
                    if (advanced["header_is_foreground_" + name_highlighted + d] && advanced["header_disp_" + name_highlighted + d]) {
                        elt_label.style.lineHeight = new_width - (0 + 0 + label_left_width + label_right_width) * w / dashboard_ref_w + "px";
                    } else {
                        elt_label.style.lineHeight = new_width - (box_left_width + box_right_width + label_left_width + label_right_width) * w / dashboard_ref_w + "px";
                    }
                }
            } else {  // Header à gauche
                if (advanced["header_is_foreground_" + name_highlighted + d] && advanced["header_disp_" + name_highlighted + d]) {
                    elt.style.width = new_width - (header_width + 0 + box_right_width + advanced["header_x_offset_" + name_highlighted + d]) * w / dashboard_ref_w + "px";
                } else {
                    elt.style.width = new_width - (header_width + box_left_width + box_right_width) * w / dashboard_ref_w + "px";
                }
            }
        }
        if (drag_type == "h_top" || drag_type == "h_bottom" || drag_type == "both_rb" || drag_type == "both_lt" || drag_type == "both_rt" || drag_type == "both_lb") {
            new_top = startTop;
            if (drag_type == "h_top" || drag_type == "both_lt" || drag_type == "both_rt") {
                new_height = startHeight - e.clientY + startY;
                new_top = startTop + e.clientY - startY;
            } else {
                new_height = startHeight + e.clientY - startY;
            }
            //if (advanced["grid_snap" + d]) {
                var new_top_ref = Math.round((new_top - y_offset) * dashboard_ref_w / w / grid_h) * grid_h;
                //new_top = Math.round(w * new_top_ref / dashboard_ref_w) + y_offset;
                new_top = (w * new_top_ref / dashboard_ref_w) + y_offset;
                if (drag_type == "h_bottom" || drag_type == "both_rb" || drag_type == "both_lb") {
                    var new_height_ref = Math.round(new_height * dashboard_ref_w / w / grid_h) * grid_h;
                    //new_height = Math.round(w * new_height_ref / dashboard_ref_w);
                    new_height = (w * new_height_ref / dashboard_ref_w);
                } else {
                    new_height = startBottom - new_top;  // pour pas que la position du bottom change
                }
            //}
            element.style.height = new_height + "px";
            element.style.top = new_top + "px";
            elt_box.style.height = new_height + "px";
            elt_box.style.top = new_top + "px";
            elt_box.style.lineHeight = new_height + "px";
            elt_box_border.style.height = new_height + "px";
            elt_box_border.style.top = new_top + "px";
            elt_box_border.style.lineHeight = new_height + "px";
            elt_box_no_border.style.height = new_height + "px";
            if (advanced["header_disp_" + name_highlighted + d]) {
                elt_box_no_border.style.top = new_top + advanced["header_y_offset_" + name_highlighted + d] * w / dashboard_ref_w + "px";
            } else {
                elt_box_no_border.style.top = new_top + "px";
            }
            elt_box_no_border.style.lineHeight = new_height + "px";
            if (advanced["header_position_" + name_highlighted + d] == 0) {  // Header en haut
                if (advanced["header_is_foreground_" + name_highlighted + d] && advanced["header_disp_" + name_highlighted + d]) {
                    elt.style.height = new_height - (header_width + 0 + box_bottom_width + advanced["header_y_offset_" + name_highlighted + d]) * w / dashboard_ref_w + "px";
                    elt.style.lineHeight = new_height - (header_width + 0 + box_bottom_width + advanced["header_y_offset_" + name_highlighted + d]) * w / dashboard_ref_w + "px";
                } else {
                    elt.style.height = new_height - (header_width + box_top_width + box_bottom_width) * w / dashboard_ref_w + "px";
                    elt.style.lineHeight = new_height - (header_width + box_top_width + box_bottom_width) * w / dashboard_ref_w + "px";
                }
            } else if (advanced["header_position_" + name_highlighted + d] == 2) {  // Header en bas
                if (advanced["header_is_foreground_" + name_highlighted + d] && advanced["header_disp_" + name_highlighted + d]) {
                    elt.style.height = new_height - (header_width + box_top_width + 0 - advanced["header_y_offset_" + name_highlighted + d]) * w / dashboard_ref_w + "px";
                    elt.style.lineHeight = new_height - (header_width + box_top_width + 0 - advanced["header_y_offset_" + name_highlighted + d]) * w / dashboard_ref_w + "px";
                    elt_label.style.top = new_height - (header_width + 0) * w / dashboard_ref_w + "px";
                } else {
                    elt.style.height = new_height - (header_width + box_top_width + box_bottom_width) * w / dashboard_ref_w + "px";
                    elt.style.lineHeight = new_height - (header_width + box_top_width + box_bottom_width) * w / dashboard_ref_w + "px";
                    elt_label.style.top = new_height - (header_width + box_top_width) * w / dashboard_ref_w + "px";
                }
            } else {  // Header à gauche
                elt.style.height = new_height - (box_top_width + box_bottom_width) * w / dashboard_ref_w + "px";
                elt.style.lineHeight = new_height - (box_top_width + box_bottom_width) * w / dashboard_ref_w + "px";
                if (advanced["header_text_orientation_" + name_highlighted + d] == 0) {
                    if (advanced["header_is_foreground_" + name_highlighted + d] && advanced["header_disp_" + name_highlighted + d]) {
                        elt_label.style.height = new_height - (0 + 0) * w / dashboard_ref_w + "px";
                        elt_label.style.lineHeight = new_height - (0 + 0 + label_top_width + label_bottom_width) * w / dashboard_ref_w + "px";
                    } else {
                        elt_label.style.height = new_height - (box_top_width + box_bottom_width) * w / dashboard_ref_w + "px";
                        elt_label.style.lineHeight = new_height - (box_top_width + box_bottom_width + label_top_width + label_bottom_width) * w / dashboard_ref_w + "px";
                    }
                } else {
                    if (advanced["header_is_foreground_" + name_highlighted + d] && advanced["header_disp_" + name_highlighted + d]) {
                        elt_label.style.height = new_height - (0 + 0) * w / dashboard_ref_w + "px";
                    } else {
                        elt_label.style.height = new_height - (box_top_width + box_bottom_width) * w / dashboard_ref_w + "px";
                    }
                }
            }
        }

        if (elt_box_cont != null) {
            elt_box_cont.style.top = elt_box.style.top;
            elt_box_cont.style.left = elt_box.style.left;
            elt_box_cont.style.width = elt_box.style.width;
            elt_box_cont.style.height = elt_box.style.height;
        }

    }
    function stopDrag() {
        document.documentElement.removeEventListener("mousemove", doDrag, false);
        document.documentElement.removeEventListener("mouseup", stopDrag, false);
        is_resizing = false;
        apply_drag_and_resize(move_x, move_y, move_w, move_h);
    }
}


function apply_drag_and_resize(move_x, move_y, move_w, move_h) {

    var new_x = (parseFloat(document.getElementById("highlight_elt_cont").style.left) - x_offset) * dashboard_ref_w / w;
    var new_y = (parseFloat(document.getElementById("highlight_elt_cont").style.top) - y_offset) * dashboard_ref_w / w;
    var new_w = parseFloat(document.getElementById("highlight_elt_cont").style.width) * dashboard_ref_w / w;
    var new_h = parseFloat(document.getElementById("highlight_elt_cont").style.height) * dashboard_ref_w / w;

    // On vérifie que new_x, new_y, new_w et new_h sont bien des nombres pour éviter les crashes du serveur JRT
    if (!isNaN(new_x) && !isNaN(new_y) && !isNaN(new_w) && !isNaN(new_h)) {
        // On arrondi car ça n'a pas de sens d'avoir des valeurs décimales
        new_x = Math.round(new_x);
        new_y = Math.round(new_y);
        new_w = Math.round(new_w);
        new_h = Math.round(new_h);

        if (move_x)
            advanced["x_" + name_highlighted + d_highlighted] = new_x;
        if (move_y)
            advanced["y_" + name_highlighted + d_highlighted] = new_y;
        if (move_w)
            advanced["w_" + name_highlighted + d_highlighted] = new_w;
        if (move_h)
            advanced["h_" + name_highlighted + d_highlighted] = new_h;
        responsive_dim();

        ws.send("dashboard_element_move_or_resize;" + window_name + ";" + window_shortname + ";" + name_highlighted + d_highlighted + ";" + advanced["x_" + name_highlighted + d_highlighted] + ";" + advanced["y_" + name_highlighted + d_highlighted] + ";" + advanced["w_" + name_highlighted + d_highlighted] + ";" + advanced["h_" + name_highlighted + d_highlighted]);
    }
}


function init_var() {

    // Make the DIV element draggagle:
    is_resizing = false;
    initDragElement();
    initResizeElement();


    // On détecte si la page est lancée en local ou depuis l'extérieur (on activera alors la version broadcast)
    /*h = window.location.hostname
    if (h) {
        b = /[0-9]+[.][0-9]+[.][0-9]+[.][0-9]+/.test(h)    // Fait un test pour savoir si le hostname est une adresse ip
    } else {
        b = true
    }

    if (internetIP == "not needed") {
        broadcast = 0;
    } else {
        if (h != "localhost" & (h == internetIP | !b)) {
            broadcast = 1
        } else {
            broadcast = 0
        }

        // On peut forcer le broadcast
        if (window.location.href.split('?').length > 1 && window.location.href.split('?')[1] == "b") {
            broadcast = 1
        }
    }*/

    donnees = {};
    donnees_new = {};
    sessionnum = 0;
    sessionid = 0;
    type_session = "";
    name_session = "";
    fuelfactor = 1;
    speedfactor = 1;
    selected_idx = -1;
    selected_idxold = -1;
    selected_idxjs = -1;
    selected_idxjsold = 1;
    lastlap = [];
    bestlap = [];
    besttag = 0;
    lasttag = 0;
    bestbestidx = 0;
    bestlastidx = 0;
    coef_w = 1;

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

    wait = 0;
    disp_param = 0;
    if (disp_kg_livre == 1) {
        coef_fuel = 0.75;
    } else {
        coef_fuel = 1;  // unités d'essence en litre par defaut (0.75 pour les kg)
    }
    calculations_mode = 0; // 0 -> calculs en tenant compte du dernier tour, 1 -> on tient compte de la moyenne des 5 derniers tours
    refuel_mode = 0;
    teamracing_received = 0;

    /*
    document.getElementById("app_name").innerHTML = "Joel Real Timing PRO v" + version;
    // S'il y a une nouvelle version on le signale
    if (lastversion != version)
        document.getElementById("app_name").innerHTML += " <span style='font-weight:bold;color:#ff0000;'>NEW version available !</span>";
    */

    bg = "#999999"; // couleur du drapeau par défaut à l'ouverture
    sof_displayed = 0;
    nb_drivers = 0;

    donnees_defined = 0;

    update_tick_old = 0;

    trackname = "init";

    coef_ = [];
    coef_old_ = [];
    for (i = 0; i<64; i++) {
        coef_[i] = {}
        coef_old_[i] = {}
        coef_[i]["a"] = 0;
        coef_[i]["b"] = 0;
        coef_[i]["c"] = 0;
        coef_[i]["d"] = 0;
        coef_old_[i]["a"] = 0;
        coef_old_[i]["b"] = 0;
        coef_old_[i]["c"] = 0;
        coef_old_[i]["d"] = 0;
    }

    try_expired = 0;

    //window_name = document.title;

    /*if (tires_buttons == 0) {
        document.getElementById("tires").style.display = "none";
    } else {
        document.getElementById("tires").style.display = "block";
    }*/



    // Création des canvas pour les delta graphs
    canvas_pre = document.querySelector('#canvas_pre');
    context_pre = canvas_pre.getContext('2d');
    canvas_post = document.querySelector('#canvas_post');
    context_post = canvas_post.getContext('2d');
    context = [];
    context[1] = context_pre;
    context[2] = context_post;

    canvasB_pre = document.querySelector('#canvasB_pre');
    contextB_pre = canvasB_pre.getContext('2d');
    canvasB_post = document.querySelector('#canvasB_post');
    contextB_post = canvasB_post.getContext('2d');
    contextB = [];
    contextB[1] = contextB_pre;
    contextB[2] = contextB_post;

    deltax = [];
    deltaxold = [];
    rel2 = [];
    rel2old = [];
    rel2start = [];
    rel2startok = [];
    init_delta = [];
    for (i = 1; i < 3; i++) {
        deltax[i] = 0
        deltaxold[i] = 0
        rel2[i] = 0;
        rel2old[i] = [];
        rel2start[i] = 999999;
        rel2startok[i] = 0;
        init_delta[i] = 1;
    }

    for (j = 0; j < 64; j++) {
        rel2old[j] = [];
        for (i = 1; i < 3; i++) {
            rel2old[j][i] = 0
        }
    }

    barrex = [];
    barrexold = [];
    for (i = 0; i < 64; i++) {
        barrex[i] = 0;
        barrexold[i] = 0
    }

    // Création du canvas pour la boussole
    canvas_compass = document.querySelector('#canvas_compass');
    context_compass = canvas_compass.getContext('2d');

    display_rpmshift = 0;

    gear_ = {};
    shift_old = 0;
    rpm_old = 0;
    gear_old = 0;
    speed_old = 0;
    shift2 = 0;

    maxspeed_ = {};

    carname = "";

    rpm_coef_a = 0;
    rpm_coef_b = 0;
    max_rpm = 1;
    red_rpm = 1;

    bg_flag = "#bbbbbb";
    bg_flag_old = bg_flag;
    bg_flag_start_time = 0;

    update_telemetry_status = 0;

}

pro_expired = -1;
pro_expired_old = -1;

dashboard_online_folder = "";

fnman_disp_temporary_tstamp = 0;  // sert à afficher temporairement le fuelneed_man réglé quand on change la valeur
fnman_old = 0;  // pour savoir si le fuelneed_man a changé
fn_auto_offset_disp_temporary_tstamp = 0;  // sert à afficher temporairement le fuelneed_auto_offset réglé quand on change la valeur
fn_auto_offset_old = 0;  // pour savoir si le fuelneed_auto_offset a changé
fn_dont_change_colors = 0;
fn_signe = "";  // permet d'afficher le signe pour le fuelneed_auto_offset

frame_src_selected = {}; // Servira à savoir si l'url du frame doit être mise à jour ou pas
for (var i = 0; i < 4; i++) {
    frame_src_selected[i] = "";
}

cache_pre = 0;
cache_post = 0;
cache_pre_old = 0;
cache_post_old = 0;

force_update_data_type1 = false;

shiftlight_gear_rpm_speed_is_on = false;  // permet de prioriser le chgt bg du gear/rpm/speed par rapport au status du DRS

/*gear_default_bg = null;
gear_default_col = null;
rpm_default_bg = null;
rpm_default_col = null;
speed_default_bg = null;
speed_default_col = null;*/

// Pour mémoriser les valeurs par défaut au moment du chargement de la page pour pouvoir restituer les valeurs par défaut des options supplémentaires
bg_default_value = {};
font_col_default_value = {};
font_family_default_value = {};
font_weight_default_value = {};
font_style_default_value = {};
for (var i in modlist) {
    var name = modlist[i];
    bg_default_value[name] = null;
    font_col_default_value[name] = null;
    font_family_default_value[name] = null;
    font_weight_default_value[name] = null;
    font_style_default_value[name] = null;
}

num_led = 0;

name_highlighted = null;
d_highlighted = null;

filename_loc_old = null;
filename_loc_fg_old = null;
transparency_OBS_old = null;

// Liste des noms acceptant les couleurs de class pour le bg et le font color
special_options_list = {};

//add_carclasscolor_option_list = {};
//add_carclasscolor_option_list["pre"] = {
special_options_list["add_carclasscolor_option_pre"] = {
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
//add_carclasscolor_option_list["me"] = {
special_options_list["add_carclasscolor_option_me"] = {
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
//add_carclasscolor_option_list["post"] = {
special_options_list["add_carclasscolor_option_post"] = {
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
special_options_list["add_carclasscolor_option"] = $.extend(true, special_options_list["add_carclasscolor_option_pre"], special_options_list["add_carclasscolor_option_me"], special_options_list["add_carclasscolor_option_post"]);

deplacement_x = 1;
deplacement_y = 1;


// On permet l'utilisation des flèches pour déplacer l'élément sélectionné
window.addEventListener('keydown', function(event) {
    //console.log(event.key, name_highlighted, d_highlighted);
    if (name_highlighted != null && d_highlighted != null) {
        switch (event.key) {
            case "Shift":
                deplacement_x = Math.max(advanced["grid_w" + d], 1);
                deplacement_y = Math.max(advanced["grid_h" + d], 1);
                break;
            case "ArrowLeft":
                //Left pressed
                advanced["x_" + name_highlighted + d_highlighted] -= deplacement_x;
                responsive_dim();
                ws.send("dashboard_element_move_or_resize;" + window_name + ";" + window_shortname + ";" + name_highlighted + d_highlighted + ";" + advanced["x_" + name_highlighted + d_highlighted] + ";" + advanced["y_" + name_highlighted + d_highlighted] + ";" + advanced["w_" + name_highlighted + d_highlighted] + ";" + advanced["h_" + name_highlighted + d_highlighted]);
                break;
            case "ArrowRight":
                //Right pressed
                advanced["x_" + name_highlighted + d_highlighted] += deplacement_x;
                responsive_dim();
                ws.send("dashboard_element_move_or_resize;" + window_name + ";" + window_shortname + ";" + name_highlighted + d_highlighted + ";" + advanced["x_" + name_highlighted + d_highlighted] + ";" + advanced["y_" + name_highlighted + d_highlighted] + ";" + advanced["w_" + name_highlighted + d_highlighted] + ";" + advanced["h_" + name_highlighted + d_highlighted]);
                break;
            case "ArrowUp":
                //Up pressed
                advanced["y_" + name_highlighted + d_highlighted] -= deplacement_x;
                responsive_dim();
                ws.send("dashboard_element_move_or_resize;" + window_name + ";" + window_shortname + ";" + name_highlighted + d_highlighted + ";" + advanced["x_" + name_highlighted + d_highlighted] + ";" + advanced["y_" + name_highlighted + d_highlighted] + ";" + advanced["w_" + name_highlighted + d_highlighted] + ";" + advanced["h_" + name_highlighted + d_highlighted]);
                break;
            case "ArrowDown":
                //Down pressed
                advanced["y_" + name_highlighted + d_highlighted] += deplacement_x;
                responsive_dim();
                ws.send("dashboard_element_move_or_resize;" + window_name + ";" + window_shortname + ";" + name_highlighted + d_highlighted + ";" + advanced["x_" + name_highlighted + d_highlighted] + ";" + advanced["y_" + name_highlighted + d_highlighted] + ";" + advanced["w_" + name_highlighted + d_highlighted] + ";" + advanced["h_" + name_highlighted + d_highlighted]);
                break;
        }
    }
});
window.addEventListener('keyup', function(event) {
    switch (event.key) {
        case "Shift":
            deplacement_x = 1;
            deplacement_y = 1;
            break;
    }
});


// On initialize les couleurs
function init_colorize() {
    if (colorize_drivers_init == 3) {
        if (donnees.teamracing) {
            colorize_ = colorize_team_;
        } else {
            colorize_ = colorize_driver_;
        }
        colorize_drivers_init = 0;
    }
}

// Variables globales ou variable à initialiser qu'au chargement de la page

colorize_drivers_init = 3;
colorize_driver_ = {};
colorize_team_ = {};
