export const getTime = (rowData) => {
	const fecha = new Date(rowData.created_at);
	const year = fecha.getFullYear();
	const month =(fecha.getMonth()+1).toString().padStart(2,'0');
	const day = fecha.getDate().toString().padStart(2,'0');
	return `${day}/${month}/${year}`;
};

export const getHora = (rowData) => {
	const fecha = new Date(rowData.created_at);
	const hours = fecha.getHours().toString().padStart(2, '0');
	const minutes = fecha.getMinutes().toString().padStart(2, '0');
	const seconds = fecha.getSeconds().toString().padStart(2, '0');
	return `${hours}:${minutes}:${seconds}`;
};

export const getTimeData = () => {
	const fecha = new Date();
	const year = fecha.getFullYear();
	const month = (fecha.getMonth() + 1).toString().padStart(2, "0");
	const day = fecha.getDate().toString().padStart(2, "0");
	return `${year}-${month}-${day}`;
};

export const getTimeToFetch = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};