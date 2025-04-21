// script.js v7.10 - Set data-placeholder for nickname inputs
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded. Initializing App v7.10..."); // Version Updated

    // --- Language State & Translations ---
    let currentLanguage = localStorage.getItem('language') || 'ru'; // Default to Russian
    const translations = {
        ru: {
            // Home Page
            homeTitle: "LoL and Wild Rift Drafter",
            team1Placeholder: "Команда 1",
            team2Placeholder: "Команда 2",
            createLobbyButton: "Создать Лобби",
            lobbyJudgeLabel: "Судья:",
            lobbyTeam1Label: "Команда 1:",
            lobbyTeam2Label: "Команда 2:",
            copyButton: "Копировать",
            openButton: "Открыть",
            lobbyCreatedMsg: "Лобби создано! Скопируйте или откройте ссылки.",
            linkCopiedMsg: "Ссылка скопирована!",
            linkCopiedFallbackMsg: "Ссылка скопирована (fallback)",
            copyErrorMsg: "Ошибка копирования",
            // Top Right Buttons
            adminButton: "Админ",
            themeToggleLight: "Переключить на светлую тему",
            themeToggleDark: "Переключить на темную тему",
            languageToggleButton: "EN", // Text on button when RU is active
            // Draft Page - Top Bar
            blueTeamDefaultName: "Синяя Команда",
            redTeamDefaultName: "Красная Команда",
            timerStartDraftTitle: "Начать драфт",
            timerDraftRunningTitle: "Драфт идет...",
            timerDraftCompleteText: "Драфт Завершен!",
            timerDraftCompleteTitle: "Драфт завершен",
            timerAriaLabelStart: "Таймер / Старт драфта",
            timerAriaLabelRunning: "Таймер: {time}",
            // Draft Page - Search/Controls
            searchPlaceholder: "Поиск...",
            searchAriaLabel: "Поиск чемпиона",
            clearPicksTitle: "Очистить пики/баны текущей игры (вкл. глоб.)",
            clearPicksAriaLabel: "Очистить пики/баны текущей игры",
            resetTitle: "Полный сброс",
            resetAriaLabel: "Полный сброс",
            confirmPickBanTitle: "Подтвердить выбор/бан",
            confirmPickBanAriaLabel: "Подтвердить выбор/бан",
            roleFilterGroupAriaLabel: "Фильтр по ролям",
            roleFilterAllTitle: "Фильтр: Все",
            roleFilterAllText: "ВСЕ",
            roleFilterTopTitle: "Фильтр: Топ",
            roleFilterTopText: "ТОП",
            roleFilterJungleTitle: "Фильтр: Лес",
            roleFilterJungleText: "ЛЕС",
            roleFilterMidTitle: "Фильтр: Мид",
            roleFilterMidText: "МИД",
            roleFilterADCTitle: "Фильтр: АДК",
            roleFilterADCText: "АДК",
            roleFilterSupportTitle: "Фильтр: Поддержка",
            roleFilterSupportText: "САП",
            priorityFilterShowPriorityTitle: "Показать только приоритетных чемпионов",
            priorityFilterShowAllTitle: "Показать всех чемпионов",
            priorityFilterAriaLabel: "Переключить фильтр приоритетных чемпионов",
            nextDraftTitle: "Следующий драфт (Fearless)",
            nextDraftAriaLabel: "Следующий драфт (Fearless)",
            swapTeamsTitle: "Поменять команды местами",
            swapTeamsAriaLabel: "Поменять команды местами",
            toggleTimerTitle: "Сменить время таймера (30/45с)",
            toggleTimerAriaLabel: "Сменить время таймера",
            undoTitle: "Отменить действие",
            undoAriaLabel: "Отменить действие",
            returnHomeTitle: "Вернуться на главную",
            returnHomeAriaLabel: "Вернуться на главную",
            // Draft Page - Slots & Grid
            blueBanAriaLabel: "Синий бан {n}",
            redBanAriaLabel: "Красный бан {n}",
            bluePickAriaLabel: "Синий пик {n}",
            redPickAriaLabel: "Красный пик {n}",
            championGridAriaLabel: "Сетка выбора чемпионов",
            pickSlotNicknamePlaceholder: "Игрок", // Used for data-placeholder attribute
            // Draft Page - Global Bans
            globalBanTitle: "{name} (Заблокирован {team} в пред. игре)",
            globalBanTeamBlue: "синими",
            globalBanTeamRed: "красными",
            // Draft Page - Misc
            loadingChampions: "Загрузка данных чемпионов...",
            // Status Messages
            errorLoadingVersions: "Ошибка загрузки версий: {status}",
            errorLoadingDataEN: "Ошибка загрузки данных EN: {status}",
            errorLoadingDataRU: "Не удалось загрузить данные RU: {status}. Используются английские имена.",
            errorLoadingChampions: "Ошибка загрузки данных чемпионов: {error}",
            errorInitCritical: "Критическая ошибка инициализации: {error}",
            errorInitDraftElements: "Ошибка UI: Элементы драфта не найдены.",
            championAlreadySelected: "{name} уже выбран или заблокирован.",
            actionUndone: "Действие отменено",
            resetFullConfirmation: "Вы уверены, что хотите полностью сбросить драфт (включая глобальные баны)?",
            resetFullComplete: "Драфт полностью сброшен.",
            resetCurrentConfirmation: "Остановить текущий драфт и очистить пики/баны этой игры{global}?",
            resetCurrentGlobalPart: " (включая глобальные)",
            resetCurrentComplete: "Пики/баны текущей игры{global} очищены.",
            resetCurrentCompleteKeptGlobal: "Текущая игра очищена.",
            swapSuccess: "Команды поменялись местами (пики/баны/ники/глоб. баны).",
            swapDuringDraftError: "Нельзя менять пики/баны во время драфта. Сменены только имена/счет/глоб. баны.",
            swapError: "Ошибка при смене команд.",
            timerToggled: "Время таймера: {duration} сек.",
            priorityFilterOn: "Показаны только приоритетные чемпионы.",
            priorityFilterOff: "Показаны все чемпионы.",
            nextDraftComplete: "Переход к следующему драфту. Пики предыдущей игры заблокированы.",
            nextDraftErrorNotComplete: "Драфт не завершен. Завершите его перед переходом к следующему.",
            timerEndedPickConfirm: "Время вышло! Авто-подтверждение: {name}",
            timerEndedPickClear: "Время вышло! Пик не выбран. Драфт очищен.",
            timerEndedBanSkip: "Время вышло! Бан пропущен.",
            swapPickSelect: "Нажмите для выбора обмена",
            swapConfirm: "Обмен: {champ1} <-> {champ2}",
            // Permissions denied messages
            permDeniedReset: "Нет прав для сброса драфта.",
            permDeniedClear: "Нет прав для очистки драфта.",
            permDeniedUndo: "Нет прав для отмены этого действия.",
            permDeniedSwap: "Нет прав для смены сторон.",
            permDeniedToggleTimer: "Нет прав для смены таймера.",
            permDeniedPriorityFilter: "Нет прав для переключения приоритета.",
            permDeniedNextDraft: "Нет прав для перехода к следующему драфту.",
            permDeniedStartDraft: "Нет прав для старта драфта.",
            permDeniedPreviewPick: "Нет прав на выбор чемпиона.",
            permDeniedPreviewBan: "Нет прав на бан чемпиона.",
            permDeniedConfirm: "Нет прав на подтверждение действия.",
            permDeniedRoleFilter: "Нет прав на использование фильтров ролей.",
            permDeniedEditName: "Нет прав на изменение имени команды.",
            permDeniedEditScore: "Нет прав на изменение счета.",
            permDeniedEditNickname: "Нет прав на изменение никнейма.",
        },
        en: {
            // Home Page
            homeTitle: "LoL and Wild Rift Drafter",
            team1Placeholder: "Team 1 Name",
            team2Placeholder: "Team 2 Name",
            createLobbyButton: "Create Lobby",
            lobbyJudgeLabel: "Judge:",
            lobbyTeam1Label: "Team 1:",
            lobbyTeam2Label: "Team 2:",
            copyButton: "Copy",
            openButton: "Open",
            lobbyCreatedMsg: "Lobby created! Copy or open the links.",
            linkCopiedMsg: "Link copied!",
            linkCopiedFallbackMsg: "Link copied (fallback)",
            copyErrorMsg: "Copy failed",
            // Top Right Buttons
            adminButton: "Admin",
            themeToggleLight: "Switch to Light Theme",
            themeToggleDark: "Switch to Dark Theme",
            languageToggleButton: "RU", // Text on button when EN is active
            // Draft Page - Top Bar
            blueTeamDefaultName: "Blue Team",
            redTeamDefaultName: "Red Team",
            timerStartDraftTitle: "Start Draft",
            timerDraftRunningTitle: "Draft in progress...",
            timerDraftCompleteText: "Draft Complete!",
            timerDraftCompleteTitle: "Draft complete",
            timerAriaLabelStart: "Timer / Start Draft",
            timerAriaLabelRunning: "Timer: {time}",
            // Draft Page - Search/Controls
            searchPlaceholder: "Search...",
            searchAriaLabel: "Search champion",
            clearPicksTitle: "Clear picks/bans for the current game (incl. global)",
            clearPicksAriaLabel: "Clear picks/bans for the current game",
            resetTitle: "Full Reset",
            resetAriaLabel: "Full Reset",
            confirmPickBanTitle: "Confirm Pick/Ban",
            confirmPickBanAriaLabel: "Confirm Pick/Ban",
            roleFilterGroupAriaLabel: "Filter by role",
            roleFilterAllTitle: "Filter: All",
            roleFilterAllText: "ALL",
            roleFilterTopTitle: "Filter: Top",
            roleFilterTopText: "TOP",
            roleFilterJungleTitle: "Filter: Jungle",
            roleFilterJungleText: "JGL",
            roleFilterMidTitle: "Filter: Mid",
            roleFilterMidText: "MID",
            roleFilterADCTitle: "Filter: ADC",
            roleFilterADCText: "ADC",
            roleFilterSupportTitle: "Filter: Support",
            roleFilterSupportText: "SUP",
            priorityFilterShowPriorityTitle: "Show only priority champions",
            priorityFilterShowAllTitle: "Show all champions",
            priorityFilterAriaLabel: "Toggle priority champion filter",
            nextDraftTitle: "Next Draft (Fearless)",
            nextDraftAriaLabel: "Next Draft (Fearless)",
            swapTeamsTitle: "Swap Teams",
            swapTeamsAriaLabel: "Swap Teams",
            toggleTimerTitle: "Change Timer Duration (30/45s)",
            toggleTimerAriaLabel: "Change Timer Duration",
            undoTitle: "Undo Action",
            undoAriaLabel: "Undo Action",
            returnHomeTitle: "Return to Home",
            returnHomeAriaLabel: "Return to Home",
            // Draft Page - Slots & Grid
            blueBanAriaLabel: "Blue Ban {n}",
            redBanAriaLabel: "Red Ban {n}",
            bluePickAriaLabel: "Blue Pick {n}",
            redPickAriaLabel: "Red Pick {n}",
            championGridAriaLabel: "Champion Selection Grid",
            pickSlotNicknamePlaceholder: "Player", // Used for data-placeholder attribute
            // Draft Page - Global Bans
            globalBanTitle: "{name} (Banned by {team} in previous game)",
            globalBanTeamBlue: "Blue",
            globalBanTeamRed: "Red",
            // Draft Page - Misc
            loadingChampions: "Loading champion data...",
            // Status Messages
            errorLoadingVersions: "Error loading versions: {status}",
            errorLoadingDataEN: "Error loading EN data: {status}",
            errorLoadingDataRU: "Failed to load RU data: {status}. Using English names.",
            errorLoadingChampions: "Error loading champion data: {error}",
            errorInitCritical: "Critical initialization error: {error}",
            errorInitDraftElements: "UI Error: Draft elements not found.",
            championAlreadySelected: "{name} is already selected or banned.",
            actionUndone: "Action undone",
            resetFullConfirmation: "Are you sure you want to fully reset the draft (including global bans)?",
            resetFullComplete: "Draft fully reset.",
            resetCurrentConfirmation: "Stop the current draft and clear this game's picks/bans{global}?",
            resetCurrentGlobalPart: " (including global)",
            resetCurrentComplete: "Current game's picks/bans{global} cleared.",
            resetCurrentCompleteKeptGlobal: "Current game cleared.",
            swapSuccess: "Teams swapped (picks/bans/nicknames/global bans).",
            swapDuringDraftError: "Cannot swap picks/bans during an active draft. Only names/scores/global bans swapped.",
            swapError: "Error swapping teams.",
            timerToggled: "Timer duration: {duration} sec.",
            priorityFilterOn: "Showing only priority champions.",
            priorityFilterOff: "Showing all champions.",
            nextDraftComplete: "Moving to the next draft. Previous game's picks are banned.",
            nextDraftErrorNotComplete: "Draft is not complete. Finish it before proceeding to the next one.",
            timerEndedPickConfirm: "Time ran out! Auto-confirming: {name}",
            timerEndedPickClear: "Time ran out! Pick not selected. Draft cleared.",
            timerEndedBanSkip: "Time ran out! Ban skipped.",
            swapPickSelect: "Click to select for swap",
            swapConfirm: "Swapped: {champ1} <-> {champ2}",
             // Permissions denied messages
            permDeniedReset: "No permission to reset draft.",
            permDeniedClear: "No permission to clear draft.",
            permDeniedUndo: "No permission to undo this action.",
            permDeniedSwap: "No permission to swap sides.",
            permDeniedToggleTimer: "No permission to change timer.",
            permDeniedPriorityFilter: "No permission to toggle priority.",
            permDeniedNextDraft: "No permission to proceed to next draft.",
            permDeniedStartDraft: "No permission to start draft.",
            permDeniedPreviewPick: "No permission to pick champion.",
            permDeniedPreviewBan: "No permission to ban champion.",
            permDeniedConfirm: "No permission to confirm action.",
            permDeniedRoleFilter: "No permission to use role filters.",
            permDeniedEditName: "No permission to edit team name.",
            permDeniedEditScore: "No permission to edit score.",
            permDeniedEditNickname: "No permission to edit nickname.",
        }
    };

    // --- Page Elements ---
    const appContainer = document.getElementById('app-container');
    const homePage = document.getElementById('homePage');
    const draftPage = document.getElementById('draftPage');
    const adminButton = document.getElementById('adminButton');
    const themeToggleButton = document.getElementById('themeToggleButton');
    const languageToggleButton = document.getElementById('languageToggleButton'); // Get language button

    // Home Page Elements
    const team1NameInput = document.getElementById('team1NameInput');
    const team2NameInput = document.getElementById('team2NameInput');
    const createLobbyButton = document.getElementById('createLobbyButton');
    const lobbyLinksDisplay = document.getElementById('lobbyLinksDisplay');
    const judgeLinkText = document.getElementById('judgeLinkText');
    const team1LinkText = document.getElementById('team1LinkText');
    const team2LinkText = document.getElementById('team2LinkText');
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
    let allChampionsData = { en: null, ru: null }; // Will store both EN and RU data
    let processedChampions = []; // Will store combined champ data { id, name: {en, ru}, title: {en, ru}, ... }
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
    const priorityChampions = new Set(['Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Annie', 'Ashe', 'AurelionSol', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Corki', 'Darius', 'Diana', 'DrMundo', 'Draven', 'Ekko', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Gwen', 'Hecarim', 'Heimerdinger', 'Irelia', 'Janna', 'JarvanIV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kaisa', 'Kalista', 'Karma', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Khazix', 'Kindred', 'LeeSin', 'Leona', 'Lillia', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Malphite', 'Maokai', 'MasterYi', 'Milio', 'MissFortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Nilah', 'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Pyke', 'Rakan', 'Rammus', 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Samira', 'Senna', 'Seraphine', 'Sett', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Sona', 'Soraka', 'Swain', 'Syndra', 'Talon', 'Teemo', 'Thresh', 'Tristana', 'Tryndamere', 'TwistedFate', 'Twitch', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Vex', 'Vi', 'Viego', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'MonkeyKing', 'Xayah', 'XinZhao', 'Yasuo', 'Yone', 'Yuumi', 'Zac', 'Zed', 'Zeri', 'Ziggs', 'Zoe', 'Zyra', 'Ryze', 'Nocturne', 'Zilean', 'Renata', 'Belveth', 'Naafiri', 'Briar', 'Hwei', 'Smolder']);

    // --- Permissions Map ---
    const permissions = {
        admin: { editTeamName: true, editScore: true, clearDraft: true, resetDraft: true, startDraft: true, toggleTimerDuration: true, swapSides: true, editNicknames: true, togglePriorityFilter: true, nextDraft: true, pickChampion: true, banChampion: true, undoAction: true, confirmAction: true, useRoleFilters: true, returnHome: true },
        judge: { editTeamName: true, editScore: true, clearDraft: true, resetDraft: true, startDraft: true, toggleTimerDuration: true, swapSides: true, editNicknames: true, togglePriorityFilter: true, nextDraft: true, pickChampion: false, banChampion: false, undoAction: false, confirmAction: false, useRoleFilters: false, returnHome: true },
        team1: { editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false, pickChampion: true, banChampion: true, undoAction: true, confirmAction: true, useRoleFilters: true, returnHome: true },
        team2: { editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false, pickChampion: true, banChampion: true, undoAction: true, confirmAction: true, useRoleFilters: true, returnHome: true },
        default: { editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false, pickChampion: false, banChampion: false, undoAction: false, confirmAction: false, useRoleFilters: false, returnHome: true }
    };

    // --- Helper Functions ---
    const debounce = (func, wait) => { let timeout; return function executedFunction(...args) { const later = () => { clearTimeout(timeout); func(...args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); }; };
    // --- MODIFIED: showStatusMessage to use translations ---
    const showStatusMessage = (key, duration = 3000, replacements = {}) => {
        if (!statusMessage) statusMessage = document.getElementById('statusMessage');
        if (!statusMessage) { console.warn("Status message element not found!"); return; }
        let message = translations[currentLanguage]?.[key] || key; // Fallback to key if translation missing
        // Replace placeholders like {name} or {time}
        for (const placeholder in replacements) {
            message = message.replace(`{${placeholder}}`, replacements[placeholder]);
        }
        statusMessage.textContent = message;
        statusMessage.classList.add('visible');
        clearTimeout(statusTimeout);
        statusTimeout = setTimeout(() => { statusMessage.classList.remove('visible'); }, duration);
    };
    const getChampionById = (id) => processedChampions.find(champ => champ.id === id);

    // Permission Check Function
    function hasPermission(action, team = null) { /* ... (no changes needed) ... */
        const rolePerms = permissions[currentUserRole] || permissions.default;
        const isAdmin = currentUserRole === 'admin';
        const hasBasicPermission = isAdmin || rolePerms[action];
        let result = false;
        if (!hasBasicPermission) { result = false; }
        else if (isAdmin) { result = true; }
        else if ((currentUserRole === 'team1' || currentUserRole === 'team2') && team) { result = userTeamSide === team; }
        else { result = true; }
        return result;
    }

     // Function to copy text to clipboard
     async function copyToClipboard(text) { /* ... (uses translation keys) ... */
         if (!navigator.clipboard) {
             try {
                 const textArea = document.createElement("textarea");
                 textArea.value = text;
                 textArea.style.position = "fixed"; document.body.appendChild(textArea);
                 textArea.focus(); textArea.select(); document.execCommand('copy');
                 document.body.removeChild(textArea);
                 showStatusMessage("linkCopiedFallbackMsg", 1500); // Use key
             } catch (err) { console.error('Fallback copy failed:', err); showStatusMessage("copyErrorMsg", 2000); } // Use key
             return;
         }
         try {
             await navigator.clipboard.writeText(text);
             showStatusMessage("linkCopiedMsg", 1500); // Use key
         } catch (err) { console.error('Async clipboard copy failed:', err); showStatusMessage("copyErrorMsg", 2000); } // Use key
     }

    // --- Theme Toggle Functions ---
    function applyTheme(theme) { /* ... (no changes needed) ... */
        console.log(`Applying theme: ${theme}`);
        document.documentElement.dataset.theme = theme;
        console.log(`DEBUG: html data-theme = ${document.documentElement.dataset.theme}`);
        if (themeToggleButton) {
            themeToggleButton.textContent = theme === 'dark' ? '🌙' : '☀️';
            // Title is updated by updateUIText
        } else {
            console.warn("applyTheme: themeToggleButton not found when trying to update icon/title.");
        }
    }
    function toggleTheme() { /* ... (Calls updateUIText) ... */
        console.log("--- toggleTheme called ---");
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
        updateUIText(currentLanguage); // Update button title after theme change
    }

    // --- Language Toggle Functions ---
    // --- MODIFIED: updateUIText sets data-placeholder for nicknames ---
    function updateUIText(lang) {
        console.log(`Updating UI text to: ${lang}`);
        const elements = document.querySelectorAll('[data-lang-key]');
        const langTranslations = translations[lang] || translations.en; // Fallback to English if lang missing

        elements.forEach(el => {
            const key = el.dataset.langKey;
            const target = el.dataset.langTarget || 'textContent'; // Default to textContent
            let translation = langTranslations[key];

            if (translation === undefined) {
                 console.warn(`Missing translation for key "${key}" in language "${lang}"`);
                 translation = translations[lang === 'ru' ? 'en' : 'ru']?.[key] || key; // Fallback
            }

            if (target === 'aria-label' && el.dataset.ariaValue && typeof translation === 'string') {
                translation = translation.replace(/{\w+}/g, el.dataset.ariaValue);
            }

            if (target === 'textContent') {
                const hasDirectText = Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');
                 if (hasDirectText || el.children.length === 0 || el.tagName === 'STRONG') {
                    el.textContent = translation;
                 } else if (el.querySelector('span[data-lang-key]')) {
                     const span = el.querySelector(`span[data-lang-key="${key}"]`);
                     if (span) span.textContent = translation;
                 }
            } else if (target === 'placeholder') {
                el.placeholder = translation;
            } else if (target === 'title') {
                el.title = translation;
            } else if (target === 'aria-label') {
                 el.setAttribute('aria-label', translation);
            } else {
                el.setAttribute(target, translation);
            }
        });

        // --- ADDED: Set data-placeholder for nickname inputs ---
        const nicknamePlaceholderText = langTranslations.pickSlotNicknamePlaceholder || 'Player';
        document.querySelectorAll('.nickname-input').forEach(input => {
            input.dataset.placeholder = nicknamePlaceholderText;
        });
        // --- END ADDED ---

        // Update language toggle button text specifically
        if (languageToggleButton) {
            languageToggleButton.textContent = langTranslations.languageToggleButton || (lang === 'ru' ? 'EN' : 'RU');
        }
        // Update theme toggle button title specifically
        if (themeToggleButton) {
             themeToggleButton.title = currentTheme === 'dark' ? langTranslations.themeToggleLight : langTranslations.themeToggleDark;
        }
         // Update priority filter button title specifically
         if (newPriorityFilterButton) {
             newPriorityFilterButton.title = isPriorityFilterActive ? langTranslations.priorityFilterShowAllTitle : langTranslations.priorityFilterShowPriorityTitle;
         }
         // Update timer button title if draft not started
         if (timerDisplay && !isDraftStarted) {
             timerDisplay.title = langTranslations.timerStartDraftTitle;
             timerDisplay.setAttribute('aria-label', langTranslations.timerAriaLabelStart);
         }


        // Update dynamic elements that depend on language
        if (isDraftInitialized) {
             displayChampions(); // Re-render champion cards with correct aria-labels
             updateDraftUI(); // Update highlighted slots, etc. (also calls displayGloballyBanned)
        }
        console.log("UI text update complete.");
    }
    // --- END MODIFIED updateUIText ---


    function toggleLanguage() {
        currentLanguage = (currentLanguage === 'ru') ? 'en' : 'ru';
        localStorage.setItem('language', currentLanguage);
        console.log(`Language switched to: ${currentLanguage}`);
        document.documentElement.lang = currentLanguage; // Update HTML lang attribute
        if (processedChampions.length > 0) {
             processedChampions.sort((a, b) => a.name[currentLanguage].localeCompare(b.name[currentLanguage], currentLanguage));
        }
        updateUIText(currentLanguage);
    }


    // --- Navigation & Role Handling ---
    function navigateTo(pageName) { /* ... (logic unchanged, text updated by updateUIText) ... */
        console.log(`Navigating to: ${pageName}`);
        currentPage = pageName;
        if(homePage) homePage.classList.add('hidden');
        if(draftPage) draftPage.classList.add('hidden');
        const currentAdminButton = document.getElementById('adminButton');
        const currentThemeButton = document.getElementById('themeToggleButton');
        const currentLangButton = document.getElementById('languageToggleButton'); // Get lang button

        if(currentAdminButton) currentAdminButton.classList.add('hidden');
        if(currentThemeButton) currentThemeButton.classList.add('hidden');
        if(currentLangButton) currentLangButton.classList.add('hidden'); // Hide lang button by default

        if (pageName === 'home') {
            if(homePage) homePage.classList.remove('hidden');
            if(currentAdminButton) currentAdminButton.classList.remove('hidden');
            if(currentThemeButton) currentThemeButton.classList.remove('hidden');
            if(currentLangButton) currentLangButton.classList.remove('hidden'); // Show lang button on home
            console.log("DEBUG navigateTo: Showing buttons for home page");
            if (window.location.hash && currentUserRole !== 'admin') {
                currentUserRole = null;
                userTeamSide = null;
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
             updateUIText(currentLanguage); // Ensure home page text is correct on navigation
        } else if (pageName === 'draft') {
             if(draftPage) draftPage.classList.remove('hidden');
             console.log("DEBUG navigateTo: Hiding buttons for draft page");
             if (!isDraftInitialized) {
                console.log("Initializing draft simulator for the first time...");
                initializeAppDraft(); // This calls updateUIText after data load
                isDraftInitialized = true;
            } else {
                 console.log("Draft already initialized, re-applying permissions for role:", currentUserRole);
                 if (checkDraftElements()) {
                    if (!currentUserRole) { currentUserRole = getRoleFromHash() || 'default'; }
                    if (currentUserRole === 'team1') userTeamSide = 'blue';
                    else if (currentUserRole === 'team2') userTeamSide = 'red';
                    else userTeamSide = null;
                    applyRolePermissions(currentUserRole);
                    if(blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem('lobbyTeam1Name') || translations[currentLanguage].blueTeamDefaultName;
                    if(redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem('lobbyTeam2Name') || translations[currentLanguage].redTeamDefaultName;
                    updateUIText(currentLanguage); // Ensure draft page UI text is correct
                    updateDraftUI();
                 } else {
                     console.error("Draft elements not found when trying to re-apply permissions.");
                     showStatusMessage("errorInitDraftElements", 5000);
                 }
            }
        }
    }

    function getRoleFromHash() { /* ... (no changes needed) ... */
        const hash = window.location.hash;
        if (hash.startsWith('#role=')) {
            const role = hash.substring(6);
            if (permissions[role] && role !== 'admin') { return role; }
        }
        return null;
    }

    // --- Home Page Logic ---
    function handleCreateLobby() { /* ... (uses translation keys for messages) ... */
        console.log("handleCreateLobby called");
        const team1Name = team1NameInput.value.trim() || translations[currentLanguage].blueTeamDefaultName;
        const team2Name = team2NameInput.value.trim() || translations[currentLanguage].redTeamDefaultName;
        localStorage.setItem('lobbyTeam1Name', team1Name);
        localStorage.setItem('lobbyTeam2Name', team2Name);
        const baseUrl = window.location.origin + window.location.pathname;
        const judgeLink = baseUrl + '#role=judge';
        const team1Link = baseUrl + '#role=team1';
        const team2Link = baseUrl + '#role=team2';
        if (judgeLinkText) judgeLinkText.textContent = judgeLink;
        if (team1LinkText) team1LinkText.textContent = team1Link;
        if (team2LinkText) team2LinkText.textContent = team2Link;
        if (openJudgeLinkButton) openJudgeLinkButton.href = judgeLink; else console.warn("Judge 'Open' button not found");
        if (openTeam1LinkButton) openTeam1LinkButton.href = team1Link; else console.warn("Team 1 'Open' button not found");
        if (openTeam2LinkButton) openTeam2LinkButton.href = team2Link; else console.warn("Team 2 'Open' button not found");
        if (lobbyLinksDisplay) lobbyLinksDisplay.classList.remove('hidden');
        showStatusMessage("lobbyCreatedMsg", 3000); // Use key
    }

    // --- Admin Button Logic ---
    function handleAdminClick() { /* ... (logic unchanged) ... */
        console.log("Admin button clicked.");
        currentUserRole = 'admin';
        userTeamSide = null;
        const team1Name = team1NameInput.value.trim() || translations[currentLanguage].blueTeamDefaultName;
        const team2Name = team2NameInput.value.trim() || translations[currentLanguage].redTeamDefaultName;
        localStorage.setItem('lobbyTeam1Name', team1Name);
        localStorage.setItem('lobbyTeam2Name', team2Name);
        navigateTo('draft');
    }

    // Add listener for create lobby button
    if (createLobbyButton) { createLobbyButton.addEventListener('click', handleCreateLobby); }
    else { console.warn("Create Lobby Button not found"); }

     // Add listeners for copy buttons
     document.querySelectorAll('.copy-button').forEach(button => {
         if (button.tagName === 'BUTTON') {
             button.addEventListener('click', (event) => {
                 const linkId = event.target.dataset.linkId;
                 const linkSpan = document.getElementById(linkId);
                 if (linkSpan) { copyToClipboard(linkSpan.textContent); }
                 else { console.warn("Copy link span not found for id:", linkId); }
             });
         }
     });

    // Add listener for Admin button
    if (adminButton) { adminButton.addEventListener('click', handleAdminClick); }
    else { console.warn("Admin Button not found"); }

    // --- Theme Toggle Listener ---
    if (themeToggleButton) { themeToggleButton.addEventListener('click', toggleTheme); }
    else { console.warn("Theme toggle button not found! Listener not attached."); }

    // --- Language Toggle Listener ---
    if (languageToggleButton) { languageToggleButton.addEventListener('click', toggleLanguage); }
    else { console.warn("Language toggle button not found! Listener not attached."); }


    // --- Function to check if draft elements exist ---
    function checkDraftElements() { /* ... (no changes needed) ... */
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
        roleFilterButtonsContainer = document.getElementById('roleFilterButtons');
        filterButtons = roleFilterButtonsContainer ? roleFilterButtonsContainer.querySelectorAll('.filter-button') : null;
        confirmPickBanButton = document.getElementById('confirmPickBanButton');
        newPriorityFilterButton = document.getElementById('newPriorityFilterButton');
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
        const elementsToCheck = [ loadingIndicator, mainLayout, championGridElement, timerDisplay, resetButton, undoButton, championSearch, blueColumn, redColumn, swapButton, clearPicksButton, toggleTimerButton, roleFilterButtonsContainer, filterButtons, confirmPickBanButton, newPriorityFilterButton, nextDraftButton, returnHomeButton, blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl, statusMessage, championTooltip, globalBansBlueContainer, globalBansRedContainer, globallyBannedDisplay ];
        if (!filterButtons || filterButtons.length === 0) { console.error("Role filter buttons NodeList is empty or null!"); }
        const missingElements = elementsToCheck.filter(el => !el);
        if (missingElements.length > 0) { console.error("Missing draft elements during check:", missingElements.map(el => el?.id || (el === newPriorityFilterButton ? 'newPriorityFilterButton' : 'unknown'))); return false; }
        return true;
    }


    // --- Draft Simulator Logic (all inside initializeAppDraft) ---
    async function initializeAppDraft() { /* ... (calls updateUIText) ... */
        console.log("initializeAppDraft started");
        try {
            if (!currentUserRole) { currentUserRole = getRoleFromHash() || 'default'; console.warn(`Role determined as: ${currentUserRole}`); }
            console.log(`Initializing draft with Role: ${currentUserRole}`);
            if (currentUserRole === 'team1') userTeamSide = 'blue'; else if (currentUserRole === 'team2') userTeamSide = 'red'; else userTeamSide = null;
            if (!checkDraftElements()) { throw new Error("One or more draft page elements were not found during initialization!"); }
            console.log("All draft elements found.");
            if(loadingIndicator) loadingIndicator.classList.remove('hidden');
            updateUIText(currentLanguage); // Update loading text
            const dataLoaded = await loadChampionData(); // Ensure data includes both languages
            if (!dataLoaded) { throw new Error("Failed to load champion data."); }
            if(loadingIndicator) loadingIndicator.classList.add('hidden');
            if(mainLayout) mainLayout.classList.remove('hidden');
            displayChampions(); // Will now use currentLanguage for aria-labels
            resetDraftFull(true); // Resets state, calls updateDraftUI internally
            if(blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem('lobbyTeam1Name') || translations[currentLanguage].blueTeamDefaultName;
            if(redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem('lobbyTeam2Name') || translations[currentLanguage].redTeamDefaultName;
            console.log("Attaching draft page event listeners...");
            // Attach listeners... (no changes needed here)
             if (timerDisplay) timerDisplay.addEventListener('click', handleStartDraft); else console.warn("Listener not attached: timerDisplay not found");
            if (resetButton) resetButton.addEventListener('click', () => { console.log("Reset button clicked"); resetDraftFull(false); }); else console.warn("Listener not attached: resetButton not found");
            if (clearPicksButton) clearPicksButton.addEventListener('click', () => { console.log("Clear Picks button clicked"); resetCurrentGamePicksBans(false, false); }); else console.warn("Listener not attached: clearPicksButton not found");
            if (undoButton) undoButton.addEventListener('click', handleUndo); else console.warn("Listener not attached: undoButton not found");
            if (swapButton) swapButton.addEventListener('click', handleSwapTeams); else console.warn("Listener not attached: swapButton not found");
            if (toggleTimerButton) toggleTimerButton.addEventListener('click', handleToggleTimer); else console.warn("Listener not attached: toggleTimerButton not found");
            if (confirmPickBanButton) confirmPickBanButton.addEventListener('click', handleConfirmPickBan); else console.warn("Listener not attached: confirmPickBanButton not found");
            if (newPriorityFilterButton) { newPriorityFilterButton.addEventListener('click', handleNewPriorityFilterToggle); } else { console.warn("Listener not attached: newPriorityFilterButton not found"); }
            if (nextDraftButton) nextDraftButton.addEventListener('click', handleNextDraft); else console.warn("Listener not attached: nextDraftButton not found");
            if (championSearch) championSearch.addEventListener('input', debouncedFilter); else console.warn("Listener not attached: championSearch not found");
            if (filterButtons) { filterButtons.forEach((button, index) => { if (button) { button.addEventListener('click', handleRoleFilterClick); } else { console.warn(`Listener not attached: filter button at index ${index} was null`); } }); } else { console.warn("Listener not attached: filterButtons collection is null/empty"); }
            if (blueColumn) blueColumn.addEventListener('click', handlePickContainerClick); else console.warn("Listener not attached: blueColumn not found");
            if (redColumn) redColumn.addEventListener('click', handlePickContainerClick); else console.warn("Listener not attached: redColumn not found");
            if (returnHomeButton) returnHomeButton.addEventListener('click', () => { console.log("Return Home button clicked"); navigateTo('home'); }); else console.warn("Listener not attached: returnHomeButton not found");
            [blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl].forEach(el => { if (el) { el.addEventListener('blur', (e) => { const permissionNeeded = el.id.includes('name') ? 'editTeamName' : 'editScore'; if (!hasPermission(permissionNeeded)) return; e.target.textContent = e.target.textContent.trim(); }); el.addEventListener('keydown', (e) => { const permissionNeeded = el.id.includes('name') ? 'editTeamName' : 'editScore'; if (!hasPermission(permissionNeeded)) return; if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }); } else { console.warn("Listener not attached: An editable H2/Score element was not found"); } });
            console.log("Draft page event listeners attached.");
            updateUIText(currentLanguage); // Set initial text for draft page elements
            updateDraftUI();
            console.log("Draft simulator page initialized successfully for role:", currentUserRole);
        } catch (error) {
            console.error("Error during initializeAppDraft:", error);
            showStatusMessage("errorInitCritical", 10000, { error: error.message });
            if(loadingIndicator) loadingIndicator.textContent = `Ошибка! ${error.message}`; // Keep basic fallback here
            if(mainLayout) mainLayout.classList.add('hidden');
        }
    }

    // --- Role Permission Application ---
    function applyRolePermissions(role) { /* ... (no changes needed) ... */
        const can = (action, team = null) => hasPermission(action, team);
        if(timerDisplay) timerDisplay.disabled = !can('startDraft'); if(resetButton) resetButton.disabled = !can('resetDraft'); if(clearPicksButton) clearPicksButton.disabled = !can('clearDraft'); if(undoButton) undoButton.disabled = !can('undoAction'); if(swapButton) swapButton.disabled = !can('swapSides'); if(toggleTimerButton) toggleTimerButton.disabled = !can('toggleTimerDuration'); if(confirmPickBanButton) confirmPickBanButton.disabled = !can('confirmAction'); if(newPriorityFilterButton) newPriorityFilterButton.disabled = !can('togglePriorityFilter'); if(nextDraftButton) nextDraftButton.disabled = !can('nextDraft'); if(returnHomeButton) returnHomeButton.disabled = !can('returnHome');
        if(filterButtons) { filterButtons.forEach(btn => { btn.disabled = !can('useRoleFilters'); }); }
        if(blueTeamNameH2) blueTeamNameH2.contentEditable = can('editTeamName'); if(redTeamNameH2) redTeamNameH2.contentEditable = can('editTeamName'); if(blueScoreEl) blueScoreEl.contentEditable = can('editScore'); if(redScoreEl) redScoreEl.contentEditable = can('editScore');
        if (blueColumn) blueColumn.classList.toggle('role-disabled', role === 'team2'); if (redColumn) redColumn.classList.toggle('role-disabled', role === 'team1'); if (role === 'admin') { if(blueColumn) blueColumn.classList.remove('role-disabled'); if(redColumn) redColumn.classList.remove('role-disabled'); }
        updateNicknameEditability();
    }

     // --- Update Nickname Editability based on Role ---
     function updateNicknameEditability() { /* ... (no changes needed) ... */
         const canEdit = hasPermission('editNicknames');
         document.querySelectorAll('.nickname-input').forEach(input => { input.contentEditable = canEdit; input.style.cursor = canEdit ? 'text' : 'default'; });
     }

    // --- Data Fetching (Draft Specific) ---
    async function loadChampionData() { /* ... (Already modified) ... */
         try {
             const versionsResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json'); if (!versionsResponse.ok) throw new Error(translations[currentLanguage].errorLoadingVersions.replace('{status}', versionsResponse.statusText)); const versions = await versionsResponse.json(); ddragonVersion = versions[0]; baseIconUrl = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/`; baseSplashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/`;
             const championRolesMap = { /* ... roles ... */ 'Aatrox': ['Top'], 'Ahri': ['Mid'], 'Akali': ['Mid', 'Top'], 'Akshan': ['Mid', 'Top'], 'Alistar': ['Support'], 'Amumu': ['Jungle', 'Support'], 'Anivia': ['Mid'], 'Annie': ['Mid', 'Support'], 'Aphelios': ['ADC'], 'Ashe': ['ADC', 'Support'], 'AurelionSol': ['Mid'], 'Azir': ['Mid'], 'Bard': ['Support'], 'Belveth': ['Jungle'], 'Blitzcrank': ['Support'], 'Brand': ['Support', 'Mid', 'Jungle'], 'Braum': ['Support'], 'Briar': ['Jungle'], 'Caitlyn': ['ADC'], 'Camille': ['Top'], 'Cassiopeia': ['Top', 'Mid'], 'Chogath': ['Top', 'Mid'], 'Corki': ['Mid', 'ADC'], 'Darius': ['Top', 'Jungle'], 'Diana': ['Jungle', 'Mid'], 'DrMundo': ['Top', 'Jungle'], 'Draven': ['ADC'], 'Ekko': ['Jungle', 'Mid'], 'Elise': ['Jungle'], 'Evelynn': ['Jungle'], 'Ezreal': ['ADC'], 'Fiddlesticks': ['Jungle'], 'Fiora': ['Top'], 'Fizz': ['Mid'], 'Galio': ['Mid', 'Support'], 'Gangplank': ['Top'], 'Garen': ['Top'], 'Gnar': ['Top'], 'Gragas': ['Jungle', 'Top', 'Mid', 'Support'], 'Graves': ['Jungle'], 'Gwen': ['Top', 'Jungle'], 'Hecarim': ['Jungle'], 'Heimerdinger': ['Top', 'Mid', 'Support'], 'Hwei': ['Mid', 'Support'], 'Illaoi': ['Top'], 'Irelia': ['Top', 'Mid'], 'Ivern': ['Jungle', 'Support'], 'Janna': ['Support'], 'JarvanIV': ['Jungle'], 'Jax': ['Top', 'Jungle'], 'Jayce': ['Top', 'Mid'], 'Jhin': ['ADC'], 'Jinx': ['ADC'], 'Kaisa': ['ADC'], 'Kalista': ['ADC'], 'Karma': ['Support', 'Mid'], 'Karthus': ['Jungle', 'Mid'], 'Kassadin': ['Mid'], 'Katarina': ['Mid'], 'Kayle': ['Top', 'Mid'], 'Kayn': ['Jungle'], 'Kennen': ['Top', 'Mid'], 'Khazix': ['Jungle'], 'Kindred': ['Jungle'], 'Kled': ['Top', 'Mid'], 'KogMaw': ['ADC'], 'KSante': ['Top'], 'Leblanc': ['Mid'], 'LeeSin': ['Jungle'], 'Leona': ['Support'], 'Lillia': ['Jungle'], 'Lissandra': ['Mid'], 'Lucian': ['ADC'], 'Lulu': ['Support'], 'Lux': ['Mid', 'Support'], 'Malphite': ['Top', 'Support', 'Mid'], 'Malzahar': ['Mid'], 'Maokai': ['Jungle', 'Support'], 'MasterYi': ['Jungle'], 'Milio': ['Support'], 'MissFortune': ['ADC'], 'Mordekaiser': ['Top', 'Jungle'], 'Morgana': ['Support', 'Mid', 'Jungle'], 'Naafiri': ['Jungle', 'Mid'], 'Nami': ['Support'], 'Nasus': ['Top'], 'Nautilus': ['Support'], 'Neeko': ['Mid', 'Support'], 'Nidalee': ['Jungle'], 'Nilah': ['ADC'], 'Nocturne': ['Jungle'], 'Nunu': ['Jungle'], 'Olaf': ['Top', 'Jungle'], 'Orianna': ['Mid'], 'Ornn': ['Top'], 'Pantheon': ['Top', 'Mid', 'Support', 'Jungle'], 'Poppy': ['Top', 'Jungle', 'Support'], 'Pyke': ['Support', 'Mid'], 'Qiyana': ['Jungle', 'Mid'], 'Quinn': ['Top', 'Mid'], 'Rakan': ['Support'], 'Rammus': ['Jungle'], 'RekSai': ['Jungle'], 'Rell': ['Support', 'Jungle'], 'Renata': ['Support'], 'Renekton': ['Top'], 'Rengar': ['Jungle', 'Top'], 'Riven': ['Top'], 'Rumble': ['Top', 'Mid', 'Jungle'], 'Ryze': ['Top', 'Mid'], 'Samira': ['ADC'], 'Sejuani': ['Jungle'], 'Senna': ['Support', 'ADC'], 'Seraphine': ['Support', 'Mid', 'ADC'], 'Sett': ['Top', 'Support'], 'Shaco': ['Jungle', 'Support'], 'Shen': ['Top', 'Support'], 'Shyvana': ['Jungle'], 'Singed': ['Top'], 'Sion': ['Top', 'Mid'], 'Sivir': ['ADC'], 'Skarner': ['Jungle', 'Top'], 'Smolder': ['ADC', 'Mid'], 'Sona': ['Support'], 'Soraka': ['Support'], 'Swain': ['Support', 'Mid', 'ADC'], 'Sylas': ['Mid', 'Jungle'], 'Syndra': ['Mid'], 'TahmKench': ['Top', 'Support'], 'Taliyah': ['Jungle', 'Mid'], 'Talon': ['Jungle', 'Mid'], 'Taric': ['Support'], 'Teemo': ['Top'], 'Thresh': ['Support'], 'Tristana': ['ADC', 'Mid'], 'Trundle': ['Top', 'Jungle'], 'Tryndamere': ['Top'], 'TwistedFate': ['Mid', 'ADC'], 'Twitch': ['ADC', 'Jungle'], 'Udyr': ['Jungle', 'Top'], 'Urgot': ['Top'], 'Varus': ['ADC', 'Mid'], 'Vayne': ['ADC', 'Top'], 'Veigar': ['Mid', 'ADC', 'Support'], 'Velkoz': ['Mid', 'Support'], 'Vex': ['Mid'], 'Vi': ['Jungle'], 'Viego': ['Jungle'], 'Viktor': ['Mid'], 'Vladimir': ['Top', 'Mid'], 'Volibear': ['Top', 'Jungle'], 'Warwick': ['Jungle', 'Top'], 'MonkeyKing': ['Top', 'Jungle'], 'Xayah': ['ADC'], 'Xerath': ['Mid', 'Support'], 'XinZhao': ['Jungle'], 'Yasuo': ['Mid', 'Top', 'ADC'], 'Yone': ['Top', 'Mid'], 'Yorick': ['Top', 'Jungle'], 'Yuumi': ['Support'], 'Zac': ['Jungle'], 'Zed': ['Mid', 'Jungle'], 'Zeri': ['ADC'], 'Ziggs': ['Mid', 'ADC', 'Support'], 'Zilean': ['Support', 'Mid'], 'Zoe': ['Mid', 'Support'], 'Zyra': ['Support', 'Jungle', 'Mid'] };
             const dataUrlEn = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/champion.json`; const dataUrlRu = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ru_RU/champion.json`; const [enResponse, ruResponse] = await Promise.all([ fetch(dataUrlEn), fetch(dataUrlRu) ]); if (!enResponse.ok) throw new Error(translations[currentLanguage].errorLoadingDataEN.replace('{status}', enResponse.statusText)); allChampionsData.en = (await enResponse.json()).data; if (!ruResponse.ok) { console.warn(translations[currentLanguage].errorLoadingDataRU.replace('{status}', ruResponse.statusText)); showStatusMessage("errorLoadingDataRU", 4000, { status: ruResponse.statusText }); allChampionsData.ru = null; } else { allChampionsData.ru = (await ruResponse.json()).data; }
             processedChampions = Object.keys(allChampionsData.en).map(champId => { const enData = allChampionsData.en[champId]; const ruData = allChampionsData.ru ? allChampionsData.ru[champId] : enData; return { id: enData.id, name: { en: enData.name, ru: ruData.name }, title: { en: enData.title, ru: ruData.title }, roles: championRolesMap[enData.id] || [], iconUrl: `${baseIconUrl}${enData.image.full}`, splashUrl: `${baseSplashUrl}${enData.id}_0.jpg` }; });
             processedChampions.sort((a, b) => a.name[currentLanguage].localeCompare(b.name[currentLanguage], currentLanguage)); console.log(`Successfully loaded and processed ${processedChampions.length} champions.`); return true;
         } catch (error) { console.error("Error loading champion data:", error); showStatusMessage("errorLoadingChampions", 5000, { error: error.message }); if(loadingIndicator) loadingIndicator.textContent = `Ошибка загрузки! ${error.message}`; if(mainLayout) mainLayout.classList.add('hidden'); return false; }
     }

    // --- Timer Functions (Draft Specific) ---
    function stopTimer() { /* ... (no changes needed) ... */ clearInterval(timerInterval); timerInterval = null; if(timerDisplay) timerDisplay.classList.remove('timer-running', 'timer-ending'); }
    function formatTime(seconds) { /* ... (no changes needed) ... */ const minutes = Math.floor(seconds / 60); const remainingSeconds = seconds % 60; return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`; }
    function resetTimerDisplay() { /* ... (uses translations) ... */ stopTimer(); timerSeconds = draftTimerDuration; if(timerDisplay) { timerDisplay.textContent = formatTime(timerSeconds); timerDisplay.disabled = !hasPermission('startDraft'); timerDisplay.classList.remove('timer-disabled'); timerDisplay.title = translations[currentLanguage].timerStartDraftTitle; timerDisplay.setAttribute('aria-label', translations[currentLanguage].timerAriaLabelStart); } }
    function startTimer() { /* ... (uses translations) ... */
        console.log("startTimer called"); if (!hasPermission('startDraft')) { showStatusMessage("permDeniedStartDraft", 2000); return; } stopTimer(); timerSeconds = draftTimerDuration; if (!timerDisplay) { console.warn("startTimer: timerDisplay not found"); return; }
        timerDisplay.textContent = formatTime(timerSeconds); timerDisplay.disabled = true; timerDisplay.classList.add('timer-running', 'timer-disabled'); timerDisplay.title = translations[currentLanguage].timerDraftRunningTitle; timerDisplay.setAttribute('aria-label', translations[currentLanguage].timerAriaLabelRunning.replace('{time}', formatTime(timerSeconds)));
        timerInterval = setInterval(() => {
            timerSeconds--; if (timerDisplay) { timerDisplay.textContent = formatTime(timerSeconds); timerDisplay.setAttribute('aria-label', translations[currentLanguage].timerAriaLabelRunning.replace('{time}', formatTime(timerSeconds))); if (timerSeconds <= 10 && timerSeconds > 0) { timerDisplay.classList.add('timer-ending'); } else { timerDisplay.classList.remove('timer-ending'); } }
            if (timerSeconds <= 0) {
                stopTimer(); if(timerDisplay) timerDisplay.classList.add('timer-ending'); console.log("Timer reached zero!"); const draftOrder = getDraftOrder(); if (currentStep < draftOrder.length) { const currentAction = draftOrder[currentStep]; if (currentAction.type === 'pick') { if (previewedChampion) { console.log("Timer ended during PICK phase. Auto-confirming:", previewedChampion.id); showStatusMessage("timerEndedPickConfirm", 3000, { name: previewedChampion.name[currentLanguage] }); handleConfirmPickBan(); } else { console.log("Timer ended during PICK phase. No champion previewed. Clearing current game."); showStatusMessage("timerEndedPickClear", 3000); resetCurrentGamePicksBans(true, false); } } else if (currentAction.type === 'ban') { console.log("Timer ended during BAN phase. Skipping ban."); showStatusMessage("timerEndedBanSkip", 2000); const slotElement = document.getElementById(currentAction.slot); if (slotElement) { restoreSlotPlaceholder(slotElement, currentAction.slot, ''); } currentStep++; resetTimerDisplay(); updateDraftUI(); } } else { console.log("Timer ended but draft already complete?"); }
            }
        }, 1000);
    }

    // --- Draft Logic Functions (Draft Specific - with permission checks added) ---
     function createChampionCard(champ) { /* ... (Already modified) ... */
        const card = document.createElement('button'); card.className = 'champion-card'; card.dataset.championId = champ.id; card.dataset.championNameEn = champ.name.en.toLowerCase(); card.dataset.championNameRu = champ.name.ru.toLowerCase(); card.dataset.roles = champ.roles.join(','); card.setAttribute('role', 'gridcell'); card.setAttribute('aria-label', champ.name[currentLanguage]);
        const img = document.createElement('img'); img.src = champ.iconUrl; img.alt = ""; img.className = 'w-full h-full object-cover block pointer-events-none'; img.loading = 'lazy'; img.onerror = () => { img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%234a5568'/%3E%3C/svg%3E`; card.setAttribute('aria-label', `${champ.name[currentLanguage]} (error)`); }; card.appendChild(img);
        card.addEventListener('click', () => handleChampionPreview(champ)); card.addEventListener('mouseover', (event) => showChampionTooltip(event, champ)); card.addEventListener('mouseout', hideChampionTooltip); card.addEventListener('focus', (event) => showChampionTooltip(event, champ)); card.addEventListener('blur', hideChampionTooltip); return card;
    }
    function displayChampions() { /* ... (Already modified) ... */ if(!championGridElement) { console.error("displayChampions: championGridElement not found"); return; } const fragment = document.createDocumentFragment(); processedChampions.sort((a, b) => a.name[currentLanguage].localeCompare(b.name[currentLanguage], currentLanguage)); processedChampions.forEach(champ => { fragment.appendChild(createChampionCard(champ)); }); championGridElement.innerHTML = ''; championGridElement.appendChild(fragment); filterChampions(); }
    function updateDraftUI() { /* ... (uses translations) ... */
        if (!isDraftInitialized) return; document.querySelectorAll('.pick-slot, .ban-slot').forEach(el => { el.classList.remove('highlight-action', 'preview-flash', 'swap-selected'); }); applyRolePermissions(currentUserRole);
        const draftOrder = getDraftOrder(); let currentActionTeam = null; if (currentStep < draftOrder.length) { currentActionTeam = draftOrder[currentStep].team; }
        const canConfirm = hasPermission('confirmAction', currentActionTeam); if(confirmPickBanButton) confirmPickBanButton.disabled = !canConfirm || !previewedChampion || !isDraftStarted || isDraftComplete; const canUndo = hasPermission('undoAction', draftHistory[draftHistory.length - 1]?.team); if(undoButton) undoButton.disabled = !canUndo || draftHistory.length === 0 || !isDraftStarted;
        const canStart = hasPermission('startDraft'); const canClear = hasPermission('clearDraft'); const canReset = hasPermission('resetDraft'); const canSwap = hasPermission('swapSides'); const canToggleTimer = hasPermission('toggleTimerDuration'); const canTogglePriority = hasPermission('togglePriorityFilter'); const canNext = hasPermission('nextDraft');
        if (!isDraftStarted) { resetTimerDisplay(); if(blueColumn) blueColumn.classList.add('draft-disabled'); if(redColumn) redColumn.classList.add('draft-disabled'); if(nextDraftButton) nextDraftButton.disabled = !canNext || true; if(swapButton) swapButton.disabled = !canSwap; if(clearPicksButton) clearPicksButton.disabled = !canClear || (draftHistory.length === 0 && Object.keys(pickNicknames).length === 0 && selectedChampions.size === 0 && globalBanHistory.length === 0); if(toggleTimerButton) toggleTimerButton.disabled = !canToggleTimer; if(newPriorityFilterButton) newPriorityFilterButton.disabled = !canTogglePriority; if(resetButton) resetButton.disabled = !canReset; if(timerDisplay) timerDisplay.disabled = !canStart; if (championGridElement) championGridElement.style.pointerEvents = 'none'; }
        else if (currentStep < draftOrder.length) { isDraftComplete = false; const action = draftOrder[currentStep]; const activeSlot = document.getElementById(action.slot); if (activeSlot) { if (currentUserRole === 'admin' || currentUserRole === 'judge' || userTeamSide === currentActionTeam) { activeSlot.classList.add('highlight-action'); } const isConfirmed = draftHistory.some(entry => entry.slotId === action.slot); if (!isConfirmed) { const currentNickname = pickNicknames[action.slot] || ''; if (!activeSlot.classList.contains('preview-flash')) { restoreSlotPlaceholder(activeSlot, action.slot, currentNickname); } } } if (!timerInterval && hasPermission('startDraft')) { startTimer(); } if(nextDraftButton) nextDraftButton.disabled = true; if(timerDisplay) timerDisplay.disabled = true; if(swapButton) swapButton.disabled = true; if(toggleTimerButton) toggleTimerButton.disabled = true; if(newPriorityFilterButton) newPriorityFilterButton.disabled = true; if(clearPicksButton) clearPicksButton.disabled = !canClear; if(resetButton) resetButton.disabled = !canReset; const isGridInteractive = (currentUserRole === 'admin' || userTeamSide === currentActionTeam); if (championGridElement) { championGridElement.style.pointerEvents = isGridInteractive ? 'auto' : 'none'; } }
        else { isDraftComplete = true; stopTimer(); if(timerDisplay) { timerDisplay.textContent = translations[currentLanguage].timerDraftCompleteText; timerDisplay.classList.add('timer-disabled'); timerDisplay.disabled = true; timerDisplay.title = translations[currentLanguage].timerDraftCompleteTitle; } if(blueColumn) blueColumn.classList.remove('draft-disabled'); if(redColumn) redColumn.classList.remove('draft-disabled'); if(nextDraftButton) nextDraftButton.disabled = !canNext; if(swapButton) swapButton.disabled = !canSwap; if(clearPicksButton) clearPicksButton.disabled = !canClear; if(toggleTimerButton) toggleTimerButton.disabled = true; if(newPriorityFilterButton) newPriorityFilterButton.disabled = !canTogglePriority; if(resetButton) resetButton.disabled = !canReset; if (championGridElement) championGridElement.style.pointerEvents = 'none'; }
        updateChampionAvailability(); displayGloballyBanned();
        document.querySelectorAll('.pick-slot').forEach(slot => { const champId = getSlotChampionId(slot.id); slot.style.cursor = isDraftComplete && champId && can('swapSides') ? 'pointer' : 'default'; slot.title = isDraftComplete && champId && can('swapSides') ? translations[currentLanguage].swapPickSelect : ''; });
        updateNicknameEditability();
    }
    function updateChampionAvailability() { /* ... (no changes needed) ... */ if (!isDraftInitialized) return; const combinedDisabled = new Set([...selectedChampions, ...globallyDisabledChampions]); document.querySelectorAll('.champion-card').forEach(card => { const champId = card.dataset.championId; const isDisabled = combinedDisabled.has(champId); const isSelected = selectedChampions.has(champId); card.classList.toggle('selected', isSelected); card.classList.toggle('disabled', isDisabled); card.disabled = isDisabled; card.setAttribute('aria-disabled', isDisabled.toString()); }); }
    function handleChampionPreview(champion) { /* ... (uses translations) ... */
        if (!isDraftStarted || isDraftComplete) return; const draftOrder = getDraftOrder(); if (currentStep >= draftOrder.length) return; const currentAction = draftOrder[currentStep]; if (currentUserRole !== 'admin' && userTeamSide !== currentAction.team) return;
        const permissionNeeded = currentAction.type === 'pick' ? 'pickChampion' : 'banChampion'; const permKey = currentAction.type === 'pick' ? 'permDeniedPreviewPick' : 'permDeniedPreviewBan'; if (!hasPermission(permissionNeeded, currentAction.team)) { showStatusMessage(permKey, 2000); return; }
        const isDisabled = selectedChampions.has(champion.id) || globallyDisabledChampions.has(champion.id); if (isDisabled) { showStatusMessage("championAlreadySelected", 2000, { name: champion.name[currentLanguage] }); return; }
        const slotElement = document.getElementById(currentAction.slot); if (slotElement) { document.querySelectorAll('.preview-flash').forEach(el => el.classList.remove('preview-flash')); previewedChampion = champion; const existingNickname = pickNicknames[currentAction.slot] || ''; fillSlot(slotElement, champion, currentAction.type, existingNickname); slotElement.classList.add('preview-flash'); if(confirmPickBanButton) confirmPickBanButton.disabled = !hasPermission('confirmAction', currentAction.team); } else { console.warn(`Preview failed: Slot element ${currentAction.slot} not found.`); }
     }
    function handleConfirmPickBan() { /* ... (uses translations) ... */
        console.log("handleConfirmPickBan called"); if (!previewedChampion || !isDraftStarted || isDraftComplete) return; const draftOrder = getDraftOrder(); if (currentStep >= draftOrder.length) return; const currentAction = draftOrder[currentStep]; if ((currentUserRole !== 'admin' && userTeamSide !== currentAction.team) || !hasPermission('confirmAction', currentAction.team)) { showStatusMessage("permDeniedConfirm", 2000); return; }
        const championToConfirm = previewedChampion; const slotElement = document.getElementById(currentAction.slot); const isDisabled = selectedChampions.has(championToConfirm.id) || globallyDisabledChampions.has(championToConfirm.id); if (!slotElement || isDisabled) { console.warn("Confirmation failed: Slot not found or champion unavailable."); previewedChampion = null; if(confirmPickBanButton) confirmPickBanButton.disabled = true; if (slotElement) slotElement.classList.remove('preview-flash'); return; }
        console.log(`Confirming ${championToConfirm.id} for slot ${currentAction.slot}`); slotElement.classList.remove('preview-flash'); const previousNickname = pickNicknames[currentAction.slot] || ''; selectedChampions.add(championToConfirm.id); draftHistory.push({ championId: championToConfirm.id, slotId: currentAction.slot, step: currentStep, previousNickname: previousNickname, type: currentAction.type, team: currentAction.team }); currentStep++; previewedChampion = null; resetTimerDisplay(); updateDraftUI(); filterChampions();
    }
    function fillSlot(slotElement, champion, type, nicknameText = '') { /* ... (Already modified) ... */
        if (!slotElement || !champion) return; slotElement.innerHTML = ''; slotElement.classList.remove('preview-flash'); const img = document.createElement('img'); img.alt = champion.name[currentLanguage]; img.className = 'w-full h-full object-cover block absolute inset-0 z-0 pointer-events-none'; let imageUrl; if (type === 'pick') { const isMobileView = window.innerWidth <= 768; imageUrl = isMobileView ? champion.iconUrl : champion.splashUrl; } else { imageUrl = champion.iconUrl; } img.src = imageUrl;
        img.onerror = () => { const errorSpan = document.createElement('span'); errorSpan.className = 'text-[1.5vmin] text-red-400'; errorSpan.textContent = 'Err'; slotElement.innerHTML = ''; slotElement.appendChild(errorSpan); if (type === 'pick') { addNicknameInput(slotElement, nicknameText); } }; slotElement.appendChild(img);
        if (type === 'pick') { addNicknameInput(slotElement, nicknameText); slotElement.dataset.championId = champion.id; } else { delete slotElement.dataset.championId; }
        const baseAriaLabel = slotElement.getAttribute('aria-label')?.split(':')[0] || (type === 'pick' ? `Pick ${slotElement.id.slice(-1)}` : `Ban ${slotElement.id.slice(-1)}`); slotElement.setAttribute('aria-label', `${baseAriaLabel}: ${champion.name[currentLanguage]}`);
    }
    function addNicknameInput(slotElement, text = '') { /* ... (Already modified) ... */
         const nicknameInput = document.createElement('div'); nicknameInput.spellcheck = false; nicknameInput.className = 'nickname-input'; nicknameInput.textContent = text || ''; nicknameInput.dataset.slotId = slotElement.id; const canEdit = hasPermission('editNicknames'); nicknameInput.contentEditable = canEdit; nicknameInput.style.cursor = canEdit ? 'text' : 'default';
         if (canEdit) { nicknameInput.addEventListener('input', (e) => { const slotId = e.target.dataset.slotId; if (slotId) { pickNicknames[slotId] = e.target.textContent.trim(); } }); nicknameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }); } slotElement.appendChild(nicknameInput);
     }
    function restoreSlotPlaceholder(slotElement, slotId, nicknameText = '') { /* ... (Already modified) ... */
        if (!slotElement) return; slotElement.innerHTML = ''; slotElement.classList.remove('preview-flash', 'swap-selected', 'highlight-action'); delete slotElement.dataset.championId; slotElement.style.backgroundImage = ''; slotElement.style.cursor = 'default'; slotElement.title = '';
        const baseAriaLabel = slotElement.getAttribute('aria-label')?.split(':')[0] || (slotId.includes('-pick-') ? `Pick ${slotId.slice(-1)}` : `Ban ${slotId.slice(-1)}`); slotElement.setAttribute('aria-label', `${baseAriaLabel}: Empty`);
        if (slotId && slotId.includes('-pick-')) { addNicknameInput(slotElement, nicknameText); pickNicknames[slotId] = nicknameText; } else { delete pickNicknames[slotId]; }
    }
    function getSlotChampionId(slotId) { /* ... (no changes needed) ... */ const slotElement = document.getElementById(slotId); return slotElement ? slotElement.dataset.championId : null; }
    function handleUndo() { /* ... (uses translations) ... */
         console.log("handleUndo called"); if (draftHistory.length === 0 || !isDraftStarted) return; const lastAction = draftHistory[draftHistory.length - 1]; if (!hasPermission('undoAction', lastAction.team)) { showStatusMessage("permDeniedUndo", 2000); return; }
         deselectSwapSlots(); draftHistory.pop(); if (!lastAction) return; console.log("Undoing action:", lastAction); currentStep = lastAction.step; selectedChampions.delete(lastAction.championId); const slotElement = document.getElementById(lastAction.slotId); if (slotElement) { restoreSlotPlaceholder(slotElement, lastAction.slotId, lastAction.previousNickname); } isDraftComplete = false; previewedChampion = null; resetTimerDisplay(); updateDraftUI(); filterChampions(); showStatusMessage("actionUndone", 1500);
    }

    // --- Reset Functions (Draft Specific - with permission checks) ---
    function resetDraftFull(force = false) { /* ... (uses translations) ... */
        console.log("resetDraftFull called, force:", force); if (!hasPermission('resetDraft')) { showStatusMessage("permDeniedReset", 2000); return; } const confirmationMessage = translations[currentLanguage].resetFullConfirmation; if (!force && !confirm(confirmationMessage)) { console.log("Full reset cancelled by user."); return; } console.log("resetDraftFull proceeding...");
        currentStep = 0; selectedChampions.clear(); draftHistory = []; pickNicknames = {}; globallyDisabledChampions.clear(); globalBanHistory = []; isDraftComplete = false; isDraftStarted = false; previewedChampion = null; deselectSwapSlots(); stopTimer(); draftTimerDuration = 30; resetTimerDisplay();
        document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => { restoreSlotPlaceholder(slot, slot.id, ''); slot.classList.remove('highlight-action', 'preview-flash'); });
        if (blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem('lobbyTeam1Name') || translations[currentLanguage].blueTeamDefaultName; if (redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem('lobbyTeam2Name') || translations[currentLanguage].redTeamDefaultName; if (blueScoreEl) blueScoreEl.textContent = ''; if (redScoreEl) redScoreEl.textContent = ''; if(blueColumn) blueColumn.classList.add('draft-disabled'); if(redColumn) redColumn.classList.add('draft-disabled'); if(championSearch) championSearch.value = ''; currentRoleFilter = 'All'; if(filterButtons) { filterButtons.forEach(btn => btn.classList.remove('active')); filterButtons[0]?.classList.add('active'); } isPriorityFilterActive = false; if (newPriorityFilterButton) { newPriorityFilterButton.setAttribute('aria-pressed', 'false'); /* Title updated by updateUIText */ }
        displayGloballyBanned(); updateChampionAvailability(); filterChampions(); updateDraftUI(); updateUIText(currentLanguage); showStatusMessage("resetFullComplete", 2000);
    }
    function resetCurrentGamePicksBans(force = false, keepGlobal = false) { /* ... (uses translations) ... */
         console.log("resetCurrentGamePicksBans called, force:", force, "keepGlobal:", keepGlobal); if (!hasPermission('clearDraft')) { showStatusMessage("permDeniedClear", 2000); return; } const globalPart = keepGlobal ? "" : translations[currentLanguage].resetCurrentGlobalPart; const confirmationMessage = translations[currentLanguage].resetCurrentConfirmation.replace('{global}', globalPart); if (!force && isDraftStarted && !isDraftComplete) { if (!confirm(confirmationMessage)) { console.log("resetCurrentGamePicksBans cancelled by user during draft."); return; } } console.log("resetCurrentGamePicksBans proceeding...");
         currentStep = 0; selectedChampions.clear(); draftHistory = []; if (!keepGlobal) { globallyDisabledChampions.clear(); globalBanHistory = []; console.log("Global bans cleared."); } else { console.log("Keeping global bans for next draft."); globallyDisabledChampions.forEach(champId => selectedChampions.add(champId)); } isDraftComplete = false; isDraftStarted = false; previewedChampion = null; deselectSwapSlots(); stopTimer(); resetTimerDisplay();
         document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => { const currentNickname = pickNicknames[slot.id] || ''; restoreSlotPlaceholder(slot, slot.id, currentNickname); slot.classList.remove('highlight-action', 'preview-flash'); }); if(blueColumn) blueColumn.classList.add('draft-disabled'); if(redColumn) redColumn.classList.add('draft-disabled'); displayGloballyBanned(); updateChampionAvailability(); filterChampions(); updateDraftUI(); const statusKey = keepGlobal ? "resetCurrentCompleteKeptGlobal" : "resetCurrentComplete"; showStatusMessage(statusKey, 2000, { global: globalPart });
    }

    // --- Other Handlers (Draft Specific - with permission checks) ---
    function handleStartDraft() { /* ... (uses translations) ... */ console.log("handleStartDraft called"); if (!hasPermission('startDraft')) { showStatusMessage("permDeniedStartDraft", 2000); return; } if (!isDraftStarted) { console.log("Starting draft..."); isDraftStarted = true; if(blueColumn) blueColumn.classList.remove('draft-disabled'); if(redColumn) redColumn.classList.remove('draft-disabled'); updateDraftUI(); } }
    const debouncedFilter = debounce(() => { filterChampions(); }, 250);
    function filterChampions() { /* ... (Already modified) ... */
        if (!isDraftInitialized || !championSearch || !championGridElement) return; const searchTerm = championSearch.value.toLowerCase().trim(); let visibleCount = 0;
        championGridElement.querySelectorAll('.champion-card').forEach(card => { const champId = card.dataset.championId; const nameEn = card.dataset.championNameEn || ''; const nameRu = card.dataset.championNameRu || ''; const champRoles = card.dataset.roles ? card.dataset.roles.split(',') : []; const searchMatch = nameEn.includes(searchTerm) || nameRu.includes(searchTerm) || champId.toLowerCase().includes(searchTerm); const roleMatch = currentRoleFilter === 'All' || (champRoles.length > 0 && champRoles.includes(currentRoleFilter)); const isPriority = priorityChampions.has(champId); const hideByPriorityFilter = isPriorityFilterActive && !isPriority; const isVisible = searchMatch && roleMatch && !hideByPriorityFilter; card.style.display = isVisible ? 'flex' : 'none'; if (isVisible) visibleCount++; const isDisabled = selectedChampions.has(champId) || globallyDisabledChampions.has(champId); card.classList.toggle('disabled', isDisabled); card.disabled = isDisabled; card.setAttribute('aria-disabled', isDisabled.toString()); card.classList.toggle('selected', selectedChampions.has(champId)); });
    }
    function deselectSwapSlots() { /* ... (no changes needed) ... */ if (selectedSwapSlotId) { const prevSelected = document.getElementById(selectedSwapSlotId); if (prevSelected) { prevSelected.classList.remove('swap-selected'); } selectedSwapSlotId = null; } }
    function handlePickContainerClick(event) { /* ... (uses translations) ... */
         if (event.target.classList.contains('nickname-input')) { return; } if (!hasPermission('swapSides')) { return; } const clickedSlot = event.target.closest('.pick-slot'); if (!isDraftComplete || !clickedSlot || !clickedSlot.dataset.championId) { deselectSwapSlots(); return; } const clickedSlotId = clickedSlot.id;
         if (!selectedSwapSlotId) { selectedSwapSlotId = clickedSlotId; clickedSlot.classList.add('swap-selected'); } else { if (selectedSwapSlotId === clickedSlotId) { deselectSwapSlots(); } else { const firstSlot = document.getElementById(selectedSwapSlotId); if (!firstSlot) { deselectSwapSlots(); return; } const team1 = selectedSwapSlotId.startsWith('blue') ? 'blue' : 'red'; const team2 = clickedSlotId.startsWith('blue') ? 'blue' : 'red'; if (team1 === team2) { const champId1 = firstSlot.dataset.championId; const champId2 = clickedSlot.dataset.championId; const champ1 = getChampionById(champId1); const champ2 = getChampionById(champId2); const nick1 = pickNicknames[selectedSwapSlotId] || ''; const nick2 = pickNicknames[clickedSlotId] || ''; pickNicknames[selectedSwapSlotId] = nick2; pickNicknames[clickedSlotId] = nick1; if (champ1 && champ2) { fillSlot(firstSlot, champ2, 'pick', nick2); fillSlot(clickedSlot, champ1, 'pick', nick1); showStatusMessage("swapConfirm", 2000, { champ1: champ1.name[currentLanguage], champ2: champ2.name[currentLanguage] }); } deselectSwapSlots(); } else { deselectSwapSlots(); selectedSwapSlotId = clickedSlotId; clickedSlot.classList.add('swap-selected'); } } }
     }
    function handleSwapTeams() { /* ... (uses translations) ... */
         console.log("handleSwapTeams called"); if (!hasPermission('swapSides')) { showStatusMessage("permDeniedSwap", 2000); return; }
         try {
             const tempName = blueTeamNameH2.textContent; blueTeamNameH2.textContent = redTeamNameH2.textContent; redTeamNameH2.textContent = tempName; const tempScore = blueScoreEl.textContent; blueScoreEl.textContent = redScoreEl.textContent; redScoreEl.textContent = tempScore; const storedName1 = localStorage.getItem('lobbyTeam1Name'); const storedName2 = localStorage.getItem('lobbyTeam2Name'); localStorage.setItem('lobbyTeam1Name', storedName2 || translations[currentLanguage].redTeamDefaultName); localStorage.setItem('lobbyTeam2Name', storedName1 || translations[currentLanguage].blueTeamDefaultName);
             globalBanHistory.forEach(ban => { ban.team = ban.team === 'blue' ? 'red' : 'blue'; }); displayGloballyBanned();
             if (isDraftComplete || !isDraftStarted) {
                 const newPickNicknames = {}; const newSelectedChampions = new Set(); const newBluePicks = []; const newRedPicks = []; const newBlueBans = []; const newRedBans = []; const currentBlueBans = []; const currentRedBans = [];
                 for(let i=1; i<=5; i++) { const blueBanSlotId = `blue-ban-${i}`; const redBanSlotId = `red-ban-${i}`; const blueBanChampId = draftHistory.find(a => a.slotId === blueBanSlotId)?.championId; const redBanChampId = draftHistory.find(a => a.slotId === redBanSlotId)?.championId; if(blueBanChampId) currentBlueBans.push(blueBanChampId); if(redBanChampId) currentRedBans.push(redBanChampId); const bluePickSlotId = `blue-pick-${i}`; const redPickSlotId = `red-pick-${i}`; const blueChampId = getSlotChampionId(bluePickSlotId); const redChampId = getSlotChampionId(redPickSlotId); const blueNick = pickNicknames[bluePickSlotId] || ''; const redNick = pickNicknames[redPickSlotId] || ''; if(redChampId) newBluePicks.push({ slotId: bluePickSlotId, champId: redChampId, nick: redNick }); if(blueChampId) newRedPicks.push({ slotId: redPickSlotId, champId: blueChampId, nick: blueNick }); newPickNicknames[bluePickSlotId] = redNick; newPickNicknames[redPickSlotId] = blueNick; }
                 currentRedBans.forEach((champId, index) => { if(champId) newBlueBans.push({ slotId: `blue-ban-${index+1}`, championId: champId }); }); currentBlueBans.forEach((champId, index) => { if(champId) newRedBans.push({ slotId: `red-ban-${index+1}`, championId: champId }); }); pickNicknames = newPickNicknames;
                 document.querySelectorAll('.pick-slot, .ban-slot').forEach(slot => { restoreSlotPlaceholder(slot, slot.id, pickNicknames[slot.id] || ''); });
                 newBlueBans.forEach(b => { const champ = getChampionById(b.championId); if(champ) fillSlot(document.getElementById(b.slotId), champ, 'ban'); if(b.championId) newSelectedChampions.add(b.championId); }); newRedBans.forEach(b => { const champ = getChampionById(b.championId); if(champ) fillSlot(document.getElementById(b.slotId), champ, 'ban'); if(b.championId) newSelectedChampions.add(b.championId); }); newBluePicks.forEach(p => { const champ = getChampionById(p.champId); if(champ) fillSlot(document.getElementById(p.slotId), champ, 'pick', p.nick); if(p.champId) newSelectedChampions.add(p.champId); }); newRedPicks.forEach(p => { const champ = getChampionById(p.champId); if(champ) fillSlot(document.getElementById(p.slotId), champ, 'pick', p.nick); if(p.champId) newSelectedChampions.add(p.champId); });
                 selectedChampions = newSelectedChampions; deselectSwapSlots(); showStatusMessage("swapSuccess", 2000);
             } else { console.warn("Attempted to swap teams during an active draft."); showStatusMessage("swapDuringDraftError", 3000); }
             updateChampionAvailability(); updateDraftUI();
         } catch (error) { console.error("Error in handleSwapTeams:", error); showStatusMessage("swapError", 3000); }
     }
    function handleToggleTimer() { /* ... (uses translations) ... */
         console.log("handleToggleTimer called"); if (!hasPermission('toggleTimerDuration')) { showStatusMessage("permDeniedToggleTimer", 2000); return; } if (isDraftStarted) { return; }
         draftTimerDuration = draftTimerDuration === 30 ? 45 : 30; resetTimerDisplay(); toggleTimerButton.title = translations[currentLanguage].toggleTimerTitle; showStatusMessage("timerToggled", 1500, { duration: draftTimerDuration }); console.log("Timer duration set to:", draftTimerDuration);
     }
    function handleRoleFilterClick(event) { /* ... (uses translations) ... */
         const clickedButton = event.currentTarget; if (!clickedButton || clickedButton.disabled) return; const role = clickedButton.dataset.role; if (!role) return; if (!hasPermission('useRoleFilters')) { showStatusMessage("permDeniedRoleFilter", 2000); return; }
         currentRoleFilter = role; if (filterButtons) { filterButtons.forEach(btn => { btn.classList.remove('active'); }); clickedButton.classList.add('active'); } filterChampions();
     }
    function handleNewPriorityFilterToggle() { /* ... (uses translations) ... */
        if (!hasPermission('togglePriorityFilter')) { showStatusMessage("permDeniedPriorityFilter", 2000); return; } isPriorityFilterActive = !isPriorityFilterActive;
        if (newPriorityFilterButton) { newPriorityFilterButton.setAttribute('aria-pressed', isPriorityFilterActive.toString()); newPriorityFilterButton.title = isPriorityFilterActive ? translations[currentLanguage].priorityFilterShowAllTitle : translations[currentLanguage].priorityFilterShowPriorityTitle; }
        filterChampions(); showStatusMessage(isPriorityFilterActive ? "priorityFilterOn" : "priorityFilterOff", 2000);
    }
    function displayGloballyBanned() { /* ... (Already modified) ... */
        if (!globalBansBlueContainer || !globalBansRedContainer || !globallyBannedDisplay) return; globalBansBlueContainer.innerHTML = ''; globalBansRedContainer.innerHTML = '';
        if (globalBanHistory.length > 0) {
            globallyBannedDisplay.classList.remove('hidden'); const blueFragment = document.createDocumentFragment(); const redFragment = document.createDocumentFragment();
            globalBanHistory.forEach(banInfo => { const champ = getChampionById(banInfo.championId); if (champ) { const iconDiv = document.createElement('div'); iconDiv.className = 'global-ban-icon'; const banTeamText = banInfo.team === 'blue' ? translations[currentLanguage].globalBanTeamBlue : translations[currentLanguage].globalBanTeamRed; const titleText = translations[currentLanguage].globalBanTitle.replace('{name}', champ.name[currentLanguage]).replace('{team}', banTeamText); iconDiv.title = titleText; iconDiv.setAttribute('aria-label', titleText); const img = document.createElement('img'); img.src = champ.iconUrl; img.alt = ""; img.loading = 'lazy'; img.onerror = () => { img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%234a5568'/%3E%3C/svg%3E`; }; iconDiv.appendChild(img); if (banInfo.team === 'blue') { blueFragment.appendChild(iconDiv); } else { redFragment.appendChild(iconDiv); } } });
            globalBansBlueContainer.appendChild(blueFragment); globalBansRedContainer.appendChild(redFragment);
        } else { globallyBannedDisplay.classList.add('hidden'); }
    }
    function handleNextDraft() { /* ... (uses translations) ... */
         console.log("handleNextDraft called"); if (!hasPermission('nextDraft')) { showStatusMessage("permDeniedNextDraft", 2000); return; } if (!isDraftComplete) { showStatusMessage("nextDraftErrorNotComplete", 3000); return; } let addedBansCount = 0;
         draftHistory.forEach(action => { if (action.type === 'pick' && !globallyDisabledChampions.has(action.championId)) { globalBanHistory.push({ championId: action.championId, team: action.team }); globallyDisabledChampions.add(action.championId); addedBansCount++; } });
         console.log(`handleNextDraft: Added ${addedBansCount} champions to global bans.`); resetCurrentGamePicksBans(false, true); showStatusMessage("nextDraftComplete", 2500);
    }
    function getDraftOrder() { /* ... (no changes needed) ... */ return [ { team: 'blue', type: 'ban', slot: 'blue-ban-1' }, { team: 'red', type: 'ban', slot: 'red-ban-1' }, { team: 'blue', type: 'ban', slot: 'blue-ban-2' }, { team: 'red', type: 'ban', slot: 'red-ban-2' }, { team: 'blue', type: 'ban', slot: 'blue-ban-3' }, { team: 'red', type: 'ban', slot: 'red-ban-3' }, { team: 'blue', type: 'pick', slot: 'blue-pick-1' }, { team: 'red', type: 'pick', slot: 'red-pick-1' }, { team: 'red', type: 'pick', slot: 'red-pick-2' }, { team: 'blue', type: 'pick', slot: 'blue-pick-2' }, { team: 'blue', type: 'pick', slot: 'blue-pick-3' }, { team: 'red', type: 'pick', slot: 'red-pick-3' }, { team: 'red', type: 'ban', slot: 'red-ban-4' }, { team: 'blue', type: 'ban', slot: 'blue-ban-4' }, { team: 'red', type: 'ban', slot: 'red-ban-5' }, { team: 'blue', type: 'ban', slot: 'blue-ban-5' }, { team: 'red', type: 'pick', slot: 'red-pick-4' }, { team: 'blue', type: 'pick', slot: 'blue-pick-4' }, { team: 'blue', type: 'pick', slot: 'blue-pick-5' }, { team: 'red', type: 'pick', slot: 'red-pick-5' }, ]; }

    // --- Tooltip Functions (Draft Specific) ---
    let tooltipTimeout;
    function showChampionTooltip(event, champion) { /* ... (Already modified) ... */
        clearTimeout(tooltipTimeout); tooltipTimeout = setTimeout(() => { if (!championTooltip || !champion) return; championTooltip.innerHTML = `<strong class="tooltip-title">${champion.name[currentLanguage]}</strong><span class="tooltip-name">${champion.title[currentLanguage]}</span>`; championTooltip.style.visibility = 'hidden'; championTooltip.style.display = 'block'; const tooltipRect = championTooltip.getBoundingClientRect(); championTooltip.style.visibility = ''; championTooltip.style.display = ''; const rect = event.target.getBoundingClientRect(); let top = rect.top - tooltipRect.height - 8; let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2); if (top < 0) top = rect.bottom + 8; if (left < 0) left = 5; else if (left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width - 5; championTooltip.style.left = `${left}px`; championTooltip.style.top = `${top}px`; championTooltip.classList.add('visible'); }, 100);
    }
    function hideChampionTooltip() { /* ... (no changes needed) ... */ clearTimeout(tooltipTimeout); if (championTooltip) { championTooltip.classList.remove('visible'); } }

    // --- Initial App Setup ---
     applyTheme(currentTheme);
     document.documentElement.lang = currentLanguage; // Set initial HTML lang
     updateUIText(currentLanguage); // Set initial UI text

     const initialRole = getRoleFromHash();
     if (initialRole) { currentUserRole = initialRole; navigateTo('draft'); }
     else { navigateTo('home'); }

}); // End DOMContentLoaded