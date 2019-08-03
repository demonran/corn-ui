<template>
    <a-popconfirm :title="config.title" @confirm="onConfirm">
        <slot />
    </a-popconfirm>
</template>

<script>
export default {
    props:['config'],
    methods: {
        onConfirm() {
            let {confirm}  = this.config.confirm;
            if(!confirm ) return;
            confirm.call(this, this.config.text, this.config.record);
        }
    }
}
</script>