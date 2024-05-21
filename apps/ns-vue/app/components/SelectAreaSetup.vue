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

			<StackLayout class="p-x-20" row="1">
				<Label :text="name" color="#E60012" class="font-weight-bold m-t-10" fontSize="15"
					horizontalAlignment="center" />
				<StackLayout class="m-t-10 m-b-10" orientation="horizontal" horizontalAlignment="left" @tap="goBack">
					<Image src="~/assets/images/icn_select4.png" width="18" height="18" />
					<Label text="管理メニュー" color="#E60012" class="m-l-5 m-b-2" fontSize="15" />
				</StackLayout>

				<StackLayout width="100%" class="auto-size-listview">
					<FlexboxLayout v-for="(area, index) in AreaList" :key="index" @tap="onItemTap(index)" justifyContent="space-between" :borderBottomWidth="index == (AreaList.length - 1) ? 0 : 1"
						class="padding-content" :class="{
							'first': index == selectedItemIndex && index == 0,
							'last': index == selectedItemIndex && index == (AreaList.length - 1),
							'other': index == selectedItemIndex
						}">
						<Label :text="area.value" class="font-weight-bold"
							:color="index == selectedItemIndex ? '#E60012' : '#000000'" />
						<StackLayout orientation="horizontal">
							<Image src="~/assets/images/icn_check2.png" width="20" height="20" class="m-r-20"
								:opacity="index == selectedItemIndex ? 1 : 0" />
							<Image src="~/assets/images/icn_select3.png" class="m-r-10" width="20" height="20" />
						</StackLayout>
					</FlexboxLayout>
				</StackLayout>
			</StackLayout>
		</GridLayout>
	</Page>
</template>
<script>
import Home from './Home.vue';
import api from '../api/index'
import SelectPosition from './SelectPosition.vue';

export default {
	props: ['name'],
	data() {
		return {
			AreaList: [
				{ value: '機器商品エリア' },
				{ value: 'IT受入検収エリア' },
				{ value: 'IT組立エリア' },
				{ value: '自立組立エリア' },
				{ value: '塗装着脱荷エリア' },
				{ value: '自立樂リア' }
			],
			selectedItemIndex: null,
		}
	},
	mounted() {
		this.getDataDisplay();
	},
	computed: {},
	methods: {
		async getDataDisplay() {
			const dataDisplay = await api.methods.getData('areas')
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
		onItemTap(index) {
			// const listView = args.object;
			const selectedIndex = index;
			if (this.selectedItemIndex == selectedIndex) {
				// Bỏ chọn phần tử nếu đã được chọn trước đó
				this.selectedItemIndex = null;
			} else {
				// Chọn phần tử mới
				this.selectedItemIndex = selectedIndex;
			}
			this.$navigateTo(SelectPosition, {
				props: { name: '設置エリア変更' }
			});
			// cập nhật lại listview
			// listView.refresh();
		}
	}
};
</script>

<style scoped lang="scss">
.auto-size-listview {
	border-width: 1;
	border-radius: 10;
	background-color: #ffffff;
	font-weight: bold;
	border-color: #464646;

	.padding-content {
		padding: 32px 5 32px 10;
		border-bottom-color: #E60012;
		border-color: #464646;
	}

	.first {
		/* CSS class cho phần tử đầu tiên */
		background-color: #FFDCDF;
		border-top-left-radius: 10;
		border-top-right-radius: 10;
		// padding: 8px 5 8px 10;
		// border-bottom-color: #464646;
	}

	.last {
		/* CSS class cho phần tử cuối cùng */
		background-color: #FFDCDF;
		border-bottom-left-radius: 10;
		border-bottom-right-radius: 10;
		// padding: 8px 5 8px 10;
	}

	.other {
		/* CSS class cho các phần tử khác */
		background-color: #FFDCDF;
		// padding: 8px 5 8px 10;
	}
}
</style>
