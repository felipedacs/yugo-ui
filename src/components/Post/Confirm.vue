<template>
  <div id="modal-info" :class="{'modal':true, 'is-active': mostra}">
    <div class="modal-background"></div>
    <div id="modal-texto" class="modal-content">
      <slot></slot>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="fechaModalInfo()"></button>
  </div>
</template>
<script>
export default {
  props:['mostra'],
  methods: {
    fechaModalInfo() {
      this.$emit("off");
    }
  }
}
</script>
<style>
</style>
