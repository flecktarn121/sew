---
title: "Informe de la práctica de HTML5"
author: "Ángel García Menéndez"
email: "UO258654@uniovi.es"
lang: "es-ES"
---
# Archivos del proyecto
El proyecto lo componen 7 archivos html:

- index.html: página introductoria donde se explica qué es la serie
- argumentoConcepción.html: explicación básica del argumento de la serie, así como su concepción.
- escenarios.html: breve reseña de los escenarios en los que se desarrolla la trama.
- música.html: mención a la banda sonora de la serie.
- personajes.html: índice de los principales personajes de la obra.
- temas.html: repaso de las diversas temáticas tratas en Los Soprano.
- temporadasPremios.html: recopilatorio de los premios con los que se galardonó a la serie, amén de las temporadas que la componen.

Todos ellos se encuentran a un nivel jerárquico igual dentro del directorio.
Se incluye además un documento _style.css_ , con la hoja de estilos empleada, y una carpeta _multimedia_ con las imágenes, vídeos y audios empleados.

# Estructura semántica

Todos los documentos siguen el mismo patrón:

- Una cabecera con los metadatos del sitio web.
- Un cuerpo que a su vez cuenta con:
    - Un encabezado con título y menú de navegación.
    - El contenido principal, dividido en secciones.
    - Un pie con enlaces de interés, información de contacto del autor, y los iconos de validación.

Todos los archivos han sido sometidos al validador del W3C, y ninguno presenta errores o advertencias.

# Resultados de las herramientas de comprobación

A continuación se exponen y explican los resultados de las herramientas de verificación, con las capturas de pantalla oportunas.

## Validador del W3C

Los html se han sometido a dicha herramienta, dando todos 0 errores y advertencias.

![Resultado del validador de html del w3c](validator.png){height=350px}

## TAW

Este validador ya arroja un total de 7 advertencias.
La mayoría son relacionadas con el contenido, ergo, difíciles de determinar categóricamente por una máquina.
El informe recomienda su revisión manual, pues no puede por sí misma la herramienta determinar si se cumple o no el criterio.
Estas son:

- Contenido no textual: se refiere a los vídeos y música, puesto que las imágenes poseen texto alternativo.
- Información y relaciones: si la información se ve reflejada en la estructura del etiquetado (como así es, por el uso de secciones y otras etiquetas de estructura).
- Páginas titulas: todas las páginas poseen el título del sitio más uno propio que describe el contenido del documento en particular
- Encabezado y etiquetas: los encabezados son por sí mismos descriptivos del contenido de la etiqueta que encabezan.

![Resultado de la herramienta TAW](taw.png){height=250px}

## WAVE

Como puede observarse en la figura 3, esta herramienta también arroja advertencias.
En este caso están relacionadas con el uso del `tabindex` y los atajos de teclado, dos elementos que son obligatorios para la práctica, y por ende no se puede prescindir de ellos.

![Resultados de la herramienta WAVE](wave.png){height=400px}

## Achecker

En este caso, la herramienta sí arroja un error como tal (ver figura 4).
Dicho error hace referencia al uso de la etiqueta `<i>`, la cual no se traduce bien a intérpretes textuales.
Recomiendo el uso de `<strong>` o `<em>`, siendo esta última la que se ha escogido para subsanar el error.

![Resultados de la herramienta achecker](achecker.png){height=400px}

## Google Mobile-friendly

Al tratarse de un sitio web con el marcado adecuado y con un CSS muy básico, la página no da ningún problema a la hora de funcionar en un dispositivo móvil.
La advertencia que se puede apreciar en la figura uno es devida al código del icono del w3c.

![Resultados del test de adaptabilidad móvil de Google](google.png){height=300px}
