// connections websocket avec le serveur Python
function init_ws() {
    ws_boucle = null;  // important pour éviter un message d'erreur dans config.js

    if (broadcast == 0) {
        try {
            ws = new WebSocket("ws://" + localIP + ":" + PORT8001 + "/");
        } catch (error) {
            // on réessaie plus tard
            setTimeout(function () { init_ws(); },1000);
            return;
        }
        // Socket for the local communications
		ws.onmessage = function(d) {
            var datas = d.data;
            if (datas != "wait") {
                //if (local_tick2 <= local_tick) {
                    update_datas(datas);
                //}
                wait = 0;
            } else
                wait = 1
        };
		ws.onclose = function() {
            //setTimeout(function () {location.reload()},5000);
            setTimeout(function () { clearInterval(ws_boucle); init_ws(); },1000);
            ws.close();
        };
		window.onbeforeunload = function() {
			ws.onclose = function () {}; // disable onclose handler first
			ws.close()
		};
        ws.onopen = function () {
            ws.send("window_shortname;" + window_shortname);

            ws.send("21");
            ws.send("window;"+window_name+";"+window_x+";"+window_y+";"+window_w+";"+window_h+";"+window_alpha+";"+window_topmost+";"+window_borders + ";" + window_click_through);

            if (window_iracing_control == 1) {
                if (iracing_fullscreen == 1) {
                    window_iracing_borders = 0;
                    ws.send("window;iRacing.com Simulator;0;0;0;0;-1;-1;0;-1");
                } else
                    ws.send("window;iRacing.com Simulator;" + window_iracing_x + ";" + window_iracing_y + ";" + window_iracing_w + ";" + window_iracing_h + ";-1;" + window_iracing_topmost + ";" + window_iracing_borders + ";-1");
            }

            t0_typ2_ms = parseInt(Date.now());

            // We define the refresh rate for the datas
            if (fps_calculator > 60) fps_calculator = 60;  // On limite à 60 les fps
            if (fps_calculator <= 0) fps_calculator = 0.001;
            fps_original = fps_calculator;
            ws_boucle = setInterval(function () {
                //if ((wait == 0) && (ws.bufferedAmount == 0) && (ws.readyState == ws.OPEN)) {   // On vérifie que tout a bien déjà été envoyé
                if (wait == 0 && ws.readyState == ws.OPEN) {  // on ne fait plus le test ws.bufferedAmount == 0 car ça semble bugguer
                    ws.send("22")
                }
            }, 1000 / fps_calculator);

            if (drag_overlays) {
                window_move_boucle = setInterval(window_move_boucle_fct, 500);
            }

        };
    }
    if (broadcast == 1) {
        try {
            ws3 = new WebSocket("ws://"+internetIP+":" + PORT8003 + "//");
        } catch (error) {
            // on réessaie plus tard
            setTimeout(function () { init_ws(); },1000);
            return;
        }
        // Socket for the broadcast communications
		ws3.onmessage = function(d) {
            var datas = d.data;
            update_datas(datas);
        };
		ws3.onclose = function() {
            //setTimeout(function () {location.reload()},5000);
            setTimeout(function () { clearInterval(ws_boucle); init_ws(); },1000);
            ws3.close();
        };
		window.onbeforeunload = function() {
			ws3.onclose = function () {}; // disable onclose handler first
			ws3.close()
		};
        ws3.onopen = function () {
            ws3.send("window_shortname;" + window_shortname);

            ws3.send("21");
            // We define the refresh rate for the datas
            ws_boucle = setInterval(function(){
                //if (ws3.bufferedAmount == 0 && (ws3.readyState == ws3.OPEN)) {
                if (ws3.readyState == ws3.OPEN) {  // on ne fait plus le test ws.bufferedAmount == 0 car ça semble bugguer
                    ws3.send("22")
                }
            } , 1000/fps_broadcast);

        };
    }
}
