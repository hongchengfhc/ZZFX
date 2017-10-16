<template lang="html">
	<div class="invoice">
		<Modal class="invoice_modal" v-model="show" width="550" style="box-shadow: 0 0 25px 0 rgba(51, 51, 51, 0.4);">
			<p slot="header">
				<span style="font-size:14px;color:#333;font-weight:500;">开票信息</span>
			</p>
			<Form ref="formInvoice" :model="formInvoiceObj" :rules="invoiceRuleValidate" :label-width="140">
				<FormItem label="发票抬头" prop="header">
					<Input v-model="formInvoiceObj.header" style="width:200px;" placeholder="请输入发票抬头"></Input>
				</FormItem>
				<FormItem label="账户开票类型">
					<RadioGroup v-model="formInvoiceObj.type">
						<Radio label="个人"></Radio>
						<Radio label="企业"></Radio>
					</RadioGroup>
				</FormItem>
				<FormItem v-if="formInvoiceObj.type=='企业'" label="纳税人识别号" prop="taxparerNumber">
					<Input v-model="formInvoiceObj.taxparerNumber" style="width:200px;" placeholder="请输入纳税人识别号"></Input>
				</FormItem>
				<FormItem label="收件人姓名" prop="recipientName">
					<Input v-model="formInvoiceObj.recipientName" style="width:200px;" placeholder="请输入收件人姓名"></Input>
				</FormItem>
				<FormItem label="收件人电话" prop="recipientPhone">
					<Input v-model="formInvoiceObj.recipientPhone" style="width:200px;" placeholder="请输入收件人电话"></Input>
				</FormItem>
				<FormItem label="地址" prop="address2">
					<Select @on-change="areaChange1" label-in-value v-model="formInvoiceObj.address1" style="width:100px" placeholder="请选择省">
						<Option v-for="item in area_list1" :value="item.id" :key="item.id">{{ item.area_name }}</Option>
						<!-- <Option value="22"></Option><Option value="22"></Option><Option value="22"></Option> -->
					</Select>
					<Select @on-change="areaChange2" label-in-value v-model="formInvoiceObj.address2" style="width:100px;margin-left:8px;" placeholder="请选择市">
						<Option v-for="item in area_list2" :value="item.id" :key="item.id">{{ item.area_name }}</Option>
						<!-- <Option value="22"></Option><Option value="22"></Option><Option value="22"></Option> -->
					</Select>
					<Select @on-change="areaChange3" label-in-value v-model="formInvoiceObj.address3" style="width:100px;margin-left:8px;" placeholder="请选择区">
						<Option v-for="item in area_list3" :value="item.id" :key="item.id">{{ item.area_name }}</Option>
						<!-- <Option value="22"></Option><Option value="22"></Option><Option value="22"></Option> -->
					</Select>
				</FormItem>
				<FormItem label="" prop="detailAddress">
					<Input type="textarea" style="width:320px;font-size: 12px;" v-model="formInvoiceObj.detailAddress" placeholder="请输入详细地址"></Input>
				</FormItem>
				<FormItem>
					<Button style="font-size:14px;width:100px;height:35px;border-radius:2px;box-shadow: 0 0 5px 0 rgba(51, 51, 51, 0.2);" type="primary" @click="formInvoiceSubmit('formInvoice')">提交</Button>
					<Button style="margin-left: 8px;font-size:14px;color:#999;width:100px;height:35px;" type="text" @click="formInvoiceReset('formInvoice')">重置</Button>
				</FormItem>
			</Form>
			<div slot="footer" style="display:none">
				<Button type="error" size="large" long>删除</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import Util from '../../../config/Util'
	import infoType from '../../../config/infoType'
	export default {
		name: "invoice",
		props: {
			formObj: [Object]
		},
		data() {
			return {
				show: false,
				formInvoiceObj: {
					header: '', //发票抬头
					type: '个人', //个人  企业
					taxparerNumber: '', //纳税人识别号
					recipientName: '', //收件人姓名
					recipientPhone: '', //收件人电话
					address1: '', //省
					address2: '', //市
					address3: '', //区
					area_name: "", //省市区的name
					detailAddress: '' //详细地址
				},
				address1_label: '',
				address2_label: '',
				address3_label: '',
				area_list1: [], //省
				area_list2: [], //市
				area_list3: [], //区
				invoiceRuleValidate: {
					header: [{
						required: true,
						message: '发票抬头不能为空',
						trigger: 'blur'
					}],
					// taxparerNumber: [{
					//     required: true,
					//     message: '纳税人识别号不能为空',
					//     trigger: 'blur'
					// }],
					recipientName: [{
						required: true,
						message: '收件人姓名不能为空',
						trigger: 'blur'
					}],
					recipientPhone: [{
							required: true,
							message: '收件人电话不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 7,
							message: '电话格式不正确',
							trigger: 'blur'
						}
					],
					address2: [{
						required: true,
						message: '地址至少到市级',
						trigger: 'blur'
					}],
					detailAddress: [{
						required: true,
						message: '详细地址不能为空',
						trigger: 'blur'
					}]
				}
			}
		},
		mounted() {

		},
		watch: {
			formObj: {
				handler(cur, old) {
					if(cur) {
						this.formInvoiceObj = cur;
						if(this.formInvoiceObj.address1) {
							this.httpLoadAreaList();
						}
						if(this.formInvoiceObj.address2) {
							this.httpLoadAreaList({
								id: this.formInvoiceObj.address1,
								level: 2
							})
						}

					}
				},
				deep: true
			},
			show(cur, old) {
				if(cur == true) {
					this.httpLoadAreaList();
				}
			}
			// formInvoiceObj:{
			//     handler(cur,old){
			//         if(cur.type=="企业"){
			//             let arr=[{
			//                 required: true,
			//                 message: '纳税人识别号不能为空',
			//                 trigger: 'blur'
			//             }];
			//             // this.invoiceRuleValidate.taxparerNumber=arr;
			//             this.$set(this.invoiceRuleValidate,'taxparerNumber',arr);
			//             console.log(this.invoiceRuleValidate);
			//         }else{
			//             this.$set(this.invoiceRuleValidate,'taxparerNumber',[]);
			//         }
			//     },deep:true
			//
			// }
		},
		methods: {
			httpLoadAreaList(_data = {
				id: 0,
				level: 1
			}) {
				// let _data={
				//     id:0,
				//     level:1
				// }
				Util.post({
					obj: this,
					url: '/booking/order/get-city-for-select',
					data: _data,
					success: (res_data) => {
						Util.ZZLog(res_data);
						if(res_data.flag == false) {
							this.$Message.warning(res_data.msg);
						} else {
							let data = res_data.data;
							if(_data.level == 1) this.area_list1 = data.list;
							if(_data.level == 2) this.area_list2 = data.list;
							if(_data.level == 3) this.area_list3 = data.list;
						}
					},
					error: () => {
						this.$Message.error(infoType.infoApiError);
					}
				})
			},
			areaChange1(item) {
				this.address1_label = item.label;
				this.httpLoadAreaList({
					id: item.value,
					level: 2
				});
			},
			areaChange2(item) {
				this.address2_label = item.label;
				this.httpLoadAreaList({
					id: item.value,
					level: 3
				});
			},
			areaChange3(item) {
				this.address3_label = item.label;
			},
			formInvoiceSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						// TODO 需要调用开具发票的一个提交接口
						// user_type //开票账户类型 0 个人 1企业
						// invoice_type //发票类型 0 普通 1 专用
						// invoice_title ////发票抬头
						// invoice_tax_no //发票纳税人识别号 企业才有
						// deliver_contact //联系人
						// deliver_tel //电话
						// deliver_add 地址
						// province 省级
						// city 市级
						// county 区级

						// header: '', //发票抬头
						// type:'个人' ,  //个人  企业
						// taxparerNumber: '', //纳税人识别号
						// recipientName: '', //收件人姓名
						// recipientPhone: '', //收件人电话
						// address1: '', //省
						// address2: '', //市
						// address3: '', //区
						// detailAddress: '' //详细地址
						// return;
						let type = this.formInvoiceObj.type == "个人" ? 0 : 1;
						if(type == 1 && this.formInvoiceObj.taxparerNumber == "") {
							this.$Message.warning('纳税人识别号不能为空');
							return;
						}
						let _data = {
							user_type: type,
							invoice_title: this.formInvoiceObj.header,
							invoice_tax_no: this.formInvoiceObj.taxparerNumber,
							deliver_contact: this.formInvoiceObj.recipientName,
							deliver_tel: this.formInvoiceObj.recipientPhone,
							deliver_add: this.formInvoiceObj.detailAddress,
							province: this.formInvoiceObj.address1,
							city: this.formInvoiceObj.address2,
							county: this.formInvoiceObj.address3,
							province_str: this.address1_label,
							city_str: this.address2_label,
							county_str: this.address3_label
						};
						this.$emit('invoiceSubmitSuccess', _data, this);
					} else {
						// this.$Message.error('请填写完整')
					}
				})
			},
			formInvoiceReset(name) {
				this.$refs[name].resetFields();
				this.formInvoiceObj.address1 = "";
				this.formInvoiceObj.taxparerNumber = "";
				this.formInvoiceObj.type = "个人";
			},
		}
	}
</script>

<style lang="css">
	.invoice_modal .ivu-modal-body{
		text-align: left!important;
	}
	.invoice_modal .ivu-modal-footer {
		display: none!important;
	}

	.invoice_modal .ivu-form-item-label {
		color: #666!important!important;
	}
	.invoice_modal textarea.ivu-input {
	    max-width: 100%!important;
	    height: auto!important;
	    vertical-align: bottom!important;
	    font-size: 12px!important;
	    color: #333333!important;
	}
</style>
