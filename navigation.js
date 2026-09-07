const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.querySelector(".nav-menu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        function() {

            navMenu.classList.toggle(
                "show"
            );


            const isOpen =
                navMenu.classList.contains(
                    "show"
                );


            menuToggle.textContent =
                isOpen ? "✕" : "☰";

        }
    );


    navMenu
        .querySelectorAll("a")
        .forEach(function(link) {

            link.addEventListener(
                "click",
                function() {

                    navMenu.classList.remove(
                        "show"
                    );

                    menuToggle.textContent =
                        "☰";

                }
            );

        });

}