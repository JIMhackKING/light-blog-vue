<template>
  <b-navbar toggleable="lg" type="dark" variant="secondary">
    <div class="container">
      <b-navbar-brand href="#">卷积云博客</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">写文章</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">统计中心</b-nav-item>
          <b-nav-item href="#">搜索中心</b-nav-item>
          <b-nav-item href="#">你好
          </b-nav-item>
          <b-nav-item href="#">注销</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
  export default {
    name: "HeaderBar",
  }
</script>