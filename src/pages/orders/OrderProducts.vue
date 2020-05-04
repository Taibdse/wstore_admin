<template>
    <div>
        <md-table md-card>
            <md-table-row>
                <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{ header }}</md-table-head>
                <!-- <md-table-head></md-table-head> -->
            </md-table-row>
            <md-table-row  v-for="(item, index) in orderItems" :key="item.productId" >
                <md-table-cell>{{ index + 1 }}</md-table-cell>
                <md-table-cell>
                    <img :src="formatImageUrl(item.productImage)" class="img-fluid"/>
                </md-table-cell>
                <md-table-cell>
                    <strong>{{ item.productName }}</strong>
                    <div style="margin-top: 10px">
                        <strong>Size</strong> {{ item.productSize }}<br/>
                        <strong>Màu</strong> {{ item.productColor }}<br/>
                        <strong>Form</strong> {{ item.productForm }}
                    </div>
                </md-table-cell>
                <md-table-cell>
                    <strong>{{ convertNumToMoneyFormat(item.productPrice) }} đ</strong>
                </md-table-cell>
                <md-table-cell>
                    <strong>{{ item.quantity }}</strong>
                </md-table-cell>
                <md-table-cell>
                    <strong>{{ convertNumToMoneyFormat(item.quantity * item.productPrice) }} đ</strong>
                </md-table-cell>
            
            </md-table-row>
           
        </md-table>
    </div>
</template>

<script>
import { convertNumToMoneyFormat } from '@/utils/strings.js';
import { formatImageUrl } from '../../utils/strings';

export default {
    props: {
        orderItems: Array
    },
    data: () => ({
        tblHeaders: [
             '#', '', 'Sản phẩm', 'Dơn giá', 'Số lượng', 'Tổng',
        ]
    }),
    methods: {
        convertNumToMoneyFormat, formatImageUrl
    }
}
</script>

<style>
.img-fluid{
    width: 100px;
}
</style>