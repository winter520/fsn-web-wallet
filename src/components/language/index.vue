<template>
  <div class="header-top-lang">
    <el-select v-model="language" size="mini" @change="changLanguage">
      <el-option
        v-for="item in languageOption"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<style lang="scss">
.header-top-lang {
  width: 80px;
  .el-input__inner{
    border:none;padding-left: 0;background: none;color: $color-gray-sm;
  }
}
</style>

<script>
export default {
  name: 'language',
  data () {
    return {
      language: this.$i18n.locale,
      languageOption: [
        {value: 'en-US', label: 'English'},
        {value: 'zh-CN', label: '中文简体'}
      ],
    }
  },
  mounted () {

  },
  methods: {
    changLanguage () {

    }
  }
}
</script>