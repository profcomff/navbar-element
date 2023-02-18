export default function swipe(el, sett) {
    // настройки по умолчанию
    var settings = Object.assign(
        {},
        {
            minDist: 60, // минимальная дистанция, которую должен пройти указатель, чтобы жест считался как свайп (px)
            maxDist: 120, // максимальная дистанция, не превышая которую может пройти указатель, чтобы жест считался как свайп (px)
            maxTime: 300, // максимальное время, за которое должен быть совершен свайп (ms)
            minTime: 50, // минимальное время, за которое должен быть совершен свайп (ms)
        },
        sett,
    );

    // коррекция времени при ошибочных значениях
    if (settings.maxTime < settings.minTime) settings.maxTime = settings.minTime + 500;
    if (settings.maxTime < 100 || settings.minTime < 50) {
        settings.maxTime = 700;
        settings.minTime = 50;
    }

    var dir, // направление свайпа (horizontal, vertical)
        swipeType, // тип свайпа (up, down, left, right)
        dist, // дистанция, пройденная указателем
        isMouse = false, // поддержка мыши (не используется для тач-событий)
        isMouseDown = false, // указание на активное нажатие мыши (не используется для тач-событий)
        startX = 0, // начало координат по оси X (pageX)
        distX = 0, // дистанция, пройденная указателем по оси X
        startY = 0, // начало координат по оси Y (pageY)
        distY = 0, // дистанция, пройденная указателем по оси Y
        startTime = 0, // время начала касания
        support = {
            // поддерживаемые браузером типы событий
            pointer: !!('PointerEvent' in window || 'msPointerEnabled' in window.navigator),
            touch: !!(
                typeof window.orientation !== 'undefined' ||
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                'ontouchstart' in window ||
                navigator.msMaxTouchPoints ||
                'maxTouchPoints' in window.navigator > 1 ||
                'msMaxTouchPoints' in window.navigator > 1
            ),
        };

    function isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    }
    var getSupportedEvents = function () {
        switch (isMobile()) {
            case false:
                events = {
                    type: 'pointer',
                    start: 'PointerDown',
                    move: 'PointerMove',
                    end: 'PointerUp',
                    cancel: 'PointerCancel',
                    leave: 'PointerLeave',
                };
                // добавление префиксов для IE10
                var ie10 =
                    window.navigator.msPointerEnabled && Function('/*@cc_on return document.documentMode===10@*/')();
                for (var value in events) {
                    if (value === 'type') continue;
                    events[value] = ie10 ? 'MS' + events[value] : events[value].toLowerCase();
                }
                break;
            case true:
                events = {
                    type: 'touch',
                    start: 'touchstart',
                    move: 'touchmove',
                    end: 'touchend',
                    cancel: 'touchcancel',
                };
                break;
            default:
                events = {
                    type: 'mouse',
                    start: 'mousedown',
                    move: 'mousemove',
                    end: 'mouseup',
                    leave: 'mouseleave',
                };
                break;
        }
        return events;
    };

    var eventsUnify = function (e) {
        return e.changedTouches ? e.changedTouches[0] : e;
    };

    var checkStart = function (e) {
        var event = eventsUnify(e);
        if (support.touch && typeof e.touches !== 'undefined' && e.touches.length !== 1) return; // игнорирование касания несколькими пальцами
        dir = 'none';
        swipeType = 'none';
        dist = 0;
        startX = event.pageX;
        startY = event.pageY;
        startTime = new Date().getTime();
        if (isMouse) isMouseDown = true; // поддержка мыши
    };

    var checkMove = function (e) {
        if (isMouse && !isMouseDown) return; // выход из функции, если мышь перестала быть активна во время движения
        var event = eventsUnify(e);
        distX = event.pageX - startX;
        distY = event.pageY - startY;
        if (Math.abs(distX) > Math.abs(distY)) dir = distX < 0 ? 'left' : 'right';
        else dir = distY < 0 ? 'up' : 'down';
    };

    var checkEnd = function (e) {
        if (isMouse && !isMouseDown) {
            // выход из функции и сброс проверки нажатия мыши
            isMouseDown = false;
            return;
        }
        var endTime = new Date().getTime();
        var time = endTime - startTime;
        if (time >= settings.minTime && time <= settings.maxTime) {
            // проверка времени жеста
            if (Math.abs(distX) >= settings.minDist && Math.abs(distY) <= settings.maxDist) {
                swipeType = dir; // опредление типа свайпа как "left" или "right"
            } else if (Math.abs(distY) >= settings.minDist && Math.abs(distX) <= settings.maxDist) {
                swipeType = dir; // опредление типа свайпа как "top" или "down"
            }
        }
        dist = dir === 'left' || dir === 'right' ? Math.abs(distX) : Math.abs(distY); // опредление пройденной указателем дистанции

        // генерация кастомного события swipe
        if (swipeType !== 'none' && dist >= settings.minDist) {
            var swipeEvent = new CustomEvent('swipe', {
                bubbles: true,
                cancelable: true,
                detail: {
                    full: e, // полное событие Event
                    dir: swipeType, // направление свайпа
                    dist, // дистанция свайпа
                    time, // время, потраченное на свайп
                },
            });
            el.dispatchEvent(swipeEvent);
        }
    };

    // добавление поддерживаемых событий
    var events = getSupportedEvents();
    console.log(events);

    // проверка наличия мыши
    if ((support.pointer && !support.touch) || events.type === 'mouse') isMouse = true;

    // добавление обработчиков на элемент
    el.addEventListener(events.start, checkStart);
    el.addEventListener(events.move, checkMove);
    el.addEventListener(events.end, checkEnd);
    if (support.pointer && support.touch) {
        el.addEventListener('lostpointercapture', checkEnd);
    }
}
