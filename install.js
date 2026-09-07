let deferredInstallPrompt = null;

const installButton =
    document.getElementById("installAppBtn");


window.addEventListener(
    "beforeinstallprompt",
    function(event) {

        event.preventDefault();

        deferredInstallPrompt = event;


        if (installButton) {

            installButton.style.display =
                "block";

        }

    }
);


if (installButton) {

    installButton.addEventListener(
        "click",
        async function() {

            if (!deferredInstallPrompt) {

                alert(
                    "Install option is not available yet. Open this website using a supported browser over HTTPS."
                );

                return;

            }


            deferredInstallPrompt.prompt();


            const result =
                await deferredInstallPrompt
                    .userChoice;


            if (
                result.outcome ===
                "accepted"
            ) {

                installButton.style.display =
                    "none";

            }


            deferredInstallPrompt = null;

        }
    );

}


window.addEventListener(
    "appinstalled",
    function() {

        if (installButton) {

            installButton.style.display =
                "none";

        }

        console.log(
            "GamingTools Hub installed."
        );

    }
);