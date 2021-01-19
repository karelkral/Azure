import * as React from "react";
import { fixedColumns, tableItems } from "./FolderData";
import { Card } from "azure-devops-ui/Card";
import { Table } from "azure-devops-ui/Table";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import { ITableItem} from "./FolderData";



export default class FolderTableData extends React.Component<{}> {

    state = {
        itemProvide:tableItems, 
      };

    componentDidMount() {
    const apiUrl = 'https://localhost:44328/api/Specification/GetViewSpec3';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((Items) => {                     
            let abc = new ArrayItemProvider<ITableItem>(Items);
            console.log('This is view all folders dynamic', abc);
            this.setState({itemProvide:abc})
      }).catch(e => console.log(e))
    }

    public render(): JSX.Element {
        return (
            <Card className="flex-grow bolt-table-card" contentProps={{ contentPadding: false }}>
                <Table 
                ariaLabel="Basic Table" 
                columns={fixedColumns} 
                itemProvider={this.state.itemProvide}
                role="table" />
            </Card>
        );
    }
}
