import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeParams } from 'primereact/radiobutton';
import { InputNumber, InputNumberChangeParams } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";


import {

  CREATE_ADMIN , 
  UPDATE_USERNAME , 
  UPDATE_PASSWORD,

} from "gql/mutations";
import { GET_ADMINS } from "gql/queries";

import { useAppDispatch, useAppSelector } from 'store/store';
import InputField from 'components/common/inputField/inputField';
import { resetAdmin , setAdmin } from "store/redux/slices/adminSlice";
import useForm from 'components/common/customHooks/useForm';
import { adminValidate } from "components/validation/customValidator";
import { useNavigate } from "react-router-dom";
import * as jwt from 'jsonwebtoken';


const config = require('config');




type Props = {
};

interface Body {
  id: string;
  user_name : string;
  password :string;
}

const Admin_test: React.FC<Props> = ({  }) => {


  const [createAdmin, createValues] = useMutation(CREATE_ADMIN);
  const [updateAdminName, updateValues] = useMutation(UPDATE_USERNAME);
  const [updateAdminPassword, updatePassValues] = useMutation(UPDATE_PASSWORD);
  const [globalFilter, setGlobalFilter] = useState<string>();

  const toast = useRef<Toast>(null);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const { admin } = useAppSelector((state) => state.admin)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dt = useRef(null);


  const { loading, error, data, refetch } = useQuery(GET_ADMINS);
  console.log(data)

  const exportCSV = ()=>{
    dt.current.exportCSV();
  }

  const exportJSON = (  )=>{
    let exportName = 'DOWNLOAD'
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data?.getAdmins));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();


  }


  const statusBodyTemplate = (rowData) => {
      let status_message ;
      if (rowData.isActivated === false){ status_message = 'Not Activated' }
      else{ status_message = 'Activated'}
      return <span>{status_message}</span>;
  }


   const rightToolbarTemplate = () => {
      return (
          <React.Fragment>
              <Button label="Export CSV" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
          </React.Fragment>
      )
   }


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Export JSON" icon="pi pi-upload" className="p-button-success mr-2" onClick={exportJSON} />
            </React.Fragment>
        )
    }



  const header = (
    // Options for adding , deleting and exporting
    <div className="flex flex-column md:flex-row md:align-items-center justify-content-between">
      <span className="p-input-icon-left w-full md:w-auto">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
      </span>
      <div className="mt-3 md:mt-0 flex justify-content-end">
        <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} />
      </div>
    </div>
  );

  return (

    <div>
    {!error ?
      <div>      
      {!loading ?      
          <div className="datatable-crud-demo surface-card p-4 border-round shadow-2">
            <Toast ref={toast} />
            <div className="text-3xl text-800 font-bold mb-4">Admin CRUD Table</div>
            <div className="card">
              <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
              <DataTable ref={dt} value={data?.getAdmins}
                dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                <Column field="id" header="id" sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="email" header="Email" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="user_name" header="User Name" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="password" header="Password" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="isActivated" header="Is_minted" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
              </DataTable>
             </div>



          </div>
        : <div> <h1> ... Loading ... </h1> </div> }
      </div>
      : <div> ACCESS DENIED </div> }
    </div>
  );
};

export default Admin_test;




