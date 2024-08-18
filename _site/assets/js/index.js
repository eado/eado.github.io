const sliderLeft = () => {
    const w = (window.innerWidth <= 820 ? window.innerWidth * 0.9 : window.innerWidth / 2);
    const slider = document.querySelector(`${window.location.hash} .slider-content`);
    slider.scrollBy({ left: -w, behavior: "smooth" });
};

const sliderRight = () => {
    const w = (window.innerWidth <= 820 ? window.innerWidth * 0.9 : window.innerWidth / 2);
    const slider = document.querySelector(`${window.location.hash} .slider-content`);
    slider.scrollBy({ left: w, behavior: "smooth" });
};

const filter = type => {
    document.querySelectorAll(".selector li").forEach(el => {
        if (el.classList.contains(type)) {
            el.classList.add("selected");
        } else {
            el.classList.remove("selected");
        }
    });

    let idx = 0;
    document.querySelectorAll("section.education > a").forEach(el => {
        if (el.classList.contains(type)) {
            const hover = el.querySelector(".hoverbox");
            if (idx % 2 == 0) {
                hover.classList.remove("right");
                hover.classList.add("left");
            } else {
                hover.classList.remove("left");
                hover.classList.add("right");
            }
            idx++;
            el.style.display = "flex";
        } else {
            el.style.display = "none";
        }
    });
}

var load = () => {
    const heropfp = document.getElementById("heropfp");
    const headerpfp = document.getElementById("headerpfp");
    const headertxt = document.getElementById("headertxt");
    const herotxt = document.getElementById("herotxt");
    const techscroll = document.querySelector("section.tech div");

    headerpfp.style.opacity = 0;
    headertxt.style.opacity = 0;

    filter('work');

    window.onkeyup = (e) => {
        if (e.key === "Escape") {
            window.location.hash = "f";
        }
    }

    window.onscroll = () => {
        const height = 100 * window.scrollY / window.innerHeight;
        const heightQ = Math.round(height);

        if (height >= 9) {
            heropfp.style.opacity = 0;
            headerpfp.style.opacity = 1;
        } else {
            heropfp.style.opacity = 1;
            headerpfp.style.opacity = 0;
        }

        if (height >= 21.5) {
            herotxt.style.opacity = 0;
            headertxt.style.opacity = 1;
        } else {
            herotxt.style.opacity = 1;
            headertxt.style.opacity = 0;
        }

        headertxt.style.background = herotxt.style.background;
        headertxt.style.backgroundClip = "text";

        if (heightQ <= 5) {
            herotxt.innerText = "Hi, I'm Omar!";
        } else if (heightQ == 6) {
            herotxt.innerText = "i, I'm Omar!";
        } else if (heightQ == 7) {
            herotxt.innerText = ", I'm Omar!";
        } else if (heightQ == 8) {
            herotxt.innerText = " I'm Omar!";
        } else if (heightQ == 9) {
            herotxt.innerText = "I'm Omar!";
        } else if (heightQ == 10) {
            herotxt.innerText = "'m Omar!";
        } else if (heightQ == 11) {
            herotxt.innerText = "m Omar!";
        } else if (heightQ == 12) {
            herotxt.innerText = "Omar!";
        } else if (heightQ == 13) {
            herotxt.innerText = "Omar E";
        } else if (heightQ == 14) {
            herotxt.innerText = "Omar El";
        } else if (heightQ == 15) {
            herotxt.innerText = "Omar Ela";
        } else if (heightQ == 16) {
            herotxt.innerText = "Omar Elam";
        } else if (heightQ == 17) {
            herotxt.innerText = "Omar Elamr";
        } else if (heightQ >= 18) {
            herotxt.innerText = "Omar Elamri";
        }

        const clamp = (min, max, val) => Math.max(min, Math.min(max, val));
        const prog = (height - 5) / 15;
        herotxt.style.marginLeft = `calc(${clamp(0, 10, 10 * prog)}vh + ${clamp(0, 1, prog)}rem)`;
        herotxt.style.fontSize = `${7 - 4 * clamp(0, 1, prog)}vh`;
        herotxt.style.background = `linear-gradient(${((height * 30) + 225) % 360}deg, var(--fg), var(--acc))`;
        herotxt.style.backgroundClip = "text";
        herotxt.style.webkitBackgroundClip = "text";
        heropfp.style.height = `${Math.max(10, 50 - 40 * height / 9)}vh`;

        techscroll.scrollTo(window.scrollY - window.innerHeight * 0.25, 0);
    };
}
