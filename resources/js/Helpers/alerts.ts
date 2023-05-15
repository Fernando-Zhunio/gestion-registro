import Swal, { SweetAlertOptions } from "sweetalert2";

export function showAlert(options: SweetAlertOptions) {
   return Swal.fire(options);
}

export function showToast(options: SweetAlertOptions) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire(options)
}

export function showQuestion(options: SweetAlertOptions) {
    return Swal.fire(options);
}