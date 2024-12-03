self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Você tem uma nova mensagem!",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzPAf67wdQrlM9QBHmmzRD698sAoyom_scNdjvORD_BzIhSULE2K9MdI&s=10",
    badge: "https://example.com/badge.png",
    tag: "notificacao-personalizada",
  };

  event.waitUntil(self.registration.showNotification("Nova Mensagem", options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("https://www.example.com"));
});
