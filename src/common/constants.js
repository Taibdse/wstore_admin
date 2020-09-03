export const SHIPPING_TYPES = {
    NOI_THANH: 'NOI_THANH',
    NGOAI_THANH: 'NGOAI_THANH',
    QUAN_XA_NOI_THANH: 'QUAN_XA_NOI_THANH',
}

export const PAYMENT_STATUS = {
    CONFIRMATION_WAITING : "CONFIRMATION_WAITING",
    NOT_PAID: "NOT_PAID",
    PAID: "PAID"
}

export const getPaymentStatus = () => {
    return [
        { title: 'Wait for Confirmation', value: PAYMENT_STATUS.CONFIRMATION_WAITING },
        { title: 'Not Paid yet', value: PAYMENT_STATUS.NOT_PAID },
        { title: 'Paid', value: PAYMENT_STATUS.PAID },
    ]
}