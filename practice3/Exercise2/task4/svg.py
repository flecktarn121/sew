#!/bin/python

import xml.etree.ElementTree as ET

def main():
    filename = "rutas.xml"
    dom = parse_XML(filename)
    routes = get_routes(dom)
    for route in routes.keys():
        save_to_svg(route, routes[route])

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
            and a list of Milestone objects
    '''
    routes = {}
    for route in dom.findall("ruta"):
        route_name = route.get("nombre")
        routes[route_name] = []
        milestones = route.find("milestones").findall("milestone")
        for milestone in milestones:
            name = milestone.get("name")
            altitude = milestone.find("coordenadas").get("altitude")
            distance = milestone.find("distance").text
            routes[route_name].append(Milestone(name, altitude, distance))
    return routes

def save_to_svg(route_name, milestones):
    ''' Takes the dictionary of routes and milestones and parses it into a KML

        Args:
            routes (dict): the dictionary of routes and lists of milestones
    '''
    height = _calculate_height(milestones)
    root = ET.Element("svg", attrib={
        "xmlns":"http://www.w3.org/2000/svg",
        "version":"2.0",
        "height": str(height + 200)
        })
    polyline = ET.Element("polyline", attrib={
        "points":"",
        "style":"fill:white;stroke:red;stroke-width:4"})
    counter = 50
    root.append(polyline)
    # Add the first point to the polyline
    polyline.attrib["points"] = polyline.attrib["points"] + ("10" + ", " + str(height - 50) + " ")
    # Add teh caption to the point
    text = ET.Element("text", attrib={
        "x":"10",
        "y":str(height - 45),
        "style":"writing-mode: tb; glyph-orientation-vertical: 0;"
        })
    text.text = "Inicio"
    root.append(text)

    for milestone in milestones:
        altitude = int(milestone.altitude)
        _add_point((height - altitude - 50), root, polyline, counter, (height - 45), milestone.name)
        counter += 40
    # Add a point at the end, at the same height as the first point
    polyline.attrib["points"] = polyline.attrib["points"] + (str(counter - 40) + ", " + str(height - 50) + " ")
    # Return to the first point
    polyline.attrib["points"] = polyline.attrib["points"] + ("10" + ", " + str(height - 50) + " ")
    ET.ElementTree(root).write(route_name + ".svg", encoding="utf-8", xml_declaration=True)

def _calculate_height(milestones):
    # Returns the altitude of the maximun milestone, plus 150
    max_altitude = 0
    for milestone in milestones:
        if int(milestone.altitude) > max_altitude:
            max_altitude = int(milestone.altitude)
    return max_altitude + 150

def _add_point(altitude, root, polyline, x, y, caption):
    # Add the point to the polyline, and its caption
    polyline.attrib["points"] = polyline.attrib["points"] + (str(x) + ", " + str(altitude) + " ")
    text = ET.Element("text", attrib={
        "x":str(x),
        "y":str(y),
        "style":"writing-mode: tb; glyph-orientation-vertical: 0;"
        })
    text.text = caption
    root.append(text)

class Milestone:

    def __init__(self, name, altitude, distance):
        self.name = name
        self.altitude = altitude
        self.distance = distance

if __name__ == "__main__":
    exit(main())
