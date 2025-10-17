// =======================================================
// --- MODAL LOGIC (Wrapped in a check) ---
// =======================================================
var modal = document.getElementById("contact-modal");
var btn = document.getElementById("contact-btn");
var span = document.getElementsByClassName("close")[0];

if (modal && btn && span) {
    btn.onclick = function () {
        modal.style.display = "block";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}


// =======================================================
// SLIDESHOW FUNCTIONS (MUST BE DEFINED HERE)
// =======================================================

// Function for Residential Slideshow (MISSING FUNCTION ADDED)
let slideIndexResidential = 1;

function plusSlidesResidential(n) {
    showSlidesResidential(slideIndexResidential += n);
}

function showSlidesResidential(n) {
    let slides = document.getElementsByClassName("mySlidesResidential");
    // Handle wrap-around logic
    if (n > slides.length) { slideIndexResidential = 1 }
    if (n < 1) { slideIndexResidential = slides.length }
    
    // Hide all slides and show the current one
    for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
    
    // Check if there are slides before trying to access index [n-1]
    if (slides.length > 0) {
        slides[slideIndexResidential - 1].style.display = "block";
    }
}


// Function for COMMERCIAL SLIDESHOW
let slideIndexCommercial = 1;

function plusSlidesCommercial(n) {
    showSlidesCommercial(slideIndexCommercial += n);
}

function showSlidesCommercial(n) {
    let slides = document.getElementsByClassName("mySlidesCommercial");
    // Handle wrap-around logic
    if (n > slides.length) { slideIndexCommercial = 1 }
    if (n < 1) { slideIndexCommercial = slides.length }
    
    for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
    if (slides.length > 0) {
        slides[slideIndexCommercial - 1].style.display = "block";
    }
}


// Function for AIRBNB SLIDESHOW
let slideIndexAirbnb = 1;

function plusSlidesAirbnb(n) {
    showSlidesAirbnb(slideIndexAirbnb += n);
}

function showSlidesAirbnb(n) {
    let slides = document.getElementsByClassName("mySlidesAirbnb");
    let dots = document.getElementsByClassName("airbnb-dot");

    // Handle wrap-around logic
    if (n > slides.length) { slideIndexAirbnb = 1 }
    if (n < 1) { slideIndexAirbnb = slides.length }
    
    for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
    
    if (slides.length > 0) {
        slides[slideIndexAirbnb - 1].style.display = "block";
    }
}


// Function for FARM SLIDESHOW
let slideIndexFarm = 1;

function plusSlidesFarm(n) {
    showSlidesFarm(slideIndexFarm += n);
}

function currentSlideFarm(n) {
    showSlidesFarm(slideIndexFarm = n);
}

function showSlidesFarm(n) {
    let slides = document.getElementsByClassName("mySlidesFarm");
    let dots = document.getElementsByClassName("farm-dot");

    if (n > slides.length) { slideIndexFarm = 1}
    if (n < 1) { slideIndexFarm = slides.length}

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    if (slides.length > 0) {
        slides[slideIndexFarm - 1].style.display = "block";
        dots[slideIndexFarm - 1].className += " active";
    }
}


// =======================================================
// INITIALIZATION (ALL STARTUP CODE GOES HERE)
// This ensures all HTML elements are loaded before we access them.
// =======================================================
document.addEventListener('DOMContentLoaded', function() {
    
    // SLIDESHOW INITIALIZATION
    // Residential Slideshow (Added auto-play)
    if (document.getElementsByClassName("mySlidesResidential").length > 0) {
        showSlidesResidential(slideIndexResidential); 
        setInterval(() => plusSlidesResidential(1), 4000); 
    }
    
    // Commercial Slideshow
    if (document.getElementsByClassName("mySlidesCommercial").length > 0) {
        showSlidesCommercial(slideIndexCommercial);
    }
    
    // Airbnb Slideshow (Fixes the TypeError by running AFTER elements exist)
    if (document.getElementsByClassName("mySlidesAirbnb").length > 0) {
        showSlidesAirbnb(slideIndexAirbnb);
    }

    // Farm Slideshow
    if (document.getElementsByClassName("mySlidesFarm").length > 0) {
        showSlidesFarm(slideIndexFarm);
    }

    
    // EMAILJS CONTACT FORM LOGIC (FIXED STRUCTURE)
    
    // 1. Initialize EmailJS with your public key FIRST
    emailjs.init("DumK6qSSekRqQCg7-");

    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        // 2. Add the submit listener to the form
        contactForm.addEventListener('submit', function(event) {
            
            event.preventDefault();
            console.log("Form submission attempted.");

            let params = {
                // Combines first and last name using the IDs from your HTML
                name: document.getElementById("first-name").value + ' ' + document.getElementById("last-name").value,
                // Uses 'email' as the key to match your EmailJS Reply To variable ({{email}})
                email: document.getElementById("email").value,
                
                subject: document.getElementById("subject").value,
                message: document.getElementById("message").value,
                phone: document.getElementById("phone").value
            };

            // 4. Send the email using your Service ID and Template ID
            emailjs.send("service_luhayiq", "template_y3opc3c", params)
                .then(function(response) {
                    alert("✨ Your message has been sent! We'll be in touch soon.");
                    contactForm.reset();
                }, function(error) {
                    console.log("EmailJS Error:", error);
                    alert("Oops! Something went wrong. Please check the console for details.");
                });
        });
    }
});