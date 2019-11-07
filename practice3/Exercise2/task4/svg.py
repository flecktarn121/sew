#!/bin/python

import xml.etree.ElementTree as ET
import simplekml

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
            and a list of Milestone objects'''
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
    root = ET.Element("svg", attrib={
        "xmlns":"http://www.w3.org/2000/svg",
        "version":"2.0"
        })
    # Se the name tag
    polyline = ET.Element("polyline", attrib={
        "points":"",
        "style":"fill:white;stroke:red;stroke-width:4"})
    print(route_name)
    max_altitude = calculate_max_height(milestones)
    counter = 10
    add_point(str(max_altitude), root, polyline, counter, 0, "")
    for milestone in milestones:
        altitude = str(int(milestone.altitude) + max_altitude)
        add_point(altitude, root, polyline, counter, (0), milestone.name)
        counter += 40
    add_point(str(max_altitude), root, polyline, counter - 40, 0, "")
    add_point(str(max_altitude), root, polyline, 10, 0, "")

    root.append(polyline)
    ET.ElementTree(root).write(route_name + ".svg", encoding="utf-8", xml_declaration=True)

def calculate_max_height(milestones):
    max_altitude = 0
    for milestone in milestones:
        if len(milestone.name) > max_altitude:
            max_altitude = 7 * len(milestone.name)
    print(max_altitude)
    return max_altitude

def add_point(altitude, root, polyline, x, y, caption):
    # TODO: the altitude will be the difference between the highest point +10 and the altitude of the point 
    # Then, at the end we need to adjut the line and write the first point again
    polyline.attrib["points"] = polyline.attrib["points"] + (str(x) + ", " + altitude + " ")
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
