import * as React from "react";
import { FormItem } from "azure-devops-ui/FormItem";
import RadioButtonGroupExample from "./RadioButton";
import AddWorkFields from "./InputFields";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";

function AddWorkItemPopup(){

    return (

        <> 
                <form id="AddWorkItemPopForm">
                    <div>
                        <div  className="radio-buttons">
                            <RadioButtonGroupExample/>
                        </div>
                        
                    </div>
                </form>
        </>

    );
}

export default AddWorkItemPopup;