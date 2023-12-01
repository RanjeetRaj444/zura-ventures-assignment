export const showUserAdded = (toast) => {
	toast({
		title: "Account created.",
		description: "We've created your account for you.",
		status: "success",
		duration: 9000,
		isClosable: true,
	});
};
export const showSuccess = (text, toast) => {
	toast({
		title: `${text} Success`,
		status: "success",
		duration: 9000,
		isClosable: true,
	});
};
export const showError = (text, toast) => {
	toast({
		title: `${text} Faield`,
		status: "error",
		duration: 9000,
		isClosable: true,
	});
};
