/**
 * Created by lilu on 2017/3/1.
 */
import AV from 'leancloud-storage'
import React, {PropTypes, Component} from 'react'
import {Form, Input, InputNumber, Radio, Modal, Checkbox,Upload,Table,Icon,Button} from 'antd'
import styles from './CategoryModal.less'
//import {checkBox} from '../../common/checkBox'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}
class CategoryModal extends Component {
  constructor(props) {
    super(props)


    this.state = {
      count:1,
      visible: false,
      fileList: [
    ],
      selectedRowKeys: [],
      selectTags:[]
    }
  }

  componentWillReceiveProps(newProps) {
      console.log('imnewProps',newProps)
    if (this.props.visible != newProps.visible) {
      this.setState({visible: newProps.visible})
    }
    if(newProps.item.imageSource!=this.props.item.imageSource)
    this.setState({fileList:this.state.visible==='create'?[]:[{uid:-1,status:'done',name:newProps.item.text,url:newProps.item.imageSource}]})
  }

  componentDidMount() {

    this.setState({visible: !!this.props.visible})
    console.log('hahahah',...this.props)

  }
  onSelectChange = (selectedRowKeys,selectedRowData) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    //console.log('selectedRowKeys changed: ', this.state.selectedRowKeys);

    this.setState({ selectedRowKeys:selectedRowKeys,selectTags:selectedRowData });

  }

  handleOk() {
    let count=this.state.count+1
    this.setState({count:count})
    this.props.form.validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        selectedTags:this.state.selectTags,
        ...this.props.form.getFieldsValue(),
        key: this.props.item.id?this.props.item.id:''
      }
      console.log('data',data)
      this.props.onOk(data)
    })
  }
  returnUrl(payload){
    var localFile = payload.file
    var name = 'categorytestimage.png'
    var file = new AV.File(name,localFile)
    file.save().then((file)=>{
      // console.log(file.url())
      this.setState({fileList:[{
        uid:-1,
        name:name,
        status:'done',
        url:file.url()
        }]}

      )
      return(file.url())
    })
  }

  render() {
    // if(this.props.type!='create'){
    //   let tagKeys = []
    //   this.props.item.containedTag.forEach((tag)=>{
    //     tagKeys.push(tag.key)
    //   })
    //   this.setState({selectedRowKeys:tagKeys})
    // }
    // console.log('containedTag',this.props.item.containedTag)

    const {  selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const columns = [
      {
        title: '标签名称',
        dataIndex: 'name',
        key: 'name'
      }
    ]
    const options = ['apple', 'pear', 'orange']
      // console.log('ahahahahahaha', selectedRowKeys)
    // console.log('ahahahahahaha',options)
    const roles = []
    if (this.props.item.roleList)
    {
      this.props.item.roleList.forEach((record)=>{
        roles.push(record)
      })
    }
    // console.log('type',this.props.type)
      console.log('fileList',this.state.fileList)
    return (
      <Modal
        title={(this.props.type === 'create') ? '新建分类' : '修改分类'}
        visible={this.state.visible}
        onOk={()=>{this.handleOk()}}
        onCancel={()=>{ let count=this.state.count+1
          this.setState({count:count})
          this.props.onCancel()}}
        wrapClassName='vertical-center-modal'
        key={this.state.count}
      >
        <Form horizontal>
          <FormItem label='名称：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('text', {
              initialValue: this.props.type==='create'?'':this.props.item.text,
              rules: [
                {
                  required: true,
                  message: '名称未填写'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label='图标：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('imageSource', {
              initialValue: this.props.type==='create'?'':{uid:-1,status:'done',name:this.props.item.text,url:this.props.item.imageSource},
              rules: [
                {
                  required: true,
                  message: '图标'
                }
              ]
            })(<Upload
              listType='picture'
              accept='image/png'
              defaultFileList={this.props.type==='create'?[]:[{uid:-1,status:'done',name:this.props.item.text,url:this.props.item.imageSource}]}
              onChange={(info)=>{
                console.log('info',info)
                let fileList = info.fileList
                this.setState({fileList:fileList})
                console.log('fileList',fileList)

              }}
            >

              { (this.state.fileList.length>=1)?null:(<div><Icon type='plus' className={styles.avatar}/></div>)}
            </Upload>)}
          </FormItem>
          <FormItem label='启用状态：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('status', {
              initialValue: this.props.type==='create'?'':this.props.item.status,
              rules: [
                {
                  required: true,
                  message: '状态未填写'
                }
              ]
            })(<InputNumber />)}
          </FormItem>
          <FormItem label='标签' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('containedTag', {
              initialValue: this.props.type==='create'?[]:this.props.item.containedTag,

            })(
             <Table bordered scroll={{
               y: 300
             }} dataSource={this.props.tagList} columns={columns} pagination='false' rowKey={record=>record.id} rowSelection={rowSelection} ></Table>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

CategoryModal.propTypes = {
  // visible: PropTypes.any,
  // form: PropTypes.object,
  // item: PropTypes.object,
  // onOk: PropTypes.func,
  // onCancel: PropTypes.func
}

export default Form.create()(CategoryModal)
