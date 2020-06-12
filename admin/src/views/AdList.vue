<template>
  <div>
    <h1>广告位列表</h1>
    <el-table :data="items">
      <!-- prop为字段名，label表示显示的名称 -->
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <!-- scope表示当前行的数据 -->
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    //获取全部数据
    async fetch() {
      const res = await this.$http.get("rest/ads");
      this.items = res.data;
    },
    // 删除
    async remove(row) {
      this.$confirm(`是否确定要删除 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`rest/ads/${row._id}`);
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.fetch();
          }
        })
        .catch(() => {});
    }
  },
  // 页面进来默认要做什么
  created() {
    this.fetch();
  }
};
</script>
