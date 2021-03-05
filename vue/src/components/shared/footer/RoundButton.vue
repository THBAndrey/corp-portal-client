<template>
    <div class="round-button">
        <i class="mdi mdi-24px mdi-timer"></i>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.round-button {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(32, 13, 80);
    background: linear-gradient(0deg, rgba(32, 13, 80, 1) 0%, rgba(75, 17, 107, 1) 100%);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.24);
    border: none;
}
</style>
