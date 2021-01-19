import * as React from "react";
import { Button } from "azure-devops-ui/Button";
import { Dialog } from "azure-devops-ui/Dialog";
import { Observer } from "azure-devops-ui/Observer";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import NewFolderForm from "./NewFolderForm"
import FolderTableData from "./FolderTableview"
import axios from 'axios';
import { addFolderItems } from "../NewFolder/NewFolderForm";

interface tabid {
    onSelectedTabChanged: (newTabId: string) => void,
    abv: boolean
}



export default class NewFolderDialog extends React.Component<tabid,{}> {

    private isNewFolderDialogOpen = new ObservableValue<boolean>(false);   


    



    public render() {


        this.isNewFolderDialogOpen.value = this.props.abv

        const onDismiss = () => {
            this.isNewFolderDialogOpen.value = false;
        };

        
        return (

                            
            <div>
                <Observer isNewFolderDialogOpen={this.isNewFolderDialogOpen}>
                    {(props: { isNewFolderDialogOpen: boolean }) => {
                        return props.isNewFolderDialogOpen ? (
                            <Dialog
                                titleProps={{ text: "Add Folder Popup" }}
                                showCloseButton={true}
                                footerButtonProps={[
                                    {
                                        text: "Cancel",
                                        onClick: onDismiss
                                    },
                                    
                                    {   
                                        text: "Save Changes folder",
                                        onClick:this.onSaveFolder,
                                        primary: true
                                    }
                                ]}
                                onDismiss={onDismiss}   
                            >
                                <NewFolderForm/>
                                
                            </Dialog>
                        ) : null;
                    }}
                </Observer>
            </div>
        );
    }
    public onSaveFolder = () => {

        const folder={
            FolderName: addFolderItems.name.value,
            ParentId:  addFolderItems.parentId.value
        };
        
        axios.post(`https://localhost:44328/api/Specification/createFolder`, folder)
      .then(res => {
        console.log(res);
        console.log(res.data);
      }); 
      this.isNewFolderDialogOpen.value = false; 
      this.props.onSelectedTabChanged('tab2');     
    };

    
}
