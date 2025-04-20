// script.js
// Wrap entire script in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded. Initializing App...");

    // --- Page Elements ---
    const homePage = document.getElementById('homePage');
    const draftPage = document.getElementById('draftPage');
    const adminButton = document.getElementById('adminButton');

    // --- Draft Simulator Global Elements (will be assigned in initializeAppDraft) ---
    let loadingIndicator, mainLayout, championGridElement, startButton, resetButton, undoButton, timerDisplay, championSearch, bluePicksContainer, redPicksContainer, blueColumn, redColumn, swapButton, clearPicksButton, toggleTimerButton, filterButtons, confirmPickBanButton, priorityFilterButton, nextDraftButton, globallyBannedDisplay, globalBansBlueContainer, globalBansRedContainer, championTooltip, statusMessage, blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl, returnHomeButton;

    // --- State Variables ---
    let currentPage = 'home'; // Start on home page
    let isDraftInitialized = false; // Track if draft simulator JS has run
    // Draft specific state variables (will be managed within initializeAppDraft and its functions)
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
    let isPriorityFilterActive = false;
    let statusTimeout = null;
    let globallyDisabledChampions = new Set();
    let globalBanHistory = [];

    // --- Data (Copied from v3.7) ---
    const championRolesMap = { 'Aatrox': ['Top'], 'Ahri': ['Mid'], 'Akali': ['Mid', 'Top'], 'Akshan': ['Mid', 'Top'], 'Alistar': ['Support'], 'Amumu': ['Jungle', 'Support'], 'Anivia': ['Mid'], 'Annie': ['Mid', 'Support'], 'Aphelios': ['ADC'], 'Ashe': ['ADC', 'Support'], 'AurelionSol': ['Mid'], 'Azir': ['Mid'], 'Bard': ['Support'], 'Belveth': ['Jungle'], 'Blitzcrank': ['Support'], 'Brand': ['Support', 'Mid', 'Jungle'], 'Braum': ['Support'], 'Briar': ['Jungle'], 'Caitlyn': ['ADC'], 'Camille': ['Top'], 'Cassiopeia': ['Top', 'Mid'], 'Chogath': ['Top', 'Mid'], 'Corki': ['Mid', 'ADC'], 'Darius': ['Top', 'Jungle'], 'Diana': ['Jungle', 'Mid'], 'DrMundo': ['Top', 'Jungle'], 'Draven': ['ADC'], 'Ekko': ['Jungle', 'Mid'], 'Elise': ['Jungle'], 'Evelynn': ['Jungle'], 'Ezreal': ['ADC'], 'Fiddlesticks': ['Jungle'], 'Fiora': ['Top'], 'Fizz': ['Mid'], 'Galio': ['Mid', 'Support'], 'Gangplank': ['Top'], 'Garen': ['Top'], 'Gnar': ['Top'], 'Gragas': ['Jungle', 'Top', 'Mid', 'Support'], 'Graves': ['Jungle'], 'Gwen': ['Top', 'Jungle'], 'Hecarim': ['Jungle'], 'Heimerdinger': ['Top', 'Mid', 'Support'], 'Hwei': ['Mid', 'Support'], 'Illaoi': ['Top'], 'Irelia': ['Top', 'Mid'], 'Ivern': ['Jungle', 'Support'], 'Janna': ['Support'], 'JarvanIV': ['Jungle'], 'Jax': ['Top', 'Jungle'], 'Jayce': ['Top', 'Mid'], 'Jhin': ['ADC'], 'Jinx': ['ADC'], 'Kaisa': ['ADC'], 'Kalista': ['ADC'], 'Karma': ['Support', 'Mid'], 'Karthus': ['Jungle', 'Mid'], 'Kassadin': ['Mid'], 'Katarina': ['Mid'], 'Kayle': ['Top', 'Mid'], 'Kayn': ['Jungle'], 'Kennen': ['Top', 'Mid'], 'Khazix': ['Jungle'], 'Kindred': ['Jungle'], 'Kled': ['Top', 'Mid'], 'KogMaw': ['ADC'], 'KSante': ['Top'], 'Leblanc': ['Mid'], 'LeeSin': ['Jungle'], 'Leona': ['Support'], 'Lillia': ['Jungle'], 'Lissandra': ['Mid'], 'Lucian': ['ADC'], 'Lulu': ['Support'], 'Lux': ['Mid', 'Support'], 'Malphite': ['Top', 'Support', 'Mid'], 'Malzahar': ['Mid'], 'Maokai': ['Jungle', 'Support'], 'MasterYi': ['Jungle'], 'Milio': ['Support'], 'MissFortune': ['ADC'], 'Mordekaiser': ['Top', 'Jungle'], 'Morgana': ['Support', 'Mid', 'Jungle'], 'Naafiri': ['Jungle', 'Mid'], 'Nami': ['Support'], 'Nasus': ['Top'], 'Nautilus': ['Support'], 'Neeko': ['Mid', 'Support'], 'Nidalee': ['Jungle'], 'Nilah': ['ADC'], 'Nocturne': ['Jungle'], 'Nunu': ['Jungle'], 'Olaf': ['Top', 'Jungle'], 'Orianna': ['Mid'], 'Ornn': ['Top'], 'Pantheon': ['Top', 'Mid', 'Support', 'Jungle'], 'Poppy': ['Top', 'Jungle', 'Support'], 'Pyke': ['Support', 'Mid'], 'Qiyana': ['Jungle', 'Mid'], 'Quinn': ['Top', 'Mid'], 'Rakan': ['Support'], 'Rammus': ['Jungle'], 'RekSai': ['Jungle'], 'Rell': ['Support', 'Jungle'], 'Renata': ['Support'], 'Renekton': ['Top'], 'Rengar': ['Jungle', 'Top'], 'Riven': ['Top'], 'Rumble': ['Top', 'Mid', 'Jungle'], 'Ryze': ['Top', 'Mid'], 'Samira': ['ADC'], 'Sejuani': ['Jungle'], 'Senna': ['Support', 'ADC'], 'Seraphine': ['Support', 'Mid', 'ADC'], 'Sett': ['Top', 'Support'], 'Shaco': ['Jungle', 'Support'], 'Shen': ['Top', 'Support'], 'Shyvana': ['Jungle'], 'Singed': ['Top'], 'Sion': ['Top', 'Mid'], 'Sivir': ['ADC'], 'Skarner': ['Jungle', 'Top'], 'Smolder': ['ADC', 'Mid'], 'Sona': ['Support'], 'Soraka': ['Support'], 'Swain': ['Support', 'Mid', 'ADC'], 'Sylas': ['Mid', 'Jungle'], 'Syndra': ['Mid'], 'TahmKench': ['Top', 'Support'], 'Taliyah': ['Jungle', 'Mid'], 'Talon': ['Jungle', 'Mid'], 'Taric': ['Support'], 'Teemo': ['Top'], 'Thresh': ['Support'], 'Tristana': ['ADC', 'Mid'], 'Trundle': ['Top', 'Jungle'], 'Tryndamere': ['Top'], 'TwistedFate': ['Mid', 'ADC'], 'Twitch': ['ADC', 'Jungle'], 'Udyr': ['Jungle', 'Top'], 'Urgot': ['Top'], 'Varus': ['ADC', 'Mid'], 'Vayne': ['ADC', 'Top'], 'Veigar': ['Mid', 'ADC', 'Support'], 'Velkoz': ['Mid', 'Support'], 'Vex': ['Mid'], 'Vi': ['Jungle'], 'Viego': ['Jungle'], 'Viktor': ['Mid'], 'Vladimir': ['Top', 'Mid'], 'Volibear': ['Top', 'Jungle'], 'Warwick': ['Jungle', 'Top'], 'MonkeyKing': ['Top', 'Jungle'], 'Xayah': ['ADC'], 'Xerath': ['Mid', 'Support'], 'XinZhao': ['Jungle'], 'Yasuo': ['Mid', 'Top', 'ADC'], 'Yone': ['Top', 'Mid'], 'Yorick': ['Top', 'Jungle'], 'Yuumi': ['Support'], 'Zac': ['Jungle'], 'Zed': ['Mid', 'Jungle'], 'Zeri': ['ADC'], 'Ziggs': ['Mid', 'ADC', 'Support'], 'Zilean': ['Support', 'Mid'], 'Zoe': ['Mid', 'Support'], 'Zyra': ['Support', 'Jungle', 'Mid'] };
    const priorityChampions = new Set(['Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Annie', 'Ashe', 'AurelionSol', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Corki', 'Darius', 'Diana', 'DrMundo', 'Draven', 'Ekko', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Gwen', 'Hecarim', 'Heimerdinger', 'Irelia', 'Janna', 'JarvanIV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kaisa', 'Kalista', 'Karma', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Khazix', 'Kindred', 'LeeSin', 'Leona', 'Lillia', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Malphite', 'Maokai', 'MasterYi', 'Milio', 'MissFortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Nilah', 'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Pyke', 'Rakan', 'Rammus', 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Samira', 'Senna', 'Seraphine', 'Sett', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Sona', 'Soraka', 'Swain', 'Syndra', 'Talon', 'Teemo', 'Thresh', 'Tristana', 'Tryndamere', 'TwistedFate', 'Twitch', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Vex', 'Vi', 'Viego', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'MonkeyKing', 'Xayah', 'XinZhao', 'Yasuo', 'Yone', 'Yuumi', 'Zac', 'Zed', 'Zeri', 'Ziggs', 'Zoe', 'Zyra', 'Ryze', 'Nocturne', 'Zilean', 'Renata', 'Belveth', 'Naafiri', 'Briar', 'Hwei', 'Smolder']);
    const draftOrder = [ { type: 'ban', team: 'blue', slot: 'blue-ban-1', text: 'Синие: Бан 1' }, { type: 'ban', team: 'red', slot: 'red-ban-1', text: 'Красные: Бан 1' }, { type: 'ban', team: 'blue', slot: 'blue-ban-2', text: 'Синие: Бан 2' }, { type: 'ban', team: 'red', slot: 'red-ban-2', text: 'Красные: Бан 2' }, { type: 'ban', team: 'blue', slot: 'blue-ban-3', text: 'Синие: Бан 3' }, { type: 'ban', team: 'red', slot: 'red-ban-3', text: 'Красные: Бан 3' }, { type: 'pick', team: 'blue', slot: 'blue-pick-1', text: 'Синие: Пик 1' }, { type: 'pick', team: 'red', slot: 'red-pick-1', text: 'Красные: Пик 1' }, { type: 'pick', team: 'red', slot: 'red-pick-2', text: 'Красные: Пик 2' }, { type: 'pick', team: 'blue', slot: 'blue-pick-2', text: 'Синие: Пик 2' }, { type: 'pick', team: 'blue', slot: 'blue-pick-3', text: 'Синие: Пик 3' }, { type: 'pick', team: 'red', slot: 'red-pick-3', text: 'Красные: Пик 3' }, { type: 'ban', team: 'red', slot: 'red-ban-4', text: 'Красные: Бан 4' }, { type: 'ban', team: 'blue', slot: 'blue-ban-4', text: 'Синие: Бан 4' }, { type: 'ban', team: 'red', slot: 'red-ban-5', text: 'Красные: Бан 5' }, { type: 'ban', team: 'blue', slot: 'blue-ban-5', text: 'Синие: Бан 5' }, { type: 'pick', team: 'red', slot: 'red-pick-4', text: 'Красные: Пик 4' }, { type: 'pick', team: 'blue', slot: 'blue-pick-4', text: 'Синие: Пик 4' }, { type: 'pick', team: 'blue', slot: 'blue-pick-5', text: 'Синие: Пик 5' }, { type: 'pick', team: 'red', slot: 'red-pick-5', text: 'Красные: Пик 5' } ];

    // --- Navigation ---
    function navigateTo(pageName) {
        console.log(`navigateTo called with: ${pageName}`);
        currentPage = pageName;

        if(homePage) homePage.classList.add('hidden');
        if(draftPage) draftPage.classList.add('hidden');

        if (pageName === 'home') {
            if(homePage) homePage.classList.remove('hidden');
            console.log("Showing Home Page");
        } else if (pageName === 'draft') {
            if(draftPage) draftPage.classList.remove('hidden');
            console.log("Showing Draft Page");
            if (!isDraftInitialized) {
                console.log("Initializing draft simulator on first navigation...");
                initializeAppDraft(); // Initialize draft logic only when needed
                isDraftInitialized = true;
            } else {
                if(mainLayout) mainLayout.classList.remove('hidden'); // Ensure layout is visible
                console.log("Draft already initialized.");
            }
        }
    }

    // --- Draft Simulator Logic (moved inside initializeAppDraft) ---
    async function initializeAppDraft() {
        console.log("initializeAppDraft started");
        // Get elements specific to the draft page
        loadingIndicator = document.getElementById('loadingIndicator');
        mainLayout = document.getElementById('mainLayout');
        championGridElement = document.getElementById('championGrid');
        startButton = document.getElementById('timerDisplay');
        resetButton = document.getElementById('resetButton');
        undoButton = document.getElementById('undoButton');
        timerDisplay = document.getElementById('timerDisplay');
        championSearch = document.getElementById('championSearch');
        bluePicksContainer = document.querySelector('.blue-picks-container');
        redPicksContainer = document.querySelector('.red-picks-container');
        blueColumn = document.querySelector('.blue-column');
        redColumn = document.querySelector('.red-column');
        swapButton = document.getElementById('swapButton');
        clearPicksButton = document.getElementById('clearPicksButton');
        toggleTimerButton = document.getElementById('toggleTimerButton');
        filterButtons = document.querySelectorAll('#roleFilterButtons .filter-button');
        confirmPickBanButton = document.getElementById('confirmPickBanButton');
        priorityFilterButton = document.getElementById('priorityFilterButton');
        nextDraftButton = document.getElementById('nextDraftButton');
        globallyBannedDisplay = document.getElementById('globallyBannedDisplay');
        globalBansBlueContainer = document.getElementById('global-bans-blue');
        globalBansRedContainer = document.getElementById('global-bans-red');
        championTooltip = document.getElementById('championTooltip');
        statusMessage = document.getElementById('statusMessage');
        blueTeamNameH2 = document.getElementById('blue-team-name-h2');
        redTeamNameH2 = document.getElementById('red-team-name-h2');
        blueScoreEl = document.getElementById('blue-score');
        redScoreEl = document.getElementById('red-score');
        returnHomeButton = document.getElementById('returnHomeButton'); // Get new button

         if (!loadingIndicator || !mainLayout || !championGridElement || !resetButton || !clearPicksButton || !returnHomeButton) {
            console.error("Draft page elements not found during initialization!");
            alert('Ошибка инициализации страницы драфта!');
            return;
        }

        // --- Utility Functions (Draft Specific) ---
        const debounce = (func, wait) => { let timeout; return function executedFunction(...args) { const later = () => { clearTimeout(timeout); func(...args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); }; };
        const showStatusMessage = (message, duration = 3000) => { if (!statusMessage) return; statusMessage.textContent = message; statusMessage.classList.add('visible'); clearTimeout(statusTimeout); statusTimeout = setTimeout(() => { statusMessage.classList.remove('visible'); }, duration); };
        const getChampionById = (id) => processedChampions.find(champ => champ.id === id);

        // --- Data Fetching (Draft Specific) ---
        async function loadChampionData() {
             try {
                 const versionsResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
                 if (!versionsResponse.ok) throw new Error(`Версии: ${versionsResponse.statusText}`);
                 const versions = await versionsResponse.json();
                 ddragonVersion = versions[0];
                 console.log(`Using DDragon version: ${ddragonVersion}`);
                 baseIconUrl = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/`;
                 baseSplashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/`;

                 const dataUrlEn = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/champion.json`;
                 const dataUrlRu = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ru_RU/champion.json`;

                 const [enResponse, ruResponse] = await Promise.all([
                     fetch(dataUrlEn),
                     fetch(dataUrlRu)
                 ]);

                 if (!enResponse.ok) throw new Error(`Данные EN: ${enResponse.statusText}`);
                 allChampionsData.en = (await enResponse.json()).data;

                 if (!ruResponse.ok) {
                     console.warn(`Не удалось загрузить данные RU: ${ruResponse.statusText}. Используются английские имена.`);
                     allChampionsData.ru = null;
                 } else {
                     allChampionsData.ru = (await ruResponse.json()).data;
                 }

                 processedChampions = Object.keys(allChampionsData.en).map(champId => {
                    const enData = allChampionsData.en[champId];
                    const ruData = allChampionsData.ru ? allChampionsData.ru[champId] : null;
                    return {
                        id: enData.id,
                        name: { en: enData.name, ru: ruData ? ruData.name : enData.name },
                        title: { en: enData.title, ru: ruData ? ruData.title : enData.title },
                        roles: championRolesMap[enData.id] || [],
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
                 loadingIndicator.textContent = `Ошибка загрузки! ${error.message}`;
                 mainLayout.classList.add('hidden');
                 return false;
             }
         }


        // --- Timer Functions (Draft Specific) ---
        function stopTimer() { clearInterval(timerInterval); timerInterval = null; if(timerDisplay) timerDisplay.classList.remove('timer-running', 'timer-ending'); }
        function formatTime(seconds) { const minutes = Math.floor(seconds / 60); const remainingSeconds = seconds % 60; return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`; }
        function resetTimerDisplay() { stopTimer(); timerSeconds = draftTimerDuration; if(timerDisplay) { timerDisplay.textContent = formatTime(timerSeconds); timerDisplay.disabled = false; timerDisplay.classList.remove('timer-disabled'); timerDisplay.title = 'Начать драфт'; timerDisplay.setAttribute('aria-label', 'Таймер / Старт драфта'); } }
        function startTimer() {
            stopTimer();
            timerSeconds = draftTimerDuration;
            if (!timerDisplay) return;
            timerDisplay.textContent = formatTime(timerSeconds);
            timerDisplay.disabled = true;
            timerDisplay.classList.add('timer-running', 'timer-disabled');
            timerDisplay.title = 'Драфт идет...';
            timerDisplay.setAttribute('aria-label', `Таймер: ${formatTime(timerSeconds)}`);
            timerInterval = setInterval(() => {
                timerSeconds--;
                timerDisplay.textContent = formatTime(timerSeconds);
                timerDisplay.setAttribute('aria-label', `Таймер: ${formatTime(timerSeconds)}`);
                if (timerSeconds <= 10 && timerSeconds > 0) {
                    timerDisplay.classList.add('timer-ending');
                } else {
                     timerDisplay.classList.remove('timer-ending');
                }
                if (timerSeconds <= 0) {
                    stopTimer();
                    timerDisplay.classList.add('timer-ending');
                    console.log("Timer reached zero!");
                    if (currentStep < draftOrder.length) {
                        const currentAction = draftOrder[currentStep];
                        if (currentAction.type === 'pick') {
                            console.log("Timer ended during PICK phase. Clearing current game.");
                            showStatusMessage("Время вышло! Драфт очищен.", 3000);
                            resetCurrentGamePicksBans(true);
                        } else if (currentAction.type === 'ban') {
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
                    } else {
                         console.log("Timer ended but draft already complete?");
                    }
                }
            }, 1000);
        }


        // --- Draft Logic Functions (Draft Specific) ---
         function createChampionCard(champ) {
            const card = document.createElement('button');
            card.className = 'champion-card';
            card.dataset.championId = champ.id;
            card.dataset.championNameEn = champ.name.en.toLowerCase();
            card.dataset.championNameRu = champ.name.ru.toLowerCase();
            card.dataset.roles = champ.roles.join(',');
            card.setAttribute('role', 'gridcell');
            card.setAttribute('aria-label', champ.name.ru);

            const img = document.createElement('img');
            img.src = champ.iconUrl;
            img.alt = "";
            img.className = 'w-full h-full object-cover block pointer-events-none';
            img.loading = 'lazy';
            img.onerror = () => { img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%234a5568'/%3E%3C/svg%3E`; card.setAttribute('aria-label', `${champ.name.ru} (ошибка загрузки)`); };

            card.appendChild(img);
            card.addEventListener('click', () => handleChampionPreview(champ));
            card.addEventListener('mouseover', (event) => showChampionTooltip(event, champ));
            card.addEventListener('mouseout', hideChampionTooltip);
            card.addEventListener('focus', (event) => showChampionTooltip(event, champ));
            card.addEventListener('blur', hideChampionTooltip);
            return card;
        }

        function displayChampions() { if(!championGridElement) return; const fragment = document.createDocumentFragment(); processedChampions.forEach(champ => { fragment.appendChild(createChampionCard(champ)); }); championGridElement.innerHTML = ''; championGridElement.appendChild(fragment); filterChampions(); }
        function updateDraftUI() {
            if (!isDraftInitialized) return;
            document.querySelectorAll('.pick-slot, .ban-slot').forEach(el => { el.classList.remove('highlight-action', 'preview-flash', 'swap-selected'); });
            previewedChampion = null;
            if(confirmPickBanButton) confirmPickBanButton.disabled = true;

            const elementsToCheck = [blueColumn, redColumn, nextDraftButton, timerDisplay, swapButton, clearPicksButton, toggleTimerButton, priorityFilterButton, resetButton, undoButton];
             if (elementsToCheck.some(el => !el)) {
                 console.error("One or more UI elements missing in updateDraftUI. Aborting update.");
                 return;
             }

            if (!isDraftStarted) {
                resetTimerDisplay();
                blueColumn.classList.add('draft-disabled');
                redColumn.classList.add('draft-disabled');
                nextDraftButton.disabled = true;
                timerDisplay.disabled = false;
                swapButton.disabled = false;
                clearPicksButton.disabled = draftHistory.length === 0 && Object.keys(pickNicknames).length === 0 && selectedChampions.size === 0;
                toggleTimerButton.disabled = false;
                priorityFilterButton.disabled = false;
                resetButton.disabled = false;
            } else if (currentStep < draftOrder.length) {
                isDraftComplete = false;
                const action = draftOrder[currentStep];
                const activeSlot = document.getElementById(action.slot);
                if (activeSlot) {
                    activeSlot.classList.add('highlight-action');
                    const isConfirmed = draftHistory.some(entry => entry.slotId === action.slot);
                    if (!isConfirmed) {
                        const currentNickname = pickNicknames[action.slot] || '';
                        restoreSlotPlaceholder(activeSlot, action.slot, currentNickname);
                    }
                }
                if (!timerInterval) startTimer();
                nextDraftButton.disabled = true;
                timerDisplay.disabled = true;
                swapButton.disabled = true;
                toggleTimerButton.disabled = true;
                priorityFilterButton.disabled = true;
                clearPicksButton.disabled = false;
                resetButton.disabled = false;
            } else {
                isDraftComplete = true;
                stopTimer();
                timerDisplay.textContent = "Драфт Завершен!";
                timerDisplay.classList.add('timer-disabled');
                timerDisplay.disabled = true;
                timerDisplay.title = 'Драфт завершен';
                blueColumn.classList.remove('draft-disabled');
                redColumn.classList.remove('draft-disabled');
                nextDraftButton.disabled = false;
                swapButton.disabled = false;
                clearPicksButton.disabled = false;
                toggleTimerButton.disabled = true;
                priorityFilterButton.disabled = true;
                resetButton.disabled = false;
            }
            undoButton.disabled = draftHistory.length === 0 || !isDraftStarted;
            updateChampionAvailability();
            displayGloballyBanned();
            document.querySelectorAll('.pick-slot').forEach(slot => {
                const champId = getSlotChampionId(slot.id);
                slot.style.cursor = isDraftComplete && champId ? 'pointer' : 'default';
                slot.title = isDraftComplete && champId ? 'Нажмите для выбора обмена' : '';
            });
        }
        function updateChampionAvailability() { if (!isDraftInitialized) return; const combinedDisabled = new Set([...selectedChampions, ...globallyDisabledChampions]); document.querySelectorAll('.champion-card').forEach(card => { const champId = card.dataset.championId; const isDisabled = combinedDisabled.has(champId); const isSelected = selectedChampions.has(champId); card.classList.toggle('selected', isSelected); card.classList.toggle('disabled', isDisabled); card.disabled = isDisabled; card.setAttribute('aria-disabled', isDisabled.toString()); }); }
        function handleChampionPreview(champion) { if (!isDraftStarted || isDraftComplete || currentStep >= draftOrder.length) return; const isDisabled = selectedChampions.has(champion.id) || globallyDisabledChampions.has(champion.id); if (isDisabled) { showStatusMessage(`${champion.name.ru} уже выбран или заблокирован.`, 2000); return; } const currentAction = draftOrder[currentStep]; const slotElement = document.getElementById(currentAction.slot); if (slotElement) { document.querySelectorAll('.preview-flash').forEach(el => el.classList.remove('preview-flash')); previewedChampion = champion; const existingNickname = pickNicknames[currentAction.slot] || ''; fillSlot(slotElement, champion, currentAction.type, existingNickname); slotElement.classList.add('preview-flash'); confirmPickBanButton.disabled = false; } }
        function handleConfirmPickBan() { if (!previewedChampion || !isDraftStarted || isDraftComplete || currentStep >= draftOrder.length) return; const championToConfirm = previewedChampion; const currentAction = draftOrder[currentStep]; const slotElement = document.getElementById(currentAction.slot); const isDisabled = selectedChampions.has(championToConfirm.id) || globallyDisabledChampions.has(championToConfirm.id); if (!slotElement || isDisabled) { console.warn("Confirmation failed: Slot not found or champion unavailable."); previewedChampion = null; confirmPickBanButton.disabled = true; if (slotElement) slotElement.classList.remove('preview-flash'); return; } slotElement.classList.remove('preview-flash'); const previousNickname = pickNicknames[currentAction.slot] || ''; selectedChampions.add(championToConfirm.id); draftHistory.push({ championId: championToConfirm.id, slotId: currentAction.slot, step: currentStep, previousNickname: previousNickname, type: currentAction.type, team: currentAction.team }); currentStep++; previewedChampion = null; confirmPickBanButton.disabled = true; resetTimerDisplay(); updateDraftUI(); filterChampions(); console.log(`Confirmed: ${currentAction.type} ${championToConfirm.name.ru} in slot ${currentAction.slot}`); }
        function fillSlot(slotElement, champion, type, nicknameText = '') { if (!slotElement || !champion) return; slotElement.innerHTML = ''; slotElement.classList.remove('preview-flash'); const img = document.createElement('img'); img.src = type === 'pick' ? champion.splashUrl : champion.iconUrl; img.alt = champion.name.ru; img.className = 'w-full h-full object-cover block absolute inset-0 z-0 pointer-events-none'; img.onerror = () => { const errorSpan = document.createElement('span'); errorSpan.className = 'text-[1.5vmin] text-red-400'; errorSpan.textContent = 'Err'; slotElement.innerHTML = ''; slotElement.appendChild(errorSpan); if (type === 'pick') { addNicknameInput(slotElement, nicknameText); } }; slotElement.appendChild(img); if (type === 'pick') { addNicknameInput(slotElement, nicknameText); slotElement.dataset.championId = champion.id; } else { delete slotElement.dataset.championId; } slotElement.setAttribute('aria-label', `${slotElement.ariaLabel.split(':')[0]}: ${champion.name.ru}`); }
        function addNicknameInput(slotElement, text = '') { const nicknameInput = document.createElement('div'); nicknameInput.contentEditable = true; nicknameInput.spellcheck = false; nicknameInput.className = 'nickname-input'; nicknameInput.textContent = text || ''; nicknameInput.dataset.slotId = slotElement.id; nicknameInput.addEventListener('input', (e) => { const slotId = e.target.dataset.slotId; if (slotId) { pickNicknames[slotId] = e.target.textContent.trim(); console.log("Nickname updated:", pickNicknames); } }); nicknameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }); slotElement.appendChild(nicknameInput); }
        function restoreSlotPlaceholder(slotElement, slotId, nicknameText = '') { if (!slotElement) return; slotElement.innerHTML = ''; slotElement.classList.remove('preview-flash', 'swap-selected'); delete slotElement.dataset.championId; slotElement.style.backgroundImage = ''; slotElement.style.cursor = 'default'; slotElement.title = ''; slotElement.setAttribute('aria-label', `${slotElement.ariaLabel.split(':')[0]}: Empty`); if (slotId && slotId.includes('-pick-')) { addNicknameInput(slotElement, nicknameText); pickNicknames[slotId] = nicknameText; } else { delete pickNicknames[slotId]; } }
        function getSlotChampionId(slotId) { const slotElement = document.getElementById(slotId); return slotElement ? slotElement.dataset.championId : null; }
        function handleUndo() { if (draftHistory.length === 0 || !isDraftStarted) return; deselectSwapSlots(); const lastAction = draftHistory.pop(); if (!lastAction) return; currentStep = lastAction.step; selectedChampions.delete(lastAction.championId); const slotElement = document.getElementById(lastAction.slotId); if (slotElement) { restoreSlotPlaceholder(slotElement, lastAction.slotId, lastAction.previousNickname); } isDraftComplete = false; previewedChampion = null; confirmPickBanButton.disabled = true; resetTimerDisplay(); updateDraftUI(); filterChampions(); showStatusMessage("Действие отменено", 1500); console.log("Undo:", lastAction); }

        // --- Reset Functions (Draft Specific) ---
        function resetDraftFull() {
            console.log("resetDraftFull called.");
            console.log("resetDraftFull proceeding (no confirmation)...");

            currentStep = 0; selectedChampions.clear(); draftHistory = []; pickNicknames = {}; globallyDisabledChampions.clear(); globalBanHistory = []; isDraftComplete = false; isDraftStarted = false; previewedChampion = null; confirmPickBanButton.disabled = true; deselectSwapSlots(); stopTimer(); draftTimerDuration = 30; resetTimerDisplay();
            document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => { restoreSlotPlaceholder(slot, slot.id, ''); slot.classList.remove('highlight-action', 'preview-flash'); });
            if (blueTeamNameH2) blueTeamNameH2.textContent = 'Синяя Команда'; if (redTeamNameH2) redTeamNameH2.textContent = 'Красная Команда'; if (blueScoreEl) blueScoreEl.textContent = ''; if (redScoreEl) redScoreEl.textContent = '';
            blueColumn.classList.add('draft-disabled'); redColumn.classList.add('draft-disabled'); championSearch.value = ''; currentRoleFilter = 'All'; filterButtons.forEach(btn => { btn.classList.toggle('active', btn.dataset.role === 'All'); }); isPriorityFilterActive = false; if (priorityFilterButton) { priorityFilterButton.classList.remove('active'); priorityFilterButton.title = 'Показать только приоритетных чемпионов'; priorityFilterButton.setAttribute('aria-pressed', 'false'); }
            displayGloballyBanned(); updateChampionAvailability(); filterChampions(); updateDraftUI();
            localStorage.removeItem('lolDraftState');
            showStatusMessage("Драфт полностью сброшен.", 2000);
        }

        function resetCurrentGamePicksBans(force = false, keepGlobal = false) { // Added keepGlobal parameter
            console.log("resetCurrentGamePicksBans called. isDraftStarted:", isDraftStarted, "isDraftComplete:", isDraftComplete, "force:", force, "keepGlobal:", keepGlobal);
            if (!force && isDraftStarted && !isDraftComplete) {
                if (!confirm("Остановить текущий драфт и очистить пики/баны этой игры" + (keepGlobal ? "?" : " (включая глобальные)?"))) { // Adjust confirm message
                    console.log("resetCurrentGamePicksBans cancelled by user during draft.");
                    return;
                }
            }
            console.log("resetCurrentGamePicksBans proceeding...");

            currentStep = 0;
            selectedChampions.clear();
            draftHistory = [];
            // Conditionally clear global bans
            if (!keepGlobal) {
                globallyDisabledChampions.clear();
                globalBanHistory = [];
                console.log("Global bans cleared.");
            } else {
                 console.log("Keeping global bans for next draft.");
            }


            isDraftComplete = false; isDraftStarted = false; previewedChampion = null; confirmPickBanButton.disabled = true; deselectSwapSlots(); stopTimer(); resetTimerDisplay();
            document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => {
                const currentNickname = pickNicknames[slot.id] || '';
                restoreSlotPlaceholder(slot, slot.id, currentNickname);
                slot.classList.remove('highlight-action', 'preview-flash');
            });
            blueColumn.classList.add('draft-disabled');
            redColumn.classList.add('draft-disabled');
            displayGloballyBanned(); // Update display based on potentially persisted global bans
            updateChampionAvailability();
            filterChampions();
            updateDraftUI();
            showStatusMessage(keepGlobal ? "Текущая игра очищена." : "Пики/баны текущей игры (включая глобальные) очищены.", 2000);
        }


        // --- Other Handlers (Draft Specific) ---
        function handleStartDraft() { if (!isDraftStarted) { console.log("Starting draft..."); isDraftStarted = true; blueColumn.classList.remove('draft-disabled'); redColumn.classList.remove('draft-disabled'); updateDraftUI(); } }
        const debouncedFilter = debounce(() => { filterChampions(); }, 250);
        function filterChampions() {
            const searchTerm = championSearch.value.toLowerCase().trim();
            let visibleCount = 0;
            document.querySelectorAll('.champion-card').forEach(card => {
                const champId = card.dataset.championId;
                const nameEn = card.dataset.championNameEn || '';
                const nameRu = card.dataset.championNameRu || '';
                const champRoles = card.dataset.roles ? card.dataset.roles.split(',') : [];

                const searchMatch = nameEn.includes(searchTerm) || nameRu.includes(searchTerm) || champId.toLowerCase().includes(searchTerm);
                const roleMatch = currentRoleFilter === 'All' || champRoles.includes(currentRoleFilter);
                const isPriority = priorityChampions.has(champId);
                const hideByPriorityFilter = isPriorityFilterActive && !isPriority;

                const isVisible = searchMatch && roleMatch && !hideByPriorityFilter;

                card.style.display = isVisible ? 'flex' : 'none';
                if (isVisible) visibleCount++;

                const isDisabled = selectedChampions.has(champId) || globallyDisabledChampions.has(champId);
                card.classList.toggle('disabled', isDisabled);
                card.disabled = isDisabled;
                card.setAttribute('aria-disabled', isDisabled.toString());
                card.classList.toggle('selected', selectedChampions.has(champId));
            });
        }
        function deselectSwapSlots() { if (selectedSwapSlotId) { const prevSelected = document.getElementById(selectedSwapSlotId); if (prevSelected) { prevSelected.classList.remove('swap-selected'); } selectedSwapSlotId = null; } }
        function handlePickContainerClick(event) { if (event.target.classList.contains('nickname-input')) { return; } const clickedSlot = event.target.closest('.pick-slot'); if (!isDraftComplete || !clickedSlot || !clickedSlot.dataset.championId) { deselectSwapSlots(); return; } const clickedSlotId = clickedSlot.id; if (!selectedSwapSlotId) { selectedSwapSlotId = clickedSlotId; clickedSlot.classList.add('swap-selected'); console.log("Swap select:", selectedSwapSlotId); } else { if (selectedSwapSlotId === clickedSlotId) { deselectSwapSlots(); console.log("Swap deselect"); } else { const firstSlot = document.getElementById(selectedSwapSlotId); if (!firstSlot) { deselectSwapSlots(); return; } const team1 = selectedSwapSlotId.startsWith('blue') ? 'blue' : 'red'; const team2 = clickedSlotId.startsWith('blue') ? 'blue' : 'red'; if (team1 === team2) { console.log("Attempting swap between:", selectedSwapSlotId, clickedSlotId); const champId1 = firstSlot.dataset.championId; const champId2 = clickedSlot.dataset.championId; const champ1 = getChampionById(champId1); const champ2 = getChampionById(champId2); const nick1 = pickNicknames[selectedSwapSlotId] || ''; const nick2 = pickNicknames[clickedSlotId] || ''; pickNicknames[selectedSwapSlotId] = nick2; pickNicknames[clickedSlotId] = nick1; if (champ1 && champ2) { fillSlot(firstSlot, champ2, 'pick', nick2); fillSlot(clickedSlot, champ1, 'pick', nick1); showStatusMessage(`Обмен: ${champ1.name.ru} <-> ${champ2.name.ru}`, 2000); } deselectSwapSlots(); } else { console.log("Swap select (different team):", clickedSlotId); deselectSwapSlots(); selectedSwapSlotId = clickedSlotId; clickedSlot.classList.add('swap-selected'); } } } }
        function handleSwapTeams() { try { const tempName = blueTeamNameH2.textContent; blueTeamNameH2.textContent = redTeamNameH2.textContent; redTeamNameH2.textContent = tempName; const tempScore = blueScoreEl.textContent; blueScoreEl.textContent = redScoreEl.textContent; redScoreEl.textContent = tempScore; /* Swap global bans */ console.log("Swapping global ban history teams..."); globalBanHistory.forEach(ban => { ban.team = ban.team === 'blue' ? 'red' : 'blue'; }); displayGloballyBanned(); /* End swap global bans */ if (isDraftComplete) { console.log("Swapping picks/bans/nicknames after draft completion..."); const newPickNicknames = {}; const newSelectedChampions = new Set(); const newBluePicks = []; const newRedPicks = []; for (let i = 1; i <= 5; i++) { const blueBan = document.getElementById(`blue-ban-${i}`); const redBan = document.getElementById(`red-ban-${i}`); if (blueBan && redBan) { const tempHTML = blueBan.innerHTML; blueBan.innerHTML = redBan.innerHTML; redBan.innerHTML = tempHTML; const tempAria = blueBan.getAttribute('aria-label'); blueBan.setAttribute('aria-label', redBan.getAttribute('aria-label')); redBan.setAttribute('aria-label', tempAria); } } for (let i = 1; i <= 5; i++) { const blueSlotId = `blue-pick-${i}`; const redSlotId = `red-pick-${i}`; const blueChampId = getSlotChampionId(blueSlotId); const redChampId = getSlotChampionId(redSlotId); const blueNick = pickNicknames[blueSlotId] || ''; const redNick = pickNicknames[redSlotId] || ''; newPickNicknames[blueSlotId] = redNick; newPickNicknames[redSlotId] = blueNick; if(redChampId) newBluePicks.push({ slotId: blueSlotId, champId: redChampId, nick: redNick }); if(blueChampId) newRedPicks.push({ slotId: redSlotId, champId: blueChampId, nick: blueNick }); } pickNicknames = newPickNicknames; document.querySelectorAll('.pick-slot').forEach(slot => restoreSlotPlaceholder(slot, slot.id, '')); newBluePicks.forEach(p => { const champ = getChampionById(p.champId); if(champ) fillSlot(document.getElementById(p.slotId), champ, 'pick', p.nick); newSelectedChampions.add(p.champId); }); newRedPicks.forEach(p => { const champ = getChampionById(p.champId); if(champ) fillSlot(document.getElementById(p.slotId), champ, 'pick', p.nick); newSelectedChampions.add(p.champId); }); selectedChampions = newSelectedChampions; deselectSwapSlots(); showStatusMessage("Команды поменялись местами (пики/баны/ники/глоб. баны).", 2000); } else if (!isDraftStarted) { console.log("Swapping nicknames before draft starts..."); const swappedNicks = {}; for (let i = 1; i <= 5; i++) { const blueSlotId = `blue-pick-${i}`; const redSlotId = `red-pick-${i}`; const blueNick = pickNicknames[blueSlotId] || ''; const redNick = pickNicknames[redSlotId] || ''; swappedNicks[blueSlotId] = redNick; swappedNicks[redSlotId] = blueNick; const blueNickInput = document.querySelector(`#${blueSlotId} .nickname-input`); const redNickInput = document.querySelector(`#${redSlotId} .nickname-input`); if (blueNickInput) blueNickInput.textContent = redNick; if (redNickInput) redNickInput.textContent = blueNick; } pickNicknames = swappedNicks; deselectSwapSlots(); showStatusMessage("Команды поменялись местами (ники/глоб. баны).", 2000); } else { console.warn("Attempted to swap teams during an active draft. Only names/scores/global bans swapped."); showStatusMessage("Нельзя менять пики/баны во время драфта.", 2000); } updateChampionAvailability(); } catch (error) { console.error("Error in handleSwapTeams:", error); showStatusMessage("Ошибка при смене команд.", 3000); } }
        function handleToggleTimer() { if (isDraftStarted) return; draftTimerDuration = draftTimerDuration === 30 ? 45 : 30; resetTimerDisplay(); toggleTimerButton.title = `Сменить время таймера (${draftTimerDuration === 30 ? '-> 45с' : '-> 30с'})`; showStatusMessage(`Время таймера: ${draftTimerDuration} сек.`, 1500); console.log("Timer duration set to:", draftTimerDuration); }
        function handleRoleFilterClick(event) { const clickedButton = event.currentTarget; if (!clickedButton) return; currentRoleFilter = clickedButton.dataset.role; filterButtons.forEach(btn => btn.classList.remove('active')); clickedButton.classList.add('active'); filterChampions(); }
        function handlePriorityFilterToggle() {
            isPriorityFilterActive = !isPriorityFilterActive;
            priorityFilterButton.classList.toggle('active', isPriorityFilterActive);
            priorityFilterButton.setAttribute('aria-pressed', isPriorityFilterActive.toString());
            priorityFilterButton.title = isPriorityFilterActive ? 'Показать всех чемпионов' : 'Показать только приоритетных чемпионов';
            console.log('Priority filter active:', isPriorityFilterActive);
            filterChampions();
            // Add status message
            showStatusMessage("Переключение списка чемпионов между LoL и Wild Rift.", 2000);
        }
        function displayGloballyBanned() { if (!globalBansBlueContainer || !globalBansRedContainer || !globallyBannedDisplay) return; globalBansBlueContainer.innerHTML = ''; globalBansRedContainer.innerHTML = ''; if (globalBanHistory.length > 0) { globallyBannedDisplay.classList.remove('hidden'); const blueFragment = document.createDocumentFragment(); const redFragment = document.createDocumentFragment(); globalBanHistory.forEach(banInfo => { const champ = getChampionById(banInfo.championId); if (champ) { const iconDiv = document.createElement('div'); iconDiv.className = 'global-ban-icon'; const banTeamText = banInfo.team === 'blue' ? 'синими' : 'красными'; iconDiv.title = `${champ.name.ru} (Заблокирован ${banTeamText} в пред. игре)`; iconDiv.setAttribute('aria-label', iconDiv.title); const img = document.createElement('img'); img.src = champ.iconUrl; img.alt = ""; img.loading = 'lazy'; img.onerror = () => { img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%234a5568'/%3E%3C/svg%3E`; }; iconDiv.appendChild(img); if (banInfo.team === 'blue') { blueFragment.appendChild(iconDiv); } else { redFragment.appendChild(iconDiv); } } }); globalBansBlueContainer.appendChild(blueFragment); globalBansRedContainer.appendChild(redFragment); } else { globallyBannedDisplay.classList.add('hidden'); } }
        function handleNextDraft() {
            console.log("handleNextDraft: Starting...");
            if (!isDraftComplete) {
                console.warn("handleNextDraft: Draft not complete.");
                showStatusMessage("Драфт не завершен. Завершите его перед переходом к следующему.", 3000);
                return;
            }
            let addedBansCount = 0;
            draftHistory.forEach(action => {
                if (action.type === 'pick' && !globallyDisabledChampions.has(action.championId)) {
                    globalBanHistory.push({ championId: action.championId, team: action.team });
                    globallyDisabledChampions.add(action.championId);
                    addedBansCount++;
                }
            });
            console.log(`handleNextDraft: Added ${addedBansCount} champions to global bans.`);
            resetCurrentGamePicksBans(false, true); // Call reset BUT keep global bans
            showStatusMessage("Переход к следующему драфту. Пики предыдущей игры заблокированы.", 2500);
            console.log("handleNextDraft: Current draft state reset for next game (global bans kept).");
        }

        // --- Tooltip Functions (Draft Specific) ---
        let tooltipTimeout;
        function showChampionTooltip(event, champion) { clearTimeout(tooltipTimeout); tooltipTimeout = setTimeout(() => { if (!championTooltip || !champion) return; championTooltip.innerHTML = `<strong class="tooltip-title">${champion.name.ru}</strong><span class="tooltip-name">${champion.title.ru}</span>`; championTooltip.style.visibility = 'hidden'; championTooltip.style.display = 'block'; const tooltipRect = championTooltip.getBoundingClientRect(); championTooltip.style.visibility = ''; championTooltip.style.display = ''; const rect = event.target.getBoundingClientRect(); let top = rect.top - tooltipRect.height - 8; let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2); if (top < 0) { top = rect.bottom + 8; } if (left < 0) { left = 5; } else if (left + tooltipRect.width > window.innerWidth) { left = window.innerWidth - tooltipRect.width - 5; } championTooltip.style.left = `${left}px`; championTooltip.style.top = `${top}px`; championTooltip.classList.add('visible'); }, 100); }
        function hideChampionTooltip() { clearTimeout(tooltipTimeout); if (championTooltip) { championTooltip.classList.remove('visible'); } }

        // --- Initialization Steps for Draft Page ---
        const dataLoaded = await loadChampionData();
        if (!dataLoaded) return;

        loadingIndicator.classList.add('hidden');
        mainLayout.classList.remove('hidden');
        displayChampions();
        console.log("Draft page starting fresh.");
        currentStep = 0; selectedChampions.clear(); draftHistory = []; pickNicknames = {}; globallyDisabledChampions.clear(); globalBanHistory = []; isDraftComplete = false; isDraftStarted = false; previewedChampion = null; confirmPickBanButton.disabled = true; deselectSwapSlots(); stopTimer(); draftTimerDuration = 30; resetTimerDisplay();
        document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => { restoreSlotPlaceholder(slot, slot.id, ''); slot.classList.remove('highlight-action', 'preview-flash'); });
        if (blueTeamNameH2) blueTeamNameH2.textContent = 'Синяя Команда'; if (redTeamNameH2) redTeamNameH2.textContent = 'Красная Команда'; if (blueScoreEl) blueScoreEl.textContent = ''; if (redScoreEl) redScoreEl.textContent = '';
        blueColumn.classList.add('draft-disabled'); redColumn.classList.add('draft-disabled'); championSearch.value = ''; currentRoleFilter = 'All'; filterButtons.forEach(btn => { btn.classList.toggle('active', btn.dataset.role === 'All'); }); isPriorityFilterActive = false; if (priorityFilterButton) { priorityFilterButton.classList.remove('active'); priorityFilterButton.title = 'Показать только приоритетных чемпионов'; priorityFilterButton.setAttribute('aria-pressed', 'false'); }
        displayGloballyBanned(); updateChampionAvailability(); filterChampions(); updateDraftUI();

        // Attach Event Listeners for Draft Page Elements
        timerDisplay.addEventListener('click', handleStartDraft);
        resetButton.addEventListener('click', resetDraftFull);
        clearPicksButton.addEventListener('click', () => resetCurrentGamePicksBans(false, false)); // Explicitly clear global bans
        undoButton.addEventListener('click', handleUndo);
        swapButton.addEventListener('click', handleSwapTeams);
        toggleTimerButton.addEventListener('click', handleToggleTimer);
        confirmPickBanButton.addEventListener('click', handleConfirmPickBan);
        priorityFilterButton.addEventListener('click', handlePriorityFilterToggle);
        nextDraftButton.addEventListener('click', handleNextDraft);
        championSearch.addEventListener('input', debouncedFilter);
        filterButtons.forEach(button => { if (button) button.addEventListener('click', handleRoleFilterClick); });
        blueColumn.addEventListener('click', handlePickContainerClick);
        redColumn.addEventListener('click', handlePickContainerClick);
        returnHomeButton.addEventListener('click', () => { console.log("Return Home Button Clicked!"); navigateTo('home'); }); // Listener for return button
        [blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl].forEach(el => { if (el) { el.addEventListener('blur', (e) => { e.target.textContent = e.target.textContent.trim(); }); el.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }); } });
        console.log("Draft simulator page initialized successfully.");
    } // --- End of initializeAppDraft ---

    // --- Initial App Setup ---
    // Attach navigation listener for home page button
    if (adminButton) {
         console.log("Found Admin button, attaching listener.");
        adminButton.addEventListener('click', () => {
             console.log("Admin Button Clicked!");
             navigateTo('draft');
        });
    } else {
        console.error("Admin button not found on home page!");
    }

    // Show the initial page (Home)
     navigateTo(currentPage); // Use initial state ('home')

}); // End DOMContentLoaded