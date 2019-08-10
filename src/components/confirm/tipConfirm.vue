<template>
    <a-popconfirm :title="config.confirm.text" @confirm="onConfirm">
        <slot >
         <a>{{
            config.label
          }}</a>
        </slot>
    </a-popconfirm>
</template>

<script>

import mix from './tableOpMix';

export default {
  props: ['config'],
  mixins: [mix]
};
</script>
