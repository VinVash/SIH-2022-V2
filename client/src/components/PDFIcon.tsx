import React from "react";
import DownloadIcon from '@mui/icons-material/Download';

export interface PDFIconProps {
  file: string;
}

const wrappedText = (str: string) => {
  let text = str.split("/").pop();

  if(text!.length > 12) {
    let temp = text!.substring(0, 3);
    temp += "..";
    temp += text!.substring(text!.length - 6, text!.length - 4);
    temp += ".pdf";
    text = temp;
  }

  return text;
}

export default function PDFIcon({ file }: PDFIconProps) {

  return (
    <div className="w-32 border border-blue-250 rounded-lg mb-6 transition ease-in-out hover:translate-y-1 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-110 duration-300 ">
      <h1 className="text-black pt-2 font-semibold pl-2 pb-8">PDF</h1>

      <p className="text-gray-500 text-center pb-6">{wrappedText(file)}</p>

      <div className="pb-2 rounded-full w-8 text-center mx-auto">
        <a href={file} target="_blank" className=""><DownloadIcon color="primary"  /></a>
      </div>

    </div>
  );
}
