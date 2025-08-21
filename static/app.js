// Global variables for the map, markers, and the currently selected marker
var map;
var markers = {};
var selectedMarker = null;

// Define custom icons for default (blue) and selected (red) states
var blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


// This object contains coordinates for a large number of your specific locations.
const locationCoordinates = {
    "1st block jayanagar": [12.9344, 77.5833],
    "1st phase jp nagar": [12.9077, 77.5843],
    "2nd phase judicial layout": [12.8299, 77.5317],
    "5th block hbr layout": [13.0223, 77.6478],
    "5th phase jp nagar": [12.9097, 77.5967],
    "6th phase jp nagar": [12.9067, 77.5922],
    "7th phase jp nagar": [12.8864, 77.5843],
    "8th phase jp nagar": [12.8942, 77.5921],
    "9th phase jp nagar": [12.8866, 77.6050],
    "aecs layout": [12.9693, 77.7126],
    "abbigere": [13.0618, 77.5228],
    "akshaya nagar": [12.8731, 77.6275],
    "ambalipura": [12.9234, 77.6897],
    "ambedkar nagar": [12.9288, 77.6214],
    "amruthahalli": [13.0631, 77.5965],
    "anandapura": [13.0135, 77.6975],
    "ananth nagar": [12.8390, 77.6716],
    "anekal": [12.7084, 77.6983],
    "anjanapura": [12.8583, 77.5902],
    "arekere": [12.8882, 77.5950],
    "attibele": [12.7888, 77.7711],
    "beml layout": [12.9815, 77.5138],
    "btm 2nd stage": [12.9166, 77.6101],
    "btm layout": [12.9152, 77.6179],
    "babusapalaya": [13.0223, 77.6641],
    "balagere": [12.9528, 77.7219],
    "banashankari": [12.9254, 77.5467],
    "banashankari stage ii": [12.9282, 77.5615],
    "banashankari stage iii": [12.9154, 77.5502],
    "banashankari stage v": [12.9004, 77.5459],
    "banashankari stage vi": [12.8953, 77.5366],
    "banaswadi": [13.0142, 77.6433],
    "bannerghatta": [12.8000, 77.5770],
    "bannerghatta road": [12.8891, 77.6010],
    "basavangudi": [12.9421, 77.5755],
    "basaveshwara nagar": [12.9880, 77.5330],
    "battarahalli": [13.0201, 77.7011],
    "begur": [12.8817, 77.6322],
    "begur road": [12.8838, 77.6250],
    "bellandur": [12.9304, 77.6784],
    "benson town": [12.9996, 77.6069],
    "bharathi nagar": [12.9786, 77.6133],
    "bhoganhalli": [12.9383, 77.7005],
    "billekahalli": [12.8974, 77.6068],
    "binny pete": [12.9669, 77.5543],
    "bommanahalli": [12.9087, 77.6239],
    "bommasandra": [12.8190, 77.6833],
    "brookefield": [12.9693, 77.7149],
    "budigere": [13.0560, 77.7523],
    "cv raman nagar": [12.9898, 77.6638],
    "chamrajpet": [12.9593, 77.5659],
    "chandapura": [12.8023, 77.7057],
    "channasandra": [12.9894, 77.7380],
    "chikkabanavar": [13.0640, 77.4930],
    "chikkalasandra": [12.9059, 77.5545],
    "cooke town": [13.0033, 77.6253],
    "cox town": [12.9961, 77.6221],
    "cunningham road": [12.9893, 77.5941],
    "dasanapura": [13.0740, 77.4370],
    "dasarahalli": [13.0489, 77.5148],
    "devanahalli": [13.2351, 77.7014],
    "devarachikkanahalli": [12.8845, 77.6232],
    "dodda nekkundi": [12.9734, 77.6951],
    "doddaballapur": [13.2925, 77.5388],
    "doddakallasandra": [12.8839, 77.5701],
    "doddathoguru": [12.8530, 77.6625],
    "domlur": [12.9628, 77.6389],
    "dommasandra": [12.8795, 77.7473],
    "epip zone": [12.9718, 77.7369],
    "electronic city": [12.8452, 77.6602],
    "electronic city phase ii": [12.8406, 77.6769],
    "electronics city phase 1": [12.8505, 77.6610],
    "frazer town": [12.9987, 77.6144],
    "gottigere": [12.8615, 77.5979],
    "green glen layout": [12.9272, 77.6833],
    "gubbalala": [12.8998, 77.5569],
    "gunjur": [12.9360, 77.7330],
    "hal 2nd stage": [12.9619, 77.6493],
    "hbr layout": [13.0245, 77.6455],
    "hrbr layout": [13.01, 77.6451],
    "hsr layout": [12.9121, 77.6446],
    "haralur road": [12.9009, 77.6777],
    "harlur": [12.9093, 77.6734],
    "hebbal": [13.0355, 77.5971],
    "hebbal kempapura": [13.0450, 77.6066],
    "hegde nagar": [13.0725, 77.6341],
    "hennur": [13.0384, 77.6431],
    "hennur road": [13.0243, 77.6420],
    "hoodi": [12.9996, 77.7153],
    "horamavu agara": [13.0298, 77.6640],
    "horamavu banaswadi": [13.0255, 77.6538],
    "hormavu": [13.0269, 77.6599],
    "hosa road": [12.8885, 77.6652],
    "hosakerehalli": [12.9231, 77.5348],
    "hoskote": [13.0730, 77.7952],
    "hosur road": [12.9258, 77.6275],
    "hulimavu": [12.8779, 77.6087],
    "isro layout": [12.9056, 77.5594],
    "itpl": [12.9847, 77.7499],
    "iblur village": [12.9231, 77.6718],
    "indira nagar": [12.9719, 77.6412],
    "jp nagar": [12.9079, 77.5930],
    "jakkur": [13.0784, 77.6068],
    "jalahalli": [13.0494, 77.5459],
    "jalahalli east": [13.0604, 77.5642],
    "jigani": [12.7930, 77.6330],
    "judicial layout": [13.0982, 77.5594],
    "kr puram": [13.0189, 77.6896],
    "kadubeesanahalli": [12.9382, 77.6903],
    "kadugodi": [12.9905, 77.7608],
    "kaggadasapura": [12.9845, 77.6788],
    "kaggalipura": [12.8126, 77.5253],
    "kaikondrahalli": [12.9152, 77.6743],
    "kalena agrahara": [12.8804, 77.6073],
    "kalyan nagar": [13.0221, 77.6435],
    "kambipura": [12.9113, 77.4627],
    "kammanahalli": [13.0185, 77.6393],
    "kammasandra": [12.8200, 77.6600],
    "kanakapura": [12.5532, 77.4210],
    "kanakpura road": [12.8921, 77.5536],
    "kannamangala": [13.0140, 77.7590],
    "kasavanhalli": [12.9127, 77.6964],
    "kasturi nagar": [13.0084, 77.6559],
    "kathriguppe": [12.9240, 77.5500],
    "kaval byrasandra": [13.0201, 77.6083],
    "kenchenahalli": [12.9040, 77.5050],
    "kengeri": [12.9174, 77.4839],
    "kengeri satellite town": [12.9054, 77.4828],
    "kodichikkanahalli": [12.8912, 77.6283],
    "kodigehaali": [13.0570, 77.5880],
    "kodigehalli": [13.0583, 77.5933],
    "kodihalli": [12.9644, 77.6558],
    "kogilu": [13.1090, 77.6070],
    "konanakunte": [12.8887, 77.5670],
    "koramangala": [12.9352, 77.6245],
    "kothannur": [13.0538, 77.6408],
    "kothanur": [13.0538, 77.6408],
    "kudlu": [12.8931, 77.6553],
    "kudlu gate": [12.8988, 77.6444],
    "kumaraswami layout": [12.9063, 77.5684],
    "kundalahalli": [12.9710, 77.7120],
    "lb shastri nagar": [12.9560, 77.6590],
    "laggere": [13.0120, 77.5150],
    "lakshminarayana pura": [12.9490, 77.5400],
    "lingadheeranahalli": [12.8600, 77.5600],
    "magadi road": [12.9755, 77.5252],
    "mahadevpura": [12.9949, 77.6900],
    "mahalakshmi layout": [13.0150, 77.5450],
    "mallasandra": [13.0420, 77.5020],
    "malleshpalya": [12.9820, 77.6700],
    "malleshwaram": [13.0068, 77.5694],
    "marathahalli": [12.9592, 77.7012],
    "margondanahalli": [13.0295, 77.7008],
    "mico layout": [12.9110, 77.6080],
    "munnekollal": [12.9490, 77.7100],
    "murugeshpalya": [12.9570, 77.6490],
    "mysore road": [12.9467, 77.5153],
    "nagarbhavi": [12.9659, 77.5010],
    "nagasandra": [13.0460, 77.4910],
    "nagavara": [13.0380, 77.6150],
    "narayanapura": [13.0300, 77.6650],
    "neeladri nagar": [12.8390, 77.6550],
    "nehru nagar": [13.0050, 77.5850],
    "ombr layout": [13.0190, 77.6550],
    "old airport road": [12.9569, 77.6543],
    "old madras road": [12.9932, 77.6594],
    "padmanabhanagar": [12.9150, 77.5580],
    "panathur": [12.9290, 77.7070],
    "parappana agrahara": [12.8880, 77.6500],
    "pattandur agrahara": [12.9830, 77.7450],
    "prithvi layout": [12.8800, 77.6400],
    "r.t. nagar": [13.0220, 77.5960],
    "rachenahalli": [13.0650, 77.6250],
    "raja rajeshwari nagar": [12.9274, 77.5154],
    "rajaji nagar": [12.9982, 77.5520],
    "ramagondanahalli": [12.9730, 77.7450],
    "ramamurthy nagar": [13.0120, 77.6780],
    "rayasandra": [12.8800, 77.6900],
    "sahakara nagar": [13.0690, 77.5880],
    "sanjay nagar": [13.0400, 77.5800],
    "sarakki nagar": [12.9100, 77.5700],
    "sarjapur": [12.9120, 77.7800],
    "sarjapur  road": [12.9121, 77.6844], // Note the double space
    "seegehalli": [12.9920, 77.7300],
    "shampura": [13.0200, 77.6100],
    "shivaji nagar": [12.9850, 77.6050],
    "singasandra": [12.8850, 77.6450],
    "somasundara palya": [12.9000, 77.6500],
    "sompura": [12.9500, 77.7600],
    "subramanyapura": [12.9000, 77.5400],
    "sultan palaya": [13.0250, 77.5950],
    "tc palaya": [13.0180, 77.6950],
    "talaghattapura": [12.8600, 77.5400],
    "thanisandra": [13.0540, 77.6350],
    "thigalarapalya": [12.9800, 77.7100],
    "thubarahalli": [12.9550, 77.7150],
    "tumkur road": [13.0150, 77.5000],
    "ulsoor": [12.9780, 77.6150],
    "uttarahalli": [12.9150, 77.5350],
    "varthur": [12.9400, 77.7400],
    "varthur road": [12.9450, 77.7200],
    "vidyaranyapura": [13.0850, 77.5650],
    "vijayanagar": [12.9700, 77.5300],
    "vittasandra": [12.8650, 77.6450],
    "whitefield": [12.9698, 77.7499],
    "yelachenahalli": [12.8950, 77.5750],
    "yelahanka": [13.1007, 77.5963],
    "yelahanka new town": [13.0850, 77.5850],
    "yelenahalli": [12.8750, 77.6050],
    "yeshwanthpur": [13.0250, 77.5550],
};

// Gets the selected value for Bathrooms
function getBathValue() {
    const selectedBath = document.querySelector('input[name="uiBathrooms"]:checked');
    return selectedBath ? parseInt(selectedBath.value) : -1;
}

// Gets the selected value for BHK
function getBHKValue() {
    const selectedBhk = document.querySelector('input[name="uiBHK"]:checked');
    return selectedBhk ? parseInt(selectedBhk.value) : -1;
}

// Handles the click event for the 'Estimate Price' button
function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    const sqft = document.getElementById("uiSqft").value;
    const bhk = getBHKValue();
    const bathrooms = getBathValue();
    const location = document.getElementById("uiLocations").value;
    const estPrice = document.getElementById("uiEstimatedPrice");

    if (!sqft || bhk === -1 || bathrooms === -1 || !location) {
        estPrice.innerHTML = `<h2 style="color: red;">Please fill in all fields</h2>`;
        return;
    }

    const url = "/predict_home_price";

    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bathrooms,
        location: location
    }, function(data, status) {
        estPrice.innerHTML = "<h2>Estimated Price: " + data.estimated_price.toString() + " Lakh</h2>";
    }).fail(function() {
        estPrice.innerHTML = `<h2 style="color: red;">Error estimating price. Please try again.</h2>`;
    });
}

// Main function that runs when the page is loaded
function onPageLoad() {
    console.log("document loaded");

    map = L.map('map').setView([12.9716, 77.5946], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const url = "/get_location_names";
    const uiLocations = $('#uiLocations');

    $.get(url, function(data, status) {
        if (data && data.locations) {
            uiLocations.empty().append('<option value="" disabled selected>Choose a Location</option>');
            
            data.locations.forEach(function(location) {
                uiLocations.append(new Option(location, location));

                if (locationCoordinates[location]) {
                    // *** FIX IS HERE ***
                    const coords = locationCoordinates[location]; // This line was missing
                    // Create marker with the default blue icon
                    const marker = L.marker(coords, {icon: blueIcon}).addTo(map);
                    marker.bindPopup(`<b>${location}</b>`);
                    markers[location] = marker;

                    // Event: When a marker is clicked...
                    marker.on('click', function() {
                        uiLocations.val(location).trigger('change');
                    });
                } else {
                    console.warn(`Warning: Coordinates for location "${location}" not found. No marker will be shown.`);
                }
            });
        }
    }).fail(function() {
        console.log("Error fetching locations");
    });

    // Event: When the dropdown selection changes...
    uiLocations.on('change', function() {
        const selectedLocation = $(this).val();
        
        // --- NEW LOGIC FOR CHANGING MARKER COLOR ---
        // 1. If a marker was previously selected, reset its icon to blue
        if (selectedMarker) {
            selectedMarker.setIcon(blueIcon);
        }

        // 2. Get the new marker, set its icon to red, and update the selectedMarker variable
        const newMarker = markers[selectedLocation];
        if (newMarker) {
            newMarker.setIcon(redIcon);
            selectedMarker = newMarker;
            
            // Pan and zoom the map to the new red marker
            map.setView(newMarker.getLatLng(), 14);
            newMarker.openPopup();
        }
    });
}

// Run the onPageLoad function when the window loads
window.onload = onPageLoad;
