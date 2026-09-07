function generateNames() {

    const input = document.getElementById("playerName");

    const name = input.value.trim();

    const style = document.getElementById("nameStyle").value;

    const results = document.getElementById("nameResults");


    if (name === "") {

        results.innerHTML = `
            <div class="empty-message">
                ⚠️ Please enter your name first.
            </div>
        `;

        return;
    }


    const names = createNameStyles(name, style);


    results.innerHTML = "";


    names.forEach(function (generatedName) {

        const item = document.createElement("div");

        item.className = "generated-name";


        item.innerHTML = `
            <span class="generated-name-text">
                ${escapeHTML(generatedName)}
            </span>

            <button
                class="copy-name-btn"
                onclick="copyName(this)"
            >
                📋 Copy
            </button>
        `;


        results.appendChild(item);

    });

}


function createNameStyles(name, style) {

    if (style === "symbols") {

        return [
            `亗 ${name} 亗`,
            `乂 ${name} 乂`,
            `『${name}』`,
            `〆${name}〆`,
            `メ${name}メ`,
            `ツ ${name} ツ`,
            `★ ${name} ★`,
            `✦${name}✦`
        ];

    }


    if (style === "brackets") {

        return [
            `『 ${name} 』`,
            `【 ${name} 】`,
            `〖 ${name} 〗`,
            `༺ ${name} ༻`,
            `꧁ ${name} ꧂`,
            `⟦ ${name} ⟧`,
            `《 ${name} 》`,
            `〈 ${name} 〉`
        ];

    }


    if (style === "pro") {

        return [
            `${name}々Pro`,
            `${name}YT`,
            `${name}OP`,
            `${name}X`,
            `${name}亗`,
            `${name}ツ`,
            `iTz ${name}`,
            `Official ${name}`
        ];

    }


    if (style === "royal") {

        return [
            `♛ ${name} ♛`,
            `♕ ${name} ♕`,
            `👑 ${name}`,
            `༒ ${name} ༒`,
            `꧁༒${name}༒꧂`,
            `『♛${name}♛』`,
            `★彡${name}彡★`,
            `⚜ ${name} ⚜`
        ];

    }


    if (style === "dark") {

        return [
            `☠ ${name} ☠`,
            `☬ ${name} ☬`,
            `༒${name}༒`,
            `𒆜 ${name} 𒆜`,
            `乂☠ ${name} ☠乂`,
            `☾ ${name} ☽`,
            `† ${name} †`,
            `⛧ ${name} ⛧`
        ];

    }


    return [name];

}


function copyName(button) {

    const parent = button.parentElement;

    const name = parent.querySelector(
        ".generated-name-text"
    ).textContent;


    navigator.clipboard.writeText(name)
        .then(function () {

            const oldText = button.textContent;

            button.textContent = "✅ Copied";

            setTimeout(function () {

                button.textContent = oldText;

            }, 1200);

        })
        .catch(function () {

            alert("Copy failed. Please copy manually.");

        });

}


function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}