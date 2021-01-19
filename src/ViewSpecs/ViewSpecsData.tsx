
import React, { useState} from "react";
import { ISimpleListCell } from "azure-devops-ui/List";
import { Link } from "azure-devops-ui/Link";
import {
    ColumnMore,
    ColumnSelect,
    ISimpleTableCell,
    ITableColumn,
    renderEmptyCell,
    renderSimpleCell,
    TableCell,
    TableColumnLayout,
} from "azure-devops-ui/Table";
import { MenuItemType } from "azure-devops-ui/Menu";
import { renderExpandableTreeCell, renderTreeCell } from "azure-devops-ui/TreeEx";
import {
    ITreeItem,
    ITreeItemProvider,
    TreeItemProvider,
} from "azure-devops-ui/Utilities/TreeItemProvider";
import { Url } from "url";
import { Button } from "azure-devops-ui/Button";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { Observer } from "azure-devops-ui/Observer";
import { css } from "azure-devops-ui/Util";

export interface ILocationTableItem extends ISimpleTableCell {
    
    description: ISimpleListCell;
    name: ISimpleListCell;
    createddate: string;
    createdby: string;
    source: ISimpleListCell;
    tags: string;
}

export const tableItems: ILocationTableItem[] = [
    {
        name:  { iconProps: { iconName: "FabricFolderFill" }, text: "Asia" },
        description: { text: "North America" },
        createddate: "17-4-2020 3:45 pm",
        createdby: "Nominal Kanwal",
        source:{ text: "Asia", href:"https://www.microsoft.com" },
        tags: "login Page",
    },
    {        
        name:  { iconProps: { iconName: "FabricFolderFill" }, text: "Asia" },
        description: { text: "Europe" },
        createddate: "17-4-2020 3:45 pm",
        createdby: "Nominal Kanwal",
        source:{ text: "Asia", href:"https://www.microsoft.com" },
        tags: "login Page",
    },
    {
        name:  { iconProps: { iconName: "FabricFolderFill" }, text: "Asia" },
        description: { iconProps: { iconName: "Home" }, text: "Asia" }, 
        createddate: "17-4-2020 3:45 pm",
        createdby: "Nominal Kanwal",
        source:{ text: "Asia", href:"https://www.microsoft.com" },
        tags: "login Page",
    },
    {
        name:  { iconProps: { iconName: "FabricFolderFill" }, text: "Asia" },
        description: { iconProps: { iconName: "Home" }, text: "South America" },  
        createddate: "17-4-2020 3:45 pm",
        createdby: "Nominal Kanwal",
        source:{ text: "Asia", href:"https://www.microsoft.com" },
        tags: "login Page",
    },
];

export const descriptionColumn = {
    id: "description",
    name: "Description",
    renderCell: renderTreeCell,
    width: 200,
};

export const createddatecolumn = {
    id: "createddate",
    name: "Created Date",
    renderCell: renderTreeCell,
    width: 200,
};

export const createdby = {
    id: "createdby",
    name: "Created By",
    renderCell: renderTreeCell,
    width: 200,
};

export const source = {
    id: "source",
    name: "Source Project",
    renderCell: renderTreeCell,
    width: 200,
    selectableText: true,
};

export const tags = {
    id: "tags",
    name: "tags",
    renderCell: renderTreeCell,
    width: 200,
};

export const nameColumn = {
    id: "name",
    name: "Name",
    renderCell: renderExpandableTreeCell,
    width: 400,
};

export const favcell = {
    id: "favorite", renderCell: renderFavoritesColumn, width: new ObservableValue(40)
}


// export const moreColumn: any = new ColumnMore(() => {
//     return {
//         id: "sub-menu",
//         readonly: true,        
//         items: [
//             { id: "submenu-one", text: "Open", iconProps: { iconName: "ReplyMirrored"} },
//             { id: "submenu-two", text: "Edit", iconProps: { iconName: "Edit"} },
//             { id: "submenu-three", text: "Rename",  iconProps: { iconName: "ProgressLoopOuter"} },
//             { id: "submenu-four", text: "Delete",  iconProps: { iconName: "ChromeClose"}  },
//             { id: "submenu-five", text: "Reuse",  iconProps: { iconName: "ProgressLoopOuter"} },
//         ],
//     };
//   });

//export const treeColumns = [nameColumn, moreColumn ,descriptionColumn,createddatecolumn,createdby,source, tags];

function renderFavoritesColumn(
    rowIndex: number,
    columnIndex: number,
    tableColumn: ITableColumn<ILocationTableItem>,
    tableItem: ILocationTableItem
): JSX.Element {
    return (
        <TableCell
            className="bolt-table-cell-side-action"
            columnIndex={columnIndex}
            tableColumn={tableColumn}
            key={"col-" + columnIndex}
        >
                
            <div className="bolt-list-cell-content flex-column">
            
            
                <Observer favorite={tableItem.favorite }  >
                    
                    {(props: { favorite: boolean }) => { 
                        return (
                            
                            <>
                            <Button
                                ariaLabel={"Favorite"}
                                ariaPressed={props.favorite}
                                className={css(!props.favorite && "bolt-table-cell-content-reveal")}
                                excludeTabStop={true}
                                iconProps={{
                                    iconName: props.favorite ? "FavoriteStarFill" : "FavoriteStar",
                                    className: props.favorite ? "yellow" : undefined
                                    
                                }}
                               
                                onClick={e => {
                                    //tableItem.favorite.value = !tableItem.favorite.value;
                                    e.preventDefault();
                                }}
                                
                                subtle
                            />

                            </>
                        );
                    }}
                </Observer>
            </div>
        </TableCell>
    );
    
}



export function getItemProvider(rootItemsCount: number): ITreeItemProvider<ILocationTableItem> {
    const rootItems: Array<ITreeItem<ILocationTableItem>> = [];

    // Build the set of items based on the current root item count.
    for (let rootIndex = 0; rootIndex < rootItemsCount; rootIndex++) {
        rootItems.push({
            data: tableItems[0],
            childItems: [
                { data: tableItems[1] },
                { childItems: [{ data: tableItems[3] }], data: tableItems[2], expanded: false },
            ],            
            expanded: false,
        });
    }

    return new TreeItemProvider<ILocationTableItem>(rootItems);
}
