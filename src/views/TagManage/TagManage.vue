<script setup>
import { onMounted } from 'vue'
import { nextTick, ref } from 'vue'
import { ElInput } from 'element-plus'
import axios from 'axios'

const inputValue = ref('')
const dynamicTags = ref([])
const inputVisible = ref(false)
const InputRef = ref(null)

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

const getTaglist = async () => {
  axios
    .get('http://8.146.208.139:10010/tag/list')
    .then((response) => {
      response.data.data.forEach(function (element) {
        dynamicTags.value.push(element.name)
      })
    })
    .catch((error) => {
      throw error
    })
}

onMounted(() => {
  getTaglist()
})
</script>
<template>
  <page-contain title="标签管理">
    <div class="flex gap-2">
      <el-tag
        size="large"
        v-for="tag in dynamicTags"
        :key="tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        size="large"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else class="button-new-tag" size="large" @click="showInput"
        >新增标签</el-button
      >
    </div>
  </page-contain>
</template>

<style lang="scss" scoped>
.el-tag {
  margin: 1%;
}
</style>
