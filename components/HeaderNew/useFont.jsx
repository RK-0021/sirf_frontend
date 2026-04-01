import { useState } from "react";

export function useFont() {
  const [fonts, setFonts] = useState({
    email: "",
    login: "",
    update: "",
    welcome: "",
    bannerHead: "",
    bannerSub: "",
    bannerContent: "",
    aboutHead: "",
    aboutContent: "",
    objHead: "",
    objContent: "",
    salientHead: "",
    salientSub: "",
    salientContent: "",
    top10Head: "",
    top10Update: "",
    top10Rank: "",
    top10Name: "",
    tableHead: "",
    tableBody: "",
    uploadHead: "",
    uploadContent: "",
    faq: "",
    infoMsg: "",
    reportOk: "",
    pageHead: ""
  });

  const updateFont = (key, value) => {
    setFonts((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return { fonts, updateFont };
}