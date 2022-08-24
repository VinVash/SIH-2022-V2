import { useState, createContext, ReactNode } from "react";

interface FilesContextInterface {
	files: string[];
	setFiles: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FilesContext = createContext<FilesContextInterface>({
	files: [],
	setFiles: () => {},
});

interface Props {
	children?: ReactNode
}

export const FilesProvider = ({ children }: Props) => {
	const localFiles = JSON.parse(localStorage.getItem("files") || "[]");
	const [files, setFiles] = useState<string[]>(localFiles || []);
	const value: FilesContextInterface = { files, setFiles };
	return (
		<FilesContext.Provider value={value}>
			{ children }
		</FilesContext.Provider>
	)
}