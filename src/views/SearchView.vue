<template>
  <div class="search">
    <van-nav-bar class="my-bar" :border="false" right-text="Search" fixed @click-right="doSearchAction"  @click-left="onClickLeft">
      <template #left>
        <van-image width="18" height="16" :src="leftArrow" />
      </template>
      <template #title>
        <van-search v-model="value" @search="doSearchAction" @clear="onClear" shape="round">
          <template #left-icon>
            <van-image width="18" height="16" :src="searchIcon" />
          </template>
        </van-search>
      </template>
    </van-nav-bar>

    <div class="content">
      <div class="search-title">
        <span v-if="list.length > 0">Search results</span>
      </div>
      <div v-if="loading && pageNo === 1">
        <van-skeleton v-for="i in 8" :key="i">
          <template #template>
            <div :style="{ display: 'flex', width: '100%', marginBottom: '20px' }">
              <van-skeleton-image :style="{width: '80px', height: '112px'}"/>
              <div :style="{ flex: 1, marginLeft: '16px' }">
                <van-skeleton-paragraph row-width="60%" />
                <van-skeleton-paragraph />
                <van-skeleton-paragraph />
                <van-skeleton-paragraph />
              </div>
            </div>
          </template>
        </van-skeleton>
      </div>

      <div v-if="list.length > 0" class="list-box">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          loading-text="loading..."
          @load="reqSearchData"
        >
          <div v-for="item in list" :key="item" class="item-card" @click="goToNovel(item.id)">
            <div class="picture">
              <van-image width="80" height="112" :src="item.cover" />
            </div>
            <div class="detail">
              <div class="title">{{ item.name }}</div>
              <div class="author">{{ item.author }}</div>
              <div class="synopsis">
                {{ item.introduce }}
              </div>
            </div>
          </div>
        </van-list>
      </div>

    </div>

    <van-empty v-if="total === 0" image-size="274">
      <template #image>
        <van-image width="257" height="274" :src="emptyImg" />
      </template>
    </van-empty>
  </div>
</template>

<script>
import { getImageUrl } from '@/utils/index.js'
import axios from '@/api/axios';
import api from '@/api/toApiMap';

export default {
  data() {
    return {
      leftArrow: getImageUrl('arrow.svg', 'icons'),
      searchIcon: getImageUrl('search.svg', 'icons'),
      emptyImg: getImageUrl('empty.png'),
      value: '',
      pageNo: 1,
      pageSize: 10,
      total: 10,
      loading: false,
      finished: false,
      list: []
    }
  },
  mounted() {
    this.reqSearchData()
  },
  methods: {
    onClear() {
      this.doSearchAction()
    },
    onClickLeft() {
      this.$router.back()
    },
    goToNovel(bookId) {
      if(!bookId) { return }
      this.$router.push({
        name: 'novel',
        params: {
          id: bookId
        }
      })
    },
    doSearchAction() {
      this.pageNo = 1
      this.total = this.pageSize
      this.list = []
      this.reqSearchData()
    },
    async reqSearchData() {
      this.loading = true
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        name: this.value
      }
      const res = await axios.get(api.book_search, {params})
      this.loading = false
      if(res) {
        this.pageNo = res.pageNo
        this.pageSize = res.pageSize
        this.total = res.total
        this.list = this.list.concat(res.list)
        if(this.pageNo* this.pageSize >= this.total) {
          this.finished = true
        } else {
          this.pageNo += 1
        }
      }
    }
  }
}
</script>

<style scoped>
.search {
  width: 100vw;
  height: 100vh;
  background-color: var(--color-background-white);
}
.search /deep/ .van-nav-bar .van-icon {
  color: #C4C4C4;
}
.search /deep/ .van-nav-bar__text {
  color: rgb(242, 44, 100);
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
}
.search /deep/ .van-nav-bar__right {
  padding: 0 20px 0 10px;
}
.search /deep/ .van-nav-bar__title {
  width: calc(100% - 120px);
  max-width: 100%;
  position: absolute;
  left: 46px;
}
.search /deep/ .van-field__left-icon {
  display: flex;
  align-items: center;
}
.search /deep/ .van-search__content {
  background-color: #e6e6e6;
}
.search /deep/ .van-field__control {
  font-size: 16px;
}

.content {
  padding: 60px 20px 20px 20px;
}

.search-title {
  color: var(--vt-c-black);
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  padding-bottom: 20px;
}

.content .item-card {
  width: 100%;
  height: 112px;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  margin-bottom: 20px;
}

.content .item-card .picture {
  border-radius: 4px;
}
.content .item-card .detail {
  width: calc(100% - 100px);
  padding-left: 12px;
  padding-top: 9px;
  padding-bottom: 9px;
}
.content .item-card .detail .title {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: var(--color-heading);
}
.content .item-card .detail .author {
  width: calc(100% - 20px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 400;
  font-size: 11px;
  line-height: 12px;
  padding: 16px 0;
}
.content .item-card .detail .synopsis {
  height: 60px;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
