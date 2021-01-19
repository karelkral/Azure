import   React, { Component, FunctionComponent } from "react";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { IListBoxItem } from "azure-devops-ui/ListBox";
import { FormItem } from "azure-devops-ui/FormItem";
import { Observer } from "azure-devops-ui/Observer";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";
//import Taginput from "./Tagspicker";
import { dropdownItems } from "../AddWorkItemPopup/Dropdowndata";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/src/styles/index.scss";

const namevalue = new ObservableValue<string>("");
const Description  = new ObservableValue<string>("");
const selectedFolderItem = new ObservableValue<string>("");
const enteredtag = new ObservableValue<string>("");

export const initialSpecInputItem =
    {
        name: namevalue,
        folder: selectedFolderItem,
        description: Description,
        tag: enteredtag,
    }


class Specificationform extends Component  {
    
    state = {
        folderItems:dropdownItems, 
        tags : []
      };

    componentDidMount() 
    {
    const apiUrl = 'https://localhost:44328/api/Specification/ListFoldersForUI';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((folderItems) => {console.log('This is your folderItems dropdown', folderItems)
      this.setState({folderItems})
      }).catch(e => console.log(e))
    }   

    
    public render(): JSX.Element {

        return (

            <form className="specification-form">

                <div className="form-group">
                    <FormItem label="Name *">
                        <TextField
                            className="namefield"
                            required={true}
                            value={namevalue}
                            onChange={(e, newValue) => (namevalue.value = newValue)}
                            placeholder="Search keyword"
                            width={TextFieldWidth.auto}
                        />
                    </FormItem>
                </div>

                <div className="form-group" style={{margin:"8px 0px"}}>
                    <FormItem label="Folder *">
                        <div className="" style={{ margin: "0px 0px 0px", alignItems: "center", width: "100%" }}>
                        
                            <Dropdown
                                
                                ariaLabel="Basic"
                                className="example-dropdown"
                                placeholder="Select an Option"
                                items={this.state.folderItems}
                                onSelect={this.onSelect}
                            />
                            
                        </div>
                    </FormItem>
                </div>

                <div className="form-group">
                    <FormItem label="Description *">
                            <TextField
                                    className="namefield"
                                    multiline={true}
                                    rows={4}
                                    required={true}
                                    value={Description}
                                    onChange={(e, newValue) => (Description.value = newValue)}
                                    placeholder="Search keyword"
                                    width={TextFieldWidth.auto}
                                />
                    </FormItem>                        
                </div>

                <div className="form-group" style={{ margin: "8px 0px 0px",}}>
                    <FormItem label="Add tags" >

                           <ReactTagInput 
                                tags={this.state.tags}
                                onChange={(newValue) => {
                                    this.setState({tags:newValue})
                                    enteredtag.value = newValue.toString()
                                    }
                                }
                                
                            />
                    </FormItem>
                </div>

            </form>    

        );

    }

    private onSelect = (event: React.SyntheticEvent<HTMLElement>, item: IListBoxItem<{}>) => {
        selectedFolderItem.value = item.id || "0";
    };
}


export default Specificationform;