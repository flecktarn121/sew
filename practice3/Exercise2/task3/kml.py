#!/bin/python

import xml.etree.ElementTree as ET

def main(args):
    dom = parse_XML(args.filename)
    
def parse_XML(filename):
    ''' Given an filename for the XML, return the root

        Args:
            filename (str): the name of the XML file

        Returns:
            ElementTree.Element: the root of the XML
    '''
