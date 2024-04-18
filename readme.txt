The code snippet is a JavaScript function that manages a collection of football cards for the UEFA Euro tournament. It allows users to add cards to their collection, mark cards as duplicates, and mark cards as given to others. The function also provides a way to export and import the card data in JSON format.

** Inputs **
The function takes input from the user through various HTML elements, such as text inputs and checkboxes. The user can enter card numbers, select checkboxes to mark cards, and upload JSON files to import card data.

Flow
The function starts by defining an empty array for owned cards, an empty array for missing cards, and an empty object for duplicate cards.
It then defines a constant variable euroCards that contains a nested object structure representing the available cards for each group in the tournament.
The function displayGroups is called to render the card groups and countries on the webpage.
The function onload is called when the page loads, which calls displayGroups and updates the lists of owned, missing, and duplicate cards.
The function defines a set validCards that contains all the valid card numbers from the euroCards object.
The function addCards is called when the user clicks a button to add cards to their collection. It extracts the card numbers from the input field, checks if the cards are valid, and updates the owned, missing, and duplicate cards lists accordingly.
The function moveSelectedToOwned is called when the user clicks a button to move selected missing cards to the owned cards list. It updates the owned and missing cards lists based on the user's selection.
The function updateList is called to update the HTML lists of owned, missing, and duplicate cards.
The function createCheckbox is called to create checkboxes for each card in the lists.
The function markAsDuplicate is called when the user clicks a button to mark selected owned cards as duplicates. It updates the duplicate cards object and clears the checkboxes.
The function exportDataToJson is called when the user clicks a button to export the card data as a JSON file. It creates a download link for the JSON file and triggers the download.
The function importDataFromJson is called when the user selects a JSON file to import card data. It reads the file content, parses it as JSON, and updates the owned, missing, and duplicate cards lists.
The function markGivenCards is called when the user clicks a button to mark given cards as duplicates. It updates the duplicate cards object based on the user's input.
The function markCheckedAsGiven is called when the user clicks a button to mark selected duplicate cards as given. It updates the duplicate cards object and removes the corresponding checkboxes.
The function displayFeedback is called to display feedback messages to the user after marking cards as given or removing duplicate cards.
Outputs
The function updates the HTML lists of owned, missing, and duplicate cards based on the user's actions. It also displays feedback messages to the user after adding cards, marking cards as given, or removing duplicate cards.

Usage example
// Add cards to the collection
addCards();

// Move selected missing cards to owned cards
moveSelectedToOwned();

// Mark selected owned cards as duplicates
markAsDuplicate();

// Export card data as JSON
exportDataToJson();

// Import card data from JSON
importDataFromJson(event);

// Mark given cards as duplicates
markGivenCards();

// Mark selected duplicate cards as given
markCheckedAsGiven(
