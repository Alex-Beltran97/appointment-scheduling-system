import { config } from "../../config";
import { Appointment } from "../../models/consultants";

const emailTemplate = (appointment: Appointment, confirmation: boolean = true) => `
<body
  style="width:100%;min-height:100vh;font-size:16px;font-family:Arial,Helvetica,sans-serif;display:grid;grid-template-rows:80px auto 80px;margin:0;padding:0;box-sizing:border-box;">

  <header
    style="width:100%;height:80px;display:flex;justify-content:center;align-items:center;background-color:#6AADA3;">
    <figure>
      <img src="https://res.cloudinary.com/duzyd4ju7/image/upload/v1751192029/Rectangle_1_ezjazn.png" alt="logo" />
    </figure>
  </header>

  <main style="margin:16px 112px;display:flex;flex-direction:column;gap:16px;">
    <h1 style="text-align:center;">¡Hola, ${ appointment.clientFullName } !</h1>
    <hr />
    ${confirmation ? `
      <section class="appointment-details">
        <h2 style="font-size:18px;"> Tu cita fue agendada exitosamente </h2>
        <p p> A continuación, encontrarás los detalles de tu cita: </p>
        <table style="width:100%;border-collapse:collapse;margin:16px;">
          <tr>
            <th style="padding:8px;border:1px solid #000;text-align:left;"> ID Agendamiento </th>
            <td style="padding:8px;border:1px solid #000;text-align:left;">${appointment.appoinment_id}</td>
          </tr>
          <tr>
            <th style="padding:8px;border:1px solid #000;text-align:left;"> Fecha </th>
            <td style="padding:8px;border:1px solid #000;text-align:left;">${appointment.date}</td>
          </tr>
          <tr>
            <th style="padding:8px;border:1px solid #000;text-align:left;"> Franja </th>
            <td style="padding:8px;border:1px solid #000;text-align:left;">${appointment.start_time} -
              ${appointment.end_time}</td>
          </tr>
          <tr>
            <th style="padding:8px;border:1px solid #000;text-align:left;"> Duración </th>
            <td style="padding:8px;border:1px solid #000;text-align:left;">${appointment.service.durationMinutes}
              minutos</td>
          </tr>
          <tr>
            <th style="padding:8px;border:1px solid #000;text-align:left;"> Precio </th>
            <td style="padding:8px;border:1px solid #000;text-align:left;">$${appointment.service.price} COP</td>
          </tr>
          <tr>
            <th style="padding:8px;border:1px solid #000;text-align:left;"> Servicio </th>
            <td style="padding:8px;border:1px solid #000;text-align:left;">${appointment.service.name}</td>
          </tr>
          <tr>
            <th style="padding:8px;border:1px solid #000;text-align:left;"> Consultor </th>
            <td style="padding:8px;border:1px solid #000;text-align:left;">${appointment.consultant.name}
              ${appointment.consultant.lastName}</td>
          </tr>
          <tr>
            <th style="padding:8px;border:1px solid #000;text-align:left;"> Estado </th>
            <td style="padding:8px;border:1px solid #000;text-align:left;">${appointment.status.status}</td>
          </tr>
        </table>
      </section>

      <section class="cancellation-info">
        <h2 style="font-size:18px;">¿No puedes asistir a tu cita ? </h2>
        <hr />
        <p>Puedes reagendar o cancelar tu cita a continuación desde el siguiente enlace: </p>
        <a a href="${config.server.cors.frontUrl}change-appointement"
          style="display:inline-block;margin-top:16px;text-align:center;text-decoration:none;color:#fff;background-color:#6A96AD;border:none;padding:8px 16px;cursor:pointer;font-size:16px;">
          Reagendar o cancelar cita </a>
      </section>
    ` : `
      <section class="appointment-details">
        <h2 style="font-size:18px;"> Tu cita fue cancelada exitosamente</h2>
        <p>Te invitamos a buscar mas de nuestros servicios</p>   
      </section>

      <section class="cancellation-info">
        <a a href="${config.server.cors.frontUrl}search"
          style="display:inline-block;margin-top:16px;text-align:center;text-decoration:none;color:#fff;background-color:#6A96AD;border:none;padding:8px 16px;cursor:pointer;font-size:16px;">
          Buscar más servicios</a>
      </section>
    `}
  </main>

  <footer style="width:100%;height:80px;display:flex;justify-content:center;align-items:center;background-color:#6A96AD;color:#fff; margin-top:2rem;">
    <p>© 2025 Monica Julieth Beltran Hernandez.Todos los derechos reservados.</p>
  </footer>
</body>

</html>
`;

export default emailTemplate;