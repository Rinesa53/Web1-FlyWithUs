// ===== NAVIGATION =====

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

// ===== BOOKING FORM =====

const bookingForm = document.getElementById("bookingForm");
const livePriceBox = document.getElementById("livePrice");

if (bookingForm) {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const from = document.getElementById("from");
    const to = document.getElementById("to");
    const depart = document.getElementById("depart");
    const ret = document.getElementById("return");
    const passengers = document.getElementById("passengers");

    [name, email].forEach(input => input.setAttribute("autocomplete", "off"));

    // Booking Form Validation
    [name, email, from, to, depart, passengers, ret].forEach(input =>
        input.addEventListener("input", () => input.setCustomValidity(""))
    );

    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();

        function checkField(field, condition, message) {
            if (condition) {
                field.setCustomValidity(message);
                field.reportValidity();
                field.focus();
                return false;
            } else {
                field.setCustomValidity("");
            }
            return true;
        }

        if (
            !checkField(name, !name.value.trim(), "Ju lutem plotësoni emrin.") ||
            !checkField(name, name.value.length < 2, "Emri duhet të ketë të paktën 2 karaktere.") ||
            !checkField(email, !email.value.trim(), "Ju lutem vendosni email-in.") ||
            !checkField(email, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), "Ju lutem vendosni një email valid") ||
            !checkField(from, !from.value.trim(), "Ju lutem zgjedhni vendin e nisjes.") ||
            !checkField(to, !to.value.trim(), "Ju lutem zgjedhni destinacionin.") ||
            !checkField(depart, !depart.value, "Ju lutem zgjedhni datën e nisjes.")
        ) return;

        // Booking Success Popup
        const message = `
            Rezervimi është bërë me sukses, <strong>${name.value}</strong>!<br><br>
            Ju do të udhëtoni nga <strong>${from.value}</strong> drejt <strong>${to.value}</strong>
            për <strong>${passengers.value}</strong> pasagjer(ë) më datën 
            <span style="white-space: nowrap;"><strong>${depart.value}</strong></span>
            ${ret.value ? ` dhe kthim më <span style="white-space: nowrap;"><strong>${ret.value}</strong></span>.` : "."}
            <br><br>
            Ne do t'ju kontaktojmë së shpejti në <strong>${email.value}</strong>.
        `;

        const successPopup = document.getElementById("successPopup");
        document.getElementById("popupMessage").innerHTML = message;
        $("#successPopup").css("display", "flex").hide().fadeIn(400);

        const closeBtn = document.getElementById("closePopup");
        closeBtn.onclick = () => {
            $("#successPopup").fadeOut(400);
        };

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") $("#successPopup").fadeOut(400);
        });

        successPopup.addEventListener("click", (e) => {
            if (e.target === successPopup) {
                $("#successPopup").fadeOut(400);
            }
        });

        bookingForm.reset();
        updateLivePrice();
    });
}

// ===== CONTACT FORM =====

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form-box");
    if (!contactForm) return;

    const cName = document.getElementById("c-name");
    const cEmail = document.getElementById("c-email");
    const cMessage = document.getElementById("c-message");

    [cName, cEmail].forEach(input => input.setAttribute("autocomplete", "off"));

    [cName, cEmail, cMessage].forEach(input =>
        input.addEventListener("input", () => input.setCustomValidity(""))
    );

    // Contact Success Popup
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

    contactClose.addEventListener("click", () => $("#contactPopup").fadeOut(400));
    contactPopup.addEventListener("click", (e) => {
        if (e.target === contactPopup) $("#contactPopup").fadeOut(400);
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") $("#contactPopup").fadeOut(400);
    });

    // Contact Form Validation
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        function checkField(field, condition, message) {
            if (condition) {
                field.setCustomValidity(message);
                field.reportValidity();
                field.focus();
                return false;
            }
            field.setCustomValidity("");
            return true;
        }

        if (
            !checkField(cName, !cName.value.trim(), "Ju lutem plotësoni emrin.") ||
            !checkField(cName, cName.value.trim().length < 2, "Emri duhet të ketë të paktën 2 karaktere.") ||
            !checkField(cEmail, !cEmail.value.trim(), "Ju lutem vendosni email-in.") ||
            !checkField(cEmail, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cEmail.value.trim()), "Ju lutem vendosni një email valid.") ||
            !checkField(cMessage, !cMessage.value.trim(), "Ju lutem shkruani mesazhin.")
        ) return;

        $("#contactPopup").css("display", "flex").hide().fadeIn(400);

        contactForm.reset();
    });
});

// ===== DESTINATIONS =====

document.querySelectorAll(".card-btn").forEach(button => {
    button.addEventListener("click", () => {
        const city = button.getAttribute("data-city");
        const toInput = document.getElementById("to");
        const bookingSection = document.getElementById("booking");

        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: "smooth" });
        }

        if (toInput && city) {
            toInput.value = city;
            updateLivePrice();
        }
    });
});

// ===== FOOTER YEAR =====

const yearSpan = document.getElementById("year");
if (yearSpan) {yearSpan.textContent = new Date().getFullYear();}

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

// ===== DEPARTURE AND RETURN DATE =====

const today = new Date().toISOString().split("T")[0];
if (departInput) departInput.setAttribute("min", today);

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

// ===== Callback, Timeout, String/Date, DOM effects, Array =====

function runCallback(message, callback) { callback(message); }
runCallback("Callback funksioni u ekzekutua.", msg => console.log(msg));

setTimeout(() => console.log("Timeout u ekzekutua pas 1.5 sekondash."), 1500);

const exampleCity = "  prishtina  ";
console.log("Trim:", exampleCity.trim());
console.log("Uppercase:", exampleCity.trim().toUpperCase());
console.log("Includes 'pri'?", exampleCity.toLowerCase().includes("pri"));

console.log("Data e sotme:", new Date().toLocaleDateString());

const mainTitle = document.querySelector("h1");
if (mainTitle) {
    mainTitle.style.transition = "0.4s ease";
    mainTitle.addEventListener("mouseover", () => mainTitle.style.transform = "scale(1.03)");
    mainTitle.addEventListener("mouseout", () => mainTitle.style.transform = "scale(1)");
}

const samplePrices = [120, 250, 400, 90];
console.log("MAP:", samplePrices.map(p => p + 10));
console.log("FILTER:", samplePrices.filter(p => p > 200));
console.log("REDUCE:", samplePrices.reduce((acc, val) => acc + val, 0));