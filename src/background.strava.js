const ANALYTICS_URL = 'https://www.strava.com/athlete/analytics';
const ANALYTICS_PAGE_SELECTED = window.location.href === ANALYTICS_URL;

var attempts = 0;
const initialPageLoadInterval = setInterval(function () {
    const menuElement = document.getElementsByClassName('global-nav')[0];

    if (menuElement) {
        addAnalyticsMenuItem(menuElement);

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
    }

    analyticsItem.innerHTML = '<a href="/athlete/analytics" class="nav-link">Analytics</a>';
    
    menuElement.appendChild(analyticsItem);
}
