export const handleChangeInput = (e, setFunction) => {
	setFunction((prev) => ({
		...prev,
		[e.target.name]: e.target.value,
	}));
};
