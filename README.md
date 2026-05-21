# SOMNI Company — Sitio Web

Sitio web corporativo de SOMNI Company, plataforma SaaS de gestión predictiva de fatiga y somnolencia para operaciones industriales de alto riesgo.

## Stack Tecnológico

- HTML5 semántico · CSS3 con variables custom · JavaScript vanilla
- Sin frameworks externos · Sin dependencias npm
- Fuentes: Google Fonts (Montserrat + Inter)
- Formulario: Web3Forms
- Hosting: Netlify (estático)

## Estructura de Archivos

```
/
├── index.html              ← Página principal
├── politica-privacidad.html
├── terminos.html
├── video.html
├── 404.html
├── sitemap.xml
├── robots.txt
├── _headers                ← Seguridad Netlify
├── _redirects              ← Rutas Netlify
├── SOMNI blnco y celeste.png
├── Icono SOMNI.png
├── dashboard-somni.png
├── Plataforma Gestión SOMNI.png
├── Reporte Ejecutivo PowerBi.png
├── APR_00.png / APR_01.png / APR_02.png  ← Avatares agentes IA
├── device-*.* ← Imágenes dispositivos
├── Cliente *.* ← Logos clientes
└── ...
```

## Configuración Pendiente

- [ ] Reemplazar `G-XXXXXXXXXX` en `index.html` con el ID real de Google Analytics 4
- [ ] Conectar dominio `somnicompany.com` en panel de Netlify
- [ ] Configurar SSL/HTTPS (automático con Netlify)
- [ ] Verificar sitio en Google Search Console
- [ ] Ejecutar `optimizar-imagenes.py` para convertir imágenes a WebP

## Deploy

El sitio se despliega automáticamente en Netlify al hacer push a la rama `main`.

Para deploy manual: arrastrar la carpeta a [app.netlify.com/drop](https://app.netlify.com/drop)

## Migración Futura

Este prototipo está listo para migrar a **Next.js + Tailwind + Sanity CMS**.
Todo el sistema de diseño, componentes y contenido están documentados en el HTML.

---

© 2025 SOMNI Company · Rancagua, Chile · contacto@somnicompany.com
