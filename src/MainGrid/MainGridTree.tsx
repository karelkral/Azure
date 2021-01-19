import * as React from "react";
import { getItemProvider, ILocationTableItem, treeColumns } from "./MainGridData";
import { Card } from "azure-devops-ui/Card";
import { Tree, ITreeRow } from "azure-devops-ui/TreeEx";
import { ITreeItemProvider, ITreeItemEx } from "azure-devops-ui/Utilities/TreeItemProvider";
import PanelExample from "./MainGridData";
import { Button } from "azure-devops-ui/Button";
import { Panel } from "azure-devops-ui/Panel";
import { ISimpleListCell } from "azure-devops-ui/List";

interface IPanelExampleState {
    expanded: boolean;
}

interface TagItem {
    id: number;
    text: string;
}





export default class MainGridTree extends React.Component<{}, IPanelExampleState,TagItem> {
    private itemProvider: ITreeItemProvider<ILocationTableItem>;

    constructor(props: {}) {
        super(props);
        this.state = { 
            expanded: false,
            
            
        };
        this.itemProvider = getItemProvider(2);
        
    }

  
    tagData: TagItem[] = [
        {
            id: 1,
            text: "Item 1"
        },
        {
            id: 2,
            text: "Item 2"
        },
        {
            id: 3,
            text: "Item 3"
        }
    ];



    showpropertiespanel(){
        this.setState({expanded: !this.state.expanded})
    }

    // componentDidMount(){
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(response => response.json())
    //     .then(newtabledata => this.setState({ tabledata: newtabledata}))
    // }
    
    public render(): JSX.Element {
        return (
            <Card
                className="flex-grow bolt-card-no-vertical-padding"
                contentProps={{ contentPadding: false }}
            >
                <Tree<ILocationTableItem>
                    
                    ariaLabel="Basic tree"
                    columns={treeColumns}
                   singleClickActivation={true}
                    itemProvider={this.itemProvider}
                    onToggle={(event, treeItem: ITreeItemEx<ILocationTableItem>) => {
                        this.itemProvider.toggle(treeItem.underlyingItem);
                    }}
                    scrollable={true}
                    onActivate={ () => this.setState({ expanded: true })}
                />
                
                {this.state.expanded && (
                    <Panel
                        onDismiss={() => this.setState({ expanded: false })}
                        titleProps={{ text: "Feature 421513 - Introduction" }}
                        description={
                            "A description of the header. It can expand to multiple lines. Consumers should try to limit this to a maximum of three lines."
                        }
                        footerButtonProps={[
                            { text: "Cancel", onClick: () => this.setState({ expanded: false }) },
                           // { text: "Create", primary: true }
                        ]}
                    >
                        <div style={{ height: "auto", width: "100%" }}>
                            <h4>Properties</h4>
                            <table width="100%" cellPadding="0" cellSpacing="0" id="properties-panel-data">


                    {this.tagData.map(tablearray => <> <tr key={tablearray.id}> <td>{tablearray.id}</td>  <td>{tablearray.text}</td> </tr> </>)}

                    {/*this.state.tabledata.map(elem =>( <tr key={elem.id}> <td>{elem.name}</td> <td>Start date</td></tr> )) */}
                                
                                <tr>
                                    <td>Start date</td>
                                    <td>Start date</td>
                                </tr>
                                <tr>
                                    <td>Start date</td>
                                    <td>Start date</td>
                                </tr>
                                <tr>
                                    <td>Start date</td>
                                    <td>Start date</td>
                                </tr>
                                <tr>
                                    <td>Start date</td>
                                    <td>Start date</td>
                                </tr>
                                <tr>
                                    <td>Start date</td>
                                    <td>Start date</td>
                                </tr>
                                <tr>
                                    <td>Start date</td>
                                    <td>Start date</td>
                                </tr>
                                <tr>
                                    <td>Start date</td>
                                    <td>Start date</td>
                                </tr>
                            </table>

                            <h4>All Links</h4>

                            <table width="100%">
                                <thead>
                                    <tr>
                                        <td><b>Work Item Type</b></td>
                                        <td><b>Login Page</b></td>
                                        <td><b>Link Type</b></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            Feature
                                        </td>
                                        <td>
                                            Login Page
                                        </td>
                                        <td>
                                           Related
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Panel>
                )}  

            </Card>
        );
    }

    
}



