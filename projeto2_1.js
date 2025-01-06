var map=L.map(document.getElementById("mapDIV"),
{
    center: [42.3601, -71.0589 ],
    zoom: 12
});
var basemap =L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {});
basemap.addTo(map);

//Carregar Geojson dos pontos
var crimes = L.geoJSON(crimes, {
    onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.city && feature.properties.businessna) {
            layer.bindTooltip('Crime'+ 
                '<br/>Cidade: ' + feature.properties.city + '<br/>Estabelecimento: ' + feature.properties.businessna);
        } else {
            layer.bindTooltip('Cidade: Não especificada');
        }
    },
    style: {
    color:'#800000',
    weight:2,
    dashArray:'12 8 12'
    }
});
crimes.addTo(map)


var thecrimes= L.geoJSON (thecrimes, {
    pointToLayer: function (feature, latlng){
        //O código abaixo serve para diferenciar estações de apeadeiros
        if (feature.properties.Ano == "2015"){ 
            return L.circleMarker(latlng, {radius: 4, color: '#00008b',
                                        fillOpacity:1});
            }
        else if (feature.properties.Ano == "2016"){ 
            return L.circleMarker(latlng, {radius: 4, color: 'green',
                                        fillOpacity:1});
            }
        else if (feature.properties.Ano == "2017"){ 
            return L.circleMarker(latlng, {radius: 4, color: 'orange',
                                            fillOpacity:1});
            }
        else if (feature.properties.Ano == "2018"){ 
            return L.circleMarker(latlng, {radius: 4, color: 'yellow',
                                                fillOpacity:1});
            }
        else if (feature.properties.Ano == "2019"){ 
            return L.circleMarker(latlng, {radius: 4, color: 'purple',
                                                    fillOpacity:1});
            }
        else{
            return L.circleMarker(latlng, {radius: 4, color: '#FF0000',
                                                    fillOpacity:1 });
        }
    },
    onEachFeature: function (feature, layer){
        var designacao = feature.properties.descript;
        var oano = feature.properties.Ano;

        //O cógigo abaixo serve para mostrar a variavel dos anos

        if (feature.properties.Ano== "2015"){

            layer.bindPopup('<br/>Tipo de Crime: ' + designacao + 
                            '<br/>Ano: ' + oano);
            layer.on('mouseover', function() {layer.openPopup();});
            layer.on('mouseout', function() {layer.closePopup();});  
        }
        else if(feature.properties.Ano== "2016"){

            layer.bindPopup('<br/>Tipo de Crime: ' + designacao + 
                            '<br/>Ano: ' + oano);
            layer.on('mouseover', function() {layer.openPopup();});
            layer.on('mouseout', function() {layer.closePopup();});  
        }
        else if(feature.properties.Ano== "2017"){

            layer.bindPopup('<br/>Tipo de Crime: ' + designacao + 
                            '<br/>Ano: ' + oano);
            layer.on('mouseover', function() {layer.openPopup();});
            layer.on('mouseout', function() {layer.closePopup();});  
        }
        else if(feature.properties.Ano== "2018"){

            layer.bindPopup('<br/>Tipo de Crime: ' + designacao + 
                            '<br/>Ano: ' + oano);
            layer.on('mouseover', function() {layer.openPopup();});
            layer.on('mouseout', function() {layer.closePopup();});  
        }
        else if(feature.properties.Ano== "2019"){
            layer.bindPopup('<br/>Tipo de Crime: ' + designacao + 
                            '<br/>Ano: ' + oano);
            layer.on('mouseover', function() {layer.openPopup();});
            layer.on('mouseout', function() {layer.closePopup();});  
        }
        else if(feature.properties.Ano== "2020")
            layer.bindPopup('<br/>Tipo de Crime: ' + designacao + 
                            '<br/>Ano: ' + oano);
            layer.on('mouseover', function() {layer.openPopup();});
            layer.on('mouseout', function() {layer.closePopup();});  
        }
    });

thecrimes.addTo(map)

// Estado
var estado= L.geoJSON (estado, {
    pointToLayer: function (feature, latlng){
        //O código abaixo serve para diferenciar o estado dos crimes
        if (feature.properties.licstatus == "Active"){ 
            return L.circleMarker(latlng, {radius:4 , color: 'green',
                                        fillOpacity:1});
            }
        else{
            return L.circleMarker(latlng, {radius: 4, color: 'red',
                fillOpacity:1});
        }
    },
    onEachFeature: function (feature, layer){
        var oestado = feature.properties.licstatus;
        var onivel =feature.properties.viollevel;


        if (feature.properties.licstatus== "Active"){
            layer.bindPopup('<br/>Estado: ' + oestado + '<br/>Nível de crime: ' + onivel);
            layer.on('mouseover', function() {layer.openPopup();});
            layer.on('mouseout', function() {layer.closePopup();});  
        }
        else (feature.properties.licstatus== "Inactive")
            layer.bindPopup('<br/>Estado: ' + oestado + '<br/>Nível de crime: ' + onivel);
            layer.on('mouseover', function() {layer.openPopup();});
            layer.on('mouseout', function() {layer.closePopup();});  
        }
    });

estado.addTo(map)

//POP-UP COM COORDENADAS DE ONDE SE CLICA
var popup = L.popup();
function onMapClick(e) {
popup
    .setLatLng(e.latlng)
    .setContent("Clicou no mapa em " + e.latlng.toString().substring(7,e.latlng.toString().length-1))
    .openOn(map);
}
map.on('click', onMapClick);

//ADIÇÃO DA ESCALA
var scale = L.control.scale();
scale.addTo(map);

//Criar os seletores de basemap e camadas de visualização
var baselayers = {
    'mapa':basemap
};

var overlays = {
    'Crimes': crimes,
    'Anos': thecrimes,
    'Estado': estado,
};

L.control.layers(baselayers, overlays).addTo(map);
