<template>
    <md-table md-card>
        <md-table-row>
            <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{ header }}</md-table-head>
            <md-table-head ></md-table-head>
        </md-table-row>
        <md-table-row  v-for="(word) in words" :key="word.id" >
            <md-table-cell>{{ word.index }}</md-table-cell>
            <md-table-cell>{{ word.name }}</md-table-cell>
            <md-table-cell style="max-width: 250px">{{ word.en }}</md-table-cell>
            <md-table-cell style="max-width: 250px">{{ word.vn }}</md-table-cell>
            <md-table-cell>
                <md-button class="md-just-icon md-simple md-primary" @click="onEdit(word)">
                <md-icon>edit</md-icon>
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
</template>

<script>

export default {
    props: {
        words: Array,
        onEdit: Function
    },
    data: () => ({
        tblHeaders: ['#','Name', 'English', 'Vietnamese'],
    }),
}
</script>

<style>

</style>