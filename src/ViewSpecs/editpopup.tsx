import * as React from "react";
import { Button } from "azure-devops-ui/Button";
import { Dialog } from "azure-devops-ui/Dialog";
import { Observer } from "azure-devops-ui/Observer";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";

const renamefield = new ObservableValue<string>("");
var check: boolean;


export default class EditPopupDialog extends React.Component {



    private editpopupdialog = new ObservableValue<boolean>(false);

    public render() {

        const onDismiss = () => {
            this.editpopupdialog.value = false;
        };
        return (
            <div>
                <Button
                    text="Rename Dialog"
                    onClick={() => {
                        this.editpopupdialog.value = true;
                    }}
                />
                <Observer editpopupdialog={this.editpopupdialog}>
                    {(props: { editpopupdialog: boolean }) => {
                        return props.editpopupdialog ? (
                            <Dialog
                                titleProps={{ text: "Rename Folder" }}
                                footerButtonProps={[
                                    {
                                        text: "Cancel",
                                        onClick: onDismiss
                                    },
                                   
                                    {
                                        text: "Save Changes",
                                        onClick: onDismiss,
                                        primary: true
                                    }
                                ]}
                                onDismiss={onDismiss}
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
            </div>
        );
    }

    
}


