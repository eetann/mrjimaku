function calcSecond(strArr: string[]) {
	return (
		Number.parseInt(strArr[0], 10) * 3600 +
		Number.parseInt(strArr[1], 10) * 60 +
		Number.parseInt(strArr[2], 10) +
		Number.parseInt(strArr[3], 10) * 0.001
	);
}

export function srtParseAddCue(textTrack: TextTrack, text: string) {
	// TODO: utf-8以外のとき
	const lines = text.split(/\r\n|\r|\n/);
	const timestamp = "(\\d{2}):(\\d{2}):(\\d{2}),(\\d{3})";
	const re = new RegExp(`^${timestamp}\\s*-->\\s*${timestamp}`);
	for (let i = 0, len = lines.length; i < len; i++) {
		const strArr = lines[i].match(re);
		if (strArr) {
			const startTime = calcSecond(strArr.slice(1, 5));
			const endTime = calcSecond(strArr.slice(5, 9));
			textTrack.addCue(new VTTCue(startTime, endTime, lines[i + 1]));
		}
	}
	textTrack.mode = "showing";
}
