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
				<ScrollView width="100%" height="100%" @scroll="onScroll">
					<StackLayout>
						<Label text="名称編集 エリア / 設置場所 / 搬送元・先" color="#E60012" class="font-weight-bold m-t-10 p-l-20" fontSize="15"
							horizontalAlignment="center" />
						<StackLayout class="m-t-10 m-b-10 p-l-15" orientation="horizontal" horizontalAlignment="left" @tap="goBack">
							<Image src="~/assets/images/icn_select4.png" width="18" height="18" />
							<Label text="エリア選択" color="#E60012" class="m-l-5 m-b-2" fontSize="15" />
						</StackLayout>
						<Label text="エリア" color="#E60012" class="font-weight-bold p-l-20" fontSize="15" />
						<GridLayout columns="*, auto" class="m-x-20">
							<StackLayout style="border-width: 1;" borderRadius="10" class="m-t-10 m-b-10">
								<StackLayout v-for="(area, index) in areaList" :key="index" orientation="horizontal" col="1"
									class="m-0 p-0 font-weight-bold" width="100%" :borderBottomWidth="index == (areaList.length - 1) ? 0 : 1">
									<TextField :text="area.value" class="padding-name m-0" width="85%"
										style="border-bottom-width: 1; border-bottom-color: transparent;"
										@blur="handleBlur(area.value, index, 'area')" ref="txtArea"
										:editable="selectedItemIndex == index ? true : false"
										@textChange="handleTextChange($event.value, 'area')" />
									<StackLayout verticalAlignment="center" width="15%" @tap="handleClickEdit(index, 'area')">
										<Image src="~/assets/images/icn_edit.png" width="20" height="20" />
									</StackLayout>
								</StackLayout>
							</StackLayout>
						</GridLayout>

						<Label text="設置場所" color="#E60012" class="font-weight-bold p-l-20" fontSize="15" />

						<GridLayout columns="*, auto" class="m-x-20">
							<StackLayout style="border-width: 1;" borderRadius="10" class="m-t-10 m-b-10">
								<StackLayout v-for="(location, index) in locationInstallList" :key="index" orientation="horizontal" col="1"
									class="m-0 p-0 font-weight-bold" width="100%"
									:borderBottomWidth="index == (locationInstallList.length - 1) ? 0 : 1">
									<TextField :text="location.value" class="padding-name m-0" width="85%"
										style="border-bottom-width: 1; border-bottom-color: transparent;"
										@blur="handleBlur(location.value, index, 'location')" ref="txtLocation"
										:editable="selectedItemIndex == index ? true : false"
										@textChange="handleTextChange($event.value, 'location')" />
									<StackLayout verticalAlignment="center" width="15%" @tap="handleClickEdit(index, 'location')">
										<Image src="~/assets/images/icn_edit.png" width="20" height="20" />
									</StackLayout>
								</StackLayout>
							</StackLayout>
						</GridLayout>

						<Label text="搬送元 / 搬送先" color="#E60012" class="font-weight-bold p-l-20" fontSize="15" />

						<StackLayout style="border-width: 1;" borderRadius="10" margin="10 20" >
							<FlexboxLayout v-for="(destination, index) in destinationList" :key="index" justifyContent="space-between"
								class="m-0 p-0 font-weight-bold" width="100%"
								:borderBottomWidth="index == (destinationList.length - 1) ? 0 : 1">
								<TextField :text="destination.value" class="padding-name m-0" width="85%"
									style="border-bottom-width: 1; border-bottom-color: transparent;"
									@blur="handleBlur(destination.value, index, 'destination')" ref="txtDestination"
									:editable="selectedItemIndex == index ? true : false"
									@textChange="handleTextChange($event.value, 'destination')" />
								<StackLayout verticalAlignment="center" width="15%" @tap="handleClickEdit(index, 'destination')">
									<Image src="~/assets/images/icn_edit.png" width="20" height="20" />
								</StackLayout>
							</FlexboxLayout>
						</StackLayout>

					</StackLayout>
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
import Home from './Home.vue';
import api from '../api/index'
import { screen } from "tns-core-modules/platform";

export default {
	props: ['name'],
	mounted() {
		this.updateScreenSize();
		this.getDataDisplay();
	},
	data() {
		return {
			areaList: [
				{ value: '機器商品エリア' }
			],
			locationInstallList: [
				{ value: '部品管理出庫口' },
				{ value: '特注出庫口' },
				{ value: '特注・箱入れ入庫口' },
				{ value: '箱入れ出庫口' },
				{ value: '2L・51 - 0N' },
				{ value: '33号・0N' },
				{ value: '47・50号' },
				{ value: '機器組立' },
				{ value: '2E・2F' },
				{ value: 'サブ - マルチ・DP' },
				{ value: '電子' },
				{ value: '物流①' },
				{ value: '物流②' }
			],
			destinationList: [
				{ value: '部品管理かご台車置き場' },
				{ value: '部品管理出庫口(かご台車)' },
				{ value: '部品管理出庫口(パレット)' },
				{ value: '部品管理入庫口(かご台車)' },
				{ value: '特注出庫口(かご台車)' },
				{ value: '特注出庫口(パレット)' },
				{ value: '特注・箱入れ入庫口(かご台車)' },
				{ value: '特注・箱入れ入庫口(パレット)' },
				{ value: '箱入れ出庫口(かご台車)' },
				{ value: '箱入れ出庫口(パレット)' },
				{ value: '2L・51部品 (かご台車)' },
				{ value: '2L・51完成品(パレット)' },
				{ value: '0N完成品(パレット)' },
				{ value: '33号・0N部品(かご台車)' },
				{ value: '47号・50号完成品(パレット)' },
				{ value: '機器組立(かご台車)' },
				{ value: '機器組立(パレット)' },
				{ value: '2E・2F部品(かご台車)' },
				{ value: '2E・2F完成品(パレット)' },
				{ value: 'サブ部品(かご台車)' },
				{ value: 'マルチ・DP完成品(パレット)' },
				{ value: '電子部品(かご台車)' },
				{ value: '電子完成品(パレット)' },
				{ value: '物流①' },
				{ value: '物流②' },
				{ value: '物流③' }
			],
			selectedItemIndex: null,
			isEditMode: false,
			showScrollTopButton: false,
			screenWidth: 0,
			screenHeight: 0,
		}
	},
	computed: {},
	methods: {
		async getDataDisplay() {
			const area_id = 1; // area_id được lấy từ local storage
			const dataAreas = await api.methods.getData(`areas/${area_id}`)
			const dataPositions = await api.methods.getData(`positions/${area_id}`)
			const dataNodes = await api.methods.getData(`nodes/${area_id}`)
			console.log(dataAreas, dataPositions, dataNodes)
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
		scrollToTop() {
			this.$refs.scrollview.nativeView.scrollToVerticalOffset(100, true);
		},
		onScroll(args) {
			const scrollView = args.object;
			const scrollOffset = scrollView.verticalOffset;
			this.showScrollTopButton = scrollOffset > 0;
		},
		updateScreenSize() {
			this.screenWidth = screen.mainScreen.widthDIPs;
			this.screenHeight = screen.mainScreen.heightDIPs;
		},
		handleClickEdit(index, mode) {
			switch (mode) {
				case 'area':
					const textFieldArea = this.$refs.txtArea[index].nativeView;
					textFieldArea.focus();
					textFieldArea.setSelection(this.areaList[index].value.length);
					this.selectedItemIndex = index;
					break;
				case 'location':
					const textFieldLocation = this.$refs.txtLocation[index].nativeView;
					textFieldLocation.focus();
					textFieldLocation.setSelection(this.locationInstallList[index].value.length);
					this.selectedItemIndex = index;
					break;
				default:
					const textFieldDestination = this.$refs.txtDestination[index].nativeView;
					textFieldDestination.focus();
					textFieldDestination.setSelection(this.destinationList[index].value.length);
					this.selectedItemIndex = index;
					break;
			}
			this.isEditMode = true;
		},
		async handleBlur(id, index, mode) {
			if (this.isEditMode) {
				this.updateName(id, mode);
			}
			this.isEditMode = false;
			this.selectedItemIndex = null;
		},
		handleTextChange(name, mode) {
			switch (mode) {
				case 'area':
					break;
				case 'location':
					break;
				default:
					break;
			}
		},
		async updateName(id, mode) {
			let result;
			let data;
			switch (mode) {
				case 'area':
					data = {
						name: '自立樂リア'
					};
					result = await api.methods.putData(`areas/${id}`, data);
					break;
				case 'location':
					data = {
						name: '自立樂リア'
					};
					result = await api.methods.putData(`nodes/${id}`, data);
					break;
				default:
					data = {
						name: '自立樂リア'
					};
					result = await api.methods.putData(`cargo_types/${id}`, data);
					break;
			}
			console.log(result)
		}
	}
};
</script>
<style scoped lang="scss">
.padding-name {
	padding: 12 15;
}

.fixed-button {
	width: 150px;
	height: 150px;
	border-radius: 50%;
	background: #FFFFFF;
	font-size: 20px;
	text-align: center;
	background-color: #E60012;
	box-shadow: 0px 3px 6px #00000029;
}
</style>