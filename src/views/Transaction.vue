<template>
  <div class="transaction">
    <Transaction/>
  </div>
</template>

<script>
// @ is an alias to /src
import Transaction from '@/components/Transaction.vue'

export default {
  name: 'transaction',
  components: {
    Transaction
  }
}
</script>
