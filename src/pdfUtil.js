export function openPdfInNewTab(pdf, number) {
    const newWindow = window.open('/tasks/'+number+'/pdf');
    if (newWindow.document.readyState === 'complete') {
        newWindow.location = URL.createObjectURL(pdf);
    } else {
        newWindow.onload = () => {
            newWindow.location = URL.createObjectURL(pdf);
        };
    }
}

export function downloadPdf(pdf, name) {
    const pdfName = name+'.pdf';
    if (!window.navigator.msSaveOrOpenBlob){
        // BLOB NAVIGATOR
        const url = window.URL.createObjectURL(pdf);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', pdfName);
        //document.body.appendChild(link);
        link.click();
    } else {
        // BLOB FOR EXPLORER 11
        // TODO check const url = window.navigator.msSaveOrOpenBlob(pdf, pdfName);
    }
}

