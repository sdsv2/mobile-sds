<template>
  <div class="orderProduct">
    <OrderProduct/>
  </div>
</template>

<script>
// @ is an alias to /src
import OrderProduct from '@/components/OrderProduct.vue'

export default {
  name: 'orderProduct',
  components: {
    OrderProduct
  }
}
</script>
