import { ISimpleListCell } from "azure-devops-ui/List";
import { MenuItemType } from "azure-devops-ui/Menu";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { ColumnMore, ISimpleTableCell } from "azure-devops-ui/Table";
import {
    ColumnSelect,
    renderSimpleCell,
    TableColumnLayout,
} from "azure-devops-ui/Table";
import { renderExpandableTreeCell, renderTreeCell } from "azure-devops-ui/TreeEx";
import {
    ITreeItem,
    ITreeItemProvider,
    TreeItemProvider
} from "azure-devops-ui/Utilities/TreeItemProvider";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import * as React from "react";
import axios from 'axios';




// export default class TreeExampleForData extends React.Component<{}> {

//      state={
//             workitemsdata:[]
//         }

//     componentDidMount() {
//     const apiUrl = 'https://localhost:44328/api/Specification/GetWorkItemsByIDsForUI?ids=1,2,3';
//     axios.get(apiUrl)
//         .then(res => {
//             const workitemsdata = res.data
//             this.setState(workitemsdata);
//             console.log("data is here", {workitemsdata});
//       })
//   }
//     
    
// }


    
export interface ITableItem extends ISimpleTableCell {
    workitemtype: string;
    title: string;
    priority: string;
}

export const rawTableItems: ITableItem[] = [
    {
        workitemtype: "",
        title: "",
        priority: "",
    },
];

export const fixedColumns = [
    {
        columnLayout: TableColumnLayout.singleLinePrefix,
        id: "workitemtype",
        name: "Work Item Type",
        readonly: true,
        renderCell: renderSimpleCell,
        width: new ObservableValue(-10),
    },
    {
        columnLayout: TableColumnLayout.singleLinePrefix,
        id: "title",
        name: "Title",
        readonly: true,
        renderCell: renderSimpleCell,
        width: new ObservableValue(-30),
    },
    {
        columnLayout: TableColumnLayout.none,
        id: "priority",
        name: "Priority",
        readonly: true,
        renderCell: renderSimpleCell,
        width: new ObservableValue(-10),
    },
];


export const tableItems = new ArrayItemProvider<ITableItem>(rawTableItems);


export interface IWorkItemSearchItem extends ISimpleTableCell {
    selectedRadioButton: string,
    Query: string,
    Ids: string,
    Title: string,
    Type: string,
}

export const rawWorkItemSearchItems: IWorkItemSearchItem[] = [
    {
        selectedRadioButton: '',
        Query: '',
        Ids: '',
        Title: '',
        Type: '',
    },
];

export const workItemsInitialItems = new ArrayItemProvider<IWorkItemSearchItem>(rawWorkItemSearchItems);


export const initialSpecification =
    {
        Name: '',
        Description: '',
        ParentId: '',
        Tags: '',       
        Query: 0,
        Queries: '',
        IDs: '',
        Title: '',
        WIType: ''

    }

    export const folder =
    {
        name: 'loading',
        parentId: ''

    }