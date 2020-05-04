<template>
     <Paginate
        v-model="pagination.currentPage"
        :page-count="pagination.pageCount"
        :click-handler="handleChange"
        prev-text="Prev"
        next-text="Next"
        container-class="pagination"
        page-class="page-item"
        next-class="next"
        prev-class="prev"
        active-class="active-item"
        >
    </Paginate>
</template>

<script>
import Paginate from 'vuejs-paginate';

export default {
    components: {
        Paginate
    },
    props: {
        pagination: Object,
        handleChange: Function
    }
}
</script>

<style>
.pagination {
    list-style: none;
}

.page-item {
    float: left;
    /* width: 40px; */
    min-width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    text-align: center;
    color: black!important;
    padding: 0!important;
    box-sizing: border-box;
}

.next, .prev{
    float: left;
    left: 0;
    width: 70px;
    height: 40px;
    font-size: 5px;
    line-height: 40px;
    border: 1px solid #ccc;
    text-align: center;
}

.page-item a, .next a, .prev a{
    display: inline-block;
    width: 100%;
    height: 40px!important;
    border-radius: 0px!important;
    line-height: 40px!important;
    margin: 0!important;
    padding: 0!important;
    /* background-color: red!important; */
}

.next a, .prev a{
    font-size: 12px!important;
}

.page-item a{
    font-size: 15px!important;
}




.active-item{
    background-color: #ccc;
}
</style>