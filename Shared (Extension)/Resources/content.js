
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    invoke()
});

const invoke = () => {
    const gridElement = document.querySelector('apui-wc-grid');
    const data = [];

    var row = 0;
    while (gridElement.querySelector('neo-text-cell[slot="' + row + '_0"]') != null) {
        const date = gridElement.querySelector('neo-text-cell[slot="' + row + '_0"]').querySelector('span').innerText;
        const title = gridElement.querySelector('neo-text-cell[slot="' + row + '_4"]').querySelector('span').innerText;
        const price = gridElement.querySelector('neo-currency-cell[slot="' + row + '_7"]')?.querySelector('span')?.querySelector('span').innerText;
        data.push({
            date: date,
            title: title,
            price: price
        });
        row++;
    }

    const csvContent = convertArrayToCSV(data);
    downloadCSV(csvContent, 'searchAds.csv');
}

function convertArrayToCSV(array) {
    const csvRows = [];

    // Extracting the headers from the first element of the array
    const headers = Object.keys(array[0]);
    csvRows.push(headers.join(','));

    // Extracting the values from each element and formatting them as CSV rows
    for (const item of array) {
        const values = headers.map(header => item[header]);
        csvRows.push(values.join(','));
    }

    // Joining all the CSV rows with newline characters
    return csvRows.join('\n');
}

function downloadCSV(csvContent, fileName) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
}
