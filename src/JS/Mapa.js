// Variables y Objetos globales.
var v_mapa = null;
var v_layer_departamentos = null;
var v_latitude = null;
var v_longitude = null;
var v_zoom = null;
var v_minZoom_Mapa = null;
var v_maxZoom_Mapa = null;

function loadMapa(){
    v_longitude = -58.30051;
    v_latitude = -24.10655;
    v_zoom = 7;
    v_minZoom_Mapa = 7;
    v_maxZoom_Mapa = 7;

    v_layer_departamentos = new ol.layer.Vector({
        name: 'Departamentos',
        source: new ol.source.Vector({
            //url: '../Recursos/Datos/Departamentos.topo.json',
            url: '../Recursos/Datos/Departamentos.geojson',
            //format: new ol.format.TopoJSON(),
            format: new ol.format.GeoJSON(),
            attributions: [
                new ol.Attribution({
                    html: '<a href="http://www.openstreetmap.org/" target="_blank">OSM</a>'
                })
            ]
        }),
        style: function(p_feature, p_resolution) {
            var v_propiedades = p_feature.getProperties();
            var style = [new ol.style.Style({
                fill: new ol.style.Fill({
                    color: '#FEFEE9'        // Beige.
                }),
                stroke: new ol.style.Stroke({
                    color: '#7C7C79',       // Gris oscuro.
                    width: 1
                }),
                text: new ol.style.Text({
                    textAlign: "Start",
                    textBaseline: "Middle",
                    font: 'Normal 12px Arial',
                    text: p_feature.get('número') + "- " + p_feature.get('name'),
                    stroke: new ol.style.Stroke({
                        color: '#0645AD',   // Azul.
                        width: 1
                    }),
                    offsetX: 0,
                    offsetY: 0,
                    rotation: 0
                })
            })];
            return style;
        }
    });

    // Array de departamentos.
    var v_array_departamentos = [{
        // Departamento 1 (Concepción).
        longitud: -57.3067,
        latitud: -22.9927,
        icono: "../Recursos/Imagenes/Concepción.png"
    },{
        // Departamento 2 (San Pedro).
        longitud: -56.7699,
        latitud: -24.3826,
        icono: "../Recursos/Imagenes/SanPedro.png"
    },{
        // Departamento 3 (Cordillera).
        longitud: -56.9700,
        latitud: -25.5022,
        icono: "../Recursos/Imagenes/Cordillera.png"
    },{
        // Departamento 4 (Guairá).
        longitud: -56.3042,
        latitud: -26.0000,
        icono: "../Recursos/Imagenes/Guairá.png"
    },{
        // Departamento 5 (Caaguazú).
        longitud: -55.8707,
        latitud: -25.3188,
        icono: "../Recursos/Imagenes/Caaguazú.png"
    },{
        // Departamento 6 (Caazapá).
        longitud: -55.9490,
        latitud: -26.3851,
        icono: "../Recursos/Imagenes/Caazapá.png"
    },{
        // Departamento 7 (Itapúa).
        longitud: -55.8955,
        latitud: -27.0899,
        icono: "../Recursos/Imagenes/Itapúa.png"
    },{
        // Departamento 8 (Misiones).
        longitud: -57.0099,
        latitud: -27.2099,
        icono: "../Recursos/Imagenes/Misiones.png"
    },{
        // Departamento 9 (Paraguarí).
        longitud: -57.0899,
        latitud: -26.2599,
        icono: "../Recursos/Imagenes/Paraguarí.png"
    },{
        // Departamento 10 (Alto Paraná).
        longitud: -54.7500,
        latitud: -25.4799,
        icono: "../Recursos/Imagenes/AltoParaná.png"
    },{
        // Departamento 11 (Central).
        longitud: -57.4500,
        latitud: -25.7999,
        icono: "../Recursos/Imagenes/Central.png"
    },{
        // Departamento 12 (Ñeembucú).
        longitud: -57.9499,
        latitud: -26.7999,
        icono: "../Recursos/Imagenes/Ñeembucú.png"
    },{
        // Departamento 13 (Amambay).
        longitud: -55.9700,
        latitud: -23.1522,
        icono: "../Recursos/Imagenes/Amambay.png"
    },{
        // Departamento 14 (Canindeyú).
        longitud: -55.2099,
        latitud: -24.2722,
        icono: "../Recursos/Imagenes/Canindeyú.png"
    },{
        // Departamento 15 (Presidente Hayes).
        longitud: -59.0099,
        latitud: -23.9900,
        icono: "../Recursos/Imagenes/PresidenteHayes.png"
    },{
        // Departamento 16 (Alto Paraguay).
        longitud: -58.9099,
        latitud: -21.0700,
        icono: "../Recursos/Imagenes/AltoParaguay.png"
    },{
        // Departamento 17 (Boquerón).
        longitud: -61.2899,
        latitud: -22.2000,
        icono: "../Recursos/Imagenes/Boquerón.png"
    }];

    var features = [], i, lat, lon, geom, feature, features = [], style;
    for(i = 0; i < v_array_departamentos.length; i++) {
        lon = v_array_departamentos[i].longitud;
        lat = v_array_departamentos[i].latitud;

        geom = new ol.geom.Point(
            [lon,lat]
        );
        feature = new ol.Feature(geom);
        features.push(feature);
        style = [
            new ol.style.Style({
                image: new ol.style.Icon(({
                    scale: 1,
                    anchor: [36,36],
                    anchorXUnits: 'pixel',
                    anchorYUnits: 'pixel',
                    src: v_array_departamentos[i].icono
                }))
            })
        ];
        feature.setStyle(style);
    }


    var vectorSource = new ol.source.Vector({
        features: features
    });
    var vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });

    v_mapa = new ol.Map({
        target: 'mapa',
        renderer: 'canvas',
        layers: [v_layer_departamentos,vectorLayer],
        controls: ol.control.defaults({}).extend([
            new ol.control.ScaleLine(),
            new ol.control.MousePosition({
                'projection': 'EPSG:4326',
                'coordinateFormat': ol.coordinate.createStringXY(4)
            })
        ]),
	    view: new ol.View({
            //extent: ['-58.399', '-24.631', '-58.399', '-22.400'],
            projection: 'EPSG:4326',
	        center: [v_longitude, v_latitude],
	        zoom: v_zoom,
            minZoom: v_minZoom_Mapa,
            maxZoom: v_maxZoom_Mapa
	    })
    });

    // Se crea un objeto popup para mostrar informaci\u00F3nn al hacer click en el mapa.
    var v_popup = new ol.Overlay.Popup();
    v_mapa.addOverlay(v_popup);

    // Se agrega un evento click al mapa.
    v_mapa.on('click', function(evt) {
        // Se esconde el objeto popup y se resetea el offset.
        v_popup.hide();
        v_popup.setOffset([0, 0]);

        var v_feature = v_mapa.forEachFeatureAtPixel(evt.pixel, function(p_feature, layer) {
            return p_feature;
        });

        if (v_feature) {
            var v_coordenadas = evt.coordinate;
            var v_propiedades = v_feature.getProperties();
            var v_info = '<div class="popup">';

            for(var k in v_propiedades) {
                var v = v_propiedades[k];

                // Como viene de la base de datos el campo todo en min\u00FAscula,
                // queremos tener la primera letra en may\u00FAscula.
                var v_etiqueta = k.charAt(0).toUpperCase() + k.slice(1)

                if(v_etiqueta == 'Wikipedia'){
                    if(v == null || v == ""){
                        v_info += '<b>' + "Sin Informaci\u00F3n" + '</b><br />';
                    }else{
                          v_info += '<b>' + "Wikipedia" + '</b>: <a href="' + v + '" target="_blank">' + "link" + '</a><br />';
                    }
                }else if (v_etiqueta == 'Geometry' || v_etiqueta == 'Osm_id'){
                     v_info += '';
                }else{
                     v_info += '<b>' + v_etiqueta + '</b>: ' + v + '<br />';
                }
            } // Fin del if.
            v_popup.setOffset([0, -22]);
            v_popup.show(v_coordenadas, v_info);
        }
    });



    // var highlightStyleCache = {};
    // var featureOverlay = new ol.FeatureOverlay({
    //     map: v_mapa,
    //     style: function(feature, resolution) {
    //         var text = resolution < 5000 ? feature.get('name') : '';
    //         if (!highlightStyleCache[text]) {
    //             highlightStyleCache[text] = [new ol.style.Style({
    //                 stroke: new ol.style.Stroke({
    //                     color: '#f00',
    //                     width: 1
    //                 }),
    //                 fill: new ol.style.Fill({
    //                     color: 'rgba(71,114,182,0.1)'
    //                 })
    //             })];
    //         }
    //         return highlightStyleCache[text];
    //     }
    // });
    //
    // var highlight;
    // var displayFeatureInfo = function(pixel) {
    //     var feature = v_mapa.forEachFeatureAtPixel(pixel, function(feature, layer) {
    //         return feature;
    //     });
    //
    //     if (feature !== highlight) {
    //         if (highlight) {
    //             featureOverlay.removeFeature(highlight);
    //         }
    //         if (feature) {
    //             featureOverlay.addFeature(feature);
    //         }
    //         highlight = feature;
    //     }
    // };
    //
    // v_mapa.on('pointermove', function(evt) {
    //     if (evt.originalEvent.type == 'mousemove') {
    //         var pixel = evt.pixel;
    //         displayFeatureInfo(pixel);
    //     }
    // });
}
