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

// ===== FOOTER YEAR =====
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ===== PRICES =====
const prices = {
    "Prishtina": {"New York":399,"Paris":299,"Tokyo":749,"Dubai":499,"Berlin":279,"London":350,"Rome":320},
    "Tirana": {"New York":420,"Paris":310,"Tokyo":770,"Dubai":520,"Berlin":290,"London":360,"Rome":330},
    "Shkup": {"New York":430,"Paris":320,"Tokyo":780,"Dubai":530,"Berlin":295,"London":370,"Rome":335},
    "Podgorica": {"New York":450,"Paris":340,"Tokyo":800,"Dubai":550,"Berlin":310,"London":380,"Rome":350},
    "Sarajevo": {"New York":440,"Paris":330,"Tokyo":790,"Dubai":540,"Berlin":305,"London":375,"Rome":345}
};

const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const passengersInput = document.getElementById("passengers");
const returnInput = document.getElementById("return");
const departInput = document.getElementById("depart");

// ===== RETURN DATE =====
if (departInput && returnInput) {
    departInput.addEventListener("change", () => {
        returnInput.min = departInput.value;
    });
}

// ===== LIVE PRICE CALCULATION =====
function updateLivePrice() {
    const from = fromInput.value;
    const to = toInput.value;
    const passengers = parseInt(passengersInput.value) || 0;
    const retDate = returnInput.value;

    if (!from || !to || !passengers) {
        livePriceBox.textContent = "Çmimi: $0";
        return;
    }

    let pricePerPerson = prices[from] ? prices[from][to] : 0;
    if (retDate) pricePerPerson *= 2;

    const totalPrice = pricePerPerson * passengers;
    livePriceBox.textContent = `Çmimi: $${totalPrice}`;
}

[fromInput, toInput, passengersInput, returnInput].forEach(el => {
    if (el) el.addEventListener("change", updateLivePrice);
});