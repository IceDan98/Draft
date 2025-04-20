// script.js - v8.0 + Socket.IO Integration
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded. Initializing App v8.0+socket...");

    // --- Socket.IO Setup ---
    const SERVER_URL = http://localhost:3000; // <--- ЗАМЕНИТЬ НА АДРЕС СЕРВЕРА! (e.g., 'http://localhost:3000')
    let socket;
    try {
        // Attempt to connect to the server
        socket = io(SERVER_URL, {
             transports: ['websocket'] // Optional: Specify transport
        });
        console.log(`Attempting connection to server: ${SERVER_URL}`);
    } catch (err) {
        console.error("Socket.IO initialization error:", err);
        showStatusMessage("Ошибка инициализации соединения с сервером!", 5000);
        // Optionally disable UI elements if connection fails critically
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
    const showStatusMessage = (message, duration = 3000) => { if (!statusMessage) statusMessage = document.getElementById('statusMessage'); if (!statusMessage) { console.warn("Status message element not found!"); return; } statusMessage.textContent = message; statusMessage.classList.add('visible'); clearTimeout(statusTimeout); statusTimeout = setTimeout(() => { statusMessage.classList.remove('visible'); }, duration); };
    const getChampionById = (id) => processedChampions.find(champ => champ.id === id);
    function hasPermission(action, team = null) { /* ... unchanged ... */ return true; /* Placeholder */ } // Placeholder return
    async function copyToClipboard(text) { /* ... unchanged ... */ }

    // --- Theme Toggle Functions --- (Unchanged)
    function applyTheme(theme) { /* ... unchanged ... */ }
    function toggleTheme() { /* ... unchanged ... */ }

    // --- Navigation & Role Handling --- (Unchanged)
    function navigateTo(pageName) { /* ... unchanged ... */ }
    function getRoleFromHash() { /* ... unchanged ... */ }

    // --- Home Page Logic --- (Unchanged)
    function handleCreateLobby() { /* ... unchanged ... */ }
    function handleAdminClick() { /* ... unchanged ... */ }

    // --- Listeners for Home page --- (Unchanged)
    if (createLobbyButton) { createLobbyButton.addEventListener('click', handleCreateLobby); } else { console.warn("Create Lobby Button not found"); }
    document.querySelectorAll('.copy-button').forEach(button => { button.addEventListener('click', (event) => { /* ... */ }); });
    if (adminButton) { adminButton.addEventListener('click', handleAdminClick); } else { console.warn("Admin Button not found"); }
    if (themeToggleButton) { themeToggleButton.addEventListener('click', toggleTheme); } else { console.warn("Theme toggle button not found!"); }

    // --- Function to check if draft elements exist --- (Unchanged)
    function checkDraftElements() {
        loadingIndicator = document.getElementById('loadingIndicator');
        mainLayout = document.getElementById('mainLayout');
        championGridElement = document.getElementById('championGrid');
        timerDisplay = document.getElementById('timerDisplay');
        resetButton = document.getElementById('resetButton');
        undoButton = document.getElementById('undoButton');
        championSearch = document.getElementById('championSearch');
        blueColumn = document.querySelector('.blue-column');
        redColumn = document.querySelector('.red-column');
        swapButton = document.getElementById('swapButton');
        clearPicksButton = document.getElementById('clearPicksButton');
        toggleTimerButton = document.getElementById('toggleTimerButton');
        filterButtons = document.querySelectorAll('#roleFilterButtons .filter-button'); // Re-select here
        confirmPickBanButton = document.getElementById('confirmPickBanButton');
        priorityFilterButton = document.getElementById('priorityFilterButton');
        nextDraftButton = document.getElementById('nextDraftButton');
        returnHomeButton = document.getElementById('returnHomeButton');
        blueTeamNameH2 = document.getElementById('blue-team-name-h2');
        redTeamNameH2 = document.getElementById('red-team-name-h2');
        blueScoreEl = document.getElementById('blue-score');
        redScoreEl = document.getElementById('red-score');
        statusMessage = document.getElementById('statusMessage');
        championTooltip = document.getElementById('championTooltip');
        globalBansBlueContainer = document.getElementById('global-bans-blue');
        globalBansRedContainer = document.getElementById('global-bans-red');
        globallyBannedDisplay = document.getElementById('globallyBannedDisplay');


        const elementsToCheck = [
            loadingIndicator, mainLayout, championGridElement, timerDisplay, resetButton, undoButton,
            championSearch, blueColumn, redColumn, swapButton, clearPicksButton, toggleTimerButton,
            filterButtons, // Check NodeList
            confirmPickBanButton, priorityFilterButton, nextDraftButton, returnHomeButton,
            blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl, statusMessage, championTooltip,
            globalBansBlueContainer, globalBansRedContainer, globallyBannedDisplay
        ];
         if (!filterButtons || filterButtons.length === 0) {
             console.error("Role filter buttons NodeList is empty or null!");
             // return false; // Potentially stop initialization if filters are crucial
         }

        const missingElements = elementsToCheck.filter(el => !el);
        if (missingElements.length > 0) {
            console.error("Missing draft elements during check:", missingElements.map(el => el?.id || 'unknown'));
            return false;
        }
        return true;
    }


    // --- Draft Simulator Initialization ---
    async function initializeAppDraft() {
        console.log("initializeAppDraft started");
        try {
            // 1. Determine Role (Unchanged)
            if (!currentUserRole) { currentUserRole = getRoleFromHash() || 'default'; }
            console.log(`Initializing draft with Role: ${currentUserRole}`);
            if (currentUserRole === 'team1') userTeamSide = 'blue'; else if (currentUserRole === 'team2') userTeamSide = 'red'; else userTeamSide = null;

            // 2. Get Draft Page Elements (Unchanged)
            if (!checkDraftElements()) { throw new Error("..."); }
            console.log("All draft elements found.");

            // 3. Load Champion Data (Unchanged)
            if(loadingIndicator) loadingIndicator.classList.remove('hidden');
            const dataLoaded = await loadChampionData();
            if (!dataLoaded) { throw new Error("..."); }
            displayChampions(); // Display static champion grid
            if(loadingIndicator) loadingIndicator.classList.add('hidden');
            if(mainLayout) mainLayout.classList.remove('hidden');

            // 4. Initial Setup UI (Now relies on server state received via socket)
            // resetDraftFull(true); // Removed - state comes from server

            // 5. Attach Event Listeners
            console.log("Attaching draft page event listeners...");
            if (timerDisplay) timerDisplay.addEventListener('click', handleStartDraft); // Emits event
            if (resetButton) resetButton.addEventListener('click', handleResetDraft); // Emits event
            if (clearPicksButton) clearPicksButton.addEventListener('click', handleClearPicks); // Emits event
            if (undoButton) undoButton.addEventListener('click', handleUndo); // Emits event
            if (swapButton) swapButton.addEventListener('click', handleSwapTeams); // Emits event
            if (toggleTimerButton) toggleTimerButton.addEventListener('click', handleToggleTimer); // TODO: Emit event?
            if (confirmPickBanButton) confirmPickBanButton.addEventListener('click', handleConfirmPickBan); // Emits event
            if (priorityFilterButton) priorityFilterButton.addEventListener('click', handlePriorityFilterToggle); // Local filter
            if (nextDraftButton) nextDraftButton.addEventListener('click', handleNextDraft); // Emits event
            if (championSearch) championSearch.addEventListener('input', debouncedFilter); // Local filter
            if (filterButtons) { filterButtons.forEach(button => { button.addEventListener('click', handleRoleFilterClick); }); } // Local filter
            if (blueColumn) blueColumn.addEventListener('click', handlePickContainerClick); // Local swap UI
            if (redColumn) redColumn.addEventListener('click', handlePickContainerClick); // Local swap UI
            if (returnHomeButton) returnHomeButton.addEventListener('click', () => navigateTo('home'));

            // Listeners for editable fields - now emit events
            [blueTeamNameH2, redTeamNameH2].forEach(el => {
                if (el) {
                    el.addEventListener('blur', (e) => {
                        if (!hasPermission('editTeamName')) return;
                        const side = el.id.includes('blue') ? 'blue' : 'red';
                        const name = e.target.textContent.trim();
                        console.log(`Emitting update_team_name: side=${side}, name=${name}`);
                        if (socket) socket.emit('update_team_name', { side, name });
                        // Optionally revert if server rejects, or wait for 'draft_updated'
                    });
                    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } });
                }
            });
             [blueScoreEl, redScoreEl].forEach(el => {
                if (el) {
                    el.addEventListener('blur', (e) => {
                        if (!hasPermission('editScore')) return;
                        const side = el.id.includes('blue') ? 'blue' : 'red';
                        const score = e.target.textContent.trim();
                         console.log(`Emitting update_score: side=${side}, score=${score}`);
                         if (socket) socket.emit('update_score', { side, score });
                         // Optionally revert if server rejects, or wait for 'draft_updated'
                    });
                    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } });
                }
            });

            console.log("Draft page event listeners attached.");

            // Initial UI update will happen when 'current_state' is received
            isDraftInitialized = true;
            console.log("Draft simulator page initialized successfully for role:", currentUserRole);

        } catch (error) {
            console.error("Error during initializeAppDraft:", error);
            showStatusMessage(`Критическая ошибка инициализации: ${error.message}`, 10000);
            if(loadingIndicator) loadingIndicator.textContent = `Ошибка! ${error.message}`;
            if(mainLayout) mainLayout.classList.add('hidden');
        }
    } // --- End of initializeAppDraft ---


    // --- Role Permission Application --- (Unchanged)
    function applyRolePermissions(role) { /* ... */ }

    // --- Update Nickname Editability --- (Unchanged)
    function updateNicknameEditability() { /* ... */ }

    // --- Data Fetching --- (Unchanged)
    async function loadChampionData() { /* ... */ }

    // --- Timer Functions --- (Could be driven by server events)
    function stopTimer() { /* ... */ }
    function formatTime(seconds) { /* ... */ }
    function resetTimerDisplay() { /* ... */ }
    function startTimer() { /* ... */ }

    // --- Draft Logic Functions ---

    // Display/Card Creation (Unchanged)
    function createChampionCard(champ) { /* ... */ }
    function displayChampions() { /* ... */ }

    // --- Main UI Update Function (Driven by Server State) ---
    function updateDraftUI(serverState = null) {
        console.log("DEBUG: updateDraftUI called.");
        if (!isDraftInitialized) {
            console.log("DEBUG: updateDraftUI skipped - draft not initialized.");
            return;
        }

        if (serverState) {
            console.log("DEBUG: Updating local state from server:", serverState);
            // Update local variables from server state
            currentStep = serverState.step !== undefined ? serverState.step : currentStep;
            isDraftStarted = serverState.started !== undefined ? serverState.started : isDraftStarted;
            pickNicknames = serverState.nicknames || {};
            isDraftComplete = currentStep >= getDraftOrder().length; // Recalculate completion

            // Update selectedChampions Set based on server picks and bans
            selectedChampions.clear();
            Object.values(serverState.picks || {}).forEach(pick => {
                if (pick && pick.championId) selectedChampions.add(pick.championId);
            });
            Object.values(serverState.bans || {}).forEach(banChampId => {
                if (banChampId) selectedChampions.add(banChampId);
            });

            // Update team names and scores
            if(blueTeamNameH2 && serverState.team1Name !== undefined) blueTeamNameH2.textContent = serverState.team1Name;
            if(redTeamNameH2 && serverState.team2Name !== undefined) redTeamNameH2.textContent = serverState.team2Name;
            // TODO: Update score elements if included in serverState

            // Clear and refill slots based on server state
            console.log("DEBUG: Clearing and refilling slots based on server state.");
            document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => {
                 restoreSlotPlaceholder(slot, slot.id, pickNicknames[slot.id] || ''); // Use updated nicknames
            });
            Object.entries(serverState.bans || {}).forEach(([slotId, champId]) => {
                 const champ = getChampionById(champId);
                 const slotElement = document.getElementById(slotId);
                 if (champ && slotElement) {
                     console.log(`DEBUG: Filling ban slot ${slotId} with ${champId}`);
                     fillSlot(slotElement, champ, 'ban');
                 } else {
                     console.warn(`DEBUG: Champ or slot not found for ban: ${champId}, ${slotId}`);
                 }
            });
             Object.entries(serverState.picks || {}).forEach(([slotId, pickData]) => {
                 const champ = getChampionById(pickData.championId);
                 const slotElement = document.getElementById(slotId);
                 if (champ && slotElement && pickData) {
                     console.log(`DEBUG: Filling pick slot ${slotId} with ${pickData.championId}, nick: ${pickData.nick}`);
                     fillSlot(slotElement, champ, 'pick', pickData.nick);
                 } else {
                      console.warn(`DEBUG: Champ, slot or pickData not found for pick: ${pickData?.championId}, ${slotId}`);
                 }
             });

        } else {
            console.log("DEBUG: updateDraftUI called without new server state, using local state.");
        }

         // --- UI Logic based on (potentially updated) local state ---
         document.querySelectorAll('.pick-slot, .ban-slot').forEach(el => { el.classList.remove('highlight-action', 'preview-flash', 'swap-selected'); });
         applyRolePermissions(currentUserRole); // Apply permissions

         const draftOrder = getDraftOrder();
         let currentActionTeam = null;

         if (!isDraftStarted) {
             console.log("DEBUG: UI Update - Draft Not Started");
             resetTimerDisplay();
             if(blueColumn) blueColumn.classList.add('draft-disabled');
             if(redColumn) redColumn.classList.add('draft-disabled');
             if(nextDraftButton) nextDraftButton.disabled = !hasPermission('nextDraft') || true; // Always disabled before start?
             if(swapButton) swapButton.disabled = !hasPermission('swapSides');
             if(clearPicksButton) clearPicksButton.disabled = !hasPermission('clearDraft') /*|| check if empty?*/;
             if(toggleTimerButton) toggleTimerButton.disabled = !hasPermission('toggleTimerDuration');
             if(priorityFilterButton) priorityFilterButton.disabled = !hasPermission('togglePriorityFilter');
             if(resetButton) resetButton.disabled = !hasPermission('resetDraft');
             if(timerDisplay) timerDisplay.disabled = !hasPermission('startDraft');
             if (championGridElement) championGridElement.style.pointerEvents = 'none';
         } else if (!isDraftComplete) {
             console.log(`DEBUG: UI Update - Draft In Progress (Step ${currentStep})`);
             const action = draftOrder[currentStep];
             const activeSlot = document.getElementById(action.slot);
             currentActionTeam = action.team;

             if (activeSlot) {
                 if (currentUserRole === 'admin' || currentUserRole === 'judge' || userTeamSide === currentActionTeam) {
                      activeSlot.classList.add('highlight-action');
                 }
             } else {
                 console.warn(`Active slot ${action.slot} not found for step ${currentStep}`);
             }
             // TODO: Timer logic needs server sync or careful handling
             if(nextDraftButton) nextDraftButton.disabled = true;
             if(timerDisplay) timerDisplay.disabled = true; // Assume timer runs once started
             if(swapButton) swapButton.disabled = true;
             if(toggleTimerButton) toggleTimerButton.disabled = true;
             if(priorityFilterButton) priorityFilterButton.disabled = true; // Disable during draft?
             if(clearPicksButton) clearPicksButton.disabled = !hasPermission('clearDraft');
             if(resetButton) resetButton.disabled = !hasPermission('resetDraft');

             const isGridInteractive = (currentUserRole === 'admin' || userTeamSide === currentActionTeam);
             if (championGridElement) {
                 championGridElement.style.pointerEvents = isGridInteractive ? 'auto' : 'none';
             }
             // Disable confirm button based on preview and permissions
             if(confirmPickBanButton) confirmPickBanButton.disabled = !hasPermission('confirmAction', currentActionTeam) || !previewedChampion;

         } else { // Draft Complete
             console.log("DEBUG: UI Update - Draft Complete");
             stopTimer();
             if(timerDisplay) { /* ... "Draft Complete" text ... */ }
             if(blueColumn) blueColumn.classList.remove('draft-disabled');
             if(redColumn) redColumn.classList.remove('draft-disabled');
             if(nextDraftButton) nextDraftButton.disabled = !hasPermission('nextDraft');
             if(swapButton) swapButton.disabled = !hasPermission('swapSides');
             if(clearPicksButton) clearPicksButton.disabled = !hasPermission('clearDraft');
             if(toggleTimerButton) toggleTimerButton.disabled = true;
             if(priorityFilterButton) priorityFilterButton.disabled = !hasPermission('togglePriorityFilter'); // Re-enable after draft?
             if(resetButton) resetButton.disabled = !hasPermission('resetDraft');
             if (championGridElement) championGridElement.style.pointerEvents = 'none';
             if(confirmPickBanButton) confirmPickBanButton.disabled = true;
         }

         // Update Undo button state (example, might need server state)
         if(undoButton) undoButton.disabled = !hasPermission('undoAction' /*, draftHistory[draftHistory.length - 1]?.team*/) || currentStep === 0 || !isDraftStarted; // Simplified check

         updateChampionAvailability(); // Update based on selectedChampions
         // displayGloballyBanned(); // TODO: Update based on server state
         updateNicknameEditability();
         console.log("DEBUG: updateDraftUI finished.");
    }

    // Update Champion Availability (uses local selectedChampions set, synced from server)
    function updateChampionAvailability() {
        if (!isDraftInitialized || !championGridElement) return;
        const combinedDisabled = new Set([...selectedChampions, ...globallyDisabledChampions]);
        championGridElement.querySelectorAll('.champion-card').forEach(card => {
            const champId = card.dataset.championId;
            const isDisabled = combinedDisabled.has(champId);
            const isSelected = selectedChampions.has(champId); // Check if picked/banned in current draft
            card.classList.toggle('selected', isSelected);
            card.classList.toggle('disabled', isDisabled);
            card.disabled = isDisabled;
            card.setAttribute('aria-disabled', isDisabled.toString());
        });
    }

    // Champion Preview (remains local UI action)
    function handleChampionPreview(champion) { /* ... unchanged ... */ }

    // --- MODIFIED ACTION HANDLERS (Emit events to server) ---

    function handleStartDraft() {
        console.log("handleStartDraft called - emitting 'start_draft'");
        if (!hasPermission('startDraft')) return;
        if (!isDraftStarted && socket) {
             socket.emit('start_draft');
             // Optionally disable button immediately for feedback
             if(timerDisplay) timerDisplay.disabled = true;
        }
    }

    function handleConfirmPickBan() {
        console.log("handleConfirmPickBan called");
        if (!previewedChampion || !isDraftStarted || isDraftComplete || !socket) return;
        const draftOrder = getDraftOrder();
        if (currentStep >= draftOrder.length) return;
        const currentAction = draftOrder[currentStep];
        if (!hasPermission('confirmAction', currentAction.team)) return;

        const championToConfirm = previewedChampion;
        const slotElement = document.getElementById(currentAction.slot);
        const isDisabled = selectedChampions.has(championToConfirm.id) || globallyDisabledChampions.has(championToConfirm.id);
        if (!slotElement || isDisabled) return;

        console.log(`Emitting 'make_pick' for ${championToConfirm.id} in slot ${currentAction.slot}`);
        const nickname = pickNicknames[currentAction.slot] || '';
        socket.emit('make_pick', {
            championId: championToConfirm.id,
            slotId: currentAction.slot,
            nickname: nickname,
            type: currentAction.type,
            team: currentAction.team
        });

        previewedChampion = null;
        slotElement.classList.remove('preview-flash');
        if(confirmPickBanButton) confirmPickBanButton.disabled = true; // Disable until server confirms
    }

    function handleNicknameChange(slotId, newNickname) {
        console.log(`Emitting 'update_nickname' for slot ${slotId}`);
        if (socket && hasPermission('editNicknames')) {
            socket.emit('update_nickname', { slotId: slotId, nickname: newNickname });
        }
    }

    function handleResetDraft() {
        if (socket && hasPermission('resetDraft')) {
             if (confirm("Вы уверены, что хотите полностью сбросить драфт?")) {
                 console.log("Emitting 'reset_draft'");
                 socket.emit('reset_draft');
             }
        } else { console.warn("Reset draft denied by permission or no socket."); }
    }

    function handleClearPicks() {
         if (socket && hasPermission('clearDraft')) {
             if (confirm("Очистить пики/баны текущей игры (сохранив глоб. баны)?")) { // Assuming keepGlobal=true
                 console.log("Emitting 'clear_picks'");
                 socket.emit('clear_picks', { keepGlobal: true }); // Send event
             }
         } else { console.warn("Clear picks denied by permission or no socket."); }
    }

    function handleUndo() {
         if (socket && hasPermission('undoAction' /* Need last action team? */)) {
              if (currentStep > 0 && isDraftStarted) { // Basic check
                  console.log("Emitting 'undo_action'");
                  socket.emit('undo_action');
                  if(undoButton) undoButton.disabled = true; // Disable until server confirms
              }
         } else { console.warn("Undo denied by permission or no socket."); }
    }

     function handleSwapTeams() {
         if (socket && hasPermission('swapSides')) {
             console.log("Emitting 'swap_teams'");
             socket.emit('swap_teams');
         } else { console.warn("Swap teams denied by permission or no socket."); }
     }

     function handleNextDraft() {
          if (socket && hasPermission('nextDraft')) {
              if (isDraftComplete) {
                  console.log("Emitting 'next_draft'");
                  socket.emit('next_draft');
              } else {
                   showStatusMessage("Драфт не завершен.", 2000);
              }
          } else { console.warn("Next draft denied by permission or no socket."); }
     }

     function handleToggleTimer() {
         // Decide if timer duration is server-controlled or local admin setting
         console.log("handleToggleTimer called - Action TBD (emit or local change?)");
         // Example: Local change for admin only
         if (hasPermission('toggleTimerDuration') && !isDraftStarted) {
             draftTimerDuration = draftTimerDuration === 30 ? 45 : 30;
             resetTimerDisplay();
             if(toggleTimerButton) toggleTimerButton.title = `Сменить время таймера (${draftTimerDuration === 30 ? '-> 45с' : '-> 30с'})`;
             showStatusMessage(`Время таймера: ${draftTimerDuration} сек.`, 1500);
         }
         // OR: socket.emit('toggle_timer_duration');
     }


    // --- Display/UI Update Functions (Mostly Unchanged Logic) ---
    function fillSlot(slotElement, champion, type, nicknameText = '') { /* ... unchanged ... */ }
    function addNicknameInput(slotElement, text = '') {
         const nicknameInput = document.createElement('div');
         nicknameInput.spellcheck = false;
         nicknameInput.className = 'nickname-input';
         nicknameInput.textContent = text || '';
         nicknameInput.dataset.slotId = slotElement.id;
         const canEdit = hasPermission('editNicknames');
         nicknameInput.contentEditable = canEdit;
         nicknameInput.style.cursor = canEdit ? 'text' : 'default';

         if (canEdit) {
             // Send update on blur if changed
             nicknameInput.addEventListener('blur', (e) => {
                 const slotId = e.target.dataset.slotId;
                 const newNick = e.target.textContent.trim();
                 // Check against the *last known state* for this slot
                 if (slotId && pickNicknames[slotId] !== newNick) {
                     handleNicknameChange(slotId, newNick);
                 }
             });
             nicknameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } });
         }
         slotElement.appendChild(nicknameInput);
     }
    function restoreSlotPlaceholder(slotElement, slotId, nicknameText = '') { /* ... unchanged (uses addNicknameInput) ... */ }
    function getSlotChampionId(slotId) { /* ... unchanged ... */ }

    // --- Local UI Handlers (Unchanged) ---
    const debouncedFilter = debounce(() => { filterChampions(); }, 250);
    function filterChampions() { /* ... unchanged ... */ }
    function deselectSwapSlots() { /* ... unchanged ... */ }
    function handlePickContainerClick(event) { /* ... unchanged (local swap UI) ... */ }
    function handleRoleFilterClick(event) { /* ... unchanged ... */ }
    function handlePriorityFilterToggle() { /* ... unchanged ... */ }
    function displayGloballyBanned() { /* TODO: Update based on server state */ }
    function getDraftOrder() { /* ... unchanged ... */ }
    function showChampionTooltip(event, champion) { /* ... unchanged ... */ }
    function hideChampionTooltip() { /* ... unchanged ... */ }

    // --- Socket.IO Event Handlers ---
    if (socket) {
        socket.on('connect', () => {
            console.log(`Successfully connected to Socket.IO server: ${socket.id}`);
            showStatusMessage("Подключено к серверу", 2000);
            // Server should send 'current_state' automatically on connection
        });

        socket.on('disconnect', (reason) => {
            console.warn(`Disconnected from server: ${reason}`);
            showStatusMessage("Отключено от сервера!", 3000);
            // TODO: Maybe disable UI or show overlay?
        });

        socket.on('connect_error', (err) => {
            console.error(`Connection Error: ${err.message}`);
            showStatusMessage(`Ошибка подключения к серверу!`, 5000);
        });

        // Receive initial state from server
        socket.on('current_state', (serverState) => {
            console.log("Received 'current_state':", serverState);
            if (!isDraftInitialized) {
                 console.warn("Received state before UI initialized, applying after init.");
                 // Defer update until UI is ready? Or force init?
                 // For simplicity, let's assume initializeAppDraft runs first
                 // If initializeAppDraft hasn't run, state might be applied too early.
                 // A better approach might store this and apply in initializeAppDraft's callback/promise.
                 // Or ensure initializeAppDraft runs AFTER connection is established.
                 // Let's try applying immediately, assuming elements exist.
                 if (checkDraftElements()) { // Check elements again just in case
                      updateDraftUI(serverState);
                 } else {
                     console.error("Cannot apply initial state, elements not ready.");
                 }

            } else {
                 updateDraftUI(serverState); // Update UI with initial state
            }
        });

        // Receive state updates from server
        socket.on('draft_updated', (serverState) => {
            console.log("Received 'draft_updated':", serverState);
             if (!isDraftInitialized) {
                 console.warn("Received update before UI initialized, ignoring.");
                 return;
             }
            updateDraftUI(serverState); // Update UI with the new state
        });

        // Optional: Handle specific error messages from server
        // socket.on('error_message', (message) => { showStatusMessage(message, 4000); });
    }

    // --- Initial App Setup ---
     applyTheme(currentTheme); // Apply theme
     const initialRole = getRoleFromHash();
     if (initialRole) {
         navigateTo('draft'); // This will trigger initializeAppDraft if needed
     } else {
         navigateTo('home');
     }

}); // End DOMContentLoaded