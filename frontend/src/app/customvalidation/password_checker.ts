import { FormGroup } from "@angular/forms";

export function passwordChecker(
    control:string,
    comparecontrolform:string){

        return (
           formgroup:FormGroup  
        )=>{
          const  password=formgroup.controls[control]
          const  confirmPassword = formgroup.controls[comparecontrolform]

          if(password.value!== confirmPassword.value){
              confirmPassword.setErrors( {mustmatch:true})
          }else if(confirmPassword.value.length===0){
            confirmPassword.setErrors( {required:true})
          }
          else{
              confirmPassword.setErrors(null);
          }
        }

}