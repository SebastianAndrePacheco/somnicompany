# SOMNI — Resumen de cambios y pendientes
Fecha: 20 mayo 2026

---

## Cambios realizados en esta sesión

### Animaciones del hero
- Logo flota suavemente (sube/baja 7px) con glow que pulsa en sincronía
- Ondas/pulsos salen desde detrás del logo y se expanden hasta llenar toda la pantalla
- Animaciones CSS del hero se pausan automáticamente cuando el usuario hace scroll hacia abajo (ahorra GPU)

### Sección Estándares — rediseño completo
- Título corregido: ahora dice "Diseñado para cumplir los estándares más exigentes de la industria"
- Las 4 cards ahora representan normativas reales: Codelco SIGO-ECC/RF27, SERNAGEOMIN DS132/DS76, ISO 45001, ICMM
- Cada card tiene badge con código normativo, descripción técnica e indicador verde de cumplimiento

### Sección Capa Adicional
- Eliminados los chips FCW / LDW / BSD / Alerta en cabina / Video por evento

### Rendimiento
- 8 imágenes convertidas a WebP — de 19.2MB a 432KB total (reducción del 97%)
- Video con preload="none" — no bloquea la carga inicial de la página
- will-change en carruseles ahora solo activo durante la transición, no permanente
- CSS duplicado eliminado — bloque .hviz-tag y @keyframes tag-drift redundante

### SEO / Meta
- og:image corregida — tenía un espacio en el nombre que rompía la URL en LinkedIn/WhatsApp
- Ahora apunta a somni-og.png con dimensiones declaradas (1200x630)

---

## Archivos nuevos que DEBEN subirse al servidor

Estos archivos se generaron y no estaban antes:

  reporte-ejecutivo.webp
  plataforma-gestion.webp
  alerta-sin-controles.webp
  alerta-con-riesgo.webp
  resultado-encuesta.webp
  correo-jornada.webp
  apr-00.webp
  apr-02.webp
  logo-iso-9001.webp
  logo-iso-14001.webp
  logo-iso-45001.webp
  somni-logo.png

## Archivos modificados que deben reemplazarse

  index.html  ← archivo principal con todos los cambios

Los archivos politica-privacidad.html y terminos.html NO cambiaron en esta sesión.

---

## Pendientes — requieren acción del equipo

1. GOOGLE ANALYTICS 4
   - Crear cuenta en analytics.google.com con la cuenta de Google de SOMNI
   - Crear una propiedad para somnicompany.com
   - Obtener el ID (formato: G-XXXXXXXXXX)
   - Entregárselo al desarrollador para insertarlo en index.html
   - Sin esto no se mide ningún tráfico ni conversión

2. IMAGEN OG PARA REDES SOCIALES (somni-og.png)
   - Crear imagen de 1200x630 píxeles en Canva
   - Incluir logo SOMNI + mensaje de marca sobre fondo oscuro
   - Guardarla con el nombre exacto: somni-og.png
   - Subirla junto al resto de archivos
   - Sin esta imagen LinkedIn y WhatsApp no muestran preview al compartir el link

3. VIDEO COMPRIMIDO
   - El archivo actual "video SOMNI.mp4" pesa 234MB — demasiado para web
   - Re-exportar desde el editor de video original en calidad web H.264
   - El peso objetivo es entre 5 y 8 MB (factor de reducción ~30x)
   - Reemplazar el archivo en el servidor con el mismo nombre

4. RESEND API KEY (formulario de contacto)
   - Verificar en panel Netlify → Settings → Environment Variables
   - La variable RESEND_API_KEY debe estar configurada
   - Si no está, el formulario de contacto no envía ningún correo

5. LOGOS DE CLIENTES EN FORMATO JFIF
   - Reemplazar estos 3 archivos por versión PNG o WebP:
     · Cliente MECSA.jfif
     · Cliente LEN.jfif
     · Cliente Inversiones con Impacto.jfif
   - El formato JFIF puede fallar en algunos navegadores

---

## Nota sobre cómo subir el sitio

Si el hosting es GoDaddy compartido (File Manager o FTP):
  - Subir todos los archivos a la carpeta public_html

Si el hosting es Netlify (según netlify.toml del proyecto):
  - Hacer deploy desde el panel de Netlify arrastrando la carpeta completa
  - O via Git si el repositorio está conectado
  - La función serverless del formulario (netlify/functions/contact.js) se activa automáticamente

---

Consultas: contacto@somnicompany.com
