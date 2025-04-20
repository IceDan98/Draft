// script.js - v8.0 + Socket.IO Integration - Debugging v2
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded. Initializing App v8.0+socket-debug-v2...");

    // --- Socket.IO Setup ---
    const SERVER_URL = 'http://localhost:3000'; //     
let socket;
    try {
        // Attempt to connect to the server
        socket = io(SERVER_URL, {
             transports: ['websocket'] // Optional: Specify transport
        });
        console.log(`Attempting connection to server: ${SERVER_URL}`);
    } catch (err) {
        console.error("Socket.IO initialization error:", err);
        // Use showStatusMessage only after it's defined and element is available
        // showStatusMessage("Ошибка инициализации соединения с сервером!", 5000);
    }


    // --- Page Elements ---
    const appContainer = document.getElementById('app-container');
    const homePage = document.getElementById('homePage');
    const draftPage = document.getElementById('draftPage');
    const adminButton = document.getElementById('adminButton');
    const themeToggleButton = document.getElementById('themeToggleButton');
    const team1NameInput = document.getElementById('team1NameInput');
    const team2NameInput = document.getElementById('team2NameInput');
    const createLobbyButton = document.getElementById('createLobbyButton');
    const lobbyLinksDisplay = document.getElementById('lobbyLinksDisplay');
    const judgeLinkText = document.getElementById('judgeLinkText');
    const team1LinkText = document.getElementById('team1LinkText');
    const team2LinkText = document.getElementById('team2LinkText');

    // DEBUG: Check initial element finding
    console.log("DEBUG: Initial element check:");
    console.log("  - createLobbyButton:", !!createLobbyButton);
    console.log("  - adminButton:", !!adminButton);
    console.log("  - themeToggleButton:", !!themeToggleButton);


    // --- Draft Simulator Global Elements ---
    // References will be assigned in checkDraftElements or initializeAppDraft
    let loadingIndicator, mainLayout, championGridElement, startButton, resetButton, undoButton, timerDisplay, championSearch, bluePicksContainer, redPicksContainer, blueColumn, redColumn, swapButton, clearPicksButton, toggleTimerButton, filterButtons, confirmPickBanButton, priorityFilterButton, nextDraftButton, globallyBannedDisplay, globalBansBlueContainer, globalBansRedContainer, championTooltip, statusMessage, blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl, returnHomeButton;

    // --- State Variables ---
    // Local state will be primarily synced from the server
    let currentPage = 'home';
    let isDraftInitialized = false;
    let currentUserRole = null;
    let userTeamSide = null;
    let currentTheme = localStorage.getItem('theme') || 'dark';

    // Draft specific state variables - updated by server events
    let allChampionsData = { en: null, ru: null }; // Loaded locally
    let processedChampions = []; // Populated locally
    let ddragonVersion = 'latest';
    let baseIconUrl = '';
    let baseSplashUrl = '';
    let currentStep = 0; // Synced from server
    let selectedChampions = new Set(); // Synced from server picks/bans
    let draftHistory = []; // May become less relevant or managed server-side for undo
    let pickNicknames = {}; // Synced from server
    let isDraftComplete = false; // Synced from server
    let isDraftStarted = false; // Synced from server
    let selectedSwapSlotId = null; // Local UI state for swap selection
    let timerInterval = null; // Local timer interval
    let draftTimerDuration = 30; // Could be synced from server
    let timerSeconds = draftTimerDuration; // Local timer countdown
    let currentRoleFilter = 'All'; // Local UI state
    let previewedChampion = null; // Local UI state for preview
    let isPriorityFilterActive = false; // Local UI state
    let statusTimeout = null;
    let globallyDisabledChampions = new Set(); // Synced from server
    let globalBanHistory = []; // Synced from server

    // Priority list (local data)
    const priorityChampions = new Set(['Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Annie', 'Ashe', 'AurelionSol', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Corki', 'Darius', 'Diana', 'DrMundo', 'Draven', 'Ekko', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Gwen', 'Hecarim', 'Heimerdinger', 'Irelia', 'Janna', 'JarvanIV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kaisa', 'Kalista', 'Karma', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Khazix', 'Kindred', 'LeeSin', 'Leona', 'Lillia', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Malphite', 'Maokai', 'MasterYi', 'Milio', 'MissFortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Nilah', 'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Pyke', 'Rakan', 'Rammus', 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Samira', 'Senna', 'Seraphine', 'Sett', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Sona', 'Soraka', 'Swain', 'Syndra', 'Talon', 'Teemo', 'Thresh', 'Tristana', 'Tryndamere', 'TwistedFate', 'Twitch', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Vex', 'Vi', 'Viego', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'MonkeyKing', 'Xayah', 'XinZhao', 'Yasuo', 'Yone', 'Yuumi', 'Zac', 'Zed', 'Zeri', 'Ziggs', 'Zoe', 'Zyra', 'Ryze', 'Nocturne', 'Zilean', 'Renata', 'Belveth', 'Naafiri', 'Briar', 'Hwei', 'Smolder']);

    // Permissions Map (remains local for UI control)
    const permissions = {
        admin: { editTeamName: true, editScore: true, clearDraft: true, resetDraft: true, startDraft: true, toggleTimerDuration: true, swapSides: true, editNicknames: true, togglePriorityFilter: true, nextDraft: true, pickChampion: true, banChampion: true, undoAction: true, confirmAction: true, useRoleFilters: true, returnHome: true },
        judge: { editTeamName: true, editScore: true, clearDraft: true, resetDraft: true, startDraft: true, toggleTimerDuration: true, swapSides: true, editNicknames: true, togglePriorityFilter: true, nextDraft: true, pickChampion: false, banChampion: false, undoAction: false, confirmAction: false, useRoleFilters: false, returnHome: true },
        team1: { editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false, pickChampion: true, banChampion: true, undoAction: true, confirmAction: true, useRoleFilters: true, returnHome: true },
        team2: { editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false, pickChampion: true, banChampion: true, undoAction: true, confirmAction: true, useRoleFilters: true, returnHome: true },
        default: { editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false, pickChampion: false, banChampion: false, undoAction: false, confirmAction: false, useRoleFilters: false, returnHome: true }
    };

    // --- Helper Functions --- (Unchanged)
    const debounce = (func, wait) => { let timeout; return function executedFunction(...args) { const later = () => { clearTimeout(timeout); func(...args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); }; };
    const showStatusMessage = (message, duration = 3000) => {
        // Ensure statusMessage element exists before using it
        if (!statusMessage) statusMessage = document.getElementById('statusMessage');
        if (!statusMessage) { console.warn("Status message element not found for:", message); return; }
        statusMessage.textContent = message;
        statusMessage.classList.add('visible');
        clearTimeout(statusTimeout);
        statusTimeout = setTimeout(() => { statusMessage.classList.remove('visible'); }, duration);
    };
    const getChampionById = (id) => processedChampions.find(champ => champ.id === id);
    function hasPermission(action, team = null) { /* ... unchanged ... */ return true; /* Placeholder */ } // Placeholder return
    async function copyToClipboard(text) { /* ... unchanged ... */ }

    // --- Theme Toggle Functions --- (Unchanged)
    function applyTheme(theme) {
        console.log(`Applying theme: ${theme}`); // DEBUG
        document.documentElement.dataset.theme = theme; // Set attribute on <html>
        // DEBUG: Check if attribute was set
        console.log(`DEBUG: html data-theme = ${document.documentElement.dataset.theme}`); // DEBUG
        if (themeToggleButton) {
            themeToggleButton.textContent = theme === 'dark' ? '🌙' : '☀️';
            themeToggleButton.title = theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на темную тему';
        } else {
            console.warn("applyTheme: themeToggleButton not found when trying to update icon/title.");
        }
     }
    function toggleTheme() {
        console.log("--- toggleTheme called ---"); // DEBUG
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        console.log(`Toggling theme to: ${currentTheme}`);
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    }

    // --- Navigation & Role Handling ---
    function navigateTo(pageName) {
        console.log(`DEBUG: navigateTo called with pageName: ${pageName}`); // DEBUG

        currentPage = pageName;

        if(homePage) homePage.classList.add('hidden');
        if(draftPage) draftPage.classList.add('hidden');

        const currentAdminButton = document.getElementById('adminButton');
        const currentThemeButton = document.getElementById('themeToggleButton');
        console.log(`DEBUG navigateTo: Found adminButton=${!!currentAdminButton}, themeButton=${!!currentThemeButton}`); // DEBUG

        // Hide/Show top right buttons based on page
        if(currentAdminButton) currentAdminButton.classList.add('hidden'); else console.log("DEBUG navigateTo: adminButton ref is null/falsy when trying to hide"); // DEBUG
        if(currentThemeButton) currentThemeButton.classList.add('hidden'); else console.log("DEBUG navigateTo: themeToggleButton ref is null/falsy when trying to hide"); // DEBUG

        if (pageName === 'home') {
            if(homePage) homePage.classList.remove('hidden');
            if(currentAdminButton) {
                currentAdminButton.classList.remove('hidden'); // Show on home
                console.log("DEBUG navigateTo: Removed 'hidden' from adminButton"); // DEBUG
            } else {
                console.log("DEBUG navigateTo: adminButton ref is null/falsy when trying to show"); // DEBUG
            }
            if(currentThemeButton) {
                currentThemeButton.classList.remove('hidden'); // Show on home
                console.log("DEBUG navigateTo: Removed 'hidden' from themeToggleButton"); // DEBUG
            } else {
                 console.log("DEBUG navigateTo: themeToggleButton ref is null/falsy when trying to show"); // DEBUG
            }

            if (window.location.hash && currentUserRole !== 'admin') {
                currentUserRole = null;
                userTeamSide = null;
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
        } else if (pageName === 'draft') {
             if(draftPage) draftPage.classList.remove('hidden');
             console.log("DEBUG navigateTo: Keeping buttons hidden for draft page"); // DEBUG
             if (!isDraftInitialized) {
                console.log("Initializing draft simulator for the first time...");
                initializeAppDraft();
                isDraftInitialized = true;
            } else {
                 console.log("Draft already initialized, re-applying permissions for role:", currentUserRole);
                 if (checkDraftElements()) {
                    if (!currentUserRole) { currentUserRole = getRoleFromHash() || 'default'; }
                    if (currentUserRole === 'team1') userTeamSide = 'blue'; else if (currentUserRole === 'team2') userTeamSide = 'red'; else userTeamSide = null;
                    applyRolePermissions(currentUserRole);
                    if(blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem('lobbyTeam1Name') || 'Синяя Команда';
                    if(redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem('lobbyTeam2Name') || 'Красная Команда';
                    // Request initial state from server when navigating back to draft?
                    if (socket?.connected) {
                        console.log("DEBUG: Requesting current state on draft navigation");
                        // Send a specific request event if needed, or rely on server sending on re-connection
                        // socket.emit('request_current_state'); // Example: If server handles this
                    } else {
                        console.warn("Socket not connected, cannot request state for draft page.");
                    }
                    // updateDraftUI(); // UI update will be triggered by server response ('current_state' or 'draft_updated')
                 } else {
                     console.error("Draft elements not found when trying to re-apply permissions.");
                     showStatusMessage("Ошибка UI: Элементы драфта не найдены.", 5000);
                 }
            }
        }
    }

    function getRoleFromHash() { /* ... unchanged ... */ }

    // --- Home Page Logic ---
    function handleCreateLobby() {
        // DEBUG: Check if handler is called
        console.log("--- handleCreateLobby called ---");
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
        // DEBUG: Check if handler is called
        console.log("--- handleAdminClick called ---");
        console.log("Admin button clicked.");
        currentUserRole = 'admin';
        userTeamSide = null;
        const team1Name = team1NameInput.value.trim() || "Синяя Команда";
        const team2Name = team2NameInput.value.trim() || "Красная Команда";
        localStorage.setItem('lobbyTeam1Name', team1Name);
        localStorage.setItem('lobbyTeam2Name', team2Name);
        navigateTo('draft');
    }

    // --- Listeners for Home page ---
    if (createLobbyButton) {
        createLobbyButton.addEventListener('click', handleCreateLobby);
        console.log("DEBUG: Listener attached to createLobbyButton"); // DEBUG
    } else { console.warn("Create Lobby Button not found! Listener not attached."); }

    document.querySelectorAll('.copy-button').forEach(button => { /* ... unchanged ... */ });

    if (adminButton) {
        adminButton.addEventListener('click', handleAdminClick);
         console.log("DEBUG: Listener attached to adminButton"); // DEBUG
    } else { console.warn("Admin Button not found! Listener not attached."); }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
        console.log("DEBUG: Listener attached to themeToggleButton."); // DEBUG
    } else { console.warn("Theme toggle button not found! Listener not attached."); }

    // --- Function to check if draft elements exist --- (Unchanged)
    function checkDraftElements() { /* ... */ return true; /* Placeholder */ } // Placeholder return

    // --- Draft Simulator Initialization --- (Attaches draft-specific listeners)
    async function initializeAppDraft() { /* ... unchanged ... */ }

    // --- Role Permission Application --- (Unchanged)
    function applyRolePermissions(role) { /* ... */ }

    // --- Update Nickname Editability --- (Unchanged)
    function updateNicknameEditability() { /* ... */ }

    // --- Data Fetching --- (Unchanged)
    async function loadChampionData() { /* ... */ return true; /* Placeholder */ } // Placeholder return

    // --- Timer Functions --- (Unchanged for now)
    function stopTimer() { /* ... */ }
    function formatTime(seconds) { /* ... */ }
    function resetTimerDisplay() { /* ... */ }
    function startTimer() { /* ... */ }

    // --- Draft Logic Functions ---

    // Display/Card Creation (Unchanged)
    function createChampionCard(champ) { /* ... */ return document.createElement('button'); /* Placeholder */ } // Placeholder return
    function displayChampions() { /* ... unchanged ... */ }

    // --- Main UI Update Function (Driven by Server State) ---
    function updateDraftUI(serverState = null) { /* ... unchanged from previous integrated example ... */ }

    // Update Champion Availability (Unchanged)
    function updateChampionAvailability() { /* ... */ }

    // Champion Preview (Unchanged)
    function handleChampionPreview(champion) { /* ... */ }

    // --- MODIFIED ACTION HANDLERS (Emit events to server) ---
    function handleStartDraft() { /* ... unchanged ... */ }
    function handleConfirmPickBan() { /* ... unchanged ... */ }
    function handleNicknameChange(slotId, newNickname) { /* ... unchanged ... */ }
    function handleResetDraft() { /* ... unchanged ... */ }
    function handleClearPicks() { /* ... unchanged ... */ }
    function handleUndo() { /* ... unchanged ... */ }
    function handleSwapTeams() { /* ... unchanged ... */ }
    function handleNextDraft() { /* ... unchanged ... */ }
    function handleToggleTimer() { /* ... unchanged ... */ }

    // --- Display/UI Update Functions (Mostly Unchanged Logic) ---
    function fillSlot(slotElement, champion, type, nicknameText = '') { /* ... */ }
    function addNicknameInput(slotElement, text = '') { /* ... unchanged ... */ }
    function restoreSlotPlaceholder(slotElement, slotId, nicknameText = '') { /* ... unchanged ... */ }
    function getSlotChampionId(slotId) { /* ... */ }

    // --- Local UI Handlers (Unchanged) ---
    const debouncedFilter = debounce(() => { filterChampions(); }, 250);
    function filterChampions() { /* ... unchanged ... */ }
    function deselectSwapSlots() { /* ... unchanged ... */ }
    function handlePickContainerClick(event) { /* ... unchanged ... */ }
    function handleRoleFilterClick(event) { /* ... unchanged ... */ }
    function handlePriorityFilterToggle() { /* ... unchanged ... */ }
    function displayGloballyBanned() { /* ... unchanged ... */ }
    function getDraftOrder() { /* ... unchanged ... */ return []; /* Placeholder */ } // Placeholder return
    function showChampionTooltip(event, champion) { /* ... */ }
    function hideChampionTooltip() { /* ... */ }

    // --- Socket.IO Event Handlers ---
    if (socket) {
        socket.on('connect', () => {
            console.log(`Успешно подключено к серверу Socket.IO: ${socket.id}`);
            showStatusMessage("Подключено к серверу", 2000);
        });

        socket.on('disconnect', (reason) => {
            console.warn(`Отключено от сервера: ${reason}`);
            showStatusMessage("Отключено от сервера!", 3000);
        });

        socket.on('connect_error', (err) => {
            console.error(`Ошибка подключения: ${err.message}`);
            showStatusMessage(`Ошибка подключения к серверу!`, 5000);
        });

        socket.on('current_state', (serverState) => {
            console.log("Получено начальное состояние 'current_state':", serverState);
            if (!isDraftInitialized && currentPage === 'draft') {
                 console.warn("Received state before draft UI initialized. Applying anyway.");
                 if (checkDraftElements()) {
                    updateDraftUI(serverState);
                 } else {
                    console.error("Elements not ready for initial state update.");
                 }
            } else if (isDraftInitialized) {
                 updateDraftUI(serverState);
            }
        });

        socket.on('draft_updated', (serverState) => {
            console.log("Получено обновление 'draft_updated':", serverState);
             if (!isDraftInitialized && currentPage === 'draft') {
                 console.warn("Received update before draft UI initialized. Ignoring.");
                 return;
             }
            updateDraftUI(serverState);
        });
    } else {
        console.error("Socket object is not available. Real-time features disabled.");
    }

    // --- Initial App Setup ---
     applyTheme(currentTheme); // Apply theme
     const initialRole = getRoleFromHash();
     if (initialRole) {
         navigateTo('draft');
     } else {
         navigateTo('home');
     }

}); // End DOMContentLoaded
