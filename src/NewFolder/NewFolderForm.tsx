import * as React from "react";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { IListBoxItem } from "azure-devops-ui/ListBox";
import { Observer } from "azure-devops-ui/Observer";
import { FormItem } from "azure-devops-ui/FormItem";
import { dropdownItems } from "../AddWorkItemPopup/Dropdowndata";


const foldertitle = new ObservableValue<string>("");
const selectedFolderItem = new ObservableValue<string>("");

export const addFolderItems =
    {
        name: foldertitle,
        parentId: selectedFolderItem,
    }

export default class NewFolderForm extends React.Component<any, any> {

        state = {
        folderItems:dropdownItems,        
      };

    componentDidMount() 
    {
    const apiUrl = 'https://localhost:44328/api/Specification/ListFoldersForUI';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((folderItems) => {console.log('This is your folderItems', folderItems)
      this.setState({folderItems})
      }).catch(e => console.log(e))
    }   

    public render(): JSX.Element {
        return (
           

            <form className="addnewfolderform">
                    <div className="form-group" style={{ margin: "8px 0px 10px" }}>
                        <FormItem label="Name *" >
                            <TextField
                                value={foldertitle}
                                onChange={(e, newValue) => (foldertitle.value = newValue)}
                                placeholder="Folder Title"
                                width={TextFieldWidth.auto}
                            />
                        </FormItem>
                    </div>

                    <div className="form-group">
                    <div className="" style={{ margin: "20px 0px 10px", alignItems: "center" }}>
                    <FormItem label="Select Item *" >
                        <Dropdown
                            ariaLabel="Basic"
                            className="example-dropdown"
                            placeholder="Select an Option"
                            items={this.state.folderItems}                           
                            onSelect={this.onSelect}
                        />                        
                    </FormItem>
                    </div>
                    </div>

            </form>

        );
    }

    private onSelect = (event: React.SyntheticEvent<HTMLElement>, item: IListBoxItem<{}>) => {
        selectedFolderItem.value = item.id || "";
    };
}