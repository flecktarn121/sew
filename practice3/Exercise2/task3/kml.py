#!/bin/python

import xml.etree.ElementTree as ET
import simplekml

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
    routes = {}
    for route in dom.findall("ruta"):
        route_name = route.get("nombre")
        routes[route_name] = []
        milestones = route.find("milestones").findall("milestone")
        for milestone in milestones:
            name = milestone.get("name")
            print(name)
            description = milestone.find("descripcion").text
            latitude = milestone.find("coordenadas").get("latitude")
            longitude = milestone.find("coordenadas").get("longitude")
            altitude = milestone.find("coordenadas").get("altitude")
            routes[route_name].append(Milestone(name, description, latitude, longitude, altitude))
    return routes

def save_to_kml(routes):
    kml=simplekml.Kml()

    for route in routes.keys():
        for milestone in routes[route]:
            kml.newpoint(name=milestone.name,description=milestone.description, coords=[(milestone.longitude, milestone.latitude, milestone.altitude)])
        break
    
    kml.save('rutas.kml')

class Milestone:

    def __init__(self, name, description, latitude, longitude, altitude):
        self.name = name
        self.description = description
        self.latitude = latitude
        self.longitude = longitude
        self.altitude = altitude
if __name__ == "__main__":
    exit(main())
