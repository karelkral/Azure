import * as React from "react";
import "./AddWork.css";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { DropdownSelection } from "azure-devops-ui/Utilities/DropdownSelection";
import { dropdownItems } from "./Dropdowndata";
import { FormItem } from "azure-devops-ui/FormItem";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";

const Ids = new ObservableValue<string>("");
const TitleContains = new ObservableValue<string>("");
const worktype = new ObservableValue<string>("");


export default class AddWorkFields extends React.Component {

    state={
        data:dropdownItems
    }
   
    private selection = new DropdownSelection();

    public render() {
        return (
            
            <>

            <div style={{ margin: "8px" }}>

                           

                            <Dropdown
                                ariaLabel="Single select"
                                className="example-dropdown"
                                placeholder="Select an Option please"
                                items={this.state.data}
                                selection={this.selection}
                            />
            </div>

                   
            </>
        );
    }
}
