import React, { useState } from "react"
import SchemaForm, {
  FormButtonGroup,
  Submit,
  Reset,
  registerFormField,
  connect
} from "@uform/antd"
import { Button, Upload, Icon } from "antd"
import "antd/dist/antd.css"

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

function UploadDiy(props){
  const [fileList, setFileList] = useState(props.value)

  const handleChange = info => {
    const { onChange } = props
    const { fileList } = info
    setFileList(fileList)
    let arr = []
    fileList.map(async v => {
      if(!v.url && !v.preview){
        const result= await getBase64(v.originFileObj)
        arr.push(result)
      }else{
        const result= v.url || v.preview
        arr.push(result)
      }
    })
    onChange(arr)
  }

  const beforeUpload = () => {
    // 这里需要默认返回false，阻止默认提交
    return false
  }

  // 这里需要注意： props 中的onChange会覆盖Upload本身的onChange,所以需要将其从props中提取出来，再将剩下的props（restProps）赋给Upload组件
  const { render, onChange, ...restProps } = props
  return (
    <Upload
      onChange={handleChange}
      beforeUpload={beforeUpload}
      fileList={fileList}
      {...restProps}
    >
      {render()}
    </Upload>
  )
}
registerFormField("uploadDiy", connect()(props => <UploadDiy {...props} />))

function UploadDemo(){
  return  <SchemaForm
    initialValues = {{
      uploadImage: [
        {
          uid: '-1',
          name: 'xxx.png',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
      ]
    }}
    labelCol={4}
    wrapperCol={20}
    schema={{
      "type": "object",
      "properties": {
        "uploadImage": {
          "type": "array",
          "x-component": "uploadDiy",
          "x-props": {
            "listType": "picture-card",
            "render": ()=>(
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
              </div>
            ),
            /**
             * Antd 的 Upload 组件是通过 fileList 属性受控的，
             * 但是这里自定义的上传组件 uploadDiy 是不能通过 fileList 去控制
             * */
            // 'fileList':[
            //   {
            //     uid: '-1',
            //     name: 'xxx.png',
            //     status: 'done',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            //   }
            // ]
          },
          "title": "卡片上传文件"
        },
        "uploadFile": {
          "type": "array",
          "x-component": "uploadDiy",
          "x-props": {
            "listType": "text",
            "render": ()=>(
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            )
          },
          "title": "普通上传文件"
        }
      }
    }}
    onSubmit={values => {
      console.log(values)
    }}
  >
    <FormButtonGroup offset={7}>
      <Submit />
      <Reset />
    </FormButtonGroup>
  </SchemaForm>
}

export default UploadDemo
