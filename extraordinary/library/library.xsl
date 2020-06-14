<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html"/>

    <xsl:template match="library">
        <html lang="es">
            <head>
                <title>Catálogo de la biblioteca Paco Noval</title>
            </head>
            <body>
                <header>
                    <h1>Catálogo de la biblioteca <em>Paco Noval</em></h1>
                    <p>A continuación se exponen los diferentes títulos que se pueden encontrar en la biblioteca del IES Río Nora.</p>
                </header>
                <main>
                    <xsl:apply-templates/>
                </main>
            </body>
        </html>

    </xsl:template>

    <xsl:template match="book">
        <section>
            <h2><xsl:value-of select="title"/></h2>
            <p>Título en el idioma original: <em><xsl:value-of select="@original"/></em></p>
            <p><xsl:value-of select="description"/></p>
            <ul>
                <li>Fecha de publicación: <xsl:value-of select="date"/></li>
                <li>Cantidad de ejemplares disponibles: <xsl:value-of select="quantity"/></li>
                <li>Adquirido en <xsl:value-of select="adquisition"/></li>
                <li><xsl:apply-templates select="author"/></li>
            </ul>
            <xsl:value-of select="cover">
                <img src="{.}" alt="cubierta del libro"/>
            </xsl:value-of>
            <xsl:apply-templates select="adaptations"/>
        </section>
    </xsl:template>

    <xsl:template match="adaptations">
        <xsl:apply-templates select="adaptation"/>
    </xsl:template>

    <xsl:template match="author">
        Autor: <xsl:value-of select="name"/>
        <ul>
            <li>Fecha de nacimiento: <xsl:value-of select="birth"/></li>
            <li>Fecha de la muerte: <xsl:value-of select="death"/></li>
            <li>
                <xsl:value-of select="photo">
                    <a href="{.}">Fotografía</a>
                </xsl:value-of>
            </li>
        </ul>
    </xsl:template>

    <xsl:template match="adaptation">
        <section>
            <h3><xsl:value-of select="title"/></h3>
            <p>Fecha de publicación: <xsl:value-of select="date"/></p>
            <p><xsl:value-of select="description"/></p>
        </section>
    </xsl:template>

</xsl:stylesheet>
