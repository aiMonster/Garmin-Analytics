const ANALYTICS_URL = 'https://connect.garmin.com/modern/analytics';
const ANALYTICS_PAGE_SELECTED = window.location.href === ANALYTICS_URL;

const initialPageLoadInterval = setInterval(function () {
    const menuElement = document.getElementsByClassName('main-nav-group dashboards')[0];

    if (menuElement) {
        addStyles();
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

function addStyles() {
    const styles = '<style>.content.page:has(iframe.garmin-analytics) { padding: 0px; }</style>';
    document.getElementsByTagName('head')[0].insertAdjacentHTML('afterbegin', styles);
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
    iframe.style.cssText = 'width: 100%; height: calc(100vh - 65px);';
    iframe.classList.add('garmin-analytics');

    var contentContainer = document.getElementsByClassName('content')[0];
    contentContainer.innerHTML = '';
    contentContainer.appendChild(iframe);

    window.addEventListener('message', (event) => {
        handleMessage(iframe, JSON.parse(event.data));
    });

   
}

function handleMessage(iframe, message) {
    if (!message.sender || message.sender !== 'GarminAnalytics') {
        return;
    }

    if (message.subject === 'initialLoadCompleted') {
        loadDataAsync(message.lastCachedItem).then((data) => {        
            const dataLoadedMessage = {
                sender: 'GarminAnalyticsWeb',
                subject: 'dataLoaded',
                activities: data,
                userInfo: getUserInfo()
            };

            iframe.contentWindow.postMessage(JSON.stringify(dataLoadedMessage), "*");
        }); 
    }
}

function getUserInfo() {
    const profileNavItem = document.getElementsByClassName('header-nav-item user-profile')[0];

    const userProfileId = profileNavItem.getElementsByClassName('header-nav-link')[0].href.split('/').pop();
    const fullName = profileNavItem.getElementsByClassName('full-name')[0].innerText;

    return {
        id: userProfileId,
        name: fullName
    };
}

async function loadDataAsync(lastCachedItem) {
    let page = 1;
    let loadedActivities = [];
    let allPagesLoaded = false;

    do {
        const response = await loadPageDataAsync(page++);
        loadedActivities = [...loadedActivities, ...response];

        const reachedCashedItems = lastCachedItem && response[response.length - 1].startTimeLocal <= lastCachedItem;
        allPagesLoaded = response.length === 0 || reachedCashedItems;
    } while (!allPagesLoaded);

    if (lastCachedItem) {
        loadedActivities = loadedActivities.filter((activity) => activity.startTimeLocal > lastCachedItem);
    }

    return loadedActivities.reverse();
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
