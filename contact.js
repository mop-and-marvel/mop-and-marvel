// --- MODAL LOGIC (Wrapped in a check) ---
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


/<script>
    // =======================================================
    // RESIDENTIAL SLIDESHOW (Base Logic)
    // =======================================================
    let slideIndex = 1;
    showSlides(slideIndex, 'Residential'); // Initial call
    
    // Auto-play for Residential (using plusSlidesResidential)
    setInterval(() => plusSlidesResidential(1), 4000); 

    function plusSlidesResidential(n) {
        showSlides(slideIndex += n, 'Residential');
    }
    
    // Note: The Residential 'mySlides' and dots need an 'id' or a new class 
    // to distinguish them if you add more slideshows, but for now we'll 
    // stick to the original logic which is likely in your CSS.
    
    // =======================================================
    // COMMERCIAL SLIDESHOW
    // =======================================================
    let slideIndexCommercial = 1;
    showSlidesCommercial(slideIndexCommercial); // Initial call

    function plusSlidesCommercial(n) {
        showSlidesCommercial(slideIndexCommercial += n);
    }
    function showSlidesCommercial(n) {
        let slides = document.getElementsByClassName("mySlidesCommercial");
        let dots = document.getElementsByClassName("commercial-dot"); // Assuming you have dots
        // Standard slideshow logic (removed for brevity, but use your logic)
        for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
        if (n > slides.length) { slideIndexCommercial = 1 }
        if (n < 1) { slideIndexCommercial = slides.length }
        slides[slideIndexCommercial - 1].style.display = "block";
    }

    // =======================================================
    // AIRBNB SLIDESHOW
    // =======================================================
    let slideIndexAirbnb = 1;
    showSlidesAirbnb(slideIndexAirbnb); // Initial call

    function plusSlidesAirbnb(n) {
        showSlidesAirbnb(slideIndexAirbnb += n);
    }
    function showSlidesAirbnb(n) {
        let slides = document.getElementsByClassName("mySlidesAirbnb");
        let dots = document.getElementsByClassName("airbnb-dot"); // Assuming you have dots
        // Standard slideshow logic
        for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
        if (n > slides.length) { slideIndexAirbnb = 1 }
        if (n < 1) { slideIndexAirbnb = slides.length }
        slides[slideIndexAirbnb - 1].style.display = "block";
    }
    
    // =======================================================
    // FARM SLIDESHOW (MUST BE UNIQUE NAMES)
    // =======================================================
    let slideIndexFarm = 1;
    showSlidesFarm(slideIndexFarm); // Initial call

    function plusSlidesFarm(n) {
        showSlidesFarm(slideIndexFarm += n);
    }
    
    function currentSlideFarm(n) {
        showSlidesFarm(slideIndexFarm = n);
    }

    function showSlidesFarm(n) {
        let slides = document.getElementsByClassName("mySlidesFarm");
        let dots = document.getElementsByClassName("farm-dot");
        
        // Wrap around logic
        if (n > slides.length) { slideIndexFarm = 1}
        if (n < 1) { slideIndexFarm = slides.length}
        
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        // Deactivate all dots
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        
        // Show the current slide and activate the dot
        slides[slideIndexFarm - 1].style.display = "block";
        dots[slideIndexFarm - 1].className += " active";
    }
</script>

// This ensures the script runs only after the entire document is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if the form exists before trying to attach the listener
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            
            // 1. IMPORTANT: Prevents the page from reloading
            event.preventDefault();

            // 2. Define the email parameters using the CORRECT IDs (lowercase subject, 'phone')
           let params = {
            // ...
            subject: document.getElementById("subject").value,
            
            // CHANGE THIS KEY to 'reply_to' or 'from_email'
            "reply_to": document.getElementById("email").value,    
            
            // Change this key to something simple like 'phone'
            "phone": document.getElementById("phone").value, 
            
            message: document.getElementById("message").value,
        };

            // 3. Send the email using your specific EmailJS IDs
            emailjs.send("service_luhayiq", "template_y3opc3c", params)
                .then(function(response) {
                    alert("Email Sent successfully!");
                    // Optional: Clear the form after success
                    contactForm.reset();
                }, function(error) {
                    // This error is crucial for debugging!
                    alert("Email failed to send. Please check console for details. Error: " + error.text);
                });
        });
    }
});
