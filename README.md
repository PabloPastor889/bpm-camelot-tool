# BPM & Camelot Tool

Web sencilla para calcular el tempo mediante pulsaciones y consultar
tonalidades compatibles según la rueda Camelot.

Incluye un ejercicio independiente de TypeScript que calcula los BPM
a partir de un intervalo entre pulsaciones y muestra el resultado
en la terminal.

## Tecnologías

- HTML
- CSS
- JavaScript
- TypeScript
- Node.js y npm
- Git y GitHub

## Instalación

Necesitas Git y Node.js LTS con npm.

1. Clona el repositorio:

   ```bash
   git clone https://github.com/PabloPastor889/bpm-camelot-tool.git
   ```

2. Entra en la carpeta:

   ```bash
   cd bpm-camelot-tool
   ```

3. Selecciona la rama del ejercicio TypeScript:

   ```bash
   git switch typescript-setup
   ```

4. Instala las dependencias:

   ```bash
   npm install
   ```

En PowerShell, si la ejecución de `npm.ps1` está bloqueada,
utiliza `npm.cmd` en lugar de `npm` y `npx.cmd` en lugar de `npx`.

## Ejecutar la web

Abre `index.html` en el navegador.

- Tap BPM: pulsa el botón siguiendo el ritmo para calcular el tempo.
- Reset: reinicia la medición.
- La barra espaciadora también permite registrar pulsaciones cuando
  el foco está fuera de los controles interactivos.
- Camelot: selecciona una tonalidad y pulsa el botón de búsqueda
  para consultar sus tonalidades compatibles.

La web utiliza `js/script.js`. El ejercicio de TypeScript se ejecuta
por separado y no sustituye ese archivo.

## Compilar y ejecutar el ejercicio TypeScript

1. Compila el código:

   ```bash
   npx tsc
   ```

2. Ejecuta el JavaScript generado:

   ```bash
   node dist/index.js
   ```

El ejemplo utiliza un intervalo de 500 milisegundos y muestra:

```text
Tempo: 120 BPM
```

## Variables de entorno

Este proyecto no necesita variables de entorno ni claves de acceso.

## Estructura del proyecto

- `index.html`: estructura de la web.
- `css/style.css`: estilos de la web.
- `js/script.js`: interacciones de Tap BPM y Camelot.
- `src/index.ts`: ejercicio de cálculo de BPM con TypeScript.
- `dist/`: JavaScript generado al compilar; no se sube a Git.
- `tsconfig.json`: configuración del compilador TypeScript.
- `package.json`: configuración y dependencias del proyecto.
- `package-lock.json`: versiones de las dependencias.
- `.gitignore`: archivos y carpetas excluidos del seguimiento.
- `README.md`: documentación del proyecto.