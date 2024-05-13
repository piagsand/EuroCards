# /api/generate_doc.py
from http.server import BaseHTTPRequestHandler
from docx import Document
import io

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Créez un document Word
        doc = Document()
        doc.add_paragraph('Hello from Vercel and Python!')
        doc_io = io.BytesIO()
        doc.save(doc_io)
        doc_io.seek(0)

        # Préparez la réponse
        self.send_response(200)
        self.send_header('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        self.end_headers()
        self.wfile.write(doc_io.getvalue())
