import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";

import { FilterBar } from "azure-devops-ui/FilterBar";
import {
    InlineKeywordFilterBarItem,
    KeywordFilterBarItem
} from "azure-devops-ui/TextFilterBarItem";

export const commandBarItems: IHeaderCommandBarItem[] = [
    {
        iconProps: { iconName: "Add" },
        id: "test1",
        isPrimary: true,
        text: "Create",
        
    },
    {
        iconProps: { iconName: "Share" },
        id: "test2",
        text: "Share"
    },

    {
        iconProps: { iconName: "Share" },
        id: "test3",
        text: "Favourites"
    }
];
