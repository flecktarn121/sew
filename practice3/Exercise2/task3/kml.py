#!/bin/python

import xml.etree.ElementTree as ET

def main():
    filename = "rutas.xml"
    dom = parse_XML(filename)
    routes = get_routes(dom)
    save_to_kml(routes)


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

def get_routes(dom):
    ''' Given the root of the XML, return a dictionary with the routes

        Args:
            dom (ElementTree): the root of the XML

        Returns:
            dict(route name (str), list of milestones (Milestone)): a dictionary with the route name
            and a list of Milestone objects'''
    routes = {}
    for route in dom.findall("ruta"):
        route_name = route.get("nombre")
        routes[route_name] = []
        milestones = route.find("milestones").findall("milestone")
        for milestone in milestones:
            name = milestone.get("name")
            description = milestone.find("descripcion").text
            latitude = milestone.find("coordenadas").get("latitude")
            longitude = milestone.find("coordenadas").get("longitude")
            altitude = milestone.find("coordenadas").get("altitude")
            routes[route_name].append(Milestone(name, description, latitude, longitude, altitude))
    return routes

def save_to_kml(routes):
    ''' Takes the dictionary of routes and milestones and parses it into a KML

        Args:
            routes (dict): the dictionary of routes and lists of milestones
    '''
    root = ET.Element("kml", attrib={"xmlns":"http://www.opengis.net/kml/2.2"})
    # Se the name tag
    document = generate_document(root)

    for route in routes.keys():
        generate_placemark(route, routes, document)
    ET.ElementTree(root).write("rutas.kml", encoding="utf-8", xml_declaration=True)

def generate_placemark(route, routes, document):
    # Writes the coordinates for the route

    placemark = ET.Element("Placemark")
    placemark.append(ET.Element("name"))
    placemark.find("name").text = route
    placemark.append(ET.Element("description"))
    linestring = ET.Element("LineString")
    placemark.append(linestring)
    linestring.append(ET.Element("extrude"))
    linestring.find("extrude").text = "1"
    linestring.append(ET.Element("tessellate"))
    linestring.find("tessellate").text = "1"
    linestring.append(ET.Element("altitudeMode"))
    linestring.find("altitudeMode").text = "relativeToSeaFloor"
    coordinates = ""
    for milestone in routes[route]:
        lon = str(milestone.longitude)
        lat = str(milestone.latitude)
        alt = str(milestone.altitude)
        coordinates = coordinates + (lat + "," + lon + "," + alt + "\n")
    linestring.append(ET.Element("coordinates"))
    linestring.find("coordinates").text = coordinates
    document.append(placemark)


def generate_document(root):
    # Creaes the document node and some of its children
    document = ET.Element("Document")
    root.append(document)
    document.append(ET.Element("name"))
    document.find("name").text = "Rutas"
    document.append(ET.Element("description"))
    document.find("description").text = "Diversas rutas turisticas"
    return document


class Milestone:

    def __init__(self, name, description, latitude, longitude, altitude):
        self.name = name
        self.description = description
        self.latitude = latitude
        self.longitude = longitude
        self.altitude = altitude
if __name__ == "__main__":
    exit(main())
