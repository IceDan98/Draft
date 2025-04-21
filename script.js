// script.js - v8.0 - Simplified Test
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded. Initializing App v8.0-simplified-test...");

    // --- Page Elements ---
    const appContainer = document.getElementById('app-container');
    const homePage = document.getElementById('homePage');
    const draftPage = document.getElementById('draftPage'); // Needed for navigateTo
    const adminButton = document.getElementById('adminButton');
    const themeToggleButton = document.getElementById('themeToggleButton');
    const team1NameInput = document.getElementById('team1NameInput');
    const team2NameInput = document.getElementById('team2NameInput');
    const createLobbyButton = document.getElementById('createLobbyButton');
    const lobbyLinksDisplay = document.getElementById('lobbyLinksDisplay');
    const judgeLinkText = document.getElementById('judgeLinkText');
    const team1LinkText = document.getElementById('team1LinkText');
    const team2LinkText = document.getElementById('team2LinkText');
    // Draft page elements are not needed for this test yet
    let statusMessage = document.getElementById('statusMessage'); // Needed for showStatusMessage

    // --- State Variables ---
    let currentPage = 'home';
    let currentUserRole = null; // Keep for getRoleFromHash
    let currentTheme = localStorage.getItem('theme') || 'dark';
    let statusTimeout = null; // Keep for showStatusMessage

    // --- Helper Functions ---
    const showStatusMessage = (message, duration = 3000) => {
        if (!statusMessage) statusMessage = document.getElementById('statusMessage');
        if (!statusMessage) { console.warn("Status message element not found for:", message); return; }
        statusMessage.textContent = message;
        statusMessage.classList.add('visible');
        clearTimeout(statusTimeout);
        statusTimeout = setTimeout(() => { statusMessage.classList.remove('visible'); }, duration);
    };
    async function copyToClipboard(text) { /* ... unchanged ... */ } // Keep for lobby links

    // --- Theme Toggle Functions ---
    function applyTheme(theme) {
        console.log(`Applying theme: ${theme}`);
        document.documentElement.dataset.theme = theme;
        console.log(`DEBUG: html data-theme = ${document.documentElement.dataset.theme}`);
        if (themeToggleButton) {
            themeToggleButton.textContent = theme === 'dark' ? '🌙' : '☀️';
            themeToggleButton.title = theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на темную тему';
        } else {
            console.warn("applyTheme: themeToggleButton not found.");
        }
     }
    function toggleTheme() {
        console.log("--- toggleTheme called ---");
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        console.log(`Toggling theme to: ${currentTheme}`);
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    }

    // --- Navigation & Role Handling ---
    function navigateTo(pageName) {
        console.log(`DEBUG: navigateTo called with pageName: ${pageName}`);

        currentPage = pageName; // Update current page state

        // Hide all pages first
        if(homePage) homePage.classList.add('hidden');
        if(draftPage) draftPage.classList.add('hidden');

        // Hide top right buttons by default
        console.log(`DEBUG navigateTo: Using global refs adminButton=${!!adminButton}, themeButton=${!!themeToggleButton}`);
        if(adminButton) adminButton.classList.add('hidden'); else console.log("DEBUG navigateTo: global adminButton ref is null/falsy when trying to hide");
        if(themeToggleButton) themeToggleButton.classList.add('hidden'); else console.log("DEBUG navigateTo: global themeToggleButton ref is null/falsy when trying to hide");

        // Show the target page and appropriate buttons
        if (pageName === 'home') {
            if(homePage) {
                homePage.classList.remove('hidden');
                console.log("DEBUG navigateTo: Showing homePage");
            } else { console.error("navigateTo: homePage element not found!"); }

            if(adminButton) {
                adminButton.classList.remove('hidden');
                console.log("DEBUG navigateTo: Removed 'hidden' from adminButton");
            } else { console.log("DEBUG navigateTo: adminButton ref is null/falsy when trying to show"); }

            if(themeToggleButton) {
                themeToggleButton.classList.remove('hidden');
                console.log("DEBUG navigateTo: Removed 'hidden' from themeToggleButton");
            } else { console.log("DEBUG navigateTo: themeToggleButton ref is null/falsy when trying to show"); }

            // Clear hash if returning home without being admin
            if (window.location.hash && currentUserRole !== 'admin') {
                currentUserRole = null;
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
        } else if (pageName === 'draft') {
             if(draftPage) {
                 draftPage.classList.remove('hidden');
                 console.log("DEBUG navigateTo: Showing draftPage (currently blank)");
             } else { console.error("navigateTo: draftPage element not found!"); }
             console.log("DEBUG navigateTo: Keeping top-right buttons hidden for draft page");
             // --- Temporarily REMOVED initializeAppDraft() call ---
             // if (!isDraftInitialized) {
             //    console.log("Initializing draft simulator for the first time...");
             //    initializeAppDraft(); // This would normally load draft data
             // } else { ... }
        }
    }

    function getRoleFromHash() {
        const hash = window.location.hash;
        if (hash.startsWith('#role=')) {
            const role = hash.substring(6);
            // Basic check if role looks valid (add more checks if needed)
            if (['judge', 'team1', 'team2'].includes(role)) {
                return role;
            }
        }
        return null;
     }

    // --- Home Page Logic ---
    function handleCreateLobby() {
        console.log("--- handleCreateLobby called ---"); // DEBUG
        const team1Name = team1NameInput.value.trim() || "Синяя Команда";
        const team2Name = team2NameInput.value.trim() || "Красная Команда";
        localStorage.setItem('lobbyTeam1Name', team1Name);
        localStorage.setItem('lobbyTeam2Name', team2Name);
        const baseUrl = window.location.origin + window.location.pathname;
        const judgeLink = baseUrl + '#role=judge';
        const team1Link = baseUrl + '#role=team1';
        const team2Link = baseUrl + '#role=team2';
        if (judgeLinkText) judgeLinkText.textContent = judgeLink;
        if (team1LinkText) team1LinkText.textContent = team1Link;
        if (team2LinkText) team2LinkText.textContent = team2Link;
        if (lobbyLinksDisplay) lobbyLinksDisplay.classList.remove('hidden');
        showStatusMessage("Лобби создано! Скопируйте ссылки.", 3000);
    }

    function handleAdminClick() {
        console.log("--- handleAdminClick called ---"); // DEBUG
        currentUserRole = 'admin';
        // userTeamSide = null; // Not relevant in simplified version
        const team1Name = team1NameInput.value.trim() || "Синяя Команда";
        const team2Name = team2NameInput.value.trim() || "Красная Команда";
        localStorage.setItem('lobbyTeam1Name', team1Name);
        localStorage.setItem('lobbyTeam2Name', team2Name);
        navigateTo('draft');
    }

    // --- Listeners for Home page ---
    if (createLobbyButton) {
        createLobbyButton.addEventListener('click', handleCreateLobby);
        console.log("DEBUG: Listener attached to createLobbyButton");
    } else { console.warn("Create Lobby Button not found! Listener not attached."); }

    document.querySelectorAll('.copy-button').forEach(button => {
         button.addEventListener('click', (event) => {
             const linkId = event.target.dataset.linkId;
             const linkSpan = document.getElementById(linkId);
             if (linkSpan) {
                 copyToClipboard(linkSpan.textContent);
             } else { console.warn("Copy link span not found for id:", linkId); }
         });
     });

    if (adminButton) {
        adminButton.addEventListener('click', handleAdminClick);
         console.log("DEBUG: Listener attached to adminButton");
    } else { console.warn("Admin Button not found! Listener not attached."); }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
        console.log("DEBUG: Listener attached to themeToggleButton.");
    } else { console.warn("Theme toggle button not found! Listener not attached."); }


    // --- REMOVED Draft Specific Functions ---
    // initializeAppDraft, loadChampionData, displayChampions, updateDraftUI,
    // checkDraftElements, applyRolePermissions, updateNicknameEditability,
    // timer functions, draft logic functions, action handlers (except home page),
    // tooltip functions, etc.


    // --- Initial App Setup ---
     applyTheme(currentTheme); // Apply theme
     const initialRole = getRoleFromHash();
     if (initialRole) {
         // In this simplified version, just log the role found
         console.log(`DEBUG: Role '${initialRole}' found in hash, navigating to draft page (blank).`);
         currentUserRole = initialRole; // Set role for potential future use
         navigateTo('draft');
     } else {
         navigateTo('home');
     }

}); // End DOMContentLoaded
```
