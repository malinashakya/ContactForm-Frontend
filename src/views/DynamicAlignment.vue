<script setup>

</script>

<template>
  <div class="form">
    <div class="labels">
      <label class="name" for="name">Nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffrrrrffffffffffffffff</label>
      <InputText id="name" class="inputs"/>
    </div>
    <div class="labels">
      <label class="address" for="address">Address</label>
      <InputText id="address" class="inputs"/>
    </div>
    <div class="labels">
      <label class="contact" for="contact">Contact</label>
      <InputText id="contact" class="inputs"/>
    </div>
    <div class="labels">
      <label class="age" for="age">Age</label>
      <InputText id="age" class="inputs"/>
    </div>
  </div>
</template>

<style scoped>
.form {
  display: grid;
  grid-template-columns: auto 1fr; /* Two columns: one for labels, one for inputs */
  gap: 10px;
}

.labels {
  display: contents;
}

label {
  text-align: left;
  margin-right: 10px;
}

.inputs {
  width: 30%;
}
</style>