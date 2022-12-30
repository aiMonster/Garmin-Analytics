const ANALYTICS_URL = 'https://www.strava.com/athlete/analytics';
const ANALYTICS_PAGE_SELECTED = window.location.href === ANALYTICS_URL;

var attempts = 0;
const initialPageLoadInterval = setInterval(function () {
    const menuElement = document.getElementsByClassName('global-nav')[0];

    if (menuElement) {
        addAnalyticsMenuItem(menuElement);
        initAnalyticsPage();

        clearInterval(initialPageLoadInterval);
    }

    if (++attempts === 3) {
        clearInterval(initialPageLoadInterval);
    }
}, 100);

function addAnalyticsMenuItem(menuElement) {
    const analyticsItem = document.createElement("li");
    analyticsItem.classList.add('nav-item');

    if (ANALYTICS_PAGE_SELECTED) {
        analyticsItem.classList.add('selected');   
        document.title = "Analytics | Strava";
    }

    analyticsItem.innerHTML = '<a href="/athlete/analytics" class="nav-link">Analytics</a>';
    
    menuElement.appendChild(analyticsItem);
}

function initAnalyticsPage() {
    if (!ANALYTICS_PAGE_SELECTED) {
        return;
    }

    var iframe = document.createElement('iframe');
    iframe.src = chrome.runtime.getURL('index.html');
    iframe.style.cssText = 'width: 100%; height: calc(100vh - 60px);';

    var contentContainer = document.getElementsByClassName('error-page')[0];
    contentContainer.innerHTML = '';
    contentContainer.appendChild(iframe);

    iframe.contentWindow.postMessage([], "*");
}
