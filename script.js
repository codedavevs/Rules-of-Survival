document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // MAINTENANCE MODE CONFIGURATION
    // Set to true  -> locks the site, hides tabs, displays maintenance screen.
    // Set to false -> site operates normally.
    // ==========================================
    const isUnderMaintenance = false; 

    const statusBadge = document.querySelector('.status-badge');
    const appContainer = document.getElementById('appContainer');
    const maintenanceScreen = document.getElementById('maintenanceScreen');
    const mainNav = document.getElementById('mainNav');
    const menuToggle = document.getElementById('menuToggle');

    if (isUnderMaintenance) {
        if (statusBadge) {
            statusBadge.textContent = "SERVER STATUS: UNDER MAINTENANCE";
            statusBadge.style.borderColor = "var(--danger)";
            statusBadge.style.color = "var(--danger)";
            statusBadge.style.background = "rgba(239, 68, 68, 0.15)";
        }
        if (appContainer) appContainer.style.display = 'none';
        if (maintenanceScreen) maintenanceScreen.style.display = 'flex';
        if (mainNav) mainNav.style.display = 'none';
        if (menuToggle) menuToggle.style.display = 'none';
        return;
    }

    // 1. Navigation Tab Switcher
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabViews = document.querySelectorAll('.tab-view');

    function switchTab(targetId) {
        navTabs.forEach(t => t.classList.toggle('active', t.dataset.target === targetId));
        tabViews.forEach(v => v.classList.toggle('active', v.id === targetId));

        if (menuToggle && mainNav) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('open');
        }
    }

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.target));
    });

    document.querySelectorAll('[data-target-tab]').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.targetTab));
    });

    // 2. Data Source (All 6 ROS Versions with Individual Background Pictures)
    const rosVersions = [
        {
            id: "legacy",
            tag: "LEGACY",
            title: "Ros Legacy",
            shortSummary: "Classic Rules of Survival build • PC & Android",
            desc: "Classic Rules of Survival build. Includes original textures and lobby setup for Ghillie Island and Fearless Fiord.",
            androidSize: "4.6 GB",
            pcSize: "7.70 GB",
            hash: "OPEN BETA TEST",
            logoUrl: "Pictures/Legacy.png",
            bgUrl: "Pictures/Legacy 1.png",
            androidUrl: "https://dl.roslegacy.net/android/apk",
            pcUrl: "https://dl.roslegacy.net/full",
            websiteUrl: "https://roslegacy.net/",
            discordUrl: "https://discord.gg/roslegacy"
        },
        {
            id: "origin",
            tag: "ORIGIN",
            title: "Ros Origin",
            shortSummary: "Community revival package • PC",
            desc: "Community revival package for Ros Origin with custom server configuration and launcher support.",
            androidSize: "--",
            pcSize: "8.57 GB",
            hash: "CLOSE BETA TEST",
            logoUrl: "Pictures/Origin.png",
            bgUrl: "Pictures/Origin 1.png",
            androidUrl: "",
            pcUrl: "https://www.mediafire.com/file_premium/p3otmtt01loahbh/ROS_Origin_Full_Setup_11_10_2026.zip/file?action=check",
            websiteUrl: "https://rosorigin.com/",
            discordUrl: "https://discord.gg/rosorigin"
        },
        {
            id: "venas",
            tag: "VENAS",
            title: "Ros Venas",
            shortSummary: "Custom skins & updated lobby UI • PC",
            desc: "Ros Venas installer package featuring custom skins, updated lobby UI, and private server connectivity.",
            androidSize: "--",
            pcSize: "ON GOING DEVELOPMENT",
            hash: "OPEN BETA TEST",
            logoUrl: "Pictures/Venas.png",
            bgUrl: "Pictures/Photo1.jpg",
            androidUrl: "",
            pcUrl: "",
            websiteUrl: "https://www.venasnetwork.com/",
            discordUrl: "https://discord.gg/dGnZMCWdu"
        },
        {
            id: "infinity",
            tag: "INFINITY",
            title: "Ros Infinity",
            shortSummary: "Unlocked cosmetics & custom maps • PC & Android",
            desc: "Complete Ros Infinity build with unlocked cosmetics, custom maps, and performance optimizations.",
            androidSize: "--",
            pcSize: "5.80 GB",
            hash: "OFFICIAL RELEASE",
            logoUrl: "Pictures/Infinity.png",
            bgUrl: "Pictures/Infinity 1.png",
            androidUrl: "",
            pcUrl: "https://dl.rosinfinity.com/RosInfinity-client-1.6.0.zip",
            websiteUrl: "https://rosinfinity.com/#top",
            discordUrl: "https://discord.gg/YuBcAyUn6"
        },
        {
            id: "reborn",
            tag: "REBORN V2",
            title: "Ros Reborn",
            shortSummary: "Competitive lobbies & modern launcher • PC ",
            desc: "Newest private server iteration featuring modern anti-cheat integration and custom competitive lobbies.",
            androidSize: "--",
            pcSize: "8.80 GB",
            hash: "OFFICIAL RELEASE",
            logoUrl: "Pictures/Reborn.png",
            bgUrl: "Pictures/Reborn 1.png",
            androidUrl: "",
            pcUrl: "https://cdn.rosrebornofficial.com/tb-e10fe767786c090c1ce5/RosRebornLauncher.zip",
            websiteUrl: "https://rosrebornofficial.com/",
            discordUrl: "https://discord.gg/D3myccWTK"
        },
        {
            id: "newgen",
            tag: "NEW GEN",
            title: "Ros New Gen",
            shortSummary: "Next-generation revival build Android & IOS",
            desc: "Enhanced private server edition featuring updated visual shaders, balanced gunplay, and custom seasonal events.",
            androidSize: "TO BE ANNOUNCE",
            pcSize: "--",
            hash: "ALPHA TEST",
            logoUrl: "Pictures/NewGen.png",
            bgUrl: "Pictures/Rules of Survival lobby background.jpg",
            androidUrl: "",
            pcUrl: "",
            websiteUrl: "https://rosnewgen.com/",
            discordUrl: "https://discord.gg/dGnZMCWdu"
        },
        {
            id: "server7",
            tag: "Reload",
            title: "Ros: Reload",
            shortSummary: "Custom revival server • PC & Android",
            desc: "Better Gameplay Awaits You!",
            androidSize: "--",
            pcSize: "6.0 GB",
            hash: "OPEN BETA TEST",
            logoUrl: "Pictures/Reload.png",
            bgUrl: "Pictures/Reload 1.jpg",
            androidUrl: "",
            pcUrl: "https://drive.google.com/file/d/12CWpYwNaGywuw5903W5IeWPoXuFTWypw/view",
            websiteUrl: "https://web.facebook.com/rosreloaded/?_rdc=1&_rdr#",
            discordUrl: "https://discord.gg/vA2EnvHW2"
        }
    ];

    const serverListEl = document.getElementById('serverList');
    const discordListEl = document.getElementById('discordList');
    const homeServersGrid = document.getElementById('homeServersGrid');
    const dlCardEl = document.getElementById('dlCard');
    const menuSubtitleEl = document.getElementById('menuSubtitle');
    const backToListBtn = document.getElementById('backToListBtn');

    const downloadAndroidBtn = document.getElementById('downloadAndroidBtn');
    const downloadPcBtn = document.getElementById('downloadPcBtn');
    const androidStatus = document.getElementById('androidStatus');
    const pcStatus = document.getElementById('pcStatus');

    let activeVersion = null;

    // 3. Render All Views
    function renderServerLists() {
        if (homeServersGrid) {
            homeServersGrid.innerHTML = rosVersions.map((version, index) => {
                const isSwap = index % 2 === 1;
                const hasWebsite = Boolean(version.websiteUrl && version.websiteUrl.trim());
                return `
                    <div class="server-cinematic-banner ${isSwap ? 'swap' : ''}" style="background-image: url('${version.bgUrl}');">
                        <div class="server-cinematic-overlay">
                            <div class="server-cinematic-content">
                                <div class="server-logo-pane">
                                    <img src="${version.logoUrl}" alt="${version.title}" onerror="this.style.display='none'">
                                </div>
                                <div class="server-text-block">
                                    <div class="server-meta-row">
                                        <span class="banner-tag">[ ${version.tag} ]</span>
                                        <span class="web-status-pill">${version.hash}</span>
                                    </div>
                                    <h3>${version.title.toUpperCase()}</h3>
                                    <p>${version.desc}</p>
                                    ${hasWebsite 
                                        ? `<button class="server-portal-btn web-visit-btn" data-url="${version.websiteUrl}"> VISIT WEBSITE ↗</button>` 
                                        : `<button class="server-portal-btn" style="opacity: 0.6; cursor: not-allowed;" disabled>PORTAL COMING SOON</button>`
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        if (serverListEl) {
            serverListEl.innerHTML = rosVersions.map(version => `
                <div class="server-row">
                    <div class="server-row-left">
                        <img src="${version.logoUrl}" alt="${version.title}" class="row-logo" onerror="this.style.display='none'">
                        <div class="server-row-info">
                            <h4>${version.title} Installer</h4>
                            <span>${version.shortSummary}</span>
                        </div>
                    </div>
                    <button class="view-btn" data-id="${version.id}">DOWNLOAD</button>
                </div>
            `).join('');
        }

        if (discordListEl) {
            discordListEl.innerHTML = rosVersions.map(version => {
                const hasDiscord = Boolean(version.discordUrl && version.discordUrl.trim());
                return `
                    <div class="server-row">
                        <div class="server-row-left">
                            <img src="${version.logoUrl}" alt="${version.title}" class="row-logo" onerror="this.style.display='none'">
                            <div class="server-row-info">
                                <h4>${version.title} Community</h4>
                                <span>Official Discord Server • [ ${version.tag} ]</span>
                            </div>
                        </div>
                        ${hasDiscord 
                            ? `<button class="discord-join-btn" data-url="${version.discordUrl}">JOIN DISCORD</button>`
                            : `<button class="discord-join-btn" style="opacity: 0.6; cursor: not-allowed;" disabled>COMING SOON</button>`
                        }
                    </div>
                `;
            }).join('');
        }
    }

    // Event Delegation
    document.addEventListener('click', (e) => {
        const visitBtn = e.target.closest('.web-visit-btn');
        if (visitBtn && visitBtn.dataset.url) {
            window.open(visitBtn.dataset.url, '_blank', 'noopener,noreferrer');
            return;
        }

        const viewBtn = e.target.closest('.view-btn');
        if (viewBtn && viewBtn.dataset.id) {
            openBuildDetails(viewBtn.dataset.id);
            return;
        }

        const discordBtn = e.target.closest('.discord-join-btn');
        if (discordBtn && discordBtn.dataset.url) {
            window.open(discordBtn.dataset.url, '_blank', 'noopener,noreferrer');
        }
    });

    // 4. Build Inspector Logic
    function openBuildDetails(versionId) {
        activeVersion = rosVersions.find(v => v.id === versionId);
        if (!activeVersion) return;

        document.getElementById('dlTag').textContent = activeVersion.tag || "SERVER BUILD";
        document.getElementById('dlTitle').textContent = `${activeVersion.title} Installer`;
        document.getElementById('dlDesc').textContent = activeVersion.desc;
        document.getElementById('androidSize').textContent = activeVersion.androidSize || "N/A";
        document.getElementById('pcSize').textContent = activeVersion.pcSize || "N/A";
        document.getElementById('dlHash').textContent = activeVersion.hash;

        const logoImg = document.getElementById('serverLogoImg');
        logoImg.src = activeVersion.logoUrl;
        logoImg.style.display = activeVersion.logoUrl ? "block" : "none";

        const hasAndroid = Boolean(activeVersion.androidUrl && activeVersion.androidUrl.trim());
        downloadAndroidBtn.style.display = hasAndroid ? "block" : "none";
        androidStatus.textContent = hasAndroid ? "Ready for Android" : "Android build unavailable";
        androidStatus.style.color = hasAndroid ? "var(--text-muted)" : "var(--danger)";

        const hasPc = Boolean(activeVersion.pcUrl && activeVersion.pcUrl.trim());
        downloadPcBtn.style.display = hasPc ? "block" : "none";
        pcStatus.textContent = hasPc ? "Ready for PC" : "PC build unavailable";
        pcStatus.style.color = hasPc ? "var(--text-muted)" : "var(--danger)";

        serverListEl.style.display = "none";
        dlCardEl.style.display = "flex";
        menuSubtitleEl.textContent = `Inspecting ${activeVersion.title} package details.`;
    }

    if (backToListBtn) {
        backToListBtn.addEventListener('click', () => {
            dlCardEl.style.display = "none";
            serverListEl.style.display = "flex";
            menuSubtitleEl.textContent = 'Select a version below and click "Download" to inspect sizes and download options.';
        });
    }

    if (downloadAndroidBtn) {
        downloadAndroidBtn.addEventListener('click', () => {
            if (activeVersion?.androidUrl) {
                androidStatus.textContent = "Opening Android download...";
                androidStatus.style.color = "var(--success)";
                window.open(activeVersion.androidUrl, '_blank', 'noopener,noreferrer');
            }
        });
    }

    if (downloadPcBtn) {
        downloadPcBtn.addEventListener('click', () => {
            if (activeVersion?.pcUrl) {
                pcStatus.textContent = "Opening PC download...";
                pcStatus.style.color = "var(--success)";
                window.open(activeVersion.pcUrl, '_blank', 'noopener,noreferrer');
            }
        });
    }

    // 5. Background Music & Audio Controls
    const bgMusic = document.getElementById('bgMusic');
    const muteBtn = document.getElementById('muteBtn');
    const volumeSlider = document.getElementById('volumeSlider');

    if (bgMusic && muteBtn && volumeSlider) {
        bgMusic.volume = 0.3;

        const startAudioOnInteract = () => {
            bgMusic.play().catch(() => {});
            window.removeEventListener('click', startAudioOnInteract);
            window.removeEventListener('keydown', startAudioOnInteract);
        };
        window.addEventListener('click', startAudioOnInteract);
        window.addEventListener('keydown', startAudioOnInteract);

        muteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            bgMusic.muted = !bgMusic.muted;
            muteBtn.textContent = bgMusic.muted ? "🔇" : "🔊";
        });

        volumeSlider.addEventListener('input', (e) => {
            bgMusic.volume = e.target.value;
            if (bgMusic.volume > 0 && bgMusic.muted) {
                bgMusic.muted = false;
                muteBtn.textContent = "🔊";
            }
        });
    }

    // Mobile Hamburger Menu Toggle
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('open');
        });
    }

    renderServerLists();
});