<script setup></script>
<template>
  <page-contain title="所有帖子">
    <el-form inline>
      <el-form-item label="帖子分类:">
        <el-select>
          <el-option lable="篮球" value="0"></el-option>
          <el-option lable="篮球" value="0"></el-option>
          <el-option lable="篮球" value="0"></el-option>
          <el-option lable="篮球" value="0"></el-option>
          <el-option lable="篮球" value="0"></el-option>
          <el-option lable="篮球" value="0"></el-option>
          <el-option lable="篮球" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select>
          <el-option lable="匹配中" value="0"></el-option>
          <el-option lable="已完成" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </page-contain>
</template>
