import swal from 'sweetalert';

export const showSuccessMsg = ({ title, text, timer = 4000 }) => {
    swal({
        title, text,
        icon: 'success',
        button: 'Dong',
        timer
    })
}

export const showErrors = ({ title, text }) => {
    swal({
        title, text,
        icon: 'error',
        button: 'Dong',
    })
} 

export const showConfirm = async ({ title, text }) => {
    return swal({
        title,
        text,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
}
