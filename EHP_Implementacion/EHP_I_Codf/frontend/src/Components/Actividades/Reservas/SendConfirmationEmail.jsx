import emailjs from '@emailjs/browser';
//import generateQRCode from './GenerateQRCode'; // recuerda crearlo

const sendConfirmationEmail = async (email, pendingPersons, actividadCompleta) => {
  const serviceID = 'service_4vakvbd';      // Tu Service ID real
  const templateID = 'template_df4sphw';    // Tu Template ID real
  const publicKey = 'Niz_Bii8hedWlMzk0';    // Tu Public Key real

  // Armar el texto que va a ir dentro del QR
  const infoQR = `
Actividad: ${actividadCompleta.descripcion}
Fecha: ${actividadCompleta.fecha} - Hora de Inicio: ${actividadCompleta.horaInicio}hs

Participantes:
${pendingPersons.map(p => `- ${p.fullName} (DNI: ${p.dni})`).join('\n')}
  `;


  // Codificamos el texto para pasarlo por URL
    const qrTextEncoded = encodeURIComponent(infoQR);

// Armamos el link al servicio QR
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrTextEncoded}`;

  // Parámetros que se envían al template de EmailJS
  const templateParams = {
    direccion_envio:  'ecoharmonypark@gmail.com',
    user_email: email,
    actividad_name: actividadCompleta.tipoActividad.descripcion,
    fecha: actividadCompleta.fecha,
    hora_inicio: actividadCompleta.horaInicio,
    participantes: pendingPersons.map(p => `- ${p.fullName} (DNI: ${p.dni})`).join('\n'),
    qr_code: qrCodeUrl
  };

  console.log('Enviando templateParams:', templateParams);
  // Enviar el correo


  return emailjs.send(serviceID, templateID, templateParams, publicKey)
    .then(response => {
      console.log('Correo enviado exitosamente:', response.status, response.text);
    })
    .catch(error => {
      console.error('Error al enviar el correo:', error);
    });
};

export default sendConfirmationEmail;
