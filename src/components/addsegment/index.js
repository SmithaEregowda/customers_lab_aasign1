import { Button, Drawer, Select } from 'antd'
import React, { useState } from 'react'
import styles from './addsegment.module.scss'
import Input from 'antd/es/input/Input'
import { AddSchema } from '../../pages/segments/segment.service'

const AddSegment = ({open,onClose}) => {
    const [schemaName,setSchemaName]=useState();
    const [schemaTypes,setSchemaTypes]=useState([])
    const [selectedSchema,setSelectedSchema]=useState();
    const [schemaOptions,setSchemaOptions]=useState([
        { value: 'first_name', label: 'First Name' },
        { value: 'last_name', label: 'Last Name' },
        { value: 'gender', label: 'Gender' },
        { value: 'age', label: 'Age' },
        { value: 'account_name', label: 'Account Name' },
        { value: 'city', label: 'City' },
        { value: 'state', label: 'State' },
    ])

    const handleChange=(val,opt)=>{
        setSelectedSchema(opt)
    };

    const addSchemaHandelr=()=>{
        if(selectedSchema){
            let ExistingSchema=schemaTypes?.find((item)=>item?.value===selectedSchema?.value);
            if(ExistingSchema){
                return
            }else{
                setSchemaTypes([...schemaTypes,selectedSchema])
                setSchemaOptions(schemaOptions?.filter((item)=>item?.value!==selectedSchema?.value));
                setSelectedSchema();
            }
        }
    }

    const handleSelectedSchemaChange=(oldschemaType,newSchemaType)=>{
        let removedoldschemaType=schemaTypes?.filter((item)=>item?.value!==oldschemaType?.value);
        let removenewoption=schemaOptions?.filter((item)=>item?.value!==newSchemaType?.value);
        setSchemaTypes([...removedoldschemaType,newSchemaType]);
        setSchemaOptions([...removenewoption,oldschemaType]);
    }

    const saveSegmentHandler=()=>{
        let payload={
            segment_name:schemaName
        }
        if(schemaTypes?.length>0){
            payload["schema"]=schemaTypes?.map((item)=>{
                return {
                    [item?.value]:item?.label
                }
            })
        }
        const requestOptions = {
            method: 'Post',
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(payload)
          }
          AddSchema(requestOptions).then((data)=>{
            console.log(data)
          })
    }
  
  return (
    <Drawer
        title="Saving Segment"
        placement={"right"}
        width={400}
        onClose={onClose}
        open={open}
        footer={<div className={"footer"}>
            <Button type="primary" onClick={saveSegmentHandler}>
                Save the Segment
            </Button>
            <Button onClick={onClose}>Cancel</Button>
        </div>}
      >
           <div className={styles.addSegmentWrapper}>
           <div className={styles.inputField}>
                <div className={styles.label}>Enter the Name of the Segment</div>
                <div>
                    <Input placeholder='Name of the Segment' 
                    onChange={(e)=>setSchemaName(e.target.value)} 
                    value={schemaName}
                    />
                </div>
           </div>
           <div className={styles.info}>
                To save your segment , you need to add schemas to build the query
           </div>
           <div className={styles.listSchema}>
                {schemaTypes?.map((item)=>(
                    <div key={item?.value}>
                        <Select
                placeholder={"Add Schema to Segment"}
                style={{ width: 300 }}
                onChange={(val,opt)=>handleSelectedSchemaChange(item,opt)}
                options={schemaOptions}
                value={item}
                />
                    </div>
                ))}
           </div>
           <div className={styles.addschema}>
           <Select
                placeholder={"Add Schema to Segment"}
                style={{ width: 350 }}
                onChange={(val,opt)=>handleChange(val,opt)}
                options={schemaOptions}
                allowClear={true}
                value={selectedSchema}
                />
                <div className={styles.addschemaLink} onClick={addSchemaHandelr}>+Add new Schema</div>
           </div>
           </div>
    </Drawer>
  )
}

export default AddSegment