self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Você tem uma nova mensagem!",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzPAf67wdQrlM9QBHmmzRD698sAoyom_scNdjvORD_BzIhSULE2K9MdI&s=10",
    badge: "https://example.com/badge.png",
    tag: "notificacao-personalizada",
    // Passando a URL do chat na propriedade data
    data: {
      url: "https://seusite.com/chat/123", // Substitua com a URL dinâmica do chat
    },
  };

  event.waitUntil(self.registration.showNotification("Nova Mensagem", options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Fecha a notificação

  // Obtém a URL que foi passada com a notificação
  const url =
    event.notification.data.url || "https://buzz-chat-live.netlify.app/"; // Caso a URL não exista, use uma URL padrão

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Verifica se já existe uma janela aberta com a URL desejada
      for (let client of windowClients) {
        if (client.url === url && "focus" in client) {
          return client.focus(); // Foca na janela aberta
        }
      }
      // Caso não exista uma janela, abre uma nova
      if (clients.openWindow) {
        return clients.openWindow(url); // Abre a URL
      }
    })
  );
});
