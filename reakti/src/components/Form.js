import React from 'react';
function Form() {
    return (
    <section class="about-form">
    <div class="about-form-text">
        <h2>Krijo llogarinë tënde</h2>
        <p>
            Regjistrohu falas për të ruajtur destinacionet e preferuara,
            për të marrë oferta me email dhe për të menaxhuar rezervimet në një vend.
        </p>
        <ul class="about-list">
            <li>Ruaj të dhënat e udhëtimit për përdorim të mëvonshëm</li>
            <li>Merr njoftime për ulje çmimesh</li>
            <li>Menaxho rezervimet në çdo pajisje</li>
        </ul>
</div>

    <div class="about-form-box" id="about-form-box">
        <h3>Regjistrohu / Login</h3>
        <form>
            <input type="text" placeholder="Emri i Plotë"/>
            <input type="email" placeholder="Email"/>
            <input type="text" placeholder="Përdoruesi"/>
            <input type="password" placeholder="Fjalëkalimi"/>
            <button type="submit">Vazhdo</button>
        </form>
    </div>
</section>

)
}
export default Form;