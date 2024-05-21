<template>
  <StackLayout class="dialog-container" :height="isIOSDevice ? dialogHeight : 'auto'" borderRadius="20" borderBottomLeftRadius="20">

    <StackLayout v-if="mode == 'btnDel'">
      <Label :text="title" class="dialog-text" />
      <FlexboxLayout justifyContent="space-between" class="m-t-20 button-dialog">
        <Button height="40" borderRadius="40" class="btn button-cancel" @tap="btnCancel" text="キャンセル" />
        <Button height="40" borderRadius="40" class="btn dialog-del" @tap="btnOk" text="削除" />
      </FlexboxLayout>
    </StackLayout>

    <StackLayout v-if="mode == 'btnStop'">
      <Label :text="title" class="dialog-text" />
      <FlexboxLayout justifyContent="space-between" class="m-t-20 button-dialog">
        <Button height="40" borderRadius="40" class="btn button-cancel" @tap="btnCancel" text="キャンセル" />
        <Button height="40" borderRadius="40" class="btn dialog-stop" @tap="btnOk" text="一時停止" />
      </FlexboxLayout>
    </StackLayout>

    <StackLayout v-if="mode == 'btnContinue'">
      <Label :text="title" class="dialog-text" />
      <FlexboxLayout justifyContent="space-between" class="m-t-20 button-dialog">
        <Button height="40" borderRadius="40" class="btn button-cancel" @tap="btnCancel" text="キャンセル" />
        <Button height="40" borderRadius="40" class="btn dialog-continue" @tap="btnOk" text="再開" />
      </FlexboxLayout>
    </StackLayout>

    <FlexboxLayout v-if="mode == 'btnError'" flexDirection="column">
      <FlexboxLayout justifyContent="center" alignContent="center">
        <Image src="~/assets/images/icn_alert.png" width="20" height="20" />
        <Label v-if="title" :text="title" class="dialog-text m-l-5" style="color: red" />
      </FlexboxLayout>
      <Label v-if="subTitle" :text="subTitle" class="dialog-text m-y-15" />
      <Button height="40" borderRadius="40" class="btn dialog-error" @tap="btnCancel" text="閉じる" />
    </FlexboxLayout>

    <StackLayout v-if="mode == 'btnAuto'">
      <Label :text="title" class="dialog-text" />
      <Button height="40" borderRadius="40" class="btn dialog-auto m-t-15" @tap="btnOk" text="搬送開始" />
    </StackLayout>

    <StackLayout v-if="mode == 'btnRoundTrip'">
      <AbsoluteLayout>
        <StackLayout width="100%">
          <Label height="30" :text="title" class="dialog-text" />
          <FlexboxLayout height="35" justifyContent="space-between" alignItems="center" class="selected-content m-b-5 m-t-10 p-x-20 p-y-5"
            @tap="onSelect('product')" backgroundColor="#F6F6F6">
            <StackLayout width="30%">
              <Label horizontalAlignment="center" text="搬送物" class="font-weight-bold m-r-20" style="margin-right: 20;" />
            </StackLayout>
            <FlexboxLayout width="70%" justifyContent="space-between">
              <Label :text="productSelected" />
              <Image src="~/assets/images/icn_down_arrow.png" width="20" height="20" />
            </FlexboxLayout>
          </FlexboxLayout>
          <FlexboxLayout height="35" justifyContent="space-between" alignItems="center" class="selected-content p-x-20 p-y-5"
            @tap="onSelect('destination')" backgroundColor="#F6F6F6">
            <StackLayout width="30%">
              <Label horizontalAlignment="center" text="搬送先" :opacity="isProductSelected ? 1 : 0.2" class="font-weight-bold m-r-20" />
            </StackLayout>
            <FlexboxLayout width="70%" justifyContent="space-between">
              <Label :text="destinationSelected" />
              <Image src="~/assets/images/icn_down_arrow.png" width="20" height="20" v-show="isProductSelected" />
            </FlexboxLayout>
          </FlexboxLayout>
          <FlexboxLayout justifyContent="space-between" class="button-dialog m-t-10">
            <Button height="40" borderRadius="40" class="btn button-cancel" @tap="btnCancel" text="キャンセル" />
            <Button height="40" :isEnabled="productSelected != ''" borderRadius="40" class="btn dialog-round-trip" @tap="btnOk"
              text="搬送開始" />
          </FlexboxLayout>
        </StackLayout>

        <StackLayout width="100%" :top="isIOSDevice ? 43.3 : 41.5" class="overlay-row-first" v-show="!isShowProduct">
          <FlexboxLayout class="p-y-5">
            <StackLayout width="30%">
              <Label horizontalAlignment="center" text="搬送物" class="font-weight-bold" />
            </StackLayout>

            <StackLayout width="70%">
              <FlexboxLayout v-for="(item,index) in productList" :key="index" justifyContent="space-between" @tap="onItemProductTap(index)">
                <Label :text="item" col="1" horizontalAlignment="left" />
                <Image col="2" :src="index == 0 ? '~/assets/images/icn_up_arrow.png' : ''" width="20" height="20"
                  style="margin-right: 20;" />
              </FlexboxLayout>
            </StackLayout>
          </FlexboxLayout>
        </StackLayout>

        <StackLayout width="100%" :top="isIOSDevice ? 83.3 : 81.5" class="overlay-row-next" v-show="!isShowDestination && productSelected != ''">
          <FlexboxLayout class="p-y-5">
            <StackLayout width="30%">
              <Label horizontalAlignment="center" text="搬送先" class="font-weight-bold" />
            </StackLayout>

            <StackLayout width="70%">
              <FlexboxLayout v-for="(item,index) in destinationList" :key="index" justifyContent="space-between" @tap="onItemDestinationTap(index)">
                <Label :text="item" col="1" horizontalAlignment="left" />
                <Image col="2" :src="index == 0 ? '~/assets/images/icn_up_arrow.png' : ''" width="20" height="20"
                  style="margin-right: 20;" />
              </FlexboxLayout>
            </StackLayout>
          </FlexboxLayout>
        </StackLayout>
      </AbsoluteLayout>
    </StackLayout>

    <StackLayout v-if="mode == 'btnComplete'">
      <Label :text="title" class="dialog-text" />
      <Button height="40" borderRadius="40" class="btn dialog-complete m-t-15" @tap="btnCancel" text="閉じる" />
    </StackLayout>

    <StackLayout v-if="mode == 'btnTransportSuccessfully'">
      <Label text="搬送指示を登録しました" class="dialog-text m-b-20" />
      <FlexboxLayout justifyContent="center" class="button-transport m-y-5 p-y-10" @tap="btnOk">
        <Image src="~/assets/images/icn_list.png" width="24" height="24" />
        <Label text="搬送予定を確認する" class="m-l-5" />
      </FlexboxLayout>
      <Button height="40" borderRadius="40" class="button-cancel-single p-y-10 " @tap="btnCancel" text="閉じる" />
    </StackLayout>

    <StackLayout v-if="mode == 'inputPassword'">
      <Label :text="title" class="dialog-text m-b-10" color="#E60012" />
      <TextField class="-rounded-sm m-0" v-model="password" type="password" secure="true" />
      <Label :opacity="showErrorMessage ? 1 : 0" :text="errorMessage" color="#E60012" class="font-weight-bold" />
      <FlexboxLayout justifyContent="space-between" class="button-dialog m-t-15">
        <Button height="40" borderRadius="40" class="btn button-cancel" @tap="btnCancel" text="キャンセル" />
        <Button height="40" borderRadius="40" class="btn dialog-round-trip" @tap="btnOk" text="OK" :isEnabled="password !== ''" />
      </FlexboxLayout>
    </StackLayout>

    <StackLayout v-if="mode == 'RegisteringTransport'">
      <Label :text="title" class="dialog-text" color="#000000" />
      <StackLayout height="80" verticalAlignment="center">
        <Progress value="75" backgroundColor="#fff" color="#E60012" width="150" />
      </StackLayout>
    </StackLayout>

  </StackLayout>
</template>

<script>
import { isAndroid, isIOS } from "tns-core-modules/platform";
import api from '../api/index';
import TransportPlan from './TransportPlan.vue';

export default {
  data() {
    return {
      titleModal: '',
      progress: 0,
      productSelected: '',
      isProductSelected: false,
      destinationSelected: '',
      isListProductOpen: false,
      isShowProduct: true,
      isListDestinationOpen: false,
      isShowDestination: true,
      productList: [
        '選択してください ',
        '部品台車',
        '空台車'
      ],
      destinationList: [
        '部品管理入庫口 (かご台車)',
        '部品台車',
        '空台車'
      ],
      password: '',
      showErrorMessage: false,
      errorMessage: '',
      isAndroidDevice: isAndroid,
			isIOSDevice: isIOS,
    };
  },
  props: ['title', 'mode', 'subTitle', 'dialogHeight', 'onMethodCall: Function',],
  mounted() {
    if (this.mode == 'btnRoundTrip') {
      this.productSelected = this.productList[0]
    }
    if (this.mode == 'RegisteringTransport') {
      this.closeDialog();
    }
  },
  methods: {
    async closeDialog() {
      const data = {
        from_node_id: 1,
        to_node_id: 2,
        request_position_id: 3,
        cargo_type_id: 4
      };
      const ApiResult = await api.methods.postData('transports', data);
      if (ApiResult == 'success') {
        this.mode = 'btnError'
      } else {
        this.mode = 'btnTransportSuccessfully'
      }
      console.log(ApiResult)
    },
    async btnCancel() {
      if (this.mode == 'btnRoundTrip') {
        const transport_id = 1; // transport_id của WebSocket(request_return_transport)
        const data = {
          is_return: false,
          to_node_id: 2,
          cargo_type_id: 3
        };
        const result = await api.methods.postData(`transports/${transport_id}/return`, data);
        console.log(result)
      }
      this.$modal.close(false);
    },
    async btnOk() {
      if (this.mode == 'inputPassword') {
        const data = {
          password: this.password
        };
        const result = await api.methods.postData('is_admin', data);
        if (result == 'fail') {
          this.showErrorMessage = false;
          this.errorMessage = '';
        } else {
          this.showErrorMessage = true;
          this.errorMessage = 'パスワードが違います';
        }
      } else if (this.mode == 'btnRoundTrip') {
        const transport_id = 1; // transport_id của WebSocket(request_return_transport)
        const data = {
          is_return: true,
          to_node_id: 2,
          cargo_type_id: 3
        };
        const result = await api.methods.postData(`transports/${transport_id}/return`, data);
        console.log(result)
      } else if (this.mode == 'btnAuto') {
        const transport_id = 1; // transport_id của WebSocket(request_return_transport)
        const data = {};
        const result = await api.methods.postData(`transports/${transport_id}/next`, data);
        console.log(result)
      } else if (this.mode == 'btnDel') {
        const transport_id = 1; // transport_id của WebSocket(request_return_transport)
        const result = await api.methods.deleteData(`transports/${transport_id}`);
        console.log(result)
      } else if (this.mode == 'btnStop') {
        const transport_id = 1; // transport_id của WebSocket(request_return_transport)
        const data = {};
        const result = await api.methods.postData(`transports/${transport_id}/stop`, data);
        console.log(result)
      } else if (this.mode == 'btnContinue') {
        const transport_id = 1; // transport_id của WebSocket(request_return_transport)
        const data = {};
        const result = await api.methods.postData(`transports/${transport_id}/restart`, data);
        console.log(result)
      } else if (this.mode == 'btnTransportSuccessfully') {
        this.$navigateTo(TransportPlan, {});
      }
      this.$modal.close(true);
    },
    onSelect(mode) {
      if (mode == 'product') {
        this.isListProductOpen = true;
        this.isShowProduct = false;
        this.destinationSelected = this.destinationList[0];
      } else {
        if (this.isProductSelected) {
          this.isListDestinationOpen = true;
          this.isShowDestination = false;
        }
      }
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
      this.productSelected = this.productList[selectedIndex];
      this.isProductSelected = true
      this.isListProductOpen = false;
      this.isShowProduct = true;
    },
    onItemDestinationTap(index) {
      const selectedIndex = index;
      this.destinationSelected = this.destinationList[selectedIndex];
      this.isListDestinationOpen = false;
      this.isShowDestination = true;
    },
  },
};
</script>

<style scoped lang="scss">
.modal-container {
  border-width: 1;
  border-radius: 15;
}

.dialog-container {
  width: 320;
  // height: auto;
  padding: 30 20;
  background-color: #FFFFFF;
}

.dialog-text {
  font-size: 16;
  // margin-bottom: 15;
  font-weight: bold;
  text-align: center;
}

.button-dialog {
  font-weight: bold;
  // margin-top: 0;

  .button-cancel {
    color: #FFFFFF;
    width: 350px;
    // height: 120px;
    background-color: #ABABAB;
  }

  .dialog-del {
    color: #FFFFFF;
    // height: 120px;
    width: 350px;
    background-color: #E60012;
  }

  .dialog-stop {
    color: #FFFFFF;
    // height: 120px;
    width: 350px;
    background-color: #006CD8;
  }

  .dialog-continue {
    color: #006CD8;
    // height: 120px;
    width: 350px;
    background-color: #FFFFFF;
    border-width: 4;
    border-color: #006CD8;
  }
}

.dialog-error {
  color: #FFFFFF;
  // height: 120px;
  background-color: #ABABAB;
}

.dialog-auto {
  color: #FFFFFF;
  font-weight: bold;
  // height: 120px;
  background-color: #006CD8;
}

.dialog-round-trip {
  color: #FFFFFF;
  width: 350px;
  // height: 120px;
  background-color: #006CD8;
}

.dialog-complete {
  color: #FFFFFF;
  // height: 120px;
  background-color: #ABABAB;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  color: black;
  text-align: center;
}

.overlay-row {
  z-index: 2;
  opacity: 1;
}

.overlay-row-first {
  z-index: 3;
  background-color: #F6F6F6;
}

.overlay-row-next {
  z-index: 3;
  background-color: #F6F6F6;
}

.auto-size-listview {
  height: 85;
  border-color: #707070;
  padding: 0;
  margin: 0;

  .first-item {
    padding: 2 5;
  }
}

.button-transport {
  color: #FFFFFF;
  // height: 120px;
  background-color: #000000;
  border-radius: 41;
  font-weight: bold;
}

.button-cancel-single {
  color: #FFFFFF;
  // height: 120px;
  background-color: #ABABAB;
  font-weight: bold;
  width: 100%;
}
</style>