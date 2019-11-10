#!/bin/python
import xml.etree.ElementTree as ET

def title(dom):
    section= ET.Element("section")
    title = ET.Element("h1")
    title.text = dom.find("title").text
    section.append(title)
    intro = ET.Element("p")
    intro.text = "El pleno del día " + dom.find("date").text + " dio comienzo a las " + dom.find("beggining").text + " y finalizó a las " + dom.find("end").text +"."
    section.append(intro)
    return section

def agenda(dom):
    agenda = ET.Element("section")
    title = ET.Element("h2")
    title.text = "Orden del día"
    agenda.append(title)
    points = dom.findall("point")
    index = ET.Element("ol")
    for point in points:
        p = ET.Element("li")
        p.text = point.attrib["title"]
        index.append(p)
    agenda.append(index)
    return agenda

def parse_XML(filename):
    ''' Given an filename for the XML, return the root

        Args:
            filename (str): the name of the XML file

        Returns:
            ElementTree.Element: the root of the XML
    '''
    try:
        tree = ET.parse(filename)
        return tree.getroot()
    except FileNotFoundError:
        print("No file found under name " + filename)
        exit(-1)

def attendees(dom):
    ''' Given the nodes for the participants tag, generate a section with the attendees

        Args:
            dom (Element): '''
    content = ET.Element("section")
    title = ET.Element("h2")
    title.text = "Participantes"
    content.append(title)
    attendees = dom.findall("participant")
    index = ET.Element("ul")
    for attendee in attendees:
        a = ET.Element("li")
        a.text = attendee.text +" (" + attendee.attrib["position"] +")"
        index.append(a)
    content.append(index)
    return content

def vote(dom):
    ul = ET.Element("ul")
    for option in dom.findall("option"):
        li = ET.Element("li")
        li.append(ET.Element("p"))
        li.find("p").text = option.attrib["name"] + ": " + option.text + " votos"
        ul.append(li)
    return ul

def point(dom):
    content = ET.Element("section")
    title = ET.Element("h2")
    title.text = dom.attrib["title"]
    content.append(title)
    for element in list(dom):
        if element.tag == "intervention":
            intervention = element
            speaker = ET.Element("p")
            speaker.append(ET.Element("strong"))
            speaker.find("strong").text = intervention.attrib["speaker"] + ":"
            content.append(speaker)
            speech = ET.Element("p")
            speech.text = intervention.text
            content.append(speech)
        elif element.tag == "vote":
            content.append(vote(element))
    return content

def _add_doctype():
    # Literally because of the library
    #Greatest example of bodging
    line = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
    with open("minutes.xhtml", 'r+') as f:
        content = f.read()
        f.seek(0, 0)
        f.write(line.rstrip('\r\n') + '\n' + content)

def main():
    dom = parse_XML("minutes.xml")
    minutes = ET.Element("html")
    minutes.attrib["xmlns"] = "http://www.w3.org/1999/xhtml"
    minutes.append(ET.Element("head"))
    minutes.find("head").append(ET.Element("title"))
    minutes.find("head").find("title").text = "Minutes"
    minutes.append(ET.Element("link", attrib={
        "rel":"stylesheet",
        "type":"text/css",
        "href":"style.css"
        }))
    body = ET.Element("body")
    minutes.append(body)
    body.append(title(dom.find("content")))
    body.append(attendees(dom.find("participants")))
    body.append(agenda(dom.find("content").find("points")))
    for p in dom.find("content").find("points").findall("point"):
        body.append(point(p))
    ET.ElementTree(minutes).write("minutes.xhtml", encoding="UTF-8")
    _add_doctype()

if __name__ == "__main__":
    exit(main())
