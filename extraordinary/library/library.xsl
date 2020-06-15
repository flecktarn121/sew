<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html"/>

    <xsl:template match="library">
        <html lang="es">
            <head>
                <meta CHARSET="UTF-8"/>
                <title>IES Rio Nora</title>
                <link rel="stylesheet" href="../style.css"/>
                <meta name="description" content="Página web del Instituto de Enseñanza Secundaria Rio Nora"/>
                <meta name="keywords" content="instituto, educación, Nora, Siero"/>
                <meta name="author" content="Ángel García Menéndez"/>
                <base href="https://flecktarn121.github.io/sew/extraordinary/"/>
            </head>
            <body>
                <header>
                    <img src="img/logo.jpg" alt="Logo del instituto"/>
                    <h1>Instituto de enseñanza secundaria Rio Nora</h1>
                    <nav>
                        <ul>
                            <li><a href="index.html">Centro</a></li>
                            <li><a href="departments.html">Departamentos</a></li>
                            <li><a href="library.html">Biblioteca</a></li>
                            <li><a href="activities.html">Extraescolares</a></li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <h2>Catálogo de la biblioteca <em>Paco Noval</em></h2>
                    <p>A continuación se exponen los diferentes títulos que se pueden encontrar en la biblioteca del IES Río Nora.</p>
                    <xsl:apply-templates/>
                </main>
                <footer>
                    <address>
                        IES Rio Nora
                        <ul>
                            <li>Dirección: C/ La Ferlera s/n, 33510, Pola de Siero</li>
                            <li>Teléfono: 985 720 833</li>
                            <li>Fax: 985 724 017</li>
                            <li>Email: info@iesrionora.es</li>
                        </ul>
                    </address>
                    <p>
                        <a href="http://validator.w3.org/check/referer" hreflang="en-us">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/bb/W3C_HTML5_certified.png"
                                alt="¡HTML5  válido!"
                                style="border:0;width:88px;height:31px"/></a>
                        <a href="https://jigsaw.w3.org/css-validator/check/referer">
                            <img style="border:0;width:88px;height:31px"
                                src="https://jigsaw.w3.org/css-validator/images/vcss"
                                alt="¡CSS Válido!" />
                        </a>
                    </p>
                </footer>
            </body>
        </html>

    </xsl:template>

    <xsl:template match="book">
        <section>
            <h2><xsl:value-of select="title"/></h2>
            <p>Título en el idioma original: <em><xsl:value-of select="@original"/></em></p>
            <p>Disponible: <strong><xsl:value-of select="@avaliable"/></strong></p>
            <p>ISBN: <em><xsl:value-of select="@isbn"/></em></p>
            <p><xsl:value-of select="description"/></p>
            <ul>
                <li>Fecha de publicación: <xsl:value-of select="date"/></li>
                <li>Cantidad de ejemplares disponibles: <xsl:value-of select="quantity"/></li>
                <li>Adquirido en <xsl:value-of select="adquisition"/></li>
                <li><xsl:apply-templates select="author"/></li>
            </ul>
            <xsl:apply-templates select="cover"/>
            <xsl:apply-templates select="adaptations"/>
        </section>
    </xsl:template>

    <xsl:template match="cover">
        <img src="img/{.}" alt="cubierta del libro"/>
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
                    <xsl:apply-templates select="photo"/>
                </li>
            </ul>
        </xsl:template>
        <xsl:template match="photo">
            <a href="img/{.}">Fotografía del autor</a>
        </xsl:template>

        <xsl:template match="adaptation">
            <section>
                <h3><xsl:value-of select="title"/></h3>
                <p>Tipo: <xsl:value-of select="@media"/></p>
                <p>Fecha de publicación: <xsl:value-of select="date"/></p>
                <p><xsl:value-of select="description"/></p>
            </section>
        </xsl:template>

    </xsl:stylesheet>
