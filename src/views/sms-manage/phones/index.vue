<template>
  <div class="app-container">
    电话号码

    <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>

      <el-form-item class="floatLeft">
        服务选择
        <el-select
          v-model="chooseServiceCode"
          style="width: 250px;"
          class="floatLeft"
          :max-collapse-tags="1"
          collapse-tags-tooltip
          collapse-tags
          remote-show-suffix
          clearable
          filterable
          placeholder="服务"
          value-key="countryId"
          loading-text="搜索中..."
          remote
          :remote-method="queryServiceOptions"
          @change="resetPageAndQuery"
        >
          <el-option v-for="item in serviceOptions" :key="item.code" :label="item.name" :value="item.code">
            {{ item.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="floatLeft">
        国家地区选择
        <el-select
          v-model="chooseCountryId"
          style="width: 250px;"
          class="floatLeft"
          :max-collapse-tags="1"
          collapse-tags-tooltip
          collapse-tags
          remote-show-suffix
          clearable
          filterable
          placeholder="国家"
          value-key="countryId"
          loading-text="搜索中..."
          remote
          :remote-method="queryCountryOptions"
          @change="resetPageAndQuery"
        >
          <el-option v-for="item in countryOptions" :key="item.countryId" :label="item.countryName" :value="item.countryId">
            {{ item.countryName }}
          </el-option>

        </el-select>
      </el-form-item>

    </el-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      height="700"
    >
      <el-table-column align="center" label="国家id" width="95">
        <template slot-scope="scope">
          {{ scope.row.country.countryId }}
        </template>
      </el-table-column>
      <el-table-column label="国家">
        <template slot-scope="scope">
          <el-avatar :size="25" :src="'https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/country/'+scope.row.country.countryId+'.svg'" />
          {{ scope.row.country.countryName }}
        </template>
      </el-table-column>
      <el-table-column label="服务">
        <template slot-scope="scope">
          <el-avatar :size="25" :src="'https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/'+scope.row.service.serviceCode+'0.webp'" />
          {{ scope.row.service.serviceName }}
        </template>
      </el-table-column>
      <el-table-column label="服务编码" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.service.serviceCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="可购买数量" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.service.countPhoneNumbers }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.service.costPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="buyNumber(scope.row)">buy</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[50, 100, 200, 300, 400]"
      :small="false"
      :background="true"
      layout="total,sizes, prev, pager, next"
      :total="total"
      style="background-color: white;margin-bottom: 10px;"
      @size-change="pageSizeChange"
      @current-change="pageIndexchange"
    />
  </div>
</template>

<script>
import { Message } from 'element-ui'
import * as smsApi from '@/api/sms'
import * as pingyin from '@/utils/pingyin'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      chooseServiceCode: null,
      serviceOptions: [],
      chooseCountryId: null,
      countryOptions: [],
      list: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 50,
      total: 0
    }
  },
  created() {
    this.queryPage()
  },
  methods: {
    pageSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.queryPage()
    },
    pageIndexchange(index) {
      this.currentPage = index
      this.queryPage()
    },
    resetPageAndQuery() {
      this.currentPage = 1
      this.queryPage()
    },

    queryPage() {
      if (!this.chooseCountryId && !this.chooseServiceCode) {
        return
      }
      console.log('分页', this.currentPage, this.pageSize)
      this.listLoading = true
      smsApi.getNumberList({
        countryId: this.chooseCountryId,
        serviceCode: this.chooseServiceCode,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      }).then(response => {
        this.currentPage = response.data.pageIndex
        this.pageSize = response.data.pageSize
        this.total = response.data.totalCount
        this.list = response.data.pageDatas
        if (this.list.length === 0) {
          this.currentPage = 0
        }
        this.listLoading = false
      })
    },
    queryServiceOptions(word) {
      if (!word || !word.trim()) {
        return
      }
      word = word.trim()
      this.serviceOptions = smsApi.getServiceList().filter(e => e.name.toLowerCase().includes(word.toLowerCase()))
    },
    queryCountryOptions(word) {
      if (!word || !word.trim()) {
        return
      }
      word = word.trim()
      this.countryOptions = smsApi.getCountryList().filter(e => pingyin.matchPingYing(e.countryName, word))
    },
    buyNumber(row) {
      smsApi.buyNumber({
        countryId: row.country.countryId,
        serviceCode: row.service.serviceCode
      }).then(res => {
        Message({
          message: '购买成功',
          type: 'success'
        })
        smsApi.queryBalance()
      })
    }

  }
}
</script>
