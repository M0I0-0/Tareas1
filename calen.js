document.addEventListener("DOMContentLoaded", function () {
    let calendarEl = document.getElementById("calendar");

    if (!calendarEl) {
        console.error("Error: No se encontró el elemento con id 'calendar'.");
        return;
    }

    let storedEvents = JSON.parse(localStorage.getItem("calendarEvents")) || [];

    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        selectable: true,
        editable: true,
        events: storedEvents,
        headerToolbar: {
            left: "title",  // Desactivar botones predeterminados
            center: "",
            right: "today,prev,next",
        },
        dateClick: function (info) {
            let eventTitle = prompt("Agregar evento en: " + info.dateStr);
            if (eventTitle) {
                let newEvent = {
                    id: Date.now().toString(),
                    title: eventTitle,
                    start: info.dateStr
                };

                storedEvents.push(newEvent);
                localStorage.setItem("calendarEvents", JSON.stringify(storedEvents));
                calendar.addEvent(newEvent);
            }
        },
        eventClick: function (info) {
            if (confirm("¿Deseas eliminar este evento?")) {
                info.event.remove();
                storedEvents = storedEvents.filter(event => event.id !== info.event.id);
                localStorage.setItem("calendarEvents", JSON.stringify(storedEvents));
            }
        }
    });

    calendar.render();
})