
(function() {
//===== Prealoder

	window.onload = function () {
		window.setTimeout(fadeout, 500);
	}

	function fadeout() {
		document.querySelector('.preloader').style.opacity = '0';
		document.querySelector('.preloader').style.display = 'none';
	}


    /*=====================================
    Sticky
    ======================================= */
    window.onscroll = function () {
        var header_navbar = document.querySelector(".navbar-area");
        var sticky = header_navbar.offsetTop;
        var logo = document.querySelector('.navbar-brand img');

        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
            logo.src = 'assets/img/logo/Aeg1s-removebg-preview.png';
            const logoName = document.getElementById('logo-name');
            logoName.style.color = '#4A7DF7';
        } else {
            header_navbar.classList.remove("sticky");
            logo.src = 'assets/img/logo/Aeg1s-removebg-preview.png';
            const logoName = document.getElementById('logo-name');
            logoName.style.color = '#4A7DF7';
        }



        // show or hide the back-top-top button
        var backToTo = document.querySelector(".scroll-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTo.style.display = "flex";
        } else {
            backToTo.style.display = "none";
        }
    };

    // for menu scroll 
    var pageLink = document.querySelectorAll('.page-scroll');
    
    pageLink.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(elem.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                offsetTop: 1 - 60,
            });
        });
    });

    // section menu active
	function onScroll(event) {
		var sections = document.querySelectorAll('.page-scroll');
		var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		for (var i = 0; i < sections.length; i++) {
			var currLink = sections[i];
			var val = currLink.getAttribute('href');
			var refElement = document.querySelector(val);
			var scrollTopMinus = scrollPos + 73;
			if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
				document.querySelector('.page-scroll').classList.remove('active');
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};

	window.document.addEventListener('scroll', onScroll);


    //===== close navbar-collapse when a  clicked
    let navbarToggler = document.querySelector(".navbar-toggler");    
    var navbarCollapse = document.querySelector(".navbar-collapse");

    document.querySelectorAll(".page-scroll").forEach(e =>
        e.addEventListener("click", () => {
            navbarToggler.classList.remove("active");
            navbarCollapse.classList.remove('show')
        })
    );
    navbarToggler.addEventListener('click', function() {
        navbarToggler.classList.toggle("active");
    }) 


	// WOW active
    new WOW().init();


    // ====== scroll top js
    function scrollTo(element, to = 0, duration= 1000) {

        const start = element.scrollTop;
        const change = to - start;
        const increment = 20;
        let currentTime = 0;

        const animateScroll = (() => {

            currentTime += increment;

            const val = Math.easeInOutQuad(currentTime, start, change, duration);

            element.scrollTop = val;

            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        });

        animateScroll();
    };

    Math.easeInOutQuad = function (t, b, c, d) {

        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    document.querySelector('.scroll-top').onclick = function () {
        scrollTo(document.documentElement); 
    }


})();
function identifySymptoms() {
    // Predefined symptoms, recommendations, and medications
    const symptomData = {
        "fever": {
            recommendation: "You may have a viral or bacterial infection. Stay hydrated, rest, and monitor your temperature. If it persists, consult a doctor.",
            medication: ["Paracetamol (for reducing fever)", "Ibuprofen (for pain and inflammation)", "Drink plenty of fluids"]
        },
        "headache": {
            recommendation: "Headaches can be caused by stress, dehydration, or tension. Try resting, drinking water, and using over-the-counter pain relievers.",
            medication: ["Aspirin", "Paracetamol", "Ibuprofen", "Caffeine (in moderation)"]
        },
        "cough": {
            recommendation: "A cough can be a sign of a cold, flu, or allergies. Drink warm fluids, use throat lozenges, and consider seeing a doctor if symptoms last more than a week.",
            medication: ["Cough syrup", "Honey and lemon tea", "Expectorants (like Guaifenesin)", "Antihistamines (for allergic coughs)"]
        },
        "stomach pain": {
            recommendation: "Stomach pain could indicate indigestion, gas, or an infection. Try drinking ginger tea, eating light foods, and monitoring your symptoms. If it worsens, see a healthcare provider.",
            medication: ["Antacids (like Tums or Rolaids)", "Pepto-Bismol", "Ginger supplements", "Simethicone (for gas)"]
        },
        "fatigue": {
            recommendation: "Fatigue can result from stress, poor diet, or lack of sleep. Ensure you are getting enough rest and proper nutrition. Consult a doctor if the fatigue is unexplained or prolonged.",
            medication: ["Vitamin B12 supplements", "Iron supplements (for fatigue caused by anemia)", "Melatonin (if sleep is disrupted)"]
        }
    };

    // Show the symptom selection popup
    document.getElementById("symptomPopup").style.display = "flex";

    // Handle form submission
    document.getElementById("symptomForm").onsubmit = function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get the selected symptoms
        const selectedSymptoms = Array.from(document.querySelectorAll('input[name="symptom"]:checked')).map(checkbox => checkbox.value);

        let recommendations = [];

        // Generate recommendations for each selected symptom
        selectedSymptoms.forEach(symptom => {
            if (symptomData[symptom]) {
                // Add recommendation and medication for each symptom
                recommendations.push(`For ${symptom.charAt(0).toUpperCase() + symptom.slice(1)}:\n- Recommendation: ${symptomData[symptom].recommendation}\n- Medications: ${symptomData[symptom].medication.join(", ")}`);
            } else {
                recommendations.push(`No recommendations available for "${symptom}". Please consult a healthcare professional.`);
            }
        });

        // Prepare the content for the popup
        const popupContent = recommendations.join("<br><br>");
        document.getElementById("popupContent").innerHTML = popupContent;
    };

    // Close the popup when the user clicks the close button
    document.getElementById("closePopup").onclick = function() {
        document.getElementById("symptomPopup").style.display = "none";
    };
}
function locateMedicalHelp() {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
        // Get the user's current position
        navigator.geolocation.getCurrentPosition(function(position) {
            // Get the latitude and longitude from the position object
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Set a zoom level (e.g., 15 is a close-up view of the area)
            const zoomLevel = 15;

            // Build the Google Maps URL for hospitals and clinics with zoom level
            const googleMapsURL = `https://www.google.com/maps/search/hospitals+near+${latitude},${longitude}@${latitude},${longitude},${zoomLevel}z`;

            // Redirect the user to Google Maps with the search query
            window.open(googleMapsURL, '_blank');
        }, function() {
            alert("Unable to retrieve your location.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}
// Open Appointment Popup
// Open the popup (Example: You can call this function on a button click to show the popup)
function makeAppointment() {
    document.getElementById('appointmentPopup').style.display = 'flex';
}

// Close the popup when the user clicks the close button
document.getElementById('closeAppointmentPopup').addEventListener('click', function() {
    document.getElementById('appointmentPopup').style.display = 'none';
});

// Optional: Close the popup when the user clicks outside the content area
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('appointmentPopup')) {
        document.getElementById('appointmentPopup').style.display = 'none';
    }
});

// Confirm Booking
// Confirm Booking
function confirmAppointment() {
    const hospital = document.getElementById('hospitalSelect').value;
    const appointmentTime = document.getElementById('appointmentTime').value;

    if (hospital === "none") {
        alert("Please select a hospital.");
        return;
    }
    if (!appointmentTime) {
        alert("Please select a time.");
        return;
    }

    // Prepare the confirmation message
    const confirmationMessage = `Your appointment at ${hospital.replace(/-/g, ' ')} is booked for ${new Date(appointmentTime).toLocaleString()}.`;

    // Set the confirmation message text
    document.getElementById('confirmationMessage').textContent = confirmationMessage;

    // Hide the booking popup
    document.getElementById('appointmentPopup').style.display = 'none';

    // Show the confirmation popup
    document.getElementById('confirmationPopup').style.display = 'flex';
}

// Close the confirmation popup
function closeConfirmationPopup() {
    document.getElementById('confirmationPopup').style.display = 'none';
}
function deliveryService() {
    window.location.href = 'store.html';
}
function sendSOS() {
    // Show the popup
    document.getElementById('sosPopup').style.display = 'flex';

    // Get user's coordinates
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const coords = position.coords;
            document.getElementById('coordinates').innerText = `Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`;

            // Change message after 10 seconds
            setTimeout(function() {
                document.getElementById('popup-message').innerText = 'Your Request is Sent';
            }, 3500); // 10 seconds
        }, function() {
            document.getElementById('coordinates').innerText = 'Unable to retrieve your coordinates';
        });
    } else {
        document.getElementById('coordinates').innerText = 'Geolocation is not supported by this browser';
    }
}

function closePopup() {
    // Close the popup
    document.getElementById('sosPopup').style.display = 'none';
}

