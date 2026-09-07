function generateClanNames() {

    const input = document.getElementById("clanKeyword");

    const keyword = input.value.trim();

    const style = document.getElementById("clanStyle").value;

    const results = document.getElementById("clanResults");


    if (keyword === "") {

        results.innerHTML = `
            <div class="empty-message">
                ⚠️ Please enter a keyword first.
            </div>
        `;

        return;
    }


    const names = createClanStyles(keyword, style);


    results.innerHTML = "";


    names.forEach(function (clanName) {

        const item = document.createElement("div");

        item.className = "generated-clan";


        item.innerHTML = `
            <span class="generated-clan-text">
                ${escapeHTML(clanName)}
            </span>

            <button
                class="copy-clan-btn"
                onclick="copyClanName(this)"
            >
                📋 Copy
            </button>
        `;


        results.appendChild(item);

    });

}


function createClanStyles(keyword, style) {

    if (style === "pro") {

        return [
            `${keyword} Esports`,
            `${keyword} Gaming`,
            `${keyword} Elite`,
            `${keyword} X`,
            `${keyword} OP`,
            `${keyword} Force`,
            `${keyword} Squad`,
            `${keyword} Pro`
        ];

    }


    if (style === "royal") {

        return [
            `Royal ${keyword}`,
            `Kings of ${keyword}`,
            `${keyword} Royals`,
            `King ${keyword}`,
            `${keyword} Empire`,
            `Royal ${keyword} X`,
            `Crown ${keyword}`,
            `${keyword} Dynasty`
        ];

    }


    if (style === "war") {

        return [
            `${keyword} Warriors`,
            `${keyword} Titans`,
            `${keyword} Hunters`,
            `${keyword} Legends`,
            `${keyword} Fighters`,
            `${keyword} Soldiers`,
            `${keyword} Destroyers`,
            `${keyword} Invaders`
        ];

    }


    if (style === "dark") {

        return [
            `${keyword} Ghosts`,
            `${keyword} Demons`,
            `${keyword} Shadows`,
            `${keyword} Killers`,
            `${keyword} Devils`,
            `${keyword} Reapers`,
            `${keyword} Darkness`,
            `${keyword} Venom`
        ];

    }


    if (style === "short") {

        return [
            `${keyword}X`,
            `${keyword}OP`,
            `${keyword}YT`,
            `${keyword}GG`,
            `${keyword}FX`,
            `${keyword}7`,
            `${keyword}99`,
            `X${keyword}`
        ];

    }


    return [keyword];

}


function copyClanName(button) {

    const parent = button.parentElement;

    const name = parent.querySelector(
        ".generated-clan-text"
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