var NameSpace_Nicolas_Slider = NameSpace_Nicolas_Slider || {};

//Funktions Scope Erzeugen und Ausführen: (function(){...})()
//Am Ende öffentliche API mit 'return + Objektliteral'
NameSpace_Nicolas_Slider.Modul_Allein = (function () {
    //'use strict';
    window.onerror = function (e) { alert(e); };

    var mar_bor_pad, obererWert, sliderX_Laenge_20;
    var textX, sliderX, reglerX;

    function sliderStart(obererWert_, sliderX_) {
        //obererWert Global machen für function reglerWert()
        obererWert = obererWert_;
        //Global machen der Elemente:
        sliderX = sliderX_;
        textX = sliderX_.previousElementSibling;
        reglerX = sliderX_.firstElementChild.nextElementSibling;

        //länge Auslesen um oberen Wert zu Berechnen
        sliderX_Laenge_20 = sliderX.getAttribute('width') - 20;

        text_alle_StyleSet();
        slider_alle_StyleSet_HandlerClick();

        //Style Eigenschaften auslesen:
        var sliderX_styles = window.getComputedStyle(sliderX);
        var sliderX_styles_margin = parseInt(sliderX_styles.marginLeft, 10);
        var sliderX_styles_border = parseInt(sliderX_styles.borderLeftWidth, 10);
        var sliderX_styles_padding = parseInt(sliderX_styles.paddingLeft, 10);
        //Addieren von Margin + Border + Padding für screenX
        mar_bor_pad = sliderX_styles_margin + sliderX_styles_border + sliderX_styles_padding;

        //Events registieren
        sliderX.addEventListener('dragstart', function (e) { e.preventDefault() }, false);

        //text1 unsichtbar machen
        sliderX.addEventListener('mousedown', function (e) { textX.style.visibility = 'visible'; }, false);
        document.addEventListener('mouseup', function (e) { textX.style.visibility = 'hidden'; }, false);

        sliderX.addEventListener('mousedown', mouseMove, false);
        sliderX.addEventListener('mousemove', mouseMove, false);
    }

    function text_alle_StyleSet() {
        //Textfeld verstecken
        textX.style.visibility = 'hidden';
        textX.style.display = 'block';
        textX.style.position = 'relative';
        textX.style.top = '20px';
        textX.style.fontSize = '1.5em';
        //text1.style.left siehe bei Funktion mouseMove()

    }

    function slider_alle_StyleSet_HandlerClick() {
        //style oder setAttribute!
        /*svg_slider.setAttribute('style', 'margin: 3px 30px 30px 30px');*/
        sliderX.style.margin = '3px 30px 0px 30px'
        sliderX.style.border = '4px solid fuchsia';
        sliderX.style.backgroundColor = 'lawngreen';
        //Höhe unverstellbar hier
        sliderX.setAttribute('height', '80');

        //IE kennt chlidren nicht!!! :((((

        //Anschrift SliderX mittig:(2 Gleichwertige Möglichkeiten!):
        sliderX.firstElementChild.setAttribute('x', (sliderX_Laenge_20 - 80) / 2);

        //Führungsschienen Länge gleich wie Slieder wegen IE!
        sliderX.lastElementChild.previousElementSibling.setAttribute('x2', sliderX_Laenge_20 + 20);
        sliderX.lastElementChild.setAttribute('x2', sliderX_Laenge_20 + 20);
        //Weiter Möglichkeiten für das gleiche:
        //sliderX.childNodes[11].setAttribute('x2',sliderX_Laenge_20 + 20);
        //sliderX.firstElementChild.nextElementSibling.nextElementSibling.setAttribute('x2',sliderX_Laenge_20 + 20);
    }

    var AktuellX;

    function mouseMove(e) {
        //Nur wenn left Button gedrückt
        if (e.buttons === 1) {
            //Auslesen der Position der Maus von linkem Rand des Parent Node
            // Wäre optimal wenn es nicht Flackern würde im Fire Fox :(((
            AktuellX = e.clientX;

            //Minus halbe Breite von regler1 für Cursor in der Mitte
            //IE kennt window.scrollX nicht! :(
            if (window.scrollX != undefined) {
                AktuellX -= (mar_bor_pad + 10 - window.scrollX);
            } else {
                AktuellX -= (mar_bor_pad + 10 - window.pageXOffset);
            }

            //Anschlag Unten + Oben!
            if (AktuellX < 0) AktuellX = 0;
            if (AktuellX > sliderX_Laenge_20) AktuellX = sliderX_Laenge_20;

            reglerWert();

            //RegelKnopf Position
            reglerX.setAttribute('x', AktuellX);
            //Position text1-Feld (relativ)
            textX.style.left = mar_bor_pad + AktuellX + 'px';
        }
    }

    var wert;

    function reglerWert() {
        wert = AktuellX / (sliderX_Laenge_20 / obererWert);
        textX.value = wert;

        //Event Aufruf bzw. Senden***********************
        //über Globales window Objekt! :))))
        if (window.oninput_myslider)
            window.oninput_myslider(wert)
        //**************************************************
    }




    //öffentliche Schnittstelle: 'return + Objektliteral'
    return {
        //Nur Name rausreichen keine Klammern!!
        'sliderStart': sliderStart
    }
})();



