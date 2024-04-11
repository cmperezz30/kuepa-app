import Swal from 'sweetalert2';


class ModalMessage {

    static error(text){

        return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: text
        });

    }

    static async success(title, callback){
        Swal.fire({
            position: "center",
            icon: "success",
            title: title,
            showConfirmButton: false,
            timer: 1500
        }).then(()=> callback());
    }

}

export { ModalMessage }