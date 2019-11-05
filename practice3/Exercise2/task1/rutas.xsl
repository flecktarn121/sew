<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html"/>

    <xsl:template match="/">
        <html lang="es">
            <head>
                <title>Rutas</title>
            </head>
            <body>
                <main>
                    <header>
                        <h1>Rutas turísticas</h1>
                        <p>Conjunto de rutas turísticas de interés general</p>
                    </header>
                    <xsl:for-each select="ruta">
                        <h2><xsl:value-of select="ruta//@nombre"/></h2>
                    </xsl:for-each>
                </main>
            </body>
        </html>

    </xsl:template>

    <xsl:template match="ruta">
        <section>
            <h2><xsl:value-of select="@nombre"/></h2>
        </section>
    </xsl:template>
</xsl:stylesheet>
