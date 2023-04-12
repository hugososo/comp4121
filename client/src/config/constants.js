import { swatch, fileIcon, ai, logoPhone, stylishPhone } from "../assets";

export const EditorTabs = [
    {
        name: "colorpicker",
        icon: swatch,
    },
    {
        name: "filepicker",
        icon: fileIcon,
    },
    {
        name: "aipicker",
        icon: ai,
    },
];

export const FilterTabs = [
    {
        name: "logoPhone",
        icon: logoPhone,
    },
    {
        name: "stylishPhone",
        icon: stylishPhone,
    },
];

export const DecalTypes = {
    logo: {
        stateProperty: "logoDecal",
        filterTab: "logoPhone",
    },
    full: {
        stateProperty: "fullDecal",
        filterTab: "stylishPhone",
    },
};
