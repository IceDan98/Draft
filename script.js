// script.js v7.6 - Added 'Open' button functionality in lobby
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded. Initializing App v7.6..."); // Version Updated

    // --- Page Elements ---
    const appContainer = document.getElementById('app-container');
    const homePage = document.getElementById('homePage');
    const draftPage = document.getElementById('draftPage');
    const adminButton = document.getElementById('adminButton');
    const themeToggleButton = document.getElementById('themeToggleButton');
    console.log("DEBUG: Theme Toggle Button Element:", themeToggleButton);

    // Home Page Elements
    const team1NameInput = document.getElementById('team1NameInput');
    const team2NameInput = document.getElementById('team2NameInput');
    const createLobbyButton = document.getElementById('createLobbyButton');
    const lobbyLinksDisplay = document.getElementById('lobbyLinksDisplay');
    const judgeLinkText = document.getElementById('judgeLinkText');
    const team1LinkText = document.getElementById('team1LinkText');
    const team2LinkText = document.getElementById('team2LinkText');
    // ADDED: Get references for the new 'Open' buttons
    const openJudgeLinkButton = document.getElementById('openJudgeLinkButton');
    const openTeam1LinkButton = document.getElementById('openTeam1LinkButton');
    const openTeam2LinkButton = document.getElementById('openTeam2LinkButton');


    // --- Draft Simulator Global Elements ---
    let loadingIndicator, mainLayout, championGridElement, startButton, resetButton, undoButton, timerDisplay, championSearch, bluePicksContainer, redPicksContainer, blueColumn, redColumn, swapButton, clearPicksButton, toggleTimerButton, filterButtons, /* Changed back to NodeList */ confirmPickBanButton, newPriorityFilterButton, nextDraftButton, globallyBannedDisplay, globalBansBlueContainer, globalBansRedContainer, championTooltip, statusMessage, blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl, returnHomeButton, roleFilterButtonsContainer;

    // --- State Variables ---
    let currentPage = 'home';
    let isDraftInitialized = false;
    let currentUserRole = null;
    let userTeamSide = null;
    let currentTheme = localStorage.getItem('theme') || 'dark'; // Load theme or default to dark

    // Draft specific state variables
    let allChampionsData = { en: null, ru: null };
    let processedChampions = [];
    let ddragonVersion = 'latest';
    let baseIconUrl = '';
    let baseSplashUrl = '';
    let currentStep = 0;
    let selectedChampions = new Set();
    let draftHistory = [];
    let pickNicknames = {};
    let isDraftComplete = false;
    let isDraftStarted = false;
    let selectedSwapSlotId = null;
    let timerInterval = null;
    let draftTimerDuration = 30;
    let timerSeconds = draftTimerDuration;
    let currentRoleFilter = 'All';
    let previewedChampion = null;
    let isPriorityFilterActive = false; // State variable remains the same
    let statusTimeout = null;
    let globallyDisabledChampions = new Set();
    let globalBanHistory = [];
    // Priority list from user's v4.0 file (Used by filterChampions)
    const priorityChampions = new Set(['Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Annie', 'Ashe', 'AurelionSol', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Corki', 'Darius', 'Diana', 'DrMundo', 'Draven', 'Ekko', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Gwen', 'Hecarim', 'Heimerdinger', 'Irelia', 'Janna', 'JarvanIV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kaisa', 'Kalista', 'Karma', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Khazix', 'Kindred', 'LeeSin', 'Leona', 'Lillia', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Malphite', 'Maokai', 'MasterYi', 'Milio', 'MissFortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Nilah', 'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Pyke', 'Rakan', 'Rammus', 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Samira', 'Senna', 'Seraphine', 'Sett', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Sona', 'Soraka', 'Swain', 'Syndra', 'Talon', 'Teemo', 'Thresh', 'Tristana', 'Tryndamere', 'TwistedFate', 'Twitch', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Vex', 'Vi', 'Viego', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'MonkeyKing', 'Xayah', 'XinZhao', 'Yasuo', 'Yone', 'Yuumi', 'Zac', 'Zed', 'Zeri', 'Ziggs', 'Zoe', 'Zyra', 'Ryze', 'Nocturne', 'Zilean', 'Renata', 'Belveth', 'Naafiri', 'Briar', 'Hwei', 'Smolder']);

    // --- Permissions Map ---
    const permissions = {
        admin: {
            editTeamName: true, editScore: true, clearDraft: true, resetDraft: true, startDraft: true, toggleTimerDuration: true, swapSides: true, editNicknames: true, togglePriorityFilter: true, nextDraft: true,
            pickChampion: true, banChampion: true, undoAction: true, confirmAction: true, useRoleFilters: true, returnHome: true
        },
        judge: {
            editTeamName: true, editScore: true, clearDraft: true, resetDraft: true, startDraft: true, toggleTimerDuration: true, swapSides: true, editNicknames: true, togglePriorityFilter: true, nextDraft: true,
            pickChampion: false, banChampion: false, undoAction: false, confirmAction: false, useRoleFilters: false, returnHome: true
        },
        team1: {
            editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false,
            pickChampion: true, banChampion: true, undoAction: true, confirmAction: true, useRoleFilters: true, returnHome: true
        },
        team2: {
            editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false,
            pickChampion: true, banChampion: true, undoAction: true, confirmAction: true, useRoleFilters: true, returnHome: true
        },
         default: {
             editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false,
             pickChampion: false, banChampion: false, undoAction: false, confirmAction: false, useRoleFilters: false, returnHome: true
         }
    };

    // --- Helper Functions ---
    const debounce = (func, wait) => { let timeout; return function executedFunction(...args) { const later = () => { clearTimeout(timeout); func(...args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); }; };
    const showStatusMessage = (message, duration = 3000) => { if (!statusMessage) statusMessage = document.getElementById('statusMessage'); if (!statusMessage) { console.warn("Status message element not found!"); return; } statusMessage.textContent = message; statusMessage.classList.add('visible'); clearTimeout(statusTimeout); statusTimeout = setTimeout(() => { statusMessage.classList.remove('visible'); }, duration); };
    const getChampionById = (id) => processedChampions.find(champ => champ.id === id);

    // Permission Check Function
    function hasPermission(action, team = null) {
        const rolePerms = permissions[currentUserRole] || permissions.default;
        const isAdmin = currentUserRole === 'admin';
        const hasBasicPermission = isAdmin || rolePerms[action];

        let result = false;
        if (!hasBasicPermission) {
            result = false; // No basic permission
        } else if (isAdmin) {
            result = true; // Admin has all permissions
        } else if ((currentUserRole === 'team1' || currentUserRole === 'team2') && team) {
            // Check if the action is allowed for the specific team making the move
            result = userTeamSide === team;
        } else {
            // If not a team-specific action or user is judge/admin (and has basic perm)
            result = true;
        }
        // console.log(`DEBUG: hasPermission(action: ${action}, team: ${team}, role: ${currentUserRole}, side: ${userTeamSide}) -> ${result}`);
        return result;
    }


     // Function to copy text to clipboard
     async function copyToClipboard(text) {
         if (!navigator.clipboard) {
             try {
                 const textArea = document.createElement("textarea");
                 textArea.value = text;
                 textArea.style.position = "fixed"; document.body.appendChild(textArea);
                 textArea.focus(); textArea.select(); document.execCommand('copy');
                 document.body.removeChild(textArea);
                 showStatusMessage("Ссылка скопирована (fallback)", 1500);
             } catch (err) { console.error('Fallback copy failed:', err); showStatusMessage("Ошибка копирования", 2000); }
             return;
         }
         try {
             await navigator.clipboard.writeText(text);
             showStatusMessage("Ссылка скопирована!", 1500);
         } catch (err) { console.error('Async clipboard copy failed:', err); showStatusMessage("Ошибка копирования", 2000); }
     }

    // --- Theme Toggle Functions ---
    function applyTheme(theme) {
        console.log(`Applying theme: ${theme}`); // DEBUG
        document.documentElement.dataset.theme = theme; // Set attribute on <html>
        // DEBUG: Check if attribute was set
        console.log(`DEBUG: html data-theme = ${document.documentElement.dataset.theme}`);
        if (themeToggleButton) {
            themeToggleButton.textContent = theme === 'dark' ? '🌙' : '☀️';
            themeToggleButton.title = theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на темную тему';
        } else {
            console.warn("applyTheme: themeToggleButton not found when trying to update icon/title.");
        }
    }

    function toggleTheme() {
        // DEBUG: Confirm handler is called
        console.log("--- toggleTheme called ---");
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        console.log(`Toggling theme to: ${currentTheme}`);
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    }

    // --- Navigation & Role Handling ---
    function navigateTo(pageName) {
        console.log(`Navigating to: ${pageName}`);
        currentPage = pageName;

        if(homePage) homePage.classList.add('hidden');
        if(draftPage) draftPage.classList.add('hidden');

        // Get references inside navigateTo to ensure they exist if called before full DOM load (though DOMContentLoaded should prevent this)
        const currentAdminButton = document.getElementById('adminButton');
        const currentThemeButton = document.getElementById('themeToggleButton');
        console.log(`DEBUG navigateTo: page=${pageName}, themeButton=${!!currentThemeButton}`); // DEBUG

        // Hide/Show top right buttons based on page
        if(currentAdminButton) currentAdminButton.classList.add('hidden');
        if(currentThemeButton) currentThemeButton.classList.add('hidden'); // Both hidden by default

        if (pageName === 'home') {
            if(homePage) homePage.classList.remove('hidden');
            if(currentAdminButton) currentAdminButton.classList.remove('hidden'); // Show on home
            if(currentThemeButton) currentThemeButton.classList.remove('hidden'); // Show on home
            console.log("DEBUG navigateTo: Showing buttons for home page"); // DEBUG
            if (window.location.hash && currentUserRole !== 'admin') {
                // Clear role and hash when returning home normally
                currentUserRole = null;
                userTeamSide = null;
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
        } else if (pageName === 'draft') {
             if(draftPage) draftPage.classList.remove('hidden');
             console.log("DEBUG navigateTo: Hiding buttons for draft page"); // DEBUG
             // Buttons remain hidden on draft page
             if (!isDraftInitialized) {
                console.log("Initializing draft simulator for the first time...");
                initializeAppDraft(); // This function now handles role assignment internally
                isDraftInitialized = true;
            } else {
                 console.log("Draft already initialized, re-applying permissions for role:", currentUserRole);
                 // Ensure elements are available before applying permissions again
                 if (checkDraftElements()) {
                    // Re-determine role and side in case of refresh or direct navigation
                    if (!currentUserRole) {
                       currentUserRole = getRoleFromHash() || 'default';
                    }
                    if (currentUserRole === 'team1') userTeamSide = 'blue';
                    else if (currentUserRole === 'team2') userTeamSide = 'red';
                    else userTeamSide = null;

                    applyRolePermissions(currentUserRole);
                    if(blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem('lobbyTeam1Name') || 'Синяя Команда';
                    if(redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem('lobbyTeam2Name') || 'Красная Команда';
                    updateDraftUI(); // Update UI based on current role and state
                 } else {
                     console.error("Draft elements not found when trying to re-apply permissions.");
                     showStatusMessage("Ошибка UI: Элементы драфта не найдены.", 5000);
                 }
            }
        }
    }

    function getRoleFromHash() {
        const hash = window.location.hash;
        if (hash.startsWith('#role=')) {
            const role = hash.substring(6);
            if (permissions[role] && role !== 'admin') { // Ensure role exists and is not admin
                return role;
            }
        }
        return null;
    }

    // --- Home Page Logic ---
    function handleCreateLobby() {
        console.log("handleCreateLobby called");
        const team1Name = team1NameInput.value.trim() || "Синяя Команда";
        const team2Name = team2NameInput.value.trim() || "Красная Команда";
        localStorage.setItem('lobbyTeam1Name', team1Name);
        localStorage.setItem('lobbyTeam2Name', team2Name);

        const baseUrl = window.location.origin + window.location.pathname;
        const judgeLink = baseUrl + '#role=judge';
        const team1Link = baseUrl + '#role=team1';
        const team2Link = baseUrl + '#role=team2';

        // Update link text spans
        if (judgeLinkText) judgeLinkText.textContent = judgeLink;
        if (team1LinkText) team1LinkText.textContent = team1Link;
        if (team2LinkText) team2LinkText.textContent = team2Link;

        // --- ADDED: Set href for the 'Open' buttons ---
        if (openJudgeLinkButton) {
            openJudgeLinkButton.href = judgeLink;
        } else {
            console.warn("Judge 'Open' button not found");
        }
        if (openTeam1LinkButton) {
            openTeam1LinkButton.href = team1Link;
        } else {
            console.warn("Team 1 'Open' button not found");
        }
        if (openTeam2LinkButton) {
            openTeam2LinkButton.href = team2Link;
        } else {
            console.warn("Team 2 'Open' button not found");
        }
        // --- END OF ADDED CODE ---

        if (lobbyLinksDisplay) lobbyLinksDisplay.classList.remove('hidden');
        showStatusMessage("Лобби создано! Скопируйте или откройте ссылки.", 3000); // Updated message slightly
    }

    // --- Admin Button Logic ---
    function handleAdminClick() {
        console.log("Admin button clicked.");
        currentUserRole = 'admin';
        userTeamSide = null;
        const team1Name = team1NameInput.value.trim() || "Синяя Команда";
        const team2Name = team2NameInput.value.trim() || "Красная Команда";
        localStorage.setItem('lobbyTeam1Name', team1Name);
        localStorage.setItem('lobbyTeam2Name', team2Name);
        navigateTo('draft');
    }

    // Add listener for create lobby button
    if (createLobbyButton) {
        createLobbyButton.addEventListener('click', handleCreateLobby);
    } else { console.warn("Create Lobby Button not found"); }

     // Add listeners for copy buttons
     document.querySelectorAll('.copy-button').forEach(button => {
         // Ensure we only attach to actual buttons, not the new <a> tags
         if (button.tagName === 'BUTTON') {
             button.addEventListener('click', (event) => {
                 const linkId = event.target.dataset.linkId;
                 const linkSpan = document.getElementById(linkId);
                 if (linkSpan) {
                     copyToClipboard(linkSpan.textContent);
                 } else { console.warn("Copy link span not found for id:", linkId); }
             });
         }
     });

    // Add listener for Admin button
    if (adminButton) {
        adminButton.addEventListener('click', handleAdminClick);
    } else { console.warn("Admin Button not found"); }

    // --- Theme Toggle Listener (attached on DOM load) ---
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
        // DEBUG: Confirm listener attachment
        console.log("DEBUG: Click listener attached to themeToggleButton.");
    } else {
        console.warn("Theme toggle button not found! Listener not attached.");
    }

    // --- Function to check if draft elements exist ---
    function checkDraftElements() {
        // Re-fetch elements within this check to ensure they exist at the time of check
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
        roleFilterButtonsContainer = document.getElementById('roleFilterButtons'); // Get container
        filterButtons = roleFilterButtonsContainer ? roleFilterButtonsContainer.querySelectorAll('.filter-button') : null; // Get buttons inside container
        confirmPickBanButton = document.getElementById('confirmPickBanButton');
        newPriorityFilterButton = document.getElementById('newPriorityFilterButton');
        nextDraftButton = document.getElementById('nextDraftButton');
        returnHomeButton = document.getElementById('returnHomeButton');
        blueTeamNameH2 = document.getElementById('blue-team-name-h2');
        redTeamNameH2 = document.getElementById('red-team-name-h2');
        blueScoreEl = document.getElementById('blue-score');
        redScoreEl = document.getElementById('red-score');
        statusMessage = document.getElementById('statusMessage');
        championTooltip = document.getElementById('championTooltip'); // Make sure tooltip is fetched
        globalBansBlueContainer = document.getElementById('global-bans-blue');
        globalBansRedContainer = document.getElementById('global-bans-red');
        globallyBannedDisplay = document.getElementById('globallyBannedDisplay');


        const elementsToCheck = [
            loadingIndicator, mainLayout, championGridElement, timerDisplay, resetButton, undoButton,
            championSearch, blueColumn, redColumn, swapButton, clearPicksButton, toggleTimerButton,
            roleFilterButtonsContainer, filterButtons, // Check container and buttons
            confirmPickBanButton, newPriorityFilterButton, nextDraftButton, returnHomeButton,
            blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl, statusMessage, championTooltip,
            globalBansBlueContainer, globalBansRedContainer, globallyBannedDisplay
        ];
        if (!filterButtons || filterButtons.length === 0) {
             console.error("Role filter buttons NodeList is empty or null!");
             // Don't immediately fail, but log error
        }

        const missingElements = elementsToCheck.filter(el => !el);
        if (missingElements.length > 0) {
            console.error("Missing draft elements during check:", missingElements.map(el => el?.id || (el === newPriorityFilterButton ? 'newPriorityFilterButton' : 'unknown')));
            return false;
        }
        return true;
    }


    // --- Draft Simulator Logic (all inside initializeAppDraft) ---
    async function initializeAppDraft() {
        console.log("initializeAppDraft started");
        try {

            // 1. Determine Role
            if (!currentUserRole) {
                currentUserRole = getRoleFromHash() || 'default';
                console.warn(`Role determined as: ${currentUserRole}`);
            }
            console.log(`Initializing draft with Role: ${currentUserRole}`);

            // Assign team side
            if (currentUserRole === 'team1') userTeamSide = 'blue';
            else if (currentUserRole === 'team2') userTeamSide = 'red';
            else userTeamSide = null;

            // 2. Get Draft Page Elements (and check)
            if (!checkDraftElements()) {
                throw new Error("One or more draft page elements were not found during initialization!");
            }
            console.log("All draft elements found.");

            // 3. Load Data
            if(loadingIndicator) loadingIndicator.classList.remove('hidden');
            const dataLoaded = await loadChampionData();
            if (!dataLoaded) {
                throw new Error("Failed to load champion data.");
            }
            if(loadingIndicator) loadingIndicator.classList.add('hidden');
            if(mainLayout) mainLayout.classList.remove('hidden');

            // 4. Initial Setup based on Role
            displayChampions();
            resetDraftFull(true); // Initial reset, applies permissions and calls updateDraftUI internally

            // Set initial team names
            if(blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem('lobbyTeam1Name') || 'Синяя Команда';
            if(redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem('lobbyTeam2Name') || 'Красная Команда';

            // 5. Attach Event Listeners (Listeners for home page buttons are already attached)
            console.log("Attaching draft page event listeners...");
            if (timerDisplay) timerDisplay.addEventListener('click', handleStartDraft); else console.warn("Listener not attached: timerDisplay not found");
            if (resetButton) resetButton.addEventListener('click', () => { console.log("Reset button clicked"); resetDraftFull(false); }); else console.warn("Listener not attached: resetButton not found");
            if (clearPicksButton) clearPicksButton.addEventListener('click', () => { console.log("Clear Picks button clicked"); resetCurrentGamePicksBans(false, false); }); else console.warn("Listener not attached: clearPicksButton not found");
            if (undoButton) undoButton.addEventListener('click', handleUndo); else console.warn("Listener not attached: undoButton not found");
            if (swapButton) swapButton.addEventListener('click', handleSwapTeams); else console.warn("Listener not attached: swapButton not found");
            if (toggleTimerButton) toggleTimerButton.addEventListener('click', handleToggleTimer); else console.warn("Listener not attached: toggleTimerButton not found");
            if (confirmPickBanButton) confirmPickBanButton.addEventListener('click', handleConfirmPickBan); else console.warn("Listener not attached: confirmPickBanButton not found");
            if (newPriorityFilterButton) {
                 newPriorityFilterButton.addEventListener('click', handleNewPriorityFilterToggle); // Use new handler
             } else { console.warn("Listener not attached: newPriorityFilterButton not found"); }
            if (nextDraftButton) nextDraftButton.addEventListener('click', handleNextDraft); else console.warn("Listener not attached: nextDraftButton not found");
            if (championSearch) championSearch.addEventListener('input', debouncedFilter); else console.warn("Listener not attached: championSearch not found");

            // --- Reverted: Attach listeners individually ---
            if (filterButtons) {
                filterButtons.forEach((button, index) => {
                    if (button) {
                        console.log(`DEBUG: Attaching click listener to filter button ${index}: Role='${button.dataset.role}'`);
                        button.addEventListener('click', handleRoleFilterClick); // Attach original handler
                    } else {
                        console.warn(`Listener not attached: filter button at index ${index} was null`);
                    }
                });
            } else { console.warn("Listener not attached: filterButtons collection is null/empty"); }
            // --- End Reverted Listener Attachment ---

            if (blueColumn) blueColumn.addEventListener('click', handlePickContainerClick); else console.warn("Listener not attached: blueColumn not found");
            if (redColumn) redColumn.addEventListener('click', handlePickContainerClick); else console.warn("Listener not attached: redColumn not found");
            if (returnHomeButton) returnHomeButton.addEventListener('click', () => { console.log("Return Home button clicked"); navigateTo('home'); }); else console.warn("Listener not attached: returnHomeButton not found");

            // Add listeners for editable fields
            [blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl].forEach(el => {
                if (el) {
                    el.addEventListener('blur', (e) => {
                        const permissionNeeded = el.id.includes('name') ? 'editTeamName' : 'editScore';
                        if (!hasPermission(permissionNeeded)) return;
                        e.target.textContent = e.target.textContent.trim();
                    });
                    el.addEventListener('keydown', (e) => {
                        const permissionNeeded = el.id.includes('name') ? 'editTeamName' : 'editScore';
                        if (!hasPermission(permissionNeeded)) return;
                        if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); }
                    });
                } else { console.warn("Listener not attached: An editable H2/Score element was not found"); }
            });
            console.log("Draft page event listeners attached.");

            updateDraftUI(); // Final UI update after setup

            console.log("Draft simulator page initialized successfully for role:", currentUserRole);

        } catch (error) {
            console.error("Error during initializeAppDraft:", error);
            showStatusMessage(`Критическая ошибка инициализации: ${error.message}`, 10000);
            if(loadingIndicator) loadingIndicator.textContent = `Ошибка! ${error.message}`;
            if(mainLayout) mainLayout.classList.add('hidden');
        }

    } // --- End of initializeAppDraft ---


    // --- Role Permission Application ---
    function applyRolePermissions(role) {
        // console.log(`DEBUG: Applying permissions for role: ${role}`); // Reduced logging
        const can = (action, team = null) => hasPermission(action, team);

        // Enable/Disable Buttons based *only* on role permissions (state handled in updateDraftUI)
        if(timerDisplay) timerDisplay.disabled = !can('startDraft');
        if(resetButton) resetButton.disabled = !can('resetDraft');
        if(clearPicksButton) clearPicksButton.disabled = !can('clearDraft');
        if(undoButton) undoButton.disabled = !can('undoAction');
        if(swapButton) swapButton.disabled = !can('swapSides');
        if(toggleTimerButton) toggleTimerButton.disabled = !can('toggleTimerDuration');
        if(confirmPickBanButton) confirmPickBanButton.disabled = !can('confirmAction');
        if(newPriorityFilterButton) newPriorityFilterButton.disabled = !can('togglePriorityFilter');
        if(nextDraftButton) nextDraftButton.disabled = !can('nextDraft');
        if(returnHomeButton) returnHomeButton.disabled = !can('returnHome');

        // Enable/Disable Filters Container based on role
        if(filterButtons) { // Use filterButtons NodeList again
             filterButtons.forEach(btn => {
                 btn.disabled = !can('useRoleFilters');
             });
        }


        // Enable/Disable Editing
        if(blueTeamNameH2) blueTeamNameH2.contentEditable = can('editTeamName');
        if(redTeamNameH2) redTeamNameH2.contentEditable = can('editTeamName');
        if(blueScoreEl) blueScoreEl.contentEditable = can('editScore');
        if(redScoreEl) redScoreEl.contentEditable = can('editScore');

        // Disable Columns based on role (Admin overrides this)
        if (blueColumn) blueColumn.classList.toggle('role-disabled', role === 'team2');
        if (redColumn) redColumn.classList.toggle('role-disabled', role === 'team1');
        if (role === 'admin') {
            if(blueColumn) blueColumn.classList.remove('role-disabled');
            if(redColumn) redColumn.classList.remove('role-disabled');
        }

        updateNicknameEditability();
        // console.log(`DEBUG: Permissions applied for role: ${role}`); // Reduced logging
    }


     // --- Update Nickname Editability based on Role ---
     function updateNicknameEditability() {
         const canEdit = hasPermission('editNicknames');
         document.querySelectorAll('.nickname-input').forEach(input => {
             input.contentEditable = canEdit;
             input.style.cursor = canEdit ? 'text' : 'default';
         });
     }


    // --- Data Fetching (Draft Specific) ---
    async function loadChampionData() {
         try {
             // console.log("Fetching DDragon versions..."); // Reduced logging
             const versionsResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
             if (!versionsResponse.ok) throw new Error(`Версии: ${versionsResponse.statusText}`);
             const versions = await versionsResponse.json();
             ddragonVersion = versions[0];
             // console.log(`Using DDragon version: ${ddragonVersion}`); // Reduced logging
             baseIconUrl = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/`;
             baseSplashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/`;

             // Role map from user's v4.0 file
             const championRolesMap = { 'Aatrox': ['Top'], 'Ahri': ['Mid'], 'Akali': ['Mid', 'Top'], 'Akshan': ['Mid', 'Top'], 'Alistar': ['Support'], 'Amumu': ['Jungle', 'Support'], 'Anivia': ['Mid'], 'Annie': ['Mid', 'Support'], 'Aphelios': ['ADC'], 'Ashe': ['ADC', 'Support'], 'AurelionSol': ['Mid'], 'Azir': ['Mid'], 'Bard': ['Support'], 'Belveth': ['Jungle'], 'Blitzcrank': ['Support'], 'Brand': ['Support', 'Mid', 'Jungle'], 'Braum': ['Support'], 'Briar': ['Jungle'], 'Caitlyn': ['ADC'], 'Camille': ['Top'], 'Cassiopeia': ['Top', 'Mid'], 'Chogath': ['Top', 'Mid'], 'Corki': ['Mid', 'ADC'], 'Darius': ['Top', 'Jungle'], 'Diana': ['Jungle', 'Mid'], 'DrMundo': ['Top', 'Jungle'], 'Draven': ['ADC'], 'Ekko': ['Jungle', 'Mid'], 'Elise': ['Jungle'], 'Evelynn': ['Jungle'], 'Ezreal': ['ADC'], 'Fiddlesticks': ['Jungle'], 'Fiora': ['Top'], 'Fizz': ['Mid'], 'Galio': ['Mid', 'Support'], 'Gangplank': ['Top'], 'Garen': ['Top'], 'Gnar': ['Top'], 'Gragas': ['Jungle', 'Top', 'Mid', 'Support'], 'Graves': ['Jungle'], 'Gwen': ['Top', 'Jungle'], 'Hecarim': ['Jungle'], 'Heimerdinger': ['Top', 'Mid', 'Support'], 'Hwei': ['Mid', 'Support'], 'Illaoi': ['Top'], 'Irelia': ['Top', 'Mid'], 'Ivern': ['Jungle', 'Support'], 'Janna': ['Support'], 'JarvanIV': ['Jungle'], 'Jax': ['Top', 'Jungle'], 'Jayce': ['Top', 'Mid'], 'Jhin': ['ADC'], 'Jinx': ['ADC'], 'Kaisa': ['ADC'], 'Kalista': ['ADC'], 'Karma': ['Support', 'Mid'], 'Karthus': ['Jungle', 'Mid'], 'Kassadin': ['Mid'], 'Katarina': ['Mid'], 'Kayle': ['Top', 'Mid'], 'Kayn': ['Jungle'], 'Kennen': ['Top', 'Mid'], 'Khazix': ['Jungle'], 'Kindred': ['Jungle'], 'Kled': ['Top', 'Mid'], 'KogMaw': ['ADC'], 'KSante': ['Top'], 'Leblanc': ['Mid'], 'LeeSin': ['Jungle'], 'Leona': ['Support'], 'Lillia': ['Jungle'], 'Lissandra': ['Mid'], 'Lucian': ['ADC'], 'Lulu': ['Support'], 'Lux': ['Mid', 'Support'], 'Malphite': ['Top', 'Support', 'Mid'], 'Malzahar': ['Mid'], 'Maokai': ['Jungle', 'Support'], 'MasterYi': ['Jungle'], 'Milio': ['Support'], 'MissFortune': ['ADC'], 'Mordekaiser': ['Top', 'Jungle'], 'Morgana': ['Support', 'Mid', 'Jungle'], 'Naafiri': ['Jungle', 'Mid'], 'Nami': ['Support'], 'Nasus': ['Top'], 'Nautilus': ['Support'], 'Neeko': ['Mid', 'Support'], 'Nidalee': ['Jungle'], 'Nilah': ['ADC'], 'Nocturne': ['Jungle'], 'Nunu': ['Jungle'], 'Olaf': ['Top', 'Jungle'], 'Orianna': ['Mid'], 'Ornn': ['Top'], 'Pantheon': ['Top', 'Mid', 'Support', 'Jungle'], 'Poppy': ['Top', 'Jungle', 'Support'], 'Pyke': ['Support', 'Mid'], 'Qiyana': ['Jungle', 'Mid'], 'Quinn': ['Top', 'Mid'], 'Rakan': ['Support'], 'Rammus': ['Jungle'], 'RekSai': ['Jungle'], 'Rell': ['Support', 'Jungle'], 'Renata': ['Support'], 'Renekton': ['Top'], 'Rengar': ['Jungle', 'Top'], 'Riven': ['Top'], 'Rumble': ['Top', 'Mid', 'Jungle'], 'Ryze': ['Top', 'Mid'], 'Samira': ['ADC'], 'Sejuani': ['Jungle'], 'Senna': ['Support', 'ADC'], 'Seraphine': ['Support', 'Mid', 'ADC'], 'Sett': ['Top', 'Support'], 'Shaco': ['Jungle', 'Support'], 'Shen': ['Top', 'Support'], 'Shyvana': ['Jungle'], 'Singed': ['Top'], 'Sion': ['Top', 'Mid'], 'Sivir': ['ADC'], 'Skarner': ['Jungle', 'Top'], 'Smolder': ['ADC', 'Mid'], 'Sona': ['Support'], 'Soraka': ['Support'], 'Swain': ['Support', 'Mid', 'ADC'], 'Sylas': ['Mid', 'Jungle'], 'Syndra': ['Mid'], 'TahmKench': ['Top', 'Support'], 'Taliyah': ['Jungle', 'Mid'], 'Talon': ['Jungle', 'Mid'], 'Taric': ['Support'], 'Teemo': ['Top'], 'Thresh': ['Support'], 'Tristana': ['ADC', 'Mid'], 'Trundle': ['Top', 'Jungle'], 'Tryndamere': ['Top'], 'TwistedFate': ['Mid', 'ADC'], 'Twitch': ['ADC', 'Jungle'], 'Udyr': ['Jungle', 'Top'], 'Urgot': ['Top'], 'Varus': ['ADC', 'Mid'], 'Vayne': ['ADC', 'Top'], 'Veigar': ['Mid', 'ADC', 'Support'], 'Velkoz': ['Mid', 'Support'], 'Vex': ['Mid'], 'Vi': ['Jungle'], 'Viego': ['Jungle'], 'Viktor': ['Mid'], 'Vladimir': ['Top', 'Mid'], 'Volibear': ['Top', 'Jungle'], 'Warwick': ['Jungle', 'Top'], 'MonkeyKing': ['Top', 'Jungle'], 'Xayah': ['ADC'], 'Xerath': ['Mid', 'Support'], 'XinZhao': ['Jungle'], 'Yasuo': ['Mid', 'Top', 'ADC'], 'Yone': ['Top', 'Mid'], 'Yorick': ['Top', 'Jungle'], 'Yuumi': ['Support'], 'Zac': ['Jungle'], 'Zed': ['Mid', 'Jungle'], 'Zeri': ['ADC'], 'Ziggs': ['Mid', 'ADC', 'Support'], 'Zilean': ['Support', 'Mid'], 'Zoe': ['Mid', 'Support'], 'Zyra': ['Support', 'Jungle', 'Mid'] };
             // priorityChampions defined globally using v4.0 data

             const dataUrlEn = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/champion.json`;
             const dataUrlRu = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ru_RU/champion.json`;
             // console.log("Fetching champion data (EN & RU)..."); // Reduced logging

             const [enResponse, ruResponse] = await Promise.all([
                 fetch(dataUrlEn),
                 fetch(dataUrlRu)
             ]);

             if (!enResponse.ok) throw new Error(`Данные EN: ${enResponse.statusText}`);
             allChampionsData.en = (await enResponse.json()).data;
             // console.log("EN data fetched."); // Reduced logging

             if (!ruResponse.ok) {
                 console.warn(`Не удалось загрузить данные RU: ${ruResponse.statusText}. Используются английские имена.`);
                 allChampionsData.ru = null;
             } else {
                 allChampionsData.ru = (await ruResponse.json()).data;
                 // console.log("RU data fetched."); // Reduced logging
             }

             processedChampions = Object.keys(allChampionsData.en).map(champId => {
                const enData = allChampionsData.en[champId];
                const ruData = allChampionsData.ru ? allChampionsData.ru[champId] : null;
                return {
                    id: enData.id,
                    name: { en: enData.name, ru: ruData ? ruData.name : enData.name },
                    title: { en: enData.title, ru: ruData ? ruData.title : enData.title },
                    roles: championRolesMap[enData.id] || [], // Use restored map
                    iconUrl: `${baseIconUrl}${enData.image.full}`,
                    splashUrl: `${baseSplashUrl}${enData.id}_0.jpg`
                };
             });

             processedChampions.sort((a, b) => a.name.ru.localeCompare(b.name.ru, 'ru'));
             console.log(`Successfully loaded and processed ${processedChampions.length} champions.`);
             return true;

         } catch (error) {
             console.error("Error loading champion data:", error);
             showStatusMessage(`Ошибка загрузки данных чемпионов: ${error.message}`, 5000);
             if(loadingIndicator) loadingIndicator.textContent = `Ошибка загрузки! ${error.message}`;
             if(mainLayout) mainLayout.classList.add('hidden');
             return false;
         }
     }


    // --- Timer Functions (Draft Specific) ---
    function stopTimer() { clearInterval(timerInterval); timerInterval = null; if(timerDisplay) timerDisplay.classList.remove('timer-running', 'timer-ending'); }
    function formatTime(seconds) { const minutes = Math.floor(seconds / 60); const remainingSeconds = seconds % 60; return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`; }
    function resetTimerDisplay() { stopTimer(); timerSeconds = draftTimerDuration; if(timerDisplay) { timerDisplay.textContent = formatTime(timerSeconds); timerDisplay.disabled = !hasPermission('startDraft'); timerDisplay.classList.remove('timer-disabled'); timerDisplay.title = 'Начать драфт'; timerDisplay.setAttribute('aria-label', 'Таймер / Старт драфта'); } }
    function startTimer() {
        console.log("startTimer called");
        if (!hasPermission('startDraft')) { console.log("startTimer: No permission"); return; }
        stopTimer();
        timerSeconds = draftTimerDuration;
        if (!timerDisplay) { console.warn("startTimer: timerDisplay not found"); return; }
        timerDisplay.textContent = formatTime(timerSeconds);
        timerDisplay.disabled = true;
        timerDisplay.classList.add('timer-running', 'timer-disabled');
        timerDisplay.title = 'Драфт идет...';
        timerDisplay.setAttribute('aria-label', `Таймер: ${formatTime(timerSeconds)}`);
        timerInterval = setInterval(() => {
            timerSeconds--;
            if (timerDisplay) {
                timerDisplay.textContent = formatTime(timerSeconds);
                timerDisplay.setAttribute('aria-label', `Таймер: ${formatTime(timerSeconds)}`);
                if (timerSeconds <= 10 && timerSeconds > 0) {
                    timerDisplay.classList.add('timer-ending');
                } else {
                    timerDisplay.classList.remove('timer-ending');
                }
            }
            if (timerSeconds <= 0) {
                stopTimer();
                if(timerDisplay) timerDisplay.classList.add('timer-ending');
                console.log("Timer reached zero!");
                const draftOrder = getDraftOrder();
                if (currentStep < draftOrder.length) {
                    const currentAction = draftOrder[currentStep];
                    // --- MODIFIED TIMER LOGIC ---
                    if (currentAction.type === 'pick') {
                        if (previewedChampion) {
                            // Auto-confirm if a champion was previewed
                            console.log("Timer ended during PICK phase. Auto-confirming:", previewedChampion.id);
                            showStatusMessage(`Время вышло! Авто-подтверждение: ${previewedChampion.name.ru}`, 3000);
                            handleConfirmPickBan(); // Confirm the previewed champion
                        } else {
                            // Clear draft if no champion was previewed
                            console.log("Timer ended during PICK phase. No champion previewed. Clearing current game.");
                            showStatusMessage("Время вышло! Пик не выбран. Драфт очищен.", 3000);
                            resetCurrentGamePicksBans(true, false); // Force clear, including global
                        }
                    } else if (currentAction.type === 'ban') {
                        // Keep original ban logic: skip ban
                        console.log("Timer ended during BAN phase. Skipping ban.");
                        showStatusMessage("Время вышло! Бан пропущен.", 2000);
                        const slotElement = document.getElementById(currentAction.slot);
                        if (slotElement) {
                            restoreSlotPlaceholder(slotElement, currentAction.slot, '');
                        }
                        currentStep++;
                        resetTimerDisplay();
                        updateDraftUI();
                    }
                    // --- END MODIFIED TIMER LOGIC ---
                } else {
                     console.log("Timer ended but draft already complete?");
                }
            }
        }, 1000);
    }


    // --- Draft Logic Functions (Draft Specific - with permission checks added) ---
     function createChampionCard(champ) {
        const card = document.createElement('button');
        card.className = 'champion-card';
        card.dataset.championId = champ.id;
        card.dataset.championNameEn = champ.name.en.toLowerCase();
        card.dataset.championNameRu = champ.name.ru.toLowerCase();
        card.dataset.roles = champ.roles.join(','); // Roles added here
        card.setAttribute('role', 'gridcell');
        card.setAttribute('aria-label', champ.name.ru);

        const img = document.createElement('img');
        img.src = champ.iconUrl;
        img.alt = ""; // Decorative image
        img.className = 'w-full h-full object-cover block pointer-events-none';
        img.loading = 'lazy';
        img.onerror = () => { img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%234a5568'/%3E%3C/svg%3E`; card.setAttribute('aria-label', `${champ.name.ru} (ошибка загрузки)`); };

        card.appendChild(img);

        // Add click listener for preview (check permission inside handler)
        card.addEventListener('click', () => handleChampionPreview(champ));

        card.addEventListener('mouseover', (event) => showChampionTooltip(event, champ));
        card.addEventListener('mouseout', hideChampionTooltip);
        card.addEventListener('focus', (event) => showChampionTooltip(event, champ));
        card.addEventListener('blur', hideChampionTooltip);
        return card;
    }

    function displayChampions() { if(!championGridElement) { console.error("displayChampions: championGridElement not found"); return; } const fragment = document.createDocumentFragment(); processedChampions.forEach(champ => { fragment.appendChild(createChampionCard(champ)); }); championGridElement.innerHTML = ''; championGridElement.appendChild(fragment); filterChampions(); }

    function updateDraftUI() {
        // console.log("DEBUG: updateDraftUI called. Role:", currentUserRole, "Side:", userTeamSide, "Step:", currentStep, "Started:", isDraftStarted); // Verbose Log
        if (!isDraftInitialized) return;
        document.querySelectorAll('.pick-slot, .ban-slot').forEach(el => { el.classList.remove('highlight-action', 'preview-flash', 'swap-selected'); });

        applyRolePermissions(currentUserRole); // Apply base role permissions first

        const draftOrder = getDraftOrder();
        let currentActionTeam = null;
        if (currentStep < draftOrder.length) {
            currentActionTeam = draftOrder[currentStep].team;
        }
        // console.log(`DEBUG: updateDraftUI - currentActionTeam: ${currentActionTeam}`); // Verbose Log

        const canConfirm = hasPermission('confirmAction', currentActionTeam);
        if(confirmPickBanButton) confirmPickBanButton.disabled = !canConfirm || !previewedChampion || !isDraftStarted || isDraftComplete;

        const canUndo = hasPermission('undoAction', draftHistory[draftHistory.length - 1]?.team);
        if(undoButton) undoButton.disabled = !canUndo || draftHistory.length === 0 || !isDraftStarted;

        const canStart = hasPermission('startDraft');
        const canClear = hasPermission('clearDraft');
        const canReset = hasPermission('resetDraft');
        const canSwap = hasPermission('swapSides');
        const canToggleTimer = hasPermission('toggleTimerDuration');
        const canTogglePriority = hasPermission('togglePriorityFilter');
        const canNext = hasPermission('nextDraft');

        if (!isDraftStarted) {
            resetTimerDisplay();
            if(blueColumn) blueColumn.classList.add('draft-disabled');
            if(redColumn) redColumn.classList.add('draft-disabled');
            if(nextDraftButton) nextDraftButton.disabled = !canNext || true;
            if(swapButton) swapButton.disabled = !canSwap;
            if(clearPicksButton) clearPicksButton.disabled = !canClear || (draftHistory.length === 0 && Object.keys(pickNicknames).length === 0 && selectedChampions.size === 0 && globalBanHistory.length === 0);
            if(toggleTimerButton) toggleTimerButton.disabled = !canToggleTimer;
            if(newPriorityFilterButton) newPriorityFilterButton.disabled = !canTogglePriority;
            if(resetButton) resetButton.disabled = !canReset;
            if(timerDisplay) timerDisplay.disabled = !canStart;
            if (championGridElement) championGridElement.style.pointerEvents = 'none'; // Grid inactive before start
        } else if (currentStep < draftOrder.length) {
            isDraftComplete = false;
            const action = draftOrder[currentStep];
            const activeSlot = document.getElementById(action.slot);
            // currentActionTeam is already defined above

            if (activeSlot) {
                if (currentUserRole === 'admin' || currentUserRole === 'judge' || userTeamSide === currentActionTeam) {
                     activeSlot.classList.add('highlight-action');
                }
                const isConfirmed = draftHistory.some(entry => entry.slotId === action.slot);
                if (!isConfirmed) {
                    const currentNickname = pickNicknames[action.slot] || '';
                    if (!activeSlot.classList.contains('preview-flash')) {
                        restoreSlotPlaceholder(activeSlot, action.slot, currentNickname);
                    }
                }
            }
            // Start timer only if it's not already running and user has permission (judge/admin)
            // Teams don't start the timer, they just react to it
            if (!timerInterval && hasPermission('startDraft')) {
                 startTimer();
            }
            if(nextDraftButton) nextDraftButton.disabled = true;
            if(timerDisplay) timerDisplay.disabled = true; // Timer running or user is team
            if(swapButton) swapButton.disabled = true;
            if(toggleTimerButton) toggleTimerButton.disabled = true;
            if(newPriorityFilterButton) newPriorityFilterButton.disabled = true; // Disable during active draft phase
            if(clearPicksButton) clearPicksButton.disabled = !canClear;
            if(resetButton) resetButton.disabled = !canReset;

            // **Crucial:** Enable/Disable grid based on turn and role
            const isGridInteractive = (currentUserRole === 'admin' || userTeamSide === currentActionTeam);
            // console.log(`DEBUG: updateDraftUI - Grid Interaction Check: isAdmin=${currentUserRole === 'admin'}, isMyTurn=${userTeamSide === currentActionTeam} -> ${isGridInteractive}`); // Verbose Log
            if (championGridElement) {
                championGridElement.style.pointerEvents = isGridInteractive ? 'auto' : 'none';
            }

        } else { // Draft Complete
            isDraftComplete = true;
            stopTimer();
            if(timerDisplay) {
                timerDisplay.textContent = "Драфт Завершен!";
                timerDisplay.classList.add('timer-disabled');
                timerDisplay.disabled = true;
                timerDisplay.title = 'Драфт завершен';
            }
            if(blueColumn) blueColumn.classList.remove('draft-disabled');
            if(redColumn) redColumn.classList.remove('draft-disabled');
            if(nextDraftButton) nextDraftButton.disabled = !canNext;
            if(swapButton) swapButton.disabled = !canSwap;
            if(clearPicksButton) clearPicksButton.disabled = !canClear;
            if(toggleTimerButton) toggleTimerButton.disabled = true;
            if(newPriorityFilterButton) newPriorityFilterButton.disabled = !canTogglePriority; // Re-enable based on permission after draft
            if(resetButton) resetButton.disabled = !canReset;
            if (championGridElement) championGridElement.style.pointerEvents = 'none'; // Grid inactive after draft
        }

        updateChampionAvailability();
        displayGloballyBanned();
        document.querySelectorAll('.pick-slot').forEach(slot => {
            const champId = getSlotChampionId(slot.id);
            slot.style.cursor = isDraftComplete && champId && can('swapSides') ? 'pointer' : 'default';
            slot.title = isDraftComplete && champId && can('swapSides') ? 'Нажмите для выбора обмена' : '';
        });
         updateNicknameEditability();
         // console.log("DEBUG: updateDraftUI finished.");
    }
    function updateChampionAvailability() { if (!isDraftInitialized) return; const combinedDisabled = new Set([...selectedChampions, ...globallyDisabledChampions]); document.querySelectorAll('.champion-card').forEach(card => { const champId = card.dataset.championId; const isDisabled = combinedDisabled.has(champId); const isSelected = selectedChampions.has(champId); card.classList.toggle('selected', isSelected); card.classList.toggle('disabled', isDisabled); card.disabled = isDisabled; card.setAttribute('aria-disabled', isDisabled.toString()); }); }
    function handleChampionPreview(champion) {
        // console.log("handleChampionPreview called for:", champion.id); // Reduced logging
        if (!isDraftStarted || isDraftComplete) { console.log("Preview denied: Draft not started or complete."); return; }
        const draftOrder = getDraftOrder();
        if (currentStep >= draftOrder.length) { console.log("Preview denied: Draft step out of bounds."); return; }

        const currentAction = draftOrder[currentStep];
        if (currentUserRole !== 'admin' && userTeamSide !== currentAction.team) {
            console.log(`Preview denied: Not turn for role ${currentUserRole} (side ${userTeamSide}) on team ${currentAction.team}'s action.`);
            return;
        }
         const permissionNeeded = currentAction.type === 'pick' ? 'pickChampion' : 'banChampion';
         if (!hasPermission(permissionNeeded, currentAction.team)) { console.log(`Preview denied: No permission for ${permissionNeeded}.`); return; }

        const isDisabled = selectedChampions.has(champion.id) || globallyDisabledChampions.has(champion.id);
        if (isDisabled) { showStatusMessage(`${champion.name.ru} уже выбран или заблокирован.`, 2000); console.log(`Preview denied: Champion ${champion.id} disabled.`); return; }

        const slotElement = document.getElementById(currentAction.slot);
        if (slotElement) {
            // console.log(`Previewing ${champion.id} in slot ${currentAction.slot}`); // Reduced logging
            document.querySelectorAll('.preview-flash').forEach(el => el.classList.remove('preview-flash'));
            previewedChampion = champion;
            const existingNickname = pickNicknames[currentAction.slot] || '';
            fillSlot(slotElement, champion, currentAction.type, existingNickname);
            slotElement.classList.add('preview-flash');
            if(confirmPickBanButton) confirmPickBanButton.disabled = !hasPermission('confirmAction', currentAction.team);
        } else { console.warn(`Preview failed: Slot element ${currentAction.slot} not found.`); }
     }
    function handleConfirmPickBan() {
        console.log("handleConfirmPickBan called");
        if (!previewedChampion || !isDraftStarted || isDraftComplete) { console.log("Confirm denied: No preview, draft not started, or complete."); return; }
        const draftOrder = getDraftOrder();
         if (currentStep >= draftOrder.length) { console.log("Confirm denied: Draft step out of bounds."); return; }

        const currentAction = draftOrder[currentStep];
         if ((currentUserRole !== 'admin' && userTeamSide !== currentAction.team) || !hasPermission('confirmAction', currentAction.team)) {
             console.log(`Confirm denied: Not turn or no permission for role ${currentUserRole} on team ${currentAction.team}'s action.`);
             return;
         }

        const championToConfirm = previewedChampion;
        const slotElement = document.getElementById(currentAction.slot);
        const isDisabled = selectedChampions.has(championToConfirm.id) || globallyDisabledChampions.has(championToConfirm.id);

        if (!slotElement || isDisabled) { console.warn("Confirmation failed: Slot not found or champion unavailable."); previewedChampion = null; if(confirmPickBanButton) confirmPickBanButton.disabled = true; if (slotElement) slotElement.classList.remove('preview-flash'); return; }

        console.log(`Confirming ${championToConfirm.id} for slot ${currentAction.slot}`);
        slotElement.classList.remove('preview-flash');
        const previousNickname = pickNicknames[currentAction.slot] || '';
        selectedChampions.add(championToConfirm.id);
        draftHistory.push({ championId: championToConfirm.id, slotId: currentAction.slot, step: currentStep, previousNickname: previousNickname, type: currentAction.type, team: currentAction.team });
        currentStep++;
        previewedChampion = null;
        resetTimerDisplay();
        updateDraftUI();
        filterChampions();
    }
    function fillSlot(slotElement, champion, type, nicknameText = '') { if (!slotElement || !champion) return; slotElement.innerHTML = ''; slotElement.classList.remove('preview-flash'); const img = document.createElement('img'); img.src = type === 'pick' ? champion.splashUrl : champion.iconUrl; img.alt = champion.name.ru; img.className = 'w-full h-full object-cover block absolute inset-0 z-0 pointer-events-none'; img.onerror = () => { const errorSpan = document.createElement('span'); errorSpan.className = 'text-[1.5vmin] text-red-400'; errorSpan.textContent = 'Err'; slotElement.innerHTML = ''; slotElement.appendChild(errorSpan); if (type === 'pick') { addNicknameInput(slotElement, nicknameText); } }; slotElement.appendChild(img); if (type === 'pick') { addNicknameInput(slotElement, nicknameText); slotElement.dataset.championId = champion.id; } else { delete slotElement.dataset.championId; } slotElement.setAttribute('aria-label', `${slotElement.ariaLabel.split(':')[0]}: ${champion.name.ru}`); }
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
             nicknameInput.addEventListener('input', (e) => {
                 const slotId = e.target.dataset.slotId;
                 if (slotId) { pickNicknames[slotId] = e.target.textContent.trim(); /*console.log("Nickname updated:", pickNicknames);*/ } // Reduced logging
             });
             nicknameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } });
         }
         slotElement.appendChild(nicknameInput);
     }
    function restoreSlotPlaceholder(slotElement, slotId, nicknameText = '') { if (!slotElement) return; slotElement.innerHTML = ''; slotElement.classList.remove('preview-flash', 'swap-selected', 'highlight-action'); delete slotElement.dataset.championId; slotElement.style.backgroundImage = ''; slotElement.style.cursor = 'default'; slotElement.title = ''; slotElement.setAttribute('aria-label', `${slotElement.ariaLabel.split(':')[0]}: Empty`); if (slotId && slotId.includes('-pick-')) { addNicknameInput(slotElement, nicknameText); pickNicknames[slotId] = nicknameText; } else { delete pickNicknames[slotId]; } }
    function getSlotChampionId(slotId) { const slotElement = document.getElementById(slotId); return slotElement ? slotElement.dataset.championId : null; }
    function handleUndo() {
         console.log("handleUndo called");
         if (draftHistory.length === 0 || !isDraftStarted) { console.log("Undo denied: No history or draft not started."); return; }
         const lastAction = draftHistory[draftHistory.length - 1];

         if (!hasPermission('undoAction', lastAction.team)) {
             console.log(`Undo denied: No permission for role ${currentUserRole} on team ${lastAction.team}'s action.`);
             showStatusMessage("Нет прав для отмены этого действия.", 2000);
             return;
         }

         deselectSwapSlots();
         draftHistory.pop();
         if (!lastAction) return;
         console.log("Undoing action:", lastAction);
         currentStep = lastAction.step;
         selectedChampions.delete(lastAction.championId);
         const slotElement = document.getElementById(lastAction.slotId);
         if (slotElement) {
             restoreSlotPlaceholder(slotElement, lastAction.slotId, lastAction.previousNickname);
         }
         isDraftComplete = false;
         previewedChampion = null;
         resetTimerDisplay();
         updateDraftUI();
         filterChampions();
         showStatusMessage("Действие отменено", 1500);
    }

    // --- Reset Functions (Draft Specific - with permission checks) ---
    function resetDraftFull(force = false) {
        console.log("resetDraftFull called, force:", force);
        if (!hasPermission('resetDraft')) {
             showStatusMessage("Нет прав для сброса драфта.", 2000);
             return;
        }
        if (!force && !confirm("Вы уверены, что хотите полностью сбросить драфт (включая глобальные баны)?")) {
            console.log("Full reset cancelled by user.");
            return;
        }
        console.log("resetDraftFull proceeding...");

        currentStep = 0; selectedChampions.clear(); draftHistory = []; pickNicknames = {}; globallyDisabledChampions.clear(); globalBanHistory = []; isDraftComplete = false; isDraftStarted = false; previewedChampion = null; deselectSwapSlots(); stopTimer(); draftTimerDuration = 30; resetTimerDisplay();
        document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => { restoreSlotPlaceholder(slot, slot.id, ''); slot.classList.remove('highlight-action', 'preview-flash'); });
        if (blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem('lobbyTeam1Name') || 'Синяя Команда';
        if (redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem('lobbyTeam2Name') || 'Красная Команда';
        if (blueScoreEl) blueScoreEl.textContent = ''; if (redScoreEl) redScoreEl.textContent = '';
        if(blueColumn) blueColumn.classList.add('draft-disabled'); if(redColumn) redColumn.classList.add('draft-disabled');
        if(championSearch) championSearch.value = ''; currentRoleFilter = 'All'; if(filterButtons) { filterButtons.forEach(btn => btn.classList.remove('active')); filterButtons[0]?.classList.add('active'); }
        isPriorityFilterActive = false;
        if (newPriorityFilterButton) {
            newPriorityFilterButton.setAttribute('aria-pressed', 'false');
            newPriorityFilterButton.title = 'Показать только приоритетных чемпионов';
            // No need to reset innerHTML as it's icon only now
        }
        displayGloballyBanned(); updateChampionAvailability(); filterChampions(); updateDraftUI();
        showStatusMessage("Драфт полностью сброшен.", 2000);
    }

    function resetCurrentGamePicksBans(force = false, keepGlobal = false) {
         console.log("resetCurrentGamePicksBans called, force:", force, "keepGlobal:", keepGlobal);
         if (!hasPermission('clearDraft')) {
             showStatusMessage("Нет прав для очистки драфта.", 2000);
             return;
         }
        if (!force && isDraftStarted && !isDraftComplete) {
            if (!confirm("Остановить текущий драфт и очистить пики/баны этой игры" + (keepGlobal ? "?" : " (включая глобальные)?"))) {
                console.log("resetCurrentGamePicksBans cancelled by user during draft.");
                return;
            }
        }
        console.log("resetCurrentGamePicksBans proceeding...");

        currentStep = 0;
        selectedChampions.clear(); // Clear current selections
        draftHistory = [];
        if (!keepGlobal) {
            globallyDisabledChampions.clear();
            globalBanHistory = [];
            console.log("Global bans cleared.");
        } else {
             console.log("Keeping global bans for next draft.");
             // Re-populate selectedChampions with global bans if keeping them
             globallyDisabledChampions.forEach(champId => selectedChampions.add(champId));
        }

        isDraftComplete = false; isDraftStarted = false; previewedChampion = null; deselectSwapSlots(); stopTimer(); resetTimerDisplay();
        document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => {
            const currentNickname = pickNicknames[slot.id] || '';
            restoreSlotPlaceholder(slot, slot.id, currentNickname);
            slot.classList.remove('highlight-action', 'preview-flash');
        });
        if(blueColumn) blueColumn.classList.add('draft-disabled');
        if(redColumn) redColumn.classList.add('draft-disabled');
        displayGloballyBanned();
        updateChampionAvailability(); // Update availability based on (potentially kept) global bans
        filterChampions();
        updateDraftUI();
        showStatusMessage(keepGlobal ? "Текущая игра очищена." : "Пики/баны текущей игры (включая глобальные) очищены.", 2000);
    }


    // --- Other Handlers (Draft Specific - with permission checks) ---
    function handleStartDraft() {
        console.log("handleStartDraft called");
        if (!hasPermission('startDraft')) { console.log("Start denied: No permission."); return; }
        if (!isDraftStarted) { console.log("Starting draft..."); isDraftStarted = true; if(blueColumn) blueColumn.classList.remove('draft-disabled'); if(redColumn) redColumn.classList.remove('draft-disabled'); updateDraftUI(); }
        else { console.log("Start denied: Draft already started."); }
     }
    const debouncedFilter = debounce(() => { filterChampions(); }, 250);

    // Filter logic using restored data - NO CHANGES NEEDED HERE
    function filterChampions() {
        if (!isDraftInitialized || !championSearch || !championGridElement) return;
        const searchTerm = championSearch.value.toLowerCase().trim();
        let visibleCount = 0;
        // console.log(`DEBUG: filterChampions called. currentRoleFilter='${currentRoleFilter}', isPriorityFilterActive=${isPriorityFilterActive}`); // DEBUG - Removed

        championGridElement.querySelectorAll('.champion-card').forEach(card => {
            const champId = card.dataset.championId;
            const nameEn = card.dataset.championNameEn || '';
            const nameRu = card.dataset.championNameRu || '';
            const champRoles = card.dataset.roles ? card.dataset.roles.split(',') : []; // Get roles from dataset

            const searchMatch = nameEn.includes(searchTerm) || nameRu.includes(searchTerm) || champId.toLowerCase().includes(searchTerm);
            // Corrected roleMatch check
            const roleMatch = currentRoleFilter === 'All' || (champRoles.length > 0 && champRoles.includes(currentRoleFilter));
            const isPriority = priorityChampions.has(champId); // Uses restored priority list
            const hideByPriorityFilter = isPriorityFilterActive && !isPriority; // Logic remains the same

            const isVisible = searchMatch && roleMatch && !hideByPriorityFilter;

            card.style.display = isVisible ? 'flex' : 'none';
            if (isVisible) visibleCount++;

            const isDisabled = selectedChampions.has(champId) || globallyDisabledChampions.has(champId);
            card.classList.toggle('disabled', isDisabled);
            card.disabled = isDisabled;
            card.setAttribute('aria-disabled', isDisabled.toString());
            card.classList.toggle('selected', selectedChampions.has(champId));
        });
        // console.log(`DEBUG: filterChampions finished. Visible count: ${visibleCount}`); // DEBUG - Removed
    }

    function deselectSwapSlots() { if (selectedSwapSlotId) { const prevSelected = document.getElementById(selectedSwapSlotId); if (prevSelected) { prevSelected.classList.remove('swap-selected'); } selectedSwapSlotId = null; } }
    function handlePickContainerClick(event) {
         // console.log("handlePickContainerClick called on:", event.target); // Reduced logging
         if (event.target.classList.contains('nickname-input')) { return; }
         if (!hasPermission('swapSides')) { console.log("Pick container click denied: No swap permission."); return; }
         const clickedSlot = event.target.closest('.pick-slot');
         if (!isDraftComplete || !clickedSlot || !clickedSlot.dataset.championId) { /*console.log("Pick container click ignored: Draft not complete or empty slot.");*/ deselectSwapSlots(); return; } // Reduced logging

         const clickedSlotId = clickedSlot.id;
         // console.log("Clicked slot:", clickedSlotId); // Reduced logging
         if (!selectedSwapSlotId) {
             selectedSwapSlotId = clickedSlotId;
             clickedSlot.classList.add('swap-selected');
             console.log("Swap select:", selectedSwapSlotId);
         } else {
             if (selectedSwapSlotId === clickedSlotId) {
                 deselectSwapSlots();
                 console.log("Swap deselect");
             } else {
                 const firstSlot = document.getElementById(selectedSwapSlotId);
                 if (!firstSlot) { console.warn("Swap failed: First slot not found."); deselectSwapSlots(); return; }
                 const team1 = selectedSwapSlotId.startsWith('blue') ? 'blue' : 'red';
                 const team2 = clickedSlotId.startsWith('blue') ? 'blue' : 'red';
                 if (team1 === team2) {
                     console.log("Attempting swap between:", selectedSwapSlotId, clickedSlotId);
                     const champId1 = firstSlot.dataset.championId;
                     const champId2 = clickedSlot.dataset.championId;
                     const champ1 = getChampionById(champId1);
                     const champ2 = getChampionById(champId2);
                     const nick1 = pickNicknames[selectedSwapSlotId] || '';
                     const nick2 = pickNicknames[clickedSlotId] || '';
                     // Swap nicknames in the state *before* updating UI
                     pickNicknames[selectedSwapSlotId] = nick2;
                     pickNicknames[clickedSlotId] = nick1;
                     if (champ1 && champ2) {
                         // Pass the correct swapped nicknames to fillSlot
                         fillSlot(firstSlot, champ2, 'pick', nick2);
                         fillSlot(clickedSlot, champ1, 'pick', nick1);
                         showStatusMessage(`Обмен: ${champ1.name.ru} <-> ${champ2.name.ru}`, 2000);
                     } else { console.warn("Swap failed: Champion data missing."); }
                     deselectSwapSlots();
                 } else {
                     console.log("Swap select (different team):", clickedSlotId);
                     deselectSwapSlots();
                     selectedSwapSlotId = clickedSlotId;
                     clickedSlot.classList.add('swap-selected');
                 }
             }
         }
     }

    // Swap Nickname Logic (Removed debugging logs)
    function handleSwapTeams() {
         console.log("handleSwapTeams called");
         if (!hasPermission('swapSides')) {
             showStatusMessage("Нет прав для смены сторон.", 2000);
             return;
         }
         try {
             // Swap Team Names and Scores
             const tempName = blueTeamNameH2.textContent; blueTeamNameH2.textContent = redTeamNameH2.textContent; redTeamNameH2.textContent = tempName;
             const tempScore = blueScoreEl.textContent; blueScoreEl.textContent = redScoreEl.textContent; redScoreEl.textContent = tempScore;
             const storedName1 = localStorage.getItem('lobbyTeam1Name');
             const storedName2 = localStorage.getItem('lobbyTeam2Name');
             localStorage.setItem('lobbyTeam1Name', storedName2 || 'Красная Команда');
             localStorage.setItem('lobbyTeam2Name', storedName1 || 'Синяя Команда');

             // Swap Global Bans Team Association
             console.log("Swapping global ban history teams...");
             globalBanHistory.forEach(ban => { ban.team = ban.team === 'blue' ? 'red' : 'blue'; });
             displayGloballyBanned(); // Update display after swapping team association

             // Swap Picks/Bans only if draft is complete or not started
             if (isDraftComplete || !isDraftStarted) {
                 console.log("Swapping picks/bans/nicknames...");
                 const newPickNicknames = {}; // Object to store swapped nicknames
                 const newSelectedChampions = new Set();
                 const newBluePicks = []; const newRedPicks = [];
                 const newBlueBans = []; const newRedBans = [];
                 const currentBlueBans = []; const currentRedBans = [];

                 // Collect current state before clearing
                 for(let i=1; i<=5; i++) {
                     // Collect Bans
                     const blueBanSlotId = `blue-ban-${i}`;
                     const redBanSlotId = `red-ban-${i}`;
                     const blueBanChampId = draftHistory.find(a => a.slotId === blueBanSlotId)?.championId;
                     const redBanChampId = draftHistory.find(a => a.slotId === redBanSlotId)?.championId;
                     if(blueBanChampId) currentBlueBans.push(blueBanChampId);
                     if(redBanChampId) currentRedBans.push(redBanChampId);

                     // Collect Picks and Nicknames
                     const bluePickSlotId = `blue-pick-${i}`;
                     const redPickSlotId = `red-pick-${i}`;
                     const blueChampId = getSlotChampionId(bluePickSlotId);
                     const redChampId = getSlotChampionId(redPickSlotId);
                     const blueNick = pickNicknames[bluePickSlotId] || '';
                     const redNick = pickNicknames[redPickSlotId] || '';

                     // Prepare swapped pick data (including nicknames)
                     if(redChampId) newBluePicks.push({ slotId: bluePickSlotId, champId: redChampId, nick: redNick });
                     if(blueChampId) newRedPicks.push({ slotId: redPickSlotId, champId: blueChampId, nick: blueNick });

                     // Populate the swapped nicknames object
                     newPickNicknames[bluePickSlotId] = redNick; // Blue slot gets red nick
                     newPickNicknames[redPickSlotId] = blueNick; // Red slot gets blue nick
                 }

                 // Prepare swapped ban data
                 currentRedBans.forEach((champId, index) => { if(champId) newBlueBans.push({ slotId: `blue-ban-${index+1}`, championId: champId }); });
                 currentBlueBans.forEach((champId, index) => { if(champId) newRedBans.push({ slotId: `red-ban-${index+1}`, championId: champId }); });

                 // *** FIX: Update the global pickNicknames object BEFORE clearing slots ***
                 pickNicknames = newPickNicknames;

                 // Clear all slots visually (restoreSlotPlaceholder uses the *updated* pickNicknames now)
                 document.querySelectorAll('.pick-slot, .ban-slot').forEach(slot => {
                     restoreSlotPlaceholder(slot, slot.id, pickNicknames[slot.id] || ''); // Pass current (swapped) nick
                 });

                 // Re-fill slots with swapped data (fillSlot will use the passed nickname)
                 newBlueBans.forEach(b => { const champ = getChampionById(b.championId); if(champ) fillSlot(document.getElementById(b.slotId), champ, 'ban'); if(b.championId) newSelectedChampions.add(b.championId); });
                 newRedBans.forEach(b => { const champ = getChampionById(b.championId); if(champ) fillSlot(document.getElementById(b.slotId), champ, 'ban'); if(b.championId) newSelectedChampions.add(b.championId); });
                 newBluePicks.forEach(p => { const champ = getChampionById(p.champId); if(champ) fillSlot(document.getElementById(p.slotId), champ, 'pick', p.nick); if(p.champId) newSelectedChampions.add(p.champId); });
                 newRedPicks.forEach(p => { const champ = getChampionById(p.champId); if(champ) fillSlot(document.getElementById(p.slotId), champ, 'pick', p.nick); if(p.champId) newSelectedChampions.add(p.champId); });

                 selectedChampions = newSelectedChampions; // Update the main selected set
                 deselectSwapSlots();
                 showStatusMessage("Команды поменялись местами (пики/баны/ники/глоб. баны).", 2000);
             } else {
                 console.warn("Attempted to swap teams during an active draft. Only names/scores/global bans swapped.");
                 showStatusMessage("Нельзя менять пики/баны во время драфта. Сменены только имена/счет/глоб. баны.", 3000);
             }
             updateChampionAvailability();
             updateDraftUI(); // Refresh UI after swap
         } catch (error) { console.error("Error in handleSwapTeams:", error); showStatusMessage("Ошибка при смене команд.", 3000); }
     }
    function handleToggleTimer() {
         console.log("handleToggleTimer called");
         if (!hasPermission('toggleTimerDuration')) { showStatusMessage("Нет прав для смены таймера.", 2000); return; }
         if (isDraftStarted) { console.log("Toggle timer denied: Draft started."); return; }
         draftTimerDuration = draftTimerDuration === 30 ? 45 : 30; resetTimerDisplay(); toggleTimerButton.title = `Сменить время таймера (${draftTimerDuration === 30 ? '-> 45с' : '-> 30с'})`; showStatusMessage(`Время таймера: ${draftTimerDuration} сек.`, 1500); console.log("Timer duration set to:", draftTimerDuration);
     }

    // --- Reverted: Role Filter Handler using individual listeners ---
    function handleRoleFilterClick(event) {
         console.log("--- handleRoleFilterClick (Individual Listener) ---");
         const clickedButton = event.currentTarget; // Use currentTarget for individual listeners

         if (!clickedButton) {
             console.error("Clicked button not found in handleRoleFilterClick");
             return;
         }

         // Prevent acting if the button is disabled
         if (clickedButton.disabled) {
             console.log("Clicked button is disabled.");
             return;
         }

         console.log("Button clicked:", clickedButton);
         const role = clickedButton.dataset.role;
         console.log("Role from dataset:", role);

         if (!role) {
             console.error("Clicked button is missing data-role attribute.");
             return;
         }

         if (!hasPermission('useRoleFilters')) {
            console.log("Role filter denied: No permission.");
            return;
         }

         currentRoleFilter = role; // Updates state
         console.log("currentRoleFilter set to:", currentRoleFilter);

         // Update active class on buttons
         if (filterButtons) { // Use the global NodeList
             filterButtons.forEach(btn => {
                 btn.classList.remove('active');
             });
             clickedButton.classList.add('active');
         } else {
             console.warn("filterButtons NodeList not found for updating active class.");
         }

         filterChampions(); // Calls filter function
     }

    // --- New Priority Filter Handler ---
    function handleNewPriorityFilterToggle() {
        // console.log("--- handleNewPriorityFilterToggle ---"); // DEBUG log
        if (!hasPermission('togglePriorityFilter')) {
            console.log("Priority filter toggle denied: No permission.");
            showStatusMessage("Нет прав для переключения приоритета.", 2000);
            return;
        }

        isPriorityFilterActive = !isPriorityFilterActive; // Toggle the state

        if (newPriorityFilterButton) {
            newPriorityFilterButton.setAttribute('aria-pressed', isPriorityFilterActive.toString());
            // Update title for better accessibility/user feedback
            if (isPriorityFilterActive) {
                newPriorityFilterButton.title = 'Показать всех чемпионов';
                // Optional: Change button text (REMOVED as per request)
                // newPriorityFilterButton.innerHTML = '⭐ Все';
            } else {
                newPriorityFilterButton.title = 'Показать только приоритетных чемпионов';
                // Optional: Change button text back (REMOVED as per request)
                // newPriorityFilterButton.innerHTML = '⭐ Приоритет';
            }
        }

        console.log('Priority filter active state toggled to:', isPriorityFilterActive);
        filterChampions(); // Apply the filter change
        showStatusMessage(isPriorityFilterActive ? "Показаны только приоритетные чемпионы." : "Показаны все чемпионы.", 2000);
    }


    function displayGloballyBanned() { if (!globalBansBlueContainer || !globalBansRedContainer || !globallyBannedDisplay) return; globalBansBlueContainer.innerHTML = ''; globalBansRedContainer.innerHTML = ''; if (globalBanHistory.length > 0) { globallyBannedDisplay.classList.remove('hidden'); const blueFragment = document.createDocumentFragment(); const redFragment = document.createDocumentFragment(); globalBanHistory.forEach(banInfo => { const champ = getChampionById(banInfo.championId); if (champ) { const iconDiv = document.createElement('div'); iconDiv.className = 'global-ban-icon'; const banTeamText = banInfo.team === 'blue' ? 'синими' : 'красными'; iconDiv.title = `${champ.name.ru} (Заблокирован ${banTeamText} в пред. игре)`; iconDiv.setAttribute('aria-label', iconDiv.title); const img = document.createElement('img'); img.src = champ.iconUrl; img.alt = ""; img.loading = 'lazy'; img.onerror = () => { img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%234a5568'/%3E%3C/svg%3E`; }; iconDiv.appendChild(img); if (banInfo.team === 'blue') { blueFragment.appendChild(iconDiv); } else { redFragment.appendChild(iconDiv); } } }); globalBansBlueContainer.appendChild(blueFragment); globalBansRedContainer.appendChild(redFragment); } else { globallyBannedDisplay.classList.add('hidden'); } }
    function handleNextDraft() {
         console.log("handleNextDraft called");
         if (!hasPermission('nextDraft')) { showStatusMessage("Нет прав для перехода к следующему драфту.", 2000); return; }
        if (!isDraftComplete) { console.warn("handleNextDraft: Draft not complete."); showStatusMessage("Драфт не завершен. Завершите его перед переходом к следующему.", 3000); return; }
        let addedBansCount = 0;
        // Add only *picks* from the completed draft history to global bans
        draftHistory.forEach(action => {
            if (action.type === 'pick' && !globallyDisabledChampions.has(action.championId)) {
                globalBanHistory.push({ championId: action.championId, team: action.team });
                globallyDisabledChampions.add(action.championId);
                addedBansCount++;
            }
        });
        console.log(`handleNextDraft: Added ${addedBansCount} champions to global bans.`);
        resetCurrentGamePicksBans(false, true); // Keep global bans
        showStatusMessage("Переход к следующему драфту. Пики предыдущей игры заблокированы.", 2500);
    }

    // --- Draft Order Definition ---
    function getDraftOrder() {
        return [
            { team: 'blue', type: 'ban', slot: 'blue-ban-1' }, { team: 'red', type: 'ban', slot: 'red-ban-1' },
            { team: 'blue', type: 'ban', slot: 'blue-ban-2' }, { team: 'red', type: 'ban', slot: 'red-ban-2' },
            { team: 'blue', type: 'ban', slot: 'blue-ban-3' }, { team: 'red', type: 'ban', slot: 'red-ban-3' },
            { team: 'blue', type: 'pick', slot: 'blue-pick-1' }, { team: 'red', type: 'pick', slot: 'red-pick-1' },
            { team: 'red', type: 'pick', slot: 'red-pick-2' }, { team: 'blue', type: 'pick', slot: 'blue-pick-2' },
            { team: 'blue', type: 'pick', slot: 'blue-pick-3' }, { team: 'red', type: 'pick', slot: 'red-pick-3' },
            { team: 'red', type: 'ban', slot: 'red-ban-4' }, { team: 'blue', type: 'ban', slot: 'blue-ban-4' },
            { team: 'red', type: 'ban', slot: 'red-ban-5' }, { team: 'blue', type: 'ban', slot: 'blue-ban-5' },
            { team: 'red', type: 'pick', slot: 'red-pick-4' }, { team: 'blue', type: 'pick', slot: 'blue-pick-4' },
            { team: 'blue', type: 'pick', slot: 'blue-pick-5' }, { team: 'red', type: 'pick', slot: 'red-pick-5' },
        ];
    }


    // --- Tooltip Functions (Draft Specific) ---
    let tooltipTimeout;
    function showChampionTooltip(event, champion) { clearTimeout(tooltipTimeout); tooltipTimeout = setTimeout(() => { if (!championTooltip || !champion) return; championTooltip.innerHTML = `<strong class="tooltip-title">${champion.name.ru}</strong><span class="tooltip-name">${champion.title.ru}</span>`; championTooltip.style.visibility = 'hidden'; championTooltip.style.display = 'block'; const tooltipRect = championTooltip.getBoundingClientRect(); championTooltip.style.visibility = ''; championTooltip.style.display = ''; const rect = event.target.getBoundingClientRect(); let top = rect.top - tooltipRect.height - 8; let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2); if (top < 0) { top = rect.bottom + 8; } if (left < 0) { left = 5; } else if (left + tooltipRect.width > window.innerWidth) { left = window.innerWidth - tooltipRect.width - 5; } championTooltip.style.left = `${left}px`; championTooltip.style.top = `${top}px`; championTooltip.classList.add('visible'); }, 100); }
    function hideChampionTooltip() { clearTimeout(tooltipTimeout); if (championTooltip) { championTooltip.classList.remove('visible'); } }

    // --- Initial App Setup ---
     // Apply initial theme based on localStorage or default
     applyTheme(currentTheme);

     const initialRole = getRoleFromHash();
     if (initialRole) {
         currentUserRole = initialRole; // Set role from hash before navigating
         navigateTo('draft');
     } else {
         navigateTo('home');
     }

}); // End DOMContentLoaded
