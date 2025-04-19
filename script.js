// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded. Initializing script...");

    // --- Global Elements ---
    const loadingIndicator = document.getElementById('loadingIndicator');
    const mainLayout = document.getElementById('mainLayout');
    const championGridElement = document.getElementById('championGrid');
    const startButton = document.getElementById('timerDisplay'); // Now a button
    const resetButton = document.getElementById('resetButton');
    const undoButton = document.getElementById('undoButton');
    const timerDisplay = document.getElementById('timerDisplay');
    const championSearch = document.getElementById('championSearch');
    const bluePicksContainer = document.querySelector('.blue-picks-container');
    const redPicksContainer = document.querySelector('.red-picks-container');
    const blueColumn = document.querySelector('.blue-column');
    const redColumn = document.querySelector('.red-column');
    const swapButton = document.getElementById('swapButton');
    const clearPicksButton = document.getElementById('clearPicksButton');
    const toggleTimerButton = document.getElementById('toggleTimerButton');
    const filterButtons = document.querySelectorAll('#roleFilterButtons .filter-button');
    const confirmPickBanButton = document.getElementById('confirmPickBanButton');
    const priorityFilterButton = document.getElementById('priorityFilterButton');
    const nextDraftButton = document.getElementById('nextDraftButton');
    const globallyBannedDisplay = document.getElementById('globallyBannedDisplay');
    const globalBansBlueContainer = document.getElementById('global-bans-blue');
    const globalBansRedContainer = document.getElementById('global-bans-red');
    const championTooltip = document.getElementById('championTooltip');
    const statusMessage = document.getElementById('statusMessage');
    const saveDraftButton = document.getElementById('saveDraftButton');
    const loadDraftButton = document.getElementById('loadDraftButton');
    const copySummaryButton = document.getElementById('copySummaryButton');
    const blueTeamNameH2 = document.getElementById('blue-team-name-h2');
    const redTeamNameH2 = document.getElementById('red-team-name-h2');
    const blueScoreEl = document.getElementById('blue-score');
    const redScoreEl = document.getElementById('red-score');

    // --- State Variables ---
    let allChampions = []; // Holds raw data from API
    let processedChampions = []; // Holds formatted champion data for use
    let ddragonVersion = 'latest'; // Will be updated
    let baseIconUrl = '';
    let baseSplashUrl = '';

    let currentStep = 0;
    let selectedChampions = new Set(); // Champions selected in the *current* draft
    let draftHistory = []; // History of actions in the *current* draft
    let pickNicknames = {}; // { "blue-pick-1": "Nickname", ... }
    let isDraftComplete = false;
    let isDraftStarted = false;
    let selectedSwapSlotId = null;
    let timerInterval = null;
    let draftTimerDuration = 30; // Default 30s
    let timerSeconds = draftTimerDuration;
    let currentRoleFilter = 'All';
    let previewedChampion = null; // Champion currently hovered for pick/ban
    let isPriorityFilterActive = false;
    let statusTimeout = null;

    // Fearless Draft State (persists between drafts via save/load or nextDraft)
    let globallyDisabledChampions = new Set(); // Champions unavailable due to previous games
    let globalBanHistory = []; // { championId: 'Aatrox', team: 'blue' } for display

    // Mapping champion IDs to roles (MANUAL - NEEDS UPDATING)
    // Ideally, fetch this from a separate JSON or use a more sophisticated source
    const championRolesMap = {
        'Aatrox': ['Top'], 'Ahri': ['Mid'], 'Akali': ['Mid', 'Top'], 'Akshan': ['Mid', 'Top'], 'Alistar': ['Support'], 'Amumu': ['Jungle', 'Support'], 'Anivia': ['Mid'], 'Annie': ['Mid', 'Support'], 'Aphelios': ['ADC'], 'Ashe': ['ADC', 'Support'], 'AurelionSol': ['Mid'], 'Azir': ['Mid'],
        'Bard': ['Support'], 'Belveth': ['Jungle'], 'Blitzcrank': ['Support'], 'Brand': ['Support', 'Mid', 'Jungle'], 'Braum': ['Support'], 'Briar': ['Jungle'],
        'Caitlyn': ['ADC'], 'Camille': ['Top'], 'Cassiopeia': ['Top', 'Mid'], 'Chogath': ['Top', 'Mid'], 'Corki': ['Mid', 'ADC'],
        'Darius': ['Top', 'Jungle'], 'Diana': ['Jungle', 'Mid'], 'DrMundo': ['Top', 'Jungle'], 'Draven': ['ADC'],
        'Ekko': ['Jungle', 'Mid'], 'Elise': ['Jungle'], 'Evelynn': ['Jungle'], 'Ezreal': ['ADC'],
        'Fiddlesticks': ['Jungle'], 'Fiora': ['Top'], 'Fizz': ['Mid'],
        'Galio': ['Mid', 'Support'], 'Gangplank': ['Top'], 'Garen': ['Top'], 'Gnar': ['Top'], 'Gragas': ['Jungle', 'Top', 'Mid', 'Support'], 'Graves': ['Jungle'], 'Gwen': ['Top', 'Jungle'],
        'Hecarim': ['Jungle'], 'Heimerdinger': ['Top', 'Mid', 'Support'], 'Hwei': ['Mid', 'Support'], // Added Hwei roles
        'Illaoi': ['Top'], 'Irelia': ['Top', 'Mid'], 'Ivern': ['Jungle', 'Support'],
        'Janna': ['Support'], 'JarvanIV': ['Jungle'], 'Jax': ['Top', 'Jungle'], 'Jayce': ['Top', 'Mid'], 'Jhin': ['ADC'], 'Jinx': ['ADC'],
        'Kaisa': ['ADC'], 'Kalista': ['ADC'], 'Karma': ['Support', 'Mid'], 'Karthus': ['Jungle', 'Mid'], 'Kassadin': ['Mid'], 'Katarina': ['Mid'], 'Kayle': ['Top', 'Mid'], 'Kayn': ['Jungle'], 'Kennen': ['Top', 'Mid'], 'Khazix': ['Jungle'], 'Kindred': ['Jungle'], 'Kled': ['Top', 'Mid'], 'KogMaw': ['ADC'], 'KSante': ['Top'],
        'Leblanc': ['Mid'], 'LeeSin': ['Jungle'], 'Leona': ['Support'], 'Lillia': ['Jungle'], 'Lissandra': ['Mid'], 'Lucian': ['ADC'], 'Lulu': ['Support'], 'Lux': ['Mid', 'Support'],
        'Malphite': ['Top', 'Support', 'Mid'], 'Malzahar': ['Mid'], 'Maokai': ['Jungle', 'Support'], 'MasterYi': ['Jungle'], 'Milio': ['Support'], 'MissFortune': ['ADC'], 'Mordekaiser': ['Top', 'Jungle'], 'Morgana': ['Support', 'Mid', 'Jungle'],
        'Naafiri': ['Jungle', 'Mid'], 'Nami': ['Support'], 'Nasus': ['Top'], 'Nautilus': ['Support'], 'Neeko': ['Mid', 'Support'], 'Nidalee': ['Jungle'], 'Nilah': ['ADC'], 'Nocturne': ['Jungle'], 'Nunu': ['Jungle'], // Nunu & Willump
        'Olaf': ['Top', 'Jungle'], 'Orianna': ['Mid'], 'Ornn': ['Top'],
        'Pantheon': ['Top', 'Mid', 'Support', 'Jungle'], 'Poppy': ['Top', 'Jungle', 'Support'], 'Pyke': ['Support', 'Mid'],
        'Qiyana': ['Jungle', 'Mid'], 'Quinn': ['Top', 'Mid'],
        'Rakan': ['Support'], 'Rammus': ['Jungle'], 'RekSai': ['Jungle'], 'Rell': ['Support', 'Jungle'], // Added Jungle Rell
        'Renata': ['Support'], // Renata Glasc ID is Renata
        'Renekton': ['Top'], 'Rengar': ['Jungle', 'Top'], 'Riven': ['Top'], 'Rumble': ['Top', 'Mid', 'Jungle'], 'Ryze': ['Top', 'Mid'],
        'Samira': ['ADC'], 'Sejuani': ['Jungle'], 'Senna': ['Support', 'ADC'], 'Seraphine': ['Support', 'Mid', 'ADC'], 'Sett': ['Top', 'Support'], 'Shaco': ['Jungle', 'Support'], 'Shen': ['Top', 'Support'], 'Shyvana': ['Jungle'], 'Singed': ['Top'], 'Sion': ['Top', 'Mid'], 'Sivir': ['ADC'], 'Skarner': ['Jungle', 'Top'], 'Smolder': ['ADC', 'Mid'], 'Sona': ['Support'], 'Soraka': ['Support'], 'Swain': ['Support', 'Mid', 'ADC'], 'Sylas': ['Mid', 'Jungle'], 'Syndra': ['Mid'],
        'TahmKench': ['Top', 'Support'], 'Taliyah': ['Jungle', 'Mid'], 'Talon': ['Jungle', 'Mid'], 'Taric': ['Support'], 'Teemo': ['Top'], 'Thresh': ['Support'], 'Tristana': ['ADC', 'Mid'], 'Trundle': ['Top', 'Jungle'], 'Tryndamere': ['Top'], 'TwistedFate': ['Mid', 'ADC'], 'Twitch': ['ADC', 'Jungle'], // Added Jungle Twitch
        'Udyr': ['Jungle', 'Top'], 'Urgot': ['Top'],
        'Varus': ['ADC', 'Mid'], 'Vayne': ['ADC', 'Top'], 'Veigar': ['Mid', 'ADC', 'Support'], 'Velkoz': ['Mid', 'Support'], 'Vex': ['Mid'], 'Vi': ['Jungle'], 'Viego': ['Jungle'], 'Viktor': ['Mid'], 'Vladimir': ['Top', 'Mid'], 'Volibear': ['Top', 'Jungle'],
        'Warwick': ['Jungle', 'Top'], 'MonkeyKing': ['Top', 'Jungle'], // Wukong ID is MonkeyKing
        'Xayah': ['ADC'], 'Xerath': ['Mid', 'Support'], 'XinZhao': ['Jungle'],
        'Yasuo': ['Mid', 'Top', 'ADC'], 'Yone': ['Top', 'Mid'], 'Yorick': ['Top', 'Jungle'], 'Yuumi': ['Support'],
        'Zac': ['Jungle'], 'Zed': ['Mid', 'Jungle'], 'Zeri': ['ADC'], 'Ziggs': ['Mid', 'ADC', 'Support'], 'Zilean': ['Support', 'Mid'], 'Zoe': ['Mid', 'Support'], 'Zyra': ['Support', 'Jungle', 'Mid']
        // Add new champions here with their roles
    };

    // List of priority champions (can be adjusted or loaded from config)
    const priorityChampions = new Set([ /* Your list here, same as before */
        'Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Annie', 'Ashe', 'AurelionSol',
        'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Corki', 'Darius', 'Diana',
        'DrMundo', 'Draven', 'Ekko', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz',
        'Galio', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Gwen', 'Hecarim', 'Heimerdinger',
        'Irelia', 'Janna', 'JarvanIV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kaisa', 'Kalista',
        'Karma', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Khazix', 'Kindred',
        'LeeSin', 'Leona', 'Lillia', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Malphite',
        'Maokai', 'MasterYi', 'Milio', 'MissFortune', 'Mordekaiser', 'Morgana', 'Nami',
        'Nasus', 'Nautilus', 'Nilah', 'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon',
        'Poppy', 'Pyke', 'Rakan', 'Rammus', 'Renekton', 'Rengar', 'Riven', 'Rumble',
        'Samira', 'Senna', 'Seraphine', 'Sett', 'Shen', 'Shyvana', 'Singed', 'Sion',
        'Sivir', 'Sona', 'Soraka', 'Swain', 'Syndra', 'Talon', 'Teemo', 'Thresh',
        'Tristana', 'Tryndamere', 'TwistedFate', 'Twitch', 'Urgot', 'Varus', 'Vayne',
        'Veigar', 'Vex', 'Vi', 'Viego', 'Viktor', 'Vladimir', 'Volibear', 'Warwick',
        'MonkeyKing', 'Xayah', 'XinZhao', 'Yasuo', 'Yone', 'Yuumi', 'Zed', 'Zeri', 'Ziggs',
        'Zoe', 'Zyra', 'Ryze', 'Nocturne', 'Zilean', 'Renata', 'Belveth', 'Naafiri', 'Briar', 'Hwei', 'Smolder' // Added newer champs
    ]);

    // Draft Order (Standard 5v5 Summoner's Rift)
    const draftOrder = [
        { type: 'ban', team: 'blue', slot: 'blue-ban-1', text: 'Синие: Бан 1' },
        { type: 'ban', team: 'red', slot: 'red-ban-1', text: 'Красные: Бан 1' },
        { type: 'ban', team: 'blue', slot: 'blue-ban-2', text: 'Синие: Бан 2' },
        { type: 'ban', team: 'red', slot: 'red-ban-2', text: 'Красные: Бан 2' },
        { type: 'ban', team: 'blue', slot: 'blue-ban-3', text: 'Синие: Бан 3' },
        { type: 'ban', team: 'red', slot: 'red-ban-3', text: 'Красные: Бан 3' },
        { type: 'pick', team: 'blue', slot: 'blue-pick-1', text: 'Синие: Пик 1' },
        { type: 'pick', team: 'red', slot: 'red-pick-1', text: 'Красные: Пик 1' },
        { type: 'pick', team: 'red', slot: 'red-pick-2', text: 'Красные: Пик 2' },
        { type: 'pick', team: 'blue', slot: 'blue-pick-2', text: 'Синие: Пик 2' },
        { type: 'pick', team: 'blue', slot: 'blue-pick-3', text: 'Синие: Пик 3' },
        { type: 'pick', team: 'red', slot: 'red-pick-3', text: 'Красные: Пик 3' },
        { type: 'ban', team: 'red', slot: 'red-ban-4', text: 'Красные: Бан 4' },
        { type: 'ban', team: 'blue', slot: 'blue-ban-4', text: 'Синие: Бан 4' },
        { type: 'ban', team: 'red', slot: 'red-ban-5', text: 'Красные: Бан 5' },
        { type: 'ban', team: 'blue', slot: 'blue-ban-5', text: 'Синие: Бан 5' },
        { type: 'pick', team: 'red', slot: 'red-pick-4', text: 'Красные: Пик 4' },
        { type: 'pick', team: 'blue', slot: 'blue-pick-4', text: 'Синие: Пик 4' },
        { type: 'pick', team: 'blue', slot: 'blue-pick-5', text: 'Синие: Пик 5' },
        { type: 'pick', team: 'red', slot: 'red-pick-5', text: 'Красные: Пик 5' }
    ];

    // --- Utility Functions ---
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const showStatusMessage = (message, duration = 3000) => {
        if (!statusMessage) return;
        statusMessage.textContent = message;
        statusMessage.classList.add('visible');
        clearTimeout(statusTimeout);
        statusTimeout = setTimeout(() => {
            statusMessage.classList.remove('visible');
        }, duration);
    };

    const getChampionById = (id) => processedChampions.find(champ => champ.id === id);

    // --- Data Fetching and Processing ---
    async function loadChampionData() {
        try {
            // 1. Get latest version
            const versionsResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
            if (!versionsResponse.ok) throw new Error(`Failed to fetch versions: ${versionsResponse.statusText}`);
            const versions = await versionsResponse.json();
            ddragonVersion = versions[0]; // Get the latest version
            console.log(`Using DDragon version: ${ddragonVersion}`);

            // Update base URLs
            baseIconUrl = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/`;
            baseSplashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/`;

            // 2. Fetch champion data
            // Using en_US for broad compatibility, could use ru_RU if needed, but names might differ slightly from common usage
            const dataUrl = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/champion.json`;
            const championDataResponse = await fetch(dataUrl);
            if (!championDataResponse.ok) throw new Error(`Failed to fetch champion data: ${championDataResponse.statusText}`);
            const championData = await championDataResponse.json();
            allChampions = championData.data; // Store raw data if needed later

            // 3. Process champion data
            processedChampions = Object.values(allChampions).map(champ => ({
                id: champ.id, // e.g., "Aatrox"
                name: champ.name, // e.g., "Aatrox" (DDragon Name)
                title: champ.title, // e.g., "the Darkin Blade"
                // Get roles from our manual map, default to empty array
                roles: championRolesMap[champ.id] || [],
                iconUrl: `${baseIconUrl}${champ.image.full}`, // image.full includes .png
                splashUrl: `${baseSplashUrl}${champ.id}_0.jpg` // Standard splash format
            }));

            // Sort champions alphabetically by name for display
            processedChampions.sort((a, b) => a.name.localeCompare(b.name));

            console.log(`Successfully loaded and processed ${processedChampions.length} champions.`);
            return true;

        } catch (error) {
            console.error("Error loading champion data:", error);
            showStatusMessage(`Ошибка загрузки данных чемпионов: ${error.message}`, 5000);
            // Fallback: maybe try to use the old hardcoded data if available? (Not implemented here)
            // For now, just show error and potentially disable the app
            loadingIndicator.textContent = `Ошибка загрузки! ${error.message}`; // Keep indicator visible with error
            mainLayout.classList.add('hidden'); // Ensure layout stays hidden
            return false;
        }
    }


    // --- Timer Functions ---
    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        timerDisplay.classList.remove('timer-running', 'timer-ending');
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function resetTimerDisplay() {
        stopTimer();
        timerSeconds = draftTimerDuration;
        timerDisplay.textContent = formatTime(timerSeconds);
        timerDisplay.disabled = false; // Enable start button
        timerDisplay.classList.remove('timer-disabled'); // For styling non-clickable state
        timerDisplay.title = 'Начать драфт';
        timerDisplay.setAttribute('aria-label', 'Таймер / Старт драфта');
    }

    function startTimer() {
        stopTimer(); // Ensure no duplicate timers
        timerSeconds = draftTimerDuration;
        timerDisplay.textContent = formatTime(timerSeconds);
        timerDisplay.disabled = true; // Disable start button while running
        timerDisplay.classList.add('timer-running', 'timer-disabled');
        timerDisplay.title = 'Драфт идет...';
        timerDisplay.setAttribute('aria-label', `Таймер: ${formatTime(timerSeconds)}`);

        timerInterval = setInterval(() => {
            timerSeconds--;
            timerDisplay.textContent = formatTime(timerSeconds);
            timerDisplay.setAttribute('aria-label', `Таймер: ${formatTime(timerSeconds)}`);

            if (timerSeconds <= 10 && timerSeconds > 0) {
                timerDisplay.classList.add('timer-ending'); // Add class for styling urgency
            } else {
                 timerDisplay.classList.remove('timer-ending');
            }

            if (timerSeconds <= 0) {
                stopTimer();
                 timerDisplay.classList.add('timer-ending'); // Keep red color at 00:00
                // Optionally auto-confirm or skip turn here
                console.log("Timer reached zero!");
                // Auto-confirm logic (example - needs previewedChampion)
                // if (previewedChampion) {
                //     handleConfirmPickBan();
                // } else {
                //     // Handle skipping turn? (Maybe select random or leave empty)
                // }
            }
        }, 1000);
    }

    // --- Draft Logic Functions ---

    function createChampionCard(champ) {
        const card = document.createElement('button'); // Use button for accessibility
        card.className = 'champion-card';
        card.dataset.championId = champ.id;
        card.dataset.championName = champ.name.toLowerCase(); // For search
        card.dataset.roles = champ.roles.join(','); // For filter
        card.setAttribute('role', 'gridcell'); // Role within the grid
        card.setAttribute('aria-label', champ.name); // Accessibility label

        const img = document.createElement('img');
        img.src = champ.iconUrl;
        img.alt = ""; // Alt text handled by button's aria-label
        img.title = `${champ.name}\n${champ.title}`; // Basic tooltip on image hover
        img.className = 'w-full h-full object-cover block pointer-events-none'; // Img shouldn't capture events
        img.loading = 'lazy'; // Lazy load images
        img.onerror = () => { // Basic error placeholder
            img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%234a5568'/%3E%3C/svg%3E`; // Grey square
            card.setAttribute('aria-label', `${champ.name} (ошибка загрузки)`);
        };

        card.appendChild(img);

        // Attach event listeners for interaction and tooltip
        card.addEventListener('click', () => handleChampionPreview(champ));
        card.addEventListener('mouseover', (event) => showChampionTooltip(event, champ));
        card.addEventListener('mouseout', hideChampionTooltip);
        card.addEventListener('focus', (event) => showChampionTooltip(event, champ)); // Show tooltip on focus
        card.addEventListener('blur', hideChampionTooltip); // Hide tooltip on blur

        return card;
    }

    function displayChampions() {
        const fragment = document.createDocumentFragment();
        processedChampions.forEach(champ => {
            const card = createChampionCard(champ);
            fragment.appendChild(card);
        });
        championGridElement.innerHTML = ''; // Clear previous grid
        championGridElement.appendChild(fragment);

        // Re-apply filters and update availability after displaying
        filterChampions();
    }

    // Combined function to update UI state based on draft progress
    function updateDraftUI() {
        // 1. Remove previous highlights/previews
        document.querySelectorAll('.pick-slot, .ban-slot').forEach(el => {
            el.classList.remove('highlight-action', 'preview-flash', 'swap-selected');
        });
        previewedChampion = null;
        confirmPickBanButton.disabled = true;

        // 2. Handle Draft State (Not Started, In Progress, Complete)
        if (!isDraftStarted) {
            resetTimerDisplay(); // Shows "--:--" and enables start button
            blueColumn.classList.add('draft-disabled');
            redColumn.classList.add('draft-disabled');
            copySummaryButton.disabled = true; // Can't copy before start
             nextDraftButton.disabled = true;
             timerDisplay.disabled = false;
             swapButton.disabled = false; // Allow swap before start
             clearPicksButton.disabled = draftHistory.length === 0 && Object.keys(pickNicknames).length === 0 && selectedChampions.size === 0; // Disable if truly empty
             toggleTimerButton.disabled = false;
             priorityFilterButton.disabled = false;
             resetButton.disabled = false; // Allow full reset
             loadDraftButton.disabled = false; // Allow loading
             saveDraftButton.disabled = false; // Allow saving even before start (saves names/score/etc)

        } else if (currentStep < draftOrder.length) {
            isDraftComplete = false;
            const action = draftOrder[currentStep];
            const activeSlot = document.getElementById(action.slot);
            if (activeSlot) {
                activeSlot.classList.add('highlight-action');
                 // If the slot isn't filled *and* confirmed in history, restore placeholder
                 const isConfirmed = draftHistory.some(entry => entry.slotId === action.slot);
                 if (!isConfirmed) {
                     const currentNickname = pickNicknames[action.slot] || '';
                     restoreSlotPlaceholder(activeSlot, action.slot, currentNickname);
                 }
            }
            if (!timerInterval) startTimer(); // Start timer if not already running
            copySummaryButton.disabled = true; // Can't copy during draft
             nextDraftButton.disabled = true;
             timerDisplay.disabled = true; // Timer button disabled while running
             swapButton.disabled = true; // No swap during draft
             clearPicksButton.disabled = true; // No clear during draft
             toggleTimerButton.disabled = true;
             priorityFilterButton.disabled = true;
             resetButton.disabled = true; // No full reset during draft
             loadDraftButton.disabled = true; // No loading during draft
             saveDraftButton.disabled = false; // Allow saving mid-draft

        } else { // Draft Complete
            isDraftComplete = true;
            stopTimer();
            timerDisplay.textContent = "Драфт Завершен!";
            timerDisplay.classList.add('timer-disabled');
            timerDisplay.disabled = true;
            timerDisplay.title = 'Драфт завершен';
            blueColumn.classList.remove('draft-disabled'); // Enable columns for swap clicks
            redColumn.classList.remove('draft-disabled');
            copySummaryButton.disabled = false; // Enable copy
            nextDraftButton.disabled = false; // Enable next draft
            swapButton.disabled = false; // Enable swap after completion
            clearPicksButton.disabled = false; // Allow clearing picks/bans after completion
            toggleTimerButton.disabled = true; // Timer settings locked after start
            priorityFilterButton.disabled = true; // Filters locked after start
            resetButton.disabled = false; // Allow full reset
            loadDraftButton.disabled = true; // No loading completed draft (use reset)
            saveDraftButton.disabled = false; // Allow saving completed state
        }

        // 3. Update Undo Button State
        undoButton.disabled = draftHistory.length === 0 || !isDraftStarted;

        // 4. Update Champion Availability in the Grid
        updateChampionAvailability();

        // 5. Update Globally Banned Display
        displayGloballyBanned();

        // 6. Update Pick Slot Cursors (for swapping after completion)
        document.querySelectorAll('.pick-slot').forEach(slot => {
            const champId = getSlotChampionId(slot.id); // Get champion ID associated with the slot
            slot.style.cursor = isDraftComplete && champId ? 'pointer' : 'default';
            slot.title = isDraftComplete && champId ? 'Нажмите для выбора обмена' : '';
        });
    }

    // Updates grid based on selected/globally disabled
    function updateChampionAvailability() {
        const combinedDisabled = new Set([...selectedChampions, ...globallyDisabledChampions]);
        document.querySelectorAll('.champion-card').forEach(card => {
            const champId = card.dataset.championId;
            const isDisabled = combinedDisabled.has(champId);
            const isSelected = selectedChampions.has(champId);

            card.classList.toggle('selected', isSelected); // Visually marks picked in *this* draft
            card.classList.toggle('disabled', isDisabled); // Grays out if picked OR globally banned
            card.disabled = isDisabled; // Make button actually disabled
            card.setAttribute('aria-disabled', isDisabled.toString());
        });
    }

     function handleChampionPreview(champion) {
        if (!isDraftStarted || isDraftComplete || currentStep >= draftOrder.length) return;

        const isDisabled = selectedChampions.has(champion.id) || globallyDisabledChampions.has(champion.id);
        if (isDisabled) {
            showStatusMessage(`${champion.name} уже выбран или заблокирован.`, 2000);
            return;
        }

        const currentAction = draftOrder[currentStep];
        const slotElement = document.getElementById(currentAction.slot);

        if (slotElement) {
            // Remove flash from previously previewed slot if any
            document.querySelectorAll('.preview-flash').forEach(el => el.classList.remove('preview-flash'));

            previewedChampion = champion; // Set the champion to be confirmed
            const existingNickname = pickNicknames[currentAction.slot] || '';
            fillSlot(slotElement, champion, currentAction.type, existingNickname);
            slotElement.classList.add('preview-flash'); // Add flash to current preview
            confirmPickBanButton.disabled = false; // Enable confirmation
        }
    }

    function handleConfirmPickBan() {
        if (!previewedChampion || !isDraftStarted || isDraftComplete || currentStep >= draftOrder.length) return;

        const championToConfirm = previewedChampion;
        const currentAction = draftOrder[currentStep];
        const slotElement = document.getElementById(currentAction.slot);

        // Final check for availability (should be redundant, but safe)
        const isDisabled = selectedChampions.has(championToConfirm.id) || globallyDisabledChampions.has(championToConfirm.id);
        if (!slotElement || isDisabled) {
            console.warn("Confirmation failed: Slot not found or champion unavailable.");
            previewedChampion = null; // Clear preview
            confirmPickBanButton.disabled = true;
            if (slotElement) slotElement.classList.remove('preview-flash');
            // Maybe restore placeholder if needed?
            return;
        }

        // --- Action Confirmed ---
        slotElement.classList.remove('preview-flash');
        const previousNickname = pickNicknames[currentAction.slot] || ''; // Get nickname before potential overwrite

        // Update state
        if (currentAction.type === 'pick') {
             // Nickname remains as it was input by user, stored in pickNicknames
        }
        selectedChampions.add(championToConfirm.id);
        draftHistory.push({
            championId: championToConfirm.id,
            slotId: currentAction.slot,
            step: currentStep,
            previousNickname: previousNickname, // Store the nickname that was present before this action
            type: currentAction.type,
            team: currentAction.team
        });

        // --- Advance Draft ---
        currentStep++;
        previewedChampion = null; // Clear preview after confirmation
        confirmPickBanButton.disabled = true;

        // Update UI
        updateDraftUI(); // This handles highlights, button states, availability etc.
        filterChampions(); // Re-apply search/role filters if any

        console.log(`Confirmed: ${currentAction.type} ${championToConfirm.name} in slot ${currentAction.slot}`);
    }


    function fillSlot(slotElement, champion, type, nicknameText = '') {
        if (!slotElement || !champion) return;

        slotElement.innerHTML = ''; // Clear previous content
        slotElement.classList.remove('preview-flash'); // Ensure flash is removed

        const img = document.createElement('img');
        img.src = type === 'pick' ? champion.splashUrl : champion.iconUrl;
        img.alt = champion.name; // Alt text for the image itself
        // Title handled by slot's aria-label or parent element if needed
        img.className = 'w-full h-full object-cover block absolute inset-0 z-0 pointer-events-none';
        img.onerror = () => {
            const errorSpan = document.createElement('span');
            errorSpan.className = 'text-[1.5vmin] text-red-400';
            errorSpan.textContent = 'Err';
            slotElement.innerHTML = ''; // Clear again before adding error text
            slotElement.appendChild(errorSpan);
            if (type === 'pick') {
                addNicknameInput(slotElement, nicknameText); // Add nickname even if image fails
            }
        };
        slotElement.appendChild(img);

        // Add nickname input for pick slots
        if (type === 'pick') {
            addNicknameInput(slotElement, nicknameText);
            // Store the champion ID directly on the slot for easier lookup later (e.g., swap)
             slotElement.dataset.championId = champion.id;
        } else {
            delete slotElement.dataset.championId; // Ensure no champ id on ban slots
        }

        // Update accessibility label
        slotElement.setAttribute('aria-label', `${slotElement.ariaLabel.split(':')[0]}: ${champion.name}`);
    }

    function addNicknameInput(slotElement, text = '') {
        const nicknameInput = document.createElement('div');
        nicknameInput.contentEditable = true;
        nicknameInput.spellcheck = false;
        nicknameInput.className = 'nickname-input';
        nicknameInput.textContent = text || ''; // Use provided text or empty string
        nicknameInput.dataset.slotId = slotElement.id; // Link input to its slot ID

        // Update state on input change
        nicknameInput.addEventListener('input', (e) => {
            const slotId = e.target.dataset.slotId;
            if (slotId) {
                 pickNicknames[slotId] = e.target.textContent.trim();
                 console.log("Nickname updated:", pickNicknames);
            }
        });

         // Prevent line breaks
        nicknameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.target.blur(); // Lose focus on Enter
            }
        });

        slotElement.appendChild(nicknameInput);
    }

    // Clears slot content and optionally restores nickname input
    function restoreSlotPlaceholder(slotElement, slotId, nicknameText = '') {
        if (!slotElement) return;
        slotElement.innerHTML = ''; // Clear content (img, old input)
        slotElement.classList.remove('preview-flash', 'swap-selected');
        delete slotElement.dataset.championId;
        slotElement.style.backgroundImage = ''; // Remove any potential bg image
        slotElement.style.cursor = 'default';
        slotElement.title = '';
         // Reset accessibility label
         slotElement.setAttribute('aria-label', `${slotElement.ariaLabel.split(':')[0]}: Empty`);


        // Add nickname input *only* for pick slots
        if (slotId && slotId.includes('-pick-')) {
             addNicknameInput(slotElement, nicknameText);
             // Ensure the nickname state is updated if we restore it
             pickNicknames[slotId] = nicknameText;
        } else {
            // If it's a ban slot, ensure no nickname is stored for it
            delete pickNicknames[slotId];
        }
    }

    // Gets the champion ID stored in a pick slot's dataset
    function getSlotChampionId(slotId) {
        const slotElement = document.getElementById(slotId);
        return slotElement ? slotElement.dataset.championId : null;
    }

    function handleUndo() {
        if (draftHistory.length === 0 || !isDraftStarted) return;

        deselectSwapSlots(); // Cancel any swap selection

        const lastAction = draftHistory.pop();
        if (!lastAction) return;

        currentStep = lastAction.step; // Revert step counter
        selectedChampions.delete(lastAction.championId); // Remove champ from current selection

        const slotElement = document.getElementById(lastAction.slotId);
        if (slotElement) {
            // Restore the slot to its empty state, but keep the nickname *that was there before the action*
            restoreSlotPlaceholder(slotElement, lastAction.slotId, lastAction.previousNickname);
        }

        isDraftComplete = false; // No longer complete if we undo
        previewedChampion = null; // Clear any active preview
        confirmPickBanButton.disabled = true;

        updateDraftUI(); // Update highlights, buttons, availability
        filterChampions(); // Re-apply filters

        showStatusMessage("Действие отменено", 1500);
        console.log("Undo:", lastAction);
    }

    // Resets EVERYTHING - names, scores, history, global bans - back to initial state
    function resetDraftFull() {
        console.log("Resetting series (full reset)...");
        if (!confirm("Вы уверены, что хотите полностью сбросить драфт? Это удалит все данные сессии (ники, счет, историю игр).")) {
             return;
        }

        currentStep = 0;
        selectedChampions.clear();
        draftHistory = [];
        pickNicknames = {};
        globallyDisabledChampions.clear();
        globalBanHistory = [];
        isDraftComplete = false;
        isDraftStarted = false;
        previewedChampion = null;
        confirmPickBanButton.disabled = true;

        deselectSwapSlots();
        stopTimer();
        draftTimerDuration = 30; // Reset timer duration
        resetTimerDisplay(); // Set display to default

        // Clear all slots and restore placeholders (with empty nicknames)
        document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => {
            restoreSlotPlaceholder(slot, slot.id, ''); // Pass empty nickname
            slot.classList.remove('highlight-action', 'preview-flash');
        });

        // Reset names and scores
        if (blueTeamNameH2) blueTeamNameH2.textContent = 'Синяя Команда';
        if (redTeamNameH2) redTeamNameH2.textContent = 'Красная Команда';
        if (blueScoreEl) blueScoreEl.textContent = '';
        if (redScoreEl) redScoreEl.textContent = '';

        // Reset UI states
        blueColumn.classList.add('draft-disabled');
        redColumn.classList.add('draft-disabled');
        championSearch.value = '';
        currentRoleFilter = 'All';
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.role === 'All');
        });
        isPriorityFilterActive = false;
        if (priorityFilterButton) {
            priorityFilterButton.classList.remove('active');
            priorityFilterButton.title = 'Показать только приоритетных чемпионов';
            priorityFilterButton.setAttribute('aria-pressed', 'false');
        }

        displayGloballyBanned(); // Will hide the display area
        updateChampionAvailability(); // Update grid based on cleared selections
        filterChampions(); // Apply default filters
        updateDraftUI(); // Set initial button states etc.

         // Clear saved state from localStorage
         localStorage.removeItem('lolDraftState');

        showStatusMessage("Драфт полностью сброшен.", 2000);
    }

    // Resets ONLY the current game's picks/bans (keeps names, scores, nicks, global bans)
    function resetCurrentGamePicksBans() {
         console.log("Resetting current game picks/bans...");
         if (isDraftStarted && !isDraftComplete) {
              if (!confirm("Драфт уже начат. Вы уверены, что хотите очистить текущие пики/баны?")) {
                   return;
              }
         }

        currentStep = 0;
        selectedChampions.clear(); // Clear only local selections for this game
        draftHistory = [];
        isDraftComplete = false;
        isDraftStarted = false; // Reset start flag
        previewedChampion = null;
        confirmPickBanButton.disabled = true;

        deselectSwapSlots();
        stopTimer();
        resetTimerDisplay(); // Reset timer to initial state

        // Clear slots but *keep existing nicknames* from the pickNicknames state
        document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => {
            const currentNickname = pickNicknames[slot.id] || ''; // Get stored nickname
            restoreSlotPlaceholder(slot, slot.id, currentNickname); // Restore with nickname
            slot.classList.remove('highlight-action', 'preview-flash');
        });

        // Reset UI states for a new game start
        blueColumn.classList.add('draft-disabled');
        redColumn.classList.add('draft-disabled');

        updateChampionAvailability(); // Apply global bans + cleared local picks
        filterChampions(); // Re-apply filters
        updateDraftUI(); // Update button states etc.

        showStatusMessage("Пики/баны текущей игры очищены.", 2000);
    }


    function handleStartDraft() {
        if (isDraftStarted) return;
        console.log("Starting draft...");
        isDraftStarted = true;
        blueColumn.classList.remove('draft-disabled');
        redColumn.classList.remove('draft-disabled');
        // Don't reset nicknames here - keep them from before start
        updateDraftUI(); // This will disable buttons, start timer, etc.
    }

    const debouncedFilter = debounce(() => {
         filterChampions();
    }, 250); // 250ms debounce

    function filterChampions() {
        const searchTerm = championSearch.value.toLowerCase().trim();
        let visibleCount = 0;

        document.querySelectorAll('.champion-card').forEach(card => {
            const champId = card.dataset.championId;
            const champName = card.dataset.championName;
            const champRoles = card.dataset.roles ? card.dataset.roles.split(',') : [];

            const searchMatch = champName.includes(searchTerm) || champId.toLowerCase().includes(searchTerm);
            const roleMatch = currentRoleFilter === 'All' || champRoles.includes(currentRoleFilter);
            const isPriority = priorityChampions.has(champId);
            const hideByPriorityFilter = isPriorityFilterActive && !isPriority;

            const isVisible = searchMatch && roleMatch && !hideByPriorityFilter;

            card.style.display = isVisible ? 'flex' : 'none'; // Use flex for button alignment
            if (isVisible) visibleCount++;

            // Ensure disabled state is correct after filtering
            const isDisabled = selectedChampions.has(champId) || globallyDisabledChampions.has(champId);
            card.classList.toggle('disabled', isDisabled);
            card.disabled = isDisabled;
            card.setAttribute('aria-disabled', isDisabled.toString());
            card.classList.toggle('selected', selectedChampions.has(champId));
        });
        // console.log(`Filtering: Term='${searchTerm}', Role='${currentRoleFilter}', Priority=${isPriorityFilterActive}. Visible: ${visibleCount}`);
    }

    function deselectSwapSlots() {
        if (selectedSwapSlotId) {
            const prevSelected = document.getElementById(selectedSwapSlotId);
            if (prevSelected) {
                prevSelected.classList.remove('swap-selected');
            }
            selectedSwapSlotId = null;
        }
    }

    // Handles clicks within team columns (primarily for swap after draft)
    function handlePickContainerClick(event) {
        // Allow clicks on nickname input itself
        if (event.target.classList.contains('nickname-input')) {
            return;
        }

        const clickedSlot = event.target.closest('.pick-slot');

        // Only allow swap logic if draft is complete and a filled pick slot was clicked
        if (!isDraftComplete || !clickedSlot || !clickedSlot.dataset.championId) {
            deselectSwapSlots(); // Deselect if clicking outside a valid slot
            return;
        }

        const clickedSlotId = clickedSlot.id;

        if (!selectedSwapSlotId) {
            // First click: select the slot
            selectedSwapSlotId = clickedSlotId;
            clickedSlot.classList.add('swap-selected');
            console.log("Swap select:", selectedSwapSlotId);
        } else {
            // Second click
            if (selectedSwapSlotId === clickedSlotId) {
                // Clicked the same slot again: deselect
                deselectSwapSlots();
                console.log("Swap deselect");
            } else {
                // Clicked a different slot: attempt swap
                const firstSlot = document.getElementById(selectedSwapSlotId);
                if (!firstSlot) { // Safety check
                    deselectSwapSlots();
                    return;
                }

                const team1 = selectedSwapSlotId.startsWith('blue') ? 'blue' : 'red';
                const team2 = clickedSlotId.startsWith('blue') ? 'blue' : 'red';

                // Only allow swaps *within* the same team after draft completion
                if (team1 === team2) {
                    console.log("Attempting swap between:", selectedSwapSlotId, clickedSlotId);
                    const champId1 = firstSlot.dataset.championId;
                    const champId2 = clickedSlot.dataset.championId;
                    const champ1 = getChampionById(champId1);
                    const champ2 = getChampionById(champId2);

                    // Swap nicknames in state *first*
                    const nick1 = pickNicknames[selectedSwapSlotId] || '';
                    const nick2 = pickNicknames[clickedSlotId] || '';
                    pickNicknames[selectedSwapSlotId] = nick2;
                    pickNicknames[clickedSlotId] = nick1;

                    // Then update the DOM slots
                    if (champ1 && champ2) {
                        fillSlot(firstSlot, champ2, 'pick', nick2);
                        fillSlot(clickedSlot, champ1, 'pick', nick1);
                        showStatusMessage(`Обмен: ${champ1.name} <-> ${champ2.name}`, 2000);
                    }
                    deselectSwapSlots();
                } else {
                    // Clicked on the other team: deselect old, select new
                    console.log("Swap select (different team):", clickedSlotId);
                    deselectSwapSlots();
                    selectedSwapSlotId = clickedSlotId;
                    clickedSlot.classList.add('swap-selected');
                }
            }
        }
    }

    // Swap Teams (Names/Scores before start, full picks/bans/nicks after completion)
    function handleSwapTeams() {
         try {
             // 1. Always swap names and scores
             const tempName = blueTeamNameH2.textContent;
             blueTeamNameH2.textContent = redTeamNameH2.textContent;
             redTeamNameH2.textContent = tempName;

             const tempScore = blueScoreEl.textContent;
             blueScoreEl.textContent = redScoreEl.textContent;
             redScoreEl.textContent = tempScore;

             // 2. Determine when to swap picks/bans/nicknames
             if (isDraftComplete) {
                 // AFTER DRAFT: Swap everything visually and in state
                 console.log("Swapping picks/bans/nicknames after draft completion...");
                 const newPickNicknames = {};
                 const newSelectedChampions = new Set(); // Track champs for each team after swap
                 const newBluePicks = [];
                 const newRedPicks = [];

                 // Swap Bans first (only visual)
                 for (let i = 1; i <= 5; i++) {
                     const blueBan = document.getElementById(`blue-ban-${i}`);
                     const redBan = document.getElementById(`red-ban-${i}`);
                     if (blueBan && redBan) {
                         const tempHTML = blueBan.innerHTML;
                         blueBan.innerHTML = redBan.innerHTML;
                         redBan.innerHTML = tempHTML;
                          // Swap aria labels too
                         const tempAria = blueBan.getAttribute('aria-label');
                         blueBan.setAttribute('aria-label', redBan.getAttribute('aria-label'));
                         redBan.setAttribute('aria-label', tempAria);
                     }
                 }

                 // Prepare to swap picks & nicknames
                 for (let i = 1; i <= 5; i++) {
                     const blueSlotId = `blue-pick-${i}`;
                     const redSlotId = `red-pick-${i}`;
                     const blueChampId = getSlotChampionId(blueSlotId);
                     const redChampId = getSlotChampionId(redSlotId);
                     const blueNick = pickNicknames[blueSlotId] || '';
                     const redNick = pickNicknames[redSlotId] || '';

                     // Store swapped data for state update
                     newPickNicknames[blueSlotId] = redNick;
                     newPickNicknames[redSlotId] = blueNick;
                     if(redChampId) newBluePicks.push({ slotId: blueSlotId, champId: redChampId, nick: redNick });
                     if(blueChampId) newRedPicks.push({ slotId: redSlotId, champId: blueChampId, nick: blueNick });
                 }

                 // Update the main nickname state
                 pickNicknames = newPickNicknames;

                 // Update the DOM based on swapped data
                 document.querySelectorAll('.pick-slot').forEach(slot => restoreSlotPlaceholder(slot, slot.id, '')); // Clear all first

                 newBluePicks.forEach(p => {
                      const champ = getChampionById(p.champId);
                      if(champ) fillSlot(document.getElementById(p.slotId), champ, 'pick', p.nick);
                      newSelectedChampions.add(p.champId);
                 });
                 newRedPicks.forEach(p => {
                      const champ = getChampionById(p.champId);
                      if(champ) fillSlot(document.getElementById(p.slotId), champ, 'pick', p.nick);
                      newSelectedChampions.add(p.champId);
                 });

                  // Update selected champions state (might be redundant if draftHistory is source of truth, but good for consistency)
                  selectedChampions = newSelectedChampions;

                 // We should ideally update draftHistory too, but that's complex.
                 // For simplicity, swapping after completion is mainly visual + state for nicknames/champs in slots.
                 // Further actions like Undo might be weird after a full swap.

                 deselectSwapSlots();
                 showStatusMessage("Команды поменялись местами (пики/баны/ники).", 2000);

             } else if (!isDraftStarted) {
                 // BEFORE DRAFT: Swap only nicknames in state and DOM
                 console.log("Swapping nicknames before draft starts...");
                 const swappedNicks = {};
                 for (let i = 1; i <= 5; i++) {
                     const blueSlotId = `blue-pick-${i}`;
                     const redSlotId = `red-pick-${i}`;
                     const blueNick = pickNicknames[blueSlotId] || '';
                     const redNick = pickNicknames[redSlotId] || '';

                     // Update state
                     swappedNicks[blueSlotId] = redNick;
                     swappedNicks[redSlotId] = blueNick;

                     // Update DOM directly
                     const blueNickInput = document.querySelector(`#${blueSlotId} .nickname-input`);
                     const redNickInput = document.querySelector(`#${redSlotId} .nickname-input`);
                     if (blueNickInput) blueNickInput.textContent = redNick;
                     if (redNickInput) redNickInput.textContent = blueNick;
                 }
                 // Update the main nickname state
                 pickNicknames = swappedNicks;
                 deselectSwapSlots();
                 showStatusMessage("Команды поменялись местами (ники).", 2000);
             } else {
                 console.warn("Attempted to swap teams during an active draft. Only names/scores swapped.");
                 showStatusMessage("Нельзя менять пики/баны во время драфта.", 2000);
             }
             // Update availability just in case something changed (mainly relevant after draft swap)
             updateChampionAvailability();
         } catch (error) {
             console.error("Error in handleSwapTeams:", error);
             showStatusMessage("Ошибка при смене команд.", 3000);
         }
    }


    function handleToggleTimer() {
        if (isDraftStarted) return; // Don't change timer mid-draft
        draftTimerDuration = draftTimerDuration === 30 ? 45 : 30;
        resetTimerDisplay(); // Update display with new duration
        toggleTimerButton.title = `Сменить время таймера (${draftTimerDuration === 30 ? '-> 45с' : '-> 30с'})`;
        showStatusMessage(`Время таймера: ${draftTimerDuration} сек.`, 1500);
        console.log("Timer duration set to:", draftTimerDuration);
    }

    function handleRoleFilterClick(event) {
        const clickedButton = event.currentTarget;
        if (!clickedButton) return;

        currentRoleFilter = clickedButton.dataset.role;
        filterButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
        filterChampions(); // Update grid based on new filter
    }

    function handlePriorityFilterToggle() {
        isPriorityFilterActive = !isPriorityFilterActive;
        priorityFilterButton.classList.toggle('active', isPriorityFilterActive);
        priorityFilterButton.setAttribute('aria-pressed', isPriorityFilterActive.toString());
        priorityFilterButton.title = isPriorityFilterActive ? 'Показать всех чемпионов' : 'Показать только приоритетных чемпионов';
        console.log('Priority filter active:', isPriorityFilterActive);
        filterChampions(); // Update grid
    }

    // Display globally banned champions in their area
    function displayGloballyBanned() {
         if (!globalBansBlueContainer || !globalBansRedContainer || !globallyBannedDisplay) return;

         globalBansBlueContainer.innerHTML = '';
         globalBansRedContainer.innerHTML = '';

         if (globalBanHistory.length > 0) {
              globallyBannedDisplay.classList.remove('hidden');
              const blueFragment = document.createDocumentFragment();
              const redFragment = document.createDocumentFragment();

              globalBanHistory.forEach(banInfo => {
                   const champ = getChampionById(banInfo.championId);
                   if (champ) {
                        const iconDiv = document.createElement('div');
                        iconDiv.className = 'global-ban-icon';
                        iconDiv.title = `${champ.name} (Заблокирован ${banInfo.team === 'blue' ? 'синими' : 'красными'} в пред. игре)`;
                        iconDiv.setAttribute('aria-label', iconDiv.title); // Accessibility

                        const img = document.createElement('img');
                        img.src = champ.iconUrl;
                        img.alt = ""; // Decorative, label on parent
                        img.loading = 'lazy';
                        img.onerror = () => { // Simple error handling
                             img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%234a5568'/%3E%3C/svg%3E`;
                        };
                        iconDiv.appendChild(img);

                        if (banInfo.team === 'blue') {
                             blueFragment.appendChild(iconDiv);
                        } else {
                             redFragment.appendChild(iconDiv);
                        }
                   }
              });
              globalBansBlueContainer.appendChild(blueFragment);
              globalBansRedContainer.appendChild(redFragment);

         } else {
              globallyBannedDisplay.classList.add('hidden');
         }
    }


    // --- Next Draft (Fearless Mode Logic) ---
    function handleNextDraft() {
        console.log("handleNextDraft: Starting...");
        if (!isDraftComplete) {
            console.warn("handleNextDraft: Draft not complete.");
            showStatusMessage("Драфт не завершен. Завершите его перед переходом к следующему.", 3000);
            return;
        }

        // Add picks from the completed draft to the global ban list
        let addedBansCount = 0;
        draftHistory.forEach(action => {
            if (action.type === 'pick' && !globallyDisabledChampions.has(action.championId)) {
                // Add to state for next game
                globalBanHistory.push({ championId: action.championId, team: action.team });
                globallyDisabledChampions.add(action.championId);
                addedBansCount++;
            }
        });
        console.log(`handleNextDraft: Added ${addedBansCount} champions to global bans.`);
        console.log("handleNextDraft: Updated globalBanHistory:", globalBanHistory);
        console.log("handleNextDraft: Updated globallyDisabledChampions:", globallyDisabledChampions);

        // Reset the current game state, keeping global bans, names, scores, nicknames
        resetCurrentGamePicksBans(); // This resets local state, timer, UI for new game

        showStatusMessage("Переход к следующему драфту. Пики предыдущей игры заблокированы.", 2500);
        console.log("handleNextDraft: Current draft state reset for next game.");
    }


    // --- Champion Tooltip Functions ---
    let tooltipTimeout;
    function showChampionTooltip(event, champion) {
        clearTimeout(tooltipTimeout);
        tooltipTimeout = setTimeout(() => {
            if (!championTooltip || !champion) return;

            championTooltip.innerHTML = `
                <strong class="tooltip-title">${champion.name}</strong>
                <span class="tooltip-name">${champion.title}</span>
            `;

            // Position the tooltip near the event target (card or mouse)
            const rect = event.target.getBoundingClientRect();
            const tooltipRect = championTooltip.getBoundingClientRect(); // Get tooltip size *after* content update

            // Position above the card, centered horizontally
            let top = rect.top - tooltipRect.height - 8; // 8px offset above
            let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

            // Adjust if tooltip goes off-screen
            if (top < 0) { // If too high, position below
                top = rect.bottom + 8;
            }
            if (left < 0) { // If too far left
                left = 5;
            } else if (left + tooltipRect.width > window.innerWidth) { // If too far right
                left = window.innerWidth - tooltipRect.width - 5;
            }

            championTooltip.style.left = `${left}px`;
            championTooltip.style.top = `${top}px`;
            championTooltip.classList.add('visible');
        }, 100); // Small delay before showing
    }

    function hideChampionTooltip() {
         clearTimeout(tooltipTimeout);
        if (championTooltip) {
            championTooltip.classList.remove('visible');
        }
    }

    // --- Save/Load State Functions ---
    function gatherCurrentState() {
        // Read current editable values
        const blueName = blueTeamNameH2.textContent.trim();
        const redName = redTeamNameH2.textContent.trim();
        const blueScore = blueScoreEl.textContent.trim();
        const redScore = redScoreEl.textContent.trim();

        // Read nicknames directly from the state variable `pickNicknames`
        // (which should be updated by the input event listeners)

        const state = {
            version: 1, // State structure version
            timestamp: new Date().toISOString(),
            ddragonVersion: ddragonVersion, // Save the data version used

            // Team Info
            blueTeamName: blueName,
            redTeamName: redName,
            blueScore: blueScore,
            redScore: redScore,

            // Current Draft State
            currentStep: currentStep,
            selectedChampions: Array.from(selectedChampions), // Convert Set to Array
            draftHistory: draftHistory, // Array is fine
            pickNicknames: pickNicknames, // Object is fine
            isDraftStarted: isDraftStarted,
            isDraftComplete: isDraftComplete,
            draftTimerDuration: draftTimerDuration,

            // Fearless State
            globallyDisabledChampions: Array.from(globallyDisabledChampions), // Convert Set to Array
            globalBanHistory: globalBanHistory, // Array is fine

             // Filters/UI state (optional but helpful)
             currentRoleFilter: currentRoleFilter,
             isPriorityFilterActive: isPriorityFilterActive,
             championSearchValue: championSearch.value,
        };
        console.log("Gathered state:", state);
        return state;
    }

    function applyState(state) {
        console.log("Applying loaded state:", state);
        if (!state || state.version !== 1) {
             console.error("Invalid or incompatible state data.");
             showStatusMessage("Ошибка: Неверный формат сохраненных данных.", 3000);
             return;
        }

        try {
            // Restore Team Info
            blueTeamNameH2.textContent = state.blueTeamName || 'Синяя Команда';
            redTeamNameH2.textContent = state.redTeamName || 'Красная Команда';
            blueScoreEl.textContent = state.blueScore || '';
            redScoreEl.textContent = state.redScore || '';

            // Restore Draft State Variables
            currentStep = state.currentStep || 0;
            selectedChampions = new Set(state.selectedChampions || []);
            draftHistory = state.draftHistory || [];
            pickNicknames = state.pickNicknames || {}; // Restore nicknames state
            isDraftStarted = state.isDraftStarted || false;
            isDraftComplete = state.isDraftComplete || false;
            draftTimerDuration = state.draftTimerDuration || 30;

            // Restore Fearless State
            globallyDisabledChampions = new Set(state.globallyDisabledChampions || []);
            globalBanHistory = state.globalBanHistory || [];

            // Restore Filters/UI
            currentRoleFilter = state.currentRoleFilter || 'All';
             isPriorityFilterActive = state.isPriorityFilterActive || false;
             championSearch.value = state.championSearchValue || '';


            // --- Update UI based on loaded state ---
            // 1. Clear all slots first
            document.querySelectorAll('.pick-slot, .ban-slot').forEach(slot => {
                restoreSlotPlaceholder(slot, slot.id, ''); // Clear with empty nickname initially
            });

             // 2. Refill slots based on history and stored nicknames
             draftHistory.forEach(action => {
                 const champ = getChampionById(action.championId);
                 const slotElement = document.getElementById(action.slotId);
                 if (champ && slotElement) {
                      // Get the nickname specifically stored for this slot *from the loaded state*
                      const nicknameForSlot = pickNicknames[action.slotId] || '';
                      fillSlot(slotElement, champ, action.type, nicknameForSlot);
                 }
             });
             // After filling based on history, ensure any empty pick slots have their stored nickname applied
             Object.keys(pickNicknames).forEach(slotId => {
                 if (slotId.includes('-pick-') && !getSlotChampionId(slotId)) { // If it's a pick slot AND empty
                     const slotElement = document.getElementById(slotId);
                     const nicknameInput = slotElement ? slotElement.querySelector('.nickname-input') : null;
                     if (nicknameInput) {
                          nicknameInput.textContent = pickNicknames[slotId];
                     }
                 }
             });


             // 3. Update filter button states
             filterButtons.forEach(btn => {
                 btn.classList.toggle('active', btn.dataset.role === currentRoleFilter);
             });
             priorityFilterButton.classList.toggle('active', isPriorityFilterActive);
             priorityFilterButton.setAttribute('aria-pressed', isPriorityFilterActive.toString());
             priorityFilterButton.title = isPriorityFilterActive ? 'Показать всех чемпионов' : 'Показать только приоритетных чемпионов';

             // 4. Reset timer display based on loaded state
             if (isDraftStarted && !isDraftComplete) {
                 // If draft was in progress, reset timer to full duration, but don't start automatically
                  stopTimer();
                  timerSeconds = draftTimerDuration;
                  timerDisplay.textContent = formatTime(timerSeconds);
                  timerDisplay.disabled = true; // Keep disabled until confirmed action? Or allow restart? Let's allow restart.
                  timerDisplay.disabled = false;
                  timerDisplay.classList.add('timer-disabled'); // Style as ready to restart timer
                  timerDisplay.title = 'Продолжить драфт (Начать таймер)';
             } else {
                  resetTimerDisplay(); // Reset to default if not started or already complete
             }

             // 5. Final UI update calls
             displayGloballyBanned();
             updateChampionAvailability(); // Crucial to apply loaded selections/bans
             filterChampions(); // Apply search/role filters
             updateDraftUI(); // Set button states, highlights etc. based on loaded state

             showStatusMessage("Состояние драфта успешно загружено.", 2000);

        } catch (error) {
            console.error("Error applying state:", error);
            showStatusMessage("Ошибка при загрузке состояния.", 3000);
            resetDraftFull(); // Attempt a full reset on critical load error
        }
    }


    function handleSaveDraft() {
        try {
            const state = gatherCurrentState();
            const jsonState = JSON.stringify(state);
            localStorage.setItem('lolDraftState', jsonState);
            showStatusMessage("Состояние драфта сохранено.", 2000);
            console.log("Draft state saved to localStorage.");
        } catch (error) {
            console.error("Error saving draft state:", error);
            showStatusMessage("Ошибка сохранения состояния.", 3000);
        }
    }

    function handleLoadDraft() {
        try {
            const jsonState = localStorage.getItem('lolDraftState');
            if (jsonState) {
                 if (!confirm("Загрузить сохраненное состояние? Текущий прогресс будет потерян.")) {
                      return;
                 }
                const state = JSON.parse(jsonState);
                // Check if DDragon version matches? Optional.
                // if (state.ddragonVersion && state.ddragonVersion !== ddragonVersion) {
                //     if (!confirm(`Сохранение сделано с версией ${state.ddragonVersion}, текущая ${ddragonVersion}. Все равно загрузить?`)) {
                //         return;
                //     }
                // }
                applyState(state);
            } else {
                showStatusMessage("Нет сохраненных данных.", 2000);
            }
        } catch (error) {
            console.error("Error loading draft state:", error);
            showStatusMessage("Ошибка загрузки: Неверный формат данных.", 3000);
             localStorage.removeItem('lolDraftState'); // Clear corrupted data
        }
    }

    // --- Copy Summary Function ---
    function formatDraftSummary() {
        let summary = "";

        const blueName = blueTeamNameH2.textContent.trim();
        const redName = redTeamNameH2.textContent.trim();
        const blueScore = blueScoreEl.textContent.trim() || '0';
        const redScore = redScoreEl.textContent.trim() || '0';

        summary += `**${blueName} (${blueScore}) vs ${redName} (${redScore})**\n\n`;

        // Bans
        summary += "**Баны:**\n";
        summary += `* ${blueName}: `;
        const blueBans = [];
        for (let i = 1; i <= 5; i++) {
             const banSlot = document.getElementById(`blue-ban-${i}`);
             const img = banSlot ? banSlot.querySelector('img') : null;
             blueBans.push(img ? img.alt : 'Нет бана');
        }
        summary += blueBans.join(', ') + '\n';

        summary += `* ${redName}: `;
        const redBans = [];
        for (let i = 1; i <= 5; i++) {
             const banSlot = document.getElementById(`red-ban-${i}`);
             const img = banSlot ? banSlot.querySelector('img') : null;
             redBans.push(img ? img.alt : 'Нет бана');
        }
        summary += redBans.join(', ') + '\n\n';

        // Picks
        summary += "**Пики:**\n";
        summary += `* ${blueName}:\n`;
        for (let i = 1; i <= 5; i++) {
             const pickSlotId = `blue-pick-${i}`;
             const champId = getSlotChampionId(pickSlotId);
             const champ = getChampionById(champId);
             const nick = pickNicknames[pickSlotId] || `Игрок ${i}`;
             summary += `    - ${nick}: ${champ ? champ.name : 'Нет пика'}\n`;
        }

        summary += `* ${redName}:\n`;
        for (let i = 1; i <= 5; i++) {
             const pickSlotId = `red-pick-${i}`;
             const champId = getSlotChampionId(pickSlotId);
             const champ = getChampionById(champId);
             const nick = pickNicknames[pickSlotId] || `Игрок ${i}`;
             summary += `    - ${nick}: ${champ ? champ.name : 'Нет пика'}\n`;
        }

        // Optional: Global Bans for next game
        if (globalBanHistory.length > 0 && isDraftComplete) {
             summary += "\n**Заблокировано для следующей игры (Fearless):**\n";
             const globalBansList = globalBanHistory.map(ban => {
                  const champ = getChampionById(ban.championId);
                  return champ ? champ.name : 'Неизвестный';
             });
             summary += globalBansList.join(', ');
        }


        return summary;
    }

    async function handleCopySummary() {
        if (!navigator.clipboard) {
            showStatusMessage("Копирование не поддерживается вашим браузером.", 3000);
            return;
        }
        try {
            const summary = formatDraftSummary();
            await navigator.clipboard.writeText(summary);
            showStatusMessage("Итоги драфта скопированы!", 1500);
        } catch (err) {
            console.error('Failed to copy summary: ', err);
            showStatusMessage("Не удалось скопировать итоги.", 3000);
        }
    }


    // --- Initialization ---
    async function initializeApp() {
        // 1. Load Data
        const dataLoaded = await loadChampionData();

        // 2. If data failed, stop initialization
        if (!dataLoaded) {
            // Error message already shown by loadChampionData
            return;
        }

        // 3. Data loaded successfully, proceed
        loadingIndicator.classList.add('hidden'); // Hide loading indicator
        mainLayout.classList.remove('hidden'); // Show main layout

        // 4. Display Champions & Set Initial State
        displayChampions(); // Populate the grid

        // 5. Try to load saved state, otherwise start fresh
        const savedStateJSON = localStorage.getItem('lolDraftState');
        if (savedStateJSON) {
             console.log("Found saved state. Applying...");
             try {
                 const savedState = JSON.parse(savedStateJSON);
                 applyState(savedState); // Apply the loaded state
             } catch (e) {
                  console.error("Failed to parse or apply saved state:", e);
                  localStorage.removeItem('lolDraftState'); // Clear corrupted state
                  resetDraftFull(); // Start fresh if load fails
             }
        } else {
             console.log("No saved state found. Starting fresh.");
              // Initial full reset to set defaults (without confirmation)
              currentStep = 0; selectedChampions.clear(); draftHistory = []; pickNicknames = {}; globallyDisabledChampions.clear(); globalBanHistory = []; isDraftComplete = false; isDraftStarted = false; previewedChampion = null; confirmPickBanButton.disabled = true; deselectSwapSlots(); stopTimer(); draftTimerDuration = 30; resetTimerDisplay();
              document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => { restoreSlotPlaceholder(slot, slot.id, ''); slot.classList.remove('highlight-action', 'preview-flash'); });
              if (blueTeamNameH2) blueTeamNameH2.textContent = 'Синяя Команда'; if (redTeamNameH2) redTeamNameH2.textContent = 'Красная Команда'; if (blueScoreEl) blueScoreEl.textContent = ''; if (redScoreEl) redScoreEl.textContent = '';
              blueColumn.classList.add('draft-disabled'); redColumn.classList.add('draft-disabled'); championSearch.value = ''; currentRoleFilter = 'All'; filterButtons.forEach(btn => { btn.classList.toggle('active', btn.dataset.role === 'All'); }); isPriorityFilterActive = false; if (priorityFilterButton) { priorityFilterButton.classList.remove('active'); priorityFilterButton.title = 'Показать только приоритетных чемпионов'; priorityFilterButton.setAttribute('aria-pressed', 'false'); }
              displayGloballyBanned(); updateChampionAvailability(); filterChampions(); updateDraftUI();
        }


        // 6. Attach Event Listeners
        timerDisplay.addEventListener('click', handleStartDraft);
        resetButton.addEventListener('click', resetDraftFull); // Full reset button
        clearPicksButton.addEventListener('click', resetCurrentGamePicksBans); // Clear current game button
        undoButton.addEventListener('click', handleUndo);
        swapButton.addEventListener('click', handleSwapTeams);
        toggleTimerButton.addEventListener('click', handleToggleTimer);
        confirmPickBanButton.addEventListener('click', handleConfirmPickBan);
        priorityFilterButton.addEventListener('click', handlePriorityFilterToggle);
        nextDraftButton.addEventListener('click', handleNextDraft);
        saveDraftButton.addEventListener('click', handleSaveDraft);
        loadDraftButton.addEventListener('click', handleLoadDraft);
        copySummaryButton.addEventListener('click', handleCopySummary);

        championSearch.addEventListener('input', debouncedFilter); // Use debounced filter

        filterButtons.forEach(button => {
            if (button) button.addEventListener('click', handleRoleFilterClick);
        });

        // Event delegation for pick slots (better performance than individual listeners)
        blueColumn.addEventListener('click', handlePickContainerClick);
        redColumn.addEventListener('click', handlePickContainerClick);

         // Add listeners for editable content blur to potentially trim whitespace
         [blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl].forEach(el => {
             if (el) {
                 el.addEventListener('blur', (e) => {
                      // Simple trim, could add more validation (e.g., numbers only for score)
                     e.target.textContent = e.target.textContent.trim();
                 });
                 // Prevent enter key for single-line fields
                 el.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        e.target.blur();
                    }
                 });
             }
         });


        console.log("Draft simulator initialized successfully.");

    }

    // Start the application
    initializeApp();

}); // End DOMContentLoaded