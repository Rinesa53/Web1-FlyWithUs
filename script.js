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