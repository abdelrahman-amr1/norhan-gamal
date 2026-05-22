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

    // Particles/Falling Hearts effect generator
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
        }, 1000);
    }

    function createPetal(container) {
        const petal = document.createElement("div");
        petal.classList.add("petal-particle");
        
        // Random styling properties
        const left = Math.random() * 100;
        const size = Math.random() * 10 + 16; // 16px to 26px (perfect size for heart vectors)
        const delay = Math.random() * 5;
        const duration = Math.random() * 7 + 6; // 6s to 13s
        const rotation = Math.random() * 360;
        
        // Rose tint varieties with a touch of luxury gold
        const tints = [
            "#ff7597", "#ff4b72", "#e8436a", "#f9a8b9", "#ffb3c1", 
            "#ff8da1", "#bfa37a", "#a88a5d", "#d4af37"
        ];
        const randomTint = tints[Math.floor(Math.random() * tints.length)];
        
        petal.style.left = `${left}%`;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.animationDelay = `${delay}s`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.transform = `rotate(${rotation}deg)`;
        
        // SVG Rose Heart HTML Structure
        petal.innerHTML = `
            <svg viewBox="0 0 24 24" fill="${randomTint}" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        `;
        
        // Click / Touch pop effect trigger
        petal.addEventListener("mousedown", (e) => {
            e.stopPropagation();
            e.preventDefault();
            popHeart(petal, randomTint);
        });

        petal.addEventListener("touchstart", (e) => {
            e.stopPropagation();
            e.preventDefault();
            popHeart(petal, randomTint);
        }, { passive: false });
        
        container.appendChild(petal);

        // Remove petal after animation completes to avoid memory leak
        setTimeout(() => {
            petal.remove();
        }, (duration + delay) * 1000);
    }

    // Explode/Pop Action
    function popHeart(petal, color) {
        // Position coordinates of click
        const rect = petal.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Spark explosion
        createExplosion(x, y, color);
        
        // Remove element
        petal.remove();
    }

    // Generate popping sparks
    function createExplosion(x, y, color) {
        const particleCount = 12;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.classList.add("explosion-particle");
            
            // 40% of sparks are mini hearts, 60% are standard rounds
            if (Math.random() < 0.4) {
                particle.classList.add("explosion-heart");
            }
            
            particle.style.backgroundColor = color;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // Random angle and push distance
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 90 + 40; // 40px to 130px travel radius
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.setProperty("--tx", `${tx}px`);
            particle.style.setProperty("--ty", `${ty}px`);
            
            // Random scaling
            const size = Math.random() * 6 + 4; // 4px to 10px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            document.body.appendChild(particle);
            
            // Garbage collection
            setTimeout(() => {
                particle.remove();
            }, 600);
        }
    }

});
