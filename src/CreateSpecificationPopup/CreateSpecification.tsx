import * as React from "react";
import Specificationform from "./CSPform";
import { Button } from "azure-devops-ui/Button";
import { Dialog } from "azure-devops-ui/Dialog";
import { Observer } from "azure-devops-ui/Observer";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import "azure-devops-ui/Core/override.css";
import AddWorkItemPopup from "../AddWorkItemPopup/AddWorkItem"
import TreeExample from "../Treeview/TreeView"
import "./Create.css";
import { Redirect } from 'react-router-dom';






interface CSinterface {
    onSelectedTabChanged: (newTabId: string) => void,
    CSmodalpopup: boolean;
    
}

//let history = useHistory();


export default class DialogExample extends React.Component<CSinterface,{}> {
    
    state = {
    listData: [],
    redirect: false
  }


  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/main' />
    }
  }

  

    componentDidMount() {
    //const apiUrl = 'https://api.github.com/users/hacktivist123/repos';
    const apiUrl = 'https://localhost:44328/api/Specification/GetListOfWorkItemTypeCategories';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((listData) => console.log('This is your listData', listData));
    }
  



    private createspecificationpopup = new ObservableValue<boolean>(false);
    private isWorkItemopen = new ObservableValue<boolean>(false);
   
    
    public render() {

        this.createspecificationpopup.value = this.props.CSmodalpopup
        
        const onDismiss = () => {
         
            this.createspecificationpopup.value = false;
            this.isWorkItemopen.value = false;
        };

        const find = () => {
            this.setState({
                redirect: true
              })
            this.createspecificationpopup.value = false;
            this.isWorkItemopen.value = false;
        };
        const openWorkItempopup = () => {
            this.createspecificationpopup.value = false;
            this.isWorkItemopen.value = true;
        };


        const onBack = () => {
            this.createspecificationpopup.value = true;
            this.isWorkItemopen.value = false;
        }

        return (
            
            <>
                   {this.renderRedirect()}
                {/* <Button
                    text="Create Specification"
                    className="creatbtn"
                    onClick={() => {
                        this.isDialogOpen.value = true;
                    }}
                /> */}

                {/* <TreeExample onSelectedTabChanged={this.props.onSelectedTabChanged}/> */}

                
                <Observer createspecificationpopup={this.createspecificationpopup }>
                    {(props: { createspecificationpopup: boolean }) => {
                        return props.createspecificationpopup ? (
                            <Dialog
                                titleProps={{ text: "Create Specification" }}
                                showCloseButton={true}
                                footerButtonProps={[
                                    {
                                        text: "Next",
                                        onClick: openWorkItempopup,
                                        primary: true
                                    },
                                    {
                                        text: "Cancel",
                                        onClick: onDismiss,
                                        
                                    }
                                ]}
                                onDismiss={onDismiss}
                            >

                                <div className="widget">
                                   <Specificationform/>
                                </div>
                                
                            </Dialog>
                        ) : null;
                    }}
                </Observer>


                <Observer isWorkItemopen={this.isWorkItemopen}>
                        {(props: { isWorkItemopen: boolean }) => {
                            return props.isWorkItemopen ? (
                                <Dialog
                                    titleProps={{ text: "Add Work Item" }}
                                    footerButtonProps={[
                                        {
                                            text: "Back",
                                            onClick: onBack,
                                        },
                                        
                                        {
                                            text: "Find",
                                            onClick: find,
                                            primary: true
                                        }
                                    ]}
                                    onDismiss={onDismiss}
                                >
                                    <AddWorkItemPopup/>
                                </Dialog>
                            ) : null;
                        }}
                    </Observer>

            </>
        );
    }
}