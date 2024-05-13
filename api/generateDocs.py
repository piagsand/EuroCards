# -*- coding: utf-8 -*-

from http.server import BaseHTTPRequestHandler
from docx import Document
import io
import json

class handler(BaseHTTPRequestHandler):
    def send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def do_OPTIONS(self):
        self.send_response(204)  # No Content
        self.send_cors_headers()
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        doc = Document()
        doc.add_heading('Liste des Cartes', level=1)

        sections = [
            ('Cartes manquantes', data.get('missingCards', [])),
            ('Cartes acquises', data.get('ownedCards', [])),
            ('Cartes doubles', data.get('duplicateCards', []))
        ]

        for title, cards in sections:
            doc.add_heading(title, level=2)
            for card in cards:
                doc.add_paragraph(card)

        mem_file = io.BytesIO()
        doc.save(mem_file)
        mem_file.seek(0)

        self.send_response(200)
        self.send_cors_headers()
        self.send_header('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        self.end_headers()
        self.wfile.write(mem_file.getvalue())

    def do_GET(self):
        self.send_response(200)
        self.send_cors_headers()
        self.send_header('Content-Type', 'text/plain')
        self.end_headers()
        self.wfile.write(b"API is working")
