export async function imageToUrl(image, saveResult) {
	const reader = new FileReader()

	reader.onloadend = () => {
		saveResult(reader.result)
	}

	reader.readAsDataURL(image)
}
