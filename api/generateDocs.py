# /api/generate_doc.py
import json
from http.server import BaseHTTPRequestHandler
from docx import Document
import io

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Charger les données depuis un fichier JSON simulé
            data = {
                "missingCards": ["GER-1234", "SCO-5678", "HUN-9012", "SUI-3456", "ESP-7890", "ITA-2345"],
                "ownedCards": ["GER-2345", "SCO-6789", "HUN-0123"],
                "doubleCards": ["SUI-4567", "ESP-8901"]
            }
            
            # Mappage des codes de pays à leurs noms complets
            country_codes = {
                "GER": "Germany", "SCO": "Scotland", "HUN": "Hungary", "SUI": "Switzerland",
                "ESP": "Spain", "ITA": "Italy", "LEG": "Euro Legends", "FIN": "Finland",
                "NED": "Netherlands", "AUT": "Austria", "FRA": "France", "BEL": "Belgium",
                "SVK": "Slovakia", "ROM": "Romania", "ISR": "Israel", "ICE": "Iceland",
                "BIH": "Bosnia and Herzegovina", "UKR": "Ukraine", "TUR": "Turkiye",
                "GEO": "Georgia", "LUX": "Luxembourg", "GREC": "Greece", "KAZ": "Kazakhstan",
                "POR": "Portugal", "CZE": "Czechia"
            }

            # Création du document Word
            doc = Document()
            doc.add_heading('Liste des Cartes', level=1)

            # Ajouter les sections avec les cartes
            sections = [
                ('Cartes manquantes', data['missingCards']),
                ('Cartes acquises', data['ownedCards']),
                ('Cartes doubles', data['doubleCards'])
            ]

            for title, cards in sections:
                doc.add_heading(title, level=2)
                for card in cards:
                    prefix = card.split('-')[0]
                    country_name = country_codes.get(prefix, 'Unknown Country')
                    doc.add_paragraph(f"{country_name}: {card}")

            # Sauvegarde du document en mémoire
            mem_file = io.BytesIO()
            doc.save(mem_file)
            mem_file.seek(0)

            # Définition de l'en-tête pour le type MIME du document Word
            self.send_response(200)
            self.send_header('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            self.end_headers()
            self.wfile.write(mem_file.getvalue())

        except Exception as e:
            # Gestion des erreurs en renvoyant un code d'état HTTP 500
            self.send_error(500, f"An error occurred: {str(e)}")

