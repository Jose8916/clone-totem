export const downloadFile = (blob, fileName) => {
	let excelLink = document.createElement("a");

	try {
		const url = window.URL.createObjectURL(blob);

		excelLink.href = url;
		excelLink.download = fileName;

		excelLink.style.display = "none";
		document.body.appendChild(excelLink);

		excelLink.click();

		window.URL.revokeObjectURL(url);
	} finally {
		if (excelLink) {
			document.body.removeChild(excelLink);
		}
	}
};
