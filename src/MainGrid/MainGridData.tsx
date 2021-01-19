import * as React from "react";
import { ISimpleListCell, SimpleList } from "azure-devops-ui/List";
import { MenuItemType } from "azure-devops-ui/Menu";
import { ColumnMore, ISimpleTableCell } from "azure-devops-ui/Table";
import { renderExpandableTreeCell, renderTreeCell } from "azure-devops-ui/TreeEx";
import {
    ITreeItem,
    ITreeItemProvider,
    TreeItemProvider,
} from "azure-devops-ui/Utilities/TreeItemProvider";
import { Button } from "azure-devops-ui/Button";
import { Panel } from "azure-devops-ui/Panel";

interface IPanelExampleState {
    expanded: boolean;
}

export default class PanelExample extends React.Component<{}, IPanelExampleState> {
    constructor(props: {}) {
        super(props);
        this.state = { expanded: false };
    }

    public render(): JSX.Element {
        return (
            <div>
                <Button onClick={() => this.setState({ expanded: true })}>Show Panel</Button>
                {this.state.expanded && (
                    <Panel
                        onDismiss={() => this.setState({ expanded: false })}
                        titleProps={{ text: "Sample Panel Title" }}
                        description={
                            "A description of the header. It can expand to multiple lines. Consumers should try to limit this to a maximum of three lines."
                        }
                        footerButtonProps={[
                            { text: "Cancel", onClick: () => this.setState({ expanded: false }) },
                            { text: "Create", primary: true }
                        ]}
                    >
                        <div style={{ height: "1200px" }}>Panel Content</div>
                    </Panel>
                )}
            </div>
        );
    }
}


export interface ILocationTableItem extends ISimpleTableCell {
    wiId: number;
    name: ISimpleListCell;
    description: ISimpleListCell;
    wiType: string;
    wiPriority: string;
    wiStartDate: string;
    wiEffort: string;
    wiTimeCritically: string;
    wiBusinessValue: string;
    wiTargetDate: string;
    wiRisk: string;
    wiValueArea: string;
}

export const tableItems: ILocationTableItem[] = [
    {
        wiId: 1,
        name: { text: "MyWorkItem", iconProps: { iconName: "Trophy2Solid"}} ,
        description: { text: "description here" },
        wiType: "User Story",        
        wiPriority: "1",
        wiStartDate: "California",
        wiEffort: "",
        wiTimeCritically: "West US",
        wiBusinessValue: "California",
        wiTargetDate: "",
        wiRisk: "",
        wiValueArea: ""
    },
];

export const workItemTypeColumn = {
    id: "wiType",
    name: "Work Item Type",
    renderCell: renderTreeCell,
    width: 200,
};
export const nameColumn = {
    id: "name",
    name: "Title",
    renderCell: renderExpandableTreeCell,
    width: -1,
};
export const priorityColumn = {
    id: "wiPriority",
    name: "Priority",
    renderCell: renderTreeCell,
    width: -1,
};
export const moreColumn: any = new ColumnMore(() => {
    return {
        id: "wiId",        
        items: [
            { id: "wiId", text: "SubMenuItem 1" },
            { id: "wiId", text: "SubMenuItem 2" },
            { id: "wiId", itemType: MenuItemType.Divider },
            { id: "wiId", checked: true, readonly: true, text: "SubMenuItem 3" },
            { id: "wiId", disabled: true, text: "SubMenuItem 4" },
        ],
    };
});

export const treeColumns = [ workItemTypeColumn, nameColumn, moreColumn, priorityColumn];

export function getItemProvider(rootItemsCount: number): ITreeItemProvider<ILocationTableItem> {
    const rootItems: Array<ITreeItem<ILocationTableItem>> = [];

    // Build the set of items based on the current root item count.
    for (let rootIndex = 0; rootIndex < rootItemsCount; rootIndex++) {
        rootItems.push({
            childItems: [
                { data: tableItems[1] },
                { childItems: [{ data: tableItems[3] }], data: tableItems[2], expanded: false },
            ],
            data: tableItems[0],
            expanded: true,
        });
    }

    return new TreeItemProvider<ILocationTableItem>(rootItems);
}
