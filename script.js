function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

// ===== BOOKING FORM LOGIC =====
const bookingForm = document.getElementById("bookingForm");
const livePriceBox = document.getElementById("livePrice");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const from = document.getElementById("from").value.trim();
        const to = document.getElementById("to").value.trim();
        const depart = document.getElementById("depart").value;
        const ret = document.getElementById("return").value;
        const passengers = parseInt(document.getElementById("passengers").value);

        // Booking Form Validation
if (!name || !email || !from || !to || !depart || !passengers) {
    alert("Ju lutem plotësoni të gjitha fushat.");
    return;
}

if (!email.includes("@") || !email.includes(".")) {
    alert("Ju lutem vendosni një email valid.");
    return;
}

// Booking Success Popup
        const message = `
            Rezervimi është bërë me sukses, <strong>${name}</strong>!<br><br>
            Ju do të udhëtoni nga <strong>${from}</strong> drejt <strong>${to}</strong>
            për <strong>${passengers}</strong> pasagjer(ë) më datën 
            <span style="white-space: nowrap;"><strong>${depart}</strong></span>
            ${ret ? ` dhe kthim më <span style="white-space: nowrap;"><strong>${ret}</strong></span>.` : "."}
            <br><br>
            Ne do t'ju kontaktojmë së shpejti në <strong>${email}</strong>.
        `;

        const successPopup = document.getElementById("successPopup");
        document.getElementById("popupMessage").innerHTML = message;
        $("#successPopup")
  .css("display", "flex")
  .hide()
  .fadeIn(400);


        const closeBtn = document.getElementById("closePopup");
        closeBtn.onclick = () => { $("#successPopup").fadeOut(400); };

        document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        $("#successPopup").fadeOut(400);
    }
}, { once: true });

successPopup.addEventListener("click", (e) => {
    if (e.target === successPopup) {
        $("#successPopup").fadeOut(400);
    }
});

        bookingForm.reset();
        updateLivePrice();
    });
}

// ===== CONTACT FORM POPUP =====
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form-box");
    if (!contactForm) return;

    const contactPopup = document.createElement("div");
    contactPopup.id = "contactPopup";
    contactPopup.className = "popup-overlay";
    contactPopup.innerHTML = `
        <div class="popup-box">
            <h2>Mesazhi u dërgua me sukses!</h2>
            <button id="contactClose">Mbylle</button>
        </div>
    `;
    document.body.appendChild(contactPopup);

    const contactClose = document.getElementById("contactClose");

    contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("c-name").value.trim();
    const email = document.getElementById("c-email").value.trim();
    const message = document.getElementById("c-message").value.trim();

     // Contact Form Validation
    if (!name || !email || !message) {
        alert("Ju lutem plotësoni emrin, email-in dhe mesazhin.");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Ju lutem vendosni një email valid.");
        return;
    }

    // Contact Success popup
    $("#contactPopup")
        .css("display", "flex")
        .hide()
        .fadeIn(400);

    contactForm.reset();
});

    contactClose.addEventListener("click", () => {
    $("#contactPopup").fadeOut(400);
});

    contactPopup.addEventListener("click", (e) => {
    if (e.target === contactPopup) {
        $("#contactPopup").fadeOut(400);
    }
});

    document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        $("#contactPopup").fadeOut(400);
    }
});

});

// ===== DESTINATION BUTTON LOGIC =====
document.querySelectorAll(".card-btn").forEach(button => {
    button.addEventListener("click", () => {
        const city = button.getAttribute("data-city");
        const toInput = document.getElementById("to");
        const bookingSection = document.getElementById("booking");
        if (bookingSection) bookingSection.scrollIntoView({ behavior: "smooth" });
        if (toInput && city) {
            toInput.value = city;
            updateLivePrice();
        }
    });
});