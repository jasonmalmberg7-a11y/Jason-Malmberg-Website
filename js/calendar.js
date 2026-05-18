'use strict';

/*
 * Custom Google Calendar display for jasonmalmberg.org
 *
 * SETUP — add your API key to the page before this script loads:
 *   <script>window.GCAL_API_KEY = 'YOUR_KEY_HERE';</script>
 *
 * How to get an API key:
 *   1. Go to https://console.cloud.google.com/
 *   2. Create a project (or select an existing one)
 *   3. Enable the "Google Calendar API" under APIs & Services → Library
 *   4. Go to APIs & Services → Credentials → Create Credentials → API key
 *   5. Restrict the key to "HTTP referrers" and add jasonmalmberg.org/*
 *   6. Also restrict it to the Google Calendar API only
 *   7. Copy the key and paste it into the <script> tag on each page
 *
 * Each calendar container must have these data attributes:
 *   data-calendar-id       — the Calendar ID from Google Calendar settings
 *   data-max-events        — (optional) number of upcoming events to show, default 12
 *   data-gcal-fallback-url — (optional) full Google Calendar embed URL for a fallback link
 */

(function () {

  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var DAYS_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function formatTime(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    var h = d.getHours();
    var m = d.getMinutes();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + (m ? ':' + pad(m) : '') + ' ' + ampm;
  }

  function escHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function stripHtml(str) {
    return (str || '').replace(/<[^>]+>/g, '').trim();
  }

  function renderEvent(event) {
    var start    = event.start.dateTime || event.start.date;
    var isAllDay = !event.start.dateTime;
    var d        = new Date(start);

    var li = document.createElement('li');
    li.className = 'gig-item';

    var dayLabel  = DAYS_SHORT[d.getDay()];
    var timeStr   = isAllDay ? 'All day' : formatTime(start);
    var metaLine  = dayLabel + (timeStr ? ' · ' + timeStr : '');

    var location  = escHtml(event.location || '');
    var desc      = escHtml(stripHtml(event.description || ''));
    var title     = escHtml(event.summary || 'Event');

    li.innerHTML =
      '<div class="gig-date-block" aria-hidden="true">'
        + '<span class="gig-date-month">' + MONTHS[d.getMonth()] + '</span>'
        + '<span class="gig-date-day">'   + d.getDate()          + '</span>'
        + '<span class="gig-date-year">'  + d.getFullYear()      + '</span>'
      + '</div>'
      + '<div class="gig-info">'
        + '<div class="gig-info-title">' + title + '</div>'
        + '<div class="gig-info-meta">'  + metaLine + '</div>'
        + (location ? '<div class="gig-info-location">' + location + '</div>' : '')
        + (desc     ? '<div class="gig-info-desc">'     + desc     + '</div>' : '')
      + '</div>';

    li.setAttribute('aria-label',
      title + ', ' + DAYS[d.getDay()] + ' ' + MONTHS[d.getMonth()] + ' ' + d.getDate()
      + (timeStr && !isAllDay ? ' at ' + timeStr : ''));

    return li;
  }

  function showLoading(container) {
    container.innerHTML =
      '<div class="calendar-loading" role="status" aria-live="polite" aria-atomic="true">'
      + 'Loading upcoming gigs…'
      + '</div>';
  }

  function showEmpty(container, fallbackUrl) {
    container.innerHTML =
      '<div class="calendar-empty" role="status">'
      + 'No upcoming gigs scheduled right now. Check back soon.'
      + '</div>'
      + (fallbackUrl
          ? '<p class="calendar-footer"><a href="' + fallbackUrl
              + '" target="_blank" rel="noopener noreferrer">View full calendar →</a></p>'
          : '');
  }

  function showError(container, fallbackUrl) {
    container.innerHTML =
      '<div class="calendar-error" role="alert">'
      + 'Couldn’t load the calendar right now.'
      + (fallbackUrl
          ? ' <a href="' + fallbackUrl
              + '" target="_blank" rel="noopener noreferrer">View on Google Calendar →</a>'
          : '')
      + '</div>';
  }

  function showNoKey(container, fallbackUrl) {
    container.innerHTML =
      '<div class="calendar-error" role="alert">'
      + 'Calendar API key not configured. '
      + (fallbackUrl
          ? '<a href="' + fallbackUrl
              + '" target="_blank" rel="noopener noreferrer">View on Google Calendar →</a>'
          : 'See js/calendar.js for setup instructions.')
      + '</div>';
  }

  function renderList(container, events, fallbackUrl) {
    var ul = document.createElement('ul');
    ul.className = 'gig-list';
    ul.setAttribute('role', 'list');
    ul.setAttribute('aria-label', 'Upcoming gigs');

    events.forEach(function (ev) {
      ul.appendChild(renderEvent(ev));
    });

    container.innerHTML = '';
    container.appendChild(ul);

    if (fallbackUrl) {
      var footer = document.createElement('p');
      footer.className = 'calendar-footer';
      footer.innerHTML =
        '<a href="' + fallbackUrl
        + '" target="_blank" rel="noopener noreferrer">View full calendar →</a>';
      container.appendChild(footer);
    }
  }

  function fetchEvents(calendarId, apiKey, maxEvents, container, fallbackUrl) {
    var now = new Date().toISOString();
    var url =
      'https://www.googleapis.com/calendar/v3/calendars/'
      + encodeURIComponent(calendarId)
      + '/events'
      + '?key='         + encodeURIComponent(apiKey)
      + '&timeMin='     + encodeURIComponent(now)
      + '&maxResults='  + maxEvents
      + '&singleEvents=true'
      + '&orderBy=startTime';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          var data   = JSON.parse(xhr.responseText);
          var events = (data.items || []).filter(function (e) {
            return e.status !== 'cancelled';
          });
          if (events.length === 0) {
            showEmpty(container, fallbackUrl);
          } else {
            renderList(container, events, fallbackUrl);
          }
        } catch (e) {
          showError(container, fallbackUrl);
        }
      } else {
        showError(container, fallbackUrl);
      }
    };
    xhr.onerror = function () {
      showError(container, fallbackUrl);
    };
    xhr.send();
  }

  function initContainer(container) {
    var calendarId  = container.dataset.calendarId;
    var maxEvents   = parseInt(container.dataset.maxEvents, 10) || 12;
    var fallbackUrl = container.dataset.gcalFallbackUrl || '';
    var apiKey      = window.GCAL_API_KEY || '';

    if (!calendarId) return;
    if (!apiKey) {
      showNoKey(container, fallbackUrl);
      return;
    }

    showLoading(container);
    fetchEvents(calendarId, apiKey, maxEvents, container, fallbackUrl);
  }

  function init() {
    var containers = document.querySelectorAll('[data-calendar-id]');
    Array.prototype.forEach.call(containers, initContainer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
