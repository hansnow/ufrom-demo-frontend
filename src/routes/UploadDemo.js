import React from "react"
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
  const handleChange = info => {
    const { onChange } = props
    const { fileList } = info
    let arr = []
    fileList.map(async v => {
      const result= await getBase64(v.originFileObj)
      arr.push(result)
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
      {...restProps}
    >
      {render()}
    </Upload>
  )
}
registerFormField("uploadDiy", connect()(props => <UploadDiy {...props} />))

function UploadDemo(){
  return  <SchemaForm
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
            )
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
