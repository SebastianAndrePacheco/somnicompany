/**
 * SOMNI — Función serverless para envío de formulario de contacto
 * Servicio: Resend (resend.com)
 * Variable de entorno requerida: RESEND_API_KEY
 */

exports.handler = async (event) => {

  // Solo POST
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  // Parsear datos del formulario
  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Datos inválidos' }) };
  }

  const { nombre, empresa, email, industria, mensaje } = data;

  // Validación básica
  if (!nombre || !email || !empresa) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Faltan campos obligatorios' }) };
  }

  // Construir HTML del correo
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="es">
  <head><meta charset="UTF-8"/></head>
  <body style="font-family:'Helvetica Neue',Arial,sans-serif;background:#f4f6f8;padding:40px 20px;margin:0">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#0D1B2E,#070C49);padding:32px 40px;text-align:center">
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:24px;font-weight:900;color:#ffffff;letter-spacing:-.04em">SoMNi</div>
        <div style="font-size:12px;color:rgba(255,255,255,.5);margin-top:6px;letter-spacing:.12em;text-transform:uppercase">Nueva solicitud desde el sitio web</div>
      </div>

      <!-- Body -->
      <div style="padding:40px">
        <h2 style="font-size:18px;font-weight:700;color:#0D1B2E;margin:0 0 24px">Solicitud de Demo o Piloto</h2>

        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #f0f2f5;width:35%">
              <span style="font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.08em">Nombre</span>
            </td>
            <td style="padding:12px 0;border-bottom:1px solid #f0f2f5">
              <span style="font-size:14px;color:#111827;font-weight:600">${nombre}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #f0f2f5">
              <span style="font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.08em">Empresa</span>
            </td>
            <td style="padding:12px 0;border-bottom:1px solid #f0f2f5">
              <span style="font-size:14px;color:#111827;font-weight:600">${empresa}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #f0f2f5">
              <span style="font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.08em">Correo</span>
            </td>
            <td style="padding:12px 0;border-bottom:1px solid #f0f2f5">
              <a href="mailto:${email}" style="font-size:14px;color:#2581FC;font-weight:600">${email}</a>
            </td>
          </tr>
          ${industria ? `
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #f0f2f5">
              <span style="font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.08em">Industria</span>
            </td>
            <td style="padding:12px 0;border-bottom:1px solid #f0f2f5">
              <span style="font-size:14px;color:#111827">${industria}</span>
            </td>
          </tr>` : ''}
          ${mensaje ? `
          <tr>
            <td style="padding:12px 0" colspan="2">
              <span style="font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.08em;display:block;margin-bottom:8px">Mensaje</span>
              <div style="background:#f8fafc;border-radius:8px;padding:16px;font-size:14px;color:#374151;line-height:1.6">${mensaje}</div>
            </td>
          </tr>` : ''}
        </table>

        <!-- CTA -->
        <div style="margin-top:32px;text-align:center">
          <a href="mailto:${email}" style="display:inline-block;background:#2581FC;color:#ffffff;padding:12px 28px;border-radius:9px;font-size:14px;font-weight:700;text-decoration:none">
            Responder a ${nombre}
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb">
        <p style="font-size:12px;color:#9ca3af;margin:0">Mensaje enviado desde <strong>somnicompany.com</strong> · ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}</p>
      </div>

    </div>
  </body>
  </html>
  `;

  // Llamar a la API de Resend
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'SOMNI Contacto <contacto@somnicompany.com>',
        to: ['contacto@somnicompany.com'],
        reply_to: email,
        subject: `Nueva solicitud SOMNI — ${empresa} · ${industria || 'Sin industria'}`,
        html: htmlContent
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Error Resend:', result);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error al enviar el correo', detail: result })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: result.id })
    };

  } catch (error) {
    console.error('Error de red:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error de conexión con el servicio de correo' })
    };
  }
};
