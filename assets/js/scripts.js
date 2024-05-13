
// Exécution au chargement de la page
onload = function () {
    displayGroups();
    updateList('missingCards', missingCards);
    updateList('ownedCards', ownedCards);
    updateList('duplicateCards', Object.keys(duplicateCards).map(key => `${key} (${duplicateCards[key]}x)`));
}

let ownedCards = [];
let missingCards = [];
let duplicateCards = {};

/* ******************************************************* */
//Liste de toutes les cartes disponibles 
const euroCards = {
    "Euro Winner and hosts": {
        "UEFA": ["TOPPS-1", "UEFA-1", "UEFA-2", "UEFA-3"]
    },

    "Germany as host": {
        "EURO": ["EURO-1", "EURO-2", "EURO-3", "EURO-4", "EURO-5", "EURO-6", "EURO-7", "EURO-8", "EURO-9", "EURO-10", "EURO-11"]
    },

    "Group A": {
        "Special": ["GA-1", "GA-2"],

        "Germany": ["GER-P1", "GER-P2", "GER-PTW", "GER-SP", "GER-TOP1", "GER-TOP2", "GER-1", "GER-2", "GER-3", "GER-4", "GER-5", "GER-6", "GER-7", "GER-8", "GER-9", "GER-10", "GER-11", "GER-12", "GER-13", "GER-14", "GER-15", "GER-16", "GER-17", "GER-18", "GER-19", "GER-20", "GER-21"],
        "Scotland": ["SCO-P1", "SCO-P2", "SCO-PTW", "SCO-SP", "SCO-TOP1", "SCO-TOP2", "SCO-1", "SCO-2", "SCO-3", "SCO-4", "SCO-5", "SCO-6", "SCO-7", "SCO-8", "SCO-9", "SCO-10", "SCO-11", "SCO-12", "SCO-13", "SCO-14", "SCO-15", "SCO-16", "SCO-17", "SCO-18", "SCO-19", "SCO-20", "SCO-21"],
        "Hungary": ["HUN-P1", "HUN-P2", "SCO-PTW", "HUN-SP", "HUN-TOP1", "HUN-TOP2", "HUN-1", "HUN-2", "HUN-3", "HUN-4", "HUN-5", "HUN-6", "HUN-7", "HUN-8", "HUN-9", "HUN-10", "HUN-11", "HUN-12", "HUN-13", "HUN-14", "HUN-15", "HUN-16", "HUN-17", "HUN-18", "HUN-19", "HUN-20", "HUN-21"],
        "Switzerland": ["SUI-P1", "SUI-P2", "SUI-PTW", "SUI-SP", "SUI-TOP1", "SUI-TOP2", "SUI-1", "SUI-2", "SUI-3", "SUI-4", "SUI-5", "SUI-6", "SUI-7", "SUI-8", "SUI-9", "SUI-10", "SUI-11", "SUI-12", "SUI-13", "SUI-14", "SUI-15", "SUI-16", "SUI-17", "SUI-18", "SUI-19", "SUI-20", "SUI-21"]
    },

    "Group B": {
        "Special": ["GB-1", "GB-2"],

        "Spain": ["ES-P1", "ES-P2", "ES-PTW", "ES-SP", "ES-TOP1", "ES-TOP2", "ES-1", "ES-2", "ES-3", "ES-4", "ES-5", "ES-6", "ES-7", "ES-8", "ES-9", "ES-10", "ES-11", "ES-12", "ES-13", "ES-14", "ES-15", "ES-16", "ES-17", "ES-18", "ES-19", "ES-20", "ES-21"],
        "Croatia": ["CRO-P1", "CRO-P2", "CRO-PTW", "CRO-SP", "CRO-TOP1", "CRO-TOP2", "CRO-1", "CRO-2", "CRO-3", "CRO-4", "CRO-5", "CRO-6", "CRO-7", "CRO-8", "CRO-9", "CRO-10", "CRO-11", "CRO-12", "CRO-13", "CRO-14", "CRO-15", "CRO-16", "CRO-17", "CRO-18", "CRO-19", "CRO-20", "CRO-21"],
        "Italy": ["ITA-P1", "ITA-P2", "ITA-PTW", "ITA-SP", "ITA-TOP1", "ITA-TOP2", "ITA-1", "ITA-2", "ITA-3", "ITA-4", "ITA-5", "ITA-6", "ITA-7", "ITA-8", "ITA-9", "ITA-10", "ITA-11", "ITA-12", "ITA-13", "ITA-14", "ITA-15", "ITA-16", "ITA-17", "ITA-18", "ITA-19", "ITA-20", "ITA-21"],
        "Albania": ["ALB-P1", "ALB-P2", "ALB-PTW", "ALB-SP", "ALB-TOP1", "ALB-TOP2", "ALB-1", "ALB-2", "ALB-3", "ALB-4", "ALB-5", "ALB-6", "ALB-7", "ALB-8", "ALB-9", "ALB-10", "ALB-11", "ALB-12", "ALB-13", "ALB-14", "ALB-15", "ALB-16", "ALB-17", "ALB-18", "ALB-19", "ALB-20", "ALB-21"]
    },

    "Group C": {
        "Special": ["GC-1", "GC-2"],
        "Slovenia": ["SVN-P1", "SVN-P2", "SVN-PTW", "SVN-SP", "SVN-TOP1", "SVN-TOP2", "SVN-1", "SVN-2", "SVN-3", "SVN-4", "SVN-5", "SVN-6", "SVN-7", "SVN-8", "SVN-9", "SVN-10", "SVN-11", "SVN-12", "SVN-13", "SVN-14", "SVN-15", "SVN-16", "SVN-17", "SVN-18", "SVN-19", "SVN-20", "SVN-21"],
        "Denmark": ["DEN-P1", "DEN-P2", "DEN-PTW", "DEN-SP", "DEN-TOP1", "DEN-TOP2", "DEN-1", "DEN-2", "DEN-3", "DEN-4", "DEN-5", "DEN-6", "DEN-7", "DEN-8", "DEN-9", "DEN-10", "DEN-11", "DEN-12", "DEN-13", "DEN-14", "DEN-15", "DEN-16", "DEN-17", "DEN-18", "DEN-19", "DEN-20", "DEN-21"],
        "Serbia": ["SRB-P1", "SRB-P2", "SRB-PTW", "SRB-SP", "SRB-TOP1", "SRB-TOP2", "SRB-1", "SRB-2", "SRB-3", "SRB-4", "SRB-5", "SRB-6", "SRB-7", "SRB-8", "SRB-9", "SRB-10", "SRB-11", "SRB-12", "SRB-13", "SRB-14", "SRB-15", "SRB-16", "SRB-17", "SRB-18", "SRB-19", "SRB-20", "SRB-21"],
        "England": ["ENG-P1", "ENG-P2", "ENG-PTW", "ENG-SP", "ENG-TOP1", "ENG-TOP2", "ENG-1", "ENG-2", "ENG-3", "ENG-4", "ENG-5", "ENG-6", "ENG-7", "ENG-8", "ENG-9", "ENG-10", "ENG-11", "ENG-12", "ENG-13", "ENG-14", "ENG-15", "ENG-16", "ENG-17", "ENG-18", "ENG-19", "ENG-20", "ENG-21"],
        "Special": ["MM-1", "MM-2"],

    },

    "Group D": {
        "Special": ["GD-1", "GD-2"],
        "Poland": ["POL-1", "POL-2", "POL-3", "POL-4", "POL-5", "POL-6", "POL-7", "POL-8", "POL-9", "POL-10", "POL-11", "POL-12", "POL-13", "POL-14", "POL-15"],
        "Estonia": ["EST-1", "EST-2", "EST-3", "EST-4", "EST-5", "EST-6", "EST-7", "EST-8", "EST-9", "EST-10", "EST-11", "EST-12", "EST-13", "EST-14", "EST-15"],
        "Wales": ["WAL-1", "WAL-2", "WAL-3", "WAL-4", "WAL-5", "WAL-6", "WAL-7", "WAL-8", "WAL-9", "WAL-10", "WAL-11", "WAL-12", "WAL-13", "WAL-14", "WAL-15"],
        "Finland": ["FIN-1", "FIN-2", "FIN-3", "FIN-4", "FIN-5", "FIN-6", "FIN-7", "FIN-8", "FIN-9", "FIN-10", "FIN-11", "FIN-12", "FIN-13", "FIN-14", "FIN-15"],
        "Netherlands": ["NED-P1", "NED-P2", "NED-PTW", "NED-SP", "NED-TOP1", "NED-TOP2", "NED-1", "NED-2", "NED-3", "NED-4", "NED-5", "NED-6", "NED-7", "NED-8", "NED-9", "NED-10", "NED-11", "NED-12", "NED-13", "NED-14", "NED-15", "NED-16", "NED-17", "NED-18", "NED-19", "NED-20", "NED-21"],
        "Austria": ["AUT-P1", "AUT-P2", "AUT-PTW", "AUT-SP", "AUT-TOP1", "AUT-TOP2", "AUT-1", "AUT-2", "AUT-3", "AUT-4", "AUT-5", "AUT-6", "AUT-7", "AUT-8", "AUT-9", "AUT-10", "AUT-11", "AUT-12", "AUT-13", "AUT-14", "AUT-15", "AUT-16", "AUT-17", "AUT-18", "AUT-19", "AUT-20", "AUT-21"],
        "France": ["FRA-P1", "FRA-P2", "FRA-PTW", "FRA-SP", "FRA-TOP1", "FRA-TOP2", "FRA-1", "FRA-2", "FRA-3", "FRA-4", "FRA-5", "FRA-6", "FRA-7", "FRA-8", "FRA-9", "FRA-10", "FRA-11", "FRA-12", "FRA-13", "FRA-14", "FRA-15", "FRA-16", "FRA-17", "FRA-18", "FRA-19", "FRA-20", "FRA-21"]
    },

    "Group E": {
        "Special": ["GE-1", "GE-2"],
        "Belgium": ["BEL-P1", "BEL-P2", "BEL-PTW", "BEL-SP", "BEL-TOP1", "BEL-TOP2", "BEL-1", "BEL-2", "BEL-3", "BEL-4", "BEL-5", "BEL-6", "BEL-7", "BEL-8", "BEL-9", "BEL-10", "BEL-11", "BEL-12", "BEL-13", "BEL-14", "BEL-15", "BEL-16", "BEL-17", "BEL-18", "BEL-19", "BEL-20", "BEL-21"],
        "Slovakia": ["SVK-P1", "SVK-P2", "SVK-PTW", "SVK-SP", "SVK-TOP1", "SVK-TOP2", "SVK-1", "SVK-2", "SVK-3", "SVK-4", "SVK-5", "SVK-6", "SVK-7", "SVK-8", "SVK-9", "SVK-10", "SVK-11", "SVK-12", "SVK-13", "SVK-14", "SVK-15", "SVK-16", "SVK-17", "SVK-18", "SVK-19", "SVK-20", "SVK-21"],
        "Romania": ["ROM-P1", "ROM-P2", "ROM-PTW", "ROM-SP", "ROM-TOP1", "ROM-TOP2", "ROM-1", "ROM-2", "ROM-3", "ROM-4", "ROM-5", "ROM-6", "ROM-7", "ROM-8", "ROM-9", "ROM-10", "ROM-11", "ROM-12", "ROM-13", "ROM-14", "ROM-15", "ROM-16", "ROM-17", "ROM-18", "ROM-19", "ROM-20", "ROM-21"],
        "Israel": ["ISR-1", "ISR-2", "ISR-3", "ISR-4", "ISR-5", "ISR-6", "ISR-7", "ISR-8", "ISR-9", "ISR-10", "ISR-11", "ISR-12", "ISR-13", "ISR-14", "ISR-15"],
        "Iceland": ["ICE-1", "ICE-2", "ICE-3", "ICE-4", "ICE-5", "ICE-6", "ICE-7", "ICE-8", "ICE-9", "ICE-10", "ICE-11", "ICE-12", "ICE-13", "ICE-14", "ICE-15"],
        "Bosnia and Herzegovina": ["BIH-1", "BIH-2", "BIH-3", "BIH-4", "BIH-5", "BIH-6", "BIH-7", "BIH-8", "BIH-9", "BIH-10", "BIH-11", "BIH-12", "BIH-13", "BIH-14", "BIH-15"],
        "Ukraine": ["UKR-1", "UKR-2", "UKR-3", "UKR-4", "UKR-5", "UKR-6", "UKR-7", "UKR-8", "UKR-9", "UKR-10", "UKR-11", "UKR-12", "UKR-13", "UKR-14", "UKR-15"]
    },

    "Group F": {
        "Special": ["GF-1", "GF-2"],
        "Turkey": ["TUR-P1", "TUR-P2", "TUR-PTW", "TUR-SP", "TUR-TOP1", "TUR-TOP2", "TUR-1", "TUR-2", "TUR-3", "TUR-4", "TUR-5", "TUR-6", "TUR-7", "TUR-8", "TUR-9", "TUR-10", "TUR-11", "TUR-12", "TUR-13", "TUR-14", "TUR-15", "TUR-16", "TUR-17", "TUR-18", "TUR-19", "TUR-20", "TUR-21"],
        "Georgia": ["GEO-1", "GEO-2", "GEO-3", "GEO-4", "GEO-5", "GEO-6", "GEO-7", "GEO-8", "GEO-9", "GEO-10", "GEO-11", "GEO-12", "GEO-13", "GEO-14", "GEO-15"],
        "Luxembourg": ["LUX-1", "LUX-2", "LUX-3", "LUX-4", "LUX-5", "LUX-6", "LUX-7", "LUX-8", "LUX-9", "LUX-10", "LUX-11", "LUX-12", "LUX-13", "LUX-14", "LUX-15"],
        "Greece": ["GREC-1", "GREC-2", "GREC-3", "GREC-4", "GREC-5", "GREC-6", "GREC-7", "GREC-8", "GREC-9", "GREC-10", "GREC-11", "GREC-12", "GREC-13", "GREC-14", "GREC-15"],
        "Kazakhstan": ["KAZ-1", "KAZ-2", "KAZ-3", "KAZ-4", "KAZ-5", "KAZ-6", "KAZ-7", "KAZ-8", "KAZ-9", "KAZ-10", "KAZ-11", "KAZ-12", "KAZ-13", "KAZ-14", "KAZ-15"],
        "Portugal": ["POR-P1", "POR-P2", "POR-PTW", "POR-SP", "POR-TOP1", "POR-TOP2", "POR-1", "POR-2", "POR-3", "POR-4", "POR-5", "POR-6", "POR-7", "POR-8", "POR-9", "POR-10", "POR-11", "POR-12", "POR-13", "POR-14", "POR-15", "POR-16", "POR-17", "POR-18", "POR-19", "POR-20", "POR-21"],
        "Czechia": ["CZE-P1", "SCZECO-P2", "CZE-PTW", "CZE-SP", "CZE-TOP1", "CZE-TOP2", "CZE-1", "CZE-2", "CZE-3", "CZE-4", "CZE-5", "CZE-6", "CZE-7", "CZE-8", "CZE-9", "CZE-10", "CZE-11", "CZE-12", "CZE-13", "CZE-14", "CZE-15", "CZE-16", "CZE-17", "CZE-18", "CZE-19", "CZE-20", "CZE-21"],
    },

    "EURO LEGEND": {
        "EURO LEGEND": ["LEG-1", "LEG-2", "LEG-3", "LEG-4", "LEG-5", "LEG-6", "LEG-7", "LEG-8", "LEG-9", "LEG-10"]
    }
}
/* ******************************************************* */

//Liste des pays
const countryFlags = {

    "Germany": "./assets/img/de.svg", "Scotland": "./assets/img/gb-sct.svg",
    "Hungary": "./assets/img/hu.svg", "Switzerland": "./assets/img/ch.svg",
    "Spain": "./assets/img/es.svg", "Croatia": "./assets/img/hr.svg",
    "Italy": "./assets/img/it.svg", "Albania": "./assets/img/al.svg",
    "Slovenia": "./assets/img/si.svg", "Denmark": "./assets/img/dk.svg",
    "Serbia": "./assets/img/rs.svg", "England": "./assets/img/gb-eng.svg",
    "Poland": "./assets/img/pl.svg", "Estonia": "./assets/img/ee.svg",
    "Wales": "./assets/img/gb-wls.svg", "Finland": "./assets/img/fi.svg",
    "Netherlands": "./assets/img/nl.svg", "Austria": "./assets/img/at.svg",
    "France": "./assets/img/fr.svg", "Belgium": "./assets/img/be.svg",
    "Slovakia": "./assets/img/sk.svg", "Romania": "./assets/img/ro.svg",
    "Israel": "./assets/img/il.svg", "Iceland": "./assets/img/is.svg",
    "Bosnia and Herzegovina": "./assets/img/ba.svg", "Ukraine": "./assets/img/ua.svg",
    "Turkey": "./assets/img/tr.svg", "Georgia": "./assets/img/ge.svg",
    "Luxembourg": "./assets/img/lu.svg", "Greece": "./assets/img/gr.svg",
    "Kazakhstan": "./assets/img/kz.svg", "Portugal": "./assets/img/pt.svg",
    "Czechia": "./assets/img/cz.svg"
};
/* ******************************************************* */

//Affiche les données au démarrage en utilisant le DOM
/*cette fonction organise et affiche une structure complexe de données (groupes, pays, cartes) de manière interactive, 
en utilisant des éléments HTML dynamiquement générés et manipulés via JavaScript. */

// function displayGroups() {
//     const container = document.getElementById('groupsContainer');
//     const topNavigation = document.createElement('div');

//     topNavigation.className = 'top-navigation';
//     topNavigation.id = 'top-navigation';
//     container.innerHTML = '';

//     Object.keys(euroCards).forEach(group => {
//         const groupLinkId = `group-${group.replace(/\s+/g, '-').toLowerCase()}`;
//         const navLink = document.createElement('a');
//         navLink.href = `#${groupLinkId}`;
//         navLink.textContent = group;
//         topNavigation.appendChild(navLink);

//         const groupDiv = document.createElement('div');
//         groupDiv.id = groupLinkId;

//         const groupHeaderContainer = document.createElement('div');
//         groupHeaderContainer.style.display = 'flex';
//         groupHeaderContainer.style.alignItems = 'center';
//         groupHeaderContainer.style.justifyContent = 'center';

//         const groupHeader = document.createElement('h2');
//         groupHeader.textContent = group;
//         groupHeader.className = "countries";

//         groupHeader.onclick = () => {
//             document.getElementById('top-navigation').scrollIntoView({ behavior: 'smooth' });
//         };
//         groupHeaderContainer.appendChild(groupHeader);

//         const flagsContainer = document.createElement('div');
//         flagsContainer.className = 'flags-container';
//         flagsContainer.style.marginLeft = '10px';

//         const countriesDiv = document.createElement('div');

//         Object.keys(euroCards[group]).forEach(country => {
//             const countryId = `${group}-${country.replace(/\s+/g, '-').toLowerCase()}`;

//             if (countryFlags[country]) {
//                 const flagImg = document.createElement('img');
//                 flagImg.src = countryFlags[country];
//                 flagImg.alt = `Flag of ${country}`;
//                 flagImg.className = 'country-flag';
//                 flagImg.title = country;
//                 flagImg.onclick = () => {
//                     document.getElementById(countryId).scrollIntoView({ behavior: 'smooth' });
//                 };
//                 flagsContainer.appendChild(flagImg);
//             }

//             const countryDiv = document.createElement('div');
//             countryDiv.id = countryId;

//             const countryHeader = document.createElement('h3');
//             countryHeader.className = 'country-header';

//             if (countryFlags[country]) {
//                 const countryFlagImg = document.createElement('img');
//                 countryFlagImg.src = countryFlags[country];
//                 countryFlagImg.alt = `Flag of ${country}`;
//                 countryFlagImg.className = 'country-flag';

//                 countryFlagImg.onclick = () => {
//                     document.getElementById(groupLinkId).scrollIntoView({ behavior: 'smooth' });
//                 };
//                 countryHeader.appendChild(countryFlagImg);
//             }

//             countryHeader.appendChild(document.createTextNode(country));
//             countryDiv.appendChild(countryHeader);

//             const cardsList = document.createElement('ul');
//             cardsList.className = 'cards-missing-list';

//             euroCards[group][country].forEach(card => {
//                 if (!ownedCards.includes(card)) {
//                     const cardItem = document.createElement('li');
//                     cardItem.className = 'cards-missing-list-1';

//                     cardItem.style.cursor = 'pointer';

//                     const checkbox = document.createElement('input');
//                     checkbox.type = 'checkbox';
//                     checkbox.value = card;
//                     checkbox.name = card;

//                     checkbox.addEventListener('click', (e) => e.stopPropagation());

//                     cardItem.appendChild(checkbox);
//                     cardItem.appendChild(document.createTextNode(card));
//                     cardItem.addEventListener('click', () => {
//                         checkbox.checked = !checkbox.checked;
//                     });

//                     cardsList.appendChild(cardItem);
//                 }
//             });

//             countryDiv.appendChild(cardsList);
//             countriesDiv.appendChild(countryDiv);
//         });

//         groupHeaderContainer.appendChild(flagsContainer);
//         groupDiv.appendChild(groupHeaderContainer);
//         groupDiv.appendChild(countriesDiv);
//         container.appendChild(groupDiv);
//     });

//     container.insertBefore(topNavigation, container.firstChild);
// }
function displayGroups() {
    const container = document.getElementById('groupsContainer');
    const topNavigation = document.createElement('div');

    topNavigation.className = 'top-navigation';
    topNavigation.id = 'top-navigation';
    container.innerHTML = '';

    Object.keys(euroCards).forEach(group => {
        const groupLinkId = `group-${group.replace(/\s+/g, '-').toLowerCase()}`;
        const navLink = document.createElement('a');
        navLink.href = `#${groupLinkId}`;
        navLink.textContent = group;
        topNavigation.appendChild(navLink);

        const groupDiv = document.createElement('div');
        groupDiv.id = groupLinkId;

        const groupHeaderContainer = document.createElement('div');
        groupHeaderContainer.style.display = 'flex';
        groupHeaderContainer.style.alignItems = 'center';
        groupHeaderContainer.style.justifyContent = 'center';

        const groupHeader = document.createElement('h2');
        groupHeader.textContent = group;
        groupHeader.className = "countries";

        groupHeader.onclick = () => {
            document.getElementById('top-navigation').scrollIntoView({ behavior: 'smooth' });
        };
        groupHeaderContainer.appendChild(groupHeader);

        const flagsContainer = document.createElement('div');
        flagsContainer.className = 'flags-container';
        flagsContainer.style.marginLeft = '10px';

        const countriesDiv = document.createElement('div');

        Object.keys(euroCards[group]).forEach(country => {
            const countryId = `${group}-${country.replace(/\s+/g, '-').toLowerCase()}`;

            if (countryFlags[country]) {
                const flagImg = document.createElement('img');
                flagImg.src = countryFlags[country];
                flagImg.alt = `Flag of ${country}`;
                flagImg.className = 'country-flag';
                flagImg.title = country;
                flagImg.onclick = () => {
                    document.getElementById(countryId).scrollIntoView({ behavior: 'smooth' });
                };
                flagsContainer.appendChild(flagImg);
            }

            const countryDiv = document.createElement('div');
            countryDiv.id = countryId;

            const countryHeader = document.createElement('h3');
            countryHeader.className = 'country-header';

            if (countryFlags[country]) {
                const countryFlagImg = document.createElement('img');
                countryFlagImg.src = countryFlags[country];
                countryFlagImg.alt = `Flag of ${country}`;
                countryFlagImg.className = 'country-flag';

                countryFlagImg.onclick = () => {
                    document.getElementById(groupLinkId).scrollIntoView({ behavior: 'smooth' });
                };
                countryHeader.appendChild(countryFlagImg);
            }

            countryHeader.appendChild(document.createTextNode(country));
            countryDiv.appendChild(countryHeader);

            const cardsList = document.createElement('ul');
            cardsList.className = 'cards-missing-list';

            euroCards[group][country].forEach(card => {
                if (!ownedCards.includes(card)) {
                    const cardItem = document.createElement('li');
                    cardItem.className = 'cards-missing-list-1';

                    cardItem.style.cursor = 'pointer';

                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = card;
                    checkbox.name = card;

                    checkbox.addEventListener('click', (e) => e.stopPropagation());

                    cardItem.appendChild(checkbox);
                    cardItem.appendChild(document.createTextNode(card));
                    cardItem.addEventListener('click', () => {
                        checkbox.checked = !checkbox.checked;
                    });

                    cardsList.appendChild(cardItem);
                }
            });

            countryDiv.appendChild(cardsList);
            countriesDiv.appendChild(countryDiv);
        });

        groupHeaderContainer.appendChild(flagsContainer);
        groupDiv.appendChild(groupHeaderContainer);
        groupDiv.appendChild(countriesDiv);
        container.appendChild(groupDiv);
    });

    container.insertBefore(topNavigation, container.firstChild);
}

function addCards() {
    const cardInput = document.getElementById('cardInput');
    const cardNumbers = cardInput.value.split(',').map(card => card.trim().toUpperCase());
    cardInput.value = '';

    let addedCards = [];
    let duplicateCardsNotif = [];
    let invalidCards = [];

    cardNumbers.forEach(cardNumber => {
        if (!cardNumber) return;
        const normalizedCardNumber = cardNumber.toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/(\D)(\d)/g, '$1-$2');
        if (isCardValid(normalizedCardNumber)) {
            const index = missingCards.indexOf(normalizedCardNumber);
            if (ownedCards.includes(normalizedCardNumber)) {
                duplicateCards[normalizedCardNumber] = (duplicateCards[normalizedCardNumber] || 0) + 1;
                duplicateCardsNotif.push(normalizedCardNumber);
            } else {
                ownedCards.push(normalizedCardNumber);
                addedCards.push(normalizedCardNumber);
                if (index !== -1) missingCards.splice(index, 1);
            }
        } else {
            invalidCards.push(cardNumber);
        }
    });


    updateList('missingCards', missingCards);
    updateList('ownedCards', ownedCards);
    updateList('duplicateCards', Object.keys(duplicateCards).map(key => `${key} (${duplicateCards[key]}x)`));
    displayMessage(addedCards, duplicateCardsNotif, invalidCards);
    displayGroups(); // Ajout de cette ligne pour rafraîchir l'affichage des groupes

    console.log(duplicateCards);
}
function isCardValid(cardNumber) {
    const validCards = new Set(Object.values(euroCards).flatMap(group => Object.values(group).flat()));

    // Normalisation du numéro de la carte
    const normalizedCardNumber = cardNumber.toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/(\D)(\d)/g, '$1-$2');
    return validCards.has(normalizedCardNumber);
}

function displayMessage(addedCards, duplicateCards, invalidCards) {
    const messageElement = document.getElementById('message');
    let messages = [];

    if (addedCards.length > 0) {
        messages.push(`Les cartes suivantes ont été ajoutées : ${addedCards.join(', ')}`);
    }

    if (duplicateCards.length > 0) {
        messages.push(`Les cartes suivantes existent déjà, elles ont été ajoutées dans les doubles : ${duplicateCards.join(', ')}`);
    }

    if (invalidCards.length > 0) {
        messages.push(`Les cartes suivantes ne sont pas valides, veuillez vérifier : ${invalidCards.join(', ')}`);
    }

    messageElement.innerHTML = messages.map(message => {
        const color = message.startsWith('Les cartes suivantes ne sont pas valides') ? 'red' : 'green';
        return `<p style="color: ${color};">${message}</p>`;
    }).join('');
}

function moveSelectedToOwned() {
    const checkboxes = document.querySelectorAll('.cards-missing-list input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const cardNumber = checkbox.value;
        if (!ownedCards.includes(cardNumber)) {
            ownedCards.push(cardNumber);
        }
        const index = missingCards.indexOf(cardNumber);
        if (index > -1) {
            missingCards.splice(index, 1);
        }
        checkbox.parentElement.style.display = 'none';
    });
    updateList('ownedCards', ownedCards);
    displayGroups(); // Mettre à jour l'affichage des cartes manquantes
}


function updateMissingCards() {
    const allCards = Object.values(euroCards).flatMap(group =>
        Object.values(group).flat()
    );
    missingCards = allCards.filter(card => !ownedCards.includes(card));
    displayGroups(); // Mettre à jour l'affichage des cartes manquantes
}
function updateList(listId, items) {
    const list = document.getElementById(listId);
    list.innerHTML = '';

    // Cacher la liste des cartes manquantes
    if (listId === 'missingCards') {
        list.style.display = 'none';
    } else {
        list.style.display = ''; // Assurez-vous que les autres listes sont visibles
    }

    if (Array.isArray(items)) {
        items.forEach(item => {
            const listItem = createListItemWithCheckbox(item, null);
            list.appendChild(listItem);
        });
    } else if (typeof items === 'object') {
        Object.keys(items).forEach(key => {
            const listItem = createListItemWithCheckbox(key, items[key]);
            list.appendChild(listItem);
        });
    } else {
        console.error('updateList expects an array or object, received:', items);
        return;
    }
}

function createListItemWithCheckbox(key, count) {
    const listItem = document.createElement('li');
    const checkbox = createCheckbox(key);
    let text = key;
    if (count > 1) {
        text += ` (${count}x)`;
    }
    const textNode = document.createTextNode(text);

    listItem.appendChild(checkbox);
    listItem.appendChild(textNode);
    listItem.style.cursor = 'pointer';
    listItem.addEventListener('click', function (event) {
        if (event.target !== checkbox) {
            checkbox.checked = !checkbox.checked;
        }
    });

    return listItem;
}

function createCheckbox(value) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = value;
    return checkbox;
}

function markAsDuplicate() {
    const checkboxes = document.querySelectorAll('#ownedCards input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const cardNumber = checkbox.value;
        duplicateCards[cardNumber] = (duplicateCards[cardNumber] || 0) + 1;
        checkbox.checked = false;
    });
    updateList('duplicateCards', Object.keys(duplicateCards).map(key => `${key} (${duplicateCards[key]}x)`));
    // updateMissingCards();
}


//Fonction enlever double
function markGivenCards() {
    const checkboxes = document.querySelectorAll('#duplicateCards input[type="checkbox"]:checked');
    let processedCards = [];
    let removedCards = [];

    checkboxes.forEach(checkbox => {
        const cardNumber = checkbox.value.trim().split(' ')[0]; // Modification ici
        if (duplicateCards[cardNumber] > 1) {
            duplicateCards[cardNumber] -= 1;
            processedCards.push(`${cardNumber} (${duplicateCards[cardNumber]}x)`);
        } else {
            delete duplicateCards[cardNumber];
            removedCards.push(cardNumber);
            checkbox.closest('li').remove();
        }
    });
    updateList('duplicateCards', Object.keys(duplicateCards).map(key => `${key} (${duplicateCards[key]}x)`));
    displayFeedback(processedCards, removedCards, 'messageDouble');
}



function displayFeedback(processedCards, cards, elementId) {
    const messageElement = document.getElementById('messageDouble');
    let message = '';
    if (processedCards.length > 0) {
        message += `Traitées : ${processedCards.join(', ')}. `;
    }
    if (invalidCards.length > 0) {
        message += `Invalides/non trouvées : ${invalidCards.join(', ')}.`;
    }
    messageElement.textContent = message;
}

//fonction qui agit sur les doubles sélectionnés. 
function markCheckedAsGiven() {
    const checkboxes = document.querySelectorAll('#duplicateCards input[type="checkbox"]:checked');
    let processedCards = [];
    let removedCards = [];

    checkboxes.forEach(checkbox => {
        const cardNumber = checkbox.value.trim().split(' ')[0];
        if (duplicateCards[cardNumber] > 1) {
            duplicateCards[cardNumber] -= 1;
            processedCards.push(`${cardNumber} (${duplicateCards[cardNumber]}x)`);
        } else {
            delete duplicateCards[cardNumber];
            removedCards.push(cardNumber);
            checkbox.closest('li').remove();
        }
    });
    updateList('duplicateCards', Object.keys(duplicateCards).map(key => `${key} (${duplicateCards[key]}x)`));
    displayFeedback(processedCards, removedCards);
}
function displayFeedback(processedCards, removedCards) {
    const messageElement = document.getElementById('messageDouble');
    let message = '';
    if (processedCards.length > 0) {
        message += `Cartes mises à jour : ${processedCards.join(', ')}. `;
    }
    if (removedCards.length > 0) {
        message += `Cartes supprimées : ${removedCards.join(', ')}.`;
    }
    messageElement.textContent = message;
}


function exportDataToJson() {
    updateMissingCards();

    // Création de l'objet à exporter
    const data = {
        ownedCards: ownedCards,
        missingCards: missingCards,
        duplicateCards: duplicateCards
    };
    console.log('Owned Cards:', ownedCards);
    console.log('Missing Cards:', missingCards);
    console.log('Duplicate Cards:', duplicateCards);

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "cards_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function importDataFromJson(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
        const content = e.target.result;
        try {
            const data = JSON.parse(content);
            ownedCards = data.ownedCards;
            missingCards = data.missingCards;
            duplicateCards = data.duplicateCards;

            updateList('ownedCards', ownedCards);
            updateList('missingCards', missingCards);
            updateList('duplicateCards', Object.keys(duplicateCards).map(key => `${key} (${duplicateCards[key]}x)`));
            displayGroups(); // Rafraîchir l'affichage des groupes
        } catch (error) {
            alert('Erreur lors de la lecture du fichier JSON : ' + error);
        }
    };
    fileReader.readAsText(event.target.files[0]);
}



function generatePDFContent(missingCards, duplicateCards) {
    // Create PDF document instance
    const doc = new jsPDF({ orientation: 'landscape' }); // Landscape orientation for better card layout

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
// function printOrExportPDF() {
//     const missingCards = getMissingCards(); // Get an updated list of missing cards
//     const duplicateCards = getDuplicateCards(); // Get an updated list of duplicate cards

//     // Generate PDF content
//     const doc = generatePDFContent(missingCards, duplicateCards);

//     // Get user preference (print or export)
//     const action = prompt("Voulez-vous imprimer ou exporter le rapport PDF ? (imprimer/exporter)", "imprimer");

//     if (action.toLowerCase() === 'imprimer') {
//         // Open the PDF in a new browser window for printing
//         doc.output('dataurlnewwindow');
//     } else if (action.toLowerCase() === 'exporter') {
//         // Save the PDF to a file
//         const fileName = prompt("Entrez le nom du fichier PDF:", "rapport-cartes-euro.pdf");
//         if (fileName) {
//             doc.save(fileName);
//             alert(`Rapport PDF sauvegardé sous le nom ${fileName}.`);
//         } else {
//             alert("L'exportation du PDF a été annulée.");
//         }
//     } else {
//         alert("Action non valide. Veuillez choisir 'imprimer' ou 'exporter'.");
//     }
// }
function printOrExportPDF() {
    const missingCards = getMissingCards(); // Get an updated list of missing cards
    const duplicateCards = getDuplicateCards(); // Get an updated list of duplicate cards

    // Create a new jsPDF instance
    var doc = new jsPDF('landscape'); // Set orientation to landscape

    // Add a title and the date to the PDF
    doc.setFontSize(16);
    doc.text('Rapport sur les cartes Euro manquantes et en double', 10, 20);
    doc.setFontSize(12);
    doc.text('Date: ' + new Date().toLocaleDateString(), 10, 30);

    // Section for missing cards
    doc.setFontSize(14);
    doc.text('Cartes manquantes:', 10, 40);
    doc.setFontSize(12);
    if (missingCards.length === 0) {
        doc.text('Aucune carte manquante.', 10, 50);
    } else {
        missingCards.forEach((card, index) => {
            doc.text(card.code + ' - ' + card.country, 10, 60 + (10 * index));
        });
    }

    // Section for duplicate cards
    doc.addPage();
    doc.setFontSize(14);
    doc.text('Cartes en double:', 10, 20);
    doc.setFontSize(12);
    if (Object.keys(duplicateCards).length === 0) {
        doc.text('Aucune carte en double.', 10, 30);
    } else {
        Object.entries(duplicateCards).forEach(([card, count], index) => {
            doc.text(card + ' - ' + count + ' fois', 10, 40 + (10 * index));
        });
    }

    // Prompt user for action
    var action = prompt("Voulez-vous imprimer ou exporter le rapport PDF ? (imprimer/exporter)", "imprimer");
    if (action.toLowerCase() === 'imprimer') {
        doc.autoPrint(); // Auto print the PDF
        window.open(doc.output('bloburl')); // Open PDF in a new window to trigger the print dialog
    } else if (action.toLowerCase() === 'exporter') {
        var fileName = prompt("Entrez le nom du fichier PDF:", "rapport-cartes-euro.pdf");
        if (fileName) {
            doc.save(fileName); // Save the PDF with the specified file name
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

document.getElementById('generateReport').addEventListener('click', function () {
    const missingCards = localStorage.getItem('missingCards');  // Assurez-vous que ces données sont stockées auparavant
    const ownedCards = localStorage.getItem('ownedCards');
    const duplicateCards = localStorage.getItem('duplicateCards');

    fetch('https://euro-cards-ten.vercel.app/api/generateDocs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            missingCards: JSON.parse(missingCards),
            ownedCards: JSON.parse(ownedCards),
            duplicateCards: JSON.parse(duplicateCards)
        })
    })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "report.docx";
            document.body.appendChild(a); // Append the element to work in Firefox
            a.click();
            a.remove();  // After downloading remove the element and revoke the URL
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error:', error));
});
