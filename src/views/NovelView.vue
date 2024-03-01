<template>
  <div class="novel">
    <van-nav-bar left-arrow :title="book.name || 'Novemia'" @click-left="onClickLeft" safe-area-inset-top fixed>
      <template #left>
        <van-image width="18" height="16" :src="leftArrow" />
      </template>
    </van-nav-bar>
    <div class="title">{{ book.name }}</div>
    <div class="author">{{ book.author }}</div>

    <van-list
      v-model:loading="loading"
      :finished="finished"
      loading-text="loading..."
      @load="onLoadChapter"
    >
      <div v-for="c in chapters" :key="c">
        <div class="chapter-name">{{ c.title }}</div>
        <div v-html="c.body" class="content"></div>
      </div>
    </van-list>

    <div v-if="finished">
      <van-button v-if="ios" class="my-download" url="https://apps.apple.com/cn/app/id6476918770">Download App</van-button>
      <van-button v-if="android" class="my-download" url="https://play.google.com/store/apps/details?id=com.novemia">Download App</van-button>
    </div>
  </div>
</template>

<script>
import {decrypt, getImageUrl} from '@/utils/index.js'
import axios from '@/api/axios';
import api from '@/api/toApiMap';
import { nextTick } from 'vue';

export default {
  data() {
    return {
      leftArrow: getImageUrl('arrow.svg', 'icons'),
      loading: false,
      finished: false,
      bookId: undefined,
      book: {},
      currChapter: 0,
      chapters: [],
      ios: false,
      android: false
    }
  },
  async mounted() {
    if (this.$route.params) {
      this.bookId = this.$route.params.id
      this.reqBookData()
    }
    await nextTick()
    this.downloadAppSet()
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async reqBookData() {
      const params = {
        id: this.bookId
      }
      const res = await axios.get(api.book, {params})
      this.book = Object.assign({}, res)
      this.currChapter = 0
      this.onLoadChapter()
    },
    async onLoadChapter() {
      let chapterId = undefined
      if(this.currChapter === 0) {
        chapterId = this.book.firstChapterId
      } else {
        chapterId = this.chapters[this.currChapter-1].nextChapterId
      }
      if(chapterId === undefined ) { return }
      if (this.currChapter >= 5) {
        this.finished = true
        return
      }
      const params = {
        id: chapterId
      }
      const res = await axios.get(api.chapter, {params})
      res.body = decrypt(res.body);
      this.chapters.push(res)
      this.currChapter += 1
      this.loading = false
    },
    downloadAppSet() {
      const ua = navigator.userAgent
      this.ios = false
      this.android = false
      if (/iPhone|iPad/i.test(ua)) {
        this.ios = true
      } else if (/Android/i.test(ua)) {
        this.android = true
      } else {
        this.android = true
        console.error('非ios也非android')
      }
    }
  }
}
</script>
<style scoped>
.novel {
  color: #333333;
  background-color: var(--color-background-white)
}
.title {
  font-size: 22px;
  line-height: 30px;
  text-align: center;
  padding-top: 60px;
}
.author {
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  color: #0000004D;
  padding-top: 15px;
  padding-bottom: 40px;
}
.chapter-name {
  padding: 10px 20px;
  color: var(--color-heading);
  font-weight: 600;
  font-size: 20px;
  text-align: left;
  line-height: 22px;
}
.content {
  min-height: 500px;
  font-weight: 400;
  font-size: 14px;
  padding: 10px 20px;
  white-space: pre-line;
  line-height: 28px;
  text-align: left;
}
.my-download {
  margin: 20px 20px 60px 20px;
  width: calc(100% - 40px);
  background-color: #F22C64;
  color: #fff;
  border-color: #F22C64
}
</style>
