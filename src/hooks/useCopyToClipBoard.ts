const useCopyToClipboard = () => {
	// const { toast } = useToast();

	const fallbackCopyTextToClipboard = (str: string) => {
		const textArea = document.createElement("textarea");
		textArea.value = str;

		// Avoid scrolling to bottom
		textArea.style.top = "0";
		textArea.style.left = "0";
		textArea.style.position = "fixed";

		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			document.execCommand("copy");
		} catch (err) {
		}

		document.body.removeChild(textArea);
	};

	const copyToClipboard = (str: string) => {
		if (!navigator.clipboard) {
			fallbackCopyTextToClipboard(str);
			return;
		}
		navigator.clipboard.writeText(str).then(
			function () {
			},
			function () {
			}
		);
	};

	return {
		copyToClipboard,
	};
};

export default useCopyToClipboard;
