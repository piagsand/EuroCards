
import { jsPDF } from "jspdf";

function generatePDFContent(missingCards, duplicateCards) {
    // Create PDF document instance
    const doc = new JsPDF({ orientation: 'landscape' }); // Landscape orientation for better card layout

    // Add header section with application title and date
    doc.setFont('Arial', 'bold', 16);
    doc.text('Rapport sur les cartes Euro manquantes et en double', 20, 20);
    doc.setFont('Arial', 'normal', 12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35);

    // Add section for missing cards
    doc.setFont('Arial', 'bold', 14);
    doc.text('Cartes manquantes', 20, 50);
    doc.setFont('Arial', 'normal', 12);

    // Check if there are any missing cards
    if (missingCards.length === 0) {
        doc.text('Aucune carte manquante.', 20, 65);
    } else {
        // Create a table to display missing cards
        const table = {
            header: ['Pays', 'Code carte'],
            data: missingCards.map(card => [card.country, card.code])
        };

        doc.autoTable({
            startY: 65,
            table: table,
            theme: 'striped',
            styles: {
                fontSize: 10,
                columnWidth: {
                    country: 50,
                    cardCode: 50
                }
            }
        });
    }

    // Add section for duplicate cards
    doc.addPage(); // Start a new page for duplicate cards
    doc.setFont('Arial', 'bold', 14);
    doc.text('Cartes en double', 20, 20);
    doc.setFont('Arial', 'normal', 12);

    // Check if there are any duplicate cards
    if (Object.keys(duplicateCards).length === 0) {
        doc.text('Aucune carte en double.', 20, 35);
    } else {
        // Create a table to display duplicate cards
        const table = {
            header: ['Pays', 'Code carte', 'Nombre de doublons'],
            data: Object.entries(duplicateCards).map(([country, count]) => [country, count[0], count[1]])
        };

        doc.autoTable({
            startY: 35,
            table: table,
            theme: 'striped',
            styles: {
                fontSize: 10,
                columnWidth: {
                    country: 50,
                    cardCode: 50,
                    numDuplicates: 30
                }
            }
        });
    }

    return doc; // Return the generated PDF document instance
}

// Function to trigger PDF generation and download
function printOrExportPDF() {
    const missingCards = getMissingCards(); // Get an updated list of missing cards
    const duplicateCards = getDuplicateCards(); // Get an updated list of duplicate cards

    // Generate PDF content
    const doc = generatePDFContent(missingCards, duplicateCards);

    // Get user preference (print or export)
    const action = prompt("Voulez-vous imprimer ou exporter le rapport PDF ? (imprimer/exporter)", "imprimer");

    if (action.toLowerCase() === 'imprimer') {
        // Open the PDF in a new browser window for printing
        doc.output('dataurlnewwindow');
    } else if (action.toLowerCase() === 'exporter') {
        // Save the PDF to a file
        const fileName = prompt("Entrez le nom du fichier PDF:", "rapport-cartes-euro.pdf");
        if (fileName) {
            doc.save(fileName);
            alert(`Rapport PDF sauvegardé sous le nom ${fileName}.`);
        } else {
            alert("L'exportation du PDF a été annulée.");
        }
    } else {
        alert("Action non valide. Veuillez choisir 'imprimer' ou 'exporter'.");
    }
}

function getMissingCards() {
    const allCards = Object.values(euroCards).flat(); // Get all available cards from euroCards
    const missingCards = allCards.filter(card => !ownedCards.includes(card.code)); // Filter cards not found in ownedCards
    return missingCards;
}

// Function to get a list of duplicate cards
function getDuplicateCards() {
    const duplicates = {};
    for (const cardCode of ownedCards) {
        if (duplicates[cardCode]) {
            duplicates[cardCode]++;
        } else {
            duplicates[cardCode] = 1;
        }
    }

    // Filter out cards with only one instance (not duplicates)
    return Object.fromEntries(Object.entries(duplicates).filter(([code, count]) => count > 1));
}
