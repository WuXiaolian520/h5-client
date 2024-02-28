<template>
  <div class="index">
    <div class="heard-line flex-between">
      <img class="left novemia" src="@/assets/icons/novemia.svg"/>
      <div class="right">
        <img class="search-icon" src="@/assets/icons/search.svg" @click="goToSearch()"/>
      </div>
    </div>
    <van-swipe class="banner-box" :autoplay="3000" indicator-color="#F22C64" lazy-render>
      <van-swipe-item class="my-swipe" v-for="b in banner" :key="b">
        <van-image width="100%" height="100%" :src="b.cover" fit="cover" :radius="4" @click="goToNovel(b.bookId)"/>
      </van-swipe-item>
    </van-swipe>
    <div class="recomendar">
      <div class="flex-between block-line">
        <div class="name"> Recomendar </div>
<!--        <div class="more">-->
<!--          <van-icon name="arrow" color="#B3B3B3" :size="16"/>-->
<!--        </div>-->
      </div>
      <div class="card-line">
        <van-swipe ref="swipe" :width="330" :loop="false" :show-indicators="false" lazy-render @change="onChangeSwipe">
          <van-swipe-item v-for="re in recommendation" :key="re" @click.prevent="onClickCard">
            <div class="item-card">
              <div class="picture" @click.prevent="goToNovel(re.bookId)">
                <van-image width="100" height="140" :src="re.cover" fit="cover" :alt="re.bookName" :radius="4"/>
              </div>
              <div class="content">
                <div class="flex-between">
                  <div class="title">{{re.bookName}}</div>
                  <van-icon name="ellipsis" color="#B3B3B3" :size="16"/>
                </div>
                <div class="author">{{re.author}}</div>
                <van-divider :hairline="false"/>
                <div class="synopsis">{{ re.introduce }}</div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>

    </div>
    <div class="hot-list">
      <div class="flex-between block-line">
        <div class="name">Tendencias</div>
<!--        <div class="more">-->
<!--          <van-icon name="arrow" color="#B3B3B3" :size="16"/>-->
<!--        </div>-->
      </div>
      <div class="list-box">
        <van-row gutter="20">
          <van-col v-for="hot in recentHot" :key="hot" span="8" @click="goToNovel(hot.bookId)">
            <van-image class="img" width="100" height="140" fit="cover" :src="hot.cover" :radius="4" :alt="hot.bookName"/>
            <div class="title">{{ hot.bookName }}</div>
            <div class="author">{{ hot.author }}</div>
          </van-col>
        </van-row>
      </div>
    </div>

    <div class="about-us">
      <van-divider dashed :hairline="false" style="margin: 0px;"/>
      <div class="name">Quiénes somos</div>
      <div class="link">
        <a href="https://www.novemia.com/rule/AboutOfNovemia.html">Sobre nosotros | </a>
        <a href="https://www.novemia.com/rule/TermsofUse.html">Términos de uso | </a>
        <a href="https://www.novemia.com/rule/PrivacyPolicy.html">Polífticas de privacidad </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getImageUrl } from '@/utils/index.js'
import axios from '@/api/axios';
import api from '@/api/toApiMap';

export default {
  data() {
    return {
      banner: [
        {
          cover: getImageUrl('banner_1.jpeg')
        },
        {
          cover: getImageUrl('banner_2.jpeg')
        },
        {
          cover: getImageUrl('banner_3.jpeg')
        },
      ],
      recommendation: [],
      recentHot: [],
      curClickRecomendCardId: 0
    }
  },
  mounted() {
    this.reqHomeData()
  },
  methods: {
    onChangeSwipe(index) {
      this.curClickRecomendCardId = index
    },
    onClickCard() {
      if(this.curClickRecomendCardId >= 0 && this.curClickRecomendCardId < this.recommendation.length - 1) {
        this.$refs.swipe.next()
      } else {
        this.$refs.swipe.swipeTo(0)
      }
    },
    async reqHomeData() {
      const res = await axios.get(api.ad_home)
      if(res) {
        this.banner = Array.from(res.banner)
        this.recommendation = Array.from(res.dailyRecommendation)
        this.recentHot = Array.from(res.recentHot)
      }
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
    goToSearch() {
      this.$router.push({
        name: 'search'
      })
    }
  }
}
</script>

<style scoped>
.heard-line {
  height: 30px;
  margin-top: 20px;
  padding: 0 20px;
}
.heard-line .novemia {
  width: 97px;
  height: 30px;
}
.heard-line .search-icon {
  width: 16px;
  height: 16px;
}
.banner-box {
  width: calc(100% - 40px);
  height: 150px;
  border-radius: 4px;
  margin: 20px auto 0 auto;
}
.my-swipe {
  background-color: #f22c642d;
}

.recomendar {
  margin-top: var(--section-gap);
  background-color: var(--color-background-white);
}
.recomendar .card-line {
  height: 170px;
  display: flex;
  flex-direction: row;
  padding-bottom: 2px;
}
.recomendar .item-card {
  position: relative;
  top: 8px;
  min-width: 300px;
  height: 144px;
  margin-left: 16px;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0px 4px 15px 0px rgba(127, 127, 128, 0.2);
  background: rgb(255, 255, 255);
}
.recomendar .item-card .picture {
  position: absolute;
  top: -8px;
  border-radius: 4px;
}
.recomendar .item-card .content {
  position: absolute;
  width: calc(100% - 124px);
  right: 12px;
  float: right;
  padding-left: 12px;
}
.recomendar .item-card .content::after {
  clear: both;
}
.recomendar .item-card .content .title {
  width: calc(100% - 20px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 600;
  font-size: 16px;
  color: var(--color-heading);
}
.recomendar .item-card .content .author {
  width: calc(100% - 20px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 400;
  font-size: 10px;
  line-height: 18px;
}
.recomendar .item-card .content .van-divider {
  margin: 8px 0;
}
.recomendar .item-card .content .synopsis {
  height: 56px;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  text-overflow: ellipsis;
  overflow: hidden;
}
.hot-list {
  background-color: var(--color-background-white);
  padding-bottom: 20px;
}
.hot-list .list-box {
  padding: 0 20px;
}
.hot-list .list-box .van-col {
  margin-bottom: 16px;
}
.hot-list .list-box .img {
  border-radius: 4px;
  box-shadow: 0px 4px 6px 0px rgba(128, 128, 128, 0.25);
  background: url();
}
.hot-list .list-box .title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: var(--color-heading);
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.hot-list .list-box .author {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 12px;
  white-space: nowrap;
  font-weight: 400;
  font-size: 8px;
}
.about-us {
  background-color: var(--color-background-white);
  padding: 0 20px 10px 20px;
}
.about-us .name {
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-weight: 600;
  font-size: 14px;
  color: var(--color-heading);
}
.about-us .link {
  font-size: 12px;
  text-align: center;
}
.block-line {
  height: 58px;
  line-height: 18px;
  padding: 20px;
}
.block-line .name {
  font-weight: 600;
  font-size: 16px;
  color: var(--color-heading);
}
.block-line .more {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  color: var(--color-text);
}

</style>
