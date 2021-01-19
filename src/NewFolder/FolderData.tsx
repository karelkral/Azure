import * as React from "react";

import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { ISimpleListCell } from "azure-devops-ui/List";
import { MenuItemType } from "azure-devops-ui/Menu";
import { IStatusProps, Status, Statuses, StatusSize } from "azure-devops-ui/Status";
import {
    ColumnMore,
    ColumnSelect,
    ISimpleTableCell,
    renderSimpleCell,
    TableColumnLayout,
} from "azure-devops-ui/Table";
import { css } from "azure-devops-ui/Util";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";

export interface ITableItem extends ISimpleTableCell {
    id: number;
    folderName: string;
    parentId: number;
}

export const fixedColumns = [
    {
        columnLayout: TableColumnLayout.singleLinePrefix,
        id: "folderName",
        name: "Folder Name",
        readonly: true,
        renderCell: renderSimpleCell,
        width: new ObservableValue(-30),
    },
];


export const renderStatus = (className?: string) => {
    return (
        <Status
            {...Statuses.Success}
            ariaLabel="Success"
            className={css(className, "bolt-table-status-icon")}
            size={StatusSize.s}
        />
    );
};

export const rawTableItems: ITableItem[] = [
    {
        id: 0,
        folderName: "Loading",
        parentId: 0,
    }
];

export const tableItems = new ArrayItemProvider<ITableItem>(rawTableItems);
