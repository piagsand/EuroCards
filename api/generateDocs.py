from http.server import BaseHTTPRequestHandler
from docx import Document
import io
import json

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        # Pré-gérer la requête OPTIONS pour les requêtes CORS
        self.send_response(204)  # No Content
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_response(200)
        self.send_header('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        self.end_headers()

        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        doc = Document()
        doc.add_heading('Liste des Cartes', level=1)

        sections = [
            ('Cartes manquantes', data['missingCards']),
            ('Cartes acquises', data['ownedCards']),
            ('Cartes doubles', data['doubleCards'])
        ]

        for title, cards in sections:
            doc.add_heading(title, level=2)
            for card in cards:
                doc.add_paragraph(card)

        # Sauvegarde du document en mémoire
        mem_file = io.BytesIO()
        doc.save(mem_file)
        mem_file.seek(0)

        self.wfile.write(mem_file.getvalue())
