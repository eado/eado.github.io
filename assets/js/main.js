var darkMode = false;

var setMode = (mode) => {
    const root = document.querySelector(":root");
    const button = document.querySelectorAll(".darkbutton ion-icon");
    const text = document.querySelectorAll(".darkbutton span");
    darkMode = mode;

    if (darkMode) {
        button.forEach(el => el.name = "moon");
        text.forEach(el => el.innerText = "Dark");
        root.style.setProperty('--bg', '#101010');
        root.style.setProperty('--fg', '#ffffff');
        root.style.setProperty('--acc', '#3d7adb');
    } else {
        button.forEach(el => el.name = "sunny");
        text.forEach(el => el.innerText = "Light");
        root.style.setProperty('--bg', '#ffffff');
        root.style.setProperty('--fg', '#101010');
        root.style.setProperty('--acc', '#2065d7');
    }

    if (localStorage) {
        localStorage.setItem("darkMode", mode ? "true" : "false");
    }
}

window.onload = () => {
    if (window.matchMedia) {
        const query = window.matchMedia('(prefers-color-scheme: dark)');

        if (!localStorage || !localStorage.getItem("darkMode")) {
            darkMode = query.matches;
            setMode(darkMode);
        }

        query.onchange = (e) => { darkMode = e.matches; setMode(e.matches); };
    }

    if (localStorage && localStorage.getItem("darkMode")) {
        setMode(localStorage.getItem("darkMode") == "true");
    }

    load();
}
