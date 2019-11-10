<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html"/>

    <xsl:template match="rutas">
        <html lang="es">
            <head>
                <title>Rutas</title>
                <link rel="stylesheet" type="text/css" href="style.css" />
            </head>
            <body>
                <header>
                    <h1>Rutas turísticas</h1>
                    <p>Conjunto de rutas turísticas de interés general</p>
                </header>
                <main>
                    <xsl:apply-templates/>
                </main>
            </body>
        </html>

    </xsl:template>

    <xsl:template match="ruta">
        <section>
            <h2><xsl:value-of select="@nombre"/></h2>
            <p><xsl:value-of select="descripcion"/></p>
            <ul>
                <li>Transporte: <xsl:value-of select="transporte"/></li>
                <li>Fecha: <xsl:value-of select="fecha"/></li>
                <li>Hora de inicio: <xsl:value-of select="inicio"/></li>
                <li>Duración aproximada: <xsl:value-of select="duracion"/></li>
                <li>Agencia: <xsl:value-of select="agencia"/></li>
                <li>Personas adecuadas: <xsl:value-of select="personas_adecuadas"/></li>
                <li>Punto de partida: <xsl:value-of select="partida"/>
                        (<xsl:value-of select="coordenadas/@longitude"/>
                            , <xsl:value-of select="coordenadas/@latitude"/>,
                            <xsl:value-of select="coordenadas/@altitude"/>)
                        </li>
                    </ul>
                    <p>Si se tuviese alguna duda, pueden consultarse las siguientes referencias:</p>
                    <xsl:apply-templates select="references"/>
                    <xsl:apply-templates select="milestones"/>
                </section>
            </xsl:template>

            <xsl:template match="references">
                <ul>
                    <xsl:for-each select="reference">
                        <li><a href="{@URL}"><xsl:value-of select="."/></a></li>
                    </xsl:for-each>
                </ul>
            </xsl:template>

            <xsl:template match="milestones">
                <p>La ruta incluye los siguientes hitos:</p>
                <xsl:apply-templates select="milestone"/>
            </xsl:template>

            <xsl:template match="milestone">
                <h3><xsl:value-of select="@name"/></h3>
                <p><xsl:value-of select="descripcion"/></p>
                <p>Las coordenadas del hito son (<xsl:value-of select="coordenadas/@longitude"/>,
                <xsl:value-of select="coordenadas/@latitude"/>,
                <xsl:value-of select="coordenadas/@altitude"/>)
                    , estando a una distancia de <xsl:apply-templates select="distance"/> del punto de partida.</p>
                <xsl:apply-templates select="photographs"/>
            </xsl:template>

            <xsl:template match="distance">
                <xsl:value-of select="."/><xsl:value-of select="@unit"/>
            </xsl:template>

            <xsl:template match="photographs">
                <xsl:for-each select="photograph">
                    <img src="{@URL}" alt="{.}"/>
                </xsl:for-each>
            </xsl:template>

            <xsl:template match="videos">
                <xsl:for-each select="video">
                    <video src="{@URL}" />
                </xsl:for-each>
            </xsl:template>

        </xsl:stylesheet>
