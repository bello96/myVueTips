<template>
  <transition name="fade" @after-enter="handleAfterEnter">
    <div
      class="notification"
      :style="[position, type, center]"
      v-show="visible"
    >
      <span class="notification__content">
        {{ content }}
      </span>
      <span v-if="showClose" class="notification__btn" @click="handleClose">{{
        btnText
      }}</span>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Tips",
  props: {
    content: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
      default: "✖",
    },
    showClose: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.notification {
  display: flex;
  background-color: #303030;
  z-index: 999;
  position: fixed;
  color: rgba(255, 255, 255, 1);
  align-items: center;
  padding: 14px;
  min-width: 280px;
  flex-wrap: wrap;
  margin: 0 18px;
  transition: all 0.3s;
  border-radius: 6px;
  &__content {
    padding: 0;
  }
  &__btn {
    color: #ccc;
    cursor: pointer;
    position: absolute;
    right: 16px;
  }
}
</style>
