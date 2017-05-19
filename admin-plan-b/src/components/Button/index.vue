<template lang="html">
  <button class="btn" :type="native" :disabled="disabled" :class="computedClass" :style="computedStyle">
      <span class='loading' v-show="loading"></span>
      <span class="text">
        <slot></slot>
        <template v-if='loading'>...</template>
      </span>
  </button>
</template>

<script>
export default {
  name: 'q-button',
  props: {
    type: {
      type: String,
      // required: true
    },
    size: String,
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    ['native']: { // 'button','submit', 'reset'
      type: String,
      default: 'button'
    }

  },
  computed: {
    computedClass() {
      let clz = [];
      if(this.disabled || this.loading) {
        clz.push('disabled')
      }
      return clz;
    },
    computedStyle () {

    }
  }
}
</script>

<style lang="sass?indentedSyntax" scoped>
.btn
  padding: 10px 40px
  width: auto
  cursor: pointer
  background-color: #c0c0c0
  font-size: 16px
  border: none
  color: #fff
  transition: all 300ms ease
  box-shadow: 0 1px 1px rgba(0,0,0,0.11)
  &>span
    transition: inherit

  &:focus,
  &:active
    outline: none
    border: none

  &:hover
    box-shadow: 0 8px 20px #ccc

.loading
  display: inline-block
  vertical-align: bottom
  height: 20px
  width: 20px
  border-radius: 50%
  border-left: 2px solid #fff
  margin: 0 6px
  animation: spin 1s linear infinite


.disabled
  cursor: not-allowed
  opacity: 0.5

  &:hover
    box-shadow: 0 1px 1px rgba(0,0,0,0.11)


@keyframes spin
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)

</style>
