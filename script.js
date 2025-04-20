// script.js - v8.0 + Socket.IO Conditional Logic - Debugging v3
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded. Initializing App v8.0+socket-debug-v3...");

    // --- Socket.IO Setup ---
    const SERVER_URL = 'YOUR_SERVER_URL'; // <--- ЗАМЕНИТЬ НА АДРЕС СЕРВЕРА!
    const useSockets = SERVER_URL && SERVER_URL !== 'YOUR_SERVER_URL'; // Флаг использования сокетов
    console.log("DEBUG: useSockets =", useSockets); // DEBUG: Log useSockets value
    let socket = null; // Инициализируем как null

    if (useSockets) {
        try {
            // Attempt to connect only if URL is valid
            socket = io(SERVER_URL, {
                 transports: ['websocket']
            });
            console.log(`Attempting connection to server: ${SERVER_URL}`);
        } catch (err) {
            console.error("Socket.IO initialization error:", err);
            // showStatusMessage might not be ready yet
        }
    } else {
        console.warn("SERVER_URL is not set. Running in local-only mode.");
    }


    // --- Page Elements ---
    const appContainer = document.getElementById('app-container');
    const homePage = document.getElementById('homePage');
    const draftPage = document.getElementById('draftPage');
    const adminButton = document.getElementById('adminButton'); // Get reference early
    const themeToggleButton = document.getElementById('themeToggleButton'); // Get reference early
    const team1NameInput = document.getElementById('team1NameInput');
    const team2NameInput = document.getElementById('team2NameInput');
    const createLobbyButton = document.getElementById('createLobbyButton'); // Get reference early
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
    let currentPage = 'home';
    let isDraftInitialized = false;
    let currentUserRole = null;
    let userTeamSide = null;
    let currentTheme = localStorage.getItem('theme') || 'dark';

    // Draft specific state variables
    let allChampionsData = { en: null, ru: null };
    let processedChampions = [];
    let ddragonVersion = 'latest';
    let baseIconUrl = '';
    let baseSplashUrl = '';
    let currentStep = 0;
    let selectedChampions = new Set();
    let draftHistory = []; // Used for local undo if not using sockets
    let pickNicknames = {};
    let isDraftComplete = false;
    let isDraftStarted = false;
    let selectedSwapSlotId = null;
    let timerInterval = null;
    let draftTimerDuration = 30;
    let timerSeconds = draftTimerDuration;
    let currentRoleFilter = 'All';
    let previewedChampion = null;
    let isPriorityFilterActive = false;
    let statusTimeout = null;
    let globallyDisabledChampions = new Set();
    let globalBanHistory = [];

    // Priority list (local data)
    const priorityChampions = new Set(['Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Annie', 'Ashe', 'AurelionSol', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Corki', 'Darius', 'Diana', 'DrMundo', 'Draven', 'Ekko', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Gwen', 'Hecarim', 'Heimerdinger', 'Irelia', 'Janna', 'JarvanIV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kaisa', 'Kalista', 'Karma', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Khazix', 'Kindred', 'LeeSin', 'Leona', 'Lillia', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Malphite', 'Maokai', 'MasterYi', 'Milio', 'MissFortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Nilah', 'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Pyke', 'Rakan', 'Rammus', 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Samira', 'Senna', 'Seraphine', 'Sett', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Sona', 'Soraka', 'Swain', 'Syndra', 'Talon', 'Teemo', 'Thresh', 'Tristana', 'Tryndamere', 'TwistedFate', 'Twitch', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Vex', 'Vi', 'Viego', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'MonkeyKing', 'Xayah', 'XinZhao', 'Yasuo', 'Yone', 'Yuumi', 'Zac', 'Zed', 'Zeri', 'Ziggs', 'Zoe', 'Zyra', 'Ryze', 'Nocturne', 'Zilean', 'Renata', 'Belveth', 'Naafiri', 'Briar', 'Hwei', 'Smolder']);

    // Permissions Map (remains local for UI control)
    const permissions = { /* ... unchanged ... */ };

    // --- Helper Functions --- (Unchanged)
    const debounce = (func, wait) => { /* ... */ };
    const showStatusMessage = (message, duration = 3000) => { /* ... unchanged ... */ };
    const getChampionById = (id) => processedChampions.find(champ => champ.id === id);
    function hasPermission(action, team = null) { /* ... unchanged ... */ }
    async function copyToClipboard(text) { /* ... unchanged ... */ }

    // --- Theme Toggle Functions --- (Unchanged)
    function applyTheme(theme) { /* ... unchanged ... */ }
    function toggleTheme() { /* ... unchanged ... */ }

    // --- Navigation & Role Handling ---
    function navigateTo(pageName) {
        console.log(`DEBUG: navigateTo called with pageName: ${pageName}`); // DEBUG

        currentPage = pageName;

        if(homePage) homePage.classList.add('hidden');
        if(draftPage) draftPage.classList.add('hidden');

        // Use globally scoped references obtained earlier
        console.log(`DEBUG navigateTo: Using global refs adminButton=${!!adminButton}, themeButton=${!!themeToggleButton}`); // DEBUG

        // Hide/Show top right buttons based on page
        if(adminButton) adminButton.classList.add('hidden'); else console.log("DEBUG navigateTo: global adminButton ref is null/falsy when trying to hide"); // DEBUG
        if(themeToggleButton) themeToggleButton.classList.add('hidden'); else console.log("DEBUG navigateTo: global themeToggleButton ref is null/falsy when trying to hide"); // DEBUG

        if (pageName === 'home') {
            if(homePage) homePage.classList.remove('hidden');
            if(adminButton) {
                adminButton.classList.remove('hidden'); // Show on home
                console.log("DEBUG navigateTo: Removed 'hidden' from adminButton"); // DEBUG
            } else {
                console.log("DEBUG navigateTo: global adminButton ref is null/falsy when trying to show"); // DEBUG
            }
            if(themeToggleButton) {
                themeToggleButton.classList.remove('hidden'); // Show on home
                console.log("DEBUG navigateTo: Removed 'hidden' from themeToggleButton"); // DEBUG
            } else {
                 console.log("DEBUG navigateTo: global themeToggleButton ref is null/falsy when trying to show"); // DEBUG
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
                initializeAppDraft(); // Changed: Call async function directly
                // isDraftInitialized = true; // Set inside initializeAppDraft now
            } else {
                 console.log("Draft already initialized, re-applying permissions for role:", currentUserRole);
                 if (checkDraftElements()) {
                    if (!currentUserRole) { currentUserRole = getRoleFromHash() || 'default'; }
                    if (currentUserRole === 'team1') userTeamSide = 'blue'; else if (currentUserRole === 'team2') userTeamSide = 'red'; else userTeamSide = null;
                    applyRolePermissions(currentUserRole);
                    if(blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem('lobbyTeam1Name') || 'Синяя Команда';
                    if(redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem('lobbyTeam2Name') || 'Красная Команда';
                    // Request initial state from server when navigating back to draft?
                    if (useSockets && socket?.connected) {
                        console.log("DEBUG: Requesting current state on draft navigation");
                        // Send a specific request event if needed, or rely on server sending on re-connection
                        // socket.emit('request_current_state'); // Example: If server handles this
                    } else if (useSockets) {
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
        console.log("--- handleCreateLobby called ---"); // DEBUG
        /* ... unchanged ... */
    }

    function handleAdminClick() {
        console.log("--- handleAdminClick called ---"); // DEBUG
        /* ... unchanged ... */
        navigateTo('draft');
    }

    // --- Listeners for Home page ---
    // Ensure listeners are attached AFTER elements are confirmed found
    if (createLobbyButton) {
        createLobbyButton.addEventListener('click', handleCreateLobby);
        console.log("DEBUG: Listener attached to createLobbyButton");
    } else { console.warn("Create Lobby Button not found! Listener not attached."); }

    document.querySelectorAll('.copy-button').forEach(button => { /* ... unchanged ... */ });

    if (adminButton) {
        adminButton.addEventListener('click', handleAdminClick);
         console.log("DEBUG: Listener attached to adminButton");
    } else { console.warn("Admin Button not found! Listener not attached."); }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
        console.log("DEBUG: Listener attached to themeToggleButton.");
    } else { console.warn("Theme toggle button not found! Listener not attached."); }

    // --- Function to check if draft elements exist --- (Unchanged)
    function checkDraftElements() { /* ... unchanged ... */ }

    // --- Draft Simulator Initialization --- (Attaches draft-specific listeners)
    async function initializeAppDraft() { /* ... unchanged ... */ }

    // Helper to attach listeners to editable fields (Unchanged)
    function attachEditableFieldListeners() { /* ... unchanged ... */ }

    // Helper to attach nickname listeners (Unchanged)
    function attachNicknameListeners() { /* ... unchanged ... */ }


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

    // --- Main UI Update Function (Driven by Server State or Local State) ---
    function updateDraftUI(serverState = null) { /* ... unchanged ... */ }

    // Update Champion Availability (Unchanged)
    function updateChampionAvailability() { /* ... */ }

    // Champion Preview (Unchanged)
    function handleChampionPreview(champion) { /* ... */ }

    // --- ACTION HANDLERS --- (Conditional Logic)
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

    // --- Socket.IO Event Handlers --- (Unchanged)
    if (useSockets && socket) { /* ... */ }
    else if (!useSockets) { /* ... */ }
    else { /* ... */ }

    // --- Initial App Setup ---
     applyTheme(currentTheme); // Apply theme
     const initialRole = getRoleFromHash();
     if (initialRole) {
         navigateTo('draft');
     } else {
         navigateTo('home');
     }

}); // End DOMContentLoaded