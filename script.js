document.addEventListener("DOMContentLoaded", () => {
    
    // Target Date: June 6, 2026 at 7:00 PM (19:00)
    const weddingDate = new Date("June 6, 2026 19:00:00").getTime();
    
    // Core Elements
    const welcomeScreen = document.getElementById("welcome-screen");
    const enterBtn = document.getElementById("enter-btn");
    const invitationContainer = document.querySelector(".invitation-container");
    const musicToggle = document.getElementById("music-toggle");
    const bgMusic = document.getElementById("bg-music");
    const toast = document.getElementById("toast");
    
    // Navigation / Copy Elements
    const copyLocationBtn = document.getElementById("copy-location-btn");
    const mapsLink = "https://www.google.com/maps/place/30%C2%B000'05.2%22N+31%C2%B012'53.8%22E/@30.0014324,31.2123566,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.0014324!4d31.2149315?hl=en&entry=ttu";

    // Welcome Screen Transition & Music Trigger
    enterBtn.addEventListener("click", () => {
        // Attempt to play audio
        bgMusic.volume = 0.4;
        bgMusic.play().then(() => {
            musicToggle.classList.add("playing");
        }).catch(err => {
            console.log("Audio autoplay prevented or failed:", err);
        });

        // Smooth animations
        welcomeScreen.classList.add("fade-out");
        
        setTimeout(() => {
            welcomeScreen.classList.add("hidden");
            invitationContainer.classList.remove("hidden");
            musicToggle.classList.remove("hidden");
            
            // Start particle animation after layout is shown
            startParticles();
            // Start Countdown
            startCountdown();
        }, 1000);
    });

    // Music Play/Pause Toggle
    musicToggle.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.classList.add("playing");
            showToast("تم تشغيل الموسيقى");
        } else {
            bgMusic.pause();
            musicToggle.classList.remove("playing");
            showToast("تم إيقاف الموسيقى مؤقتاً");
        }
    });

    // Countdown Timer logic
    function startCountdown() {
        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                document.getElementById("countdown-timer").innerHTML = "<div class='wedding-started-msg'>بدأ الفرح بحمد الله! ننتظركم بكل حب</div>";
                return;
            }

            // Calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the results
            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }, 1000);
    }



    // Copy Location Link to Clipboard
    copyLocationBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(mapsLink).then(() => {
            showToast("تم نسخ رابط موقع القاعة بنجاح!");
        }).catch(err => {
            console.error("Could not copy link: ", err);
            showToast("حدث خطأ أثناء نسخ الرابط");
        });
    });



    // Helper: Show custom toast message
    function showToast(message) {
        toast.innerText = message;
        toast.classList.remove("hidden");
        toast.classList.add("show");
        
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => {
                toast.classList.add("hidden");
            }, 300);
        }, 3000);
    }

    // Particles/Falling Leaves effect generator
    function startParticles() {
        const container = document.getElementById("particles-container");
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            createPetal(container);
        }

        // Periodically spawn a new petal to keep it active
        setInterval(() => {
            if (document.querySelectorAll(".petal-particle").length < 35) {
                createPetal(container);
            }
        }, 1200);
    }

    function createPetal(container) {
        const petal = document.createElement("div");
        petal.classList.add("petal-particle");
        
        // Random styling properties
        const left = Math.random() * 100;
        const size = Math.random() * 8 + 6; // 6px to 14px
        const delay = Math.random() * 5;
        const duration = Math.random() * 6 + 6; // 6s to 12s
        const rotation = Math.random() * 360;
        
        // Gold tint varieties
        const tints = ["#bfa37a", "#a88a5d", "#8e6f43", "#e6cca6"];
        const randomTint = tints[Math.floor(Math.random() * tints.length)];
        
        petal.style.left = `${left}%`;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.backgroundColor = randomTint;
        petal.style.animationDelay = `${delay}s`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.transform = `rotate(${rotation}deg)`;
        
        // Set rounded shapes to mimic leaves
        petal.style.borderRadius = "80% 0 85% 0";
        
        container.appendChild(petal);

        // Remove leaf after animation completes to avoid memory leak
        setTimeout(() => {
            petal.remove();
        }, (duration + delay) * 1000);
    }

});
