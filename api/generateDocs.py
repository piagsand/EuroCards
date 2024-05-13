# -*- coding: utf-8 -*-


from http.server import BaseHTTPRequestHandler
from docx import Document
import io
import json

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        content_length = int(self.headers['Content-Length'])  # Obtient la taille des données POST
        post_data = self.rfile.read(content_length)  # Lit les données POST
        data = json.loads(post_data.decode('utf-8'))  # Décode les données JSON
        
        # Vos codes pays mappés
        country_codes = {
            "GER": "Germany", "SCO": "Scotland", "HUN": "Hungary", "SUI": "Switzerland",
            "ESP": "Spain", "CRO": "Croatia", "ITA": "Italy", "ALB": "Albania", "SVN": "Slovenia",
            "DEN": "Denmark", "SRB": "Serbia", "ENG": "England", "POL": "Poland", "EST": "Estonia",
            "WAL": "Wales", "FIN": "Finland", "NED": "Netherlands", "AUT": "Austria", "FRA": "France",
            "BEL": "Belgium", "SVK": "Slovakia", "ROM": "Romania", "ISR": "Israel", "ICE": "Iceland",
            "BIH": "Bosnia and Herzegovina", "UKR": "Ukraine", "TUR": "Turkey", "GEO": "Georgia",
            "LUX": "Luxembourg", "GRE": "Greece", "KAZ": "Kazakhstan", "POR": "Portugal", "CZE": "Czechia"
        }

        # Création d'un document Word
        doc = Document()
        doc.add_heading('Liste des Cartes', level=1)

        # Traite les différentes catégories de cartes
        sections = [
            ('Cartes manquantes', data.get('missingCards', [])),
            ('Cartes acquises', data.get('ownedCards', [])),
            ('Cartes doubles', data.get('doubleCards', []))
        ]
        for title, cards in sections:
            doc.add_heading(title, level=2)
            for card in cards:
                prefix = card.split('-')[0]
                country_name = country_codes.get(prefix, 'Unknown Country')
                doc.add_paragraph(f"{country_name}: {card}")

        # Sauvegarde le document Word en mémoire
        mem_file = io.BytesIO()
        doc.save(mem_file)
        mem_file.seek(0)

        self.send_response(200)
        self.send_header('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        self.end_headers()
        self.wfile.write(mem_file.getvalue())

    def do_OPTIONS(self):
        self.send_response(204)  # No Content
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

