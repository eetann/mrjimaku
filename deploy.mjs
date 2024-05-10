import { zip } from "zip-a-folder";

const folderName = "./dist";

const zipName = "extension.zip";

(async () => {
	try {
		await zip(folderName, zipName);
		console.log(
			`Successfully zipped the ${folderName} directory and store as ${zipName}`,
		);
	} catch (err) {
		console.log("oh no!", err);
	}
})();
