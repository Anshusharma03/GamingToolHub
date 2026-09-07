function generateBio() {

    const name =
        document.getElementById("bioName")
        .value
        .trim();

    const game =
        document.getElementById("bioGame")
        .value
        .trim();

    const style =
        document.getElementById("bioStyle")
        .value;

    const results =
        document.getElementById("bioResults");


    if (name === "" || game === "") {

        results.innerHTML = `
            <div class="empty-message">
                ⚠️ Please enter both name and game.
            </div>
        `;

        return;
    }


    const bios =
        createBios(name, game, style);


    results.innerHTML = "";


    bios.forEach(function(bio) {

        const card =
            document.createElement("div");

        card.className = "bio-card";


        card.innerHTML = `
            <div class="bio-text">
                ${escapeHTML(bio)}
            </div>

            <button
                class="copy-bio-btn"
                onclick="copyBio(this)"
            >
                📋
            </button>
        `;


        results.appendChild(card);

    });

}


function createBios(name, game, style) {

    if (style === "pro") {

        return [

            `🎮 ${name}
🔥 ${game} Player
🏆 Dream Big • Play Hard
⚡ Never Give Up`,

            `亗 ${name} 亗
🎯 ${game} Competitive Player
💀 Skills > Luck
🏆 Road To Victory`,

            `『${name}』
🎮 ${game} Gamer
⚡ Clutch Master
🔥 Born To Win`

        ];

    }


    if (style === "attitude") {

        return [

            `👑 ${name}
😎 I Don't Follow Trends
🔥 I Create Them
🎮 ${game} Player`,

            `亗 ${name} 亗
💀 Respect Everyone
🔥 Fear Nobody
🎮 ${game}`,

            `♛ ${name} ♛
😈 Silent Player
💀 Dangerous Game
🔥 ${game}`

        ];

    }


    if (style === "simple") {

        return [

            `🎮 ${name}
Playing ${game}
❤️ Gaming • Music • Life`,

            `Hey, I'm ${name} 👋
🎮 ${game} Player
✨ Enjoying Every Match`,

            `${name} | ${game}
🎮 Gamer
🔥 Keep Playing
❤️ Keep Improving`

        ];

    }


    if (style === "killer") {

        return [

            `☠️ ${name}
💀 No Mercy
🎯 Perfect Aim
🔥 ${game} Killer`,

            `༒ ${name} ༒
☠️ Hunt • Fight • Win
💀 Fear The Name
🎮 ${game}`,

            `𒆜 ${name} 𒆜
💀 One Shot
🔥 One Chance
☠️ ${game} Warrior`

        ];

    }


    if (style === "royal") {

        return [

            `♛ ${name} ♛
👑 Born To Rule
🏆 King Of The Lobby
🎮 ${game}`,

            `👑 Royal ${name}
⚔️ Leader • Fighter
🔥 Crown The Victory
🎮 ${game}`,

            `꧁༺ ${name} ༻꧂
👑 Royal Player
🏆 Never Bow Down
🎮 ${game}`

        ];

    }


    return [`🎮 ${name} | ${game}`];

}


function copyBio(button) {

    const card =
        button.parentElement;

    const text =
        card.querySelector(
            ".bio-text"
        ).textContent.trim();


    navigator.clipboard.writeText(text)

        .then(function() {

            const oldText =
                button.textContent;

            button.textContent =
                "✅";


            setTimeout(function() {

                button.textContent =
                    oldText;

            }, 1200);

        })

        .catch(function() {

            alert(
                "Copy failed. Please copy manually."
            );

        });

}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}