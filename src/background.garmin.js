const ANALYTICS_URL = 'https://connect.garmin.com/modern/analytics';
const ANALYTICS_PAGE_SELECTED = window.location.href === ANALYTICS_URL;

const initialPageLoadInterval = setInterval(function () {
    const menuElement = document.getElementsByClassName('main-nav-group dashboards')[0];

    if (menuElement) {
        addIconsSource();
        addAnalyticsMenuItem(menuElement);
        initAnalyticsPage();

        clearInterval(initialPageLoadInterval);
    }
}, 100);

function addIconsSource() {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    link.rel = 'stylesheet';

    document.getElementsByTagName('head')[0].appendChild(link);
}

function addAnalyticsMenuItem(menuElement) {
    const activeTabStyleClass = ANALYTICS_PAGE_SELECTED ? 'active' : '';

    const analyticsItem = document.createElement("li");
    analyticsItem.classList.add('main-nav-item');
    analyticsItem.innerHTML = `
        <a href="/modern/analytics" class="main-nav-link ${ activeTabStyleClass }">
            <i class="nav-icon fa fa-bar-chart" aria-hidden="true"></i>
            <span class="nav-text">Analytics</span>
        </a>
    `;
    
    menuElement.appendChild(analyticsItem);
}

function initAnalyticsPage() {
    if (!ANALYTICS_PAGE_SELECTED) {
        return;
    }

    var iframe = document.createElement('iframe');
    iframe.src = chrome.runtime.getURL('index.html');
    iframe.style.cssText = 'width: 100%; height: calc(100vh - 120px);';

    var contentContainer = document.getElementsByClassName('content')[0];
    contentContainer.innerHTML = '';
    contentContainer.appendChild(iframe);

    loadDataAsync().then((data) => {
        iframe.contentWindow.postMessage(data.reverse(), "*");
    });    
}

async function loadDataAsync() {
    const dbConnection = await setupDbConnectionAsync();
    const cachedItems = await getAllItemsAsync(dbConnection);
    const lastCachedItemTime = cachedItems.length > 0 ? cachedItems[cachedItems.length - 1].startTimeLocal : null;

    let page = 1;
    let loadedActivities = [];
    let allPagesLoaded = false;

    do {
        const response = await loadPageDataAsync(page++);
        loadedActivities = [...loadedActivities, ...response];

        const reachedCashedItems = lastCachedItemTime && response[response.length - 1].startTimeLocal <= lastCachedItemTime;
        allPagesLoaded = response.length === 0 || reachedCashedItems;
    } while (!allPagesLoaded);

    if (cachedItems.length > 0) {
        loadedActivities = loadedActivities.filter((activity) => activity.startTimeLocal > lastCachedItemTime).reverse();
    }

    await insertItemsAsync(dbConnection,loadedActivities);

    dbConnection.close();

    return [...cachedItems, ...loadedActivities];
}

async function loadPageDataAsync(page) {
    const limit = 100;
    const start = (page - 1) * limit;

    const url = `https://connect.garmin.com/activitylist-service/activities/search/activities?limit=${limit}&start=${start}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'di-backend': 'connectapi.garmin.com',
            'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token
        }
    });

    return response.json();
}

function setupDbConnectionAsync() {
    return new Promise((resolve) => {
        const request = indexedDB.open("GarminAnalyticsDB", 1);

        request.onerror = function (event) {
            console.error("An error occurred with IndexedDB");
            console.error(event);
        };
    
        request.onupgradeneeded = function () {
            request.result.createObjectStore("activities", { keyPath: "startTimeLocal" });
        };
    
        request.onsuccess = function () {
            resolve(request.result);
        };
    });
}

function getAllItemsAsync(connection) {
    return new Promise((resolve) => {
        const transaction = connection.transaction("activities", "readwrite");
        const request = transaction.objectStore("activities").getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };
    });
}

function insertItemsAsync(connection, items) {
    return new Promise((resolve) => {
        const transaction = connection.transaction("activities", "readwrite");
        const store = transaction.objectStore("activities")

        items.forEach(item => store.add(item));

        resolve();
    });
}
