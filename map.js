/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Maps() {
    
    
    //defining variables which we can use for the latitude and longtitude 
    this.ImageDisplay = (Store = 'map', randomise = true, OrX = 0, OrY = 0, run = false) => {
    
        return new Promise(async (resolve, reject) => {
            
            this.Store = Store
            
            
            
            this.randomise = randomise
            
            
            
            this.OrX = OrX
            
             //var marker = new google.maps.Marker(
           //   {
             //     this.vlat
              //    maps: maps,
             //     title: 'Iz'
            
            this.OrY = OrY
            
            
                                   if (run) {
                
                var mapping = document.createElement('script');
                
                
           mapping.type = 'text/javascript';
           
           
           
           
                mapping.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=geometry,data,places,geocoding,drawing,directions`
                              mapping.async = false
                
                
                //This allows your API Key to be inserted, so that your map can be apparent 
                
                //if not used then the map will not be seen 
                mapping.id = 'mapScript'
                
                
                
                document.getElementsByTagName('head')[0].appendChild(mapping);
                
                
                
                                   await new Promise((rt, rjr) => {
                    mapping.addEventListener('load', () => {
                        rt()
                    })
                })
            }
          

            var lat = this.OrY
            
            //declaring the variables for latitude and longtitude (x and y)
            
            
            
            var lng = this.OrX
            
            var latLng = { lat: lat, lng: lng }
            
            
             //var marker = new google.maps.Marker(
           //   {
             //     position: random,
              //    maps: maps,
             //     title: 'I am here'
                  
            this.map = new google.maps.Map(document.getElementById(this.Store), {
                
                
                           center: latLng,
               
                
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
        })


    }

  
    this.Radius = (marker, radius, dir) => {
        
        
        
        
        
        var pi = Math.PI / 180;
        
        
                                             var r = 180 / Math.PI;
        var radia = 6.3781 * Math.pow(10, 6); //this adds the circles 

        var marks = 360;

        var lat1 = (radius / radia) * r;
        
        //while(Count2 * Count2 <= Count1) {
		//	if(Count1 % Count2 == 0) {
        var long1 = lat1 / Math.cos(marker.lat() * pi);


        var extp = new Array();
        
        
        
        if (dir == 1) { var start = 0; var end = marks + 1 }
        
        
        
        
        
        else { var start = marks + 1; var end = 0 }
        
        
        for (var i = start; (dir == 1 ? i < end : i > end); i = i + dir) {
            
            
                                var theta = Math.PI * (i / (marks / 2));
                                
            
       z = marker.lng() + (long1 * Math.cos(theta));
            
            
            
            y = marker.lat() + (lat1 * Math.sin(theta));
            
            
            extp.push(new google.maps.LatLng(y, z));
        }
        return extp;
    }

    // Button 1
    this.MarkAdd = () => {
        
        //while(Count2 * Count2 <= Count1) {
		//	if(Count1 % Count2 == 0) {
        
        
        var dropspot = new google.maps.LatLng((Math.random() * (85 * 2) - 85), (Math.random() * (180 * 2) - 180));
        
        
        this.map.setCenter(dropspot);
        
        var marker = new google.maps.Marker({
            
            
            position: dropspot,
            title: 'Random',
            
            
            
            //Add randoms markers for the button - and then anither further along
                                   map: this.map,
            draggable: false,
            
            
            
  
        });
        marker.addListener('click', () => {
            
            
            var center = google.maps.geometry.spherical.computeOffset(dropspot, 200 * 1000, 45)
            
                       this.map.setCenter(center);
                       
                       
                            new google.maps.Marker({
                                
                position: center,
                title: 'Randomer',
                
                
                map: this.map,
                
                                      draggable: false,
                                      icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                
            });
        });
    }


    // Button 2
    this.MarkerChoice = () => {
        
        
        
        confirm("Are you sure?")
        
        
                                  this.map.addListener('click', (e) => {
                                      
                       google.maps.event.clearListeners(this.map, 'click');
            var marker = new google.maps.Marker({
                
                
                
                position: e.latLng,
                
                
               
                title: 'Marker 1',
                
                map: this.map,
                draggable: false,
                
            });

            
            var shape = new google.maps.Polygon({  //Polygons and Circles are created 
                paths: [
                    this.Radius(e.latLng, 200 * 1000, 1),
                    
                    
                    this.Radius(e.latLng, 100 * 1000, -1)
                ],
                strokeColor: "#add8e6",
                
                
                
                strokeOpacity: 0.8,
                                 strokeWeight: 2,
                                 
                                 
                fillColor: "#add8e6",
                fillOpacity: 0.35
            });
            shape.setMap(this.map);

            
            var dist = (Math.random() * (200 - 100) + 100) * 1000;
            
            
            var angle = Math.random() * 360;
            
            //marker added in random position 
            var dropspotno2 = google.maps.geometry.spherical.computeOffset(e.latLng, dist, angle);
            
            
            
            
            new google.maps.Marker({
                                  position: dropspotno2,
                                  
                                  
                                  
                          title: 'Marker 2',
                          
                map: this.map,
                draggable: false,
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            });
        });
    }

    // Button 3
    this.CountryLand = () => {
        
        
        
                               var map = this.map;
                               
                               
        var countryName = prompt('The location I want is', '')
        
        $.getJSON(`https://nominatim.openstreetmap.org/search.php?q=${countryName}&polygon_geojson=1&format=json`, function (data) {
            
            
            if (data.length > 0) {
                
                //this is where it asks you to input your country in which it highlights 
                //and then put marks round it 
                               data = data[0];
                               
                               
                                  if (data.geojson) {
                                      
                                      
                    map.data.addGeoJson({
                        "type": "FeatureCollection",
                        "features": [
                            {
                                "type": "Feature",
                                "geometry": data.geojson
                            }
                        ]
                    });

                    map.data.setStyle({
                        strokeColor: "#add8e6",
                        
                        
                        strokeOpacity: 0.8,
                        
                        strokeWeight: 2,
                        
                        fillColor: "#add8e6",
                        
                        fillOpacity: 0.35
                    });

                    map.setCenter(new google.maps.LatLng({ lat: parseFloat(data.lat), lng: parseFloat(data.lon) }));
                    
                    
                    
                    
                    
                    //f
                    
                    
            
                    
                    
                    map.setZoom(4)

                    // add markers around the country
                    m1 = new google.maps.Marker({
                                    position: new google.maps.LatLng({
                                        
                                      lat: parseFloat(data.boundingbox[0]),
                            lng: parseFloat(data.boundingbox[2])
                            
                            
                        }),
                        
                            // check if context is in suspended state (autoplay policy)
   // if (audioCtx.state === 'suspended') {
   //     audioCtx.resume();
  //  }

  // if track is stopped, play it
   // if (this.getAttribute('class') ==
                        
                        
                        map,
                        
                                    draggable: false,
                                    
                        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    });
                    m2 = new google.maps.Marker({
                        
                        
                        position: new google.maps.LatLng({
                            lat: parseFloat(data.boundingbox[1]),
                            lng: parseFloat(data.boundingbox[2])
                        }),
                        map,
                        draggable: false,
                        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    });
                    m3 = new google.maps.Marker({
                        position: new google.maps.LatLng({
                            lat: parseFloat(data.boundingbox[0]),
                            lng: parseFloat(data.boundingbox[3])
                        }),
                        map,
                        draggable: false,
                        
                        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        
                        
                    });
                    m4 = new google.maps.Marker({
                        
                        
                        position: new google.maps.LatLng({
                            
                            
                            lat: parseFloat(data.boundingbox[1]),
                            lng: parseFloat(data.boundingbox[3])
                        }),
                        map,
                        draggable: false,
                        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    });
                } else {
                    alert('Could not find any data');
                }
            } else {
                alert('Could not find any data');
            }
        })
    }
    
   // function randomBetween() {
    //  var random = new google.maps.LatLng( (Math.random()*(85*2)-85), (Math.random()*(180*2)-180) );
      //var marker = new google.maps.Marker(
           //   {
             //     position: random,
              //    maps: maps,
             //     title: 'I am here'
        
     // });

    // Button 4
    this.CircleShuffle = () => {
        
        var location = new google.maps.LatLng((Math.random() * (85 * 2) - 85), (Math.random() * (180 * 2) - 180));
        
        
        var activeWindow = null;
        this.map.setCenter(location);
        var _polygon = new google.maps.Polygon({
            paths: [
                this.Radius(location, 55 * 1000, 1)
                
                 
            ],
            strokeColor: "#add8e6",
            
            
            
                              strokeOpacity: 0.5,
                              
                              
            strokeWeight: 4,
            
            
    fillColor: "#add8e6",
    
    
            fillOpacity: 0.35
        });
        _polygon.setMap(this.map);
                                          
        
        var Mark1 = new google.maps.Marker({
            
            
            position: location,
            
            title: 'Center Marker',
            
            map: this.map,
            
            
       draggable: false,
            
            //we can add markers around this circle
        });
        var mainInfoWindow = new google.maps.InfoWindow({
            content: `
        <div style="border: 2px brown; border-radius: 9px; padding:10px;">
            <h4>Main Marker</h4>
            
            
            
            
            <p><b>Lat: </b>${Mark1.getPosition().lat()}</p>
            
            
            
            <p><b>Lng: </b>${Mark1.getPosition().lng()}</p>
        </div>
        `
        });
        Mark1.addListener("click", () => {
            
            //while(Count2 * Count2 <= Count1) {
		//	if(Count1 % Count2 == 0) {
            if (activeWindow) {
                
                
                activeWindow.close();
                
                
            }
            mainInfoWindow.open(this.map, Mark1);
            
            
            activeWindow = mainInfoWindow;
        });

        var top = new google.maps.Marker({
            
            
            
            position: google.maps.geometry.spherical.computeOffset(location, 55 * 1000, 0),
                                                       title: 'Top Marker',
            
            
              map: this.map,
              
              
            draggable: false,
            
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });
        var topInfoWindow = new google.maps.InfoWindow({
            content: `
        <div style="border: 2px brown; border-radius: 9px; padding:10px;">
            <p><b>Lat: </b>${top.getPosition().lat()}</p>
            <p><b>Lng: </b>${top.getPosition().lng()}</p>
        </div>
        `,
        });
        top.addListener("click", () => {
            
            
            if (activeWindow) {
                
                
                activeWindow.close();
                
                
            }
            topInfoWindow.open(this.map, top);
            
            
            activeWindow = topInfoWindow;
        });

        var bottom = new google.maps.Marker({
            
            
                      position: google.maps.geometry.spherical.computeOffset(location, 55 * 1000, 180),
                      
                      
                    title: 'Bottom Marker',
            map: this.map,
            
            draggable: false,
            
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });
        var bottomInfoWindow = new google.maps.InfoWindow({
            
            
            
            content: `
                         <div style="border: 2px dotted gray; border-radius: 9px; padding:10px;">
            
            
                        <p><b>Lat: </b>${bottom.getPosition().lat()}</p>
            
            <p><b>Lng: </b>${bottom.getPosition().lng()}</p>
        </div>
        `,
        });
        bottom.addListener("click", () => {
            
            
            
                       if (activeWindow) {
                activeWindow.close();
            }
            bottomInfoWindow.open(this.map, bottom);
            activeWindow = bottomInfoWindow;
        });

        var left = new google.maps.Marker({
            
            position: google.maps.geometry.spherical.computeOffset(location, 55 * 1000, 270),
            
            title: 'Left Marker',
            
            map: this.map,
            
            draggable: false,
            
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });
        var leftInfoWindow = new google.maps.InfoWindow({
            content: `
        <div style="border: 2px dotted gray; border-radius: 9px; padding:10px;">
            
            
            
            <p><b>Lat: </b>${left.getPosition().lat()}</p>
            
            
            <p><b>Lng: </b>${left.getPosition().lng()}</p>
        </div>
        `,
        });
        left.addListener("click", () => {
            
            
            if (activeWindow) {
                
                
                activeWindow.close();
            }
            leftInfoWindow.open(this.map, left);
            activeWindow = leftInfoWindow;
        });

        var right = new google.maps.Marker({
            position: google.maps.geometry.spherical.computeOffset(location, 55 * 1000, 90),
            title: 'Right Marker',
            map: this.map,
            draggable: false,
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });
        var rightInfoWindow = new google.maps.InfoWindow({
            content: `
        <div style="border: 2px blue; border-radius: 9px; padding:10px;">
            
            
            
                             <p><b>Lat: </b>${right.getPosition().lat()}</p>
            
            
            <p><b>Lng: </b>${right.getPosition().lng()}</p>
        </div>
        `,
        });
                    right.addListener("click", () => {
                          
                              if (activeWindow) {
                                  
                activeWindow.close();
            }
            
            rightInfoWindow.open(this.map, right);
            
            activeWindow = rightInfoWindow;
        });

        
        var r1 = new google.maps.Marker({
            
            
                  position: google.maps.geometry.spherical.computeOffset(location, 55 * 1000, Math.random() * 360),
                  
                  
         //         onst gainNode = audioCtx.createGain();

//volumeSlider.addEventListener('input', function() {
    //gainNode.gain.value = this.value;
                  
                  
            title: 'Random 1',
            
            
              map: this.map,
            draggable: false,
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.pn"
            
            
        });
        var randomMarker1InfoWindow = new google.maps.InfoWindow({          //Random Markers added 
            content: `
        <div style="border: 2px blue; border-radius: 9px; padding:10px;">
            
            
            
            <p><b>Lat: </b>${r1.getPosition().lat()}</p>
            
            
            <p><b>Lng: </b>${r1.getPosition().lng()}</p>
            
            
        </div>
        `,
        });
        r1.addListener("click", () => {
            
            
            
            if (activeWindow) {
                
                
                
                activeWindow.close();
            }
            
            
            randomMarker1InfoWindow.open(this.map, r1);
            
            
            activeWindow = randomMarker1InfoWindow; 
        });

        var r2 = new google.maps.Marker({  
            
            
            position: google.maps.geometry.spherical.computeOffset(location, 55 * 1000, Math.random() * 360),
            
            
            
            title: 'Random 1',
            map: this.map,
            
            
            
            //atLng = { lat: -25.363, lng: 131.044 };
  //const map = new google.maps.Map(document.getElementById("map"), {
   // zoom: 4,
   // center: myLatLng,
  //});
     
                         //new google.maps.Marker({
              //position: myLatLng,
 //   map,
            
            
            
            draggable: false,
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });
        var randomMarker2InfoWindow = new google.maps.InfoWindow({
            content: `
        <div style="border: 2px brown; border-radius: 9px; padding:10px;">
            
            
            <p><b>Lat: </b>${r2.getPosition().lat()}</p>
            
            
                  <p><b>Lng: </b>${r2.getPosition().lng()}</p>
        </div>
        `,
        });
        r2.addListener("click", () => {
            
            
                  if (activeWindow) {
                      
                      
                activeWindow.close();
            }
         
            randomMarker2InfoWindow.open(this.map, r2);
            activeWindow = randomMarker2InfoWindow;
        });

        var r3 = new google.maps.Marker({
            
            
            position: google.maps.geometry.spherical.computeOffset(location, 55 * 1000, Math.random() * 360),
            
            
            title: 'Random 1',
            
            
            map: this.map,
            
            draggable: false,
            
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            
        });
        var randomMarker3InfoWindow = new google.maps.InfoWindow({
            content: `
            
            
            
            
        <div style="border: 2px dotted gray; border-radius: 9px; padding:10px;">
            
            <p><b>Lat: </b>${r3.getPosition().lat()}</p>
            
            <p><b>Lng: </b>${r3.getPosition().lng()}</p>
        </div>
        `,
        });
        r3.addListener("click", () => {
            
            //inserts random markers when button utilised 
            if (activeWindow) {
                activeWindow.close();
            }
            randomMarker3InfoWindow.open(this.map, r3);
            activeWindow = randomMarker3InfoWindow;
        });
    }

    // Button 5
    this.Polygon = () => {
        confirm("Please draw anywhere on map");
        var manager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            
            
            
            drawingControl: false,
            
            
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon', 'circle']
            },
            polygonOptions: {
                editable: true
            }
            
            //When clicked on, user will have the option to create a polygon 
            //and it will draw a triangle within and colour both 

        });
        manager.setMap(this.map);

        google.maps.event.addListener(manager, 'overlaycomplete',
        
        
            (event) => {
                
                        event.overlay.set('editable', false);
                        
                manager.setMap(null);
                var _polygon = event.overlay;
                
                _polygon.setOptions({
                    
                    
			//int Count2 = 2; 
			//String Prime =  "Yes"; 
			
		//while(Count2 * Count2 <= Count1) {
		//	if(Count1 % Count2 == 0) {
                    strokeColor: "#add8e6",
                    
                    strokeOpacity: 0.8,
                    
                    
                    strokeWeight: 2,
                    
                    
                    fillColor: "#add8e6",
                    fillOpacity: 0.35
                });

                var _bounds = new google.maps.LatLngBounds();
                
                
                                 _polygon.getPaths().forEach(function (path) {
                    path.forEach(function (latlng) {
                        _bounds.extend(latlng);
                        
                          
                   // strokeWeight: 2,
                    
                    
                 //   fillColor: "#add8e6",
                  //  fillOpacity: 0.35
                    });
                });

                const center = _bounds.getCenter();

                // Add box in 40km outside the polygon
                _bounds.extend(google.maps.geometry.spherical.computeOffset(center, 40 * 1000, 0))
                
                //while(Count2 * Count2 <= Count1) {
		//	if(Count1 % Count2 == 0) {
                
                _bounds.extend(google.maps.geometry.spherical.computeOffset(center, 40 * 1000, 90))
                
                
                _bounds.extend(google.maps.geometry.spherical.computeOffset(center, 40 * 1000, 180))
                
                
                _bounds.extend(google.maps.geometry.spherical.computeOffset(center, 40 * 1000, 270))

                new google.maps.Rectangle({
                    
                    
                    
                    
                    
                               strokeColor: '#add8e6',
                               
                               
                             strokeOpacity: 0.8,
                             
                    strokeWeight: 2,
                    
                    
                    fillColor: '#800080',
                    
                    
                    fillOpacity: 0.35,
                    
                    
                    map: this.map,
                    
                    bounds: _bounds
                });
                this.map.fitBounds(_bounds)

                _polygon.setOptions({ zIndex: 1000 });

               
                google.maps.event.addListener(_polygon, "mouseover", function () {
                    
                    
                    
                    this.setOptions({ fillColor: "#add8e6", strokeColor: "#800080" });
                    
                    
                    var sw = _bounds.getSouthWest();
                    
                    
                                   var ne = _bounds.getNorthEast();
                    for (var i = 0; i < 10; i++) {
                        
                        
                        //Colour is blue and purple 
                        //But I made it highlight and change colour as well as add markers when I hover over it to show it 
                        //adds markers - the chnage of colour is a signification of the adding of random markers
                        
                        
                        var lat = Math.random() * (ne.lat() - sw.lat()) + sw.lat();
                        
                        
                        var lng = Math.random() * (ne.lng() - sw.lng()) + sw.lng();
                        
                        
                        const loc = new google.maps.LatLng(lat, lng);
                        if (!google.maps.geometry.poly.containsLocation(loc, this)) {
                            new google.maps.Marker({
                                
                                
                                position: loc,
                                
                                
                                           map: this.map,
                                           
                                           
                                               draggable: false,
                                               
                                               
                                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                            });
                        }
                    }
                });

               
                google.maps.event.addListener(_polygon, "mouseout", function () {
                    
                    
                    
                    this.setOptions({ fillColor: "#add8e6", strokeColor: "#add8e6" });
                });
            });
    }

   
    function getRandomiser () {
        
        
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }
}

    
    //API Key so I do not forget it AIzaSyAZgyxwztQhyFDkQaowF_DqJGQciXqj5fw
    //Default Marker 

    

 //var marker = new google.maps.Marker(
           //   {
             //     position: random,
              //    maps: maps,
             //     title: 'I am here'