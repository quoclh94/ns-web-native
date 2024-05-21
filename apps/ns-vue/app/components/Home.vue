<template>
	<Page actionBarHidden="true">
		<GridLayout rows="auto, *">
			<FlexboxLayout justifyContent="space-between" padding="10" row="0" backgroundColor="#E60012" >
				<StackLayout opacity="0" orientation="horizontal" horizontalAlignment="left">
					<Image src="~/assets/images/icn_select5.png" width="18" height="18" />
					<Label text="搬送指示" class="font-weight-bold" style="color: #ffffff; margin-left: 5px;" fontSize="15" />
				</StackLayout>
				<Label text="機器商品エリア/部品管理出庫口" class="font-weight-bold text-right m-r-10" style="color: #ffffff;"
					fontSize="15" />
			</FlexboxLayout>

			<GridLayout rows="*, auto" row="1">
				<AbsoluteLayout row="0">
					<ScrollView width="100%" height="100%">
						<FlexboxLayout flexDirection="column">
							<StackLayout height="90">
								<StackLayout height="20" ref="img1" id="lbl-conveyed" orientation="horizontal" class="font-weight-bold m-b-5 m-t-10 m-x-20">
									<Image src="~/assets/images/icn_inbox.png" width="15" height="15" />
									<Label text="搬送物" color="#E60012" class="m-l-5" />
								</StackLayout>
								<FlexboxLayout ref="cbb-conveyed" :opacity="isShowProduct ? 1 : 0" justifyContent="space-between"
									class="selected-content m-b-15 m-x-20" @tap="onSelectProduct">
									<Label class="font-weight-bold" :text="is_cycle_transport == true ? conveyed + ' (巡回)' : conveyed" />
									<Image src="~/assets/images/icn_down_arrow.png" width="24" height="24" />
								</FlexboxLayout>
							</StackLayout>
							<StackLayout backgroundColor="#FFEBEC" class="p-b-20 p-t-20">
								<StackLayout height="120">
									<StackLayout orientation="horizontal" class="font-weight-bold m-b-5 icon">
										<Image src="~/assets/images/icn_amr.png" width="20" height="20" />
										<Label text="搬送元" color="#E60012" class="m-l-5 m-b-2" />
									</StackLayout>
									<TextField :backgroundColor="isConveyed ? '#FFFFFF' : '#E8E0E1'"
										editable="false" class="-rounded-sm font-weight-bold m-0 border-color m-x-20"
										v-model="transportSource" />
									<Image src="~/assets/images/icn_arrow.png" width="30" height="50" />
								</StackLayout>
								<StackLayout height="20" orientation="horizontal" class="font-weight-bold m-b-5 icon">
									<Image src="~/assets/images/icn_amr.png" width="20" height="20" />
									<Label text="搬送先" color="#E60012" class="m-l-5 m-b-2" />
								</StackLayout>
								<FlexboxLayout v-show="!is_cycle_transport" :opacity="isShowDestination ? 1 : 0"
									:backgroundColor="isConveyed ? '#FFFFFF' : '#E8E0E1'" justifyContent="space-between"
									class="selected-content m-b-30 m-x-20" borderColor="#707070" @tap="onSelectDestination">
									<Label class="font-weight-bold" :text="selectedDestination" />
									<Image v-show="isConveyed" src="~/assets/images/icn_down_arrow.png" width="24" height="24" />
								</FlexboxLayout>

								<StackLayout v-show="is_cycle_transport && isAndroidDevice" class="checkbox-content-Android m-b-30 m-x-20">
									<StackLayout orientation="horizontal" v-for="(item, index) in checkboxes" :key="index">
										<CheckBox class="custom-checkbox-Android" :checked="item.isChecked"
											@checkedChange="onCheckedChange(index, $event.value)"
											:fillColor="item.isChecked ? '#E60012' : '#707070'" />
										<Label class="checkbox-label-Android" :text="item.label" @tap="onLabelTap(index)"
											:color="item.isChecked ? '#E60012' : '#000000'" />
									</StackLayout>
								</StackLayout>

								<StackLayout v-show="is_cycle_transport && isIOSDevice" class="checkbox-content m-b-30 m-x-20">
									<FlexboxLayout v-for="(item, index) in checkboxes" :key="index">
										<CheckBox class="custom-checkbox" :checked="item.isChecked"
											@checkedChange="onCheckedChange(index, $event.value)"
											:fillColor="item.isChecked ? '#E60012' : '#707070'" />
										<Label class="checkbox-label" :text="item.label" @tap="onLabelTap(index)"
											:color="item.isChecked ? '#E60012' : '#000000'" />
									</FlexboxLayout>
								</StackLayout>
							</StackLayout>

							<StackLayout class="layout-register p-x-20" width="100%"
								v-if=isShowDestination>
								<Button text="搬送を登録する" fontWeight="bold" style="color: #FFFFFF" height="45" :isEnabled="isButtonEnabled" borderRadius="41" class="m-b-30 custom-button" @tap="register" />
							</StackLayout>

							<StackLayout orientation="horizontal" class="button-content p-x-20 p-y-10" horizontalAlignment="center"
								@tap="checkTransportation">
								<Image src="~/assets/images/icn_list.png" width="20" height="20" />
								<Label text="搬送予定を確認する" class="m-l-5" />
							</StackLayout>

							<FlexboxLayout justifyContent="center" class="m-t-20 m-b-30" @tap="openModalInputPassword">
								<Image src="~/assets/images/icn_settings.png" width="20" height="20" />
								<Label text="管理" color="#E60012" class="m-l-5" />
							</FlexboxLayout>
						</FlexboxLayout>
					</ScrollView>

					<StackLayout width="100%" top="35">
						<StackLayout class="auto-size-listview m-x-20 p-x-12 p-t-8 p-b-8" v-show="!isShowProduct">
							<FlexboxLayout class="p-b-10" @tap="onItemProductTap(0)" justifyContent="space-between" alignItem="center">
								<Label :text="productItems[0].is_cycle_transport == true ? productItems[0].value + ' (巡回)' : productItems[0].value" class="list-item" />
								<Image src="~/assets/images/icn_up_arrow.png" width="24" height="24" />
							</FlexboxLayout>
							<StackLayout v-show="index != 0" v-for="(item, index) in productItems" :key="index" class="p-b-10" @tap="onItemProductTap(index)">
								<Label :text="item.is_cycle_transport == true ? item.value + ' (巡回)' : item.value" class="list-item" />
							</StackLayout>
						</StackLayout>
					</StackLayout>

					<StackLayout width="100%" :top="(screenHeight > 360 ? 250 + 5 : 140)">
						<StackLayout class="auto-size-listview m-x-20 p-x-12 p-t-8 p-b-8" v-show="!isShowDestination">
							<FlexboxLayout class="p-b-10" @tap="onItemDestinationTap(0)" justifyContent="space-between" alignItem="center">
								<Label :text="destinationList[0].value" class="list-item" />
								<Image src="~/assets/images/icn_up_arrow.png" width="24" height="24" />
							</FlexboxLayout>
							<StackLayout v-show="index != 0" v-for="(item, index) in destinationList" :key="index" class="p-b-10" @tap="onItemDestinationTap(index)">
								<Label :text="item.value" class="list-item" />
							</StackLayout>
						</StackLayout>
					</StackLayout>
				</AbsoluteLayout>
				<FlexboxLayout row="1" justifyContent="center" backgroundColor="#ffffff">
					<Label class="bottom-button" text="登録失敗" @tap="btnError" />
					<Label class="bottom-button" text="戻し搬送" @tap="btnRoundTrip" />
					<Label class="bottom-button" text="次の搬送" @tap="btnAuto" />
				</FlexboxLayout>
			</GridLayout>
		</GridLayout>
	</Page>
</template>

<script>
import { device, screen, isAndroid, isIOS } from "tns-core-modules/platform";
import { Application } from "@nativescript/core";
import CustomDialog from "./CustomDialog.vue";
import TransportPlan from './TransportPlan.vue';
import MenuManagement from './MenuManagement.vue';
import api from '../api/index'

export default {
	components: {
		CustomDialog,
	},
	data() {
		return {
			isListProductOpen: false,
			isListDestinationOpen: false,
			productItems: [
				{
					value: '選択してください',
					is_cycle_transport: false
				},
				{
					value: '部品台車',
					is_cycle_transport: false
				},
				{
					value: '空台車',
					is_cycle_transport: false
				},
				{
					value: '空パレット(1100)',
					is_cycle_transport: false
				},
				{
					value: '部品パレット',
					is_cycle_transport: true
				}
			],
			destinationList: [
				{ value: '選択してください' },
				{ value: '特注出庫口(かご台車)' },
				{ value: '特注・箱入れ入庫口(かご台車)' },
				{ value: '箱入れ出庫口(かご台車)' },
				{ value: '2L・51部品(かご台車)' },
				{ value: '33号・0N部品(かご台車)' },
				{ value: '機器組立(かご台車)' },
				{ value: '2E・2F部品(かご台車)' },
				{ value: 'サブ部品(かご台車)' },
				{ value: '電子部品(かご台車)' }
			],
			listViewHeightProduct: 1,
			listViewHeightDestination: 1,
			conveyed: '',
			transportSource: '',
			isConveyed: false,
			selectedDestination: '',
			checkboxes: [
				{ label: "板金①", isChecked: false },
				{ label: "板金②", isChecked: false },
				{ label: "板金③", isChecked: false },
				{ label: "板金④", isChecked: false }
			],
			isShowProduct: true,
			isShowDestination: true,
			screenWidth: 0,
			screenHeight: 0,
			is_cycle_transport: false,
			isCheckedCheckBox: false,
			isAndroidDevice: isAndroid,
			isIOSDevice: isIOS,
		}
	},
	computed: {
		isButtonEnabled() {
			this.isCheckedCheckBox = false;
			for (let i = 0; i < this.checkboxes.length; i++) {
				if (this.checkboxes[i].isChecked) {
					this.isCheckedCheckBox = true;
					break;
				}
			}
			return this.conveyedItem != '' && (this.selectedDestination != '' || this.isCheckedCheckBox);
		}
	},
	mounted() {
		this.getDataDisplay();
		this.calculateListViewHeight();
		// Lắng nghe sự kiện orientationChanged của Application
		Application.on(Application.orientationChangedEvent, this.onResize);

		// Lấy kích thước ban đầu của TextField
		this.updateScreenSize();
		this.conveyed = this.productItems[0].value;
	},
	methods: {
		async getDataDisplay() {
			const position_id = 1; // position_id được lấy từ local storage
			const dataRoutes = await api.methods.getData(`routes/${position_id}`)
			const dataCan_transport_times = await api.methods.getData(`can_transport_times/${position_id}`)
			console.log(dataRoutes)
			console.log(dataCan_transport_times)
		},
		onLabelTap(index) {
			const isChecked = this.checkboxes[index].isChecked;
			if (isChecked) {
				this.checkboxes[index].isChecked = false;
			} else {
				this.checkboxes[index].isChecked = true;
			}
		},
		onCheckedChange(index, isChecked) {
			if (isChecked) {
				this.checkboxes[index].isChecked = true;
			} else {
				this.checkboxes[index].isChecked = false;
			}
		},
		onSelectProduct() {
			this.isListProductOpen = true;
			this.isShowProduct = false;
		},
		onSelectDestination() {
			if (this.isConveyed) {
				this.isListDestinationOpen = true;
				this.isShowDestination = false;
			}
		},
		calculateListViewHeight() {
			const listItemHeight = 30; // Chiều cao mỗi mục
			const itemCountProduct = this.productItems.length;
			const itemCountDestination = this.destinationList.length;
			this.listViewHeightProduct = listItemHeight * itemCountProduct;
			this.listViewHeightDestination = listItemHeight * itemCountDestination;
		},
		onItemLoading(args) {
			const listView = args.object;
			if (listView.ios) {
				const cell = args.ios;
				cell.separatorInset = UIEdgeInsetsZero;
			} else if (listView.android) {
				const cell = args.android;
				cell.setDividerHeight(0);
			}

			if (args.index === 0) {
				const firstItemView = args.view; // Lấy phần tử đầu tiên trong ListView
				firstItemView.className = 'first-item'; // Áp dụng lớp CSS tùy chỉnh cho phần tử đầu tiên
			}
		},
		onItemProductTap(index) {
			const selectedIndex = index;
			this.conveyed = this.productItems[selectedIndex].value;
			this.isConveyed = true
			this.isListProductOpen = false;
			this.isShowProduct = true;
			this.transportSource = '選択してください';
			if (this.productItems[selectedIndex].is_cycle_transport) this.is_cycle_transport = true;
			else {
				this.is_cycle_transport = false;
				this.selectedDestination = this.destinationList[0].value;
			}
		},
		onItemDestinationTap(index) {
			const selectedIndex = index;
			this.selectedDestination = this.destinationList[selectedIndex].value;
			this.isListDestinationOpen = false;
			this.isShowDestination = true;
		},
		async checkTransportation() {
			const position_id = 1; // position_id được lấy từ local storage
			const data = await api.methods.getData(`positions/${position_id}`)
			console.log(data)
		},
		async register() {
			// this.$localStorage.setItem('test', 'test localStorage');
			this.$showModal(CustomDialog, {
				props: {
					title: '搬送指示を登録しています',
					mode: 'RegisteringTransport',
					dialogHeight: this.screenHeight < 750 ? this.screenHeight * 1 / 3 : this.screenHeight * 1 / 4
				},
				animated: true, // Set to true to enable animation
				fullscreen: false,
				ios: {
					presentationStyle: isIOS ? UIModalPresentationStyle.FormSheet : null
				}
			})

		},
		checkTransportation() {
			this.$navigateTo(TransportPlan, {});
			// this.$localStorage.getItem('key');
			// this.$localStorage.removeItem('test');
		},
		btnError() {
			this.$showModal(CustomDialog, {
				props: {
					title: '登録失敗',
					subTitle: '搬送元にパレットがありません',
					mode: 'btnError',
					dialogHeight: 180,
				},
				animated: true, // Set to true to enable animation
				fullscreen: false,
			}).then((result) => {
				console.log('Modal closed with result btnError:', result);

			}).catch((error) => {
				console.error('Error opening modal1:', error);
			});
		},
		btnRoundTrip() {		
			this.$showModal(CustomDialog, {
				props: {
					title: '戻し搬送を行いますか',
					mode: 'btnRoundTrip',
					dialogHeight: 220
				},
				animated: true, // Set to true to enable animation
				fullscreen: false,
			}).then((result) => {
				console.log('Modal closed with result btnRoundTrip:', result);

			}).catch((error) => {
				console.error('Error opening modal2:', error);
			});
		},
		btnAuto() {
			this.$showModal(CustomDialog, {
				props: {
					title: '次の搬送先へ移動',
					mode: 'btnAuto',
					dialogHeight: 130
				},
				animated: true, // Set to true to enable animation
				fullscreen: false,
				target: this
			}).then((result) => {
				if (result) {
					if (isIOS) {
						setTimeout(() =>{
							this.$showModal(CustomDialog, {
							props: {
								title: '次の搬送先へ移動しました',
								mode: 'btnComplete',
								dialogHeight: 130
							},
							animated: true, // Set to true to enable animation
							fullscreen: false,
						})
						}, 700);
					} else {
						this.$showModal(CustomDialog, {
							props: {
								title: '次の搬送先へ移動しました',
								mode: 'btnComplete',
								dialogHeight: 130
							},
							animated: true, // Set to true to enable animation
							fullscreen: false,
						}).then((result) => {
							console.log('Modal closed with result btnAuto:', result);

						}).catch((error) => {
							console.error('Error opening modal:', error);
						});
					}
				} else {
					//TODO
				}

			}).catch((error) => {
				console.error('Error opening modal:', error);
			});
		},
		openModalInputPassword() {
			this.$showModal(CustomDialog, {
				props: {
					title: 'パスワードを入力してください',
					mode: 'inputPassword',
					dialogHeight: 200
				},
				animated: true, // Set to true to enable animation
				fullscreen: false,
			}).then(async (result) => {
				if (result) {
					const position_id = 1; // position_id được lấy từ local storage
					const data = await api.methods.getData(`positions/${position_id}`)
					console.log(data)
					this.$navigateTo(MenuManagement, {});
				} else {
					//TODO
				}
			}).catch((error) => {
				console.error('Error opening modal2:', error);
			});
		},
		onResize() {
			// Khi thay đổi kích thước màn hình, cập nhật kích thước của TextField
			// Gọi updateScreenSize() sau 100ms để đảm bảo rằng màn hình đã xoay xong
			setTimeout(() => {
				this.updateScreenSize();
			}, 100);
		},
		updateScreenSize() {
			this.screenWidth = screen.mainScreen.widthDIPs;
			this.screenHeight = screen.mainScreen.heightDIPs;
		}
	}
};
</script>

<style scoped lang="scss">
.auto-size-listview {
	border-width: 1;
	border-radius: 5;
	background-color: #ffffff;
	font-weight: bold;
	border-color: #707070;

	.first-item {
		font-weight: bold;
		background-image: url("~/assets/images/icn_up_arrow.png");
		background-repeat: no-repeat;
		background-position: right center;
		background-size: 70px 70px;
		margin-right: 50px;
	}

	:focus {
		background-color: red;
	}

	.list-item {
		padding-top: 0;
		padding-bottom: 0;
	}
}

.selected-content {
	height: 43;
	border-width: 1;
	border-radius: 5;
	padding-right: 25px;
	padding-left: 13;
	border-color: #707070;
}

.border-color {
	border-color: #707070;
}

.checkbox-content {
	background-color: #FFFFFF;
	border-width: 1;
	border-color: #707070;
	padding: 10 10 0 10;
	border-radius: 5;

	.custom-checkbox {
		color: red !important;
		height: 38px;
		// padding: 0;
		margin: 0 0 10 0;
	}

	.custom-checkbox:checked {
		color: blue !important;
	}

	.checkbox-label {
		font-weight: bold;
		color: red;
		margin: 0 -45 20px -40;
		// margin: 0;
	}

	.checkbox-label:checked {
		color: blue;
	}
}

.checkbox-content-Android {
	background-color: #FFFFFF;
	border-width: 1;
	border-color: #707070;
	padding: 10;
	border-radius: 5;

	.custom-checkbox-Android {
		color: red !important;
	}

	.custom-checkbox-Android:checked {
		color: red !important;
	}

	.checkbox-label-Android {
		font-weight: bold;
		color: red;
	}

	.checkbox-label-Android:checked {
		color: red;
	}
}

.button-content {
	border-radius: 38;
	background-color: #000000;
	color: #FFFFFF;
	// height: 120px;
	margin: 40 32 0 32;
}

.layout-register {
	margin-top: -28;
}

.custom-button {
	background-color: #E60012;
	color: #FFFFFF;
	// height: 120px;
}

.custom-button:disabled {
	background-color: #CCCCCC;
	color: #FFFFFF;
}

.icon {
	margin-left: 18;
}

.bottom-button {
	height: 30;
	margin: 0 10px;
	padding: 0 10;
	background-color: #F2F2F2;
	color: #3A3A3A;
	font-weight: bold;
}
</style>