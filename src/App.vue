<template>
  <div id="app">
    <HeaderBar></HeaderBar>
    <b-card header-tag="header" style="margin-bottom: 20px">
    <template v-slot:header>
      <h3>
        <span title="点击查看更多信息" href="#" @click.prevent>x日x月</span>
        <small class="pull-right">
          <b-button-group>
            <b-button variant="outline-secondary" href="#">
              <b-icon-pencil-square></b-icon-pencil-square>
              编辑
            </b-button>
            <!-- Button trigger modal -->
            <b-button v-b-modal="1" variant="outline-danger">
              <b-icon-trash></b-icon-trash>
              删除
            </b-button>
          </b-button-group>
        </small>
      </h3>
      <b-collapse id="1" class="mt-2">
        <span style="font-size: 12px; color: #8c8c8cbd;">最后修改于 x日x月</span>
        <p style="color: #999">简介：无</p>
      </b-collapse>
    </template>
    <b-card-text>
      <div class="card-body" id="1" style="overflow:visible">
        <textarea>asdfadsfadf</textarea>
      </div>
      <div style="margin-left: 20px;">
        <p>
          <b-link href="#">查看详情...</b-link>
        </p>
      </div>
    </b-card-text>
  </b-card>
</div>
</template>

<script>
import HeaderBar from './components/Header';

export default {
  name: "App",
  components: {
    HeaderBar,
  }
};
</script>

<style>

</style>
