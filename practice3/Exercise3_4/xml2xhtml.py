#!/bin/python
import xml.etree.ElementTree as ET

def title(dom):
   title = ET.Element("h1")
   title.text = dom.text
   return title

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


def point(dom):
    content = ET.Element("section")
    title = ET.Element("h2")
    title.text = dom.attrib["title"]
    content.append(title)
    for intervention in dom.findall("intervention"):
        speaker = ET.Element("p")
        speaker.append(ET.Element("strong"))
        speaker.find("strong").text = intervention.attrib["speaker"] + ":"
        content.append(speaker)
        speech = ET.Element("p")
        speech.text = intervention.text
        content.append(speech)
    return content

def main():
    dom = parse_XML("minutes.xml")
    minutes = ET.Element("html")
    minutes.attrib["xmlns"] = "http://www.w3.org/1999/xhtml"
    body = ET.Element("body")
    minutes.append(body)
    body.append(title(dom.find("content").find("title")))
    body.append(attendees(dom.find("participants")))
    body.append(agenda(dom.find("content").find("points")))
    for p in dom.find("content").find("points").findall("point"):
        body.append(point(p))
    ET.ElementTree(minutes).write("minutes.xhtml")

if __name__ == "__main__":
    exit(main())
