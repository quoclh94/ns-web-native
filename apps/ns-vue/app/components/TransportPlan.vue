<template>
	<Page actionBarHidden="true">
		<GridLayout rows="auto, *">
			<FlexboxLayout justifyContent="space-between" padding="10" row="0" backgroundColor="#E60012" >
				<StackLayout orientation="horizontal" horizontalAlignment="left" @tap="goBack">
					<Image src="~/assets/images/icn_select5.png" width="18" height="18" />
					<Label text="搬送指示" class="font-weight-bold" style="color: #ffffff; margin-left: 5px;" fontSize="15" />
				</StackLayout>
				<Label text="機器商品エリア/部品管理出庫口" class="font-weight-bold text-right m-r-10" style="color: #ffffff;"
					fontSize="15" />
			</FlexboxLayout>

			<AbsoluteLayout row="1">
				<ScrollView width="100%" height="100%" ref="scrollview" @scroll="onScroll">
					<FlexboxLayout flexDirection="column" class="p-y-5">
						<FlexboxLayout justifyContent="space-between" class="m-y-10 action-top">
							<FlexboxLayout class="m-x-20">
								<Image src="~/assets/images/icn_list2.png" width="15" height="15" />
								<Label :text="isPlan ? '搬送予定' : '完了した搬送'" color="#E60012" class="m-l-5 font-weight-bold" />
							</FlexboxLayout>
							<FlexboxLayout class="m-x-20">
								<FlexboxLayout justifyContent="space-between" borderRadius="23" class="reload-button p-x-15" @tap="reload">
									<Image src="~/assets/images/icn_switch.png" width="15" height="15" />
									<Label :text="isPlan ? '完了した搬送': '搬送予定'" color="#FFFFFF" class="m-l-5 font-weight-bold" />
								</FlexboxLayout>
							</FlexboxLayout>
						</FlexboxLayout>

						<FlexboxLayout v-for="(item, index) in userFieldsHistory" v-show="!isPlan" :key="'' + index" class="p-20 m-b-10 m-x-20"
							backgroundColor="#F2F2F2">
							<StackLayout>
								<Label text="搬送完了(09:00:00)" class="font-weight-bold" />
								<StackLayout orientation="horizontal">
									<StackLayout class="label-container font-weight-bold">
										<Label text="登録" />
										<Label text="搬送物" />
										<Label text="搬送元" />
										<Label text="搬送先" />
									</StackLayout>

									<StackLayout class="label-content">
										<Label :text="item.name1" />
										<Label :text="item.name2" />
										<Label :text="item.name3" />
										<Label :text="item.name4" />
									</StackLayout>
								</StackLayout>
							</StackLayout>
						</FlexboxLayout>

						<GridLayout columns="60, *" class="p-20 m-b-10 m-x-20" v-for="(item, index) in userFieldsPlan" v-show="isPlan" :key="'userFields'+index"
							:class="{ 'item-background': index == 0 || index == 1, 'item-border-red': index == 2, 'item-border': index >= 3 }">
							<StackLayout class="font-weight-bold label-content" col="0" width="100%" horizontalAlignment="left">
								<Label text="登録" />
								<Label text="搬送物" />
								<Label text="搬送元" />
								<Label text="搬送先" />
								<Label text="状態" />
							</StackLayout>

							<StackLayout class="font-weight-bold label-content" col="1" width="100%" horizontalAlignment="left">
								<Label :text="item.name1" />
								<Label :text="item.name2" />
								<Label :text="item.name3" />
								<Label :text="item.name4" />
								<FlexboxLayout>
									<Label :text="item.name5" style="color:#006CD8" fontWeight="bold" />
									<Image v-if="index == 1 && showButtonContinue" class="m-l-2" src="~/assets/images/icn_alert2.png"
										width="12" height="12" />
								</FlexboxLayout>
								<Button height="35" v-if="index == 1 && !showButtonContinue" borderRadius="35" class="stop-button" text="一時停止"
									horizontalAlignment="right" @tap="btnStop" />
								<Button height="35" v-if="index == 1 && showButtonContinue" borderRadius="35" class="continue-button" text="再開"
									horizontalAlignment="right" @tap="btnContinue" />
								<Button height="35" v-if="index == 2" borderRadius="35" class="del-button" text="削除" horizontalAlignment="right"
									@tap="btnDel" />
							</StackLayout>
						</GridLayout>
					</FlexboxLayout>
				</ScrollView>
				<Button bottom right class="fixed-button" :top="screenHeight <= 400 ? (screenHeight - 150) : (screenHeight - 200)"
					:left="screenWidth - screenWidth * 20 / 100" @tap="scrollToTop"
					v-show="showScrollTopButton">
					<FormattedString>
						<Span text.decode="&#xf062;" class="fas" style="color: #E60012" />
					</FormattedString>
				</Button>
		</AbsoluteLayout>
		</GridLayout>
		
	</Page>
</template>
<script>
import { device, screen, isAndroid, isIOS } from "tns-core-modules/platform";
import { Application } from '@nativescript/core';
import TransportHistory from './TransportHistory.vue';
import CustomDialog from "./CustomDialog.vue";
import api from '../api/index'
import Home from "./Home.vue";

export default {
	props: ['item'],
	mounted() {
		// Lắng nghe sự kiện resize của Application
		Application.on(Application.orientationChangedEvent, this.onResize);

		// Lấy kích thước ban đầu của TextField
		this.updateScreenSize();
		this.getDataDisplay();
	},
	beforeDestroy() {
		// Hủy lắng nghe sự kiện resize của Application
		Application.off(Application.orientationChangedEvent, this.onResize);
	},
	data() {
		return {
			userFieldsPlan: [
				{
					name1: "08:35:00",
					name2: "完成品パレット(1100)",
					name3: "特注出庫口(パレット)",
					name4: "物流①",
					name5: "搬送中"
				},
				{
					name1: "08:35:00",
					name2: "完成品パレット(1100)",
					name3: "特注出庫口(パレット)",
					name4: "物流①",
					name5: "搬送中"
				},
				{
					name1: "08:35:00",
					name2: "完成品パレット(1100)",
					name3: "特注出庫口(パレット)",
					name4: "物流①",
					name5: "搬送中"
				},
				{
					name1: "08:35:00",
					name2: "完成品パレット(1100)",
					name3: "特注出庫口(パレット)",
					name4: "物流①",
					name5: "搬送中"
				},
				{
					name1: "08:35:00",
					name2: "完成品パレット(1100)",
					name3: "特注出庫口(パレット)",
					name4: "物流①",
					name5: "搬送中"
				}
			],
			userFieldsHistory: [
				{
					name1: "08:45:00",
					name2: "空台車",
					name3: "特注出庫口",
					name4: "部品管理かご台車置き場"
				},
				{
					name1: "08:45:00",
					name2: "空台車",
					name3: "特注出庫口",
					name4: "部品管理かご台車置き場"
				},
				{
					name1: "08:45:00",
					name2: "空台車",
					name3: "特注出庫口",
					name4: "部品管理かご台車置き場"
				},
				{
					name1: "08:45:00",
					name2: "空台車",
					name3: "特注出庫口",
					name4: "部品管理かご台車置き場"
				},
				{
					name1: "08:45:00",
					name2: "空台車",
					name3: "特注出庫口",
					name4: "部品管理かご台車置き場"
				},
				{
					name1: "08:45:00",
					name2: "空台車",
					name3: "特注出庫口",
					name4: "部品管理かご台車置き場"
				}
			],
			screenWidth: 0,
			screenHeight: 0,
			showScrollTopButton: false,
			showButtonContinue: false,
			isPlan: true
		}
	},
	computed: {},
	methods: {
		async getDataDisplay() {
			const area_id = 1; // position_id được lấy từ local storage
			const dataDisplay = await api.methods.getData(`transports/${area_id}`)
			console.log(dataDisplay)
		},
		async goBack() {
			const position_id = 1; // position_id được lấy từ local storage
			const data = await api.methods.getData(`positions/${position_id}`)
			console.log(data)
			this.$navigateTo(Home, {});
		},
		onScroll() { },
		scrollToTop() {
			this.$refs.scrollview.nativeView.scrollToVerticalOffset(0, true);
		},
		onScroll(args) {
			const scrollView = args.object;
			const scrollOffset = scrollView.verticalOffset;
			this.showScrollTopButton = scrollOffset > 0;
		},
		async reload() {
			//TODO
			this.isPlan = !this.isPlan
		},
		btnStop() {
			//TODO
			this.$showModal(CustomDialog, {
				props: {
					title: '搬送を一時停止しますか',
					mode: 'btnStop',
					dialogHeight: 150
				},
				animated: true, // Set to true to enable animation
				fullscreen: false,
			}).then((result) => {
				if (result) {
					this.showButtonContinue = true;
				} else {
					//TODO
				}
			}).catch((error) => {
				console.error('Error opening modal:', error);
			});
		},
		btnDel() {
			//TODO
			this.$showModal(CustomDialog, {
				props: {
					title: '搬送予定を削除しますか',
					mode: 'btnDel',
					dialogHeight: 150
				},
				animated: true, // Set to true to enable animation
				fullscreen: false,
			}).then((result) => {
				console.log('Modal closed with result btnDel:', result);

			}).catch((error) => {
				console.error('Error opening modal:', error);
			});
		},
		btnContinue() {
			//TODO
			this.$showModal(CustomDialog, {
				props: {
					title: '搬送を再開させますか',
					mode: 'btnContinue',
					dialogHeight: 150
				},
				animated: true, // Set to true to enable animation
				fullscreen: false,
			}).then((result) => {
				if (result) {
					this.showButtonContinue = false;
					console.log('showButtonContinue', this.showButtonContinue);
				} else {
					//TODO
				}
			}).catch((error) => {
				console.error('Error opening modal:', error);
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
.fixed-button {
	width: 50;
	height: 50;
	border-radius: 50%;
	background: #FFFFFF;
	font-size: 20px;
	text-align: center;
	background-color: #E60012;
	box-shadow: 0px 3px 6px #00000029;
}

.item-border-red {
	border-width: 4;
	border-color: #E60012;
	background-color: #FFFFFF;
}

.label-container {
	width: 180px;

	Label {
		font-size: 12;
		height: 22;
	}
}

.item-border {
	border-width: 1;
	border-color: #707070;
	background-color: #FFFFFF;
}

.item-background {
	background-color: #E6F3FF;
}

.label-content Label {
	font-size: 12;
	height: 22;
}

.stop-button {
	width: 100;
	// height: 120px;
	background: #006CD8;
	color: #FFFFFF;
	font-weight: bold;
	margin: 20px 0px 0px;
}

.del-button {
	width: 100;
	// height: 120px;
	background: #E60012;
	color: #FFFFFF;
	font-weight: bold;
	margin: 20px 0px 0px;
}

.continue-button {
	width: 100;
	// height: 120px;
	background: #E6F3FF;
	color: #006CD8;
	font-weight: bold;
	margin: 20px 0px 0px;
	border-color: #006CD8;
	border-width: 4;
}

.action-top {
	// height: 120px;
	font-size: 15px;

	.reload-button {
		background: #000000;
		color: #FFFFFF;
		font-weight: bold;
		width: 150;
		height: 30;
		margin-right: 0px;
	}
}
</style>
