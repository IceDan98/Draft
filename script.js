// script.js - v8.0 + Socket.IO Conditional Logic
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded. Initializing App v8.0+socket-conditional...");

    // --- Socket.IO Setup ---
    const SERVER_URL = 'YOUR_SERVER_URL'; // <--- ЗАМЕНИТЬ НА АДРЕС СЕРВЕРА!
    const useSockets = SERVER_URL && SERVER_URL !== 'YOUR_SERVER_URL'; // Флаг использования сокетов
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

    // --- Navigation & Role Handling --- (Unchanged)
    function navigateTo(pageName) { /* ... unchanged ... */ }
    function getRoleFromHash() { /* ... unchanged ... */ }

    // --- Home Page Logic --- (Unchanged)
    function handleCreateLobby() { /* ... unchanged ... */ }
    function handleAdminClick() {
        console.log("--- handleAdminClick called ---"); // DEBUG
        /* ... unchanged ... */
        navigateTo('draft');
    }

    // --- Listeners for Home page --- (Unchanged)
    if (createLobbyButton) { /* ... */ }
    document.querySelectorAll('.copy-button').forEach(button => { /* ... */ });
    if (adminButton) { /* ... */ }
    if (themeToggleButton) { /* ... */ }

    // --- Function to check if draft elements exist --- (Unchanged)
    function checkDraftElements() { /* ... unchanged ... */ }

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
            displayChampions();
            if(loadingIndicator) loadingIndicator.classList.add('hidden');
            if(mainLayout) mainLayout.classList.remove('hidden');

            // 4. Initial Setup UI
            if (!useSockets) {
                console.log("Running initial reset for local mode.");
                resetDraftFull(true); // Perform initial reset only if not using sockets
            } else {
                 console.log("Waiting for server state...");
                 // UI will be updated when 'current_state' is received
                 // Optionally show a "Connecting..." or specific loading state here
            }

            // 5. Attach Event Listeners (Attach all, logic inside handlers will be conditional)
            console.log("Attaching draft page event listeners...");
            if (timerDisplay) timerDisplay.addEventListener('click', handleStartDraft);
            if (resetButton) resetButton.addEventListener('click', handleResetDraft);
            if (clearPicksButton) clearPicksButton.addEventListener('click', handleClearPicks);
            if (undoButton) undoButton.addEventListener('click', handleUndo);
            if (swapButton) swapButton.addEventListener('click', handleSwapTeams);
            if (toggleTimerButton) toggleTimerButton.addEventListener('click', handleToggleTimer);
            if (confirmPickBanButton) confirmPickBanButton.addEventListener('click', handleConfirmPickBan);
            if (priorityFilterButton) priorityFilterButton.addEventListener('click', handlePriorityFilterToggle);
            if (nextDraftButton) nextDraftButton.addEventListener('click', handleNextDraft);
            if (championSearch) championSearch.addEventListener('input', debouncedFilter);
            if (filterButtons) { filterButtons.forEach(button => { button.addEventListener('click', handleRoleFilterClick); }); }
            if (blueColumn) blueColumn.addEventListener('click', handlePickContainerClick);
            if (redColumn) redColumn.addEventListener('click', handlePickContainerClick);
            if (returnHomeButton) returnHomeButton.addEventListener('click', () => navigateTo('home'));
            // Attach nickname listeners (will emit if useSockets is true)
            attachNicknameListeners(); // Helper function to attach/reattach nickname listeners
            // Attach team name/score listeners (will emit if useSockets is true)
            attachEditableFieldListeners();

            console.log("Draft page event listeners attached.");

            isDraftInitialized = true;
            console.log("Draft simulator page initialized successfully for role:", currentUserRole);

        } catch (error) {
            console.error("Error during initializeAppDraft:", error);
            showStatusMessage(`Критическая ошибка инициализации: ${error.message}`, 10000);
            if(loadingIndicator) loadingIndicator.textContent = `Ошибка! ${error.message}`;
            if(mainLayout) mainLayout.classList.add('hidden');
        }
    } // --- End of initializeAppDraft ---

    // Helper to attach listeners to editable fields
    function attachEditableFieldListeners() {
         [blueTeamNameH2, redTeamNameH2].forEach(el => {
                if (el) {
                    // Remove existing listeners first to avoid duplicates if re-initializing
                    el.replaceWith(el.cloneNode(true)); // Simple way to remove all listeners
                    el = document.getElementById(el.id); // Get the new node reference
                    if (!el) return;

                    el.addEventListener('blur', (e) => {
                        if (!hasPermission('editTeamName')) return;
                        const side = el.id.includes('blue') ? 'blue' : 'red';
                        const name = e.target.textContent.trim();
                        if (useSockets && socket?.connected) {
                             console.log(`Emitting update_team_name: side=${side}, name=${name}`);
                             socket.emit('update_team_name', { side, name });
                        } else if (!useSockets) {
                            // Local mode: Update localStorage directly? Or maybe team names aren't saved locally?
                            localStorage.setItem(side === 'blue' ? 'lobbyTeam1Name' : 'lobbyTeam2Name', name);
                        }
                    });
                    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } });
                }
            });
             [blueScoreEl, redScoreEl].forEach(el => {
                 if (el) {
                    el.replaceWith(el.cloneNode(true));
                    el = document.getElementById(el.id);
                     if (!el) return;

                    el.addEventListener('blur', (e) => {
                        if (!hasPermission('editScore')) return;
                        const side = el.id.includes('blue') ? 'blue' : 'red';
                        const score = e.target.textContent.trim();
                         if (useSockets && socket?.connected) {
                             console.log(`Emitting update_score: side=${side}, score=${score}`);
                             socket.emit('update_score', { side, score });
                         } else if (!useSockets) {
                            // Local mode: No score saving implemented
                         }
                    });
                    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } });
                }
            });
    }

    // Helper to attach nickname listeners
    function attachNicknameListeners() {
        document.querySelectorAll('.nickname-input').forEach(input => {
            // Simple way to remove previous listeners if this is called multiple times
            input.replaceWith(input.cloneNode(true));
            const newInput = document.querySelector(`[data-slot-id="${input.dataset.slotId}"]`); // Re-select the new node
            if (!newInput) return;

            const canEdit = hasPermission('editNicknames');
            newInput.contentEditable = canEdit;
            newInput.style.cursor = canEdit ? 'text' : 'default';

            if (canEdit) {
                newInput.addEventListener('blur', (e) => {
                    const slotId = e.target.dataset.slotId;
                    const newNick = e.target.textContent.trim();
                    if (slotId && pickNicknames[slotId] !== newNick) { // Only emit if changed
                         if (useSockets && socket?.connected) {
                             handleNicknameChange(slotId, newNick); // Emit event
                         } else if (!useSockets) {
                             pickNicknames[slotId] = newNick; // Update local state directly
                             // No need to call updateDraftUI here, maybe? Or maybe yes if needed elsewhere.
                         }
                    }
                });
                newInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } });
            }
        });
    }


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
    function startTimer() { /* ... */ } // TODO: Potentially trigger via server event

    // --- Draft Logic Functions ---

    // Display/Card Creation (Unchanged)
    function createChampionCard(champ) { /* ... */ return document.createElement('button'); /* Placeholder */ } // Placeholder return
    function displayChampions() { /* ... unchanged ... */ }

    // --- Main UI Update Function (Driven by Server State or Local State) ---
    function updateDraftUI(serverState = null) {
        console.log("DEBUG: updateDraftUI called.");
        if (!isDraftInitialized && !serverState) { // Allow initial update from server even if not initialized locally
            console.log("DEBUG: updateDraftUI skipped - draft not initialized and no server state provided.");
            return;
        }

        // 1. Update Local State IF serverState is provided
        if (serverState) {
            console.log("DEBUG: Updating local state from server:", serverState);
            currentStep = serverState.step !== undefined ? serverState.step : currentStep;
            isDraftStarted = serverState.started !== undefined ? serverState.started : isDraftStarted;
            pickNicknames = serverState.nicknames || {};
            isDraftComplete = currentStep >= getDraftOrder().length;

            selectedChampions.clear();
            Object.values(serverState.picks || {}).forEach(pick => { if (pick?.championId) selectedChampions.add(pick.championId); });
            Object.values(serverState.bans || {}).forEach(banChampId => { if (banChampId) selectedChampions.add(banChampId); });

            if(blueTeamNameH2 && serverState.team1Name !== undefined) blueTeamNameH2.textContent = serverState.team1Name;
            if(redTeamNameH2 && serverState.team2Name !== undefined) redTeamNameH2.textContent = serverState.team2Name;
            // TODO: Update score, global bans etc. from serverState if implemented

            // Clear and refill slots based ONLY on server state
            console.log("DEBUG: Clearing and refilling slots based on server state.");
            document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => {
                 restoreSlotPlaceholder(slot, slot.id, pickNicknames[slot.id] || '');
            });
            Object.entries(serverState.bans || {}).forEach(([slotId, champId]) => {
                 const champ = getChampionById(champId);
                 const slotElement = document.getElementById(slotId);
                 if (champ && slotElement) fillSlot(slotElement, champ, 'ban');
                 else console.warn(`DEBUG: Ban slot/champ missing: ${slotId}/${champId}`);
            });
             Object.entries(serverState.picks || {}).forEach(([slotId, pickData]) => {
                 const champ = getChampionById(pickData?.championId);
                 const slotElement = document.getElementById(slotId);
                 if (champ && slotElement && pickData) fillSlot(slotElement, champ, 'pick', pickData.nick);
                 else console.warn(`DEBUG: Pick slot/champ/data missing: ${slotId}/${pickData?.championId}`);
             });

        } else if (!useSockets) {
             console.log("DEBUG: updateDraftUI using local state (no server state provided).");
             // In local mode, state is already updated by handlers before calling this
             isDraftComplete = currentStep >= getDraftOrder().length;
        } else {
            console.log("DEBUG: updateDraftUI called without server state in socket mode. UI might be stale.");
            // Avoid updating based on potentially stale local state if using sockets
            // Only update things that are purely local UI state?
        }

         // 2. Update UI based on the current local state (which might have been updated above)
         if (!checkDraftElements()) { // Ensure elements are still available
             console.error("Elements missing during UI update!");
             return;
         }

         document.querySelectorAll('.pick-slot, .ban-slot').forEach(el => { el.classList.remove('highlight-action', 'preview-flash', 'swap-selected'); });
         applyRolePermissions(currentUserRole);

         const draftOrder = getDraftOrder();
         let currentActionTeam = null;

         if (!isDraftStarted) {
             resetTimerDisplay();
             if(blueColumn) blueColumn.classList.add('draft-disabled');
             if(redColumn) redColumn.classList.add('draft-disabled');
             if(nextDraftButton) nextDraftButton.disabled = !hasPermission('nextDraft') || true;
             if(swapButton) swapButton.disabled = !hasPermission('swapSides');
             if(clearPicksButton) clearPicksButton.disabled = !hasPermission('clearDraft') /*|| check if empty?*/;
             if(toggleTimerButton) toggleTimerButton.disabled = !hasPermission('toggleTimerDuration');
             if(priorityFilterButton) priorityFilterButton.disabled = !hasPermission('togglePriorityFilter');
             if(resetButton) resetButton.disabled = !hasPermission('resetDraft');
             if(timerDisplay) timerDisplay.disabled = !hasPermission('startDraft');
             if (championGridElement) championGridElement.style.pointerEvents = 'none';
         } else if (!isDraftComplete) {
             const action = draftOrder[currentStep];
             if (!action) {
                 console.error(`Error: No action found for step ${currentStep}`);
                 isDraftComplete = true; // Force completion to avoid errors
             } else {
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
                 if(timerDisplay) timerDisplay.disabled = true;
                 if(swapButton) swapButton.disabled = true;
                 if(toggleTimerButton) toggleTimerButton.disabled = true;
                 if(priorityFilterButton) priorityFilterButton.disabled = true;
                 if(clearPicksButton) clearPicksButton.disabled = !hasPermission('clearDraft');
                 if(resetButton) resetButton.disabled = !hasPermission('resetDraft');

                 const isGridInteractive = (currentUserRole === 'admin' || userTeamSide === currentActionTeam);
                 if (championGridElement) {
                     championGridElement.style.pointerEvents = isGridInteractive ? 'auto' : 'none';
                 }
                 if(confirmPickBanButton) confirmPickBanButton.disabled = !hasPermission('confirmAction', currentActionTeam) || !previewedChampion;
             }
         }
         // Handle Draft Complete state separately after checking action
         if (isDraftComplete) {
             console.log("DEBUG: UI Update - Draft Complete section");
             stopTimer();
             if(timerDisplay) { timerDisplay.textContent = "Драфт Завершен!"; timerDisplay.classList.add('timer-disabled'); timerDisplay.disabled = true; timerDisplay.title = 'Драфт завершен'; }
             if(blueColumn) blueColumn.classList.remove('draft-disabled');
             if(redColumn) redColumn.classList.remove('draft-disabled');
             if(nextDraftButton) nextDraftButton.disabled = !hasPermission('nextDraft');
             if(swapButton) swapButton.disabled = !hasPermission('swapSides');
             if(clearPicksButton) clearPicksButton.disabled = !hasPermission('clearDraft');
             if(toggleTimerButton) toggleTimerButton.disabled = true;
             if(priorityFilterButton) priorityFilterButton.disabled = !hasPermission('togglePriorityFilter');
             if(resetButton) resetButton.disabled = !hasPermission('resetDraft');
             if (championGridElement) championGridElement.style.pointerEvents = 'none';
             if(confirmPickBanButton) confirmPickBanButton.disabled = true;
         }

         // Update Undo button state
         if(undoButton) undoButton.disabled = !hasPermission('undoAction') || currentStep === 0 || !isDraftStarted;

         updateChampionAvailability(); // Update based on selectedChampions
         // displayGloballyBanned(); // TODO: Update based on server state
         updateNicknameEditability();
         attachNicknameListeners(); // Re-attach listeners after potential slot redraw
         console.log("DEBUG: updateDraftUI finished.");
    }

    // Update Champion Availability (uses local selectedChampions set)
    function updateChampionAvailability() { /* ... unchanged ... */ }

    // Champion Preview (remains local UI action)
    function handleChampionPreview(champion) { /* ... unchanged ... */ }

    // --- ACTION HANDLERS ---
    // Now check useSockets flag

    function handleStartDraft() {
        console.log("handleStartDraft called");
        if (!hasPermission('startDraft')) return;
        if (!isDraftStarted) {
            if (useSockets && socket?.connected) {
                console.log("Emitting 'start_draft'");
                socket.emit('start_draft');
                if(timerDisplay) timerDisplay.disabled = true; // Immediate feedback
            } else if (!useSockets) {
                console.log("Starting draft locally");
                isDraftStarted = true;
                currentStep = 0;
                // Maybe start local timer?
                updateDraftUI(); // Update UI based on local state change
            } else {
                 console.warn("Cannot start draft: Socket mode enabled but not connected.");
                 showStatusMessage("Нет соединения с сервером!", 3000);
            }
        }
    }

    function handleConfirmPickBan() {
        console.log("handleConfirmPickBan called");
        if (!previewedChampion || !isDraftStarted || isDraftComplete) return;
        const draftOrder = getDraftOrder();
        if (currentStep >= draftOrder.length) return;
        const currentAction = draftOrder[currentStep];
        if (!hasPermission('confirmAction', currentAction.team)) return;

        const championToConfirm = previewedChampion;
        const slotElement = document.getElementById(currentAction.slot);
        const isDisabled = selectedChampions.has(championToConfirm.id) || globallyDisabledChampions.has(championToConfirm.id);
        if (!slotElement || isDisabled) return;

        const nickname = pickNicknames[currentAction.slot] || ''; // Get current nickname

        if (useSockets && socket?.connected) {
            console.log(`Emitting 'make_pick' for ${championToConfirm.id}`);
            socket.emit('make_pick', {
                championId: championToConfirm.id,
                slotId: currentAction.slot,
                nickname: nickname,
                type: currentAction.type,
                team: currentAction.team
            });
        } else if (!useSockets) {
            console.log(`Making ${currentAction.type} locally: ${championToConfirm.id}`);
            selectedChampions.add(championToConfirm.id);
            draftHistory.push({ championId: championToConfirm.id, slotId: currentAction.slot, step: currentStep, previousNickname: pickNicknames[currentAction.slot] || '', type: currentAction.type, team: currentAction.team }); // Keep local history for undo
            // Update state directly
            if (currentAction.type === 'pick') {
                 pickNicknames[currentAction.slot] = nickname;
            }
            currentStep++;
            updateDraftUI(); // Update UI based on local state change
            filterChampions(); // Update grid filtering
        } else {
             console.warn("Cannot confirm pick/ban: Socket mode enabled but not connected.");
             showStatusMessage("Нет соединения с сервером!", 3000);
        }

        // Reset preview locally regardless of mode
        previewedChampion = null;
        slotElement.classList.remove('preview-flash');
        if(confirmPickBanButton) confirmPickBanButton.disabled = true;
    }

    function handleNicknameChange(slotId, newNickname) {
        // This function is now only called by the blur listener in addNicknameInput
        if (useSockets && socket?.connected) {
            console.log(`Emitting 'update_nickname' for slot ${slotId}`);
            socket.emit('update_nickname', { slotId: slotId, nickname: newNickname });
        }
        // No else needed, local update happens directly in blur listener if !useSockets
    }

    function handleResetDraft() {
        if (!hasPermission('resetDraft')) return;
        if (!confirm("Вы уверены, что хотите полностью сбросить драфт?")) return;

        if (useSockets && socket?.connected) {
            console.log("Emitting 'reset_draft'");
            socket.emit('reset_draft');
        } else if (!useSockets) {
            console.log("Resetting draft locally");
            resetDraftFull(true); // Force local reset
        } else {
             console.warn("Cannot reset draft: Socket mode enabled but not connected.");
             showStatusMessage("Нет соединения с сервером!", 3000);
        }
    }

    function handleClearPicks() {
        if (!hasPermission('clearDraft')) return;
        // Ask differently depending on mode? Or assume keepGlobal=true always?
        if (!confirm("Очистить пики/баны текущей игры (сохранив глоб. баны)?")) return;

         if (useSockets && socket?.connected) {
            console.log("Emitting 'clear_picks'");
            socket.emit('clear_picks', { keepGlobal: true });
         } else if (!useSockets) {
             console.log("Clearing picks locally (keeping global bans)");
             resetCurrentGamePicksBans(true, true); // Force local clear, keep global
         } else {
              console.warn("Cannot clear picks: Socket mode enabled but not connected.");
              showStatusMessage("Нет соединения с сервером!", 3000);
         }
    }

    function handleUndo() {
         if (!hasPermission('undoAction')) return;
         if (currentStep === 0 || !isDraftStarted) return;

         if (useSockets && socket?.connected) {
              console.log("Emitting 'undo_action'");
              socket.emit('undo_action');
              if(undoButton) undoButton.disabled = true;
         } else if (!useSockets) {
             console.log("Performing undo locally");
             if (draftHistory.length === 0) return;
             const lastAction = draftHistory.pop();
             if (!lastAction) return;
             currentStep = lastAction.step;
             selectedChampions.delete(lastAction.championId);
             pickNicknames[lastAction.slotId] = lastAction.previousNickname; // Restore nickname state
             isDraftComplete = false;
             previewedChampion = null;
             // Manually restore slot appearance
             const slotElement = document.getElementById(lastAction.slotId);
             if (slotElement) {
                 restoreSlotPlaceholder(slotElement, lastAction.slotId, lastAction.previousNickname);
             }
             updateDraftUI(); // Update UI based on local state change
             filterChampions();
             showStatusMessage("Действие отменено (локально)", 1500);
         } else {
              console.warn("Cannot undo: Socket mode enabled but not connected.");
              showStatusMessage("Нет соединения с сервером!", 3000);
         }
    }

     function handleSwapTeams() {
         if (!hasPermission('swapSides')) return;
         if (useSockets && socket?.connected) {
             console.log("Emitting 'swap_teams'");
             socket.emit('swap_teams');
         } else if (!useSockets) {
             console.log("Swapping teams locally");
             // Perform full local swap logic (from v8.0)
             try {
                 const tempName = blueTeamNameH2.textContent; blueTeamNameH2.textContent = redTeamNameH2.textContent; redTeamNameH2.textContent = tempName;
                 const tempScore = blueScoreEl.textContent; blueScoreEl.textContent = redScoreEl.textContent; redScoreEl.textContent = tempScore;
                 // Swap localStorage names if needed
                 localStorage.setItem('lobbyTeam1Name', redTeamNameH2.textContent);
                 localStorage.setItem('lobbyTeam2Name', blueTeamNameH2.textContent);
                 // Swap picks/bans/nicknames locally
                 const newPickNicknames = {}; const newSelectedChampions = new Set(); const newBluePicks = []; const newRedPicks = []; const newBlueBans = []; const newRedBans = []; const currentBlueBans = []; const currentRedBans = [];
                 for(let i=1; i<=5; i++) { /* ... collect bans ... */ const blueBanSlotId = `blue-ban-${i}`; const redBanSlotId = `red-ban-${i}`; const blueBanChampId = draftHistory.find(a => a.slotId === blueBanSlotId)?.championId; const redBanChampId = draftHistory.find(a => a.slotId === redBanSlotId)?.championId; if(blueBanChampId) currentBlueBans.push(blueBanChampId); if(redBanChampId) currentRedBans.push(redBanChampId); /* ... collect picks/nicks ... */ const bluePickSlotId = `blue-pick-${i}`; const redPickSlotId = `red-pick-${i}`; const blueChampId = getSlotChampionId(bluePickSlotId); const redChampId = getSlotChampionId(redPickSlotId); const blueNick = pickNicknames[bluePickSlotId] || ''; const redNick = pickNicknames[redPickSlotId] || ''; if(redChampId) newBluePicks.push({ slotId: bluePickSlotId, champId: redChampId, nick: redNick }); if(blueChampId) newRedPicks.push({ slotId: redPickSlotId, champId: blueChampId, nick: blueNick }); newPickNicknames[bluePickSlotId] = redNick; newPickNicknames[redPickSlotId] = blueNick; }
                 currentRedBans.forEach((champId, index) => { if(champId) newBlueBans.push({ slotId: `blue-ban-${index+1}`, championId: champId }); }); currentBlueBans.forEach((champId, index) => { if(champId) newRedBans.push({ slotId: `red-ban-${index+1}`, championId: champId }); });
                 pickNicknames = newPickNicknames; // Update local state
                 document.querySelectorAll('.pick-slot, .ban-slot').forEach(slot => { restoreSlotPlaceholder(slot, slot.id, pickNicknames[slot.id] || ''); });
                 newBlueBans.forEach(b => { const champ = getChampionById(b.championId); if(champ) fillSlot(document.getElementById(b.slotId), champ, 'ban'); if(b.championId) newSelectedChampions.add(b.championId); }); newRedBans.forEach(b => { const champ = getChampionById(b.championId); if(champ) fillSlot(document.getElementById(b.slotId), champ, 'ban'); if(b.championId) newSelectedChampions.add(b.championId); }); newBluePicks.forEach(p => { const champ = getChampionById(p.champId); if(champ) fillSlot(document.getElementById(p.slotId), champ, 'pick', p.nick); if(p.champId) newSelectedChampions.add(p.champId); }); newRedPicks.forEach(p => { const champ = getChampionById(p.champId); if(champ) fillSlot(document.getElementById(p.slotId), champ, 'pick', p.nick); if(p.champId) newSelectedChampions.add(p.champId); });
                 selectedChampions = newSelectedChampions; // Update local state
                 deselectSwapSlots();
                 updateDraftUI(); // Update UI based on local state change
                 showStatusMessage("Команды поменялись местами (локально).", 2000);
             } catch (error) { console.error("Error during local swap:", error); }
         } else {
              console.warn("Cannot swap teams: Socket mode enabled but not connected.");
              showStatusMessage("Нет соединения с сервером!", 3000);
         }
     }

     function handleNextDraft() {
          if (!hasPermission('nextDraft')) return;
          if (!isDraftComplete) { showStatusMessage("Драфт не завершен.", 2000); return; }

          if (useSockets && socket?.connected) {
              console.log("Emitting 'next_draft'");
              socket.emit('next_draft');
          } else if (!useSockets) {
               console.log("Performing next draft locally");
               let addedBansCount = 0;
               draftHistory.forEach(action => { if (action.type === 'pick' && !globallyDisabledChampions.has(action.championId)) { globalBanHistory.push({ championId: action.championId, team: action.team }); globallyDisabledChampions.add(action.championId); addedBansCount++; } });
               console.log(`Added ${addedBansCount} champions to global bans locally.`);
               resetCurrentGamePicksBans(true, true); // Keep global bans locally
               showStatusMessage("Переход к следующему драфту (локально).", 2500);
          } else {
               console.warn("Cannot start next draft: Socket mode enabled but not connected.");
               showStatusMessage("Нет соединения с сервером!", 3000);
          }
     }

     function handleToggleTimer() {
         // This seems like a local setting, not needing sync?
         if (hasPermission('toggleTimerDuration') && !isDraftStarted) {
             draftTimerDuration = draftTimerDuration === 30 ? 45 : 30;
             resetTimerDisplay();
             if(toggleTimerButton) toggleTimerButton.title = `Сменить время таймера (${draftTimerDuration === 30 ? '-> 45с' : '-> 30с'})`;
             showStatusMessage(`Время таймера: ${draftTimerDuration} сек.`, 1500);
         }
     }


    // --- Display/UI Update Functions (Mostly Unchanged Logic) ---
    function fillSlot(slotElement, champion, type, nicknameText = '') { /* ... unchanged ... */ }
    function addNicknameInput(slotElement, text = '') { /* ... Re-uses attachNicknameListeners logic ... */ }
    function restoreSlotPlaceholder(slotElement, slotId, nicknameText = '') { /* ... unchanged (uses addNicknameInput) ... */ }
    function getSlotChampionId(slotId) { /* ... unchanged ... */ }

    // --- Local UI Handlers (Unchanged) ---
    const debouncedFilter = debounce(() => { filterChampions(); }, 250);
    function filterChampions() { /* ... unchanged ... */ }
    function deselectSwapSlots() { /* ... unchanged ... */ }
    function handlePickContainerClick(event) { /* ... unchanged (local swap UI) ... */ }
    function handleRoleFilterClick(event) { /* ... unchanged ... */ }
    function handlePriorityFilterToggle() { /* ... unchanged ... */ }
    function displayGloballyBanned() { /* TODO: Update based on server state or local globalBanHistory */ }
    function getDraftOrder() { /* ... unchanged ... */ return []; /* Placeholder */ } // Placeholder return
    function showChampionTooltip(event, champion) { /* ... */ }
    function hideChampionTooltip() { /* ... */ }

    // --- Socket.IO Event Handlers ---
    if (useSockets && socket) { // Check both flag and socket object existence
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

        // Receive initial state from server
        socket.on('current_state', (serverState) => {
            console.log("Получено начальное состояние 'current_state':", serverState);
            if (!isDraftInitialized && currentPage === 'draft') {
                 console.warn("Received state before draft UI initialized. Applying anyway.");
                 if (checkDraftElements()) { updateDraftUI(serverState); }
                 else { console.error("Elements not ready for initial state update."); }
            } else if (isDraftInitialized || currentPage === 'draft') { // Apply if draft page is current
                 updateDraftUI(serverState);
            }
        });

        // Receive state updates from server
        socket.on('draft_updated', (serverState) => {
            console.log("Получено обновление 'draft_updated':", serverState);
             if (!isDraftInitialized && currentPage === 'draft') {
                 console.warn("Received update before draft UI initialized. Applying anyway.");
                  if (checkDraftElements()) { updateDraftUI(serverState); }
                  else { console.error("Elements not ready for draft update."); }
             } else if (isDraftInitialized) {
                 updateDraftUI(serverState);
             }
        });
    } else if (!useSockets) {
        console.log("Socket.IO не используется (локальный режим).");
    } else { // useSockets is true, but socket failed to initialize
        console.error("Socket object is not available but should be. Real-time features disabled.");
        showStatusMessage("Ошибка инициализации сокета!", 5000);
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
