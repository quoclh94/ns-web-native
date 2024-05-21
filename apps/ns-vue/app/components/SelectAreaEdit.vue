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

			<StackLayout class="p-x-20 p-b-20" row="1">
				<Label :text="'名称編集 ' + name" color="#E60012" class="font-weight-bold m-t-10" fontSize="15"
					horizontalAlignment="center" />
				<StackLayout class="m-t-10 m-b-10" orientation="horizontal" horizontalAlignment="left" @tap="goBack">
					<Image src="~/assets/images/icn_select4.png" width="18" height="18" />
					<Label text="管理メニュー" color="#E60012" class="m-l-5 m-b-2" fontSize="15" />
				</StackLayout>

				<StackLayout width="100%" class="auto-size-listview">
					<FlexboxLayout v-for="(area, index) in AreaList" :key="index" justifyContent="space-between" :borderBottomWidth="index == (AreaList.length - 1) ? 0 : 1"
						class="padding-content" @tap="goToAreaEdit(index)">
						<Label :text="area.value" class="font-weight-bold" />
						<Image src="~/assets/images/icn_select3.png" class="m-r-10" width="20" height="20" />
					</FlexboxLayout>
				</StackLayout>
			</StackLayout>
		</GridLayout>

	</Page>
</template>
<script>
import Home from './Home.vue';
import AreaEdit from './AreaEdit.vue';

export default {
	props: ['name'],
	mounted() {
		this.getDataDisplay();
	},
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
		}
	},
	computed: {},
	methods: {
		async getDataDisplay() {
			const dataDisplay = await api.methods.getData('areas')
			console.log(dataDisplay)
		},
		goHome() {
			this.$navigateTo(Home, {});
		},
		goBack() {
			this.$navigateBack();
		},
		onItemTap(args) {
			const listView = args.object;
			const selectedIndex = args.index;
			listView.refresh();
		},
		goToAreaEdit(index) {
			this.$navigateTo(AreaEdit, {});
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
	padding: 0;
	margin: 0;

	.padding-content {
		padding: 32px 5 32px 10;
		border-bottom-color: #E60012;
		border-color: #464646;
	}
}
</style>
