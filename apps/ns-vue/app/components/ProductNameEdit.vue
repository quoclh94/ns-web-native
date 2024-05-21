<template>
	<Page actionBarHidden="true">
		<GridLayout rows="auto, *">
			<FlexboxLayout justifyContent="space-between" padding="10" row="0" backgroundColor="#E60012" >
				<StackLayout orientation="horizontal" horizontalAlignment="left" @tap="goHome">
					<Image src="~/assets/images/icn_select5.png" width="18" height="18" />
					<Label text="搬送指示" class="font-weight-bold" style="color: #ffffff; margin-left: 5px;" fontSize="15" />
				</StackLayout>
				<Label text="機器商品エリア/部品管理出庫口" class="font-weight-bold text-right m-r-10" style="color: #ffffff;"
					fontSize="15" />
			</FlexboxLayout>

			<AbsoluteLayout row="1">
				<ScrollView width="100%" height="100%">
					<StackLayout>
						<Label :text="'名称編集 ' + name" color="#E60012" class="font-weight-bold m-t-10 p-l-20" fontSize="15"
							horizontalAlignment="center" />
						<StackLayout class="m-t-10 m-b-10 p-l-15" orientation="horizontal" horizontalAlignment="left" @tap="goBack">
							<Image src="~/assets/images/icn_select4.png" width="18" height="18" />
							<Label text="管理メニュー" color="#E60012" class="m-l-5 m-b-2" fontSize="15" />
						</StackLayout>
						<Label text="搬送物" color="#E60012" class="font-weight-bold p-l-20" fontSize="15" />

						<StackLayout style="border-width: 1;" borderRadius="10" margin="10 20">
							<FlexboxLayout v-for="(product, index) in productList" :key="index" justifyContent="space-between"
								class="m-0 p-0 font-weight-bold" width="100%"
								:borderBottomWidth="index == (productList.length - 1) ? 0 : 1">
								<TextField :text="product.value" class="padding-name m-0" width="70%"
									style="border-bottom-width: 1; border-bottom-color: transparent;" @blur="onBlur(index)" ref="textFields"
									:editable="selectedItemIndex == index ? true : false" @textChange="handleTextChange($event.value)" />
								<Label :text="product.is_cycle_transport ? '（巡回）' : ''" color="#ABABAB" fontSize="12" width="15%" />
								<StackLayout verticalAlignment="center" width="15%" @tap="clickEdit(index)">
									<Image src="~/assets/images/icn_edit.png" width="18" height="18" />
								</StackLayout>
							</FlexboxLayout>
						</StackLayout>

					</StackLayout>
				</ScrollView>
			</AbsoluteLayout>
		</GridLayout>

	</Page>
</template>

<script>
import { device, screen, isAndroid, isIOS } from "tns-core-modules/platform";
import { Utils } from 'tns-core-modules';
import Home from './Home.vue';
import api from '../api/index'

export default {
	props: ['name'],
	mounted() {
		this.getDataDisplay();
	},
	data() {
		return {
			productList: [
				{ value: '機器商品エリア', is_cycle_transport: false },
				{ value: 'IT受入検収エリア', is_cycle_transport: false },
				{ value: 'IT組立エリア', is_cycle_transport: false },
				{ value: '自立組立エリア', is_cycle_transport: false },
				{ value: '塗装着脱荷エリア', is_cycle_transport: true },
				{ value: '自立樂リア', is_cycle_transport: false },
				{ value: '機器商品エリア', is_cycle_transport: false },
				{ value: 'IT受入検収エリア', is_cycle_transport: false },
				{ value: 'IT組立エリア', is_cycle_transport: false },
				{ value: '自立組立エリア', is_cycle_transport: true },
				{ value: '塗装着脱荷エリア', is_cycle_transport: false },
				{ value: '自立樂リア', is_cycle_transport: false },
				{ value: '機器商品エリア', is_cycle_transport: false },
				{ value: 'IT受入検収エリア', is_cycle_transport: false },
				{ value: 'IT組立エリア', is_cycle_transport: false },
				{ value: '自立組立エリア', is_cycle_transport: true },
				{ value: '塗装着脱荷エリア', is_cycle_transport: false },
				{ value: '自立樂リア', is_cycle_transport: false }
			],
			selectedItemIndex: null,
			modeEdit: false
		}
	},
	computed: {},
	methods: {
		async getDataDisplay() {
			const dataDisplay = await api.methods.getData('cargo_types')
			console.log(dataDisplay)
		},
		async goHome() {
			const position_id = 1; // position_id được lấy từ local storage
			const data = await api.methods.getData(`positions/${position_id}`)
			console.log(data)
			this.$navigateTo(Home, {});
		},
		async goBack() {
			const position_id = 1; // position_id được lấy từ local storage
			const data = await api.methods.getData(`positions/${position_id}`)
			console.log(data)
			this.$navigateBack();
		},
		clickEdit(index) {
			const textField = this.$refs.textFields[index].nativeView;
			textField.focus();
			textField.setSelection(this.productList[index].value.length);
			this.selectedItemIndex = index;
			this.modeEdit = true;
		},
		onBlur(index) {
			if (this.modeEdit) {
				this.selectedItemIndex = null;
				this.updateName();
				this.modeEdit = false;
			}
		},
		async updateName() {
			const data = {
				name: '自立樂リア'
			};
			const result = await api.methods.putData(`cargo_types${this.selectedItemIndex}`, data);
			console.log(result)
		},
		handleTextChange(name) {

		}
	}
};
</script>
<style scoped lang="scss">
.padding-name {
	padding: 12 15;
}
</style>