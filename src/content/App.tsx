import { useEffect, useState } from "react";
import { srtParseAddCue } from "./parseSrt";

export default function App() {
	const [selectedFile, setSelectedFile] = useState<File>();
	const [checked, setChecked] = useState(true);
	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		const video = document.getElementsByTagName("video")[0];
		if (!video || !checked || !selectedFile) {
			return;
		}
		setDisabled(true);
		if (video.textTracks.length > 0) {
			video.textTracks[video.textTracks.length - 1].mode = "disabled";
		}
		const textTrack = video.addTextTrack("captions", "Mr.Jimaku");
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result !== "string") {
				return;
			}
			srtParseAddCue(textTrack, reader.result);
			setDisabled(false);
		};
		reader.readAsText(selectedFile);
	}, [selectedFile, checked]);

	useEffect(() => {
		const video = document.getElementsByTagName("video")[0];
		if (!video) {
			return;
		}
		if (video.textTracks.length > 0) {
			if (checked) {
				video.textTracks[video.textTracks.length - 1].mode = "showing";
			} else {
				video.textTracks[video.textTracks.length - 1].mode = "disabled";
			}
		}
	}, [checked]);

	return (
		<div className="my-2 p-4 bg-zinc-800 rounded-2xl flex items-center gap-8">
			<input
				type="file"
				id="mrjimaku-file"
				onChange={(e) => {
					if (e.target.files) {
						setSelectedFile(e.target.files[0]);
					}
				}}
				className="text-slate-100 text-lg
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:font-semibold
              file:bg-slate-50 file:text-slate-700
              hover:file:bg-violet-100"
			/>
			<label className="inline-flex items-center cursor-pointer gap-2">
				<span className="font-medium text-lg text-gray-300">Your caption</span>
				<input
					type="checkbox"
					checked={checked}
					disabled={disabled}
					onChange={() => setChecked(!checked)}
					className="sr-only peer"
				/>
				<div
					className="relative w-11 h-6
          rounded-full bg-gray-700 border-gray-600 
          peer
          peer-focus:outline-none
          peer-focus:ring-4 peer-focus:ring-green-800
          peer-checked:bg-green-600
          peer-checked:after:translate-x-full
          peer-checked:after:border-white
          after:content-['']
          after:absolute after:top-[1px] after:start-[2px]
          after:bg-white
          after:border-gray-300 after:border after:rounded-full
          after:h-5 after:w-5 after:transition-all"
				/>
			</label>
		</div>
	);
}
