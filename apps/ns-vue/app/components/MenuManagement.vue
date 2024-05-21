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
				<StackLayout class="m-t-20 m-b-20" orientation="horizontal" horizontalAlignment="left">
					<Image src="~/assets/images/icn_settings.png" width="20" height="20" />
					<Label text="管理" color="#E60012" class="m-l-5 font-weight-bold" />
				</StackLayout>
				<StackLayout class="menu-item" @tap="goToInstallArea">
					<FlexboxLayout justifyContent="space-between" class="padding-content">
						<Label text="設置エリア変更" class="font-weight-bold padding-label" />
						<Image src="~/assets/images/icn_select3.png" width="10" height="10" />
					</FlexboxLayout>
				</StackLayout>
				<Label text="名称編集" color="#E60012" class="m-t-20 m-b-5" />
				<StackLayout class="menu-item">
					<StackLayout borderBottomWidth="1" @tap="goToEditArea">
						<FlexboxLayout justifyContent="space-between" class="padding-content">
							<Label text="エリア / 設置場所 / 搬送元・先" class="font-weight-bold" />
							<Image src="~/assets/images/icn_select3.png" width="10" height="10" />
						</FlexboxLayout>
					</StackLayout>
					<StackLayout @tap="goToEditName">
						<FlexboxLayout justifyContent="space-between" class="padding-content">
							<Label text="搬送物" class="font-weight-bold" />
							<Image src="~/assets/images/icn_select3.png" width="10" height="10" />
						</FlexboxLayout>
					</StackLayout>
				</StackLayout>
			</StackLayout>

		</GridLayout>
	</Page>
</template>
<script>
import Home from './Home.vue';
import SelectAreaSetup from './SelectAreaSetup.vue';
import SelectAreaEdit from './SelectAreaEdit.vue';
import ProductNameEdit from './ProductNameEdit.vue';
import api from '../api/index'

export default {
	mounted() { },
	methods: {
		async goHome() {
			const position_id = 1; // position_id được lấy từ local storage
			const data = await api.methods.getData(`positions/${position_id}`)
			console.log(data)
			this.$navigateTo(Home, {});
		},
		async goToInstallArea() {
			const position_id = 1; // position_id được lấy từ local storage
			const data = await api.methods.getData(`positions/${position_id}`)
			console.log(data)
			this.$navigateTo(SelectAreaSetup, {
				props: { name: '設置エリア変更' }
			});
		},
		async goToEditArea() {
			const position_id = 1; // position_id được lấy từ local storage
			const data = await api.methods.getData(`positions/${position_id}`)
			console.log(data)
			this.$navigateTo(SelectAreaEdit, {
				props: { name: 'エリア / 設置場所 / 搬送元・先' }
			});
		},
		async goToEditName() {
			const position_id = 1; // position_id được lấy từ local storage
			const data = await api.methods.getData(`positions/${position_id}`)
			console.log(data)
			this.$navigateTo(ProductNameEdit, {
				props: { name: '搬送物' }
			});
		}
	}
};
</script>

<style scoped lang="scss">
.menu-item {
	border-radius: 10;
	border-width: 1;
	border-color: #464646;

	.padding-content {
		padding: 10 10 10 15;
	}
}
</style>
