document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // 🔑 Clave: Define el número de WhatsApp de Radd PC aquí (CÓDIGO PAÍS + NÚMERO, sin el '+')
    const RADD_PC_WHATSAPP_NUMBER = '573015122607'; // ⚠️ Reemplaza '573001234567' por el número real de Radd PC

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = contactForm.elements['nombre'].value;
        const email = contactForm.elements['email'].value;
        const mensaje = contactForm.elements['mensaje'].value;

        // Mensaje pre-llenado para WhatsApp, más completo:
        const whatsappMessage = `¡Hola Radd PC!
Soy ${nombre}, mi email es ${email} y estoy contactando desde la web para agendar una cita.
Mi requerimiento es: "${mensaje}".
¡Gracias!`;

        // URL de WhatsApp API para iniciar chat
        const whatsappURL = `https://wa.me/${RADD_PC_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

        // 1. Mostrar mensaje de éxito en la web
        const messageText = `¡Gracias por tu solicitud, ${nombre}! Te redirigiremos a WhatsApp para finalizar la agenda.`;
        
        formMessage.textContent = messageText;
        formMessage.style.backgroundColor = '#d4edda';
        formMessage.style.color = '#155724';
        formMessage.style.padding = '15px';
        formMessage.style.borderRadius = '5px';
        formMessage.classList.remove('hidden');

        contactForm.reset();

        // 2. **Redireccionamiento Clave a WhatsApp**
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
        }, 1500); // Espera 1.5 segundos antes de redirigir para que el usuario lea el mensaje
    });
});