function generateSensitivity() {

    const game = document.getElementById("game").value;
    const device = document.getElementById("device").value;
    const style = document.getElementById("style").value;

    let base;

    if (device === "low") {
        base = 75;
    } 
    else if (device === "mid") {
        base = 85;
    } 
    else {
        base = 95;
    }


    if (style === "rush") {
        base += 5;
    }

    if (style === "long") {
        base -= 5;
    }


    let settings;


    if (game === "bgmi") {

        settings = {
            "Camera": base,
            "ADS": base - 5,
            "Red Dot": base + 3,
            "2x Scope": base - 2,
            "3x Scope": base - 8,
            "4x Scope": base - 12,
            "6x Scope": base - 18,
            "8x Scope": base - 25
        };

    }


    else if (game === "freefire") {

        settings = {
            "General": Math.min(base + 10, 100),
            "Red Dot": base + 5,
            "2x Scope": base,
            "4x Scope": base - 5,
            "Sniper Scope": base - 15,
            "Free Look": base + 10
        };

    }


    else {

        settings = {
            "Standard": base,
            "ADS": base - 5,
            "Red Dot": base + 2,
            "2x Tactical": base - 4,
            "3x Tactical": base - 8,
            "4x Tactical": base - 12,
            "Sniper": base - 20
        };

    }


    let html = "";

    for (const name in settings) {

        html += `
            <div class="setting-row">

                <span class="setting-name">
                    ${name}
                </span>

                <span class="setting-value">
                    ${settings[name]}
                </span>

            </div>
        `;

    }


    document.getElementById("settings").innerHTML = html;

    document.getElementById("result").classList.remove("hidden");

    window.currentSettings = settings;
}


function copySettings() {

    if (!window.currentSettings) {
        return;
    }


    let text = "GamingTools Hub - Sensitivity Settings\n\n";


    for (const name in window.currentSettings) {

        text += name + ": " +
                window.currentSettings[name] +
                "\n";

    }


    navigator.clipboard.writeText(text)
        .then(function () {

            alert("Settings copied! 📋");

        })
        .catch(function () {

            alert("Copy failed. Please copy manually.");

        });

}