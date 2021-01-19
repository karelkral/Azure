import * as React from "react";
import {getItemProvider, ILocationTableItem, descriptionColumn, nameColumn, favcell,createddatecolumn,createdby,source, tags } from "./ViewSpecsData";
import { Card } from "azure-devops-ui/Card";
import { Tree } from "azure-devops-ui/TreeEx";
import { ITreeItemProvider, ITreeItemEx } from "azure-devops-ui/Utilities/TreeItemProvider";
import {
    ColumnMore,
    ITableColumn,
    SimpleTableCell,
    Table,
    TwoLineTableCell,
    ColumnSorting,
    SortOrder,
    sortItems, renderColumns, renderEmptyCell, ISimpleTableCell
} from "azure-devops-ui/Table";
import { ISimpleListCell } from "azure-devops-ui/List";
import {
    ITreeItem,
    TreeItemProvider,
} from "azure-devops-ui/Utilities/TreeItemProvider";
import { Dialog } from "azure-devops-ui/Dialog";
import { Observer } from "azure-devops-ui/Observer";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { Redirect } from 'react-router-dom';



const renamefield = new ObservableValue<string>("");

interface ViewSpecs {
    checkvalue: boolean;
   // openValue:boolean;
   editdialogpopup: boolean;
   itemProvide: ITreeItemProvider<ILocationTableItem>;
   redirect: boolean;
}



export default class TreeExample extends React.Component<{},ViewSpecs> {
    private itemProvider: ITreeItemProvider<ILocationTableItem>;
    private deletefolder = new ObservableValue<boolean>(false);


   

     // var checkvalue: boolean

    constructor(props: {}) {
        super(props);
        this.state = {
            checkvalue: false,
            editdialogpopup: false,
            itemProvide:getItemProvider(2), 
            redirect: false,
            
         }
        this.itemProvider = getItemProvider(2);
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

    renderRedirect  = () => {
        if (this.state.redirect) {
        return <Redirect to='/main' />
        }
    }

    onMenuItemClicked = () => {
       
        this.setState({checkvalue: !this.state.checkvalue});
    }

    onclickmenedit = () => {
       
        this.setState({editdialogpopup: !this.state.editdialogpopup});
    }

    



    onDismiss = () => {

        this.onMenuItemClicked();
        
    };


    



    gotomainspecs = () => {
       
        //history.push("/main")

    }

    moreColumn: any = new ColumnMore(() => {
        return {
            id: "sub-menu",
            items: [
                // { id: "submenu-one", text: "Openbbbb", onActivate: () => { this.setState({checkvalue: !this.state.checkvalue}) }},
                // { id: "submenu-two", text: "Edit", onActivate:() => {  this.setState({editdialogpopup: !this.state.editdialogpopup}) }},
                // { id: "submenu-three",  text: "Rename",   },
                // { id: "submenu-four",text: "Delete",  },
                // { id: "submenu-five", text: "Reuse",  },
                            { id: "submenu-one", text: "Open", iconProps: { iconName: "ReplyMirrored"}, onActivate: () => { this.setRedirect() } },
                            { id: "submenu-two", text: "Edit", iconProps: { iconName: "Edit"}, onActivate: () => { /*this.setState({checkvalue: !this.state.checkvalue}) */} },
                            { id: "submenu-three", text: "Rename",  iconProps: { iconName: "ProgressLoopOuter"}, onActivate:() => {  this.setState({editdialogpopup: !this.state.editdialogpopup}) }  },
                            { id: "submenu-four", text: "Delete",  iconProps: { iconName: "ChromeClose"},   onActivate: () => { this.setState({checkvalue: !this.state.checkvalue}) } },
                            { id: "submenu-five", text: "Reuse",  iconProps: { iconName: "ProgressLoopOuter"} },
            ],
        };
      });
    
      //export const treeColumns = [nameColumn, moreColumn ,descriptionColumn,createddatecolumn,createdby,source, tags];

      treeColumns = [nameColumn, favcell , this.moreColumn , descriptionColumn ,createddatecolumn,createdby,source, tags];

    componentDidMount() {
    const apiUrl = 'https://localhost:44328/api/Specification/GetViewSpec3';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((Items) => {            
            console.log('This is my old itemProvider static',this.itemProvider);            
            let abc = new TreeItemProvider<ILocationTableItem>(Items);
            console.log('This is my new Item provider dynamic', abc);
            this.setState({itemProvide:abc})
      }).catch(e => console.log(e))
    }


    public render(): JSX.Element {
        return (

            <>
            {this.renderRedirect()}
                <Card
                    className="flex-grow bolt-card-no-vertical-padding"
                    contentProps={{ contentPadding: false }}
                >
                    <Tree<ILocationTableItem>
                        ariaLabel="Table with links"
                        columns={this.treeColumns}
                        itemProvider={this.state.itemProvide}
                        singleClickActivation={false}
                        onToggle={(event, treeItem: ITreeItemEx<ILocationTableItem>) => {
                            this.state.itemProvide.toggle(treeItem.underlyingItem);
                        }}
                        scrollable={true}
                    />
                </Card>

            <Observer deletefolder={this.state.checkvalue}>
            {(props: { deletefolder: boolean }) => {
                return props.deletefolder ? (
                    <Dialog
                        titleProps={{ text: "Confirm" }}
                        footerButtonProps={[
                            {
                                text: "Cancel",
                                onClick: this.onMenuItemClicked
                            },
                            
                            {
                                text: "Confirm",
                                onClick: this.onMenuItemClicked,
                                primary: true
                            }
                        ]}
                        onDismiss={this.onMenuItemClicked}
                    >
                        Are You Sure You Want to Delete this Folder
                    </Dialog>
                ) : null;
            }}
            </Observer>

            <Observer editpopupdialog={this.state.editdialogpopup}>
            {(props: { editpopupdialog: boolean }) => {
                return props.editpopupdialog ? (
                    <Dialog
                        titleProps={{ text: "Rename Folder" }}
                        footerButtonProps={[
                            {
                                text: "Cancel",
                                onClick: this.onclickmenedit
                            },
                        
                            {
                                text: "Save Changes",
                                onClick: this.onclickmenedit,
                                primary: true
                            }
                        ]}
                        onDismiss={this.onclickmenedit}
                    >
                        <TextField
                            label="Folder Name"
                            value={renamefield}
                            onChange={(e, newValue) => (renamefield.value = newValue)}
                            placeholder="Rename Folder"
                            width={TextFieldWidth.auto}
                        />
                    </Dialog>
                ) : null;
            }}
            </Observer>

        </>

        );
    }

   
}
