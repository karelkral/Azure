import * as React from "react";
//import { getItemProvider, ILocationTableItem, treeColumns } from "./TreeData";
import { fixedColumns, tableItems, ITableItem, initialSpecification} from "./TreeData";
import { Card } from "azure-devops-ui/Card";
import { Tree } from "azure-devops-ui/TreeEx";
import { ITreeItemProvider, ITreeItemEx } from "azure-devops-ui/Utilities/TreeItemProvider";
import { Button } from "azure-devops-ui/Button";
import "./TreeView.css";
import { Table } from "azure-devops-ui/Table";
import axios from 'axios';
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import {workitemsSearchValues} from "../AddWorkItemPopup/RadioButton";
import { initialSpecInputItem } from "../CreateSpecificationPopup/CSPform";


interface tabid {
    onSelectedTabChanged: (newTabId: string) => void
}

export default class TreeExample extends React.Component<tabid,{}> {
    //private itemProvider: ITreeItemProvider<ILocationTableItem>;
    
    state={
        workitemsdata:tableItems,
        specification: initialSpecification        
    }    

    componentDidMount() {
      this.populateWoritemsOnSearchCriteria();      
    }

    populateWoritemsOnSearchCriteria = () => {

        let apiUrl = '';
        

        let i = workitemsSearchValues.selectedRadioButton.value;;
        if( i == 1)
        {
            apiUrl = 'https://localhost:44328/api/Specification/GetWorkItemsByQueryIDsForUI?ids='+workitemsSearchValues.Query.value;
        }
        else if(i == 2)
        {
            apiUrl = 'https://localhost:44328/api/Specification/GetWorkItemsByIDsForUI?ids='+ workitemsSearchValues.Ids.value; 
        }
        else if(i == 3)
        {
            apiUrl = 'https://localhost:44328/api/Specification/GetWorkitemsByTitleAndTypeForUI?title='+ workitemsSearchValues.Title.value+'&'+workitemsSearchValues.Type.value; 
        }
        else {
            console.log("no value");
        }

        console.log(apiUrl);
        

        axios.get(apiUrl)
        .then(res => {
            const workitemsdata = new ArrayItemProvider<ITableItem>(res.data); 
            initialSpecification.Name = initialSpecInputItem.name.value; // name/title of the specification
            initialSpecification.Description = initialSpecInputItem.description.value; // description of the specification
            initialSpecification.ParentId = initialSpecInputItem.folder.value; // specification folder
            initialSpecification.Tags = initialSpecInputItem.tag.value; // specification tags
            initialSpecification.Query = workitemsSearchValues.selectedRadioButton.value;
            initialSpecification.Queries = workitemsSearchValues.Query.value;
            initialSpecification.IDs = workitemsSearchValues.Ids.value;
            initialSpecification.Title = workitemsSearchValues.Title.value;
            initialSpecification.WIType = workitemsSearchValues.Type.value;
                        this.setState({workitemsdata:workitemsdata,
                            specification:initialSpecification
                            });
            console.log(apiUrl);
            console.log(this.state.specification);
            
            
        })
    }

    componentDidUpdate() {
     this.populateWoritemsOnSearchCriteria();
    }


    public render(): JSX.Element {
        return (
           <>
            <Button 
            className="save-btn"
            text="Save"
            primary={true}
            onClick={this.onSave}
            />
            <Card
                className="flex-grow bolt-card-no-vertical-padding"
                contentProps={{ contentPadding: false }}>         

                <Table
                    ariaLabel="Basic tree"
                    columns={fixedColumns}
                    itemProvider={this.state.workitemsdata}
                    // onToggle={(event, treeItem: ITreeItemEx<ILocationTableItem>) => {
                    //     this.itemProvider.toggle(treeItem.underlyingItem);
                    // }}
                    scrollable={true}
                />
            </Card>

        </>
        );
    }

    private onSave = () => {
        this.props.onSelectedTabChanged('tab2');
        axios.post(`https://localhost:44328/api/Specification/create`, this.state.specification)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
        alert("Saved the spec data");
        
    };
}
